import React, { useState, useEffect } from "react";
import { 
  Users, Building2, Calendar, Wallet, 
  ArrowUpRight, ArrowDownRight, ChevronRight, 
  MoreVertical, Search, Bell, Clock,
  Plus, LayoutDashboard, Home, UserCircle, 
  CreditCard, MessageSquare, PieChart as PieIcon,
  ShieldCheck, Settings, LogOut, CheckCircle2,
  TrendingUp, Activity, ShoppingBag, DollarSign
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line
} from "recharts";
import { fetchSuperadminStats } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- DATA FROM SCREENSHOT (Kept for non-dynamic parts) ---

const overviewData = [
  { name: "May 22", users: 1200, bookings: 800, revenue: 500 },
  { name: "May 23", users: 1500, bookings: 750, revenue: 450 },
  { name: "May 24", users: 1400, bookings: 950, revenue: 600 },
  { name: "May 25", users: 1800, bookings: 1100, revenue: 750 },
  { name: "May 26", users: 1700, bookings: 1050, revenue: 650 },
  { name: "May 27", users: 2200, bookings: 1300, revenue: 850 },
  { name: "May 28", users: 2000, bookings: 1200, revenue: 800 },
];

const usersByRole = [
  { name: "Tenant", value: 7245, color: "#3B82F6", percent: "56.4%" },
  { name: "Owner", value: 3120, color: "#10B981", percent: "24.3%" },
  { name: "Agent", value: 1850, color: "#F59E0B", percent: "14.4%" },
  { name: "Others", value: 630, color: "#6366F1", percent: "4.9%" },
];

const propertiesStatus = [
  { name: "Published", value: 1620, color: "#3B82F6", percent: "69.2%" },
  { name: "Pending", value: 420, color: "#F59E0B", percent: "17.9%" },
  { name: "Draft", value: 200, color: "#6366F1", percent: "8.5%" },
  { name: "Rejected", value: 100, color: "#EF4444", percent: "4.3%" },
];

const revenueOverview = [
  { name: "Week 1", revenue: 25000 },
  { name: "Week 2", revenue: 32000 },
  { name: "Week 3", revenue: 28000 },
  { name: "Week 4", revenue: 38000 },
  { name: "Week 5", revenue: 35000 },
];

const recentBookings = [
  { name: "Ocean View Apartment", user: "John Doe", price: "$1200", status: "Confirmed" },
  { name: "Luxury Villa in Bali", user: "Jane Smith", price: "$2500", status: "Confirmed" },
  { name: "Modern Studio City Center", user: "Mike Johnson", price: "$800", status: "Pending" },
  { name: "Cozy Apartment", user: "Emily Davis", price: "$650", status: "Confirmed" },
];

const recentActivity = [
  { title: "New user registered", desc: "Sarah Wilson has registered as a tenant.", time: "2 min ago", icon: UserCircle, color: "bg-emerald-50 text-emerald-600" },
  { title: "New property added", desc: "Luxury Sea View Apartment added by John Doe.", time: "15 min ago", icon: Building2, color: "bg-blue-50 text-blue-600" },
  { title: "New booking received", desc: "Booking #BR1234 for Modern Studio City Center.", time: "1 hour ago", icon: Calendar, color: "bg-purple-50 text-purple-600" },
  { title: "Payment received", desc: "Payment of $1200 received for Booking #BR1233.", time: "2 hours ago", icon: DollarSign, color: "bg-amber-50 text-amber-600" },
];

export default function SuperadminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, properties: 0, bookings: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const res = await fetchSuperadminStats();
        if (res.success) {
          setStats({
            totalUsers: (res.stats.tenants || 0) + (res.stats.owners || 0),
            properties: res.stats.properties || 0,
            bookings: res.stats.totalBookings || 0,
            revenue: res.stats.netRevenue || 0
          });
        }
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter text-slate-900">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Welcome back, Aman! Here's what's happening with Roomhy.</p>
         </div>
         <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all text-xs font-bold text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>May 22 - May 28, 2024</span>
         </div>
      </div>

      {/* Stats Row - FULLY DYNAMIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <StatCard label="Total Users" value={stats.totalUsers.toLocaleString()} trend="+ 12.5% from last week" icon={Users} color="blue" up loading={loading} />
         <StatCard label="Total Properties" value={stats.properties.toLocaleString()} trend="+ 8.3% from last week" icon={Building2} color="emerald" up loading={loading} />
         <StatCard label="Total Bookings" value={stats.bookings.toLocaleString()} trend="+ 15.7% from last week" icon={ShoppingBag} color="purple" up loading={loading} />
         <StatCard label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} trend="+ 18.6% from last week" icon={DollarSign} color="amber" up loading={loading} />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Overview Chart */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Overview</h3>
               <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-1.5 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                  <option>This Week</option>
               </select>
            </div>
            <div className="flex items-center gap-6 mb-6">
               <ChartLegend color="bg-blue-600" label="Users" />
               <ChartLegend color="bg-emerald-600" label="Bookings" />
               <ChartLegend color="bg-amber-600" label="Revenue" />
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={overviewData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dx={-15} />
                     <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                     <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} dot={{fill: '#3B82F6', r: 4}} activeDot={{r: 6}} />
                     <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={3} dot={{fill: '#10B981', r: 4}} activeDot={{r: 6}} />
                     <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={3} dot={{fill: '#F59E0B', r: 4}} activeDot={{r: 6}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Recent Bookings */}
         <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Bookings</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto max-h-[350px] custom-scrollbar pr-2">
               {recentBookings.map((b, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                     <div className="w-16 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                        <Building2 size={20} className="text-slate-300" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                           <h4 className="text-[13px] font-bold text-slate-900 truncate leading-none mb-1.5">{b.name}</h4>
                           <span className="text-[13px] font-bold text-slate-900">{b.price}</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <p className="text-[11px] text-slate-400 font-medium truncate">{b.user}</p>
                           <span className={cn(
                             "text-[10px] font-bold",
                             b.status === "Confirmed" ? "text-emerald-500" : "text-amber-500"
                           )}>{b.status}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
         {/* Users by Role Donut */}
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
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: role.color}} />
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

         {/* Properties Status Donut */}
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
               {propertiesStatus.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
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

         {/* Revenue Overview Bar */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
               <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-1 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                  <option>This Month</option>
               </select>
            </div>
            <div className="flex-1 min-h-[200px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueOverview}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 600}} dy={10} />
                     <YAxis hide />
                     <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                     <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50 text-[11px] font-bold text-slate-400">
               <span>$40K</span>
               <span>$30K</span>
               <span>$20K</span>
               <span>$10K</span>
               <span>$0</span>
            </div>
         </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
         </div>
         <div className="space-y-6">
            {recentActivity.map((act, i) => (
               <div key={i} className="flex items-center gap-4 group">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-sm", act.color)}>
                     <act.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                     <h4 className="text-[13px] font-bold text-slate-900 leading-none mb-1">{act.title}</h4>
                     <p className="text-[11px] text-slate-400 font-medium">{act.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                     <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{act.time}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function StatCard({ label, value, trend, icon: Icon, color, up, loading }) {
  const iconColors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col transition-all hover:translate-y-[-4px] hover:shadow-md group">
       <div className="flex items-center justify-between mb-6">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", iconColors[color])}>
             <Icon size={22} />
          </div>
          <button className="p-1 rounded-lg hover:bg-slate-50 transition-colors">
             <MoreVertical size={16} className="text-slate-300" />
          </button>
       </div>
       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
       {loading ? (
         <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-lg" />
       ) : (
         <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-3">{value}</h4>
       )}
       <div className="flex items-center gap-1.5 mt-auto">
          {up ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-rose-500" />}
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{trend}</span>
       </div>
    </div>
  );
}

function ChartLegend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
       <div className={cn("w-2 h-2 rounded-full", color)} />
       <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}
