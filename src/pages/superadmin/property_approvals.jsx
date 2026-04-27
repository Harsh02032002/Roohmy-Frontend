import React, { useEffect, useState } from "react";
import { useHeadAssets } from "../../utils/useHeadAssets.js";
import { useTailwindProcessor } from "../../utils/useTailwindProcessor.js";
import { Hourglass, CheckCircle, XCircle, Eye, Search, Filter } from "lucide-react";

const title = "Roomhy - Approval Queue";
const metas = [{ charset: "UTF-8" }, { name: "viewport", content: "width=device-width, initial-scale=1.0" }];
const links = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic", crossorigin: true },
  { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap", rel: "stylesheet" }
];
const scripts = [{ src: "https://cdn.tailwindcss.com" }];

export default function PropertyApprovalsPage() {
  useHeadAssets({ title, metas, links, scripts, htmlAttrs: { lang: "en" }, bodyAttrs: { class: "bg-slate-50 text-slate-800" } });
  useTailwindProcessor();

  const [pendingListings, setPendingListings] = useState([
    { id: "PRP001", title: "Green Villa Residency", owner: "Rahul Sharma", loc: "Bangalore", type: "3 BHK Villa", price: "₹25,000", date: "20 May 2025" },
    { id: "PRP002", title: "Silver Heights PG", owner: "Priya Verma", loc: "Pune", type: "Twin Sharing", price: "₹8,500", date: "20 May 2025" },
    { id: "PRP003", title: "Blue Bells Apartment", owner: "Amit Kumar", loc: "Hyderabad", type: "2 BHK Flat", price: "₹18,000", date: "19 May 2025" },
    { id: "PRP004", title: "Sunset Co-Living", owner: "Neha Singh", loc: "Bangalore", type: "Private Room", price: "₹12,000", date: "19 May 2025" },
  ]);

  return (
    <main className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Approval Queue</h1>
          <p className="text-slate-500 mt-1">Review and approve new property listings before they go live.</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
             <Hourglass className="w-3 h-3" /> 18 Pending
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search by title, owner or location..." className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none transition-all" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Property Details</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Submitted On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {pendingListings.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <Eye className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{l.title}</p>
                        <p className="text-xs text-slate-400">{l.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{l.owner}</td>
                  <td className="px-6 py-4 text-slate-600">{l.loc}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{l.price}</td>
                  <td className="px-6 py-4 text-slate-500">{l.date}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="View Details"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Reject"><XCircle className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
