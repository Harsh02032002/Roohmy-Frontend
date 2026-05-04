import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { 
  MapPin, Plus, Edit, Trash2, TrendingUp, X, Loader2,
  Globe, Search, ChevronRight, LayoutGrid, Building2,
  RefreshCw, Map, Sparkles, Navigation
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const getApiUrl = () =>
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001"
    : "https://api.roomhy.com";

const colorStyles = [
  "bg-blue-50 text-blue-600 border-blue-100",
  "bg-emerald-50 text-emerald-600 border-emerald-100",
  "bg-indigo-50 text-indigo-600 border-indigo-100",
  "bg-purple-50 text-purple-600 border-purple-100",
  "bg-rose-50 text-rose-600 border-rose-100",
  "bg-amber-50 text-amber-600 border-amber-100",
];

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", state: "", country: "India", propertyCount: 0, description: "" });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchLocations(); }, []);

  const fetchLocations = async () => {
    try {
      const res = await fetch(`${getApiUrl()}/api/locations/cities`);
      const data = await res.json();
      if (data.success) setLocations(data.data);
    } catch (err) { console.error("Error:", err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `${getApiUrl()}/api/locations/cities/${editingId}` : `${getApiUrl()}/api/locations/cities`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success) { fetchLocations(); closeModal(); }
      else { alert(data.message); }
    } catch (err) { alert("Error saving"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this location?")) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/locations/cities/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchLocations();
    } catch (err) { alert("Error deleting"); }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({ name: item.name, state: item.state || "", country: item.country || "India", propertyCount: item.propertyCount || 0, description: item.description || "" });
    } else {
      setEditingId(null);
      setFormData({ name: "", state: "", country: "India", propertyCount: 0, description: "" });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingId(null); };

  const filteredLocations = locations.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] gap-4">
        <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Geographical Data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Regional Network Intelligence</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Platform Config</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Geographical Expansion</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Manage your global city network, regional operational codes and property density across all territories.</p>
         <div className="flex items-center gap-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input 
                 value={search} onChange={e => setSearch(e.target.value)}
                 placeholder="Search cities..." 
                 className="bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
               />
            </div>
            <button onClick={() => openModal()} className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
               <Plus className="w-4 h-4" /> Add Location
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredLocations.map((l, idx) => (
          <div key={l._id} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col group relative hover:translate-y-[-8px] transition-all duration-500">
            <div className="flex items-start justify-between mb-8">
               <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6", colorStyles[idx % colorStyles.length])}>
                  <MapPin className="w-8 h-8" />
               </div>
               <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => openModal(l)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-slate-100"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(l._id)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-slate-100"><Trash2 className="w-4 h-4" /></button>
               </div>
            </div>
            
            <div className="space-y-1">
               <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{l.name}</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase">{l.state}, {l.country}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50 flex items-end justify-between">
               <div>
                  <p className="text-3xl font-bold text-slate-800 tracking-tighter leading-none">{l.propertyCount || 0}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Active Listings</p>
               </div>
               <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase shadow-sm">
                  <TrendingUp className="w-3 h-3" />
                  Growth
               </div>
            </div>
          </div>
        ))}
        <button onClick={() => openModal()} className="bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-blue-600 hover:text-blue-600 transition-all group min-h-[280px]">
           <div className="w-16 h-16 rounded-[1.75rem] bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
              <Plus className="w-8 h-8" />
           </div>
           <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-widest">Register City</p>
              <p className="text-[10px] text-slate-400 mt-1">Expand Geographical Reach</p>
           </div>
        </button>
      </div>

      {/* Modern Modal Wrapper */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"><Navigation className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{editingId ? "Refine Location" : "Map New City"}</h3>
                 </div>
                 <button onClick={closeModal} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-800 transition-all flex items-center justify-center"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">City Identity</label>
                    <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="e.g. Bangalore" required />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">State / Province</label>
                       <input value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="e.g. Karnataka" required />
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Country</label>
                       <input value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Initial Asset Count</label>
                    <input type="number" value={formData.propertyCount} onChange={e => setFormData({...formData, propertyCount: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={closeModal} className="flex-1 py-4 rounded-2xl bg-slate-50 text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-100 transition-all">Cancel</button>
                    <button type="submit" disabled={saving} className="flex-[2] py-4 rounded-2xl bg-blue-600 text-[10px] font-bold uppercase text-white shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                       {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                       {editingId ? "Update Intelligence" : "Activate Territory"}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
