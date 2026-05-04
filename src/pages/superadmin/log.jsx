import React from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, RefreshCw,
  LayoutGrid, ShieldCheck, Fingerprint, Check, X,
  Eye, ShieldAlert, Activity, CreditCard, Download,
  Smartphone, Monitor, AlertCircle, Sparkles,
  BarChart3, Layers, Database, Lock
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const recentLogs = [
  { user: "Aman", email: "admin@roomhy.com", role: "Super Admin", date: "Oct 24, 2024", time: "10:30 AM", ip: "192.168.1.45", device: "Chrome (Win)", status: "Success", color: "blue" },
  { user: "Rajesh Kumar", email: "PO-BLR-089", role: "Owner", date: "Oct 24, 2024", time: "09:15 AM", ip: "10.0.0.12", device: "Safari (iOS)", status: "Success", color: "indigo" },
  { user: "Security Watch", email: "suresh.r@gmail.com", role: "Visitor", date: "Oct 23, 2024", time: "11:45 PM", ip: "45.22.19.110", device: "Firefox (Linux)", status: "Failed", color: "rose" },
  { user: "Aman", email: "admin@roomhy.com", role: "Super Admin", date: "Oct 23, 2024", time: "05:20 PM", ip: "192.168.1.45", device: "Chrome (Win)", status: "Success", color: "blue" },
];

export default function Log() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">System Velocity & Governance</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Operational Integrity</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Administrative Audit Ledger</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400 max-w-2xl">Monitor real-time system events, track administrative access patterns and audit platform-wide activity velocity for total transparency.</p>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Access Velocity" value="1.2k" trend="+ 15.6% Flux" up icon={Zap} color="blue" />
        <StatCardLarge label="Success Index" value="98.8%" trend="Optimal Uptime" up icon={ShieldCheck} color="green" />
        <StatCardLarge label="Security Alerts" value="03" trend="Audit Required" up={false} icon={ShieldAlert} color="orange" />
        <StatCardLarge label="Active Pulse" value="142" trend="Live Sessions" up icon={Activity} color="indigo" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Governance Intelligence Ledger</h3>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input placeholder="Search audit trails..." className="bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
               </div>
               <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
                  <RefreshCw className="w-5 h-5" />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Administrative Identity</th>
                     <th className="pb-6">Role / Context</th>
                     <th className="pb-6 text-center">Temporal Index</th>
                     <th className="pb-6 text-center">Network Signature</th>
                     <th className="pb-6 text-center">Device Fingerprint</th>
                     <th className="pb-6 text-center">Security Status</th>
                     <th className="pb-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {recentLogs.map((l, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <div className="flex items-center gap-5">
                             <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-xl transition-all border border-white group-hover:scale-105",
                                l.color === "blue" ? "bg-blue-600 shadow-blue-100" :
                                l.color === "indigo" ? "bg-indigo-600 shadow-indigo-100" : "bg-rose-600 shadow-rose-100"
                             )}>
                                {l.user.charAt(0)}
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800">{l.user}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{l.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <span className="text-[9px] font-bold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100 uppercase tracking-widest group-hover:bg-white group-hover:shadow-sm transition-all">
                             {l.role}
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <div className="inline-flex flex-col items-center">
                             <p className="text-sm font-bold text-slate-800">{l.date}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{l.time}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 group-hover:bg-white transition-all shadow-sm">
                             {l.ip}
                          </p>
                       </td>
                       <td className="py-6 text-center">
                          <div className="flex items-center justify-center gap-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                             {l.device.includes('Chrome') ? <Monitor className="w-4 h-4 opacity-30" /> : <Smartphone className="w-4 h-4 opacity-30" />}
                             {l.device}
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[9px] font-bold px-3.5 py-1.5 rounded-full border shadow-sm uppercase tracking-widest",
                            l.status === "Success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                          )}>
                             {l.status === "Success" ? "Optimal" : "Breached"}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                             <Eye className="w-4 h-4" />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Strategic Pagination */}
         <div className="mt-10 flex items-center justify-between border-t border-slate-50 pt-10">
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Live Audit Sync Enabled</p>
            </div>
            <div className="flex items-center gap-3">
               <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-white hover:shadow-md transition-all border border-slate-100 group">
                  <ChevronRight className="w-5 h-5 rotate-180 group-hover:scale-110 transition-transform" />
               </button>
               <div className="flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  <button className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xl shadow-blue-200">1</button>
                  <button className="w-10 h-10 rounded-xl text-slate-400 font-bold text-xs hover:text-blue-600 transition-colors">2</button>
                  <button className="w-10 h-10 rounded-xl text-slate-400 font-bold text-xs hover:text-blue-600 transition-colors">3</button>
               </div>
               <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-white hover:shadow-md transition-all border border-slate-100 group">
                  <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCardLarge({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    blue: "bg-blue-600 shadow-blue-200", 
    green: "bg-emerald-600 shadow-emerald-200", 
    indigo: "bg-indigo-600 shadow-indigo-200", 
    orange: "bg-amber-600 shadow-amber-200" 
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
