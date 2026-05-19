import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Calendar, Clock, CheckCircle2, ChevronRight, 
  MapPin, User, ChevronLeft
} from "lucide-react";

export default function MaintenanceCalendarPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [currentMonth, setCurrentMonth] = useState("May 2026");

  const routines = [
    { title: "Elevator Lift Servicing", time: "11:00 AM", date: "22 May 2026", staff: "Otis Engineer rep", status: "Upcoming" },
    { title: "Bi-Annual Water Tank Flush", time: "09:00 AM", date: "25 May 2026", staff: "Gupta Plumbers team", status: "Upcoming" },
    { title: "Pest Control & Spraying", time: "02:00 PM", date: "05 Jun 2026", staff: "Clean-Kill spray team", status: "Upcoming" }
  ];

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Routines Calendar" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Maintenance Calendar</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Plan and track periodic repairs, safety tests, and housekeeping routines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar View Mock */}
        <div className="lg:col-span-8 bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-[20px] text-foreground">{currentMonth}</h3>
            <div className="flex gap-2">
              <button className="p-2 border border-border rounded-xl hover:bg-muted/50">
                <ChevronLeft size={16} />
              </button>
              <button className="p-2 border border-border rounded-xl hover:bg-muted/50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-muted-foreground uppercase border-b border-border/60 pb-3 mb-3">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const hasRoutine = day === 22 || day === 25;
              return (
                <div 
                  key={i} 
                  className={`h-16 rounded-xl border flex flex-col justify-between p-2 transition-all ${
                    hasRoutine 
                      ? "border-blue-200 bg-blue-50/20" 
                      : "border-border/40 hover:bg-muted/20"
                  }`}
                >
                  <span className={`text-xs font-bold ${hasRoutine ? "text-blue-600" : "text-slate-500"}`}>{day}</span>
                  {hasRoutine && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 self-center mb-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-soft space-y-6">
            <h3 className="font-serif text-[18px] text-foreground">Upcoming Routines</h3>
            <div className="space-y-4">
              {routines.map((item, idx) => (
                <div key={idx} className="border border-border p-4 rounded-xl space-y-3 bg-muted/10">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[13px] font-bold text-slate-800 leading-snug">{item.title}</h4>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5"><Clock size={12} /> {item.date} at {item.time}</p>
                    <p className="flex items-center gap-1.5"><User size={12} /> {item.staff}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
