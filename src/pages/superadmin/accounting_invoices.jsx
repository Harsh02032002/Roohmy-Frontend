import React from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Wallet,
  ArrowUpCircle, ArrowDownCircle, RotateCcw, Plus,
  Download, Eye, Send, FileText, Receipt, LayoutGrid
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const invoices = [
  { id: "INV-2025-0512", customer: "Rahul Sharma", amount: "₹ 25,000", issued: "26 May 2024", due: "10 Jun 2024", status: "Paid", initial: "RS", color: "emerald" },
  { id: "INV-2025-0511", customer: "Priya Verma", amount: "₹ 8,500", issued: "26 May 2024", due: "10 Jun 2024", status: "Paid", initial: "PV", color: "emerald" },
  { id: "INV-2025-0510", customer: "Amit Kumar", amount: "₹ 18,000", issued: "25 May 2024", due: "09 Jun 2024", status: "Pending", initial: "AK", color: "amber" },
  { id: "INV-2025-0509", customer: "Neha Singh", amount: "₹ 12,000", issued: "25 May 2024", due: "09 Jun 2024", status: "Paid", initial: "NS", color: "emerald" },
  { id: "INV-2025-0508", customer: "Vikram Patel", amount: "₹ 30,000", issued: "20 May 2024", due: "04 Jun 2024", status: "Overdue", initial: "VP", color: "rose" },
  { id: "INV-2025-0507", customer: "Sneha Iyer", amount: "₹ 22,000", issued: "18 May 2024", due: "02 Jun 2024", status: "Overdue", initial: "SI", color: "rose" },
  { id: "INV-2025-0506", customer: "Karan Mehta", amount: "₹ 9,500", issued: "15 May 2024", due: "30 May 2024", status: "Draft", initial: "KM", color: "slate" },
];

export default function Invoices() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Invoice Intelligence Center</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Accounting</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Document Management</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Monitor your fiscal documentation, track payment cycles and generate audit-ready invoices.</p>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Invoices" value="1,245" trend="+ 58 this month" up icon={FileText} color="blue" />
        <StatCardLarge label="Paid Volume" value="₹ 14.8L" trend="94.7% Settlement" up icon={CheckCircle2} color="green" />
        <StatCardLarge label="Pending Collections" value="₹ 3.2L" trend="Requires Follow-up" up icon={Receipt} color="orange" />
        <StatCardLarge label="Overdue Invoices" value="12" trend="+ 2.1% from last week" up={false} icon={AlertCircle} color="red" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Invoice Ledger</h3>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input placeholder="Search invoices..." className="bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
               </div>
               <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                  <Plus className="w-4 h-4" /> Create Invoice
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
               <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                     <th className="pb-6">Document Identity</th>
                     <th className="pb-6">Billed Recipient</th>
                     <th className="pb-6 text-center">Amount (₹)</th>
                     <th className="pb-6 text-center">Issued Date</th>
                     <th className="pb-6 text-center">Settlement Status</th>
                     <th className="pb-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {invoices.map((inv, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                       <td className="py-6">
                          <span className="text-xs font-mono bg-slate-50 text-slate-400 px-3 py-1.5 rounded-xl border border-slate-100 font-bold group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-md transition-all">
                             {inv.id}
                          </span>
                       </td>
                       <td className="py-6">
                          <div className="flex items-center gap-4">
                             <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-md",
                                inv.color === "emerald" ? "bg-emerald-600" :
                                inv.color === "amber" ? "bg-amber-600" :
                                inv.color === "rose" ? "bg-rose-600" : "bg-slate-600"
                             )}>
                                {inv.initial}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-800">{inv.customer}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Primary Tenant</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-base font-bold text-slate-800">{inv.amount}</p>
                       </td>
                       <td className="py-6 text-center">
                          <p className="text-xs font-bold text-slate-700">{inv.issued}</p>
                          <p className="text-[10px] font-bold text-rose-500 uppercase mt-1">Due: {inv.due}</p>
                       </td>
                       <td className="py-6 text-center">
                          <span className={cn(
                            "text-[9px] font-bold px-3 py-1 rounded-full border shadow-sm uppercase",
                            inv.status === "Paid" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                            inv.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-100" :
                            inv.status === "Overdue" ? "bg-rose-50 text-rose-600 border-rose-100" :
                            "bg-slate-50 text-slate-600 border-slate-100"
                          )}>
                             {inv.status}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
                                <Eye className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
                                <Send className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
                                <Download className="w-4 h-4" />
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
         {trend}
      </div>
    </div>
  );
}

function AlertCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
