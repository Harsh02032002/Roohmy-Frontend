import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Inbox, Search, MessageSquare, Phone, Calendar, 
  CheckCircle2, XCircle, Clock, AlertCircle, ArrowRight 
} from "lucide-react";

export default function NewEnquiriesPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [enquiries, setEnquiries] = useState([
    { id: 1, name: "Rohit Sharma", phone: "+91 98765 00112", email: "rohit.sharma@gmail.com", roomPref: "Single Occupancy AC", budget: "₹12,000/mo", date: "Just now", source: "Website Form" },
    { id: 2, name: "Sneha Reddy", phone: "+91 95432 99887", email: "sneha.reddy@yahoo.com", roomPref: "Double Sharing AC", budget: "₹8,500/mo", date: "2 hours ago", source: "Instagram Ad" },
    { id: 3, name: "Arjun Kapoor", phone: "+91 91234 55667", email: "arjun.k@gmail.com", roomPref: "Triple Sharing Non-AC", budget: "₹6,000/mo", date: "5 hours ago", source: "Google Maps" },
    { id: 4, name: "Neha Dhupia", phone: "+91 92345 66778", email: "neha.d@gmail.com", roomPref: "Single Occupancy AC", budget: "₹13,000/mo", date: "1 day ago", source: "Referral" }
  ]);

  const handleAction = (id, action) => {
    // Remove or update
    setEnquiries(prev => prev.filter(e => e.id !== id));
  };

  const filteredEnquiries = enquiries.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.roomPref.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="New Enquiries" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">New Enquiries</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Review inbound tenant prospects, budget limits, and immediately trigger replies.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries by name or room preference..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of New Enquiries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEnquiries.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Inbox size={20} />
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {item.source}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{item.name}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Clock size={12} /> Received {item.date}
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Preference:</span>
                  <span className="font-bold text-foreground">{item.roomPref}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Target Budget:</span>
                  <span className="font-bold text-slate-900">{item.budget}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Mobile:</span>
                  <span className="font-medium text-foreground">{item.phone}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
              <button 
                onClick={() => handleAction(item.id, "followup")}
                className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
              >
                Mark Follow-up
              </button>
              <button 
                onClick={() => handleAction(item.id, "visit")}
                className="h-10 px-3 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground inline-flex items-center justify-center"
              >
                <Calendar size={14} className="mr-1" /> Visit
              </button>
              <button 
                onClick={() => handleAction(item.id, "reject")}
                className="size-10 border border-border rounded-xl text-rose-600 hover:bg-rose-50 inline-flex items-center justify-center"
              >
                <XCircle size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
