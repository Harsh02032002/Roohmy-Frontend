import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, MapPin, Briefcase, Home, Users, FileBadge, 
  FolderOpen, HelpCircle, CalendarCheck, Star, AlertCircle, 
  Globe, Wallet, IndianRupee, RotateCcw, ClipboardList,
  ChevronRight, ArrowUpRight, ArrowDownRight, RefreshCw,
  Sparkles, Layers, Box, Globe2, Activity, ShieldCheck,
  Zap, Headset, Megaphone
} from "lucide-react";
import { fetchJson } from "../../utils/api";

const cn = (...classes) => classes.filter(Boolean).join(" ");

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

        if (storedUser.role === 'areamanager' || storedUser.role === 'manager' || storedUser.role === 'employee') {
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
                pendingApprovals: 12, // Mock for high-fidelity
                activeOwners: 45      // Mock for high-fidelity
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
        { id: 'properties', label: 'Asset Management', desc: 'Manage Listings', icon: Home, color: 'blue', count: stats.properties },
        { id: 'tenants', label: 'Resident Directory', desc: 'Active Residents', icon: Users, color: 'green', count: stats.tenants },
        { id: 'complaint_history', label: 'Resolution Hub', desc: 'Operational Issues', icon: AlertCircle, color: 'orange', count: stats.complaints },
        { id: 'visits', label: 'Field Audits', desc: 'Visit Reports', icon: ClipboardList, color: 'indigo', count: stats.visits }
    ].filter(w => allowedModules.includes(w.id));

    if (!user) return null;

    return (
        <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
            {/* Header Area */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">
                    Welcome back, <span className="text-blue-600">{user.name.split(' ')[0]}</span>!
                </h1>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
                    <span>Territorial Governance</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-blue-600">Regional Intelligence Hub</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <p className="text-sm font-bold text-slate-400 max-w-2xl">Accessing your dedicated territorial dashboard for <span className="text-slate-800">{user.area || user.areaName || 'Head Office'}</span>. Monitor regional performance and operational velocity.</p>
                <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Regional Zone</p>
                        <p className="text-sm font-bold text-slate-800">{user.city || 'National Hub'}</p>
                    </div>
                </div>
            </div>

            {/* Hero Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <StatCardLarge label="Regional Assets" value={stats.properties} trend="Territorial Load" up icon={Home} color="blue" />
                <StatCardLarge label="Awaiting Approval" value={stats.pendingApprovals} trend="Action Queue" up={false} icon={ShieldCheck} color="orange" />
                <StatCardLarge label="Active Owners" value={stats.activeOwners} trend="Growth Hub" up icon={Briefcase} color="green" />
            </div>

            {/* Modules Grid */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Territorial Command Suite</h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Live Performance Feed</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {widgets.map((widget) => {
                        const Icon = widget.icon;
                        const colors = {
                            blue: "bg-blue-600 shadow-blue-200",
                            green: "bg-emerald-600 shadow-emerald-200",
                            orange: "bg-amber-600 shadow-amber-200",
                            indigo: "bg-indigo-600 shadow-indigo-200"
                        };
                        return (
                            <div 
                                key={widget.id}
                                onClick={() => navigate(sidebarConfig[widget.id].to)}
                                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:translate-y-[-8px] transition-all duration-500 group cursor-pointer"
                            >
                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl mb-8 group-hover:rotate-6 transition-transform", colors[widget.color])}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">{widget.label}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">{widget.desc}</p>
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <p className="text-2xl font-bold text-slate-800 tracking-tighter">{widget.count}</p>
                                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Operational Centerpiece */}
            <div className="bg-white rounded-[2.5rem] p-16 border border-slate-100 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-100/50 transition-colors duration-1000" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -ml-32 -mb-32 group-hover:bg-indigo-100/50 transition-colors duration-1000" />
                
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[1.75rem] flex items-center justify-center mx-auto mb-8 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-700">
                        <LayoutDashboard className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">Operational Governance Hub</h3>
                    <p className="text-slate-400 font-bold text-sm max-w-xl mx-auto uppercase tracking-widest leading-relaxed opacity-60">
                        Your dedicated command center for regional oversight. Access level verified for <span className="text-blue-600">{user.role.toUpperCase()}</span>. All actions are audited in real-time.
                    </p>
                    <div className="mt-12 flex justify-center gap-6">
                        <button className="px-8 py-4 bg-slate-800 text-white rounded-2xl text-[10px] font-bold uppercase shadow-xl shadow-slate-800/20 hover:bg-slate-900 transition-all flex items-center gap-2">
                           <Activity className="w-4 h-4" /> Performance Audit
                        </button>
                        <button className="px-8 py-4 bg-white text-slate-400 rounded-2xl text-[10px] font-bold uppercase border border-slate-100 hover:bg-slate-50 transition-all">
                           Resource Center
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCardLarge({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    blue: "bg-blue-600 shadow-blue-200", 
    green: "bg-emerald-600 shadow-emerald-200", 
    indigo: "bg-indigo-600 shadow-indigo-200", 
    orange: "bg-amber-600 shadow-amber-200" 
  };
  
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-8 group hover:translate-y-[-8px] transition-all duration-500">
      <div className={cn("w-20 h-20 rounded-[1.75rem] flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-6", bgColors[color])}>
         <Icon className="w-10 h-10" />
      </div>
      <div>
         <p className="text-[11px] font-bold text-slate-400 uppercase mb-4 leading-none truncate tracking-widest">{label}</p>
         <p className="text-5xl font-bold text-slate-800 tracking-tighter leading-none">{value}</p>
      </div>
      <div className={cn(
        "flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-2xl w-fit shadow-sm border",
        up ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-rose-600 bg-rose-50 border-rose-100"
      )}>
         {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
         {trend}
      </div>
    </div>
  );
}
