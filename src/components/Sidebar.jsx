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
  FileSearch, CheckCircle2, History, MessageCircle
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutDialog } from "./superadmin/LogoutDialog";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const NAV = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/superadmin/superadmin"
  },
  {
    label: "Home",
    icon: Home,
    children: [
      { label: "Overview", path: "/superadmin/home-overview" },
      { label: "Total Properties", path: "/superadmin/properties" },
      { label: "Total Tenants", path: "/superadmin/tenant" },
      { label: "Revenue Overview", path: "/superadmin/accounting" },
      { label: "Alerts (Pending Rent)", path: "/superadmin/rentcollection" }
    ]
  },
  {
    label: "User Management",
    icon: Users,
    children: [
      { label: "Overview", path: "/superadmin/user-overview" },
      { 
        label: "Team Management", 
        children: [
          { label: "All Staff", path: "/superadmin/manager" },
          { label: "Profile", path: "/superadmin/profile" },
          { label: "Documents", path: "/superadmin/manager" }
        ]
      },
      { label: "Roles & Permission", path: "/superadmin/settings" },
      { 
        label: "Attendance", 
        children: [
          { label: "Daily Logs", path: "/superadmin/log" },
          { label: "Leave", path: "/superadmin/log" },
          { label: "Shifts", path: "/superadmin/log" }
        ]
      },
      { 
        label: "Property Owners", 
        children: [
          { label: "Add", path: "/superadmin/owner" },
          { label: "Approved / Pending", path: "/superadmin/owner" },
          { label: "KYC / Documents", path: "/superadmin/kyc_verification" },
          { label: "Agreements", path: "/superadmin/owner" }
        ]
      },
      { 
        label: "Tenants", 
        children: [
          { label: "View All Tenants", path: "/superadmin/tenant" },
          { label: "KYC / Documents", path: "/superadmin/kyc_verification" },
          { label: "Rent History", path: "/superadmin/rentcollection" },
          { label: "Agreements", path: "/superadmin/tenant" }
        ]
      }
    ]
  },
  {
    label: "Property Management",
    icon: Building2,
    children: [
      { label: "Overview", path: "/superadmin/property-overview" },
      { label: "Add Properties", path: "/superadmin/properties" },
      { label: "Approve / Reject Properties", path: "/superadmin/property_approvals" },
      { label: "Pending Properties", path: "/superadmin/property_approvals" },
      { label: "All Properties List", path: "/superadmin/properties" },
      { label: "Online Leads", path: "/superadmin/enquiry" }
    ]
  },
  {
    label: "Accounting",
    icon: IndianRupee,
    children: [
      { label: "Overview", path: "/superadmin/accounting" },
      { 
        label: "Transaction Management (Tenants)", 
        children: [
          { label: "Monthly Payment Receipt", path: "/superadmin/accounting_invoices" },
          { label: "Payment History", path: "/superadmin/accounting_transactions" },
          { label: "Other Charges", path: "/superadmin/accounting_transactions" }
        ]
      },
      { 
        label: "Transaction Management (Owners)", 
        children: [
          { label: "Monthly Payment Receipt", path: "/superadmin/accounting_payouts" },
          { label: "Payment History", path: "/superadmin/accounting_payouts" },
          { label: "Service Fee Details", path: "/superadmin/accounting_commission" }
        ]
      },
      { 
        label: "Owner Payout", 
        children: [
          { label: "Payout Cycle", path: "/superadmin/accounting_payouts" },
          { label: "Manual + Auto Payout Option", path: "/superadmin/accounting_payouts" },
          { label: "Pending Payouts", path: "/superadmin/accounting_payouts" },
          { label: "Bank Transfer Tracking", path: "/superadmin/accounting_payouts" },
          { label: "Cash Received Details", path: "/superadmin/accounting_payouts" },
          { label: "Failed Payout Alerts", path: "/superadmin/accounting_payouts" }
        ]
      },
      { 
        label: "Roomhy Overview", 
        children: [
          { label: "Fixed Fees", path: "/superadmin/accounting_settings" },
          { label: "Per Bed Fees", path: "/superadmin/accounting_settings" },
          { label: "Discount", path: "/superadmin/accounting_settings" }
        ]
      },
      { 
        label: "Invoice System", 
        children: [
          { label: "Auto Invoice Generation", path: "/superadmin/accounting_invoices" },
          { label: "GST", path: "/superadmin/accounting_taxes" },
          { label: "Download PDF", path: "/superadmin/accounting_invoices" },
          { label: "Invoice Numbering System", path: "/superadmin/accounting_settings" }
        ]
      },
      { 
        label: "Refund Management", 
        children: [
          { label: "Booking Amount Refund", path: "/superadmin/refund" },
          { label: "Partial Refund", path: "/superadmin/refund" },
          { label: "Refund Approval System", path: "/superadmin/refund" },
          { label: "Refund History", path: "/superadmin/refund" }
        ]
      },
      { 
        label: "Alert & Automation", 
        children: [
          { label: "Rent Due Reminder", path: "/superadmin/settings" },
          { label: "Payment Success/Failure Alerts", path: "/superadmin/settings" },
          { label: "Payout Processed Notification", path: "/superadmin/settings" }
        ]
      },
      { 
        label: "Analytics", 
        children: [
          { label: "Roomhy Monthly Revenue", path: "/superadmin/reports_revenue" },
          { label: "Owners Monthly Revenue", path: "/superadmin/reports_revenue" },
          { label: "Due Rents", path: "/superadmin/rentcollection" },
          { label: "Profit / Loss Report", path: "/superadmin/reports" },
          { label: "Cashflow Dashboard", path: "/superadmin/accounting" }
        ]
      }
    ]
  },
  {
    label: "Chats",
    icon: MessageSquare,
    children: [
      { label: "Live Conversations", path: "/superadmin/superchat" },
      { label: "Conversation Details", path: "/superadmin/superchat" },
      { label: "Moderation & Filters", path: "/superadmin/superchat" },
      { label: "Alerts & Violations", path: "/superadmin/superchat" },
      { label: "Templates / Auto Messages", path: "/superadmin/superchat" },
      { label: "Lead -> Chat Mapping", path: "/superadmin/superchat" },
      { label: "Analytics", path: "/superadmin/superchat" },
      { label: "Settings", path: "/superadmin/superchat" }
    ]
  },
  {
    label: "Reports & Analytics",
    icon: BarChart3,
    children: [
      { label: "Overview", path: "/superadmin/reports" },
      { label: "Property Performance", path: "/superadmin/reports" },
      { label: "Location Wise Data", path: "/superadmin/reports" },
      { label: "Occupancy Rate", path: "/superadmin/reports" },
      { label: "Growth Analytics", path: "/superadmin/reports" },
      { label: "Staff Performance Reports", path: "/superadmin/reports" },
      { label: "Revenue Report", path: "/superadmin/reports_revenue" }
    ]
  },
  {
    label: "Booking & Leads",
    icon: Calendar,
    children: [
      { label: "Overview", path: "/superadmin/booking" },
      { label: "Total Leads", path: "/superadmin/enquiry" },
      { label: "Bookings", path: "/superadmin/booking" },
      { label: "Conversion Rate", path: "/superadmin/booking" },
      { label: "Top Performing Locations", path: "/superadmin/booking" }
    ]
  },
  {
    label: "Review",
    icon: Star,
    children: [
      { label: "Overview", path: "/superadmin/reviews" },
      { label: "All Reviews", path: "/superadmin/reviews" },
      { label: "Moderation", path: "/superadmin/reviews" },
      { label: "Analytics", path: "/superadmin/reviews" },
      { label: "New Review", path: "/superadmin/reviews" }
    ]
  },
  {
    label: "CRM",
    icon: Target,
    path: "/superadmin/enquiry"
  },
  {
    label: "Support",
    icon: Headphones,
    children: [
      { label: "Overview", path: "/superadmin/complaint-history" },
      { label: "Tenants Complaints", path: "/superadmin/complaint-history" },
      { label: "Owners Complaints", path: "/superadmin/complaint-history" },
      { label: "Tickets System", path: "/superadmin/complaint-history" },
      { label: "Issues Resolutions Tracking", path: "/superadmin/complaint-history" }
    ]
  },
  {
    label: "Subscription Control",
    icon: ShieldCheck,
    path: "/superadmin/pricing"
  }
];

export function Sidebar({ open, isMobile, onClose, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const toggleMenu = (label) => {
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

  const isItemActive = (item) => {
    if (item.path && location.pathname === item.path) return true;
    if (item.children) return item.children.some(c => isItemActive(c));
    return false;
  };

  const renderNavItems = (items, level = 0) => {
    return items.map((item) => {
      const Icon = item.icon;
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openMenus[item.label];
      const isActive = isItemActive(item);

      return (
        <div key={item.label} className="space-y-1">
          {hasChildren ? (
            <button
              onClick={() => toggleMenu(item.label)}
              className={cn(
                "w-full flex items-center justify-between transition-all group",
                level === 0 ? "p-4 rounded-2xl" : "p-3 pl-6 rounded-xl",
                isActive ? (level === 0 ? "bg-blue-600/10 text-blue-500" : "text-blue-500 bg-blue-500/5") : "hover:bg-slate-800/50"
              )}
            >
              <div className="flex items-center gap-4 min-w-0">
                {Icon && <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-blue-500" : "text-slate-500 group-hover:text-slate-300")} />}
                <span className={cn(
                  "font-bold truncate",
                  level === 0 ? "text-[14px]" : "text-[12px] opacity-80"
                )}>{item.label}</span>
              </div>
              {isOpen ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
            </button>
          ) : (
            <Link
              to={item.path}
              className={cn(
                "w-full flex items-center transition-all group",
                level === 0 ? "p-4 rounded-2xl gap-4" : "p-3 pl-6 rounded-xl",
                location.pathname === item.path 
                  ? (level === 0 ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "text-blue-400 bg-blue-500/10 font-black") 
                  : "hover:bg-slate-800/50"
              )}
            >
              <div className="flex items-center gap-4 min-w-0">
                {Icon && <Icon className={cn("w-5 h-5 shrink-0", location.pathname === item.path ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />}
                <span className={cn(
                  "font-bold truncate",
                  level === 0 ? "text-[14px]" : "text-[12px] opacity-80 group-hover:opacity-100"
                )}>{item.label}</span>
              </div>
            </Link>
          )}

          {hasChildren && isOpen && (
            <div className={cn(
              "space-y-1 py-1",
              level === 0 ? "ml-6 border-l border-slate-800/50" : "ml-4 border-l border-slate-700/30"
            )}>
              {renderNavItems(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const sidebarClasses = cn(
    "w-80 h-screen bg-[#0F172A] text-slate-300 flex flex-col z-50 border-r border-slate-800/50 shrink-0 transition-transform duration-300",
    isMobile ? "fixed left-0 top-0" : "relative",
    isMobile && !open ? "-translate-x-full" : "translate-x-0"
  );

  return (
    <>
      <aside className={sidebarClasses}>
        {/* Brand */}
        <div className="p-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-2xl font-bold text-white tracking-tight truncate">Roomhy<span className="text-blue-500">.com</span></h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 truncate">Super Admin Panel</p>
          </div>
        </div>

        {/* User Profile Mini */}
        <div className="mx-6 mb-8 p-5 bg-slate-800/30 rounded-[2.5rem] border border-slate-700/30 flex items-center gap-4 group hover:bg-slate-800/50 transition-all cursor-pointer overflow-hidden">
           <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shrink-0">A</div>
           <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">Aman</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase truncate">Superadmin</p>
           </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-6 space-y-2 custom-scrollbar pb-6">
          {renderNavItems(NAV)}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800/50 mt-auto">
          <button 
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-all group"
          >
            <LogOut className="w-5 h-5 shrink-0 group-hover:rotate-12 transition-transform" />
            <span className="text-[13px] font-bold">Logout</span>
          </button>
        </div>
      </aside>

      <LogoutDialog 
        open={showLogoutDialog} 
        onClose={() => setShowLogoutDialog(false)} 
        onConfirm={handleLogout} 
      />
    </>
  );
}

export default Sidebar;
