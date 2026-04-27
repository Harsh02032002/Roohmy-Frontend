import { NavLink, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { 
  LayoutDashboard, Users, Building2, Briefcase, Home as HomeIcon, 
  FileBadge, FolderOpen, HelpCircle, CalendarCheck, Star, 
  AlertCircle, Globe, Wallet, IndianRupee, RotateCcw, MapPin, 
  Settings as SettingsIcon, LogOut, ShieldCheck, ChevronDown,
  DollarSign, BarChart3, Database, MessageSquare, Shield, Activity
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const NAV = [
  { label: "Dashboard", to: "/superadmin/superadmin", icon: LayoutDashboard },
  {
    label: "Management", icon: Users,
    children: [
      { label: "Teams", to: "/superadmin/manager" },
      { label: "Property Owners", to: "/superadmin/owner" },
      { label: "Tenants", to: "/superadmin/tenant" },
      { label: "New Signups", to: "/superadmin/new_signups" },
      { label: "KYC Verification", to: "/superadmin/kyc_verification" },
    ],
  },
  {
    label: "Property Management", icon: Building2,
    children: [
      { label: "All Listings", to: "/superadmin/properties" },
      { label: "Approval Queue", to: "/superadmin/property/approvals" },
      { label: "Flagged Listings", to: "/superadmin/property/flagged" },
      { label: "Live Properties", to: "/superadmin/website" },
      { label: "Categories", to: "/superadmin/property/categories" },
      { label: "Amenities", to: "/superadmin/property/amenities" },
      { label: "Pricing Plans", to: "/superadmin/property/pricing" },
      { label: "Featured Listings", to: "/superadmin/property/featured" },
      { label: "Locations", to: "/superadmin/location" },
      { label: "Moderation", to: "/superadmin/property/moderation" },
      { label: "Analytics", to: "/superadmin/property/analytics" },
      { label: "Settings", to: "/superadmin/property/settings" },
    ],
  },
  {
    label: "Operations", icon: Briefcase,
    children: [
      { label: "Web Enquiry", to: "/superadmin/websiteenq" },
      { label: "Enquiries", to: "/superadmin/enquiry" },
      { label: "Bookings", to: "/superadmin/booking" },
      { label: "Visit Reports", to: "/superadmin/visit" },
      { label: "Reviews", to: "/superadmin/reviews" },
      { label: "Complaint History", to: "/superadmin/complaint-history" },
    ],
  },
  {
    label: "Accounting", icon: DollarSign,
    children: [
      { label: "Dashboard", to: "/superadmin/accounting" },
      { label: "Transactions", to: "/superadmin/accounting/transactions" },
      { label: "Rent Collections", to: "/superadmin/rentcollection" },
      { label: "Commission", to: "/superadmin/accounting/commission" },
      { label: "Subscriptions", to: "/superadmin/accounting/subscriptions" },
      { label: "Payouts", to: "/superadmin/accounting/payouts" },
      { label: "Refunds", to: "/superadmin/refund" },
      { label: "Invoices", to: "/superadmin/accounting/invoices" },
      { label: "Taxes", to: "/superadmin/accounting/taxes" },
      { label: "Reports", to: "/superadmin/accounting/reports" },
      { label: "Settings", to: "/superadmin/accounting/settings" },
    ],
  },
  {
    label: "Reports", icon: BarChart3,
    children: [
      { label: "Overview", to: "/superadmin/reports" },
      { label: "Listings", to: "/superadmin/reports/listings" },
      { label: "Users", to: "/superadmin/reports/users" },
      { label: "Leads / Bookings", to: "/superadmin/reports/leads" },
      { label: "Revenue", to: "/superadmin/reports/revenue" },
      { label: "Commission", to: "/superadmin/reports/commission" },
      { label: "Subscriptions", to: "/superadmin/reports/subscriptions" },
      { label: "Refunds", to: "/superadmin/reports/refunds" },
      { label: "Performance", to: "/superadmin/reports/performance" },
      { label: "Locations", to: "/superadmin/reports/locations" },
      { label: "Exports", to: "/superadmin/reports/exports" },
    ],
  },
  {
    label: "System", icon: SettingsIcon,
    children: [
      { label: "General Settings", to: "/superadmin/settings" },
      { label: "Profile", to: "/superadmin/profile" },
      { label: "Backup & Restore", to: "/superadmin/backup" },
      { label: "Activity Logs", to: "/superadmin/log" },
      { label: "Security", to: "/superadmin/security" },
      { label: "Area Admin", to: "/superadmin/areaadmin" },
      { label: "Superchat", to: "/superadmin/superchat" },
      { label: "Data Import", to: "/superadmin/import_local" },
    ],
  },
];

export function Sidebar({ open, onClose, onLogout, isMobile }) {
  const location = useLocation();
  const path = location.pathname;

  const findActiveTop = () =>
    NAV.find((n) => n.children ? n.children.some(c => path === c.to || path.startsWith(c.to + "/")) || path === n.to : path === n.to)?.label;

  const [expanded, setExpanded] = useState(findActiveTop() ?? null);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "bg-[#111827] text-gray-300 flex flex-col shrink-0 transition-transform duration-300 border-r border-gray-800 shadow-2xl",
          "w-64 h-full",
          isMobile ? (open ? "translate-x-0 fixed inset-y-0 left-0 z-40" : "-translate-x-full fixed inset-y-0 left-0 z-40") : "translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="h-20 px-6 flex items-center bg-[#111827] border-b border-gray-800">
           <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
               Roomhy<span className="text-purple-500">.com</span>
            </span>
            <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1">Super Admin</span>
           </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1 custom-scrollbar">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isTopActive = item.to === path || (item.children?.some(c => path === c.to || path.startsWith(c.to + "/")) ?? false);
            const isExpanded = expanded === item.label;

            if (!item.children) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                      isActive
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                    )
                  }
                >
                  <Icon className={cn("h-5 w-5 transition-colors", isTopActive ? "text-white" : "text-gray-500 group-hover:text-gray-300")} />
                  <span>{item.label}</span>
                </NavLink>
              );
            }

            return (
              <div key={item.label} className="space-y-1">
                <button
                  onClick={() => setExpanded(isExpanded ? null : item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                    isTopActive
                      ? "bg-purple-600/10 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  )}
                >
                  <Icon className={cn("h-5 w-5 transition-colors", isTopActive ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300")} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")} />
                </button>
                
                {isExpanded && (
                  <div className="ml-4 pl-4 border-l border-gray-800 space-y-1 animate-in">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.label}
                        to={child.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                            isActive
                              ? "text-white font-medium bg-gray-800/40"
                              : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/20"
                          )
                        }
                      >
                        <div className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          path === child.to ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "bg-gray-700"
                        )} />
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 p-4 space-y-4 bg-[#0d121d]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all group"
          >
            <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            Logout
          </button>
          <div className="flex items-center gap-3 px-3 py-3 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black text-sm">
                RH
            </div>
            <div className="text-xs">
              <div className="text-white font-medium">Roomhy Admin</div>
              <div className="text-gray-500">v1.0.1 Stable</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
