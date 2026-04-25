import React, { useEffect, useState, useRef } from "react";
import { useHeadAssets } from "../../utils/useHeadAssets.js";
import { useTailwindProcessor } from "../../utils/useTailwindProcessor.js";
import { fetchJson } from "../../utils/api";

const title = "Roomhy - Super Admin Dashboard";
const metas = [
  { charset: "UTF-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1.0" }
];
const links = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic", crossorigin: true },
  { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap", rel: "stylesheet" },
  { rel: "stylesheet", href: "/superadmin/assets/css/superadmin.css" }
];
const scripts = [
  { src: "https://cdn.tailwindcss.com" },
  { src: "https://unpkg.com/lucide@latest" },
  { src: "https://cdn.jsdelivr.net/npm/chart.js" }
];

export default function SuperadminSuperadminPage() {
  useHeadAssets({ title, metas, links, scripts, htmlAttrs: { lang: "en" }, bodyAttrs: { class: "text-slate-800" } });
  useTailwindProcessor();

  const [stats, setStats] = useState({
    tenants: 0,
    properties: 0,
    owners: 0,
    totalBookingAmount: 0,
    platformCommission: 0,
    serviceFee: 0,
    netRevenue: 0
  });
  const [recentSignups, setRecentSignups] = useState([]);
  const [loading, setLoading] = useState(true);

  const revenueChartRef = useRef(null);
  const userDistChartRef = useRef(null);
  const revenueChartInstance = useRef(null);
  const userDistChartInstance = useRef(null);

  const initializeMockData = () => {
    if (!localStorage.getItem("roomhy_tenants")) {
      localStorage.setItem("roomhy_tenants", JSON.stringify([
        { name: "Rahul Sharma", role: "tenant", moveInDate: "2024-10-20", kycStatus: "verified" },
        { name: "Priya Singh", role: "tenant", moveInDate: "2024-10-22", kycStatus: "pending" },
        { name: "Amit Patel", role: "tenant", moveInDate: "2024-10-25", kycStatus: "verified" }
      ]));
    }
    if (!localStorage.getItem("roomhy_owners_db")) {
      localStorage.setItem("roomhy_owners_db", JSON.stringify({
        "OWNER001": { profile: { name: "Vijay Khanna" }, properties: [{}, {}] },
        "OWNER002": { profile: { name: "Anil Kapoor" }, properties: [{}] }
      }));
    }
    if (!localStorage.getItem("roomhy_properties")) {
      localStorage.setItem("roomhy_properties", JSON.stringify([
        { name: "Green View Villa", owner: "Vijay Khanna", area: "Koramangala" },
        { name: "Skyline Heights", owner: "Anil Kapoor", area: "Indiranagar" }
      ]));
    }
  };

  const loadData = async () => {
    setLoading(true);
    initializeMockData();

    const tenants = JSON.parse(localStorage.getItem("roomhy_tenants") || "[]");
    const ownersDB = JSON.parse(localStorage.getItem("roomhy_owners_db") || "{}");
    const properties = JSON.parse(localStorage.getItem("roomhy_properties") || "[]");

    setRecentSignups(tenants.slice(-5).reverse());

    try {
      const rents = await fetchJson("/api/rents").catch(() => []);
      let totalBookingAmount = 0;
      let platformCommission = 0;
      let serviceFee = 0;
      const monthBuckets = {};

      (Array.isArray(rents) ? rents : (rents.rents || [])).forEach((rent) => {
        const rentAmount = Number(rent.rentAmount || rent.totalDue || 0);
        const commission = Number(rent.commissionAmount || (rentAmount * 0.10));
        const fee = Number(rent.serviceFeeAmount || 50);
        const month = (rent.collectionMonth || "").trim() || "Unknown";

        totalBookingAmount += rentAmount;
        platformCommission += commission;
        serviceFee += fee;
        monthBuckets[month] = (monthBuckets[month] || 0) + commission + fee;
      });

      const netRevenue = platformCommission + serviceFee;
      setStats({
        tenants: tenants.length,
        properties: properties.length,
        owners: Object.keys(ownersDB).length,
        totalBookingAmount,
        platformCommission,
        serviceFee,
        netRevenue
      });

      const months = Object.keys(monthBuckets).sort().slice(-6);
      if (revenueChartInstance.current && months.length > 0) {
        revenueChartInstance.current.data.labels = months;
        revenueChartInstance.current.data.datasets[0].data = months.map(m => Math.round(monthBuckets[m]));
        revenueChartInstance.current.update();
      }
    } catch (err) {
      console.error("Dashboard calculation error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    if (window.lucide) window.lucide.createIcons();
  }, []);

  useEffect(() => {
    if (!window.Chart) return;

    if (revenueChartRef.current && !revenueChartInstance.current) {
      revenueChartInstance.current = new window.Chart(revenueChartRef.current.getContext("2d"), {
        type: "line",
        data: {
          labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
          datasets: [{
            label: "Revenue (₹)",
            data: [120000, 190000, 170000, 250000, 310000, 425000],
            borderColor: "#a855f7",
            tension: 0.4,
            fill: true,
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            pointRadius: 4,
            pointBackgroundColor: "#a855f7"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: "#f1f5f9" }, ticks: { font: { size: 10 } } },
            x: { grid: { display: false }, ticks: { font: { size: 10 } } }
          }
        }
      });
    }

    if (userDistChartRef.current && !userDistChartInstance.current) {
      userDistChartInstance.current = new window.Chart(userDistChartRef.current.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: ["Tenants", "Owners", "Staff"],
          datasets: [{
            data: [65, 25, 10],
            backgroundColor: ["#a855f7", "#3b82f6", "#f59e0b"],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } } }
        }
      });
    }

    return () => {
      if (revenueChartInstance.current) revenueChartInstance.current.destroy();
      if (userDistChartInstance.current) userDistChartInstance.current.destroy();
      revenueChartInstance.current = null;
      userDistChartInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [recentSignups, loading]);

  return (
    <main className="p-4 md:p-8 lg:p-10 space-y-10">
      <div className="max-w-[1600px] mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Platform Overview</h1>
            <p className="text-base text-slate-500 mt-2">Real-time performance metrics and platform growth statistics.</p>
          </div>
          <button onClick={loadData} className="w-fit bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center shadow-sm">
            <i data-lucide="refresh-cw" className="w-4 h-4 mr-2"></i> Refresh Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-purple-100 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all"><i data-lucide="users" className="w-6 h-6"></i></div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Tenants</h3>
            <p className="text-3xl font-bold text-slate-800 mt-1">{stats.tenants}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-blue-100 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all"><i data-lucide="home" className="w-6 h-6"></i></div>
              <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">Growth</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Properties</h3>
            <p className="text-3xl font-bold text-slate-800 mt-1">{stats.properties}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-orange-100 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all"><i data-lucide="briefcase" className="w-6 h-6"></i></div>
              <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full">Partners</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Property Owners</h3>
            <p className="text-3xl font-bold text-slate-800 mt-1">{stats.owners}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-emerald-100 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all"><i data-lucide="indian-rupee" className="w-6 h-6"></i></div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">Revenue</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Platform Revenue</h3>
            <p className="text-3xl font-bold text-slate-800 mt-1">₹{stats.netRevenue.toLocaleString()}</p>
            
            <div className="mt-4 pt-4 border-t border-slate-50 space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight">
                <span className="text-slate-400">Booking Vol.</span>
                <span className="text-slate-600">₹{stats.totalBookingAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight">
                <span className="text-slate-400">Commission</span>
                <span className="text-purple-600">₹{stats.platformCommission.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                Revenue Growth
              </h3>
              <select className="text-xs border-slate-200 rounded-lg p-2 bg-slate-50 font-bold text-slate-600 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-72"><canvas ref={revenueChartRef}></canvas></div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                User Distribution
              </h3>
              <button className="text-xs text-purple-600 font-bold hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-all">Analytics Hub</button>
            </div>
            <div className="h-72 flex items-center justify-center relative">
              <canvas ref={userDistChartRef}></canvas>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-6">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total Users</p>
                <p className="text-2xl font-black text-slate-800">1.2k</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <i data-lucide="zap" className="w-5 h-5 text-amber-500 fill-amber-500"></i>
              Recent Registrations
            </h3>
            <a href="/superadmin/new_signups" className="text-purple-600 text-sm font-bold hover:underline bg-white px-4 py-1.5 rounded-lg border border-purple-100 shadow-sm transition-all hover:bg-purple-600 hover:text-white">View All Signups</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">User Details</th>
                  <th className="px-8 py-4">Account Type</th>
                  <th className="px-8 py-4">Registration Date</th>
                  <th className="px-8 py-4">Verification</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentSignups.length === 0 ? (
                  <tr><td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-medium">No recent registrations synchronized.</td></tr>
                ) : (
                  recentSignups.map((user, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-purple-100">
                            {(user.name || "U")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{user.name}</p>
                            <p className="text-xs text-slate-400">ID: #{Math.floor(Math.random()*10000)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-1 rounded-md">{user.role}</span>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600 font-medium">{user.moveInDate || "Today"}</td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.kycStatus === "verified" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.kycStatus === "verified" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                          {user.kycStatus || "pending"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"><i data-lucide="eye" className="w-4 h-4"></i></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
