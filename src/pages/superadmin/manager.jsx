import React, { useEffect, useMemo, useState } from "react";
import { 
  Users, Shield, Clock, Search, ArrowUpRight, 
  ArrowDownRight, MoreVertical, Filter, Globe, 
  MapPin, Zap, Trash2, ChevronRight, Phone, 
  Mail, User, Megaphone, Calculator, Hammer, 
  Headset, Star, ShieldCheck, Key, LogOut, RefreshCw,
  Activity, LayoutGrid, FileText, Sparkles,
  Layers, Box, Globe2, Loader2, Save, Plus
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Manager() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTeam, setCurrentTeam] = useState("All");
  const [search, setSearch] = useState("");

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/employees");
      const base = data.data || data.employees || data || [];
      setEmployees(base);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEmployees(); }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(e => {
      const matchesSearch = (e.name || "").toLowerCase().includes(search.toLowerCase()) || (e.loginId || "").toLowerCase().includes(search.toLowerCase());
      const matchesTeam = currentTeam === "All" ? true : e.role === currentTeam;
      return matchesSearch && matchesTeam;
    });
  }, [employees, search, currentTeam]);

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.isActive !== false).length;
    return { total, active, marketing: employees.filter(e => e.role === "Marketing Team").length, maintenance: employees.filter(e => e.role === "Maintenance Team").length };
  }, [employees]);

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Administrative Intelligence Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Platform Governance</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Personnel & Administrative Access</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <p className="text-sm font-bold text-slate-400 max-w-2xl">Manage platform-wide administrative roles, audit personnel access velocity and configure departmental governance protocols with audit-ready precision.</p>
         <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Provision New Access
         </button>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Workforce" value={stats.total} trend="+ 5.2% Flux" up icon={Users} color="blue" />
        <StatCardLarge label="Active Pulse" value={stats.active} trend="98% Operational" up icon={Activity} color="green" />
        <StatCardLarge label="Growth Hub" value={stats.marketing} trend="Marketing Team" up icon={Megaphone} color="indigo" />
        <StatCardLarge label="Resolution Hub" value="12" trend="Support Velocity" up icon={Headset} color="purple" />
      </div>

      {/* Main Directory Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-10">
               <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Personnel Intelligence Ledger</h3>
               <div className="hidden xl:flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  {["All", "Marketing Team", "Maintenance Team", "Customer Support"].map(team => (
                    <button 
                      key={team} 
                      onClick={() => setCurrentTeam(team)}
                      className={cn(
                        "px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all",
                        currentTeam === team ? "bg-white text-blue-600 shadow-md border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                       {team === "All" ? "Global Staff" : team.split(" ")[0]}
                    </button>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search personnel..." 
                    className="bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
               </div>
               <button onClick={loadEmployees} className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                  <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Personnel Profile</th>
                     <th className="pb-6">Departmental Hub</th>
                     <th className="pb-6 text-center">Operational Signature</th>
                     <th className="pb-6 text-center">Active Pulse</th>
                     <th className="pb-6 text-right">Governance Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="5" className="py-32 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Secure Personnel Vault...</p>
                       </div>
                    </td></tr>
                  ) : filteredEmployees.map((e, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <div className="flex items-center gap-5">
                             <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-xl transition-all overflow-hidden">
                                {e.photoDataUrl ? <img src={e.photoDataUrl} className="w-full h-full object-cover" alt="" /> : (e.name || "U").charAt(0).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-base font-bold text-slate-800">{e.name || "Unknown Personnel"}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">ID: {e.loginId}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-slate-700">{e.role}</p>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                <Mail className="w-3.5 h-3.5 opacity-40" />
                                {e.email || "No Email Record"}
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <div className="inline-flex flex-col items-center gap-1.5 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-[1.25rem] group-hover:bg-white group-hover:shadow-md transition-all">
                             <p className="text-xs font-bold text-slate-800">{e.area || "Global Hub"}</p>
                             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{e.city || "Headquarters"}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                             "text-[9px] font-bold px-3.5 py-1.5 rounded-full border shadow-sm uppercase tracking-widest",
                             e.isActive !== false ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                          )}>
                             {e.isActive !== false ? "Operational" : "Restricted"}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all border border-slate-100" title="Manage Identity Keys">
                                <Key className="w-4 h-4" />
                             </button>
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all border border-slate-100" title="Audit Permissions">
                                <Shield className="w-4 h-4" />
                             </button>
                             <button className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                                <LogOut className="w-4 h-4" />
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
    purple: "bg-purple-600 shadow-purple-200" 
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
