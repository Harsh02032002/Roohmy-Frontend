import React, { useEffect } from "react";
import { useHtmlPage } from "../../utils/htmlPage";

export default function Reviews() {
  useHtmlPage({
    title: "Roomhy - Reviews",
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
  "href": "/superadmin/assets/css/reviews.css"
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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Review Management</h1>
            <p className="text-sm text-slate-500 mt-1">Monitor and moderate reviews from tenants across all properties.</p>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-sm">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <input type="text" placeholder="Search reviews by tenant, property..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm transition-all" />
            <i data-lucide="search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-3"></i>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-600 bg-white min-w-[140px]">
              <option value="">All Properties</option>
              <option value="sai">Sai Residency</option>
              <option value="green">Green View PG</option>
            </select>
            
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-600 bg-white min-w-[120px]">
              <option value="">Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

             <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-600 bg-white min-w-[120px]">
                <option value="">Status</option>
                <option value="published">Published</option>
                <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Reviewer</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Review Summary</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Review 1 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs shrink-0">AK</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Arjun Kapoor</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Tenant</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 font-medium">Sai Residency</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex text-amber-400 gap-0.5">
                      <i data-lucide="star" className="w-3.5 h-3.5 fill-current"></i>
                      <i data-lucide="star" className="w-3.5 h-3.5 fill-current"></i>
                      <i data-lucide="star" className="w-3.5 h-3.5 fill-current"></i>
                      <i data-lucide="star" className="w-3.5 h-3.5 fill-current"></i>
                      <i data-lucide="star" className="w-3.5 h-3.5 fill-current"></i>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 truncate max-w-xs">Great place to stay! Very clean and safe environment.</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">24 Oct 2025</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setIsModalOpen(true)} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="View & Reply">
                        <i data-lucide="message-square" className="w-4 h-4"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Hide Review">
                        <i data-lucide="eye-off" className="w-4 h-4"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Review 2 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">NS</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Neha Sharma</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Tenant</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 font-medium">Green View PG</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      <i data-lucide="star" className="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                      <i data-lucide="star" className="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                      <i data-lucide="star" className="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                      <i data-lucide="star" className="w-3.5 h-3.5 text-slate-200"></i>
                      <i data-lucide="star" className="w-3.5 h-3.5 text-slate-200"></i>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 truncate max-w-xs">Food quality needs improvement, otherwise good stay.</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">22 Oct 2025</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setIsModalOpen(true)} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="View & Reply">
                        <i data-lucide="message-square" className="w-4 h-4"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Hide Review">
                        <i data-lucide="eye-off" className="w-4 h-4"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Review Details</h3>
                <div className="flex items-center mt-1">
                  <div className="flex text-amber-400 text-xs">
                    <i data-lucide="star" className="w-3 h-3 fill-current"></i>
                    <i data-lucide="star" className="w-3 h-3 fill-current"></i>
                    <i data-lucide="star" className="w-3 h-3 fill-current"></i>
                    <i data-lucide="star" className="w-3 h-3 fill-current"></i>
                    <i data-lucide="star" className="w-3 h-3 fill-current"></i>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold ml-2 uppercase">5.0 / 5.0 Rating</span>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <i data-lucide="x" className="w-6 h-6"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm shrink-0 shadow-sm">AK</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Arjun Kapoor</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Sai Residency - Room 204</p>
                  <div className="mt-3 relative">
                    <i data-lucide="quote" className="absolute -left-2 -top-2 w-8 h-8 text-slate-200 opacity-50 rotate-180"></i>
                    <p className="text-sm text-slate-700 leading-relaxed italic relative z-10">
                      "Great place to stay! Very clean and safe. The management is responsive and helpful. Highly recommended for students and working professionals."
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Reply to Review</label>
                <textarea rows={4} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-300 resize-none" placeholder="Thank the reviewer or address their concern..."></textarea>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Cancel</button>
              <button className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 shadow-sm shadow-purple-200 transition-all">Post Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


