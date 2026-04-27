import React from "react";
import { useHeadAssets } from "../../utils/useHeadAssets.js";
import { useTailwindProcessor } from "../../utils/useTailwindProcessor.js";
import { LayoutDashboard } from "lucide-react";

export default function PropertyModerationPage() {
  const title = "Roomhy - Property Moderation";
  const metas = [{ charset: "UTF-8" }, { name: "viewport", content: "width=device-width, initial-scale=1.0" }];
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic", crossorigin: true },
    { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap", rel: "stylesheet" }
  ];
  const scripts = [{ src: "https://cdn.tailwindcss.com" }];

  useHeadAssets({ title, metas, links, scripts, htmlAttrs: { lang: "en" }, bodyAttrs: { class: "bg-slate-50 text-slate-800" } });
  useTailwindProcessor();

  return (
    <main className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-sm">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <LayoutDashboard className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Property Moderation</h3>
        <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
          This module is currently being synchronized with the master dashboard template.
          Access level and data integration are in progress.
        </p>
      </div>
    </main>
  );
}
