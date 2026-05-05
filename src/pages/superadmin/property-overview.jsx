import React from "react";
import { 
  Building2, CheckCircle2, Clock, XCircle, 
  ArrowUpRight, ArrowDownRight, ChevronRight, 
  MoreVertical, Search, Calendar, Plus,
  TrendingUp, Activity, Globe, MapPin, 
  LayoutList, User, Filter, Download
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- EXACT DATA FROM PROPERTY MANAGEMENT OVERVIEW SCREENSHOT ---

const propertyStatusData = [
  { name: "Approved", value: 1783, color: "#3B82F6", percent: "76.2%" },
  { name: "Pending", value: 324, color: "#F59E0B", percent: "13.8%" },
  { name: "Rejected", value: 233, color: "#EF4444", percent: "9.9%" },
];

const recentProperties = [
  { name: "Ocean View Apartment", owner: "John Doe", location: "Mumbai", status: "Approved", date: "May 28, 2024", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop" },
  { name: "Green Valley Villa", owner: "Priya Sharma", location: "Bangalore", status: "Pending", date: "May 27, 2024", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop" },
  { name: "Sunrise Heights", owner: "Amit Patel", location: "Pune", status: "Approved", date: "May 27, 2024", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=100&h=100&fit=crop" },
  { name: "Lake View Residency", owner: "Neha Singh", location: "Hyderabad", status: "Rejected", date: "May 26, 2024", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=100&h=100&fit=crop" },
  { name: "Skyline Studio", owner: "Vikram Joshi", location: "Delhi", status: "Pending", date: "May 25, 2024", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=100&h=100&fit=crop" },
];

const actionGrid = [
  { label: "Add Properties", desc: "142 added this month", icon: Plus, value: "142", btnText: "Add New Property", color: "blue" },
  { label: "Approve / Reject Properties", desc: "324 pending review", icon: CheckCircle2, value: "324", btnText: "Review Now", color: "emerald" },
  { label: "Pending Properties", desc: "324 pending approval", icon: Clock, value: "324", btnText: "View Pending", color: "amber" },
  { label: "All Properties List", desc: "2,340 total properties", icon: LayoutList, value: "2,340", btnText: "View All Properties", color: "purple" },
  { label: "Online Leads", desc: "1,256 this month", icon: Globe, value: "1,256", btnText: "View Online Leads", color: "indigo" },
];

export default function PropertyOverview() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Property Management Overview</h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
               <span className="hover:text-blue-600 cursor-pointer transition-colors">Property Management</span>
               <ChevronRight size={12} className="opacity-50" />
               <span className="text-blue-600">Overview</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
               <Calendar className="w-4 h-4 text-slate-400" />
               <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">May 22 - May 28, 2024</span>
            </div>
         </div>
      </div>

      <p className="text-sm text-slate-500 font-medium mb-8">Manage, monitor and control all properties listed on Roomhy platform.</p>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
         <StatCardSmall label="Total Properties" value="2,340" trend="12.5%" up icon={Building2} color="blue" />
         <StatCardSmall label="Approved Properties" value="1,783" trend="10.8%" up icon={CheckCircle2} color="emerald" />
         <StatCardSmall label="Pending Properties" value="324" trend="5.3%" up icon={Clock} color="amber" />
         <StatCardSmall label="Rejected Properties" value="233" trend="2.4%" down icon={XCircle} color="rose" />
         <StatCardSmall label="Online Leads (This Month)" value="1,256" trend="18.7%" up icon={Globe} color="purple" />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
         {/* Property Status Donut */}
         <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-bold text-slate-900">Property Status Overview</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer">
                  <option>This Month</option>
               </select>
            </div>
            <div className="relative h-64 flex items-center justify-center mb-10">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={propertyStatusData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                        {propertyStatusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-3xl font-black text-slate-900">2,340</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total</p>
               </div>
            </div>
            <div className="space-y-4">
               {propertyStatusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between group">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: item.color}} />
                        <span className="text-sm font-bold text-slate-500">{item.name}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-900">{item.value.toLocaleString()}</span>
                        <span className="text-[11px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded-lg">({item.percent})</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Recent Properties Ledger */}
         <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Recent Properties</h3>
               <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="flex-1 overflow-x-auto custom-scrollbar">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="pb-4 font-bold">Property Name</th>
                        <th className="pb-4 font-bold">Owner</th>
                        <th className="pb-4 font-bold">Location</th>
                        <th className="pb-4 font-bold">Status</th>
                        <th className="pb-4 font-bold text-right">Date Added</th>
                        <th className="pb-4 text-right"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentProperties.map((p, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                           <td className="py-4">
                              <div className="flex items-center gap-3">
                                 <img src={p.image} className="w-10 h-10 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-110" alt="" />
                                 <span className="text-sm font-bold text-slate-800">{p.name}</span>
                              </div>
                           </td>
                           <td className="py-4 text-xs font-semibold text-slate-500">{p.owner}</td>
                           <td className="py-4">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                 <MapPin size={12} className="text-slate-300" /> {p.location}
                              </div>
                           </td>
                           <td className="py-4">
                              <span className={cn(
                                 "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                                 p.status === "Approved" ? "bg-emerald-50 text-emerald-600" : p.status === "Pending" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                              )}>
                                 {p.status}
                              </span>
                           </td>
                           <td className="py-4 text-right text-xs font-bold text-slate-400">{p.date}</td>
                           <td className="py-4 text-right">
                              <button className="p-1.5 text-slate-300 hover:text-slate-900 transition-colors">
                                 <MoreVertical size={16} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
         {actionGrid.map((action, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all hover:translate-y-[-4px] hover:shadow-md group">
               <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-110",
                  action.color === "blue" ? "bg-blue-50 text-blue-600" : action.color === "emerald" ? "bg-emerald-50 text-emerald-600" : action.color === "amber" ? "bg-amber-50 text-amber-600" : action.color === "purple" ? "bg-purple-50 text-purple-600" : "bg-indigo-50 text-indigo-600"
               )}>
                  <action.icon size={22} />
               </div>
               <h4 className="text-sm font-black text-slate-900 mb-1">{action.label}</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{action.desc}</p>
               <div className="mb-6">
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{action.value}</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">Total</p>
               </div>
               <button className={cn(
                  "mt-auto w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                  action.color === "blue" ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white" : action.color === "emerald" ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white" : action.color === "amber" ? "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white" : action.color === "purple" ? "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white"
               )}>
                  {action.btnText} →
               </button>
            </div>
         ))}
      </div>
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function StatCardSmall({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    emerald: "text-emerald-600 bg-emerald-50",
    purple: "text-purple-600 bg-purple-50",
    amber: "text-amber-600 bg-amber-50",
    rose: "text-rose-600 bg-rose-50",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col transition-all hover:translate-y-[-4px] hover:shadow-md group">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm mb-4", colors[color])}>
          <Icon size={22} />
       </div>
       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
       <p className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-3">{value}</p>
       <div className="flex items-center gap-1.5 mt-auto">
          {up ? <ArrowUpRight size={12} className="text-emerald-600" /> : <ArrowDownRight size={12} className="text-rose-600" />}
          <span className={cn("text-[10px] font-bold", up ? "text-emerald-600" : "text-rose-600")}>{trend}</span>
          <span className="text-[10px] text-slate-400 font-medium lowercase">from last month</span>
       </div>
    </div>
  );
}
