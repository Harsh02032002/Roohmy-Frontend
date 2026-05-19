import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  PhoneCall, Search, Calendar, MessageSquare, 
  CheckCircle, Clock, AlertTriangle, ArrowRight 
} from "lucide-react";

export default function FollowUpsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [followups, setFollowups] = useState([
    { id: 1, name: "Priya Singh", phone: "+91 98765 22331", lastContact: "18 May 2026", nextFollowup: "Today, 4:00 PM", notes: "Negotiating on security deposit amount.", status: "Overdue" },
    { id: 2, name: "Neelam Kothari", phone: "+91 91234 88776", lastContact: "17 May 2026", nextFollowup: "21 May 2026", notes: "Asked to call back post office hours.", status: "Scheduled" },
    { id: 3, name: "Varun Dhawan", phone: "+91 95432 11002", lastContact: "16 May 2026", nextFollowup: "23 May 2026", notes: "Parents will visit property first.", status: "Scheduled" }
  ]);

  const handleComplete = (id) => {
    setFollowups(prev => prev.filter(f => f.id !== id));
  };

  const filteredFollowups = followups.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Follow-ups List" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Pending Follow-ups</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Keep lead conversations active. Record call summaries and configure callback schedules.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search follow-ups by lead name or conversation notes..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of Follow-ups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFollowups.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <PhoneCall size={20} />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  item.status === "Overdue" 
                    ? "bg-rose-50 text-rose-600 border border-rose-100" 
                    : "bg-blue-50 text-blue-600 border border-blue-100"
                }`}>
                  {item.status}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{item.name}</h3>
                <p className="text-[12px] font-mono text-muted-foreground mt-0.5">{item.phone}</p>
                <p className="text-[12.5px] text-muted-foreground mt-2 italic bg-muted/40 p-3 rounded-xl border border-border/40">
                  "{item.notes}"
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last Contact:</span>
                  <span className="font-medium text-foreground">{item.lastContact}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-semibold text-rose-600">Next Follow-up:</span>
                  <span className="font-bold text-rose-600">{item.nextFollowup}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
              <button 
                onClick={() => handleComplete(item.id)}
                className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
              >
                Mark Done
              </button>
              <button className="px-4 h-10 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground">
                Log Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
