import React, { useEffect, useMemo, useState } from "react";
import { useHtmlPage } from "../../utils/htmlPage";
import { fetchJson } from "../../utils/api";

const monthKey = (dateLike) => {
  const d = new Date(dateLike || Date.now());
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 7);
  return d.toISOString().slice(0, 7);
};

const calcToBePaid = (rentAmount, isFirstMonth) => {
  const rent = Number(rentAmount || 0);
  const commission = isFirstMonth ? rent * 0.1 : 0;
  const serviceFee = 50;
  const toBePaid = Math.max(rent - commission - serviceFee, 0);
  return { rent, commission, serviceFee, toBePaid };
};

export default function Platform() {
  useHtmlPage({
    title: "Roomhy - Platform Commissions",
    bodyClass: "text-slate-800",
    htmlAttrs: { lang: "en" },
    metas: [
      { charset: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
      { rel: "stylesheet", href: "/superadmin/assets/css/platform.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { src: "https://unpkg.com/lucide@latest" }],
    inlineScripts: []
  });

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadCommission = async () => {
    try {
      setErrorMsg("");
      const [tenantRes, ownerRes, rentRes] = await Promise.all([
        fetchJson("/api/tenants").catch(() => ({ tenants: [] })),
        fetchJson("/api/owners").catch(() => ({ owners: [] })),
        fetchJson("/api/rents").catch(() => ({ rents: [] }))
      ]);

      const tenants = Array.isArray(tenantRes) ? tenantRes : (tenantRes.tenants || []);
      const owners = Array.isArray(ownerRes) ? ownerRes : (ownerRes.owners || ownerRes.data || []);
      const rents = Array.isArray(rentRes) ? rentRes : (rentRes.rents || []);

      const ownerMap = {};
      owners.forEach((o) => {
        const key = String(o.loginId || o.ownerLoginId || o._id || "").trim().toUpperCase();
        if (key) ownerMap[key] = o;
      });

      const currentMonth = new Date().toISOString().slice(0, 7);

      const rowsData = tenants.map((tenant) => {
        const tenantLoginId = String(tenant.loginId || "").trim().toUpperCase();
        const rent = rents.find((r) => String(r.tenantLoginId || "").trim().toUpperCase() === tenantLoginId) || null;
        const ownerId = String(tenant.ownerLoginId || tenant.ownerId || (rent && rent.ownerLoginId) || "").trim().toUpperCase();
        if (!rent || !ownerId) return null;

        const owner = ownerMap[ownerId] || {};
        const ownerName = owner.name || owner.ownerName || owner.profile?.name || ownerId || "Unknown Owner";
        const propertyName = rent.propertyName || tenant.property?.title || tenant.property?.name || "Unknown Property";
        const tenantName = tenant.name || "Tenant";
        const tenantId = tenant.loginId || "-";

        const moveInMonth = monthKey(tenant.moveInDate || tenant.createdAt || Date.now());
        const isFirstMonth = moveInMonth === currentMonth;
        const rentAmount = Number(rent.rentAmount || rent.totalDue || tenant.agreedRent || 0);
        const calc = calcToBePaid(rentAmount, isFirstMonth);
        const status = String(rent.ownerPayoutStatus || "pending").toLowerCase();

        return {
          ownerName,
          ownerId,
          propertyName,
          tenantName,
          tenantId,
          firstMonth: isFirstMonth,
          rent: calc.rent,
          commission: calc.commission,
          serviceFee: calc.serviceFee,
          toBePaid: calc.toBePaid,
          status
        };
      }).filter(Boolean);

      setRows(rowsData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err?.body || err?.message || "Failed to load commission data");
    }
  };

  useEffect(() => {
    loadCommission();
  }, []);

  useEffect(() => {
    if (window?.lucide) window.lucide.createIcons();
  }, [rows]);

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, r) => {
        acc.revenue += r.commission + r.serviceFee;
        acc.pending += r.status === "paid" ? 0 : r.toBePaid;
        return acc;
      },
      { revenue: 0, pending: 0 }
    );
  }, [rows]);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Platform Commissions</h1>
            <p className="text-sm text-slate-500">Track and manage system revenue and owner payouts.</p>
          </div>
          <button onClick={loadCommission} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            <i data-lucide="refresh-cw" className="w-4 h-4"></i> Refresh
          </button>
        </div>

        <main className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Revenue</div>
              <div className="text-2xl font-bold text-slate-900">₹{totals.revenue.toLocaleString("en-IN")}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Pending Payout</div>
              <div className="text-2xl font-bold text-slate-900">₹{totals.pending.toLocaleString("en-IN")}</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 text-xs text-gray-600 uppercase border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">Owner</th>
                    <th className="px-4 py-3 text-left">Property</th>
                    <th className="px-4 py-3 text-left">Tenant</th>
                    <th className="px-4 py-3 text-left">Rent</th>
                    <th className="px-4 py-3 text-left">Commission</th>
                    <th className="px-4 py-3 text-left">Service Fee</th>
                    <th className="px-4 py-3 text-left">To Be Paid</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading && (
                    <tr><td colSpan={8} className="py-8 text-center text-gray-500">Loading...</td></tr>
                  )}
                  {!loading && errorMsg && (
                    <tr><td colSpan={8} className="py-8 text-center text-red-500">{errorMsg}</td></tr>
                  )}
                  {!loading && !errorMsg && rows.length === 0 && (
                    <tr><td colSpan={8} className="py-8 text-center text-gray-500">No commission data available.</td></tr>
                  )}
                  {rows.map((row, idx) => (
                    <tr key={`${row.ownerId}-${idx}`}>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{row.ownerName}</div>
                        <div className="text-xs text-gray-500">{row.ownerId}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.propertyName}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-800">{row.tenantName}</div>
                        <div className="text-xs text-gray-500">{row.tenantId}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{row.rent.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-sm text-purple-700 font-semibold">₹{row.commission.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-sm text-blue-700 font-semibold">₹{row.serviceFee.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-sm text-green-700 font-bold">₹{row.toBePaid.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


