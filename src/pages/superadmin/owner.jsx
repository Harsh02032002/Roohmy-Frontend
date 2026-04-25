import React from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function Owner() {
  useHtmlPage({
    title: "Roomhy - Property Owners",
    bodyClass: "text-slate-800",
    htmlAttrs: {
  "lang": "en"
},
    metas: [
  {
  "charset": "UTF-8"
},
  {
  "name": "viewport",
  "content": "width=device-width, initial-scale=1.0"
}
],
    bases: [],
    links: [
  {
  "href": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
  "rel": "stylesheet"
},
  {
  "rel": "stylesheet",
  "href": "/superadmin/assets/css/owner.css"
}
],
    styles: [],
    scripts: [
  {
  "src": "https://cdn.tailwindcss.com"
},
  {
  "src": "https://unpkg.com/lucide@latest"
},
  {
  "src": "https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js"
},
  {
  "src": "/superadmin/assets/js/owner.js"
}
],
    inlineScripts: []
  });


  return (
    <div className="p-4 md:p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Property Owners</h1>
            <p className="text-sm text-slate-500 mt-1">Manage platform property owners, bank details, and property associations.</p>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-48">
              <select id="areaFilter" className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer">
                <option value="all">All Areas</option>
              </select>
              <i data-lucide="chevron-down" className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none"></i>
            </div>

            <div className="relative w-full sm:w-80">
              <input type="text" id="ownerSearch" placeholder="Search Name/ID..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm transition-all" />
              <i data-lucide="search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-3"></i>
            </div>

            <button onClick={() => window.exportToExcel?.()} className="w-full sm:w-auto bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all flex items-center justify-center shadow-md shadow-emerald-100">
              <i data-lucide="sheet" className="w-4 h-4 mr-2"></i> Export Excel
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Owner ID / Login</th>
                  <th className="px-6 py-4">Name & Contact</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">DOB</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Aadhaar Phone</th>
                  <th className="px-6 py-4">Account Holder</th>
                  <th className="px-6 py-4">UPI ID</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">Password</th>
                  <th className="px-6 py-4">Area</th>
                  <th className="px-6 py-4">Bank Details</th>
                  <th className="px-6 py-4">Rent</th>
                  <th className="px-6 py-4">Deposit</th>
                  <th className="px-6 py-4">KYC Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="ownersTableBody" className="divide-y divide-slate-100">
                <tr>
                  <td colSpan="16" className="text-center py-20">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Synchronizing Owner Database...</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


