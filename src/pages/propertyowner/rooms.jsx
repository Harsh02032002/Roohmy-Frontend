import React, { useEffect, useMemo, useState } from "react";
import { X, Plus, Building2, ChevronDown } from "lucide-react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { fetchJson } from "../../utils/api";
import {
  assignTenant, clearOwnerRuntimeSession, createRoom,
  fetchOwnerProperties, fetchOwnerRooms, fetchOwnerTenants, getOwnerRuntimeSession
} from "../../utils/propertyowner";

const cn = (...c) => c.filter(Boolean).join(" ");

const toLegacyBeds = (room) => {
  const beds = Array.isArray(room?.beds) ? room.beds
    : Array.from({ length: Number(room?.beds || room?.capacity || room?.totalBeds || 0) }, (_, i) => {
        const a = room?.bedAssignments?.[i] || room?.bedsInfo?.[i] || null;
        return a && (a.tenantName || a.name || a.tenantId)
          ? { status: "occupied", tenantId: a.tenantId || a._id, tenantName: a.tenantName || a.name }
          : { status: "available", tenantId: null, tenantName: null };
      });
  return beds.length ? beds : [{ status: "available", tenantId: null, tenantName: null }];
};

const normalizeRoom = (room, ownerId) => {
  const number = room?.number || room?.roomNo || room?.title || "Room";
  return {
    ...room,
    id: room?.id || room?._id || `R-${Date.now()}`,
    _id: room?._id || room?.id || null,
    ownerLoginId: room?.ownerLoginId || ownerId,
    propertyId: room?.propertyId || room?.property?._id || "",
    propertyTitle: room?.propertyTitle || room?.property?.title || "",
    number, roomNo: number, title: number,
    type: room?.type || room?.roomType || "AC",
    rent: Number(room?.rent ?? room?.price ?? room?.roomRent ?? 0),
    gender: room?.gender || room?.roomGender || "",
    beds: toLegacyBeds(room),
  };
};

const readJson = (k, fb) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; } catch { return fb; } };
const writeJson = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export default function Rooms() {
  const [owner, setOwner] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [roomForm, setRoomForm] = useState({ roomNo: "", roomType: "AC", roomRent: "", roomGender: "", roomBeds: 2 });
  const [assignMode, setAssignMode] = useState("new");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedBedIndex, setSelectedBedIndex] = useState(null);
  const [selectedTenantId, setSelectedTenantId] = useState("");
  const [newTenantForm, setNewTenantForm] = useState({ name: "", phone: "", email: "" });

  const currentProperty = useMemo(() => properties[0] || null, [properties]);
  const currentPropertyDisplay = useMemo(() => {
    const title = currentProperty?.title || currentProperty?.name || owner?.propertyName || "";
    const loc = currentProperty?.city || currentProperty?.area || currentProperty?.locationCode || "";
    return title ? (loc ? `${title} (${loc})` : title) : "Loading…";
  }, [currentProperty, owner]);
  const currentPropertyLocation = useMemo(() => currentProperty?.city || currentProperty?.area || "", [currentProperty]);

  const mergeRooms = (ownerId, backendRooms) => {
    const local = readJson("roomhy_rooms", []);
    const seen = new Set();
    return [...local, ...backendRooms]
      .map(r => normalizeRoom(r, ownerId))
      .filter(r => {
        const key = `${r.propertyId}:${r.number}`;
        if (seen.has(key)) return false;
        seen.add(key); return true;
      });
  };

  const load = async (session) => {
    setLoading(true);
    try {
      const [props, roomData, tList] = await Promise.all([
        fetchOwnerProperties(session.loginId),
        fetchOwnerRooms(session.loginId),
        fetchOwnerTenants(session.loginId),
      ]);
      setProperties(props);
      setRooms(mergeRooms(session.loginId, roomData.rooms || []));
      setTenants(tList || []);
    } catch (e) {
      setErrorMsg(e?.body || e?.message || "Failed to load.");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    const s = getOwnerRuntimeSession();
    if (!s?.loginId) { window.location.href = "/propertyowner/ownerlogin"; return; }
    setOwner(s); load(s);
  }, []);

  const openAssignModal = (room, bedIdx) => {
    setSelectedRoom(room); setSelectedBedIndex(bedIdx);
    setSelectedTenantId(""); setNewTenantForm({ name: "", phone: "", email: "" });
    setAssignMode("new"); setAssignModalOpen(true);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!owner?.loginId) return;
    try {
      setErrorMsg("");
      const propId = currentProperty?._id || "";
      const bedCount = Number(roomForm.roomBeds || 1);
      const local = normalizeRoom({
        id: `R-${Date.now()}`, ownerLoginId: owner.loginId, propertyId: propId,
        propertyTitle: currentProperty?.title || "", number: roomForm.roomNo,
        type: roomForm.roomType, rent: Number(roomForm.roomRent || 0),
        gender: roomForm.roomGender,
        beds: Array.from({ length: bedCount }, () => ({ status: "available", tenantId: null, tenantName: null })),
      }, owner.loginId);
      const updated = [...readJson("roomhy_rooms", []), local];
      writeJson("roomhy_rooms", updated);
      setRooms(mergeRooms(owner.loginId, []));
      try { await createRoom({ propertyId: propId, title: roomForm.roomNo, type: roomForm.roomType, rent: Number(roomForm.roomRent || 0), beds: bedCount, gender: roomForm.roomGender, ownerLoginId: owner.loginId }); } catch {}
      setRoomModalOpen(false);
      setRoomForm({ roomNo: "", roomType: "AC", roomRent: "", roomGender: "", roomBeds: 2 });
      await load(owner);
    } catch (e) { setErrorMsg(e?.message || "Failed."); }
  };

  const handleAssignTenant = async (e) => {
    e.preventDefault();
    if (!owner?.loginId || !selectedRoom) return;
    try {
      setErrorMsg("");
      const roomNo = selectedRoom.number || selectedRoom.roomNo || "";
      const agreedRent = Number(selectedRoom.rent || 0);
      const moveInDate = new Date().toISOString().split("T")[0];
      let payload;
      if (assignMode === "existing") {
        const t = tenants.find(x => (x._id || x.id) === selectedTenantId);
        if (!t) { setErrorMsg("Select a tenant."); return; }
        payload = { name: t.name, phone: t.phone, email: t.email, propertyId: currentProperty?._id || "", roomNo, bedNo: Number(selectedBedIndex) + 1, moveInDate, agreedRent, ownerLoginId: owner.loginId };
      } else {
        if (!newTenantForm.name || !newTenantForm.phone || !newTenantForm.email) { setErrorMsg("All fields required."); return; }
        payload = { ...newTenantForm, propertyId: currentProperty?._id || "", roomNo, bedNo: Number(selectedBedIndex) + 1, moveInDate, agreedRent, ownerLoginId: owner.loginId };
      }
      await assignTenant(payload);
      setAssignModalOpen(false);
      await load(owner);
    } catch (e) { setErrorMsg(e?.body || e?.message || "Failed."); }
  };

  // Group rooms by property
  const grouped = useMemo(() => {
    const g = {};
    rooms.forEach(r => {
      const k = r.propertyTitle || r.propertyId || "Your Property";
      if (!g[k]) g[k] = [];
      g[k].push(r);
    });
    return g;
  }, [rooms]);

  return (
    <PropertyOwnerLayout owner={owner} title="Rooms & Beds" onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }} contentClassName="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Rooms &amp; Beds</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">
            Visual bed-by-bed view. {rooms.reduce((s,r) => s + toLegacyBeds(r).filter(b => b.status==="occupied"||b.tenantId).length, 0)} of {rooms.reduce((s,r) => s + toLegacyBeds(r).length, 0)} beds occupied.
          </p>
        </div>
        <div className="flex items-center gap-2 md:mt-2">
          <button className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border bg-card text-[13px] font-medium hover:border-primary/40 transition-colors">
            <ChevronDown size={14} /> Filter
          </button>
          <button type="button" onClick={() => setRoomModalOpen(true)} className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity">
            <Plus size={16} /> Add room
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mb-5 text-[11.5px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-primary/80" /> Occupied</span>
        <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-warning/40" /> Reserved</span>
        <span className="flex items-center gap-1.5"><span className="size-3 rounded border border-dashed border-border bg-card" /> Vacant</span>
      </div>

      {errorMsg && <div className="text-sm text-destructive mb-6 bg-destructive/10 p-4 rounded-xl">{errorMsg}</div>}

      <div className="space-y-7">
        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft animate-pulse">
            <div className="h-6 w-48 bg-muted rounded mb-4" />
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">{[1,2,3,4,5].map(i=><div key={i} className="h-28 bg-muted rounded-xl"/>)}</div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-16 shadow-soft flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-muted/60 rounded-full flex items-center justify-center mb-3"><Building2 className="size-7 text-muted-foreground" /></div>
            <h3 className="font-serif text-[22px] text-foreground mb-1">No rooms yet</h3>
            <p className="text-[13.5px] text-muted-foreground mb-4">Add your first room to manage beds and tenants.</p>
            <button type="button" onClick={() => setRoomModalOpen(true)} className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90"><Plus size={16}/> Add Room</button>
          </div>
        ) : Object.entries(grouped).map(([propTitle, propRooms]) => {
          const allBeds = propRooms.flatMap(r => toLegacyBeds(r));
          const pOcc = allBeds.filter(b => b.status==="occupied"||b.tenantId).length;
          const pTotal = allBeds.length;
          const pct = pTotal ? Math.round((pOcc/pTotal)*100) : 0;
          return (
            <section key={propTitle} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-serif text-[22px] leading-tight text-foreground">{propTitle}</h2>
                  <div className="text-[12px] text-muted-foreground mt-0.5">{currentPropertyLocation && `${currentPropertyLocation} · `}{propRooms.length} rooms · {pOcc}/{pTotal} beds occupied</div>
                </div>
                <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11.5px] font-medium", pct>90?"bg-success/15 text-success-foreground":"bg-info/15 text-foreground")}>{pct}% full</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {propRooms.slice(0,10).map(room => {
                  const beds = toLegacyBeds(room);
                  return (
                    <div key={room._id||room.id} className="rounded-xl border border-border p-3 hover:border-primary/30 hover:shadow-soft transition-all">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-[13.5px] text-foreground">Room {room.number||room.roomNo||room.title}</div>
                        <span className="bg-muted text-muted-foreground inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium">{room.type||"AC"}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{room.gender||"Mixed"}</div>
                      <div className="mt-2.5 flex gap-1.5">
                        {beds.map((bed,i) => (
                          <div key={i} onClick={() => { if(!(bed.status==="occupied"||bed.tenantId)) openAssignModal(room,i); }}
                            title={bed.tenantName||(bed.status==="occupied"||bed.tenantId?"Occupied":"Vacant")}
                            className={cn("flex-1 h-10 rounded-md grid place-items-center text-[10.5px] font-semibold cursor-pointer transition-colors",
                              bed.status==="occupied"||bed.tenantId?"bg-primary/80 text-primary-foreground":i===0&&beds.length>2?"bg-warning/30 text-foreground":"border border-dashed border-border text-muted-foreground hover:bg-muted")}>
                            {String.fromCharCode(65+i)}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">₹{(room.rent||0).toLocaleString("en-IN")}/bed</span>
                        <button type="button" onClick={() => openAssignModal(room, beds.findIndex(b=>!(b.status==="occupied"||b.tenantId)))} className="text-[11px] font-medium text-primary hover:underline">Manage</button>
                      </div>
                    </div>
                  );
                })}
                <button type="button" onClick={() => setRoomModalOpen(true)} className="rounded-xl border-2 border-dashed border-border p-3 flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors min-h-[8rem]">
                  <Plus size={20}/><span className="text-[11px] font-medium">Add room</span>
                </button>
              </div>
            </section>
          );
        })}
      </div>

      {/* Add Room Modal */}
      <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm transition-all", roomModalOpen?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none")}>
        <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <div><h2 className="text-[18px] font-semibold text-foreground">Add New Room</h2><p className="text-[12px] text-muted-foreground mt-0.5">Configure room details</p></div>
            <button onClick={() => setRoomModalOpen(false)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"><X size={20}/></button>
          </div>
          <form onSubmit={handleCreateRoom} className="p-6 space-y-4">
            <div className="bg-muted/50 p-3 rounded-lg border border-border">
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Property</label>
              <div className="flex items-center gap-2 text-[13.5px] font-medium text-foreground"><Building2 className="size-4 text-primary"/><span className="truncate">{currentPropertyDisplay}</span></div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Room Number</label>
              <input required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. 101, A-Wing" value={roomForm.roomNo} onChange={e=>setRoomForm(p=>({...p,roomNo:e.target.value}))}/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Type</label>
                <select className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" value={roomForm.roomType} onChange={e=>setRoomForm(p=>({...p,roomType:e.target.value}))}>
                  <option value="AC">AC Room</option><option value="Non-AC">Non-AC</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Rent/Month</label>
                <input type="number" required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="0" value={roomForm.roomRent} onChange={e=>setRoomForm(p=>({...p,roomRent:e.target.value}))}/>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Gender</label>
              <select required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" value={roomForm.roomGender} onChange={e=>setRoomForm(p=>({...p,roomGender:e.target.value}))}>
                <option value="">Select</option><option value="Boys">Boys</option><option value="Girls">Girls</option><option value="Co-ed">Co-ed</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Beds</label>
              <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-lg p-1">
                <button type="button" onClick={() => setRoomForm(p=>({...p,roomBeds:Math.max(1,p.roomBeds-1)}))} className="size-8 rounded-md bg-card border border-border text-foreground font-bold hover:bg-muted">-</button>
                <span className="flex-1 text-center text-[13.5px] font-medium text-foreground">{roomForm.roomBeds}</span>
                <button type="button" onClick={() => setRoomForm(p=>({...p,roomBeds:Math.min(10,p.roomBeds+1)}))} className="size-8 rounded-md bg-card border border-border text-foreground font-bold hover:bg-muted">+</button>
              </div>
            </div>
            <button type="submit" className="w-full h-10 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90">Create Room</button>
          </form>
        </div>
      </div>

      {/* Assign Tenant Modal */}
      <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm transition-all", assignModalOpen?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none")}>
        <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <div><h2 className="text-[18px] font-semibold text-foreground">Assign Tenant</h2><p className="text-[12px] text-muted-foreground mt-0.5">Room {selectedRoom?.number||selectedRoom?.roomNo} · Bed {selectedBedIndex!=null?selectedBedIndex+1:""}</p></div>
            <button onClick={() => setAssignModalOpen(false)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"><X size={20}/></button>
          </div>
          <form onSubmit={handleAssignTenant} className="p-6 space-y-4">
            <div className="flex gap-2">
              {["new","existing"].map(m => (
                <button key={m} type="button" onClick={() => setAssignMode(m)} className={cn("flex-1 h-9 rounded-lg text-[12.5px] font-medium capitalize transition-colors", assignMode===m?"bg-foreground text-background":"bg-card border border-border text-muted-foreground hover:border-primary/40")}>
                  {m==="new"?"New Tenant":"Existing"}
                </button>
              ))}
            </div>
            {assignMode==="existing" ? (
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Select Tenant</label>
                <select required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" value={selectedTenantId} onChange={e=>setSelectedTenantId(e.target.value)}>
                  <option value="">-- Select --</option>
                  {tenants.map(t=><option key={t._id||t.id} value={t._id||t.id}>{t.name} ({t.phone})</option>)}
                </select>
              </div>
            ) : (
              <>
                <div><label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Name</label><input required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Tenant name" value={newTenantForm.name} onChange={e=>setNewTenantForm(p=>({...p,name:e.target.value}))}/></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Phone</label><input required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Phone" value={newTenantForm.phone} onChange={e=>setNewTenantForm(p=>({...p,phone:e.target.value}))}/></div>
                  <div><label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Email</label><input required className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-[13.5px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Email" value={newTenantForm.email} onChange={e=>setNewTenantForm(p=>({...p,email:e.target.value}))}/></div>
                </div>
              </>
            )}
            {errorMsg && <p className="text-[12px] text-destructive">{errorMsg}</p>}
            <button type="submit" className="w-full h-10 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90">Assign Tenant</button>
          </form>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
