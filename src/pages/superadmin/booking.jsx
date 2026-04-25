import React, { useEffect, useMemo, useState } from "react";
import { useHtmlPage } from "../../utils/htmlPage";
import { fetchJson } from "../../utils/api";

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export default function SuperadminBookingPage() {
  useHtmlPage({
    title: "Roomhy - Bookings",
    bodyClass: "text-slate-800",
    htmlAttrs: { lang: "en" },
    metas: [
      { charset: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: true },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
      { rel: "stylesheet", href: "/superadmin/assets/css/booking.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { src: "https://unpkg.com/lucide@latest" }],
    inlineScripts: []
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadBookings = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await fetchJson("/api/booking/requests");
      const rows = data?.data || [];
      setBookings(rows);
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Error loading bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (window?.lucide) window.lucide.createIcons();
  }, [bookings, search, statusFilter]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const status = String(booking.booking_status || booking.bookingStatus || booking.status || "pending").toLowerCase();
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const haystack = JSON.stringify(booking).toLowerCase();
      const matchesSearch = !search.trim() || haystack.includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  const stats = useMemo(() => {
    const confirmed = bookings.filter((item) => ["confirmed", "active", "completed", "booked"].includes(String(item.booking_status || item.bookingStatus || item.status || "").toLowerCase()));
    const pending = bookings.filter((item) => String(item.status || item.booking_status || "pending").toLowerCase() === "pending");
    const totalValue = confirmed.reduce((sum, item) => sum + Number(item.payment_amount || item.total_amount || item.totalAmount || 0), 0);
    return { confirmed: confirmed.length, pending: pending.length, totalValue };
  }, [bookings]);

  return (
    <main className="p-4 md:p-8 bg-slate-50/50 min-h-full">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Booking Requests</h1>
            <p className="text-sm text-slate-500 mt-1">All booking-form completions and booking requests from MongoDB.</p>
          </div>
          <button onClick={loadBookings} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center shadow-lg shadow-purple-600/20 transition-all active:scale-95">
            <i data-lucide="refresh-cw" className="w-4 h-4 mr-2"></i> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Bookings</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confirmed / Active</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.confirmed}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Booking Value</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{formatCurrency(stats.totalValue)}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input 
              value={search} 
              onChange={(event) => setSearch(event.target.value)} 
              placeholder="Search booking id, user, property..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm" 
            />
            <i data-lucide="search" className="absolute left-3 top-3 w-4 h-4 text-slate-400"></i>
          </div>
          <select 
            value={statusFilter} 
            onChange={(event) => setStatusFilter(event.target.value)} 
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white font-medium text-slate-700"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1600px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Booking</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tenant</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Guardian</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Dates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && (
                  <tr>
                    <td colSpan={10} className="py-20 text-center text-slate-400 font-medium">Loading bookings...</td>
                  </tr>
                )}
                {!loading && errorMsg && (
                  <tr>
                    <td colSpan={10} className="py-20 text-center text-rose-500 font-medium">{errorMsg}</td>
                  </tr>
                )}
                {!loading && !errorMsg && filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan={10} className="py-20 text-center text-slate-400 font-medium">No bookings found</td>
                  </tr>
                )}
                {filteredBookings.map((booking) => {
                  const bookingStatus = booking.booking_status || booking.bookingStatus || booking.status || "pending";
                  const address = booking.full_address || [booking.address_street, booking.address_city, booking.address_state, booking.address_postal_code].filter(Boolean).join(", ") || "-";
                  const status = String(bookingStatus).toLowerCase();
                  const statusBadge = 
                    status === "confirmed" || status === "active" || status === "completed" || status === "booked"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : status === "rejected" || status === "cancelled"
                      ? "bg-rose-50 text-rose-700 border-rose-100"
                      : "bg-amber-50 text-amber-700 border-amber-100";
                      
                  return (
                    <tr key={booking._id} className="hover:bg-slate-50/50 align-top transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 text-sm">{booking._id?.slice(-8)?.toUpperCase() || "-"}</div>
                        <div className="text-[10px] font-mono text-purple-600 mt-1">{booking.user_id || "-"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-700 text-xs">{booking.property_name || booking.property_id || "-"}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{booking.area || "-"} | {booking.property_type || "-"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 text-xs">{booking.name || "-"}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{booking.email || "-"}</div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">{booking.phone || "-"}</td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-700 font-medium">{booking.guardian_name || "-"}</div>
                        <div className="text-[10px] text-slate-400">{booking.guardian_phone || "-"}</div>
                      </td>
                      <td className="px-6 py-4 max-w-xs whitespace-normal break-words text-[10px] text-slate-500 leading-relaxed">{address}</td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-[10px] text-slate-700">{booking.payment_id || booking.paymentId || "-"}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{booking.payment_method || "-"} | {booking.payment_status || "-"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 text-sm">{formatCurrency(booking.payment_amount || booking.total_amount || booking.totalAmount || 0)}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Rent: {formatCurrency(booking.rent_amount || 0)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusBadge}`}>
                          {bookingStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[10px] text-slate-500 space-y-1">
                        <div className="flex items-center gap-1"><i data-lucide="clock" className="w-3 h-3"></i> {formatDate(booking.created_at || booking.createdAt)}</div>
                        <div className="text-purple-600 font-medium">In: {formatDate(booking.check_in_date || booking.checkInDate)}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
