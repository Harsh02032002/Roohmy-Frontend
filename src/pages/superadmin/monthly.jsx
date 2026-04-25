import React from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function Monthly() {
  useHtmlPage({
    title: "Roomhy - Monthly Revenue",
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
  "href": "/superadmin/assets/css/monthly.css"
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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Monthly Revenue - Oct 2025</h1>
            <p className="text-sm text-slate-500 mt-1">Detailed breakdown of earnings and financial performance.</p>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-sm p-1.5 w-fit">
            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg flex items-center transition-all">
              <i data-lucide="chevron-left" className="w-4 h-4 mr-1"></i> Prev
            </button>
            <span className="px-5 py-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">October 2025</span>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg flex items-center transition-all">
              Next <i data-lucide="chevron-right" className="w-4 h-4 ml-1"></i>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-purple-500 transition-colors">Total Revenue</p>
            <h3 className="text-3xl font-black text-slate-800 mt-3">₹8,45,000</h3>
            <p className="text-[10px] font-bold text-green-600 mt-4 flex items-center bg-green-50 w-fit px-2 py-1 rounded-full uppercase tracking-tighter">
              <i data-lucide="trending-up" className="w-3 h-3 mr-1"></i> +12.5% vs last month
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-red-500 transition-colors">Total Expenses</p>
            <h3 className="text-3xl font-black text-slate-800 mt-3">₹1,20,000</h3>
            <p className="text-[10px] font-bold text-red-500 mt-4 flex items-center bg-red-50 w-fit px-2 py-1 rounded-full uppercase tracking-tighter">
              <i data-lucide="trending-down" className="w-3 h-3 mr-1"></i> -2.1% vs last month
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-green-500 transition-colors">Net Profit</p>
            <h3 className="text-3xl font-black text-green-600 mt-3">₹7,25,000</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-tighter">85.8% Margin</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Active Tenants</p>
            <h3 className="text-3xl font-black text-slate-800 mt-3">142</h3>
            <p className="text-[10px] font-bold text-green-600 mt-4 flex items-center bg-green-50 w-fit px-2 py-1 rounded-full uppercase tracking-tighter">
              <i data-lucide="user-plus" className="w-3 h-3 mr-1"></i> +8 New this month
            </p>
          </div>
        </div>

        {/* Revenue Breakdown Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Revenue Breakdown</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Distribution by category</p>
            </div>
            <button className="text-xs font-bold text-purple-600 hover:text-purple-700 uppercase tracking-widest bg-purple-50 px-4 py-2 rounded-xl transition-all">View Full Report</button>
          </div>
          <div className="h-64 w-full flex items-end justify-around p-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 relative gap-4">
            {/* Simulated Bars */}
            <div className="flex-1 max-w-[100px] bg-purple-500 h-3/4 rounded-2xl relative group cursor-pointer hover:scale-105 transition-all shadow-lg shadow-purple-200 flex justify-center">
              <span className="absolute bottom-6 text-[10px] text-white font-black uppercase rotate-90 tracking-widest">Rent</span>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap z-10 shadow-xl">₹6.5L (76%)</div>
            </div>
            <div className="flex-1 max-w-[100px] bg-blue-500 h-1/4 rounded-2xl relative group cursor-pointer hover:scale-105 transition-all shadow-lg shadow-blue-200 flex justify-center">
              <span className="absolute bottom-6 text-[10px] text-white font-black uppercase rotate-90 tracking-widest">Deposit</span>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap z-10 shadow-xl">₹1.2L (14%)</div>
            </div>
            <div className="flex-1 max-w-[100px] bg-amber-500 h-1/6 rounded-2xl relative group cursor-pointer hover:scale-105 transition-all shadow-lg shadow-amber-200 flex justify-center">
              <span className="absolute bottom-6 text-[10px] text-white font-black uppercase rotate-90 tracking-widest">Service</span>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap z-10 shadow-xl">₹50k (6%)</div>
            </div>
            <div className="flex-1 max-w-[100px] bg-rose-500 h-[10%] rounded-2xl relative group cursor-pointer hover:scale-105 transition-all shadow-lg shadow-rose-200 flex justify-center">
              <span className="absolute bottom-6 text-[10px] text-white font-black uppercase rotate-90 tracking-widest">Fines</span>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap z-10 shadow-xl">₹25k (3%)</div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
            <button className="text-purple-600 hover:text-purple-800 text-xs font-bold uppercase tracking-widest flex items-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all hover:bg-slate-50">
              <i data-lucide="download" className="w-4 h-4 mr-2"></i> Download CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">24 Oct 2025</td>
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-400 font-bold">TXN-88291</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">Rent Payment - Room 204</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-lg uppercase tracking-wider">Rent</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">+₹6,500</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-[10px] font-bold text-green-600 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">23 Oct 2025</td>
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-400 font-bold">TXN-88285</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">Cleaning Services - Vendor</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded-lg uppercase tracking-wider">Expense</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-rose-600">-₹2,500</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-[10px] font-bold text-green-600 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">22 Oct 2025</td>
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-400 font-bold">TXN-88240</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">Security Deposit - New Tenant</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg uppercase tracking-wider">Deposit</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">+₹15,000</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-[10px] font-bold text-green-600 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                      Completed
                    </span>
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


