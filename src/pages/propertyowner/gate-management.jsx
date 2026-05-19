import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  DoorOpen, ShieldCheck, ToggleLeft, ToggleRight, 
  Clock, AlertTriangle, AlertCircle
} from "lucide-react";

export default function GateManagementPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [curfewLock, setCurfewLock] = useState(false);
  const [gates, setGates] = useState([
    { id: 1, name: "Main Entrance Gate", type: "Biometric & RFID", status: "Unlocked" },
    { id: 2, name: "Rear Service Entrance", type: "Pin Pad Lock", status: "Unlocked" },
    { id: 3, name: "Cafeteria RFID scanner", type: "NFC Reader", status: "Unlocked" }
  ]);

  const handleToggleGate = (id) => {
    setGates(prev => prev.map(g => g.id === id ? { 
      ...g, 
      status: g.status === "Unlocked" ? "Locked" : "Unlocked" 
    } : g));
  };

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Hardware Gate Controllers" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Gate Management</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Setup automated curfews, lock/unlock smart door locks, and control access hardware.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Curfew Lock Option */}
        <div className="rounded-2xl border border-border bg-rose-50/20 p-6 shadow-soft space-y-4">
          <div className="flex justify-between items-start">
            <div className="size-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <button onClick={() => setCurfewLock(!curfewLock)}>
              {curfewLock ? (
                <ToggleRight size={38} className="text-rose-600" />
              ) : (
                <ToggleLeft size={38} className="text-slate-300" />
              )}
            </button>
          </div>
          <div>
            <h3 className="font-serif text-[20px] font-bold text-foreground">Lockdown Curfew Mode</h3>
            <p className="text-[12px] text-muted-foreground mt-1">Enables strict gate lockdown. RFID passes will trigger alarms after 10:30 PM curfew limits.</p>
          </div>
        </div>

        {/* Status logs */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-800">Biometric Sync Server Online</h4>
              <p className="text-[11.5px] text-muted-foreground">Gateway servers checking in regularly. Latency 14ms.</p>
            </div>
          </div>
        </div>
      </div>

      {/* List of hardware gates */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
        <h3 className="font-serif text-[20px] text-foreground border-b border-border/60 pb-3">Door Hardware Controllers</h3>
        <div className="space-y-4">
          {gates.map((g) => (
            <div key={g.id} className="flex justify-between items-center border border-border p-4 rounded-xl bg-muted/20">
              <div>
                <h4 className="text-[13.5px] font-bold text-slate-800">{g.name}</h4>
                <p className="text-[11.5px] text-muted-foreground mt-0.5">Hardware: {g.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold ${g.status === "Unlocked" ? "text-emerald-600" : "text-rose-600"}`}>
                  {g.status}
                </span>
                <button onClick={() => handleToggleGate(g.id)}>
                  {g.status === "Unlocked" ? (
                    <ToggleRight size={38} className="text-emerald-600" />
                  ) : (
                    <ToggleLeft size={38} className="text-slate-300" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
