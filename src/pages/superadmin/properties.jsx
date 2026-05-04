import React, { useState, useEffect, useMemo } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";

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

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
               <Home className="w-6 h-6" />
            </div>
            <div>
               <h1 className="text-2xl font-black text-slate-800 tracking-tight">All Properties</h1>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Management {">"} Property Inventory</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input 
                 value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                 placeholder="Search property, owner..." 
                 className="bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-72 outline-none focus:border-blue-500 transition-all" 
               />
            </div>
            <DateRangePill value="All Cities" />
         </div>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
         <StatCardSmall label="Total Properties" value={stats.total} trend="+ 12.5%" up icon={Building2} color="blue" />
         <StatCardSmall label="Live on Website" value={stats.active} trend="+ 8.4%" up icon={CheckCircle2} color="emerald" />
         <StatCardSmall label="Under Review" value={stats.inactive} trend="- 2.1%" up={false} icon={Clock} color="amber" />
         <StatCardSmall label="Total Views" value={stats.views} trend="+ 25.4%" up icon={Activity} color="purple" />
         <StatCardSmall label="Avg Occupancy" value="84%" trend="+ 4.2%" up icon={Zap} color="blue" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Property Directory</h3>
            <div className="flex items-center gap-4">
               <select 
                 value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                 className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-black text-slate-500 outline-none hover:bg-slate-100 transition-all cursor-pointer"
               >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
               </select>
               <button className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all">
                  <Sheet className="w-4 h-4" /> Export
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                     <th className="pb-6">Property Profile</th>
                     <th className="pb-6">Owner Details</th>
                     <th className="pb-6 text-center">Engagement</th>
                     <th className="pb-6 text-center">Zone</th>
                     <th className="pb-6 text-center">Status</th>
                     <th className="pb-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="6" className="py-20 text-center text-slate-400 font-black uppercase tracking-widest">Scanning Inventory...</td></tr>
                  ) : filteredProperties.map((p, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-sm relative group-hover:border-blue-300 transition-all">
                                {p.image ? (
                                  <img src={p.image} className="w-full h-full object-cover" alt="" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon className="w-5 h-5" /></div>
                                )}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-800">{p.title}</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{p.city}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="space-y-1">
                             <p className="text-xs font-black text-slate-700">{p.ownerName}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{p.ownerLoginId}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <div className="flex flex-col items-center gap-1">
                             <p className="text-xs font-black text-slate-800">{p.views} Views</p>
                             <p className="text-[9px] text-slate-400 font-bold uppercase">{p.clicks} Clicks</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg border border-blue-100 font-bold">
                             {p.locationCode}
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[9px] font-black px-3 py-1 rounded-full border shadow-sm uppercase tracking-widest",
                            p.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                          )}>
                             {p.status}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all">
                                <ChevronRight className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-rose-600 hover:border-rose-100 transition-all">
                                <Trash2 className="w-4 h-4" />
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

function StatCardSmall({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { blue: "bg-blue-500 shadow-blue-200", emerald: "bg-emerald-500 shadow-emerald-200", amber: "bg-amber-500 shadow-amber-200", rose: "bg-rose-500 shadow-rose-200", purple: "bg-purple-500 shadow-purple-200" };
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg flex items-center gap-5 group hover:-translate-y-1 transition-all">
       <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0 transition-transform group-hover:scale-110", bgColors[color])}>
          <Icon className="w-7 h-7" />
       </div>
       <div className="min-w-0">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{label}</p>
          <p className="text-2xl font-black text-slate-800 mb-0.5 truncate">{value}</p>
          <p className={cn("text-[9px] font-black", up ? "text-emerald-600" : "text-rose-600")}>{trend} {up ? "↑" : "↓"}</p>
       </div>
    </div>
  );
}
