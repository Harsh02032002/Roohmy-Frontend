import React from "react";
import StaffLayout from "../../components/StaffLayout";
import { CheckCircle2, Circle, Clock, ClipboardList, Plus, MoreVertical } from "lucide-react";

export default function StaffTasks() {
  const tasks = [
    { title: "Morning bathroom cleaning check", time: "08:00 AM", status: "Completed", category: "Cleaning" },
    { title: "Collect rent for Room 102", time: "10:00 AM", status: "Pending", category: "Accounts" },
    { title: "Fix leaking tap in Room 305", time: "11:30 AM", status: "In Progress", category: "Maintenance" },
    { title: "Evening security round", time: "09:00 PM", status: "Pending", category: "Security" },
  ];

  return (
    <StaffLayout title="Daily Tasks">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Task List</h3>
          <p className="text-sm text-slate-500">Track and manage ground operations tasks.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all flex items-center gap-2">
          <Plus size={18} />
          New Task
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-6">
        <div className="space-y-4">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-slate-100 rounded-2xl transition-all group">
              <div className="flex items-center gap-4">
                <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  task.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-white border border-slate-200 text-slate-300'
                }`}>
                  {task.status === 'Completed' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>
                <div>
                  <h4 className={`font-bold text-sm ${task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1"><Clock size={12}/> {task.time}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{task.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg ${
                  task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                  task.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                }`}>{task.status}</span>
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaffLayout>
  );
}
