import React from "react";
import { 
  CalendarCheck, Users, Target, Zap, 
  TrendingUp, MousePointer2, ArrowUpRight, 
  ArrowDownRight, MoreVertical, Search,
  Phone, Mail, Globe, MapPin, CheckCircle2,
  Clock, DollarSign, Filter, ChevronRight,
  PieChart as PieChartIcon, BarChart3, Activity,
  Smartphone, MessageSquare, ExternalLink,
  ShieldCheck, Inbox, Timer, TrendingUp as TrendIcon,
  UserCheck, UserPlus
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const bookingTrend = [
  { name: "May 22", leads: 120, bookings: 45 },
  { name: "May 23", leads: 150, bookings: 52 },
  { name: "May 24", leads: 130, bookings: 48 },
  { name: "May 25", leads: 180, bookings: 65 },
  { name: "May 26", leads: 210, bookings: 78 },
  { name: "May 27", leads: 190, bookings: 70 },
  { name: "May 28", leads: 230, bookings: 86 },
];

const sourceData = [
  { name: "Website", value: 1542, color: "#3B82F6" },
  { name: "WhatsApp", value: 1021, color: "#10B981" },
  { name: "App", value: 678, color: "#6366F1" },
  { name: "Referral", value: 448, color: "#F59E0B" },
];

const statusData = [
  { name: "New", value: 1245, color: "#3B82F6" },
  { name: "Contacted", value: 1021, color: "#6366F1" },
  { name: "Interested", value: 812, color: "#10B981" },
  { name: "Site Visit", value: 356, color: "#F59E0B" },
  { name: "Converted", value: 255, color: "#8B5CF6" },
];

const responseTimeData = [
  { v: 10 }, { v: 15 }, { v: 12 }, { v: 18 }, { v: 14 }, { v: 22 }, { v: 18 }
];

const bookingsValueData = [
  { v: 40 }, { v: 45 }, { v: 42 }, { v: 50 }, { v: 48 }, { v: 55 }, { v: 52 }
];

const recentLeads = [
  { name: "Rohan Mehta", location: "Andheri West, Mumbai", source: "Website", budget: "₹20K - ₹25K", status: "New", date: "May 28, 2024", time: "10:35 AM", initial: "RM", color: "blue" },
  { name: "Priya Sharma", location: "Koramangala, Bangalore", source: "WhatsApp", budget: "₹15K - ₹20K", status: "Contacted", date: "May 28, 2024", time: "09:45 AM", initial: "PS", color: "indigo" },
  { name: "Amit Verma", location: "Pune", source: "App", budget: "₹18K - ₹22K", status: "Interested", date: "May 28, 2024", time: "09:20 AM", initial: "AV", color: "emerald" },
  { name: "Neha Singh", location: "Hyderabad", source: "Website", budget: "₹12K - ₹18K", status: "Site Visit", date: "May 28, 2024", time: "08:55 AM", initial: "NS", color: "amber" },
  { name: "Vikram Joshi", location: "Thane, Mumbai", source: "Referral", budget: "₹22K - ₹28K", status: "New", date: "May 28, 2024", time: "08:30 AM", initial: "VJ", color: "rose" },
];

const topLocations = [
  { city: "Andheri West, Mumbai", leads: 856, bookings: 234, rate: "27.34%", progress: 85 },
  { city: "Koramangala, Bangalore", leads: 642, bookings: 176, rate: "27.42%", progress: 70 },
  { city: "Baner, Pune", leads: 512, bookings: 138, rate: "26.95%", progress: 60 },
  { city: "Whitefield, Bangalore", leads: 478, bookings: 121, rate: "25.31%", progress: 55 },
  { city: "Indiranagar, Bangalore", leads: 421, bookings: 102, rate: "24.23%", progress: 45 },
];

export default function SuperadminBookingLeads() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Booking & Leads Hub</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Operations</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Booking & Leads Performance</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Leads Trend */}
         <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">Leads vs Bookings Trend</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500 uppercase outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                  <option>This Week</option>
               </select>
            </div>
            <div className="h-[280px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bookingTrend}>
                     <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-15} />
                     <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}} />
                     <Area type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorLeads)" />
                     <Area type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={4} fill="transparent" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Conversion Rate Gauge */}
         <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">Conversion Rate %</h3>
               <MoreVertical className="w-5 h-5 text-slate-300" />
            </div>
            <div className="relative w-full h-[180px] flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={[{ value: 23.45, color: "#3B82F6" }, { value: 76.55, color: "#F1F5F9" }]}
                        cx="50%" cy="100%"
                        startAngle={180} endAngle={0}
                        innerRadius={70} outerRadius={100}
                        paddingAngle={0} dataKey="value" stroke="none"
                     >
                        <Cell fill="#3B82F6" />
                        <Cell fill="#F1F5F9" />
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute bottom-0 flex flex-col items-center">
                  <p className="text-4xl font-bold text-slate-800 leading-none">23.45%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Conversion Rate</p>
               </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
               <div className="text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Previous Period</p>
                  <p className="text-sm font-bold text-slate-800">19.02%</p>
               </div>
               <div className="text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Improvement</p>
                  <p className="text-sm font-bold text-emerald-600">+4.43%</p>
               </div>
            </div>
         </div>

         {/* Conversion Funnel */}
         <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">Conversion Funnel</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500 uppercase outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                  <option>This Month</option>
               </select>
            </div>
            <div className="space-y-2 relative">
               <FunnelStep label="Total Leads" value="3,689" percent="100%" color="bg-blue-600" width="w-full" />
               <FunnelStep label="Contacted" value="2,456" percent="66.6%" color="bg-indigo-500" width="w-[90%]" />
               <FunnelStep label="Interested" value="1,254" percent="34.0%" color="bg-emerald-500" width="w-[80%]" />
               <FunnelStep label="Site Visit" value="986" percent="26.7%" color="bg-amber-500" width="w-[70%]" />
               <FunnelStep label="Bookings" value="876" percent="23.5%" color="bg-rose-500" width="w-[60%]" />
            </div>
            <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center">
               <p className="text-[10px] font-bold text-slate-400 uppercase">Overall Conversion Rate</p>
               <p className="text-xl font-bold text-emerald-600">23.45%</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Recent Leads */}
         <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Recent Leads</h3>
               <button className="text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                     <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                        <th className="pb-6">Lead Name</th>
                        <th className="pb-6">Location</th>
                        <th className="pb-6 text-center">Source</th>
                        <th className="pb-6 text-center">Budget</th>
                        <th className="pb-6 text-center">Status</th>
                        <th className="pb-6 text-right">Created On</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentLeads.map((lead, i) => (
                       <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                          <td className="py-6">
                             <div className="flex items-center gap-4">
                                <div className={cn(
                                   "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-lg",
                                   lead.color === "blue" ? "bg-blue-600" :
                                   lead.color === "indigo" ? "bg-indigo-600" :
                                   lead.color === "emerald" ? "bg-emerald-600" :
                                   lead.color === "amber" ? "bg-amber-600" :
                                   "bg-rose-600"
                                )}>
                                   {lead.initial}
                                </div>
                                <span className="text-sm font-bold text-slate-800">{lead.name}</span>
                             </div>
                          </td>
                          <td className="py-6 text-xs font-bold text-slate-500">{lead.location}</td>
                          <td className="py-6 text-center text-xs font-bold text-slate-500">{lead.source}</td>
                          <td className="py-6 text-center text-xs font-bold text-slate-800">{lead.budget}</td>
                          <td className="py-6 text-center">
                             <span className={cn(
                                "text-[9px] font-bold px-3 py-1 rounded-lg uppercase shadow-sm",
                                lead.status === "New" ? "bg-blue-50 text-blue-600" :
                                lead.status === "Contacted" ? "bg-amber-50 text-amber-600" :
                                lead.status === "Interested" ? "bg-indigo-50 text-indigo-600" :
                                "bg-emerald-50 text-emerald-600"
                             )}>
                                {lead.status}
                             </span>
                          </td>
                          <td className="py-6 text-right">
                             <p className="text-xs font-bold text-slate-800">{lead.date}</p>
                             <p className="text-[9px] font-bold text-slate-400 mt-0.5">{lead.time}</p>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Top Performing Locations */}
         <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">Top Performing Locations</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500 uppercase outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                  <option>This Month</option>
               </select>
            </div>
            <div className="space-y-8">
               {topLocations.map((loc, i) => (
                 <div key={i} className="group">
                    <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-slate-300">0{i+1}</span>
                          <span className="text-xs font-bold text-slate-800 truncate max-w-[120px]">{loc.city}</span>
                       </div>
                       <span className="text-xs font-bold text-blue-600">{loc.rate}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                         style={{ width: `${loc.progress}%` }} 
                       />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[9px] font-bold text-slate-400 uppercase">
                       <span>{loc.leads} Leads</span>
                       <span>{loc.bookings} Bookings</span>
                       <span>Conv. Rate</span>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-10 py-4 rounded-2xl bg-white text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all border border-blue-100 shadow-sm flex items-center justify-center gap-2">
               View All Locations <ChevronRight className="w-4 h-4" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
         {/* Lead Sources Donut */}
         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-6 tracking-widest w-full">Lead Sources <span className="text-slate-300">(This Month)</span></h4>
            <div className="h-[120px] w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={sourceData} innerRadius={35} outerRadius={50} paddingAngle={5} dataKey="value">
                        {sourceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-4">
               {sourceData.map((s, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                       <span className="text-[9px] font-bold text-slate-500">{s.name}</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-800">{s.value} <span className="text-slate-400 ml-1">({((s.value/3689)*100).toFixed(1)}%)</span></span>
                 </div>
               ))}
            </div>
         </div>

         {/* Lead Status Donut */}
         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-6 tracking-widest w-full">Lead Status <span className="text-slate-300">(This Month)</span></h4>
            <div className="h-[120px] w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={statusData} innerRadius={35} outerRadius={50} paddingAngle={5} dataKey="value">
                        {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-4">
               {statusData.map((s, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                       <span className="text-[9px] font-bold text-slate-500">{s.name}</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-800">{s.value} <span className="text-slate-400 ml-1">({((s.value/3689)*100).toFixed(1)}%)</span></span>
                 </div>
               ))}
            </div>
         </div>

         {/* Avg Response Time */}
         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Avg. Response Time</h4>
            <p className="text-3xl font-bold text-slate-800">2h 18m</p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 mt-2">
               <ArrowDownRight className="w-4 h-4" /> 18.6% from last month
            </div>
            <div className="h-[80px] w-full mt-6">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={responseTimeData}>
                     <Area type="monotone" dataKey="v" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={3} dot={false} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Bookings Value */}
         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Bookings Value <span className="text-slate-300">(This Month)</span></h4>
            <p className="text-2xl font-bold text-slate-800">₹2,48,76,320</p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 mt-2">
               <ArrowUpRight className="w-4 h-4" /> 22.4% from last month
            </div>
            <div className="h-[80px] w-full mt-8">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bookingsValueData}>
                     <Area type="monotone" dataKey="v" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={3} dot={false} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Top Converting Agents */}
         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Top Converting Agents</h4>
               <button className="text-blue-600 text-[9px] font-bold uppercase hover:underline">View All</button>
            </div>
            <div className="space-y-5 flex-1">
               <AgentRow name="Rahul Singh" rate="48.6%" color="blue" />
               <AgentRow name="Priya Nair" rate="45.2%" color="emerald" />
               <AgentRow name="Amit Patel" rate="42.7%" color="indigo" />
            </div>
         </div>
      </div>
    </div>
  );
}

function FunnelStep({ label, value, percent, color, width }) {
  return (
    <div className="relative flex flex-col items-center">
       <div className={cn("h-12 flex items-center justify-between px-6 text-white rounded-xl shadow-lg transition-all hover:scale-[1.02] cursor-default", color, width)}>
          <span className="text-[10px] font-bold uppercase opacity-80">{label}</span>
          <div className="text-right">
             <span className="text-sm font-bold block leading-none">{value}</span>
             <span className="text-[8px] font-bold opacity-60 uppercase mt-0.5 block">({percent})</span>
          </div>
       </div>
    </div>
  );
}

function AgentRow({ name, rate, color }) {
  return (
    <div className="flex items-center justify-between group">
       <div className="flex items-center gap-3">
          <div className={cn(
             "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md",
             color === "blue" ? "bg-blue-600" : color === "emerald" ? "bg-emerald-600" : "bg-indigo-600"
          )}>
             {name.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{name}</span>
       </div>
       <span className="text-xs font-bold text-slate-800">{rate}</span>
    </div>
  );
}
