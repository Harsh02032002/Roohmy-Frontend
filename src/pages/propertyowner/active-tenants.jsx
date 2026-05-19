import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Users, Search, ShieldCheck, Mail, Phone, ExternalLink, 
  MapPin, CheckCircle, Clock, AlertTriangle
} from "lucide-react";

export default function ActiveTenantsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");

  const activeTenantsData = [
    { id: 1, name: "Amit Sharma", room: "101", bed: "A", joinDate: "15 Jan 2026", phone: "+91 98765 43210", email: "amit.sharma@gmail.com", kyc: "Verified", rentStatus: "Paid" },
    { id: 2, name: "Vijay Kumar", room: "101", bed: "B", joinDate: "10 Feb 2026", phone: "+91 98765 11223", email: "vijay.k@outlook.com", kyc: "Verified", rentStatus: "Paid" },
    { id: 3, name: "Rajesh Gupta", room: "102", bed: "A", joinDate: "01 Mar 2026", phone: "+91 99887 76655", email: "rajesh.gupta@yahoo.com", kyc: "Pending", rentStatus: "Paid" },
    { id: 4, name: "Sanjay Dutt", room: "103", bed: "A", joinDate: "12 Apr 2026", phone: "+91 95432 10987", email: "sanjay.dutt@gmail.com", kyc: "Verified", rentStatus: "Paid" },
    { id: 5, name: "Rahul Varma", room: "201", bed: "A", joinDate: "20 Apr 2026", phone: "+91 91234 56789", email: "rahul.varma@gmail.com", kyc: "Verified", rentStatus: "Paid" },
    { id: 6, name: "Karan Johar", room: "201", bed: "B", joinDate: "05 May 2026", phone: "+91 92345 67890", email: "karan.j@gmail.com", kyc: "Verified", rentStatus: "Paid" }
  ];

  const filteredTenants = activeTenantsData.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.room.includes(search) ||
    t.phone.includes(search)
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Active Tenants" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Active Tenants</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Comprehensive list of currently residing tenants, including contact info, KYC verification status, and move-in timelines.</p>
        </div>
      </div>

      {/* Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Active Residents</span>
          <h3 className="text-[28px] font-bold text-foreground mt-1">{activeTenantsData.length} <span className="text-sm font-normal text-muted-foreground">Tenants</span></h3>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">KYC Compliance</span>
          <h3 className="text-[28px] font-bold text-emerald-600 mt-1">92% <span className="text-sm font-normal text-muted-foreground">Verified</span></h3>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Occupied Rooms</span>
          <h3 className="text-[28px] font-bold text-blue-600 mt-1">12 <span className="text-sm font-normal text-muted-foreground">Rooms</span></h3>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Average Duration</span>
          <h3 className="text-[28px] font-bold text-foreground mt-1">8.5 <span className="text-sm font-normal text-muted-foreground">Months</span></h3>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name, Room Number or Mobile Number..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Active Tenants List Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Tenant Name</th>
                <th className="px-6 py-3.5 font-semibold">Room & Bed</th>
                <th className="px-6 py-3.5 font-semibold">Join Date</th>
                <th className="px-6 py-3.5 font-semibold">Contact Info</th>
                <th className="px-6 py-3.5 font-semibold">KYC Verification</th>
                <th className="px-6 py-3.5 font-semibold">Rent Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTenants.map((t) => (
                <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">Room {t.room}</div>
                    <div className="text-[11px] text-muted-foreground">Bed {t.bed}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{t.joinDate}</td>
                  <td className="px-6 py-4 space-y-0.5">
                    <div className="text-[12px] font-medium text-foreground flex items-center gap-1">
                      <Phone size={12} className="text-muted-foreground/60" /> {t.phone}
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Mail size={12} className="text-muted-foreground/60" /> {t.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      t.kyc === "Verified" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {t.kyc}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {t.rentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
