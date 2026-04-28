import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, StatusBadge, TableToolbar } from "../../components/dashboard/DataTable";
import { Flag, AlertTriangle, ShieldAlert, CheckCircle2, Eye, Trash2, Check } from "lucide-react";

const flagged = [
  { id: "L-2544", title: "Maple House", owner: "Vikram Patel", loc: "Chennai", reason: "Misleading photos", reports: 5, flagged: "18 May 2025", status: "Flagged" },
  { id: "L-2520", title: "Green Oasis PG", owner: "Suresh Kumar", loc: "Bangalore", reason: "Spam content", reports: 8, flagged: "16 May 2025", status: "Flagged" },
  { id: "L-2515", title: "City Center Apartment", owner: "Pooja Gupta", loc: "Delhi", reason: "Inappropriate content", reports: 3, flagged: "15 May 2025", status: "Flagged" },
  { id: "L-2498", title: "Skyline View", owner: "Rajesh Verma", loc: "Mumbai", reason: "Duplicate listing", reports: 2, flagged: "14 May 2025", status: "Flagged" },
  { id: "L-2487", title: "Garden Residency", owner: "Anita Joshi", loc: "Pune", reason: "Fake pricing", reports: 6, flagged: "12 May 2025", status: "Flagged" },
];

export default function FlaggedListings() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader title="Flagged Listings" subtitle="Review listings that have been reported by users." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Flagged" value="7" delta="+2 this week" trend="up" icon={Flag} iconColor="red" />
        <StatCard label="Spam Reports" value="6" delta="In review" icon={ShieldAlert} iconColor="yellow" />
        <StatCard label="Inappropriate" value="4" delta="High priority" icon={AlertTriangle} iconColor="purple" />
        <StatCard label="Resolved" value="28" delta="+8 this week" trend="up" icon={CheckCircle2} iconColor="green" />
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search flagged..." filters={[{ label: "Reason", value: "All" }]} />
        <DataTable data={flagged} columns={[
          { key: "id", header: "ID", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "title", header: "Property", render: (r) => <div className="font-medium">{r.title}</div> },
          { key: "owner", header: "Owner", render: (r) => <span className="text-muted-foreground">{r.owner}</span> },
          { key: "loc", header: "Location", render: (r) => <span className="text-muted-foreground">{r.loc}</span> },
          { key: "reason", header: "Reason", render: (r) => <span className="text-foreground">{r.reason}</span> },
          { key: "reports", header: "Reports", render: (r) => <span className="badge-soft bg-destructive/10 text-destructive">{r.reports}</span> },
          { key: "flagged", header: "Flagged On", render: (r) => <span className="text-muted-foreground text-xs">{r.flagged}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "Actions", render: () => (
            <div className="flex gap-1 justify-end">
              <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Eye className="h-4 w-4" /></button>
              <button className="p-1.5 rounded hover:bg-muted text-success"><Check className="h-4 w-4" /></button>
              <button className="p-1.5 rounded hover:bg-muted text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ), className: "text-right" },
        ]} />
      </div>
    </div>
  );
}
