import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import * as LucideIcons from "lucide-react";
import { 
  Loader2, Plus, X, Trash2, Edit, Eye, 
  Search, Filter, ChevronRight, LayoutGrid, 
  Activity, Zap, Shield, Home, Building2,
  RefreshCw, Download, Settings2, Sparkles
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const getApiUrl = () =>
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001"
    : "https://api.roomhy.com";

const getIconComponent = (iconName) => {
  const iconKey = iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-./g, x => x[1].toUpperCase());
  return LucideIcons[iconKey] || LucideIcons.Circle;
};

const iconOptions = [
  { value: "wifi", label: "WiFi" },
  { value: "car", label: "Parking" },
  { value: "dumbbell", label: "Gym" },
  { value: "waves", label: "Swimming Pool" },
  { value: "wind", label: "Air Conditioning" },
  { value: "tv", label: "Television" },
  { value: "coffee", label: "Kitchen" },
  { value: "shield", label: "Security" },
  { value: "zap", label: "Power Backup" },
  { value: "bed", label: "Bed" },
  { value: "bath", label: "Bathroom" },
  { value: "washing-machine", label: "Laundry" },
  { value: "refrigerator", label: "Fridge" },
  { value: "armchair", label: "Furniture" },
  { value: "lock", label: "Lock" },
  { value: "camera", label: "CCTV" },
  { value: "tree-deciduous", label: "Garden" },
  { value: "users", label: "Common Area" },
  { value: "utensils", label: "Mess" },
  { value: "bus", label: "Transport" },
];

const catStyles = {
  basic: "bg-blue-50 text-blue-600 border-blue-100",
  comfort: "bg-emerald-50 text-emerald-600 border-emerald-100",
  luxury: "bg-indigo-50 text-indigo-600 border-indigo-100",
  safety: "bg-rose-50 text-rose-600 border-rose-100",
  other: "bg-slate-50 text-slate-600 border-slate-100",
};

export default function Amenities() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingAmenity, setViewingAmenity] = useState(null);
  const [formData, setFormData] = useState({ name: "", icon: "wifi", category: "basic", description: "", status: "Active" });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAmenities();
  }, []);

  const fetchAmenities = async () => {
    try {
      const res = await fetch(`${getApiUrl()}/api/amenities`);
      const data = await res.json();
      if (data.success) setAmenities(data.data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `${getApiUrl()}/api/amenities/${editingId}` : `${getApiUrl()}/api/amenities`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        fetchAmenities();
        closeModal();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error saving amenity");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this amenity?")) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/amenities/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchAmenities();
    } catch (err) {
      alert("Error deleting");
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({ name: item.name, icon: item.icon || "wifi", category: item.category || "basic", description: item.description || "", status: item.status });
    } else {
      setEditingId(null);
      setFormData({ name: "", icon: "wifi", category: "basic", description: "", status: "Active" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: "", icon: "wifi", category: "basic", description: "", status: "Active" });
  };

  const filteredAmenities = amenities.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] gap-4">
        <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Amenity Schema...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Global Amenity Intelligence</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Platform Config</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Amenity Infrastructure</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Manage the platform-wide inventory of property amenities, categorized by utility and service standard.</p>
         <div className="flex items-center gap-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input 
                 value={search} onChange={e => setSearch(e.target.value)}
                 placeholder="Search amenities..." 
                 className="bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
               />
            </div>
            <button onClick={() => openModal()} className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
               <Plus className="w-4 h-4" /> Add Amenity
            </button>
         </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {filteredAmenities.map((a) => {
          const Icon = getIconComponent(a.icon);
          const style = catStyles[a.category || "basic"];
          return (
            <div key={a._id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center group relative hover:translate-y-[-8px] transition-all duration-500">
              <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:rotate-6", style)}>
                <Icon className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-800 text-center">{a.name}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase mt-2">{a.category || "basic"}</p>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all flex flex-col gap-2">
                 <button onClick={() => setViewingAmenity(a)} className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center"><Eye className="w-4 h-4" /></button>
                 <button onClick={() => openModal(a)} className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center"><Edit className="w-4 h-4" /></button>
                 <button onClick={() => handleDelete(a._id)} className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          );
        })}
        <button onClick={() => openModal()} className="bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-3 hover:border-blue-600 hover:text-blue-600 transition-all group min-h-[180px]">
           <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
              <Plus className="w-6 h-6" />
           </div>
           <p className="text-[10px] font-bold uppercase tracking-widest">Add New</p>
        </button>
      </div>

      {/* Modern Modal Wrapper */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"><Sparkles className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{editingId ? "Refine Amenity" : "Define Amenity"}</h3>
                 </div>
                 <button onClick={closeModal} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-800 transition-all flex items-center justify-center"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Amenity Name</label>
                       <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="e.g. High Speed WiFi" required />
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Icon Signature</label>
                       <select value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer">
                          {iconOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Service Level</label>
                       <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer">
                          <option value="basic">Basic Utility</option>
                          <option value="comfort">Comfort Plus</option>
                          <option value="luxury">Luxury Elite</option>
                          <option value="safety">Safety Protocol</option>
                       </select>
                    </div>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={closeModal} className="flex-1 py-4 rounded-2xl bg-slate-50 text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-100 transition-all">Cancel</button>
                    <button type="submit" disabled={saving} className="flex-[2] py-4 rounded-2xl bg-blue-600 text-[10px] font-bold uppercase text-white shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                       {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                       {editingId ? "Update Intelligence" : "Activate Amenity"}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Viewing Details */}
      {viewingAmenity && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden p-10 flex flex-col items-center">
              <div className={cn("w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl", catStyles[viewingAmenity.category || "basic"])}>
                 {(() => { const Icon = getIconComponent(viewingAmenity.icon); return <Icon className="w-12 h-12" />; })()}
              </div>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight text-center">{viewingAmenity.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{viewingAmenity.category || "basic"} Service Category</p>
              
              <div className="mt-8 w-full p-6 bg-slate-50 rounded-3xl border border-slate-100">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Asset Description</p>
                 <p className="text-sm font-bold text-slate-700 leading-relaxed">{viewingAmenity.description || "No specific deployment notes available for this amenity asset."}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-10">
                 <button onClick={() => { setViewingAmenity(null); openModal(viewingAmenity); }} className="py-4 rounded-2xl border border-slate-100 bg-white text-slate-400 hover:text-blue-600 hover:shadow-md transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase"><Edit className="w-4 h-4" /> Edit</button>
                 <button onClick={() => setViewingAmenity(null)} className="py-4 rounded-2xl bg-slate-800 text-white shadow-xl shadow-slate-200 text-[10px] font-bold uppercase transition-all">Dismiss</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
