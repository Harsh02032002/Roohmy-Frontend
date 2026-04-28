import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, StatusBadge, TableToolbar } from "../../components/dashboard/DataTable";
import { AlertTriangle, Shield, ShieldAlert, CheckCircle2, Eye, Check, X } from "lucide-react";

const reports = [
  { id: "R-1248", listing: "Maple House", reporter: "user_4521", reason: "Misleading photos", category: "Spam", date: "20 May 2025", status: "Pending" },
  { id: "R-1247", listing: "Green Oasis PG", reporter: "user_1289", reason: "Fake pricing details", category: "Spam", date: "20 May 2025", status: "Pending" },
  { id: "R-1246", listing: "City Center Apt", reporter: "user_8742", reason: "Inappropriate content in description", category: "Inappropriate", date: "19 May 2025", status: "Resolved" },
  { id: "R-1245", listing: "Skyline View", reporter: "user_3214", reason: "Duplicate of existing listing", category: "Spam", date: "19 May 2025", status: "Resolved" },
  { id: "R-1244", listing: "Garden Residency", reporter: "user_9821", reason: "Owner unresponsive", category: "Other", date: "18 May 2025", status: "Resolved" },
  { id: "R-1243", listing: "Sunset Villa", reporter: "user_5678", reason: "Photos don't match property", category: "Spam", date: "18 May 2025", status: "Rejected" },
];

export default function Moderation() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader title="Moderation" subtitle="Review reported content and take action." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Reports" value="14" delta="+3 this week" trend="up" icon={AlertTriangle} iconColor="yellow" />
        <StatCard label="Spam" value="6" delta="+2 this week" trend="up" icon={Shield} iconColor="red" />
        <StatCard label="Inappropriate" value="4" delta="+1 this week" trend="up" icon={ShieldAlert} iconColor="purple" />
        <StatCard label="Resolved" value="28" delta="+8 this week" trend="up" icon={CheckCircle2} iconColor="green" />
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search reports..." filters={[{ label: "Category", value: "All" }, { label: "Status", value: "All" }]} />
        <DataTable data={reports} columns={[
          { key: "id", header: "Report ID", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "listing", header: "Listing", render: (r) => <span className="font-medium">{r.listing}</span> },
          { key: "reporter", header: "Reporter", render: (r) => <span className="text-muted-foreground">{r.reporter}</span> },
          { key: "reason", header: "Reason" },
          { key: "category", header: "Category", render: (r) => <span className="badge-soft bg-muted text-foreground">{r.category}</span> },
          { key: "date", header: "Date", render: (r) => <span className="text-muted-foreground text-xs">{r.date}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", render: () => (
            <div className="flex gap-1 justify-end">
              <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Eye className="h-4 w-4" /></button>
              <button className="p-1.5 rounded hover:bg-muted text-success"><Check className="h-4 w-4" /></button>
              <button className="p-1.5 rounded hover:bg-muted text-destructive"><X className="h-4 w-4" /></button>
            </div>
          ), className: "text-right" },
        ]} />
      </div>
    </div>
  );
}
