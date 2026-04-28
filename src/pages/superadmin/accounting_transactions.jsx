import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, StatusBadge, TableToolbar } from "../../components/dashboard/DataTable";
import { Wallet, ArrowDownCircle, ArrowUpCircle, RotateCcw, Plus, Download, Eye } from "lucide-react";

const txns = [
  { id: "TXN-125487", desc: "Property listing payment - Green Villa", type: "Income", amount: "₹25,000", method: "Razorpay", status: "Completed", date: "26 May 2025" },
  { id: "TXN-125486", desc: "Commission - Green Villa", type: "Commission", amount: "₹2,500", method: "Internal", status: "Completed", date: "26 May 2025" },
  { id: "TXN-125485", desc: "Payout to owner - Green Villa", type: "Payout", amount: "₹22,500", method: "Bank Transfer", status: "Completed", date: "25 May 2025" },
  { id: "TXN-125484", desc: "Subscription - Silver Plan", type: "Subscription", amount: "₹8,999", method: "Stripe", status: "Completed", date: "25 May 2025" },
  { id: "TXN-125483", desc: "Featured listing - Blue Residency", type: "Income", amount: "₹1,999", method: "Razorpay", status: "Completed", date: "24 May 2025" },
  { id: "TXN-125482", desc: "Refund - Cancelled Subscription", type: "Refund", amount: "₹8,999", method: "Stripe", status: "Refunded", date: "24 May 2025" },
  { id: "TXN-125481", desc: "Payout to owner - Blue Residency", type: "Payout", amount: "₹18,000", method: "Bank Transfer", status: "Completed", date: "23 May 2025" },
  { id: "TXN-125480", desc: "Failed payment - Sunset PG", type: "Income", amount: "₹12,000", method: "PayPal", status: "Failed", date: "23 May 2025" },
];

const typeCls = {
  Income: "bg-info-soft text-info",
  Commission: "bg-success-soft text-success",
  Payout: "bg-warning-soft text-warning",
  Subscription: "bg-brand-purple-soft text-brand-purple",
  Refund: "bg-destructive/10 text-destructive",
};

export default function Transactions() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Transactions"
        subtitle="View and manage all platform transactions."
        actions={
          <>
            <button className="h-11 px-4 rounded-xl border border-border bg-card text-sm font-medium flex items-center gap-2 hover:bg-muted"><Download className="h-4 w-4" /> Export</button>
            <button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Add Transaction</button>
          </>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Volume" value="₹18,75,000" delta="+15.6%" trend="up" icon={Wallet} iconColor="blue" />
        <StatCard label="Income" value="₹14,25,000" delta="+12.4%" trend="up" icon={ArrowDownCircle} iconColor="green" />
        <StatCard label="Payouts" value="₹12,45,000" delta="+8.3%" trend="up" icon={ArrowUpCircle} iconColor="yellow" />
        <StatCard label="Refunds" value="₹45,250" delta="-3.2%" trend="down" icon={RotateCcw} iconColor="red" />
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search transactions..." filters={[{ label: "Type", value: "All" }, { label: "Status", value: "All" }, { label: "Method", value: "All" }]} />
        <DataTable data={txns} columns={[
          { key: "id", header: "ID", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "desc", header: "Description" },
          { key: "type", header: "Type", render: (r) => <span className={`badge-soft ${typeCls[r.type]}`}>{r.type}</span> },
          { key: "amount", header: "Amount", render: (r) => <span className="font-medium">{r.amount}</span> },
          { key: "method", header: "Method", render: (r) => <span className="text-muted-foreground">{r.method}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "date", header: "Date", render: (r) => <span className="text-muted-foreground text-xs">{r.date}</span> },
          { key: "actions", header: "", render: () => <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Eye className="h-4 w-4" /></button>, className: "text-right" },
        ]} />
      </div>
    </div>
  );
}
