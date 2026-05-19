import React, { useState } from "react";
import { 
  LayoutDashboard, Users, Building2, Wallet, 
  MessageSquare, BarChart3, Calendar, Star, 
  ShieldCheck, Headphones, Settings, LogOut,
  ChevronDown, ChevronRight, Menu, X, Bell,
  Search, User, Globe, Target, Home, 
  UserPlus, ClipboardList, Briefcase, FileText,
  CreditCard, IndianRupee, RotateCcw, AlertCircle,
  BarChart, PieChart, Activity, Shield, LayoutGrid,
  FileSearch, CheckCircle2, History, MessageCircle,
  Headset, ShieldAlert, Zap
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutDialog } from "./superadmin/LogoutDialog";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const NAV = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/superadmin/superadmin",
    children: [
      { label: "Overview", path: "/superadmin/superadmin" },
      { label: "Occupancy Overview", path: "/superadmin/properties" },
      { label: "Revenue Overview", path: "/superadmin/accounting" },
      { label: "Quick Actions", path: "/superadmin/superadmin" },
      { label: "Notifications", path: "/superadmin/superadmin" },
      { label: "Activity Timeline", path: "/superadmin/log" },
    ]
  },
  {
    label: "Properties",
    icon: Building2,
    path: "/superadmin/property-overview",
    children: [
      { label: "All Properties", path: "/superadmin/properties?view=list" },
      { label: "Add Property", path: "/superadmin/add-property" },
      { label: "Floors", path: "/superadmin/property-overview" },
      { label: "Rooms", path: "/superadmin/property-overview" },
      { label: "Beds", path: "/superadmin/property-overview" },
      { label: "Vacant Beds", path: "/superadmin/property-overview" },
      { label: "Property Gallery", path: "/superadmin/property-overview" },
      { label: "Amenities", path: "/superadmin/property/categories" },
      { label: "Property Settings", path: "/superadmin/settings" },
    ]
  },
  {
    label: "Tenants",
    icon: Users,
    path: "/superadmin/tenant",
    children: [
      { label: "All Tenants", path: "/superadmin/tenant" },
      { label: "Add Tenant", path: "/superadmin/add-tenant" },
      { label: "Active Tenants", path: "/superadmin/tenant" },
      { label: "Upcoming Move-ins", path: "/superadmin/tenant" },
      { label: "Move-out Requests", path: "/superadmin/tenant" },
      { label: "Ex-Tenants", path: "/superadmin/tenant" },
      { label: "Tenant Documents", path: "/superadmin/kyc_verification" },
      { label: "KYC Verification", path: "/superadmin/kyc_verification" },
      { label: "Police Verification", path: "/superadmin/kyc_verification" },
      { label: "Tenant Ledger", path: "/superadmin/rentcollection" },
      { label: "Tenant Feedback", path: "/superadmin/reviews" },
    ]
  },
  {
    label: "Leads & Bookings",
    icon: Calendar,
    path: "/superadmin/booking",
    children: [
      { label: "All Leads", path: "/superadmin/booking" },
      { label: "New Enquiries", path: "/superadmin/enquiry" },
      { label: "Follow Ups", path: "/superadmin/booking" },
      { label: "Site Visits", path: "/superadmin/booking" },
      { label: "Booking Requests", path: "/superadmin/booking" },
      { label: "Confirmed Bookings", path: "/superadmin/direct-bookings" },
      { label: "Cancelled Bookings", path: "/superadmin/booking" },
      { label: "Lead Sources", path: "/superadmin/booking" },
      { label: "WhatsApp Leads", path: "/superadmin/booking" },
    ]
  },
  {
    label: "Rent & Payments",
    icon: IndianRupee,
    path: "/superadmin/rentcollection",
    children: [
      { label: "Rent Collection", path: "/superadmin/rentcollection" },
      { label: "Pending Dues", path: "/superadmin/rentcollection" },
      { label: "Late Payments", path: "/superadmin/rentcollection" },
      { label: "Payment History", path: "/superadmin/accounting_transactions" },
      { label: "Online Payments", path: "/superadmin/accounting_transactions" },
      { label: "Receipts", path: "/superadmin/accounting_invoices" },
      { label: "Security Deposits", path: "/superadmin/accounting_transactions" },
      { label: "Refunds", path: "/superadmin/refund" },
      { label: "Discounts & Offers", path: "/superadmin/accounting_settings" },
    ]
  },
  {
    label: "Accounting",
    icon: Wallet,
    path: "/superadmin/accounting-overview",
    children: [
      { label: "Income", path: "/superadmin/accounting-overview" },
      { label: "Expenses", path: "/superadmin/accounting_payouts" },
      { label: "Vendor Payments", path: "/superadmin/accounting_payouts" },
      { label: "Transactions", path: "/superadmin/accounting_transactions" },
      { label: "Profit & Loss", path: "/superadmin/reports" },
      { label: "Cash Flow", path: "/superadmin/accounting" },
      { label: "GST & Tax", path: "/superadmin/accounting_taxes" },
      { label: "Reports", path: "/superadmin/reports_revenue" },
      { label: "Download Statements", path: "/superadmin/accounting_invoices" },
    ]
  },
  {
    label: "Complaints & Maintenance",
    icon: Headset,
    path: "/superadmin/complaint-history",
    children: [
      { label: "All Complaints", path: "/superadmin/complaint-history" },
      { label: "Open Tickets", path: "/superadmin/complaint-history" },
      { label: "In Progress", path: "/superadmin/complaint-history" },
      { label: "Resolved Complaints", path: "/superadmin/complaint-history" },
      { label: "Maintenance Requests", path: "/superadmin/complaint-history" },
      { label: "Assigned Staff", path: "/superadmin/manager" },
      { label: "Service History", path: "/superadmin/complaint-history" },
      { label: "Maintenance Calendar", path: "/superadmin/complaint-history" },
    ]
  },
  {
    label: "Staff Management",
    icon: Briefcase,
    path: "/superadmin/manager",
    children: [
      { label: "All Staff", path: "/superadmin/manager" },
      { label: "Add Staff", path: "/superadmin/manager" },
      { label: "Roles & Permissions", path: "/superadmin/roles-permissions" },
      { label: "Attendance", path: "/superadmin/log" },
      { label: "Salaries", path: "/superadmin/accounting_payouts" },
      { label: "Shift Management", path: "/superadmin/log" },
      { label: "Staff Performance", path: "/superadmin/reports" },
    ]
  },
  {
    label: "Attendance & Entry",
    icon: ClipboardList,
    path: "/superadmin/log",
    children: [
      { label: "Tenant Attendance", path: "/superadmin/log" },
      { label: "Visitor Entry", path: "/superadmin/log" },
      { label: "Visitor Passes", path: "/superadmin/log" },
      { label: "Entry Logs", path: "/superadmin/log" },
      { label: "Exit Logs", path: "/superadmin/log" },
      { label: "Leave Requests", path: "/superadmin/log" },
      { label: "Gate Management", path: "/superadmin/log" },
    ]
  },
  {
    label: "Food & Kitchen",
    icon: Target,
    path: "/superadmin/food",
    children: [
      { label: "Daily Menu", path: "/superadmin/food" },
      { label: "Weekly Menu", path: "/superadmin/food" },
      { label: "Meal Attendance", path: "/superadmin/food" },
      { label: "Kitchen Inventory", path: "/superadmin/food" },
      { label: "Grocery Expenses", path: "/superadmin/accounting_payouts" },
      { label: "Vendor List", path: "/superadmin/food" },
      { label: "Food Feedback", path: "/superadmin/reviews" },
    ]
  },
  {
    label: "Communication",
    icon: MessageCircle,
    path: "/superadmin/superchat",
    children: [
      { label: "WhatsApp Broadcast", path: "/superadmin/superchat" },
      { label: "SMS Campaigns", path: "/superadmin/superchat" },
      { label: "Email Notices", path: "/superadmin/superchat" },
      { label: "Announcements", path: "/superadmin/superchat" },
      { label: "Emergency Alerts", path: "/superadmin/superchat" },
      { label: "Templates", path: "/superadmin/superchat" },
    ]
  },
  {
    label: "Marketing",
    icon: Globe,
    path: "/superadmin/marketing",
    children: [
      { label: "Vacancy Promotion", path: "/superadmin/marketing" },
      { label: "Social Media Leads", path: "/superadmin/enquiry" },
      { label: "Referral Program", path: "/superadmin/marketing" },
      { label: "Property Website", path: "/superadmin/marketing" },
      { label: "Banners & Posters", path: "/superadmin/marketing" },
      { label: "Coupons & Offers", path: "/superadmin/accounting_settings" },
    ]
  },
  {
    label: "Analytics & Reports",
    icon: BarChart3,
    path: "/superadmin/reports",
    children: [
      { label: "Occupancy Reports", path: "/superadmin/reports" },
      { label: "Revenue Reports", path: "/superadmin/reports_revenue" },
      { label: "Expense Reports", path: "/superadmin/reports" },
      { label: "Tenant Analytics", path: "/superadmin/reports" },
      { label: "Collection Reports", path: "/superadmin/reports" },
      { label: "Complaint Analytics", path: "/superadmin/reports" },
      { label: "Staff Reports", path: "/superadmin/reports" },
      { label: "Export Reports", path: "/superadmin/reports" },
    ]
  },
  {
    label: "Documents",
    icon: FileText,
    path: "/superadmin/documents",
    children: [
      { label: "Agreements", path: "/superadmin/documents" },
      { label: "Tenant Documents", path: "/superadmin/kyc_verification" },
      { label: "Staff Documents", path: "/superadmin/profile" },
      { label: "Property Documents", path: "/superadmin/documents" },
      { label: "Uploaded Files", path: "/superadmin/documents" },
      { label: "Digital Signatures", path: "/superadmin/documents" },
    ]
  },
  {
    label: "Subscription & Billing",
    icon: ShieldCheck,
    path: "/superadmin/pricing",
    children: [
      { label: "Current Plan", path: "/superadmin/pricing" },
      { label: "Upgrade Plan", path: "/superadmin/pricing" },
      { label: "Billing History", path: "/superadmin/pricing" },
      { label: "Invoices", path: "/superadmin/pricing" },
      { label: "Payment Methods", path: "/superadmin/pricing" },
    ]
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/superadmin/settings",
    children: [
      { label: "Profile Settings", path: "/superadmin/settings" },
      { label: "Company Settings", path: "/superadmin/settings" },
      { label: "Property Settings", path: "/superadmin/settings" },
      { label: "Notification Settings", path: "/superadmin/settings" },
      { label: "Payment Gateway", path: "/superadmin/settings" },
      { label: "Bank Accounts", path: "/superadmin/settings" },
      { label: "Integrations", path: "/superadmin/settings" },
      { label: "Role Permissions", path: "/superadmin/roles-permissions" },
      { label: "Language Settings", path: "/superadmin/settings" },
      { label: "Theme Settings", path: "/superadmin/settings" },
    ]
  }
];

export function Sidebar({ open, isMobile, onClose, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [openMenus, setOpenMenus] = useState({ "Review": true, "Support": true });

  const toggleMenu = (e, label) => {
    e.stopPropagation();
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      sessionStorage.clear();
      localStorage.clear();
      navigate("/superadmin/index");
    }
  };

  const isPathActive = (item) => {
    if (item.path && location.pathname === item.path) return true;
    if (item.children) return item.children.some(c => isPathActive(c));
    return false;
  };

  const renderNavItems = (items, level = 0) => {
    return items.map((item) => {
      const Icon = item.icon;
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openMenus[item.label];
      const isActive = isPathActive(item);

      return (
        <div key={item.label} className="space-y-1">
          <div
            onClick={(e) => hasChildren ? toggleMenu(e, item.label) : navigate(item.path)}
            className={cn(
              "w-full flex items-center justify-between transition-all group cursor-pointer",
              level === 0 ? "px-4 py-3 rounded-xl mb-0.5" : "px-4 py-1.5 rounded-lg ml-2",
              isActive && !hasChildren && level === 0
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : isActive && !hasChildren && level > 0
                  ? "text-blue-400 font-bold"
                  : isActive && hasChildren
                    ? "text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              {Icon && <Icon size={18} className={cn(isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />}
              <span className={cn(
                "font-bold truncate",
                level === 0 ? "text-sm" : level === 1 ? "text-[11px] opacity-90" : "text-[10px] opacity-70"
              )} title={item.label}>{item.label}</span>
            </div>
            {hasChildren && (
              isOpen ? <ChevronDown size={12} className="opacity-40" /> : <ChevronRight size={12} className="opacity-40" />
            )}
          </div>

          {/* Nested Children with Vertical Connector Line */}
          {hasChildren && isOpen && (
            <div className={cn(
              "ml-6 border-l border-slate-800/80 space-y-0.5", 
              level === 0 ? "pb-2 mt-1" : "pb-1"
            )}>
              {renderNavItems(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const sidebarClasses = cn(
    "w-72 h-screen bg-[#0F172A] text-slate-300 flex flex-col z-50 shrink-0 transition-transform duration-300",
    isMobile ? "fixed left-0 top-0" : "relative",
    isMobile && !open ? "-translate-x-full" : "translate-x-0"
  );

  return (
    <>
      <aside className={sidebarClasses}>
        {/* Header - Profile from Screenshot */}
        <div className="p-6 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg border-2 border-white/10 shadow-lg shadow-blue-600/20">
            A
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white leading-none truncate">Aman</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-widest truncate">Superadmin</p>
          </div>
        </div>

        {/* Navigation - No Numbers, Extreme Left Alignment */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-0.5 custom-scrollbar pb-6">
          {renderNavItems(NAV)}

          <div className="pt-4 mt-4 border-t border-slate-800/50">
             <button 
               onClick={() => setShowLogoutDialog(true)}
               className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all group"
             >
                <LogOut size={18} />
                <span className="text-sm font-semibold">Logout</span>
             </button>
          </div>
        </nav>

        {/* Sidebar Footer Card */}
        <div className="p-4 mt-auto shrink-0">
           <div className="bg-[#1E293B] rounded-2xl p-5 border border-slate-800 shadow-xl">
              <h4 className="text-xs font-bold text-white mb-1">Need Help?</h4>
              <p className="text-[10px] text-slate-500 mb-4 leading-tight">Contact our support team for specialized assistance</p>
              <button className="w-full py-2.5 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                Contact Support
              </button>
           </div>
        </div>
      </aside>

      {/* Logout Dialog */}
      <LogoutDialog 
        open={showLogoutDialog} 
        onClose={() => setShowLogoutDialog(false)} 
        onConfirm={handleLogout} 
      />
    </>
  );
}

export default Sidebar;
