import React from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { Eye, MousePointerClick, MessageSquare, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const traffic = Array.from({ length: 7 }, (_, i) => ({ day: `${20 + i} May`, views: 14000 + i * 1500, enquiries: 600 + i * 80 }));
const byType = [
  { name: "PG", value: 49, color: "hsl(var(--chart-1))" },
  { name: "Apartment", value: 34, color: "hsl(var(--chart-2))" },
  { name: "Villa", value: 10, color: "hsl(var(--chart-3))" },
  { name: "Other", value: 7, color: "hsl(var(--chart-4))" },
];
const cityViews = [
  { city: "Bangalore", views: 38540 },
  { city: "Pune", views: 22150 },
  { city: "Hyderabad", views: 18420 },
  { city: "Chennai", views: 14820 },
  { city: "Delhi", views: 13560 },
  { city: "Mumbai", views: 9840 },
];

export default function Analytics() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader title="Analytics" subtitle="Property listing performance and engagement insights." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Views" value="128,547" delta="+12.4%" trend="up" icon={Eye} iconColor="blue" />
        <StatCard label="Total Clicks" value="42,318" delta="+8.6%" trend="up" icon={MousePointerClick} iconColor="green" />
        <StatCard label="Enquiries" value="4,832" delta="+9.7%" trend="up" icon={MessageSquare} iconColor="purple" />
        <StatCard label="Conversion" value="3.76%" delta="+0.4%" trend="up" icon={TrendingUp} iconColor="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 panel">
          <h3 className="font-semibold mb-4">Traffic Overview</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={traffic}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="views" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="enquiries" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="panel">
          <h3 className="font-semibold mb-4">Views by Property Type</h3>
          <div className="h-48">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byType} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>
                  {byType.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            {byType.map((s) => (
              <div key={s.name} className="flex justify-between">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}</span>
                <span className="text-muted-foreground">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <h3 className="font-semibold mb-4">Views by City</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={cityViews}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="city" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip />
              <Bar dataKey="views" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
