import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { Plus, Edit, Trash2, FolderTree, Home, Building, Hotel, Users, Castle } from "lucide-react";

const cats = [
  { name: "PG / Co-Living", icon: Users, color: "blue", listings: 1248, slug: "pg-co-living" },
  { name: "Apartment", icon: Building, color: "green", listings: 872, slug: "apartment" },
  { name: "Villa", icon: Castle, color: "yellow", listings: 248, slug: "villa" },
  { name: "Independent House", icon: Home, color: "purple", listings: 180, slug: "independent-house" },
  { name: "Hotel / Service Apartment", icon: Hotel, color: "red", listings: 64, slug: "hotel" },
  { name: "Commercial Space", icon: Building, color: "cyan", listings: 32, slug: "commercial" },
];

const colorMap = {
  blue: "bg-info-soft text-info",
  green: "bg-success-soft text-success",
  yellow: "bg-warning-soft text-warning",
  purple: "bg-brand-purple-soft text-brand-purple",
  red: "bg-destructive/10 text-destructive",
  cyan: "bg-cyan-100 text-cyan-600",
};

export default function Categories() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Categories"
        subtitle="Organize properties into categories and types."
        actions={<button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Add Category</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cats.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.slug} className="panel">
              <div className="flex items-start justify-between">
                <div className={`icon-bubble h-12 w-12 ${colorMap[c.color]}`}><Icon className="h-6 w-6" /></div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Edit className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded hover:bg-muted text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mt-4">
                <div className="font-semibold text-lg">{c.name}</div>
                <div className="text-xs text-muted-foreground">/{c.slug}</div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Listings</span>
                <span className="font-bold text-lg">{c.listings.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
        <button className="panel border-2 border-dashed border-border hover:bg-muted/30 flex flex-col items-center justify-center gap-2 min-h-[200px]">
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Plus className="h-6 w-6" /></div>
          <span className="text-sm font-medium text-primary">Add New Category</span>
          <span className="text-xs text-muted-foreground">Create a new property category</span>
        </button>
      </div>
    </div>
  );
}
