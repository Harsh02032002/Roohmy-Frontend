import React from "react";
import StaffLayout from "../../components/StaffLayout";
import { CalendarCheck, MapPin, Clock, CheckCircle2 } from "lucide-react";

export default function StaffAttendance() {
  const history = [
    { date: "16 May, 2026", checkIn: "08:55 AM", checkOut: "-", status: "On Duty", location: "Roomhy Residency" },
    { date: "15 May, 2026", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present", location: "Roomhy Residency" },
    { date: "14 May, 2026", checkIn: "08:58 AM", checkOut: "06:05 PM", status: "Present", location: "Roomhy Residency" },
  ];

  return (
    <StaffLayout title="Staff Attendance">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
            <CalendarCheck size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">Mark Attendance</h3>
            <p className="text-sm text-slate-500">Your current status is <span className="text-emerald-500 font-bold">On Duty</span></p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95">
            Check In
          </button>
          <button className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all active:scale-95">
            Check Out
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h4 className="font-bold text-slate-900">Attendance History</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-sm text-slate-900">{h.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{h.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{h.checkOut}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg ${
                      h.status === 'On Duty' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>{h.status}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-semibold">{h.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StaffLayout>
  );
}
