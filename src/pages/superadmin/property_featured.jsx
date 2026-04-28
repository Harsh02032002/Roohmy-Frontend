import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, StatusBadge, TableToolbar } from "../../components/dashboard/DataTable";
import { Sparkles, TrendingUp, Eye, MousePointerClick, Plus, Calendar, MoreVertical } from "lucide-react";

const featured = [
  { id: "F-101", title: "Green Villa Residency", owner: "Rahul Sharma", plan: "Premium", views: 12450, clicks: 845, start: "01 May 2025", end: "31 May 2025", status: "Active" },
  { id: "F-102", title: "Sunset Co-Living", owner: "Neha Singh", plan: "Featured", views: 9820, clicks: 654, start: "05 May 2025", end: "04 Jun 2025", status: "Active" },
  { id: "F-103", title: "Royal Apartments", owner: "Sneha Iyer", plan: "Premium", views: 15630, clicks: 1245, start: "10 May 2025", end: "09 Jun 2025", status: "Active" },
  { id: "F-104", title: "Garden View Villa", owner: "Anjali Roy", plan: "Featured", views: 8245, clicks: 432, start: "15 May 2025", end: "14 Jun 2025", status: "Active" },
  { id: "F-105", title: "Pearl Residency", owner: "Karan Mehta", plan: "Premium", views: 0, clicks: 0, start: "01 Apr 2025", end: "30 Apr 2025", status: "Expired" },
];

export default function FeaturedListings() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Featured Listings"
        subtitle="Manage promoted and featured property listings."
        actions={<button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Add Featured</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Active Featured" value="42" delta="+6 this month" trend="up" icon={Sparkles} iconColor="purple" />
        <StatCard label="Total Views" value="468K" delta="+18.4%" trend="up" icon={Eye} iconColor="blue" />
        <StatCard label="Total Clicks" value="32.5K" delta="+12.6%" trend="up" icon={MousePointerClick} iconColor="green" />
        <StatCard label="Conversion Rate" value="6.94%" delta="+0.8%" trend="up" icon={TrendingUp} iconColor="yellow" />
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search featured..." filters={[{ label: "Plan", value: "All" }]} />
        <DataTable data={featured} columns={[
          { key: "id", header: "ID", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "title", header: "Property", render: (r) => <div><div className="font-medium">{r.title}</div><div className="text-xs text-muted-foreground">{r.owner}</div></div> },
          { key: "plan", header: "Plan", render: (r) => <StatusBadge status={r.plan} /> },
          { key: "views", header: "Views", render: (r) => <span className="font-medium">{r.views.toLocaleString()}</span> },
          { key: "clicks", header: "Clicks", render: (r) => <span className="font-medium">{r.clicks.toLocaleString()}</span> },
          { key: "period", header: "Period", render: (r) => <div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{r.start} → {r.end}</div> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", render: () => <button className="p-1.5 rounded hover:bg-muted"><MoreVertical className="h-4 w-4 text-muted-foreground" /></button>, className: "text-right" },
        ]} />
      </div>
    </div>
  );
}
