import React from "react";
import { 
  Building2, CheckCircle2, Clock, XCircle, Users, 
  LayoutGrid, PlusCircle, UserCheck, Search, 
  MoreVertical, ArrowUpRight, ArrowDownRight,
  ChevronRight, FileText, Activity, Shield
} from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const propertyStatus = [
  { name: "Approved", value: 1783, color: "#10B981", percent: "76.2%" },
  { name: "Pending", value: 324, color: "#F59E0B", percent: "13.8%" },
  { name: "Rejected", value: 233, color: "#EF4444", percent: "9.9%" },
];

const recentProperties = [
  { id: 1, title: "Ocean View Apartment", owner: "John Doe", location: "Mumbai", status: "Approved", date: "May 28, 2024", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop" },
  { id: 2, title: "Green Valley Villa", owner: "Priya Sharma", location: "Bangalore", status: "Pending", date: "May 27, 2024", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop" },
  { id: 3, title: "Sunrise Heights", owner: "Amit Patel", location: "Pune", status: "Approved", date: "May 26, 2024", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=100&h=100&fit=crop" },
  { id: 4, title: "Lake View Residency", owner: "Neha Singh", location: "Hyderabad", status: "Rejected", date: "May 25, 2024", img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=100&h=100&fit=crop" },
  { id: 5, title: "Skyline Studio", owner: "Vikram Joshi", location: "Delhi", status: "Pending", date: "May 25, 2024", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=100&h=100&fit=crop" },
];

export default function SuperadminPropertyOverview() {
  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Property Management Overview</h1>
         <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Property Management</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Overview</span>
         </div>
      </div>

      <p className="text-sm font-bold text-slate-400">Manage, monitor and control all properties listed on Roomhy platform.</p>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <StatCardLarge icon={Building2} color="blue" label="Total Properties" value="2,340" trend="+ 12.5% from last month" up />
        <StatCardLarge icon={CheckCircle2} color="green" label="Approved Properties" value="1,783" trend="+ 10.8% from last month" up />
        <StatCardLarge icon={Clock} color="orange" label="Pending Properties" value="324" trend="+ 5.3% from last month" up />
        <StatCardLarge icon={XCircle} color="red" label="Rejected Properties" value="233" trend="- 2.4% from last month" />
        <StatCardLarge icon={Users} color="purple" label="Online Leads" value="1,256" trend="+ 18.7% from last month" up />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Property Status Donut */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Property Status Overview</h3>
              <select className="bg-slate-50 border-none rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                 <option>This Month</option>
              </select>
           </div>
           <div className="flex flex-col items-center">
              <div className="relative w-64 h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={propertyStatus} dataKey="value" innerRadius={70} outerRadius={110} paddingAngle={10} stroke="none">
                          {propertyStatus.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-4xl font-bold text-slate-800 tracking-tighter">2,340</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-3">Total Assets</p>
                 </div>
              </div>
              <div className="w-full mt-10 space-y-5">
                 {propertyStatus.map(s => (
                    <div key={s.name} className="flex items-center justify-between group cursor-default">
                       <div className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: s.color}} />
                          <span className="text-sm font-bold text-slate-500 group-hover:text-slate-800 transition-colors">{s.name}</span>
                       </div>
                       <div className="text-right">
                         <span className="text-base font-bold text-slate-800">{s.value.toLocaleString()}</span>
                         <span className="text-[10px] font-bold text-slate-400 ml-2 uppercase">({s.percent})</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Recent Properties Table */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Recent Properties</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline uppercase">View All</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                 <thead>
                    <tr className="text-slate-400 text-[10px] font-bold uppercase border-b border-slate-50">
                       <th className="pb-6">Property Name</th>
                       <th className="pb-6">Owner Identity</th>
                       <th className="pb-6">Geographic Loc.</th>
                       <th className="pb-6 text-center">Status</th>
                       <th className="pb-6 text-right">Date Added</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {recentProperties.map(prop => (
                      <tr key={prop.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                         <td className="py-5">
                            <div className="flex items-center gap-4">
                               <img src={prop.img} alt={prop.title} className="w-12 h-12 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                               <span className="text-sm font-bold text-slate-800 truncate">{prop.title}</span>
                            </div>
                         </td>
                         <td className="py-5">
                            <p className="text-xs font-bold text-slate-600">{prop.owner}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Reg. Owner</p>
                         </td>
                         <td className="py-5">
                            <p className="text-xs font-bold text-slate-600">{prop.location}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Primary Zone</p>
                         </td>
                         <td className="py-5 text-center">
                            <span className={cn(
                               "text-[9px] font-bold px-3 py-1 rounded-lg border uppercase shadow-sm",
                               prop.status === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                               prop.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-rose-50 text-rose-600 border-rose-100"
                            )}>
                               {prop.status}
                            </span>
                         </td>
                         <td className="py-5 text-right">
                            <p className="text-xs font-bold text-slate-800">{prop.date}</p>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* Strategic Action Suite */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
         <ActionCardLarge icon={PlusCircle} label="Add Properties" sub="Add new properties to platform" count="142" foot="Added this month" color="blue" btnText="Add New Property" />
         <ActionCardLarge icon={CheckCircle2} label="Approve / Reject" sub="Review submitted properties" count="324" foot="Pending review" color="green" btnText="Review Now" />
         <ActionCardLarge icon={Clock} label="Pending Properties" sub="Waiting for approval" count="324" foot="Pending approval" color="orange" btnText="View Pending" />
         <ActionCardLarge icon={LayoutGrid} label="All Properties" sub="View and manage all properties" count="2,340" foot="Total properties" color="purple" btnText="View All Properties" />
         <ActionCardLarge icon={Users} label="Online Leads" sub="Manage incoming leads" count="1,256" foot="Total leads" color="teal" btnText="View Online Leads" />
      </div>
    </div>
  );
}

function StatCardLarge({ icon: Icon, color, label, value, trend, up }) {
  const colors = {
    blue: "bg-blue-600 shadow-blue-200",
    green: "bg-emerald-600 shadow-emerald-200",
    orange: "bg-amber-600 shadow-amber-200",
    red: "bg-rose-600 shadow-rose-200",
    purple: "bg-purple-600 shadow-purple-200",
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-8 group hover:translate-y-[-8px] transition-all duration-500">
      <div className={cn("w-20 h-20 rounded-[1.75rem] flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-6", colors[color])}>
         <Icon className="w-10 h-10" />
      </div>
      <div>
         <p className="text-[11px] font-bold text-slate-400 uppercase mb-4 leading-none truncate">{label}</p>
         <p className="text-5xl font-bold text-slate-800 tracking-tighter leading-none">{value}</p>
      </div>
      <div className={cn(
        "flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-2xl w-fit",
        up ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : "text-rose-600 bg-rose-50 border border-rose-100"
      )}>
         {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
         {trend.split(' ')[1]}
      </div>
    </div>
  );
}

function ActionCardLarge({ icon: Icon, label, sub, count, foot, color, btnText }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
    green: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
    orange: "bg-amber-50 text-amber-600 group-hover:bg-amber-600",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
    teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-600",
  };
  
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group cursor-pointer transition-all hover:translate-y-[-8px]">
       <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:text-white group-hover:scale-110", colors[color])}>
          <Icon className="w-8 h-8" />
       </div>
       <h4 className="text-base font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{label}</h4>
       <p className="text-[10px] text-slate-400 font-bold uppercase mb-8 opacity-70 group-hover:opacity-100">{sub}</p>
       
       <div className="mt-auto flex flex-col items-center">
          <p className="text-3xl font-bold text-slate-800 leading-none mb-2">{count}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">{foot}</p>
       </div>
       
       <button className="mt-8 flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          {btnText} <ArrowUpRight className="w-4 h-4" />
       </button>
    </div>
  );
}
