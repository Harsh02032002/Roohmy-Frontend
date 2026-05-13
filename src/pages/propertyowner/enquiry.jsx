import React, { useEffect, useState } from "react";
import { HelpCircle, User, MessageSquare, ChevronDown } from "lucide-react";
import { fetchJson } from "../../utils/api";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { useHtmlPage } from "../../utils/htmlPage";
import { requireOwnerSession } from "../../utils/ownerSession";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Enquiry() {
  useHtmlPage({
    title: "Inbound Enquiries - Roomhy",
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
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const session = requireOwnerSession();
    if (!session) return;
    setOwner(session);
    const load = async () => {
      try {
        const data = await fetchJson(`/api/owners/${session.loginId}/enquiries`);
        const list = Array.isArray(data) ? data : data?.enquiries || data?.data || [];
        setEnquiries(list);
      } catch (err) {
        setErrorMsg(err?.body || err?.message || "Failed to load enquiries.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetchJson(`/api/owners/enquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      setEnquiries((prev) => prev.map((item) => (item._id === id ? { ...item, status } : item)));
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Failed to update enquiry status.");
    }
  };

  return (
    <PropertyOwnerLayout owner={owner} title="Enquiries" contentClassName="max-w-5xl mx-auto" navVariant="default">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            Inbound Enquiries
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
            {loading ? "Checking for new messages..." : `Reviewing ${enquiries.length} recent enquiries`}
          </p>
        </div>
      </div>

      {errorMsg && <div className="text-sm text-rose-600 font-bold mb-6 bg-rose-50 p-4 rounded-2xl border border-rose-100">{errorMsg}</div>}

      <div className="space-y-6">
        {loading && (
           <div className="py-24 text-center bg-white rounded-[32px] border border-slate-100">
              <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Loading Enquiries...</p>
           </div>
        )}
        {!loading && enquiries.length === 0 && (
           <div className="py-24 text-center bg-white rounded-[32px] border border-slate-100">
              <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No enquiries yet</p>
           </div>
        )}
        {!loading && enquiries.map((enquiry) => (
          <div key={enquiry._id} className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50 group">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex-1 min-w-[280px]">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">
                      {String(enquiry.tenantName || enquiry.name || "U").charAt(0).toUpperCase()}
                   </div>
                   <h3 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{enquiry.tenantName || enquiry.name || "Anonymous User"}</h3>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5"><User size={12} /> {enquiry.propertyName || "Property Interest"}</div>
                  <div className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-slate-200" /> {enquiry.status || "Pending"}</div>
                </div>
                
                {enquiry.message && (
                  <div className="mt-6 p-5 bg-slate-50 rounded-2xl text-sm font-bold text-slate-600 leading-relaxed border border-slate-100 italic">
                    "{enquiry.message}"
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative group/select">
                  <select
                    value={enquiry.status || "pending"}
                    onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-5 py-3 pr-10 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 cursor-pointer transition-all"
                  >
                    <option value="pending">Mark Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within/select:text-blue-600 transition-colors" />
                </div>
                
                <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-slate-100 transition-all">
                   <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
