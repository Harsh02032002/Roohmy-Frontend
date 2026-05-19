import React from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  Sparkles, Search, Star, CheckCircle2, 
  MessageSquare, TrendingUp, ChevronRight
} from "lucide-react";

export default function StaffPerformancePage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const performance = [
    { id: 1, name: "Suresh Kumar", role: "Electrician", rating: 4.8, resolved: 45, feedback: "Extremely fast resolution times." },
    { id: 2, name: "Ramesh Dev", role: "Plumber", rating: 4.5, resolved: 38, feedback: "Polite attitude and tidy work." },
    { id: 3, name: "Deepak Rawat", role: "Security Guard", rating: 4.9, resolved: 60, feedback: "Highly vigilant during late hours." }
  ];

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Performance Metrics" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Staff Performance</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Monitor performance review averages, tenant feedback scores, and resolved complaints counts.</p>
        </div>
      </div>

      {/* Grid of Performance profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performance.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div className="flex items-center gap-0.5">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-800">{p.rating}</span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{p.name}</h3>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">{p.role}</p>
                <p className="text-[13px] text-slate-700 mt-3 font-medium bg-muted/40 p-3 rounded-xl border border-border/40">
                  "{p.feedback}"
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Complaints Solved:</span>
                  <span className="font-bold text-emerald-600">{p.resolved} Tickets</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
