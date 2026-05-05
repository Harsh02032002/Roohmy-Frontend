import React, { useEffect, useMemo, useState } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, RefreshCw,
  LayoutGrid, CreditCard, Wallet, Download, Loader2,
  ShieldCheck, Banknote, Map
} from "lucide-react";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Owner() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");

  const loadOwners = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/owners");
      const baseOwners = Array.isArray(data) ? data : (data.data || data.owners || []);
      setOwners(baseOwners);
    } catch (err) { console.error("Failed to load owners:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadOwners(); }, []);

  const filteredOwners = useMemo(() => {
    const query = search.trim().toLowerCase();
    return owners.filter(o => {
      const id = (o.loginId || o._id || "").toString().toLowerCase();
      const name = (o.name || o.profile?.name || "").toLowerCase();
      const area = (o.locationCode || o.checkinArea || "").toLowerCase();
      const matchesSearch = id.includes(query) || name.includes(query);
      const matchesArea = areaFilter === "all" || area.includes(areaFilter.toLowerCase());
      return matchesSearch && matchesArea;
    });
  }, [owners, search, areaFilter]);

  const stats = useMemo(() => {
    const total = owners.length;
    const verified = owners.filter(o => (o.kycStatus === "verified" || o.kyc?.status === "verified")).length;
    const properties = owners.reduce((acc, o) => acc + (o.propertiesCount || 1), 0);
    return { total, verified, pending: total - verified, properties };
  }, [owners]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;
    try {
      await fetchJson(`/api/owners/${encodeURIComponent(id)}`, { method: "DELETE" });
      loadOwners();
    } catch (err) { alert("Failed to delete owner"); }
  };

  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Supplier Hub</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Asset Stakeholder Governance & Supply Chain Network Intelligence Matrix</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-slate-800/10 hover:bg-slate-900 transition-all flex items-center gap-2">
               <Download className="w-3.5 h-3.5" /> Export Supplier DB
            </button>
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardHorizontal label="Total Suppliers" value={stats.total} trend="+14.2% Delta" up icon={Users} color="indigo" />
        <StatCardHorizontal label="Verified Compliance" value={stats.verified} trend="Verified SLA" up icon={ShieldCheck} color="emerald" />
        <StatCardHorizontal label="Asset Network" value={`${stats.properties} Units`} trend="Supply Index" up icon={Building2} color="blue" />
        <StatCardHorizontal label="Settlement Pulse" value="₹45.2L" trend="+12.1% Yield" up icon={Banknote} color="amber" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">Supplier Directory</h3>
            <div className="flex items-center gap-3">
               <div className="relative group w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search stakeholders..." 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
                  />
               </div>
               <button onClick={loadOwners} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                  <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-slate-400 text-[8px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-4">Stakeholder Identity Hub</th>
                     <th className="pb-4">Portfolio Pulse</th>
                     <th className="pb-4 text-center">Settlement Intel</th>
                     <th className="pb-4 text-center">Zone Mapping</th>
                     <th className="pb-4 text-center">Audit Status</th>
                     <th className="pb-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="6" className="py-20 text-center">
                       <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Accessing Supplier Ledger Intelligence...</p>
                    </td></tr>
                  ) : filteredOwners.map((o, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                       <td className="py-3">
                          <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-xs shadow-sm transition-transform group-hover:scale-105 shrink-0">
                                {(o.name || "U").charAt(0).toUpperCase()}
                             </div>
                             <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-800 leading-none truncate max-w-[150px]">{o.name || "Unknown Owner"}</p>
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 opacity-60 truncate">ID: {o.loginId || o._id?.substring(0,8)}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-3">
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold text-slate-700 leading-none truncate max-w-[120px]">{o.propertyTitle || "Global Portfolio"}</p>
                             <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 uppercase leading-none opacity-60">
                                <Building2 className="w-3 h-3" />
                                {o.propertiesCount || 1} Operational Assets
                             </div>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <div className="inline-flex flex-col items-center gap-1">
                             <p className="text-[10px] font-bold text-slate-800 leading-none">{o.checkinBankName || "Standard Settlement"}</p>
                             <span className="text-[7px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-lg border border-blue-100 shadow-sm uppercase tracking-wider leading-none">Channel Verified</span>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <span className="text-[8px] font-mono bg-slate-50 text-slate-500 px-2 py-0.5 rounded-lg border border-slate-100 font-bold uppercase shadow-sm">
                             {o.locationCode || o.checkinArea || "IND-CORE"}
                          </span>
                       </td>
                       <td className="py-3 text-center">
                          <span className={cn(
                             "text-[7px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider shadow-sm",
                             (o.kycStatus === "verified" || o.kyc?.status === "verified") ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {(o.kycStatus || o.kyc?.status || "Audit Pending")}
                          </span>
                       </td>
                       <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                             <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm"><ChevronRight className="w-3.5 h-3.5" /></button>
                             <button 
                                onClick={(e) => { e.stopPropagation(); handleDelete(o.loginId || o._id); }}
                                className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-600 transition-all border border-slate-100 shadow-sm"
                             >
                                <Trash2 className="w-3.5 h-3.5" />
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

function StatCardHorizontal({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100", 
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100", 
    blue: "bg-blue-50 text-blue-600 border-blue-100", 
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
