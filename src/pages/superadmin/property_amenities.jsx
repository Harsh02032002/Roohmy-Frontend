import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { Plus, Wifi, Car, Dumbbell, Waves, Wind, Tv, Coffee, Shield, Zap, Trash2, Edit } from "lucide-react";

const amenities = [
  { name: "WiFi", icon: Wifi, count: 2348, color: "blue" },
  { name: "Parking", icon: Car, count: 1892, color: "green" },
  { name: "Gym", icon: Dumbbell, count: 845, color: "yellow" },
  { name: "Swimming Pool", icon: Waves, count: 412, color: "cyan" },
  { name: "Air Conditioning", icon: Wind, count: 1645, color: "purple" },
  { name: "Television", icon: Tv, count: 1232, color: "red" },
  { name: "Kitchen", icon: Coffee, count: 1789, color: "orange" },
  { name: "24/7 Security", icon: Shield, count: 2156, color: "blue" },
  { name: "Power Backup", icon: Zap, count: 1543, color: "yellow" },
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

export default function Amenities() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Amenities"
        subtitle="Manage available amenities for property listings."
        actions={<button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Add Amenity</button>}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {amenities.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.name} className="panel text-center group relative">
              <div className={`icon-bubble h-14 w-14 mx-auto mb-3 ${colorMap[a.color]}`}><Icon className="h-7 w-7" /></div>
              <div className="font-semibold text-sm">{a.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{a.count.toLocaleString()} listings</div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 flex gap-1">
                <button className="p-1 rounded hover:bg-muted text-muted-foreground"><Edit className="h-3.5 w-3.5" /></button>
                <button className="p-1 rounded hover:bg-muted text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          );
        })}
        <button className="panel border-2 border-dashed border-border hover:bg-muted/30 flex flex-col items-center justify-center gap-2 min-h-[170px]">
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Plus className="h-6 w-6" /></div>
          <span className="text-xs font-medium text-primary">Add Amenity</span>
        </button>
      </div>
    </div>
  );
}
