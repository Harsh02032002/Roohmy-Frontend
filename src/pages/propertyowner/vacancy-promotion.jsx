import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Megaphone, Search, ToggleLeft, ToggleRight, 
  CheckCircle2, AlertCircle, Share2
} from "lucide-react";

export default function VacancyPromotionPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [promotions, setPromotions] = useState([
    { id: 1, room: "101", bedType: "Single Sharing", price: 12000, active: true },
    { id: 2, room: "105", bedType: "Double Sharing", price: 8500, active: false }
  ]);

  const handleToggle = (id) => {
    setPromotions(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const filtered = promotions.filter(p => 
    p.room.includes(search) || 
    p.bedType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Vacancy Listings Promotion" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Vacancy Promotion</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">List vacant beds on Roomhy consumer search engine, Facebook marketplace, and magicbricks listings instantly.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rooms/sharing classes..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Megaphone size={20} />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                  p.active 
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                    : "bg-slate-100 text-slate-500 border-slate-200"
                }`}>
                  {p.active ? "Promoted Live" : "Inactive"}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">Room {p.room}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">{p.bedType}</p>
                <h4 className="text-[20px] font-bold text-slate-800 mt-2">₹{p.price.toLocaleString("en-IN")}<span className="text-xs font-normal text-muted-foreground">/month</span></h4>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex justify-between items-center text-xs">
              <span className="text-muted-foreground font-semibold">Enable Portal Listing:</span>
              <button onClick={() => handleToggle(p.id)}>
                {p.active ? (
                  <ToggleRight size={38} className="text-emerald-600 animate-pulse" />
                ) : (
                  <ToggleLeft size={38} className="text-slate-300" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
