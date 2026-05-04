import React from "react";
import { 
  Star, MessageSquare, Clock, ShieldCheck, 
  Search, Filter, MoreVertical, ChevronRight,
  TrendingUp, TrendingDown, LayoutGrid, Users,
  Globe, Smartphone, Laptop, Zap, CheckCircle2,
  XCircle, ArrowUpRight, ArrowDownRight, Award,
  Calendar, Download, ArrowRight, MousePointer2, Plus, Activity
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const trendData = [
  { name: "May 22", reviews: 45, rating: 4.1 },
  { name: "May 23", reviews: 52, rating: 4.3 },
  { name: "May 24", reviews: 85, rating: 4.2 },
  { name: "May 25", reviews: 78, rating: 4.5 },
  { name: "May 26", reviews: 110, rating: 4.4 },
  { name: "May 27", reviews: 95, rating: 4.6 },
  { name: "May 28", reviews: 140, rating: 4.5 },
];

const ratingDist = [
  { name: "5 Star", value: 5126, color: "#10b981", percent: "58.7%" },
  { name: "4 Star", value: 2201, color: "#3b82f6", percent: "25.2%" },
  { name: "3 Star", value: 879, color: "#f59e0b", percent: "10.1%" },
  { name: "2 Star", value: 312, color: "#8b5cf6", percent: "3.6%" },
  { name: "1 Star", value: 224, color: "#ef4444", percent: "2.4%" },
];

const platformData = [
  { name: "Website", value: 4521, color: "#6366f1", percent: "51.7%" },
  { name: "Mobile App", value: 2841, color: "#10b981", percent: "32.5%" },
  { name: "Google", value: 1023, color: "#f59e0b", percent: "11.7%" },
  { name: "Others", value: 357, color: "#94a3b8", percent: "4.1%" },
];

const sentimentData = [
  { name: "Positive", value: 6128, color: "#10b981", percent: "70.1%" },
  { name: "Neutral", value: 1659, color: "#94a3b8", percent: "19.0%" },
  { name: "Negative", value: 955, color: "#ef4444", percent: "10.9%" },
];

const recentReviews = [
  { user: "Rahul Sharma", prop: "Sunrise Residency", rating: 5, text: "Excellent property and amazing management. Highly recommended!", date: "May 28, 2024", status: "Published", city: "Mumbai" },
  { user: "Priya Mehta", prop: "Green Valley PG", rating: 4, text: "Good location and clean rooms. Loved my stay.", date: "May 28, 2024", status: "Published", city: "Bangalore" },
  { user: "Vikram Joshi", prop: "Urban Nest", rating: 3, text: "Decent place but can improve maintenance.", date: "May 28, 2024", status: "Under Review", city: "Pune" },
  { user: "Neha Singh", prop: "Lakeview Apartments", rating: 5, text: "Beautiful view and great amenities! Loved my stay.", date: "May 28, 2024", status: "Published", city: "Hyderabad" },
];

const topRated = [
  { name: "Sunrise Residency", loc: "Mumbai", rating: 4.8, count: 842 },
  { name: "Lakeview Apartments", loc: "Hyderabad", rating: 4.6, count: 621 },
  { name: "Green Valley PG", loc: "Bangalore", rating: 4.5, count: 1203 },
  { name: "Urban Nest", loc: "Pune", rating: 4.3, count: 532 },
];

const miniLine = [ {v:10}, {v:15}, {v:12}, {v:20}, {v:18}, {v:25}, {v:22} ];

export default function SuperadminReviews() {
  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Review Overview</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Review {">"} Overview</p>
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
         <StatCard label="New Reviews (Today)" value="24" trend="+ 26.3%" up icon={MessageSquare} color="emerald" />
         <StatCard label="New Reviews (This Week)" value="152" trend="+ 18.7%" up icon={Calendar} color="blue" />
         <StatCard label="New Reviews (This Month)" value="612" trend="+ 15.4%" up icon={Zap} color="purple" />
         <StatCard label="Average Rating" value="4.3 / 5" trend="4.5 Stars Avg" up icon={Star} color="amber" />
         <StatCard label="Total Reviews" value="8,742" trend="+ 12.4% Flux" up icon={Users} color="blue" />
         <StatCard label="Pending Moderation" value="37" trend="Action Queue" up={false} icon={ShieldCheck} color="orange" />
      </div>

      {/* Row 2: Trend, Rating Dist & Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Review Trend */}
         <div className="lg:col-span-6 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-800">Review Trend</h3>
               <select className="bg-slate-50 border-none rounded-xl px-3 py-1.5 text-[9px] font-bold text-slate-500 outline-none"><option>This Week</option></select>
            </div>
            <div className="h-[280px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                     <Tooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                     <Area type="monotone" dataKey="reviews" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                     <Area type="monotone" dataKey="rating" stroke="#10b981" strokeWidth={3} fill="transparent" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-8 mt-6 justify-center">
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Reviews</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Rating</span>
               </div>
            </div>
         </div>

         {/* Rating Distribution */}
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 w-full mb-8">Rating Distribution</h3>
            <div className="relative w-44 h-44 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={ratingDist} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                        {ratingDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-black text-slate-800 tracking-tighter leading-none">8,742</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">Total Reviews</p>
               </div>
            </div>
            <div className="w-full space-y-3 flex-1 overflow-y-auto custom-scrollbar">
               {ratingDist.map((d, i) => (
                  <div key={i} className="flex items-center justify-between group">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-slate-800 transition-colors">{d.name}</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-800">{d.value.toLocaleString()} ({d.percent})</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Reviews by Platform */}
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 w-full mb-8">Reviews by Platform</h3>
            <div className="relative w-44 h-44 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={platformData} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                        {platformData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-black text-slate-800 tracking-tighter leading-none">8,742</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">Total Reviews</p>
               </div>
            </div>
            <div className="w-full space-y-3 flex-1 overflow-y-auto custom-scrollbar">
               {platformData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between group">
                     <div className="flex items-center gap-3">
                        {d.name === "Website" ? <Globe className="w-3.5 h-3.5 text-indigo-500" /> : d.name === "Mobile App" ? <Smartphone className="w-3.5 h-3.5 text-emerald-500" /> : <Laptop className="w-3.5 h-3.5 text-slate-400" />}
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-slate-800 transition-colors">{d.name}</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-800">{d.value.toLocaleString()} ({d.percent})</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Row 3: Recent Reviews & Top Rated */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Recent Reviews Table */}
         <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-800">Recent Reviews</h3>
               <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">View All Reviews</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                        <th className="pb-6">Reviewer</th>
                        <th className="pb-6">Property</th>
                        <th className="pb-6 text-center">Rating</th>
                        <th className="pb-6">Review</th>
                        <th className="pb-6">Date</th>
                        <th className="pb-6 text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentReviews.map((r, i) => (
                        <tr key={i} className="group hover:bg-slate-50 transition-all">
                           <td className="py-6">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold shadow-sm group-hover:scale-105 transition-all">
                                    {r.user.charAt(0)}
                                 </div>
                                 <p className="text-[11px] font-bold text-slate-800">{r.user}</p>
                              </div>
                           </td>
                           <td className="py-6 min-w-[120px]">
                              <p className="text-[11px] font-bold text-slate-800 truncate">{r.prop}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{r.city}</p>
                           </td>
                           <td className="py-6 text-center">
                              <div className="flex items-center justify-center text-amber-400 text-xs gap-0.5">
                                 {"★".repeat(r.rating)}<span className="text-slate-100">{"★".repeat(5-r.rating)}</span>
                              </div>
                           </td>
                           <td className="py-6 max-w-[200px]">
                              <p className="text-[10px] font-bold text-slate-500 italic truncate group-hover:text-slate-800 transition-colors">"{r.text}"</p>
                           </td>
                           <td className="py-6 text-[10px] font-bold text-slate-400 uppercase">{r.date}</td>
                           <td className="py-6 text-right">
                              <span className={cn(
                                 "text-[9px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-tighter",
                                 r.status === "Published" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                              )}>{r.status}</span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Top Rated Properties */}
         <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-800">Top Rated Properties</h3>
               <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline">View All</button>
            </div>
            <div className="space-y-8 flex-1 overflow-y-auto custom-scrollbar">
               {topRated.map((p, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                     <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 shadow-sm border border-slate-50 group-hover:scale-105 transition-all">
                        <img src={`https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100&idx=${i+10}`} className="w-full h-full object-cover" alt="" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-800 truncate">{p.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{p.loc}</p>
                     </div>
                     <div className="text-right">
                        <div className="flex items-center justify-end gap-1 mb-1">
                           <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                           <span className="text-[11px] font-bold text-slate-800">{p.rating}</span>
                        </div>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">{p.count} Reviews</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-10 py-4 text-[10px] font-bold text-blue-600 uppercase border-t border-slate-50 flex items-center justify-center gap-2 hover:gap-3 transition-all">
               View All Properties <ArrowRight className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Row 4: Sentiment, Summary, Moderation & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
         {/* Reviews by Sentiment */}
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 w-full mb-8">Reviews by Sentiment</h3>
            <div className="relative w-40 h-40 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={sentimentData} innerRadius={50} outerRadius={65} paddingAngle={5} dataKey="value" stroke="none">
                        {sentimentData.map((e, i) => <Cell key={i} fill={e.color} />)}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <Activity className="w-6 h-6 text-slate-300" />
               </div>
            </div>
            <div className="w-full space-y-3">
               {sentimentData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between group">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-slate-800 transition-colors">{d.name}</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-800">{d.value.toLocaleString()} ({d.percent})</span>
                  </div>
               ))}
            </div>
         </div>

         {/* New Reviews Summary */}
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-8">New Reviews Summary</h3>
            <div className="space-y-6 flex-1">
               <MiniGrowthCard label="Today" value="24" trend="+ 26.3%" color="emerald" data={miniLine} />
               <MiniGrowthCard label="This Week" value="152" trend="+ 18.7%" color="blue" data={miniLine} />
               <MiniGrowthCard label="This Month" value="612" trend="+ 15.4%" color="purple" data={miniLine} />
            </div>
         </div>

         {/* Moderation Summary */}
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-lg font-bold text-slate-800 mb-8">Moderation Summary</h3>
            <div className="grid grid-cols-1 gap-6">
               <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 group cursor-pointer hover:bg-amber-600 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-amber-600 shadow-sm group-hover:scale-110 transition-all"><Clock className="w-6 h-6" /></div>
                  <div>
                     <p className="text-2xl font-black text-slate-800 group-hover:text-white leading-none mb-1">37</p>
                     <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest group-hover:text-amber-100">Pending</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 group cursor-pointer hover:bg-emerald-600 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-all"><CheckCircle2 className="w-6 h-6" /></div>
                  <div>
                     <p className="text-2xl font-black text-slate-800 group-hover:text-white leading-none mb-1">12</p>
                     <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest group-hover:text-emerald-100">Approved</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100 group cursor-pointer hover:bg-rose-600 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-sm group-hover:scale-110 transition-all"><XCircle className="w-6 h-6" /></div>
                  <div>
                     <p className="text-2xl font-black text-slate-800 group-hover:text-white leading-none mb-1">5</p>
                     <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest group-hover:text-rose-100">Rejected</p>
                  </div>
               </div>
            </div>
            <button className="w-full mt-8 py-3 text-[10px] font-bold text-blue-600 uppercase hover:underline text-center flex items-center justify-center gap-2">Go to Moderation <ChevronRight className="w-3.5 h-3.5" /></button>
         </div>

         {/* Quick Actions */}
         <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-lg font-bold text-slate-800 mb-8">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4">
               <ActionBtn icon={MessageSquare} label="View All Reviews" color="blue" />
               <ActionBtn icon={ShieldCheck} label="Moderation Queue" color="amber" />
               <ActionBtn icon={Activity} label="Review Analytics" color="emerald" />
               <ActionBtn icon={Plus} label="Add New Review" color="indigo" />
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-50",
    blue: "text-blue-600 bg-blue-50 border-blue-100 shadow-blue-50",
    purple: "text-purple-600 bg-purple-50 border-purple-100 shadow-purple-50",
    amber: "text-amber-600 bg-amber-50 border-amber-100 shadow-amber-50",
    orange: "text-rose-600 bg-rose-50 border-rose-100 shadow-rose-50",
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
             <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest flex items-center gap-1", up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
                {trend} {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
             </span>
          </div>
       </div>
    </div>
  );
}

function MiniGrowthCard({ label, value, trend, color, data }) {
  const colors = { emerald: "#10b981", blue: "#3b82f6", purple: "#8b5cf6" };
  return (
    <div className="flex items-center gap-6 group cursor-pointer">
       <div className="w-32 h-12 flex-1">
          <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={data}>
                <Area type="monotone" dataKey="v" stroke={colors[color]} fill={colors[color]} fillOpacity={0.05} strokeWidth={2} />
             </AreaChart>
          </ResponsiveContainer>
       </div>
       <div className="text-right shrink-0">
          <div className="flex items-center justify-end gap-2">
             <p className="text-xl font-black text-slate-800 leading-none">{value}</p>
             <span className={cn("text-[8px] font-black uppercase", color === "emerald" ? "text-emerald-600" : "text-blue-600")}>{trend} ↑</span>
          </div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
       </div>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-600 hover:text-white hover:shadow-blue-200",
    amber: "text-amber-600 bg-amber-50 border-amber-100 hover:bg-amber-600 hover:text-white hover:shadow-amber-200",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:shadow-emerald-200",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100 hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200",
  };
  return (
    <button className={cn("w-full py-4 px-6 rounded-2xl flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest border shadow-sm transition-all duration-500", colors[color])}>
       <Icon className="w-5 h-5" />
       {label}
    </button>
  );
}
