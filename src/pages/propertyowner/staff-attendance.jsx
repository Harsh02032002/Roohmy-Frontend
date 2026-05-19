import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  CalendarCheck, Search, Check, X, 
  Clock, AlertCircle, Sparkles
} from "lucide-react";

export default function StaffAttendancePage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState([
    { id: 1, name: "Suresh Kumar", role: "Electrician", status: "Present", inTime: "08:58 AM", outTime: "--" },
    { id: 2, name: "Ramesh Dev", role: "Plumber", status: "Present", inTime: "09:05 AM", outTime: "--" },
    { id: 3, name: "Deepak Rawat", role: "Security Guard", status: "Absent", inTime: "--", outTime: "--" }
  ]);

  const handleToggleStatus = (id, newStatus) => {
    setAttendance(prev => prev.map(a => a.id === id ? { 
      ...a, 
      status: newStatus,
      inTime: newStatus === "Present" ? "09:00 AM" : "--"
    } : a));
  };

  const filteredAttendance = attendance.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Staff Logs" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Staff Attendance</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Monitor daily check-in timestamps, off-duty logs, and manual attendance corrections.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff members by name or role..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11.5px] uppercase tracking-wider text-muted-foreground bg-muted/50">
                <th className="px-6 py-3.5 font-semibold">Staff Member</th>
                <th className="px-6 py-3.5 font-semibold">Role</th>
                <th className="px-6 py-3.5 font-semibold">In Time</th>
                <th className="px-6 py-3.5 font-semibold">Out Time</th>
                <th className="px-6 py-3.5 font-semibold">Attendance State</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAttendance.map((a) => (
                <tr key={a.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">{a.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{a.role}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{a.inTime}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{a.outTime}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      a.status === "Present" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {a.status !== "Present" ? (
                      <button 
                        onClick={() => handleToggleStatus(a.id, "Present")}
                        className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                      >
                        Mark Present
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleToggleStatus(a.id, "Absent")}
                        className="h-8 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                      >
                        Mark Absent
                      </button>
                    )}
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
