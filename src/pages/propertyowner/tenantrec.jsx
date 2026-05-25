import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight, ChevronLeft, Check, Upload, Plus, Trash2,
  MapPin, Building2, Users, Home, X,
  Zap, ShieldCheck, Loader2,
  CheckCircle2, Save, Info, Clock, User, Eye, LayoutGrid, Pencil, RefreshCw,
  Mail, Phone, Calendar, Fingerprint, Briefcase, Heart, MessageSquare, AlertCircle, ChevronDown
} from "lucide-react";
import { getApiBase, fetchJson } from "../../utils/api";
import { toast } from "react-hot-toast";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession, fetchOwnerProperties } from "../../utils/propertyowner";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const FormField = ({ label, value, onChange, placeholder, type = "text", suffix, prefix, className, list, required, error }) => (
  <div className={cn("flex flex-col", className)}>
    <label className="text-[10px] font-black text-slate-800 uppercase mb-3 block tracking-tight">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className={cn(
      "flex items-center bg-slate-50 border rounded-xl px-4 py-2.5 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 transition-all",
      error ? "border-rose-300 ring-4 ring-rose-500/5 bg-rose-50/30" : "border-slate-100 focus-within:border-blue-200"
    )}>
      {prefix && <span className="text-[10px] font-black text-slate-400 mr-2">{prefix}</span>}
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        list={list}
        className="w-full bg-transparent text-[11.5px] font-bold text-slate-800 outline-none placeholder:text-slate-300"
      />
      {suffix && <span className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-tight">{suffix}</span>}
    </div>
    {error && <span className="text-[8px] font-bold text-rose-500 mt-2 uppercase tracking-widest">{error}</span>}
  </div>
);

const FormSelect = ({ label, value, onChange, options, placeholder, className, required, error }) => (
  <div className={cn("flex flex-col", className)}>
    <label className="text-[10px] font-black text-slate-800 uppercase mb-3 block tracking-tight">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      <select 
        value={value} 
        onChange={onChange}
        className={cn(
          "w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-[11.5px] font-bold text-slate-800 outline-none transition-all appearance-none cursor-pointer",
          error ? "border-rose-300 bg-rose-50/30 ring-4 ring-rose-500/5" : "border-slate-100 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-500/5"
        )}
      >
        <option value="" disabled>{placeholder || `Select ${label}`}</option>
        {options.map((opt, i) => (
          <option key={i} value={typeof opt === 'object' ? opt.value : opt}>
            {typeof opt === 'object' ? opt.label : opt}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
    {error && <span className="text-[8px] font-bold text-rose-500 mt-2 uppercase tracking-widest">{error}</span>}
  </div>
);

const CustomDatePicker = ({ label, value, onChange, required, error, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 10 - i);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const handleDateChange = (type, val) => {
    const current = value ? value.split('-') : ["1995", "01", "01"];
    let [y, m, d] = current;
    if (type === 'y') y = val;
    if (type === 'm') m = val;
    if (type === 'd') d = val;
    onChange(`${y}-${m}-${d}`);
  };

  const selectedDate = value ? value.split('-') : ["", "", ""];

  return (
    <div className="flex flex-col relative">
      <label className="text-[10px] font-black text-slate-800 uppercase mb-3 block tracking-tight">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between bg-slate-50 border rounded-xl px-4 py-2.5 cursor-pointer transition-all",
          isOpen ? "bg-white border-blue-200 ring-4 ring-blue-500/5" : "border-slate-100 hover:bg-slate-100/50",
          error ? "border-rose-300 ring-4 ring-rose-500/5 bg-rose-50/30" : ""
        )}
      >
        <span className={cn("text-[11.5px] font-bold", value ? "text-slate-800" : "text-slate-300")}>
          {value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : placeholder}
        </span>
        <Calendar size={14} className="text-slate-400" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] p-4 animate-in">
          <div className="flex items-center justify-between mb-4 gap-2">
            <select 
              value={selectedDate[0]} 
              onChange={(e) => handleDateChange('y', e.target.value)}
              className="flex-1 bg-slate-50 border-none rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-700 outline-none"
            >
              <option value="">Year</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <select 
              value={selectedDate[1]} 
              onChange={(e) => handleDateChange('m', e.target.value)}
              className="flex-1 bg-slate-50 border-none rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-700 outline-none"
            >
              <option value="">Month</option>
              {months.map((m, i) => <option key={m} value={(i+1).toString().padStart(2, '0')}>{m}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => {
              const day = (i + 1).toString().padStart(2, '0');
              const isActive = selectedDate[2] === day;
              return (
                <button
                  key={i}
                  onClick={() => {
                    handleDateChange('d', day);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "h-7 rounded-lg text-[9px] font-bold transition-all",
                    isActive ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {isOpen && <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />}
      {error && <span className="text-[8px] font-bold text-rose-500 mt-2 uppercase tracking-widest">{error}</span>}
    </div>
  );
};

export default function TenantRec() {
  const navigate = useNavigate();
  const owner = getOwnerRuntimeSession();
  const apiUrl = getApiBase();

  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [submitting, setSubmitting] = useState(false);
  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState({});
  
  // Section 1: Basic Details
  const [basicDetails, setBasicDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    idProofType: "Aadhaar Card",
    idProofNumber: "",
    idProofFile: null
  });

  // Section 2: Room Assignment
  const [roomAssignment, setRoomAssignment] = useState({
    propertyId: "",
    building: "",
    floor: "",
    roomUnit: "",
    roomType: "",
    bed: "",
    rentAgreementType: "Standard"
  });

  // Section 3: Tenancy Details
  const [tenancyDetails, setTenancyDetails] = useState({
    rentAmount: "",
    depositAmount: "",
    moveInDate: "",
    minStay: "11",
    noticePeriod: "30",
    rentDueDate: "5th of every month",
    paymentFrequency: "Monthly",
    lateFee: ""
  });

  // Section 4: Additional Details
  const [additionalDetails, setAdditionalDetails] = useState({
    occupation: "",
    company: "",
    emergencyName: "",
    emergencyPhone: "",
    relationship: "",
    remarks: ""
  });

  const [confirmDetails, setConfirmDetails] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newTenant, setNewTenant] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pId = urlParams.get('propertyId');
    const room = urlParams.get('room');
    if (pId) {
      setRoomAssignment(prev => ({
        ...prev,
        propertyId: pId,
        ...(room ? { roomUnit: room } : {})
      }));
    }
  }, []);

  useEffect(() => {
    // Load properties for dropdown specifically belonging to the logged-in owner
    const loadProperties = async () => {
      try {
        const props = await fetchOwnerProperties(owner.loginId);
        setProperties(props);
        
        // Auto-select if there's only 1 property and none is selected via URL
        if (props && props.length === 1 && !roomAssignment.propertyId) {
          const urlParams = new URLSearchParams(window.location.search);
          if (!urlParams.get('propertyId')) {
            setRoomAssignment(prev => ({ ...prev, propertyId: props[0]._id }));
          }
        }
      } catch (err) {
        console.error("Failed to load properties:", err);
      }
    };
    loadProperties();
  }, [owner.loginId]);

  useEffect(() => {
    // Load rooms for selected property
    if (!roomAssignment.propertyId) {
      setRooms([]);
      return;
    }
    const loadRooms = async () => {
      try {
        const data = await fetchJson(`/api/rooms/property/${roomAssignment.propertyId}`);
        let roomList = [];
        if (Array.isArray(data)) {
          roomList = data;
        } else if (data && Array.isArray(data.rooms)) {
          roomList = data.rooms;
        }
        
        // Fallback generator
        if (roomList.length === 0) {
          const selectedProp = properties.find(p => p._id === roomAssignment.propertyId);
          if (selectedProp && Array.isArray(selectedProp.roomTypes)) {
            selectedProp.roomTypes.forEach(rt => {
              const count = parseInt(rt.totalRooms) || 0;
              for (let i = 1; i <= count; i++) {
                roomList.push({ 
                  _id: `${rt.type}-${i}`, 
                  title: `${rt.type} - Room ${i}`,
                  type: rt.type 
                });
              }
            });
          }
        }
        setRooms(roomList);
        
        // Auto-fill logic if a room is already selected via URL
        if (roomAssignment.roomUnit) {
          const selectedRoom = roomList.find(r => r.title === roomAssignment.roomUnit);
          if (selectedRoom) {
            setRoomAssignment(prev => ({
              ...prev,
              roomType: selectedRoom.type || prev.roomType,
              floor: selectedRoom.floor || prev.floor
            }));
            if (selectedRoom.price) {
              setTenancyDetails(prev => ({
                ...prev,
                rentAmount: selectedRoom.price.toString()
              }));
            }
          }
        }
      } catch (err) {
        console.error("Failed to load rooms:", err);
        setRooms([]);
      }
    };
    loadRooms();
  }, [roomAssignment.propertyId, properties]);

  const validateForm = () => {
    const newErrors = {};
    if (!basicDetails.fullName) newErrors.fullName = "Name is required";
    if (!basicDetails.email) newErrors.email = "Email is required";
    if (!basicDetails.phone) newErrors.phone = "Phone is required";
    if (!basicDetails.dob) newErrors.dob = "Date of Birth is required";
    if (!basicDetails.gender) newErrors.gender = "Gender is required";
    if (!basicDetails.idProofNumber) newErrors.idProofNumber = "ID Proof No is required";
    if (!basicDetails.idProofFile) newErrors.idProofFile = "Proof upload is required";

    if (!roomAssignment.propertyId) newErrors.propertyId = "Property is required";
    if (!roomAssignment.building) newErrors.building = "Building/Block is required";
    if (!roomAssignment.floor) newErrors.floor = "Floor is required";
    if (!roomAssignment.roomUnit) newErrors.roomUnit = "Room is required";
    if (!roomAssignment.rentAgreementType) newErrors.rentAgreementType = "Agreement type is required";

    if (!tenancyDetails.rentAmount) newErrors.rentAmount = "Rent is required";
    if (!tenancyDetails.depositAmount) newErrors.depositAmount = "Deposit is required";
    if (!tenancyDetails.moveInDate) newErrors.moveInDate = "Move-in date is required";
    if (!tenancyDetails.paymentFrequency) newErrors.paymentFrequency = "Payment frequency is required";

    if (!additionalDetails.emergencyName) newErrors.emergencyName = "Emergency name is required";
    if (!additionalDetails.emergencyPhone) newErrors.emergencyPhone = "Emergency phone is required";
    if (!additionalDetails.relationship) newErrors.relationship = "Relationship is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
    if (!confirmDetails) {
      toast.error("Please confirm the details are correct.");
      return;
    }
    
    setSubmitting(true);
    try {
      const payload = {
        name: basicDetails.fullName,
        email: basicDetails.email,
        phone: basicDetails.phone,
        propertyId: roomAssignment.propertyId,
        roomNo: roomAssignment.roomUnit,
        bedNo: roomAssignment.bed,
        moveInDate: tenancyDetails.moveInDate,
        agreedRent: tenancyDetails.rentAmount,
        securityDepositTotal: tenancyDetails.depositAmount,
        securityDepositPaid: 0,
        dob: basicDetails.dob,
        gender: basicDetails.gender,
        building: roomAssignment.building,
        floor: roomAssignment.floor,
        rentAgreementType: roomAssignment.rentAgreementType,
        paymentFrequency: tenancyDetails.paymentFrequency,
        idProof: {
          type: basicDetails.idProofType,
          number: basicDetails.idProofNumber,
          file: basicDetails.idProofFile
        },
        additional: additionalDetails,
        status: "pending"
      };

      const res = await fetch(`${apiUrl}/api/tenants/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok) {
        setNewTenant(json.tenant);
        setShowSuccess(true);
        toast.success("Tenant Onboarded Successfully!");
      } else {
        toast.error(json.message || "Failed to onboard tenant");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while adding tenant");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const loadingToast = toast.loading("Uploading ID Proof...");
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: data });
      const json = await res.json();
      if (json.url) {
        setBasicDetails({ ...basicDetails, idProofFile: json.url });
        toast.success("ID Proof uploaded!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Add Tenant" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 pb-4 border-b border-border">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Add New Tenant</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Register details, assign beds and trigger automatic E-KYC verification.</p>
        </div>
        <div className="flex items-center gap-3 md:mt-2">
          <button onClick={() => navigate(-1)} className="px-5 h-11 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={submitting}
            className="px-5 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10"
          >
            {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save & Onboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Sections */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1 */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-6">
            <h3 className="font-serif text-[20px] text-slate-800 flex items-center gap-2">
              <User size={18} className="text-primary" />
              1. Resident Personal Profile
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField 
                label="Full Name" 
                required
                value={basicDetails.fullName}
                onChange={e => setBasicDetails({...basicDetails, fullName: e.target.value})}
                placeholder="Enter full name"
                error={errors.fullName}
              />
              <FormField 
                label="Email Address" 
                required
                value={basicDetails.email}
                onChange={e => setBasicDetails({...basicDetails, email: e.target.value})}
                placeholder="Enter email address"
                type="email"
                error={errors.email}
              />
              <FormField 
                label="Phone Number" 
                required
                value={basicDetails.phone}
                onChange={e => setBasicDetails({...basicDetails, phone: e.target.value})}
                placeholder="Enter phone number"
                prefix="+91"
                error={errors.phone}
              />
              <CustomDatePicker 
                label="Date of Birth" 
                required
                value={basicDetails.dob}
                onChange={val => setBasicDetails({...basicDetails, dob: val})}
                placeholder="Select date of birth"
                error={errors.dob}
              />
              <FormSelect 
                label="Gender" 
                required
                value={basicDetails.gender}
                onChange={e => setBasicDetails({...basicDetails, gender: e.target.value})}
                options={["Male", "Female", "Other"]}
                placeholder="Select gender"
                error={errors.gender}
              />
              <FormSelect 
                label="ID Proof Type" 
                required
                value={basicDetails.idProofType}
                onChange={e => setBasicDetails({...basicDetails, idProofType: e.target.value})}
                options={["Aadhaar Card", "PAN Card", "Voter ID", "Driving License", "Passport"]}
              />
              <FormField 
                label="ID Proof Number" 
                required
                value={basicDetails.idProofNumber}
                onChange={e => setBasicDetails({...basicDetails, idProofNumber: e.target.value})}
                placeholder="Enter ID proof number"
                error={errors.idProofNumber}
              />
              <div className="sm:col-span-2">
                <label className="text-[10px] font-black text-slate-800 uppercase mb-3 block tracking-tight">
                  Upload ID Proof File <span className="text-rose-500">*</span>
                </label>
                <div className={cn("relative group rounded-2xl", errors.idProofFile && "ring-4 ring-rose-500/5")}>
                  <input 
                    type="file" 
                    id="id-proof-upload-owner"
                    className="hidden" 
                    onChange={handlePhotoUpload}
                    accept="image/*,.pdf"
                  />
                  <label 
                    htmlFor="id-proof-upload-owner"
                    className={cn(
                      "w-full h-24 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-muted/10",
                      errors.idProofFile ? "border-rose-300 bg-rose-50/30" : "border-border hover:border-primary/40"
                    )}
                  >
                    {basicDetails.idProofFile ? (
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        <span className="text-[11.5px] font-bold text-slate-600">ID Proof Uploaded Successfully</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                        <div className="text-center">
                          <p className="text-[10px] font-black text-slate-600 uppercase">Click to upload document</p>
                          <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">PNG, JPG, PDF up to 5MB</p>
                        </div>
                      </>
                    )}
                  </label>
                </div>
                {errors.idProofFile && <span className="text-[8px] font-bold text-rose-500 mt-2 uppercase tracking-widest block">{errors.idProofFile}</span>}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-6">
            <h3 className="font-serif text-[20px] text-slate-800 flex items-center gap-2">
              <Home size={18} className="text-primary" />
              2. Room & Bed Allocation
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <FormSelect 
                label="Property" 
                required
                value={roomAssignment.propertyId}
                onChange={e => setRoomAssignment({...roomAssignment, propertyId: e.target.value})}
                options={properties.map(p => ({ label: p.title, value: p._id }))}
                placeholder="Select property"
                error={errors.propertyId}
              />
              <FormField 
                label="Building / Block" 
                required
                value={roomAssignment.building}
                onChange={e => setRoomAssignment({...roomAssignment, building: e.target.value})}
                placeholder="Select building"
                error={errors.building}
              />
              <FormField 
                label="Floor" 
                required
                value={roomAssignment.floor}
                onChange={e => setRoomAssignment({...roomAssignment, floor: e.target.value})}
                placeholder="Select floor"
                error={errors.floor}
              />
              <FormSelect 
                label="Room / Unit" 
                required
                value={roomAssignment.roomUnit}
                onChange={e => {
                  const selectedTitle = e.target.value;
                  const selectedRoom = rooms.find(r => r.title === selectedTitle);
                  
                  setRoomAssignment(prev => ({
                    ...prev,
                    roomUnit: selectedTitle,
                    roomType: selectedRoom?.type || prev.roomType,
                    floor: selectedRoom?.floor || prev.floor
                  }));

                  if (selectedRoom?.price) {
                    setTenancyDetails(prev => ({
                      ...prev,
                      rentAmount: selectedRoom.price.toString()
                    }));
                  }
                }}
                options={
                  roomAssignment.propertyId && rooms.length === 0 
                    ? [{ label: "No rooms available", value: "" }] 
                    : rooms.map(r => ({ label: r.title, value: r.title }))
                }
                placeholder={roomAssignment.propertyId ? "Select room" : "Select property first"}
                error={errors.roomUnit}
              />
              <FormSelect 
                label="Room Type" 
                value={roomAssignment.roomType}
                onChange={e => setRoomAssignment({...roomAssignment, roomType: e.target.value})}
                options={(() => {
                  const selectedProp = properties.find(p => p._id === roomAssignment.propertyId);
                  if (selectedProp && Array.isArray(selectedProp.roomTypes)) {
                    return selectedProp.roomTypes.map(rt => ({ label: rt.type, value: rt.type }));
                  }
                  return ["AC", "Non-AC", "Single", "Double", "Triple"];
                })()}
                placeholder="Select room type"
              />
              <FormField 
                label="Bed" 
                value={roomAssignment.bed}
                onChange={e => setRoomAssignment({...roomAssignment, bed: e.target.value})}
                placeholder="Select bed"
              />
              <FormSelect 
                label="Rent Agreement Type" 
                required
                value={roomAssignment.rentAgreementType}
                onChange={e => setRoomAssignment({...roomAssignment, rentAgreementType: e.target.value})}
                options={["Standard", "Short Term", "Long Term", "Custom"]}
                error={errors.rentAgreementType}
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-6">
            <h3 className="font-serif text-[20px] text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-primary" />
              3. Stay & Billing Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <FormField 
                label="Rent Amount (₹)" 
                required
                value={tenancyDetails.rentAmount}
                onChange={e => setTenancyDetails({...tenancyDetails, rentAmount: e.target.value})}
                placeholder="Enter rent amount"
                type="number"
                error={errors.rentAmount}
              />
              <FormField 
                label="Deposit Amount (₹)" 
                required
                value={tenancyDetails.depositAmount}
                onChange={e => setTenancyDetails({...tenancyDetails, depositAmount: e.target.value})}
                placeholder="Enter deposit amount"
                type="number"
                error={errors.depositAmount}
              />
              <FormField 
                label="Move-in Date" 
                required
                value={tenancyDetails.moveInDate}
                onChange={e => setTenancyDetails({...tenancyDetails, moveInDate: e.target.value})}
                type="date"
                error={errors.moveInDate}
              />
              <FormField 
                label="Minimum Stay (Months)" 
                required
                value={tenancyDetails.minStay}
                onChange={e => setTenancyDetails({...tenancyDetails, minStay: e.target.value})}
                placeholder="Enter minimum stay"
                type="number"
              />
              <FormField 
                label="Notice Period (Days)" 
                required
                value={tenancyDetails.noticePeriod}
                onChange={e => setTenancyDetails({...tenancyDetails, noticePeriod: e.target.value})}
                placeholder="Enter notice period"
                type="number"
              />
              <FormField 
                label="Rent Due Date" 
                value={tenancyDetails.rentDueDate}
                onChange={e => setTenancyDetails({...tenancyDetails, rentDueDate: e.target.value})}
                placeholder="e.g. 5th of every month"
              />
              <FormSelect 
                label="Payment Frequency" 
                required
                value={tenancyDetails.paymentFrequency}
                onChange={e => setTenancyDetails({...tenancyDetails, paymentFrequency: e.target.value})}
                options={["Monthly", "Quarterly", "Semi-Annually", "Annually"]}
                error={errors.paymentFrequency}
              />
              <FormField 
                label="Late Fee (₹)" 
                value={tenancyDetails.lateFee}
                onChange={e => setTenancyDetails({...tenancyDetails, lateFee: e.target.value})}
                placeholder="Enter late fee (optional)"
                type="number"
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-6">
            <h3 className="font-serif text-[20px] text-slate-800 flex items-center gap-2">
              <Briefcase size={18} className="text-primary" />
              4. Occupation & Emergencies
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField 
                label="Occupation" 
                value={additionalDetails.occupation}
                onChange={e => setAdditionalDetails({...additionalDetails, occupation: e.target.value})}
                placeholder="Enter occupation"
              />
              <FormField 
                label="Company / Organization" 
                value={additionalDetails.company}
                onChange={e => setAdditionalDetails({...additionalDetails, company: e.target.value})}
                placeholder="Enter company name"
              />
              <FormField 
                label="Emergency Contact Name" 
                required
                value={additionalDetails.emergencyName}
                onChange={e => setAdditionalDetails({...additionalDetails, emergencyName: e.target.value})}
                placeholder="Enter contact name"
                error={errors.emergencyName}
              />
              <FormField 
                label="Emergency Contact Number" 
                required
                value={additionalDetails.emergencyPhone}
                onChange={e => setAdditionalDetails({...additionalDetails, emergencyPhone: e.target.value})}
                placeholder="Enter phone number"
                prefix="+91"
                error={errors.emergencyPhone}
              />
              <FormField 
                label="Relationship" 
                required
                value={additionalDetails.relationship}
                onChange={e => setAdditionalDetails({...additionalDetails, relationship: e.target.value})}
                placeholder="Select relationship"
                error={errors.relationship}
              />
              <div className="sm:col-span-3">
                <label className="text-[10px] font-black text-slate-800 uppercase mb-3 block tracking-tight">Remarks (Optional)</label>
                <textarea 
                  value={additionalDetails.remarks}
                  onChange={e => setAdditionalDetails({...additionalDetails, remarks: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[11.5px] font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-200 transition-all h-24 resize-none"
                  placeholder="Enter remarks..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
             <div 
               onClick={() => setConfirmDetails(!confirmDetails)}
               className={cn(
                 "w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all",
                 confirmDetails ? "bg-slate-900 border-slate-900 shadow-md" : "bg-white border-slate-200"
               )}
             >
               {confirmDetails && <Check className="w-3.5 h-3.5 text-white" />}
             </div>
             <p className="text-[10px] font-black text-slate-700 uppercase tracking-tight">I confirm the above details are correct.</p>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6 sticky top-24">
            <h3 className="font-serif text-[18px] text-foreground">Onboarding Timeline</h3>
            <div className="space-y-6">
              {[
                { step: 1, title: "Personal Details & Room", sub: "Add tenant details, assign room and tenancy information.", status: "In Progress" },
                { step: 2, title: "E-KYC Verification", sub: "An E-KYC link will be sent to the tenant's email and phone.", status: "Pending" },
                { step: 3, title: "E-Sign Agreement", sub: "After successful KYC, rental agreement link will be sent for e-sign.", status: "Pending" },
                { step: 4, title: "Tenant Added", sub: "Tenant will be added after agreement is signed successfully.", status: "Pending" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 relative group">
                  {i !== 3 && <div className="absolute left-[11px] top-6 bottom-[-20px] w-[2px] bg-slate-100 group-last:hidden" />}
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 relative z-10",
                    item.status === "In Progress" ? "bg-slate-900 text-white ring-4 ring-slate-100" : "bg-slate-100 text-slate-400"
                  )}>
                    {item.step}
                  </div>
                  <div>
                    <h4 className={cn("text-[10px] font-black uppercase tracking-tight mb-1", item.status === "In Progress" ? "text-slate-800" : "text-slate-400")}>{item.title}</h4>
                    <p className="text-[9.5px] font-bold text-slate-400 leading-normal max-w-[200px]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && newTenant && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => navigate("/propertyowner/tenants")} />
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Tenant Added Successfully!</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Onboarding link and credentials generated</p>
              
              <div className="w-full space-y-4 mb-8">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Login Credentials</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Login ID</span>
                      <span className="text-[11px] font-black text-blue-600">{newTenant.loginId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Password</span>
                      <span className="text-[11px] font-black text-slate-800">{newTenant.tempPassword}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate("/propertyowner/tenants")}
                className="w-full py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all"
              >
                Go to Tenant List
              </button>
            </div>
          </div>
        </div>
      )}
    </PropertyOwnerLayout>
  );
}
