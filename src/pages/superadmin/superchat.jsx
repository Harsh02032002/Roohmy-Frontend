import React from "react";
import { 
  MessageSquare, MessageCircle, UserPlus, CheckCircle2, 
  XCircle, AlertCircle, Clock, Search, MoreVertical,
  ChevronRight, Calendar, Filter, Send, Paperclip,
  Smile, Phone, Mail, Globe, Target, User,
  MoreHorizontal, Star, TrendingUp, Zap, BarChart,
  ShieldAlert, Settings, LayoutGrid, ArrowUpRight, 
  ArrowDownRight
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- EXACT DATA FROM CHAT DASHBOARD SCREENSHOT ---

const chatStatusData = [
  { name: "Open", value: 128, color: "#3B82F6", percent: "32.4%" },
  { name: "Closed", value: 235, color: "#10B981", percent: "59.5%" },
  { name: "Pending", value: 32, color: "#F59E0B", percent: "8.1%" },
];

const channelData = [
  { name: "Website", value: 210, color: "#3B82F6", percent: "53%" },
  { name: "Mobile App", value: 120, color: "#10B981", percent: "30%" },
  { name: "WhatsApp", value: 45, color: "#F59E0B", percent: "11%" },
  { name: "Others", value: 20, color: "#6366F1", percent: "6%" },
];

const responseTimeTrend = [
  { name: "Mon", time: 100 },
  { name: "Tue", time: 90 },
  { name: "Wed", time: 95 },
  { name: "Thu", time: 85 },
  { name: "Fri", time: 92 },
  { name: "Sat", time: 88 },
  { name: "Sun", time: 80 },
];

const chatList = [
  { name: "Rohit Sharma", msg: "Hi, I'm interested in 2BHK in Andheri West.", time: "10:30 AM", unread: 2, location: "Andheri West, Mumbai", initial: "RS", color: "bg-blue-50 text-blue-600", active: true },
  { name: "Priya Mehta", msg: "Is the property available for rent?", time: "10:28 AM", unread: 1, location: "Koramangala, Bangalore", initial: "PM", color: "bg-emerald-50 text-emerald-600" },
  { name: "Amit Patel", msg: "What is the deposit amount?", time: "10:25 AM", unread: 0, location: "Viman Nagar, Pune", initial: "AP", color: "bg-blue-50 text-blue-600" },
  { name: "Neha Singh", msg: "Can I schedule a visit tomorrow?", time: "10:21 AM", unread: 3, location: "Banjara Hills, Hyderabad", initial: "NS", color: "bg-blue-50 text-blue-600" },
  { name: "Vikram Joshi", msg: "Do you have fully furnished options?", time: "10:18 AM", unread: 0, location: "Sector 62, Noida", initial: "VJ", color: "bg-emerald-50 text-emerald-600" },
];

const topAgents = [
  { name: "Neha Verma", chats: 128, avatar: "https://i.pravatar.cc/150?u=neha" },
  { name: "Rahul Singh", chats: 104, avatar: "https://i.pravatar.cc/150?u=rahul" },
  { name: "Priya Nair", chats: 87, avatar: "https://i.pravatar.cc/150?u=priya" },
];

export default function ChatDashboard() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-full font-inter overflow-x-hidden">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Chat Dashboard</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Monitor and manage all conversations in real-time.</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
               <Calendar className="w-4 h-4 text-slate-400" />
               <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">May 22 - May 28, 2024</span>
            </div>
         </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
         <StatCardSmall label="Active Conversations" value="128" trend="12.5%" up icon={MessageCircle} color="blue" />
         <StatCardSmall label="New Messages" value="1,248" trend="18.7%" up icon={Zap} color="purple" />
         <StatCardSmall label="Unassigned Chats" value="32" trend="8.2%" up icon={Clock} color="rose" />
         <StatCardSmall label="Closed Conversations" value="235" trend="15.3%" up icon={CheckCircle2} color="emerald" />
         <StatCardSmall label="Violations Detected" value="14" trend="7.1%" up icon={ShieldAlert} color="rose" />
      </div>

      <div className="grid grid-cols-12 gap-6 h-[800px] mb-8">
         {/* Left: Chat List */}
         <div className="col-span-12 lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-50">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Live Conversations</h3>
                  <div className="flex items-center gap-2">
                     <button className="p-1.5 text-slate-400 hover:text-slate-900"><Filter size={16}/></button>
                     <button className="p-1.5 text-slate-400 hover:text-slate-900"><MoreVertical size={16}/></button>
                  </div>
               </div>
               <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 group focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                  <Search size={16} className="text-slate-400" />
                  <input type="text" placeholder="Search conversations..." className="bg-transparent border-none outline-none text-xs font-medium ml-3 w-full" />
               </div>
            </div>
            <div className="flex items-center px-4 py-3 gap-4 border-b border-slate-50 bg-slate-50/30 overflow-x-auto custom-scrollbar no-scrollbar">
               <TabItem label="All" count={128} active />
               <TabItem label="Unassigned" count={32} />
               <TabItem label="Mine" count={18} />
               <TabItem label="Closed" />
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
               {chatList.map((chat, i) => (
                  <div key={i} className={cn(
                     "flex items-center gap-4 p-5 cursor-pointer border-b border-slate-50 transition-all",
                     chat.active ? "bg-blue-50/50 border-l-4 border-l-blue-600" : "hover:bg-slate-50"
                  )}>
                     <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shadow-sm shrink-0", chat.color)}>
                        {chat.initial}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <p className={cn("text-xs font-black truncate", chat.active ? "text-blue-600" : "text-slate-900")}>{chat.name}</p>
                           <span className="text-[10px] font-bold text-slate-400">{chat.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate leading-relaxed">{chat.msg}</p>
                        <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase tracking-wider">@ {chat.location}</p>
                     </div>
                     {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg shadow-blue-600/20">
                           {chat.unread}
                        </div>
                     )}
                  </div>
               ))}
               <button className="w-full py-4 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:bg-slate-50 transition-colors">
                  Load More Conversations
               </button>
            </div>
         </div>

         {/* Center: Chat Window */}
         <div className="col-span-12 lg:col-span-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">R</div>
                  <div>
                     <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-slate-900">Rohit Sharma</h3>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-bold uppercase tracking-wider">Active</span>
                     </div>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Andheri West, Mumbai</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"><Star size={18}/></button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform">Assign</button>
                  <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"><MoreHorizontal size={18}/></button>
               </div>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto bg-slate-50/30 space-y-8 custom-scrollbar">
               <div className="flex flex-col items-center">
                  <span className="px-4 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">May 28, 2024</span>
               </div>

               <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 shrink-0"></div>
                  <div className="max-w-[80%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                     <p className="text-xs text-slate-700 leading-relaxed">Hi, I'm interested in 2BHK in Andheri West.</p>
                     <p className="text-[9px] text-slate-300 font-bold mt-2">10:30 AM</p>
                  </div>
               </div>

               <div className="flex items-start gap-4 justify-end">
                  <div className="max-w-[80%] bg-blue-600 p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-600/10">
                     <p className="text-xs text-white leading-relaxed">Hello Rohit! 👋<br/>We have several 2BHK options available in Andheri West. What is your preferred budget range?</p>
                     <p className="text-[9px] text-white/60 font-bold mt-2 text-right">10:31 AM ✓✓</p>
                  </div>
               </div>

               <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 shrink-0"></div>
                  <div className="max-w-[80%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                     <p className="text-xs text-slate-700 leading-relaxed">Budget is around 45K - 50K.</p>
                     <p className="text-[9px] text-slate-300 font-bold mt-2">10:32 AM</p>
                  </div>
               </div>

               <div className="flex items-start gap-4 justify-end">
                  <div className="max-w-[80%] bg-white p-4 rounded-3xl border border-slate-100 shadow-md">
                     <div className="flex gap-4">
                        <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200" className="w-24 h-24 rounded-2xl object-cover" alt="" />
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-bold text-slate-900 truncate">2 BHK Apartment</h4>
                           <p className="text-[10px] text-slate-400 font-medium mt-1">Andheri West, Mumbai</p>
                           <p className="text-sm font-black text-blue-600 mt-2">₹48,000 / month</p>
                           <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-bold uppercase">
                              <span className="flex items-center gap-1">2 Beds</span>
                              <span className="flex items-center gap-1">2 Baths</span>
                              <span className="flex items-center gap-1">950 sq.ft</span>
                           </div>
                        </div>
                     </div>
                     <button className="w-full mt-4 py-2 bg-slate-50 text-blue-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">View Details</button>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-white border-t border-slate-50">
               <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                  <Smile size={20} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
                  <Paperclip size={20} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
                  <input type="text" placeholder="Type a message..." className="bg-transparent border-none outline-none text-sm font-medium flex-1 mx-2" />
                  <button className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:scale-110 transition-transform">
                     <Send size={18} />
                  </button>
               </div>
            </div>
         </div>

         {/* Right: Info Column */}
         <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Conversation Info */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Conversation Info</h3>
               <div className="space-y-5">
                  <InfoItem label="Lead Name" value="Rohit Sharma" />
                  <InfoItem label="Phone" value="+91 98765 43210" isIcon icon={Phone} />
                  <InfoItem label="Email" value="rohit.sharma@email.com" isIcon icon={Mail} />
                  <InfoItem label="Source" value="Website" />
                  <InfoItem label="Interested In" value="2 BHK Apartment" />
                  <InfoItem label="Budget" value="₹45,000 - ₹50,000" />
                  <InfoItem label="Status" value="Active" isBadge color="bg-emerald-50 text-emerald-600" />
                  <InfoItem label="Assigned To" value="Neha Verma" />
               </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-3">
                  <ActionButton label="Mark as Closed" color="emerald" />
                  <ActionButton label="Add Note" color="blue" />
                  <ActionButton label="Transfer Chat" color="purple" />
                  <ActionButton label="Report User" color="rose" />
               </div>
            </div>

            {/* Lead Mapping */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Lead → Chat Mapping</h3>
                  <Target size={18} className="text-slate-300" />
               </div>
               <div className="space-y-4">
                  <MappingItem label="Lead ID" value="#LD-2024-5562" />
                  <MappingItem label="Lead Source" value="Website" />
                  <MappingItem label="Created On" value="May 27, 2024, 04:25 PM" />
                  <MappingItem label="Mapped On" value="May 27, 2024, 04:26 PM" />
                  <button className="w-full mt-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline text-left">View Lead Details →</button>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         {/* Conversations by Status */}
         <AnalyticsPieCard title="Conversations by Status" total="395" data={chatStatusData} />
         {/* Conversations by Channel */}
         <AnalyticsPieCard title="Conversations by Channel" total="395" data={channelData} />
         {/* Response Time (Avg.) */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Response Time (Avg.)</h3>
               <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500 outline-none">
                  <option>This Week</option>
               </select>
            </div>
            <div className="mb-6">
               <p className="text-2xl font-black text-slate-900 tracking-tight">1m 32s</p>
               <div className="flex items-center gap-1.5 mt-1">
                  <ArrowDownRight size={14} className="text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-600">18% faster</span>
                  <span className="text-[10px] text-slate-400 font-medium">than last week</span>
               </div>
            </div>
            <div className="flex-1 h-[120px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={responseTimeTrend}>
                     <defs>
                        <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <Tooltip />
                     <Area type="monotone" dataKey="time" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorTime)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
         {/* Top Agents */}
         <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Top Agents (This Week)</h3>
               <TrendingUp size={18} className="text-slate-300" />
            </div>
            <div className="space-y-6">
               {topAgents.map((agent, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                     <span className="text-xs font-bold text-slate-300 w-4">{i + 1}</span>
                     <img src={agent.avatar} className="w-10 h-10 rounded-2xl object-cover transition-transform group-hover:scale-110 shadow-sm" alt="" />
                     <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">{agent.name}</p>
                     </div>
                     <span className="text-xs font-black text-slate-900">{agent.chats}</span>
                  </div>
               ))}
            </div>
         </div>
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
          <span className="text-[10px] text-slate-400 font-medium lowercase">from last week</span>
       </div>
    </div>
  );
}

function TabItem({ label, count, active }) {
  return (
    <button className={cn(
       "whitespace-nowrap px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
       active ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-900"
    )}>
       {label} {count !== undefined && <span className="ml-1 opacity-60">({count})</span>}
    </button>
  );
}

function InfoItem({ label, value, isIcon, icon: Icon, isBadge, color }) {
  return (
    <div className="flex items-center justify-between">
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
       <div className="flex items-center gap-2">
          {isIcon && <Icon size={12} className="text-slate-300" />}
          {isBadge ? (
             <span className={cn("px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider", color)}>{value}</span>
          ) : (
             <span className="text-[12px] font-bold text-slate-900">{value}</span>
          )}
       </div>
    </div>
  );
}

function ActionButton({ label, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white",
    emerald: "text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white",
    purple: "text-purple-600 bg-purple-50 hover:bg-purple-600 hover:text-white",
    rose: "text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white",
  };
  return (
    <button className={cn("py-3 px-1 rounded-2xl text-[9px] font-bold uppercase tracking-tight transition-all", colors[color])}>
       {label}
    </button>
  );
}

function MappingItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
       <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{label}</span>
       <span className="text-[11px] font-bold text-slate-900">{value}</span>
    </div>
  );
}

function AnalyticsPieCard({ title, total, data }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
       <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{title}</h3>
          <BarChart size={18} className="text-slate-300" />
       </div>
       <div className="relative h-40 flex items-center justify-center mb-6">
          <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                <Pie data={data} innerRadius={50} outerRadius={65} paddingAngle={5} dataKey="value" stroke="none">
                   {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
             </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <p className="text-xl font-black text-slate-900">{total}</p>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
          </div>
       </div>
       <div className="space-y-3">
          {data.map((item) => (
             <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
                   <span className="text-[10px] font-bold text-slate-400 uppercase">{item.name}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-900">{item.percent}</span>
             </div>
          ))}
       </div>
    </div>
  );
}
