import React from "react";
import { 
  Users, Building2, Wallet, ArrowUpRight, 
  ArrowDownRight, ChevronRight, Activity, 
  Target, Calendar, Star, Clock, MoreVertical,
  Plus, Search, Filter, Download
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const bookingTrend = [
  { name: "May 22", users: 400, bookings: 240, revenue: 2400 },
  { name: "May 23", users: 300, bookings: 139, revenue: 2210 },
  { name: "May 24", users: 200, bookings: 980, revenue: 2290 },
  { name: "May 25", users: 278, bookings: 390, revenue: 2000 },
  { name: "May 26", users: 189, bookings: 480, revenue: 2181 },
  { name: "May 27", users: 239, bookings: 380, revenue: 2500 },
  { name: "May 28", users: 349, bookings: 430, revenue: 2100 },
];

const activityStream = [
  { id: 1, type: "booking", user: "Rohit Sharma", property: "Ocean View Apartment", amount: "₹ 12,000", time: "2 mins ago", initial: "RS", color: "blue" },
  { id: 2, type: "user", user: "Priya Mehta", action: "Joined as Property Owner", time: "15 mins ago", initial: "PM", color: "indigo" },
  { id: 3, type: "payment", user: "Amit Patel", action: "Rent Paid for Sunrise Heights", amount: "₹ 8,500", time: "1 hour ago", initial: "AP", color: "emerald" },
  { id: 4, type: "property", user: "Neha Singh", action: "New Property Listed", property: "Green Valley Villa", time: "3 hours ago", initial: "NS", color: "amber" },
  { id: 5, type: "support", user: "Vikram Joshi", action: "Ticket Resolved", time: "5 hours ago", initial: "VJ", color: "rose" },
];

export default function SuperadminDashboard() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Superadmin Dashboard</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Roomhy</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Home Dashboard</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Welcome back, Aman! Here's what's happening on your platform today.</p>

      {/* Hero Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCardLarge icon={Users} color="blue" label="Total Active Users" value="12.8k" trend="+ 12.5% from last month" up />
        <StatCardLarge icon={Building2} color="indigo" label="Properties Listed" value="2,340" trend="+ 6.4% from last month" up />
        <StatCardLarge icon={Calendar} color="green" label="Total Bookings" value="876" trend="+ 18.7% from last month" up />
        <StatCardLarge icon={Wallet} color="orange" label="Gross Revenue" value="₹ 4.2M" trend="+ 24.3% from last month" up />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Growth Chart */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Platform Growth Matrix</h3>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Users</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Bookings</span>
                 </div>
                 <select className="bg-slate-50 border-none rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                 </select>
              </div>
           </div>
           <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={bookingTrend}>
                    <defs>
                       <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-15} />
                    <Tooltip 
                      contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}}
                    />
                    <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                    <Area type="monotone" dataKey="bookings" stroke="#6366F1" strokeWidth={4} fillOpacity={1} fill="url(#colorBookings)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Global Activity Stream */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Global Activity</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline uppercase">View All</button>
           </div>
           <div className="flex-1 space-y-8">
              {activityStream.map((act) => (
                <div key={act.id} className="flex items-start gap-6 group cursor-pointer">
                   <div className={cn(
                     "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg group-hover:scale-110 transition-transform shrink-0",
                     act.color === "blue" ? "bg-blue-600" : act.color === "indigo" ? "bg-indigo-600" : act.color === "emerald" ? "bg-emerald-600" : act.color === "amber" ? "bg-amber-600" : "bg-rose-600"
                   )}>
                      {act.initial}
                   </div>
                   <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {act.user} <span className="font-medium text-slate-400">{act.action || `Booked ${act.property}`}</span>
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{act.time}</span>
                        {act.amount && <span className="text-xs font-bold text-emerald-600">{act.amount}</span>}
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <button className="mt-10 w-full py-4 rounded-2xl bg-slate-50 text-slate-400 text-xs font-bold uppercase hover:bg-blue-600 hover:text-white transition-all border border-slate-100">
              Download Full Stream
           </button>
        </div>
      </div>

      {/* Operational Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
         <CardWrapper title="System Performance">
            <div className="flex flex-col gap-4 mt-4">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Uptime</span>
                  <span className="text-sm font-bold text-emerald-600">99.98%</span>
               </div>
               <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[99.98%]" />
               </div>
               <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Response</span>
                  <span className="text-sm font-bold text-blue-600">124ms</span>
               </div>
            </div>
         </CardWrapper>

         <CardWrapper title="Verification Queue">
            <div className="flex items-center justify-between mt-4">
               <div>
                  <p className="text-3xl font-bold text-slate-800">42</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Pending Approvals</p>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
               </div>
            </div>
            <button className="mt-6 w-full py-2 rounded-xl text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all uppercase">
               Review Queue
            </button>
         </CardWrapper>

         <CardWrapper title="Support Health">
            <div className="flex items-center justify-between mt-4">
               <div>
                  <p className="text-3xl font-bold text-slate-800">12</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Open Tickets</p>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
               </div>
            </div>
            <button className="mt-6 w-full py-2 rounded-xl text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white transition-all uppercase">
               Resolve Now
            </button>
         </CardWrapper>

         <CardWrapper title="Quick Actions">
            <div className="grid grid-cols-2 gap-3 mt-4">
               <ActionButton icon={Plus} label="Property" />
               <ActionButton icon={Users} label="Add User" />
               <ActionButton icon={Download} label="Export" />
               <ActionButton icon={Filter} label="Filter" />
            </div>
         </CardWrapper>
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
         <p className="text-[11px] font-bold text-slate-400 uppercase mb-4 leading-none">{label}</p>
         <p className="text-5xl font-bold text-slate-800 tracking-tighter leading-none">{value}</p>
      </div>
      <div className={cn(
        "flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-2xl w-fit",
        up ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : "text-rose-600 bg-rose-50 border border-rose-100"
      )}>
         {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
         {trend.split(' ')[1]}
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-600 hover:text-white transition-all group">
       <Icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
       <span className="text-[9px] font-bold uppercase">{label}</span>
    </button>
  );
}

function CardWrapper({ title, children }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
            <button className="text-slate-300 hover:text-slate-800 transition-colors">
               <MoreVertical className="w-6 h-6" />
            </button>
        </div>
        <div className="flex-1">
           {children}
        </div>
    </div>
  );
}
