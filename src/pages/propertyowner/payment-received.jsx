import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  CheckCircle, Search, Download, FileText, Mail, 
  Phone, IndianRupee, Layers
} from "lucide-react";

export default function PaymentReceivedPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");

  const transactions = [
    { id: "TXN-8451", tenant: "Amit Sharma", room: "101", date: "08 May 2026", amount: 8800, method: "UPI (PhonePe)", status: "Success" },
    { id: "TXN-8422", tenant: "Vijay Kumar", room: "101", date: "05 May 2026", amount: 8500, method: "Net Banking", status: "Success" },
    { id: "TXN-8390", tenant: "Sanjay Dutt", room: "103", date: "02 May 2026", amount: 7000, method: "Cash Payment", status: "Success" }
  ];

  const filteredTransactions = transactions.filter(t => 
    t.tenant.toLowerCase().includes(search.toLowerCase()) ||
    t.room.includes(search) ||
    t.id.includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Payment Log" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Received Payments</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Historical ledger audits of tenant payments, receipts, and deposit confirmations.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payments by Tenant, Room, or Transaction Reference..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Txn Reference</th>
                <th className="px-6 py-3.5 font-semibold">Tenant Name</th>
                <th className="px-6 py-3.5 font-semibold">Room</th>
                <th className="px-6 py-3.5 font-semibold">Received Date</th>
                <th className="px-6 py-3.5 font-semibold">Payment Channel</th>
                <th className="px-6 py-3.5 font-semibold">Net Paid</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-foreground">{t.id}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{t.tenant}</td>
                  <td className="px-6 py-4 font-bold text-foreground">Room {t.room}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t.date}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t.method}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">₹{t.amount.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors" title="Download Receipt PDF">
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
