import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2, CheckCircle2, Clock, XCircle, AlertCircle,
  Search, Filter, Download, ChevronLeft, ChevronRight,
  MapPin, Phone, Home, Layers, Users, MoreVertical,
  RefreshCw, Image as ImageIcon, Plus, Eye, Pencil, SlidersHorizontal, X
} from "lucide-react";
import { getApiBase } from "../../utils/api";

const cn = (...c) => c.filter(Boolean).join(" ");

const STATUS_COLORS = {
  Published: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending:   "bg-amber-50 text-amber-700 border border-amber-200",
  Inactive:  "bg-slate-100 text-slate-500 border border-slate-200",
  Rejected:  "bg-rose-50 text-rose-700 border border-rose-200",
};

const TYPE_MAP = { pg:"PG", hostel:"Hostel", "co-living":"Co-Living", apartment:"Apartment", room:"Room" };
const GENDER_MAP = { male:"Boys", female:"Girls", any:"Unisex" };
const GENDER_COLOR = { male:"bg-blue-50 text-blue-600", female:"bg-pink-50 text-pink-600", any:"bg-purple-50 text-purple-600" };

function Avatar({ name="" }) {
  const i = name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()||"?";
  const bg = ["bg-blue-500","bg-purple-500","bg-emerald-500","bg-rose-500","bg-amber-500","bg-cyan-500"][(name.charCodeAt(0)||0)%6];
  return <div className={`w-8 h-8 rounded-full ${bg} text-white flex items-center justify-center text-[10px] font-bold shrink-0`}>{i}</div>;
}

function Stat({ icon:Icon, label, value, color, pct }) {
  const cfg = { blue:"bg-blue-50 text-blue-600", green:"bg-emerald-50 text-emerald-600", amber:"bg-amber-50 text-amber-600", slate:"bg-slate-100 text-slate-500", rose:"bg-rose-50 text-rose-600" };
  return (
    <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
      <div className={`w-11 h-11 rounded-xl ${cfg[color]} flex items-center justify-center shrink-0`}><Icon className="w-5 h-5"/></div>
      <div>
        <p className="text-xl font-black text-slate-800 leading-none">{value}</p>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mt-0.5">{label}</p>
        {pct && <p className="text-[9px] text-slate-400 mt-0.5">{pct} of total</p>}
      </div>
    </div>
  );
}

function Sel({ value, onChange, children, placeholder }) {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}
      className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 outline-none focus:border-blue-400 cursor-pointer hover:border-slate-300 transition-all">
      <option value="all">{placeholder}</option>
      {children}
    </select>
  );
}

const LIMIT = 10;

export default function TotalProperties() {
  const navigate = useNavigate();
  const apiUrl = getApiBase();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // filters
  const [search, setSearch]         = useState("");
  const [fStatus, setFStatus]       = useState("all");
  const [fType, setFType]           = useState("all");
  const [fCity, setFCity]           = useState("all");
  const [fLocation, setFLocation]   = useState("all");
  const [fOwner, setFOwner]         = useState("all");
  const [showMore, setShowMore]     = useState(false);
  const [fGender, setFGender]       = useState("all");
  const [fPriceMin, setFPriceMin]   = useState("");
  const [fPriceMax, setFPriceMax]   = useState("");

  const [apiStats, setApiStats] = useState({ published: 0, pending: 0, inactive: 0, rejected: 0 });

  const fetchProps = async (pNum=1) => {
    setLoading(true);
    try {
      const res  = await fetch(`${apiUrl}/api/properties?page=${pNum}&limit=${LIMIT}&t=${Date.now()}`);
      const data = await res.json();
      if (data.success && data.properties) {
        setProperties(data.properties.map(p => ({
          id:         p._id,
          propId:     p.visitId || p.locationCode || `PROP-${p._id?.slice(-4).toUpperCase()}`,
          title:      p.title || p.propertyInfo?.name || "Unnamed",
          image:      p.featuredImage || p.images?.[0] || "",
          type:       p.propertyType || p.propertyInfo?.propertyType || "pg",
          gender:     p.gender || p.propertyInfo?.genderSuitability || "any",
          city:       p.propertyInfo?.city || p.city || "-",
          locality:   p.locality || p.propertyInfo?.area || "-",
          ownerName:  p.owner?.name || p.propertyInfo?.ownerName || p.ownerName || "-",
          ownerPhone: p.owner?.phone || p.propertyInfo?.ownerPhone || p.ownerPhone || "-",
          price:      p.monthlyRent || p.rent || p.propertyInfo?.rent || 0,
          status:     p.isLiveOnWebsite ? "Published" : p.status==="active" ? "Published" : p.status==="blocked" ? "Rejected" : p.status==="inactive" ? "Inactive" : "Pending",
          listedOn:   p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-IN",{month:"short",day:"numeric",year:"numeric"}) : "-",
          listedTime: p.createdAt ? new Date(p.createdAt).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}) : "",
        })));
        setTotalPages(data.totalPages||1);
        setTotalRecords(data.total||0);
        if (data.stats) setApiStats(data.stats);
        setPage(pNum);
      }
    } catch(e){ console.error(e); } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchProps(1); },[]);

  // derive unique values for dropdowns
  const cities    = useMemo(()=>[...new Set(properties.map(p=>p.city).filter(c=>c&&c!=="-"))],[properties]);
  const locations = useMemo(()=>[...new Set(properties.filter(p=>fCity==="all"||p.city===fCity).map(p=>p.locality).filter(l=>l&&l!=="-"))],[properties,fCity]);
  const owners    = useMemo(()=>[...new Set(properties.map(p=>p.ownerName).filter(o=>o&&o!=="-"))],[properties]);

  const filtered = useMemo(()=>properties.filter(p=>{
    const s = search.toLowerCase();
    if(s && !p.title.toLowerCase().includes(s) && !p.ownerName.toLowerCase().includes(s) && !p.propId.toLowerCase().includes(s) && !p.city.toLowerCase().includes(s)) return false;
    if(fStatus!=="all"   && p.status!==fStatus)     return false;
    if(fType!=="all"     && p.type!==fType)          return false;
    if(fCity!=="all"     && p.city!==fCity)          return false;
    if(fLocation!=="all" && p.locality!==fLocation)  return false;
    if(fOwner!=="all"    && p.ownerName!==fOwner)    return false;
    if(fGender!=="all"   && p.gender!==fGender)      return false;
    if(fPriceMin && p.price < Number(fPriceMin))     return false;
    if(fPriceMax && p.price > Number(fPriceMax))     return false;
    return true;
  }),[properties,search,fStatus,fType,fCity,fLocation,fOwner,fGender,fPriceMin,fPriceMax]);

  const resetAll = () => { setSearch(""); setFStatus("all"); setFType("all"); setFCity("all"); setFLocation("all"); setFOwner("all"); setFGender("all"); setFPriceMin(""); setFPriceMax(""); };

  const stats = useMemo(()=>({
    total:     totalRecords,
    published: apiStats.published,
    pending:   apiStats.pending,
    inactive:  apiStats.inactive,
    rejected:  apiStats.rejected,
  }),[apiStats,totalRecords]);

  const pct = (n) => stats.total ? `${((n/stats.total)*100).toFixed(1)}%` : null;

  return (
    <div className="p-6 space-y-5 bg-white min-h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 leading-none">Total Properties</h1>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-1.5">Manage and view all properties listed on the platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>fetchProps(page)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 shadow-sm transition-all">
            <RefreshCw className="w-3.5 h-3.5"/> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-3.5 h-3.5"/> Export
          </button>
          <button onClick={()=>setShowMore(v=>!v)} className={cn("flex items-center gap-2 px-4 py-2.5 border rounded-xl text-xs font-bold shadow-sm transition-all", showMore?"bg-blue-600 text-white border-blue-600":"bg-white border-slate-200 text-slate-600 hover:bg-slate-50")}>
            <SlidersHorizontal className="w-3.5 h-3.5"/> More Filters
          </button>
          <button onClick={()=>navigate("/superadmin/add-property")} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
            <Plus className="w-3.5 h-3.5"/> Add Property
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <Stat icon={Building2}    label="Total Properties"  value={stats.total.toLocaleString()}     color="blue"  />
        <Stat icon={CheckCircle2} label="Published"         value={stats.published.toLocaleString()} color="green" pct={pct(stats.published)} />
        <Stat icon={Clock}        label="Pending Approval"  value={stats.pending.toLocaleString()}   color="amber" pct={pct(stats.pending)} />
        <Stat icon={XCircle}      label="Inactive"          value={stats.inactive.toLocaleString()}  color="slate" pct={pct(stats.inactive)} />
        <Stat icon={AlertCircle}  label="Rejected"          value={stats.rejected.toLocaleString()}  color="rose"  pct={pct(stats.rejected)} />
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Main Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5 p-4 border-b border-slate-100">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by property name..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"/>
            {search && <button onClick={()=>setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"><X className="w-3.5 h-3.5"/></button>}
          </div>

          <Sel value={fStatus} onChange={setFStatus} placeholder="All Status">
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
            <option value="Rejected">Rejected</option>
          </Sel>

          <Sel value={fType} onChange={setFType} placeholder="All Type">
            <option value="pg">PG</option>
            <option value="hostel">Hostel</option>
            <option value="co-living">Co-Living</option>
            <option value="apartment">Apartment</option>
            <option value="room">Room</option>
          </Sel>

          <Sel value={fCity} onChange={v=>{setFCity(v); setFLocation("all");}} placeholder="All City">
            {cities.map(c=><option key={c} value={c}>{c}</option>)}
          </Sel>

          <Sel value={fLocation} onChange={setFLocation} placeholder="All Location">
            {locations.map(l=><option key={l} value={l}>{l}</option>)}
          </Sel>

          <Sel value={fOwner} onChange={setFOwner} placeholder="All Owner">
            {owners.map(o=><option key={o} value={o}>{o}</option>)}
          </Sel>

          {(search||fStatus!=="all"||fType!=="all"||fCity!=="all"||fLocation!=="all"||fOwner!=="all"||fGender!=="all"||fPriceMin||fPriceMax) && (
            <button onClick={resetAll} className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold text-rose-500 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-all">
              <X className="w-3 h-3"/> Reset
            </button>
          )}
        </div>

        {/* More Filters Panel */}
        {showMore && (
          <div className="flex flex-wrap items-end gap-4 px-4 py-3 bg-slate-50 border-b border-slate-100">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Gender</p>
              <Sel value={fGender} onChange={setFGender} placeholder="All Gender">
                <option value="male">Boys</option>
                <option value="female">Girls</option>
                <option value="any">Unisex</option>
              </Sel>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Min Price (₹)</p>
              <input type="number" value={fPriceMin} onChange={e=>setFPriceMin(e.target.value)} placeholder="0"
                className="w-32 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-400 transition-all"/>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Max Price (₹)</p>
              <input type="number" value={fPriceMax} onChange={e=>setFPriceMax(e.target.value)} placeholder="Any"
                className="w-32 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-400 transition-all"/>
            </div>
            <p className="text-[10px] text-slate-400 font-medium self-center">
              Showing <span className="font-bold text-slate-700">{filtered.length}</span> of {totalRecords} properties
            </p>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500"/>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Properties...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Building2 className="w-12 h-12 text-slate-200"/>
            <p className="text-sm font-bold text-slate-400">No properties found</p>
            <button onClick={resetAll} className="text-xs text-blue-500 font-bold hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3.5 w-10"><input type="checkbox" className="rounded border-slate-300 cursor-pointer"/></th>
                  <th className="text-left px-4 py-3.5">Property Details</th>
                  <th className="text-left px-4 py-3.5">Owner</th>
                  <th className="text-left px-4 py-3.5">Type</th>
                  <th className="text-left px-4 py-3.5">Location</th>
                  <th className="text-left px-4 py-3.5">Price</th>
                  <th className="text-left px-4 py-3.5">Status</th>
                  <th className="text-left px-4 py-3.5">Listed On</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(p => (
                  <tr key={p.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4"><input type="checkbox" className="rounded border-slate-300 cursor-pointer"/></td>

                    {/* Property */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-11 rounded-lg overflow-hidden border border-slate-100 bg-slate-100 shrink-0">
                          {p.image ? <img src={p.image} className="w-full h-full object-cover" alt=""/> : <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon className="w-4 h-4"/></div>}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-slate-800 truncate max-w-[180px]">{p.title}</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">ID: {p.propId}</p>
                          <div className="flex gap-1 mt-1.5 flex-wrap">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600">{TYPE_MAP[p.type]||p.type}</span>
                            {p.gender!=="any" && <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-md", GENDER_COLOR[p.gender]||"")}>{GENDER_MAP[p.gender]||p.gender}</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={p.ownerName}/>
                        <div className="min-w-0">
                          <p className="text-[12px] font-bold text-slate-800 truncate max-w-[110px]">{p.ownerName}</p>
                          {p.ownerPhone&&p.ownerPhone!=="-" && <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><Phone className="w-2.5 h-2.5"/>{p.ownerPhone}</p>}
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Building2 className="w-3.5 h-3.5 text-blue-500"/>
                        </div>
                        <span className="text-[12px] font-bold text-slate-700">{TYPE_MAP[p.type]||p.type}</span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400 mt-0.5 shrink-0"/>
                        <div>
                          {p.locality!=="-" && <p className="text-[12px] font-bold text-slate-700 leading-tight">{p.locality}</p>}
                          <p className="text-[11px] text-slate-500 font-medium">{p.city}</p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4">
                      <p className="text-[13px] font-black text-slate-800">{p.price ? `₹${Number(p.price).toLocaleString("en-IN")} / bed` : "—"}</p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-lg", STATUS_COLORS[p.status]||"bg-slate-100 text-slate-500")}>{p.status}</span>
                    </td>

                    {/* Listed On */}
                    <td className="px-4 py-4">
                      <p className="text-[11px] font-bold text-slate-700 whitespace-nowrap">{p.listedOn}</p>
                      {p.listedTime && <p className="text-[9px] text-slate-400 mt-0.5">{p.listedTime}</p>}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="View"><Eye className="w-3.5 h-3.5"/></button>
                        <button onClick={()=>navigate(`/superadmin/properties?view=add&editId=${p.id}`)} className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Edit"><Pencil className="w-3.5 h-3.5"/></button>
                        <button className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"><MoreVertical className="w-3.5 h-3.5"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-white">
          <p className="text-[11px] font-bold text-slate-400">
            Showing {filtered.length>0?((page-1)*LIMIT)+1:0} to {Math.min(page*LIMIT,totalRecords)} of{" "}
            <span className="text-slate-700">{totalRecords.toLocaleString()}</span> properties
          </p>
          <div className="flex items-center gap-1.5">
            <button disabled={page===1} onClick={()=>fetchProps(page-1)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronLeft className="w-3.5 h-3.5"/> Prev
            </button>
            {Array.from({length:Math.min(totalPages,7)},(_,i)=>{
              let n;
              if(totalPages<=7) n=i+1;
              else if(page<=4) n=i+1;
              else if(page>=totalPages-3) n=totalPages-6+i;
              else n=page-3+i;
              return (
                <button key={n} onClick={()=>fetchProps(n)}
                  className={cn("w-9 h-9 rounded-xl text-[11px] font-bold transition-all",
                    page===n?"bg-blue-600 text-white shadow-lg shadow-blue-200":"text-slate-500 hover:bg-slate-100 border border-slate-200")}>
                  {n}
                </button>
              );
            })}
            <button disabled={page===totalPages} onClick={()=>fetchProps(page+1)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              Next <ChevronRight className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
