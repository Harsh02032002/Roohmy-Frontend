import React, { useState } from "react";
import { 
  LayoutDashboard, Building2, Users, IndianRupee, 
  BarChart3, Settings, Bell, Search, Menu, 
  LogOut, Wallet, Calendar, FileText, TrendingUp,
  AlertCircle, Star, Crown, ChevronRight, Sparkles
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function OwnerLayout({ children, title, subtitle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const NAV_ITEMS = [
    { label: "Dashboard", icon: BarChart3, path: "/hostelowner" },
    { label: "My Properties", icon: Building2, path: "/hostelowner/properties" },
    { label: "Staff Management", icon: Users, path: "/hostelowner/staff" },
    { label: "Expense Tracker", icon: Wallet, path: "/hostelowner/expenses" },
    { label: "Rent Collections", icon: IndianRupee, path: "/hostelowner/rent" },
    { label: "Booking Requests", icon: Calendar, path: "/hostelowner/bookings" },
    { label: "Complaints", icon: AlertCircle, path: "/hostelowner/complaints" },
    { label: "Reviews", icon: Star, path: "/hostelowner/reviews" },
    { label: "Financial Reports", icon: FileText, path: "/hostelowner/reports" },
  ];

  return (
    <div className="flex min-h-screen bg-white font-['Plus_Jakarta_Sans'] overflow-hidden">
      {/* Premium Dark Sidebar */}
      <aside className={cn(
        "bg-[#0F172A] border-r border-white/5 text-slate-400 flex flex-col z-50 shrink-0 transition-all duration-700 ease-in-out fixed lg:relative h-screen",
        sidebarOpen ? "w-80" : "w-0 lg:w-28 -translate-x-full lg:translate-x-0"
      )}>
        {/* Brand Area */}
        <div className="p-8 flex items-center gap-4 shrink-0 overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 relative group cursor-pointer hover:rotate-6 transition-transform">
             <Crown size={24} className="drop-shadow-sm" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <h1 className="text-xl font-black text-white tracking-tighter leading-none italic">ROOHMY</h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] italic">Owner Elite</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-1 custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-500 group relative",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={20} className={cn("transition-all duration-500", isActive ? "scale-110" : "text-slate-500 group-hover:text-slate-300")} />
                {sidebarOpen && <span className={cn("text-[11px] font-black uppercase tracking-widest transition-all duration-500 italic", isActive ? "translate-x-1" : "group-hover:translate-x-1")}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Profile Card Bottom */}
        <div className="p-6 mt-auto shrink-0 overflow-hidden">
          <div className="bg-white/5 rounded-[2rem] p-4 border border-white/5 relative group cursor-pointer hover:bg-white/10 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm italic">
                HO
              </div>
              {sidebarOpen && (
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black text-white truncate italic leading-none mb-1.5">Hostel Owner</p>
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-400 font-black truncate uppercase tracking-widest italic leading-none">owner@roomhy.com</p>
                    <p className="text-[9px] text-slate-500 font-black truncate uppercase tracking-widest italic leading-none opacity-60">Member Since: Mar 2026</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Experience */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* High-End Header - Compact */}
        <header className="h-16 bg-white/80 backdrop-blur-3xl border-b border-slate-50 flex items-center justify-between px-8 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-10 h-10 bg-slate-50 hover:bg-slate-100 flex items-center justify-center rounded-xl transition-all border border-slate-100 group">
              <Menu size={18} className="text-slate-900 group-hover:rotate-90 transition-transform" />
            </button>
            <div className="relative hidden lg:block group ml-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="Search portfolio..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 transition-all w-80 shadow-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <HeaderAction icon={Bell} dot />
             <HeaderAction icon={Settings} />
             <div className="w-10 h-10 rounded-xl bg-indigo-50 p-0.5 border border-indigo-100 shadow-sm cursor-pointer hover:scale-105 transition-transform active:scale-95 ml-2">
                <div className="w-full h-full rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm italic">
                   HO
                </div>
             </div>
          </div>
        </header>

        {/* Content Flow - Compact Padding */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
          <div className="max-w-[1500px] mx-auto animate-in fade-in duration-1000 slide-in-from-bottom-2">
            {/* Page Title & Subtitle Section */}
            {title && (
              <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic mb-2">{title}</h1>
                {subtitle && <p className="text-sm font-bold text-slate-400 italic uppercase tracking-wider">{subtitle}</p>}
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function HeaderAction({ icon: Icon, dot }) {
  return (
    <button className="w-10 h-10 bg-slate-50 hover:bg-white hover:shadow-md hover:shadow-indigo-50 flex items-center justify-center rounded-xl transition-all border border-slate-100 relative group active:scale-90">
      <Icon size={18} className="text-slate-500 group-hover:text-indigo-600 transition-colors" />
      {dot && (
        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white"></span>
      )}
    </button>
  );
}
