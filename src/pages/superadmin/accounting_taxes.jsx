import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, StatusBadge } from "../../components/dashboard/DataTable";
import { Calculator, Receipt, FileText, Plus, Edit, Trash2 } from "lucide-react";

const taxes = [
  { id: "T-01", name: "GST", type: "Percentage", rate: "18%", appliesTo: "All Services", region: "India", status: "Active" },
  { id: "T-02", name: "CGST", type: "Percentage", rate: "9%", appliesTo: "Intra-state", region: "India", status: "Active" },
  { id: "T-03", name: "SGST", type: "Percentage", rate: "9%", appliesTo: "Intra-state", region: "India", status: "Active" },
  { id: "T-04", name: "IGST", type: "Percentage", rate: "18%", appliesTo: "Inter-state", region: "India", status: "Active" },
  { id: "T-05", name: "TDS", type: "Percentage", rate: "10%", appliesTo: "Commission", region: "India", status: "Active" },
  { id: "T-06", name: "Service Charge", type: "Fixed", rate: "₹50", appliesTo: "Listings", region: "All", status: "Disabled" },
];

export default function Taxes() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Taxes"
        subtitle="Manage tax rules and regulations."
        actions={<button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Add Tax</button>}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Total Tax Collected" value="₹3,37,500" delta="+15.6%" trend="up" icon={Calculator} iconColor="blue" />
        <StatCard label="GST (18%)" value="₹2,70,000" delta="On services" icon={Receipt} iconColor="green" />
        <StatCard label="TDS (10%)" value="₹28,575" delta="On commission" icon={FileText} iconColor="purple" />
      </div>

      <div className="panel">
        <DataTable data={taxes} columns={[
          { key: "id", header: "ID", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "name", header: "Tax Name", render: (r) => <span className="font-medium">{r.name}</span> },
          { key: "type", header: "Type", render: (r) => <span className="badge-soft bg-info-soft text-info">{r.type}</span> },
          { key: "rate", header: "Rate", render: (r) => <span className="font-bold">{r.rate}</span> },
          { key: "appliesTo", header: "Applies To", render: (r) => <span className="text-muted-foreground">{r.appliesTo}</span> },
          { key: "region", header: "Region", render: (r) => <span className="text-muted-foreground">{r.region}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", render: () => (
            <div className="flex gap-1 justify-end">
              <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Edit className="h-4 w-4" /></button>
              <button className="p-1.5 rounded hover:bg-muted text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ), className: "text-right" },
        ]} />
      </div>
    </div>
  );
}
