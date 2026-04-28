import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, StatusBadge, TableToolbar } from "../../components/dashboard/DataTable";
import { Plus, Download, Home, CheckCircle2, Flag, Eye, MoreVertical, Edit, Trash2 } from "lucide-react";

const allListings = [
  { id: "L-2548", title: "Green Villa Residency", type: "Villa", owner: "Rahul Sharma", loc: "Bangalore", price: "₹25,000", status: "Active", views: 1245, date: "20 May 2025" },
  { id: "L-2547", title: "Silver Heights PG", type: "PG", owner: "Priya Verma", loc: "Pune", price: "₹8,500", status: "Pending", views: 432, date: "20 May 2025" },
  { id: "L-2546", title: "Blue Bells Apartment", type: "Apartment", owner: "Amit Kumar", loc: "Hyderabad", price: "₹18,000", status: "Active", views: 876, date: "19 May 2025" },
  { id: "L-2545", title: "Sunset Co-Living", type: "Co-Living", owner: "Neha Singh", loc: "Bangalore", price: "₹12,000", status: "Active", views: 1530, date: "19 May 2025" },
  { id: "L-2544", title: "Maple House", type: "House", owner: "Vikram Patel", loc: "Chennai", price: "₹30,000", status: "Flagged", views: 198, date: "18 May 2025" },
  { id: "L-2543", title: "Royal Apartments", type: "Apartment", owner: "Sneha Iyer", loc: "Delhi", price: "₹22,000", status: "Active", views: 945, date: "17 May 2025" },
  { id: "L-2542", title: "Pearl Residency", type: "PG", owner: "Karan Mehta", loc: "Mumbai", price: "₹9,500", status: "Inactive", views: 234, date: "16 May 2025" },
  { id: "L-2541", title: "Garden View Villa", type: "Villa", owner: "Anjali Roy", loc: "Bangalore", price: "₹35,000", status: "Active", views: 1820, date: "15 May 2025" },
];

export default function ReportsListings() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Listings Report"
        subtitle="Detailed performance of all property listings."
        actions={
          <>
            <button className="h-11 px-4 rounded-xl border border-border bg-card text-sm font-medium flex items-center gap-2 hover:bg-muted">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90">
              <Plus className="h-4 w-4" /> Add Listing
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Listings" value="2,548" delta="+156 this month" trend="up" icon={Home} iconColor="blue" />
        <StatCard label="Active" value="2,102" delta="82.6% of total" icon={CheckCircle2} iconColor="green" />
        <StatCard label="Flagged" value="7" delta="Needs review" icon={Flag} iconColor="red" />
        <StatCard label="Total Views" value="128,547" delta="+12.4% vs last" trend="up" icon={Eye} iconColor="purple" />
      </div>

      <div className="panel">
        <TableToolbar
          searchPlaceholder="Search listings..."
          filters={[{ label: "Status", value: "All" }, { label: "Type", value: "All" }, { label: "City", value: "All" }]}
        />
        <DataTable
          data={allListings}
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="font-medium">{r.id}</span> },
            { key: "title", header: "Property", render: (r) => (
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10" />
                <div><div className="font-medium">{r.title}</div><div className="text-xs text-muted-foreground">{r.type}</div></div>
              </div>
            )},
            { key: "owner", header: "Owner", render: (r) => <span className="text-muted-foreground">{r.owner}</span> },
            { key: "loc", header: "Location", render: (r) => <span className="text-muted-foreground">{r.loc}</span> },
            { key: "price", header: "Price", render: (r) => <span className="font-medium">{r.price}/mo</span> },
            { key: "views", header: "Views", render: (r) => <span className="text-muted-foreground">{r.views}</span> },
            { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
            { key: "date", header: "Listed", render: (r) => <span className="text-muted-foreground">{r.date}</span> },
            { key: "actions", header: "", render: () => (
              <div className="flex items-center justify-end gap-1">
                <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Edit className="h-4 w-4" /></button>
                <button className="p-1.5 rounded hover:bg-muted text-destructive"><Trash2 className="h-4 w-4" /></button>
                <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><MoreVertical className="h-4 w-4" /></button>
              </div>
            ), className: "text-right" },
          ]}
        />
        <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
          <span>Showing 1 to 8 of 2,548 entries</span>
          <div className="flex gap-1">
            {[1, 2, 3, "...", 319].map((p, i) => (
              <button key={i} className={`h-8 min-w-8 px-2 rounded-lg text-sm ${p === 1 ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
