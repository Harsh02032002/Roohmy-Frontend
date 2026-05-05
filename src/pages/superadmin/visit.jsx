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
  Plus, Loader2, Save, Smartphone, Monitor, Info
} from "lucide-react";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Visit() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadVisits = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/visits");
      const list = data?.visits || data || [];
      setVisits(list);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
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
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Field Logistics</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Field Audits, Site Inspection Logistics & Evidence Compliance Matrix</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-slate-800/10 hover:bg-slate-900 transition-all flex items-center gap-2">
               <Plus className="w-3.5 h-3.5" /> Schedule Field Audit
            </button>
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardHorizontal label="Audits Logistics" value={stats.total} trend="+12.4% Flux" up icon={ClipboardCheck} color="blue" />
        <StatCardHorizontal label="Inspection Pulse" value="24m Avg" trend="High Velocity" up icon={Clock} color="indigo" />
        <StatCardHorizontal label="Compliance Index" value={stats.approved} trend="92% Yield" up icon={CheckCircle2} color="emerald" />
        <StatCardHorizontal label="Media Evidence" value="842 Units" trend="+18% Delta" up icon={Camera} color="amber" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">Inspection Registry</h3>
            <div className="flex items-center gap-3">
               <div className="relative group w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search audit trail..." 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
                  />
               </div>
               <button onClick={loadVisits} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                  <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-slate-400 text-[8px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-4">Audit Identity Hub</th>
                     <th className="pb-4">Asset / Hub Context</th>
                     <th className="pb-4 text-center">Personnel mapping</th>
                     <th className="pb-4 text-center">Quality Pulse</th>
                     <th className="pb-4 text-center">Media Stack</th>
                     <th className="pb-4 text-center">Audit Status</th>
                     <th className="pb-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="7" className="py-20 text-center">
                       <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Accessing Logistics Vault Intelligence...</p>
                    </td></tr>
                  ) : filteredVisits.map((v, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                       <td className="py-3">
                          <p className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 shadow-sm inline-block">#{v._id?.substring(0, 6) || "ID-ERR"}</p>
                          <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60 leading-none">{new Date(v.submittedAt || Date.now()).toLocaleDateString()} Cycle</p>
                       </td>
                       <td className="py-3">
                          <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 shrink-0">
                                <Building2 className="w-4.5 h-4.5" />
                             </div>
                             <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-800 leading-none truncate max-w-[150px]">{v.propertyName || v.propertyInfo?.name || "Global Asset"}</p>
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 opacity-60 leading-none truncate">
                                   {v.propertyType || v.propertyInfo?.propertyType || "Core"} • {v.area || v.propertyInfo?.area || "Zone"}
                                </p>
                             </div>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <p className="text-[10px] font-bold text-slate-700 leading-none">{v.staffName || v.submittedBy || "System Admin"}</p>
                          <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60 leading-none">ID: {v.staffId || v.submittedById || "CORE"}</p>
                       </td>
                       <td className="py-3 text-center">
                          <div className="inline-flex flex-col items-center bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg shadow-sm">
                             <div className="flex text-amber-400 text-[8px] gap-0.5">
                                {[...Array(5)].map((_, idx) => (
                                   <Star key={idx} className={cn("w-2 h-2 fill-current", idx >= (v.cleanlinessRating || 0) && "text-slate-200 fill-slate-200")} />
                                ))}
                             </div>
                             <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mt-1 leading-none">{v.cleanlinessRating || 0}/5 Yield</p>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <div className="flex items-center justify-center -space-x-2.5">
                             {(v.photos || []).slice(0, 2).map((img, idx) => (
                               <div key={idx} className="w-8 h-8 rounded-xl border-2 border-white bg-slate-100 overflow-hidden shadow-sm transition-transform group-hover:scale-105 hover:z-20 relative">
                                  <img src={img} className="w-full h-full object-cover" alt="" />
                               </div>
                             ))}
                             {(v.photos || []).length > 2 && (
                               <div className="w-8 h-8 rounded-xl border-2 border-white bg-slate-800 text-white flex items-center justify-center text-[8px] font-bold shadow-sm z-10 transition-transform group-hover:scale-105">
                                  +{(v.photos || []).length - 2}
                                </div>
                             )}
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <span className={cn(
                             "text-[7px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider shadow-sm",
                             v.status === "approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {v.status || "Audit Filed"}
                          </span>
                       </td>
                       <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                             <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm"><Map className="w-3.5 h-3.5" /></button>
                             <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-600 transition-all border border-slate-100 shadow-sm"><Trash className="w-3.5 h-3.5" /></button>
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

function StatCardHorizontal({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    blue: "bg-blue-50 text-blue-600 border-blue-100", 
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100", 
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100", 
    amber: "bg-amber-50 text-amber-600 border-amber-100" 
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
