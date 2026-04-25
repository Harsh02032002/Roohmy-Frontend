import React, { useEffect, useMemo, useState } from "react";
import { useHtmlPage } from "../../utils/htmlPage";
import { loadApprovedProperties, updateApprovedPropertyVisibility } from "../../utils/approvedProperties";

export default function Website() {
  useHtmlPage({
    title: "Roomhy - Website Properties",
    bodyClass: "text-slate-800",
    htmlAttrs: { lang: "en" },
    metas: [
      { charset: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "referrer", content: "no-referrer-when-downgrade" }
    ],
    links: [
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
      { rel: "stylesheet", href: "/superadmin/assets/css/website.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { src: "https://unpkg.com/lucide@latest" }],
    inlineScripts: []
  });

  const [filter, setFilter] = useState("online");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadWebsite = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const list = await loadApprovedProperties({ includeOffline: true });
      setProperties(list);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err?.body || err?.message || "Error loading properties");
    }
  };

  useEffect(() => {
    loadWebsite();
  }, []);

  useEffect(() => {
    if (window?.lucide) window.lucide.createIcons();
  }, [properties, filter]);

  const filtered = useMemo(() => {
    return properties.filter((v) =>
      filter === "online" ? v.isLiveOnWebsite === true : v.isLiveOnWebsite === false
    );
  }, [properties, filter]);

  const toggleLive = async (property) => {
    try {
      const visitId = property?.visitId || property?.propertyId || property?._id || "";
      await updateApprovedPropertyVisibility(visitId, !property?.isLiveOnWebsite);
      await loadWebsite();
    } catch (err) {
      window.alert(err?.body || err?.message || "Failed to toggle status");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Website Properties</h1>
          <button onClick={loadWebsite} className="text-sm text-purple-600 hover:underline flex items-center gap-1">
            <i data-lucide="refresh-cw" className="w-3 h-3"></i> Refresh
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("online")}
            className={`px-4 py-2 rounded ${filter === "online" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            Online
          </button>
          <button
            onClick={() => setFilter("offline")}
            className={`px-4 py-2 rounded ${filter === "offline" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            Offline
          </button>
        </div>

        <div className="bg-white rounded-xl shadow border overflow-x-auto">
          <table className="w-full text-left min-w-full">
            <thead className="bg-gray-50 text-[10px] text-gray-500 uppercase border-b">
              <tr>
                <th className="px-4 py-3">Visit ID</th>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Rent</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Loading...</td></tr>
              )}
              {!loading && errorMsg && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-red-500">{errorMsg}</td></tr>
              )}
              {!loading && !errorMsg && filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">No properties found.</td></tr>
              )}
              {filtered.map((v) => {
                const prop = v.propertyInfo || {};
                const visitId = v.visitId || v._id || "";
                const rent = prop.rent || v.monthlyRent || 0;
                return (
                  <tr key={visitId}>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{visitId.slice(-8).toUpperCase()}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{prop.name || "-"}</td>
                    <td className="px-4 py-3">{prop.area || "-"}</td>
                    <td className="px-4 py-3">{prop.ownerName || "-"}</td>
                    <td className="px-4 py-3 font-bold">₹{rent}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleLive(v)}
                        className={`px-3 py-1 rounded text-xs font-medium ${v.isLiveOnWebsite ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                      >
                        {v.isLiveOnWebsite ? "ONLINE" : "OFFLINE"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


