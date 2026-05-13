import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, Inbox, Eye, CreditCard, X, Check, MessageSquare, Download, Printer, FileText, ShieldCheck } from "lucide-react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";

const cn = (...classes) => classes.filter(Boolean).join(" ");
import { useHtmlPage } from "../../utils/htmlPage";
import {
  buildBookingFormLink,
  clearOwnerRuntimeSession,
  createOwnerChatRoom,
  fetchBookingRequestsForOwner,
  formatDate,
  getOwnerRuntimeSession,
  normalizeBooking,
  resolveWebsiteChatUserId,
  updateBookingDecision,
  fetchPropertyMap
} from "../../utils/propertyowner";
import { fetchJson } from "../../utils/api";

export default function BookingRequest() {
  useHtmlPage({
    title: "Roomhy - Booking Requests",
    bodyClass: "text-slate-800",
    htmlAttrs: { lang: "en" },
    metas: [
      { charset: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" }
    ],
    links: [
      {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        rel: "stylesheet"
      },
      { rel: "stylesheet", href: "/propertyowner/assets/css/booking_request.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }, { src: "https://unpkg.com/lucide@latest" }],
    inlineScripts: []
  });

  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  
  // Modals state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const loadBookingRequests = async (session) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [requestList, propMap] = await Promise.all([
        fetchBookingRequestsForOwner(session.loginId),
        fetchPropertyMap().catch(() => new Map())
      ]);
      const normalized = requestList.map(normalizeBooking).map(item => {
        let propData = propMap.get(String(item.propertyId));
        if (!propData && item.propertyName) {
          propData = Array.from(propMap.values()).find(p => 
            (p.propertyName || p.property_name || p.propertyInfo?.name) === item.propertyName
          );
        }
        return {
          ...item,
          rent: propData?.monthlyRent || propData?.rent || propData?.propertyInfo?.rent || propData?.pricingDetails?.baseRent || item.rent
        };
      });
      setRequests(normalized.filter((item) => String(item.request_type || item.type || "").toLowerCase() !== "bid"));
      setBids(normalized.filter((item) => String(item.request_type || item.type || "").toLowerCase() === "bid"));
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Failed to load booking requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const session = getOwnerRuntimeSession();
    if (!session?.loginId) {
      window.location.href = "/propertyowner/ownerlogin";
      return;
    }
    setOwner(session);
    loadBookingRequests(session);
  }, []);

  const visibleRequests = useMemo(
    () =>
      requests.filter((item) => {
        const matchesStatus = statusFilter ? String(item.status || "").toLowerCase() === statusFilter : true;
        const haystack = [item.propertyName, item.propertyId, item.userId, item.userName, item.email]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const matchesSearch = search ? haystack.includes(search.toLowerCase()) : true;
        return matchesStatus && matchesSearch;
      }),
    [requests, search, statusFilter]
  );

  const visibleBids = useMemo(
    () =>
      bids.filter((item) => {
        const matchesStatus = statusFilter ? String(item.status || "").toLowerCase() === statusFilter : true;
        const haystack = [
          item.propertyName,
          item.propertyId,
          item.userId,
          item.userName || item.fullName,
          item.email,
          item.minPrice,
          item.maxPrice
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const matchesSearch = search ? haystack.includes(search.toLowerCase()) : true;
        return matchesStatus && matchesSearch;
      }),
    [bids, search, statusFilter]
  );

  const handleDecision = async (booking, action) => {
    try {
      await updateBookingDecision(booking.key, action);
      if (action === "approve") {
        const websiteUserId = resolveWebsiteChatUserId(booking);
        await createOwnerChatRoom({
          bookingId: booking.key,
          userName: booking.userName,
          userEmail: booking.email,
          userLoginId: websiteUserId,
          ownerId: owner?.loginId,
          ownerName: owner?.name,
          propertyName: booking.propertyName
        });

        // Auto-send professional message
        const welcomeMsg = `Hello ${booking.userName}! 👋 I have reviewed and accepted your request for "${booking.propertyName}". 🏠 I have enabled chat for our conversation so we can discuss the next steps and move-in details. Looking forward to hosting you!`;
        await fetchJson("/api/chat/send", {
          method: "POST",
          body: JSON.stringify({
             to_login_id: websiteUserId,
             message: welcomeMsg,
             from_login_id: owner?.loginId
          })
        }).catch(err => console.error("Failed to send auto-message:", err));
      }
      if (owner) {
        await loadBookingRequests(owner);
      }
      setShowViewModal(false);
    } catch (err) {
      setErrorMsg(err?.body || err?.message || "Failed to update booking status.");
    }
  };

  const handleSendPaymentLink = async () => {
    if (!paymentAmount || isNaN(paymentAmount)) {
      alert("Please enter a valid amount.");
      return;
    }
    setPaymentLoading(true);
    try {
      const websiteUserId = resolveWebsiteChatUserId(selectedBooking);
      const rawRent = String(selectedBooking.rent || "0").replace(/[^\d.-]/g, "");
      const amount = paymentAmount || (isNaN(rawRent) ? 0 : rawRent);
      const paymentLink = `${window.location.origin}/website/pay?bookingId=${selectedBooking.key}&amount=${amount}`;
      const msg = `Dear ${selectedBooking.userName}, please complete the payment of ₹${amount} to secure your booking for "${selectedBooking.propertyName}". 💳 You can pay securely via Razorpay here: ${paymentLink}`;
      
      await fetchJson("/api/chat/send", {
        method: "POST",
        body: JSON.stringify({
           to_login_id: websiteUserId,
           message: msg,
           from_login_id: owner?.loginId
        })
      });

      alert("Payment link sent successfully via chat!");
      setShowPaymentModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send payment link.");
    } finally {
      setPaymentLoading(false);
    }
  };
  const handleDownloadPDF = () => {
    if (!selectedBooking) return;
    const printWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <title>Roomhy - Booking Details #${selectedBooking.key.slice(-6)}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 50px; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            .header { border-bottom: 3px solid #f1f5f9; padding-bottom: 25px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 28px; font-weight: 900; color: #2563eb; letter-spacing: -1.5px; }
            .summary-label { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: #94a3b8; }
            .section { margin-bottom: 40px; }
            .section-title { font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #3b82f6; margin-bottom: 20px; border-bottom: 1px solid #eff6ff; padding-bottom: 8px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
            .field { margin-bottom: 5px; }
            .label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px; }
            .value { font-size: 14px; font-weight: 600; color: #1e293b; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 10px; font-weight: 900; text-transform: uppercase; background: #f1f5f9; color: #475569; }
            .footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid #f1f5f9; font-size: 10px; color: #94a3b8; text-align: center; }
            .message-box { background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6; font-style: italic; color: #475569; font-size: 13px; }
            @media print { .no-print { display: none; } body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">ROOMHY.com</div>
            <div class="summary-label">Booking Summary</div>
          </div>
          
          <div class="section">
            <div class="section-title">Property Information</div>
            <div class="grid">
              <div class="field"><div class="label">Property Name</div><div class="value">${selectedBooking.propertyName}</div></div>
              <div class="field"><div class="label">Location</div><div class="value">${selectedBooking.area}, ${selectedBooking.city}</div></div>
              <div class="field"><div class="label">Rent Amount</div><div class="value" style="color: #2563eb; font-size: 18px;">₹${selectedBooking.rent}</div></div>
              <div class="field"><div class="label">Current Status</div><div class="badge">${selectedBooking.status}</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Tenant Details</div>
            <div class="grid">
              <div class="field"><div class="label">Full Name</div><div class="value">${selectedBooking.userName}</div></div>
              <div class="field"><div class="label">Contact Number</div><div class="value">${selectedBooking.phone}</div></div>
              <div class="field"><div class="label">Email Address</div><div class="value">${selectedBooking.email}</div></div>
              <div class="field"><div class="label">Gender</div><div class="value" style="text-transform: capitalize;">${selectedBooking.gender}</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Note / Message from Tenant</div>
            <div class="message-box">"${selectedBooking.message}"</div>
          </div>

          <div class="footer">
            Roomhy.com - Verified PG & Co-living Platform | Support: support@roomhy.com<br>
            Generated on ${new Date().toLocaleString()}
          </div>
          <script>window.onload = function() { window.print(); setTimeout(() => window.close(), 500); }</script>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
  };

  const renderActions = (booking) => {
    const isPending = String(booking.status).toLowerCase() === "pending";
    const isApproved = ["approved", "accepted", "visited", "booked", "confirmed"].includes(String(booking.status).toLowerCase());

    return (
      <div className="flex flex-wrap justify-end gap-2">
        <button 
          type="button" 
          onClick={() => { setSelectedBooking(booking); setShowViewModal(true); }} 
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all"
        >
          <Eye size={14} /> View
        </button>

        {isPending && (
          <>
            <button type="button" onClick={() => handleDecision(booking, "approve")} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
               <Check size={14} /> Approve
            </button>
            <button type="button" onClick={() => handleDecision(booking, "reject")} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all">
               <X size={14} /> Reject
            </button>
          </>
        )}

        {isApproved && (
          <>
            <button type="button" onClick={() => navigate(`/propertyowner/ownerchat?booking=${booking.key}&user=${encodeURIComponent(booking.userId)}`)} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all">
              <MessageSquare size={14} /> Chat
            </button>
            <button type="button" onClick={() => { setSelectedBooking(booking); setPaymentAmount(booking.rent || ""); setShowPaymentModal(true); }} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all">
              <CreditCard size={14} /> Request Pay
            </button>
            <button type="button" onClick={() => window.open(buildBookingFormLink(booking), "_blank")} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black transition-all">
              <CalendarCheck size={14} /> Form
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <PropertyOwnerLayout
      owner={owner}
      title="Booking Requests"
      navVariant="default"
      notificationCount={visibleRequests.filter((item) => String(item.status).toLowerCase() === "pending").length}
      showNotificationSettings
      onLogout={() => {
        clearOwnerRuntimeSession();
        window.location.href = "/propertyowner/ownerlogin";
      }}
    >
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          Booking Requests &amp; Bids
        </h1>
        <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest opacity-60">Manage your active tenant requests</p>
      </div>

      {errorMsg ? <div className="text-sm text-rose-600 font-bold mb-4 bg-rose-50 p-4 rounded-2xl border border-rose-100">{errorMsg}</div> : null}

      <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative group">
              <input 
                type="text" 
                value={search} 
                onChange={(event) => setSearch(event.target.value)} 
                placeholder="Search by property, user, or ID..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-400" 
              />
            </div>
          </div>
          <div>
            <select 
              value={statusFilter} 
              onChange={(event) => setStatusFilter(event.target.value)} 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
              <option value="visited">Visited</option>
            </select>
          </div>
          <div>
            <button 
              type="button" 
              onClick={() => owner && loadBookingRequests(owner)} 
              className="w-full h-full bg-blue-600 text-white rounded-2xl px-6 py-3.5 hover:bg-blue-700 font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm mb-8 border border-slate-100 overflow-hidden">
        <div className="flex bg-slate-50/50 p-2">
          <button 
            type="button" 
            onClick={() => setActiveTab("requests")} 
            className={`flex-1 px-6 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-2xl ${activeTab === "requests" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            Booking Requests
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab("bids")} 
            className={`flex-1 px-6 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-2xl ${activeTab === "bids" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            Direct Bids
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-8 py-5">ID</th>
                <th className="px-8 py-5">Property</th>
                <th className="px-8 py-5">Tenant</th>
                <th className="px-8 py-5">{activeTab === "bids" ? "Bid Range" : "Rent"}</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && (
                <tr className="text-center py-8 text-slate-400 font-bold uppercase text-[10px] tracking-widest"><td colSpan={6} className="py-20 animate-pulse">Loading Roomhy Data...</td></tr>
              )}
              {!loading && (activeTab === "requests" ? visibleRequests : visibleBids).length === 0 && (
                <tr className="text-center py-8 text-slate-300"><td colSpan={6} className="py-24"><Inbox className="w-16 h-16 mx-auto mb-4 opacity-10" /><p className="text-[10px] font-black uppercase tracking-widest opacity-40">No {activeTab} available</p></td></tr>
              )}
              {!loading && (activeTab === "requests" ? visibleRequests : visibleBids).map((booking) => (
                <tr key={booking.key} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-8 py-6 whitespace-nowrap text-[10px] font-black text-slate-300 group-hover:text-slate-400 uppercase tracking-tighter">#{booking.bidId?.slice(-6) || booking.propertyId?.slice(-6) || "---"}</td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">{booking.propertyName}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">{booking.area}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-700 text-sm">{booking.userName || booking.fullName}</div>
                    <div className="text-[10px] text-slate-400 font-bold mt-0.5">{booking.phone}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-black text-slate-900 text-sm">₹{activeTab === "bids" ? booking.budgetRange : booking.rent}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      String(booking.status).toLowerCase() === 'pending' ? 'bg-amber-50 text-amber-600' : 
                      String(booking.status).toLowerCase() === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        String(booking.status).toLowerCase() === 'pending' ? 'bg-amber-500' : 
                        String(booking.status).toLowerCase() === 'approved' ? 'bg-emerald-500' :
                        'bg-slate-400'
                      }`} />
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {renderActions(booking)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* View Modal */}
      {showViewModal && selectedBooking && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowViewModal(false)}
        >
          <div 
            className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <div className="flex flex-col">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Request Details</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Review tenant information and bid</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm"
                >
                  <Printer size={14} /> Download PDF
                </button>
                <button 
                  onClick={() => setShowViewModal(false)} 
                  className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Section 1: Tenant */}
                <div className="md:col-span-1">
                  <h3 className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8">
                    <FileText size={14} /> Tenant Details
                  </h3>
                  <div className="space-y-8">
                    <ModalField label="Full Name" value={selectedBooking.userName} />
                    <ModalField label="Phone" value={selectedBooking.phone} />
                    <ModalField label="Email" value={selectedBooking.email} />
                    <div className="grid grid-cols-2 gap-4">
                      <ModalField label="Gender" value={selectedBooking.gender} isCaps />
                    </div>
                  </div>
                </div>

                {/* Section 2: Property & Financial */}
                <div className="md:col-span-1">
                  <h3 className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8">
                    <CreditCard size={14} /> Property & Financial
                  </h3>
                  <div className="space-y-8">
                    <ModalField label="Property" value={selectedBooking.propertyName} />
                    <ModalField label="Area" value={selectedBooking.area} />
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Monthly Rent</label>
                      <p className="font-black text-slate-900 text-2xl tracking-tight">₹{activeTab === "bids" ? selectedBooking.budgetRange : selectedBooking.rent}</p>
                    </div>
                    <ModalField label="Request Status" value={selectedBooking.status} isCaps />
                  </div>
                </div>

                {/* Section 4: Message */}
                <div className="md:col-span-2">
                  <h3 className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8 border-t border-slate-50 pt-10">
                    <MessageSquare size={14} /> Message from Tenant
                  </h3>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 min-h-[100px]">
                    <p className="text-sm font-medium text-slate-600 italic leading-relaxed">
                      {selectedBooking.message !== '-' ? `"${selectedBooking.message}"` : "No specific message provided."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-50 flex flex-col gap-4">
                 {String(selectedBooking.status).toLowerCase() === 'pending' ? (
                   <div className="flex gap-4">
                      <button onClick={() => handleDecision(selectedBooking, "approve")} className="flex-1 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">Accept Request</button>
                      <button onClick={() => handleDecision(selectedBooking, "reject")} className="flex-1 py-4 bg-rose-50 text-rose-600 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-rose-100 transition-all">Reject</button>
                   </div>
                 ) : (
                   <div className="p-5 bg-slate-50 rounded-2xl text-slate-600 text-center font-black text-xs uppercase tracking-widest border border-slate-100">
                      Request Status: {selectedBooking.status}
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <div className="flex flex-col">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Request Payment</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Send link to tenant</p>
              </div>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-sm"><X size={20} /></button>
            </div>
            <div className="p-10">
              <div className="mb-8 text-center">
                 <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CreditCard size={32} />
                 </div>
                 <h3 className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-widest">Enter Amount to Request</h3>
                <input 
                  type="number" 
                  value={paymentAmount} 
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-3xl font-black text-slate-900 text-center focus:bg-white focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all placeholder:text-slate-200"
                  placeholder="0"
                />
              </div>

              <button 
                onClick={handleSendPaymentLink}
                disabled={paymentLoading}
                className="w-full py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {paymentLoading ? "Sending Request..." : "Send Payment Link"}
              </button>
              
              <p className="text-[10px] text-slate-400 font-bold text-center mt-6 uppercase tracking-widest leading-relaxed">The tenant will receive an instant notification in chat to complete the payment via Razorpay.</p>
            </div>
          </div>
        </div>
      )}
    </PropertyOwnerLayout>
  );
}

function ModalField({ label, value, isCaps }) {
  return (
    <div>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">{label}</label>
      <p className={cn("text-sm font-bold text-slate-900", isCaps && "capitalize")}>{value || "---"}</p>
    </div>
  );
}
