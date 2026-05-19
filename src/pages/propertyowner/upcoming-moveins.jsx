import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  CalendarClock, Search, UserPlus, Phone, Mail, 
  ArrowRight, CheckCircle, Clock, AlertTriangle
} from "lucide-react";

export default function UpcomingMoveinsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [moveins, setMoveins] = useState([
    { id: 1, name: "Pawan Kalyan", room: "104", bed: "A", date: "Today, 11:00 AM", phone: "+91 98765 22334", status: "Ready to Check-in", deposit: "Paid" },
    { id: 2, name: "Mahesh Babu", room: "103", bed: "B", date: "22 May 2026", phone: "+91 98765 33445", status: "Document Verification Pending", deposit: "Pending ₹5,000" },
    { id: 3, name: "Allu Arjun", room: "203", bed: "B", date: "25 May 2026", phone: "+91 98765 44556", status: "Deposit Confirmed", deposit: "Paid" }
  ]);

  const handleCheckIn = (id) => {
    setMoveins(prev => prev.filter(m => m.id !== id));
  };

  const filteredMoveins = moveins.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.room.includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Upcoming Move-ins" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Upcoming Move-ins</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Manage future check-in dates, security deposits, and document upload statuses.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Tenant Name or Room..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Moveins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMoveins.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <CalendarClock size={20} />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  item.deposit === "Paid" 
                    ? "bg-emerald-50 text-emerald-600" 
                    : "bg-amber-50 text-amber-600 animate-pulse"
                }`}>
                  Deposit: {item.deposit}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{item.name}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-1">Assigned Bed: <strong className="text-foreground">Room {item.room} • Bed {item.bed}</strong></p>
                <p className="text-[12.5px] text-muted-foreground flex items-center gap-1 mt-1">
                  <Phone size={12} /> {item.phone}
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-medium">Check-in Date:</span>
                  <span className="font-bold text-foreground">{item.date}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-medium">Process Status:</span>
                  <span className="font-bold text-primary">{item.status}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 mt-4 pt-4 flex gap-2">
              <button 
                onClick={() => handleCheckIn(item.id)}
                className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
              >
                Approve Check-in
              </button>
              <button className="px-3 h-10 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground">
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
