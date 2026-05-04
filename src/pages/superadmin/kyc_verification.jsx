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
  Lock, Key, ShieldQuestion, UserCheck, UserX
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
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
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Identity Trust Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Identity & Compliance</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">KYC Verification Command</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Monitor global identity compliance, audit document verification velocity and manage trust signals across the platform's multi-tenant ecosystem.</p>
         <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Compliance Report
         </button>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Global Compliance" value={stats.compliance} trend="Elite Trust Index" up icon={ShieldCheck} color="blue" />
        <StatCardLarge label="Awaiting Audit" value={stats.ownerPending + stats.tenantPending} trend="Immediate Queue" up icon={Fingerprint} color="indigo" />
        <StatCardLarge label="Verification Pulse" value={stats.time} trend="Optimized Flow" up icon={Clock} color="orange" />
        <StatCardLarge label="Success Velocity" value={stats.rate} trend="+ 4.2% Growth" up icon={Activity} color="green" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-10">
               <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Identity Vault Ledger</h3>
               <div className="hidden xl:flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  {["owners", "tenants"].map(f => (
                    <button 
                      key={f} onClick={() => setTab(f)}
                      className={cn(
                        "px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all",
                        tab === f ? "bg-white text-blue-600 shadow-md border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                       {f === "owners" ? "Asset Owners" : "Verified Residents"}
                    </button>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search identity pulse..." 
                    className="bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
               </div>
               <button onClick={loadData} className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                  <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Profile Identity</th>
                     <th className="pb-6">Contact Intelligence Matrix</th>
                     <th className="pb-6 text-center">Compliance Target Context</th>
                     <th className="pb-6 text-center">Status Hub Index</th>
                     <th className="pb-6 text-right">Verification Protocols</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="5" className="py-32 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Secure Identity Vault...</p>
                       </div>
                    </td></tr>
                  ) : filteredList.map((item, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <div className="flex items-center gap-5">
                             <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-xl transition-all">
                                {(item.name || "U").charAt(0).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800">{item.name || "Unknown Identity"}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">ID: {item.loginId || "N/A"}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-slate-700">{item.phone || "No Phone Record"}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight opacity-70">{item.email || "No Email Record"}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <div className="inline-flex flex-col items-center gap-1.5 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-[1.25rem] group-hover:bg-white group-hover:shadow-md transition-all">
                             <p className="text-xs font-bold text-slate-800">{tab === "tenants" ? (item.propertyTitle || "Direct Booking") : "Global Asset Owner"}</p>
                             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Identity Context</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                             "text-[9px] font-bold px-3.5 py-1.5 rounded-full border shadow-sm uppercase tracking-widest",
                             "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {item.kycStatus || item.kyc?.status || "Pending Audit"}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-100">
                                <Check className="w-4 h-4" /> Approve
                             </button>
                             <button className="flex items-center gap-2 bg-rose-50 text-rose-600 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-rose-100">
                                <X className="w-4 h-4" /> Reject
                             </button>
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                                <Eye className="w-5 h-5" />
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
