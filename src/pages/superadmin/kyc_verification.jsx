import React, { useEffect, useMemo, useState } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, RefreshCw,
  LayoutGrid, ShieldCheck, Fingerprint, Check, X,
  Eye, ShieldAlert, Activity, CreditCard,
  Sparkles, Layers, Box, Globe2, IndianRupee,
  Inbox, FileText, ImageIcon, Save, Loader2,
  Lock, Key, ShieldQuestion, UserCheck, UserX,
  Download
} from "lucide-react";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function KycVerification() {
  const [tab, setTab] = useState("owners");
  const [owners, setOwners] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const [ownerData, tenantData] = await Promise.all([
        fetchJson("/api/owners"),
        fetchJson("/api/tenants")
      ]);
      setOwners(ownerData?.owners || ownerData || []);
      setTenants(tenantData?.tenants || tenantData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const pendingOwners = useMemo(() => owners.filter(o => (o.kycStatus || o.kyc?.status || "pending") === "pending"), [owners]);
  const pendingTenants = useMemo(() => tenants.filter(t => ["submitted", "pending"].includes(t.kycStatus || t.kyc?.status || "pending")), [tenants]);

  const stats = useMemo(() => {
    return { 
      total: owners.length + tenants.length, 
      ownerPending: pendingOwners.length, 
      tenantPending: pendingTenants.length, 
      rate: "94.2%", 
      time: "1.4h", 
      compliance: "99.9%" 
    };
  }, [owners, tenants, pendingOwners, pendingTenants]);

  const activeList = tab === "owners" ? pendingOwners : pendingTenants;
  const filteredList = activeList.filter(item => (item.name || "").toLowerCase().includes(search.toLowerCase()) || (item.loginId || "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Identity Trust Hub</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Global KYC Compliance & Document Verification Command</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-white text-slate-400 border border-slate-100 px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
               <Download className="w-3.5 h-3.5" /> Export Audit
            </button>
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardHorizontal label="Compliance Index" value={stats.compliance} trend="Elite Status" up icon={ShieldCheck} color="blue" />
        <StatCardHorizontal label="Awaiting Audit" value={stats.ownerPending + stats.tenantPending} trend="Queue Stream" up icon={Fingerprint} color="indigo" />
        <StatCardHorizontal label="Audit Velocity" value={stats.time} trend="Optimized" up icon={Clock} color="amber" />
        <StatCardHorizontal label="Success Rate" value={stats.rate} trend="+4.2% Delta" up icon={Activity} color="emerald" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight leading-none">Identity Ledger</h3>
               <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
                  {["owners", "tenants"].map(f => (
                    <button 
                      key={f} onClick={() => setTab(f)}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-[8px] font-bold uppercase transition-all",
                        tab === f ? "bg-white text-blue-600 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                       {f === "owners" ? "Owners" : "Residents"}
                    </button>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative group w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search identity..." 
                    className="w-full bg-slate-50 border-none rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
                  />
               </div>
               <button onClick={loadData} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100">
                  <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-slate-400 text-[8px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-4">Stakeholder Identity</th>
                     <th className="pb-4">Contact Pulse</th>
                     <th className="pb-4 text-center">Protocol Segment</th>
                     <th className="pb-4 text-center">Status Index</th>
                     <th className="pb-4 text-right">Audit Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="5" className="py-20 text-center">
                       <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2 opacity-20" />
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Accessing Vault...</p>
                    </td></tr>
                  ) : filteredList.length === 0 ? (
                    <tr><td colSpan="5" className="py-20 text-center">
                       <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-20" />
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Compliance Queue Clear</p>
                    </td></tr>
                  ) : filteredList.map((item, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                       <td className="py-3">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105 shrink-0">
                                {(item.name || "U").charAt(0).toUpperCase()}
                             </div>
                             <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-800 leading-tight truncate max-w-[150px]">{item.name || "Unknown Identity"}</p>
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest truncate">ID: {item.loginId || "N/A"}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-3">
                          <div className="space-y-0.5">
                             <p className="text-[10px] font-bold text-slate-700">{item.phone || "No Pulse"}</p>
                             <p className="text-[8px] font-bold text-slate-400 truncate max-w-[120px]">{item.email || "No Digital Record"}</p>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <span className="text-[9px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100 shadow-sm uppercase">{tab === "tenants" ? "Resident" : "Asset Owner"}</span>
                       </td>
                       <td className="py-3 text-center">
                          <span className={cn(
                             "text-[7px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider shadow-sm",
                             "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {item.kycStatus || item.kyc?.status || "Pending Audit"}
                          </span>
                       </td>
                       <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                             <button className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm"><Check className="w-3.5 h-3.5" /></button>
                             <button className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all border border-rose-100 shadow-sm"><X className="w-3.5 h-3.5" /></button>
                             <button className="p-1.5 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100 shadow-sm"><Eye className="w-3.5 h-3.5" /></button>
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
    blue: "bg-blue-50 text-blue-600 border-blue-100", 
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100", 
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100", 
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
