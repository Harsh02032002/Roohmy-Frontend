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

const miniLineData = [
  { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 25 }, { v: 22 }
];

const performanceData = [
  { name: "Ocean View Apartment", loc: "Mumbai", occ: "98%", rev: "₹ 2,45,000" },
  { name: "Green Valley Villa", loc: "Bangalore", occ: "96%", rev: "₹ 2,10,350" },
  { name: "Sunrise Heights", loc: "Pune", occ: "93%", rev: "₹ 1,88,760" },
  { name: "Lake View Residency", loc: "Hyderabad", occ: "90%", rev: "₹ 1,75,420" },
  { name: "Skyline Studio", loc: "Delhi", occ: "88%", rev: "₹ 1,60,220" },
];

const locationData = [
  { city: "Mumbai", count: 812, val: "₹ 8,45,600", color: "bg-blue-500" },
  { city: "Bangalore", count: 652, val: "₹ 5,67,230", color: "bg-indigo-500" },
  { city: "Pune", count: 432, val: "₹ 4,35,120", color: "bg-emerald-500" },
  { city: "Hyderabad", count: 312, val: "₹ 3,10,450", color: "bg-amber-500" },
  { city: "Delhi", count: 242, val: "₹ 2,00,360", color: "bg-rose-500" },
];

export default function ReportsOverview() {
  return (
    <div className="p-8 space-y-12 bg-[#F8FAFC] min-h-full">
      {/* Header - ENLARGED */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">Report & Analytics Overview</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Sovereign Performance & Intelligence Citadel</p>
         </div>
         <div className="flex items-center gap-6">
            <div className="bg-white border border-slate-100 px-6 py-4 rounded-[2rem] flex items-center gap-4 shadow-xl shadow-slate-200/40 cursor-pointer hover:bg-slate-50 transition-all">
               <Calendar className="w-5 h-5 text-blue-600" />
               <span className="text-xs font-black text-slate-600 uppercase tracking-tight">May 22 - May 28, 2024</span>
               <MoreVertical className="w-5 h-5 text-slate-300" />
            </div>
         </div>
      </div>

      {/* Row 1: Hero Stats (6 Cards) - ENLARGED */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
         <StatCard label="Total Properties" value="2,340" trend="+ 12.6%" up icon={Building2} color="blue" />
         <StatCard label="Total Tenants" value="1,248" trend="+ 9.8%" up icon={Users} color="emerald" />
         <StatCard label="Occupancy Rate" value="87.6%" trend="+ 4.3%" up icon={Target} color="purple" />
         <StatCard label="Monthly Revenue" value="₹ 24.58L" trend="+ 14.7%" up icon={IndianRupee} color="amber" />
         <StatCard label="Net Profit" value="₹ 6.23L" trend="+ 16.2%" up icon={Zap} color="blue" />
         <StatCard label="Growth Rate" value="15.2%" trend="+ 3.6%" up icon={TrendingUp} color="emerald" />
      </div>

      {/* Row 2: Revenue, Occupancy & Performance - Back to Compact UI Style */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Revenue Overview */}
         <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-800">Revenue Overview</h3>
               <select className="bg-slate-50 border-none rounded-xl px-3 py-1.5 text-[9px] font-bold text-slate-500 outline-none"><option>This Month</option></select>
            </div>
            <div className="h-[250px]">
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
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} tickFormatter={(v) => `${v/1000000}M`} />
                     <Tooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                     <Area type="monotone" dataKey="rev" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-50">
               <MiniSummary label="Total Revenue" value="₹24.58L" />
               <MiniSummary label="Collection" value="₹24.20L" />
               <MiniSummary label="Payout" value="₹17.35L" />
               <MiniSummary label="Profit" value="₹6.23L" color="text-emerald-600 font-bold" />
            </div>
         </div>

         {/* Occupancy Rate */}
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 w-full mb-8">Occupancy Rate</h3>
            <div className="relative w-44 h-44 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                     <RePie data={occupancyData} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                        {occupancyData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </RePie>
                  </RePieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-black text-slate-800 tracking-tighter leading-none">87.6%</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">Overall</p>
               </div>
            </div>
            <div className="w-full space-y-3 mb-6">
               {occupancyData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-slate-800 transition-colors">{d.name}</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-800">{d.percent}</span>
                  </div>
               ))}
            </div>
            <div className="w-full h-12 border-t border-slate-50 pt-4 flex flex-col">
               <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 mb-1 tracking-widest uppercase">
                  <TrendingUp className="w-3 h-3" /> + 4.3% this month
               </div>
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={miniLineData}><Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} dot={false} /></LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Top Performance */}
         <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-800">Top Performance</h3>
               <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
               <table className="w-full">
                  <thead>
                     <tr className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                        <th className="pb-4 text-left">Property</th>
                        <th className="pb-4 text-center">Occ</th>
                        <th className="pb-4 text-right">Yield (₹)</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {performanceData.map((p, i) => (
                        <tr key={i} className="group hover:bg-slate-50 transition-all cursor-pointer">
                           <td className="py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0 shadow-sm border border-white group-hover:scale-105 transition-all">
                                    <img src={`https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100&idx=${i}`} className="w-full h-full object-cover" alt="" />
                                 </div>
                                 <p className="text-[11px] font-bold text-slate-800 truncate max-w-[100px]">{p.name}</p>
                              </div>
                           </td>
                           <td className="py-4 text-center"><span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">{p.occ}</span></td>
                           <td className="py-4 text-right text-[11px] font-bold text-slate-800 tracking-tighter">{p.rev}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Row 3: Locations & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-800">Location Distribution</h3>
               <Globe className="w-5 h-5 text-blue-600 opacity-20" />
            </div>
            <div className="flex gap-8 items-center">
               <div className="flex-1 h-64 bg-slate-50 rounded-[2rem] border border-slate-100 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e8/India_map_blank.svg')] bg-contain bg-no-repeat bg-center opacity-30" />
                  <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center animate-pulse"><div className="w-2 h-2 bg-blue-600 rounded-full" /></div>
                  <div className="absolute bottom-1/4 right-1/2 w-8 h-8 bg-indigo-600/20 rounded-full flex items-center justify-center"><div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" /></div>
                  <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-emerald-600/20 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-emerald-600 rounded-full" /></div>
               </div>
               <div className="w-48 space-y-4 overflow-y-auto max-h-[250px] custom-scrollbar pr-2">
                  {locationData.map((l, i) => (
                     <div key={i} className="flex flex-col gap-1 group cursor-pointer">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className={cn("w-2 h-2 rounded-full", l.color)} />
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-800 transition-colors">{l.city}</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-800">{l.val}</span>
                        </div>
                        <div className="ml-4 h-1 bg-slate-50 rounded-full overflow-hidden">
                           <div className={cn("h-full", l.color)} style={{ width: `${Math.random() * 60 + 40}%` }} />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-lg font-bold text-slate-800 mb-8">Growth Intelligence</h3>
            <div className="grid grid-cols-2 gap-6 h-[250px]">
               <GrowthCard label="New Assets" value="234" trend="+ 18.6%" color="emerald" data={miniLineData} />
               <GrowthCard label="New Tenants" value="248" trend="+ 16.4%" color="blue" data={miniLineData} />
               <GrowthCard label="Revenue flux" value="₹ 24.58L" trend="+ 14.7%" color="orange" data={miniLineData} />
               <GrowthCard label="Bookings" value="356" trend="+ 19.3%" color="purple" data={miniLineData} />
            </div>
         </div>

         <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-8">Yield Classification</h3>
            <div className="flex items-center gap-8 flex-1">
               <div className="relative w-40 h-40 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <RePieChart>
                        <RePie data={revenueReportData} innerRadius={50} outerRadius={65} paddingAngle={5} dataKey="value" stroke="none">
                           {revenueReportData.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </RePie>
                     </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <p className="text-2xl font-black text-slate-800 tracking-tighter leading-none">₹24.58L</p>
                  </div>
               </div>
               <div className="flex-1 space-y-4 overflow-y-auto max-h-[200px] custom-scrollbar pr-2">
                  {revenueReportData.map((d, i) => (
                     <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: d.color }} />
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-800 transition-colors leading-none">{d.name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 leading-none">{d.percent}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Row 4: Staff Performance & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
         <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-800">Operational Efficiency</h3>
               <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">Full Audit</button>
            </div>
            <table className="w-full">
               <thead>
                  <tr className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                     <th className="pb-6 text-left">Personnel</th>
                     <th className="pb-6 text-left">Role</th>
                     <th className="pb-6 text-center">Entities</th>
                     <th className="pb-6 text-center">Leads</th>
                     <th className="pb-6 text-right">Performance</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  <StaffRow name="Neha Verma" role="Property Manager" managed="156" leads="93" perf="93%" />
                  <StaffRow name="Rahul Singh" role="Leasing Exec" managed="128" leads="88" perf="88%" />
                  <StaffRow name="Priya Nair" role="Relationship Mgr" managed="112" leads="82" perf="82%" />
                  <StaffRow name="Vikram Joshi" role="Support Exec" managed="94" leads="78" perf="78%" />
               </tbody>
            </table>
         </div>

         <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-8 uppercase tracking-widest">Strategic Insights</h3>
            <div className="grid grid-cols-1 gap-6 flex-1">
               <InsightTile icon={Users} text="Occupancy rate improved by 6.3% compared to previous cycle." />
               <InsightTile icon={Globe} text="Mumbai Hub demonstrates highest yield contribution at 34.4%." />
               <InsightTile icon={Building2} text="Asset acquisition strategy resulted in 18.6% growth." />
               <InsightTile icon={Zap} text="Fiscal sovereignty verified: Net profit increased by 16.2%." />
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-100 shadow-blue-50",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-50",
    purple: "text-purple-600 bg-purple-50 border-purple-100 shadow-purple-50",
    amber: "text-amber-600 bg-amber-50 border-amber-100 shadow-amber-50",
  };
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 group hover:translate-y-[-5px] transition-all duration-500 flex flex-col justify-between">
       <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm border mb-8", colors[color])}>
          <Icon className="w-8 h-8" />
       </div>
       <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 leading-tight">{label}</p>
          <div className="flex items-end justify-between">
             <p className="text-4xl font-black text-slate-800 tracking-tighter leading-none">{value}</p>
             <span className={cn("text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest flex items-center gap-1", up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
                {trend}
             </span>
          </div>
       </div>
    </div>
  );
}

function MiniSummary({ label, value, color }) {
  return (
    <div className="min-w-0">
       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1 truncate">{label}</p>
       <p className={cn("text-[11px] font-bold truncate tracking-tighter", color || "text-slate-800")}>{value}</p>
    </div>
  );
}

function GrowthCard({ label, value, trend, color, data }) {
  const colors = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    orange: "text-amber-600",
    purple: "text-purple-600",
  };
  return (
    <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
       <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          <span className={cn("text-[8px] font-bold uppercase", colors[color])}>{trend} ↑</span>
       </div>
       <p className="text-xl font-bold text-slate-800 tracking-tighter mb-4">{value}</p>
       <div className="h-8">
          <ResponsiveContainer width="100%" height="100%">
             <LineChart data={data}>
                <Line type="monotone" dataKey="v" stroke={color === "emerald" ? "#10b981" : color === "blue" ? "#3b82f6" : color === "orange" ? "#f59e0b" : "#8b5cf6"} strokeWidth={2} dot={false} />
             </LineChart>
          </ResponsiveContainer>
       </div>
    </div>
  );
}

function StaffRow({ name, role, managed, leads, perf }) {
  return (
    <tr className="group hover:bg-slate-50 transition-all duration-500 cursor-pointer">
       <td className="py-5">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold shadow-sm border border-white group-hover:scale-110 transition-transform">
                {name.charAt(0)}
             </div>
             <p className="text-[13px] font-bold text-slate-800 tracking-tight">{name}</p>
          </div>
       </td>
       <td className="py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role}</td>
       <td className="py-5 text-sm font-bold text-slate-800 text-center">{managed}</td>
       <td className="py-5 text-sm font-bold text-slate-800 text-center">{leads}</td>
       <td className="py-5 text-right"><span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 shadow-sm">{perf}</span></td>
    </tr>
  );
}

function InsightTile({ icon: Icon, text }) {
  return (
    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:bg-blue-600 transition-all duration-500 cursor-pointer">
       <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-white/20 group-hover:text-white transition-all shadow-sm">
          <Icon className="w-5 h-5" />
       </div>
       <p className="text-[10px] font-bold text-slate-500 leading-tight group-hover:text-white transition-all">{text}</p>
    </div>
  );
}
