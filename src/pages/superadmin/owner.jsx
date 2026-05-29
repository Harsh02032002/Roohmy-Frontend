import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Building2, Users, Shield, Clock, Search, 
  ArrowUpRight, ArrowDownRight, MoreVertical, 
  Filter, Globe, MapPin, Zap, Sheet, Trash2, 
  ChevronRight, ChevronDown, Phone, Mail, User, RefreshCw,
  LayoutGrid, CreditCard, Wallet, Download, Loader2,
  ShieldCheck, Banknote, Map, X, CheckCircle2, AlertCircle,
  Calendar, Fingerprint, Landmark, CreditCard as CardIcon,
  Eye, FileText, UserPlus, FileCheck, ClipboardList,
  ShieldAlert, Sparkles, Send, Save, Lock, Star, Camera,
  Plus, Info, BedDouble, UtensilsCrossed, Check, PawPrint, Cigarette
} from "lucide-react";
import { fetchJson, getAuthHeader } from "../../utils/api";
import * as XLSX from 'xlsx';

// ─── Constants ────────────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { value: "hostel", label: "Hostel / PG", icon: Users },
  { value: "pg", label: "PG / Paying Guest", icon: User },
  { value: "apartment", label: "Apartment", icon: Building2 },
];
const GENDER_OPTIONS = ["Co-ed", "Male Only", "Female Only"];
const AMENITY_LIST = [
  "WiFi", "Power Backup", "24x7 Water", "RO Water", "Air Conditioning",
  "CCTV", "Security Guard", "Attached Bathroom", "Study Table", "Wardrobe",
  "Bed with Mattress", "Kitchen", "Refrigerator", "Geyser",
  "Parking", "Washing Machine", "Gym", "Housekeeping", "Food",
  "TV", "Lounge", "Balcony / Terrace", "Garden", "Lift"
];
const FURNISHING_OPTIONS = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Owner() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = searchParams.get("view") || "list";
  
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isUpdatingKyc, setIsUpdatingKyc] = useState(false);

  // Add Form State — Owner Identity
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formOwnerCity, setFormOwnerCity] = useState("");
  // Property Details
  const [formPropertyName, setFormPropertyName] = useState("");
  const [formPropertyType, setFormPropertyType] = useState("hostel");
  const [formGender, setFormGender] = useState("Co-ed");
  const [formRent, setFormRent] = useState("");
  const [formDeposit, setFormDeposit] = useState("");
  const [formDescription, setFormDescription] = useState("");
  // Location
  const [formArea, setFormArea] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formPincode, setFormPincode] = useState("");
  const [formLandmark, setFormLandmark] = useState("");
  // Occupancy
  const [formVacantRooms, setFormVacantRooms] = useState("");
  const [formOccupiedRooms, setFormOccupiedRooms] = useState("");
  const [formOccupiedBeds, setFormOccupiedBeds] = useState("");
  // Features
  const [formAmenities, setFormAmenities] = useState(new Set(["WiFi", "Power Backup"]));
  const [formFurnishing, setFormFurnishing] = useState("Fully Furnished");
  const [formVentilation, setFormVentilation] = useState("");
  const [formMinStay, setFormMinStay] = useState("");
  const [formEntryExit, setFormEntryExit] = useState("");
  // Policies
  const [formVisitorsAllowed, setFormVisitorsAllowed] = useState(true);
  const [formCookingAllowed, setFormCookingAllowed] = useState(false);
  const [formSmokingAllowed, setFormSmokingAllowed] = useState(false);
  const [formPetsAllowed, setFormPetsAllowed] = useState(false);
  // Ratings & Notes
  const [formCleanlinessRating, setFormCleanlinessRating] = useState(0);
  const [formOwnerBehaviour, setFormOwnerBehaviour] = useState("");
  const [formStudentReviews, setFormStudentReviews] = useState("");
  const [formInternalRemarks, setFormInternalRemarks] = useState("");
  // Photos
  const [formPhotoUrl, setFormPhotoUrl] = useState("");
  const [formPhotos, setFormPhotos] = useState([]);
  // Credentials
  const [formLoginId, setFormLoginId] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [saving, setSaving] = useState(false);
  // Section toggles
  const [openSections, setOpenSections] = useState({
    owner: true, property: true, location: true, occupancy: false,
    features: false, policies: false, ratings: false, photos: false
  });
  const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleAmenity = (a) => setFormAmenities(prev => { const n = new Set(prev); n.has(a) ? n.delete(a) : n.add(a); return n; });
  const addPhotoUrl = () => { if (formPhotoUrl.trim()) { setFormPhotos(prev => [...prev, formPhotoUrl.trim()]); setFormPhotoUrl(""); } };
  const removePhoto = (idx) => setFormPhotos(prev => prev.filter((_, i) => i !== idx));
  const resetForm = () => {
    setFormName(""); setFormEmail(""); setFormPhone(""); setFormOwnerCity("");
    setFormPropertyName(""); setFormPropertyType("hostel"); setFormGender("Co-ed");
    setFormRent(""); setFormDeposit(""); setFormDescription("");
    setFormArea(""); setFormCity(""); setFormAddress(""); setFormPincode(""); setFormLandmark("");
    setFormVacantRooms(""); setFormOccupiedRooms(""); setFormOccupiedBeds("");
    setFormAmenities(new Set(["WiFi", "Power Backup"])); setFormFurnishing("Fully Furnished");
    setFormVentilation(""); setFormMinStay(""); setFormEntryExit("");
    setFormVisitorsAllowed(true); setFormCookingAllowed(false); setFormSmokingAllowed(false); setFormPetsAllowed(false);
    setFormCleanlinessRating(0); setFormOwnerBehaviour(""); setFormStudentReviews(""); setFormInternalRemarks("");
    setFormPhotoUrl(""); setFormPhotos([]);
    setOpenSections({ owner: true, property: true, location: true, occupancy: false, features: false, policies: false, ratings: false, photos: false });
  };

  const loadOwners = async () => {
    try {
      setLoading(true);
      const [res, visitsRes] = await Promise.all([
        fetchJson("/api/owners"),
        fetchJson("/api/visits").catch(() => ({ visits: [] }))
      ]);
      
      const baseOwners = Array.isArray(res) ? res : (res.data || res.owners || []);
      const visits = visitsRes.visits || [];
      
      const visitMap = {};
      visits.forEach(v => {
        const id = v.generatedCredentials?.loginId || "";
        if (id) {
          visitMap[id] = {
            vacantRooms: v.vacantRooms || v.propertyInfo?.vacantRooms || 0,
            vacantBeds: v.vacantBeds || v.propertyInfo?.vacantBeds || 0,
            occupiedRooms: v.occupiedRooms || v.propertyInfo?.occupiedRooms || 0,
            occupiedBeds: v.occupiedBeds || v.propertyInfo?.occupiedBeds || 0,
            monthlyRent: v.monthlyRent || v.propertyInfo?.rent || 0,
            deposit: v.deposit || v.propertyInfo?.deposit || 0
          };
        }
      });

      setOwners(baseOwners.map(o => ({
        ...o,
        ...(visitMap[o.loginId] || {})
      })));
    } catch (err) { console.error("Failed to load owners:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadOwners(); }, []);

  useEffect(() => {
    if (currentView === "add") generateCreds();
  }, [currentView]);

  const generateCreds = () => {
    const prefix = "OWN";
    const genId = `${prefix}${Math.floor(1000 + Math.random() * 9000)}`;
    const password = Math.random().toString(36).slice(-8).toUpperCase();
    setFormLoginId(genId);
    setFormPassword(password);
  };

  const handleAddOwner = async (e) => {
    e.preventDefault();
    if (!formName || !formPhone || !formEmail || !formPropertyName) return alert("Fill required fields: Owner Name, Email, Phone, Property Name");
    setSaving(true);
    try {
      // Step 1: Submit Visit record
      const visitId = `v_${Date.now()}`;
      await fetchJson("/api/visits/submit", {
        method: "POST",
        headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: visitId,
          visitorName: formName, visitorEmail: formEmail, visitorPhone: formPhone,
          propertyName: formPropertyName, propertyType: formPropertyType,
          genderSuitability: formGender,
          monthlyRent: formRent ? parseInt(formRent) : 0, deposit: formDeposit,
          description: formDescription,
          city: formCity || formOwnerCity, area: formArea,
          address: formAddress, pincode: formPincode, landmark: formLandmark,
          ownerName: formName, ownerEmail: formEmail, ownerPhone: formPhone,
          ownerCity: formOwnerCity || formCity,
          vacantRooms: formVacantRooms ? parseInt(formVacantRooms) : 0,
          occupiedRooms: formOccupiedRooms ? parseInt(formOccupiedRooms) : 0,
          occupiedBeds: formOccupiedBeds ? parseInt(formOccupiedBeds) : 0,
          amenities: Array.from(formAmenities), furnishing: formFurnishing,
          ventilation: formVentilation, minStay: formMinStay, entryExit: formEntryExit,
          visitorsAllowed: formVisitorsAllowed ? "yes" : "no",
          cookingAllowed: formCookingAllowed ? "yes" : "no",
          smokingAllowed: formSmokingAllowed ? "yes" : "no",
          petsAllowed: formPetsAllowed ? "yes" : "no",
          cleanlinessRating: formCleanlinessRating,
          ownerBehaviour: formOwnerBehaviour, studentReviews: formStudentReviews,
          internalRemarks: formInternalRemarks, photos: formPhotos,
          staffName: "Superadmin", staffId: "SUPERADMIN",
        })
      });

      // Step 2: Create Owner (auto-sends KYC email via backend)
      await fetchJson("/api/owners", {
        method: "POST",
        headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({
          loginId: formLoginId, name: formName, email: formEmail, phone: formPhone,
          area: formArea || formCity, city: formOwnerCity || formCity,
          locationCode: (formArea || formCity || formLoginId).toUpperCase().slice(0, 5),
          credentials: { password: formPassword, firstTime: true },
          checkinPassword: formPassword, isActive: true, role: "owner",
        })
      });

      // Step 3: Auto-approve the visit
      try {
        await fetchJson(`/api/visits/${visitId}/approve`, {
          method: "POST",
          headers: { ...getAuthHeader(), "Content-Type": "application/json" },
          body: JSON.stringify({ approvalNotes: "Auto-approved during superadmin onboarding", approvedBy: "Superadmin" })
        });
      } catch (approveErr) { console.warn("Visit auto-approve warning:", approveErr.message); }

      alert(`✅ Property Owner onboarded!\n\nLogin ID: ${formLoginId}\nPassword: ${formPassword}\n\nKYC email sent to ${formEmail}`);
      resetForm();
      setSearchParams({ view: "list" });
      loadOwners();
    } catch (err) { alert(err.message || "Failed to onboard owner"); console.error(err); }
    finally { setSaving(false); }
  };

  const filteredOwners = useMemo(() => {
    const query = search.trim().toLowerCase();
    let base = owners;
    
    if (currentView === "pending") {
      base = owners.filter(o => !o.isActive);
    } else if (currentView === "kyc") {
      base = owners.filter(o => (o.kycStatus || o.kyc?.status || "pending") === "pending");
    }

    return base.filter(o => {
      const id = (o.loginId || o._id || "").toString().toLowerCase();
      const name = (o.name || o.profile?.name || "").toLowerCase();
      const area = (o.locationCode || o.checkinArea || "").toLowerCase();
      const matchesSearch = id.includes(query) || name.includes(query);
      const matchesArea = areaFilter === "all" || area.includes(areaFilter.toLowerCase());
      return matchesSearch && matchesArea;
    });
  }, [owners, search, areaFilter, currentView]);

  const areas = useMemo(() => {
    const set = new Set(owners.map(o => (o.locationCode || o.checkinArea || "").toUpperCase()).filter(Boolean));
    return Array.from(set).sort();
  }, [owners]);

  const stats = useMemo(() => {
    const total = owners.length;
    const verified = owners.filter(o => (o.kycStatus === "verified" || o.kyc?.status === "verified")).length;
    const properties = owners.reduce((acc, o) => acc + (o.propertyCount || 1), 0);
    return { total, verified, pending: total - verified, properties };
  }, [owners]);

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete owner ${id}?`)) return;
    try {
      await fetchJson(`/api/owners/${encodeURIComponent(id)}`, { 
        method: "DELETE",
        headers: getAuthHeader()
      });
      loadOwners();
      if (selectedOwner?.loginId === id) setSelectedOwner(null);
    } catch (err) { alert("Failed to delete owner"); }
  };

  const handleKycUpdate = async (id, status, reason = "") => {
    try {
      setIsUpdatingKyc(true);
      await fetchJson(`/api/owners/${id}/kyc`, {
        method: "PATCH",
        headers: getAuthHeader(),
        body: JSON.stringify({ status, rejectionReason: reason })
      });
      loadOwners();
      setSelectedOwner(prev => prev ? { ...prev, kycStatus: status, kyc: { ...prev.kyc, status } } : null);
    } catch (err) { alert("Failed to update KYC status"); }
    finally { setIsUpdatingKyc(false); }
  };

  const handleApproveRequest = async (id) => {
    try {
      setIsUpdatingKyc(true);
      const password = Math.random().toString(36).slice(-8).toUpperCase();
      await fetchJson(`/api/owners/${id}/approve`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ password })
      });
      alert("Owner request approved and link sent successfully!");
      loadOwners();
      setSelectedOwner(prev => prev ? { ...prev, kycStatus: "sent", kyc: { ...prev.kyc, status: "sent" }, credentials: { password } } : null);
    } catch (err) { alert(err?.body?.message || err?.message || "Failed to approve owner request"); }
    finally { setIsUpdatingKyc(false); }
  };

  const exportToExcel = () => {
    const data = filteredOwners.map(o => ({
      "Owner ID": o.loginId,
      "Name": o.name,
      "Email": o.email,
      "Phone": o.phone,
      "Area": o.locationCode || o.checkinArea,
      "Bank": o.bankName || o.checkinBankName,
      "KYC": o.kycStatus || o.kyc?.status || "pending",
      "Properties": o.propertyCount || 0
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Owners");
    XLSX.writeFile(wb, `Roomhy_Owners_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-full">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">
              {currentView === "add" ? "Add Property Owner" : 
               currentView === "pending" ? "Approved / Pending" : 
               currentView === "kyc" ? "KYC / Documents" : 
               "Property Owners"}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
              {currentView === "add" ? "Initialize new asset partner credentials" : 
               currentView === "pending" ? "Manage requests from property listing funnel" : 
               currentView === "kyc" ? "Deep document verification & identity pulse" : 
               "Governance Matrix & Stakeholder Asset Network"}
            </p>
         </div>
         <div className="flex items-center gap-4">
            <button 
              onClick={() => setSearchParams({ view: currentView === "add" ? "list" : "add" })}
              className={cn(
                "px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-3 active:scale-95 shadow-xl",
                currentView === "add" ? "bg-white text-slate-600 border border-slate-100 shadow-slate-200" : "bg-slate-900 text-white shadow-slate-900/20 hover:bg-black"
              )}
            >
               {currentView === "add" ? <RefreshCw className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
               {currentView === "add" ? "Back to Owners List" : "Add Property Owner"}
            </button>
            <button 
              onClick={exportToExcel}
              className="bg-emerald-600 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-3 active:scale-95"
            >
               <Sheet className="w-4 h-4" /> Export Ledger
            </button>
         </div>
      </div>

      {/* Metrics Row (Only on main lists) */}
      {currentView !== "add" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCardHorizontal label="Total Partners" value={stats.total} trend="+14.2% Delta" up icon={Users} color="indigo" />
          <StatCardHorizontal label="Compliance Pass" value={stats.verified} trend="KYC Cleared" up icon={ShieldCheck} color="emerald" />
          <StatCardHorizontal label="Operational Units" value={`${stats.properties}`} trend="Supply Units" up icon={Building2} color="blue" />
          <StatCardHorizontal label="Audit Required" value={stats.pending} trend="Risk Buffer" up={false} icon={ShieldAlert} color="amber" />
        </div>
      )}

      {currentView === "add" ? (
        /* ═══ ADD PROPERTY OWNER — COMPREHENSIVE FORM ═══ */
        <div className="max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          {/* Form Header */}
          <div className="bg-white rounded-t-[3rem] border border-b-0 border-slate-100 shadow-2xl overflow-hidden">
            <div className="p-10 bg-gradient-to-br from-slate-50 to-white flex items-center gap-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-900/30">
                <UserPlus size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Onboard Property Owner</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Fill property visit details and onboard owner with auto KYC</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddOwner}>
            <div className="bg-white border-x border-slate-100 shadow-2xl divide-y divide-slate-50">

              {/* ─── Section 1: Owner Identity ───────────────────────── */}
              <div>
                <SectionToggle icon={User} title="Owner Identity" subtitle="Primary contact information" open={openSections.owner} onToggle={() => toggleSection("owner")} color="blue" />
                {openSections.owner && (
                  <div className="px-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FField label="Owner Name" value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g. Rahul Sharma" required />
                    <FField label="Email Address" value={formEmail} onChange={e => setFormEmail(e.target.value)} type="email" placeholder="rahul@example.com" required />
                    <FField label="Phone Number" value={formPhone} onChange={e => setFormPhone(e.target.value)} placeholder="+91 XXXX XXXXXX" prefix="+91" required />
                    <FField label="Owner City" value={formOwnerCity} onChange={e => setFormOwnerCity(e.target.value)} placeholder="e.g. Indore" />
                  </div>
                )}
              </div>

              {/* ─── Section 2: Property Details ─────────────────────── */}
              <div>
                <SectionToggle icon={Building2} title="Property Details" subtitle="Property name, type, rent & deposit" open={openSections.property} onToggle={() => toggleSection("property")} color="indigo" />
                {openSections.property && (
                  <div className="px-10 pb-10 space-y-8">
                    <FField label="Property Name" value={formPropertyName} onChange={e => setFormPropertyName(e.target.value)} placeholder="e.g. Sunshine Boys PG" required />
                    {/* Property Type Cards */}
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-widest ml-1">Property Type</label>
                      <div className="grid grid-cols-3 gap-4">
                        {PROPERTY_TYPES.map(pt => {
                          const Icon = pt.icon; const active = formPropertyType === pt.value;
                          return (
                            <button key={pt.value} type="button" onClick={() => setFormPropertyType(pt.value)}
                              className={cn("p-4 rounded-2xl border-2 text-left transition-all relative group", active ? "border-blue-600 bg-blue-50/50" : "border-slate-100 hover:border-slate-200")}>
                              {active && <div className="absolute top-3 right-3 bg-blue-600 rounded-full p-0.5 shadow-lg"><Check className="w-3 h-3 text-white" /></div>}
                              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-all", active ? "bg-blue-600 text-white shadow-lg" : "bg-slate-100 text-slate-400")}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <p className="text-[11px] font-bold text-slate-700">{pt.label}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* Gender */}
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-widest ml-1">Gender Suitability</label>
                      <div className="flex gap-3">
                        {GENDER_OPTIONS.map(g => (
                          <button key={g} type="button" onClick={() => setFormGender(g)}
                            className={cn("px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                              formGender === g ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200" : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                            )}>{g}</button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <FField label="Monthly Rent" value={formRent} onChange={e => setFormRent(e.target.value)} placeholder="8000" prefix="₹" type="number" />
                      <FField label="Security Deposit" value={formDeposit} onChange={e => setFormDeposit(e.target.value)} placeholder="10000" prefix="₹" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                      <textarea rows={3} value={formDescription} onChange={e => setFormDescription(e.target.value)} placeholder="Brief property description..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none resize-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-300" />
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Section 3: Location ──────────────────────────────── */}
              <div>
                <SectionToggle icon={MapPin} title="Location" subtitle="Area, city, address & pincode" open={openSections.location} onToggle={() => toggleSection("location")} color="emerald" />
                {openSections.location && (
                  <div className="px-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FField label="Area / Locality" value={formArea} onChange={e => setFormArea(e.target.value)} placeholder="e.g. Koramangala" required />
                    <FField label="City" value={formCity} onChange={e => setFormCity(e.target.value)} placeholder="e.g. Bangalore" required />
                    <FField label="Full Address" value={formAddress} onChange={e => setFormAddress(e.target.value)} placeholder="House/building, street..." className="md:col-span-2" />
                    <FField label="Pincode" value={formPincode} onChange={e => setFormPincode(e.target.value)} placeholder="560034" />
                    <FField label="Nearby Landmark" value={formLandmark} onChange={e => setFormLandmark(e.target.value)} placeholder="Near Christ University" />
                  </div>
                )}
              </div>

              {/* ─── Section 4: Occupancy ─────────────────────────────── */}
              <div>
                <SectionToggle icon={BedDouble} title="Occupancy" subtitle="Rooms & beds info" open={openSections.occupancy} onToggle={() => toggleSection("occupancy")} color="amber" />
                {openSections.occupancy && (
                  <div className="px-10 pb-10 grid grid-cols-3 gap-8">
                    <FField label="Vacant Rooms" value={formVacantRooms} onChange={e => setFormVacantRooms(e.target.value)} placeholder="10" type="number" />
                    <FField label="Occupied Rooms" value={formOccupiedRooms} onChange={e => setFormOccupiedRooms(e.target.value)} placeholder="5" type="number" />
                    <FField label="Occupied Beds" value={formOccupiedBeds} onChange={e => setFormOccupiedBeds(e.target.value)} placeholder="12" type="number" />
                  </div>
                )}
              </div>

              {/* ─── Section 5: Features & Amenities ──────────────────── */}
              <div>
                <SectionToggle icon={Zap} title="Features & Amenities" subtitle="Amenities, furnishing, ventilation" open={openSections.features} onToggle={() => toggleSection("features")} color="violet" />
                {openSections.features && (
                  <div className="px-10 pb-10 space-y-8">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-widest ml-1">Amenities</label>
                      <div className="flex flex-wrap gap-2">
                        {AMENITY_LIST.map(a => (
                          <button key={a} type="button" onClick={() => toggleAmenity(a)}
                            className={cn("px-4 py-2 rounded-xl text-[10px] font-bold border transition-all",
                              formAmenities.has(a) ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                            )}>{a}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-widest ml-1">Furnishing</label>
                      <div className="flex gap-3">
                        {FURNISHING_OPTIONS.map(f => (
                          <button key={f} type="button" onClick={() => setFormFurnishing(f)}
                            className={cn("px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                              formFurnishing === f ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200" : "bg-slate-50 text-slate-500 border-slate-100"
                            )}>{f}</button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                      <FField label="Ventilation" value={formVentilation} onChange={e => setFormVentilation(e.target.value)} placeholder="Good / Average" />
                      <FField label="Minimum Stay" value={formMinStay} onChange={e => setFormMinStay(e.target.value)} placeholder="e.g. 3 Months" />
                      <FField label="Entry / Exit" value={formEntryExit} onChange={e => setFormEntryExit(e.target.value)} placeholder="e.g. 24/7" />
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Section 6: Policies ──────────────────────────────── */}
              <div>
                <SectionToggle icon={ShieldCheck} title="Policies" subtitle="Visitors, cooking, smoking, pets" open={openSections.policies} onToggle={() => toggleSection("policies")} color="cyan" />
                {openSections.policies && (
                  <div className="px-10 pb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <PolicyToggle label="Visitors" icon={Users} active={formVisitorsAllowed} onClick={() => setFormVisitorsAllowed(!formVisitorsAllowed)} />
                    <PolicyToggle label="Cooking" icon={UtensilsCrossed} active={formCookingAllowed} onClick={() => setFormCookingAllowed(!formCookingAllowed)} />
                    <PolicyToggle label="Smoking" icon={Cigarette} active={formSmokingAllowed} onClick={() => setFormSmokingAllowed(!formSmokingAllowed)} />
                    <PolicyToggle label="Pets" icon={PawPrint} active={formPetsAllowed} onClick={() => setFormPetsAllowed(!formPetsAllowed)} />
                  </div>
                )}
              </div>

              {/* ─── Section 7: Ratings & Notes ───────────────────────── */}
              <div>
                <SectionToggle icon={Star} title="Ratings & Notes" subtitle="Cleanliness, reviews, internal remarks" open={openSections.ratings} onToggle={() => toggleSection("ratings")} color="orange" />
                {openSections.ratings && (
                  <div className="px-10 pb-10 space-y-8">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-widest ml-1">Cleanliness Rating</label>
                      <div className="flex items-center gap-2">
                        {[1,2,3,4,5].map(s => (
                          <button key={s} type="button" onClick={() => setFormCleanlinessRating(s)} className="transition-all hover:scale-110 active:scale-95">
                            <Star className={cn("w-8 h-8 transition-colors", s <= formCleanlinessRating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                          </button>
                        ))}
                        <span className="ml-3 text-sm font-bold text-slate-500">{formCleanlinessRating}/5</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <FField label="Owner Behaviour" value={formOwnerBehaviour} onChange={e => setFormOwnerBehaviour(e.target.value)} placeholder="Cooperative, Friendly..." />
                      <FField label="Student Reviews" value={formStudentReviews} onChange={e => setFormStudentReviews(e.target.value)} placeholder="What students say..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Internal Remarks (Private)</label>
                      <textarea rows={3} value={formInternalRemarks} onChange={e => setFormInternalRemarks(e.target.value)} placeholder="Internal notes for superadmin only..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none resize-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-300" />
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Section 8: Photos ────────────────────────────────── */}
              <div>
                <SectionToggle icon={Camera} title="Photos" subtitle="Property photos" open={openSections.photos} onToggle={() => toggleSection("photos")} color="rose" />
                {openSections.photos && (
                  <div className="px-10 pb-10 space-y-4">
                    <div className="flex gap-3 items-end">
                      <div className="flex-1"><FField label="Photo URL" value={formPhotoUrl} onChange={e => setFormPhotoUrl(e.target.value)} placeholder="https://example.com/photo.jpg" /></div>
                      <button type="button" onClick={addPhotoUrl} className="px-5 py-[18px] bg-blue-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"><Plus className="w-4 h-4" /> Add</button>
                    </div>
                    {formPhotos.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {formPhotos.map((url, idx) => (
                          <div key={idx} className="relative group w-24 h-24 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                            <img src={url} alt="" className="w-full h-full object-cover" onError={e => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="%23cbd5e1" viewBox="0 0 24 24"><path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 13.5l2.5 3L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'; }} />
                            <button type="button" onClick={() => removePhoto(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ─── Credentials Card + Actions ──────────────────────── */}
            <div className="bg-white rounded-b-[3rem] border border-t-0 border-slate-100 shadow-2xl p-10 space-y-10">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-inner"><Lock size={24} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Generated Credentials</p>
                    <div className="flex items-center gap-4">
                      <code className="text-xl font-black text-white tracking-widest">{formLoginId}</code>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <code className="text-base font-bold text-blue-400">{formPassword}</code>
                    </div>
                  </div>
                </div>
                <button type="button" onClick={generateCreds} className="px-6 py-3 bg-white/10 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">Re-generate</button>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 flex-shrink-0 mt-0.5"><Info className="w-4 h-4" /></div>
                <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                  On onboarding, a <strong>visit record</strong> will be created, an <strong>Owner account</strong> will be set up, and a <strong>KYC email</strong> will be automatically sent to the owner's email address.
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => { resetForm(); setSearchParams({ view: "list" }); }} className="px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Cancel Onboarding</button>
                <button type="submit" disabled={saving}
                  className="px-12 py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3 disabled:opacity-50 active:scale-95">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Onboarding...</> : <><Send className="w-4 h-4" /> Onboard Property Owner</>}
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* Ledger List View */
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                    {currentView === "pending" ? <ClipboardList size={20} /> : 
                     currentView === "kyc" ? <Fingerprint size={20} /> : 
                     <LayoutGrid size={20} />}
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {currentView === "pending" ? "Approved / Pending Requests" : 
                       currentView === "kyc" ? "KYC / Documents Verification Hub" : 
                       "Property Owners Ledger"}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {currentView === "pending" ? "Review requests from independent asset listings" : 
                       currentView === "kyc" ? "Audit document integrity and compliance flags" : 
                       "Real-time database of all asset partners"}
                    </p>
                 </div>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-3 bg-slate-50 px-6 py-3.5 rounded-2xl border border-slate-100 shadow-inner">
                    <Filter size={14} className="text-slate-400" />
                    <select 
                      value={areaFilter}
                      onChange={e => setAreaFilter(e.target.value)}
                      className="bg-transparent text-[10px] font-bold text-slate-600 outline-none uppercase tracking-widest border-none p-0 focus:ring-0"
                    >
                       <option value="all">All Zones</option>
                       {areas.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                 </div>
                 
                 <div className="relative w-72 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Search Stakeholders..." 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" 
                    />
                 </div>
                 
                 <button onClick={loadOwners} className="p-4 rounded-2xl bg-white text-slate-400 hover:text-blue-600 transition-all border border-slate-100 shadow-md active:scale-95">
                    <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
                 </button>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-slate-100">
                       <th className="px-10 py-8">Identity Hub</th>
                       <th className="px-6 py-8">Primary Asset</th>
                       <th className="px-6 py-8 text-center">{currentView === "kyc" ? "Document Status" : "Banking Intel"}</th>
                       <th className="px-6 py-8 text-center">{currentView === "pending" ? "System Status" : "Audit Status"}</th>
                       <th className="px-10 py-8 text-right">Operations</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      <tr><td colSpan="5" className="py-40 text-center">
                         <div className="w-16 h-16 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin mx-auto mb-8" />
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Accessing Distributed Ledger...</p>
                      </td></tr>
                    ) : filteredOwners.length === 0 ? (
                      <tr><td colSpan="5" className="py-40 text-center">
                         <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                            {currentView === "pending" ? <FileCheck size={40} /> : <Users size={40} />}
                         </div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance Queue Clear</p>
                      </td></tr>
                    ) : filteredOwners.map((o, i) => {
                      const status = (o.kycStatus || o.kyc?.status || "pending").toLowerCase();
                      return (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all duration-300 cursor-pointer" onClick={() => setSelectedOwner(o)}>
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-6">
                                 <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 text-blue-600 flex items-center justify-center font-bold text-xl shadow-xl shadow-slate-200/40 transition-transform group-hover:scale-110 shrink-0">
                                    {(o.name || "U").charAt(0).toUpperCase()}
                                 </div>
                                 <div>
                                    <p className="text-base font-bold text-slate-800 tracking-tight">{o.name || "Unknown Partner"}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                       <span className="text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-lg uppercase tracking-widest">{o.loginId || "ID-GEN"}</span>
                                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-2">{o.phone || "No Pulse"}</span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-8">
                              <div className="space-y-2">
                                 <p className="text-xs font-bold text-slate-700 leading-none truncate max-w-[200px]">{o.propertyTitle || "Global Portfolio"}</p>
                                 <div className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-slate-300" />
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{o.locationCode || o.checkinArea || "Core Zone"}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-8 text-center">
                              {currentView === "kyc" ? (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                   {o.checkinAadhaarNumber ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <AlertCircle className="w-3 h-3 text-amber-500" />}
                                   <span className="text-[9px] font-bold uppercase text-slate-600">{o.checkinAadhaarNumber ? "Document Attached" : "Awaiting Upload"}</span>
                                </div>
                              ) : (
                                <div className="inline-flex flex-col items-center gap-2 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 shadow-sm group-hover:bg-white transition-colors">
                                   <p className="text-[10px] font-bold text-slate-800 leading-none">{o.bankName || o.checkinBankName || "Not Linked"}</p>
                                   <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest opacity-60">Verified Settlement</span>
                                </div>
                              )}
                           </td>
                           <td className="px-6 py-8 text-center">
                              {currentView === "pending" ? (
                                <span className="text-[8px] font-bold px-4 py-1.5 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 uppercase tracking-widest shadow-sm">Review Required</span>
                              ) : (
                                <span className={cn(
                                   "text-[8px] font-bold px-4 py-1.5 rounded-xl border uppercase tracking-[0.2em] shadow-sm",
                                   status === "verified" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                )}>
                                   {status}
                                </span>
                              )}
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex items-center justify-end gap-3">
                                 <button 
                                   className="p-3.5 rounded-2xl bg-white text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all border border-slate-100 shadow-md active:scale-95"
                                 >
                                    <Eye className="w-5 h-5" />
                                 </button>
                                 <button 
                                    onClick={(e) => { e.stopPropagation(); handleDelete(o.loginId || o._id); }}
                                    className="p-3.5 rounded-2xl bg-white text-slate-400 hover:text-rose-600 hover:border-rose-100 transition-all border border-slate-100 shadow-md active:scale-95"
                                 >
                                    <Trash2 className="w-5 h-5" />
                                 </button>
                              </div>
                           </td>
                        </tr>
                      );
                    })}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* Detail Slide-over Panel (Enhanced) */}
      {selectedOwner && (
        <div className="fixed inset-0 z-[120] flex items-center justify-end p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl h-full rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col animate-in slide-in-from-right duration-500">
              <div className="px-10 py-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-slate-900 text-white flex items-center justify-center font-bold text-3xl shadow-2xl">
                       {selectedOwner.name?.[0].toUpperCase()}
                    </div>
                    <div>
                       <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{selectedOwner.name}</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">ID: {selectedOwner.loginId} | Compliance Hub</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedOwner(null)} className="p-4 rounded-3xl bg-white text-slate-400 hover:text-rose-600 transition-all shadow-xl border border-slate-100 active:scale-90">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-12">
                 {/* Identity Pulse */}
                 <section>
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">
                          <User size={20} />
                       </div>
                       <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest">Stakeholder Identity</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <DetailItem icon={Mail} label="Official Email" value={selectedOwner.email || selectedOwner.checkinEmail} />
                       <DetailItem icon={Phone} label="Pulse Contact" value={selectedOwner.phone || selectedOwner.checkinPhone} />
                       <DetailItem icon={Calendar} label="Birth Index" value={selectedOwner.checkinDob || "Not Defined"} />
                       <DetailItem icon={MapPin} label="Home Base" value={selectedOwner.address || selectedOwner.checkinAddress} />
                    </div>
                 </section>

                 {/* Asset Pulse */}
                 <section className="bg-amber-50/30 p-8 rounded-[2.5rem] border border-amber-100">
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-lg shadow-amber-200">
                          <Building2 size={20} />
                       </div>
                       <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest">Asset Pulse</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <DetailItem icon={LayoutGrid} label="Vacant Rooms" value={selectedOwner.vacantRooms} />
                       <DetailItem icon={Users} label="Vacant Beds" value={selectedOwner.vacantBeds} />
                       <DetailItem icon={Banknote} label="Monthly Yield" value={selectedOwner.monthlyRent ? `₹${selectedOwner.monthlyRent}` : "Not Set"} highlight />
                       <DetailItem icon={Wallet} label="Security Reserve" value={selectedOwner.deposit ? `₹${selectedOwner.deposit}` : "Not Set"} />
                    </div>
                 </section>

                 {/* Compliance Matrix */}
                 <section className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-200">
                          <Fingerprint size={20} />
                       </div>
                       <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest">Compliance Audit</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <DetailItem icon={FileText} label="Aadhaar ID" value={selectedOwner.aadharNumber || selectedOwner.checkinAadhaarNumber} />
                       <DetailItem icon={Phone} label="KYC Linked Phone" value={selectedOwner.checkinAadhaarLinkedPhone} />
                       <DetailItem icon={Shield} label="Audit Status" value={(selectedOwner.kycStatus || selectedOwner.kyc?.status || "PENDING").toUpperCase()} highlight />
                    </div>
                 </section>

                 {/* Banking Hub */}
                 <section>
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-200">
                          <Landmark size={20} />
                       </div>
                       <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest">Settlement Engine</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <DetailItem icon={Building2} label="Institution" value={selectedOwner.bankName || selectedOwner.checkinBankName} />
                       <DetailItem icon={CreditCard} label="Ledger Number" value={selectedOwner.accountNumber || selectedOwner.checkinBankAccountNumber} />
                       <DetailItem icon={Zap} label="Routing (IFSC)" value={selectedOwner.ifscCode || selectedOwner.checkinIfscCode} />
                       <DetailItem icon={Wallet} label="UPI Link" value={selectedOwner.checkinUpiId} />
                    </div>
                 </section>
              </div>

              <div className="px-10 py-10 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
                 <button 
                   onClick={() => handleDelete(selectedOwner.loginId || selectedOwner._id)}
                   className="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:underline"
                 >
                    Purge Stakeholder
                 </button>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => handleKycUpdate(selectedOwner.loginId || selectedOwner._id, "rejected", "Documents unclear")}
                      disabled={isUpdatingKyc}
                      className="px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                       Reject Audit
                    </button>
                    {(selectedOwner.kycStatus === 'requested' || selectedOwner.kyc?.status === 'requested') ? (
                       <button 
                         onClick={() => handleApproveRequest(selectedOwner.loginId || selectedOwner._id)}
                         disabled={isUpdatingKyc}
                         className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-3 disabled:opacity-50"
                       >
                          {isUpdatingKyc ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          Approve Request
                       </button>
                    ) : (
                       <button 
                         onClick={() => handleKycUpdate(selectedOwner.loginId || selectedOwner._id, "verified")}
                         disabled={isUpdatingKyc}
                         className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-black transition-all flex items-center gap-3 disabled:opacity-50"
                       >
                          {isUpdatingKyc ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                          Approve Compliance
                       </button>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon: Icon, label, value, highlight }) {
  return (
    <div className="space-y-2">
       <div className="flex items-center gap-2 text-slate-400">
          <Icon size={12} />
          <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
       </div>
       <p className={cn(
         "text-sm font-bold tracking-tight",
         highlight ? "text-blue-600" : "text-slate-700",
         !value && "text-slate-300 italic font-medium"
       )}>
          {value || "Field Null"}
       </p>
    </div>
  );
}

function StatCardHorizontal({ label, value, trend, up, icon: Icon, color }) {
  const bgColors = { 
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100", 
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100", 
    blue: "bg-blue-50 text-blue-600 border-blue-100", 
    amber: "bg-amber-50 text-amber-600 border-amber-100" 
  };
  
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/40 flex items-start gap-5 group hover:translate-y-[-5px] transition-all duration-500">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 shadow-sm transition-transform group-hover:rotate-6", bgColors[color])}>
         <Icon className="w-7 h-7" />
      </div>
      <div className="min-w-0">
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 leading-none truncate">{label}</p>
         <p className="text-3xl font-black text-slate-800 tracking-tighter leading-none mb-3">{value}</p>
         <div className={cn(
           "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider",
           up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
         )}>
            {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
         </div>
      </div>
    </div>
  );
}

// ─── Collapsible Section Header ───────────────────────────────────────────────
function SectionToggle({ icon: Icon, title, subtitle, open, onToggle, color = "slate" }) {
  const colors = {
    slate: "bg-slate-100 text-slate-600", blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100", amber: "bg-amber-50 text-amber-600 border-amber-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100", rose: "bg-rose-50 text-rose-600 border-rose-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100", cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
  };
  return (
    <button type="button" onClick={onToggle} className="w-full flex items-center gap-4 p-6 rounded-2xl hover:bg-slate-50/50 transition-all group">
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm transition-transform group-hover:scale-105", colors[color])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-[11px] font-black text-slate-800 uppercase tracking-wider">{title}</p>
        {subtitle && <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{subtitle}</p>}
      </div>
      <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", open && "rotate-180")} />
    </button>
  );
}

// ─── Reusable Form Field ──────────────────────────────────────────────────────
function FField({ label, value, onChange, placeholder, type = "text", prefix, required, className }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest ml-1">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus-within:bg-white focus-within:border-blue-200 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
        {prefix && <span className="text-[10px] font-black text-slate-400 mr-2">{prefix}</span>}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300" />
      </div>
    </div>
  );
}

// ─── Policy Toggle Pill ───────────────────────────────────────────────────────
function PolicyToggle({ label, icon: Icon, active, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
        active ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm" : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100"
      )}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
      <div className={cn("w-8 h-4 rounded-full relative transition-all ml-1", active ? "bg-emerald-500" : "bg-slate-200")}>
        <div className={cn("w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all shadow-sm", active ? "left-[18px]" : "left-0.5")} />
      </div>
    </button>
  );
}
