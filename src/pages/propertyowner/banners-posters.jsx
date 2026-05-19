import React from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  FileImage, Search, Download, CheckCircle2, 
  ArrowUpRight, Image
} from "lucide-react";

export default function BannersPostersPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const assets = [
    { id: 1, name: "WiFi Password & Speed details poster", size: "A4 Printable PDF", category: "Notice board flyers" },
    { id: 2, name: "No Smoking / Eco Stay poster", size: "A3 Wall print", category: "Corridors posters" },
    { id: 3, name: "Gate Rules & Curfew limits", size: "A4 Flyer", category: "Reception printables" }
  ];

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Printable Media Templates" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Banners &amp; Posters</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Download pre-designed WiFi password sheets, hostel guidelines flyers, and notice board printables.</p>
        </div>
      </div>

      {/* Grid of Posters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Image size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                  {asset.size}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground leading-tight">{asset.name}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-1">{asset.category}</p>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
              <button className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5">
                <Download size={14} /> Download Printable PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
