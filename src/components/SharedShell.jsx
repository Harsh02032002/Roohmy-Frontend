import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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

export default function SharedShell({ children }) {
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
    if (window.lucide?.createIcons) {
      window.lucide.createIcons();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 980px)");
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
    return <>{children}</>;
  }

  // Tenant pages render a full standalone layout. If an older bundle or
  // wrapper path still mounts SharedShell, bypass it completely.
  if (!config) {
    return <div className="shared-shell">{children}</div>;
  }

  if (section === "superadmin") {
    return (
      <div className="shared-shell shared-shell-superadmin" data-section={section}>
        <div
          className={`shared-superadmin-overlay${sidebarOpen ? " is-open" : ""}`}
          onClick={() => setSidebarOpen(false)}
          style={isMobile && sidebarOpen ? { display: "block" } : undefined}
        />
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          onLogout={() => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/superadmin/index";
          }}
        />

        <div className="shared-main">
          <header className="bg-white h-16 flex items-center justify-between px-6 shadow-sm z-10 border-b border-gray-200">
            <button
              id="mobile-menu-open"
              className="md:hidden mr-4 text-slate-500"
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
            >
              &#9776;
            </button>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                Superadmin <span className="text-gray-400">/</span>
                <span className="text-purple-600">{activeSuperadminLabel}</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  id="notificationBellBtn"
                  className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-lg transition-colors"
                  type="button"
                >
                  <i data-lucide="bell" className="w-5 h-5"></i>
                  <span
                    id="notificationBadge"
                    className="hidden absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    0
                  </span>
                </button>
              </div>
              <span className="w-8 h-8 rounded-full border border-slate-200 bg-purple-600 text-white flex items-center justify-center font-bold">
                SA
              </span>
            </div>
          </header>
          <div className="shared-content">{children}</div>
        </div>
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
        <div className="shared-content">{children}</div>
      </div>
    </div>
  );
}
