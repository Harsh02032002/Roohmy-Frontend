import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { 
  Check, Plus, Star, Edit, Trash2, X, Loader2, Eye,
  Search, Filter, ChevronRight, LayoutGrid, 
  Activity, Zap, Shield, Home, Building2,
  RefreshCw, Download, Settings2, Sparkles,
  CreditCard, Wallet, BarChart3, Globe,
  ShieldCheck, Smartphone, Monitor, Info
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const getApiUrl = () =>
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001"
    : "https://api.roomhy.com";

const colorStyles = [
  "bg-blue-600 shadow-blue-200",
  "bg-emerald-600 shadow-emerald-200",
  "bg-indigo-600 shadow-indigo-200",
  "bg-purple-600 shadow-purple-200",
  "bg-rose-600 shadow-rose-200",
];

export default function PricingPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingPlan, setViewingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", billingCycle: "monthly", features: [], maxProperties: 1, maxPhotos: 10,
    prioritySupport: false, analytics: false, customBranding: false, isPopular: false, status: "Active"
  });
  const [featureInput, setFeatureInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchPlans(); }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch(`${getApiUrl()}/api/pricing`);
      const data = await res.json();
      if (data.success) setPlans(data.data);
    } catch (err) { console.error("Error:", err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData, price: Number(formData.price), maxProperties: Number(formData.maxProperties), maxPhotos: Number(formData.maxPhotos) };
      const url = editingId ? `${getApiUrl()}/api/pricing/${editingId}` : `${getApiUrl()}/api/pricing`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) { fetchPlans(); closeModal(); }
      else { alert(data.message); }
    } catch (err) { alert("Error saving plan"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this pricing plan?")) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/pricing/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchPlans();
    } catch (err) { alert("Error deleting"); }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({
        name: item.name, description: item.description || "", price: item.price, billingCycle: item.billingCycle || "monthly",
        features: item.features || [], maxProperties: item.maxProperties || 1, maxPhotos: item.maxPhotos || 10,
        prioritySupport: item.prioritySupport || false, analytics: item.analytics || false, customBranding: item.customBranding || false,
        isPopular: item.isPopular || false, status: item.status || "Active"
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "", description: "", price: "", billingCycle: "monthly", features: [], maxProperties: 1, maxPhotos: 10,
        prioritySupport: false, analytics: false, customBranding: false, isPopular: false, status: "Active"
      });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingId(null); setFeatureInput(""); };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (idx) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== idx) });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] gap-4">
        <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Revenue Schema...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Global Revenue Architecture</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Commercial Config</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Pricing & Subscription Plans</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Engineer and manage platform subscription tiers, billing cycles and feature entitlements for property owners.</p>
         <div className="flex items-center gap-4">
            <button onClick={() => openModal()} className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
               <Plus className="w-4 h-4" /> Define New Tier
            </button>
         </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {plans.map((p, idx) => (
          <div key={p._id} className={cn(
            "bg-white rounded-[2.5rem] p-10 border shadow-xl shadow-slate-200/50 group hover:translate-y-[-8px] transition-all duration-500 flex flex-col relative overflow-hidden",
            p.isPopular ? "border-blue-600 ring-2 ring-blue-50" : "border-slate-100"
          )}>
            {p.isPopular && (
              <div className="absolute top-0 right-0">
                 <div className="bg-blue-600 text-white text-[9px] font-bold uppercase py-2 px-10 rotate-45 translate-x-10 translate-y-2 shadow-lg">Popular</div>
              </div>
            )}

            <div className="mb-8">
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6", colorStyles[idx % colorStyles.length])}>
                  <Zap className="w-7 h-7" />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{p.name}</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Tier Level {idx + 1}</p>
            </div>

            <div className="mb-8">
               <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-800 tracking-tighter">₹{p.price}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">/{p.billingCycle}</span>
               </div>
               <p className="text-sm font-bold text-slate-500 mt-2 leading-relaxed">{p.description || "Comprehensive platform access for growing portfolios."}</p>
            </div>

            <div className="space-y-4 mb-10 flex-1">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Feature Entitlements</p>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                     <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                     {p.maxProperties} Property Listings
                  </li>
                  <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                     <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                     {p.maxPhotos} Assets per Property
                  </li>
                  {(p.features || []).slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                       <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                       {f}
                    </li>
                  ))}
               </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button onClick={() => setViewingPlan(p)} className="py-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase"><Eye className="w-4 h-4" /> View</button>
               <div className="flex gap-2">
                  <button onClick={() => openModal(p)} className="flex-1 rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-slate-100"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p._id)} className="flex-1 rounded-2xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-slate-100"><Trash2 className="w-4 h-4" /></button>
               </div>
            </div>
          </div>
        ))}
        <button onClick={() => openModal()} className="bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-blue-600 hover:text-blue-600 transition-all group min-h-[450px]">
           <div className="w-16 h-16 rounded-[1.75rem] bg-white flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors shadow-sm">
              <Plus className="w-8 h-8" />
           </div>
           <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-widest">Architect New Tier</p>
              <p className="text-[10px] text-slate-400 mt-1">Scale Revenue Channels</p>
           </div>
        </button>
      </div>

      {/* Modern Modal Wrapper */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500 max-h-[90vh] overflow-y-auto">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white z-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"><Sparkles className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{editingId ? "Refine Pricing Tier" : "Define Revenue Tier"}</h3>
                 </div>
                 <button onClick={closeModal} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-800 transition-all flex items-center justify-center"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-2">
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Plan Identity</label>
                       <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="e.g. Enterprise Elite" required />
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Value (INR)</label>
                       <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="0.00" required />
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Billing Velocity</label>
                       <select value={formData.billingCycle} onChange={e => setFormData({...formData, billingCycle: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer">
                          <option value="monthly">Monthly Settlement</option>
                          <option value="quarterly">Quarterly Settlement</option>
                          <option value="yearly">Yearly Settlement</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Asset Quota</label>
                       <input type="number" value={formData.maxProperties} onChange={e => setFormData({...formData, maxProperties: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Media Quota</label>
                       <input type="number" value={formData.maxPhotos} onChange={e => setFormData({...formData, maxPhotos: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Feature Entitlements</label>
                    <div className="flex gap-4">
                       <input value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyPress={e => e.key === "Enter" && (e.preventDefault(), addFeature())} className="flex-1 bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" placeholder="Add custom entitlement..." />
                       <button type="button" onClick={addFeature} className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"><Plus className="w-6 h-6" /></button>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4">
                       {formData.features.map((f, i) => (
                         <span key={i} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-bold uppercase flex items-center gap-2 border border-blue-100">
                           {f} <button type="button" onClick={() => removeFeature(i)} className="hover:text-rose-600"><X className="w-3.5 h-3.5" /></button>
                         </span>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white hover:shadow-md transition-all group">
                       <input type="checkbox" checked={formData.prioritySupport} onChange={e => setFormData({...formData, prioritySupport: e.target.checked})} className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-100 transition-all" />
                       <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Priority Support</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white hover:shadow-md transition-all group">
                       <input type="checkbox" checked={formData.analytics} onChange={e => setFormData({...formData, analytics: e.target.checked})} className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-100 transition-all" />
                       <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Advanced Analytics</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white hover:shadow-md transition-all group">
                       <input type="checkbox" checked={formData.customBranding} onChange={e => setFormData({...formData, customBranding: e.target.checked})} className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-100 transition-all" />
                       <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Custom Branding</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white hover:shadow-md transition-all group">
                       <input type="checkbox" checked={formData.isPopular} onChange={e => setFormData({...formData, isPopular: e.target.checked})} className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-100 transition-all" />
                       <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Mark as Popular</span>
                    </label>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={closeModal} className="flex-1 py-4 rounded-2xl bg-slate-50 text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-100 transition-all">Cancel</button>
                    <button type="submit" disabled={saving} className="flex-[2] py-4 rounded-2xl bg-blue-600 text-[10px] font-bold uppercase text-white shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                       {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                       {editingId ? "Update Architecture" : "Activate Tier"}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Viewing Details */}
      {viewingPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden p-12 flex flex-col items-center">
              <div className={cn("w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl text-white", colorStyles[0])}>
                 <Sparkles className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight text-center">{viewingPlan.name}</h3>
              <p className="text-5xl font-bold text-slate-800 tracking-tighter mt-4 leading-none">₹{viewingPlan.price}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{viewingPlan.billingCycle} Settlement</p>
              
              <div className="mt-10 w-full grid grid-cols-2 gap-4">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-2">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    <p className="text-2xl font-bold text-slate-800">{viewingPlan.maxProperties}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Properties</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-indigo-600" />
                    <p className="text-2xl font-bold text-slate-800">{viewingPlan.maxPhotos}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Photos</p>
                 </div>
              </div>

              <div className="w-full mt-10 space-y-4">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Entitlements Matrix</p>
                 <div className="flex flex-wrap justify-center gap-2">
                    {viewingPlan.features.map((f, i) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-bold uppercase border border-emerald-100 flex items-center gap-2">
                         <Check className="w-3 h-3" /> {f}
                      </span>
                    ))}
                    {viewingPlan.prioritySupport && <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[9px] font-bold uppercase border border-blue-100 flex items-center gap-2"><Check className="w-3 h-3" /> Priority Support</span>}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-12">
                 <button onClick={() => { setViewingPlan(null); openModal(viewingPlan); }} className="py-4 rounded-2xl border border-slate-100 bg-white text-slate-400 hover:text-blue-600 hover:shadow-md transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase"><Edit className="w-4 h-4" /> Refine</button>
                 <button onClick={() => setViewingPlan(null)} className="py-4 rounded-2xl bg-slate-800 text-white shadow-xl shadow-slate-200 text-[10px] font-bold uppercase transition-all">Dismiss</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
