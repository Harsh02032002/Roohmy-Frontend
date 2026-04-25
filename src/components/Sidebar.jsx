import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Home, Users, Building2, DollarSign, BarChart3, Settings as SettingsIcon,
  LogOut, ChevronDown, ShieldCheck, Briefcase, MapPin, FileBadge,
  FolderOpen, HelpCircle, CalendarCheck, Star, AlertCircle, Globe, Wallet
} from "lucide-react";
const cn = (...classes) => classes.filter(Boolean).join(" ");

const NAV = [
  { label: "Dashboard", to: "/superadmin/superadmin", icon: Home },
  {
    label: "Management", to: "/superadmin/management", icon: Users,
    children: [
      { label: "Teams", to: "/superadmin/manager" },
      { label: "Property Owners", to: "/superadmin/owner" },
      { label: "Tenants", to: "/superadmin/tenant" },
      { label: "New Signups", to: "/superadmin/new_signups" },
    ],
  },
  {
    label: "Property Management", to: "/superadmin/property", icon: Building2,
    children: [
      { label: "Dashboard", to: "/superadmin/properties" },
      { label: "All Listings", to: "/superadmin/properties" },
      { label: "Approval Queue", to: "/superadmin/approvals" },
      { label: "Flagged Listings", to: "/superadmin/flagged" },
      { label: "Live Properties", to: "/superadmin/website" },
      { label: "Categories", to: "/superadmin/categories" },
      { label: "Amenities", to: "/superadmin/amenities" },
      { label: "Pricing Plans", to: "/superadmin/pricing" },
      { label: "Featured Listings", to: "/superadmin/featured" },
      { label: "Locations", to: "/superadmin/location" },
      { label: "Moderation", to: "/superadmin/moderation" },
      { label: "Analytics", to: "/superadmin/analytics" },
      { label: "Settings", to: "/superadmin/settings" },
    ],
  },
  {
    label: "Operations", to: "/superadmin/operations", icon: Briefcase,
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
    label: "Accounting", to: "/superadmin/accounting", icon: DollarSign,
    children: [
      { label: "Dashboard", to: "/superadmin/accounting" },
      { label: "Transactions", to: "/superadmin/transactions" },
      { label: "Rent Collections", to: "/superadmin/rentcollection" },
      { label: "Commission", to: "/superadmin/platform" },
      { label: "Subscriptions", to: "/superadmin/subscriptions" },
      { label: "Payouts", to: "/superadmin/payouts" },
      { label: "Refunds", to: "/superadmin/refund" },
      { label: "Invoices", to: "/superadmin/invoices" },
      { label: "Taxes", to: "/superadmin/taxes" },
      { label: "Reports", to: "/superadmin/reports" },
      { label: "Settings", to: "/superadmin/settings" },
    ],
  },
  {
    label: "Reports", to: "/superadmin/reports", icon: BarChart3,
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
    label: "Settings", to: "/superadmin/settings", icon: SettingsIcon,
    children: [
      { label: "General Settings", to: "/superadmin/settings" },
      { label: "Platform Settings", to: "/superadmin/settings?tab=platform" },
      { label: "Commission Settings", to: "/superadmin/settings?tab=commission" },
      { label: "Payment Gateways", to: "/superadmin/settings?tab=payments" },
      { label: "Email Settings", to: "/superadmin/settings?tab=email" },
      { label: "SMS Settings", to: "/superadmin/settings?tab=sms" },
      { label: "Roles & Permissions", to: "/superadmin/settings?tab=roles" },
      { label: "Security", to: "/superadmin/settings?tab=security" },
      { label: "Integrations", to: "/superadmin/settings?tab=integrations" },
      { label: "Logs", to: "/superadmin/settings?tab=logs" },
    ],
  },
];

export function Sidebar({ open, onClose, onLogout, isMobile }) {
  const location = useLocation();
  const path = location.pathname;
  
  const findActiveTop = () =>
    NAV.find((n) => n.children ? n.children.some(c => path.startsWith(c.to.split("?")[0]) && c.to.split("?")[0] !== "/") || path === n.to : path === n.to)?.label;
  
  const [expanded, setExpanded] = useState(findActiveTop() ?? null);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 lg:hidden transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "bg-[#111827] text-gray-300 flex flex-col shrink-0 transition-transform duration-300",
          "w-64 h-full",
          isMobile ? (open ? "translate-x-0 fixed inset-y-0 left-0 z-40" : "-translate-x-full fixed inset-y-0 left-0 z-40") : "translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="h-20 px-6 flex items-center bg-[#111827] border-b border-gray-800">
           <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">
              Roomhy<span className="text-purple-500">.com</span>
            </span>
            <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Super Admin</span>
           </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1 custom-scrollbar">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isTopActive = item.to === "/" ? path === "/" : path === item.to || (item.children?.some(c => {
              const base = c.to.split("?")[0];
              return base !== "/" && path.startsWith(base);
            }) ?? false);
            const isExpanded = expanded === item.label;

            if (!item.children) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            }

            return (
              <div key={item.label}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isTopActive
                      ? "bg-purple-600/10 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                </button>
                {isExpanded && (
                  <div className="mt-1 ml-4 pl-4 border-l border-gray-800 space-y-0.5">
                    {item.children.map((child) => {
                      const base = child.to.split("?")[0];
                      const isActive = path === base || (path.startsWith(base) && base !== item.to && base !== "/superadmin");
                      return (
                        <NavLink
                          key={child.label}
                          to={child.to}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-2 pl-3 pr-2 py-2 rounded-lg text-sm transition-colors",
                            isActive
                              ? "text-white font-medium"
                              : "text-gray-500 hover:text-white"
                          )}
                        >
                          <span className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isActive ? "bg-purple-500" : "bg-gray-700"
                          )} />
                          {child.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 p-3 space-y-3">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
          <div className="flex items-center gap-3 px-3 py-3 bg-gray-900 rounded-xl">
            <div className="h-9 w-9 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-xs">
              <div className="text-white font-medium">Roomhy Superadmin</div>
              <div className="text-gray-500">v1.0.0</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
