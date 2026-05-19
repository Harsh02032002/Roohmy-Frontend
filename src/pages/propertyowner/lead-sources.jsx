import React from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  TrendingUp, Globe, MessageSquare, MapPin, 
  Instagram, Users, Percent, Award
} from "lucide-react";

export default function LeadSourcesPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const sourcesData = [
    { source: "Website Form", count: 48, converts: 18, rate: "37.5%", icon: Globe, color: "text-blue-600 bg-blue-50" },
    { source: "WhatsApp Chat", count: 32, converts: 15, rate: "46.8%", icon: MessageSquare, color: "text-emerald-600 bg-emerald-50" },
    { source: "Google Local Maps", count: 24, converts: 8, rate: "33.3%", icon: MapPin, color: "text-rose-600 bg-rose-50" },
    { source: "Instagram Ads", count: 18, converts: 4, rate: "22.2%", icon: Instagram, color: "text-purple-600 bg-purple-50" },
    { source: "Friend Referrals", count: 12, converts: 9, rate: "75.0%", icon: Users, color: "text-amber-600 bg-amber-50" }
  ];

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="Lead Origin Analytics" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Lead Source Analytics</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Detailed metrics of conversion percentages and query frequencies grouped by channel.</p>
        </div>
      </div>

      {/* Grid of Lead Sources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sourcesData.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`size-11 rounded-xl flex items-center justify-center ${item.color}`}>
                    <IconComp size={22} />
                  </div>
                  <span className="text-[12px] font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {item.rate} Conv. Rate
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-[20px] font-bold text-foreground">{item.source}</h3>
                  <p className="text-[13px] text-muted-foreground">Total Inbound Queries: <strong className="text-foreground">{item.count} Leads</strong></p>
                </div>
              </div>

              <div className="border-t border-border/60 mt-6 pt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Successful check-ins:</span>
                <span className="font-bold text-slate-800 text-[14px]">{item.converts} Tenants</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Source Leaderboard */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-serif text-[20px] text-foreground mb-4">Channel Performance Standings</h3>
        <div className="space-y-4">
          {sourcesData.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-foreground">{item.source}</span>
                <span className="text-muted-foreground">{item.rate} ({item.converts}/{item.count} Leads)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-slate-900 h-full rounded-full transition-all duration-1000" 
                  style={{ width: item.rate }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
