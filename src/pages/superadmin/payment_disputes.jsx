import React, { useEffect } from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function PaymentDisputes() {
  useHtmlPage({
    title: "Roomhy - Payment Disputes",
    bodyClass: "text-slate-800",
    htmlAttrs: {
  "lang": "en"
},
    metas: [
  {
  "charset": "UTF-8"
},
  {
  "name": "viewport",
  "content": "width=device-width, initial-scale=1.0"
}
],
    bases: [],
    links: [
  {
  "rel": "preconnect",
  "href": "https://fonts.googleapis.com"
},
  {
  "rel": "preconnect",
  "href": "https://fonts.gstatic",
  "crossorigin": true
},
  {
  "href": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
  "rel": "stylesheet"
},
  {
  "rel": "stylesheet",
  "href": "/superadmin/assets/css/payment_disputes.css"
}
],
    styles: [],
    scripts: [
  {
  "src": "https://cdn.tailwindcss.com"
},
  {
  "src": "https://unpkg.com/lucide@latest"
}
],
    inlineScripts: []
  });


  useEffect(() => {
    if (window?.lucide) window.lucide.createIcons();
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Payment Disputes</h1>
            <p className="text-sm text-slate-500 mt-1">Handle chargebacks, incorrect payments, and tenant complaints regarding transactions.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center transition-all">
              <i data-lucide="filter" className="w-4 h-4 mr-2"></i> Filter
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-purple-200 flex items-center transition-all">
              <i data-lucide="download" className="w-4 h-4 mr-2"></i> Report
            </button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Open Disputes</p>
              <h3 className="text-3xl font-black text-rose-600 mt-2">3</h3>
              <p className="text-[10px] font-bold text-rose-400 mt-1 uppercase tracking-tighter">Requires Attention</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-2xl text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm shadow-rose-100">
              <i data-lucide="alert-octagon" className="w-6 h-6"></i>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resolved (Month)</p>
              <h3 className="text-3xl font-black text-emerald-600 mt-2">8</h3>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Avg: 2 Days</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm shadow-emerald-100">
              <i data-lucide="check-circle" className="w-6 h-6"></i>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Disputed</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">₹18,500</h3>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Pending Review</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm shadow-slate-100">
              <i data-lucide="dollar-sign" className="w-6 h-6"></i>
            </div>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-sm">
          <div className="relative w-full lg:w-96">
            <input type="text" placeholder="Search Dispute ID, Transaction ID..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm transition-all" />
            <i data-lucide="search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-3"></i>
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-600 bg-white flex-1 lg:flex-none">
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-600 bg-white flex-1 lg:flex-none">
              <option value="">All Urgency</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Dispute ID</th>
                  <th className="px-6 py-4">Raised By</th>
                  <th className="px-6 py-4">Transaction Ref</th>
                  <th className="px-6 py-4">Issue Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Dispute 1: Open */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4"><span className="font-mono text-[10px] text-slate-400 font-bold">#DSP-2024-12</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs shrink-0">AK</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Arjun Kapoor</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Tenant</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold font-mono text-slate-500">TXN-88299102</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold bg-rose-50 px-2.5 py-1 rounded-full text-rose-600 uppercase tracking-wider">Double Deduction</span></td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">₹6,500</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 uppercase tracking-wider">
                      Open
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setIsModalOpen(true)} className="text-purple-600 hover:text-white hover:bg-purple-600 text-[10px] font-bold uppercase tracking-widest border border-purple-200 px-4 py-2 rounded-xl transition-all shadow-sm">Resolve</button>
                  </td>
                </tr>

                {/* Dispute 2: Resolved */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4"><span className="font-mono text-[10px] text-slate-400 font-bold">#DSP-2024-08</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">NS</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Neha Sharma</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Tenant</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold font-mono text-slate-500">TXN-77665544</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold bg-slate-100 px-2.5 py-1 rounded-full text-slate-600 uppercase tracking-wider">Payment Lag</span></td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">₹8,000</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                      Resolved
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-800 text-[10px] font-bold uppercase tracking-widest">Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Dispute Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Dispute #DSP-2024-12</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <i data-lucide="x" className="w-6 h-6"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-[10px] font-bold text-rose-700 uppercase tracking-widest">Issue Reported</p>
                    <p className="text-base font-bold text-slate-900 mt-1">Double Deduction</p>
                  </div>
                  <span className="text-[10px] font-bold bg-white px-3 py-1 rounded-full text-rose-600 border border-rose-200 uppercase tracking-widest shadow-sm">High Priority</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "I paid rent on Oct 24th via UPI, but the amount was deducted twice from my bank account. Please refund the excess amount."
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tenant Information</p>
                  <p className="text-sm font-bold text-slate-800">Arjun Kapoor</p>
                  <p className="text-[10px] text-slate-500 font-medium">Sai Residency - Room 204</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Transaction Ref</p>
                  <p className="text-[10px] font-bold font-mono text-slate-800 uppercase tracking-tight">TXN-88299102</p>
                  <p className="text-[10px] text-slate-500 font-medium">Date: 24 Oct 2025</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Evidence / Attachments</p>
                <div className="flex gap-3">
                  <div className="flex items-center px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                    <i data-lucide="image" className="w-4 h-4 mr-2 text-purple-500"></i> Receipt_1.jpg
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2 ml-1">Resolution Note</label>
                <textarea rows={3} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-300 resize-none" placeholder="Enter resolution details..."></textarea>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Cancel</button>
              <button className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 shadow-sm shadow-rose-200 transition-all">Reject Dispute</button>
              <button className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-all">Mark Resolved</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


