import React, { useEffect, useMemo, useState } from "react";
import { 
  Users, UserCheck, Shield, Clock, MoreVertical, 
  ArrowUpRight, ArrowDownRight, Building2, Search,
  CheckCircle2, AlertCircle, XCircle, Globe,
  Phone, Mail, Calendar, MapPin, Zap, Filter,
  ChevronRight, RefreshCw, LayoutGrid, Plus,
  Loader2, Save, Sparkles, Layers, Box, Globe2,
  IndianRupee, Inbox, CreditCard, Tag, ShieldCheck,
  Smartphone, Monitor, Info
} from "lucide-react";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
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
      email: tenant?.email || profile?.email || "No Email",
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
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
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
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Resident Hub</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Tenant Lifecycle Governance & Compliance Monitoring Matrix</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-slate-800/10 hover:bg-slate-900 transition-all flex items-center gap-2">
               <Plus className="w-3.5 h-3.5" /> Deploy Resident
            </button>
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardHorizontal label="Active Residents" value={stats.total} trend="+12.5% Delta" up icon={Users} color="blue" />
        <StatCardHorizontal label="KYC Verified" value={stats.verified} trend="Compliant" up icon={ShieldCheck} color="emerald" />
        <StatCardHorizontal label="Occupancy Pulse" value="342 Units" trend="+15.2% Yield" up icon={Zap} color="indigo" />
        <StatCardHorizontal label="Awaiting Audit" value={stats.submitted} trend="Manual Review" up icon={Clock} color="amber" />
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">Resident Registry</h3>
            <div className="flex items-center gap-3">
               <div className="relative group w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search residents, assets..." 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
                  />
               </div>
               <button onClick={loadTenants} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                  <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-slate-400 text-[8px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-4">Resident Identity Hub</th>
                     <th className="pb-4">Asset / Unit Pulse</th>
                     <th className="pb-4 text-center">Lifecycle Pulse</th>
                     <th className="pb-4 text-center">Audit Status</th>
                     <th className="pb-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="5" className="py-20 text-center">
                       <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Accessing Resident Database Intelligence...</p>
                    </td></tr>
                  ) : filteredTenants.map((t, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                       <td className="py-3">
                          <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-xs shadow-sm transition-transform group-hover:scale-105 shrink-0">
                                {t.profile.name.charAt(0).toUpperCase()}
                             </div>
                             <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-800 leading-none truncate max-w-[150px]">{t.profile.name}</p>
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 opacity-60 leading-none">ID: {t.loginId || "N/A"}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-3">
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold text-slate-700 leading-none truncate max-w-[180px]">{t.profile.propertyText}</p>
                             <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 uppercase leading-none opacity-60">
                                <MapPin className="w-3 h-3" />
                                Unit {t.profile.roomNo} • {formatDate(t.profile.moveInDate)}
                             </div>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <div className="inline-flex flex-col items-center gap-1">
                             <p className="text-[10px] font-bold text-slate-800 leading-none">{t.profile.phone}</p>
                             <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest opacity-60 leading-none truncate max-w-[100px]">{t.profile.email}</p>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <span className={cn(
                             "text-[7px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider shadow-sm",
                             t.kyc.status === "verified" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                             t.kyc.status === "submitted" ? "bg-amber-50 text-amber-600 border-amber-100" :
                             "bg-slate-50 text-slate-400 border-slate-100"
                          )}>
                             {t.kyc.status}
                          </span>
                       </td>
                       <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                             <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm"><ChevronRight className="w-3.5 h-3.5" /></button>
                             <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm"><MoreVertical className="w-3.5 h-3.5" /></button>
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
