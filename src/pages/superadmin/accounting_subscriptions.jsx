import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, TableToolbar, StatusBadge } from "../../components/dashboard/DataTable";
import { CreditCard, Users, RefreshCw, XCircle, MoreVertical } from "lucide-react";

const subs = [
  { id: "SUB-1024", customer: "Rahul Sharma", plan: "Gold", amount: "₹7,999", cycle: "Monthly", next: "26 Jun 2025", status: "Active" },
  { id: "SUB-1023", customer: "Priya Verma", plan: "Silver", amount: "₹2,999", cycle: "Monthly", next: "25 Jun 2025", status: "Active" },
  { id: "SUB-1022", customer: "Amit Kumar", plan: "Basic", amount: "₹999", cycle: "Monthly", next: "24 Jun 2025", status: "Active" },
  { id: "SUB-1021", customer: "Neha Singh", plan: "Silver", amount: "₹2,999", cycle: "Monthly", next: "23 Jun 2025", status: "Active" },
  { id: "SUB-1020", customer: "Vikram Patel", plan: "Gold", amount: "₹7,999", cycle: "Monthly", next: "—", status: "Cancelled" },
  { id: "SUB-1019", customer: "Sneha Iyer", plan: "Basic", amount: "₹999", cycle: "Monthly", next: "—", status: "Expired" },
];

const planCls = {
  Gold: "bg-warning-soft text-warning",
  Silver: "bg-brand-purple-soft text-brand-purple",
  Basic: "bg-info-soft text-info",
};

export default function Subscriptions() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader title="Subscriptions" subtitle="Manage active and past subscription plans." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Active Subscriptions" value="1,998" delta="+24 this month" trend="up" icon={CreditCard} iconColor="green" />
        <StatCard label="Total Subscribers" value="2,142" delta="+38" trend="up" icon={Users} iconColor="blue" />
        <StatCard label="Renewals (30d)" value="312" delta="92% rate" icon={RefreshCw} iconColor="purple" />
        <StatCard label="Churned" value="18" delta="-4 vs last" trend="down" icon={XCircle} iconColor="red" />
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search subscriptions..." filters={[{ label: "Plan", value: "All" }, { label: "Status", value: "All" }]} />
        <DataTable data={subs} columns={[
          { key: "id", header: "ID", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "customer", header: "Customer" },
          { key: "plan", header: "Plan", render: (r) => <span className={`badge-soft ${planCls[r.plan]}`}>{r.plan}</span> },
          { key: "amount", header: "Amount", render: (r) => <span className="font-medium">{r.amount}</span> },
          { key: "cycle", header: "Cycle", render: (r) => <span className="text-muted-foreground">{r.cycle}</span> },
          { key: "next", header: "Next Billing", render: (r) => <span className="text-muted-foreground text-xs">{r.next}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", render: () => <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><MoreVertical className="h-4 w-4" /></button>, className: "text-right" },
        ]} />
      </div>
    </div>
  );
}
