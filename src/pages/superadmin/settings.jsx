import React from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function Settings() {
  useHtmlPage({
    title: "Roomhy - Admin Settings",
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
  "href": "/superadmin/assets/css/settings.css"
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account preferences and system configuration.</p>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <i data-lucide="user-cog" className="w-5 h-5 text-purple-600"></i> Account Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-semibold text-slate-800">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive notifications via email</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer accent-purple-600" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-semibold text-slate-800">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Add extra security to your account</p>
              </div>
              <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-xs font-bold transition-colors">Enable</button>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <i data-lucide="settings" className="w-5 h-5 text-purple-600"></i> System Settings
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Theme</label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Language</label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
              <i data-lucide="alert-triangle" className="w-6 h-6"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-1">Danger Zone</h3>
              <p className="text-sm text-red-700 mb-4 opacity-80">These actions are irreversible. Please proceed with caution.</p>
              <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold text-sm shadow-sm shadow-red-200 transition-all">
                Reset All Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


