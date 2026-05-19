import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  UserCheck, Search, FileText, CheckCircle2, XCircle, 
  Clock, ShieldCheck, Eye, Download, AlertTriangle
} from "lucide-react";

export default function KycVerificationPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [kycList, setKycList] = useState([
    { id: 1, name: "Amit Sharma", room: "101", docType: "Aadhaar Card", docNo: "XXXX-XXXX-8451", status: "Verified", updated: "15 May 2026" },
    { id: 2, name: "Vijay Kumar", room: "101", docType: "Aadhaar Card", docNo: "XXXX-XXXX-9122", status: "Verified", updated: "12 May 2026" },
    { id: 3, name: "Rajesh Gupta", room: "102", docType: "PAN Card", docNo: "XXXXX9102K", status: "Pending Verification", updated: "Today, 10:30 AM" },
    { id: 4, name: "Sanjay Dutt", room: "103", docType: "Aadhaar Card", docNo: "XXXX-XXXX-5521", status: "Action Required", updated: "18 May 2026" }
  ]);

  const handleApprove = (id) => {
    setKycList(prev => prev.map(k => k.id === id ? { ...k, status: "Verified" } : k));
  };

  const handleReject = (id) => {
    setKycList(prev => prev.map(k => k.id === id ? { ...k, status: "Action Required" } : k));
  };

  const filteredKyc = kycList.filter(k => 
    k.name.toLowerCase().includes(search.toLowerCase()) ||
    k.room.includes(search)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Verified": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Pending Verification": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-rose-50 text-rose-600 border-rose-100";
    }
  };

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="KYC Validation" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">KYC Validation</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Verify national identity cards, student IDs, or corporate enrollment documents.</p>
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

      {/* KYC Verification Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Tenant Name</th>
                <th className="px-6 py-3.5 font-semibold">Room</th>
                <th className="px-6 py-3.5 font-semibold">Document Type</th>
                <th className="px-6 py-3.5 font-semibold">Document Reference</th>
                <th className="px-6 py-3.5 font-semibold">Last Updated</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredKyc.map((k) => (
                <tr key={k.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">{k.name}</td>
                  <td className="px-6 py-4 font-bold text-foreground">Room {k.room}</td>
                  <td className="px-6 py-4 text-muted-foreground">{k.docType}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{k.docNo}</td>
                  <td className="px-6 py-4 text-muted-foreground">{k.updated}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusColor(k.status)}`}>
                      {k.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors" title="View Document File">
                      <Eye size={14} />
                    </button>
                    {k.status === "Pending Verification" && (
                      <>
                        <button 
                          onClick={() => handleApprove(k.id)}
                          className="size-8 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 inline-flex items-center justify-center transition-colors"
                          title="Approve KYC"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleReject(k.id)}
                          className="size-8 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 inline-flex items-center justify-center transition-colors"
                          title="Reject / Request Re-upload"
                        >
                          <XCircle size={14} />
                        </button>
                      </>
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
