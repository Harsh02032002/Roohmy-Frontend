import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { resolveSectionFromPath, sharedNavConfig } from "./sharedNavConfig";
import { Menu, Search, Bell, ChevronRight, X } from "lucide-react";
import { Sidebar } from "./Sidebar";

export default function SharedShell() {
  const location = useLocation();
  const pathName = location.pathname || "";
  const isEmbed = useMemo(() => {
    try {
      return new URLSearchParams(location.search || "").get("embed") === "1";
    } catch (e) {
      return false;
    }
  }, [location.search]);
  const section = useMemo(
    () => resolveSectionFromPath(location.pathname),
    [location.pathname]
  );
  const config = section ? sharedNavConfig[section] : null;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1024px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isEmbed) return <Outlet />;
  if (!config) return <div className="shared-shell"><Outlet /></div>;

  if (section === "superadmin") {
    return (
      <div className="flex h-screen w-full bg-white overflow-hidden font-inter">
        <Sidebar 
          open={sidebarOpen} 
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)} 
          onLogout={() => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/superadmin/index";
          }}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Global Header - Screenshot Perfect */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-30 shrink-0">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              
              {/* Search Matrix */}
              <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-96 group focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500 transition-all">
                <Search size={18} className="text-slate-400 group-focus-within:text-blue-600" />
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="bg-transparent border-none outline-none text-sm font-medium ml-3 w-full text-slate-700 placeholder:text-slate-400"
                />
                <span className="text-[10px] font-bold text-slate-300 border border-slate-100 px-1.5 py-0.5 rounded-lg ml-2">Ctrl + K</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group">
                  <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                  <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
                </button>
              </div>

              {/* Profile Identity - Screenshot Style */}
              <div className="flex items-center gap-4 pl-6 border-l border-slate-100 group cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-blue-600 transition-colors">Aman</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest opacity-60">Superadmin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                  A
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <Outlet />
          </main>
        </div>

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    );
  }

  // Fallback for other sections
  return (
    <div className="shared-shell h-screen flex overflow-hidden">
      <aside className={`w-64 bg-slate-900 text-white shrink-0 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:relative z-50 h-full`}>
        <div className="p-6 text-xl font-bold border-b border-white/10">{config.title}</div>
        <nav className="p-4 space-y-1">
          {config.links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `block px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
