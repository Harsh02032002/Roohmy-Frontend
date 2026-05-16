import React from "react";
import StaffLayout from "../../components/StaffLayout";
import { AlertCircle, Clock, CheckCircle2, Home, User, Plus, Search, Filter, ArrowRight, MessageSquare } from "lucide-react";

export default function StaffComplaints() {
  const complaints = [
    { id: "#CMP-202", room: "102-A", tenant: "Rahul Sharma", issue: "Taps leaking in bathroom", priority: "High", status: "Pending", time: "30 mins ago" },
    { id: "#CMP-203", room: "205-B", tenant: "Priya Patel", issue: "WiFi router not working", priority: "Medium", status: "In Progress", time: "2 hours ago" },
    { id: "#CMP-204", room: "108-C", tenant: "Amit Verma", issue: "Dustbin needs clearing", priority: "Low", status: "Resolved", time: "5 hours ago" },
  ];

  return (
    <StaffLayout title="Issue Management">
      <div className="space-y-10">
        {/* Top Operational Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex flex-wrap gap-3 p-1.5 bg-slate-50 rounded-[2rem] border border-slate-100">
              <button className="px-6 py-2.5 bg-white shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900">All Issues</button>
              <button className="px-6 py-2.5 text-slate-400 hover:text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Pending (8)</button>
              <button className="px-6 py-2.5 text-slate-400 hover:text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Resolved</button>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input type="text" placeholder="Search by Room or Tenant..." className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all w-80 shadow-sm" />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center gap-2">
                 <Plus size={18} /> Log Incident
              </button>
           </div>
        </div>

        {/* Complaints Feed - Even More Compact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {complaints.map((c, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-500 group relative overflow-hidden">
               <div className="flex justify-between items-start mb-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 ${
                    c.priority === 'High' ? 'bg-rose-500 text-white shadow-sm' : 'bg-blue-600 text-white shadow-sm'
                  }`}>
                    <AlertCircle size={18} />
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-0.5">{c.id}</span>
                     <span className={`text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${
                        c.status === 'Pending' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        c.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                     }`}>{c.status}</span>
                  </div>
               </div>

               <div className="space-y-0.5 mb-4">
                  <h4 className="text-lg font-black text-slate-900 tracking-tighter italic group-hover:text-blue-600 transition-colors">{c.issue}</h4>
                  <div className="flex items-center gap-3">
                     <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <Home size={10} className="text-blue-400" /> Room {c.room}
                     </div>
                     <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <User size={10} className="text-blue-400" /> {c.tenant}
                     </div>
                  </div>
               </div>

               <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[8px] font-black text-slate-300 uppercase tracking-widest italic">
                     <Clock size={10} /> {c.time}
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all border border-slate-100">
                        <MessageSquare size={14} className="text-slate-400" />
                     </button>
                     <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[8px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-1.5 group/btn">
                        Handle <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </StaffLayout>
  );
}
