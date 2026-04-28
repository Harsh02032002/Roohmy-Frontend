import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { MapPin, Plus, Edit, Trash2, TrendingUp } from "lucide-react";

const locations = [
  { city: "Bangalore", state: "Karnataka", listings: 856, growth: "+12.4%", color: "blue" },
  { city: "Pune", state: "Maharashtra", listings: 412, growth: "+8.2%", color: "green" },
  { city: "Hyderabad", state: "Telangana", listings: 386, growth: "+15.6%", color: "purple" },
  { city: "Chennai", state: "Tamil Nadu", listings: 289, growth: "+6.3%", color: "yellow" },
  { city: "Delhi", state: "Delhi NCR", listings: 263, growth: "+9.8%", color: "red" },
  { city: "Mumbai", state: "Maharashtra", listings: 186, growth: "+11.2%", color: "cyan" },
  { city: "Kolkata", state: "West Bengal", listings: 124, growth: "+5.4%", color: "orange" },
  { city: "Ahmedabad", state: "Gujarat", listings: 98, growth: "+7.1%", color: "blue" },
];

const colorMap = {
  blue: "bg-info-soft text-info",
  green: "bg-success-soft text-success",
  yellow: "bg-warning-soft text-warning",
  purple: "bg-brand-purple-soft text-brand-purple",
  red: "bg-destructive/10 text-destructive",
  cyan: "bg-cyan-100 text-cyan-600",
  orange: "bg-orange-100 text-orange-600",
};

export default function Locations() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Locations"
        subtitle="Manage cities and locations available on the platform."
        actions={<button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Add Location</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {locations.map((l) => (
          <div key={l.city} className="panel">
            <div className="flex items-start justify-between">
              <div className={`icon-bubble h-12 w-12 ${colorMap[l.color]}`}><MapPin className="h-6 w-6" /></div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Edit className="h-4 w-4" /></button>
                <button className="p-1.5 rounded hover:bg-muted text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-semibold text-lg">{l.city}</div>
              <div className="text-xs text-muted-foreground">{l.state}</div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{l.listings}</div>
                <div className="text-xs text-muted-foreground">Listings</div>
              </div>
              <div className="text-success text-xs font-medium flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {l.growth}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
