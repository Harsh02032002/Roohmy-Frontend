import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, TableToolbar, StatusBadge } from "../../components/dashboard/DataTable";
import { FileText, Receipt, CheckCircle2, AlertCircle, Plus, Download, Eye, Send } from "lucide-react";

const invoices = [
  { id: "INV-2025-0512", customer: "Rahul Sharma", amount: "₹25,000", issued: "26 May 2025", due: "10 Jun 2025", status: "Paid" },
  { id: "INV-2025-0511", customer: "Priya Verma", amount: "₹8,500", issued: "26 May 2025", due: "10 Jun 2025", status: "Paid" },
  { id: "INV-2025-0510", customer: "Amit Kumar", amount: "₹18,000", issued: "25 May 2025", due: "09 Jun 2025", status: "Pending" },
  { id: "INV-2025-0509", customer: "Neha Singh", amount: "₹12,000", issued: "25 May 2025", due: "09 Jun 2025", status: "Paid" },
  { id: "INV-2025-0508", customer: "Vikram Patel", amount: "₹30,000", issued: "20 May 2025", due: "04 Jun 2025", status: "Overdue" },
  { id: "INV-2025-0507", customer: "Sneha Iyer", amount: "₹22,000", issued: "18 May 2025", due: "02 Jun 2025", status: "Overdue" },
  { id: "INV-2025-0506", customer: "Karan Mehta", amount: "₹9,500", issued: "15 May 2025", due: "30 May 2025", status: "Draft" },
];

export default function Invoices() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Invoices"
        subtitle="Create, send and track customer invoices."
        actions={
          <>
            <button className="h-11 px-4 rounded-xl border border-border bg-card text-sm font-medium flex items-center gap-2 hover:bg-muted"><Download className="h-4 w-4" /> Export</button>
            <button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Create Invoice</button>
          </>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Invoices" value="1,245" delta="+58 this month" trend="up" icon={FileText} iconColor="blue" />
        <StatCard label="Paid" value="1,180" delta="₹14,82,000" icon={CheckCircle2} iconColor="green" />
        <StatCard label="Pending" value="53" delta="₹3,28,500" icon={Receipt} iconColor="yellow" />
        <StatCard label="Overdue" value="12" delta="₹1,25,300" icon={AlertCircle} iconColor="red" />
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search invoices..." filters={[{ label: "Status", value: "All" }]} />
        <DataTable data={invoices} columns={[
          { key: "id", header: "Invoice", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "customer", header: "Customer" },
          { key: "amount", header: "Amount", render: (r) => <span className="font-bold">{r.amount}</span> },
          { key: "issued", header: "Issued", render: (r) => <span className="text-muted-foreground text-xs">{r.issued}</span> },
          { key: "due", header: "Due", render: (r) => <span className="text-muted-foreground text-xs">{r.due}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", render: () => (
            <div className="flex gap-1 justify-end">
              <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Eye className="h-4 w-4" /></button>
              <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Send className="h-4 w-4" /></button>
              <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Download className="h-4 w-4" /></button>
            </div>
          ), className: "text-right" },
        ]} />
      </div>
    </div>
  );
}
