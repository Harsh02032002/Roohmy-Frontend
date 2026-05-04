import React, { useState } from "react";
import { 
  MessageSquare, MessageCircle, UserPlus, CheckCircle2, 
  AlertCircle, Search, Filter, MoreVertical, Phone, 
  Video, Info, Send, Smile, Paperclip, ChevronRight,
  ArrowUpRight, ArrowDownRight, Globe, Smartphone, 
  Laptop, Star, Users, Clock, Zap, ShieldAlert,
  Target, Award, LayoutGrid, Settings, Trash2, 
  UserCheck, ExternalLink, Mail, MapPin, Plus, Image, Box, TrendingUp, Activity
} from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const statusData = [
  { name: "Open", value: 128, color: "#10b981", percent: "32%" },
  { name: "Closed", value: 235, color: "#3b82f6", percent: "59%" },
  { name: "Pending", value: 32, color: "#f59e0b", percent: "9%" },
];

const channelData = [
  { name: "Website", value: 210, color: "#6366f1", percent: "53%" },
  { name: "Mobile App", value: 120, color: "#10b981", percent: "30%" },
  { name: "WhatsApp", value: 45, color: "#25d366", percent: "11%" },
  { name: "Others", value: 20, color: "#94a3b8", percent: "6%" },
];

const responseTimeData = [
  { name: "Mon", v: 45 }, { name: "Tue", v: 52 }, { name: "Wed", v: 38 },
  { name: "Thu", v: 65 }, { name: "Fri", v: 48 }, { name: "Sat", v: 55 },
  { name: "Sun", v: 42 },
];

const conversations = [
  { id: 1, user: "Rohit Sharma", msg: "Hi, I'm interested in 2BHK in Andheri West.", time: "10:30 AM", active: true, unread: 2, status: "Active" },
  { id: 2, user: "Priya Mehta", msg: "Is the property available for rent?", time: "10:28 AM", unread: 1, status: "Active" },
  { id: 3, user: "Amit Patel", msg: "What is the deposit amount?", time: "10:25 AM", status: "Unassigned" },
  { id: 4, user: "Neha Singh", msg: "Can I schedule a visit tomorrow?", time: "10:21 AM", unread: 3, status: "Mine" },
  { id: 5, user: "Vikram Joshi", msg: "Do you have fully furnished options?", time: "10:18 AM", status: "Closed" },
  { id: 6, user: "Sneha Reddy", msg: "I need a property for my family.", time: "10:15 AM", status: "Active" },
];

export default function SuperadminChat() {
  const [tab, setTab] = useState("All");

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Chat Dashboard</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Communications {">"} Hub</p>
         </div>
         <div className="flex items-center gap-4">
            <button className="bg-white border border-slate-100 p-2.5 rounded-xl text-slate-400 hover:text-blue-600 shadow-sm"><Settings className="w-5 h-5" /></button>
            <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-200">New Message</button>
         </div>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
         <StatCard label="Active Conversations" value="128" trend="+ 12.5%" up icon={MessageCircle} color="blue" />
         <StatCard label="New Messages" value="1,248" trend="+ 18.7%" up icon={Zap} color="purple" />
         <StatCard label="Unassigned Chats" value="32" trend="+ 8.2%" up icon={UserPlus} color="rose" />
         <StatCard label="Closed Conversations" value="235" trend="+ 15.3%" up icon={CheckCircle2} color="emerald" />
         <StatCard label="Violations Detected" value="14" trend="+ 7.1%" up icon={ShieldAlert} color="rose" />
      </div>

      {/* Main Chat Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[650px]">
         {/* Left: Chat List */}
         <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-50">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-800">Live Conversations</h3>
                  <div className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-lg shadow-md">128</div>
               </div>
               <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-50 mb-4">
                  {["All", "Unassigned", "Mine", "Closed"].map(t => (
                     <button key={t} onClick={() => setTab(t)} className={cn("whitespace-nowrap px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all", tab === t ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-600")}>{t}</button>
                  ))}
               </div>
               <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input placeholder="Search..." className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-[11px] font-bold outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
               {conversations.map(c => (
                  <div key={c.id} className={cn("p-6 border-b border-slate-50 cursor-pointer transition-all hover:bg-slate-50", c.active && "bg-blue-50/50 border-l-4 border-l-blue-600")}>
                     <div className="flex items-center gap-4">
                        <div className="relative">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 shadow-sm">{c.user.charAt(0)}</div>
                           <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center justify-between mb-0.5">
                              <p className="text-[11px] font-bold text-slate-800 truncate">{c.user}</p>
                              <p className="text-[9px] text-slate-300 font-bold uppercase">{c.time}</p>
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold truncate opacity-80">{c.msg}</p>
                        </div>
                        {c.unread && (
                           <div className="w-5 h-5 bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center rounded-lg shadow-md">{c.unread}</div>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Middle: Chat Window */}
         <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">R</div>
                  <div>
                     <p className="text-sm font-bold text-slate-800">Rohit Sharma</p>
                     <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Online</span>
                     </div>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <button className="p-2.5 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:shadow-md transition-all"><Phone className="w-4 h-4" /></button>
                  <button className="p-2.5 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:shadow-md transition-all"><Video className="w-4 h-4" /></button>
                  <button className="p-2.5 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:shadow-md transition-all"><MoreVertical className="w-4 h-4" /></button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5 custom-scrollbar">
               <div className="text-center"><span className="bg-slate-50 px-4 py-1.5 rounded-full text-[9px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100">May 28, 2024</span></div>
               
               <div className="flex gap-4 max-w-[80%]">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold shrink-0">R</div>
                  <div className="space-y-2">
                     <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                        <p className="text-xs font-bold text-slate-700 leading-relaxed">Hi, I'm interested in 2BHK in Andheri West. What's your best price?</p>
                     </div>
                     <p className="text-[8px] font-bold text-slate-300 uppercase ml-2 tracking-widest">10:30 AM</p>
                  </div>
               </div>

               <div className="flex gap-4 flex-row-reverse max-w-[80%] ml-auto">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-lg">A</div>
                  <div className="space-y-2 text-right">
                     <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-200">
                        <p className="text-xs font-bold leading-relaxed">Hello Rohit! We have several premium 2BHK options available in Andheri West. What is your preferred budget range?</p>
                     </div>
                     <p className="text-[8px] font-bold text-slate-300 uppercase mr-2 tracking-widest">10:31 AM</p>
                  </div>
               </div>

               <div className="flex gap-4 flex-row-reverse max-w-[80%] ml-auto">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-lg">A</div>
                  <div className="space-y-3 text-right">
                     <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xl w-64 ml-auto group cursor-pointer hover:shadow-blue-100 transition-all">
                        <div className="h-32 bg-slate-100 rounded-xl overflow-hidden mb-3">
                           <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <p className="text-[11px] font-bold text-slate-800 mb-0.5 px-1 truncate">Sovereign 2BHK Apartment</p>
                        <p className="text-[10px] font-bold text-blue-600 mb-3 px-1 tracking-tighter">₹48,000 / month</p>
                        <div className="flex items-center justify-between px-1 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                           <span className="flex items-center gap-1"><LayoutGrid className="w-3 h-3" /> 2 Beds</span>
                           <span className="flex items-center gap-1"><Box className="w-3 h-3" /> 2 Baths</span>
                           <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 950 sq.ft</span>
                        </div>
                     </div>
                     <p className="text-[8px] font-bold text-slate-300 uppercase mr-2 tracking-widest">10:33 AM</p>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-slate-50">
               <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 group focus-within:ring-2 focus-within:ring-blue-100 transition-all border border-slate-100">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors"><Smile className="w-5 h-5" /></button>
                  <button className="text-slate-400 hover:text-blue-600 transition-colors"><Paperclip className="w-5 h-5" /></button>
                  <input placeholder="Type a message..." className="flex-1 bg-transparent border-none outline-none text-[11px] font-bold text-slate-700" />
                  <button className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 hover:scale-105 hover:bg-blue-700 transition-all"><Send className="w-5 h-5" /></button>
               </div>
            </div>
         </div>

         {/* Right: Info Panel */}
         <div className="lg:col-span-3 space-y-8 overflow-y-auto custom-scrollbar">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/40">
               <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2"><Info className="w-4 h-4 text-blue-500" /> Lead Information</h3>
               <div className="space-y-4">
                  <InfoRow label="Name" value="Rohit Sharma" />
                  <InfoRow label="Phone" value="+91 98765 43210" />
                  <InfoRow label="Source" value="Website" />
                  <InfoRow label="Interest" value="2 BHK" />
                  <InfoRow label="Budget" value="₹45K - ₹50K" />
                  <InfoRow label="Status" value="Active" statusColor="emerald" />
                  <InfoRow label="Agent" value="Neha Verma" />
               </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/40">
               <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-3">
                  <ActionButton label="Close Chat" color="emerald" />
                  <ActionButton label="Add Note" color="blue" />
                  <ActionButton label="Transfer" color="purple" />
                  <ActionButton label="Report" color="rose" />
               </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-20 -mr-16 -mt-16 group-hover:opacity-40 transition-opacity"></div>
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold">Metadata</h3>
                     <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-all"><ExternalLink className="w-4 h-4" /></div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lead ID</span>
                        <span className="text-xs font-bold">#LD-2024-5562</span>
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 leading-relaxed opacity-80">Customer is looking for immediate possession in Andheri West area.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Bottom Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-sm font-bold text-slate-800 mb-6">Status Distribution</h3>
            <div className="flex items-center gap-6">
               <div className="relative w-28 h-28 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={statusData} innerRadius={40} outerRadius={55} paddingAngle={5} dataKey="value" stroke="none">
                           {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <p className="text-xl font-bold text-slate-800 tracking-tighter leading-none">395</p>
                     <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mt-1">Total</p>
                  </div>
               </div>
               <div className="flex-1 space-y-3">
                  {statusData.map((d, i) => (
                     <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-800 transition-colors leading-none">{d.name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 leading-none">{d.value}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-sm font-bold text-slate-800 mb-6">By Channel</h3>
            <div className="flex items-center gap-6">
               <div className="relative w-28 h-28 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={channelData} innerRadius={40} outerRadius={55} paddingAngle={5} dataKey="value" stroke="none">
                           {channelData.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <Activity className="w-6 h-6 text-slate-100" />
                  </div>
               </div>
               <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[112px] custom-scrollbar pr-2">
                  {channelData.map((d, i) => (
                     <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-800 transition-colors truncate max-w-[50px]">{d.name}</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-800 leading-none">{d.percent}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-bold text-slate-800">Response Time</h3>
               <div className="flex items-center gap-1.5">
                  <p className="text-lg font-bold text-slate-800 tracking-tighter">1m 32s</p>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shadow-sm border border-emerald-100">18% ↓</span>
               </div>
            </div>
            <div className="flex-1 min-h-[100px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={responseTimeData}>
                     <Area type="monotone" dataKey="v" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center justify-center">
            <h3 className="text-sm font-bold text-slate-800 mb-6 w-full text-left">Satisfaction Score</h3>
            <div className="flex flex-col items-center gap-4">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-xl shadow-amber-50 border border-amber-100">
                     <Star className="w-7 h-7 fill-amber-500" />
                  </div>
                  <div>
                     <p className="text-3xl font-black text-slate-800 tracking-tighter">4.6 / 5</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 opacity-70">Weekly Avg</p>
                  </div>
               </div>
               <div className="flex items-center gap-2 text-emerald-600 text-[9px] font-bold uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-xl border border-emerald-100 shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5" /> 12% increase
               </div>
            </div>
         </div>
      </div>
      
      {/* Agents Performance Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
         <div className="lg:col-span-9 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">Top Performance Agents</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Agents with highest engagement rates</p>
               </div>
               <button className="text-blue-600 text-[10px] font-bold uppercase hover:underline flex items-center gap-2">Full Reports <ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <AgentRow name="Neha Verma" value="128" color="emerald" rank="#1" />
               <AgentRow name="Rahul Singh" value="104" color="blue" rank="#2" />
               <AgentRow name="Priya Nair" value="87" color="purple" rank="#3" />
            </div>
         </div>
         <div className="lg:col-span-3 bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden group shadow-xl shadow-blue-200">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-[100px] opacity-20 -mr-24 -mt-24"></div>
            <div className="relative z-10">
               <h3 className="text-xl font-black mb-4 tracking-tight leading-tight">Need Platform Help?</h3>
               <p className="text-[11px] font-bold text-blue-100 leading-relaxed mb-10 opacity-80 uppercase tracking-widest">Connect with technical support for administrative tools assistant.</p>
            </div>
            <button className="w-full py-4 bg-white text-blue-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
               <MessageSquare className="w-4 h-4" /> Open Support
            </button>
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, up, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
    rose: "text-rose-600 bg-rose-50 border-rose-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
  };
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 group hover:translate-y-[-5px] transition-all duration-500">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm border", colors[color])}>
          <Icon className="w-6 h-6" />
       </div>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 leading-tight">{label}</p>
       <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-slate-800 tracking-tighter leading-none">{value}</p>
          <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest flex items-center gap-1", up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
             {trend} {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          </span>
       </div>
    </div>
  );
}

function InfoRow({ label, value, statusColor }) {
  return (
    <div className="flex items-center justify-between group">
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-800 transition-colors">{label}</span>
       <span className={cn(
         "text-[11px] font-bold text-slate-800",
         statusColor === "emerald" && "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 shadow-sm"
       )}>{value}</span>
    </div>
  );
}

function ActionButton({ label, color }) {
  const colors = {
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-600 hover:text-white",
    blue: "text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-600 hover:text-white",
    purple: "text-purple-600 bg-purple-50 border-purple-100 hover:bg-purple-600 hover:text-white",
    rose: "text-rose-600 bg-rose-50 border-rose-100 hover:bg-rose-600 hover:text-white",
  };
  return (
    <button className={cn("w-full py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest border shadow-sm transition-all", colors[color])}>
       {label}
    </button>
  );
}

function AgentRow({ name, value, color, rank }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };
  return (
    <div className="flex items-center gap-4 group p-3 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500">
       <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-500 font-bold shadow-sm group-hover:scale-110 transition-all text-lg border border-slate-50">
             {name.charAt(0)}
          </div>
          <div className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-lg">{rank}</div>
       </div>
       <div className="flex-1">
          <p className="text-[13px] font-bold text-slate-800 tracking-tight">{name}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Performance Hub</p>
       </div>
       <div className={cn("px-4 py-1.5 rounded-xl text-xs font-bold shadow-sm border", colors[color])}>{value}</div>
    </div>
  );
}
