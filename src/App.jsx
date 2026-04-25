import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { TranslationProvider } from './contexts/TranslationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import routes from "./routes";
import { getOwnerSession } from "./utils/ownerSession";
import SharedShell from "./components/SharedShell";

const PageLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center px-4 py-12 text-sm text-slate-500">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
      <p className="font-bold tracking-widest uppercase text-[10px]">Loading Roomhy...</p>
    </div>
  </div>
);

const resolveHostHome = () => {
  if (typeof window === "undefined") return "/website/index";
  const host = (window.location.hostname || "").toLowerCase();

  const readStoredUser = () => {
    const keys = ["manager_user", "staff_user", "user"];
    for (const key of keys) {
      try {
        const sessionValue = sessionStorage.getItem(key);
        if (sessionValue) return JSON.parse(sessionValue);
      } catch (_) {
        // ignore bad storage values
      }
      try {
        const localValue = localStorage.getItem(key);
        if (localValue) return JSON.parse(localValue);
      } catch (_) {
        // ignore bad storage values
      }
    }
    return null;
  };

  const staffUser = readStoredUser();
  const role = String(staffUser?.role || "").toLowerCase();
  const owner = getOwnerSession();

  if (host === "admin.roomhy.com" || host === "www.admin.roomhy.com") {
    if (role === "superadmin" || role === "admin") return "/superadmin/superadmin";
    if (role === "areamanager" || role === "manager" || role === "employee") return "/employee/areaadmin";
    return "/superadmin/index";
  }
  if (host === "app.roomhy.com" || host === "www.app.roomhy.com") {
    if (owner?.loginId) return "/propertyowner/admin";
    return "/propertyowner/index";
  }
  return "/website/index";
};

const HtmlRedirectOrHome = () => {
  const location = useLocation();
  const path = location.pathname || "";
  if (path.endsWith(".html")) {
    const clean = path.replace(/\.html$/i, "");
    return <Navigate to={clean || "/"} replace />;
  }
  return <Navigate to={resolveHostHome()} replace />;
};

const RouteChromeCleanup = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "";
    if (!path.startsWith("/tenant/")) return;

    const cleanup = () => {
      document.querySelectorAll(".shared-shell").forEach((shell) => {
        shell.querySelectorAll(".shared-sidebar, .shared-header").forEach((node) => node.remove());

        const content = shell.querySelector(".shared-content");
        if (content) {
          content.style.padding = "0";
          content.style.minHeight = "100vh";
        }

        shell.setAttribute("data-tenant-cleanup", "1");
        shell.style.display = "block";
        shell.style.background = "transparent";
        shell.style.minHeight = "auto";
      });
    };

    cleanup();
    const timer = window.setTimeout(cleanup, 50);
    const observer = new MutationObserver(() => cleanup());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default function App() {
  // Categorize routes for nested layout
  const shellRoutes = routes.filter(r => {
    const isSuperadmin = r.path.startsWith("/superadmin/") && r.path !== "/superadmin/index";
    const isEmployee = r.path.startsWith("/employee/") && r.path !== "/employee/index";
    const isOwner = r.path.startsWith("/propertyowner/") && !["/propertyowner/index", "/propertyowner/ownerlogin"].includes(r.path);
    const isTenant = r.path.startsWith("/tenant/") && r.path !== "/tenant/tenantlogin";
    return isSuperadmin || isEmployee || isOwner || isTenant;
  });

  const standaloneRoutes = routes.filter(r => !shellRoutes.find(sr => sr.path === r.path));

  return (
    <AuthProvider>
      <TranslationProvider>
        <ThemeProvider>
          <Router>
            <RouteChromeCleanup />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Routes wrapped in SharedShell Layout */}
                <Route element={<SharedShell />}>
                  {shellRoutes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                </Route>

                {/* Standalone routes (Login pages, website, etc.) */}
                {standaloneRoutes.map(route => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}

                <Route path="/" element={<Navigate to={resolveHostHome()} replace />} />
                <Route path="/superadmin" element={<Navigate to="/superadmin/index" replace />} />
                <Route path="/employee" element={<Navigate to="/employee/areaadmin" replace />} />
                <Route path="/employee/superadmin" element={<Navigate to="/employee/areaadmin" replace />} />
                <Route path="/propertyowner" element={<Navigate to="/propertyowner/index" replace />} />
                <Route path="/website" element={<Navigate to="/website/index" replace />} />
                <Route path="*" element={<HtmlRedirectOrHome />} />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </TranslationProvider>
    </AuthProvider>
  );
}
