import React, { useEffect, useMemo, useState } from "react";
import { useHtmlPage } from "../../utils/htmlPage";
import { fetchJson } from "../../utils/api";

function getImageDataUrl(fileLike) {
  if (!fileLike) return "";
  if (typeof fileLike === "string") return fileLike;
  if (typeof fileLike === "object" && typeof fileLike.dataUrl === "string") return fileLike.dataUrl;
  return "";
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
}

function getPropertyText(tenant, profile = {}) {
  const propertyObj = tenant?.property && typeof tenant.property === "object" ? tenant.property : null;
  const profileName = profile.propertyName || tenant?.tenantProfile?.propertyName || tenant?.digitalCheckin?.profile?.propertyName;
  const propertyTitle =
    profileName ||
    tenant?.propertyTitle ||
    tenant?.propertyName ||
    propertyObj?.title ||
    propertyObj?.name ||
    "";
  const location = propertyObj?.locationCode || "";
  if (propertyTitle && location && !propertyTitle.includes(location)) return `${propertyTitle} (${location})`;
  return propertyTitle || location || "Unknown Property";
}

function normalizeTenant(tenant, record) {
  const profile = record?.tenantProfile || tenant?.digitalCheckin?.profile || {};
  const tenantKyc = record?.tenantKyc || tenant?.digitalCheckin?.kyc || {};
  const modelKyc = tenant?.kyc || {};
  const aadhaarNumber = modelKyc.aadhaarNumber || modelKyc.aadhar || tenantKyc.aadhaarNumber || "";
  const aadhaarLinkedPhone = modelKyc.aadhaarLinkedPhone || tenantKyc.aadhaarLinkedPhone || "";
  const aadhaarFront = getImageDataUrl(modelKyc.aadhaarFront || modelKyc.idProofFile || modelKyc.aadharFile || tenantKyc.aadhaarFront);
  const aadhaarBack = getImageDataUrl(modelKyc.aadhaarBack || tenantKyc.aadhaarBack);
  const otpVerified = Boolean(modelKyc.otpVerified || tenantKyc.otpVerified);
  const digilockerVerified = Boolean(modelKyc.digilockerVerified || tenantKyc.digilockerVerified);
  const kycStatus =
    tenant?.kycStatus ||
    tenantKyc?.digilockerStatus ||
    (digilockerVerified || otpVerified ? "verified" : "") ||
    (aadhaarNumber ? "submitted" : "") ||
    "pending";

  return {
    ...tenant,
    record,
    profile: {
      name: tenant?.name || profile?.name || "",
      email: tenant?.email || profile?.email || "",
      phone: tenant?.phone || profile?.phone || "",
      dob: tenant?.dob || profile?.dob || "",
      guardianNumber: tenant?.guardianNumber || profile?.guardianNumber || "",
      moveInDate: tenant?.moveInDate || profile?.moveInDate || "",
      roomNo: tenant?.roomNo || profile?.roomNo || tenant?.room?.number || "",
      bedNo: tenant?.bedNo || "",
      agreedRent:
        tenant?.agreedRent ?? profile?.agreedRent ?? tenant?.room?.rent ?? "",
      propertyText: getPropertyText(tenant, profile)
    },
    kyc: {
      status: String(kycStatus || "pending").toLowerCase(),
      aadhaarNumber,
      aadhaarLinkedPhone,
      aadhaarFront,
      aadhaarBack,
      otpVerified,
      otpVerifiedAt: modelKyc.otpVerifiedAt || tenantKyc.otpVerifiedAt || "",
      digilockerVerified,
      digilockerVerifiedAt: modelKyc.digilockerVerifiedAt || tenantKyc.digilockerVerifiedAt || ""
    }
  };
}

export default function Tenant() {
  useHtmlPage({
    title: "Roomhy - All Tenants",
    bodyClass: "text-slate-800",
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
      { rel: "stylesheet", href: "/superadmin/assets/css/tenant.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { src: "https://unpkg.com/lucide@latest" }],
    inlineScripts: []
  });


  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTenant, setSelectedTenant] = useState(null);

  const loadTenants = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await fetchJson("/api/tenants");
      const baseTenants = Array.isArray(data) ? data : Array.isArray(data?.tenants) ? data.tenants : [];
      const mergedTenants = await Promise.all(
        baseTenants.map(async (tenant) => {
          if (!tenant?.loginId) return normalizeTenant(tenant, null);
          try {
            const checkin = await fetchJson(`/api/checkin/tenant/${encodeURIComponent(tenant.loginId)}`);
            return normalizeTenant(tenant, checkin?.record || null);
          } catch (_) {
            return normalizeTenant(tenant, null);
          }
        })
      );
      setTenants(mergedTenants);
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Failed to load tenants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTenants();
  }, []);

  useEffect(() => {
    if (window?.lucide) window.lucide.createIcons();
  }, [tenants, loading, errorMsg, selectedTenant]);

  const filteredTenants = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tenants;
    return tenants.filter((tenant) => {
      const haystack = [
        tenant?.profile?.name,
        tenant?.profile?.email,
        tenant?.profile?.phone,
        tenant?.profile?.propertyText,
        tenant?.profile?.roomNo,
        tenant?.loginId,
        tenant?.kyc?.aadhaarNumber
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [tenants, search]);

  const stats = useMemo(() => {
    const total = tenants.length;
    const verified = tenants.filter((tenant) => tenant.kyc.status === "verified").length;
    const submitted = tenants.filter((tenant) => tenant.kyc.status === "submitted").length;
    const pending = total - verified - submitted;
    return { total, verified, submitted, pending };
  }, [tenants]);

  const selectedDocTabs = selectedTenant
    ? [
        { key: "aadhaarFront", label: "Aadhaar Front", value: selectedTenant.kyc.aadhaarFront },
        { key: "aadhaarBack", label: "Aadhaar Back", value: selectedTenant.kyc.aadhaarBack }
      ]
    : [];

  return (
    <>
      <main className="p-4 md:p-8 bg-slate-50/50 min-h-full">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">All Tenants</h1>
            <p className="text-sm text-slate-500 mt-1">Tenant list merged with digital check-in profile and tenant KYC data.</p>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tenant, property, login ID..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
            />
            <i data-lucide="search" className="absolute left-3 top-3 w-4 h-4 text-slate-400"></i>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Tenants</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified KYC</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.verified}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Submitted</p>
            <p className="text-3xl font-bold text-amber-600 mt-2">{stats.submitted}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending</p>
            <p className="text-3xl font-bold text-slate-500 mt-2">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tenant Info</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Property Details</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tenant Profile</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">KYC Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">Loading tenants...</td>
                  </tr>
                )}
                {!loading && errorMsg && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-rose-500 font-medium">{errorMsg}</td>
                  </tr>
                )}
                {!loading && !errorMsg && filteredTenants.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No tenants found.</td>
                  </tr>
                )}
                {!loading &&
                  !errorMsg &&
                  filteredTenants.map((tenant) => {
                    const status = tenant.kyc.status;
                    const badgeClass =
                      status === "verified"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : status === "submitted"
                        ? "bg-amber-50 text-amber-700 border-amber-100"
                        : "bg-slate-50 text-slate-600 border-slate-100";
                    return (
                      <tr key={tenant._id || tenant.loginId} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm border border-purple-100">
                              {(tenant.profile.name || "?").charAt(0).toUpperCase()}
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-sm font-bold text-slate-800">{tenant.profile.name || "-"}</div>
                              <div className="text-xs font-mono text-purple-600">{tenant.loginId || "-"}</div>
                              <div className="text-xs text-slate-500">{tenant.profile.phone || "-"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1 text-xs">
                            <div className="font-bold text-slate-700">{tenant.profile.propertyText}</div>
                            <div className="text-slate-500">Room: {tenant.profile.roomNo || "-"} | Bed: {tenant.profile.bedNo || "-"}</div>
                            <div className="text-emerald-600 font-bold">Rent: {tenant.profile.agreedRent ? `₹${tenant.profile.agreedRent}` : "-"}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1 text-xs text-slate-600">
                            <div>DOB: {tenant.profile.dob || "-"}</div>
                            <div>Move In: {formatDate(tenant.profile.moveInDate)}</div>
                            <div className="uppercase font-bold text-[10px] text-slate-400">Status: {tenant.status || "pending"}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badgeClass}`}>
                              {status}
                            </span>
                            <div className="text-[10px] text-slate-400 font-mono">Aadhaar: {tenant.kyc.aadhaarNumber || "-"}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setSelectedTenant(tenant)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-purple-700 shadow-sm transition-all active:scale-95"
                          >
                            View Profile
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

      {selectedTenant && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setSelectedTenant(null)}>
          <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden" onClick={(event) => event.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <h3 className="text-lg font-bold text-gray-800">Tenant Profile & KYC Details</h3>
              <button onClick={() => setSelectedTenant(null)} className="text-gray-400 hover:text-gray-600">
                <i data-lucide="x" className="w-6 h-6"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] min-h-[560px]">
              <div className="bg-slate-50 border-r border-gray-200 p-6">
                <h4 className="text-sm font-bold text-gray-800 mb-4">Uploaded Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDocTabs.map((doc) => (
                    <div key={doc.key} className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">{doc.label}</p>
                      {doc.value ? (
                        <img src={doc.value} alt={doc.label} className="w-full h-64 object-contain rounded-md bg-slate-100" />
                      ) : (
                        <div className="h-64 rounded-md bg-slate-100 flex items-center justify-center text-sm text-gray-400">
                          No document uploaded
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 space-y-6">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <h4 className="text-xs font-bold text-purple-700 uppercase mb-3 tracking-wider">Applicant Details</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between gap-4"><span>Name</span><span className="font-semibold text-right">{selectedTenant.profile.name || "-"}</span></div>
                    <div className="flex justify-between gap-4"><span>Login ID</span><span className="font-mono text-xs bg-white px-2 py-1 rounded border">{selectedTenant.loginId || "-"}</span></div>
                    <div className="flex justify-between gap-4"><span>Email</span><span className="text-right">{selectedTenant.profile.email || "-"}</span></div>
                    <div className="flex justify-between gap-4"><span>Phone</span><span className="text-right">{selectedTenant.profile.phone || "-"}</span></div>
                    <div className="flex justify-between gap-4"><span>DOB</span><span className="text-right">{selectedTenant.profile.dob || "-"}</span></div>
                    <div className="flex justify-between gap-4"><span>Guardian</span><span className="text-right">{selectedTenant.profile.guardianNumber || "-"}</span></div>
                    <div className="flex justify-between gap-4"><span>Property</span><span className="text-right">{selectedTenant.profile.propertyText}</span></div>
                    <div className="flex justify-between gap-4"><span>Room / Bed</span><span className="text-right">{selectedTenant.profile.roomNo || "-"} / {selectedTenant.profile.bedNo || "-"}</span></div>
                    <div className="flex justify-between gap-4"><span>Move In</span><span className="text-right">{formatDate(selectedTenant.profile.moveInDate)}</span></div>
                    <div className="flex justify-between gap-4"><span>Agreed Rent</span><span className="text-right">{selectedTenant.profile.agreedRent ? `Rs ${selectedTenant.profile.agreedRent}` : "-"}</span></div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase mb-3 tracking-wider">Tenant KYC</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between gap-4"><span>KYC Status</span><span className="font-semibold uppercase">{selectedTenant.kyc.status}</span></div>
                    <div className="flex justify-between gap-4"><span>Aadhaar Number</span><span className="text-right">{selectedTenant.kyc.aadhaarNumber || "-"}</span></div>
                    <div className="flex justify-between gap-4"><span>Linked Phone</span><span className="text-right">{selectedTenant.kyc.aadhaarLinkedPhone || "-"}</span></div>
                    <div className="flex justify-between gap-4"><span>OTP Verified</span><span className="text-right">{selectedTenant.kyc.otpVerified ? "Yes" : "No"}</span></div>
                    <div className="flex justify-between gap-4"><span>OTP Verified At</span><span className="text-right">{formatDate(selectedTenant.kyc.otpVerifiedAt)}</span></div>
                    <div className="flex justify-between gap-4"><span>DigiLocker Verified</span><span className="text-right">{selectedTenant.kyc.digilockerVerified ? "Yes" : "No"}</span></div>
                    <div className="flex justify-between gap-4"><span>DigiLocker Verified At</span><span className="text-right">{formatDate(selectedTenant.kyc.digilockerVerifiedAt)}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    </>
  );
}
