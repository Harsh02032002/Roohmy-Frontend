import React from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Wallet,
  ArrowUpCircle, ArrowDownCircle, RotateCcw, Plus,
  Download, Eye, CreditCard, RefreshCw, Calculator,
  Receipt, FileText, Scale, LayoutGrid
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const taxes = [
  { id: "T-01", name: "GST", type: "Percentage", rate: "18%", appliesTo: "All Services", region: "India", status: "Active" },
  { id: "T-02", name: "CGST", type: "Percentage", rate: "9%", appliesTo: "Intra-state", region: "India", status: "Active" },
  { id: "T-03", name: "SGST", type: "Percentage", rate: "9%", appliesTo: "Intra-state", region: "India", status: "Active" },
  { id: "T-04", name: "IGST", type: "Percentage", rate: "18%", appliesTo: "Inter-state", region: "India", status: "Active" },
  { id: "T-05", name: "TDS", type: "Percentage", rate: "10%", appliesTo: "Commission", region: "India", status: "Active" },
  { id: "T-06", name: "Service Charge", type: "Fixed", rate: "₹ 50", appliesTo: "Listings", region: "All", status: "Disabled" },
];

export default function Taxes() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Tax & Compliance Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Accounting</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Regulatory Ledger</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Manage your regulatory rulebook, GST configurations, and platform tax liabilities with audit-ready precision.</p>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Collected" value="₹ 3.3L" trend="+ 15.6% from last month" up icon={Calculator} color="blue" />
        <StatCardLarge label="GST (18%) Revenue" value="₹ 2.7L" trend="Main Revenue Stream" up icon={Receipt} color="green" />
        <StatCardLarge label="Compliance SLA" value="99.8%" trend="Excellent Standing" up icon={Shield} color="indigo" />
        <StatCardLarge label="Active Tax Rules" value="05" trend="Platform Wide" up icon={Scale} color="slate" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Regulatory Rulebook</h3>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input placeholder="Search rules..." className="bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
               </div>
               <button className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase hover:bg-black transition-all shadow-xl shadow-slate-200">
                  <Plus className="w-4 h-4" /> Add Tax Rule
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Rule ID</th>
                     <th className="pb-6">Tax Identity</th>
                     <th className="pb-6 text-center">Type & Velocity</th>
                     <th className="pb-6 text-center">Operational Scope</th>
                     <th className="pb-6 text-center">Status</th>
                     <th className="pb-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {taxes.map((t, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <span className="text-xs font-mono bg-slate-50 text-slate-400 px-3 py-1.5 rounded-xl border border-slate-100 font-bold group-hover:bg-slate-800 group-hover:text-white group-hover:shadow-md transition-all">
                             {t.id}
                          </span>
                       </td>
                       <td className="py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-xs shadow-sm group-hover:bg-slate-800 group-hover:text-white transition-all">
                                {t.name.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-800">{t.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{t.region} Jurisdiction</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-base font-bold text-slate-800">{t.rate}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 opacity-70">{t.type}</p>
                       </td>
                       <td className="py-6 text-center">
                          <span className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100 uppercase group-hover:bg-white group-hover:shadow-sm transition-all">
                             {t.appliesTo}
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[9px] font-bold px-3 py-1 rounded-full border shadow-sm uppercase",
                            t.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                          )}>
                             {t.status}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-md transition-all">
                                <Eye className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-md transition-all">
                                <MoreVertical className="w-4 h-4" />
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
    slate: "bg-slate-800 shadow-slate-200" 
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
