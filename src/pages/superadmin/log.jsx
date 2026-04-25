import React from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function Log() {
  useHtmlPage({
    title: "Roomhy - Login Logs",
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
  "rel": "preconnect",
  "href": "https://fonts.googleapis.com"
},
  {
  "rel": "preconnect",
  "href": "https://fonts.gstatic",
  "crossorigin": true
},
  {
  "href": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
  "rel": "stylesheet"
},
  {
  "rel": "stylesheet",
  "href": "/superadmin/assets/css/log.css"
}
],
    styles: [],
    scripts: [
  {
  "src": "https://cdn.tailwindcss.com"
},
  {
  "src": "https://unpkg.com/lucide@latest"
}
],
    inlineScripts: []
  });


  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">System Logs</h1>
            <p className="text-sm text-slate-500 mt-1">Monitor user access, security alerts, and session history.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center transition-all">
                <i data-lucide="refresh-cw" className="w-4 h-4 mr-2"></i> Refresh
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center shadow-md shadow-purple-200 transition-all">
                <i data-lucide="download" className="w-4 h-4 mr-2"></i> Export Logs
            </button>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-sm">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <input type="text" placeholder="Search User, IP Address..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm transition-all" />
            <i data-lucide="search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-3"></i>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap lg:flex-nowrap">
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-600 bg-white flex-1 lg:flex-none min-w-[140px]">
              <option value="">All Roles</option>
              <option value="admin">Super Admin</option>
              <option value="owner">Property Owner</option>
              <option value="manager">Team</option>
              <option value="tenant">Tenant</option>
            </select>
            
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-600 bg-white flex-1 lg:flex-none">
              <option value="">All Statuses</option>
              <option value="success">Success</option>
              <option value="failed">Failed Attempt</option>
            </select>

             <div className="relative flex items-center border border-slate-200 rounded-xl px-4 py-2.5 bg-white flex-1 lg:flex-none">
              <i data-lucide="calendar" className="w-4 h-4 text-slate-400 mr-2"></i>
              <span className="text-sm font-bold text-slate-600">Last 7 Days</span>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">IP Address</th>
                  <th className="px-6 py-4">Device / Browser</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Log 1: Admin Success */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs shrink-0">AK</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Ajay Kumar</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">admin@roomhy.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full uppercase tracking-wider">Super Admin</span></td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 tracking-tight">Oct 24, 2025 • 10:30 AM</td>
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-400 font-bold">192.168.1.45</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-tighter">
                      <i data-lucide="chrome" className="w-3.5 h-3.5 text-slate-400"></i> Chrome (Win)
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                      Success
                    </span>
                  </td>
                </tr>

                {/* Log 2: Owner Success */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src="https://i.pravatar.cc/150?u=own1" className="w-9 h-9 rounded-full object-cover shrink-0 grayscale hover:grayscale-0 transition-all border border-slate-100" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">Rajesh Kumar</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">PO-BLR-089</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full uppercase tracking-wider">Owner</span></td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 tracking-tight">Oct 24, 2025 • 09:15 AM</td>
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-400 font-bold">10.0.0.12</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-tighter">
                      <i data-lucide="smartphone" className="w-3.5 h-3.5 text-slate-400"></i> Safari (iOS)
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                      Success
                    </span>
                  </td>
                </tr>

                {/* Log 3: Failed Attempt */}
                <tr className="bg-rose-50/20 hover:bg-rose-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">?</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Unknown User</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">suresh.r@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full uppercase tracking-wider">Unknown</span></td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 tracking-tight">Oct 23, 2025 • 11:45 PM</td>
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-400 font-bold">45.22.19.110</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-tighter">
                      <i data-lucide="globe" className="w-3.5 h-3.5 text-slate-400"></i> Firefox (Linux)
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 uppercase tracking-wider">
                      <i data-lucide="alert-circle" className="w-3 h-3 mr-1"></i> Failed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Showing <span className="text-slate-800">1</span> to <span className="text-slate-800">4</span> of <span className="text-slate-800">1,240</span> logs
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all">
                  <i data-lucide="chevron-left" className="w-4 h-4"></i>
                </button>
                <button className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md shadow-purple-200">1</button>
                <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
                <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all">
                  <i data-lucide="chevron-right" className="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


