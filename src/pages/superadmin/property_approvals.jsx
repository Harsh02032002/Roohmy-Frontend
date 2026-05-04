import React from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Hourglass,
  Check, X, Eye, ShieldCheck, ClipboardCheck,
  RefreshCw, AlertCircle, Sparkles, Layers,
  Box, Globe2, IndianRupee, Inbox
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const queue = [
  { id: "L-2547", title: "Silver Heights PG", owner: "Priya Verma", loc: "Pune Hub", type: "Premium PG", submitted: "May 20, 02:15 PM", waiting: "2h 30m", status: "Awaiting Pulse", initial: "SH", color: "blue" },
  { id: "L-2549", title: "Crystal Apartments", owner: "Rohit Sharma", loc: "Mumbai Zone", type: "Luxury Flat", submitted: "May 20, 11:00 AM", waiting: "5h 45m", status: "Awaiting Pulse", initial: "CA", color: "indigo" },
  { id: "L-2550", title: "Lotus Villa", owner: "Meera Iyer", loc: "Chennai Core", type: "Bunglow Hub", submitted: "May 20, 09:20 AM", waiting: "7h 25m", status: "Awaiting Pulse", initial: "LV", color: "amber" },
  { id: "L-2551", title: "Sunrise PG", owner: "Anil Kapoor", loc: "Delhi Matrix", type: "Budget PG", submitted: "May 19, 06:00 PM", waiting: "22h", status: "Priority Queue", initial: "SP", color: "rose" },
  { id: "L-2552", title: "Ocean Breeze", owner: "Kavita Singh", loc: "Goa Shore", type: "Service Flat", submitted: "May 19, 04:30 PM", waiting: "23h 30m", status: "Priority Queue", initial: "OB", color: "emerald" },
];

export default function SuperadminPropertyApprovals() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Asset Verification Citadel</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Portfolio Governance</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Property Approval Protocol</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Audit platform-wide asset submissions, perform real-time identity and property verification, and manage regional resident onboarding liquidity with audit-ready precision.</p>
         <div className="flex items-center gap-3">
            <button className="bg-white text-slate-400 border border-slate-100 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase hover:bg-slate-50 transition-all flex items-center gap-2">
               <RefreshCw className="w-4 h-4" /> Sync Queue
            </button>
            <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
               <ShieldCheck className="w-4 h-4" /> Run Global Audit
            </button>
         </div>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Awaiting Pulse" value="18" trend="+ 5 Priority Hubs" up icon={Hourglass} color="orange" />
        <StatCardLarge label="Success Yield" value="12" trend="Audit Compliance" up icon={CheckCircle2} color="green" />
        <StatCardLarge label="Avg Audit Time" value="3.4h" trend="Within SLA Velocity" up icon={Clock} color="blue" />
        <StatCardLarge label="SLA Compliance" value="98%" trend="+ 1.2% Delta" up icon={ShieldCheck} color="indigo" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Verification Intelligence Ledger</h3>
            <div className="flex items-center gap-4">
               <div className="relative group w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input placeholder="Search pending assets..." className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
               </div>
               <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                  <Filter className="w-5 h-5" />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Asset Identity Hub</th>
                     <th className="pb-6">Stakeholder Profile</th>
                     <th className="pb-6 text-center">Temporal Index</th>
                     <th className="pb-6 text-center">SLA Pulse</th>
                     <th className="pb-6 text-center">Verification Status</th>
                     <th className="pb-6 text-right">Operational Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {queue.map((q, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <div className="flex items-center gap-5">
                             <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-xl transition-all border border-white group-hover:scale-105",
                                q.color === "blue" ? "bg-blue-600 shadow-blue-100" :
                                q.color === "indigo" ? "bg-indigo-600 shadow-indigo-100" :
                                q.color === "amber" ? "bg-amber-600 shadow-amber-100" :
                                q.color === "rose" ? "bg-rose-600 shadow-rose-100" : "bg-emerald-600 shadow-emerald-100"
                             )}>
                                {q.initial}
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800 leading-none mb-1.5">{q.title}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">{q.type} • {q.loc}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-slate-800">{q.owner}</p>
                             <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 shadow-sm inline-block">{q.id}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <div className="inline-flex flex-col items-center">
                             <p className="text-sm font-bold text-slate-800">{q.submitted.split(',')[0]}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest opacity-60">{q.submitted.split(',')[1]}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                             "text-[9px] font-bold px-3.5 py-1.5 rounded-xl border shadow-sm uppercase tracking-widest",
                             q.waiting.includes('h') ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                             {q.waiting} Delay
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                             "text-[9px] font-bold px-3.5 py-1.5 rounded-full border shadow-sm uppercase tracking-widest",
                             q.status === "Priority Queue" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-slate-50 text-slate-400 border-slate-100"
                          )}>
                             {q.status}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-emerald-600 hover:text-white transition-all shadow-md border border-emerald-100">
                                <CheckCircle2 className="w-4 h-4" /> Approve
                             </button>
                             <button className="flex items-center gap-2 bg-rose-50 text-rose-600 px-6 py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-rose-600 hover:text-white transition-all shadow-md border border-rose-100">
                                <XCircle className="w-4 h-4" /> Reject
                             </button>
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                                <Eye className="w-5 h-5" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Strategic Audit Suite */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <ActionCardLarge icon={ClipboardCheck} label="Compliance Audit" sub="Review platform safety standards" count="24" color="blue" btnText="Start Protocol" />
         <ActionCardLarge icon={ShieldCheck} label="Identity Pulse" sub="Bulk verify stakeholder identity" count="18" color="indigo" btnText="Sync Verification" />
         <ActionCardLarge icon={AlertCircle} label="Risk Assessment" sub="Audit high-risk asset submissions" count="03" color="rose" btnText="Analyze Matrix" />
      </div>
    </div>
  );
}

function StatCardLarge({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    orange: "bg-amber-600 shadow-amber-200", 
    green: "bg-emerald-600 shadow-emerald-200", 
    blue: "bg-blue-600 shadow-blue-200", 
    indigo: "bg-indigo-600 shadow-indigo-200" 
  };
  
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-8 group hover:translate-y-[-8px] transition-all duration-500">
      <div className={cn("w-20 h-20 rounded-[1.75rem] flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-6", bgColors[color])}>
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
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
    indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600",
    rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-600",
  };
  
  return (
    <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group cursor-pointer transition-all hover:translate-y-[-8px]">
       <div className={cn("w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-10 transition-all group-hover:text-white group-hover:scale-110 shadow-sm", colors[color])}>
          <Icon className="w-10 h-10" />
       </div>
       <h4 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{label}</h4>
       <p className="text-[10px] text-slate-400 font-bold uppercase mb-10 tracking-widest opacity-60 group-hover:opacity-100">{sub}</p>
       
       <div className="mt-auto flex flex-col items-center">
          <p className="text-5xl font-bold text-slate-800 tracking-tighter leading-none mb-3">{count}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-40">Active Hubs</p>
       </div>
       
       <button className="mt-12 flex items-center gap-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          {btnText} <ArrowUpRight className="w-5 h-5" />
       </button>
    </div>
  );
}
