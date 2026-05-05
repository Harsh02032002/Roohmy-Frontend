import React from "react";
import { 
  Headphones, LifeBuoy, Clock, CheckCircle2, 
  AlertCircle, ArrowUpRight, ArrowDownRight, 
  ChevronRight, MoreVertical, Search, Filter, 
  Download, Activity, ShieldCheck, Zap, 
  MessageCircle, BarChart3, PieChart as PieIcon,
  Smile, User, Phone, Mail, Globe, LayoutGrid,
  FileText, History, Target, AlertTriangle, Calendar
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- EXACT DATA FROM SUPPORT OVERVIEW SCREENSHOT ---

const ticketsTrend = [
  { name: "May 22", opened: 100, resolved: 80, overdue: 10 },
  { name: "May 23", opened: 150, resolved: 120, overdue: 15 },
  { name: "May 24", opened: 130, resolved: 140, overdue: 12 },
  { name: "May 25", opened: 180, resolved: 160, overdue: 20 },
  { name: "May 26", opened: 210, resolved: 170, overdue: 18 },
  { name: "May 27", opened: 190, resolved: 185, overdue: 22 },
  { name: "May 28", opened: 250, resolved: 210, overdue: 25 },
];

const categoryData = [
  { name: "Maintenance", value: 512, color: "#3B82F6", percent: "41.0%" },
  { name: "Payment & Billing", value: 226, color: "#10B981", percent: "18.1%" },
  { name: "Property Related", value: 184, color: "#F59E0B", percent: "14.7%" },
  { name: "Amenities", value: 156, color: "#6366F1", percent: "12.5%" },
  { name: "General Inquiry", value: 110, color: "#EC4899", percent: "8.8%" },
  { name: "Others", value: 60, color: "#94A3B8", percent: "4.8%" },
];

const sourceData = [
  { name: "Tenant", value: 842, color: "#3B82F6", percent: "67.6%" },
  { name: "Owner", value: 352, color: "#10B981", percent: "28.2%" },
  { name: "System / Other", value: 54, color: "#F59E0B", percent: "4.2%" },
];

const recentTickets = [
  { id: "#TK-1256", type: "Tenant", raisedBy: "Rahul Sharma", category: "Maintenance", priority: "High", status: "Open", assignee: "Amit Verma", created: "May 28, 2024, 10:30 AM", color: "text-blue-600 bg-blue-50" },
  { id: "#TK-1255", type: "Owner", raisedBy: "Neha Singh", category: "Property Related", priority: "Medium", status: "In Progress", assignee: "Priya Nair", created: "May 28, 2024, 09:15 AM", color: "text-amber-600 bg-amber-50" },
  { id: "#TK-1254", type: "Tenant", raisedBy: "Vikram Joshi", category: "Payment & Billing", priority: "High", status: "Open", assignee: "Rohit Patil", created: "May 28, 2024, 08:45 AM", color: "text-blue-600 bg-blue-50" },
  { id: "#TK-1253", type: "Tenant", raisedBy: "Aisha Khan", category: "Amenities", priority: "Low", status: "Resolved", assignee: "Sneha Iyer", created: "May 28, 2024, 07:40 AM", color: "text-emerald-600 bg-emerald-50" },
  { id: "#TK-1252", type: "Owner", raisedBy: "Amit Patel", category: "General Inquiry", priority: "Medium", status: "Open", assignee: "Karan Mehta", created: "May 28, 2024, 06:20 AM", color: "text-blue-600 bg-blue-50" },
];

const topIssues = [
  { label: "Maintenance", count: 512, percent: 41 },
  { label: "Payment & Billing", count: 226, percent: 18 },
  { label: "Property Related", count: 184, percent: 15 },
];

export default function SupportOverview() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Support Overview</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Track, manage and resolve all tenant and owner complaints efficiently.</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
               <Calendar className="w-4 h-4 text-slate-400" />
               <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">May 22 - May 28, 2024</span>
            </div>
         </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
         <StatCardSmall label="Total Tickets" value="1,248" trend="15.6%" up icon={Headphones} color="blue" />
         <StatCardSmall label="Open Tickets" value="362" trend="8.4%" up icon={AlertCircle} color="amber" />
         <StatCardSmall label="In Progress" value="538" trend="12.1%" up icon={Clock} color="blue" />
         <StatCardSmall label="Resolved Tickets" value="1,086" trend="18.7%" up icon={CheckCircle2} color="emerald" />
         <StatCardSmall label="Overdue Tickets" value="72" trend="4.3%" up icon={AlertTriangle} color="rose" />
         <StatCardSmall label="Avg. Resolution Time" value="2.4 Days" trend="0.6 Days" icon={Zap} color="emerald" />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Tickets Trend */}
         <div className="col-span-12 lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">Tickets Trend</h3>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                     <LegendItem color="bg-blue-600" label="Opened" />
                     <LegendItem color="bg-emerald-600" label="Resolved" />
                     <LegendItem color="bg-rose-600" label="Overdue" />
                  </div>
                  <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none">
                     <option>This Week</option>
                  </select>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ticketsTrend}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dx={-15} />
                     <Tooltip />
                     <Line type="monotone" dataKey="opened" stroke="#3B82F6" strokeWidth={3} dot={{fill: '#3B82F6', r: 4}} activeDot={{r: 6}} />
                     <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={3} dot={{fill: '#10B981', r: 4}} activeDot={{r: 6}} />
                     <Line type="monotone" dataKey="overdue" stroke="#EF4444" strokeWidth={3} dot={{fill: '#EF4444', r: 4}} activeDot={{r: 6}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Tickets by Category Donut */}
         <AnalyticsPieCard title="Tickets by Category" total="1,248" data={categoryData} unit="Total Tickets" />

         {/* Tickets by Source Donut */}
         <AnalyticsPieCard title="Tickets by Source" total="1,248" data={sourceData} unit="Total Tickets" />
      </div>

      <div className="flex items-center gap-6 mb-6 overflow-x-auto custom-scrollbar no-scrollbar py-2">
         <TabItem label="All Tickets" count={1248} active />
         <TabItem label="Tenants Complaints" count={842} />
         <TabItem label="Owners Complaints" count={352} />
         <TabItem label="Open" count={362} />
         <TabItem label="In Progress" count={538} />
         <TabItem label="Resolved" count={1086} />
         <TabItem label="Overdue" count={72} />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Recent Tickets Ledger */}
         <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Tickets</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All Tickets</button>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="pb-4">Ticket ID</th>
                        <th className="pb-4">Type</th>
                        <th className="pb-4">Raised By</th>
                        <th className="pb-4">Category</th>
                        <th className="pb-4">Priority</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Assignee</th>
                        <th className="pb-4 text-right">Created On</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentTickets.map((tk, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                           <td className="py-4 text-[11px] font-black text-blue-600">{tk.id}</td>
                           <td className="py-4">
                              <span className={cn("px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase", tk.type === "Tenant" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600")}>
                                 {tk.type}
                              </span>
                           </td>
                           <td className="py-4 text-[11px] font-bold text-slate-800">{tk.raisedBy}</td>
                           <td className="py-4 text-[10px] font-semibold text-slate-500">{tk.category}</td>
                           <td className="py-4">
                              <span className={cn(
                                 "text-[10px] font-black uppercase",
                                 tk.priority === "High" ? "text-rose-600" : tk.priority === "Medium" ? "text-amber-600" : "text-blue-600"
                              )}>
                                 {tk.priority}
                              </span>
                           </td>
                           <td className="py-4">
                              <span className={cn("px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider", tk.color)}>
                                 {tk.status}
                              </span>
                           </td>
                           <td className="py-4 text-[10px] font-bold text-slate-800">{tk.assignee}</td>
                           <td className="py-4 text-right">
                              <p className="text-[10px] font-bold text-slate-900 leading-none">{tk.created.split(',')[0]}</p>
                              <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase tracking-widest">{tk.created.split(',')[1]}</p>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <button className="w-full mt-6 py-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all">View All Tickets →</button>
         </div>

         {/* Resolution Rate Pulse */}
         <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-900 mb-8 self-start">Issues Resolutions Tracking</h3>
            <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="15" fill="transparent" className="text-slate-100" strokeDasharray="502" strokeDashoffset="251" />
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="15" fill="transparent" className="text-blue-600" strokeDasharray="502" strokeDashoffset={502 - (87 / 100) * 251} />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                  <p className="text-4xl font-black text-slate-900 tracking-tight">87%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Resolution Rate</p>
               </div>
            </div>
            <div className="mt-auto w-full pt-8 space-y-4">
               <div className="flex items-center gap-2 text-emerald-600 self-center justify-center">
                  <ArrowUpRight size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">12% from last week</span>
               </div>
               <div className="space-y-4 pt-6 border-t border-slate-50">
                  <FunnelMetric label="Total Issues Raised" count="1,248" />
                  <FunnelMetric label="Total Resolved" count="1,086" />
                  <FunnelMetric label="Resolution Rate" count="87%" />
                  <FunnelMetric label="Avg. Resolution Time" count="2.4 Days" />
                  <FunnelMetric label="SLA Met" count="1,052 (93%)" />
                  <FunnelMetric label="SLA Breached" count="96 (7%)" />
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
         {/* Top Issue Categories */}
         <div className="col-span-12 lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Top Issue Categories</h3>
               <button className="text-[10px] font-bold text-blue-600 hover:underline">View Full Report</button>
            </div>
            <div className="space-y-6">
               {topIssues.map((item, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-800">{item.label}</span>
                        <span className="text-[11px] font-black text-slate-900">{item.count} ({item.percent}%)</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: `${item.percent}%`}} />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Resolution Time Trend */}
         <div className="col-span-12 lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2 leading-tight">Resolution Time (Avg.)</h3>
            <div className="mb-4">
               <p className="text-2xl font-black text-slate-900 tracking-tight">2.4 Days</p>
               <div className="flex items-center gap-1.5 mt-1">
                  <ArrowDownRight size={14} className="text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-600">0.6 Days from last week</span>
               </div>
            </div>
            <div className="flex-1 min-h-[100px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ticketsTrend}>
                     <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} dot={false} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* SLA Performance */}
         <div className="col-span-12 lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full text-center items-center justify-center">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">SLA Performance</h3>
            <p className="text-4xl font-black text-slate-900 tracking-tight">93%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">SLA Met this week</p>
            <div className="flex items-center gap-1.5 mt-4 text-emerald-600">
               <ArrowUpRight size={14} />
               <span className="text-[10px] font-bold">5% from last week</span>
            </div>
         </div>

         {/* Satisfaction Score */}
         <div className="col-span-12 lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full text-center items-center justify-center">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Customer Satisfaction</h3>
            <p className="text-3xl font-black text-slate-900 tracking-tight">4.6 / 5</p>
            <div className="flex items-center gap-0.5 mt-3">
               {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < 4 ? "text-amber-400 fill-amber-400" : "text-slate-200"} />)}
            </div>
            <div className="flex items-center gap-1.5 mt-4 text-emerald-600">
               <ArrowUpRight size={14} />
               <span className="text-[10px] font-bold">0.3 from last week</span>
            </div>
         </div>

         {/* Pending High Priority */}
         <div className="col-span-12 lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full text-center items-center justify-center">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Pending High Priority</h3>
            <p className="text-4xl font-black text-rose-600 tracking-tight">18</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Requires immediate attention</p>
            <button className="mt-4 text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Tickets →</button>
         </div>

         {/* Export Reports */}
         <div className="col-span-12 lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-4">Export Reports</h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-8">Download support reports in PDF or Excel format.</p>
            <div className="flex items-center gap-4">
               <select className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none">
                  <option>Select Report Type</option>
                  <option>Performance Report</option>
                  <option>Resolution Summary</option>
               </select>
               <button className="px-8 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform">Export Report</button>
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
    rose: "text-rose-600 bg-rose-50",
    amber: "text-amber-600 bg-amber-50",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col transition-all hover:translate-y-[-4px] hover:shadow-md group">
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 shadow-sm", colors[color])}>
          <Icon size={18} />
       </div>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
       <p className="text-lg font-black text-slate-900 tracking-tight leading-none mb-3 truncate">{value}</p>
       <div className="flex items-center gap-1.5 mt-auto">
          {up ? <ArrowUpRight size={12} className="text-emerald-600" /> : <ArrowDownRight size={12} className="text-rose-600" />}
          <span className={cn("text-[10px] font-bold", up ? "text-emerald-600" : "text-rose-600")}>{trend}</span>
       </div>
       <p className="text-[9px] text-slate-400 font-medium mt-1 lowercase">from last week</p>
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

function AnalyticsPieCard({ title, total, data, unit }) {
  return (
    <div className="col-span-12 lg:col-span-3 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
       <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-10">{title}</h3>
       <div className="relative h-40 flex items-center justify-center mb-8">
          <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                <Pie data={data} innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value" stroke="none">
                   {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
             </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <p className="text-lg font-black text-slate-900">{total}</p>
             <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{unit}</p>
          </div>
       </div>
       <div className="space-y-3">
          {data.map((item) => (
             <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
                   <span className="text-[10px] font-bold text-slate-400 uppercase">{item.name}</span>
                </div>
                <span className="text-[11px] font-black text-slate-900">{item.percent}</span>
             </div>
          ))}
       </div>
    </div>
  );
}

function TabItem({ label, count, active }) {
  return (
    <button className={cn(
       "whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm",
       active ? "bg-white text-blue-600" : "bg-slate-50 text-slate-400 hover:text-slate-900"
    )}>
       {label} <span className="ml-1 opacity-60">({count})</span>
    </button>
  );
}

function FunnelMetric({ label, count }) {
  return (
    <div className="flex items-center justify-between group">
       <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-[12px] font-black text-slate-900 group-hover:text-blue-600 transition-colors">{count}</span>
    </div>
  );
}
