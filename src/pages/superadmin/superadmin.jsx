import React from "react";
import { 
  Users, Building2, Calendar, Wallet, 
  ArrowUpRight, ArrowDownRight, ChevronRight, 
  MoreVertical, Search, Bell, Clock,
  Plus, LayoutDashboard, Home, UserCircle, 
  CreditCard, MessageSquare, PieChart as PieIcon,
  ShieldCheck, Settings, LogOut, CheckCircle2,
  TrendingUp, Activity
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- EXACT DATA FROM SCREENSHOT ---

const overviewData = [
  { name: "May 22", users: 1300, bookings: 750, revenue: 500 },
  { name: "May 23", users: 1600, bookings: 700, revenue: 450 },
  { name: "May 24", users: 1550, bookings: 780, revenue: 550 },
  { name: "May 25", users: 2100, bookings: 1100, revenue: 600 },
  { name: "May 26", users: 2000, bookings: 1300, revenue: 550 },
  { name: "May 27", users: 2300, bookings: 1350, revenue: 500 },
  { name: "May 28", users: 1950, bookings: 1300, revenue: 780 },
];

const usersByRole = [
  { name: "Tenant", value: 7245, color: "#3B82F6", percent: "56.4%" },
  { name: "Owner", value: 3120, color: "#10B981", percent: "24.3%" },
  { name: "Agent", value: 1850, color: "#F59E0B", percent: "14.4%" },
  { name: "Others", value: 630, color: "#6366F1", percent: "4.9%" },
];

const propertiesStatus = [
  { name: "Published", value: 1620, color: "#10B981", percent: "69.2%" },
  { name: "Pending", value: 420, color: "#3B82F6", percent: "17.9%" },
  { name: "Draft", value: 200, color: "#F59E0B", percent: "8.5%" },
  { name: "Rejected", value: 100, color: "#EF4444", percent: "4.3%" },
];

const revenueOverview = [
  { name: "Week 1", value: 15000 },
  { name: "Week 2", value: 22000 },
  { name: "Week 3", value: 32000 },
  { name: "Week 4", value: 18000 },
  { name: "Week 5", value: 28000 },
];

const recentBookings = [
  { id: 1, property: "Ocean View Apartment", guest: "John Doe", amount: "$1200", status: "Confirmed", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop" },
  { id: 2, property: "Luxury Villa in Bali", guest: "Jane Smith", amount: "$2500", status: "Confirmed", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop" },
  { id: 3, property: "Modern Studio City Center", guest: "Mike Johnson", amount: "$800", status: "Pending", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=100&h=100&fit=crop" },
  { id: 4, property: "Cozy Apartment", guest: "Emily Davis", amount: "$650", status: "Confirmed", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=100&h=100&fit=crop" },
];

const recentActivity = [
  { id: 1, type: "user", title: "New user registered", desc: "Sarah Wilson has registered as a tenant.", time: "2 min ago", icon: Users, color: "bg-emerald-50 text-emerald-600" },
  { id: 2, type: "property", title: "New property added", desc: "Luxury Sea View Apartment added by John Doe.", time: "15 min ago", icon: Building2, color: "bg-blue-50 text-blue-600" },
  { id: 3, type: "booking", title: "New booking received", desc: "Booking #BR1234 for Modern Studio City Center.", time: "1 hour ago", icon: Calendar, color: "bg-purple-50 text-purple-600" },
  { id: 4, type: "payment", title: "Payment received", desc: "Payment of $1200 received for Booking #BR1233.", time: "2 hours ago", icon: Wallet, color: "bg-amber-50 text-amber-600" },
];

export default function SuperadminDashboard() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Welcome back, Aman! Here's what's happening with Roomhy.</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
               <Calendar className="w-4 h-4 text-slate-400" />
               <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">May 22 - May 28, 2024</span>
            </div>
         </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <StatCard label="Total Users" value="12,845" trend="12.5%" up icon={Users} color="blue" />
         <StatCard label="Total Properties" value="2,340" trend="8.3%" up icon={Building2} color="emerald" />
         <StatCard label="Total Bookings" value="1,987" trend="15.7%" up icon={Calendar} color="purple" />
         <StatCard label="Total Revenue" value="$85,674" trend="18.6%" up icon={Wallet} color="amber" />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Growth Overview Chart */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
               <h3 className="text-lg font-bold text-slate-900">Overview</h3>
               <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-4">
                     <LegendItem color="bg-blue-600" label="Users" />
                     <LegendItem color="bg-emerald-600" label="Bookings" />
                     <LegendItem color="bg-amber-600" label="Revenue" />
                  </div>
                  <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                     <option>This Week</option>
                  </select>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={overviewData}>
                     <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dx={-15} />
                     <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                     <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                     <Area type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={3} fill="none" />
                     <Area type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={3} fill="none" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Recent Bookings */}
         <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Bookings</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
               {recentBookings.map((b) => (
                  <div key={b.id} className="flex items-center gap-4 group cursor-pointer">
                     <img src={b.image} className="w-12 h-12 rounded-2xl object-cover shadow-sm transition-transform group-hover:scale-105" alt="" />
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{b.property}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{b.guest}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 leading-none">{b.amount}</p>
                        <span className={cn(
                           "inline-block mt-2 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider",
                           b.status === "Confirmed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        )}>
                           {b.status}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
         {/* Users by Role */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Users by Role</h3>
               <button className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <MoreVertical size={18} className="text-slate-400" />
               </button>
            </div>
            <div className="relative h-48 flex items-center justify-center mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={usersByRole} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                        {usersByRole.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-bold text-slate-900">12,845</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total</p>
               </div>
            </div>
            <div className="space-y-3">
               {usersByRole.map((role) => (
                  <div key={role.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full")} style={{backgroundColor: role.color}} />
                        <span className="text-xs font-semibold text-slate-500">{role.name}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-900">{role.value.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-slate-400">({role.percent})</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Properties Status */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Properties Status</h3>
               <button className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <MoreVertical size={18} className="text-slate-400" />
               </button>
            </div>
            <div className="relative h-48 flex items-center justify-center mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={propertiesStatus} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                        {propertiesStatus.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-bold text-slate-900">2,340</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total</p>
               </div>
            </div>
            <div className="space-y-3">
               {propertiesStatus.map((status) => (
                  <div key={status.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full")} style={{backgroundColor: status.color}} />
                        <span className="text-xs font-semibold text-slate-500">{status.name}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-900">{status.value.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-slate-400">({status.percent})</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Revenue Overview */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                  <option>This Month</option>
               </select>
            </div>
            <div className="flex-1 min-h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueOverview}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 600}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 600}} />
                     <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                     <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm pb-10">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
         </div>
         <div className="space-y-8">
            {recentActivity.map((activity) => (
               <div key={activity.id} className="flex items-start gap-4">
                  <div className={cn("p-2.5 rounded-xl shrink-0 transition-transform hover:scale-110 shadow-sm", activity.color)}>
                     <activity.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                     <p className="text-xs text-slate-500 font-medium mt-1">{activity.desc}</p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{activity.time}</p>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function StatCard({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 transition-all hover:translate-y-[-4px] hover:shadow-md cursor-pointer group">
       <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm", colors[color])}>
          <Icon size={24} />
       </div>
       <div className="min-w-0">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
          <p className="text-2xl font-black text-slate-900 tracking-tight leading-none">{value}</p>
          <p className={cn(
             "text-[10px] font-bold mt-2 flex items-center gap-1 leading-none",
             up ? "text-emerald-600" : "text-rose-600"
          )}>
             {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
             {trend} <span className="text-slate-300 font-medium ml-1 lowercase">from last week</span>
          </p>
       </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
       <div className={cn("w-2 h-2 rounded-full shadow-sm", color)} />
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</span>
    </div>
  );
}
