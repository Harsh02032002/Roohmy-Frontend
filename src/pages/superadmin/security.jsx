import React from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function Security() {
  useHtmlPage({
    title: "Roomhy - Security Settings",
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
  "href": "/superadmin/assets/css/security.css"
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


  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Security Settings</h1>
            <p className="text-sm text-slate-500 mt-1">Configure authentication policies, access controls, and security protocols.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center shadow-sm shadow-purple-100 transition-all">
              <i data-lucide="save" className="w-4 h-4 mr-2"></i> Save Policy
            </button>
          </div>
        </div>

        {/* Security Policies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Password Policy */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <i data-lucide="key" className="w-5 h-5 text-purple-600 mr-2"></i> Password Policy
              </h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">Minimum Length</p>
                  <p className="text-xs text-slate-500">Min characters required for passwords</p>
                </div>
                <select className="w-24 border border-gray-200 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 px-3 py-2 outline-none transition-all">
                  <option>8</option>
                  <option defaultValue>10</option>
                  <option>12</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">Complexity Requirement</p>
                  <p className="text-xs text-slate-500">Require uppercase, numbers, symbols</p>
                </div>
                <div className="relative inline-block w-10 h-5 bg-green-500 rounded-full relative shadow-inner cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform translate-x-5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">Password Expiry</p>
                  <p className="text-xs text-slate-500">Force reset after days</p>
                </div>
                <select className="w-32 border border-gray-200 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 px-3 py-2 outline-none transition-all">
                  <option>Never</option>
                  <option>30 Days</option>
                  <option defaultValue>90 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2FA Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <i data-lucide="shield-check" className="w-5 h-5 text-green-600 mr-2"></i> Two-Factor Auth (2FA)
              </h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">Admin Accounts</p>
                  <p className="text-xs text-slate-500">Enforce 2FA for all admins</p>
                </div>
                <div className="relative inline-block w-10 h-5 bg-green-500 rounded-full relative shadow-inner cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform translate-x-5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">Property Owners</p>
                  <p className="text-xs text-slate-500">Optional but recommended</p>
                </div>
                <div className="relative inline-block w-10 h-5 bg-slate-200 rounded-full relative shadow-inner cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform translate-x-0"></div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex gap-3">
                  <i data-lucide="info" className="w-5 h-5 text-blue-500 shrink-0"></i>
                  <p className="text-xs text-blue-700 leading-relaxed font-medium">
                    2FA codes will be sent via SMS (using configured provider) or Email depending on user preference and availability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center">
                <i data-lucide="monitor" className="w-4 h-4 text-blue-600 mr-2"></i> Active Sessions
              </h3>
              <button className="text-xs text-red-600 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100 border border-red-100 px-4 py-2 rounded-lg transition-colors">
                Logout All Users
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-white text-[10px] text-slate-400 uppercase font-bold border-b border-gray-100">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">IP Address</th>
                    <th className="px-6 py-4">Device</th>
                    <th className="px-6 py-4">Last Active</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700">Ajay Kumar</p>
                    </td>
                    <td className="px-6 py-4"><span className="bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Admin</span></td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">192.168.1.45</td>
                    <td className="px-6 py-4 text-slate-600">Chrome / Windows</td>
                    <td className="px-6 py-4 text-green-600 font-bold uppercase text-[10px]">Active Now</td>
                    <td className="px-6 py-4 text-right"><span className="text-slate-300 italic text-[10px] font-bold uppercase tracking-tighter">Current Session</span></td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700">Rajesh Kumar</p>
                    </td>
                    <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Owner</span></td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">10.0.0.12</td>
                    <td className="px-6 py-4 text-slate-600">Safari / iPhone</td>
                    <td className="px-6 py-4 text-slate-400">5m ago</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Revoke Session">
                        <i data-lucide="x-circle" className="w-4 h-4"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Access Control */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <i data-lucide="globe-lock" className="w-5 h-5 text-orange-600 mr-2"></i> IP Whitelisting
              </h3>
              <button onClick={() => setIsModalOpen(true)} className="text-xs text-purple-600 font-bold hover:text-purple-800 flex items-center px-3 py-1.5 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <i data-lucide="plus" className="w-4 h-4 mr-1"></i> Add IP
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-6">Restrict Admin Panel access to specific IP addresses or ranges for enhanced network-level security.</p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center text-sm text-slate-700 hover:border-slate-300 transition-all">
                <span className="font-mono font-bold text-purple-600 mr-2 text-xs">192.168.1.0/24</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mr-3">Office</span>
                <button className="text-slate-400 hover:text-red-500 transition-colors"><i data-lucide="x" className="w-3 h-3"></i></button>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center text-sm text-slate-700 hover:border-slate-300 transition-all">
                <span className="font-mono font-bold text-purple-600 mr-2 text-xs">45.22.19.110</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mr-3">VPN</span>
                <button className="text-slate-400 hover:text-red-500 transition-colors"><i data-lucide="x" className="w-3 h-3"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add IP Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Allow New IP Address</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><i data-lucide="x" className="w-5 h-5"></i></button>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">IP Address / CIDR</label>
                  <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-300" placeholder="e.g. 192.168.1.100" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Label (Optional)</label>
                  <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-300" placeholder="e.g. Home Office" />
                </div>
              </form>
            </div>
            <div className="px-6 py-4 bg-slate-50 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-6 py-2.5 border border-slate-200 bg-white text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Cancel</button>
              <button className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 shadow-sm shadow-purple-200 transition-all">Add to Whitelist</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


