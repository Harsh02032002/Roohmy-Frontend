import React, { useEffect, useMemo, useState } from "react";
import { X, Plus, Zap, TrendingUp, Calendar, DollarSign, RotateCw, Pencil, Trash2 } from "lucide-react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { fetchOwnerRooms, getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { getApiBase } from "../../utils/api";

const cn = (...c) => c.filter(Boolean).join(" ");
const readJson = (k, fb) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; } catch { return fb; } };
const writeJson = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export default function ElectricityReadings() {
  const [owner, setOwner] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [readingForm, setReadingForm] = useState({ 
    unitCost: "", 
    initialReading: "", 
    initialReadingDate: new Date().toISOString().split("T")[0], 
    finalReading: "", 
    finalReadingDate: new Date().toISOString().split("T")[0], 
    description: "" 
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const s = getOwnerRuntimeSession();
    if (!s?.loginId) { window.location.href = "/propertyowner/ownerlogin"; return; }
    setOwner(s);
    loadRooms(s);
  }, []);

  const loadRooms = async (session) => {
    setLoading(true);
    try {
      const roomData = await fetchOwnerRooms(session.loginId);
      const backendRooms = roomData.rooms || [];
      
      // Merge local rooms with backend rooms
      const local = readJson("roomhy_rooms", []);
      const seen = new Set();
      const merged = [...local, ...backendRooms]
        .map(r => ({
          ...r,
          _id: r._id || r.id,
          number: r.number || r.roomNo || r.title || "Room",
          rent: r.rent || r.price || r.roomRent || 0,
          electricityUnitCost: r.electricityUnitCost || 0
        }))
        .filter(r => {
          const key = `${r.propertyId || r.property?._id}:${r.number || r.roomNo || r.title}`;
          if (seen.has(key)) return false;
          seen.add(key); 
          return true;
        });
      
      setRooms(merged);
    } catch (e) {
      // Still show local rooms if backend fails
      const local = readJson("roomhy_rooms", []);
      setRooms(local);
      if (e?.message) setErrorMsg("Failed to load backend rooms, showing local rooms only");
    } finally { setLoading(false); }
  };

  const handleAddReading = async () => {
    if (!selectedRoom || !readingForm.initialReading || !readingForm.finalReading) {
      setErrorMsg("Please select room and enter both readings");
      return;
    }
    try {
      setErrorMsg("");
      const roomId = selectedRoom._id || selectedRoom.id;
      const readings = readJson(`room_${roomId}_readings`, []);
      
      const newReadingData = {
        unitCost: Number(readingForm.unitCost) || selectedRoom.electricityUnitCost || 0,
        initialReading: Number(readingForm.initialReading),
        initialReadingDate: readingForm.initialReadingDate,
        finalReading: Number(readingForm.finalReading),
        finalReadingDate: readingForm.finalReadingDate,
        description: readingForm.description
      };
      
      const computedData = {
        ...newReadingData,
        unitsConsumed: newReadingData.finalReading - newReadingData.initialReading,
        totalCost: (newReadingData.finalReading - newReadingData.initialReading) * newReadingData.unitCost,
        createdAt: editIndex !== null && readings[editIndex]?.createdAt ? readings[editIndex].createdAt : new Date().toISOString()
      };
      
      let readingId = editIndex !== null ? readings[editIndex]?._id : null;

      // Attempt to save to backend (don't block if it fails, since localStorage acts as backup)
      try {
        const method = editIndex !== null && readingId ? 'PUT' : 'POST';
        const url = method === 'PUT' 
            ? `${getApiBase()}/api/rooms/${roomId}/readings/${readingId}`
            : `${getApiBase()}/api/rooms/${roomId}/readings`;
            
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReadingData)
        });
        if (response.ok) {
           const resData = await response.json();
           if (resData?.reading?._id) readingId = resData.reading._id;
        }
      } catch (err) {
        console.warn("Backend save failed, using local storage", err);
      }
      
      if (readingId) computedData._id = readingId;
      
      if (editIndex !== null) {
        readings[editIndex] = computedData;
      } else {
        readings.push(computedData);
      }
      
      writeJson(`room_${roomId}_readings`, readings);
      
      setReadingForm({ 
        unitCost: "", 
        initialReading: "", 
        initialReadingDate: new Date().toISOString().split("T")[0], 
        finalReading: "", 
        finalReadingDate: new Date().toISOString().split("T")[0], 
        description: "" 
      });
      setModalOpen(false);
      setEditIndex(null);
      setSelectedRoom({...selectedRoom}); // Trigger re-render
    } catch (e) {
      setErrorMsg(e?.message || "Failed to save reading");
    }
  };

  const handleDeleteReading = async (originalIndex) => {
    if (!window.confirm("Are you sure you want to delete this reading?")) return;
    const roomId = selectedRoom._id || selectedRoom.id;
    const readings = getRoomReadings(roomId);
    const readingToDelete = readings[originalIndex];
    
    if (readingToDelete?._id) {
       try {
         await fetch(`${getApiBase()}/api/rooms/${roomId}/readings/${readingToDelete._id}`, { method: 'DELETE' });
       } catch(e) {
         console.warn("Backend delete failed", e);
       }
    }

    readings.splice(originalIndex, 1);
    writeJson(`room_${roomId}_readings`, readings);
    setSelectedRoom({...selectedRoom});
  };

  const openEditModal = (reading, originalIndex) => {
    setReadingForm({
      unitCost: reading.unitCost || "",
      initialReading: reading.initialReading || "",
      initialReadingDate: reading.initialReadingDate || new Date().toISOString().split("T")[0],
      finalReading: reading.finalReading || "",
      finalReadingDate: reading.finalReadingDate || new Date().toISOString().split("T")[0],
      description: reading.description || ""
    });
    setEditIndex(originalIndex);
    setModalOpen(true);
  };

  const getRoomReadings = (roomId) => readJson(`room_${roomId}_readings`, []);

  const calculateBill = (room) => {
    const roomId = room._id || room.id;
    const readings = getRoomReadings(roomId);
    if (readings.length === 0) return { units: 0, cost: 0 };
    
    // Sum up all readings
    const totalUnits = readings.reduce((sum, r) => sum + (r.unitsConsumed || 0), 0);
    const totalCost = readings.reduce((sum, r) => sum + (r.totalCost || 0), 0);
    
    return { units: totalUnits, cost: totalCost };
  };

  const selectedRoomData = useMemo(() => {
    if (!selectedRoom) return null;
    const roomId = selectedRoom._id || selectedRoom.id;
    const readings = getRoomReadings(roomId).map((r, i) => ({ ...r, originalIndex: i }));
    const { units, cost } = calculateBill(selectedRoom);
    return {
      readings: readings.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
      units,
      cost,
      totalRent: Number(selectedRoom.rent || 0) + cost
    };
  }, [selectedRoom]);

  return (
    <PropertyOwnerLayout owner={owner} title="Electricity Readings" onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground mb-2">Electricity Readings</h1>
            <p className="text-[13.5px] text-muted-foreground">Manage meter readings and track electricity bills per room</p>
          </div>
          <button onClick={() => loadRooms(owner)} className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-[13px] font-medium">
            <RotateCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Room List */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft h-fit">
            <h2 className="text-[16px] font-semibold text-foreground mb-4">Rooms</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {[1,2,3].map(i => <div key={i} className="h-10 bg-muted rounded-lg" />)}
                </div>
              ) : rooms.length === 0 ? (
                <p className="text-[13px] text-muted-foreground">No rooms found</p>
              ) : (
                rooms.map(room => (
                  <button key={room._id || room.id} onClick={() => setSelectedRoom(room)} 
                    className={cn("w-full text-left p-3 rounded-lg text-[13px] font-medium transition-all",
                      selectedRoom?._id === room._id || selectedRoom?.id === room.id
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                    <div>Room {room.number || room.roomNo || room.title || "Unknown"}</div>
                    <div className="text-[11px] opacity-75">₹{room.rent || 0}/month • ₹{room.electricityUnitCost || 0}/unit</div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right: Readings & Bill */}
          <div className="lg:col-span-2 space-y-4">
            {!selectedRoom ? (
              <div className="rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
                <Zap size={40} className="mx-auto text-muted-foreground mb-3 opacity-40" />
                <p className="text-[14px] font-medium text-foreground mb-1">Select a room</p>
                <p className="text-[12px] text-muted-foreground">Choose a room to view and add meter readings</p>
              </div>
            ) : (
              <>
                {/* Bill Summary */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="text-[11px] text-muted-foreground mb-1">Units Used</div>
                    <div className="text-[22px] font-bold text-foreground">{selectedRoomData?.units || 0}</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="text-[11px] text-muted-foreground mb-1">Electricity Bill</div>
                    <div className="text-[22px] font-bold text-destructive">₹{selectedRoomData?.cost.toFixed(2)}</div>
                  </div>
                  <div className="rounded-xl border border-border bg-primary/10 p-4">
                    <div className="text-[11px] text-muted-foreground mb-1">Total Rent</div>
                    <div className="text-[22px] font-bold text-primary">₹{selectedRoomData?.totalRent.toFixed(2)}</div>
                  </div>
                </div>

                {/* Add Reading Button */}
                <button onClick={() => { 
                    setEditIndex(null); 
                    setReadingForm({ unitCost: "", initialReading: "", initialReadingDate: new Date().toISOString().split("T")[0], finalReading: "", finalReadingDate: new Date().toISOString().split("T")[0], description: "" }); 
                    setModalOpen(true); 
                  }} 
                  className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90">
                  <Plus size={16} /> Add Reading
                </button>

                {/* Readings List */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <h3 className="text-[14px] font-semibold text-foreground mb-4">Recent Readings</h3>
                  {selectedRoomData?.readings.length === 0 ? (
                    <p className="text-[12px] text-muted-foreground text-center py-4">No readings recorded yet</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedRoomData?.readings.map((reading) => (
                        <div key={reading.originalIndex} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg border border-border group">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className="text-[13px] font-medium text-foreground">{reading.unitsConsumed || 0} Units Consumed</div>
                              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                                <button onClick={() => openEditModal(reading, reading.originalIndex)} className="p-1 hover:bg-muted text-muted-foreground hover:text-primary rounded" title="Edit">
                                  <Pencil size={13} />
                                </button>
                                <button onClick={() => handleDeleteReading(reading.originalIndex)} className="p-1 hover:bg-muted text-muted-foreground hover:text-destructive rounded" title="Delete">
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-1">
                              Initial: {reading.initialReading} ({new Date(reading.initialReadingDate).toLocaleDateString('en-IN')})
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              Final: {reading.finalReading} ({new Date(reading.finalReadingDate).toLocaleDateString('en-IN')})
                            </div>
                            {reading.description && <div className="text-[11px] text-primary mt-1">{reading.description}</div>}
                          </div>
                          <div className="text-right">
                            <div className="text-[13px] font-semibold text-destructive">
                              ₹{reading.totalCost?.toFixed(2) || 0}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">
                              @₹{reading.unitCost || 0}/unit
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Reading Modal */}
      <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm transition-all", modalOpen?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none")}>
        <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-[18px] font-semibold text-foreground">{editIndex !== null ? 'Edit Reading' : 'Add Reading'}</h2>
            <button onClick={() => setModalOpen(false)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"><X size={20}/></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleAddReading(); }} className="p-6 space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Unit Cost (₹/Unit) <span className="text-destructive">*</span></label>
              <input type="number" step="0.01" required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Enter unit cost" value={readingForm.unitCost} onChange={e=>setReadingForm(p=>({...p,unitCost:e.target.value}))}/>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Initial Reading <span className="text-destructive">*</span></label>
              <input type="number" step="0.01" required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Enter reading" value={readingForm.initialReading} onChange={e=>setReadingForm(p=>({...p,initialReading:e.target.value}))}/>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Initial Reading Date <span className="text-destructive">*</span></label>
              <input type="date" required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" value={readingForm.initialReadingDate} onChange={e=>setReadingForm(p=>({...p,initialReadingDate:e.target.value}))}/>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Final Reading <span className="text-destructive">*</span></label>
              <input type="number" step="0.01" required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Enter reading" value={readingForm.finalReading} onChange={e=>setReadingForm(p=>({...p,finalReading:e.target.value}))}/>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Final Reading Date <span className="text-destructive">*</span></label>
              <input type="date" required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" value={readingForm.finalReadingDate} onChange={e=>setReadingForm(p=>({...p,finalReadingDate:e.target.value}))}/>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Due Description (Optional)</label>
              <textarea className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[60px]" placeholder="e.g., Monthly bill..." value={readingForm.description} onChange={e=>setReadingForm(p=>({...p,description:e.target.value}))}/>
            </div>
            {errorMsg && <p className="text-[12px] text-destructive">{errorMsg}</p>}
            <button type="submit" className="w-full h-10 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90">Save Reading</button>
          </form>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
