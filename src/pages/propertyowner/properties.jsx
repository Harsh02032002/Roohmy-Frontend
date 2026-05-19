import React, { useEffect, useState } from "react";
import { fetchJson } from "../../utils/api";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { requireOwnerSession } from "../../utils/ownerSession";
import {
  Plus, MapPin, BedDouble, IndianRupee, ArrowRight, Search
} from "lucide-react";

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

export default function Properties() {
  const [owner, setOwner] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const session = requireOwnerSession();
    if (!session) return;
    setOwner(session);
    const load = async () => {
      try {
        const data = await fetchJson(`/api/owners/${session.loginId}/properties`);
        setProperties(data?.properties || []);
      } catch (err) {
        setErrorMsg(err?.body || err?.message || "Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filters = ["All", "PG", "Hostel", "Flat"];
  const filtered = properties.filter(p => {
    const matchFilter = filter === "All" || (p.type || "").toLowerCase() === filter.toLowerCase();
    const matchSearch = !search || (p.title || p.name || "").toLowerCase().includes(search.toLowerCase()) || (p.city || "").toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <PropertyOwnerLayout owner={owner} title="Properties" onLogout={() => { window.location.href = "/propertyowner/ownerlogin"; }}>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Your properties</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Manage all your PGs, hostels and flats from one place.</p>
        </div>
        <div className="flex items-center gap-2 md:mt-2">
          <a href="/propertyowner/add-property" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity">
            <Plus className="size-4" /> Add property
          </a>
        </div>
      </div>

      {errorMsg && <div className="text-sm text-destructive mb-4 bg-destructive/10 px-4 py-3 rounded-lg">{errorMsg}</div>}

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or city…"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-card border border-border text-[13.5px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          {filters.map((f, i) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                "h-10 px-3.5 rounded-lg text-[12.5px] font-medium border transition-colors",
                filter === f ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:border-primary/40 text-muted-foreground"
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft animate-pulse">
              <div className="h-40 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded w-2/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-2 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 shadow-soft flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-muted/60 rounded-full flex items-center justify-center mb-4">
            <BedDouble className="size-8 text-muted-foreground" />
          </div>
          <h3 className="font-serif text-[22px] text-foreground mb-1">No properties found</h3>
          <p className="text-[13.5px] text-muted-foreground mb-4">Add your first property to get started.</p>
          <a href="/propertyowner/add-property" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90">
            <Plus className="size-4" /> Add property
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const occupied = p.occupiedBeds ?? p.tenantCount ?? 0;
            const total = p.totalBeds ?? p.roomCount ?? 1;
            const occ = Math.round((occupied / Math.max(total, 1)) * 100);
            return (
              <div
                key={p._id}
                className="group rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-card hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden bg-muted">
                  {p.image ? (
                    <img src={p.image} alt={p.title || p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted">
                      <BedDouble className="size-10 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Pill tone="primary">{p.type || "PG"}</Pill>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Pill tone={occ > 90 ? "success" : occ > 70 ? "warning" : "info"}>{occ}% full</Pill>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-[21px] leading-tight text-foreground">{p.title || p.name || "Property"}</h3>
                  <div className="text-[12.5px] text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="size-3.5 shrink-0" /> {p.city || p.area || "—"}
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${occ}%` }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[12.5px]">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <BedDouble className="size-3.5" /> {occupied}/{total} beds
                    </div>
                    <div className="flex items-center gap-0.5 font-medium text-foreground">
                      <IndianRupee className="size-3.5" /> {p.monthlyRevenue ? ((p.monthlyRevenue / 1000).toFixed(0) + "k") : (p.rent || "—")}/mo
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground">{p.address || p.locationCode || "—"}</span>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="mt-5 text-[12.5px] text-muted-foreground">
          Total: <span className="font-medium text-foreground">{filtered.length} properties</span>
        </div>
      )}
    </PropertyOwnerLayout>
  );
}
