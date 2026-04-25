import React, { useEffect, useMemo, useState } from "react";
import { useHtmlPage } from "../../utils/htmlPage";
import { fetchJson } from "../../utils/api";

const STATUS_ORDER = ["Open", "Taken", "Resolved", "Rejected"];

export default function ComplaintHistory() {
  useHtmlPage({
    title: "Roomhy - Complaint History & Management",
    bodyClass: "text-gray-900",
    htmlAttrs: { lang: "en" },
    metas: [
      { charset: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" }
    ],
    links: [
      {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        rel: "stylesheet"
      },
      { rel: "stylesheet", href: "/superadmin/assets/css/complaint-history.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { src: "https://unpkg.com/lucide@latest" }],
    inlineScripts: []
  });


  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [actionId, setActionId] = useState("");

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await fetchJson("/api/complaints");
      setComplaints(data?.complaints || data || []);
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  useEffect(() => {
    if (window?.lucide) window.lucide.createIcons();
  }, [complaints, filter, query]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return complaints.filter((c) => {
      const status = String(c.status || "Open");
      if (filter !== "all" && status !== filter) return false;
      if (!normalizedQuery) return true;
      const name = String(c.complaintBy || c.tenantName || c.tenantId || "").toLowerCase();
      const message = String(c.message || c.complaint || c.title || "").toLowerCase();
      return name.includes(normalizedQuery) || message.includes(normalizedQuery);
    });
  }, [complaints, filter, query]);

  const stats = useMemo(() => {
    const total = complaints.length;
    const open = complaints.filter((c) => (c.status || "Open") === "Open").length;
    const taken = complaints.filter((c) => (c.status || "") === "Taken").length;
    const resolved = complaints.filter((c) => (c.status || "") === "Resolved").length;
    const rejected = complaints.filter((c) => (c.status || "") === "Rejected").length;
    return { total, open, taken, resolved, rejected };
  }, [complaints]);

  const updateStatus = async (complaint, status) => {
    if (!complaint?._id) return;
    if (!window.confirm(`Mark complaint as ${status}?`)) return;
    try {
      setActionId(complaint._id);
      await fetchJson(`/api/complaints/${complaint._id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status })
      });
      await loadComplaints();
    } catch (err) {
      window.alert(err?.body || err?.message || "Failed to update complaint");
    } finally {
      setActionId("");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Complaint History & Management</h1>
              <p className="text-sm text-slate-500">View and manage all tenant complaints across the platform.</p>
            </div>
          </div>
          <button onClick={loadComplaints} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            <i data-lucide="refresh-cw" className="w-4 h-4"></i> Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-xs text-slate-500 uppercase font-semibold">Total</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500 border border-gray-200">
            <p className="text-xs text-slate-500 uppercase font-semibold">Open</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats.open}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500 border border-gray-200">
            <p className="text-xs text-slate-500 uppercase font-semibold">In Progress</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats.taken}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500 border border-gray-200">
            <p className="text-xs text-slate-500 uppercase font-semibold">Resolved</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats.resolved}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-gray-400 border border-gray-200">
            <p className="text-xs text-slate-500 uppercase font-semibold">Rejected</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats.rejected}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by tenant name or complaint..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-purple-500 w-full md:w-80 outline-none transition-shadow focus:border-purple-500"
            />
            <i data-lucide="search" className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"></i>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "Open", "Taken", "Resolved"].map((label) => (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === label ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {label === "all" ? "All" : label === "Taken" ? "In Progress" : label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {loading && (
              <div className="text-center py-20 text-slate-400">
                <i data-lucide="loader-2" className="w-8 h-8 animate-spin mx-auto mb-2 opacity-50"></i>
                <p>Loading complaints...</p>
              </div>
            )}
            {!loading && errorMsg && (
              <div className="text-center py-20 text-red-500 bg-red-50">
                <i data-lucide="alert-circle" className="w-8 h-8 mx-auto mb-2"></i>
                {errorMsg}
              </div>
            )}
            {!loading && !errorMsg && filtered.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <i data-lucide="inbox" className="w-12 h-12 mx-auto mb-2 opacity-20"></i>
                <p>No complaints found.</p>
              </div>
            )}
            {!loading && !errorMsg && filtered.map((complaint) => {
              const status = complaint.status || "Open";
              let statusClass = "bg-gray-100 text-gray-700";
              if (status === "Open") statusClass = "bg-red-100 text-red-700";
              if (status === "Taken") statusClass = "bg-yellow-100 text-yellow-700";
              if (status === "Resolved") statusClass = "bg-green-100 text-green-700";

              return (
                <div key={complaint._id} className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6 hover:bg-gray-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-base font-bold text-slate-800 truncate">{complaint.complaintBy || complaint.tenantName || "Tenant"}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusClass}`}>
                        {status === "Taken" ? "In Progress" : status}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-500 mb-3">{complaint.tenantId || complaint.propertyName || complaint.propertyId || "-"}</p>
                    <div className="bg-white border border-gray-100 rounded-lg p-3 text-sm text-slate-700 shadow-sm leading-relaxed">
                      {complaint.message || complaint.complaint || complaint.title || "-"}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 px-1">Quick Status Update</p>
                    {STATUS_ORDER.filter((s) => s !== status).map((nextStatus) => (
                      <button
                        key={nextStatus}
                        disabled={actionId === complaint._id}
                        onClick={() => updateStatus(complaint, nextStatus)}
                        className="text-xs font-semibold border border-gray-200 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 transition-all text-slate-600 flex items-center justify-between"
                      >
                        {nextStatus === "Taken" ? "Mark In Progress" : `Mark ${nextStatus}`}
                        <i data-lucide="chevron-right" className="w-3 h-3"></i>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


