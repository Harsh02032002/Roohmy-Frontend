import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { resolveSectionFromPath, sharedNavConfig } from "./sharedNavConfig";
import { Sidebar } from "./Sidebar";

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `shared-nav-link${isActive ? " is-active" : ""}`
    }
  >
    {label}
  </NavLink>
);

const SuperadminNavItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `sidebar-link${isActive ? " active" : ""}`
    }
  >
    {icon ? <i data-lucide={icon} className="w-5 h-5 mr-3" /> : null}
    {label}
  </NavLink>
);

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
  const activeSuperadminLabel = useMemo(() => {
    if (!config || section !== "superadmin") return "";
    const match = config.sections
      .flatMap((block) => block.links)
      .find((link) => link.to === location.pathname);
    return match?.label || "Overview";
  }, [config, location.pathname, section]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!window.lucide?.createIcons) return undefined;
    
    // Run lucide once on navigation, and once after a short delay for dynamic content
    window.lucide?.createIcons();
    const t1 = setTimeout(() => window.lucide?.createIcons(), 100);
    const t2 = setTimeout(() => window.lucide?.createIcons(), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
    } else {
      mq.addListener(update);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", update);
      } else {
        mq.removeListener(update);
      }
    };
  }, []);

  useEffect(() => {
    if (section !== "superadmin") return;
    document.body.classList.toggle("superadmin-menu-open", sidebarOpen);
    return () => {
      document.body.classList.remove("superadmin-menu-open");
    };
  }, [section, sidebarOpen]);

  useEffect(() => {
    if (section !== "superadmin") return undefined;
    const handler = (e) => {
      const target = e.target;
      const trigger = target && target.closest ? target.closest("#mobile-menu-open") : null;
      if (!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      setSidebarOpen(true);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [section]);

  if (isEmbed) {
    return <Outlet />;
  }

  // Tenant pages render a full standalone layout. If an older bundle or
  // wrapper path still mounts SharedShell, bypass it completely.
  if (!config) {
    return <div className="shared-shell"><Outlet /></div>;
  }

  if (section === "superadmin") {
    return (
      <div className="shared-shell shared-shell-superadmin flex flex-row h-screen w-full min-w-full overflow-hidden" data-section={section}>

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

        <div className="shared-main">
          <header className="bg-white h-20 flex items-center justify-between px-8 shadow-sm z-20 border-b border-gray-100 sticky top-0 shrink-0">
            <div className="flex items-center gap-4">
              <button
                id="mobile-menu-open"
                className="lg:hidden text-slate-500 p-2 hover:bg-slate-50 rounded-lg"
                type="button"
                onClick={() => setSidebarOpen((open) => !open)}
              >
                <i data-lucide="menu" className="w-6 h-6"></i>
              </button>
              
              {/* Search Bar - Matching Screenshot */}
              <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-80 group focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all">
                <i data-lucide="search" className="w-4 h-4 text-slate-400"></i>
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-600 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <button
                  id="notificationBellBtn"
                  className="relative p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  type="button"
                >
                  <i data-lucide="bell" className="w-5 h-5"></i>
                  <span
                    id="notificationBadge"
                    className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"
                  >
                  </span>
                </button>
              </div>

              {/* User Profile - Matching Screenshot */}
              <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 leading-none">Aman</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Superadmin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-600/20">
                  A
                </div>
              </div>
            </div>
          </header>
          <div className="shared-content overflow-y-auto overflow-x-hidden flex-1 h-full custom-scrollbar">
            <Outlet />
          </div>
        </div>

        {/* Overlay moved to bottom to prevent flex flow issues */}
        <div
          className={`shared-superadmin-overlay${sidebarOpen ? " is-open" : ""}`}
          onClick={() => setSidebarOpen(false)}
          style={isMobile && sidebarOpen ? { display: "block" } : undefined}
        />
      </div>
    );
  }

  return (
    <div className="shared-shell" data-section={section}>
      <aside className={`shared-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="shared-sidebar-header">
          <div className="shared-brand">
            <img
              src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990260/roomhy/website/logoroomhy.png"
              alt="Roomhy"
            />
            <span>{config.title}</span>
          </div>
          <button
            className="shared-sidebar-close"
            type="button"
            onClick={() => setSidebarOpen(false)}
          >
            Close
          </button>
        </div>
        <nav className="shared-nav">
          {config.links.map((link) => (
            <NavItem key={link.to} to={link.to} label={link.label} />
          ))}
        </nav>
      </aside>

      <div className="shared-main">
        <header className="shared-header">
          <button
            className="shared-menu-btn"
            type="button"
            onClick={() => setSidebarOpen(true)}
          >
            Menu
          </button>
          <div className="shared-header-title">{config.title}</div>
          <div className="shared-header-actions">
            <span className="shared-user-pill">Roomhy</span>
          </div>
        </header>
        <div className="shared-content"><Outlet /></div>
      </div>
    </div>
  );
}
