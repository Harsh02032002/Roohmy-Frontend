import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  CheckCircle, Search, Mail, Phone, Calendar, 
  FileText, ShieldCheck, Download, Ban
} from "lucide-react";

export default function ConfirmedBookingsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");

  const bookingsData = [
    { id: 1, name: "Amit Sharma", room: "101", type: "Double Sharing", tokenPaid: 2000, moveInDate: "20 May 2026", date: "15 May 2026", agreement: "Signed", phone: "+91 98765 43210" },
    { id: 2, name: "Vijay Kumar", room: "101", type: "Double Sharing", tokenPaid: 2000, moveInDate: "22 May 2026", date: "16 May 2026", agreement: "Pending Sign", phone: "+91 98765 11223" },
    { id: 3, name: "Rahul Varma", room: "201", type: "Single Occupancy", tokenPaid: 5000, moveInDate: "25 May 2026", date: "18 May 2026", agreement: "Signed", phone: "+91 91234 56789" }
  ];

  const filteredBookings = bookingsData.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.room.includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Confirmed Bookings" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Confirmed Bookings</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">List of confirmed tenant bookings, agreement signing states, and schedules.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings by name or room..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Tenant Name</th>
                <th className="px-6 py-3.5 font-semibold">Assigned Room</th>
                <th className="px-6 py-3.5 font-semibold">Token Surcharge</th>
                <th className="px-6 py-3.5 font-semibold">Booking Date</th>
                <th className="px-6 py-3.5 font-semibold">Scheduled Check-in</th>
                <th className="px-6 py-3.5 font-semibold">Rent Agreement</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">{b.name}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">Room {b.room}</div>
                    <div className="text-[11px] text-muted-foreground">{b.type}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-emerald-600">₹{b.tokenPaid.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 text-muted-foreground">{b.date}</td>
                  <td className="px-6 py-4 font-bold text-foreground">{b.moveInDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      b.agreement === "Signed" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {b.agreement}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors" title="Download Booking Summary">
                      <Download size={14} />
                    </button>
                    <button className="size-8 rounded-lg border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 inline-flex items-center justify-center transition-colors" title="Cancel Booking">
                      <Ban size={14} />
                    </button>
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