import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { AlertCircle, CheckCircle2, Clock, Plus, Search } from "lucide-react";

const Pill = ({ tone="muted", children }) => {
  const t = { success:"bg-green-100 text-green-700", warning:"bg-amber-100 text-amber-700", danger:"bg-red-100 text-red-700", muted:"bg-gray-100 text-gray-600" };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11.5px] font-medium ${t[tone]||t.muted}`}>{children}</span>;
};

const StatCard = ({ label, value, icon:Icon, tone="muted" }) => {
  const bg = { muted:"bg-muted/40", warning:"bg-amber-50", success:"bg-green-50", danger:"bg-red-50" };
  return (
    <div className={`rounded-2xl border border-border p-4 shadow-soft ${bg[tone]||bg.muted}`}>
      <div className="flex items-center justify-between mb-3"><span className="text-[12.5px] text-muted-foreground font-medium">{label}</span>{Icon&&<Icon className="size-4 text-muted-foreground"/>}</div>
      <div className="font-serif text-[26px] leading-none text-foreground">{value}</div>
    </div>
  );
};

const mock = [
  { id:1, tenant:"Aarav Sharma", room:"A-101", issue:"Water leakage in bathroom", status:"open", date:"15 May", priority:"high" },
  { id:2, tenant:"Vihaan Gupta", room:"B-102", issue:"AC not cooling", status:"in-progress", date:"14 May", priority:"medium" },
  { id:3, tenant:"Aditya Iyer", room:"C-103", issue:"Light bulb replacement needed", status:"resolved", date:"12 May", priority:"low" },
  { id:4, tenant:"Rohan Mehta", room:"D-104", issue:"WiFi connectivity issues", status:"open", date:"11 May", priority:"medium" },
];

export default function Complaints() {
  const owner = getOwnerRuntimeSession();
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  if (!owner?.loginId && typeof window !== "undefined") { window.location.href = "/propertyowner/ownerlogin"; return null; }
  const filtered = mock.filter(c => (tab==="all"||c.status===tab) && (!search||c.tenant.toLowerCase().includes(search.toLowerCase())||c.issue.toLowerCase().includes(search.toLowerCase())));
  return (
    <PropertyOwnerLayout owner={owner} title="Complaints" onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Complaints</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Track and resolve tenant complaints from one place.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 md:mt-2"><Plus className="size-4"/> Add Complaint</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total" value={mock.length} icon={AlertCircle} tone="muted"/>
        <StatCard label="Open" value={mock.filter(c=>c.status==="open").length} icon={AlertCircle} tone="danger"/>
        <StatCard label="In Progress" value={mock.filter(c=>c.status==="in-progress").length} icon={Clock} tone="warning"/>
        <StatCard label="Resolved" value={mock.filter(c=>c.status==="resolved").length} icon={CheckCircle2} tone="success"/>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 mb-4 border-b border-border">
        {[{k:"all",l:"All"},{k:"open",l:"Open"},{k:"in-progress",l:"In Progress"},{k:"resolved",l:"Resolved"}].map(({k,l}) => (
          <button key={k} onClick={()=>setTab(k)} className={`px-3 py-2 text-[13px] font-medium border-b-2 -mb-px transition-colors ${tab===k?"border-primary text-foreground":"border-transparent text-muted-foreground hover:text-foreground"}`}>{l}</button>
        ))}
      </div>
      <div className="relative mb-4"><Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search complaints…" className="w-full h-10 pl-9 pr-3 rounded-lg bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"/></div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead><tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
              <th className="px-4 py-3 font-semibold">Tenant</th><th className="px-4 py-3 font-semibold">Room</th><th className="px-4 py-3 font-semibold">Issue</th><th className="px-4 py-3 font-semibold">Priority</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold">Date</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{c.tenant}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.room}</td>
                  <td className="px-4 py-3 text-foreground">{c.issue}</td>
                  <td className="px-4 py-3"><Pill tone={c.priority==="high"?"danger":c.priority==="medium"?"warning":"muted"}>{c.priority}</Pill></td>
                  <td className="px-4 py-3"><Pill tone={c.status==="resolved"?"success":c.status==="in-progress"?"warning":"danger"}>{c.status}</Pill></td>
                  <td className="px-4 py-3 text-muted-foreground">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}