import React, { useEffect, useMemo, useState } from "react";
import { fetchJson } from "../../utils/api";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { useHtmlPage } from "../../utils/htmlPage";
import {
  Users,
  BedDouble,
  IndianRupee,
  ArrowUpRight,
  BarChart2
} from "lucide-react";
import {
  clearOwnerRuntimeSession,
  fetchOwnerTenants,
  formatDate,
  getOwnerRuntimeSession
} from "../../utils/propertyowner";

export default function Admin() {
  useHtmlPage({
    title: "Roomhy - Owner Dashboard",
    bodyClass: "text-slate-800",
    htmlAttrs: { lang: "en" },
    metas: [
      { charset: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" }
    ],
    links: [
      { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap", rel: "stylesheet" },
      { rel: "stylesheet", href: "/propertyowner/assets/css/admin.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { src: "https://unpkg.com/lucide@latest" }],
    inlineScripts: []
  });

  const [owner, setOwner] = useState(null);
  const [roomsCount, setRoomsCount] = useState(0);
  const [tenantsCount, setTenantsCount] = useState(0);
  const [rentTotal, setRentTotal] = useState(0);
  const [enquiries, setEnquiries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const notificationCount = useMemo(
    () => {
      const pendingEnquiries = enquiries.filter((item) => ["pending", "hold"].includes(String(item.status || "").toLowerCase())).length;
      const unreadNotifs = notifications.filter(n => !n.read).length;
      return pendingEnquiries + unreadNotifs;
    },
    [enquiries, notifications]
  );

  useEffect(() => {
    if (window?.lucide?.createIcons) window.lucide.createIcons();
  }, [owner, enquiries, loading]);

  const loadDashboard = async (loginId) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [ownerRes, roomsRes, tenantsRes, rentRes, enquiryRes, notificationRes] = await Promise.all([
        fetchJson(`/api/owners/${encodeURIComponent(loginId)}`).catch(() => null),
        fetchJson(`/api/owners/${encodeURIComponent(loginId)}/rooms`),
        fetchOwnerTenants(loginId),
        fetchJson(`/api/owners/${encodeURIComponent(loginId)}/rent`),
        fetchJson(`/api/owners/${encodeURIComponent(loginId)}/enquiries`),
        fetchJson(`/api/notifications?toLoginId=${encodeURIComponent(loginId)}`)
      ]);
      setOwner((prev) => ({ ...prev, ...(ownerRes || {}) }));
      setRoomsCount((roomsRes?.rooms || []).length);
      setTenantsCount((Array.isArray(tenantsRes) ? tenantsRes : tenantsRes?.tenants || []).length);
      setRentTotal(rentRes?.totalRent || 0);
      setEnquiries(Array.isArray(enquiryRes) ? enquiryRes : enquiryRes?.enquiries || []);
      setNotifications(Array.isArray(notificationRes) ? notificationRes : []);
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const session = getOwnerRuntimeSession();
    if (!session?.loginId) {
      window.location.href = "/propertyowner/ownerlogin";
      return;
    }
    setOwner(session);
    loadDashboard(session.loginId);
  }, []);

  const handleEnquiryAction = async (enquiryId, status) => {
    try {
      await fetchJson(`/api/owners/enquiries/${encodeURIComponent(enquiryId)}`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      if (owner?.loginId) {
        await loadDashboard(owner.loginId);
      }
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Failed to update enquiry.");
    }
  };

  return (
    <PropertyOwnerLayout
      owner={owner}
      title="Dashboard"
      navVariant="default"
      notificationCount={notificationCount}
      notifications={[
        ...notifications.slice(0, 10).map(n => {
          const meta = typeof n.meta === 'string' ? JSON.parse(n.meta) : (n.meta || {});
          return {
            ...n,
            title: meta.title || n.title || (n.type === 'user_filter_match' ? 'New Lead Match' : 'Notification'),
            message: meta.message || n.message || '',
            type: n.type,
            meta: meta
          };
        }),
        ...enquiries.slice(0, 5).map((item) => ({
          title: item.propertyName || item.property?.name || "Enquiry",
          message: `${item.name || item.tenantName || "Tenant"} | ${item.status || "pending"}`,
          type: 'enquiry',
          meta: { bookingId: item._id }
        }))
      ]}
      onLogout={() => {
        clearOwnerRuntimeSession();
        window.location.href = "/propertyowner/ownerlogin";
      }}
      contentClassName="max-w-7xl mx-auto"
    >
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome back, {owner?.name || "Owner"}!</h1>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening with your properties today.</p>
        </div>
      </div>

      {errorMsg ? <div className="text-sm text-red-600 mb-4">{errorMsg}</div> : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Tenants Card - Emerald */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 transition-all hover:translate-y-[-4px] hover:shadow-md group">
           <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <Users size={24} />
           </div>
           <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Total Tenants</p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{loading ? "..." : tenantsCount}</h4>
              <div className="flex items-center gap-1.5 mt-2">
                 <ArrowUpRight size={12} className="text-emerald-500" />
                 <span className="text-[10px] font-bold text-slate-400 truncate">+ 12.5% from last week</span>
              </div>
           </div>
        </div>

        {/* Rooms Card - Purple */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 transition-all hover:translate-y-[-4px] hover:shadow-md group">
           <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <BedDouble size={24} />
           </div>
           <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Total Rooms</p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{loading ? "..." : roomsCount}</h4>
              <div className="flex items-center gap-1.5 mt-2">
                 <ArrowUpRight size={12} className="text-emerald-500" />
                 <span className="text-[10px] font-bold text-slate-400 truncate">+ 8.3% from last week</span>
              </div>
           </div>
        </div>

        {/* Rent Card - Blue */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-5 transition-all hover:translate-y-[-4px] hover:shadow-md group">
           <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <IndianRupee size={24} />
           </div>
           <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Rent Collected</p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none">₹{loading ? "0" : rentTotal.toLocaleString()}</h4>
              <div className="flex items-center gap-1.5 mt-2">
                 <ArrowUpRight size={12} className="text-emerald-500" />
                 <span className="text-[10px] font-bold text-slate-400 truncate">+ 18.6% from last week</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900">Occupancy Overview</h3>
            <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-72 w-full flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
              <BarChart2 className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Performance Data Loading...
            </p>
          </div>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
