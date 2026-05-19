import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  FileText, Search, Download, CheckCircle2, 
  ArrowUpRight, IndianRupee, Tag
} from "lucide-react";

export default function ServiceHistoryPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");

  const logs = [
    { id: "SRV-4821", desc: "Main line water valve pipe repair", vendor: "Gupta Plumbers", amount: 4500, date: "15 May 2026", status: "Paid" },
    { id: "SRV-4790", desc: "Kitchen chimney duct deep clean", vendor: "Sparkle Cleaners", amount: 2500, date: "12 May 2026", status: "Paid" },
    { id: "SRV-4711", desc: "Corridor backup generator diesel top-up", vendor: "HP Fuel Station", amount: 6000, date: "08 May 2026", status: "Paid" }
  ];

  const filteredLogs = logs.filter(l => 
    l.desc.toLowerCase().includes(search.toLowerCase()) ||
    l.vendor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Asset Audits" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Service History</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Historical records of completed asset repairs, plumbing servicing bills, and diesel invoices.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service logs by description or vendor..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Service history list table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Service ID</th>
                <th className="px-6 py-3.5 font-semibold">Description</th>
                <th className="px-6 py-3.5 font-semibold">Vendor</th>
                <th className="px-6 py-3.5 font-semibold">Completed Date</th>
                <th className="px-6 py-3.5 font-semibold">Service Fee</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-foreground">{l.id}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{l.desc}</td>
                  <td className="px-6 py-4 text-muted-foreground">{l.vendor}</td>
                  <td className="px-6 py-4 text-muted-foreground">{l.date}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">₹{l.amount.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 text-right">
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
