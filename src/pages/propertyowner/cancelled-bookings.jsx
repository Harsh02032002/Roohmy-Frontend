import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Ban, Search, FileText, Download, User, Info, Calendar
} from "lucide-react";

export default function CancelledBookingsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");

  const cancelledBookingsData = [
    { id: 1, name: "Ishan Kishan", room: "103", type: "Triple Sharing", tokenPaid: 1500, cancelDate: "18 May 2026", reason: "Found flat closer to office", refund: "Retained (No Refund)" },
    { id: 2, name: "Hardik Pandya", room: "104", type: "Double Sharing", tokenPaid: 2000, cancelDate: "15 May 2026", reason: "Personal emergency", refund: "Refunded 100%" }
  ];

  const filteredBookings = cancelledBookingsData.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.room.includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Cancelled Reservations" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Cancelled Reservations</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Historical records of cancelled booking requests, refund details, and reasons.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cancelled bookings by name or room..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of Cancelled Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBookings.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <Ban size={20} />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  item.refund.includes("Refunded") 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                    : "bg-rose-50 text-rose-600 border border-rose-100"
                }`}>
                  {item.refund}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{item.name}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-1">Room {item.room} • Cancelled: <strong className="text-foreground">{item.cancelDate}</strong></p>
                <p className="text-[12.5px] text-muted-foreground mt-2 italic bg-muted/40 p-3 rounded-xl border border-border/40">
                  " {item.reason} "
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground font-medium block">Token Amount Paid</span>
                  <strong className="text-[14px] text-foreground">₹{item.tokenPaid.toLocaleString("en-IN")}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground font-medium block font-bold text-rose-600">Refund Settlement</span>
                  <strong className="text-[14px] text-rose-600">
                    {item.refund.includes("Refunded") ? `₹${item.tokenPaid}` : "₹0"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
              <button className="flex-1 h-11 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground inline-flex items-center justify-center">
                <FileText size={14} className="mr-1.5" /> View Settlement details
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
