import React, { useEffect, useState } from "react";
import { useHeadAssets } from "../../utils/useHeadAssets.js";
import { useTailwindProcessor } from "../../utils/useTailwindProcessor.js";
import { BarChart3, PieChart, TrendingUp, Download, Calendar, Filter } from "lucide-react";

const title = "Roomhy - Reports Overview";
const metas = [{ charset: "UTF-8" }, { name: "viewport", content: "width=device-width, initial-scale=1.0" }];
const links = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic", crossorigin: true },
  { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap", rel: "stylesheet" }
];
const scripts = [{ src: "https://cdn.tailwindcss.com" }];

export default function ReportsOverviewPage() {
  useHeadAssets({ title, metas, links, scripts, htmlAttrs: { lang: "en" }, bodyAttrs: { class: "bg-slate-50 text-slate-800" } });
  useTailwindProcessor();

  return (
    <main className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-500 mt-1">Generate and view detailed performance reports for the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 flex items-center px-3 py-2 rounded-xl text-xs font-medium text-slate-600 shadow-sm">
            <Calendar className="w-4 h-4 mr-2" /> Last 30 Days
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-purple-700 transition-all flex items-center shadow-md">
            <Download className="w-4 h-4 mr-2" /> Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><BarChart3 className="w-6 h-6" /></div>
          <h3 className="text-lg font-bold">Property Reports</h3>
          <p className="text-slate-500 text-sm">Detailed analysis of property listings, categories, and occupancy rates.</p>
          <button className="text-blue-600 text-xs font-bold hover:underline">View Properties Report →</button>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><TrendingUp className="w-6 h-6" /></div>
          <h3 className="text-lg font-bold">Revenue Reports</h3>
          <p className="text-slate-500 text-sm">Track income, commissions, and transaction history across all regions.</p>
          <button className="text-purple-600 text-xs font-bold hover:underline">View Revenue Report →</button>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><PieChart className="w-6 h-6" /></div>
          <h3 className="text-lg font-bold">User Analytics</h3>
          <p className="text-slate-500 text-sm">Analyze user growth, tenant behavior, and owner performance metrics.</p>
          <button className="text-emerald-600 text-xs font-bold hover:underline">View User Report →</button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-[400px] flex items-center justify-center">
         <div className="text-center">
           <BarChart3 className="w-16 h-16 text-slate-100 mx-auto mb-4" />
           <h4 className="text-slate-400 font-bold">Comprehensive Platform Performance</h4>
           <p className="text-slate-300 text-sm">Aggregate data visualization will appear here.</p>
         </div>
      </div>
    </main>
  );
}
