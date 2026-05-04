import React from "react";
import { 
  Ticket, Clock, CheckCircle2, AlertCircle, 
  TrendingUp, TrendingDown, Calendar, Search, 
  Filter, MoreVertical, ChevronRight, Users, 
  UserPlus, UserCheck, Inbox, ShieldAlert,
  ArrowUpRight, ArrowDownRight, LayoutGrid,
  Settings, Download, Plus, MessageSquare,
  Activity, Star, Globe, Smartphone, Laptop, ArrowRight, Award
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const trendData = [
  { name: "May 22", opened: 180, resolved: 120, overdue: 45 },
  { name: "May 23", opened: 210, resolved: 145, overdue: 52 },
  { name: "May 24", opened: 265, resolved: 180, overdue: 65 },
  { name: "May 25", opened: 250, resolved: 195, overdue: 58 },
  { name: "May 26", opened: 290, resolved: 220, overdue: 72 },
  { name: "May 27", opened: 280, resolved: 245, overdue: 68 },
  { name: "May 28", opened: 320, resolved: 280, overdue: 85 },
];

const categoryData = [
  { name: "Maintenance", value: 512, color: "#3b82f6", percent: "41.0%" },
  { name: "Payment & Billing", value: 226, color: "#10b981", percent: "18.1%" },
  { name: "Property Related", value: 184, color: "#f59e0b", percent: "14.7%" },
  { name: "Amenities", value: 156, color: "#8b5cf6", percent: "12.5%" },
  { name: "General Inquiry", value: 110, color: "#ef4444", percent: "8.8%" },
  { name: "Others", value: 60, color: "#94a3b8", percent: "4.8%" },
];

const sourceData = [
  { name: "Tenant", value: 842, color: "#3b82f6", percent: "67.5%" },
  { name: "Owner", value: 352, color: "#10b981", percent: "28.2%" },
  { name: "System / Other", value: 54, color: "#f59e0b", percent: "4.3%" },
];

const recentTickets = [
  { id: "#TK-1256", type: "Tenant", user: "Rahul Sharma", cat: "Maintenance", priority: "High", status: "Open", agent: "Amit Verma", date: "May 28, 2024" },
  { id: "#TK-1255", type: "Owner", user: "Neha Singh", cat: "Property Related", priority: "Medium", status: "In Progress", agent: "Priya Nair", date: "May 28, 2024" },
  { id: "#TK-1254", type: "Tenant", user: "Vikram Joshi", cat: "Payment & Billing", priority: "High", status: "Open", agent: "Rohit Patil", date: "May 28, 2024" },
  { id: "#TK-1253", type: "Tenant", user: "Aisha Khan", cat: "Amenities", priority: "Low", status: "Resolved", agent: "Sneha Iyer", date: "May 28, 2024" },
  { id: "#TK-1252", type: "Tenant", user: "Amit Patel", cat: "General Inquiry", priority: "Medium", status: "Resolved", agent: "Karan Mehta", date: "May 28, 2024" },
];

const miniLineData = [ {v:10}, {v:15}, {v:12}, {v:20}, {v:18}, {v:25}, {v:22} ];

export default function SupportOverview() {
  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Support Overview</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Support {">"} Overview</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
               <Calendar className="w-4 h-4 text-slate-400" />
               <span className="text-[11px] font-bold text-slate-600">May 22 - May 28, 2024</span>
               <MoreVertical className="w-4 h-4 text-slate-300" />
            </div>
         </div>
      </div>

      {/* Row 1: Hero Stats (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
         <StatCard label="Total Tickets" value="1,248" trend="+ 15.6%" up icon={Ticket} color="purple" />
         <StatCard label="Open Tickets" value="362" trend="+ 8.4%" up icon={Clock} color="amber" />
         <StatCard label="In Progress" value="538" trend="+ 12.1%" up icon={Activity} color="blue" />
         <StatCard label="Resolved Tickets" value="1,086" trend="+ 18.7%" up icon={CheckCircle2} color="emerald" />
         <StatCard label="Overdue Tickets" value="72" trend="+ 4.3%" up={false} icon={AlertCircle} color="rose" />
         <StatCard label="Avg. Resolution Time" value="2.4 Days" trend="+ 0.6 Days" up={false} icon={TrendingUp} color="blue" />
      </div>

      {/* Row 2: Trend & Category Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Tickets Trend */}
         <div className="lg:col-span-6 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-800">Ticket Trend</h3>
               <select className="bg-slate-50 border-none rounded-xl px-3 py-1.5 text-[9px] font-bold text-slate-500 outline-none"><option>This Week</option></select>
            </div>
            <div className="h-[280px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                     <Tooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                     <Line type="monotone" dataKey="opened" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
                     <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} />
                     <Line type="monotone" dataKey="overdue" stroke="#ef4444" strokeWidth={3} dot={{r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff'}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-8 mt-6 justify-center">
               <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Opened</span></div>
               <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resolved</span></div>
               <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-rose-500" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overdue</span></div>
            </div>
         </div>

         {/* Tickets by Category */}
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 w-full mb-8">By Category</h3>
            <div className="relative w-44 h-44 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={categoryData} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                        {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-black text-slate-800 tracking-tighter leading-none">1,248</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">Total Tickets</p>
               </div>
            </div>
            <div className="w-full space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
               {categoryData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-slate-800 transition-colors leading-none">{d.name}</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-800">{d.percent}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Tickets by Source */}
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 w-full mb-8">By Source</h3>
            <div className="relative w-44 h-44 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={sourceData} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                        {sourceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <Globe className="w-8 h-8 text-slate-100" />
               </div>
            </div>
            <div className="w-full space-y-4 flex-1">
               {sourceData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                     <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-slate-800 transition-colors leading-none">{d.name}</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-800">{d.percent}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Row 3: Mini Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
         <MiniStat label="All Tickets" value="1,248" icon={Ticket} color="bg-indigo-50 text-indigo-600" />
         <MiniStat label="Tenants" value="842" icon={Users} color="bg-emerald-50 text-emerald-600" />
         <MiniStat label="Owners" value="352" icon={Award} color="bg-amber-50 text-amber-600" />
         <MiniStat label="Open" value="362" icon={Clock} color="bg-blue-50 text-blue-600" />
         <MiniStat label="In Progress" value="538" icon={Activity} color="bg-amber-50 text-amber-600" />
         <MiniStat label="Resolved" value="1,086" icon={CheckCircle2} color="bg-emerald-50 text-emerald-600" />
         <MiniStat label="Overdue" value="72" icon={AlertCircle} color="bg-rose-50 text-rose-600" />
      </div>

      {/* Row 4: Recent Tickets & Resolution Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-800">Recent Tickets</h3>
               <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                        <th className="pb-6">ID</th>
                        <th className="pb-6">Raised By</th>
                        <th className="pb-6">Category</th>
                        <th className="pb-6 text-center">Priority</th>
                        <th className="pb-6">Status</th>
                        <th className="pb-6">Assignee</th>
                        <th className="pb-6 text-right">Date</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentTickets.map((t, i) => (
                        <tr key={i} className="group hover:bg-slate-50 transition-all">
                           <td className="py-5 text-[11px] font-bold text-blue-600">{t.id}</td>
                           <td className="py-5">
                              <p className="text-[11px] font-bold text-slate-800">{t.user}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{t.type}</p>
                           </td>
                           <td className="py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.cat}</td>
                           <td className="py-5 text-center"><span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-tighter", t.priority === "High" ? "bg-rose-50 text-rose-600 border-rose-100" : t.priority === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100")}>{t.priority}</span></td>
                           <td className="py-5"><span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-tighter", t.status === "Open" ? "bg-blue-50 text-blue-600 border-blue-100" : t.status === "Resolved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100")}>{t.status}</span></td>
                           <td className="py-5 text-[11px] font-bold text-slate-800">{t.agent}</td>
                           <td className="py-5 text-right text-[10px] font-bold text-slate-400 uppercase">{t.date}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 mb-8">Resolution Progress</h3>
            <div className="flex flex-col items-center">
               <div className="relative w-56 h-56 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={[{v: 87, c: '#3b82f6'}, {v: 13, c: '#f1f5f9'}]} innerRadius={65} outerRadius={85} startAngle={90} endAngle={-270} dataKey="v" stroke="none">
                           <Cell fill="#3b82f6" /><Cell fill="#f1f5f9" />
                        </Pie>
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <p className="text-4xl font-black text-slate-800 tracking-tighter leading-none">87%</p>
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Resolution Rate</p>
                  </div>
               </div>
               <div className="w-full space-y-4 px-2">
                  <TrackItem label="Total Issues" value="1,248" />
                  <TrackItem label="Total Resolved" value="1,086" />
                  <TrackItem label="Avg. Response Time" value="1.2 Hours" />
                  <TrackItem label="Avg. Resolution Time" value="2.4 Days" />
                  <TrackItem label="SLA Met Score" value="93%" />
               </div>
               <div className="mt-8 pt-8 border-t border-slate-50 w-full text-center">
                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-600 mb-2 uppercase tracking-widest">
                     <TrendingUp className="w-4 h-4" /> 12% improvement vs last week
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Row 5: Detailed Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 pb-10">
         <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Top Categories</h3>
            <div className="space-y-4">
               <MiniCatRow label="Maintenance" value="512" />
               <MiniCatRow label="Payment" value="226" />
               <MiniCatRow label="Property" value="184" />
            </div>
         </div>

         <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 flex flex-col justify-between">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Resolution Speed</h3>
            <p className="text-2xl font-black text-slate-800 tracking-tighter leading-none mb-1">2.4 Days</p>
            <div className="flex items-center gap-1.5 text-emerald-600 text-[9px] font-bold uppercase tracking-widest">
               <TrendingDown className="w-3.5 h-3.5" /> 0.6 days faster
            </div>
         </div>

         <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 flex flex-col justify-between">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">SLA Adherence</h3>
            <div className="flex items-center gap-4">
               <p className="text-2xl font-black text-slate-800 tracking-tighter">93%</p>
               <div className="flex-1 bg-slate-50 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '93%' }} />
               </div>
            </div>
         </div>

         <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 flex flex-col justify-center items-center">
            <p className="text-3xl font-black text-slate-800 tracking-tighter leading-none mb-1">4.6<span className="text-xs text-slate-300">/5</span></p>
            <div className="flex items-center gap-1 text-amber-400 mb-2">
               <Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-slate-100 text-slate-100" />
            </div>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">CSAT Score</span>
         </div>

         <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 flex flex-col justify-between">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">High Priority</h3>
            <p className="text-3xl font-black text-rose-600 tracking-tighter leading-none mb-1">18</p>
            <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest">Action Required</span>
         </div>

         <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 rounded-full blur-[50px] opacity-20 -mr-12 -mt-12 group-hover:opacity-40 transition-opacity"></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Export</p>
            <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
               <Download className="w-4 h-4" /> Reports
            </button>
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    purple: "text-purple-600 bg-purple-50 border-purple-100 shadow-purple-50",
    amber: "text-amber-600 bg-amber-50 border-amber-100 shadow-amber-50",
    blue: "text-blue-600 bg-blue-50 border-blue-100 shadow-blue-50",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-50",
    rose: "text-rose-600 bg-rose-50 border-rose-100 shadow-rose-50",
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
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40 flex items-center gap-3 group cursor-pointer hover:bg-slate-50 transition-all">
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm", color)}>
          <Icon className="w-5 h-5" />
       </div>
       <div>
          <p className="text-sm font-black text-slate-800 leading-none mb-0.5">{value}</p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight opacity-60">{label}</p>
       </div>
    </div>
  );
}

function TrackItem({ label, value }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-800 transition-colors leading-none">{label}</span>
       <span className="text-[11px] font-bold text-slate-800 leading-none">{value}</span>
    </div>
  );
}

function MiniCatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-800 transition-colors leading-none">{label}</span>
       <span className="text-[11px] font-bold text-slate-800 leading-none">{value}</span>
    </div>
  );
}
