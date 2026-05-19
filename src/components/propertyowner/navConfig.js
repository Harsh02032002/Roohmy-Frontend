import { 
  LayoutDashboard, BedDouble, Users, CalendarCheck, MessageCircle, 
  User, Settings, MapPin, FileText, Building2, PlusCircle, DoorOpen,
  Image, Globe, QrCode, UserCheck, Bell, CalendarClock, HelpCircle,
  Eye, Wallet, CheckCircle, BellRing, Receipt, Link, Repeat, Calculator,
  FileBadge, TrendingUp, BarChart3, AlertTriangle, PieChart, CreditCard,
  AlertCircle, Megaphone, MessageSquare, Star, FolderOpen,
  Calendar, IndianRupee, Headset, Briefcase, ClipboardList, Target, ShieldCheck
} from 'lucide-react';

// ============================================
// PROPERTY OWNER NAVIGATION - CLEAN VERSION
// ============================================

export const PROPERTY_OWNER_NAV = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/propertyowner/admin",
    submenus: [
      { label: "Overview", href: "/propertyowner/admin", goldOnly: false },
      { label: "Occupancy Overview", href: "/propertyowner/occupancy-overview", goldOnly: false },
      { label: "Revenue Overview", href: "/propertyowner/revenue-overview", goldOnly: false },
      { label: "Quick Actions", href: "/propertyowner/quick-actions", goldOnly: false },
      { label: "Notifications", href: "/propertyowner/notifications", goldOnly: false },
      { label: "Activity Timeline", href: "/propertyowner/activity-timeline", goldOnly: false },
    ]
  },
  {
    label: "Properties",
    icon: Building2,
    href: "/propertyowner/properties",
    submenus: [
      { label: "All Properties", href: "/propertyowner/properties", goldOnly: false },
      { label: "Add Property", href: "/propertyowner/add-property", goldOnly: false },
      { label: "Floors", href: "/propertyowner/floors", goldOnly: false },
      { label: "Rooms", href: "/propertyowner/rooms", goldOnly: false },
      { label: "Beds", href: "/propertyowner/beds", goldOnly: false },
      { label: "Vacant Beds", href: "/propertyowner/vacant-beds", goldOnly: false },
      { label: "Property Gallery", href: "/propertyowner/room-photos", goldOnly: false },
      { label: "Amenities", href: "/propertyowner/amenities", goldOnly: false },
      { label: "Property Settings", href: "/propertyowner/property-settings", goldOnly: false },
    ]
  },
  {
    label: "Tenants",
    icon: Users,
    href: "/propertyowner/tenants",
    submenus: [
      { label: "All Tenants", href: "/propertyowner/tenants", goldOnly: false },
      { label: "Add Tenant", href: "/propertyowner/tenantrec", goldOnly: false },
      { label: "Active Tenants", href: "/propertyowner/active-tenants", goldOnly: false },
      { label: "Upcoming Move-ins", href: "/propertyowner/upcoming-moveins", goldOnly: false },
      { label: "Move-out Requests", href: "/propertyowner/moveout-requests", goldOnly: false },
      { label: "Ex-Tenants", href: "/propertyowner/ex-tenants", goldOnly: false },
      { label: "Tenant Documents", href: "/propertyowner/tenant-docs", goldOnly: false },
      { label: "KYC Verification", href: "/propertyowner/kyc-verification", goldOnly: false },
      { label: "Police Verification", href: "/propertyowner/police-verification", goldOnly: false },
      { label: "Tenant Ledger", href: "/propertyowner/tenant-ledger", goldOnly: false },
      { label: "Tenant Feedback", href: "/propertyowner/review", goldOnly: false },
    ]
  },
  {
    label: "Leads & Bookings",
    icon: Calendar,
    href: "/propertyowner/booking",
    submenus: [
      { label: "All Leads", href: "/propertyowner/enquiry", goldOnly: false },
      { label: "New Enquiries", href: "/propertyowner/new-enquiries", goldOnly: false },
      { label: "Follow Ups", href: "/propertyowner/follow-ups", goldOnly: false },
      { label: "Site Visits", href: "/propertyowner/schedulevisit", goldOnly: false },
      { label: "Booking Requests", href: "/propertyowner/booking_request", goldOnly: false },
      { label: "Confirmed Bookings", href: "/propertyowner/booking", goldOnly: false },
      { label: "Cancelled Bookings", href: "/propertyowner/cancelled-bookings", goldOnly: false },
      { label: "Lead Sources", href: "/propertyowner/lead-sources", goldOnly: false },
      { label: "WhatsApp Leads", href: "/propertyowner/whatsapp-leads", goldOnly: false },
    ]
  },
  {
    label: "Rent & Payments",
    icon: IndianRupee,
    href: "/propertyowner/payment",
    submenus: [
      { label: "Rent Collection", href: "/propertyowner/payment", goldOnly: false },
      { label: "Pending Dues", href: "/propertyowner/dues-report", goldOnly: false },
      { label: "Late Payments", href: "/propertyowner/late-fine", goldOnly: false },
      { label: "Payment History", href: "/propertyowner/payment-received", goldOnly: false },
      { label: "Online Payments", href: "/propertyowner/payment-dashboard", goldOnly: false },
      { label: "Receipts", href: "/propertyowner/receipts", goldOnly: false },
      { label: "Security Deposits", href: "/propertyowner/security-deposits", goldOnly: false },
      { label: "Refunds", href: "/propertyowner/refunds", goldOnly: false },
      { label: "Discounts & Offers", href: "/propertyowner/discounts-offers", goldOnly: false },
    ]
  },
  {
    label: "Accounting",
    icon: Wallet,
    href: "/propertyowner/collection-report",
    submenus: [
      { label: "Income", href: "/propertyowner/income", goldOnly: false },
      { label: "Expenses", href: "/propertyowner/expense-tracking", goldOnly: false },
      { label: "Vendor Payments", href: "/propertyowner/vendor-payments", goldOnly: false },
      { label: "Transactions", href: "/propertyowner/transactions", goldOnly: false },
      { label: "Profit & Loss", href: "/propertyowner/profit-loss", goldOnly: false },
      { label: "Cash Flow", href: "/propertyowner/cash-flow", goldOnly: false },
      { label: "GST & Tax", href: "/propertyowner/hra-gst", goldOnly: false },
      { label: "Reports", href: "/propertyowner/reports", goldOnly: false },
      { label: "Download Statements", href: "/propertyowner/download-statements", goldOnly: false },
    ]
  },
  {
    label: "Complaints & Maintenance",
    icon: Headset,
    href: "/propertyowner/complaints",
    submenus: [
      { label: "All Complaints", href: "/propertyowner/complaints", goldOnly: false },
      { label: "Open Tickets", href: "/propertyowner/open-tickets", goldOnly: false },
      { label: "In Progress", href: "/propertyowner/in-progress-complaints", goldOnly: false },
      { label: "Resolved Complaints", href: "/propertyowner/resolved-complaints", goldOnly: false },
      { label: "Maintenance Requests", href: "/propertyowner/maintenance-requests", goldOnly: false },
      { label: "Assigned Staff", href: "/propertyowner/assigned-staff", goldOnly: false },
      { label: "Service History", href: "/propertyowner/service-history", goldOnly: false },
      { label: "Maintenance Calendar", href: "/propertyowner/maintenance-calendar", goldOnly: false },
    ]
  },
  {
    label: "Staff Management",
    icon: Briefcase,
    href: "/propertyowner/all-staff",
    submenus: [
      { label: "All Staff", href: "/propertyowner/all-staff", goldOnly: false },
      { label: "Add Staff", href: "/propertyowner/add-staff", goldOnly: false },
      { label: "Roles & Permissions", href: "/propertyowner/roles-permissions", goldOnly: false },
      { label: "Attendance", href: "/propertyowner/staff-attendance", goldOnly: false },
      { label: "Salaries", href: "/propertyowner/staff-salaries", goldOnly: false },
      { label: "Shift Management", href: "/propertyowner/shift-management", goldOnly: false },
      { label: "Staff Performance", href: "/propertyowner/staff-performance", goldOnly: false },
    ]
  },
  {
    label: "Attendance & Entry",
    icon: ClipboardList,
    href: "/propertyowner/tenant-attendance",
    submenus: [
      { label: "Tenant Attendance", href: "/propertyowner/tenant-attendance", goldOnly: false },
      { label: "Visitor Entry", href: "/propertyowner/visitor-entry", goldOnly: false },
      { label: "Visitor Passes", href: "/propertyowner/visitor-passes", goldOnly: false },
      { label: "Entry Logs", href: "/propertyowner/entry-logs", goldOnly: false },
      { label: "Exit Logs", href: "/propertyowner/exit-logs", goldOnly: false },
      { label: "Leave Requests", href: "/propertyowner/leave-requests", goldOnly: false },
      { label: "Gate Management", href: "/propertyowner/gate-management", goldOnly: false },
    ]
  },
  {
    label: "Food & Kitchen",
    icon: Target,
    href: "/propertyowner/daily-menu",
    submenus: [
      { label: "Daily Menu", href: "/propertyowner/daily-menu", goldOnly: false },
      { label: "Weekly Menu", href: "/propertyowner/weekly-menu", goldOnly: false },
      { label: "Meal Attendance", href: "/propertyowner/meal-attendance", goldOnly: false },
      { label: "Kitchen Inventory", href: "/propertyowner/kitchen-inventory", goldOnly: false },
      { label: "Grocery Expenses", href: "/propertyowner/grocery-expenses", goldOnly: false },
      { label: "Vendor List", href: "/propertyowner/vendor-list", goldOnly: false },
      { label: "Food Feedback", href: "/propertyowner/food-feedback", goldOnly: false },
    ]
  },
  {
    label: "Communication",
    icon: MessageCircle,
    href: "/propertyowner/ownerchat",
    submenus: [
      { label: "WhatsApp Broadcast", href: "/propertyowner/whatsapp", goldOnly: false },
      { label: "SMS Campaigns", href: "/propertyowner/sms-campaigns", goldOnly: false },
      { label: "Email Notices", href: "/propertyowner/email-notices", goldOnly: false },
      { label: "Announcements", href: "/propertyowner/announcements", goldOnly: false },
      { label: "Emergency Alerts", href: "/propertyowner/emergency-alerts", goldOnly: false },
      { label: "Templates", href: "/propertyowner/communication-templates", goldOnly: false },
    ]
  },
  {
    label: "Marketing",
    icon: Globe,
    href: "/propertyowner/vacancy-promotion",
    submenus: [
      { label: "Vacancy Promotion", href: "/propertyowner/vacancy-promotion", goldOnly: false },
      { label: "Social Media Leads", href: "/propertyowner/social-media-leads", goldOnly: false },
      { label: "Referral Program", href: "/propertyowner/referral-program", goldOnly: false },
      { label: "Property Website", href: "/propertyowner/property-website", goldOnly: false },
      { label: "Banners & Posters", href: "/propertyowner/banners-posters", goldOnly: false },
      { label: "Coupons & Offers", href: "/propertyowner/coupons-offers", goldOnly: false },
    ]
  },
  {
    label: "Analytics & Reports",
    icon: BarChart3,
    href: "/propertyowner/collection-report",
    submenus: [
      { label: "Occupancy Reports", href: "/propertyowner/occupancy-report", goldOnly: false },
      { label: "Revenue Reports", href: "/propertyowner/revenue-analytics", goldOnly: false },
      { label: "Expense Reports", href: "/propertyowner/expense-reports", goldOnly: false },
      { label: "Tenant Analytics", href: "/propertyowner/tenant-analytics", goldOnly: false },
      { label: "Collection Reports", href: "/propertyowner/collection-report", goldOnly: false },
      { label: "Complaint Analytics", href: "/propertyowner/complaint-analytics", goldOnly: false },
      { label: "Staff Reports", href: "/propertyowner/staff-reports", goldOnly: false },
      { label: "Export Reports", href: "/propertyowner/export-reports", goldOnly: false },
    ]
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/propertyowner/documents",
    submenus: [
      { label: "Agreements", href: "/propertyowner/agreement", goldOnly: false },
      { label: "Tenant Documents", href: "/propertyowner/tenant-docs", goldOnly: false },
      { label: "Staff Documents", href: "/propertyowner/staff-documents", goldOnly: false },
      { label: "Property Documents", href: "/propertyowner/property-documents", goldOnly: false },
      { label: "Uploaded Files", href: "/propertyowner/uploaded-files", goldOnly: false },
      { label: "Digital Signatures", href: "/propertyowner/digital-signatures", goldOnly: false },
    ]
  },
  {
    label: "Subscription & Billing",
    icon: ShieldCheck,
    href: "/propertyowner/current-plan",
    submenus: [
      { label: "Current Plan", href: "/propertyowner/current-plan", goldOnly: false },
      { label: "Upgrade Plan", href: "/propertyowner/upgrade-plan", goldOnly: false },
      { label: "Billing History", href: "/propertyowner/billing-history", goldOnly: false },
      { label: "Invoices", href: "/propertyowner/invoices", goldOnly: false },
      { label: "Payment Methods", href: "/propertyowner/payment-methods", goldOnly: false },
    ]
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/propertyowner/settings",
    submenus: [
      { label: "Profile Settings", href: "/propertyowner/ownerprofile", goldOnly: false },
      { label: "Company Settings", href: "/propertyowner/company-settings", goldOnly: false },
      { label: "Property Settings", href: "/propertyowner/property-settings-global", goldOnly: false },
      { label: "Notification Settings", href: "/propertyowner/notification-settings", goldOnly: false },
      { label: "Payment Gateway", href: "/propertyowner/payment-gateway", goldOnly: false },
      { label: "Bank Accounts", href: "/propertyowner/bank-accounts", goldOnly: false },
      { label: "Integrations", href: "/propertyowner/integrations", goldOnly: false },
      { label: "Role Permissions", href: "/propertyowner/role-permissions", goldOnly: false },
      { label: "Language Settings", href: "/propertyowner/language-settings", goldOnly: false },
      { label: "Theme Settings", href: "/propertyowner/theme-settings", goldOnly: false },
    ]
  }
];

export const GOLD_NAV = PROPERTY_OWNER_NAV;
export const SILVER_NAV = PROPERTY_OWNER_NAV;
export const BASE_NAV = PROPERTY_OWNER_NAV;
