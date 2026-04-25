import React, { useEffect } from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function Superchat() {
  useHtmlPage({
    title: "Super Admin - All Messages",
    bodyClass: "bg-gray-50",
    htmlAttrs: { lang: "en" },
    metas: [
      { charset: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" }
    ],
    links: [
      { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap", rel: "stylesheet" },
      { rel: "stylesheet", href: "/superadmin/assets/css/superchat.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { src: "https://unpkg.com/lucide@latest" }],
    inlineScripts: []
  });

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">All System Messages</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i data-lucide="mail-open" className="w-10 h-10 text-slate-300"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No messages available</h3>
            <p className="text-slate-500">Integrate the messaging API to populate this view.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


