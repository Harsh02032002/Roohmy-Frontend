import { PageHeader } from "../../components/dashboard/PageHeader";
import { FileBarChart, Download, Calendar, IndianRupee, Database, Send, RotateCcw, Receipt, Calculator } from "lucide-react";

const reports = [
  { name: "Revenue Report", desc: "Detailed revenue breakdown", icon: IndianRupee, color: "blue" },
  { name: "Commission Report", desc: "Commission earnings overview", icon: Database, color: "green" },
  { name: "Payouts Report", desc: "Payouts to property owners", icon: Send, color: "yellow" },
  { name: "Refunds Report", desc: "Processed refund history", icon: RotateCcw, color: "red" },
  { name: "Invoices Report", desc: "Invoice status summary", icon: Receipt, color: "purple" },
  { name: "Tax Report", desc: "Tax collection details", icon: Calculator, color: "blue" },
  { name: "P&L Statement", desc: "Profit and loss overview", icon: FileBarChart, color: "green" },
  { name: "Balance Sheet", desc: "Assets and liabilities snapshot", icon: FileBarChart, color: "purple" },
];

const generated = [
  { name: "May 2025 Revenue Report", date: "26 May 2025", size: "2.4 MB", format: "PDF" },
  { name: "Q1 2025 P&L Statement", date: "31 Mar 2025", size: "1.8 MB", format: "Excel" },
  { name: "April 2025 Tax Report", date: "01 May 2025", size: "1.2 MB", format: "PDF" },
  { name: "April 2025 Commission Report", date: "01 May 2025", size: "856 KB", format: "Excel" },
];

const colorMap = {
  blue: "bg-info-soft text-info",
  green: "bg-success-soft text-success",
  yellow: "bg-warning-soft text-warning",
  purple: "bg-brand-purple-soft text-brand-purple",
  red: "bg-destructive/10 text-destructive",
};

export default function AccountingReports() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader title="Accounting Reports" subtitle="Generate and download financial reports." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.name} className="panel">
              <div className="flex items-start gap-3">
                <div className={`icon-bubble h-12 w-12 ${colorMap[r.color]}`}><Icon className="h-6 w-6" /></div>
                <div className="flex-1">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 h-10 rounded-lg border border-border text-sm font-medium hover:bg-muted flex items-center justify-center gap-1"><Calendar className="h-4 w-4" /> Schedule</button>
                <button className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 flex items-center justify-center gap-1"><Download className="h-4 w-4" /> Generate</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <h3 className="font-semibold mb-4">Recently Generated</h3>
        <div className="divide-y divide-border">
          {generated.map((g, i) => (
            <div key={i} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
              <div className="icon-bubble h-10 w-10 bg-info-soft text-info"><FileBarChart className="h-5 w-5" /></div>
              <div className="flex-1">
                <div className="font-medium text-sm">{g.name}</div>
                <div className="text-xs text-muted-foreground">{g.date} • {g.size} • {g.format}</div>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted text-primary"><Download className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
