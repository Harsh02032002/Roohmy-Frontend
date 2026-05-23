import React, { useState, useEffect } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { ownerApi } from "../../services/api";
import { 
  Users, Search, Clock, Archive, Phone, Mail, 
  FileText, ShieldCheck, Download
} from "lucide-react";

export default function ExTenantsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchExTenants = async () => {
      try {
        setLoading(true);
        const data = await ownerApi.getOwnerTenants(owner.loginId);
        if (active && data?.tenants) {
          const inactiveList = data.tenants.filter(t => t.status === "inactive");
          setTenants(inactiveList);
        }
      } catch (err) {
        console.error("Error fetching ex-tenants:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchExTenants();
    return () => { active = false; };
  }, [owner.loginId]);

  const filteredExTenants = tenants.filter(t => 
    (t.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (t.roomNo || t.room?.number || "").includes(search)
  );

  const calculateDuration = (moveIn, checkout) => {
    if (!moveIn) return "-";
    const start = new Date(moveIn);
    const end = checkout ? new Date(checkout) : new Date();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) return `${diffDays} Days`;
    const diffMonths = Math.round(diffDays / 30);
    return `${diffMonths} Month${diffMonths > 1 ? "s" : ""}`;
  };

  const getRefundStatusLabel = (status) => {
    if (status === "cleared") return "Fully Refunded";
    if (status === "deductions_applied") return "Deductions Applied";
    if (status === "pending") return "Pending Refund";
    return "Cleared";
  };

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Former Residents" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Former Residents</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Historical records, previous security deposit refunds, and ledger archives of checked-out tenants.</p>
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

      {/* Ex-Tenants Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading former residents...</div>
          ) : filteredExTenants.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No former residents found.</div>
          ) : (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                  <th className="px-6 py-3.5 font-semibold">Tenant Name</th>
                  <th className="px-6 py-3.5 font-semibold">Stayed Room</th>
                  <th className="px-6 py-3.5 font-semibold">Stay Duration</th>
                  <th className="px-6 py-3.5 font-semibold">Checkout Date</th>
                  <th className="px-6 py-3.5 font-semibold">Contact Details</th>
                  <th className="px-6 py-3.5 font-semibold">Security Clearance</th>
                  <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredExTenants.map((t) => {
                  const duration = calculateDuration(t.moveInDate, t.moveoutRequest?.requestedDate || t.updatedAt);
                  const checkoutDate = t.moveoutRequest?.requestedDate 
                    ? new Date(t.moveoutRequest.requestedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                    : new Date(t.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
                  const refundLabel = getRefundStatusLabel(t.moveoutRequest?.refundStatus);

                  return (
                    <tr key={t._id} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                            {(t.name || "T").charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">{t.name}</span>
                            <div className="text-[11px] text-muted-foreground">{t.loginId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-foreground">Room {t.roomNo || t.room?.number || "N/A"}</td>
                      <td className="px-6 py-4 text-muted-foreground">{duration}</td>
                      <td className="px-6 py-4 text-muted-foreground">{checkoutDate}</td>
                      <td className="px-6 py-4 space-y-0.5">
                        <div className="text-[12px] font-medium text-foreground flex items-center gap-1">
                          <Phone size={12} className="text-muted-foreground/60" /> {t.phone}
                        </div>
                        {t.email && (
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Mail size={12} className="text-muted-foreground/60" /> {t.email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          refundLabel === "Fully Refunded" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : refundLabel === "Pending Refund"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-slate-50 text-slate-600 border-slate-100"
                        }`}>
                          {refundLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => alert(`Tenant: ${t.name}\nLogin ID: ${t.loginId}\nRefund Dues: INR ${t.moveoutRequest?.duesAtMoveout || 0}\nRefund Amount Paid: INR ${t.moveoutRequest?.refundAmount || 0}`)}
                          className="size-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors"
                        >
                          <FileText size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
