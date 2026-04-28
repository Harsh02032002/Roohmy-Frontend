import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, StatusBadge, TableToolbar } from "../../components/dashboard/DataTable";
import { Hourglass, CheckCircle2, XCircle, Clock, Check, X, Eye } from "lucide-react";

const queue = [
  { id: "L-2547", title: "Silver Heights PG", owner: "Priya Verma", loc: "Pune", type: "PG", submitted: "20 May 2025, 02:15 PM", waiting: "2h 30m", status: "Pending" },
  { id: "L-2549", title: "Crystal Apartments", owner: "Rohit Sharma", loc: "Mumbai", type: "Apartment", submitted: "20 May 2025, 11:00 AM", waiting: "5h 45m", status: "Pending" },
  { id: "L-2550", title: "Lotus Villa", owner: "Meera Iyer", loc: "Chennai", type: "Villa", submitted: "20 May 2025, 09:20 AM", waiting: "7h 25m", status: "Pending" },
  { id: "L-2551", title: "Sunrise PG", owner: "Anil Kapoor", loc: "Delhi", type: "PG", submitted: "19 May 2025, 06:00 PM", waiting: "22h", status: "Pending" },
  { id: "L-2552", title: "Ocean Breeze", owner: "Kavita Singh", loc: "Goa", type: "Apartment", submitted: "19 May 2025, 04:30 PM", waiting: "23h 30m", status: "Pending" },
];

export default function ApprovalQueue() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader title="Approval Queue" subtitle="Review and approve pending property listings." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Pending Approvals" value="18" delta="+5 today" trend="up" icon={Hourglass} iconColor="yellow" />
        <StatCard label="Approved Today" value="12" delta="On track" icon={CheckCircle2} iconColor="green" />
        <StatCard label="Rejected Today" value="3" delta="-1 vs yesterday" trend="down" icon={XCircle} iconColor="red" />
        <StatCard label="Avg. Review Time" value="3h 24m" delta="Within SLA" icon={Clock} iconColor="blue" />
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search approvals..." filters={[{ label: "Type", value: "All" }, { label: "City", value: "All" }]} />
        <DataTable data={queue} columns={[
          { key: "id", header: "ID", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "title", header: "Property", render: (r) => <div><div className="font-medium">{r.title}</div><div className="text-xs text-muted-foreground">{r.type}</div></div> },
          { key: "owner", header: "Owner", render: (r) => <span className="text-muted-foreground">{r.owner}</span> },
          { key: "loc", header: "Location", render: (r) => <span className="text-muted-foreground">{r.loc}</span> },
          { key: "submitted", header: "Submitted", render: (r) => <span className="text-muted-foreground text-xs">{r.submitted}</span> },
          { key: "waiting", header: "Waiting", render: (r) => <span className="text-warning font-medium text-xs">{r.waiting}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "Actions", render: () => (
            <div className="flex items-center gap-2 justify-end">
              <button className="h-8 px-3 rounded-lg bg-success-soft text-success text-xs font-medium flex items-center gap-1 hover:bg-success/20"><Check className="h-3 w-3" /> Approve</button>
              <button className="h-8 px-3 rounded-lg bg-destructive/10 text-destructive text-xs font-medium flex items-center gap-1 hover:bg-destructive/20"><X className="h-3 w-3" /> Reject</button>
              <button className="p-1.5 rounded hover:bg-muted"><Eye className="h-4 w-4 text-muted-foreground" /></button>
            </div>
          ), className: "text-right" },
        ]} />
      </div>
    </div>
  );
}
