import React from "react";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, Phone, Mail, User, Image as ImageIcon,
  Activity, Home, CheckCircle2, XCircle, Wallet,
  ArrowUpCircle, ArrowDownCircle, RotateCcw, Plus,
  Download, Eye, Percent, Database, TrendingUp,
  LayoutGrid, BarChart3
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const data = Array.from({ length: 7 }, (_, i) => ({ 
  name: `${20 + i} May`, 
  commission: 35000 + i * 4500 
}));

const records = [
  { id: "C-2148", listing: "Green Villa Residency", amount: "₹ 2,500", rate: "10%", base: "₹ 25,000", date: "26 May 2024", status: "Paid", initial: "GV", color: "blue" },
  { id: "C-2147", listing: "Silver Heights PG", amount: "₹ 850", rate: "10%", base: "₹ 8,500", date: "26 May 2024", status: "Pending", initial: "SH", color: "amber" },
  { id: "C-2146", listing: "Blue Bells Apartment", amount: "₹ 1,800", rate: "10%", base: "₹ 18,000", date: "25 May 2024", status: "Paid", initial: "BB", color: "indigo" },
  { id: "C-2145", listing: "Sunset Co-Living", amount: "₹ 1,200", rate: "10%", base: "₹ 12,000", date: "25 May 2024", status: "Paid", initial: "SC", color: "emerald" },
  { id: "C-2144", listing: "Maple House", amount: "₹ 3,000", rate: "10%", base: "₹ 30,000", date: "24 May 2024", status: "Pending", initial: "MH", color: "rose" },
  { id: "C-2143", listing: "Royal Apartments", amount: "₹ 2,200", rate: "10%", base: "₹ 22,000", date: "24 May 2024", status: "Paid", initial: "RA", color: "purple" },
];

export default function Commission() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Commission Intelligence Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Accounting</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Revenue Management</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Track platform service fees, commission cycles and revenue performance across your entire property inventory.</p>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge label="Total Commission" value="₹ 2.8L" trend="+ 12.4% from last month" up icon={Database} color="indigo" />
        <StatCardLarge label="Net Profit" value="₹ 4.2L" trend="+ 18.7% Velocity" up icon={Zap} color="blue" />
        <StatCardLarge label="Pending Commission" value="₹ 38.4k" trend="14 Active Listings" up icon={Wallet} color="orange" />
        <StatCardLarge label="Monthly Growth" value="+ 12.4%" trend="Revenue Acceleration" up icon={TrendingUp} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Trend Chart */}
         <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">Earnings Trend</h3>
               <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  Daily Rev
               </div>
            </div>
            <div className="flex-1 min-h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-15} tickFormatter={v => `${v/1000}k`} />
                     <Tooltip 
                        contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}}
                        cursor={{fill: '#f8fafc'}}
                     />
                     <Bar dataKey="commission" radius={[10, 10, 10, 10]} barSize={24}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#4F46E5' : '#E0E7FF'} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Commission Ledger */}
         <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">Revenue Ledger</h3>
               <div className="flex items-center gap-4">
                  <div className="relative group">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                     <input placeholder="Search listings..." className="bg-slate-50 border-none rounded-2xl py-2.5 pl-11 pr-4 text-xs font-bold shadow-sm w-48 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <button className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase hover:bg-emerald-100 transition-all">
                     <Download className="w-4 h-4" /> Export Ledger
                  </button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left min-w-[800px]">
                  <thead>
                     <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                        <th className="pb-6">Audit ID</th>
                        <th className="pb-6">Property Listing</th>
                        <th className="pb-6 text-center">Base Amount</th>
                        <th className="pb-6 text-center">Commission (10%)</th>
                        <th className="pb-6 text-center">Status</th>
                        <th className="pb-6 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {records.map((r, i) => (
                       <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                          <td className="py-6">
                             <span className="text-xs font-mono bg-slate-50 text-slate-400 px-3 py-1.5 rounded-xl border border-slate-100 font-bold group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-md transition-all">
                                {r.id}
                             </span>
                          </td>
                          <td className="py-6">
                             <div className="flex items-center gap-4">
                                <div className={cn(
                                   "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-md",
                                   r.color === "blue" ? "bg-blue-600" :
                                   r.color === "indigo" ? "bg-indigo-600" :
                                   r.color === "emerald" ? "bg-emerald-600" :
                                   r.color === "amber" ? "bg-amber-600" :
                                   r.color === "purple" ? "bg-purple-600" : "bg-rose-600"
                                )}>
                                   {r.initial}
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800">{r.listing}</p>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{r.date}</p>
                                </div>
                             </div>
                          </td>
                          <td className="py-6 text-center">
                             <p className="text-xs font-bold text-slate-700">{r.base}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 opacity-70">Rate: {r.rate}</p>
                          </td>
                          <td className="py-6 text-center">
                             <p className="text-base font-bold text-emerald-600">{r.amount}</p>
                          </td>
                          <td className="py-6 text-center">
                             <span className={cn(
                               "text-[9px] font-bold px-3 py-1 rounded-full border shadow-sm uppercase",
                               r.status === "Paid" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                             )}>
                                {r.status}
                             </span>
                          </td>
                          <td className="py-6 text-right">
                             <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all">
                                <Eye className="w-4 h-4" />
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCardLarge({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    indigo: "bg-indigo-600 shadow-indigo-200", 
    blue: "bg-blue-600 shadow-blue-200", 
    green: "bg-emerald-600 shadow-emerald-200", 
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
