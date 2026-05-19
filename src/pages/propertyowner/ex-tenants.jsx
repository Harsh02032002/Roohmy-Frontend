import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Users, Search, Clock, Archive, Phone, Mail, 
  FileText, ShieldCheck, Download
} from "lucide-react";

export default function ExTenantsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");

  const exTenantsData = [
    { id: 101, name: "Rahul Varma", room: "201", duration: "8 Months", checkoutDate: "15 May 2026", phone: "+91 91234 56789", email: "rahul.v@gmail.com", refundStatus: "Fully Refunded" },
    { id: 102, name: "Karan Johar", room: "201", duration: "12 Months", checkoutDate: "10 May 2026", phone: "+91 92345 67890", email: "karan.j@gmail.com", refundStatus: "Fully Refunded" },
    { id: 103, name: "Deepak Chawla", room: "203", duration: "6 Months", checkoutDate: "28 Apr 2026", phone: "+91 93456 78901", email: "deepak.c@gmail.com", refundStatus: "Deductions Applied" }
  ];

  const filteredExTenants = exTenantsData.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.room.includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Former Residents" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Former Residents</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Historical records, previous security deposit refunds, and ledger archives of checked-out tenants.</p>
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

      {/* Ex-Tenants Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Tenant Name</th>
                <th className="px-6 py-3.5 font-semibold">Stayed Room</th>
                <th className="px-6 py-3.5 font-semibold">Stay Duration</th>
                <th className="px-6 py-3.5 font-semibold">Checkout Date</th>
                <th className="px-6 py-3.5 font-semibold">Contact Details</th>
                <th className="px-6 py-3.5 font-semibold">Security Clearance</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredExTenants.map((t) => (
                <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground">Room {t.room}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t.duration}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t.checkoutDate}</td>
                  <td className="px-6 py-4 space-y-0.5">
                    <div className="text-[12px] font-medium text-foreground flex items-center gap-1">
                      <Phone size={12} className="text-muted-foreground/60" /> {t.phone}
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Mail size={12} className="text-muted-foreground/60" /> {t.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      t.refundStatus === "Fully Refunded" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {t.refundStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors">
                      <FileText size={14} />
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
