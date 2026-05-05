import React, { useState, useEffect, useMemo } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, RefreshCw, Layers
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function SuperadminProperties() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const getApiUrl = () =>
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:5001" : "https://api.roomhy.com";

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${getApiUrl()}/api/properties?t=${Date.now()}`);
      const data = await res.json();
      if (data.success && data.properties) {
          setProperties(data.properties.map(p => ({
            id: p._id,
            title: p.title || p.propertyInfo?.name || p.propertyName || "Property",
            locationCode: p.locationCode || p.visitId || "-",
            city: p.propertyInfo?.city || p.city || "-",
            address: p.propertyInfo?.address || p.address || "-",
            ownerName: p.owner?.name || p.propertyInfo?.ownerName || p.ownerName || "-",
            ownerLoginId: p.ownerLoginId || p.generatedCredentials?.loginId || "-",
            status: p.isLiveOnWebsite ? "Active" : "Inactive",
            views: p.views || 0,
            clicks: p.clicks || 0,
            image: p.featuredImage || (p.images && p.images[0]) || ""
          })));
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchProperties(); }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [properties, searchTerm, filterStatus]);

  const stats = useMemo(() => {
    const total = properties.length;
    const active = properties.filter(p => p.status === "Active").length;
    return { total, active, inactive: total - active, views: properties.reduce((a, b) => a + b.views, 0) };
  }, [properties]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] gap-4">
        <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scanning Inventory Ledger...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Property Directory</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Platform Inventory Pulse & Asset Intelligence</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="relative group w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
               <input 
                 value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                 placeholder="Search assets, owners..." 
                 className="w-full bg-white border border-slate-100 rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold shadow-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
               />
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-emerald-200/10 hover:bg-emerald-700 transition-all flex items-center gap-2">
               <Sheet className="w-3.5 h-3.5" /> Export
            </button>
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <StatCardHorizontal icon={Building2} label="Total Assets" value={stats.total} trend="+12.5% Delta" up color="blue" />
        <StatCardHorizontal icon={CheckCircle2} label="Live on Web" value={stats.active} trend="Active Flow" up color="emerald" />
        <StatCardHorizontal icon={Clock} label="Under Review" value={stats.inactive} trend="Audit Queue" up color="amber" />
        <StatCardHorizontal icon={Activity} label="Total Views" value={stats.views.toLocaleString()} trend="+25.4% Yield" up color="indigo" />
        <StatCardHorizontal icon={Zap} label="Avg Occupancy" value="84%" trend="Market Lead" up color="blue" />
      </div>

      {/* Main Ledger */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Inventory Ledger</h3>
            <div className="flex items-center gap-3">
               <select 
                 value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                 className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-[9px] font-bold text-slate-500 outline-none hover:bg-slate-100 transition-all cursor-pointer"
               >
                  <option value="all">Global Pulse</option>
                  <option value="Active">Active Segments</option>
                  <option value="Inactive">Review Pending</option>
               </select>
               <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                  <Filter className="w-4 h-4" />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-slate-400 text-[8px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-4">Asset Identity</th>
                     <th className="pb-4">Stakeholder Details</th>
                     <th className="pb-4 text-center">Engagement Pulse</th>
                     <th className="pb-4 text-center">Zone</th>
                     <th className="pb-4 text-center">Pulse Status</th>
                     <th className="pb-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredProperties.map((p, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                       <td className="py-3">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-8 rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-slate-50 shrink-0">
                                {p.image ? (
                                  <img src={p.image} className="w-full h-full object-cover" alt="" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon className="w-4 h-4" /></div>
                                )}
                             </div>
                             <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-800 leading-tight truncate max-w-[200px]">{p.title}</p>
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest truncate">{p.city}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-3">
                          <p className="text-[10px] font-bold text-slate-800 truncate max-w-[120px]">{p.ownerName}</p>
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter truncate">{p.ownerLoginId}</p>
                       </td>
                       <td className="py-3 text-center">
                          <div className="inline-flex items-center gap-3">
                             <div className="text-center">
                                <p className="text-[10px] font-bold text-slate-800">{p.views.toLocaleString()}</p>
                                <p className="text-[7px] text-slate-400 font-bold uppercase">Views</p>
                             </div>
                             <div className="text-center">
                                <p className="text-[10px] font-bold text-blue-600">{p.clicks.toLocaleString()}</p>
                                <p className="text-[7px] text-slate-400 font-bold uppercase">Clicks</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <span className="text-[9px] font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg border border-blue-100 font-bold shadow-sm">
                             {p.locationCode}
                          </span>
                       </td>
                       <td className="py-3 text-center">
                          <span className={cn(
                             "text-[7px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider",
                             p.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                          )}>
                             {p.status}
                          </span>
                       </td>
                       <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm"><ChevronRight className="w-3.5 h-3.5" /></button>
                             <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-600 transition-all border border-slate-100 shadow-sm"><Trash2 className="w-3.5 h-3.5" /></button>
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

function StatCardHorizontal({ icon: Icon, color, label, value, trend, up }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-md flex items-start gap-3 group hover:translate-y-[-2px] transition-all">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm transition-transform group-hover:scale-105", colors[color])}>
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
