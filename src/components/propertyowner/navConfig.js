import { 
  LayoutDashboard, BedDouble, Users, CalendarCheck, MessageCircle, 
  User, Settings, MapPin, FileText, Building2, PlusCircle, DoorOpen,
  Image, Globe, QrCode, UserCheck, Bell, CalendarClock, HelpCircle,
  Eye, Wallet, CheckCircle, BellRing, Receipt, Link, Repeat, Calculator,
  FileBadge, TrendingUp, BarChart3, AlertTriangle, PieChart, CreditCard,
  AlertCircle, Megaphone, MessageSquare, Star, FolderOpen
} from 'lucide-react';

// ============================================
// PROPERTY OWNER NAVIGATION - CLEAN VERSION
// ============================================
// Based on approved 39 features structure
// Matches react-app implementation
// ============================================

export const PROPERTY_OWNER_NAV = [
  // ==================== DASHBOARD ====================
  {
    label: 'Dashboard',
    href: '/propertyowner/admin',
    icon: LayoutDashboard,
    goldOnly: false,
    description: 'Overview of your properties and operations'
  },

  // ==================== PROPERTY & ROOMS ====================
  {
    label: 'Property & Rooms',
    icon: Building2,
    goldOnly: false,
    description: 'Manage properties, rooms and facilities',
    submenus: [
      { label: 'My Properties', href: '/propertyowner/properties', goldOnly: false, icon: Building2 },
      { label: 'Add New Property', href: '/propertyowner/add-property', goldOnly: false, icon: PlusCircle },
      { label: 'Room Management', href: '/propertyowner/rooms', goldOnly: false, icon: DoorOpen },
      { label: 'Room Photos Gallery', href: '/propertyowner/room-photos', goldOnly: false, icon: Image, badge: 'New' },
      { label: 'Property Listing Page', href: '/propertyowner/listing', goldOnly: true, icon: Globe, badge: 'Coming Soon' },
      { label: 'QR Code Generator', href: '/propertyowner/qr-code', goldOnly: true, icon: QrCode, badge: 'Coming Soon' }
    ]
  },

  // ==================== TENANT MANAGEMENT ====================
  {
    label: 'Tenant Management',
    icon: Users,
    goldOnly: false,
    description: 'Manage all tenant-related activities',
    submenus: [
      { label: 'All Tenants', href: '/propertyowner/tenants', goldOnly: false, icon: Users },
      { label: 'Tenant Records', href: '/propertyowner/tenantrec', goldOnly: false, icon: UserCheck },
      { label: 'Rent Agreement Generator', href: '/propertyowner/agreement', goldOnly: true, icon: FileText, badge: 'Coming Soon' },
      { label: 'Tenant Documents Viewer', href: '/propertyowner/tenant-docs', goldOnly: true, icon: FolderOpen, badge: 'Coming Soon' }
    ]
  },

  // ==================== BOOKINGS & LEADS ====================
  {
    label: 'Bookings & Leads',
    icon: CalendarCheck,
    goldOnly: false,
    description: 'Lead management and booking system',
    submenus: [
      { label: 'Booking Requests', href: '/propertyowner/booking_request', goldOnly: false, icon: Bell },
      { label: 'All Bookings', href: '/propertyowner/booking', goldOnly: false, icon: CalendarCheck },
      { label: 'Schedule Visits', href: '/propertyowner/schedulevisit', goldOnly: false, icon: CalendarClock },
      { label: 'Enquiries', href: '/propertyowner/enquiry', goldOnly: false, icon: HelpCircle },
      { label: 'Enhanced Booking View', href: '/propertyowner/booking-enhanced', goldOnly: true, icon: Eye, badge: 'Coming Soon' }
    ]
  },

  // ==================== RENT COLLECTION ====================
  {
    label: 'Rent Collection',
    icon: Wallet,
    goldOnly: false,
    description: 'Automated rent collection and payment tracking',
    submenus: [
      { label: 'Record Payment', href: '/propertyowner/payment', goldOnly: false, icon: Wallet },
      { label: 'Payment Received', href: '/propertyowner/payment-received', goldOnly: false, icon: CheckCircle },
      { label: 'Auto Rent Reminders', href: '/propertyowner/auto-reminders', goldOnly: true, icon: BellRing, badge: 'New' },
      { label: 'Instant Payment Receipts', href: '/propertyowner/receipts', goldOnly: true, icon: Receipt, badge: 'New' },
      { label: 'Payment Link Generator', href: '/propertyowner/payment-link', goldOnly: true, icon: Link, badge: 'Coming Soon' },
      { label: 'Recurring Dues Setup', href: '/propertyowner/recurring-dues', goldOnly: true, icon: Repeat, badge: 'Coming Soon' },
      { label: 'Late Fine Calculator', href: '/propertyowner/late-fine', goldOnly: true, icon: Calculator, badge: 'Coming Soon' },
      { label: 'HRA & GST Receipts', href: '/propertyowner/hra-gst', goldOnly: true, icon: FileBadge, badge: 'Coming Soon' },
      { label: 'Payment Tracking Dashboard', href: '/propertyowner/payment-dashboard', goldOnly: true, icon: TrendingUp, badge: 'Coming Soon' }
    ]
  },

  // ==================== REPORTS & ACCOUNTING ====================
  {
    label: 'Reports & Accounting',
    icon: BarChart3,
    goldOnly: false,
    description: 'Financial reports and accounting',
    submenus: [
      { label: 'Collection Report', href: '/propertyowner/collection-report', goldOnly: false, icon: BarChart3, badge: 'New' },
      { label: 'Dues Report', href: '/propertyowner/dues-report', goldOnly: false, icon: AlertTriangle, badge: 'New' },
      { label: 'Occupancy Report', href: '/propertyowner/occupancy-report', goldOnly: true, icon: PieChart, badge: 'Coming Soon' },
      { label: 'Revenue Analytics', href: '/propertyowner/revenue-analytics', goldOnly: true, icon: TrendingUp, badge: 'Coming Soon' },
      { label: 'Expense Tracking', href: '/propertyowner/expense-tracking', goldOnly: true, icon: CreditCard, badge: 'Coming Soon' }
    ]
  },

  // ==================== COMMUNICATION ====================
  {
    label: 'Communication',
    icon: MessageCircle,
    goldOnly: false,
    description: 'Chat and communication tools',
    submenus: [
      { label: 'Owner Chat', href: '/propertyowner/ownerchat', goldOnly: false, icon: MessageCircle },
      { label: 'Complaints', href: '/propertyowner/complaints', goldOnly: false, icon: AlertCircle },
      { label: 'Bulk Announcements', href: '/propertyowner/announcements', goldOnly: true, icon: Megaphone, badge: 'Coming Soon' },
      { label: 'WhatsApp Integration', href: '/propertyowner/whatsapp', goldOnly: true, icon: MessageSquare, badge: 'Coming Soon' }
    ]
  },

  // ==================== DOCUMENTS & REVIEWS ====================
  {
    label: 'Documents & Reviews',
    icon: FileText,
    goldOnly: false,
    description: 'Document management and reviews',
    submenus: [
      { label: 'Documents', href: '/propertyowner/documents', goldOnly: false, icon: FileText },
      { label: 'Reviews', href: '/propertyowner/review', goldOnly: false, icon: Star },
      { label: 'Location', href: '/propertyowner/location', goldOnly: false, icon: MapPin }
    ]
  },

  // ==================== SETTINGS & PROFILE ====================
  {
    label: 'Settings',
    href: '/propertyowner/settings',
    icon: Settings,
    goldOnly: false,
    description: 'Account settings and preferences'
  },
  {
    label: 'My Profile',
    href: '/propertyowner/ownerprofile',
    icon: User,
    goldOnly: false,
    description: 'Your profile and account details'
  }
];

// ============================================
// TIER-BASED NAVIGATION FILTERS
// ============================================

export const GOLD_NAV = PROPERTY_OWNER_NAV;

export const SILVER_NAV = PROPERTY_OWNER_NAV.map(parent => {
  if (parent.submenus) {
    const filteredSubmenus = parent.submenus.filter(sub => !sub.goldOnly);
    if (filteredSubmenus.length === 0 && parent.goldOnly) {
      return null; // Remove parent if all submenus are gold-only
    }
    return {
      ...parent,
      submenus: filteredSubmenus
    };
  }
  return parent.goldOnly ? null : parent;
}).filter(Boolean);

// ============================================
// LEGACY SUPPORT (for backward compatibility)
// ============================================

export const BASE_NAV = PROPERTY_OWNER_NAV;
