import React, { useState, useEffect, useMemo } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Hourglass,
  Check, X, Eye, ClipboardCheck, AlertTriangle,
  Camera, Map, Star, Edit3, Trash, UserCheck,
  RefreshCw, Download, Inbox, CreditCard, Tag,
  BarChart3, Plus, Loader2, FolderTree, Building, Hotel, Castle, Upload,
  Sparkles
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const iconOptions = [
  { value: "pg", label: "PG", icon: Users, color: "blue" },
  { value: "coliving", label: "Co-Living", icon: Users, color: "emerald" },
  { value: "building", label: "Apartment", icon: Building, color: "indigo" },
  { value: "castle", label: "Villa", icon: Castle, color: "amber" },
  { value: "home", label: "Independent House", icon: Home, color: "blue" },
  { value: "hotel", label: "Hotel / Service Apartment", icon: Hotel, color: "rose" },
];

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/property-types");
      if (data.success) setCats(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const filteredCats = useMemo(() => {
    const q = search.toLowerCase();
    return cats.filter(c => c.title.toLowerCase().includes(q));
  }, [cats, search]);

  const stats = useMemo(() => {
    return { total: cats.length, subTypes: 24, popular: "Co-Living", growth: "+ 14%", active: "94%", new: 2 };
  }, [cats]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] gap-4">
        <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Taxonomy Vault...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Inventory Taxonomy Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Platform Config</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Classification Schema</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Define and manage the platform-wide classification schema for all property assets and real-estate inventory types.</p>
         <div className="flex items-center gap-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input 
                 value={search} onChange={e => setSearch(e.target.value)}
                 placeholder="Search categories..." 
                 className="bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
               />
            </div>
            <button className="bg-slate-800 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
               <Plus className="w-4 h-4" /> New Category
            </button>
         </div>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Classification Tiers" value={stats.total} trend="Global Schema" up icon={FolderTree} color="blue" />
        <StatCardLarge label="Market Leader" value={stats.popular} trend="Highest Velocity" up icon={Star} color="orange" />
        <StatCardLarge label="Growth Index" value={stats.growth} trend="+ 2.4% MoM" up icon={BarChart3} color="green" />
        <StatCardLarge label="Active Coverage" value={stats.active} trend="Elite Deployment" up icon={CheckCircle2} color="indigo" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {filteredCats.map((c, i) => {
            const opt = iconOptions.find(o => o.value === c.category) || iconOptions[2];
            const Icon = opt.icon;
            return (
              <div key={i} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 group hover:translate-y-[-8px] transition-all duration-500 flex flex-col relative overflow-hidden">
                 <div className="flex items-start justify-between mb-10">
                    <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-12", 
                      opt.color === "blue" ? "bg-blue-600 shadow-blue-200" : 
                      opt.color === "emerald" ? "bg-emerald-600 shadow-emerald-200" : 
                      opt.color === "indigo" ? "bg-indigo-600 shadow-indigo-200" : 
                      opt.color === "amber" ? "bg-amber-600 shadow-amber-200" : 
                      "bg-rose-600 shadow-rose-200"
                    )}>
                       <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                       <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-slate-100"><Edit3 className="w-4 h-4" /></button>
                       <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-slate-100"><Trash2 className="w-4 h-4" /></button>
                    </div>
                 </div>

                 <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{c.title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Identity Token: {c.category}</p>
                    
                    <div className="grid grid-cols-3 gap-3 my-8">
                       {(c.images || []).slice(0, 3).map((img, idx) => (
                         <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 transition-transform hover:scale-105">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                         </div>
                       ))}
                       {(c.images || []).length === 0 && (
                         <div className="col-span-3 aspect-[3/1] rounded-2xl bg-slate-50 flex items-center justify-center border border-dashed border-slate-100 text-slate-300">
                            <ImageIcon className="w-8 h-8 opacity-50" />
                         </div>
                       )}
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global Pulse</span>
                       <span className="text-xs font-bold text-emerald-600 uppercase mt-1">{c.status || "Active"}</span>
                    </div>
                    <button className="text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors flex items-center gap-1 group/btn">
                       Schema Audit <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
            );
         })}
         
         <button className="bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-slate-800 hover:bg-white hover:shadow-2xl transition-all group min-h-[350px]">
            <div className="w-16 h-16 rounded-[1.75rem] bg-white flex items-center justify-center text-slate-300 group-hover:bg-slate-800 group-hover:text-white transition-all shadow-sm">
               <Plus className="w-8 h-8" />
            </div>
            <div className="text-center">
               <h4 className="text-lg font-bold text-slate-800 tracking-tight">Register Tier</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Scale Platform Inventory</p>
            </div>
         </button>
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
         <p className="text-[11px] font-bold text-slate-400 uppercase mb-4 leading-none truncate">{label}</p>
         <p className="text-5xl font-bold text-slate-800 tracking-tighter leading-none">{value}</p>
      </div>
      <div className={cn(
        "flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-2xl w-fit",
        up ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : "text-rose-600 bg-rose-50 border border-rose-100"
      )}>
         {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
         {trend}
      </div>
    </div>
  );
}
