import React, { useEffect, useState } from "react";
import { fetchJson } from "../../utils/api";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import {
  Plus, Search, Filter, Phone, MoreHorizontal, ArrowUpDown, Download, Users, ExternalLink,
  User, CalendarClock, CheckCircle, AlertTriangle
} from "lucide-react";
import {
  clearOwnerRuntimeSession,
  fetchOwnerTenants,
  getOwnerRuntimeSession
} from "../../utils/propertyowner";

const Pill = ({ tone = "muted", children }) => {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success-foreground",
    warning: "bg-warning/20 text-foreground",
    info: "bg-info/15 text-foreground",
    danger: "bg-destructive/15 text-destructive",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11.5px] font-medium ${toneMap[tone] || toneMap.muted}`}>
      {children}
    </span>
  );
};

export default function Tenants() {
  const [owner, setOwner] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const session = getOwnerRuntimeSession();
    if (!session?.loginId) { window.location.href = "/propertyowner/ownerlogin"; return; }
    setOwner(session);
    const load = async () => {
      try {
        const data = await fetchOwnerTenants(session.loginId);
        setTenants(data || []);
      } catch (err) {
        setErrorMsg(err?.body || err?.message || "Failed to load tenants.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const counts = {
    all: tenants.length,
    active: tenants.filter(t => t.status === "active" || t.active).length,
    notice: tenants.filter(t => t.status === "notice" || t.status === "move-out").length,
    dues: tenants.filter(t => (t.dueAmount || t.dues || t.balance) > 0).length,
  };

  const filtered = tenants.filter(t => {
    const matchTab = tab === "all" || (tab === "active" && (t.status === "active" || t.active)) || (tab === "notice" && (t.status === "notice" || t.status === "move-out")) || (tab === "dues" && (t.dueAmount || t.dues || t.balance) > 0);
    const q = search.toLowerCase();
    const matchSearch = !search || (t.name || "").toLowerCase().includes(q) || (t.phone || "").includes(q) || (t.roomNo || "").toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const getInitial = (name) => (name || "T").charAt(0).toUpperCase();
  const getKycTone = (kyc) => kyc === "verified" ? "success" : kyc === "pending" ? "warning" : "muted";
  const getStatusTone = (status) => status === "active" ? "success" : status === "notice" ? "warning" : "muted";

  return (
    <PropertyOwnerLayout
      owner={owner}
      title="Tenants"
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Tenants</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Every person living in your property — their rent, KYC and history in one place.</p>
        </div>
        <div className="flex items-center gap-2 md:mt-2">
          <button className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border bg-card text-[13px] font-medium hover:border-primary/40 transition-colors">
            <Download className="size-3.5" /> Export
          </button>
          <a href="/propertyowner/tenantrec" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity">
            <Plus className="size-4" /> Add tenant
          </a>
        </div>
      </div>

      {errorMsg && <div className="text-sm text-destructive mb-4 bg-destructive/10 px-4 py-3 rounded-lg">{errorMsg}</div>}

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4 border-b border-border">
        {[
          { k: "all", label: "All", count: counts.all },
          { k: "active", label: "Active", count: counts.active },
          { k: "notice", label: "On notice", count: counts.notice },
          { k: "dues", label: "With dues", count: counts.dues },
        ].map((t, i) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={[
              "px-3 py-2 text-[13px] font-medium border-b-2 -mb-px transition-colors",
              tab === t.k ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            ].join(" ")}
          >
            {t.label} <span className="text-muted-foreground/70 ml-0.5">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, room…"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
        <button className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border bg-card text-[13px] font-medium hover:border-primary/40 transition-colors">
          <Filter className="size-3.5" /> Filters
        </button>
        <button className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border bg-card text-[13px] font-medium hover:border-primary/40 transition-colors">
          <ArrowUpDown className="size-3.5" /> Sort
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        {loading ? (
          <div className="p-8 flex flex-col items-center justify-center gap-3">
            {[1,2,3].map(i => <div key={i} className="w-full h-12 bg-muted rounded-lg animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 bg-muted/60 rounded-full flex items-center justify-center mb-3">
              <Users className="size-7 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-[20px] text-foreground mb-1">No tenants found</h3>
            <p className="text-[13px] text-muted-foreground">Add your first tenant to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                  <th className="px-4 py-3 font-semibold">Tenant</th>
                  <th className="px-4 py-3 font-semibold">Property · Room</th>
                  <th className="px-4 py-3 font-semibold">Rent</th>
                  <th className="px-4 py-3 font-semibold">Dues</th>
                  <th className="px-4 py-3 font-semibold">KYC</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((t) => (
                  <tr key={t._id || t.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-[14px] shrink-0">
                          {getInitial(t.name)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{t.name || "—"}</div>
                          <div className="text-[11.5px] text-muted-foreground flex items-center gap-1">
                            <Phone className="size-3" /> {t.phone || "—"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] text-foreground">
                        {t.propertyName || (t.property && typeof t.property === "object" ? t.property.title || t.property.name : t.property) || "—"}
                      </div>
                      <div className="text-[11.5px] text-muted-foreground">Room {t.roomNo || "—"} / Bed {t.bedNo || "—"}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">₹{(t.agreedRent || t.rent || 0).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3">
                      {(t.dueAmount || t.dues || t.balance) > 0
                        ? <span className="font-medium text-destructive">₹{((t.dueAmount || t.dues || t.balance) || 0).toLocaleString("en-IN")}</span>
                        : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <Pill tone={getKycTone(t.kycStatus || t.kyc)}>{t.kycStatus || t.kyc || "pending"}</Pill>
                    </td>
                    <td className="px-4 py-3">
                      <Pill tone={getStatusTone(t.status)}>{t.status || "active"}</Pill>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => { setSelectedTenant(t); setModalOpen(true); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between text-[12px] text-muted-foreground">
            <span>Showing {filtered.length} of {tenants.length}</span>
            <div className="flex gap-1">
              <button className="h-8 px-2.5 rounded-md border border-border hover:bg-muted transition-colors">Prev</button>
              <button className="h-8 px-2.5 rounded-md border border-border bg-muted">1</button>
              <button className="h-8 px-2.5 rounded-md border border-border hover:bg-muted transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Tenant Details Modal */}
      {modalOpen && selectedTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                  {getInitial(selectedTenant.name)}
                </div>
                <div>
                  <h2 className="text-[20px] font-semibold text-foreground">{selectedTenant.name || "—"}</h2>
                  <p className="text-[13px] text-muted-foreground mt-0.5">ID: {selectedTenant.loginId || "—"}</p>
                </div>
              </div>
              <button 
                onClick={() => { setModalOpen(false); setSelectedTenant(null); }}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Room & Rent Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-muted/10">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Room Details</span>
                  <div className="font-medium text-foreground">Room {selectedTenant.roomNo || selectedTenant.room?.number || "N/A"}</div>
                  {selectedTenant.bedNo && <div className="text-[13px] text-muted-foreground">Bed: {selectedTenant.bedNo}</div>}
                  {selectedTenant.building && <div className="text-[13px] text-muted-foreground">Building: {selectedTenant.building}</div>}
                </div>
                <div className="p-4 rounded-xl border border-border bg-emerald-50/50">
                  <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block mb-1">Rent Information</span>
                  <div className="font-bold text-emerald-700 text-[18px]">₹{selectedTenant.agreedRent || selectedTenant.rent || 0} <span className="text-[13px] font-normal text-emerald-600/70">/ month</span></div>
                  <div className="text-[13px] text-emerald-600 mt-1">Due: {selectedTenant.paymentFrequency || "Monthly"}</div>
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <h3 className="text-[14px] font-semibold text-foreground mb-3 flex items-center gap-2">
                  <User size={16} className="text-primary" /> Personal Information
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 p-4 rounded-xl border border-border">
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Phone Number</div>
                    <div className="text-[13px] font-medium text-foreground">{selectedTenant.phone || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Email Address</div>
                    <div className="text-[13px] font-medium text-foreground">{selectedTenant.email || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Date of Birth</div>
                    <div className="text-[13px] font-medium text-foreground">{selectedTenant.dob || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Gender</div>
                    <div className="text-[13px] font-medium text-foreground capitalize">{selectedTenant.gender || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Guardian Number</div>
                    <div className="text-[13px] font-medium text-foreground">{selectedTenant.guardianNumber || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground mb-0.5">Occupation</div>
                    <div className="text-[13px] font-medium text-foreground">{selectedTenant.occupation || "N/A"}</div>
                  </div>
                </div>
              </div>

              {/* Status & Dates */}
              <div>
                <h3 className="text-[14px] font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CalendarClock size={16} className="text-primary" /> Timeline & Status
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-border flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-muted-foreground mb-0.5">Move-in Date</div>
                      <div className="text-[13px] font-medium text-foreground">
                        {selectedTenant.moveInDate ? new Date(selectedTenant.moveInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : "Not specified"}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-border flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-muted-foreground mb-0.5">Agreement Signed</div>
                      <div className="text-[13px] font-medium text-foreground">
                        {selectedTenant.agreementSigned ? (
                           <span className="flex items-center gap-1.5 text-emerald-600"><CheckCircle size={14}/> Yes ({new Date(selectedTenant.agreementSignedAt).toLocaleDateString('en-IN')})</span>
                        ) : (
                           <span className="flex items-center gap-1.5 text-rose-600"><AlertTriangle size={14}/> Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-end">
              <button 
                onClick={() => { setModalOpen(false); setSelectedTenant(null); }}
                className="px-6 py-2 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </PropertyOwnerLayout>
  );
}
