import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Tag, Search, Plus, Trash2, Edit3, 
  CheckCircle2, AlertCircle, Percent
} from "lucide-react";

export default function CouponsOffersPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [coupons, setCoupons] = useState([
    { id: 1, code: "WELCOME1000", discount: "Flat ₹1000 Off", usage: "12 Times used", validity: "Valid till 30 June 2026", status: "Active" },
    { id: 2, code: " monsoon5", discount: "5% Off rent", usage: "3 Times used", validity: "Valid till 15 July 2026", status: "Active" }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [codeVal, setCodeVal] = useState("");
  const [discountVal, setDiscountVal] = useState("");
  const [validityVal, setValidityVal] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!codeVal || !discountVal) return;
    const newCoupon = {
      id: coupons.length + 1,
      code: codeVal.toUpperCase().replace(/\s+/g, ""),
      discount: discountVal,
      usage: "0 Times used",
      validity: validityVal || "Unlimited validity",
      status: "Active"
    };
    setCoupons([newCoupon, ...coupons]);
    setCodeVal("");
    setDiscountVal("");
    setValidityVal("");
    setShowAddModal(false);
  };

  const handleDeactivate = (id) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, status: "Deactivated" } : c));
  };

  const filtered = coupons.filter(c => 
    c.code.toLowerCase().includes(search.toLowerCase()) || 
    c.discount.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Coupons &amp; Booking offers" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Coupons &amp; Offers</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Create booking discounts promotional codes, referral reward coupons, or seasonal cashbacks.</p>
        </div>
        <div className="flex items-center gap-2 md:mt-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-slate-900 text-white text-[13px] font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="size-4" /> Create Coupon code
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coupon codes or discount descriptions..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of Coupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Tag size={20} />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                  c.status === "Active" 
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                    : "bg-slate-100 text-slate-500 border-slate-200"
                }`}>
                  {c.status}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block mb-1">Coupon Promo Code</span>
                <h3 className="font-serif text-[24px] font-black text-slate-900 uppercase tracking-tight">{c.code}</h3>
                <p className="text-[13px] text-slate-700 mt-2 font-bold">{c.discount}</p>
                <p className="text-[11.5px] text-muted-foreground mt-0.5">{c.usage}</p>
              </div>

              <div className="border-t border-border/60 pt-4 flex justify-between items-center text-xs text-muted-foreground">
                <span>Validity Limits:</span>
                <span className="font-bold text-slate-800">{c.validity}</span>
              </div>
            </div>

            {c.status === "Active" && (
              <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
                <button 
                  onClick={() => handleDeactivate(c.id)}
                  className="flex-1 h-10 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-bold transition-all"
                >
                  Deactivate Coupon
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-serif text-[22px] text-foreground mb-4">Create Promo Code</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Coupon Code</label>
                <input 
                  type="text" 
                  value={codeVal} 
                  onChange={(e) => setCodeVal(e.target.value)}
                  placeholder="e.g. WELCOME1000"
                  className="w-full h-10 px-3 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Discount Details</label>
                <input 
                  type="text" 
                  value={discountVal} 
                  onChange={(e) => setDiscountVal(e.target.value)}
                  placeholder="e.g. Flat ₹1000 Off"
                  className="w-full h-10 px-3 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Validity Limit</label>
                <input 
                  type="text" 
                  value={validityVal} 
                  onChange={(e) => setValidityVal(e.target.value)}
                  placeholder="e.g. Valid till 30 June 2026"
                  className="w-full h-10 px-3 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 h-10 rounded-xl border border-border text-xs font-bold hover:bg-muted"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PropertyOwnerLayout>
  );
}
