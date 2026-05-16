import React from "react";
import OwnerLayout from "../../components/OwnerLayout";
import { IndianRupee, Search, Filter, ArrowUpRight, Download, CheckCircle2, AlertCircle, CreditCard, PieChart, Sparkles } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function OwnerRent() {
  const collections = [
    { tenant: "Rahul Sharma", room: "102-A", amount: "₹12,000", date: "05 May, 2026", status: "Collected", method: "UPI", id: "#REC-101" },
    { tenant: "Priya Patel", room: "205-B", amount: "₹8,500", date: "07 May, 2026", status: "Collected", method: "Bank Transfer", id: "#REC-102" },
    { tenant: "Amit Verma", room: "108-C", amount: "₹6,500", date: "10 May, 2026", status: "Overdue", method: "-", id: "#REC-103" },
    { tenant: "Suresh Kumar", room: "301-A", amount: "₹9,000", date: "05 May, 2026", status: "Collected", method: "Cash", id: "#REC-104" },
  ];

  return (
    <OwnerLayout 
      title="Revenue Stream"
      subtitle="Monitor your monthly rent collections and payment efficiency."
    >
      <div className="space-y-12">
        {/* Collection Intelligence Cards */}
        {/* Collection Intelligence Cards - Smaller */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           <CollectionMetric label="Collected" value="₹8.4L" color="emerald" icon={CheckCircle2} />
           <CollectionMetric label="Pending" value="₹1.2L" color="rose" icon={AlertCircle} />
           <CollectionMetric label="Advance" value="₹45k" color="indigo" icon={CreditCard} />
           <CollectionMetric label="Effort" value="92%" color="blue" icon={Sparkles} />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
           <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[2rem] border border-slate-100 w-full md:w-[500px] shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
              <Search size={20} className="text-slate-400" />
              <input type="text" placeholder="Search collections..." className="bg-transparent border-none outline-none text-sm font-bold w-full text-slate-900" />
           </div>
           <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all border border-slate-100 shadow-sm">
                <Download size={16} /> Export Data
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all active:scale-95">
                Bulk Reminders
              </button>
           </div>
        </div>

        {/* Collection Ledger - Premium Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Resident / ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center italic">Room</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center italic">Rent Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center italic">Payment Method</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right italic">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {collections.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-all group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 italic shadow-sm">
                          {c.tenant.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div className="flex flex-col">
                          <span className="font-black text-slate-900 italic tracking-tight text-base leading-tight">{c.tenant}</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-0.5">{c.id}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-sm font-black text-slate-700 italic tracking-tighter">Room {c.room}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="font-black text-slate-900 italic tracking-tighter text-lg">{c.amount}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100 shadow-sm">{c.method}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                      c.status === 'Collected' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'Collected' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OwnerLayout>
  );
}

function CollectionMetric({ label, value, color, icon: Icon }) {
  const colors = {
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    rose: 'text-rose-600 bg-rose-50 border-rose-100',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    blue: 'text-blue-600 bg-blue-50 border-blue-100'
  };
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-500 group relative overflow-hidden">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 border ${colors[color]} group-hover:scale-110 transition-transform duration-500`}>
         <Icon size={16} />
      </div>
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 italic">{label}</p>
      <h3 className={`text-xl font-black tracking-tighter italic ${colors[color].split(' ')[0]}`}>{value}</h3>
    </div>
  );
}
