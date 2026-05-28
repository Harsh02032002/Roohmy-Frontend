import React, { useEffect } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { FileText, Upload, Info } from "lucide-react";

export default function Documents() {
  const owner = getOwnerRuntimeSession();
  
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Documents"
      onLogout={() => { 
        clearOwnerRuntimeSession(); 
        window.location.href = "/propertyowner/ownerlogin"; 
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Legal & Agreements</h1>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground">Manage lease/rent templates and legally signed tenant agreements.</p>
          </div>
          <button className="px-5 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 text-xs self-start sm:self-center">
            <Upload className="w-4 h-4" /> Upload Template
          </button>
        </div>

        <div className="border border-border bg-card rounded-2xl p-6 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Legal Templates</h3>
          </div>

          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No custom templates uploaded yet</p>
            <p className="text-xs text-muted-foreground mt-1">Upload your customized lease or agreement templates to get started.</p>
          </div>

          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-primary text-xs flex items-start gap-3">
            <Info size={16} className="shrink-0 mt-0.5" />
            <span>Note: Standard templates are active by default. You can upload custom formats if you have special property requirements.</span>
          </div>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
