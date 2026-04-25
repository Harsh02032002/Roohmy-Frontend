import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, MapPin, Briefcase, Home, Users, FileBadge, 
  FolderOpen, HelpCircle, CalendarCheck, Star, AlertCircle, 
  Globe, Wallet, IndianRupee, RotateCcw, ClipboardList 
} from "lucide-react";
import { fetchJson } from "../../utils/api";

const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5001'
    : 'https://api.roomhy.com';

const sidebarConfig = {
    'dashboard': { label: 'Dashboard', to: '/superadmin/superadmin', icon: LayoutDashboard },
    'teams': { label: 'Teams', to: '/superadmin/manager', icon: MapPin },
    'owners': { label: 'Property Owners', to: '/superadmin/owner', icon: Briefcase },
    'properties': { label: 'Properties', to: '/superadmin/properties', icon: Home },
    'tenants': { label: 'Tenants', to: '/superadmin/tenant', icon: Users },
    'new_signups': { label: 'New Signups', to: '/superadmin/new_signups', icon: FileBadge },
    'web_enquiry': { label: 'Web Enquiry', to: '/superadmin/websiteenq', icon: FolderOpen },
    'enquiries': { label: 'Enquiries', to: '/superadmin/enquiry', icon: HelpCircle },
    'bookings': { label: 'Bookings', to: '/superadmin/booking', icon: CalendarCheck },
    'reviews': { label: 'Reviews', to: '/superadmin/reviews', icon: Star },
    'complaint_history': { label: 'Complaint History', to: '/superadmin/complaint-history', icon: AlertCircle },
    'live_properties': { label: 'Live Properties', to: '/superadmin/website', icon: Globe },
    'rent_collections': { label: 'Rent Collections', to: '/superadmin/rentcollection', icon: Wallet },
    'commissions': { label: 'Commissions', to: '/superadmin/platform', icon: IndianRupee },
    'refunds': { label: 'Refunds', to: '/superadmin/refund', icon: RotateCcw },
    'locations': { label: 'Locations', to: '/superadmin/location', icon: MapPin },
    'visits': { label: 'Visit Reports', to: '/superadmin/visit', icon: ClipboardList }
};

export default function SuperadminAreaadminPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        properties: 0,
        tenants: 0,
        complaints: 0,
        visits: 0,
        pendingApprovals: 0,
        activeOwners: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(
            sessionStorage.getItem('manager_user') || 
            sessionStorage.getItem('user') || 
            localStorage.getItem('manager_user') || 
            localStorage.getItem('user') || 
            'null'
        );

        if (!storedUser || (storedUser.role !== 'areamanager' && storedUser.role !== 'employee' && storedUser.role !== 'superadmin')) {
            navigate('/superadmin/index');
            return;
        }

        // Redirect staff to employee portal if they hit the superadmin route
        if (storedUser.role === 'areamanager' || storedUser.role === 'manager' || storedUser.role === 'employee') {
            // Check if we are already on employee route (App.jsx usually handles this, but safety first)
            if (!window.location.pathname.startsWith('/employee/')) {
                navigate('/employee/areaadmin');
                return;
            }
        }

        setUser(storedUser);
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [props, tenants, complaints, visits] = await Promise.all([
                fetchJson('/api/properties').catch(() => ({ count: 0 })),
                fetchJson('/api/tenants').catch(() => ({ count: 0 })),
                fetchJson('/api/complaints').catch(() => ({ count: 0 })),
                fetchJson('/api/visits').catch(() => ({ count: 0 }))
            ]);

            const parseCount = (payload) => {
                if (Array.isArray(payload)) return payload.length;
                if (Array.isArray(payload?.data)) return payload.data.length;
                if (Array.isArray(payload?.items)) return payload.items.length;
                if (typeof payload?.count === 'number') return payload.count;
                if (typeof payload?.total === 'number') return payload.total;
                return 0;
            };

            setStats({
                properties: parseCount(props),
                tenants: parseCount(tenants),
                complaints: parseCount(complaints),
                visits: parseCount(visits),
                pendingApprovals: 0, // Placeholder
                activeOwners: 0      // Placeholder
            });
        } catch (error) {
            console.error("Failed to load dashboard stats", error);
        } finally {
            setLoading(false);
        }
    };

    const allowedModules = useMemo(() => {
        if (!user) return [];
        if (user.role === 'superadmin' || user.role === 'areamanager') {
            return Object.keys(sidebarConfig);
        }
        const assigned = user.permissions || [];
        return [...new Set([...assigned, 'dashboard'])];
    }, [user]);

    const widgets = [
        { id: 'properties', label: 'Properties', desc: 'Manage Listings', icon: Home, color: 'blue', count: stats.properties },
        { id: 'tenants', label: 'Tenants', desc: 'Active Residents', icon: Users, color: 'green', count: stats.tenants },
        { id: 'complaint_history', label: 'Complaints', desc: 'View Issues', icon: AlertCircle, color: 'red', count: stats.complaints },
        { id: 'visits', label: 'Visit Reports', desc: 'Total Visit Reports', icon: ClipboardList, color: 'purple', count: stats.visits }
    ].filter(w => allowedModules.includes(w.id));

    if (!user) return null;

    return (
        <main className="h-full overflow-y-auto p-4 md:p-8 bg-slate-50/50">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Welcome, <span className="text-purple-600">{user.name}</span>!</h1>
                        <p className="text-sm text-slate-500 mt-1">Accessing <span className="font-semibold text-purple-600">Area Dashboard</span>.</p>
                    </div>
                    
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Area</span>
                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                            <span className="text-sm font-bold text-slate-700">{user.area || user.areaName || 'Head Office'}</span>
                            {user.city && <span className="text-xs text-slate-400 ml-2">({user.city})</span>}
                        </div>
                    </div>
                </div>

                {/* Main Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Properties</p>
                        <h3 className="text-3xl font-bold text-slate-800">{stats.properties}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pending Approvals</p>
                        <h3 className="text-3xl font-bold text-amber-600">{stats.pendingApprovals}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Active Owners</p>
                        <h3 className="text-3xl font-bold text-emerald-600">{stats.activeOwners}</h3>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Access</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {widgets.map((widget) => {
                            const Icon = widget.icon;
                            const colors = {
                                blue: "bg-blue-50 text-blue-600",
                                green: "bg-emerald-50 text-emerald-600",
                                red: "bg-rose-50 text-rose-600",
                                purple: "bg-purple-50 text-purple-600"
                            };
                            return (
                                <div 
                                    key={widget.id}
                                    onClick={() => navigate(sidebarConfig[widget.id].to)}
                                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-xl ${colors[widget.color]} group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{widget.label}</h3>
                                            <p className="text-xs text-slate-400">{widget.desc}</p>
                                            <p className="text-sm font-bold text-slate-700 mt-1">{widget.count}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 p-12 bg-white rounded-3xl border border-slate-200 text-center shadow-sm">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LayoutDashboard className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Operational Module</h3>
                    <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
                        Use the sidebar to navigate through specific modules. Your access level determines which sections are visible and editable.
                    </p>
                </div>
            </div>
        </main>
    );
}
