import React, { useEffect, useMemo, useState } from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, RefreshCw,
  LayoutGrid, CreditCard, Wallet
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Owner() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");

  const loadOwners = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/owners");
      const baseOwners = Array.isArray(data) ? data : (data.data || data.owners || []);
      setOwners(baseOwners);
    } catch (err) {
      console.error("Failed to load owners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOwners();
  }, []);

  const filteredOwners = useMemo(() => {
    const query = search.trim().toLowerCase();
    return owners.filter(o => {
      const id = (o.loginId || o._id || "").toString().toLowerCase();
      const name = (o.name || o.profile?.name || "").toLowerCase();
      const area = (o.locationCode || o.checkinArea || "").toLowerCase();
      
      const matchesSearch = id.includes(query) || name.includes(query);
      const matchesArea = areaFilter === "all" || area.includes(areaFilter.toLowerCase());
      
      return matchesSearch && matchesArea;
    });
  }, [owners, search, areaFilter]);

  const stats = useMemo(() => {
    const total = owners.length;
    const verified = owners.filter(o => (o.kycStatus === "verified" || o.kyc?.status === "verified")).length;
    const properties = owners.reduce((acc, o) => acc + (o.propertiesCount || 1), 0);
    return { total, verified, pending: total - verified, properties };
  }, [owners]);

  const areas = useMemo(() => {
    const unique = new Set(owners.map(o => o.locationCode || o.checkinArea).filter(Boolean));
    return Array.from(unique).sort();
  }, [owners]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;
    try {
      await fetchJson(`/api/owners/${encodeURIComponent(id)}`, { method: "DELETE" });
      loadOwners();
    } catch (err) {
      alert("Failed to delete owner");
    }
  };

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Property Owners Ledger</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>User Management</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Stakeholder Directory</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Manage your global owner network, property portfolios and financial settlement profiles with audit-ready tracking.</p>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Owners" value={stats.total} trend="+ 14.2% from last month" up icon={Users} color="purple" />
        <StatCardLarge label="KYC Verified" value={stats.verified} trend="High Compliance" up icon={Shield} color="green" />
        <StatCardLarge label="Managed Assets" value={stats.properties} trend="Revenue Generators" up icon={Building2} color="blue" />
        <StatCardLarge label="Active Collection" value="₹ 45.2L" trend="+ 12.1% Payouts" up icon={Zap} color="orange" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Management Directory</h3>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search owners..." 
                    className="bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
               </div>
               <button className="flex items-center gap-2 bg-purple-50 text-purple-600 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase hover:bg-purple-600 hover:text-white transition-all shadow-sm">
                  <Download className="w-4 h-4" /> Export Directory
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Owner Identity</th>
                     <th className="pb-6">Portfolio Assets</th>
                     <th className="pb-6">Settlement Profile</th>
                     <th className="pb-6 text-center">Operational Zone</th>
                     <th className="pb-6 text-center">KYC Status</th>
                     <th className="pb-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="6" className="py-24 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <RefreshCw className="w-10 h-10 text-purple-600 animate-spin" />
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Fetching Stakeholder Database...</p>
                       </div>
                    </td></tr>
                  ) : filteredOwners.map((o, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-lg transition-all border border-slate-100">
                                {(o.name || "U").charAt(0)}
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800">{o.name || "Unknown Owner"}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{o.loginId || o._id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{o.propertyTitle || "Main Property Portfolio"}</p>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                                <Building2 className="w-3 h-3" />
                                {o.propertiesCount || 1} Registered Assets
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="space-y-1">
                             <p className="text-xs font-bold text-slate-800">{o.checkinBankName || "Primary Bank"}</p>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase">
                                <CreditCard className="w-3 h-3 opacity-70" />
                                {o.checkinUpiId || "Settlement via Bank"}
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className="text-xs font-mono bg-slate-50 text-slate-400 px-3 py-1.5 rounded-xl border border-slate-100 font-bold group-hover:bg-white group-hover:text-purple-600 group-hover:shadow-md transition-all">
                             {o.locationCode || o.checkinArea || "IND"}
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[9px] font-bold px-3 py-1 rounded-full border shadow-sm uppercase",
                            (o.kycStatus === "verified" || o.kyc?.status === "verified") ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {(o.kycStatus || o.kyc?.status || "Pending Verification")}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
                                <ChevronRight className="w-4 h-4" />
                             </button>
                             <button 
                                onClick={() => handleDelete(o.loginId || o._id)}
                                className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-md transition-all"
                             >
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

function StatCardLarge({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    purple: "bg-purple-600 shadow-purple-200", 
    green: "bg-emerald-600 shadow-emerald-200", 
    blue: "bg-blue-600 shadow-blue-200", 
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
