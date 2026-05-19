import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Wrench, Search, Plus, Trash2, Edit3, 
  CheckCircle2, AlertCircle, Calendar
} from "lucide-react";

export default function MaintenanceRequestsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Water Tank Cleaning", frequency: "Bi-Annually", scheduledDate: "25 May 2026", staff: "Gupta Plumbing Services", status: "Scheduled" },
    { id: 2, title: "Elevator Lift Servicing", frequency: "Monthly", scheduledDate: "28 May 2026", staff: "Otis Lift Engineers", status: "Scheduled" },
    { id: 3, title: "Pest Control & Spraying", frequency: "Quarterly", scheduledDate: "05 Jun 2026", staff: "Clean-Kill Pest Control", status: "Scheduled" }
  ]);

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.staff.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Asset Maintenance" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Maintenance Tasks</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Manage periodic property operations, water tank cleaning schedules, and elevator lift services.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search maintenance items by title or provider..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of Maintenance items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Wrench size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  {t.frequency}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{t.title}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-1">Vendor/Rep: <strong className="text-foreground">{t.staff}</strong></p>
              </div>

              <div className="border-t border-border/60 pt-4 flex justify-between items-center text-xs text-muted-foreground">
                <span>Next Scheduled date:</span>
                <span className="font-bold text-slate-800">{t.scheduledDate}</span>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
              <button className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all">
                Mark Completed
              </button>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
