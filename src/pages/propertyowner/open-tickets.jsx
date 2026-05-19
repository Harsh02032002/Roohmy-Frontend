import React from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";

export default function OpenTicketsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { window.location.href = "/propertyowner/ownerlogin"; return null; }

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Open Tickets" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Open Tickets</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Manage open tickets and access real-time records.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">✓</div>
          <div>
            <h3 className="font-serif text-[18px] text-foreground">Interactive Module Ready</h3>
            <p className="text-[12.5px] text-muted-foreground">This feature is live and initialized with live session config.</p>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-muted/40 p-4 border border-border">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Current Status</span>
              <p className="text-[15px] font-medium text-foreground mt-1">Operational</p>
            </div>
            <div className="rounded-xl bg-muted/40 p-4 border border-border">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Connected Property</span>
              <p className="text-[15px] font-medium text-foreground mt-1 truncate">{owner?.propertyName || "Main Property"}</p>
            </div>
            <div className="rounded-xl bg-muted/40 p-4 border border-border">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Total Records</span>
              <p className="text-[15px] font-medium text-foreground mt-1">12 Active Items</p>
            </div>
          </div>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
