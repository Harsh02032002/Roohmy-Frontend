import React from "react";
import { 
  Building2, Users, Wallet, Bell, 
  ArrowUpRight, ArrowDownRight, ChevronRight, 
  MoreVertical, Search, Calendar, Plus,
  TrendingUp, Activity, UserPlus, CheckCircle2,
  Clock, AlertCircle, Home, PieChart as PieIcon
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- EXACT DATA FROM HOME OVERVIEW SCREENSHOT ---

const revenueTrend = [
  { name: "May 1", revenue: 12000 },
  { name: "May 8", revenue: 28000 },
  { name: "May 15", revenue: 24000 },
  { name: "May 22", revenue: 42000 },
  { name: "May 29", revenue: 35000 },
  { name: "June 5", revenue: 48000 },
];

const propertyStatusData = [
  { name: "Occupied", value: 1480, color: "#10B981", percent: "63.2%" },
  { name: "Vacant", value: 520, color: "#3B82F6", percent: "22.2%" },
  { name: "Maintenance", value: 180, color: "#F59E0B", percent: "7.7%" },
  { name: "Others", value: 160, color: "#EF4444", percent: "6.8%" },
];

const tenantTypeData = [
  { name: "Family", value: 6250, color: "#3B82F6", percent: "48.7%" },
  { name: "Bachelor", value: 4320, color: "#10B981", percent: "33.6%" },
  { name: "Commercial", value: 1650, color: "#F59E0B", percent: "12.9%" },
  { name: "Others", value: 625, color: "#6366F1", percent: "4.8%" },
];

const pendingAlerts = [
  { name: "John Smith", unit: "Ocean View Apartment - A101", amount: "$1,200", delay: "5 days overdue", initial: "JS", color: "bg-blue-50 text-blue-600" },
  { name: "Priya Wilson", unit: "Green Park Residency - B203", amount: "$950", delay: "3 days overdue", initial: "PW", color: "bg-purple-50 text-purple-600" },
  { name: "Ravi Mehta", unit: "Sunrise Heights - C301", amount: "$1,500", delay: "2 days overdue", initial: "RM", color: "bg-emerald-50 text-emerald-600" },
  { name: "Ankit Kumar", unit: "Lake View Towers - D404", amount: "$1,100", delay: "1 day overdue", initial: "AK", color: "bg-amber-50 text-amber-600" },
  { name: "Sneha Patel", unit: "Prime City Homes - E502", amount: "$800", delay: "Today", initial: "SP", color: "bg-indigo-50 text-indigo-600" },
];

const recentActivities = [
  { id: 1, title: "New property added", desc: "Sunset Villa has been added.", time: "10 min ago", icon: Building2, color: "bg-blue-50 text-blue-600" },
  { id: 2, title: "New tenant registered", desc: "Arjun Sharma has registered.", time: "25 min ago", icon: UserPlus, color: "bg-emerald-50 text-emerald-600" },
  { id: 3, title: "Rent collected", desc: "$2,450 collected from 3 tenants.", time: "1 hour ago", icon: Wallet, color: "bg-purple-50 text-purple-600" },
  { id: 4, title: "Maintenance request", desc: "New request from A101 - Ocean View Apartment.", time: "2 hours ago", icon: Activity, color: "bg-rose-50 text-rose-600" },
];

export default function HomeOverview() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
               <span className="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
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

      <p className="text-sm text-slate-500 font-medium mb-8">Welcome back, Aman! Here's an overview of your platform.</p>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <StatCardLink label="Total Properties" value="2,340" trend="8.3%" up icon={Building2} color="blue" linkText="View All Properties" />
         <StatCardLink label="Total Tenants" value="12,845" trend="12.5%" up icon={Users} color="emerald" linkText="View All Tenants" />
         <StatCardLink label="Revenue Overview" value="$85,674" trend="18.6%" up icon={Wallet} color="purple" linkText="View Detailed Report" />
         <StatCardLink label="Alerts (Pending Rent)" value="156" trend="Tenants" subText="with pending rent" icon={Bell} color="amber" linkText="View All Alerts" />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Revenue Overview Hub */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm" />
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue (USD)</span>
                  </div>
                  <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                     <option>This Month</option>
                  </select>
               </div>
            </div>
            <div className="h-[300px] mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrend}>
                     <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dx={-15} />
                     <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                     <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-50">
               <RevenueSubStat label="Total Revenue" value="$85,674" color="text-slate-900" />
               <RevenueSubStat label="Collected" value="$72,340" color="text-emerald-600" />
               <RevenueSubStat label="Pending" value="$13,334" color="text-amber-600" />
               <RevenueSubStat label="Growth" value="18.6%" color="text-emerald-600" isTrend />
            </div>
         </div>

         {/* Pending Rent Alerts */}
         <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Pending Rent Alerts</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto max-h-[380px] custom-scrollbar pr-2">
               {pendingAlerts.map((alert, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                     <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105", alert.color)}>
                        {alert.initial}
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-slate-900 truncate leading-none">{alert.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-1.5 truncate leading-none">{alert.unit}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 leading-none">{alert.amount}</p>
                        <p className="text-[10px] font-bold text-rose-500 mt-1.5 leading-none">{alert.delay}</p>
                     </div>
                     <button className="p-2 bg-slate-50 rounded-lg text-slate-300 group-hover:text-rose-500 group-hover:bg-rose-50 transition-all">
                        <Bell size={14} />
                     </button>
                  </div>
               ))}
            </div>
            <button className="mt-8 w-full py-3 text-[11px] font-bold text-blue-600 uppercase tracking-widest hover:underline border-t border-slate-50">
               View All Alerts
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         {/* Properties by Status */}
         <DistributionCard title="Properties by Status" data={propertyStatusData} total="2,340" />
         {/* Tenants by Type */}
         <DistributionCard title="Tenants by Type" data={tenantTypeData} total="12,845" />
         {/* Recent Activities */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Activities</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-8 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
               {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-4">
                     <div className={cn("p-2.5 rounded-xl shrink-0 shadow-sm transition-transform hover:scale-110", act.color)}>
                        <act.icon size={20} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900">{act.title}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1">{act.desc}</p>
                     </div>
                     <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{act.time}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function StatCardLink({ label, value, trend, up, icon: Icon, color, linkText, subText }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col transition-all hover:translate-y-[-4px] hover:shadow-md cursor-pointer group">
       <div className="flex items-center gap-4 mb-4">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm", colors[color])}>
             <Icon size={24} />
          </div>
          <div>
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
             <p className="text-2xl font-black text-slate-900 tracking-tight leading-none">{value}</p>
          </div>
       </div>
       <div className="flex items-center gap-1.5 mb-6">
          {up ? <ArrowUpRight size={12} className="text-emerald-600" /> : <ArrowDownRight size={12} className="text-rose-600" />}
          <span className={cn("text-[10px] font-bold", up ? "text-emerald-600" : "text-rose-600")}>{trend}</span>
          <span className="text-[10px] text-slate-400 font-medium">{subText || "from last week"}</span>
       </div>
       <button className="mt-auto flex items-center justify-between text-[10px] font-bold text-blue-600 uppercase tracking-widest group-hover:underline">
          {linkText} <ChevronRight size={14} />
       </button>
    </div>
  );
}

function RevenueSubStat({ label, value, color, isTrend }) {
  return (
    <div>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <div className="flex items-center gap-1.5">
          <p className={cn("text-lg font-black tracking-tight", color)}>{value}</p>
          {isTrend && <ArrowUpRight size={14} className="text-emerald-600" />}
       </div>
    </div>
  );
}

function DistributionCard({ title, data, total }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
       <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
             <MoreVertical size={18} className="text-slate-400" />
          </button>
       </div>
       <div className="relative h-48 flex items-center justify-center mb-8">
          <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                   {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
             </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <p className="text-2xl font-bold text-slate-900">{total}</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total</p>
          </div>
       </div>
       <div className="space-y-3">
          {data.map((item) => (
             <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: item.color}} />
                   <span className="text-xs font-semibold text-slate-500">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                   <span className="text-xs font-bold text-slate-900">{item.value.toLocaleString()}</span>
                   <span className="text-[10px] font-bold text-slate-400">({item.percent})</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
