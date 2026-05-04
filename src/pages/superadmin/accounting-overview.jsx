import React from "react";
import { 
  Wallet, DollarSign, TrendingUp, Calendar, 
  AlertCircle, CheckCircle2, XCircle, ArrowUpRight, 
  ArrowDownRight, MoreVertical, Building2, Users,
  Zap, Search, PieChart as PieIcon, Activity
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const trendData = [
  { name: "May 22", collection: 10, payout: 8 },
  { name: "May 23", collection: 15, payout: 12 },
  { name: "May 24", collection: 12, payout: 10 },
  { name: "May 25", collection: 18, payout: 14 },
  { name: "May 26", collection: 22, payout: 18 },
  { name: "May 27", collection: 20, payout: 16 },
  { name: "May 28", collection: 25, payout: 20 },
];

const dueRentData = [
  { name: "0-30 Days", value: 128430, color: "#3B82F6" },
  { name: "31-60 Days", value: 85620, color: "#10B981" },
  { name: "61-90 Days", value: 65200, color: "#F59E0B" },
  { name: "> 90 Days", value: 44950, color: "#EF4444" },
];

const revenueOverview = [
  { name: "Mon", v: 20 }, { name: "Tue", v: 35 }, { name: "Wed", v: 25 },
  { name: "Thu", v: 45 }, { name: "Fri", v: 40 }, { name: "Sat", v: 55 }, { name: "Sun", v: 50 },
];

const recentTransactions = [
  { id: 1, date: "May 28, 2024", desc: "Rent Payment - Ocean View Apartment", type: "Tenant Payment", amount: "+ ₹28,500", status: "Success" },
  { id: 2, date: "May 28, 2024", desc: "Owner Payout - John Doe", type: "Owner Payout", amount: "- ₹25,000", status: "Processed" },
  { id: 3, date: "May 27, 2024", desc: "Service Fee - Green Valley Villa", type: "Service Fee", amount: "+ ₹2,250", status: "Success" },
  { id: 4, date: "May 27, 2024", desc: "Other Charge - Parking", type: "Other Charge", amount: "+ ₹1,500", status: "Success" },
  { id: 5, date: "May 26, 2024", desc: "Rent Payment - Sunrise Heights", type: "Tenant Payment", amount: "+ ₹22,000", status: "Success" },
];

export default function AccountingOverview() {
  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-full">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
               <Wallet className="w-6 h-6" />
            </div>
            <div>
               <h1 className="text-2xl font-black text-slate-800 tracking-tight">Accounting Overview</h1>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Finance {">"} Overview</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input placeholder="Search transactions..." className="bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold shadow-sm w-64 outline-none focus:border-blue-500 transition-all" />
            </div>
            <DateRangePill value="May 22 - May 28, 2024" />
         </div>
      </div>

      {/* Hero Money Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
         <StatCardMoney label="Total Collection" value="₹ 24.5L" trend="+ 12.5%" up icon={Wallet} color="blue" />
         <StatCardMoney label="Owner Payouts" value="₹ 18.3L" trend="+ 9.4%" up icon={DollarSign} color="purple" />
         <StatCardMoney label="Total Commission" value="₹ 4.2L" trend="+ 18.2%" up icon={TrendingUp} color="emerald" />
         <StatCardMoney label="Due Rents" value="₹ 3.4L" trend="+ 8.7%" up icon={Calendar} color="amber" />
         <StatCardMoney label="Pending Payouts" value="₹ 2.1L" trend="+ 6.3%" up icon={AlertCircle} color="rose" />
         <StatCardMoney label="Net Collection" value="₹ 6.2L" trend="+ 15.2%" up icon={Zap} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Cashflow Flow Chart */}
         <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Financial Flow Trend</h3>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Collections</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payouts</span></div>
               </div>
            </div>
            <div className="h-[320px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                     <defs>
                        <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                           <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                           <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-15} tickFormatter={v => `${v}L`} />
                     <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                     <Area type="monotone" dataKey="collection" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorC)" />
                     <Area type="monotone" dataKey="payout" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorP)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Transaction Ledger */}
         <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Ledger</h3>
               <button className="text-blue-600 text-[10px] font-black hover:underline uppercase tracking-widest">Full History →</button>
            </div>
            <div className="space-y-6">
               {recentTransactions.map(tx => (
                 <div key={tx.id} className="flex flex-col gap-2 p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{tx.date}</span>
                       <span className={cn("text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter", tx.status === "Success" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600")}>{tx.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="min-w-0">
                          <p className="text-[13px] font-black text-slate-800 truncate">{tx.desc}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">{tx.type}</p>
                       </div>
                       <p className={cn("text-[13px] font-black shrink-0", tx.amount.startsWith("+") ? "text-emerald-600" : "text-rose-600")}>{tx.amount}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
         {/* Aging Summary */}
         <CardWrapper title="Due Aging Summary">
            <div className="flex items-center gap-8 h-48">
               <div className="relative w-36 h-36 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={dueRentData} innerRadius={40} outerRadius={60} paddingAngle={8} dataKey="value" stroke="none">
                           {dueRentData.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <p className="text-sm font-black text-slate-800 leading-none">₹ 3.4L</p>
                  </div>
               </div>
               <div className="flex-1 space-y-3">
                  {dueRentData.map(r => (
                    <div key={r.name} className="flex justify-between items-center group cursor-default">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor: r.color}} />
                          <span className="text-[10px] font-black text-slate-400 uppercase group-hover:text-slate-800 transition-colors">{r.name}</span>
                       </div>
                       <span className="text-[11px] font-black text-slate-800">₹ {(r.value/1000).toFixed(1)}k</span>
                    </div>
                  ))}
               </div>
            </div>
         </CardWrapper>

         {/* Collection Ratios */}
         <CardWrapper title="Collection Ratios">
            <div className="space-y-5 h-48 flex flex-col justify-center">
               {[
                 { label: "Roomhy Share", value: "₹ 6.2L", color: "text-emerald-600", icon: Building2 },
                 { label: "Owner Share", value: "₹ 18.3L", color: "text-blue-600", icon: Users },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                       <item.icon className="w-5 h-5 text-slate-300" />
                       <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                    </div>
                    <span className={cn("text-base font-black", item.color)}>{item.value}</span>
                 </div>
               ))}
               <div className="h-10 mt-4 opacity-30">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={revenueOverview}><Line type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} dot={false} /></LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </CardWrapper>

         {/* Opening/Closing Balance Card */}
         <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-blue-600/30 flex flex-col justify-between">
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Available Balance</p>
               <h4 className="text-4xl font-black tracking-tight">₹ 18,68,340</h4>
               <div className="flex items-center gap-2 text-[11px] font-black mt-4 opacity-80">
                  <ArrowUpRight className="w-4 h-4" /> Collection Cycle End: May 31
               </div>
            </div>
            <div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between">
               <div className="text-center">
                  <p className="text-[9px] font-black uppercase opacity-60">Inflow</p>
                  <p className="text-lg font-black">+ 24.5L</p>
               </div>
               <div className="text-center">
                  <p className="text-[9px] font-black uppercase opacity-60">Outflow</p>
                  <p className="text-lg font-black">- 18.3L</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCardMoney({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { blue: "bg-blue-500 shadow-blue-200", emerald: "bg-emerald-500 shadow-emerald-200", amber: "bg-amber-500 shadow-amber-200", rose: "bg-rose-500 shadow-rose-200", purple: "bg-purple-500 shadow-purple-200" };
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

function CardWrapper({ title, children }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
       <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">{title}</h3>
       {children}
    </div>
  );
}
