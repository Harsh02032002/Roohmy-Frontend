import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { 
  Search, 
  MessageSquare, 
  ArrowLeft, 
  Bookmark, 
  Phone, 
  MoreVertical, 
  Send, 
  ThumbsUp, 
  ThumbsDown,
  Video,
  Info,
  Mic,
  Image as ImageIcon,
  Heart,
  Smile,
  Edit,
  CreditCard
} from "lucide-react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { useHtmlPage } from "../../utils/htmlPage";
import {
  buildBookingFormLink,
  clearOwnerRuntimeSession,
  fetchBookingRequestsForOwner,
  fetchConversation,
  formatDate,
  getOwnerRuntimeSession,
  getSocketUrl,
  normalizeBooking,
  resolveWebsiteChatUserId,
  fetchPropertyMap
} from "../../utils/propertyowner";

const OWNER_LOGIN_ID_REGEX = /^ROOMHY\d{4}$/i;
const WEBSITE_USER_ID_REGEX = /^roomhyweb\d{6}$/i;

const getBookingDisplayName = (booking) => {
  const value = (
    booking?.name ||
    booking?.fullName ||
    booking?.contactName ||
    booking?.user_name ||
    booking?.tenant_name ||
    booking?.booking_details?.name ||
    booking?.booking_details?.fullName ||
    booking?.booking_details?.contactName ||
    booking?.booking_details?.user_name ||
    booking?.booking_details?.tenant_name ||
    booking?.user?.name ||
    booking?.user?.firstName ||
    booking?.firstName ||
    booking?.email ||
    "User"
  );
  const normalized = String(value || "").trim();
  if (!normalized || ["n/a", "na", "null", "undefined"].includes(normalized.toLowerCase())) {
    return "User";
  }
  return normalized;
};

const normalizeMessage = (message) => ({
  ...message,
  key: message._id || message.id || `${message.sender_login_id}-${message.created_at || message.createdAt || Math.random()}`,
  text: message.message || message.text || "",
  createdAt: message.created_at || message.createdAt || new Date().toISOString()
});

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Ownerchat() {
  useHtmlPage({
    title: "Owner Chat - Roomhy",
    bodyClass: "text-slate-800 h-screen overflow-hidden flex flex-col",
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
      { rel: "stylesheet", href: "/propertyowner/assets/css/instagram-chat.css" }
    ],
    scripts: [{ src: "https://cdn.tailwindcss.com" }],
    inlineScripts: []
  });

  const socketRef = useRef(null);
  const ownerRef = useRef(null);
  const currentChatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [owner, setOwner] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    ownerRef.current = owner;
  }, [owner]);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  useEffect(() => {
    const session = getOwnerRuntimeSession();
    if (!session?.loginId) {
      window.location.href = "/propertyowner/ownerlogin";
      return;
    }
    setOwner(session);
  }, []);

  useEffect(() => {
    if (!owner?.loginId) return;
    let cancelled = false;
    const loadChats = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const urlBookingId = searchParams.get("booking");
        const urlUserId = searchParams.get("user");

        const [bookingList, propMap] = await Promise.all([
          fetchBookingRequestsForOwner(owner.loginId),
          fetchPropertyMap().catch(() => new Map())
        ]);
        const normalized = bookingList.map(normalizeBooking).map((item) => {
          const userId = resolveWebsiteChatUserId(item);
          let propData = propMap.get(String(item.propertyId));
          if (!propData && item.propertyName) {
            propData = Array.from(propMap.values()).find(p => 
              (p.propertyName || p.property_name || p.propertyInfo?.name) === item.propertyName
            );
          }
          return {
            ...item,
            userId,
            user_id: userId,
            signup_user_id: userId,
            userName: getBookingDisplayName(item),
            rent: propData?.monthlyRent || propData?.rent || propData?.propertyInfo?.rent || propData?.pricingDetails?.baseRent || item.rent
          };
        });

        const accepted = normalized; // Show all requests in the sidebar for better UX

        let finalBookings = [...accepted];
        let targetChat = null;

        if (urlBookingId) {
          const matched = normalized.find(b => String(b.key) === urlBookingId || String(b._id) === urlBookingId || String(b.id) === urlBookingId);
          if (matched) {
            targetChat = matched;
            if (!finalBookings.some(b => b.key === matched.key)) {
              finalBookings.unshift(matched);
            }
          }
        } else if (accepted.length > 0) {
          targetChat = accepted[0];
        }

        if (!cancelled) {
          setBookings(finalBookings);
          if (targetChat) {
            setCurrentChat(targetChat);
            setMobileChatOpen(true);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err?.body || err?.message || "Failed to load conversations.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    loadChats();
    return () => {
      cancelled = true;
    };
  }, [owner?.loginId]);

  useEffect(() => {
    if (!owner?.loginId) return;
    const socket = io(getSocketUrl(), {
      transports: ["websocket"],
      upgrade: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000
    });
    socketRef.current = socket;

    const joinRoom = () => {
      const latestOwner = ownerRef.current;
      if (!latestOwner?.loginId) return;
      socket.emit("join_room", {
        login_id: String(latestOwner.loginId).trim().toUpperCase(),
        role: "property_owner",
        name: latestOwner.name || "Owner"
      });
    };

    const refreshActiveConversation = async () => {
      const latestOwner = ownerRef.current;
      const activeChat = currentChatRef.current;
      if (!latestOwner?.loginId || !activeChat?.userId) return;
      try {
        const list = await fetchConversation(latestOwner.loginId, activeChat.userId);
        setMessages((Array.isArray(list) ? list : []).map(normalizeMessage));
      } catch (_) { }
    };

    socket.on("connect", joinRoom);
    socket.on("reconnect", joinRoom);
    socket.on("receive_message", async (message) => {
      const incoming = normalizeMessage(message);
      const activeChat = currentChatRef.current;
      const latestOwner = ownerRef.current;
      if (!activeChat || !latestOwner?.loginId) return;
      const userId = resolveWebsiteChatUserId(activeChat);
      const senderId = String(incoming.sender_login_id || "").trim().toLowerCase();
      const roomId = String(incoming.room_id || "").trim().toLowerCase();
      const ownerId = String(latestOwner.loginId || "").trim().toLowerCase();
      if (senderId === String(userId || "").trim().toLowerCase() || roomId === ownerId) {
        await refreshActiveConversation();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [owner?.loginId, owner?.name]);

  useEffect(() => {
    if (!owner?.loginId || !currentChat?.userId) return;
    let cancelled = false;
    const loadConversation = async () => {
      try {
        const list = await fetchConversation(owner.loginId, currentChat.userId);
        if (!cancelled) {
          setMessages((Array.isArray(list) ? list : []).map(normalizeMessage));
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err?.body || err?.message || "Failed to load conversation.");
        }
      }
    };
    loadConversation();
    return () => {
      cancelled = true;
    };
  }, [owner?.loginId, currentChat?.userId]);

  const visibleBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return bookings;
    return bookings.filter((booking) =>
      [booking.userName, booking.userId, booking.email, booking.propertyName].filter(Boolean).join(" ").toLowerCase().includes(query)
    );
  }, [bookings, search]);

  const sendMessage = () => {
    if (!draft.trim() || !currentChat || !socketRef.current || !owner?.loginId) return;
    const userId = currentChat.userId || resolveWebsiteChatUserId(currentChat);
    if (!userId || !OWNER_LOGIN_ID_REGEX.test(String(owner.loginId || "").trim().toUpperCase()) || !WEBSITE_USER_ID_REGEX.test(String(userId || "").trim().toLowerCase())) {
      setErrorMsg("Invalid chat participants.");
      return;
    }

    socketRef.current.emit("send_message", { to_login_id: userId, message: draft.trim() });
    setMessages((prev) => [
      ...prev,
      normalizeMessage({
        sender_login_id: owner.loginId,
        sender_name: owner.name || "Owner",
        message: draft.trim(),
        created_at: new Date().toISOString(),
        room_id: userId
      })
    ]);
    setDraft("");
  };

  const sendBookingForm = () => {
    if (!currentChat || !socketRef.current || !owner?.loginId) return;
    const ownerId = String(owner.loginId || "").trim().toUpperCase();
    const userId = currentChat.userId || resolveWebsiteChatUserId(currentChat);

    if (!OWNER_LOGIN_ID_REGEX.test(ownerId) || !WEBSITE_USER_ID_REGEX.test(String(userId || "").trim().toLowerCase())) {
      setErrorMsg("Invalid chat participants.");
      return;
    }

    const bookingData = {
      bookingId: currentChat._id || currentChat.id || "",
      userId,
      propertyId: currentChat.propertyId || currentChat.property_id || currentChat._id || currentChat.id || "",
      propertyName: currentChat.propertyName || currentChat.property_name || "Roomhy Property",
      ownerId,
      ownerName: owner.name || currentChat.ownerName || currentChat.owner_name || "Owner",
      tenantName: currentChat.userName || currentChat.name || "Tenant",
      tenantEmail: currentChat.email || ""
    };

    sessionStorage.setItem("bookingRequestData", JSON.stringify(bookingData));

    const link = buildBookingFormLink({
      ...currentChat,
      ...bookingData
    });
    const messageText = `Here's your booking form: ${link}`;

    socketRef.current.emit("send_message", { to_login_id: userId, message: messageText });
    setMessages((prev) => [
      ...prev,
      normalizeMessage({
        sender_login_id: ownerId,
        sender_name: owner.name || "Owner",
        message: messageText,
        created_at: new Date().toISOString(),
        room_id: userId
      })
    ]);
    setDraft("");
    setErrorMsg("");
  };

  const sendPaymentLink = () => {
    if (!currentChat || !socketRef.current || !owner?.loginId) return;
    const rawRent = String(currentChat.rent || currentChat.roomRent || currentChat.price || "0").replace(/[^\d.-]/g, "");
    let rent = isNaN(parseFloat(rawRent)) ? 0 : parseFloat(rawRent);
    
    // If rent is 0 or invalid, ask the owner for the amount
    if (rent <= 0) {
      const userAmount = window.prompt(`Rent is not set for "${currentChat.propertyName}". Please enter the amount to request:`, "0");
      if (userAmount === null) return; // User cancelled
      rent = parseFloat(userAmount) || 0;
    }

    const userId = currentChat.userId || resolveWebsiteChatUserId(currentChat);
    const paymentLink = `${window.location.origin}/website/pay?bookingId=${currentChat.key}&amount=${rent}`;
    const msg = `Dear ${currentChat.userName}, please complete the payment of ₹${rent} to secure your booking for "${currentChat.propertyName}". 💳 You can pay securely via Razorpay here: ${paymentLink}`;
    
    socketRef.current.emit("send_message", { to_login_id: userId, message: msg });
    setMessages((prev) => [
      ...prev,
      normalizeMessage({
        sender_login_id: owner.loginId,
        sender_name: owner.name || "Owner",
        message: msg,
        created_at: new Date().toISOString(),
        room_id: userId
      })
    ]);
  };

  const sendReaction = (type) => {
    if (type === "BOOK") {
      sendBookingForm();
      return;
    }
    if (type === "PAY") {
      sendPaymentLink();
      return;
    }
    
    const messageMap = {
      LIKE: "Owner liked your enquiry. Please continue with booking. 😊",
      DISLIKE: "Owner is unable to proceed with this enquiry at this moment. 🙏"
    };
    
    const msg = messageMap[type];
    if (msg && currentChat && socketRef.current && owner?.loginId) {
      const userId = currentChat.userId || resolveWebsiteChatUserId(currentChat);
      socketRef.current.emit("send_message", { to_login_id: userId, message: msg });
      setMessages((prev) => [
        ...prev,
        normalizeMessage({
          sender_login_id: owner.loginId,
          sender_name: owner.name || "Owner",
          message: msg,
          created_at: new Date().toISOString(),
          room_id: userId
        })
      ]);
      setDraft("");
    }
  };

  return (
    <PropertyOwnerLayout
      owner={owner}
      title="Messages"
      navVariant="chat"
      headerVariant="compact"
      onLogout={() => {
        clearOwnerRuntimeSession();
        window.location.href = "/propertyowner/ownerlogin";
      }}
      mainClassName="flex-1 bg-slate-50 overflow-hidden p-0"
    >
      <div className="instagram-chat-container">
        {/* Left Sidebar - Chat List */}
        <div className={`chat-sidebar border-r border-slate-100 ${mobileChatOpen ? "hidden md:flex" : "flex"}`}>
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Inbox</h2>
            <button className="p-2.5 bg-white text-slate-400 hover:text-blue-600 rounded-xl shadow-sm border border-slate-100 transition-all">
              <Edit size={18} />
            </button>
          </div>

          <div className="p-6">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-3 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-1">
            {loading ? <div className="p-8 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest animate-pulse">Loading Roomhy Chat...</div> : null}
            {!loading && visibleBookings.length === 0 ? (
              <div className="p-8 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">No conversations found.</div>
            ) : null}
            {visibleBookings.map((booking) => {
              const active = currentChat?.key === booking.key;
              return (
                <div
                  key={booking.key}
                  onClick={() => {
                    setCurrentChat(booking);
                    setMobileChatOpen(true);
                  }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-[20px] transition-all cursor-pointer group",
                    active ? "bg-blue-600 shadow-lg shadow-blue-500/20" : "hover:bg-slate-50"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm transition-transform group-hover:scale-105",
                    active ? "bg-white text-blue-600" : "bg-slate-100 text-slate-500"
                  )}>
                    {String(booking.userName || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={cn("text-sm font-bold truncate", active ? "text-white" : "text-slate-900")}>{booking.userName}</span>
                      {String(booking.status).toLowerCase() === "pending" && (
                        <span className={cn("text-[8px] font-black px-1.5 py-0.5 rounded-lg", active ? "bg-white/20 text-white" : "bg-amber-100 text-amber-600")}>PENDING</span>
                      )}
                    </div>
                    <div className={cn("text-[10px] font-bold truncate uppercase tracking-widest opacity-60", active ? "text-blue-100" : "text-slate-400")}>{booking.propertyName}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Canvas - Chat Active */}
        <div className={`chat-canvas bg-white ${mobileChatOpen ? "flex" : "hidden md:flex"}`}>
          {!currentChat ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/30">
              <div className="w-24 h-24 bg-white rounded-[32px] shadow-2xl shadow-blue-500/5 flex items-center justify-center mb-8 border border-slate-50">
                <Send className="w-10 h-10 text-blue-600 -rotate-45" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">Your Messages</h2>
              <p className="text-sm font-bold text-slate-400 max-w-xs leading-relaxed uppercase tracking-widest opacity-60">Select a conversation from the sidebar to start messaging.</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Chat Header */}
                <div className="h-20 px-8 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
                  <div className="flex items-center gap-4">
                    <button className="md:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl" onClick={() => setMobileChatOpen(false)}>
                      <ArrowLeft size={20} />
                    </button>
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg shadow-sm">
                      {String(currentChat.userName || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-black text-slate-900 leading-none">{currentChat.userName}</h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Active Session</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <button onClick={sendBookingForm} title="Send Booking Form" className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
                       <Bookmark size={14} /> BOOK
                     </button>
                     <button onClick={sendPaymentLink} title="Request Payment" className="p-2.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all border border-amber-100">
                       <CreditCard size={18} />
                     </button>
                     <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Phone size={18} /></button>
                     <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Video size={18} /></button>
                     <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Info size={18} /></button>
                  </div>
                </div>

              {/* Chat Messages */}
              <div className="chat-messages-container custom-scrollbar">
                {errorMsg ? <div className="text-center py-2 text-xs text-red-500">{errorMsg}</div> : null}
                <div className="timestamp-separator">Feb 23, 2026, 1:56 AM</div>
                
                {messages.map((message) => {
                  const mine = String(message.sender_login_id || "").toUpperCase() === String(owner?.loginId || "").toUpperCase();
                  return (
                    <div 
                      key={message.key} 
                      className={`message-bubble ${mine ? "message-sent" : "message-received"}`}
                      title={formatDate(message.createdAt)}
                    >
                      {String(message.text).split(/(https?:\/\/[^\s]+)/g).map((part, i) => 
                        part.match(/(https?:\/\/[^\s]+)/g) 
                          ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800 break-all">{part}</a>
                          : part
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef}></div>
              </div>

              {/* Chat Input */}
              {["approved", "accepted", "visited", "booked", "confirmed"].includes(String(currentChat.status).toLowerCase()) ? (
                <div className="chat-input-container">
                  <div className="chat-input-wrapper">
                    <button className="chat-input-btn"><Smile className="w-6 h-6" /></button>
                    <textarea
                      rows="1"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Message..."
                      className="chat-input-field custom-scrollbar"
                    />
                    {draft.trim() ? (
                      <button onClick={sendMessage} className="chat-send-btn">Send</button>
                    ) : (
                      <div className="chat-input-actions">
                        <button className="chat-input-btn"><Mic className="w-6 h-6" /></button>
                        <button className="chat-input-btn"><ImageIcon className="w-6 h-6" /></button>
                        <button className="chat-input-btn"><Heart className="w-6 h-6" /></button>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Reactions - Small Chips */}
                  <div className="mt-3 flex gap-2 justify-center">
                    <button onClick={() => sendReaction("LIKE")} className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold border border-green-100 hover:bg-green-100 transition-all">
                      <ThumbsUp className="w-3 h-3" /> LIKE
                    </button>
                    <button onClick={() => sendReaction("DISLIKE")} className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold border border-red-100 hover:bg-red-100 transition-all">
                      <ThumbsDown className="w-3 h-3" /> DISLIKE
                    </button>
                    <button onClick={() => sendReaction("BOOK")} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100 hover:bg-blue-100 transition-all">
                      <Bookmark className="w-3 h-3" /> SEND FORM
                    </button>
                    <button onClick={() => sendReaction("PAY")} className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold border border-amber-100 hover:bg-amber-100 transition-all">
                      <CreditCard className="w-3 h-3" /> REQUEST PAY
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border-t border-gray-100 text-center">
                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                      <Bookmark className="w-4 h-4 text-amber-500" />
                      <p className="text-xs font-bold text-gray-600">Approve this request in <Link to="/propertyowner/booking_request" className="text-teal-600 hover:underline">Booking Requests</Link> to enable chat.</p>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
