import React, { useState, useEffect } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { ownerApi, apiFetch } from "../../services/api";
import { 
  FileCheck, Search, Download, CheckCircle2, 
  Eye, ShieldCheck, XCircle, ExternalLink
} from "lucide-react";
import { API_URL } from "../../services/api";

const getFileUrl = (url) => {
  if (!url) return "#";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return `${API_URL}${url}`;
  return `${API_URL}/${url}`;
};

export default function TenantDocsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const data = await ownerApi.getOwnerTenants(owner.loginId);
      if (data?.tenants) {
        // filter those who have uploaded some kyc information
        const withDocs = data.tenants.filter(t => t.kycStatus !== "pending" || t.kyc?.aadhaarNumber || t.kyc?.aadharFile);
        setTenants(withDocs);
      }
    } catch (err) {
      console.error("Error fetching tenant docs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [owner.loginId]);

  const handleVerify = async (tenantId) => {
    try {
      await apiFetch("/api/tenants/kyc/approve", {
        method: "POST",
        body: JSON.stringify({ tenantId })
      });
      fetchDocs();
    } catch (err) {
      alert("Error verifying document: " + err.message);
    }
  };

  const filtered = tenants.filter(d => 
    (d.name || "").toLowerCase().includes(search.toLowerCase()) || 
    (d.kyc?.idProof || "Aadhaar").toLowerCase().includes(search.toLowerCase())
  );

  const getStatusLabel = (status) => {
    if (status === "verified") return "Verified";
    if (status === "submitted") return "Pending Verification";
    if (status === "rejected") return "Rejected";
    return "Pending Upload";
  };

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Residents KYC Archives" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Tenant Documents</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Audit uploaded Aadhaar cards, PAN card scans, and police verification reports.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents by resident name..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of Docs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-muted-foreground">Loading documents...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full p-8 text-center text-muted-foreground">No tenant documents uploaded yet.</div>
        ) : (
          filtered.map((d) => {
            const hasAadhaarFront = !!d.kyc?.aadhaarFront;
            const hasAadhaarBack = !!d.kyc?.aadhaarBack;
            const hasAadharFile = !!d.kyc?.aadharFile;
            const hasPAN = !!d.kyc?.idProofFile;
            const hasAddressProof = !!d.kyc?.addressProofFile;
            
            return (
              <div key={d._id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                      <FileCheck size={20} />
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                      d.kycStatus === "verified" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {getStatusLabel(d.kycStatus)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-[21px] font-bold text-foreground">{d.name}</h3>
                    <p className="text-[12.5px] text-muted-foreground mt-0.5">
                      {d.kyc?.idProof || "Aadhaar Card"} • {d.kyc?.aadhaarNumber || d.kyc?.aadhar || "No Ref Number"}
                    </p>
                  </div>

                  {/* List of files with download/view links */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Uploaded Files:</span>
                    {hasAadhaarFront && (
                      <a href={getFileUrl(d.kyc.aadhaarFront)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-xs text-blue-600 hover:underline">
                        <span>Aadhaar Card Front</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {hasAadhaarBack && (
                      <a href={getFileUrl(d.kyc.aadhaarBack)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-xs text-blue-600 hover:underline">
                        <span>Aadhaar Card Back</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {hasAadharFile && (
                      <a href={getFileUrl(d.kyc.aadharFile)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-xs text-blue-600 hover:underline">
                        <span>Aadhaar PDF</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {hasPAN && (
                      <a href={getFileUrl(d.kyc.idProofFile)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-xs text-blue-600 hover:underline">
                        <span>PAN Card Scan</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {hasAddressProof && (
                      <a href={getFileUrl(d.kyc.addressProofFile)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-xs text-blue-600 hover:underline">
                        <span>Address Proof File</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {!hasAadhaarFront && !hasAadhaarBack && !hasAadharFile && !hasPAN && !hasAddressProof && (
                      <span className="text-xs text-muted-foreground italic">No document file URLs found.</span>
                    )}
                  </div>
                </div>

                {d.kycStatus === "submitted" && (
                  <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
                    <button 
                      onClick={() => handleVerify(d._id)}
                      className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      Approve KYC Document
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </PropertyOwnerLayout>
  );
}
