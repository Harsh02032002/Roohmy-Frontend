import React, { useEffect, useMemo, useState } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Hourglass,
  Check, X, Eye, ClipboardCheck, AlertTriangle,
  Camera, Map, Star, Edit3, Trash, UserCheck,
  RefreshCw, Download, Inbox, CreditCard, Tag,
  BarChart3, Plus, Loader2, Save, Sparkles, Layers,
  Box, Globe2, IndianRupee
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function SuperadminWebsiteenq() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/website-enquiry/all");
      const list = data?.enquiries || data || [];
      setEnquiries(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEnquiries(); }, []);

  const filteredEnquiries = useMemo(() => {
    const q = search.toLowerCase();
    return enquiries.filter(e => {
      const matchSearch = (e.property_name || "").toLowerCase().includes(q) || 
                          (e.owner_name || "").toLowerCase().includes(q) ||
                          (e.locality || "").toLowerCase().includes(q);
      const matchStatus = !statusFilter || e.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [enquiries, search, statusFilter]);

  const stats = useMemo(() => {
    const total = enquiries.length;
    const pending = enquiries.filter(e => e.status === "pending").length;
    const assigned = enquiries.filter(e => e.status === "assigned").length;
    const cities = new Set(enquiries.map(e => e.city)).size;
    return { total, pending, assigned, cities };
  }, [enquiries]);

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Digital Lead Intelligence Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Marketplace Growth</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Website Inbound Ledger</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Monitor platform-wide digital inquiries, track response velocity and optimize inbound lead conversion across regional property portfolios.</p>
         <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Marketplace Data
         </button>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Inbound" value={stats.total} trend="+ 14.2% Delta" up icon={Inbox} color="blue" />
        <StatCardLarge label="Awaiting Pulse" value={stats.pending} trend="High Priority" up icon={Hourglass} color="orange" />
        <StatCardLarge label="Lead Velocity" value="1.8h" trend="Optimized Flow" up icon={Clock} color="green" />
        <StatCardLarge label="Conv. Efficiency" value="23.4%" trend="+ 4.2% Yield" up icon={Zap} color="indigo" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-10">
               <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Digital Lead Portfolio</h3>
               <div className="hidden xl:flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  {["", "pending", "assigned"].map(f => (
                    <button 
                      key={f} onClick={() => setStatusFilter(f)}
                      className={cn(
                        "px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all",
                        statusFilter === f ? "bg-white text-blue-600 shadow-md border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                       {f === "" ? "Master Feed" : f}
                    </button>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search digital leads..." 
                    className="bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm w-full outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
               </div>
               <button onClick={loadEnquiries} className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                  <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Lead Identity</th>
                     <th className="pb-6">Target Property</th>
                     <th className="pb-6">Issuer Information</th>
                     <th className="pb-6 text-center">Regional Zone</th>
                     <th className="pb-6 text-center">Revenue Pulse</th>
                     <th className="pb-6 text-center">Lead Status</th>
                     <th className="pb-6 text-right">Lead Protocols</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="7" className="py-32 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Inbound Vault...</p>
                       </div>
                    </td></tr>
                  ) : filteredEnquiries.map((e, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <p className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100 shadow-sm inline-block">#{e.id?.substring(0, 8).toUpperCase()}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest leading-none">{new Date(e.created_at || Date.now()).toLocaleDateString()}</p>
                       </td>
                       <td className="py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl transition-all">
                                <Building2 className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800">{e.property_name || "Digital Prospect"}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest opacity-70">
                                   {e.property_type?.toUpperCase()} • {e.gender_suitability} Matrix
                                </p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-slate-700">{e.owner_name}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight opacity-60">{e.owner_phone}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-xs font-bold text-slate-800 uppercase tracking-widest">{e.city}</p>
                          <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase opacity-60">{e.locality || "National Zone"}</p>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-base font-bold text-slate-800 tracking-tighter">₹ {e.rent?.toLocaleString()}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">Revenue Target</p>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                             "text-[9px] font-bold px-3.5 py-1.5 rounded-full border shadow-sm uppercase tracking-widest",
                             e.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-50" : "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50"
                          )}>
                             {e.status === "pending" ? "Lead Pulse" : `Routed: ${e.assigned_to}`}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100">
                                <UserCheck className="w-4 h-4" /> Route Lead
                             </button>
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
