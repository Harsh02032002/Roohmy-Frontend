import React, { useEffect, useMemo, useState } from "react";
import { 
  Users, UserCheck, Shield, Clock, MoreVertical, 
  ArrowUpRight, ArrowDownRight, Building2, Search,
  CheckCircle2, AlertCircle, XCircle, Globe,
  Phone, Mail, Calendar, MapPin, Zap, Filter,
  ChevronRight, RefreshCw, LayoutGrid, Plus,
  Loader2, Save, Sparkles, Layers, Box, Globe2,
  IndianRupee, Inbox, CreditCard, Tag
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getPropertyText(tenant, profile = {}) {
  const propertyObj = tenant?.property && typeof tenant.property === "object" ? tenant.property : null;
  const profileName = profile.propertyName || tenant?.tenantProfile?.propertyName || tenant?.digitalCheckin?.profile?.propertyName;
  const propertyTitle = profileName || tenant?.propertyTitle || tenant?.propertyName || propertyObj?.title || propertyObj?.name || "";
  const location = propertyObj?.locationCode || "";
  if (propertyTitle && location && !propertyTitle.includes(location)) return `${propertyTitle} (${location})`;
  return propertyTitle || location || "Unknown Asset";
}

function normalizeTenant(tenant, record) {
  const profile = record?.tenantProfile || tenant?.digitalCheckin?.profile || {};
  const tenantKyc = record?.tenantKyc || tenant?.digitalCheckin?.kyc || {};
  const modelKyc = tenant?.kyc || {};
  const aadhaarNumber = modelKyc.aadhaarNumber || modelKyc.aadhar || tenantKyc.aadhaarNumber || "";
  const kycStatus = tenant?.kycStatus || tenantKyc?.digilockerStatus || (modelKyc.digilockerVerified || modelKyc.otpVerified ? "verified" : "") || (aadhaarNumber ? "submitted" : "") || "pending";

  return {
    ...tenant,
    profile: {
      name: tenant?.name || profile?.name || "Resident",
      email: tenant?.email || profile?.email || "No Email Record",
      phone: tenant?.phone || profile?.phone || "No Contact",
      dob: tenant?.dob || profile?.dob || "",
      moveInDate: tenant?.moveInDate || profile?.moveInDate || "",
      roomNo: tenant?.roomNo || profile?.roomNo || tenant?.room?.number || "N/A",
      propertyText: getPropertyText(tenant, profile)
    },
    kyc: {
      status: String(kycStatus || "pending").toLowerCase(),
      aadhaarNumber
    }
  };
}

export default function Tenant() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadTenants = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/tenants");
      const baseTenants = Array.isArray(data) ? data : Array.isArray(data?.tenants) ? data.tenants : [];
      const merged = await Promise.all(baseTenants.map(async (t) => {
        if (!t?.loginId) return normalizeTenant(t, null);
        try {
          const checkin = await fetchJson(`/api/checkin/tenant/${encodeURIComponent(t.loginId)}`);
          return normalizeTenant(t, checkin?.record || null);
        } catch (_) { return normalizeTenant(t, null); }
      }));
      setTenants(merged);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { loadTenants(); }, []);

  const filteredTenants = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tenants;
    return tenants.filter(t => {
      const haystack = [t.profile.name, t.profile.phone, t.profile.propertyText, t.loginId].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [tenants, search]);

  const stats = useMemo(() => {
    const total = tenants.length;
    const verified = tenants.filter(t => t.kyc.status === "verified").length;
    const submitted = tenants.filter(t => t.kyc.status === "submitted").length;
    return { total, verified, submitted, pending: total - verified - submitted };
  }, [tenants]);

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Resident Intelligence Ledger</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>User Management</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Active Resident Directory</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Monitor platform-wide resident lifecycles, audit verification compliance and manage regional occupancy velocity with high-fidelity personnel analytics.</p>
         <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Provision New Resident
         </button>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Residents" value={stats.total} trend="+ 12.5% Growth" up icon={Users} color="blue" />
        <StatCardLarge label="Verified Hub" value={stats.verified} trend="Compliance Elite" up icon={ShieldCheck} color="green" />
        <StatCardLarge label="Active Pulse" value="342" trend="+ 15.2% Flux" up icon={Zap} color="indigo" />
        <StatCardLarge label="Awaiting Audit" value={stats.submitted} trend="Action Required" up={false} icon={Clock} color="orange" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Resident Intelligence Ledger</h3>
            <div className="flex items-center gap-4">
               <div className="relative group w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search resident pulse..." 
                    className="bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm w-full outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
               </div>
               <button onClick={loadTenants} className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                  <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Resident Identity</th>
                     <th className="pb-6">Asset Context / Unit</th>
                     <th className="pb-6 text-center">Lifecycle Contact</th>
                     <th className="pb-6 text-center">Compliance Status</th>
                     <th className="pb-6 text-right">Resident Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="5" className="py-32 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Resident Database...</p>
                       </div>
                    </td></tr>
                  ) : filteredTenants.map((t, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <div className="flex items-center gap-5">
                             <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-xl transition-all">
                                {t.profile.name.charAt(0).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800">{t.profile.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest leading-none">ID: {t.loginId}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="space-y-1.5">
                             <p className="text-sm font-bold text-slate-700 truncate max-w-[250px]">{t.profile.propertyText}</p>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-70">
                                <MapPin className="w-3.5 h-3.5" />
                                Unit {t.profile.roomNo} • In: {formatDate(t.profile.moveInDate)}
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <div className="inline-flex flex-col items-center gap-1.5 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-[1.25rem] group-hover:bg-white group-hover:shadow-md transition-all">
                             <p className="text-xs font-bold text-slate-800">{t.profile.phone}</p>
                             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{t.profile.email}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                             "text-[9px] font-bold px-3.5 py-1.5 rounded-full border shadow-sm uppercase tracking-widest",
                             t.kyc.status === "verified" ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50" :
                             t.kyc.status === "submitted" ? "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-50" :
                             "bg-slate-50 text-slate-400 border-slate-100"
                          )}>
                             {t.kyc.status} Protocol
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100 shadow-sm" title="View Resident Pulse">
                                <ChevronRight className="w-5 h-5" />
                             </button>
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100 shadow-sm">
                                <MoreVertical className="w-5 h-5" />
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
