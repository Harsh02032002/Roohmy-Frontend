import React, { useEffect, useMemo, useState } from "react";
import { UserPlus, Eye, Users } from "lucide-react";
import { fetchJson } from "../../utils/api";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { useHtmlPage } from "../../utils/htmlPage";
import { requireOwnerSession } from "../../utils/ownerSession";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Tenants() {
  useHtmlPage({
    title: "Tenant Management - Roomhy",
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
      }
    ],
    scripts: [
      { src: "https://cdn.tailwindcss.com" }
    ]
  });

  const [owner, setOwner] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const session = requireOwnerSession();
    if (!session) return;
    setOwner(session);
    const load = async () => {
      try {
        const data = await fetchJson("/api/tenants");
        const list = Array.isArray(data) ? data : data?.tenants || data?.data || [];
        const ownerId = String(session.loginId || "").toUpperCase();
        const filtered = list.filter((tenant) => {
          const ownerLogin =
            tenant.property?.ownerLoginId ||
            tenant.ownerLoginId ||
            tenant.property?.owner ||
            tenant.owner;
          return ownerLogin ? String(ownerLogin).toUpperCase() === ownerId : true;
        });
        setTenants(filtered);
      } catch (err) {
        setErrorMsg(err?.body || err?.message || "Failed to load tenants.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredTenants = useMemo(() => {
    if (filter === "all") return tenants;
    return tenants.filter((tenant) => String(tenant.status || "active").toLowerCase() === filter);
  }, [tenants, filter]);

  return (
    <PropertyOwnerLayout owner={owner} title="Tenants" navVariant="default">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Tenant Directory
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
            {loading ? "Syncing data..." : `Total ${filteredTenants.length} tenants in your properties`}
          </p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 flex items-center shadow-xl shadow-blue-500/20 transition-all">
          <UserPlus size={18} className="mr-2.5" /> Add New Tenant
        </button>
      </div>

      {errorMsg && <div className="text-sm text-rose-600 font-bold mb-6 bg-rose-50 p-4 rounded-2xl border border-rose-100">{errorMsg}</div>}

      <div className="mb-8 flex gap-3">
        {["all", "active", "inactive"].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              filter === status ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white text-slate-400 border border-slate-100 hover:bg-slate-50"
            )}
          >
            {status === "all" ? "All Tenants" : status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Property</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Room</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center py-24">
                     <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Loading Records...</p>
                     </div>
                  </td>
                </tr>
              )}
              {!loading && filteredTenants.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-24">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No matching tenants found</p>
                  </td>
                </tr>
              )}
              {!loading && filteredTenants.map((tenant) => (
                <tr key={tenant._id} className="hover:bg-slate-50/30 transition-all group">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{tenant.name || tenant.fullName || "Tenant"}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{tenant.email || "No Email"}</div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-700">{tenant.phone || tenant.mobile || "---"}</div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-700">{tenant.property?.title || "---"}</div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                       {tenant.room?.number || tenant.roomNumber || "---"}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                      <Eye size={14} /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
