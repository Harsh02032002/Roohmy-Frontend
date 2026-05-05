import React from "react";
import { 
  Users, Calendar, Target, TrendingUp, 
  ArrowUpRight, ArrowDownRight, ChevronRight, 
  MoreVertical, Search, Filter, Download,
  Zap, Clock, MapPin, MousePointer2, 
  CheckCircle2, AlertCircle, BarChart3,
  PieChart as PieIcon, Phone, Mail, Globe,
  LayoutGrid, Activity, Star
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- EXACT DATA FROM BOOKING & LEADS OVERVIEW SCREENSHOT ---

const leadsVsBookings = [
  { name: "May 22", leads: 250, bookings: 120 },
  { name: "May 23", leads: 480, bookings: 180 },
  { name: "May 24", leads: 420, bookings: 160 },
  { name: "May 25", leads: 580, bookings: 220 },
  { name: "May 26", leads: 520, bookings: 200 },
  { name: "May 27", leads: 650, bookings: 280 },
  { name: "May 28", leads: 610, bookings: 260 },
];

const leadSources = [
  { name: "Website", value: 1542, color: "#3B82F6", percent: "41.8%" },
  { name: "WhatsApp", value: 1021, color: "#10B981", percent: "27.7%" },
  { name: "App", value: 678, color: "#F59E0B", percent: "18.4%" },
  { name: "Referral", value: 448, color: "#6366F1", percent: "12.1%" },
];

const leadStatus = [
  { name: "New", value: 1245, color: "#3B82F6", percent: "33.7%" },
  { name: "Contacted", value: 1021, color: "#10B981", percent: "27.7%" },
  { name: "Interested", value: 812, color: "#F59E0B", percent: "22.0%" },
  { name: "Site Visit", value: 356, color: "#6366F1", percent: "9.6%" },
  { name: "Converted", value: 255, color: "#EC4899", percent: "6.9%" },
];

const topLocations = [
  { name: "Andheri West, Mumbai", leads: 856, bookings: 234, rate: "27.34%" },
  { name: "Koramangala, Bangalore", leads: 642, bookings: 176, rate: "27.42%" },
  { name: "Baner, Pune", leads: 512, bookings: 138, rate: "26.95%" },
  { name: "Whitefield, Bangalore", leads: 478, bookings: 121, rate: "25.31%" },
  { name: "Indiranagar, Bangalore", leads: 421, bookings: 102, rate: "24.23%" },
];

const recentLeads = [
  { name: "Rohan Mehta", loc: "Andheri West, Mumbai", src: "Website", budget: "₹20K - ₹25K", status: "New", color: "bg-blue-50 text-blue-600", date: "May 28, 2024", time: "10:30 AM" },
  { name: "Priya Sharma", loc: "Koramangala, Bangalore", src: "WhatsApp", budget: "₹15K - ₹20K", status: "Contacted", color: "bg-emerald-50 text-emerald-600", date: "May 28, 2024", time: "09:45 AM" },
  { name: "Amit Verma", loc: "Pune", src: "App", budget: "₹18K - ₹22K", status: "Interested", color: "bg-amber-50 text-amber-600", date: "May 28, 2024", time: "09:20 AM" },
  { name: "Neha Singh", loc: "Hyderabad", src: "Website", budget: "₹12K - ₹18K", status: "Site Visit", color: "bg-purple-50 text-purple-600", date: "May 28, 2024", time: "08:55 AM" },
  { name: "Vikram Joshi", loc: "Thane, Mumbai", src: "Referral", budget: "₹22K - ₹28K", status: "New", color: "bg-blue-50 text-blue-600", date: "May 28, 2024", time: "08:30 AM" },
];

const funnelData = [
  { stage: "Total Leads", count: 3689, percent: "100%", color: "bg-blue-400" },
  { stage: "Contacted", count: 2458, percent: "66.6%", color: "bg-emerald-400" },
  { stage: "Interested", count: 1254, percent: "34.0%", color: "bg-amber-400" },
  { stage: "Site Visit", count: 986, percent: "26.7%", color: "bg-purple-400" },
  { stage: "Bookings", count: 876, percent: "23.5%", color: "bg-rose-400" },
];

const topAgents = [
  { name: "Rahul Singh", rate: "48.6%" },
  { name: "Priya Nair", rate: "45.2%" },
  { name: "Amit Patel", rate: "42.7%" },
];

export default function BookingLeads() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Booking & Leads Overview</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Track your leads, bookings and conversion performance.</p>
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
         <StatCardWide label="Total Leads (Today)" value="128" trend="18.6%" up />
         <StatCardWide label="Total Leads (This Week)" value="894" trend="16.3%" up />
         <StatCardWide label="Total Leads (This Month)" value="3,689" trend="21.8%" up />
         <StatCardWide label="Bookings (Today)" value="32" trend="23.1%" up color="amber" />
         <StatCardWide label="Bookings (This Week)" value="210" trend="19.4%" up color="amber" />
         <StatCardWide label="Bookings (This Month)" value="876" trend="24.7%" up color="amber" />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Leads vs Bookings Trend */}
         <div className="col-span-12 lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">Leads vs Bookings Trend</h3>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                     <LegendItem color="bg-blue-600" label="Leads" />
                     <LegendItem color="bg-emerald-600" label="Bookings" />
                  </div>
                  <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none">
                     <option>This Week</option>
                  </select>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={leadsVsBookings}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dx={-15} />
                     <Tooltip />
                     <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={3} dot={{fill: '#3B82F6', r: 4}} activeDot={{r: 6}} />
                     <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={3} dot={{fill: '#10B981', r: 4}} activeDot={{r: 6}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Conversion Pulse */}
         <div className="col-span-12 lg:col-span-3 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-900 mb-8 self-start">Conversion Rate %</h3>
            <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="15" fill="transparent" className="text-slate-100" strokeDasharray="502" strokeDashoffset="251" />
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="15" fill="transparent" className="text-blue-600" strokeDasharray="502" strokeDashoffset={502 - (23.45 / 100) * 251} />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                  <p className="text-3xl font-black text-slate-900 tracking-tight">23.45%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Conversion Rate</p>
               </div>
            </div>
            <div className="mt-auto w-full space-y-4 pt-8">
               <div className="flex items-center justify-between px-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Previous Period</span>
                  <span className="text-sm font-black text-slate-900">19.02%</span>
               </div>
               <div className="bg-emerald-50 rounded-2xl p-4 flex items-center justify-between border border-emerald-100/50">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-emerald-500 rounded-xl text-white">
                        <TrendingUp size={16} />
                     </div>
                     <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Improvement</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">+4.43%</span>
               </div>
            </div>
         </div>

         {/* Conversion Funnel */}
         <div className="col-span-12 lg:col-span-3 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Conversion Funnel</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500 outline-none">
                  <option>This Month</option>
               </select>
            </div>
            
            <div className="flex-1 flex items-center justify-between gap-4 mt-4">
               {/* Funnel SVG */}
               <div className="w-1/2 h-full flex items-center">
                  <svg viewBox="0 0 100 160" className="w-full drop-shadow-md">
                     <path d="M0,0 L100,0 L92,30 L8,30 Z" fill="#60A5FA" />
                     <path d="M10,35 L90,35 L82,65 L18,65 Z" fill="#34D399" />
                     <path d="M20,70 L80,70 L72,100 L28,100 Z" fill="#FBBF24" />
                     <path d="M30,105 L70,105 L62,135 L38,135 Z" fill="#A78BFA" />
                     <path d="M40,140 L60,140 L55,160 L45,160 Z" fill="#FB7185" />
                  </svg>
               </div>

               {/* Labels List */}
               <div className="w-1/2 flex flex-col justify-between py-1 h-full min-h-[160px]">
                  {funnelData.map((f, i) => (
                     <div key={i} className="flex flex-col">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">{f.stage}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                           <span className="text-[10px] font-black text-slate-900">{f.count.toLocaleString()}</span>
                           <span className="text-[8px] font-bold text-slate-400">({f.percent})</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Conversion Rate</span>
               <span className="text-xl font-black text-emerald-600">23.45%</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Recent Leads */}
         <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Leads</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="pb-4">Lead Name</th>
                        <th className="pb-4">Location</th>
                        <th className="pb-4">Source</th>
                        <th className="pb-4">Budget</th>
                        <th className="pb-4 text-center">Status</th>
                        <th className="pb-4 text-right">Created On</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentLeads.map((lead, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                           <td className="py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                    {lead.name.charAt(0)}
                                 </div>
                                 <span className="text-xs font-bold text-slate-800">{lead.name}</span>
                              </div>
                           </td>
                           <td className="py-4 text-[10px] font-semibold text-slate-500 max-w-[120px] truncate">{lead.loc}</td>
                           <td className="py-4 text-[10px] font-bold text-slate-400 uppercase">{lead.src}</td>
                           <td className="py-4 text-[10px] font-black text-slate-900">{lead.budget}</td>
                           <td className="py-4 text-center">
                              <span className={cn("px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider", lead.color)}>
                                 {lead.status}
                              </span>
                           </td>
                           <td className="py-4 text-right">
                              <p className="text-[10px] font-bold text-slate-900 leading-none">{lead.date}</p>
                              <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase tracking-widest">{lead.time}</p>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Top Performing Locations */}
         <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">Top Performing Locations</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500 outline-none">
                  <option>This Month</option>
               </select>
            </div>
            <div className="space-y-6 flex-1">
               {topLocations.map((loc, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <span className="text-xs font-black text-slate-300 w-4">{i + 1}</span>
                           <span className="text-xs font-black text-slate-900 truncate">{loc.name}</span>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="text-[10px] font-black text-slate-900 leading-none">{loc.leads}</p>
                              <p className="text-[8px] text-slate-400 uppercase font-bold mt-1">Leads</p>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-black text-slate-900 leading-none">{loc.bookings}</p>
                              <p className="text-[8px] text-slate-400 uppercase font-bold mt-1">Bookings</p>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                           <div className="h-full bg-blue-500 rounded-full" style={{width: loc.rate}} />
                        </div>
                        <span className="text-[10px] font-black text-blue-600 w-12 text-right">{loc.rate}</span>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-8 py-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline text-left">View All Locations →</button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
         {/* Lead Sources Donut */}
         <AnalyticsSmallCard title="Lead Sources (This Month)" total="3,689" data={leadSources} />
         {/* Lead Status Donut */}
         <AnalyticsSmallCard title="Lead Status (This Month)" total="3,689" data={leadStatus} />
         {/* Avg. Response Time */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">Avg. Response Time</h3>
            <div className="mb-4">
               <p className="text-2xl font-black text-slate-900 tracking-tight">2h 18m</p>
               <div className="flex items-center gap-1.5 mt-1">
                  <ArrowDownRight size={14} className="text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-600">18.6% faster</span>
               </div>
            </div>
            <div className="flex-1 min-h-[100px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={leadsVsBookings}>
                     <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} dot={false} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>
         {/* Bookings Value */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">Bookings Value (This Month)</h3>
            <div className="mb-4">
               <p className="text-xl font-black text-slate-900 tracking-tight truncate">₹ 2,48,76,320</p>
               <div className="flex items-center gap-1.5 mt-1">
                  <ArrowUpRight size={14} className="text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-600">22.4% from last month</span>
               </div>
            </div>
            <div className="flex-1 min-h-[100px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadsVsBookings}>
                     <Bar dataKey="bookings" fill="#3B82F6" radius={[4, 4, 4, 4]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
         {/* Top Converting Agents */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Top Converting Agents</h3>
               <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-5">
               {topAgents.map((agent, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-800">{i+1}. {agent.name}</span>
                        <span className="text-[11px] font-black text-blue-600">{agent.rate}</span>
                     </div>
                     <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: agent.rate}} />
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

function StatCardWide({ label, value, trend, up, color }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col transition-all hover:translate-y-[-4px] hover:shadow-md group">
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 shadow-sm", color === "amber" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600")}>
          <Users size={18} />
       </div>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
       <p className="text-xl font-black text-slate-900 tracking-tight leading-none mb-3">{value}</p>
       <div className="flex items-center gap-1.5 mt-auto">
          {up ? <ArrowUpRight size={12} className="text-emerald-600" /> : <ArrowDownRight size={12} className="text-rose-600" />}
          <span className={cn("text-[10px] font-bold", up ? "text-emerald-600" : "text-rose-600")}>{trend}</span>
          <span className="text-[10px] text-slate-400 font-medium">from yesterday</span>
       </div>
       <button className="mt-4 text-[9px] font-black text-blue-600 uppercase tracking-widest text-left hover:underline">View Details →</button>
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

function AnalyticsSmallCard({ title, total, data }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
       <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6 leading-tight h-8">{title}</h3>
       <div className="relative h-28 flex items-center justify-center mb-6">
          <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                <Pie data={data} innerRadius={35} outerRadius={48} paddingAngle={3} dataKey="value" stroke="none">
                   {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
             </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <p className="text-sm font-black text-slate-900">{total}</p>
          </div>
       </div>
       <div className="space-y-2">
          {data.slice(0, 3).map((item) => (
             <div key={item.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: item.color}} />
                   <span className="text-[9px] font-bold text-slate-400 uppercase truncate max-w-[60px]">{item.name}</span>
                </div>
                <span className="text-[10px] font-black text-slate-900">{item.percent}</span>
             </div>
          ))}
       </div>
    </div>
  );
}
