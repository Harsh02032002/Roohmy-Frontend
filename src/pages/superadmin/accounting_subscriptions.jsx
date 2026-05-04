import React from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Wallet,
  ArrowUpCircle, ArrowDownCircle, RotateCcw, Plus,
  Download, Eye, CreditCard, RefreshCw
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const subs = [
  { id: "SUB-1024", customer: "Rahul Sharma", plan: "Gold", amount: "₹ 7,999", cycle: "Monthly", next: "26 Jun 2024", status: "Active" },
  { id: "SUB-1023", customer: "Priya Verma", plan: "Silver", amount: "₹ 2,999", cycle: "Monthly", next: "25 Jun 2024", status: "Active" },
  { id: "SUB-1022", customer: "Amit Kumar", plan: "Basic", amount: "₹ 999", cycle: "Monthly", next: "24 Jun 2024", status: "Active" },
  { id: "SUB-1021", customer: "Neha Singh", plan: "Silver", amount: "₹ 2,999", cycle: "Monthly", next: "23 Jun 2024", status: "Active" },
  { id: "SUB-1020", customer: "Vikram Patel", plan: "Gold", amount: "₹ 7,999", cycle: "Monthly", next: "—", status: "Cancelled" },
  { id: "SUB-1019", customer: "Sneha Iyer", plan: "Basic", amount: "₹ 999", cycle: "Monthly", next: "—", status: "Expired" },
];

export default function Subscriptions() {
  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
               <CreditCard className="w-6 h-6" />
            </div>
            <div>
               <h1 className="text-2xl font-black text-slate-800 tracking-tight">Subscriptions</h1>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Finance {">"} Recurring Revenue</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input placeholder="Search customer, ID..." className="bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:border-indigo-500 transition-all" />
            </div>
            <DateRangePill value="Growth: +14.2% MRR" />
         </div>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
         <StatCardSmall label="Active Subs" value="1,998" trend="+ 24 today" up icon={CreditCard} color="emerald" />
         <StatCardSmall label="Total Users" value="2,142" trend="+ 38 week" up icon={Users} color="blue" />
         <StatCardSmall label="Renewals (30d)" value="312" trend="92% rate" up icon={RefreshCw} color="indigo" />
         <StatCardSmall label="Churned" value="18" trend="- 4 vs last" up={false} icon={XCircle} color="rose" />
         <StatCardSmall label="MRR Growth" value="₹ 8.2L" trend="+ 12.1%" up icon={Zap} color="blue" />
         <StatCardSmall label="Avg Plan Value" value="₹ 4.1k" trend="+ 2.4%" up icon={Activity} color="indigo" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Subscription Directory</h3>
            <div className="flex items-center gap-4">
               <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-black text-slate-500 outline-none">
                  <option>All Plans</option>
                  <option>Gold</option>
                  <option>Silver</option>
                  <option>Basic</option>
               </select>
               <button className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all">
                  <Download className="w-4 h-4" /> Export MRR
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                     <th className="pb-6">Subscription ID</th>
                     <th className="pb-6">Customer Profile</th>
                     <th className="pb-6 text-center">Plan Tier</th>
                     <th className="pb-6 text-center">Billing Cycle</th>
                     <th className="pb-6 text-center">Status</th>
                     <th className="pb-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {subs.map((s, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="py-6">
                          <span className="text-xs font-mono bg-slate-50 text-slate-400 px-2 py-1 rounded-lg border border-slate-100 font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                             {s.id}
                          </span>
                       </td>
                       <td className="py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm shadow-sm group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                {s.customer.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-800">{s.customer}</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Next Billing: {s.next}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-tighter",
                            s.plan === "Gold" ? "bg-amber-50 text-amber-600 border-amber-100" :
                            s.plan === "Silver" ? "bg-slate-50 text-slate-600 border-slate-200" :
                            "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                             {s.plan} Plan
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-sm font-black text-slate-800">{s.amount}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{s.cycle}</p>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[9px] font-black px-3 py-1 rounded-full border shadow-sm uppercase tracking-widest",
                            s.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                            s.status === "Cancelled" ? "bg-rose-50 text-rose-600 border-rose-100" :
                            "bg-slate-50 text-slate-400 border-slate-100"
                          )}>
                             {s.status}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                                <Eye className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
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

function StatCardSmall({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { indigo: "bg-indigo-600 shadow-indigo-200", emerald: "bg-emerald-500 shadow-emerald-200", amber: "bg-amber-500 shadow-amber-200", rose: "bg-rose-500 shadow-rose-200", blue: "bg-blue-500 shadow-blue-200" };
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg flex items-center gap-5 group hover:-translate-y-1 transition-all">
       <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0 transition-transform group-hover:scale-110", bgColors[color])}>
          <Icon className="w-7 h-7" />
       </div>
       <div className="min-w-0">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{label}</p>
          <p className="text-2xl font-black text-slate-800 mb-0.5 truncate">{value}</p>
          <p className={cn("text-[9px] font-black", up ? "text-emerald-600" : "text-rose-600")}>{trend} {up ? "↑" : "↓"}</p>
       </div>
    </div>
  );
}
