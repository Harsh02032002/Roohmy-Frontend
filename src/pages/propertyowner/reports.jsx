import React from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  FileText, Search, Download, Calendar, 
  BarChart2, ArrowRight
} from "lucide-react";

export default function ReportsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const reports = [
    { title: "Monthly Rent Collection Report", desc: "Detailed breakdown of collected versus outstanding rents for May 2026.", type: "PDF / CSV" },
    { title: "Annual Profit & Loss Summary", desc: "Consolidated statement of fiscal earnings and capital outflows.", type: "PDF" },
    { title: "Vendor Invoicing Audit", desc: "Audit reports containing vendor payout references and pending claims.", type: "CSV" },
    { title: "Tax & GST Quarterly Filing Copy", desc: "Filed GSTR-1 and GSTR-3B copy receipts for Q4 FY 25-26.", type: "PDF" }
  ];

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Accounting Audits" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Financial Reports</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Download audits, cash-flow ledger logs, tax file records, and tenant receipts summaries.</p>
        </div>
      </div>

      {/* Grid of Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((r, idx) => (
          <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {r.type}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[20px] font-bold text-foreground">{r.title}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-1 leading-relaxed">{r.desc}</p>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
              <button className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5">
                Download Report <Download size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
