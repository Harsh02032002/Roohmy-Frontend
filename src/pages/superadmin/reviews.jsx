import React from "react";
import { 
  Star, TrendingUp, Users, Building2, 
  ArrowUpRight, ArrowDownRight, ChevronRight, 
  MoreVertical, Search, Filter, Download,
  CheckCircle2, AlertCircle, Clock, Globe,
  LayoutGrid, MessageSquare, ShieldCheck, 
  MessageCircle, BarChart3, PieChart as PieIcon,
  Smile, Frown, Meh, Trash2, Calendar
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- EXACT DATA FROM REVIEW OVERVIEW SCREENSHOT ---

const reviewTrend = [
  { name: "May 22", reviews: 40, rating: 4.2 },
  { name: "May 23", reviews: 65, rating: 4.1 },
  { name: "May 24", reviews: 55, rating: 4.3 },
  { name: "May 25", reviews: 90, rating: 4.2 },
  { name: "May 26", reviews: 75, rating: 4.4 },
  { name: "May 27", reviews: 110, rating: 4.3 },
  { name: "May 28", reviews: 160, rating: 4.3 },
];

const ratingDistribution = [
  { name: "5 Star", value: 5126, color: "#10B981", percent: "58.7%" },
  { name: "4 Star", value: 2201, color: "#3B82F6", percent: "25.2%" },
  { name: "3 Star", value: 879, color: "#F59E0B", percent: "10.1%" },
  { name: "2 Star", value: 312, color: "#6366F1", percent: "3.6%" },
  { name: "1 Star", value: 224, color: "#EF4444", percent: "2.4%" },
];

const platformData = [
  { name: "Website", value: 4521, color: "#3B82F6", percent: "51.7%" },
  { name: "Mobile App", value: 2841, color: "#10B981", percent: "32.5%" },
  { name: "Google", value: 1023, color: "#F59E0B", percent: "11.7%" },
  { name: "Others", value: 357, color: "#6366F1", percent: "4.1%" },
];

const sentimentData = [
  { name: "Positive", value: 6128, color: "#10B981", percent: "70.1%" },
  { name: "Neutral", value: 1659, color: "#F59E0B", percent: "19.0%" },
  { name: "Negative", value: 955, color: "#EF4444", percent: "10.9%" },
];

const recentReviews = [
  { name: "Rahul Sharma", prop: "Sunrise Residency, Mumbai", rating: 5, text: "Excellent property and amazing management. Highly recommend!", date: "May 28, 2024", time: "10:30 AM", status: "Published", color: "text-emerald-600 bg-emerald-50" },
  { name: "Priya Mehta", prop: "Green Valley PG, Bangalore", rating: 4, text: "Good location and clean rooms. Had a good experience.", date: "May 28, 2024", time: "09:45 AM", status: "Published", color: "text-emerald-600 bg-emerald-50" },
  { name: "Vikram Joshi", prop: "Urban Nest, Pune", rating: 3, text: "Decent place but can improve maintenance.", date: "May 28, 2024", time: "08:45 AM", status: "Under Review", color: "text-amber-600 bg-amber-50" },
  { name: "Neha Singh", prop: "Lakeview Apartments, Hyderabad", rating: 5, text: "Beautiful view and great amenities! Loved my stay.", date: "May 28, 2024", time: "07:30 AM", status: "Published", color: "text-emerald-600 bg-emerald-50" },
  { name: "Amit Patel", prop: "Skyline PG, Delhi", rating: 4, text: "Not satisfied with the services. Need improvement.", date: "May 28, 2024", time: "06:20 AM", status: "Under Review", color: "text-amber-600 bg-amber-50" },
];

const topProperties = [
  { name: "Sunrise Residency", loc: "Mumbai", rating: 4.8, reviews: 842, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100" },
  { name: "Lakeview Apartments", loc: "Hyderabad", rating: 4.6, reviews: 621, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100" },
  { name: "Green Valley PG", loc: "Bangalore", rating: 4.5, reviews: 1203, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=100" },
  { name: "Urban Nest", loc: "Pune", rating: 4.3, reviews: 532, image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=100" },
  { name: "Skyline PG", loc: "Delhi", rating: 4.1, reviews: 317, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=100" },
];

export default function ReviewOverview() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Review Overview</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Track, manage and analyze all property reviews and ratings.</p>
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
         <StatCardSmall label="New Reviews (Today)" value="24" trend="25.3%" up icon={MessageCircle} color="emerald" />
         <StatCardSmall label="New Reviews (This Week)" value="152" trend="18.7%" up icon={MessageSquare} color="blue" />
         <StatCardSmall label="New Reviews (This Month)" value="612" trend="15.4%" up icon={History} color="purple" />
         <StatCardSmall label="Average Rating" value="4.3 / 5" trend="⭐⭐⭐⭐⭐" icon={Star} color="amber" />
         <StatCardSmall label="Total Reviews" value="8,742" trend="100% Verified" icon={CheckCircle2} color="blue" />
         <StatCardSmall label="Pending Moderation" value="37" trend="Requires Action" icon={ShieldCheck} color="rose" />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Review Trend */}
         <div className="col-span-12 lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">Review Trend</h3>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                     <LegendItem color="bg-blue-600" label="New Reviews" />
                     <LegendItem color="bg-emerald-600" label="Average Rating" />
                  </div>
                  <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none">
                     <option>This Week</option>
                  </select>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reviewTrend}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={15} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dx={-15} />
                     <Tooltip />
                     <Line type="monotone" dataKey="reviews" stroke="#3B82F6" strokeWidth={3} dot={{fill: '#3B82F6', r: 4}} activeDot={{r: 6}} />
                     <Line type="monotone" dataKey="rating" stroke="#10B981" strokeWidth={3} dot={{fill: '#10B981', r: 4}} activeDot={{r: 6}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Rating Distribution */}
         <AnalyticsPieCard title="Rating Distribution" total="8,742" data={ratingDistribution} unit="Total Reviews" />

         {/* Reviews by Platform */}
         <AnalyticsPieCard title="Reviews by Platform" total="8,742" data={platformData} unit="Total Reviews" />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Recent Reviews */}
         <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Reviews</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All Reviews</button>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="pb-4">Reviewer</th>
                        <th className="pb-4">Property</th>
                        <th className="pb-4">Rating</th>
                        <th className="pb-4">Review</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4 text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentReviews.map((rev, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                           <td className="py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                    {rev.name.charAt(0)}
                                 </div>
                                 <span className="text-[11px] font-bold text-slate-800">{rev.name}</span>
                              </div>
                           </td>
                           <td className="py-4 text-[10px] font-semibold text-slate-500 max-w-[120px] truncate">{rev.prop}</td>
                           <td className="py-4">
                              <div className="flex items-center gap-0.5">
                                 {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} size={10} className={idx < rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
                                 ))}
                              </div>
                           </td>
                           <td className="py-4">
                              <p className="text-[11px] text-slate-500 line-clamp-1 italic">"{rev.text}"</p>
                           </td>
                           <td className="py-4 text-[10px] font-bold text-slate-900">{rev.date}</td>
                           <td className="py-4 text-right">
                              <span className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider", rev.color)}>
                                 {rev.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <button className="w-full mt-6 py-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all">View All Reviews →</button>
         </div>

         {/* Top Rated Properties */}
         <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">Top Rated Properties</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1">
               {topProperties.map((p, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                     <img src={p.image} className="w-12 h-12 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-110" alt="" />
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <h4 className="text-[13px] font-black text-slate-900 truncate">{p.name}</h4>
                           <p className="text-[10px] font-bold text-slate-400">{p.loc}</p>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-900">{p.rating}</span>
                              <div className="flex items-center gap-0.5">
                                 {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} size={10} className={idx < Math.floor(p.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
                                 ))}
                              </div>
                           </div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.reviews} Reviews</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-8 py-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline text-left">View All Properties →</button>
         </div>
      </div>

      {/* Analytics Row Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         {/* Sentiment Donut */}
         <AnalyticsSmallCard title="Reviews by Sentiment" total="8,742" data={sentimentData} />

         {/* New Reviews Summary */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-8">New Reviews Summary</h3>
            <div className="space-y-6">
               <SummaryItem label="Today" value="24" trend="+25.3%" up />
               <SummaryItem label="This Week" value="152" trend="+18.7%" up />
               <SummaryItem label="This Month" value="612" trend="+15.4%" up />
            </div>
         </div>

         {/* Moderation Summary */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-8">Moderation Summary</h3>
            <div className="space-y-8">
               <ModerationBadge count={37} label="Pending" color="rose" icon={Clock} />
               <ModerationBadge count={12} label="Approved" color="emerald" icon={CheckCircle2} />
               <ModerationBadge count={5} label="Rejected" color="rose" icon={Trash2} />
               <button className="w-full text-center text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Go to Moderation →</button>
            </div>
         </div>

         {/* Quick Actions */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
               <ActionBox label="View All Reviews" icon={FileText} color="blue" />
               <ActionBox label="Moderation Queue" icon={ShieldCheck} color="amber" />
               <ActionBox label="Review Analytics" icon={BarChart3} color="emerald" />
               <ActionBox label="Add New Review" icon={Plus} color="purple" />
            </div>
         </div>
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function StatCardSmall({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    emerald: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
    amber: "text-amber-600 bg-amber-50",
    rose: "text-rose-600 bg-rose-50",
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

function AnalyticsSmallCard({ title, total, data }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
       <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-6">{title}</h3>
       <div className="relative h-32 flex items-center justify-center mb-6">
          <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                <Pie data={data} innerRadius={35} outerRadius={50} paddingAngle={3} dataKey="value" stroke="none">
                   {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
             </PieChart>
          </ResponsiveContainer>
       </div>
       <div className="space-y-2">
          {data.map((item) => (
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

function SummaryItem({ label, value, trend, up }) {
  return (
    <div className="flex items-center justify-between">
       <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">{label}</p>
          <p className="text-xl font-black text-slate-900 leading-none">{value}</p>
       </div>
       <div className="flex items-center gap-1">
          <ArrowUpRight size={14} className="text-emerald-600" />
          <span className="text-[11px] font-bold text-emerald-600">{trend}</span>
       </div>
    </div>
  );
}

function ModerationBadge({ count, label, color, icon: Icon }) {
  const colors = {
    rose: "text-rose-600 bg-rose-50 border-rose-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
  };
  return (
    <div className={cn("flex items-center justify-between p-3 rounded-2xl border", colors[color])}>
       <div className="flex items-center gap-3">
          <Icon size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-lg font-black">{count}</span>
    </div>
  );
}

function ActionBox({ label, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border-blue-100",
    amber: "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white border-amber-100",
    emerald: "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border-emerald-100",
    purple: "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white border-purple-100",
  };
  return (
    <div className={cn("flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-all group shadow-sm", colors[color])}>
       <Icon size={16} />
       <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}

function Plus({ size, className }) { return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>; }
function FileText({ size, className }) { return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>; }
function History({ size, className }) { return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>; }
