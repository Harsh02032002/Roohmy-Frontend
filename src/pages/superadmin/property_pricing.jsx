import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { Check, Plus, Star } from "lucide-react";

const plans = [
  {
    name: "Basic", price: "₹999", period: "/month", color: "blue",
    features: ["Up to 5 listings", "Basic analytics", "Email support", "Standard listing visibility"],
    subscribers: 1248, popular: false,
  },
  {
    name: "Silver", price: "₹2,999", period: "/month", color: "purple",
    features: ["Up to 25 listings", "Advanced analytics", "Priority email support", "Featured listings (2)", "Verified badge"],
    subscribers: 542, popular: true,
  },
  {
    name: "Gold", price: "₹7,999", period: "/month", color: "yellow",
    features: ["Unlimited listings", "Real-time analytics", "24/7 phone support", "Featured listings (10)", "Premium badge", "Custom branding"],
    subscribers: 184, popular: false,
  },
  {
    name: "Enterprise", price: "Custom", period: "", color: "red",
    features: ["Everything in Gold", "Dedicated account manager", "API access", "White-label solution", "Custom integrations", "SLA guarantee"],
    subscribers: 24, popular: false,
  },
];

const colorMap = {
  blue: "border-info text-info",
  purple: "border-brand-purple text-brand-purple",
  yellow: "border-warning text-warning",
  red: "border-destructive text-destructive",
};

export default function PricingPlans() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Pricing Plans"
        subtitle="Manage subscription plans and pricing tiers."
        actions={<button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Add Plan</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {plans.map((p) => (
          <div key={p.name} className={`panel relative ${p.popular ? "ring-2 ring-primary" : ""}`}>
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-soft bg-primary text-primary-foreground flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" /> Most Popular
              </span>
            )}
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${colorMap[p.color]}`}>{p.name}</div>
            <div className="mt-4">
              <span className="text-4xl font-bold">{p.price}</span>
              <span className="text-muted-foreground">{p.period}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{p.subscribers.toLocaleString()} active subscribers</div>
            <ul className="mt-5 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-6">
              <button className="flex-1 h-10 rounded-lg border border-border text-sm font-medium hover:bg-muted">Edit</button>
              <button className="flex-1 h-10 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
