import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { Search, Plus, Phone, MessageCircle, MoreHorizontal } from "lucide-react";

const Pill = ({ tone="muted", children }) => {
  const t = { success:"bg-green-100 text-green-700", warning:"bg-amber-100 text-amber-700", muted:"bg-gray-100 text-gray-600", info:"bg-blue-100 text-blue-700" };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11.5px] font-medium ${t[tone]||t.muted}`}>{children}</span>;
};

const leads = [
  { id:1, name:"Rahul Verma", phone:"+91 98001 11111", source:"Website", interest:"Single AC Room", status:"new", date:"Today" },
  { id:2, name:"Priya Singh", phone:"+91 98002 22222", source:"WhatsApp", interest:"Double Sharing", status:"follow-up", date:"Yesterday" },
  { id:3, name:"Amit Kumar", phone:"+91 98003 33333", source:"Referral", interest:"Triple Sharing", status:"site-visit", date:"14 May" },
  { id:4, name:"Neha Sharma", phone:"+91 98004 44444", source:"Instagram", interest:"Single Room", status:"new", date:"13 May" },
];

export default function Enquiry() {
  const owner = getOwnerRuntimeSession();
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  if (!owner?.loginId && typeof window !== "undefined") { window.location.href = "/propertyowner/ownerlogin"; return null; }
  const filtered = leads.filter(l=>(tab==="all"||l.status===tab)&&(!search||l.name.toLowerCase().includes(search.toLowerCase())));
  return (
    <PropertyOwnerLayout owner={owner} title="Leads & Enquiries" onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Leads &amp; Enquiries</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Track every lead and convert them to tenants.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 md:mt-2"><Plus className="size-4"/> Add Lead</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[{l:"Total",v:leads.length},{l:"New",v:leads.filter(x=>x.status==="new").length},{l:"Follow-up",v:leads.filter(x=>x.status==="follow-up").length},{l:"Site Visit",v:leads.filter(x=>x.status==="site-visit").length}].map(({l,v})=>(
          <div key={l} className="rounded-2xl border border-border bg-card p-4 shadow-soft text-center">
            <div className="font-serif text-[28px] text-foreground">{v}</div>
            <div className="text-[12px] text-muted-foreground mt-1">{l}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-1.5 mb-4 border-b border-border">
        {[{k:"all",l:"All"},{k:"new",l:"New"},{k:"follow-up",l:"Follow-up"},{k:"site-visit",l:"Site Visit"}].map(({k,l})=>(
          <button key={k} onClick={()=>setTab(k)} className={`px-3 py-2 text-[13px] font-medium border-b-2 -mb-px transition-colors ${tab===k?"border-primary text-foreground":"border-transparent text-muted-foreground hover:text-foreground"}`}>{l}</button>
        ))}
      </div>
      <div className="relative mb-4"><Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leads…" className="w-full h-10 pl-9 pr-3 rounded-lg bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"/></div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto"><table className="w-full text-[13px]">
          <thead><tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
            <th className="px-4 py-3 font-semibold">Name</th><th className="px-4 py-3 font-semibold">Contact</th><th className="px-4 py-3 font-semibold">Interest</th><th className="px-4 py-3 font-semibold">Source</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold">Date</th><th className="px-4 py-3 w-10"></th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {filtered.map(l=>(
              <tr key={l.id} className="hover:bg-muted/40 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{l.name}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-1 text-muted-foreground text-[11.5px]"><Phone className="size-3"/>{l.phone}</div></td>
                <td className="px-4 py-3 text-muted-foreground">{l.interest}</td>
                <td className="px-4 py-3"><Pill tone="info">{l.source}</Pill></td>
                <td className="px-4 py-3"><Pill tone={l.status==="new"?"info":l.status==="site-visit"?"success":"warning"}>{l.status}</Pill></td>
                <td className="px-4 py-3 text-muted-foreground">{l.date}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-1"><button className="size-8 rounded-md hover:bg-muted grid place-items-center"><MessageCircle className="size-3.5 text-green-600"/></button><button className="size-8 rounded-md hover:bg-muted grid place-items-center"><MoreHorizontal className="size-4 text-muted-foreground"/></button></div></td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </PropertyOwnerLayout>
  );
}
