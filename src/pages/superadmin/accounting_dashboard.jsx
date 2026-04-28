import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DateRangePill } from "../../components/dashboard/DateRangePill";
import { Wallet, Database, FileText, RotateCcw, Receipt, Download, Plus, FilePlus, Send, RefreshCw, FileBarChart, Calculator, Files, Upload } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const revenueLine = Array.from({ length: 7 }, (_, i) => ({
  name: `${20 + i} May`,
  revenue: 14000 + i * 1100,
  commission: 3000 + i * 400,
  payouts: 11000 + i * 600,
}));

const incomeBars = Array.from({ length: 7 }, (_, i) => ({
  name: `${20 + i} May`,
  income: 16000 + i * 200 - (i === 4 ? 4000 : 0),
  expenses: 7000 + i * 600,
}));

const sources = [
  { name: "Property Listings", value: 1245000, color: "hsl(var(--chart-1))" },
  { name: "Subscriptions", value: 320000, color: "hsl(var(--chart-2))" },
  { name: "Featured Listings", value: 210000, color: "hsl(var(--chart-3))" },
  { name: "Other Sources", value: 100000, color: "hsl(var(--chart-5))" },
];

const txns = [
  { id: "TXN-125487", desc: "Property listing payment - Green Villa", type: "Income", amount: "₹25,000", status: "Completed", date: "26 May 2025" },
  { id: "TXN-125486", desc: "Commission - Green Villa", type: "Commission", amount: "₹2,500", status: "Completed", date: "26 May 2025" },
  { id: "TXN-125485", desc: "Payout to owner - Green Villa", type: "Payout", amount: "₹22,500", status: "Completed", date: "25 May 2025" },
  { id: "TXN-125484", desc: "Subscription - Silver Plan", type: "Subscription", amount: "₹8,999", status: "Completed", date: "25 May 2025" },
  { id: "TXN-125483", desc: "Featured listing - Blue Residency", type: "Income", amount: "₹1,999", status: "Completed", date: "24 May 2025" },
  { id: "TXN-125482", desc: "Refund - Cancelled Subscription", type: "Refund", amount: "₹8,999", status: "Refunded", date: "24 May 2025" },
  { id: "TXN-125481", desc: "Payout to owner - Blue Residency", type: "Payout", amount: "₹18,000", status: "Completed", date: "23 May 2025" },
];

const typeCls = {
  Income: "bg-info-soft text-info",
  Commission: "bg-success-soft text-success",
  Payout: "bg-warning-soft text-warning",
  Subscription: "bg-brand-purple-soft text-brand-purple",
  Refund: "bg-destructive/10 text-destructive",
};

const statusCls = {
  Completed: "bg-success-soft text-success",
  Refunded: "bg-destructive/10 text-destructive",
};

export default function Accounting() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Accounting Dashboard"
        subtitle="Overview of financial activities and performance."
        actions={
          <>
            <DateRangePill value="20 May 2025 - 26 May 2025" />
            <button className="h-11 px-5 rounded-xl border border-border bg-card font-medium text-sm flex items-center gap-2 hover:bg-muted">
              <Download className="h-4 w-4" /> Export Report
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard label="Total Revenue" value="₹18,75,000" delta="+15.6% vs last week" trend="up" icon={Wallet} iconColor="blue" />
        <StatCard label="Total Commission" value="₹2,85,750" delta="+12.4% vs last week" trend="up" icon={Database} iconColor="green" />
        <StatCard label="Total Payouts" value="₹12,45,000" delta="+8.3% vs last week" trend="up" icon={FileText} iconColor="purple" />
        <StatCard label="Total Refunds" value="₹45,250" delta="-3.2% vs last week" trend="down" icon={RotateCcw} iconColor="orange" />
        <StatCard label="Outstanding Amount" value="₹1,25,300" delta="-5.6% vs last week" trend="down" icon={Receipt} iconColor="red" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="panel">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Revenue Overview</h3>
            <select className="h-8 px-2 rounded-lg border border-border text-xs"><option>This Week</option></select>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={revenueLine}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="commission" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="payouts" stroke="hsl(var(--chart-5))" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Income vs Expenses</h3>
            <select className="h-8 px-2 rounded-lg border border-border text-xs"><option>This Week</option></select>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={incomeBars}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="income" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <h3 className="font-semibold mb-4">Revenue by Source</h3>
          <div className="relative h-44">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sources} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>
                  {sources.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-lg font-bold">₹18,75,000</div>
              <div className="text-[10px] text-muted-foreground">Total</div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs">
            {sources.map((s) => (
              <div key={s.name}>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  <span className="font-medium">{s.name}</span>
                </div>
                <div className="text-muted-foreground pl-4">₹{s.value.toLocaleString("en-IN")} ({((s.value / 1875000) * 100).toFixed(1)}%)</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 panel">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Transactions</h3>
            <button className="text-sm text-primary font-medium">View All</button>
          </div>
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-b border-border">
                <tr>
                  <th className="text-left px-6 py-2 font-medium">ID</th>
                  <th className="text-left py-2 font-medium">Description</th>
                  <th className="text-left py-2 font-medium">Type</th>
                  <th className="text-left py-2 font-medium">Amount</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left px-6 py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {txns.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/30">
                    <td className="px-6 py-3 font-medium">{t.id}</td>
                    <td className="text-muted-foreground">{t.desc}</td>
                    <td><span className={`badge-soft ${typeCls[t.type]}`}>{t.type}</span></td>
                    <td className="font-medium">{t.amount}</td>
                    <td><span className={`badge-soft ${statusCls[t.status]}`}>{t.status}</span></td>
                    <td className="px-6 text-muted-foreground">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end pt-4">
            <button className="text-sm text-primary font-medium">View All Transactions →</button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="panel">
            <h3 className="font-semibold mb-4">Outstanding Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-border">
                <div className="icon-bubble bg-destructive/10 text-destructive h-9 w-9 mb-2"><RotateCcw className="h-4 w-4" /></div>
                <div className="text-xs text-muted-foreground">Total Outstanding</div>
                <div className="text-lg font-bold">₹1,25,300</div>
              </div>
              <div className="p-3 rounded-xl border border-border">
                <div className="icon-bubble bg-warning-soft text-warning h-9 w-9 mb-2"><Receipt className="h-4 w-4" /></div>
                <div className="text-xs text-muted-foreground">Overdue Invoices</div>
                <div className="text-lg font-bold">12</div>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Plus, label: "Add Transaction", color: "blue" },
                { icon: FilePlus, label: "Create Invoice", color: "green" },
                { icon: Send, label: "Process Payout", color: "yellow" },
                { icon: RefreshCw, label: "Add Refund", color: "red" },
                { icon: FileBarChart, label: "Generate Report", color: "purple" },
                { icon: Calculator, label: "Manage Taxes", color: "blue" },
                { icon: Files, label: "View All Invoices", color: "green" },
                { icon: Upload, label: "Export Data", color: "purple" },
              ].map((a, i) => {
                const Icon = a.icon;
                const cls = {
                  blue: "bg-info-soft text-info",
                  green: "bg-success-soft text-success",
                  yellow: "bg-warning-soft text-warning",
                  red: "bg-destructive/10 text-destructive",
                  purple: "bg-brand-purple-soft text-brand-purple",
                };
                return (
                  <button key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:bg-muted/50">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${cls[a.color]}`}><Icon className="h-5 w-5" /></div>
                    <span className="text-xs text-center">{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
