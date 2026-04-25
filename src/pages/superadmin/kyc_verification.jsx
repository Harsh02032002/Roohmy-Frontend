import React, { useEffect, useMemo, useState } from "react";
import { useHtmlPage } from "../../utils/htmlPage";
import { fetchJson } from "../../utils/api";

export default function KycVerification() {
  useHtmlPage({
    title: "Roomhy - KYC Verification",
    bodyClass: "text-slate-800",
    htmlAttrs: { lang: "en" },
    metas: [
      { charset: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic", crossorigin: true },
      {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        rel: "stylesheet"
      },
      { rel: "stylesheet", href: "/superadmin/assets/css/kyc_verification.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { src: "https://unpkg.com/lucide@latest" }],
    inlineScripts: []
  });


  const [tab, setTab] = useState("owners");
  const [owners, setOwners] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loadingOwners, setLoadingOwners] = useState(true);
  const [loadingTenants, setLoadingTenants] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [actionId, setActionId] = useState("");

  const loadOwners = async () => {
    try {
      setLoadingOwners(true);
      const data = await fetchJson("/api/owners");
      setOwners(data?.owners || data || []);
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Failed to load owners");
    } finally {
      setLoadingOwners(false);
    }
  };

  const loadTenants = async () => {
    try {
      setLoadingTenants(true);
      const data = await fetchJson("/api/tenants");
      setTenants(data?.tenants || data || []);
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Failed to load tenants");
    } finally {
      setLoadingTenants(false);
    }
  };

  useEffect(() => {
    loadOwners();
    loadTenants();
  }, []);

  useEffect(() => {
    if (window?.lucide) window.lucide.createIcons();
  }, [tab, owners, tenants]);

  const pendingOwners = useMemo(
    () => owners.filter((o) => (o.kycStatus || o.kyc?.status || "pending") === "pending"),
    [owners]
  );
  const pendingTenants = useMemo(
    () => tenants.filter((t) => (t.kycStatus || t.kyc?.status || "pending") === "submitted" || (t.kycStatus || t.kyc?.status || "pending") === "pending"),
    [tenants]
  );

  const updateOwnerKyc = async (owner, status) => {
    if (!owner) return;
    const id = owner._id || owner.loginId;
    if (!id) return;
    if (!window.confirm(`${status === "verified" ? "Verify" : "Reject"} KYC for ${owner.name || owner.loginId}?`)) return;
    try {
      setActionId(id);
      await fetchJson(`/api/owners/${id}/kyc`, {
        method: "PATCH",
        body: JSON.stringify({ status, rejectionReason: status === "rejected" ? "Rejected by admin" : "" })
      });
      await loadOwners();
    } catch (err) {
      window.alert(err?.body || err?.message || "Failed to update owner KYC");
    } finally {
      setActionId("");
    }
  };

  const updateTenantKyc = async (tenant, approved) => {
    if (!tenant?._id) return;
    if (!window.confirm(`${approved ? "Verify" : "Reject"} KYC for ${tenant.name || tenant.loginId}?`)) return;
    try {
      setActionId(tenant._id);
      await fetchJson(`/api/tenants/${tenant._id}/verify`, {
        method: "POST",
        body: JSON.stringify({ kycApproved: approved })
      });
      await loadTenants();
    } catch (err) {
      window.alert(err?.body || err?.message || "Failed to update tenant KYC");
    } finally {
      setActionId("");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">KYC Verification</h1>
            <p className="text-sm text-slate-500">Review and approve documents for Property Owners and Tenants.</p>
          </div>
          <button onClick={() => { loadOwners(); loadTenants(); }} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            <i data-lucide="refresh-cw" className="w-4 h-4"></i> Refresh
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex w-fit shadow-sm">
            <button
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${tab === "owners" ? "text-slate-900 bg-slate-100 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              onClick={() => setTab("owners")}
            >
              Property Owners
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${tab === "tenants" ? "text-slate-900 bg-slate-100 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              onClick={() => setTab("tenants")}
            >
              Tenants
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-2">
            {errorMsg}
          </div>
        )}

        <main className="">
          {tab === "owners" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full data-table">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left">Owner</th>
                      <th className="px-4 py-3 text-left">Contact</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loadingOwners && (
                      <tr><td colSpan={4} className="text-center py-8 text-gray-500 text-sm">Loading owners...</td></tr>
                    )}
                    {!loadingOwners && pendingOwners.length === 0 && (
                      <tr><td colSpan={4} className="text-center py-8 text-gray-500 text-sm">No pending owners</td></tr>
                    )}
                    {pendingOwners.map((owner) => {
                      const id = owner._id || owner.loginId;
                      const status = owner.kycStatus || owner.kyc?.status || "pending";
                      return (
                        <tr key={id}>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs mr-3">
                                {(owner.name || owner.loginId || "O")[0]}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{owner.name || owner.loginId || "Owner"}</p>
                                <p className="text-xs text-gray-500">{owner.loginId || "-"}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">{owner.phone || owner.email || "-"}</td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                disabled={actionId === id}
                                onClick={() => updateOwnerKyc(owner, "verified")}
                                className="text-green-600 hover:text-green-800 text-xs font-medium border border-green-200 px-3 py-1 rounded hover:bg-green-50 transition-colors disabled:opacity-60"
                              >
                                Approve
                              </button>
                              <button
                                disabled={actionId === id}
                                onClick={() => updateOwnerKyc(owner, "rejected")}
                                className="text-red-600 hover:text-red-800 text-xs font-medium border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-60"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "tenants" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full data-table">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left">Tenant</th>
                      <th className="px-4 py-3 text-left">Contact</th>
                      <th className="px-4 py-3 text-left">Property</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loadingTenants && (
                      <tr><td colSpan={5} className="text-center py-8 text-gray-500 text-sm">Loading tenants...</td></tr>
                    )}
                    {!loadingTenants && pendingTenants.length === 0 && (
                      <tr><td colSpan={5} className="text-center py-8 text-gray-500 text-sm">No pending tenants</td></tr>
                    )}
                    {pendingTenants.map((tenant) => {
                      const status = tenant.kycStatus || "pending";
                      return (
                        <tr key={tenant._id}>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs mr-3">
                                {(tenant.name || tenant.loginId || "T")[0]}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{tenant.name || tenant.loginId || "Tenant"}</p>
                                <p className="text-xs text-gray-500">{tenant.loginId || "-"}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">{tenant.phone || tenant.email || "-"}</td>
                          <td className="px-4 py-4 text-sm text-gray-700">{tenant.propertyTitle || tenant.property?.title || "-"}</td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                disabled={actionId === tenant._id}
                                onClick={() => updateTenantKyc(tenant, true)}
                                className="text-green-600 hover:text-green-800 text-xs font-medium border border-green-200 px-3 py-1 rounded hover:bg-green-50 transition-colors disabled:opacity-60"
                              >
                                Approve
                              </button>
                              <button
                                disabled={actionId === tenant._id}
                                onClick={() => updateTenantKyc(tenant, false)}
                                className="text-red-600 hover:text-red-800 text-xs font-medium border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-60"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


