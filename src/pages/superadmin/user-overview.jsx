import React from "react";
import { 
  Users, UserCheck, Shield, Clock, MoreVertical, 
  ArrowUpRight, ArrowDownRight, Building2, FileText, 
  CheckCircle2, AlertCircle, XCircle, ChevronRight
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const userDistribution = [
  { name: "Team Members", value: 78, color: "#3B82F6", percent: "6.3%" },
  { name: "Property Owners", value: 432, color: "#10B981", percent: "34.6%" },
  { name: "Tenants", value: 738, color: "#F59E0B", percent: "59.1%" },
];

const recentUsers = [
  { id: 1, name: "Rohit Sharma", role: "Team Member", email: "rohit.s@roomhy.com", date: "May 28, 2024", status: "Active", initial: "RS", color: "bg-blue-600 shadow-blue-100" },
  { id: 2, name: "Priya Mehta", role: "Property Owner", email: "priya.mehta@email.com", date: "May 27, 2024", status: "Active", initial: "PM", color: "bg-indigo-600 shadow-indigo-100" },
  { id: 3, name: "Amit Patel", role: "Tenant", email: "amit.patel@email.com", date: "May 26, 2024", status: "Active", initial: "AP", color: "bg-emerald-600 shadow-emerald-100" },
  { id: 4, name: "Neha Singh", role: "Team Member", email: "neha.singh@roomhy.com", date: "May 26, 2024", status: "Active", initial: "NS", color: "bg-amber-600 shadow-amber-100" },
  { id: 5, name: "Vikram Joshi", role: "Tenant", email: "vikram.joshi@email.com", date: "May 25, 2024", status: "Active", initial: "VJ", color: "bg-rose-600 shadow-rose-100" },
];

const pendingApprovals = [
  { icon: Building2, label: "Property Owners", count: 18, color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Users, label: "Tenants", count: 32, color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: FileText, label: "Documents", count: 27, color: "text-amber-600", bg: "bg-amber-50" },
];

const kycStatus = [
  { label: "Verified", value: 842, color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
  { label: "Pending", value: 276, color: "text-amber-600", bg: "bg-amber-50", icon: AlertCircle },
  { label: "Rejected", value: 130, color: "text-rose-600", bg: "bg-rose-50", icon: XCircle },
];

const attendanceSummary = [
  { label: "Present", value: 62, percent: "78.6%", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Absent", value: 10, percent: "12.8%", color: "text-rose-600", bg: "bg-rose-50" },
  { label: "On Leave", value: 6, percent: "7.7%", color: "text-amber-600", bg: "bg-amber-50" },
];

export default function UserManagementOverview() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">User Management Overview</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>User Management</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Overview</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Manage your team, property owners, and tenants all in one place.</p>

      {/* Hero Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <StatCardLarge icon={Users} color="blue" label="Total Users" value="1,248" trend="+ 12.5% from last month" up />
        <StatCardLarge icon={Shield} color="indigo" label="Team Members" value="78" trend="+ 6.4% from last month" up />
        <StatCardLarge icon={Building2} color="green" label="Property Owners" value="432" trend="+ 11.2% from last month" up />
        <StatCardLarge icon={UserCheck} color="orange" label="Tenants" value="738" trend="+ 9.7% from last month" up />
        <StatCardLarge icon={Clock} color="teal" label="Active Today" value="356" trend="+ 7.3% from last month" up />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* User Distribution Chart */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">User Distribution</h3>
              <select className="bg-slate-50 border-none rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                 <option>This Month</option>
              </select>
           </div>
           <div className="flex flex-col items-center">
              <div className="relative w-80 h-80">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={userDistribution} dataKey="value" innerRadius={90} outerRadius={130} paddingAngle={10} stroke="none">
                          {userDistribution.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip 
                         contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}}
                       />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-5xl font-bold text-slate-800 tracking-tighter">1,248</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-3">Total Users</p>
                 </div>
              </div>
              <div className="w-full mt-12 space-y-6">
                 {userDistribution.map(r => (
                    <div key={r.name} className="flex items-center justify-between group cursor-default">
                       <div className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: r.color}} />
                          <span className="text-sm font-bold text-slate-500 group-hover:text-slate-800 transition-colors">{r.name}</span>
                       </div>
                       <div className="text-right">
                         <span className="text-base font-bold text-slate-800">{r.value}</span>
                         <span className="text-[10px] font-bold text-slate-400 ml-2 uppercase">({r.percent})</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Recent Users List */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Recent Users</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline uppercase">View All</button>
           </div>
           <div className="space-y-6">
              {recentUsers.map(user => (
                <div key={user.id} className="flex items-center gap-6 group cursor-pointer p-2 rounded-3xl transition-all">
                   <div className={cn("w-16 h-16 rounded-[1.25rem] flex items-center justify-center font-bold text-white text-xl shadow-xl transition-transform group-hover:scale-105", user.color)}>
                      {user.initial}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <p className="text-base font-bold text-slate-800 truncate">{user.name}</p>
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 uppercase">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-bold mt-1 uppercase opacity-80">{user.role} • {user.email}</p>
                   </div>
                   <div className="text-right hidden sm:block mr-4">
                      <p className="text-xs font-bold text-slate-800">{user.date}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Joined</p>
                   </div>
                   <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-800 group-hover:text-white transition-all">
                      <MoreVertical className="w-5 h-5" />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <CardWrapper title="Pending Approvals" action="View All">
            <div className="space-y-6 mt-4">
               {pendingApprovals.map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-slate-800 transition-all cursor-pointer shadow-sm hover:shadow-xl">
                    <div className="flex items-center gap-5">
                       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-white transition-transform group-hover:scale-110", item.color)}>
                          <item.icon className="w-6 h-6" />
                       </div>
                       <span className="text-xs font-bold text-slate-500 uppercase group-hover:text-slate-100">{item.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800 group-hover:text-white transition-colors">{item.count}</span>
                 </div>
               ))}
            </div>
         </CardWrapper>

         <CardWrapper title="KYC / Documents Status" action="View All">
            <div className="space-y-6 mt-4">
               {kycStatus.map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-slate-800 transition-all cursor-pointer shadow-sm hover:shadow-xl">
                    <div className="flex items-center gap-5">
                       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-white transition-transform group-hover:scale-110", item.color)}>
                          <item.icon className="w-6 h-6" />
                       </div>
                       <span className="text-xs font-bold text-slate-500 uppercase group-hover:text-slate-100">{item.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800 group-hover:text-white transition-colors">{item.value}</span>
                 </div>
               ))}
            </div>
         </CardWrapper>

         <CardWrapper title="Attendance Summary" select="This Week">
            <div className="space-y-6 mt-4">
               {attendanceSummary.map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-slate-800 transition-all cursor-pointer shadow-sm hover:shadow-xl">
                    <div className="flex items-center gap-5">
                       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-white transition-transform group-hover:scale-110", item.color)}>
                          <Users className="w-6 h-6" />
                       </div>
                       <span className="text-xs font-bold text-slate-500 uppercase group-hover:text-slate-100">{item.label}</span>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-bold text-slate-800 group-hover:text-white transition-colors">{item.value}</p>
                       <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-300 uppercase mt-1">({item.percent})</p>
                    </div>
                 </div>
               ))}
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
    teal: "bg-teal-600 shadow-teal-200",
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

function CardWrapper({ title, children, action, select }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
        <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
            {action && (
              <button className="text-xs font-bold text-blue-600 hover:underline uppercase">{action}</button>
            )}
            {select && (
              <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500 outline-none hover:bg-slate-100 transition-colors cursor-pointer">
                  <option>{select}</option>
              </select>
            )}
        </div>
        <div className="flex-1">
           {children}
        </div>
    </div>
  );
}
