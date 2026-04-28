import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";

function Toggle({ on = false }) {
  return (
    <div className={`relative w-11 h-6 rounded-full ${on ? "bg-primary" : "bg-muted"}`}>
      <div className={`absolute top-0.5 h-5 w-5 bg-white rounded-full shadow ${on ? "right-0.5" : "left-0.5"}`} />
    </div>
  );
}

export default function PropertySettings() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Property Settings"
        subtitle="Configure property listing rules and preferences."
        actions={<button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Save Changes</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="panel">
          <h3 className="font-semibold mb-1">Listing Rules</h3>
          <p className="text-sm text-muted-foreground mb-5">Define rules for new listings.</p>
          <div className="space-y-4">
            {[
              { title: "Auto Approve Listings", sub: "Skip manual review for verified owners", on: false },
              { title: "Require Property Photos", sub: "Minimum 3 photos per listing", on: true },
              { title: "Verify Owner Documents", sub: "Mandatory KYC for new owners", on: true },
              { title: "Allow Negotiable Pricing", sub: "Show 'Negotiable' tag on listings", on: true },
            ].map((s, i) => (
              <div key={i} className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
                <Toggle on={s.on} />
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="font-semibold mb-1">Listing Limits</h3>
          <p className="text-sm text-muted-foreground mb-5">Configure platform-wide listing limits.</p>
          <div className="space-y-4">
            {[
              { label: "Max Listings per Owner", val: "50" },
              { label: "Max Photos per Listing", val: "20" },
              { label: "Max Price (₹)", val: "10,00,000" },
              { label: "Min Price (₹)", val: "1,000" },
              { label: "Listing Expiry (days)", val: "90" },
            ].map((f, i) => (
              <div key={i}>
                <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                <input defaultValue={f.val} className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
