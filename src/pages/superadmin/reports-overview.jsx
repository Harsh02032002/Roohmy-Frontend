import React from "react";
import { 
  BarChart3, Building2, Users, TrendingUp, 
  DollarSign, PieChart as PieChartIcon, 
  MapPin, ArrowUpRight, ArrowDownRight,
  Target, Zap, Briefcase, ChevronRight,
  LayoutDashboard, MoreVertical, Globe, Wallet, AlertCircle,
  Activity, Star, PieChart
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Pie as RePie, Cell, PieChart as RePieChart
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const revData = [
  { name: "May 22", rev: 24.5, prof: 18.2 },
  { name: "May 23", rev: 32.0, prof: 21.0 },
  { name: "May 24", rev: 28.5, prof: 19.5 },
  { name: "May 25", rev: 45.2, prof: 32.8 },
  { name: "May 26", rev: 38.6, prof: 28.4 },
  { name: "May 27", rev: 52.4, prof: 38.6 },
  { name: "May 28", rev: 66.5, prof: 48.2 },
];

export default function ReportsOverview() {
  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-full">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
               <BarChart3 className="w-6 h-6" />
            </div>
            <div>
               <h1 className="text-2xl font-black text-slate-800 tracking-tight">Report & Analytics Overview</h1>
               <p className="text-xs font-bold text-slate-400">Track, manage and analyze all property reports and analytics.</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input placeholder="Search anything..." className="bg-white border-none rounded-xl py-2 pl-10 pr-4 text-xs font-bold shadow-sm" />
            </div>
            <DateRangePill value="May 22 - May 28, 2024" />
         </div>
      </div>

      {/* Hero Stats Row - Exact SS 9 Figures */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
         <ReportStatCard label="Total Properties" value="2,340" trend="+ 12.5%" icon={Building2} color="blue" />
         <ReportStatCard label="Total Tenants" value="1,248" trend="+ 9.8%" icon={Users} color="purple" />
         <ReportStatCard label="Occupancy Rate" value="87.6%" trend="+ 4.2%" icon={Target} color="emerald" />
         <ReportStatCard label="Monthly Revenue" value="₹ 24,58,760" trend="+ 16.7%" icon={DollarSign} color="amber" />
         <ReportStatCard label="Net Profit" value="₹ 6,23,340" trend="+ 12.1%" icon={Zap} color="rose" />
         <ReportStatCard label="Growth Rate" value="15.2%" trend="+ 3.8%" icon={TrendingUp} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Revenue Overview Chart */}
         <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Revenue Overview</h3>
               <div className="flex items-center gap-6">
                  <LegendSmall label="Revenue (₹)" color="bg-blue-500" />
                  <LegendSmall label="Profit (₹)" color="bg-emerald-500" />
                  <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-black text-slate-500">
                     <option>This Month</option>
                  </select>
               </div>
            </div>
            <div className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revData}>
                     <defs>
                        <linearGradient id="colorR" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-15} />
                     <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                     <Area type="monotone" dataKey="rev" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorR)" />
                     <Area type="monotone" dataKey="prof" stroke="#10B981" strokeWidth={4} fillOpacity={0} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-50 text-center">
               <StatItem label="Total Revenue" value="₹ 24,58,760" color="text-blue-600" />
               <StatItem label="Total Collection" value="₹ 21,20,340" color="text-emerald-600" />
               <StatItem label="Net Payout" value="₹ 17,25,420" color="text-amber-600" />
               <StatItem label="Net Profit" value="₹ 6,23,340" color="text-rose-600" />
            </div>
         </div>

         {/* Occupancy Rate Trend */}
         <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl flex flex-col items-center">
            <h3 className="text-xl font-black text-slate-800 tracking-tight w-full mb-8">Occupancy Rate Trend</h3>
            <div className="relative w-56 h-56 mb-10">
               <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                     <RePie data={[{v:87, c:'#3B82F6'}, {v:13, c:'#F1F5F9'}]} innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="v" stroke="none">
                        <Cell fill="#3B82F6" />
                        <Cell fill="#F1F5F9" />
                     </RePie>
                  </RePieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-black text-slate-800">87.6%</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Occupancy Rate</p>
               </div>
            </div>
            <div className="w-full space-y-4">
               <LegendRow label="Occupied" value="2,050 (87.6%)" color="bg-blue-500" />
               <LegendRow label="Vacant" value="240 (10.3%)" color="bg-emerald-500" />
               <LegendRow label="Maintenance" value="50 (2.1%)" color="bg-amber-500" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Top 5 Properties */}
         <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
            <h3 className="text-lg font-black text-slate-800 mb-8">Property Performance (Top 5)</h3>
            <div className="space-y-6">
               <PropPerfRow name="Ocean View Apartment" loc="Mumbai" occ="98%" rev="₹ 2,45,000" />
               <PropPerfRow name="Green Valley PG" loc="Bangalore" occ="95%" rev="₹ 2,12,350" />
               <PropPerfRow name="Sunrise Heights" loc="Pune" occ="92%" rev="₹ 1,88,500" />
               <PropPerfRow name="Lake View Residency" loc="Hyderabad" occ="88%" rev="₹ 1,75,420" />
               <PropPerfRow name="Skyline Studio" loc="Delhi" occ="85%" rev="₹ 1,52,220" />
            </div>
         </div>

         {/* India Map (Location Wise Data) */}
         <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl flex flex-col">
            <h3 className="text-lg font-black text-slate-800 mb-4">Location Wise Data</h3>
            <div className="flex-1 flex flex-col items-center justify-center relative">
               <Globe className="w-48 h-48 text-blue-50 opacity-10" />
               <div className="absolute inset-0 flex flex-col justify-center gap-4">
                  <MapPoint label="Mumbai" value="₹ 10,45,600" />
                  <MapPoint label="Bangalore" value="₹ 8,12,350" />
                  <MapPoint label="Pune" value="₹ 6,45,230" />
                  <MapPoint label="Hyderabad" value="₹ 5,12,350" />
               </div>
            </div>
            <div className="pt-4 border-t border-slate-50 space-y-2">
               <LegendRow label="Mumbai" value="₹ 10,45,600" color="bg-blue-500" />
               <LegendRow label="Bangalore" value="₹ 8,12,350" color="bg-purple-500" />
            </div>
         </div>

         {/* Growth Analytics Grid */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
               <h3 className="text-lg font-black text-slate-800 mb-6">Growth Analytics</h3>
               <div className="grid grid-cols-2 gap-4">
                  <GrowthTile label="New Properties" value="234" trend="+ 12.5%" />
                  <GrowthTile label="New Tenants" value="248" trend="+ 9.8%" />
                  <GrowthTile label="Revenue Growth" value="₹ 24,58,760" trend="+ 16.7%" />
                  <GrowthTile label="Bookings" value="356" trend="+ 10.5%" />
               </div>
            </div>
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-600/30">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Target Achievement</p>
               <div className="flex items-center justify-between mb-4">
                  <p className="text-4xl font-black">92.4%</p>
                  <Target className="w-10 h-10 opacity-30" />
               </div>
               <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{width: '92.4%'}} />
               </div>
               <p className="text-[10px] font-bold mt-4 opacity-80 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Target achievement increased by 15.3% this month.
               </p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
         {/* Staff Performance Reports */}
         <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl overflow-x-auto">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Staff Performance Reports</h3>
               <button className="text-blue-600 text-[10px] font-black hover:underline">View All →</button>
            </div>
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                     <th className="pb-6">Staff Name</th>
                     <th className="pb-6">Properties Managed</th>
                     <th className="pb-6 text-center">Leads</th>
                     <th className="pb-6 text-right">Performance %</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  <StaffRow name="Neha Verma" role="Property Manager" count="150" leads="93" perf="93%" />
                  <StaffRow name="Rahul Singh" role="Leasing Executive" count="120" leads="88" perf="88%" />
                  <StaffRow name="Priya Nair" role="Relationship Manager" count="105" leads="82" perf="82%" />
                  <StaffRow name="Vikram Joshi" role="Support Executive" count="94" leads="78" perf="78%" />
               </tbody>
            </table>
         </div>

         {/* Revenue Report (Donut) */}
         <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-10">Revenue Report</h3>
            <div className="flex items-center gap-10">
               <div className="w-40 h-40 relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <RePieChart>
                        <RePie data={[{v:55, c:'#3B82F6'}, {v:25, c:'#10B981'}, {v:15, c:'#F59E0B'}, {v:5, c:'#8B5CF6'}]} innerRadius={45} outerRadius={65} dataKey="v" stroke="none">
                           <Cell fill="#3B82F6" /><Cell fill="#10B981" /><Cell fill="#F59E0B" /><Cell fill="#8B5CF6" />
                        </RePie>
                     </RePieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex-1 space-y-4">
                  <LegendRow label="Rent Collection" value="₹ 15,45,230" color="bg-blue-500" />
                  <LegendRow label="Service Fees" value="₹ 4,12,350" color="bg-emerald-500" />
                  <LegendRow label="Other Charges" value="₹ 1,45,230" color="bg-amber-500" />
                  <LegendRow label="Late Fees" value="₹ 52,800" color="bg-purple-500" />
               </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Revenue</span>
               <span className="text-2xl font-black text-slate-800">₹ 24,58,760</span>
            </div>
         </div>
      </div>

      {/* Key Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <InsightCard icon={Building2} text="Occupancy rate improved by 6.3% compared to last month." />
         <InsightCard icon={MapPin} text="Mumbai has the highest revenue contribution (44.4%)." />
         <InsightCard icon={TrendingUp} text="New properties added increased by 12.5% this month." />
      </div>
    </div>
  );
}

function ReportStatCard({ label, value, trend, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-500 shadow-blue-200",
    purple: "bg-purple-500 shadow-purple-200",
    emerald: "bg-emerald-500 shadow-emerald-200",
    amber: "bg-amber-500 shadow-amber-200",
    rose: "bg-rose-500 shadow-rose-200",
  };
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md group hover:-translate-y-1 transition-all">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg", colors[color])}>
          <Icon className="w-6 h-6" />
       </div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-lg font-black text-slate-800 mb-2 truncate">{value}</p>
       <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600">
          <ArrowUpRight className="w-3 h-3" /> {trend} from last month
       </div>
    </div>
  );
}

function LegendSmall({ label, color }) {
  return (
    <div className="flex items-center gap-2">
       <div className={cn("w-2 h-2 rounded-full", color)} />
       <span className="text-[10px] font-black text-slate-400 uppercase">{label}</span>
    </div>
  );
}

function StatItem({ label, value, color }) {
  return (
    <div>
       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className={cn("text-sm font-black", color)}>{value}</p>
    </div>
  );
}

function LegendRow({ label, value, color }) {
  return (
    <div className="flex items-center justify-between text-[10px] font-black group">
       <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", color)} />
          <span className="text-slate-500 group-hover:text-slate-800 transition-colors uppercase tracking-tight">{label}</span>
       </div>
       <span className="text-slate-800">{value}</span>
    </div>
  );
}

function PropPerfRow({ name, loc, occ, rev }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
       <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center font-black text-[10px] text-blue-600">PV</div>
          <div>
             <p className="text-[11px] font-black text-slate-800 truncate max-w-[120px]">{name}</p>
             <p className="text-[9px] text-slate-400 font-bold">{loc}</p>
          </div>
       </div>
       <div className="text-right">
          <p className="text-[11px] font-black text-slate-800">{rev}</p>
          <span className="text-[9px] font-black text-emerald-600">{occ} Occupied</span>
       </div>
    </div>
  );
}

function MapPoint({ label, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl border border-slate-100 shadow-lg flex items-center gap-3 w-40 ml-auto mr-10 transform hover:scale-105 transition-all">
       <MapPin className="w-4 h-4 text-rose-500" />
       <div>
          <p className="text-[9px] font-black text-slate-800">{label}</p>
          <p className="text-[8px] font-black text-blue-600">{value}</p>
       </div>
    </div>
  );
}

function GrowthTile({ label, value, trend }) {
  return (
    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all">
       <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{label}</p>
       <p className="text-sm font-black text-slate-800">{value}</p>
       <p className="text-[9px] font-black text-emerald-600 mt-1">{trend} ↑</p>
    </div>
  );
}

function StaffRow({ name, role, count, leads, perf }) {
  return (
    <tr className="group hover:bg-slate-50 transition-colors">
       <td className="py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400">?</div>
          <div>
             <p className="text-sm font-black text-slate-800">{name}</p>
             <p className="text-[10px] text-slate-400 font-bold">{role}</p>
          </div>
       </td>
       <td className="py-6 text-sm font-black text-slate-800 text-center">{count}</td>
       <td className="py-6 text-sm font-black text-slate-800 text-center">{leads}</td>
       <td className="py-6 text-right">
          <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{perf}</span>
       </td>
    </tr>
  );
}

function InsightCard({ icon: Icon, text }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6 group hover:bg-blue-600 transition-all cursor-default">
       <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-white/20 transition-all shrink-0">
          <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-all" />
       </div>
       <p className="text-sm font-black text-slate-700 group-hover:text-white transition-all leading-relaxed">{text}</p>
    </div>
  );
}
