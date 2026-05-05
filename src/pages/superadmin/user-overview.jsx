import React from "react";
import { 
  Users, UserCheck, Building2, UserPlus, 
  ArrowUpRight, ArrowDownRight, ChevronRight, 
  MoreVertical, Search, Calendar, ShieldCheck,
  CheckCircle2, Clock, XCircle, Activity,
  Briefcase, UserCircle, ClipboardList, Mail
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- EXACT DATA FROM USER MANAGEMENT OVERVIEW SCREENSHOT ---

const userDistribution = [
  { name: "Team Members", value: 78, color: "#3B82F6", percent: "6.3%" },
  { name: "Property Owners", value: 432, color: "#10B981", percent: "34.6%" },
  { name: "Tenants", value: 738, color: "#F59E0B", percent: "59.1%" },
];

const recentUsers = [
  { name: "Rohit Sharma", role: "Team Member", email: "rohit.m@roomhy.com", date: "May 28, 2024", status: "Active", initial: "RS", color: "bg-blue-50 text-blue-600" },
  { name: "Priya Mehta", role: "Property Owner", email: "priya.mehta@email.com", date: "May 27, 2024", status: "Active", initial: "PM", color: "bg-emerald-50 text-emerald-600" },
  { name: "Amit Patel", role: "Tenant", email: "amit.patel@email.com", date: "May 26, 2024", status: "Active", initial: "AP", color: "bg-blue-50 text-blue-600" },
  { name: "Neha Singh", role: "Team Member", email: "neha.singh@roomhy.com", date: "May 26, 2024", status: "Active", initial: "NS", color: "bg-blue-50 text-blue-600" },
  { name: "Vikram Joshi", role: "Tenant", email: "vikram.joshi@email.com", date: "May 25, 2024", status: "Active", initial: "VJ", color: "bg-emerald-50 text-emerald-600" },
];

const pendingApprovals = [
  { label: "Property Owners", count: 18, icon: Building2, color: "text-emerald-600 bg-emerald-50" },
  { label: "Tenants", count: 32, icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "Documents", count: 27, icon: ClipboardList, color: "text-amber-600 bg-amber-50" },
];

const kycStatus = [
  { label: "Verified", count: 842, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
  { label: "Pending", count: 276, icon: Clock, color: "text-amber-600 bg-amber-50" },
  { label: "Rejected", count: 130, icon: XCircle, color: "text-rose-600 bg-rose-50" },
];

const attendanceSummary = [
  { label: "Present", count: 62, percent: "79.5%", color: "text-emerald-600 bg-emerald-50" },
  { label: "Absent", count: 10, percent: "12.8%", color: "text-rose-600 bg-rose-50" },
  { label: "On Leave", count: 6, percent: "7.7%", color: "text-amber-600 bg-amber-50" },
];

export default function UserOverview() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management Overview</h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
               <span className="hover:text-blue-600 cursor-pointer transition-colors">User Management</span>
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

      <p className="text-sm text-slate-500 font-medium mb-8">Manage your team, property owners, and tenants all in one place.</p>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
         <StatCardSmall label="Total Users" value="1,248" trend="12.5%" up icon={Users} color="blue" />
         <StatCardSmall label="Team Members" value="78" trend="8.4%" up icon={Briefcase} color="indigo" />
         <StatCardSmall label="Property Owners" value="432" trend="11.2%" up icon={Building2} color="emerald" />
         <StatCardSmall label="Tenants" value="738" trend="9.7%" up icon={UserCircle} color="purple" />
         <StatCardSmall label="Active Today" value="356" trend="7.3%" up icon={Activity} color="emerald" />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* User Distribution Hub */}
         <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">User Distribution</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                  <option>This Month</option>
               </select>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="relative h-64 w-64 flex items-center justify-center shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={userDistribution} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                           {userDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <p className="text-3xl font-black text-slate-900">1,248</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Users</p>
                  </div>
               </div>
               <div className="flex-1 space-y-5 w-full">
                  {userDistribution.map((item) => (
                     <div key={item.name} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                           <div className="w-3 h-3 rounded-full shadow-sm transition-transform group-hover:scale-125" style={{backgroundColor: item.color}} />
                           <span className="text-sm font-bold text-slate-500">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-sm font-black text-slate-900">{item.value}</span>
                           <span className="text-[11px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded-lg">({item.percent})</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Recent Users */}
         <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Users</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto max-h-[350px] custom-scrollbar pr-2">
               {recentUsers.map((user, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50/50 p-2 rounded-2xl transition-all">
                     <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105", user.color)}>
                        {user.initial}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                           <p className="text-[13px] font-bold text-slate-900 truncate leading-none">{user.name}</p>
                           <p className="text-[10px] text-slate-300 font-bold uppercase">{user.date}</p>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mt-1.5 truncate leading-none">{user.role}</p>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                           <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{user.status}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Pending Approvals */}
         <StatusListCard title="Pending Approvals" data={pendingApprovals} />
         {/* KYC Status */}
         <StatusListCard title="KYC / Documents Status" data={kycStatus} />
         {/* Attendance Summary */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Attendance Summary (Team)</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500 outline-none cursor-pointer">
                  <option>This Week</option>
               </select>
            </div>
            <div className="space-y-6">
               {attendanceSummary.map((item, i) => (
                  <div key={i} className="flex items-center justify-between group">
                     <div className="flex items-center gap-4">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.color)}>
                           <UserCheck size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-500">{item.label}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-900">{item.count}</span>
                        <span className="text-[11px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded-lg">({item.percent})</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function StatCardSmall({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    emerald: "text-emerald-600 bg-emerald-50",
    purple: "text-purple-600 bg-purple-50",
    amber: "text-amber-600 bg-amber-50",
    indigo: "text-indigo-600 bg-indigo-50",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col transition-all hover:translate-y-[-4px] hover:shadow-md group">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm mb-4", colors[color])}>
          <Icon size={22} />
       </div>
       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
       <p className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-3">{value}</p>
       <div className="flex items-center gap-1.5 mt-auto">
          {up ? <ArrowUpRight size={12} className="text-emerald-600" /> : <ArrowDownRight size={12} className="text-rose-600" />}
          <span className={cn("text-[10px] font-bold", up ? "text-emerald-600" : "text-rose-600")}>{trend}</span>
          <span className="text-[10px] text-slate-400 font-medium">from last month</span>
       </div>
    </div>
  );
}

function StatusListCard({ title, data }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
       <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button className="text-[11px] font-bold text-blue-600 uppercase tracking-widest hover:underline">View All</button>
       </div>
       <div className="space-y-6">
          {data.map((item, i) => (
             <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", item.color)}>
                      <item.icon size={18} />
                   </div>
                   <span className="text-sm font-bold text-slate-500">{item.label}</span>
                </div>
                <p className="text-lg font-black text-slate-900 tracking-tight">{item.count}</p>
             </div>
          ))}
       </div>
    </div>
  );
}
