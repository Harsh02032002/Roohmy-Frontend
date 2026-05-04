import React from "react";
import { 
  Building2, Users, Wallet, ArrowUpRight, 
  ArrowDownRight, ChevronRight, Activity, 
  Target, Calendar, Star, Clock, MoreVertical,
  Plus, Search, Filter, Download, AlertCircle,
  TrendingUp, CheckCircle2, LayoutGrid
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const revenueData = [
  { name: "Mon", revenue: 4000, bookings: 240 },
  { name: "Tue", revenue: 3000, bookings: 139 },
  { name: "Wed", revenue: 2000, bookings: 980 },
  { name: "Thu", revenue: 2780, bookings: 390 },
  { name: "Fri", revenue: 1890, bookings: 480 },
  { name: "Sat", revenue: 2390, bookings: 380 },
  { name: "Sun", revenue: 3490, bookings: 430 },
];

const alerts = [
  { id: 1, type: "rent", message: "12 Pending Rent Payments for Sunrise Heights", time: "2 hours ago", color: "rose" },
  { id: 2, type: "kyc", message: "8 New Owner KYC Documents pending review", time: "5 hours ago", color: "amber" },
  { id: 3, type: "system", message: "Server Maintenance scheduled for 2 AM", time: "1 day ago", color: "blue" },
];

export default function SuperadminHomeOverview() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Home Overview</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Operations</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Overview Dashboard</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Deep dive into your property inventory, tenant metrics and daily operations.</p>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge icon={Building2} color="blue" label="Managed Properties" value="2,340" trend="+ 6.4% from last month" up />
        <StatCardLarge icon={Users} color="indigo" label="Active Tenants" value="1,248" trend="+ 12.5% from last month" up />
        <StatCardLarge icon={TrendingUp} color="green" label="Occupancy Rate" value="94.2%" trend="+ 2.1% from last month" up />
        <StatCardLarge icon={Wallet} color="orange" label="Collection Alert" value="₹ 1.2M" trend="Pending this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Forecast */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Financial Velocity</h3>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Revenue</span>
                 </div>
                 <select className="bg-slate-50 border-none rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                    <option>This Week</option>
                 </select>
              </div>
           </div>
           <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-15} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}}
                    />
                    <Bar dataKey="revenue" fill="#3B82F6" radius={[10, 10, 10, 10]} barSize={40} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Operational Alerts */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Urgent Alerts</h3>
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                 <AlertCircle className="w-5 h-5" />
              </div>
           </div>
           <div className="flex-1 space-y-6">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                   <div className="flex justify-between items-start mb-3">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded-lg border uppercase",
                        alert.color === "rose" ? "bg-rose-50 text-rose-600 border-rose-100" :
                        alert.color === "amber" ? "bg-amber-50 text-amber-600 border-amber-100" :
                        "bg-blue-50 text-blue-600 border-blue-100"
                      )}>{alert.type}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{alert.time}</span>
                   </div>
                   <p className="text-sm font-bold text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">{alert.message}</p>
                </div>
              ))}
           </div>
           <button className="mt-10 w-full py-4 rounded-2xl border-2 border-dashed border-slate-100 text-slate-400 text-xs font-bold uppercase hover:border-blue-600 hover:text-blue-600 transition-all">
              Configure Alerts
           </button>
        </div>
      </div>

      {/* Property Lifecycle Table */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Operational Nerve Center</h3>
            <div className="flex items-center gap-4">
               <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 transition-all"><Filter className="w-5 h-5" /></button>
               <button className="text-xs font-bold text-blue-600 hover:underline uppercase">Full Report</button>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <MetricBox label="Pending Onboarding" value="24" color="blue" icon={Plus} />
            <MetricBox label="Maintenance Tickets" value="15" color="rose" icon={Activity} />
            <MetricBox label="Ready to Rent" value="142" color="emerald" icon={CheckCircle2} />
         </div>
      </div>
    </div>
  );
}

function StatCardLarge({ icon: Icon, color, label, value, trend, up }) {
  const colors = {
    blue: "bg-blue-600 shadow-blue-200",
    indigo: "bg-indigo-600 shadow-indigo-200",
    green: "bg-emerald-600 shadow-emerald-200",
    orange: "bg-amber-600 shadow-amber-200",
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-8 group hover:translate-y-[-8px] transition-all duration-500">
      <div className={cn("w-20 h-20 rounded-[1.75rem] flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-6", colors[color])}>
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

function MetricBox({ label, value, color, icon: Icon }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    rose: "bg-rose-50 text-rose-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all cursor-pointer group">
       <div>
          <p className="text-3xl font-bold text-slate-800 group-hover:scale-110 transition-transform origin-left">{value}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">{label}</p>
       </div>
       <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm", colors[color])}>
          <Icon className="w-7 h-7" />
       </div>
    </div>
  );
}
