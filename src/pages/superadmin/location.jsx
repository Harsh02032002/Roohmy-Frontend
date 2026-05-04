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
  Navigation, Compass, Plus, Loader2, Save
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function SuperadminLocation() {
  const [tab, setTab] = useState("cities");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadLocations = async () => {
    try {
      setLoading(true);
      const [citiesData, areasData] = await Promise.all([
        fetchJson("/api/locations/cities"),
        fetchJson("/api/locations/areas")
      ]);
      setCities(citiesData?.data || []);
      setAreas(areasData?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLocations(); }, []);

  const stats = useMemo(() => {
    return { totalCities: cities.length, totalAreas: areas.length, density: "High", topGrowth: "Kota Hub", reach: "94.2%", expansion: "+ 2 Flux" };
  }, [cities, areas]);

  const activeList = tab === "cities" ? cities : areas;
  const filteredList = activeList.filter(item => (item.name || "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Geospatial Intelligence Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Market Expansion</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Territorial Sovereignty Ledger</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Monitor platform-wide geographic reach, audit territorial asset density and manage regional expansion protocols with real-time geospatial analytics.</p>
         <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Provision New Territory
         </button>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Global Cities" value={stats.totalCities} trend="Sovereign Index" up icon={Navigation} color="blue" />
        <StatCardLarge label="Operational Areas" value={stats.totalAreas} trend="Granular Hubs" up icon={MapPin} color="indigo" />
        <StatCardLarge label="Asset Density" value={stats.density} trend="Market Leader" up icon={Building2} color="green" />
        <StatCardLarge label="Growth Velocity" value={stats.topGrowth} trend="High Flux" up icon={Zap} color="orange" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-10">
               <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Geographic Sovereignty Ledger</h3>
               <div className="hidden xl:flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  {["cities", "areas"].map(f => (
                    <button 
                      key={f} onClick={() => setTab(f)}
                      className={cn(
                        "px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all",
                        tab === f ? "bg-white text-blue-600 shadow-md border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                       {f === "cities" ? "Global Cities" : "Granular Areas"}
                    </button>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search territory pulse..." 
                    className="bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm w-full outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
               </div>
               <button onClick={loadLocations} className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                  <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Territory Identity</th>
                     <th className="pb-6">Jurisdictional Context</th>
                     <th className="pb-6 text-center">Geography Preview</th>
                     <th className="pb-6 text-center">Operational Status Hub</th>
                     <th className="pb-6 text-right">Territorial Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="5" className="py-32 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Geographic Vault...</p>
                       </div>
                    </td></tr>
                  ) : filteredList.map((item, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <div className="flex items-center gap-5">
                             <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-xl transition-all">
                                {item.name?.charAt(0).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800">{item.name || "Unknown Territory"}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">ID: {item._id?.substring(0,8).toUpperCase()}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <p className="text-sm font-bold text-slate-700">{tab === "cities" ? item.state : (item.cityName || item.city?.name)}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight opacity-70">{tab === "cities" ? "Regional State Hub" : "Metropolitan City Hub"}</p>
                       </td>
                       <td className="py-6 text-center">
                          <div className="w-24 h-14 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden mx-auto shadow-sm group-hover:scale-110 transition-transform relative">
                             {item.imageUrl ? (
                               <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center text-slate-200">
                                  <ImageIcon className="w-6 h-6" />
                               </div>
                             )}
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                             "text-[9px] font-bold px-3.5 py-1.5 rounded-full border shadow-sm uppercase tracking-widest",
                             "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50"
                          )}>
                             {item.status || "Active Hub"}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100 shadow-sm">
                                <Edit3 className="w-5 h-5" />
                             </button>
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-md transition-all border border-slate-100 shadow-sm">
                                <Trash2 className="w-5 h-5" />
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
