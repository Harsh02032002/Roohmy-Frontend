import React from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Wallet,
  ArrowUpCircle, ArrowDownCircle, RotateCcw, Plus,
  Download, Eye, Send, CreditCard
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const payouts = [
  { id: "PO-3045", recipient: "Rahul Sharma", account: "HDFC ****4521", amount: "₹ 22,500", method: "Bank Transfer", date: "26 May 2024", status: "Completed", initial: "RS", color: "blue" },
  { id: "PO-3044", recipient: "Priya Verma", account: "ICICI ****8842", amount: "₹ 7,650", method: "Bank Transfer", date: "26 May 2024", status: "Processing", initial: "PV", color: "indigo" },
  { id: "PO-3043", recipient: "Amit Kumar", account: "SBI ****1289", amount: "₹ 16,200", method: "Bank Transfer", date: "25 May 2024", status: "Completed", initial: "AK", color: "emerald" },
  { id: "PO-3042", recipient: "Neha Singh", account: "Axis ****3654", amount: "₹ 10,800", method: "UPI", date: "25 May 2024", status: "Completed", initial: "NS", color: "amber" },
  { id: "PO-3041", recipient: "Vikram Patel", account: "Kotak ****9921", amount: "₹ 27,000", method: "Bank Transfer", date: "24 May 2024", status: "Pending", initial: "VP", color: "purple" },
  { id: "PO-3040", recipient: "Sneha Iyer", account: "HDFC ****5544", amount: "₹ 19,800", method: "UPI", date: "24 May 2024", status: "Failed", initial: "SI", color: "rose" },
];

export default function Payouts() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Owner Payout Settlement</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Accounting</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Settlement Center</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Manage owner disbursements, settlement cycles, and automated payouts with audit-ready tracking.</p>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Payouts" value="₹ 12.4L" trend="+ 8.3% from last month" up icon={Send} color="purple" />
        <StatCardLarge label="Settlement SLA" value="99.4%" trend="Excellent Performance" up icon={Zap} color="blue" />
        <StatCardLarge label="Available Bal" value="₹ 4.5L" trend="Disbursable Funds" up icon={Wallet} color="green" />
        <StatCardLarge label="Failed Trans" value="03" trend="- 1.2% from last week" up={false} icon={XCircle} color="red" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Settlement Records</h3>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input placeholder="Search recipient..." className="bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
               </div>
               <button className="flex items-center gap-2 bg-purple-50 text-purple-600 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase hover:bg-purple-600 hover:text-white transition-all shadow-sm">
                  <Plus className="w-4 h-4" /> Process Payout
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">PO Identity</th>
                     <th className="pb-6">Recipient Name</th>
                     <th className="pb-6 text-center">Account / Method</th>
                     <th className="pb-6 text-center">Disbursed (₹)</th>
                     <th className="pb-6 text-center">Settlement Status</th>
                     <th className="pb-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {payouts.map((p, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <span className="text-xs font-mono bg-slate-50 text-slate-400 px-3 py-1.5 rounded-xl border border-slate-100 font-bold group-hover:bg-white group-hover:text-purple-600 group-hover:shadow-md transition-all">
                             {p.id}
                          </span>
                       </td>
                       <td className="py-6">
                          <div className="flex items-center gap-4">
                             <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-md",
                                p.color === "blue" ? "bg-blue-600" :
                                p.color === "indigo" ? "bg-indigo-600" :
                                p.color === "emerald" ? "bg-emerald-600" :
                                p.color === "amber" ? "bg-amber-600" :
                                p.color === "purple" ? "bg-purple-600" : "bg-rose-600"
                             )}>
                                {p.initial}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-800">{p.recipient}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{p.date}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-xs font-bold text-slate-700">{p.account}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 opacity-70">{p.method}</p>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-base font-bold text-slate-800">{p.amount}</p>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[9px] font-bold px-3 py-1 rounded-full border shadow-sm uppercase",
                            p.status === "Completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                            p.status === "Processing" ? "bg-blue-50 text-blue-600 border-blue-100" :
                            p.status === "Failed" ? "bg-rose-50 text-rose-600 border-rose-100" :
                            "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {p.status}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-purple-600 hover:bg-white hover:shadow-md transition-all">
                                <Eye className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-purple-600 hover:bg-white hover:shadow-md transition-all">
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
    purple: "bg-purple-600 shadow-purple-200", 
    blue: "bg-blue-600 shadow-blue-200", 
    green: "bg-emerald-600 shadow-emerald-200", 
    red: "bg-rose-600 shadow-rose-200" 
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
         {trend.split(' ')[1] === 'from' ? trend.split(' ')[0] : trend}
      </div>
    </div>
  );
}
