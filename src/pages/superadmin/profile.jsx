import React from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function Profile() {
  useHtmlPage({
    title: "Roomhy - Admin Profile",
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
  "href": "/superadmin/assets/css/profile.css"
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
          <div className="h-40 bg-gradient-to-br from-purple-500 via-indigo-600 to-slate-900 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12 mb-8 relative z-10">
              <div className="w-32 h-32 rounded-2xl border-4 border-white bg-slate-50 flex items-center justify-center text-slate-800 text-4xl font-black shadow-xl shadow-slate-200">SA</div>
              <div className="flex-1">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Super Admin</h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Platform Administrator</p>
              </div>
              <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-purple-600 transition-all shadow-lg shadow-slate-200 flex items-center group/btn">
                <i data-lucide="edit-3" className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform"></i> Edit Profile
              </button>
            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <p className="text-sm font-bold text-slate-800">Ajay Kumar</p>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <p className="text-sm font-bold text-slate-800">admin@roomhy.com</p>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Contact</label>
                <p className="text-sm font-bold text-slate-800">+91 98765 43210</p>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Access Level</label>
                <p className="text-sm font-bold text-slate-800">Super Administrator</p>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Since</label>
                <p className="text-sm font-bold text-slate-800">January 15, 2024</p>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Status</label>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Security & Activity</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Recent platform interactions</p>
            </div>
            <button className="text-[10px] font-bold text-purple-600 hover:text-purple-700 uppercase tracking-widest">View Full Log</button>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <i data-lucide="log-in" className="w-5 h-5"></i>
              </div>
              <div className="flex-1 py-1 border-b border-slate-50 group-last:border-0 pb-6 group-last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Successful Login</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">IP: 192.168.1.45 (Bangalore, India)</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Today • 10:30 AM</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                <i data-lucide="user-plus" className="w-5 h-5"></i>
              </div>
              <div className="flex-1 py-1 border-b border-slate-50 group-last:border-0 pb-6 group-last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Team Member Invited</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">New Manager: Rohan S. (Level 2)</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Yesterday • 03:15 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


