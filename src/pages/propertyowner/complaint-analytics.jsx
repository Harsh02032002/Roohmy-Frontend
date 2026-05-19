import React from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Headset, BarChart3, TrendingUp, Download, 
  ArrowUpRight, PieChart, ShieldCheck
} from "lucide-react";

export default function ComplaintAnalyticsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const breakdown = [
    { type: "Electrical (AC/Wiring)", count: 24, percentage: "48%" },
    { type: "Plumbing (Taps/Drainage)", count: 15, percentage: "30%" },
    { type: "Housekeeping (Cleanliness)", count: 8, percentage: "16%" },
    { type: "Internet (WiFi/Routers)", count: 3, percentage: "6%" }
  ];

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Maintenance Dashboard" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Complaint Analytics</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Monitor average ticket resolution speed, satisfaction rates, and categories distributions.</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider font-bold text-rose-600">Avg. Resolution Speed</span>
          <h3 className="text-[28px] font-bold text-rose-600 mt-1">4.2 Hours</h3>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Tenant Satisfaction Rate</span>
          <h3 className="text-[28px] font-bold text-emerald-600 mt-1">4.7 / 5.0</h3>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Total Complaints Resolved</span>
          <h3 className="text-[28px] font-bold text-primary mt-1">143 Tickets</h3>
        </div>
      </div>

      {/* Breakdown */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
        <h3 className="font-serif text-[20px] text-foreground border-b border-border/60 pb-3">Issues Categories Distribution</h3>
        <div className="space-y-4">
          {breakdown.map((b, index) => (
            <div key={index} className="flex justify-between items-center border border-border p-4 rounded-xl bg-muted/20">
              <div>
                <h4 className="text-[13.5px] font-bold text-slate-800">{b.type}</h4>
                <p className="text-[11.5px] text-muted-foreground mt-0.5">{b.count} Tickets logged</p>
              </div>
              <span className="font-bold text-primary text-[15px]">{b.percentage}</span>
            </div>
          ))}
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
