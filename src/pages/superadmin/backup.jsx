import React from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function SuperadminBackup() {
  useHtmlPage({
    title: "Roomhy - Backup Settings",
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
    "href": "/superadmin/assets/css/backup.css"
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
    "src": "/superadmin/assets/js/backup.js"
  },
  {
    "src": "./mobile-sidebar.js"
  }
],
    inlineScripts: []
  });

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Data Backup & Recovery</h1>
            <p className="text-sm text-slate-500 mt-1">Manage automated backups and manual data snapshots.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => {}} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm transition-all">
              <i data-lucide="database" className="w-4 h-4 mr-2"></i> Create Backup Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <i data-lucide="clock" className="w-5 h-5 text-blue-600 mr-2"></i> Automated Schedule
              </h3>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <div className="w-10 h-5 bg-green-500 rounded-full relative shadow-inner cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform translate-x-5"></div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Frequency</label>
                  <select className="w-full border-gray-300 rounded-lg shadow-sm text-sm focus:ring-purple-500 focus:border-purple-500 py-2.5 px-3 outline-none">
                    <option>Daily</option>
                    <option defaultValue>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time (UTC)</label>
                  <input type="time" defaultValue="02:00" className="w-full border-gray-300 rounded-lg shadow-sm text-sm focus:ring-purple-500 focus:border-purple-500 py-2.5 px-3 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Data to Include</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4" />
                    <span>Payment Records</span>
                  </label>
                  <label className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4" />
                    <span>Property Owners</span>
                  </label>
                  <label className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4" />
                    <span>Tenant Records</span>
                  </label>
                  <label className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4" />
                    <span>System Logs</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <button className="bg-slate-50 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-slate-200">Save Schedule</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <i data-lucide="hard-drive" className="w-5 h-5 text-slate-600 mr-2"></i> Storage Status
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Used Space</span>
                  <span className="text-slate-500 font-mono">2.4 GB / 10 GB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: "24%" }}></div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex gap-3">
                  <i data-lucide="info" className="w-5 h-5 text-blue-500 shrink-0"></i>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Backups are retained for 30 days automatically. Older backups are archived to cold storage to ensure system reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Backup History</h3>
            <button className="text-xs text-purple-600 font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white text-[10px] text-slate-400 uppercase font-bold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Date Created</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Modules Included</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">Oct 24, 2025  02:00 AM</td>
                  <td className="px-6 py-4"><span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-600 uppercase">Automated</span></td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">128 MB</td>
                  <td className="px-6 py-4 text-xs text-slate-500">Payments, Users, Properties</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="Download"><i data-lucide="download" className="w-4 h-4"></i></button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Restore"><i data-lucide="refresh-ccw" className="w-4 h-4"></i></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">Oct 17, 2025  02:00 AM</td>
                  <td className="px-6 py-4"><span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-600 uppercase">Automated</span></td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">125 MB</td>
                  <td className="px-6 py-4 text-xs text-slate-500">Payments, Users, Properties</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="Download"><i data-lucide="download" className="w-4 h-4"></i></button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Restore"><i data-lucide="refresh-ccw" className="w-4 h-4"></i></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">Oct 15, 2025  04:30 PM</td>
                  <td className="px-6 py-4"><span className="text-[10px] bg-blue-100 px-2 py-1 rounded-full font-bold text-blue-700 uppercase">Manual</span></td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">124 MB</td>
                  <td className="px-6 py-4 text-xs text-slate-500">Full System Backup</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="Download"><i data-lucide="download" className="w-4 h-4"></i></button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Restore"><i data-lucide="refresh-ccw" className="w-4 h-4"></i></button>
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


