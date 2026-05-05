import React from "react";
import { 
  IndianRupee, Wallet, TrendingUp, Clock, 
  ArrowUpRight, ArrowDownRight, ChevronRight, 
  MoreVertical, Search, Calendar, FileText,
  CheckCircle2, AlertCircle, Activity,
  Users, Building2, CreditCard, Filter, Download,
  Bell, XCircle
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- EXACT DATA FROM ACCOUNTING OVERVIEW SCREENSHOT ---

const collectionPayoutTrend = [
  { name: "May 22", collection: 12, payout: 8 },
  { name: "May 23", collection: 18, payout: 10 },
  { name: "May 24", collection: 15, payout: 12 },
  { name: "May 25", collection: 22, payout: 14 },
  { name: "May 26", collection: 19, payout: 13 },
  { name: "May 27", collection: 25, payout: 16 },
  { name: "May 28", collection: 21, payout: 15 },
];

const transactions = [
  { date: "May 28, 2024", desc: "Rent Payment - Ocean View Apartment", type: "Tenant Payment", amount: "+ ₹ 28,500", status: "Success", color: "text-emerald-600 bg-emerald-50" },
  { date: "May 28, 2024", desc: "Owner Payout - John Doe", type: "Owner Payout", amount: "- ₹ 45,000", status: "Processed", color: "text-blue-600 bg-blue-50" },
  { date: "May 27, 2024", desc: "Service Fee - Green Valley Villa", type: "Service Fee", amount: "+ ₹ 2,250", status: "Success", color: "text-purple-600 bg-purple-50" },
  { date: "May 27, 2024", desc: "Other Charge - Parking", type: "Other Charge", amount: "+ ₹ 1,500", status: "Success", color: "text-amber-600 bg-amber-50" },
  { date: "May 26, 2024", desc: "Rent Payment - Sunrise Heights", type: "Tenant Payment", amount: "+ ₹ 32,000", status: "Success", color: "text-emerald-600 bg-emerald-50" },
];

const dueRentAging = [
  { name: "0 - 30 Days", value: 125430, color: "#3B82F6" },
  { name: "31 - 60 Days", value: 110250, color: "#10B981" },
  { name: "61 - 90 Days", value: 65000, color: "#F59E0B" },
  { name: "90+ Days", value: 44990, color: "#EF4444" },
];

const revenueOverview = [
  { name: "Roomhy Revenue", value: 623340, color: "#3B82F6" },
  { name: "Owner Revenue", value: 1835420, color: "#10B981" },
  { name: "Total Revenue", value: 2458760, color: "#6366F1" },
];

const cashflowData = [
  { name: "Opening", value: 1245000 },
  { name: "Collections", value: 2458760 },
  { name: "Payouts", value: 1835420 },
  { name: "Closing", value: 1868340 },
];

const alerts = [
  { label: "Rent Due Reminders", count: 28, sub: "Reminders Sent Today", icon: Bell, color: "text-amber-600 bg-amber-50" },
  { label: "Payment Success Alerts", count: 54, sub: "Alerts Sent Today", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
  { label: "Payment Failure Alerts", count: 6, sub: "Alerts Sent Today", icon: XCircle, color: "text-rose-600 bg-rose-50" },
  { label: "Payout Processed", count: 18, sub: "Notifications Sent Today", icon: IndianRupee, color: "text-purple-600 bg-purple-50" },
];

export default function AccountingOverview() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Accounting Overview</h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
               <span className="hover:text-blue-600 cursor-pointer transition-colors">Accounting</span>
               <ChevronRight size={12} className="opacity-50" />
               <span className="text-blue-600">Overview</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
               <Calendar className="w-4 h-4 text-slate-400" />
               <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">May 22 - May 28, 2024</span>
            </div>
         </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
         <StatCardAcc label="Total Collection (This Month)" value="₹ 24,58,760" trend="12.6%" up color="emerald" />
         <StatCardAcc label="Total Payout (This Month)" value="₹ 18,35,420" trend="9.4%" up color="blue" />
         <StatCardAcc label="Roomhy Revenue (This Month)" value="₹ 6,23,340" trend="15.2%" up color="purple" />
         <StatCardAcc label="Due Rents" value="₹ 3,45,670" trend="8.7%" up color="amber" />
         <StatCardAcc label="Pending Payouts" value="₹ 2,15,300" trend="6.3%" up color="rose" />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Trend Chart Hub */}
         <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">Collection vs Payout Trend</h3>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                     <LegendItem color="bg-blue-600" label="Collection" />
                     <LegendItem color="bg-emerald-600" label="Payout" />
                  </div>
                  <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                     <option>This Month</option>
                  </select>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={collectionPayoutTrend}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dx={-15} />
                     <Tooltip />
                     <Line type="monotone" dataKey="collection" stroke="#3B82F6" strokeWidth={3} dot={{fill: '#3B82F6', strokeWidth: 2, r: 4}} activeDot={{r: 6}} />
                     <Line type="monotone" dataKey="payout" stroke="#10B981" strokeWidth={3} dot={{fill: '#10B981', strokeWidth: 2, r: 4}} activeDot={{r: 6}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Recent Transactions */}
         <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto max-h-[350px] custom-scrollbar pr-2">
               {transactions.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50/50 p-2 rounded-2xl transition-all">
                     <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm transition-transform group-hover:scale-105", t.color)}>
                        {t.type === "Tenant Payment" ? "TP" : t.type === "Owner Payout" ? "OP" : "SF"}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                           <p className="text-[13px] font-bold text-slate-900 truncate leading-none">{t.desc}</p>
                           <p className="text-[10px] text-slate-300 font-bold uppercase">{t.date}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                           <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">{t.type}</p>
                           <p className={cn("text-sm font-black", t.amount.startsWith('+') ? "text-emerald-600" : "text-rose-600")}>{t.amount}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                           <span className={cn("w-1.5 h-1.5 rounded-full", t.status === "Success" ? "bg-emerald-500" : "bg-blue-500")} />
                           <span className={cn("text-[9px] font-bold uppercase tracking-widest", t.status === "Success" ? "text-emerald-600" : "text-blue-600")}>{t.status}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
         <SummaryTile label="Total Tenants" value="1,248" sub="Active Tenants" icon={Users} color="blue" />
         <SummaryTile label="Total Owners" value="432" sub="Registered Owners" icon={Building2} color="emerald" />
         <SummaryTile label="Total Invoices" value="2,340" sub="Total Invoices" icon={FileText} color="purple" />
         <SummaryTile label="Overdue Tenants" value="156" sub="Tenants" icon={AlertCircle} color="rose" />
         <SummaryTile label="Failed Payments" value="23" sub="This Month" icon={Activity} color="amber" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         {/* Due Rent Overview */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Due Rent Overview</h3>
            <div className="relative h-48 flex items-center justify-center mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={dueRentAging} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                        {dueRentAging.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-xl font-black text-slate-900">₹ 3,45,670</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Due</p>
               </div>
            </div>
            <div className="space-y-3">
               {dueRentAging.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}} />
                        <span className="text-xs font-semibold text-slate-500">{item.name}</span>
                     </div>
                     <span className="text-xs font-black text-slate-900">₹ {item.value.toLocaleString()}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Revenue Overview Bar */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Revenue Overview</h3>
            <div className="flex-1 min-h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueOverview}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" hide />
                     <YAxis hide />
                     <Tooltip />
                     <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                        {revenueOverview.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-3">
               {revenueOverview.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}} />
                        <span className="text-xs font-semibold text-slate-500">{item.name}</span>
                     </div>
                     <span className="text-xs font-black text-slate-900">₹ {item.value.toLocaleString()}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Cash Flow Summary */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Cash Flow Summary</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Opening Balance</span>
                  <span className="text-sm font-black text-slate-900">₹ 12,45,000</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                     <span className="text-xs font-semibold text-slate-500">Total Collections</span>
                  </div>
                  <span className="text-sm font-black text-emerald-600">+ ₹ 24,58,760</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                     <span className="text-xs font-semibold text-slate-500">Total Payouts</span>
                  </div>
                  <span className="text-sm font-black text-rose-600">- ₹ 18,35,420</span>
               </div>
               <div className="mt-8 p-4 bg-slate-900 rounded-2xl flex items-center justify-between shadow-xl shadow-slate-900/10">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-600 rounded-xl text-white">
                        <CreditCard size={18} />
                     </div>
                     <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Closing Balance</span>
                  </div>
                  <span className="text-lg font-black text-white">₹ 18,68,340</span>
               </div>
            </div>
         </div>
      </div>

      {/* Automation & Alerts */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Automation & Alerts</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">View All Alerts</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {alerts.map((alert, i) => (
               <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-all">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", alert.color)}>
                     <alert.icon size={22} />
                  </div>
                  <div className="min-w-0">
                     <p className="text-[13px] font-bold text-slate-900 truncate leading-none">{alert.label}</p>
                     <div className="flex items-center gap-2 mt-2">
                        <p className="text-lg font-black text-slate-900 leading-none">{alert.count}</p>
                        <p className="text-[10px] text-slate-400 font-medium truncate">{alert.sub}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function StatCardAcc({ label, value, trend, up, color }) {
  const colors = {
    emerald: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
    amber: "text-amber-600 bg-amber-50",
    rose: "text-rose-600 bg-rose-50",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col transition-all hover:translate-y-[-4px] hover:shadow-md group">
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 shadow-sm", colors[color])}>
          <IndianRupee size={18} />
       </div>
       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
       <p className="text-xl font-black text-slate-900 tracking-tight leading-none mb-3 truncate">{value}</p>
       <div className="flex items-center gap-1.5 mt-auto">
          {up ? <ArrowUpRight size={12} className="text-emerald-600" /> : <ArrowDownRight size={12} className="text-rose-600" />}
          <span className={cn("text-[10px] font-bold", up ? "text-emerald-600" : "text-rose-600")}>{trend}</span>
          <span className="text-[10px] text-slate-400 font-medium">last month</span>
       </div>
    </div>
  );
}

function SummaryTile({ label, value, sub, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    emerald: "text-emerald-600 bg-emerald-50",
    purple: "text-purple-600 bg-purple-50",
    amber: "text-amber-600 bg-amber-50",
    rose: "text-rose-600 bg-rose-50",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all hover:translate-y-[-4px] hover:shadow-md group">
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", colors[color])}>
          <Icon size={18} />
       </div>
       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
       <p className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">{value}</p>
       <p className="text-[10px] text-slate-300 font-bold uppercase">{sub}</p>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
       <div className={cn("w-2 h-2 rounded-full", color)} />
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</span>
    </div>
  );
}
