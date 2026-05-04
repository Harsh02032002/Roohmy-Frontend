import React, { useEffect, useMemo, useState } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Hourglass,
  Check, X, Eye, ClipboardCheck, AlertTriangle,
  Camera, Star, Edit3, Trash, UserCheck,
  RefreshCw, Download, Inbox, CreditCard, Tag,
  BarChart3, Plus, Loader2, Sparkles, Globe2,
  ExternalLink, Layers
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function WebsiteDb() {
  const [filter, setFilter] = useState("online");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [gallery, setGallery] = useState([]);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const loadWebsite = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      const data = await fetchJson("/api/approved-properties/public/approved");
      const list = Array.isArray(data) ? data : (data.properties || data.visits || []);
      setProperties(list);
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Error loading properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWebsite();
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((v) =>
      filter === "online" ? v.isLiveOnWebsite === true : v.isLiveOnWebsite === false
    );
  }, [properties, filter]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const withPhotos = filtered.filter((v) => (v.propertyInfo?.photos || v.photos || []).length > 0).length;
    const withoutPhotos = total - withPhotos;
    return { total, withPhotos, withoutPhotos };
  }, [filtered]);

  const toggleLive = async (propertyId) => {
    try {
      await fetchJson(`/api/approved-properties/${propertyId}/toggle-live`, { method: "PUT" });
      await loadWebsite();
    } catch (err) {
      window.alert(err?.body || err?.message || "Failed to toggle status");
    }
  };

  const openGallery = (photos) => {
    const list = Array.isArray(photos) ? photos : [];
    setGallery(list);
    setGalleryOpen(true);
  };

  const exportToCsv = () => {
    const rows = filtered.map((v) => {
      const prop = v.propertyInfo || {};
      return {
        id: v.visitId || v._id || "",
        name: prop.name || "",
        type: prop.type || "",
        area: prop.area || "",
        owner: prop.ownerName || "",
        contact: prop.ownerPhone || "",
        rent: prop.rent || v.monthlyRent || "",
        status: v.isLiveOnWebsite ? "ONLINE" : "OFFLINE"
      };
    });
    const headers = ["id", "name", "type", "area", "owner", "contact", "rent", "status"];
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers.map((key) => `"${String(row[key] ?? "").replace(/"/g, '""')}"`).join(",")
      )
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "website-properties.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] gap-4">
        <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Syncing Digital Inventory...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Digital Inventory Intelligence</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Website Management</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Public Asset Visibility</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Audit and moderate property visibility on the public website. Track asset distribution and digital health metrics across the global network.</p>
         <div className="flex items-center gap-4">
            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
               <button onClick={() => setFilter("online")} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all", filter === "online" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:text-slate-600")}>Online</button>
               <button onClick={() => setFilter("offline")} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all", filter === "offline" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:text-slate-600")}>Offline</button>
            </div>
            <button onClick={exportToCsv} className="bg-slate-800 text-white px-6 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
               <Download className="w-4 h-4" /> Export Ledger
            </button>
         </div>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCardLarge label="Total Assets" value={stats.total} trend="Global Index" up icon={Layers} color="blue" />
        <StatCardLarge label="Asset Photos" value={stats.withPhotos} trend="Visual Density" up icon={Camera} color="green" />
        <StatCardLarge label="Awaiting Media" value={stats.withoutPhotos} trend="Needs Attention" up={false} icon={AlertTriangle} color="orange" />
      </div>

      {/* Main Inventory Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Public Visibility Ledger</h3>
            <button onClick={loadWebsite} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
               <RefreshCw className="w-5 h-5" />
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1400px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Property Profile</th>
                     <th className="pb-6">Asset Details</th>
                     <th className="pb-6">Owner Intelligence</th>
                     <th className="pb-6 text-center">Rental Index</th>
                     <th className="pb-6 text-center">Digital Pulse</th>
                     <th className="pb-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filtered.map((v) => {
                    const prop = v.propertyInfo || {};
                    const photos = prop.photos || v.photos || [];
                    const visitId = v.visitId || v._id || "";
                    const rent = prop.rent || v.monthlyRent || 0;
                    return (
                      <tr key={visitId} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                         <td className="py-6">
                            <div className="flex items-center gap-5">
                               <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-500 relative">
                                  {photos[0] ? (
                                    <img src={photos[0]} className="w-full h-full object-cover" alt="" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                                       <ImageIcon className="w-6 h-6" />
                                    </div>
                                  )}
                                  {photos.length > 0 && (
                                    <button onClick={(e) => { e.stopPropagation(); openGallery(photos); }} className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white text-[9px] font-bold uppercase backdrop-blur-sm">
                                       {photos.length} Assets
                                    </button>
                                  )}
                               </div>
                               <div>
                                  <p className="text-base font-bold text-slate-800">{prop.name || "Unnamed Asset"}</p>
                                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">ID: {visitId.slice(-8).toUpperCase()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="py-6">
                            <div className="space-y-1">
                               <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">{prop.type || "-"}</p>
                               <div className="flex items-center gap-1.5 text-slate-400">
                                  <MapPin className="w-3 h-3" />
                                  <span className="text-[10px] font-bold">{prop.area || "-"}</span>
                               </div>
                            </div>
                         </td>
                         <td className="py-6">
                            <div className="space-y-1">
                               <p className="text-sm font-bold text-slate-800">{prop.ownerName || "-"}</p>
                               <div className="flex items-center gap-1.5 text-slate-400">
                                  <Phone className="w-3 h-3" />
                                  <span className="text-[10px] font-bold">{prop.ownerPhone || "-"}</span>
                               </div>
                            </div>
                         </td>
                         <td className="py-6 text-center">
                            <p className="text-base font-bold text-slate-800 tracking-tighter">₹{rent.toLocaleString()}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Monthly Yield</p>
                         </td>
                         <td className="py-6 text-center">
                            <span className={cn(
                              "text-[9px] font-bold px-3 py-1 rounded-full border uppercase shadow-sm",
                              v.isLiveOnWebsite ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                            )}>
                               {v.isLiveOnWebsite ? "Online Hub" : "Offline"}
                            </span>
                         </td>
                         <td className="py-6 text-right">
                            <div className="flex items-center justify-end gap-3">
                               <button onClick={() => toggleLive(v.propertyId || visitId)} className="px-6 py-2.5 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-blue-600 hover:shadow-md transition-all text-[10px] font-bold uppercase">Toggle Pulse</button>
                               <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                                  <ExternalLink className="w-4 h-4" />
                               </button>
                            </div>
                         </td>
                      </tr>
                    );
                  })}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modern Gallery Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-lg flex items-center justify-center z-[100] p-10 animate-in fade-in duration-300" onClick={() => setGalleryOpen(false)}>
           <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center"><Camera className="w-6 h-6" /></div>
                    <div>
                       <h3 className="text-2xl font-bold tracking-tight">Digital Asset Gallery</h3>
                       <p className="text-[10px] font-bold uppercase opacity-50">{gallery.length} Assets Found</p>
                    </div>
                 </div>
                 <button onClick={() => setGalleryOpen(false)} className="w-12 h-12 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center"><X className="w-6 h-6" /></button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[70vh] overflow-y-auto p-2 custom-scrollbar">
                 {gallery.map((src, idx) => (
                   <div key={idx} className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group relative hover:scale-105 transition-all duration-500">
                      <img src={src} alt={`Asset ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function StatCardLarge({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    green: "bg-emerald-600 shadow-emerald-200", 
    blue: "bg-blue-600 shadow-blue-200", 
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
