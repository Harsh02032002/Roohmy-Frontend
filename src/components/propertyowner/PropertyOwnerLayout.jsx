import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BedDouble, 
  ClipboardList, 
  CalendarCheck, 
  MessageCircle, 
  User, 
  Settings, 
  CreditCard, 
  MapPin, 
  MessageSquare, 
  ChevronDown, 
  UserCircle, 
  LogOut, 
  Home, 
  X, 
  Plus, 
  Menu, 
  Bell, 
  Settings2,
  Search
} from "lucide-react";

const DEFAULT_DESKTOP_ITEMS = [
  { href: "/propertyowner/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/propertyowner/rooms", label: "Rooms", icon: BedDouble },
  { href: "/propertyowner/tenantrec", label: "Tenant Records", icon: ClipboardList },
  { href: "/propertyowner/booking_request", label: "Booking Requests", icon: CalendarCheck },
  { href: "/propertyowner/ownerchat", label: "Chat", icon: MessageCircle },
  { href: "/propertyowner/ownerprofile", label: "Profile", icon: User },
  { href: "/propertyowner/settings", label: "Settings", icon: Settings }
];

const FULL_NAV_ITEMS = [
  { href: "/propertyowner/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/propertyowner/rooms", label: "Rooms", icon: BedDouble },
  { href: "/propertyowner/tenantrec", label: "Tenant Records", icon: ClipboardList },
  { href: "/propertyowner/payment", label: "Payments", icon: CreditCard },
  { href: "/propertyowner/booking_request", label: "Booking Requests", icon: CalendarCheck },
  { href: "/propertyowner/ownerchat", label: "Chat", icon: MessageCircle },
  { href: "/propertyowner/location", label: "Location", icon: MapPin },
  { href: "/propertyowner/ownerprofile", label: "Profile", icon: User },
  { href: "/propertyowner/settings", label: "Settings", icon: Settings }
];

const SETTINGS_DESKTOP_ITEMS = [
  { href: "/propertyowner/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/propertyowner/rooms", label: "Rooms", icon: BedDouble },
  { href: "/propertyowner/tenantrec", label: "Tenant Records", icon: ClipboardList },
  { href: "/propertyowner/payment", label: "Payments", icon: CreditCard },
  { href: "/propertyowner/location", label: "Location", icon: MapPin },
  { href: "#", label: "Chat", icon: MessageSquare, disabled: true },
  { href: "/propertyowner/ownerprofile", label: "Profile", icon: User },
  { href: "/propertyowner/settings", label: "Settings", icon: Settings }
];

const CHAT_DESKTOP_ITEMS = [
  { href: "/propertyowner/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/propertyowner/rooms", label: "Rooms", icon: BedDouble },
  { href: "/propertyowner/tenantrec", label: "Tenant Records", icon: ClipboardList },
  { href: "/propertyowner/payment", label: "Payments", icon: CreditCard },
  { href: "/propertyowner/location", label: "Location", icon: MapPin },
  { href: "/propertyowner/ownerchat", label: "Chat", icon: MessageSquare },
  { href: "/propertyowner/ownerprofile", label: "Profile", icon: User },
  { href: "/propertyowner/settings", label: "Settings", icon: Settings }
];

const isActivePath = (pathname, href) => href !== "#" && (pathname === href || pathname.startsWith(`${href}/`));

const joinClassNames = (...values) => values.filter(Boolean).join(" ");

export function getPropertyOwnerNavConfig(variant = "default") {
  switch (variant) {
    case "full":
      return { desktopItems: FULL_NAV_ITEMS, mobileItems: FULL_NAV_ITEMS };
    case "settings":
      return { desktopItems: SETTINGS_DESKTOP_ITEMS, mobileItems: FULL_NAV_ITEMS };
    case "chat":
      return { desktopItems: CHAT_DESKTOP_ITEMS, mobileItems: CHAT_DESKTOP_ITEMS };
    default:
      return { desktopItems: DEFAULT_DESKTOP_ITEMS, mobileItems: FULL_NAV_ITEMS };
  }
}

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function PropertyOwnerLayout({
  owner,
  title,
  children,
  mainClassName = "flex-1 overflow-y-auto p-6 md:p-8",
  contentClassName = "",
  headerRight = null,
  navVariant = "default",
  headerVariant = "default",
  notificationCount = 0,
  notifications = [],
  showNotificationSettings = false,
  onNotificationSettingsClick,
  onLogout
}) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navConfig = useMemo(() => getPropertyOwnerNavConfig(navVariant), [navVariant]);

  useEffect(() => {
    setMobileOpen(false);
    setNotificationOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const displayName = useMemo(() => owner?.name || owner?.ownerName || "Owner", [owner]);
  const ownerInitial = useMemo(() => String(displayName).charAt(0).toUpperCase() || "O", [displayName]);
  const accountLabel = useMemo(() => (owner?.loginId ? `Account: ${owner.loginId}` : "Property Owner"), [owner]);

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
      return;
    }
    try {
      sessionStorage.removeItem("owner_session");
      localStorage.removeItem("owner_session");
      sessionStorage.removeItem("owner_user");
      localStorage.removeItem("owner_user");
      sessionStorage.removeItem("user");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
    } catch (_) {
      // ignore
    }
    window.location.href = "/propertyowner/ownerlogin";
  };

  const renderNavItem = (item, mobile = false) => {
    const active = isActivePath(pathname, item.href);
    const className = joinClassNames(
      "flex items-center px-6 py-3.5 text-sm font-semibold transition-all duration-200 group relative",
      active 
        ? "text-white bg-teal-600/10" 
        : "text-slate-400 hover:text-white hover:bg-white/5",
      item.disabled && "opacity-30 cursor-not-allowed"
    );

    const activeIndicator = active && (
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
    );

    if (item.disabled) {
      return (
        <div key={`${mobile ? "mobile" : "desktop"}-${item.label}`} className={className}>
          {item.icon && <item.icon className="w-5 h-5 mr-3" />}
          {item.label}
        </div>
      );
    }

    return (
      <Link
        key={`${mobile ? "mobile" : "desktop"}-${item.href}`}
        to={item.href}
        className={className}
      >
        {activeIndicator}
        {item.icon && (
          <item.icon className={joinClassNames(
            "w-5 h-5 mr-3 transition-colors",
            active ? "text-teal-400" : "text-slate-500 group-hover:text-teal-400"
          )} />
        )}
        <span className="flex-1">{item.label}</span>
      </Link>
    );
  };

  const bellButton = (
    <div className="relative">
      <button
        id="notificationBellBtn"
        type="button"
        className={joinClassNames(
          "relative text-slate-400 hover:text-slate-600 transition-colors",
          headerVariant === "default" && "p-2 hover:bg-gray-100 rounded-lg"
        )}
        onClick={() => setNotificationOpen((prev) => !prev)}
      >
        <Bell className="w-5 h-5" />
        {notificationCount > 0 ? (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {notificationCount}
          </span>
        ) : headerVariant === "compact" ? (
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
        ) : null}
      </button>
      <div
        id="notificationDropdown"
        className={joinClassNames(
          "absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 ring-1 ring-black ring-opacity-5 z-50",
          notificationOpen ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
        </div>
        <div id="notificationList" className="max-h-96 overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-400">
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((item, index) => (
              <div key={`${item.title || item.message || "notification"}-${index}`} className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                <p className="text-sm font-bold text-gray-800">{item.title || item.meta?.title || (item.type ? item.type.replace(/_/g, ' ').toUpperCase() : "Notification")}</p>
                <p className="text-xs text-gray-600 mt-1">{item.message || item.meta?.message || (item.type === 'user_filter_match' ? 'A user is viewing properties matching your profile.' : "New update from system")}</p>
                {item.meta?.chatEnabled && (
                  <div className="mt-3 flex gap-2">
                    <Link 
                      to={`/propertyowner/ownerchat?user=${item.meta?.userLoginId || ''}${item.meta?.bookingId ? `&booking=${item.meta.bookingId}` : ''}`} 
                      className="text-[10px] bg-[#EE4266] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#d63a5b] transition-all flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" /> Enable Chat
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const profileMenu = (
    <div className="relative">
      <button
        type="button"
        className={joinClassNames(
          "flex items-center gap-3",
          headerVariant === "compact"
            ? "max-w-xs text-sm rounded-full focus:outline-none"
            : "hover:bg-gray-50 p-1.5 rounded-full transition-colors"
        )}
        onClick={() => setProfileOpen((prev) => !prev)}
      >
        <div
          id={headerVariant === "compact" ? "headerAvatar" : "headerAvatar"}
          className={joinClassNames(
            headerVariant === "compact" ? "h-9 w-9 text-purple-700" : "w-8 h-8 text-purple-600",
            "rounded-full bg-purple-100 flex items-center justify-center font-bold border border-purple-200"
          )}
        >
          {ownerInitial}
        </div>
        {headerVariant === "compact" ? (
          <div className="hidden md:block text-left">
            <p id="headerOwnerName" className="text-xs font-bold text-gray-800">{displayName}</p>
            <p id="headerOwnerId" className="text-[10px] text-gray-500">{`ID: ${owner?.loginId || "..."}`}</p>
          </div>
        ) : (
          <div className="text-left hidden sm:block">
            <p id="headerName" className="text-xs font-semibold text-gray-700">{displayName}</p>
            <p id="headerAccountId" className="text-[10px] text-gray-500">{accountLabel}</p>
          </div>
        )}
        <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
      </button>
      <div
        className={joinClassNames(
          "absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50",
          profileOpen ? "block" : "hidden"
        )}
      >
        {headerVariant === "compact" && (
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{`ID: ${owner?.loginId || "..."}`}</p>
          </div>
        )}
        <Link to="/propertyowner/ownerprofile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <UserCircle className="w-4 h-4 inline mr-2" />
          {headerVariant === "compact" ? "Your Profile" : "Profile"}
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4 inline mr-2" />
          Logout
        </button>
      </div>
    </div>
  );

  const renderMobileSidebar = () => {
    if (headerVariant === "compact" && navVariant === "chat") {
      return (
        <>
          <div
            id="mobile-sidebar-overlay"
            className={joinClassNames("fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm", mobileOpen ? "block" : "hidden")}
            onClick={() => setMobileOpen(false)}
          />
          <aside
            id="mobile-sidebar"
            className={joinClassNames(
              "fixed inset-y-0 left-0 w-72 bg-[#0f172a] z-40 transition-transform duration-300 md:hidden flex flex-col shadow-2xl",
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
              <div className="flex flex-col items-center gap-0 text-white font-bold">
                <span className="text-xl font-black tracking-tighter">ROOMHY<span className="text-teal-500">.com</span></span>
              </div>
              <button id="mobile-sidebar-close" type="button" className="p-2 text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
              {navConfig.mobileItems.map((item) => renderNavItem(item, true))}
            </nav>
          </aside>
        </>
      );
    }

    return (
      <div className={joinClassNames("md:hidden fixed inset-0 z-50", mobileOpen ? "flex" : "hidden")}>
        <button type="button" className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-label="Close menu" />
        <aside className="w-72 flex-shrink-0 bg-[#0f172a] text-slate-400 flex flex-col relative z-10 shadow-2xl overflow-hidden">
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0f172a]">
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tighter">ROOMHY<span className="text-teal-500">.com</span></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">OWNER PANEL</span>
            </div>
            <button type="button" className="p-2 text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
            {navConfig.mobileItems.map((item) => renderNavItem(item, true))}
          </nav>
        </aside>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden font-inter text-slate-800">
      {/* Sidebar - EXACT Superadmin Style */}
      <aside className={joinClassNames(
        "w-72 h-screen bg-[#0F172A] text-slate-300 flex flex-col z-50 shrink-0 transition-transform duration-300",
        mobileOpen ? "fixed left-0 top-0 translate-x-0" : "fixed left-0 top-0 -translate-x-full lg:relative lg:translate-x-0"
      )}>
        {/* Profile Header in Sidebar */}
        <div className="p-6 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg border-2 border-white/10 shadow-lg shadow-blue-600/20">
            {ownerInitial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white leading-none truncate">{displayName}</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest truncate opacity-60">Property Owner</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-0.5 custom-scrollbar pb-6">
          {navConfig.desktopItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group cursor-pointer",
                  active 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                )}
              >
                <item.icon size={18} className={cn(active ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
                <span className="font-bold text-sm truncate">{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800/50">
             <button 
               onClick={handleLogout}
               className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all group"
             >
                <LogOut size={18} />
                <span className="text-sm font-bold">Logout</span>
             </button>
          </div>
        </nav>

        {/* Sidebar Footer Card */}
        <div className="p-4 mt-auto shrink-0">
           <div className="bg-[#1E293B] rounded-2xl p-5 border border-slate-800 shadow-xl">
              <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-tight">Roomhy Hub</h4>
              <p className="text-[10px] text-slate-500 mb-4 leading-tight font-medium">Access owner resources and support documentation</p>
              <button className="w-full py-2.5 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                View Resources
              </button>
           </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Global Header - EXACT Superadmin Style */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <h2 className="hidden md:block text-lg font-black text-slate-900 tracking-tight">{title}</h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Box */}
            <div className="hidden lg:flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-72 group focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500 transition-all">
              <Search size={16} className="text-slate-400 group-focus-within:text-blue-600" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-xs font-bold ml-3 w-full text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <div className="relative">
              <button 
                className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                {notificationCount > 0 && (
                  <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
                )}
              </button>
              
              {/* Notifications Dropdown */}
              <div className={cn(
                "absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 overflow-hidden transition-all transform origin-top-right",
                notificationOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
              )}>
                <div className="px-5 py-2 border-b border-slate-50 mb-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="px-5 py-10 text-center">
                      <Bell className="w-8 h-8 text-slate-100 mx-auto mb-2" />
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No messages yet</p>
                    </div>
                  ) : (
                    notifications.map((n, i) => (
                      <div key={i} className="px-5 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 cursor-pointer">
                        <p className="text-[11px] font-bold text-slate-900 leading-tight mb-1">{n.title}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-2">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Profile Identity */}
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100 group cursor-pointer" onClick={() => setProfileOpen(!profileOpen)}>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none group-hover:text-blue-600 transition-colors">{displayName}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest opacity-60">ID: {owner?.loginId || "..."}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                {ownerInitial}
              </div>
            </div>
          </div>
        </header>

        <main className={cn("flex-1 overflow-y-auto custom-scrollbar p-8", mainClassName)}>
          <div className={contentClassName}>{children}</div>
        </main>

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
