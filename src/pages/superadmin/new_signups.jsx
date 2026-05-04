import React, { useEffect, useMemo, useState } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Hourglass,
  Check, X, Eye, UserPlus, ShieldCheck, ShieldAlert,
  RefreshCw, Download, Inbox, CreditCard, Tag,
  BarChart3, Plus, Loader2, Save, Sparkles, Layers,
  Box, Globe2, IndianRupee
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function NewSignups() {
  const [signups, setSignups] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const loadSignups = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/kyc");
      const list = Array.isArray(data) ? data : data?.data || data?.users || [];
      setSignups(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSignups(); }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return signups.filter(s => {
      const name = `${s.firstName || ""} ${s.lastName || ""}`.toLowerCase();
      const matchesSearch = name.includes(q) || (s.email || "").toLowerCase().includes(q);
      const status = (s.status || s.kycStatus || "pending").toLowerCase();
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [signups, query, statusFilter]);

  const stats = useMemo(() => {
    const total = signups.length;
    const pending = signups.filter(s => (s.status || s.kycStatus || "pending") === "pending").length;
    const verified = signups.filter(s => (s.status || s.kycStatus) === "verified").length;
    return { total, pending, verified, rejected: total - pending - verified };
  }, [signups]);

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Onboarding Intelligence Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Identity Governance</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">New Signups & KYC Protocol</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Monitor platform-wide signup velocity, audit new identity applications and manage real-time onboarding flows with total transparency.</p>
         <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Growth Report
         </button>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Signups" value={stats.total} trend="+ 15.4% Growth" up icon={UserPlus} color="blue" />
        <StatCardLarge label="Awaiting KYC" value={stats.pending} trend="Immediate Action" up icon={Hourglass} color="orange" />
        <StatCardLarge label="KYC Success" value={stats.verified} trend="92% Quality" up icon={ShieldCheck} color="green" />
        <StatCardLarge label="Resident Yield" value="82" trend="+ 18% Delta" up icon={Users} color="indigo" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Onboarding Pulse Ledger</h3>
            <div className="flex items-center gap-4">
               <div className="hidden xl:flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  {["all", "pending", "verified", "rejected"].map(f => (
                    <button 
                      key={f} onClick={() => setStatusFilter(f)}
                      className={cn(
                        "px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all",
                        statusFilter === f ? "bg-white text-blue-600 shadow-md border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                       {f === "all" ? "Master Queue" : f}
                    </button>
                  ))}
               </div>
               <div className="relative group w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    value={query} onChange={e => setQuery(e.target.value)}
                    placeholder="Search identity pulse..." 
                    className="bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm w-full outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
               </div>
               <button onClick={loadSignups} className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                  <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Signup Identity</th>
                     <th className="pb-6">User Profile Hub</th>
                     <th className="pb-6">Contact Intelligence</th>
                     <th className="pb-6 text-center">Type Profile</th>
                     <th className="pb-6 text-center">Status Hub Index</th>
                     <th className="pb-6 text-right">Onboarding Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="6" className="py-32 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Growth Vault...</p>
                       </div>
                    </td></tr>
                  ) : filtered.map((s, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <p className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100 shadow-sm inline-block">#{s.id || s.loginId || s._id?.substring(0,8) || "N/A"}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest leading-none">Temporal: 2 Days ago</p>
                       </td>
                       <td className="py-6">
                          <div className="flex items-center gap-5">
                             <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-xl transition-all">
                                {(s.firstName || "U").charAt(0).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800">{s.firstName} {s.lastName}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Awaiting Verification</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-slate-700">{s.email}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight opacity-70">{s.phone}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100 group-hover:bg-white transition-colors">
                             {s.role || "Resident"} Hub
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                             "text-[9px] font-bold px-3.5 py-1.5 rounded-full border shadow-sm uppercase tracking-widest",
                             (s.status || s.kycStatus) === "verified" ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50" : 
                             (s.status || s.kycStatus) === "rejected" ? "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-50" :
                             "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-50"
                          )}>
                             {s.status || s.kycStatus || "Pending Flow"}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             {(s.status || s.kycStatus) !== "verified" && (
                               <button className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-100">
                                  <Check className="w-4 h-4" /> Verify Hub
                               </button>
                             )}
                             {(s.status || s.kycStatus) === "pending" && (
                               <button className="flex items-center gap-2 bg-rose-50 text-rose-600 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-rose-100">
                                  <X className="w-4 h-4" /> Reject Flow
                               </button>
                             )}
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100 shadow-sm">
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
    </div>
  );
}

function StatCardLarge({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    blue: "bg-blue-600 shadow-blue-200", 
    indigo: "bg-indigo-600 shadow-indigo-200", 
    green: "bg-emerald-600 shadow-emerald-200", 
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
