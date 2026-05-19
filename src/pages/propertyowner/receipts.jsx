import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  FileText, Search, Printer, Download, Mail, 
  Phone, IndianRupee, Eye
} from "lucide-react";

export default function ReceiptsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");

  const receiptsData = [
    { id: "REC-2026-08451", tenant: "Amit Sharma", room: "101", date: "08 May 2026", amount: 8800, period: "May 2026", type: "Rent & Utility" },
    { id: "REC-2026-08422", tenant: "Vijay Kumar", room: "101", date: "05 May 2026", amount: 8500, period: "May 2026", type: "Rent Only" },
    { id: "REC-2026-08390", tenant: "Sanjay Dutt", room: "103", date: "02 May 2026", amount: 7000, period: "May 2026", type: "Rent Only" }
  ];

  const filteredReceipts = receiptsData.filter(r => 
    r.tenant.toLowerCase().includes(search.toLowerCase()) ||
    r.room.includes(search) ||
    r.id.includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Issued Receipts" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Issued Receipts</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Search and download generated tax receipts, invoices, and payment summaries.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search receipts by receipt ID, Tenant, or Room..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Receipts Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Receipt ID</th>
                <th className="px-6 py-3.5 font-semibold">Tenant Name</th>
                <th className="px-6 py-3.5 font-semibold">Room</th>
                <th className="px-6 py-3.5 font-semibold">Billing Period</th>
                <th className="px-6 py-3.5 font-semibold">Receipt Type</th>
                <th className="px-6 py-3.5 font-semibold">Amount Paid</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReceipts.map((r) => (
                <tr key={r.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-foreground">{r.id}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{r.tenant}</td>
                  <td className="px-6 py-4 font-bold text-foreground">Room {r.room}</td>
                  <td className="px-6 py-4 text-muted-foreground">{r.period}</td>
                  <td className="px-6 py-4 text-muted-foreground">{r.type}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">₹{r.amount.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors">
                      <Eye size={14} />
                    </button>
                    <button className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors">
                      <Download size={14} />
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