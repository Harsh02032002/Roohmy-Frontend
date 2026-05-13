import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight, ChevronLeft, Check, Upload, Plus, Trash2,
  MapPin, Building2, Users, Home, Hotel, Castle, X,
  Zap, ShieldCheck, BookOpen, UtensilsCrossed, Loader2,
  Camera, Play, AlertCircle, CheckCircle2, Send, Save, Image as ImageIcon,
  Wifi, IndianRupee, Info, Clock, User, Eye, LayoutGrid
} from "lucide-react";
import { getApiBase } from "../../utils/api";
import { toast } from "react-hot-toast";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Constants ───────────────────────────────────────────────────────────────

const PROPERTY_TYPES = [
  { value: "hostel_pg", label: "Hostel / PG", sub: "Best for students", icon: Users, color: "blue" },
  { value: "pg_coliving", label: "PG / Paying Guest", sub: "Private/Shared rooms", icon: User, color: "indigo" },
  { value: "flat_apartment", label: "Apartment", sub: "Flats & independent", icon: Building2, color: "emerald" },
];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Chandigarh","Puducherry"
];

const AMENITY_CATEGORIES = [
  { 
    label: "Essentials", 
    icon: ShieldCheck, 
    items: ["WiFi", "Power Backup", "24x7 Water", "RO Water", "Air Conditioning", "Heating"]
  },
  { 
    label: "Security & Safety", 
    icon: ShieldCheck, 
    items: ["CCTV", "Security Guard", "Fire Extinguisher", "Smoke Detector", "First Aid Kit", "Secure Entry"]
  },
  { 
    label: "Room Amenities", 
    icon: Home, 
    items: ["Attached Bathroom", "Study Table", "Wardrobe", "Chair", "Bed with Mattress", "Mirror"]
  },
  { 
    label: "Facilities", 
    icon: Zap, 
    items: ["Kitchen", "Refrigerator", "Microwave", "Induction Cooktop", "Geyser", "Utensils"]
  },
  { 
    label: "Common Areas", 
    icon: Users, 
    items: ["Living Room", "Dining Area", "Lounge", "Balcony / Terrace", "Garden", "Parking"]
  }
];

const STEPS = [
  { num: 1, label: "Basic Details", sub: "Property type, name & location" },
  { num: 2, label: "Property Details", sub: "Rooms, occupancy & facilities" },
  { num: 3, label: "Amenities", sub: "What you offer" },
  { num: 4, label: "Photos & Videos", sub: "Show your property" },
  { num: 5, label: "Policies & Pricing", sub: "Rules, pricing & terms" },
  { num: 6, label: "Review & Submit", sub: "Final review" },
];

const GENDER_OPTIONS = ["Co-ed","Male Only","Female Only"];
const ROOM_TYPES_DEFAULT = [
  { type: "Single Sharing", desc: "Private bed in a shared room", totalRooms: "10", totalBeds: "10", occupancy: 1, pricePerBed: "7000", pricePerRoom: "7000", images: [] },
  { type: "Double Sharing", desc: "Shared room for two", totalRooms: "15", totalBeds: "30", occupancy: 2, pricePerBed: "4000", pricePerRoom: "8000", images: [] },
  { type: "Triple Sharing", desc: "Shared room for three", totalRooms: "8", totalBeds: "24", occupancy: 3, pricePerBed: "3000", pricePerRoom: "9000", images: [] },
  { type: "Four Sharing", desc: "Shared room for four", totalRooms: "5", totalBeds: "20", occupancy: 4, pricePerBed: "2500", pricePerRoom: "10000", images: [] },
  { type: "Private Room (No Sharing)", desc: "Entire room for one person", totalRooms: "4", totalBeds: "4", occupancy: 1, pricePerBed: "12000", pricePerRoom: "12000", images: [] },
];

// ─── Shared Components ────────────────────────────────────────────────────────

const FormField = ({ label, value, onChange, placeholder, type = "text", suffix, prefix, className }) => (
  <div className={cn("flex flex-col", className)}>
    <label className="text-[9px] font-black text-slate-800 uppercase mb-2 block tracking-tight">{label}</label>
    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 focus-within:bg-white focus-within:border-blue-200 transition-all">
      {prefix && <span className="text-[10px] font-black text-slate-400 mr-2">{prefix}</span>}
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className="w-full bg-transparent text-[10px] font-black text-slate-800 outline-none placeholder:text-slate-300 placeholder:font-bold" 
      />
      {suffix && <span className="text-[9px] font-black text-slate-400 ml-2 uppercase tracking-tight">{suffix}</span>}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AddPropertyWizard() {
  const navigate = useNavigate();
  const apiUrl = getApiBase();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Step 1 — Basic Info
  const [propertyType, setPropertyType] = useState("hostel_pg");
  const [propertyName, setPropertyName] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  // Step 2 — Property Details
  const [roomTypes, setRoomTypes] = useState(ROOM_TYPES_DEFAULT);
  const [totalArea, setTotalArea] = useState("5000");
  const [yearBuilt, setYearBuilt] = useState("2020");
  const [propertyAge, setPropertyAge] = useState("3 - 5 Years");
  const [preferredFor, setPreferredFor] = useState({ students: false, professionals: false, both: false, family: false });
  const [genderPref, setGenderPref] = useState("Co-ed");
  const [floors, setFloors] = useState("G + 3");
  const [liftAvailable, setLiftAvailable] = useState("Yes");
  const [parkingAvailable, setParkingAvailable] = useState("Yes");
  const [noticePeriod, setNoticePeriod] = useState("30 Days");

  // Step 3 — Amenities
  const [selectedAmenities, setSelectedAmenities] = useState(new Set(["WiFi", "Power Backup", "RO Water"]));

  // Step 4 — Photos
  const [propertyPhotos, setPropertyPhotos] = useState([]);
  const [roomTypePhotos, setRoomTypePhotos] = useState({}); // { roomIdx: [urls] }

  // Step 5 — Policies & Pricing
  const [houseRules, setHouseRules] = useState({
    smokingAllowed: "No",
    alcoholAllowed: "No",
    petsAllowed: "No",
    cookingAllowed: "Yes",
    visitorsAllowed: "Yes",
    visitorTiming: "8:00 AM - 8:00 PM",
    partyAllowed: "No",
    outsideFood: "Yes",
    quietHours: "Yes",
    quietHoursTiming: "10:00 PM - 7:00 AM",
    earlyCheckIn: "Yes",
  });
  const [pricing, setPricing] = useState({
    rentType: "Per Bed",
    securityDeposit: "10000",
    advanceRent: "5000",
    noticePeriod: "30 Days",
    lockInPeriod: "3 Months",
  });
  const [includedInRent, setIncludedInRent] = useState({
    Electricity: true, Water: true, WiFi: true, Gas: false, Maintenance: true, Housekeeping: false, Laundry: false
  });
  const [additionalCharges, setAdditionalCharges] = useState([
    { name: "Parking", amount: "500", per: "Month" },
    { name: "Extra Bed", amount: "1500", per: "Month" },
    { name: "AC Charges", amount: "1000", per: "Month" }
  ]);
  const [cancellationPolicy, setCancellationPolicy] = useState("Moderate");
  const [tenantDescription, setTenantDescription] = useState("A comfortable and secure stay with all essential amenities. Ideal for students and working professionals.");

  const toggleAmenity = (name) => {
    setSelectedAmenities(prev => {
      const n = new Set(prev);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  };

  const updateRoom = (idx, field, val) => {
    const updated = [...roomTypes];
    updated[idx] = { ...updated[idx], [field]: val };
    setRoomTypes(updated);
  };

  const addRoom = () => setRoomTypes([...roomTypes, { type: "", desc: "", totalRooms: "1", totalBeds: "1", occupancy: 1, pricePerBed: "0", pricePerRoom: "0", images: [] }]);
  const removeRoom = (idx) => setRoomTypes(roomTypes.filter((_, i) => i !== idx));

  const handlePhotoUpload = async (e, target = "property", roomIdx = null) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    toast.loading("Uploading...");
    for (const file of files) {
      const data = new FormData();
      data.append("image", file);
      try {
        const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: data });
        const json = await res.json();
        if (json.url) {
          if (target === "property") setPropertyPhotos(p => [...p, json.url]);
          else if (target === "room") {
            setRoomTypePhotos(prev => ({
              ...prev,
              [roomIdx]: [...(prev[roomIdx] || []), json.url]
            }));
          }
        }
      } catch (err) { console.error(err); }
    }
    toast.dismiss();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        title: propertyName,
        propertyType,
        propertyCategory,
        description,
        address, locality, city, state, pincode,
        contact: { name: contactName, number: contactNumber, email },
        propertyDetails: { totalArea, yearBuilt, propertyAge, floors, liftAvailable, parkingAvailable, noticePeriod, genderPref, preferredFor },
        roomTypes: roomTypes.map((r, i) => ({ ...r, images: roomTypePhotos[i] || [] })),
        amenities: Array.from(selectedAmenities),
        media: { images: propertyPhotos },
        policies: houseRules,
        pricing: { ...pricing, includedInRent, additionalCharges, cancellationPolicy },
        tenantDescription,
        status: "active",
      };

      const res = await fetch(`${apiUrl}/api/properties/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Property Added Successfully!");
      } else {
        toast.error("Failed to add property");
      }
    } catch (err) { 
      console.error(err);
      toast.error("An error occurred");
    } finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-full bg-white flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-2xl max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3 uppercase tracking-tight">Property Added Successfully!</h2>
          <p className="text-xs font-bold text-slate-400 mb-8 uppercase">Your listing is now live and visible to potential tenants.</p>
          <button onClick={() => navigate("/superadmin/total-properties")} className="w-full bg-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100">Go to Properties</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F8FAFC]">
      {/* Top Header Actions */}
      <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
            Property Management <ChevronRight className="w-3 h-3" /> Add Property
          </div>
          <h1 className="text-xl font-black text-slate-800">Add Property</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">List your property and start receiving leads from thousands of tenants.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
             <Save className="w-3.5 h-3.5" /> Save as Draft
          </button>
          <button onClick={() => step < 6 ? setStep(s => s + 1) : handleSubmit()} 
            className="bg-blue-600 text-white px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            {step === 6 ? "Submit Property" : `Next: ${STEPS[step]?.label}`} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b border-slate-100 px-8 py-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.num}>
              <button onClick={() => setStep(s.num)} className="flex flex-col items-center gap-3 relative group outline-none">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all",
                  step >= s.num ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200")}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <div className="text-center">
                   <p className={cn("text-[10px] font-black uppercase tracking-tight", step >= s.num ? "text-blue-600" : "text-slate-400")}>{s.label}</p>
                   <p className="text-[8px] font-bold text-slate-300 mt-0.5 leading-none">{s.sub}</p>
                </div>
                {step === s.num && <div className="absolute -bottom-8 w-1.5 h-1.5 bg-blue-600 rounded-full" />}
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-[2px] mx-6 -mt-8 transition-all duration-500", step > s.num ? "bg-blue-600" : "bg-slate-50")} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content Layout Optimized for Space */}
      <div className="max-w-[1550px] mx-auto p-8 grid grid-cols-12 gap-4">
        <div className={cn(step === 6 ? "col-span-12" : "col-span-9", "space-y-8")}>
          
          {step === 1 && (
            <>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-8">Basic Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-4 block">Property Type *</label>
                    <div className="grid grid-cols-3 gap-4">
                      {PROPERTY_TYPES.map(pt => {
                        const Icon = pt.icon;
                        const active = propertyType === pt.value;
                        return (
                          <button key={pt.value} onClick={() => setPropertyType(pt.value)}
                            className={cn("p-5 rounded-2xl border-2 text-left transition-all relative group",
                              active ? "border-blue-600 bg-blue-50/50" : "border-slate-100 hover:border-slate-200"
                            )}>
                            {active && <div className="absolute top-4 right-4 bg-blue-600 rounded-full p-0.5 shadow-lg shadow-blue-100"><Check className="w-3 h-3 text-white" /></div>}
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all", active ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200")}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <p className="text-[12px] font-black text-slate-800 leading-tight">{pt.label}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-0.5">{pt.sub}</p>
                          </button>
                        );
                      })}
                   </div>
                  </div>
                </div>
 
                <div className="grid grid-cols-2 gap-6">
                    <FormField label="Property Name *" value={propertyName} onChange={e => setPropertyName(e.target.value)} placeholder="e.g. Cozy Stay Girls Hostel" />
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Property Category *</label>
                      <select value={propertyCategory} onChange={e => setPropertyCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:bg-white focus:border-blue-200 transition-all">
                        <option>Select category</option>
                        <option>Boys PG</option>
                        <option>Girls PG</option>
                        <option>Co-living</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Description *</label>
                    <textarea rows={5} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your property..." className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold outline-none resize-none focus:bg-white focus:border-blue-200 transition-all" />
                    <p className="text-right text-[9px] font-bold text-slate-300 mt-2">0/600</p>
                  </div>
                 </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-8">Location Details</h2>
                <div className="space-y-6">
                  <FormField label="Address *" value={address} onChange={e => setAddress(e.target.value)} placeholder="House/building name, Street address" />
                  <div className="grid grid-cols-4 gap-4">
                    <FormField label="Locality / Area *" value={locality} onChange={e => setLocality(e.target.value)} placeholder="e.g. Koramangala" />
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">City *</label>
                      <select value={city} onChange={e => setCity(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none">
                        <option value="">Select city</option>
                        <option>Bangalore</option><option>Kota</option><option>Indore</option><option>Delhi</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">State *</label>
                      <select value={state} onChange={e => setState(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none">
                        <option value="">Select state</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <FormField label="Pincode *" value={pincode} onChange={e => setPincode(e.target.value)} placeholder="Enter pincode" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-8">Contact Person Details</h2>
                <div className="grid grid-cols-3 gap-6">
                   <FormField label="Contact Name *" value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Full Name" />
                   <FormField label="Contact Number *" value={contactNumber} onChange={e => setContactNumber(e.target.value)} placeholder="Phone Number" prefix="+91" />
                   <FormField label="Email Address *" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </div>
              </div>
               <div className="mt-8 pt-8 border-t border-slate-50 flex justify-end">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 px-10 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                     Next: Room Types & Pricing <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
            </>
          )}

          {step === 2 && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Room Types & Pricing</h2>
                    </div>
                    <button onClick={addRoom} 
                      className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 transition-all">
                       <Plus className="w-3.5 h-3.5" /> Add Room Type
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                          <th className="px-6 py-4">Room Type</th>
                          <th className="px-4 py-4">Description</th>
                          <th className="px-4 py-4 text-center">Total Rooms</th>
                          <th className="px-4 py-4 text-center">Total Beds</th>
                          <th className="px-4 py-4 text-center">Occupancy</th>
                          <th className="px-4 py-4">Price (Per Bed)</th>
                          <th className="px-4 py-4">Price (Per Room)</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {roomTypes.map((room, idx) => (
                          <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                            <td className="px-6 py-4">
                              <input value={room.type} onChange={e => updateRoom(idx, "type", e.target.value)} className="w-full bg-transparent text-[11px] font-black text-slate-800 outline-none" placeholder="e.g. Single Sharing" />
                            </td>
                            <td className="px-4 py-4">
                              <input value={room.desc} onChange={e => updateRoom(idx, "desc", e.target.value)} className="w-full bg-transparent text-[10px] font-bold text-slate-400 outline-none" placeholder="Short description" />
                            </td>
                            <td className="px-4 py-4 text-center">
                              <input value={room.totalRooms} onChange={e => updateRoom(idx, "totalRooms", e.target.value)} className="w-12 text-center bg-slate-50 border border-slate-100 rounded-lg py-1.5 text-[11px] font-bold outline-none" />
                            </td>
                            <td className="px-4 py-4 text-center">
                              <input value={room.totalBeds} onChange={e => updateRoom(idx, "totalBeds", e.target.value)} className="w-12 text-center bg-slate-50 border border-slate-100 rounded-lg py-1.5 text-[11px] font-bold outline-none" />
                            </td>
                            <td className="px-4 py-4 text-center">
                               <input value={room.occupancy} onChange={e => updateRoom(idx, "occupancy", e.target.value)} className="w-8 text-center bg-transparent font-black outline-none" />
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5">
                                 <IndianRupee className="w-3 h-3 text-slate-400" />
                                 <input value={room.pricePerBed} onChange={e => updateRoom(idx, "pricePerBed", e.target.value)} className="w-16 bg-transparent text-[11px] font-black outline-none" />
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5">
                                 <IndianRupee className="w-3 h-3 text-slate-400" />
                                 <input value={room.pricePerRoom} onChange={e => updateRoom(idx, "pricePerRoom", e.target.value)} className="w-16 bg-transparent text-[11px] font-black outline-none" />
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => removeRoom(idx)} className="p-2 rounded-lg bg-red-50 text-red-400 hover:text-red-600 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                   <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-8">Additional Details</h3>
                   <div className="grid grid-cols-3 gap-6">
                      <FormField label="Total Property Area (Optional)" value={totalArea} onChange={e => setTotalArea(e.target.value)} suffix="Sq.ft" />
                      <div>
                        <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Year Built</label>
                        <select value={yearBuilt} onChange={e => setYearBuilt(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-xs font-black outline-none">
                           <option>2020</option><option>2021</option><option>2022</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Property Age</label>
                        <select value={propertyAge} onChange={e => setPropertyAge(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-xs font-black outline-none">
                           <option>1-2 Years</option><option>3-5 Years</option>
                        </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-12 gap-6 mt-8 items-end">
                      <div className="col-span-5">
                         <label className="text-[9px] font-black text-slate-400 uppercase mb-4 block">Preferred For</label>
                         <div className="flex gap-4">
                           {["students", "professionals", "both", "family"].map(opt => (
                             <label key={opt} className="flex items-center gap-2 cursor-pointer">
                               <div onClick={() => setPreferredFor(prev => ({ ...prev, [opt]: !prev[opt] }))} 
                                 className={cn("w-4 h-4 rounded border-2 transition-all flex items-center justify-center", preferredFor[opt] ? "bg-blue-600 border-blue-600 shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" : "border-slate-200")}>
                                 {preferredFor[opt] && <Check className="w-2.5 h-2.5 text-white" />}
                               </div>
                               <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{opt}</span>
                             </label>
                           ))}
                         </div>
                      </div>
                      <div className="col-span-5">
                         <label className="text-[9px] font-black text-slate-400 uppercase mb-4 block text-center">Gender Preference</label>
                         <div className="flex justify-center gap-5">
                           {GENDER_OPTIONS.map(g => (
                             <label key={g} onClick={() => setGenderPref(g)} className="flex items-center gap-2 cursor-pointer">
                               <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", genderPref === g ? "border-blue-600 shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" : "border-slate-200")}>
                                 {genderPref === g && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                               </div>
                               <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{g}</span>
                             </label>
                           ))}
                         </div>
                      </div>
                      <div className="col-span-2">
                         <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Floor(s)</label>
                         <select value={floors} onChange={e => setFloors(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-[10px] font-black outline-none">
                            <option>G + 3</option><option>G + 5</option>
                         </select>
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between">
                   <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                      <ChevronLeft className="w-4 h-4" /> Back: Basic Information
                   </button>
                   <button onClick={() => setStep(3)} className="flex items-center gap-2 px-10 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                      Next: Amenities <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
          )}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Amenities</h2>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Select and add amenities available in your property.</p>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 transition-all">
                       <Plus className="w-3.5 h-3.5" /> Add Custom Amenity
                    </button>
                  </div>

                  <div className="space-y-10">
                    {AMENITY_CATEGORIES.map(cat => (
                      <div key={cat.label}>
                         <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                               <cat.icon className="w-4 h-4 text-slate-400" />
                            </div>
                            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{cat.label}</h3>
                         </div>
                         <div className="grid grid-cols-4 gap-4">
                            {cat.items.map(item => {
                              const active = selectedAmenities.has(item);
                              return (
                                <button key={item} onClick={() => toggleAmenity(item)}
                                  className={cn("p-4 rounded-2xl border-2 text-left transition-all relative flex items-center gap-3",
                                    active ? "border-blue-600 bg-blue-50/50" : "border-slate-50 hover:border-slate-100"
                                  )}>
                                  <div className={cn("w-4 h-4 rounded border-2 flex items-center justify-center transition-all", active ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-100" : "border-slate-200")}>
                                     {active && <Check className="w-2.5 h-2.5 text-white" />}
                                  </div>
                                  <span className={cn("text-[10px] font-black uppercase tracking-tight", active ? "text-slate-800" : "text-slate-400")}>{item}</span>
                                </button>
                              );
                            })}
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                     <div className="mb-8">
                        <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Photos & Videos</h2>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">High quality photos and videos help you get more views and bookings.</p>
                     </div>

                     <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-start gap-4 mb-10">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 flex-shrink-0">
                           <Info className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-600 leading-relaxed pt-1.5">
                           You can upload up to 40 photos and 2 videos. Supported formats: JPG, PNG, MP4. Max size: 20MB per file.
                        </p>
                     </div>
                  
                  <div className="space-y-10">
                        <div className="space-y-6">
                           <div className="flex justify-between items-center">
                              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Property Photos (Gallery Images)</h3>
                              <button className="text-[8px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5 hover:underline">
                                 <LayoutGrid className="w-3 h-3" /> Reorder
                              </button>
                           </div>
                           <p className="text-[9px] font-bold text-slate-400 -mt-4">Add attractive photos of your property.</p>
                           
                           <div className="grid grid-cols-5 gap-4">
                              <label className="aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white hover:border-blue-200 transition-all group">
                                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Upload className="w-5 h-5 text-blue-600" />
                                 </div>
                                 <div className="text-center">
                                    <p className="text-[9px] font-black text-slate-800 uppercase">Upload Photos</p>
                                    <p className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">JPG, PNG up to 20MB</p>
                                 </div>
                                 <input type="file" multiple className="hidden" />
                              </label>
                           </div>
                        </div>

                    <div>
                        <div className="space-y-6">
                           <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Room Type Photos</h3>
                           <p className="text-[9px] font-bold text-slate-400 -mt-4">Add photos for each room type.</p>
                           
                           <div className="flex gap-2 bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100 w-fit">
                              {ROOM_TYPES_DEFAULT.map(rt => (
                                <button key={rt.type} className={cn("px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap", rt.type === "Single Sharing" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-transparent text-slate-400 hover:text-slate-600")}>
                                   {rt.type}
                                   <span className={cn("block text-[7px] font-bold mt-0.5", rt.type === "Single Sharing" ? "text-blue-100" : "text-slate-300")}>10 Photos</span>
                                </button>
                              ))}
                           </div>
                           <div className="grid grid-cols-5 gap-4 mt-6">
                              <label className="aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white hover:border-blue-200 transition-all group">
                                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Upload className="w-5 h-5 text-blue-600" />
                                 </div>
                                 <div className="text-center">
                                    <p className="text-[9px] font-black text-slate-800 uppercase">Upload Photos</p>
                                    <p className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">JPG, PNG up to 20MB</p>
                                 </div>
                              </label>
                           </div>
                           <p className="text-[8px] font-bold text-slate-400 italic mt-4">Tip: Add clear photos of beds, bathroom, windows and workspace.</p>
                        {/* Section 3: Property Video */}
                        <div className="space-y-6">
                           <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Property Video <span className="normal-case font-bold text-slate-300 ml-1">(Optional)</span></h3>
                           <p className="text-[9px] font-bold text-slate-400 -mt-4">Add video to give tenants a better understanding of your property.</p>
                           
                           <div className="grid grid-cols-4 gap-6">
                              <label className="aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white hover:border-blue-200 transition-all group">
                                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 text-blue-600 ml-0.5" />
                                 </div>
                                 <div className="text-center">
                                    <p className="text-[9px] font-black text-slate-800 uppercase">Upload Video</p>
                                    <p className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">MP4 up to 50MB</p>
                                 </div>
                              </label>
                           </div>
                        </div>
                     </div>

                     <div className="mt-16 pt-8 border-t border-slate-50 flex justify-between">
                        <button onClick={() => setStep(3)} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                           <ChevronLeft className="w-4 h-4" /> Back: Amenities
                        </button>
                        <button onClick={() => setStep(5)} className="flex items-center gap-2 px-10 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                           Next: Policies & Pricing <ChevronRight className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

          {step === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                  <div className="mb-8">
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Policies & Pricing</h2>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Set your property rules, policies, pricing and other important information.</p>
                  </div>
                  
                  <div className="space-y-12">
                    {/* House Rules Section */}
                     <div>
                       <h3 className="text-[10px] font-black text-black uppercase tracking-widest mb-8">House Rules</h3>
                      <div className="flex gap-x-16">
                        {/* Column 1 */}
                        <div className="flex-1 space-y-10">
                           {/* Smoking Allowed */}
                           <div className="space-y-3">
                              <div className="flex items-center gap-1.5">
                                 <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight">Smoking Allowed</span>
                                 <Info className="w-3 h-3 text-slate-300" />
                              </div>
                              <div className="flex gap-8">
                                 {["Yes", "No"].map(v => (
                                   <label key={v} onClick={() => setHouseRules(prev => ({ ...prev, smokingAllowed: v }))} className="flex items-center gap-2.5 cursor-pointer group">
                                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", houseRules.smokingAllowed === v ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]" : "border-slate-200 group-hover:border-slate-300")}>
                                         {houseRules.smokingAllowed === v && <div className="w-2 h-2 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300" />}
                                      </div>
                                      <span className={cn("text-[10px] font-black uppercase tracking-tight transition-all", houseRules.smokingAllowed === v ? "text-slate-800" : "text-slate-400")}>{v}</span>
                                   </label>
                                 ))}
                              </div>
                           </div>

                           {/* Pets Allowed */}
                           <div className="space-y-3">
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight block">Pets Allowed</span>
                              <div className="flex gap-8">
                                 {["Yes", "No"].map(v => (
                                   <label key={v} onClick={() => setHouseRules(prev => ({ ...prev, petsAllowed: v }))} className="flex items-center gap-2.5 cursor-pointer group">
                                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", houseRules.petsAllowed === v ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]" : "border-slate-200 group-hover:border-slate-300")}>
                                         {houseRules.petsAllowed === v && <div className="w-2 h-2 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300" />}
                                      </div>
                                      <span className={cn("text-[10px] font-black uppercase tracking-tight transition-all", houseRules.petsAllowed === v ? "text-slate-800" : "text-slate-400")}>{v}</span>
                                   </label>
                                 ))}
                              </div>
                           </div>

                           {/* Visitors Allowed */}
                           <div className="space-y-4">
                              <div className="space-y-3">
                                 <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight block">Visitors Allowed</span>
                                 <div className="flex gap-8">
                                    {["Yes", "No"].map(v => (
                                      <label key={v} onClick={() => setHouseRules(prev => ({ ...prev, visitorsAllowed: v }))} className="flex items-center gap-2.5 cursor-pointer group">
                                         <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", houseRules.visitorsAllowed === v ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]" : "border-slate-200 group-hover:border-slate-300")}>
                                            {houseRules.visitorsAllowed === v && <div className="w-2 h-2 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300" />}
                                         </div>
                                         <span className={cn("text-[10px] font-black uppercase tracking-tight transition-all", houseRules.visitorsAllowed === v ? "text-slate-800" : "text-slate-400")}>{v}</span>
                                      </label>
                                    ))}
                                 </div>
                              </div>
                              {houseRules.visitorsAllowed === "Yes" && (
                                <div className="animate-in slide-in-from-top-2 duration-300 max-w-[180px]">
                                   <label className="text-[8px] font-black text-slate-400 uppercase mb-1.5 block tracking-widest">Visitor Timing (Optional)</label>
                                   <select value={houseRules.visitorTiming} onChange={e => setHouseRules(prev => ({ ...prev, visitorTiming: e.target.value }))}
                                     className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-[10px] font-black text-slate-700 outline-none hover:bg-white focus:border-blue-200 transition-all">
                                      <option>8:00 AM - 8:00 PM</option>
                                      <option>9:00 AM - 9:00 PM</option>
                                   </select>
                                </div>
                              )}
                           </div>
                        </div>

                        {/* Divider */}
                        <div className="w-[1px] bg-slate-200" />

                        {/* Column 2 */}
                        <div className="flex-1 space-y-10">
                           {/* Alcohol Allowed */}
                           <div className="space-y-3">
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight block">Alcohol Allowed</span>
                              <div className="flex gap-8">
                                 {["Yes", "No"].map(v => (
                                   <label key={v} onClick={() => setHouseRules(prev => ({ ...prev, alcoholAllowed: v }))} className="flex items-center gap-2.5 cursor-pointer group">
                                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", houseRules.alcoholAllowed === v ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]" : "border-slate-200 group-hover:border-slate-300")}>
                                         {houseRules.alcoholAllowed === v && <div className="w-2 h-2 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300" />}
                                      </div>
                                      <span className={cn("text-[10px] font-black uppercase tracking-tight transition-all", houseRules.alcoholAllowed === v ? "text-slate-800" : "text-slate-400")}>{v}</span>
                                   </label>
                                 ))}
                              </div>
                           </div>

                           {/* Cooking Allowed */}
                           <div className="space-y-3">
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight block">Cooking Allowed</span>
                              <div className="flex gap-8">
                                 {["Yes", "No"].map(v => (
                                   <label key={v} onClick={() => setHouseRules(prev => ({ ...prev, cookingAllowed: v }))} className="flex items-center gap-2.5 cursor-pointer group">
                                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", houseRules.cookingAllowed === v ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]" : "border-slate-200 group-hover:border-slate-300")}>
                                         {houseRules.cookingAllowed === v && <div className="w-2 h-2 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300" />}
                                      </div>
                                      <span className={cn("text-[10px] font-black uppercase tracking-tight transition-all", houseRules.cookingAllowed === v ? "text-slate-800" : "text-slate-400")}>{v}</span>
                                   </label>
                                 ))}
                              </div>
                           </div>

                           {/* Party Allowed */}
                           <div className="space-y-3">
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight block">Party/Events Allowed</span>
                              <div className="flex gap-8">
                                 {["Yes", "No"].map(v => (
                                   <label key={v} onClick={() => setHouseRules(prev => ({ ...prev, partyAllowed: v }))} className="flex items-center gap-2.5 cursor-pointer group">
                                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", houseRules.partyAllowed === v ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]" : "border-slate-200 group-hover:border-slate-300")}>
                                         {houseRules.partyAllowed === v && <div className="w-2 h-2 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300" />}
                                      </div>
                                      <span className={cn("text-[10px] font-black uppercase tracking-tight transition-all", houseRules.partyAllowed === v ? "text-slate-800" : "text-slate-400")}>{v}</span>
                                   </label>
                                 ))}
                              </div>
                           </div>
                        </div>

                        {/* Divider */}
                        <div className="w-[1px] bg-slate-200" />

                        {/* Column 3 */}
                        <div className="flex-1 space-y-10">
                           {/* Outside Food */}
                           <div className="space-y-3">
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight block">Outside Food Allowed</span>
                              <div className="flex gap-8">
                                 {["Yes", "No"].map(v => (
                                   <label key={v} onClick={() => setHouseRules(prev => ({ ...prev, outsideFood: v }))} className="flex items-center gap-2.5 cursor-pointer group">
                                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", houseRules.outsideFood === v ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]" : "border-slate-200 group-hover:border-slate-300")}>
                                         {houseRules.outsideFood === v && <div className="w-2 h-2 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300" />}
                                      </div>
                                      <span className={cn("text-[10px] font-black uppercase tracking-tight transition-all", houseRules.outsideFood === v ? "text-slate-800" : "text-slate-400")}>{v}</span>
                                   </label>
                                 ))}
                              </div>
                           </div>

                           {/* Quiet Hours */}
                           <div className="space-y-4">
                              <div className="space-y-3">
                                 <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight block">Quiet Hours</span>
                                 <div className="flex gap-8">
                                    {["Yes", "No"].map(v => (
                                      <label key={v} onClick={() => setHouseRules(prev => ({ ...prev, quietHours: v }))} className="flex items-center gap-2.5 cursor-pointer group">
                                         <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", houseRules.quietHours === v ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]" : "border-slate-200 group-hover:border-slate-300")}>
                                            {houseRules.quietHours === v && <div className="w-2 h-2 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300" />}
                                         </div>
                                         <span className={cn("text-[10px] font-black uppercase tracking-tight transition-all", houseRules.quietHours === v ? "text-slate-800" : "text-slate-400")}>{v}</span>
                                      </label>
                                    ))}
                                 </div>
                              </div>
                              {houseRules.quietHours === "Yes" && (
                                <div className="animate-in slide-in-from-top-2 duration-300 max-w-[200px]">
                                   <label className="text-[8px] font-black text-slate-400 uppercase mb-1.5 block tracking-widest">Quiet Hours Timing</label>
                                   <select value={houseRules.quietHoursTiming} onChange={e => setHouseRules(prev => ({ ...prev, quietHoursTiming: e.target.value }))}
                                     className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-[10px] font-black text-slate-700 outline-none hover:bg-white focus:border-blue-200 transition-all">
                                      <option>10:00 PM - 7:00 AM</option>
                                      <option>11:00 PM - 6:00 AM</option>
                                   </select>
                                </div>
                              )}
                           </div>

                           {/* Early Check-in */}
                           <div className="space-y-3">
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight block">Early Check-in Allowed</span>
                              <div className="flex gap-8">
                                 {["Yes", "No"].map(v => (
                                   <label key={v} onClick={() => setHouseRules(prev => ({ ...prev, earlyCheckIn: v }))} className="flex items-center gap-2.5 cursor-pointer group">
                                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", houseRules.earlyCheckIn === v ? "border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]" : "border-slate-200 group-hover:border-slate-300")}>
                                         {houseRules.earlyCheckIn === v && <div className="w-2 h-2 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300" />}
                                      </div>
                                      <span className={cn("text-[10px] font-black uppercase tracking-tight transition-all", houseRules.earlyCheckIn === v ? "text-slate-800" : "text-slate-400")}>{v}</span>
                                   </label>
                                 ))}
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Charges Section */}
                    <div className="pt-12 border-t border-slate-50 relative">
                       <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-8">Pricing & Charges</h3>
                       
                       <div className="grid grid-cols-12 gap-10">
                          {/* Left: Inputs */}
                          <div className="col-span-8 space-y-10">
                             <div className="flex gap-4">
                                <div className="w-[18%]">
                                   <label className="text-[9px] font-black text-slate-800 uppercase mb-2 block tracking-tight whitespace-nowrap">Rent Type</label>
                                   <select value={pricing.rentType} onChange={e => setPricing({...pricing, rentType: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-[10px] font-black outline-none hover:bg-white transition-all">
                                      <option>Per Bed</option><option>Per Room</option>
                                   </select>
                                </div>
                                <div className="w-[20%]">
                                   <FormField label="Security Deposit" value={pricing.securityDeposit} onChange={e => setPricing({...pricing, securityDeposit: e.target.value})} prefix="₹" />
                                </div>
                                <div className="w-[20%]">
                                   <FormField label="Advance Rent" value={pricing.advanceRent} onChange={e => setPricing({...pricing, advanceRent: e.target.value})} prefix="₹" />
                                </div>
                                <div className="w-[18%]">
                                   <label className="text-[9px] font-black text-slate-800 uppercase mb-2 block tracking-tight whitespace-nowrap">Notice Period</label>
                                   <select value={pricing.noticePeriod} onChange={e => setPricing({...pricing, noticePeriod: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-[10px] font-black outline-none hover:bg-white transition-all">
                                      <option>30 Days</option><option>60 Days</option>
                                   </select>
                                </div>
                                <div className="flex-1">
                                   <label className="text-[9px] font-black text-slate-800 uppercase mb-2 block tracking-tight whitespace-nowrap">Lock-in Period (Optional)</label>
                                   <select value={pricing.lockInPeriod} onChange={e => setPricing({...pricing, lockInPeriod: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-[10px] font-black outline-none hover:bg-white transition-all">
                                      <option>3 Months</option><option>6 Months</option><option>None</option>
                                   </select>
                                </div>
                             </div>

                             <div>
                                <label className="text-[10px] font-black text-slate-800 uppercase mb-4 block tracking-tight">Included in Rent</label>
                                <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                                   {Object.keys(includedInRent).map(key => (
                                     <label key={key} className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 hover:bg-white transition-all">
                                        <div onClick={() => setIncludedInRent(prev => ({ ...prev, [key]: !prev[key] }))} 
                                          className={cn("w-4 h-4 rounded border-2 flex items-center justify-center transition-all", includedInRent[key] ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-100" : "border-slate-200")}>
                                           {includedInRent[key] && <Check className="w-2.5 h-2.5 text-white" />}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-tight text-slate-800">{key}</span>
                                     </label>
                                   ))}
                                </div>
                             </div>

                             <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-800 uppercase block tracking-tight">Additional Charges (If any)</label>
                                
                                {additionalCharges.length > 0 && (
                                  <div className="grid grid-cols-12 gap-4">
                                     <div className="col-span-4">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Charge Name</span>
                                     </div>
                                     <div className="col-span-3">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Amount</span>
                                     </div>
                                     <div className="col-span-4">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1">Per</span>
                                     </div>
                                  </div>
                                )}
                                {additionalCharges.map((charge, idx) => (
                                  <div key={idx} className="grid grid-cols-12 gap-4 items-center animate-in fade-in slide-in-from-left-4 duration-300">
                                     <div className="col-span-4">
                                        <input value={charge.name} onChange={e => {
                                          const up = [...additionalCharges]; up[idx].name = e.target.value; setAdditionalCharges(up);
                                        }} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-[10px] font-black outline-none" placeholder="Charge Name" />
                                     </div>
                                     <div className="col-span-3 relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">₹</span>
                                        <input value={charge.amount} onChange={e => {
                                          const up = [...additionalCharges]; up[idx].amount = e.target.value; setAdditionalCharges(up);
                                        }} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-8 pr-4 text-[10px] font-black outline-none" placeholder="Amount" />
                                     </div>
                                     <div className="col-span-4">
                                           <select value={charge.per} onChange={e => {
                                             const up = [...additionalCharges]; up[idx].per = e.target.value; setAdditionalCharges(up);
                                           }} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-3 text-[10px] font-black outline-none">
                                              <option>Month</option><option>Day</option><option>One-time</option>
                                           </select>
                                     </div>
                                     <div className="col-span-1 pb-1 text-right">
                                        <button onClick={() => setAdditionalCharges(prev => prev.filter((_, i) => i !== idx))} className="p-2.5 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all">
                                           <Trash2 className="w-4 h-4" />
                                        </button>
                                     </div>
                                  </div>
                                ))}
                                <button onClick={() => setAdditionalCharges([...additionalCharges, { name: "", amount: "", per: "Month" }])} className="text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-all">
                                   <Plus className="w-3.5 h-3.5" /> Add Another Charge
                                </button>
                             </div>
                          </div>

                          {/* Right: Preview Card */}
                          <div className="col-span-4">
                             <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-50">
                                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Pricing Preview <span className="normal-case font-bold text-slate-300 ml-1">(Per Month)</span></h4>
                                <div className="space-y-5">
                                   {roomTypes.length > 0 ? roomTypes.map((r, i) => (
                                     <div key={i} className="flex justify-between items-start">
                                        <div>
                                           <p className="text-[10px] font-black text-slate-800 tracking-tight">{r.type || "Untitled Room"}</p>
                                           <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{r.totalRooms || 0} Rooms • {r.totalBeds || 0} Beds</p>
                                        </div>
                                        <p className="text-[10px] font-black text-slate-800 tracking-tighter">₹{r.pricePerBed || 0}<span className="text-[7px] text-slate-400 ml-0.5">/bed</span></p>
                                     </div>
                                   )) : (
                                     <div className="py-4 text-center">
                                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Add room types to see pricing</p>
                                     </div>
                                   )}
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100">
                                   <p className="text-[8px] font-bold text-slate-400 uppercase leading-relaxed">
                                      Price may vary based on selected additional charges.
                                   </p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Cancellation & Description */}
                    <div className="pt-12 border-t border-slate-50 grid grid-cols-12 gap-10">
                       <div className="col-span-4">
                          <label className="text-[10px] font-black text-slate-800 uppercase mb-4 block tracking-tight">Cancellation Policy</label>
                          <div className="space-y-4">
                             <select value={cancellationPolicy} onChange={e => setCancellationPolicy(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-[10px] font-black outline-none">
                                <option>Moderate</option><option>Strict</option><option>Flexible</option>
                             </select>
                             <button className="text-[8px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Policy Details</button>
                          </div>
                       </div>
                       <div className="col-span-8">
                          <label className="text-[10px] font-black text-slate-800 uppercase mb-4 block tracking-tight">Property Description for Tenants <span className="normal-case font-bold text-slate-300 ml-1">(Optional)</span></label>
                          <div className="relative">
                             <textarea rows={4} value={tenantDescription} onChange={e => setTenantDescription(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-blue-200 transition-all resize-none" placeholder="e.g. A comfortable and secure stay with all essential amenities..." />
                             <div className="absolute bottom-4 right-5 text-[8px] font-black text-slate-300 uppercase tracking-widest">
                                {tenantDescription.length}/500 characters
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>

               {/* Step Footer Buttons */}
               <div className="flex items-center justify-between pt-4">
                  <button onClick={() => setStep(4)} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                     <ChevronLeft className="w-4 h-4" /> Back: Photos & Videos
                  </button>
                  <button onClick={() => setStep(6)} className="flex items-center gap-2 px-10 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                     Next: Review & Submit <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
            </div>
          )}

          {step === 6 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="grid grid-cols-12 gap-8">
                  {/* Left: Summary Details */}
                  <div className="col-span-8 space-y-8">
                     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-50">
                          <div>
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Review & Submit</h2>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Review all the details before submitting your property for listing.</p>
                          </div>
                          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl border border-emerald-100">
                             <CheckCircle2 className="w-4 h-4" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Ready to Publish</span>
                          </div>
                        </div>

                        <div className="space-y-12">
                           <div className="grid grid-cols-2 gap-12">
                              <section>
                                 <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">1. Basic Details</h3>
                                    <button onClick={() => setStep(1)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit</button>
                                 </div>
                                 <div className="space-y-4 bg-slate-50/50 rounded-2xl p-5 border border-slate-50">
                                    <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 uppercase">Property Name</span><span className="text-[10px] font-black text-slate-800 uppercase">{propertyName || "N/A"}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 uppercase">Type</span><span className="text-[10px] font-black text-slate-800 uppercase">{propertyType}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 uppercase">Location</span><span className="text-[10px] font-black text-slate-800 uppercase text-right max-w-[200px]">{city}, {state}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 uppercase">Category</span><span className="text-[10px] font-black text-slate-800 uppercase">{propertyCategory}</span></div>
                                 </div>
                              </section>

                              <section>
                                 <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">2. Property Details</h3>
                                    <button onClick={() => setStep(2)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit</button>
                                 </div>
                                 <div className="space-y-4 bg-slate-50/50 rounded-2xl p-5 border border-slate-50">
                                    <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 uppercase">Total Area</span><span className="text-[10px] font-black text-slate-800 uppercase">{totalArea} Sq.ft</span></div>
                                    <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 uppercase">Gender Preference</span><span className="text-[10px] font-black text-slate-800 uppercase">{genderPref}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 uppercase">Room Types</span><span className="text-[10px] font-black text-slate-800 uppercase">{roomTypes.length} types</span></div>
                                    <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 uppercase">Total Floors</span><span className="text-[10px] font-black text-slate-800 uppercase">{floors}</span></div>
                                 </div>
                              </section>
                           </div>

                           <section>
                              <div className="flex items-center justify-between mb-4">
                                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">3. Amenities</h3>
                                 <button onClick={() => setStep(3)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit</button>
                              </div>
                              <div className="flex flex-wrap gap-2.5 bg-slate-50/50 rounded-2xl p-6 border border-slate-50">
                                 {Array.from(selectedAmenities).length > 0 ? Array.from(selectedAmenities).map(a => (
                                   <span key={a} className="bg-white border border-slate-100 px-3.5 py-1.5 rounded-xl text-[9px] font-black text-slate-600 uppercase tracking-tight shadow-sm">{a}</span>
                                 )) : (
                                   <p className="text-[10px] font-bold text-slate-400 uppercase italic">No amenities selected</p>
                                 )}
                              </div>
                           </section>

                           <section>
                              <div className="flex items-center justify-between mb-4">
                                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">4. Photos & Videos</h3>
                                 <button onClick={() => setStep(4)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit</button>
                              </div>
                              <div className="grid grid-cols-6 gap-3 bg-slate-50/50 rounded-2xl p-5 border border-slate-50">
                                 {[1,2,3,4,5,6].map(i => (
                                   <div key={i} className="aspect-square rounded-xl bg-white border border-slate-100 overflow-hidden shadow-sm">
                                      <img src={`https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=200`} className="w-full h-full object-cover" />
                                   </div>
                                 ))}
                              </div>
                           </section>

                           <section>
                              <div className="flex items-center justify-between mb-4">
                                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">5. Policies & Pricing</h3>
                                 <button onClick={() => setStep(5)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit</button>
                              </div>
                              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-50 space-y-6">
                                 <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">House Rules</p>
                                       <div className="flex flex-wrap gap-x-6 gap-y-2">
                                          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /><span className="text-[9px] font-black text-slate-700 uppercase">Smoking: {houseRules.smokingAllowed}</span></div>
                                          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /><span className="text-[9px] font-black text-slate-700 uppercase">Pets: {houseRules.petsAllowed}</span></div>
                                          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /><span className="text-[9px] font-black text-slate-700 uppercase">Visitors: {houseRules.visitorsAllowed}</span></div>
                                       </div>
                                    </div>
                                    <div className="space-y-3">
                                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Policies</p>
                                       <div className="flex flex-wrap gap-x-6 gap-y-2">
                                          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-[9px] font-black text-slate-700 uppercase">Cancellation: {cancellationPolicy}</span></div>
                                          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-[9px] font-black text-slate-700 uppercase">Lock-in: {pricing.lockInPeriod} Months</span></div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </section>
                        </div>
                     </div>
                  </div>

                  {/* Right: Publish Actions */}
                  <div className="col-span-4 space-y-6">
                     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-50">
                           <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-blue-600" />
                           </div>
                           <div>
                              <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Listing Overview</h3>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Property ID: #RMH-2024-001</p>
                           </div>
                        </div>

                        <div className="space-y-5">
                           <div className="flex justify-between items-center">
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Total Rooms</span>
                              <span className="text-[10px] font-black text-slate-800 uppercase">{roomTypes.reduce((acc, r) => acc + (parseInt(r.totalRooms) || 0), 0)} Rooms</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Total Beds</span>
                              <span className="text-[10px] font-black text-slate-800 uppercase">{roomTypes.reduce((acc, r) => acc + (parseInt(r.totalBeds) || 0), 0)} Beds</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Price Starts From</span>
                              <span className="text-[11px] font-black text-blue-600 uppercase">₹{Math.min(...roomTypes.map(r => parseInt(r.pricePerBed) || 0), 0)}/bed</span>
                           </div>
                        </div>

                        <div className="mt-10 space-y-3">
                           <button onClick={handleSubmit} disabled={submitting} className="w-full bg-blue-600 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                              {submitting ? "Publishing..." : "Publish Listing"} <ChevronRight className="w-4 h-4" />
                           </button>
                           <p className="text-[8px] font-bold text-slate-400 text-center uppercase tracking-tight">By publishing, you agree to our terms & conditions.</p>
                        </div>
                     </div>

                     <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                           <ShieldCheck className="w-4 h-4 text-amber-600" />
                           <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Quality Check</h4>
                        </div>
                        <ul className="space-y-3">
                           {[
                             "All mandatory fields are filled",
                             "High resolution photos uploaded",
                             "Accurate location coordinates",
                             "Transparent pricing details"
                           ].map((item, i) => (
                             <li key={i} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-3 h-3 text-amber-600 mt-0.5" />
                                <p className="text-[9px] font-black text-amber-700/70 uppercase tracking-tight">{item}</p>
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar Info Optimized */}
        {step !== 6 && (
        <div className="col-span-3 space-y-6">
           {/* Tips for better listing */}
           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-blue-600" />
                 </div>
                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Tips for better listing</h3>
              </div>
              <ul className="space-y-4">
                 {[
                   "Set clear house rules and policies",
                   "Mention all charges upfront",
                   "Provide accurate pricing for each room type",
                   "Clear policies build trust and reduce conflicts",
                   "More details = Higher visibility & bookings"
                 ].map((tip, i) => (
                   <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                         <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      </div>
                      <p className="text-[9px] font-black text-slate-500 leading-relaxed uppercase tracking-tight">{tip}</p>
                   </li>
                 ))}
              </ul>

              {/* Room Summary Integration */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                 <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-6">Room Summary</h3>
                 <div className="space-y-5">
                    {roomTypes.length > 0 ? (
                      <>
                       {roomTypes.map((r, i) => (
                         <div key={i} className="flex justify-between items-start animate-in slide-in-from-right-4 duration-300">
                            <div>
                               <p className="text-[10px] font-black text-slate-800 tracking-tight">{r.type || "Untitled Room"}</p>
                               <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{r.totalRooms || 0} Rooms • {r.totalBeds || 0} Beds</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-black text-slate-800 tracking-tighter">₹{r.pricePerBed || 0}/bed</p>
                               <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest">₹{r.pricePerRoom || 0}/room</p>
                            </div>
                         </div>
                       ))}
                       <div className="pt-5 border-t border-slate-100 flex justify-between items-center">
                          <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Total</p>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                             {roomTypes.reduce((acc, r) => acc + (parseInt(r.totalRooms) || 0), 0)} Rooms • {roomTypes.reduce((acc, r) => acc + (parseInt(r.totalBeds) || 0), 0)} Beds
                          </p>
                       </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-100">
                         <div className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Live Summary</div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">0 Rooms • 0 Beds</div>
                      </div>
                    )}
                 </div>
               </div>

              {/* Pricing Note Section */}
              <div className="mt-8 bg-amber-50/50 border border-amber-100 rounded-2xl p-6 relative overflow-hidden">
                 <div className="absolute -top-2 -right-2 p-4 opacity-5">
                    <Building2 className="w-16 h-16 text-amber-600" />
                 </div>
                 <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded bg-amber-100 flex items-center justify-center">
                       <Info className="w-3 h-3 text-amber-600" />
                    </div>
                    <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Note</h4>
                 </div>
                 <ul className="space-y-2.5">
                    <li className="flex gap-2">
                       <div className="w-1 h-1 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                       <p className="text-[9px] font-black text-amber-700/80 leading-relaxed uppercase tracking-tight">Prices entered are monthly base rent.</p>
                    </li>
                    <li className="flex gap-2">
                       <div className="w-1 h-1 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                       <p className="text-[9px] font-black text-amber-700/80 leading-relaxed uppercase tracking-tight">You can add food charges, security deposit, maintenance, and other fees in the next step.</p>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
        )}
      </div>
    </div>
  );  
}
