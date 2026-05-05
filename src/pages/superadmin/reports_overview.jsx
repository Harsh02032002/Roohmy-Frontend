import React from "react";
import { 
  BarChart3, Building2, Users, TrendingUp, 
  DollarSign, PieChart as PieChartIcon, 
  MapPin, ArrowUpRight, ArrowDownRight,
  Target, Zap, Briefcase, ChevronRight,
  LayoutDashboard, MoreVertical, Globe, Wallet, AlertCircle,
  Activity, Star, PieChart, Search, Calendar, Download,
  Filter, MousePointer2, UserCheck, Inbox, ArrowRight, IndianRupee
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Pie as RePie, Cell, PieChart as RePieChart, LineChart, Line, BarChart, Bar,
  Legend
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const revData = [
  { name: "Dec", rev: 1200000 },
  { name: "Jan", rev: 1800000 },
  { name: "Feb", rev: 1500000 },
  { name: "Mar", rev: 2200000 },
  { name: "Apr", rev: 1900000 },
  { name: "May", rev: 2458760 },
];

const occupancyData = [
  { name: "Occupied", value: 2050, color: "#3b82f6", percent: "87.6%" },
  { name: "Vacant", value: 240, color: "#10b981", percent: "10.3%" },
  { name: "Maintenance", value: 50, color: "#f59e0b", percent: "2.1%" },
];

const revenueReportData = [
  { name: "Rent Collection", value: 1985430, color: "#3b82f6", percent: "80.7%" },
  { name: "Service Fees", value: 245300, color: "#10b981", percent: "10.0%" },
  { name: "Other Charges", value: 145230, color: "#f59e0b", percent: "5.9%" },
  { name: "Late Fees", value: 82800, color: "#8b5cf6", percent: "3.4%" },
];

const performanceData = [
  { name: "Ocean View Apartment", loc: "Mumbai", occ: "98%", rev: "₹ 2,45,000" },
  { name: "Green Valley Villa", loc: "Bangalore", occ: "96%", rev: "₹ 2,10,350" },
  { name: "Sunrise Heights", loc: "Pune", occ: "93%", rev: "₹ 1,88,760" },
  { name: "Lake View Residency", loc: "Hyderabad", occ: "90%", rev: "₹ 1,75,420" },
  { name: "Skyline Studio", loc: "Delhi", occ: "88%", rev: "₹ 1,60,220" },
];

export default function ReportsOverview() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Intelligence & Performance Metrics Dashboard.</p>
         </div>
         <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">May 22 - May 28, 2024</span>
         </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
         <StatCard label="Properties" value="2,340" trend="+12%" up icon={Building2} color="blue" />
         <StatCard label="Tenants" value="1,248" trend="+9%" up icon={Users} color="emerald" />
         <StatCard label="Occupancy" value="87.6%" trend="+4%" up icon={Target} color="purple" />
         <StatCard label="Revenue" value="₹24.5L" trend="+14%" up icon={IndianRupee} color="amber" />
         <StatCard label="Profit" value="₹6.2L" trend="+16%" up icon={Zap} color="blue" />
         <StatCard label="Growth" value="15.2%" trend="+3%" up icon={TrendingUp} color="emerald" />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Revenue Timeline</h3>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-blue-600" />
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Revenue</span>
                  </div>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revData}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} tickFormatter={(v) => `${v/100000}L`} />
                     <Tooltip />
                     <Area type="monotone" dataKey="rev" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-800 w-full mb-10 uppercase tracking-widest">Occupancy Status</h3>
            <div className="relative w-48 h-48 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                     <RePie data={occupancyData} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                        {occupancyData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </RePie>
                  </RePieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-black text-slate-900 tracking-tight leading-none">87.6%</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Occupied</p>
               </div>
            </div>
            <div className="w-full space-y-4">
               {occupancyData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.name}</span>
                     </div>
                     <span className="text-[11px] font-black text-slate-900">{d.percent}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Asset Performance Table */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Asset Performance</h3>
            <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">View All Assets →</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                     <th className="pb-6">Property Name</th>
                     <th className="pb-6">Location</th>
                     <th className="pb-6 text-center">Occupancy</th>
                     <th className="pb-6 text-right">Yield (Monthly)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {performanceData.map((p, i) => (
                     <tr key={i} className="group hover:bg-slate-50 transition-all">
                        <td className="py-5">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold shadow-sm border border-white">
                                 {p.name.charAt(0)}
                              </div>
                              <p className="text-[13px] font-bold text-slate-800 tracking-tight">{p.name}</p>
                           </div>
                        </td>
                        <td className="py-5 text-[11px] font-bold text-slate-400 uppercase">{p.loc}</td>
                        <td className="py-5 text-center">
                           <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 shadow-sm">{p.occ}</span>
                        </td>
                        <td className="py-5 text-right text-sm font-bold text-slate-900">{p.rev}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
  };
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:translate-y-[-4px] transition-all duration-300 flex flex-col">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border mb-6", colors[color])}>
          <Icon className="w-6 h-6" />
       </div>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 leading-tight truncate">{label}</p>
       <div className="flex items-end justify-between">
          <p className="text-xl font-black text-slate-900 tracking-tight leading-none">{value}</p>
          <span className={cn("text-[10px] font-bold uppercase flex items-center gap-1", up ? "text-emerald-600" : "text-rose-600")}>
             {trend} {up ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
          </span>
       </div>
    </div>
  );
}
