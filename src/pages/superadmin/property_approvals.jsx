import React, { useState, useEffect } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Hourglass,
  Check, X, Eye, ShieldCheck, ClipboardCheck,
  RefreshCw, AlertCircle, Sparkles, Layers,
  Box, Globe2, IndianRupee, Inbox
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const getApiUrl = () =>
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001" : "https://api.roomhy.com";

export default function SuperadminPropertyApprovals() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const fetchPendingProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${getApiUrl()}/api/properties?t=${Date.now()}`);
      const data = await res.json();
      if (data.success && data.properties) {
        const pending = data.properties.filter(p => !p.isPublished || p.status !== 'active');
        setQueue(pending.map(p => ({
          id: p._id,
          displayId: p.visitId || p.locationCode || p._id.slice(-6).toUpperCase(),
          title: p.title || p.propertyInfo?.name || p.propertyName || "Unknown Property",
          owner: p.owner?.name || p.ownerName || p.propertyInfo?.ownerName || "Unknown Owner",
          type: p.propertyType || "Property",
          submitted: new Date(p.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' }),
          status: p.status === "pending_review" ? "Priority Queue" : "Awaiting Pulse",
          initial: (p.owner?.name || p.ownerName || "U")[0].toUpperCase(),
          color: ["blue", "indigo", "amber", "rose", "emerald"][Math.floor(Math.random() * 5)],
          raw: p
        })));
      }
    } catch (err) {
      console.error("Error fetching pending properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${getApiUrl()}/api/properties/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success || res.ok) {
        setQueue(queue.filter(q => q.id !== id));
      } else {
        alert("Failed to approve property.");
      }
    } catch (err) {
      console.error(err);
      alert("Error approving property.");
    }
  };

  const filteredQueue = queue.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Listing Approval Center</h1>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Process and approve new property submissions for the public website</p>
          </div>
         <div className="flex items-center gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-slate-800/10 hover:bg-slate-900 transition-all flex items-center gap-2">
               <ShieldCheck className="w-3.5 h-3.5" /> Global Audit Pulse
            </button>
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardHorizontal label="Awaiting Pulse" value={queue.length} trend="+5 Priority" up icon={Hourglass} color="amber" />
        <StatCardHorizontal label="Success Yield" value="12" trend="Audit Clean" up icon={CheckCircle2} color="emerald" />
        <StatCardHorizontal label="Audit Velocity" value="3.4h" trend="Within SLA" up icon={Clock} color="blue" />
        <StatCardHorizontal label="Compliance Index" value="98%" trend="+1.2% Alpha" up icon={ShieldCheck} color="indigo" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">Verification Registry</h3>
            <div className="flex items-center gap-3">
               <div className="relative group w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                  <input 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    placeholder="Search assets..." 
                    className="w-full bg-slate-50 border-none rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
                  />
               </div>
               <button onClick={fetchPendingProperties} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                  <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-slate-400 text-[8px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-4">Asset Identity Hub</th>
                     <th className="pb-4 text-center">Temporal SLA</th>
                     <th className="pb-4 text-center">Status Index</th>
                     <th className="pb-4 text-right">Audit Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400 text-xs font-bold">Scanning Queue...</td>
                    </tr>
                  ) : filteredQueue.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400 text-xs font-bold">No Pending Approvals</td>
                    </tr>
                  ) : filteredQueue.map((q, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                       <td className="py-3">
                          <div className="flex items-center gap-3">
                             <div className={cn(
                                "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-sm transition-transform group-hover:scale-105",
                                q.color === "blue" ? "bg-blue-600 shadow-blue-50" :
                                q.color === "indigo" ? "bg-indigo-600 shadow-indigo-50" :
                                q.color === "emerald" ? "bg-emerald-600 shadow-emerald-50" :
                                q.color === "amber" ? "bg-amber-600 shadow-amber-50" :
                                q.color === "rose" ? "bg-rose-600 shadow-rose-50" : "bg-slate-600 shadow-slate-50"
                             )}>
                                {q.initial}
                             </div>
                             <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-800 leading-tight truncate max-w-[200px]">{q.title}</p>
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{q.type} • {q.owner}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <span className={cn(
                             "text-[7px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider shadow-sm",
                             q.status === "Priority Queue" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                             {q.submitted}
                          </span>
                       </td>
                       <td className="py-3 text-center">
                          <span className={cn(
                             "text-[7px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider shadow-sm",
                             q.status === "Priority Queue" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-slate-50 text-slate-400 border-slate-100"
                          )}>
                             {q.status}
                          </span>
                       </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                             <button onClick={() => handleApprove(q.id)} className="flex items-center gap-1 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-[8px] font-bold uppercase hover:bg-emerald-700 transition-all shadow-sm">
                                <Check className="w-3.5 h-3.5" /> Approve
                             </button>
                             <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-600 transition-all border border-slate-100 shadow-sm">
                                <X className="w-3.5 h-3.5" />
                             </button>
                             <button onClick={() => setSelectedProperty(q)} className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                                <Eye className="w-3.5 h-3.5" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Audit Pulse Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <ActionTile icon={ClipboardCheck} label="Compliance Audit" count="24" color="blue" />
         <ActionTile icon={ShieldCheck} label="Identity Pulse" count="18" color="indigo" />
         <ActionTile icon={AlertCircle} label="Risk Assessment" count="03" color="rose" />
      </div>

      {/* Property View Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm", selectedProperty.color === "blue" ? "bg-blue-600 shadow-blue-50" : selectedProperty.color === "indigo" ? "bg-indigo-600 shadow-indigo-50" : selectedProperty.color === "emerald" ? "bg-emerald-600 shadow-emerald-50" : selectedProperty.color === "amber" ? "bg-amber-600 shadow-amber-50" : selectedProperty.color === "rose" ? "bg-rose-600 shadow-rose-50" : "bg-slate-600 shadow-slate-50")}>
                  {selectedProperty.initial}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm leading-tight">{selectedProperty.title}</h3>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{selectedProperty.type} • {selectedProperty.owner}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProperty(null)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              
              {/* Basic Information */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3">Property Data</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Locality</p>
                    <p className="text-sm font-bold text-slate-800">{selectedProperty.raw.locality || selectedProperty.raw.city || "Unknown"}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Rent</p>
                    <p className="text-sm font-bold text-emerald-600 flex items-center">
                      <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                      {selectedProperty.raw.rent || selectedProperty.raw.monthlyRent || "N/A"}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gender Suitability</p>
                    <p className="text-sm font-bold text-slate-800 capitalize">{selectedProperty.raw.gender || "Any"}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status Index</p>
                    <p className="text-sm font-bold text-slate-800">{selectedProperty.status}</p>
                  </div>
                </div>
              </div>

              {/* Full Address */}
              <div>
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Address</h4>
                 <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm text-slate-600 font-medium">
                    {selectedProperty.raw.address || "No address provided."}
                 </div>
              </div>

              {/* Images Preview */}
              {selectedProperty.raw.images && selectedProperty.raw.images.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Media Assets ({selectedProperty.raw.images.length})</h4>
                  <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                    {selectedProperty.raw.images.map((img, i) => (
                      <img key={i} src={img} className="w-24 h-24 object-cover rounded-xl snap-center shrink-0 border border-slate-200" alt="property view" />
                    ))}
                  </div>
                </div>
              )}

              {/* Notice */}
              <div className="bg-blue-50 text-blue-600 p-4 rounded-xl border border-blue-100 flex items-start gap-3 mt-4">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-xs font-medium">This asset is pending compliance verification. Approving will immediately syndicate this asset to the public ledger.</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between gap-3">
              <button onClick={() => {
                // If there was an edit page, we could redirect there.
                // For now, we will inform the superadmin they can edit from All Properties List.
                alert("Edit functionality is accessible from the 'All Properties List' panel (Under Construction).");
              }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all uppercase tracking-wider flex items-center gap-1.5">
                 Edit Details
              </button>
              
              <div className="flex gap-2">
                <button onClick={() => setSelectedProperty(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all uppercase tracking-wider">
                  Close
                </button>
                <button onClick={() => { handleApprove(selectedProperty.id); setSelectedProperty(null); }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-emerald-600 shadow-sm hover:bg-emerald-700 transition-all uppercase tracking-wider">
                  <Check className="w-4 h-4" /> Force Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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

function ActionTile({ icon: Icon, label, count, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    rose: "bg-rose-50 text-rose-600",
  };
  
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-md flex items-center justify-between group cursor-pointer transition-all hover:translate-y-[-2px]">
       <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm", colors[color])}>
             <Icon className="w-5 h-5" />
          </div>
          <div>
             <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">{label}</h4>
             <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest opacity-60">Active Protocol</p>
          </div>
       </div>
       <div className="text-right">
          <p className="text-xl font-bold text-slate-800 tracking-tighter leading-none">{count}</p>
          <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest opacity-40">Hubs</p>
       </div>
    </div>
  );
}
