import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  LogOut, Search, ShieldAlert, Phone, IndianRupee, 
  Trash2, CheckCircle2, AlertTriangle, FileText
} from "lucide-react";

export default function MoveoutRequestsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([
    { id: 1, name: "Rohan Mehra", room: "202", date: "Tomorrow, 10:00 AM", phone: "+91 92345 11223", dues: 2500, deposit: 10000, reason: "Job transfer to another city" },
    { id: 2, name: "Sanjay Dutt", room: "103", date: "30 May 2026", phone: "+91 95432 10987", dues: 0, deposit: 8000, reason: "Moving in with family" }
  ]);

  const handleCheckoutTenant = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const filteredRequests = requests.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.room.includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Move-out Notices" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Move-out Notices</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Approve exit schedules, calculate deposit refunds, and clear outstanding balances.</p>
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

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRequests.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <LogOut size={20} />
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  item.dues > 0 
                    ? "bg-rose-50 text-rose-600 border border-rose-100" 
                    : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                }`}>
                  {item.dues > 0 ? `Dues Pending: ₹${item.dues}` : "No Dues"}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{item.name}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-1">Room {item.room} • Exit Date: <strong className="text-foreground">{item.date}</strong></p>
                <p className="text-[12.5px] text-muted-foreground mt-2 italic bg-muted/30 p-2.5 rounded-lg border border-border/40">
                  " {item.reason} "
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground font-medium block">Security Deposit Held</span>
                  <strong className="text-[14px] text-foreground">₹{item.deposit.toLocaleString("en-IN")}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground font-medium block">Refund Calculated</span>
                  <strong className="text-[14px] text-emerald-600">₹{(item.deposit - item.dues).toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
              <button 
                onClick={() => handleCheckoutTenant(item.id)}
                className="flex-1 h-11 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Clear Dues & Checkout
              </button>
              <button className="px-4 h-11 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground">
                Reject Exit
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
