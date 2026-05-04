import React, { useEffect, useMemo, useState } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Hourglass,
  Check, X, Eye, ClipboardCheck, AlertTriangle,
  Camera, Map, Star, Edit3, Trash, Bell, BellOff,
  RefreshCw, Download, PauseCircle, ShieldCheck,
  Plus, Loader2, Save, Sparkles, Layers, Box,
  Globe2, IndianRupee, Inbox
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const enquiryStatus = [
  { name: "Approved Flow", value: 1283, color: "#10B981", percent: "45.1%" },
  { name: "Pending Hub", value: 424, color: "#F59E0B", percent: "14.9%" },
  { name: "Rejected Protocol", value: 233, color: "#EF4444", percent: "8.2%" },
  { name: "On Hold Matrix", value: 156, color: "#3B82F6", percent: "5.5%" },
];

const recentEnquiries = [
  { id: "ENQ-12845", name: "Sarah Wilson", property: "Sunrise Heights - A101 Hub", status: "Approved Flow", date: "May 28, 2024", email: "sarah.w@email.com", initial: "SW", color: "blue" },
  { id: "ENQ-12846", name: "Rahul Kapoor", property: "Green Park - B203 Matrix", status: "Pending Hub", date: "May 27, 2024", email: "rahul.k@email.com", initial: "RK", color: "orange" },
  { id: "ENQ-12847", name: "James Miller", property: "Ocean View - C101 Zone", status: "On Hold Matrix", date: "May 26, 2024", email: "james.m@email.com", initial: "JM", color: "indigo" },
  { id: "ENQ-12848", name: "Ananya Iyer", property: "Lake View - D404 Pulse", status: "Rejected Protocol", date: "May 25, 2024", email: "ananya.i@email.com", initial: "AI", color: "rose" },
  { id: "ENQ-12849", name: "David Chen", property: "Prime City - E502 Core", status: "Approved Flow", date: "May 25, 2024", email: "david.c@email.com", initial: "DC", color: "green" },
];

export default function SuperadminEnquiry() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">High-Intent Lead Intelligence</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Marketplace CRM</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Enquiry Resolution Hub</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Manage all incoming property enquiries, track lead conversion velocity and optimize regional resident onboarding with high-fidelity marketplace analytics.</p>
         <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Provision New Inquiry
         </button>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <StatCardLarge icon={Inbox} color="blue" label="Total Inbound" value="2,845" trend="+ 15.2% Flux" up />
        <StatCardLarge icon={Hourglass} color="orange" label="Awaiting Pulse" value="424" trend="+ 5.3% Delta" up />
        <StatCardLarge icon={CheckCircle2} color="green" label="Approved Flow" value="1,283" trend="+ 12.4% Yield" up />
        <StatCardLarge icon={XCircle} color="red" label="Rejected Index" value="233" trend="- 2.1% Alpha" up={false} />
        <StatCardLarge icon={PauseCircle} color="indigo" label="On Hold Hub" value="156" trend="+ 1.2% Zeta" up />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lead Status Matrix */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center">
           <div className="flex items-center justify-between mb-10 w-full">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Lead Yield Matrix</h3>
              <select className="bg-slate-50 border-none rounded-2xl px-5 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                 <option>Monthly Pulse</option>
              </select>
           </div>
           <div className="relative w-80 h-80 mb-10">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={enquiryStatus} dataKey="value" innerRadius={90} outerRadius={130} paddingAngle={10} stroke="none">
                       {enquiryStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-lg" />
                       ))}
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-6xl font-bold text-slate-800 tracking-tighter leading-none">2.8k</p>
                 <p className="text-[10px] text-slate-400 font-bold uppercase mt-4 tracking-widest opacity-60">Master Feed</p>
              </div>
           </div>
           <div className="w-full space-y-4">
              {enquiryStatus.map(s => (
                 <div key={s.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: s.color}} />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-800 transition-colors">{s.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-800">{s.value.toLocaleString()}</span>
                      <span className="text-[9px] font-bold text-slate-400 ml-2 px-2 py-0.5 bg-white rounded-lg border border-slate-100 uppercase tracking-tighter">({s.percent})</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Recent Lead Intelligence */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Lead Intelligence Pulse</h3>
              <div className="flex items-center gap-4">
                 <div className="relative group w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Search high-intent leads..." 
                      className="bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm w-full outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                    />
                 </div>
                 <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                    <RefreshCw className="w-5 h-5" />
                 </button>
              </div>
           </div>
           <div className="space-y-6">
              {recentEnquiries.map(enq => (
                <div key={enq.id} className="flex items-center gap-8 group cursor-pointer p-4 bg-slate-50/50 rounded-[2rem] border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-xl transition-all duration-500">
                   <div className={cn(
                      "w-20 h-20 rounded-[1.75rem] flex items-center justify-center font-bold text-white text-2xl shadow-xl transition-all group-hover:rotate-6",
                      enq.color === "blue" ? "bg-blue-600 shadow-blue-100" :
                      enq.color === "orange" ? "bg-amber-600 shadow-amber-100" :
                      enq.color === "indigo" ? "bg-indigo-600 shadow-indigo-100" :
                      enq.color === "rose" ? "bg-rose-600 shadow-rose-100" :
                      "bg-emerald-600 shadow-emerald-100"
                   )}>
                      {enq.initial}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <p className="text-lg font-bold text-slate-800 truncate leading-none">{enq.name}</p>
                        <span className={cn(
                           "text-[9px] font-bold px-3 py-1 rounded-full border uppercase shadow-sm tracking-widest",
                           enq.status === "Approved Flow" ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50" :
                           enq.status === "Pending Hub" ? "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-50" :
                           enq.status === "On Hold Matrix" ? "bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-50" : "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-50"
                        )}>
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{enq.property}</p>
                   </div>
                   <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-slate-800 leading-none mb-2">{enq.date}</p>
                      <p className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100 shadow-sm inline-block">{enq.id}</p>
                   </div>
                   <button className="w-12 h-12 rounded-[1.25rem] bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-all shadow-sm">
                      <ChevronRight className="w-6 h-6" />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Strategic Conversion Suite */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <ActionCardLarge icon={CheckCircle2} label="Conversion Pipeline" sub="View approved leads" count="1,283" color="green" btnText="Audit Success" />
         <ActionCardLarge icon={PauseCircle} label="Awaiting Hub" sub="Review leads on hold" count="156" color="indigo" btnText="Resolve Pulse" />
         <ActionCardLarge icon={XCircle} label="Rejection Archive" sub="Audit rejected leads" count="233" color="red" btnText="Audit Failures" />
      </div>
    </div>
  );
}

function StatCardLarge({ icon: Icon, color, label, value, trend, up }) {
  const colors = {
    blue: "bg-blue-600 shadow-blue-200",
    orange: "bg-amber-600 shadow-amber-200",
    green: "bg-emerald-600 shadow-emerald-200",
    red: "bg-rose-600 shadow-rose-200",
    indigo: "bg-indigo-600 shadow-indigo-200",
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-8 group hover:translate-y-[-8px] transition-all duration-500">
      <div className={cn("w-20 h-20 rounded-[1.75rem] flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-6", colors[color])}>
         <Icon className="w-10 h-10" />
      </div>
      <div>
         <p className="text-[11px] font-bold text-slate-400 uppercase mb-4 leading-none truncate tracking-widest">{label}</p>
         <p className="text-5xl font-bold text-slate-800 tracking-tighter leading-none">{value}</p>
      </div>
      <div className={cn(
        "flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-2xl w-fit shadow-sm border",
        up ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-rose-600 bg-rose-50 border-rose-100"
      )}>
         {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
         {trend}
      </div>
    </div>
  );
}

function ActionCardLarge({ icon: Icon, label, sub, count, color, btnText }) {
  const colors = {
    green: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600",
    red: "bg-rose-50 text-rose-600 group-hover:bg-rose-600",
  };
  
  return (
    <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group cursor-pointer transition-all hover:translate-y-[-8px]">
       <div className={cn("w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-10 transition-all group-hover:text-white group-hover:scale-110", colors[color])}>
          <Icon className="w-10 h-10" />
       </div>
       <h4 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{label}</h4>
       <p className="text-[10px] text-slate-400 font-bold uppercase mb-10 tracking-widest opacity-60 group-hover:opacity-100">{sub}</p>
       
       <div className="mt-auto flex flex-col items-center">
          <p className="text-5xl font-bold text-slate-800 tracking-tighter leading-none mb-3">{count}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-40">Active Records</p>
       </div>
       
       <button className="mt-12 flex items-center gap-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          {btnText} <ArrowUpRight className="w-5 h-5" />
       </button>
    </div>
  );
}
