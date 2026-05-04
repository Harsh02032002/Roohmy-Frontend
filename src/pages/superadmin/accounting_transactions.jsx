import React from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Wallet,
  ArrowUpCircle, ArrowDownCircle, RotateCcw, Plus,
  Download, Eye, CreditCard, LayoutGrid
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const txns = [
  { id: "TXN-125487", desc: "Property listing payment - Green Villa", type: "Income", amount: "₹ 25,000", method: "Razorpay", status: "Completed", date: "26 May 2024" },
  { id: "TXN-125486", desc: "Commission - Green Villa", type: "Commission", amount: "₹ 2,500", method: "Internal", status: "Completed", date: "26 May 2024" },
  { id: "TXN-125485", desc: "Payout to owner - Green Villa", type: "Payout", amount: "₹ 22,500", method: "Bank Transfer", status: "Completed", date: "25 May 2024" },
  { id: "TXN-125484", desc: "Subscription - Silver Plan", type: "Subscription", amount: "₹ 8,999", method: "Stripe", status: "Completed", date: "25 May 2024" },
  { id: "TXN-125483", desc: "Featured listing - Blue Residency", type: "Income", amount: "₹ 1,999", method: "Razorpay", status: "Completed", date: "24 May 2024" },
  { id: "TXN-125482", desc: "Refund - Cancelled Subscription", type: "Refund", amount: "₹ 8,999", method: "Stripe", status: "Refunded", date: "24 May 2024" },
  { id: "TXN-125481", desc: "Payout to owner - Blue Residency", type: "Payout", amount: "₹ 18,000", method: "Bank Transfer", status: "Completed", date: "23 May 2024" },
  { id: "TXN-125480", desc: "Failed payment - Sunset PG", type: "Income", amount: "₹ 12,000", method: "PayPal", status: "Failed", date: "23 May 2024" },
];

export default function Transactions() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Financial Transaction Ledger</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Accounting</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Transaction History</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Deep dive into your global financial velocity, transaction audits, and ledger flows.</p>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Volume" value="₹ 18.7L" trend="+ 15.6% from last month" up icon={Wallet} color="blue" />
        <StatCardLarge label="Gross Income" value="₹ 14.2L" trend="+ 12.4% from last month" up icon={ArrowDownCircle} color="green" />
        <StatCardLarge label="Total Payouts" value="₹ 12.4L" trend="+ 8.3% from last month" up icon={ArrowUpCircle} color="orange" />
        <StatCardLarge label="Net Growth" value="12.4%" trend="+ 2.1% from last month" up icon={Zap} color="indigo" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Audit-Ready Ledger</h3>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input placeholder="Search TXN ID..." className="bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
               </div>
               <button className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase hover:bg-emerald-100 transition-all">
                  <Download className="w-4 h-4" /> Export Ledger
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1100px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">TXN Identity</th>
                     <th className="pb-6">Fiscal Description</th>
                     <th className="pb-6 text-center">Velocity Type</th>
                     <th className="pb-6 text-center">Amount (₹)</th>
                     <th className="pb-6 text-center">Gateway</th>
                     <th className="pb-6 text-center">Audit Status</th>
                     <th className="pb-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {txns.map((tx, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <span className="text-xs font-mono bg-slate-50 text-slate-400 px-3 py-1.5 rounded-xl border border-slate-100 font-bold group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-md transition-all">
                             {tx.id}
                          </span>
                       </td>
                       <td className="py-6">
                          <div className="max-w-xs">
                             <p className="text-sm font-bold text-slate-800 truncate">{tx.desc}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{tx.date}</p>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[9px] font-bold px-3 py-1 rounded-lg uppercase shadow-sm border",
                            tx.type === "Income" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            tx.type === "Payout" ? "bg-amber-50 text-amber-600 border-amber-100" :
                            tx.type === "Commission" ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                            tx.type === "Refund" ? "bg-rose-50 text-rose-600 border-rose-100" :
                            "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                             {tx.type}
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <p className={cn("text-base font-bold", tx.type === "Income" || tx.type === "Commission" ? "text-emerald-600" : "text-rose-600")}>
                             {tx.amount}
                          </p>
                       </td>
                       <td className="py-6 text-center">
                          <div className="flex flex-col items-center gap-1">
                             <p className="text-[10px] font-bold text-slate-700 uppercase">{tx.method}</p>
                             <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden"><div className="w-2/3 h-full bg-blue-500" /></div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[9px] font-bold px-3 py-1 rounded-full border shadow-sm uppercase",
                            tx.status === "Completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                            tx.status === "Failed" ? "bg-rose-50 text-rose-600 border-rose-100" :
                            "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                             {tx.status}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
                                <Eye className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
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
    orange: "bg-amber-600 shadow-amber-200", 
    indigo: "bg-indigo-600 shadow-indigo-200" 
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
         {trend.split(' ')[1]}
      </div>
    </div>
  );
}
