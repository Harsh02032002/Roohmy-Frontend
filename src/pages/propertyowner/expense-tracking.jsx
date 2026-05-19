import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { Plus, Search, TrendingDown, IndianRupee } from "lucide-react";

const mock = [
  { id:1, category:"Maintenance", desc:"Plumber charges", amount:2500, date:"15 May", paid:"Cash" },
  { id:2, category:"Electricity", desc:"May electricity bill", amount:8200, date:"14 May", paid:"UPI" },
  { id:3, category:"Cleaning", desc:"Monthly housekeeping", amount:3500, date:"12 May", paid:"Bank" },
  { id:4, category:"Internet", desc:"Broadband monthly", amount:1800, date:"10 May", paid:"Auto-debit" },
  { id:5, category:"Repairs", desc:"Water motor repair", amount:4500, date:"8 May", paid:"Cash" },
];

export default function ExpenseTracking() {
  const owner = getOwnerRuntimeSession();
  const [search, setSearch] = useState("");
  if (!owner?.loginId && typeof window !== "undefined") { window.location.href = "/propertyowner/ownerlogin"; return null; }
  const filtered = mock.filter(e => !search || e.desc.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()));
  const total = mock.reduce((s,e)=>s+e.amount,0);
  return (
    <PropertyOwnerLayout owner={owner} title="Expenses" onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Expenses</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Track all property expenses in one place.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 md:mt-2"><Plus className="size-4"/> Add Expense</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-border bg-red-50 p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3"><span className="text-[12.5px] text-muted-foreground font-medium">This Month</span><TrendingDown className="size-4 text-red-400"/></div>
          <div className="font-serif text-[26px] leading-none text-foreground">₹{total.toLocaleString("en-IN")}</div>
          <div className="text-[11.5px] text-muted-foreground mt-1.5">{mock.length} transactions</div>
        </div>
        <div className="rounded-2xl border border-border bg-muted/40 p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3"><span className="text-[12.5px] text-muted-foreground font-medium">Avg per day</span><IndianRupee className="size-4 text-muted-foreground"/></div>
          <div className="font-serif text-[26px] leading-none text-foreground">₹{Math.round(total/30).toLocaleString("en-IN")}</div>
        </div>
        <div className="rounded-2xl border border-border bg-muted/40 p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3"><span className="text-[12.5px] text-muted-foreground font-medium">Largest Expense</span><IndianRupee className="size-4 text-muted-foreground"/></div>
          <div className="font-serif text-[26px] leading-none text-foreground">₹{Math.max(...mock.map(e=>e.amount)).toLocaleString("en-IN")}</div>
        </div>
      </div>
      <div className="relative mb-4"><Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search expenses…" className="w-full h-10 pl-9 pr-3 rounded-lg bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"/></div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto"><table className="w-full text-[13px]">
          <thead><tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
            <th className="px-4 py-3 font-semibold">Category</th><th className="px-4 py-3 font-semibold">Description</th><th className="px-4 py-3 font-semibold">Amount</th><th className="px-4 py-3 font-semibold">Payment</th><th className="px-4 py-3 font-semibold">Date</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {filtered.map(e=>(
              <tr key={e.id} className="hover:bg-muted/40 transition-colors">
                <td className="px-4 py-3"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-medium bg-muted text-muted-foreground">{e.category}</span></td>
                <td className="px-4 py-3 text-foreground">{e.desc}</td>
                <td className="px-4 py-3 font-medium text-destructive">-₹{e.amount.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.paid}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </PropertyOwnerLayout>
  );
}