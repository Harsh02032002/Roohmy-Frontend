import React, { useEffect, useMemo, useState } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Hourglass,
  Check, X, Eye, ClipboardCheck, AlertTriangle,
  Camera, Map, Star, Edit3, Trash, RefreshCw,
  Sparkles, Layers, Box, Globe2, IndianRupee,
  Plus, Loader2, Save
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Visit() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const loadVisits = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/visits");
      const list = data?.visits || data || [];
      setVisits(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadVisits(); }, []);

  const filteredVisits = useMemo(() => {
    const q = search.toLowerCase();
    return visits.filter(v => {
      const propName = (v.propertyName || v.propertyInfo?.name || "").toLowerCase();
      const staffName = (v.staffName || v.submittedBy || "").toLowerCase();
      return propName.includes(q) || staffName.includes(q);
    });
  }, [visits, search]);

  const stats = useMemo(() => {
    const total = visits.length;
    const approved = visits.filter(v => v.status === "approved").length;
    return { total, approved, pending: total - approved };
  }, [visits]);

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Field Intelligence Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Operational Audits</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Field Inspection Ledger</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Monitor platform-wide field visits, audit property cleanliness and manage real-time inspection reports with high-fidelity media evidence.</p>
         <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Schedule New Audit
         </button>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Field Audits" value={stats.total} trend="+ 12.4% Flux" up icon={ClipboardCheck} color="blue" />
        <StatCardLarge label="Audit Velocity" value="24m" trend="Efficient Flow" up icon={Clock} color="indigo" />
        <StatCardLarge label="Approval Index" value={stats.approved} trend="92% Quality" up icon={CheckCircle2} color="green" />
        <StatCardLarge label="Media Portfolio" value="842" trend="+ 18% Delta" up icon={Camera} color="orange" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Inspection Intelligence Portfolio</h3>
            <div className="flex items-center gap-4">
               <div className="relative group w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search audit trail..." 
                    className="bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm w-full outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
               </div>
               <button onClick={loadVisits} className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                  <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1400px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Audit Identity</th>
                     <th className="pb-6">Property Context</th>
                     <th className="pb-6 text-center">Field Personnel</th>
                     <th className="pb-6 text-center">Cleanliness Index</th>
                     <th className="pb-6 text-center">Media Evidence</th>
                     <th className="pb-6 text-center">Status Hub Index</th>
                     <th className="pb-6 text-right">Audit Protocols</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="7" className="py-32 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Inspection Vault...</p>
                       </div>
                    </td></tr>
                  ) : filteredVisits.map((v, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <div className="flex flex-col gap-1.5">
                             <p className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100 shadow-sm inline-block w-fit">#{v._id?.substring(0, 8)}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">{new Date(v.submittedAt || Date.now()).toLocaleDateString()}</p>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl transition-all">
                                <Building2 className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800">{v.propertyName || v.propertyInfo?.name || "Unknown Asset"}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest opacity-70">
                                   {v.propertyType || v.propertyInfo?.propertyType} • {v.area || v.propertyInfo?.area}
                                </p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-sm font-bold text-slate-700">{v.staffName || v.submittedBy}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60">ID: {v.staffId || v.submittedById}</p>
                       </td>
                       <td className="py-6 text-center">
                          <div className="inline-flex flex-col items-center gap-1.5 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-[1.25rem] group-hover:bg-white group-hover:shadow-md transition-all">
                             <div className="flex text-amber-400 text-xs">
                                {"★".repeat(Math.min(5, v.cleanlinessRating || 0))}
                                <span className="text-slate-200">{"★".repeat(5 - Math.min(5, v.cleanlinessRating || 0))}</span>
                             </div>
                             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Index: {v.cleanlinessRating || 0}/5</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <div className="flex items-center justify-center -space-x-3">
                             {(v.photos || []).slice(0, 3).map((img, idx) => (
                               <div key={idx} className="w-10 h-10 rounded-xl border-2 border-white bg-slate-100 overflow-hidden shadow-md transition-transform group-hover:scale-110 hover:z-10 relative">
                                  <img src={img} className="w-full h-full object-cover" alt="" />
                               </div>
                             ))}
                             {(v.photos || []).length > 3 && (
                               <div className="w-10 h-10 rounded-xl border-2 border-white bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold shadow-md z-10 transition-transform group-hover:scale-110">
                                  +{(v.photos || []).length - 3}
                               </div>
                             )}
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                             "text-[9px] font-bold px-3.5 py-1.5 rounded-full border shadow-sm uppercase tracking-widest",
                             v.status === "approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {v.status || "Submitted Flow"}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100" title="Geospatial Audit">
                                <Map className="w-5 h-5" />
                             </button>
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                                <Edit3 className="w-5 h-5" />
                             </button>
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                                <Trash className="w-5 h-5" />
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
    orange: "bg-rose-600 shadow-rose-200" 
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
