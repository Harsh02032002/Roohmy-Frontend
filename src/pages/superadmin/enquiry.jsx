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
  Globe2, IndianRupee, Inbox, Smartphone, Monitor, Info
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const enquiryStatus = [
  { name: "Approved Flow", value: 1283, color: "#10b981", percent: "45.1%" },
  { name: "Pending Hub", value: 424, color: "#f59e0b", percent: "14.9%" },
  { name: "Rejected Protocol", value: 233, color: "#ef4444", percent: "8.2%" },
  { name: "On Hold Matrix", value: 156, color: "#2563eb", percent: "5.5%" },
];

const recentEnquiries = [
  { id: "ENQ-12845", name: "Sarah Wilson", property: "Sunrise Heights", status: "Approved Flow", date: "May 28", initial: "SW", color: "blue" },
  { id: "ENQ-12846", name: "Rahul Kapoor", property: "Green Park", status: "Pending Hub", date: "May 27", initial: "RK", color: "amber" },
  { id: "ENQ-12847", name: "James Miller", property: "Ocean View", status: "On Hold Matrix", date: "May 26", initial: "JM", color: "indigo" },
  { id: "ENQ-12848", name: "Ananya Iyer", property: "Lake View", status: "Rejected Protocol", date: "May 25", initial: "AI", color: "rose" },
];

export default function SuperadminEnquiry() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Lead Intelligence</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">High-Intent Inbound Pipeline & Real-time Conversion CRM Analytics Matrix</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-slate-800/10 hover:bg-slate-900 transition-all flex items-center gap-2">
               <Plus className="w-3.5 h-3.5" /> Provision Enquiry
            </button>
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCardHorizontal label="Total Inbound" value="2,845" trend="+15.2% Flux" up icon={Inbox} color="blue" />
        <StatCardHorizontal label="Awaiting Audit" value="424" trend="+5.3% Delta" up icon={Hourglass} color="amber" />
        <StatCardHorizontal label="Approved Yield" value="1,283" trend="+12.4% Alpha" up icon={CheckCircle2} color="emerald" />
        <StatCardHorizontal label="Rejection Index" value="233" trend="-2.1% Zeta" up={false} icon={XCircle} color="rose" />
        <StatCardHorizontal label="Processing Hub" value="156" trend="+1.2% Theta" up icon={PauseCircle} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Yield Matrix Chart */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">Lead Yield Matrix</h3>
              <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                 <RefreshCw className="w-3.5 h-3.5" />
              </button>
           </div>
           <div className="flex flex-col items-center">
              <div className="relative w-40 h-40">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={enquiryStatus} dataKey="value" innerRadius={35} outerRadius={55} paddingAngle={10} stroke="none">
                          {enquiryStatus.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-xl font-bold text-slate-800 tracking-tight leading-none">2.8k</p>
                    <p className="text-[7px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">Total Pipeline</p>
                 </div>
              </div>
              <div className="w-full mt-8 space-y-2">
                 {enquiryStatus.map(s => (
                    <div key={s.name} className="flex items-center justify-between group p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-100">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full shadow-sm" style={{backgroundColor: s.color}} />
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none">{s.name}</span>
                       </div>
                       <p className="text-[10px] font-bold text-slate-800 leading-none">{s.value} <span className="text-[8px] text-slate-400 ml-1 font-medium opacity-60">({s.percent})</span></p>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Lead Pulse Ledger */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">Inbound Pulse Ledger</h3>
              <div className="flex items-center gap-3">
                 <div className="relative group w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                    <input 
                      value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Search leads..." 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
                    />
                 </div>
                 <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                    <RefreshCw className="w-3.5 h-3.5" />
                 </button>
              </div>
           </div>
           <div className="space-y-3">
              {recentEnquiries.map(enq => (
                <div key={enq.id} className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all duration-300">
                   <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-sm transition-transform group-hover:scale-105 shrink-0",
                      enq.color === "blue" ? "bg-blue-600 shadow-blue-50" :
                      enq.color === "amber" ? "bg-amber-600 shadow-amber-50" :
                      enq.color === "indigo" ? "bg-indigo-600 shadow-indigo-50" : "bg-rose-600 shadow-rose-50"
                   )}>
                      {enq.initial}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] font-bold text-slate-800 truncate leading-none">{enq.name}</p>
                        <span className={cn(
                           "text-[7px] font-bold px-1.5 py-0.5 rounded-lg border uppercase tracking-wider shadow-sm",
                           enq.status === "Approved Flow" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                           enq.status === "Pending Hub" ? "bg-amber-50 text-amber-600 border-amber-100" :
                           enq.status === "On Hold Matrix" ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-rose-50 text-rose-600 border-rose-100"
                        )}>
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest truncate mt-1.5 opacity-60 leading-none">{enq.property} Portfolio</p>
                   </div>
                   <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold text-slate-800 leading-none">{enq.date}</p>
                      <p className="text-[8px] font-mono font-bold text-blue-600 mt-1.5 uppercase tracking-tighter opacity-70 leading-none">{enq.id}</p>
                   </div>
                   <button className="p-1.5 rounded-lg text-slate-300 hover:text-slate-800 hover:bg-white hover:shadow-sm transition-all"><ChevronRight className="w-4 h-4" /></button>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Conversion Suite Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
         <ActionTile icon={CheckCircle2} label="Conversion Pipeline" count="1,283" color="emerald" sub="Verified Approvals" />
         <ActionTile icon={PauseCircle} label="Processing Hub" count="156" color="indigo" sub="Awaiting Audit" />
         <ActionTile icon={XCircle} label="Rejection Archive" count="233" color="rose" sub="Audit Failures" />
      </div>
    </div>
  );
}

function StatCardHorizontal({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    blue: "bg-blue-50 text-blue-600 border-blue-100", 
    amber: "bg-amber-50 text-amber-600 border-amber-100", 
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100", 
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100" 
  };
  
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-md flex items-start gap-3 group hover:translate-y-[-2px] transition-all">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm transition-transform group-hover:scale-105", bgColors[color])}>
         <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
         <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none truncate">{label}</p>
         <p className="text-xl font-bold text-slate-800 tracking-tight leading-none mb-2">{value}</p>
         <div className={cn(
           "flex items-center gap-1 text-[7px] font-bold uppercase",
           up ? "text-emerald-600" : "text-rose-600"
         )}>
            {up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
            {trend}
         </div>
      </div>
    </div>
  );
}

function ActionTile({ icon: Icon, label, count, color, sub }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100"
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg shadow-slate-200/50 group cursor-pointer hover:translate-y-[-4px] transition-all duration-300">
       <div className="flex items-center justify-between mb-6">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border transition-transform group-hover:scale-110 group-hover:rotate-3", colors[color])}>
             <Icon className="w-5 h-5" />
          </div>
          <button className="text-[8px] font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 flex items-center gap-1 leading-none">Audit Flow <ChevronRight className="w-3 h-3" /></button>
       </div>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none opacity-60">{label}</p>
       <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{count}</p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-60 leading-none">{sub}</p>
       </div>
    </div>
  );
}
