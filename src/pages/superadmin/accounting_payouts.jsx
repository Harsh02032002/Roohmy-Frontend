import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, TableToolbar, StatusBadge } from "../../components/dashboard/DataTable";
import { Send, Wallet, Clock, CheckCircle2, Plus, MoreVertical } from "lucide-react";

const payouts = [
  { id: "PO-3045", recipient: "Rahul Sharma", account: "HDFC ****4521", amount: "₹22,500", method: "Bank Transfer", date: "26 May 2025", status: "Completed" },
  { id: "PO-3044", recipient: "Priya Verma", account: "ICICI ****8842", amount: "₹7,650", method: "Bank Transfer", date: "26 May 2025", status: "Processing" },
  { id: "PO-3043", recipient: "Amit Kumar", account: "SBI ****1289", amount: "₹16,200", method: "Bank Transfer", date: "25 May 2025", status: "Completed" },
  { id: "PO-3042", recipient: "Neha Singh", account: "Axis ****3654", amount: "₹10,800", method: "UPI", date: "25 May 2025", status: "Completed" },
  { id: "PO-3041", recipient: "Vikram Patel", account: "Kotak ****9921", amount: "₹27,000", method: "Bank Transfer", date: "24 May 2025", status: "Pending" },
  { id: "PO-3040", recipient: "Sneha Iyer", account: "HDFC ****5544", amount: "₹19,800", method: "UPI", date: "24 May 2025", status: "Failed" },
];

export default function Payouts() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Payouts"
        subtitle="Manage payouts to property owners."
        actions={<button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Process Payout</button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Payouts" value="₹12,45,000" delta="+8.3%" trend="up" icon={Send} iconColor="blue" />
        <StatCard label="Completed" value="284" delta="This month" icon={CheckCircle2} iconColor="green" />
        <StatCard label="Pending" value="18" delta="₹2,18,500" icon={Clock} iconColor="yellow" />
        <StatCard label="Available Balance" value="₹4,52,800" delta="Ready to disburse" icon={Wallet} iconColor="purple" />
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search payouts..." filters={[{ label: "Status", value: "All" }, { label: "Method", value: "All" }]} />
        <DataTable data={payouts} columns={[
          { key: "id", header: "ID", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "recipient", header: "Recipient" },
          { key: "account", header: "Account", render: (r) => <span className="text-muted-foreground text-xs">{r.account}</span> },
          { key: "amount", header: "Amount", render: (r) => <span className="font-bold">{r.amount}</span> },
          { key: "method", header: "Method", render: (r) => <span className="text-muted-foreground">{r.method}</span> },
          { key: "date", header: "Date", render: (r) => <span className="text-muted-foreground text-xs">{r.date}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", render: () => <button className="p-1.5 rounded hover:bg-muted"><MoreVertical className="h-4 w-4 text-muted-foreground" /></button>, className: "text-right" },
        ]} />
      </div>
    </div>
  );
}
