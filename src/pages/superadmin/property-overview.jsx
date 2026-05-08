import React, { useState, useEffect } from "react";
import { 
  Building2, CheckCircle2, Clock, XCircle, 
  ArrowUpRight, ArrowDownRight, ChevronRight, 
  MoreVertical, Search, Calendar, Plus,
  MapPin, User, ListFilter, LayoutGrid,
  ClipboardCheck, Eye, Trash2, Edit3,
  Users, MessageSquare, List
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from "recharts";
import { fetchPropertyOverviewStats } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- DATA FROM SCREENSHOT (PROPERTY MANAGEMENT) ---

const propertyStatusData = [
  { name: "Approved", value: 1783, color: "#3B82F6", percent: "76.2%" },
  { name: "Pending", value: 324, color: "#F59E0B", percent: "13.8%" },
  { name: "Rejected", value: 233, color: "#EF4444", percent: "9.9%" },
];

const recentProperties = [
  { name: "Ocean View Apartment", owner: "John Doe", loc: "Mumbai", status: "Approved", date: "May 28, 2024" },
  { name: "Green Valley Villa", owner: "Priya Sharma", loc: "Bangalore", status: "Pending", date: "May 27, 2024" },
  { name: "Sunrise Heights", owner: "Amit Patel", loc: "Pune", status: "Approved", date: "May 27, 2024" },
  { name: "Lake View Residency", owner: "Neha Singh", loc: "Hyderabad", status: "Rejected", date: "May 26, 2024" },
  { name: "Skyline Studio", owner: "Vikram Joshi", loc: "Delhi", status: "Pending", date: "May 25, 2024" },
];

const actionCards = [
  { title: "Add Properties", desc: "Add new properties to the platform", count: "142", sub: "Added this month", btn: "Add New Property", icon: Building2, color: "blue" },
  { title: "Approve / Reject Properties", desc: "Review and take action on submitted properties", count: "324", sub: "Pending review", btn: "Review Now", icon: ClipboardCheck, color: "emerald" },
  { title: "Pending Properties", desc: "Properties waiting for approval", count: "324", sub: "Pending approval", btn: "View Pending", icon: Clock, color: "amber" },
  { title: "All Properties List", desc: "View and manage all properties", count: "2,340", sub: "Total properties", btn: "View All Properties", icon: List, color: "purple" },
  { title: "Online Leads", desc: "Manage all incoming online leads", count: "1,256", sub: "This month", btn: "View Online Leads", icon: Users, color: "cyan" },
];

export default function PropertyOverview() {
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const res = await fetchPropertyOverviewStats();
        if (res.success && res.summary) {
          setStats({
            total: res.summary.totalProperties || 2340,
            active: res.summary.activeProperties || 1783,
            pending: res.summary.pendingReview || 324,
            leads: 1256 // Fixed from PDF
          });
        }
      } catch (error) {
        console.error("Property Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter text-slate-900">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Property Management Overview</h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
               <span>Property Management</span>
               <ChevronRight size={12} className="opacity-50" />
               <span className="text-blue-600">Overview</span>
            </div>
         </div>
         <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-sm text-xs font-bold text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>May 22 - May 28, 2024</span>
         </div>
      </div>

      {/* Top Metrics Row - DYNAMIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <StatCardSmall label="Total Properties" value={stats.total.toLocaleString()} trend="8.3%" up icon={Building2} color="blue" loading={loading} />
         <StatCardSmall label="Approved Properties" value={stats.active.toLocaleString()} trend="12.5%" up icon={CheckCircle2} color="emerald" loading={loading} />
         <StatCardSmall label="Pending Review" value={stats.pending.toLocaleString()} trend="5.2%" up icon={Clock} color="amber" loading={loading} />
         <StatCardSmall label="Incoming Leads" value={stats.leads.toLocaleString()} trend="18.6%" up icon={MessageSquare} color="purple" loading={loading} />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Property Status Donut */}
         <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">Property Status Overview</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-1.5 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                  <option>This Month</option>
               </select>
            </div>
            <div className="flex flex-col items-center flex-1 justify-center">
               <div className="relative h-64 w-64 flex items-center justify-center mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={propertyStatusData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                           {propertyStatusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                        </Pie>
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <p className="text-3xl font-black text-slate-900">2,340</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total</p>
                  </div>
               </div>
               <div className="w-full space-y-4">
                  {propertyStatusData.map((item) => (
                     <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: item.color}} />
                           <span className="text-sm font-bold text-slate-500">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-sm font-black text-slate-900">{item.value.toLocaleString()}</span>
                           <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg">({item.percent})</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Recent Properties Table */}
         <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Properties</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="border-b border-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="text-left pb-4 font-bold">Property Name</th>
                        <th className="text-left pb-4 font-bold">Owner</th>
                        <th className="text-left pb-4 font-bold">Location</th>
                        <th className="text-left pb-4 font-bold">Status</th>
                        <th className="text-left pb-4 font-bold">Date Added</th>
                        <th className="text-right pb-4 font-bold"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentProperties.map((prop, i) => (
                        <tr key={i} className="group hover:bg-slate-50 transition-colors">
                           <td className="py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                    <Building2 size={16} className="text-slate-300" />
                                 </div>
                                 <span className="text-[13px] font-bold text-slate-900 truncate">{prop.name}</span>
                              </div>
                           </td>
                           <td className="py-4 text-[13px] text-slate-500 font-medium">{prop.owner}</td>
                           <td className="py-4 text-[13px] text-slate-500 font-medium">{prop.loc}</td>
                           <td className="py-4">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold",
                                prop.status === "Approved" ? "bg-emerald-50 text-emerald-600" :
                                prop.status === "Pending" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                              )}>{prop.status}</span>
                           </td>
                           <td className="py-4 text-[13px] text-slate-500 font-medium">{prop.date}</td>
                           <td className="py-4 text-right">
                              <button className="p-1 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                                 <MoreVertical size={16} className="text-slate-300" />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Bottom Action Cards - EXACT FROM SCREENSHOT */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
         {actionCards.map((card, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:translate-y-[-4px] transition-all">
               <div className={cn(
                 "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform",
                 card.color === "blue" ? "bg-blue-50 text-blue-600" :
                 card.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                 card.color === "amber" ? "bg-amber-50 text-amber-600" :
                 card.color === "purple" ? "bg-purple-50 text-purple-600" : "bg-cyan-50 text-cyan-600"
               )}>
                  <card.icon size={22} />
               </div>
               <h4 className="text-sm font-bold text-slate-900 mb-2 leading-tight">{card.title}</h4>
               <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-6 px-2">{card.desc}</p>
               
               <div className="mb-8">
                  <p className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{card.count}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.sub}</p>
               </div>

               <button className={cn(
                 "w-full py-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-2",
                 card.color === "blue" ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white" :
                 card.color === "emerald" ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white" :
                 card.color === "amber" ? "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white" :
                 card.color === "purple" ? "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white" : "bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-white"
               )}>
                  {card.btn} <ChevronRight size={14} />
               </button>
            </div>
         ))}
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function StatCardSmall({ label, value, trend, up, icon: Icon, color, loading }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    emerald: "text-emerald-600 bg-emerald-50",
    purple: "text-purple-600 bg-purple-50",
    amber: "text-amber-600 bg-amber-50",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col transition-all hover:translate-y-[-4px] hover:shadow-md group min-w-0">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm mb-4", colors[color])}>
          <Icon size={22} />
       </div>
       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2 truncate">{label}</p>
       {loading ? (
         <div className="h-6 w-16 bg-slate-100 animate-pulse rounded-md" />
       ) : (
         <p className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-3 truncate">{value}</p>
       )}
       <div className="flex items-center gap-1.5 mt-auto">
          {up ? <ArrowUpRight size={12} className="text-emerald-600" /> : <ArrowDownRight size={12} className="text-rose-600" />}
          <span className={cn("text-[10px] font-bold", up ? "text-emerald-600" : "text-rose-600")}>{trend}</span>
       </div>
    </div>
  );
}
