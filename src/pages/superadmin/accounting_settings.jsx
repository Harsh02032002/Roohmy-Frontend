import { PageHeader } from "../../components/dashboard/PageHeader";

function Toggle({ on = false }) {
  return (
    <div className={`relative w-11 h-6 rounded-full ${on ? "bg-primary" : "bg-muted"}`}>
      <div className={`absolute top-0.5 h-5 w-5 bg-white rounded-full shadow ${on ? "right-0.5" : "left-0.5"}`} />
    </div>
  );
}

export default function AccountingSettings() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Accounting Settings"
        subtitle="Configure financial preferences and rules."
        actions={<button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Save Changes</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="panel">
          <h3 className="font-semibold mb-1">Currency & Format</h3>
          <p className="text-sm text-muted-foreground mb-5">Set default currency and number formats.</p>
          <div className="space-y-4">
            {[
              { label: "Default Currency", val: "INR (₹)" },
              { label: "Currency Position", val: "Before amount (₹100)" },
              { label: "Decimal Places", val: "2" },
              { label: "Thousand Separator", val: "Indian (1,00,000)" },
            ].map((f, i) => (
              <div key={i}>
                <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                <button className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm flex items-center justify-between">
                  <span>{f.val}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="font-semibold mb-1">Payout Rules</h3>
          <p className="text-sm text-muted-foreground mb-5">Configure automatic payouts.</p>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-medium">Auto Payouts</div>
                <div className="text-xs text-muted-foreground">Automatically process payouts on schedule</div>
              </div>
              <Toggle on />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Payout Frequency</label>
              <button className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm flex items-center justify-between">
                <span>Weekly (Every Monday)</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Minimum Payout Amount</label>
              <input defaultValue="₹500" className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Hold Period (days)</label>
              <input defaultValue="3" className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="font-semibold mb-1">Invoice Settings</h3>
          <p className="text-sm text-muted-foreground mb-5">Customize invoice generation.</p>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Invoice Prefix</label>
              <input defaultValue="INV-2025-" className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Default Payment Terms (days)</label>
              <input defaultValue="15" className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-medium">Auto-send Invoices</div>
                <div className="text-xs text-muted-foreground">Email invoice on creation</div>
              </div>
              <Toggle on />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-medium">Overdue Reminders</div>
                <div className="text-xs text-muted-foreground">Notify customers of overdue invoices</div>
              </div>
              <Toggle on />
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="font-semibold mb-1">Tax Settings</h3>
          <p className="text-sm text-muted-foreground mb-5">Manage tax configuration.</p>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-medium">Enable Taxes</div>
                <div className="text-xs text-muted-foreground">Apply tax rules on transactions</div>
              </div>
              <Toggle on />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-medium">Inclusive Pricing</div>
                <div className="text-xs text-muted-foreground">Show prices inclusive of taxes</div>
              </div>
              <Toggle on />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">GSTIN</label>
              <input defaultValue="29ABCDE1234F1Z5" className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">PAN Number</label>
              <input defaultValue="ABCDE1234F" className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
