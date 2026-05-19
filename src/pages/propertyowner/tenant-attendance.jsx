import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Users, Search, ShieldCheck, MapPin, 
  Clock, CheckCircle2, PlayCircle, LogIn, LogOut
} from "lucide-react";

export default function TenantAttendancePage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [tenants, setTenants] = useState([
    { id: 1, name: "Amit Sharma", room: "101", status: "Inside", lastScan: "Today, 08:30 PM" },
    { id: 2, name: "Vijay Kumar", room: "101", status: "Outside", lastScan: "Today, 04:00 PM" },
    { id: 3, name: "Rajesh Gupta", room: "102", status: "On Leave", lastScan: "18 May 2026, 09:00 AM" }
  ]);

  const handleStatusToggle = (id, nextStatus) => {
    setTenants(prev => prev.map(t => t.id === id ? { 
      ...t, 
      status: nextStatus,
      lastScan: `Just now, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    } : t));
  };

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.room.includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Residents Presence Tracker" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Tenant Attendance</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Monitor who is inside the hostel, track late check-outs, and review leave applications.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search residents by name or room number..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Tenants Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Tenant Name</th>
                <th className="px-6 py-3.5 font-semibold">Room</th>
                <th className="px-6 py-3.5 font-semibold">Last Gate Activity</th>
                <th className="px-6 py-3.5 font-semibold">Current State</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTenants.map((t) => (
                <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">{t.name}</td>
                  <td className="px-6 py-4 font-bold text-foreground">Room {t.room}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t.lastScan}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      t.status === "Inside" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : t.status === "Outside" 
                        ? "bg-amber-50 text-amber-600 border-amber-100" 
                        : "bg-blue-50 text-blue-600 border-blue-100"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {t.status !== "Inside" && (
                      <button 
                        onClick={() => handleStatusToggle(t.id, "Inside")}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
                      >
                        <LogIn size={12} /> Check-In
                      </button>
                    )}
                    {t.status === "Inside" && (
                      <button 
                        onClick={() => handleStatusToggle(t.id, "Outside")}
                        className="inline-flex items-center gap-1 h-8 px-3 border border-border rounded-lg text-xs font-bold text-muted-foreground hover:text-foreground"
                      >
                        <LogOut size={12} /> Check-Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
