import React, { useEffect, useState } from "react";
import { useHeadAssets } from "../../utils/useHeadAssets.js";
import { useTailwindProcessor } from "../../utils/useTailwindProcessor.js";
import { DollarSign, ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Receipt, IndianRupee } from "lucide-react";

const title = "Roomhy - Accounting Dashboard";
const metas = [{ charset: "UTF-8" }, { name: "viewport", content: "width=device-width, initial-scale=1.0" }];
const links = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic", crossorigin: true },
  { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap", rel: "stylesheet" }
];
const scripts = [{ src: "https://cdn.tailwindcss.com" }];

export default function AccountingDashboardPage() {
  useHeadAssets({ title, metas, links, scripts, htmlAttrs: { lang: "en" }, bodyAttrs: { class: "bg-slate-50 text-slate-800" } });
  useTailwindProcessor();

  const stats = [
    { label: "Total Revenue", value: "₹12,85,420", delta: "+12.5%", icon: DollarSign, color: "purple" },
    { label: "Net Payouts", value: "₹8,42,100", delta: "-2.4%", icon: ArrowUpRight, color: "blue" },
    { label: "Platform Comm.", value: "₹2,43,320", delta: "+8.1%", icon: Wallet, color: "emerald" },
    { label: "Pending Refund", value: "₹45,000", delta: "12 requests", icon: ArrowDownRight, color: "rose" },
  ];

  return (
    <main className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Accounting Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of platform finances, transactions, and revenue.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all flex items-center shadow-sm">
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const colors = {
            purple: "bg-purple-50 text-purple-600",
            blue: "bg-blue-50 text-blue-600",
            emerald: "bg-emerald-50 text-emerald-600",
            rose: "bg-rose-50 text-rose-600"
          };
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group hover:border-purple-100 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${colors[s.color]}`}><Icon className="w-5 h-5" /></div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.delta.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>{s.delta}</span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{s.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{s.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-96 flex items-center justify-center">
          <p className="text-slate-400 font-medium italic text-sm text-center">Revenue Chart Placeholder (Chart.js will render here)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-purple-600" /> Recent Transactions
          </h3>
          <div className="space-y-4">
             {[1, 2, 3, 4, 5].map((t) => (
               <div key={t} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><CreditCard className="w-5 h-5" /></div>
                   <div>
                     <p className="text-sm font-bold text-slate-800">Booking #BK-{1000 + t}</p>
                     <p className="text-[10px] text-slate-400">20 May 2025, 10:30 AM</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-emerald-600">+₹4,500</p>
                   <p className="text-[10px] text-slate-400">Success</p>
                 </div>
               </div>
             ))}
          </div>
          <button className="w-full mt-6 py-2 text-purple-600 text-xs font-bold hover:underline">View All Transactions</button>
        </div>
      </div>
    </main>
  );
}
