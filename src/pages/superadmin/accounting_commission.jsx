import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, TableToolbar, StatusBadge } from "../../components/dashboard/DataTable";
import { Database, Percent, Wallet, TrendingUp, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = Array.from({ length: 7 }, (_, i) => ({ name: `${20 + i} May`, commission: 35000 + i * 4500 }));

const records = [
  { id: "C-2148", listing: "Green Villa Residency", amount: "₹2,500", rate: "10%", base: "₹25,000", date: "26 May 2025", status: "Paid" },
  { id: "C-2147", listing: "Silver Heights PG", amount: "₹850", rate: "10%", base: "₹8,500", date: "26 May 2025", status: "Pending" },
  { id: "C-2146", listing: "Blue Bells Apartment", amount: "₹1,800", rate: "10%", base: "₹18,000", date: "25 May 2025", status: "Paid" },
  { id: "C-2145", listing: "Sunset Co-Living", amount: "₹1,200", rate: "10%", base: "₹12,000", date: "25 May 2025", status: "Paid" },
  { id: "C-2144", listing: "Maple House", amount: "₹3,000", rate: "10%", base: "₹30,000", date: "24 May 2025", status: "Pending" },
  { id: "C-2143", listing: "Royal Apartments", amount: "₹2,200", rate: "10%", base: "₹22,000", date: "24 May 2025", status: "Paid" },
];

export default function Commission() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Commission"
        subtitle="Track commission earnings and rates."
        actions={<button className="h-11 px-4 rounded-xl border border-border bg-card text-sm font-medium flex items-center gap-2 hover:bg-muted"><Download className="h-4 w-4" /> Export</button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Commission" value="₹2,85,750" delta="+12.4%" trend="up" icon={Database} iconColor="green" />
        <StatCard label="Avg Rate" value="10%" delta="Standard" icon={Percent} iconColor="blue" />
        <StatCard label="Pending" value="₹38,420" delta="14 listings" icon={Wallet} iconColor="yellow" />
        <StatCard label="Growth" value="+12.4%" delta="vs last week" trend="up" icon={TrendingUp} iconColor="purple" />
      </div>

      <div className="panel">
        <h3 className="font-semibold mb-4">Commission Trend</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip />
              <Bar dataKey="commission" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search commissions..." />
        <DataTable data={records} columns={[
          { key: "id", header: "ID", render: (r) => <span className="font-medium">{r.id}</span> },
          { key: "listing", header: "Listing" },
          { key: "base", header: "Base Amount", render: (r) => <span className="text-muted-foreground">{r.base}</span> },
          { key: "rate", header: "Rate", render: (r) => <span className="badge-soft bg-info-soft text-info">{r.rate}</span> },
          { key: "amount", header: "Commission", render: (r) => <span className="font-bold text-success">{r.amount}</span> },
          { key: "date", header: "Date", render: (r) => <span className="text-muted-foreground text-xs">{r.date}</span> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]} />
      </div>
    </div>
  );
}
