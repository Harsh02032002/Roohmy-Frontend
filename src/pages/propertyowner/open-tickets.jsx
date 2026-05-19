import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  AlertCircle, Search, User, Clock, 
  ChevronRight, CheckCircle2, UserCheck, ShieldAlert
} from "lucide-react";

export default function OpenTicketsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [tickets, setTickets] = useState([
    { id: 1, tenant: "Aarav Sharma", room: "101", issue: "Water leakage in bathroom tap", category: "Plumbing", priority: "High", date: "Today, 10:00 AM" },
    { id: 2, tenant: "Rohan Mehta", room: "104", issue: "WiFi router not power cycling", category: "Internet", priority: "Medium", date: "Yesterday, 04:30 PM" },
    { id: 3, tenant: "Sanjay Dutt", room: "103", issue: "Bed sheet change requested", category: "Housekeeping", priority: "Low", date: "15 May 2026" }
  ]);

  const handleAssign = (id) => {
    setTickets(prev => prev.filter(t => t.id !== id));
  };

  const filteredTickets = tickets.filter(t => 
    t.tenant.toLowerCase().includes(search.toLowerCase()) ||
    t.issue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Active Complaints" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Open Tickets</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Manage active tenant reports and route tasks to maintenance reps.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search open tickets by tenant name or issue..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of Open Tickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickets.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <ShieldAlert size={20} />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                  t.priority === "High" 
                    ? "bg-rose-50 text-rose-600 border border-rose-100" 
                    : t.priority === "Medium" 
                    ? "bg-amber-50 text-amber-600 border border-amber-100" 
                    : "bg-slate-100 text-slate-500 border border-slate-200"
                }`}>
                  {t.priority} Priority
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{t.tenant}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-1">Room {t.room} • {t.category}</p>
                <p className="text-[13px] text-slate-700 mt-3 font-medium bg-muted/40 p-3 rounded-xl border border-border/40">
                  "{t.issue}"
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 flex justify-between items-center text-xs text-muted-foreground">
                <span>Reported:</span>
                <span className="font-bold text-slate-800">{t.date}</span>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
              <button 
                onClick={() => handleAssign(t.id)}
                className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5"
              >
                <UserCheck size={14} /> Assign Staff
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
