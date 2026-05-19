import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Calendar, Search, Eye, CheckCircle2, XCircle, 
  Clock, MapPin, User, Phone, Edit3
} from "lucide-react";

export default function ScheduleVisit() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [visits, setVisits] = useState([
    { id: 1, name: "Varun Dhawan", phone: "+91 95432 11002", time: "Today, 03:30 PM", roomPref: "Single Room AC", staff: "Rakesh (Manager)", status: "Scheduled" },
    { id: 2, name: "Kareena Kapoor", phone: "+91 98765 44321", time: "Tomorrow, 11:00 AM", roomPref: "Double Sharing AC", staff: "Suresh (Staff)", status: "Scheduled" },
    { id: 3, name: "Ranbir Kapoor", phone: "+91 99988 77766", time: "22 May, 02:00 PM", roomPref: "Triple Sharing", staff: "Rakesh (Manager)", status: "Scheduled" }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const filteredVisits = visits.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.roomPref.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Scheduled Visits" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Scheduled Property Visits</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Manage prospective tenant walk-through schedules and assign greeting staff members.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scheduled visits by prospect name or room preference..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of Visits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVisits.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  item.status === "Scheduled" 
                    ? "bg-blue-50 text-blue-600 border border-blue-100" 
                    : item.status === "Visited" 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                    : "bg-rose-50 text-rose-600 border border-rose-100"
                }`}>
                  {item.status}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{item.name}</h3>
                <p className="text-[12px] font-mono text-muted-foreground mt-0.5">{item.phone}</p>
              </div>

              <div className="border-t border-border/60 pt-4 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Visit Slot:</span>
                  <span className="font-bold text-slate-900">{item.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Showing Interest:</span>
                  <span className="font-medium text-foreground">{item.roomPref}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Assigned Rep:</span>
                  <span className="font-bold text-primary">{item.staff}</span>
                </div>
              </div>
            </div>

            {item.status === "Scheduled" && (
              <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
                <button 
                  onClick={() => handleStatusChange(item.id, "Visited")}
                  className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Mark Visited
                </button>
                <button 
                  onClick={() => handleStatusChange(item.id, "No Show")}
                  className="px-3 h-10 border border-border rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50"
                >
                  No Show
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}