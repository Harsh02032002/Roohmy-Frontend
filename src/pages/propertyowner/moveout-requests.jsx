import React, { useState, useEffect } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { ownerApi, apiFetch } from "../../services/api";
import { 
  LogOut, Search, ShieldAlert, Phone, IndianRupee, 
  Trash2, CheckCircle2, AlertTriangle, FileText
} from "lucide-react";

export default function MoveoutRequestsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Settlement Modal State
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [duesAtMoveout, setDuesAtMoveout] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const [refundStatus, setRefundStatus] = useState("cleared");
  const [submitting, setSubmitting] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await ownerApi.getOwnerTenants(owner.loginId);
      if (data?.tenants) {
        // Filter tenants where moveoutRequest status is pending
        const pendingExits = data.tenants.filter(
          t => t.moveoutRequest && t.moveoutRequest.status === "pending"
        );
        setRequests(pendingExits);
      }
    } catch (err) {
      console.error("Error fetching moveout requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [owner.loginId]);

  const handleOpenSettle = async (item) => {
    setSelectedRequest(item);
    const depositPaid = item.securityDepositPaid || 0;
    setDuesAtMoveout(0);
    setRefundAmount(depositPaid);
    setRefundStatus("cleared");
    setShowSettleModal(true);

    try {
      const res = await apiFetch(`/api/tenants/ledger/${encodeURIComponent(item.loginId)}`);
      if (res?.success) {
        const bal = res.finalBalance || 0;
        setDuesAtMoveout(bal);
        setRefundAmount(depositPaid - bal > 0 ? depositPaid - bal : 0);
      }
    } catch (err) {
      console.error("Error fetching ledger for exit:", err);
    }
  };

  const handleCheckoutTenant = async (e) => {
    e.preventDefault();
    if (!selectedRequest || submitting) return;

    try {
      setSubmitting(true);
      await apiFetch("/api/tenants/moveout/approve", {
        method: "POST",
        body: JSON.stringify({
          tenantId: selectedRequest._id,
          duesAtMoveout,
          refundAmount,
          refundStatus
        })
      });
      setShowSettleModal(false);
      setSelectedRequest(null);
      fetchRequests();
    } catch (err) {
      console.error("Error approving checkout:", err);
      alert(err.message || "Failed to approve checkout");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRejectExit = async (item) => {
    if (!window.confirm(`Are you sure you want to reject the move-out request for ${item.name}?`)) {
      return;
    }
    try {
      await apiFetch("/api/tenants/moveout/reject", {
        method: "POST",
        body: JSON.stringify({ tenantId: item._id })
      });
      fetchRequests();
    } catch (err) {
      console.error("Error rejecting exit:", err);
      alert(err.message || "Failed to reject move-out notice");
    }
  };

  const filteredRequests = requests.filter(r => 
    (r.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.roomNo || r.room?.number || "").includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Move-out Notices" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Move-out Notices</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Approve exit schedules, calculate deposit refunds, and clear outstanding balances.</p>
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

      {/* Requests Grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading exit requests...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border bg-card rounded-2xl text-muted-foreground">
          No pending move-out requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRequests.map((item) => (
            <div key={item._id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="size-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                    <LogOut size={20} />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200`}>
                    ID: {item.loginId}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-[21px] font-bold text-foreground">{item.name}</h3>
                  <p className="text-[12.5px] text-muted-foreground mt-1">
                    Room {item.roomNo || item.room?.number || "N/A"} • Exit Date: <strong className="text-foreground">
                      {item.moveoutRequest.requestedDate ? new Date(item.moveoutRequest.requestedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}
                    </strong>
                  </p>
                  <p className="text-[12.5px] text-muted-foreground mt-2 italic bg-muted/30 p-2.5 rounded-lg border border-border/40">
                    " {item.moveoutRequest.reason || "No reason specified" } "
                  </p>
                </div>

                <div className="border-t border-border/60 pt-4 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground font-medium block">Security Deposit Paid</span>
                    <strong className="text-[14px] text-foreground">₹{(item.securityDepositPaid || 0).toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-medium block">Phone</span>
                    <strong className="text-[13px] text-foreground">{item.phone}</strong>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
                <button 
                  onClick={() => handleOpenSettle(item)}
                  className="flex-1 h-11 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Clear Dues & Checkout
                </button>
                <button 
                  onClick={() => handleRejectExit(item)}
                  className="px-4 h-11 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  Reject Exit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settlement and Dues Approval Modal */}
      {showSettleModal && selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-serif text-[22px] text-foreground mb-1">Final Settlement</h3>
            <p className="text-xs text-muted-foreground mb-4">Settle dues and approve checkout for {selectedRequest.name}.</p>
            
            <form onSubmit={handleCheckoutTenant} className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Security Deposit Paid:</span>
                  <span className="font-bold text-slate-800">₹{(selectedRequest.securityDepositPaid || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Dues At Moveout (₹)</label>
                <input 
                  type="number" 
                  value={duesAtMoveout} 
                  onChange={(e) => {
                    const dues = Number(e.target.value) || 0;
                    setDuesAtMoveout(dues);
                    const dep = selectedRequest.securityDepositPaid || 0;
                    setRefundAmount(dep - dues > 0 ? dep - dues : 0);
                  }}
                  placeholder="0"
                  className="w-full h-10 px-3 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Refund Amount (₹)</label>
                <input 
                  type="number" 
                  value={refundAmount} 
                  onChange={(e) => setRefundAmount(Number(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full h-10 px-3 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Refund Status</label>
                <select 
                  value={refundStatus} 
                  onChange={(e) => setRefundStatus(e.target.value)}
                  className="w-full h-10 px-3 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="cleared">Cleared (Refund Handed Over)</option>
                  <option value="pending">Pending Settlement</option>
                  <option value="deductions_applied">Deductions Applied</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => { setShowSettleModal(false); setSelectedRequest(null); }}
                  className="flex-1 h-10 rounded-xl border border-border text-xs font-bold hover:bg-muted"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Approve Checkout"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PropertyOwnerLayout>
  );
}
