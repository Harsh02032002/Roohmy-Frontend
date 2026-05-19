import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  ShieldCheck, Search, Download, Upload, FileText, 
  CheckCircle2, AlertTriangle, Clock, Eye
} from "lucide-react";

export default function PoliceVerificationPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [list, setList] = useState([
    { id: 1, name: "Amit Sharma", room: "101", formStatus: "Submitted to Station", date: "16 May 2026", receipt: "Uploaded" },
    { id: 2, name: "Vijay Kumar", room: "101", formStatus: "Submitted to Station", date: "15 May 2026", receipt: "Uploaded" },
    { id: 3, name: "Rajesh Gupta", room: "102", formStatus: "Pending Form Submission", date: "—", receipt: "Not Uploaded" },
    { id: 4, name: "Sanjay Dutt", room: "103", formStatus: "Receipt Pending Verification", date: "18 May 2026", receipt: "Awaiting Review" }
  ]);

  const filteredList = list.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.room.includes(search)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted to Station": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Receipt Pending Verification": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-rose-50 text-rose-600 border-rose-100";
    }
  };

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Police Verification Portal" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Police Verification</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Manage state police reporting forms, local authority submissions, and check-in receipts.</p>
        </div>
      </div>

      {/* Authority form downloads */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft mb-8">
        <h3 className="font-serif text-[20px] text-foreground mb-4">Authority Form Templates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { city: "Delhi NCR Police Form", size: "1.2 MB" },
            { city: "Karnataka / Bengaluru", size: "850 KB" },
            { city: "Maharashtra / Mumbai", size: "1.1 MB" },
            { city: "Haryana / Gurugram", size: "900 KB" }
          ].map((form, idx) => (
            <div key={idx} className="border border-border/80 rounded-xl p-4 flex justify-between items-center bg-muted/20">
              <div>
                <span className="text-[12px] font-bold text-foreground block">{form.city}</span>
                <span className="text-[11px] text-muted-foreground">{form.size} • PDF Format</span>
              </div>
              <button className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors">
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Tenant Name or Room..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Verification List Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Tenant Name</th>
                <th className="px-6 py-3.5 font-semibold">Room</th>
                <th className="px-6 py-3.5 font-semibold">Verification State</th>
                <th className="px-6 py-3.5 font-semibold">Submission Date</th>
                <th className="px-6 py-3.5 font-semibold">Receipt Uploaded</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">{item.name}</td>
                  <td className="px-6 py-4 font-bold text-foreground">Room {item.room}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusColor(item.formStatus)}`}>
                      {item.formStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.receipt}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors">
                      <Eye size={14} />
                    </button>
                    {item.receipt === "Not Uploaded" && (
                      <button className="size-8 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 inline-flex items-center justify-center transition-colors" title="Upload Receipt PDF">
                        <Upload size={14} />
                      </button>
                    )}
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
