import React from "react";
import { 
  Wallet, Clock, CheckCircle2, AlertCircle, ArrowUpRight, 
  ArrowDownRight, ChevronRight, Search, Filter, 
  MoreVertical, Download, Plus, Calendar, DollarSign,
  FileText, Activity, ShieldCheck, CreditCard,
  Sparkles, Layers, Box, Globe2, IndianRupee,
  Inbox, ImageIcon, Save, RefreshCw, Info,
  Smartphone, Monitor
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const collectionHealth = [
  { name: "Collected Yield", value: 842, color: "#10B981", percent: "68.2%" },
  { name: "Pending Pulse", value: 276, color: "#F59E0B", percent: "22.4%" },
  { name: "Overdue Risk", value: 117, color: "#EF4444", percent: "9.4%" },
];

const recentCollections = [
  { id: "TXN-12845", tenant: "Rohit Sharma", property: "Sunrise Heights - A101", amount: "₹ 12,000", status: "Collected", date: "28 May", time: "10:35 AM", initial: "RS", color: "blue" },
  { id: "TXN-12846", tenant: "Priya Mehta", property: "Green Park - B203", amount: "₹ 8,500", status: "Pending", date: "27 May", time: "09:45 AM", initial: "PM", color: "indigo" },
  { id: "TXN-12847", tenant: "Amit Patel", property: "Ocean View - C101", amount: "₹ 15,000", status: "Overdue", date: "26 May", time: "11:20 AM", initial: "AP", color: "rose" },
  { id: "TXN-12848", tenant: "Neha Singh", property: "Lake View - D404", amount: "₹ 9,000", status: "Collected", date: "26 May", time: "04:15 PM", initial: "NS", color: "orange" },
  { id: "TXN-12849", tenant: "David Chen", property: "Prime City - E502", amount: "₹ 11,000", status: "Collected", date: "25 May", time: "08:30 AM", initial: "DC", color: "green" },
];

export default function SuperadminRentCollection() {
  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Revenue Logistics</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Global Revenue Collection, Financial Yield Monitoring & Fiscal Compliance Matrix</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-slate-800/10 hover:bg-slate-900 transition-all flex items-center gap-2">
               <Download className="w-3.5 h-3.5" /> Export Fiscal Audit
            </button>
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardHorizontal label="Gross Receivables" value="₹4.2M" trend="+12.5% Yield" up icon={IndianRupee} color="blue" />
        <StatCardHorizontal label="Collected Pulse" value="₹3.1M" trend="Operational" up icon={CheckCircle2} color="emerald" />
        <StatCardHorizontal label="Overdue Risk" value="₹260k" trend="Manual Review" up={false} icon={AlertCircle} color="rose" />
        <StatCardHorizontal label="Processing Flux" value="₹120k" trend="+5.6% Delta" up icon={CreditCard} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Fiscal Health Hub */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col items-center">
           <div className="flex items-center justify-between w-full mb-8">
              <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">Fiscal Health Matrix</h3>
              <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                 <RefreshCw className="w-3.5 h-3.5" />
              </button>
           </div>
           <div className="relative w-40 h-40 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={collectionHealth} dataKey="value" innerRadius={45} outerRadius={60} paddingAngle={8} stroke="none">
                       {collectionHealth.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-xl font-bold text-slate-800 tracking-tight leading-none">₹4.2M</p>
                 <p className="text-[7px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">Total Assets</p>
              </div>
           </div>
           <div className="w-full space-y-2">
              {collectionHealth.map(item => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 hover:bg-white group transition-all cursor-pointer">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shadow-sm" style={{backgroundColor: item.color}} />
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">{item.name}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-800 leading-none">{item.value} Assets</span>
                      <span className="text-[8px] font-bold text-slate-400 px-1.5 py-0.5 bg-white rounded-lg border border-slate-100 uppercase leading-none shadow-sm">{item.percent}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Transaction Pulse Ledger */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">Transaction Pulse Ledger</h3>
              <div className="flex items-center gap-3">
                 <div className="relative group w-40">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                    <input 
                      placeholder="Search transactions..." 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
                    />
                 </div>
                 <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-sm">
                    <RefreshCw className="w-3.5 h-3.5" />
                 </button>
              </div>
           </div>
           <div className="space-y-3">
              {recentCollections.map(txn => (
                <div key={txn.id} className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-100">
                   <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-sm transition-transform group-hover:scale-105 shrink-0",
                      txn.color === "blue" ? "bg-blue-600 shadow-blue-50" :
                      txn.color === "indigo" ? "bg-indigo-600 shadow-indigo-50" :
                      txn.color === "green" ? "bg-emerald-600 shadow-emerald-50" :
                      txn.color === "orange" ? "bg-amber-600 shadow-amber-50" : "bg-rose-600 shadow-rose-50"
                   )}>
                      {txn.initial}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] font-bold text-slate-800 truncate leading-none">{txn.tenant}</p>
                        <span className={cn(
                           "text-[7px] font-bold px-1.5 py-0.5 rounded-lg border uppercase tracking-wider shadow-sm",
                           txn.status === "Collected" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                           txn.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-rose-50 text-rose-600 border-rose-100"
                        )}>
                          {txn.status}
                        </span>
                      </div>
                      <p className="text-[8px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest truncate opacity-60 leading-none">{txn.property}</p>
                   </div>
                   <div className="text-right shrink-0">
                      <p className="text-[11px] font-bold text-slate-800 tracking-tight leading-none">{txn.amount}</p>
                      <p className="text-[8px] text-slate-400 font-bold uppercase mt-1.5 leading-none opacity-60">{txn.date} Cycle • {txn.time}</p>
                   </div>
                   <button className="p-1.5 rounded-lg bg-white text-slate-300 group-hover:text-blue-600 border border-slate-100 shadow-sm transition-all">
                      <ChevronRight className="w-3.5 h-3.5" />
                   </button>
                </div>
              ))}
           </div>
           <button className="w-full mt-6 py-3 text-[9px] font-bold text-blue-600 uppercase tracking-widest hover:underline leading-none border-t border-slate-50">View All Revenue Activities</button>
        </div>
      </div>

      {/* Action Intelligence Suite */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10">
         <ActionTile icon={Plus} label="Record Revenue" color="blue" />
         <ActionTile icon={FileText} label="Yield Invoices" color="emerald" />
         <ActionTile icon={Activity} label="Late Fee Pulse" color="amber" />
         <ActionTile icon={ShieldCheck} label="Fiscal Audit" color="rose" />
      </div>
    </div>
  );
}

function StatCardHorizontal({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    blue: "bg-blue-50 text-blue-600 border-blue-100", 
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100", 
    amber: "bg-amber-50 text-amber-600 border-amber-100", 
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100"
  };
  
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-md flex items-start gap-3 group hover:translate-y-[-2px] transition-all">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 border", bgColors[color])}>
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

function ActionTile({ icon: Icon, label, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white",
    amber: "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-600 hover:text-white",
    rose: "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white",
  };
  
  return (
    <div className={cn("bg-white rounded-2xl p-4 border border-slate-100 shadow-md flex flex-col items-center gap-3 cursor-pointer transition-all hover:shadow-lg hover:translate-y-[-4px] group", colors[color].split(' hover:')[0])}>
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 shadow-sm border bg-white", 
          color === "blue" ? "text-blue-600 border-blue-100" : 
          color === "emerald" ? "text-emerald-600 border-emerald-100" :
          color === "amber" ? "text-amber-600 border-amber-100" : "text-rose-600 border-rose-100"
       )}>
          <Icon className="w-5 h-5" />
       </div>
       <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors leading-none">{label}</p>
    </div>
  );
}
