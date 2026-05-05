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
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Personnel Hub</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Platform Governance & Staff Directory</p>
         </div>
         <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-slate-800/10 hover:bg-slate-900 transition-all flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" /> New Access
         </button>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardHorizontal label="Workforce" value={stats.total} trend="+5.2% Flux" up icon={Users} color="blue" />
        <StatCardHorizontal label="Operational" value={stats.active} trend="Optimal" up icon={Activity} color="emerald" />
        <StatCardHorizontal label="Marketing" value={stats.marketing} trend="Growth Hub" up icon={Megaphone} color="indigo" />
        <StatCardHorizontal label="Support" value="12" trend="Velocity" up icon={Headset} color="purple" />
      </div>

      {/* Main Directory */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Intelligence Ledger</h3>
               <div className="hidden xl:flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
                  {["All", "Marketing Team", "Maintenance Team"].map(team => (
                    <button 
                      key={team} 
                      onClick={() => setCurrentTeam(team)}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all",
                        currentTeam === team ? "bg-white text-blue-600 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                       {team === "All" ? "Global" : team.split(" ")[0]}
                    </button>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                  <input 
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search personnel..." 
                    className="bg-slate-50 border-none rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all w-48" 
                  />
               </div>
               <button onClick={loadEmployees} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all">
                  <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-slate-400 text-[8px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-4">Personnel</th>
                     <th className="pb-4">Department</th>
                     <th className="pb-4 text-center">Territory</th>
                     <th className="pb-4 text-center">Status</th>
                     <th className="pb-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan="5" className="py-20 text-center">
                       <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Accessing Vault...</p>
                    </td></tr>
                  ) : filteredEmployees.map((e, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                       <td className="py-3">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm transition-all overflow-hidden shrink-0">
                                {e.photoDataUrl ? <img src={e.photoDataUrl} className="w-full h-full object-cover" alt="" /> : (e.name || "U").charAt(0).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-[11px] font-bold text-slate-800">{e.name || "Unknown"}</p>
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">ID: {e.loginId}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-3">
                          <div className="space-y-0.5">
                             <p className="text-[10px] font-bold text-slate-700">{e.role}</p>
                             <p className="text-[8px] font-bold text-slate-400 truncate max-w-[150px]">{e.email}</p>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <div className="inline-flex flex-col items-center bg-slate-50 px-3 py-1 rounded-lg border border-slate-50">
                             <p className="text-[9px] font-bold text-slate-800">{e.area || "Global"}</p>
                             <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">{e.city || "HQ"}</p>
                          </div>
                       </td>
                       <td className="py-3 text-center">
                          <span className={cn(
                             "text-[7px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider",
                             e.isActive !== false ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                          )}>
                             {e.isActive !== false ? "Active" : "Locked"}
                          </span>
                       </td>
                       <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100">
                                <Key className="w-3.5 h-3.5" />
                             </button>
                             <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all border border-slate-100">
                                <Shield className="w-3.5 h-3.5" />
                             </button>
                             <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-600 transition-all border border-slate-100">
                                <Trash2 className="w-3.5 h-3.5" />
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

function StatCardHorizontal({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    blue: "bg-blue-50 text-blue-600 border-blue-100", 
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100", 
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100", 
    purple: "bg-purple-50 text-purple-600 border-purple-100" 
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
