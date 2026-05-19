import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Clock, Search, Plus, Trash2, Edit3, 
  CheckCircle2, AlertCircle, ChevronRight
} from "lucide-react";

export default function ShiftManagementPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [shifts, setShifts] = useState([
    { id: 1, name: "Day Shift", hours: "09:00 AM - 06:00 PM", staffCount: 4, days: "Mon - Sat" },
    { id: 2, name: "Night Shift", hours: "08:00 PM - 08:00 AM", staffCount: 2, days: "Mon - Sun" },
    { id: 3, name: "Cleaning Shift", hours: "07:00 AM - 12:00 PM", staffCount: 3, days: "Mon - Sat" }
  ]);

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Roster Management" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Shift Management</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Configure property roster, shift timings, weekly offs, and assign personnel to active shifts.</p>
        </div>
      </div>

      {/* Grid of Shifts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.map((shift) => (
          <div key={shift.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                  {shift.days}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{shift.name}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">{shift.hours}</p>
              </div>

              <div className="border-t border-border/60 pt-4 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Staff Members Roster:</span>
                  <span className="font-bold text-slate-800">{shift.staffCount} Members</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
