import React from "react";
import { 
  Wallet, IndianRupee, Database, Receipt, RotateCcw,
  ArrowUpRight, ArrowDownRight, ChevronRight, Search,
  Download, Filter, MoreVertical, Building2, Users,
  FileText, AlertCircle, CheckCircle2, XCircle,
  TrendingUp, TrendingDown, Calendar, CreditCard,
  History, Clock, PieChart as PieIcon, BarChart3,
  Activity, Bell, Send, Inbox, ArrowRight, Briefcase
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const collectionData = [
  { name: "Jan", collection: 1200000, payout: 800000 },
  { name: "Feb", collection: 1800000, payout: 1100000 },
  { name: "Mar", collection: 1500000, payout: 900000 },
  { name: "Apr", collection: 2200000, payout: 1400000 },
  { name: "May", collection: 1900000, payout: 1200000 },
  { name: "Jun", collection: 2500000, payout: 1600000 },
];

const dueRentData = [
  { name: "Paid", value: 75, color: "#10b981" },
  { name: "Unpaid", value: 25, color: "#f59e0b" },
];

const revenueDistData = [
  { name: "Service Fees", value: 45, color: "#3b82f6" },
  { name: "Rent Commission", value: 35, color: "#10b981" },
  { name: "Other Charges", value: 20, color: "#f59e0b" },
];

const transactions = [
  { id: "#TX-1256", tenant: "Rohit Sharma", property: "Sunrise Residency", amount: "₹12,500", date: "May 28, 2024", status: "Success", type: "Rent" },
  { id: "#TX-1255", tenant: "Priya Mehta", property: "Green Valley PG", amount: "₹8,000", date: "May 28, 2024", status: "Success", type: "Security" },
  { id: "#TX-1254", tenant: "Vikram Joshi", property: "Urban Nest", amount: "₹15,000", date: "May 28, 2024", status: "Pending", type: "Rent" },
  { id: "#TX-1253", tenant: "Neha Singh", property: "Lakeview Apartments", amount: "₹22,000", date: "May 28, 2024", status: "Failed", type: "Rent" },
];

export default function SuperadminAccountingDashboard() {
  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Accounting Overview</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Accounting {">"} Overview</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
               <Calendar className="w-4 h-4 text-slate-400" />
               <span className="text-[11px] font-bold text-slate-600">May 22 - May 28, 2024</span>
               <MoreVertical className="w-4 h-4 text-slate-300" />
            </div>
         </div>
      </div>

      {/* Row 1: Hero Cards (5 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
         <StatCard label="Total Collection" value="₹ 45,28,450" trend="+ 12.5%" up icon={IndianRupee} color="blue" />
         <StatCard label="Total Payout" value="₹ 32,10,200" trend="+ 8.2%" up icon={Wallet} color="rose" />
         <StatCard label="Roomhy Revenue" value="₹ 13,18,250" trend="+ 15.7%" up icon={BarChart3} color="emerald" />
         <StatCard label="Due Rents" value="₹ 4,25,000" trend="12 Tenants" up={false} icon={Clock} color="amber" />
         <StatCard label="Pending Payouts" value="₹ 1,12,000" trend="5 Owners" up={false} icon={RotateCcw} color="rose" />
      </div>

      {/* Row 2: Intelligence Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Trend Chart */}
         <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-800">Collection vs Payout Trend</h3>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-[10px] font-bold text-slate-400 uppercase">Collection</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-rose-500" /><span className="text-[10px] font-bold text-slate-400 uppercase">Payout</span></div>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={collectionData}>
                     <defs>
                        <linearGradient id="colorColl" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPay" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} tickFormatter={(v) => `₹${v/100000}L`} />
                     <Tooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                     <Area type="monotone" dataKey="collection" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorColl)" />
                     <Area type="monotone" dataKey="payout" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorPay)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Transactions List */}
         <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
               <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">View All</button>
            </div>
            <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
               {transactions.map((tx, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-blue-600 uppercase">{tx.id}</span>
                        <span className={cn(
                           "text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest",
                           tx.status === "Success" ? "text-emerald-600 bg-emerald-50" : tx.status === "Pending" ? "text-amber-600 bg-amber-50" : "text-rose-600 bg-rose-50"
                        )}>{tx.status}</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-[11px] font-bold text-slate-800">{tx.tenant}</p>
                           <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{tx.property}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-xs font-bold text-slate-800">{tx.amount}</p>
                           <p className="text-[9px] text-slate-300 font-bold uppercase mt-0.5">{tx.date}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Row 3: Mini Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
         <MiniStat label="Rent Invoices" value="1,248" icon={Receipt} color="bg-indigo-50 text-indigo-600" />
         <MiniStat label="Owner Payouts" value="342" icon={Briefcase} color="bg-emerald-50 text-emerald-600" />
         <MiniStat label="Service Fees" value="₹ 4.2L" icon={Database} color="bg-purple-50 text-purple-600" />
         <MiniStat label="Refund Requests" value="14" icon={RotateCcw} color="bg-rose-50 text-rose-600" />
         <MiniStat label="GST Collection" value="₹ 2.1L" icon={FileText} color="bg-blue-50 text-blue-600" />
      </div>

      {/* Row 4: Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-lg font-bold text-slate-800 mb-8">Due Rent Distribution</h3>
            <div className="relative w-40 h-40 mx-auto mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={dueRentData} innerRadius={50} outerRadius={65} paddingAngle={5} dataKey="value" stroke="none">
                        {dueRentData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-slate-800 tracking-tighter">75%</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Collected</p>
               </div>
            </div>
            <div className="space-y-3">
               <AnalyticsRow label="Target Collection" value="₹45,28,450" />
               <AnalyticsRow label="Achieved" value="₹33,96,337" color="text-emerald-600" />
               <AnalyticsRow label="Shortfall" value="₹11,32,113" color="text-rose-600" />
            </div>
         </div>

         <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-lg font-bold text-slate-800 mb-8">Revenue Sources</h3>
            <div className="h-40 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueDistData} layout="vertical">
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                     <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                        {revenueDistData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="space-y-3">
               {revenueDistData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.name}</span>
                     </div>
                     <span className="text-[11px] font-bold text-slate-800">{d.value}%</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-lg font-bold text-slate-800 mb-8">Cash Flow Health</h3>
            <div className="h-40 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={collectionData}>
                     <Line type="step" dataKey="payout" stroke="#ef4444" strokeWidth={2} dot={false} />
                     <Line type="step" dataKey="collection" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm"><TrendingUp className="w-5 h-5" /></div>
                  <div>
                     <p className="text-xs font-bold text-slate-800">Forecast: Positive</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Stable collection trend expected.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Row 5: Alerts & Automation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-8">
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-800">System Automation & Alerts</h3>
               <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">Settings</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <AlertTile label="Rent Reminders" text="Automated reminders sent to 452 tenants." icon={Bell} status="Active" />
               <AlertTile label="Payout Cycle" text="Monthly owner payouts initiated for May." icon={Send} status="Processing" />
               <AlertTile label="Failed Txns" text="3 payments failed. Re-attempting." icon={Inbox} status="Alert" />
            </div>
         </div>
         <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between">
            <div>
               <h3 className="text-lg font-bold mb-2">Export Reports</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed mb-6">Generate audit reports for current cycle.</p>
            </div>
            <button className="w-full py-4 bg-blue-600 text-white rounded-xl text-[10px] font-bold uppercase shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
               Export Data <Download className="w-4 h-4" />
            </button>
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-100 shadow-blue-50",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-50",
    rose: "text-rose-600 bg-rose-50 border-rose-100 shadow-rose-50",
    amber: "text-amber-600 bg-amber-50 border-amber-100 shadow-amber-50",
  };
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 group hover:translate-y-[-5px] transition-all duration-500 flex flex-col justify-between">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border mb-6", colors[color])}>
          <Icon className="w-6 h-6" />
       </div>
       <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 leading-tight">{label}</p>
          <div className="flex items-end justify-between">
             <p className="text-2xl font-bold text-slate-800 tracking-tighter leading-none">{value}</p>
             <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest", up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
                {trend}
             </span>
          </div>
       </div>
    </div>
  );
}

function MiniStat({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40 flex items-center gap-4 group cursor-pointer hover:bg-slate-50 transition-all">
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm", color)}>
          <Icon className="w-5 h-5" />
       </div>
       <div>
          <p className="text-sm font-black text-slate-800 leading-none mb-1">{value}</p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">{label}</p>
       </div>
    </div>
  );
}

function AnalyticsRow({ label, value, color }) {
  return (
    <div className="flex items-center justify-between group">
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-800 transition-colors">{label}</span>
       <span className={cn("text-[11px] font-bold", color || "text-slate-800")}>{value}</span>
    </div>
  );
}

function AlertTile({ label, text, icon: Icon, status }) {
  return (
    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
       <div className="flex items-center justify-between mb-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm"><Icon className="w-4 h-4" /></div>
          <span className={cn(
             "text-[8px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest",
             status === "Active" ? "text-emerald-600 bg-emerald-50" : status === "Alert" ? "text-rose-600 bg-rose-50" : "text-blue-600 bg-blue-50"
          )}>{status}</span>
       </div>
       <p className="text-xs font-bold text-slate-800 mb-1">{label}</p>
       <p className="text-[9px] font-bold text-slate-400 leading-tight">{text}</p>
    </div>
  );
}
