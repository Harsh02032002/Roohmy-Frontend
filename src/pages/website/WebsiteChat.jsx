import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { MessageCircle, Send, ArrowLeft, ShieldCheck, Sparkles, Paperclip, Smile, FileText, Image as ImageIcon, Download } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { fetchJson, getApiBase } from "../../utils/api";
import EmojiPicker from 'emoji-picker-react';

const generateWebsiteUserIdFromEmail = (email) => {
  const safeEmail = String(email || "").trim().toLowerCase();
  if (!safeEmail) return "";
  let hash = 0;
  for (let i = 0; i < safeEmail.length; i += 1) {
    hash = (hash * 31 + safeEmail.charCodeAt(i)) % 1000000;
  }
  return `roomhyweb${String(hash).padStart(6, "0")}`;
};

const normalizeWebsiteUserId = (rawId) => {
  const id = String(rawId || "").trim().toLowerCase();
  const digits = id.replace(/\D/g, "").slice(-6);
  if (digits.length === 6) return `roomhyweb${digits}`;
  return "";
};

const resolveWebsiteUserId = (user) => {
  const fromEmail = generateWebsiteUserIdFromEmail(user?.email || "");
  if (fromEmail) return fromEmail;
  return normalizeWebsiteUserId(user?.loginId || user?.id || "");
};

const SUPERADMIN_LOGIN_ID = "SUPER_ADMIN";

const normalizeMessage = (message) => ({
  ...message,
  _id: message?._id || `${message?.sender_login_id || "msg"}-${message?.created_at || Date.now()}`,
  message: String(message?.message || ""),
  created_at: message?.created_at || new Date().toISOString()
});

export default function WebsiteChat() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [chatError, setChatError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const activeChatRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/website/login");
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const websiteUserId = useMemo(() => resolveWebsiteUserId(user), [user]);

  useEffect(() => {
    const loadChats = async () => {
      if (!websiteUserId) return;
      setLoadingChats(true);
      setChatError("");
      try {
        const data = await fetchJson(`/api/chat/inbox/${encodeURIComponent(websiteUserId)}`);
        const conversationRows = Array.isArray(data?.conversations) ? data.conversations : [];
        const normalized = conversationRows
          .filter((row) => String(row.participant_login_id || "").toUpperCase() === SUPERADMIN_LOGIN_ID)
          .map((row, idx) => ({
            id: row.participant_login_id || `superadmin-${idx}`,
            participant_login_id: row.participant_login_id || SUPERADMIN_LOGIN_ID,
            participant_name: row.participant_name || "Roomhy Admin",
            last_message: row.last_message || "Start your chat with Roomhy Admin",
            timestamp: row.last_message_at || new Date().toISOString(),
            unread: Number(row.unread_count || 0)
          }));

        const fallbackChat = {
          id: SUPERADMIN_LOGIN_ID,
          participant_login_id: SUPERADMIN_LOGIN_ID,
          participant_name: "Roomhy Admin",
          last_message: "Need help with booking or property? Chat with admin.",
          timestamp: new Date().toISOString(),
          unread: 0
        };

        const chatList = normalized.length > 0 ? normalized : [fallbackChat];
        setChats(chatList);
        setActiveChat((prev) => prev || chatList[0]);
      } catch (error) {
        console.error("Error loading chats:", error);
        setChatError("Unable to load chat list.");
      } finally {
        setLoadingChats(false);
      }
    };

    if (websiteUserId) {
      loadChats();
    }
  }, [websiteUserId]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!activeChat || !websiteUserId) return;
      setLoadingMessages(true);
      setChatError("");
      try {
        const list = await fetchJson(
          `/api/chat/conversation?user1=${encodeURIComponent(websiteUserId)}&user2=${encodeURIComponent(activeChat.participant_login_id)}`
        );
        setMessages((Array.isArray(list) ? list : []).map(normalizeMessage));
        await fetchJson(`/api/chat/mark-read/${encodeURIComponent(websiteUserId)}`, { method: "POST" });
      } catch (error) {
        console.error("Error loading messages:", error);
        setChatError("Unable to load messages.");
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };

    if (activeChat) {
      loadMessages();
    }
  }, [activeChat, websiteUserId]);

  useEffect(() => {
    if (!websiteUserId || !user) return undefined;

    const socket = io(getApiBase(), {
      transports: ["websocket"],
      upgrade: false,
      reconnection: true
    });
    socketRef.current = socket;

    const joinSelfRoom = () => {
      socket.emit("join_room", {
        login_id: websiteUserId,
        role: "website_user",
        name: user?.name || user?.email || "Website User"
      });
    };

    const refreshCurrentConversation = async () => {
      const current = activeChatRef.current;
      if (!current) return;
      try {
        const list = await fetchJson(
          `/api/chat/conversation?user1=${encodeURIComponent(websiteUserId)}&user2=${encodeURIComponent(current.participant_login_id)}`
        );
        setMessages((Array.isArray(list) ? list : []).map(normalizeMessage));
      } catch (_) {}
    };

    socket.on("connect", joinSelfRoom);
    socket.on("reconnect", joinSelfRoom);
    socket.on("receive_message", async (incoming) => {
      const sender = String(incoming?.sender_login_id || "").trim().toUpperCase();
      const roomId = String(incoming?.room_id || "").trim().toLowerCase();
      if (sender === SUPERADMIN_LOGIN_ID || roomId === websiteUserId.toLowerCase()) {
        await refreshCurrentConversation();
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [websiteUserId, user]);

  const sendMessage = () => {
    if (!messageText.trim() || !activeChat || !websiteUserId || !socketRef.current) return;
    const trimmed = messageText.trim();

    socketRef.current.emit("send_message", {
      to_login_id: activeChat.participant_login_id,
      message: trimmed
    });

    const optimisticMessage = normalizeMessage({
      _id: `temp-${Date.now()}`,
      sender_login_id: websiteUserId,
      sender_name: user?.name || "You",
      message: trimmed,
      created_at: new Date().toISOString()
    });

    setMessages((prev) => [...prev, optimisticMessage]);
    setMessageText("");
    setShowEmojiPicker(false);
  };

  const onEmojiClick = (emojiData) => {
    setMessageText(prev => prev + emojiData.emoji);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeChat || !websiteUserId) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${getApiBase()}/api/upload-file`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      
      if (data.url) {
        const isImg = file.type.startsWith('image/');
        const fileMsg = {
          to_login_id: activeChat.participant_login_id,
          message: `Sent a ${isImg ? 'photo' : 'file'}: ${file.name}`,
          message_type: isImg ? 'image' : 'file',
          file_url: data.url
        };
        socketRef.current.emit("send_message", fileMsg);
        
        setMessages(prev => [...prev, normalizeMessage({
          sender_login_id: websiteUserId,
          sender_name: user?.name || "You",
          message: fileMsg.message,
          message_type: fileMsg.message_type,
          file_url: data.url,
          created_at: new Date().toISOString()
        })]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("File upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderMessage = (msg) => {
    const userId = websiteUserId;
    const isMine = String(msg.sender_login_id || "").trim().toLowerCase() === String(userId).toLowerCase();
    const isImage = msg.message_type === 'image';
    const isFile = msg.message_type === 'file';
    
    return (
      <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-6`}>
        <div className={`max-w-[85%] md:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
          isMine 
            ? 'bg-teal-500 text-white rounded-br-none shadow-teal-100 shadow-lg' 
            : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
        }`}>
          {isImage ? (
            <div className="space-y-2">
               <img src={msg.file_url} alt="uploaded" className="max-w-full rounded-xl cursor-pointer hover:opacity-90 transition-opacity" onClick={() => window.open(msg.file_url, '_blank')} />
               <p className="text-xs opacity-80">{msg.message}</p>
            </div>
          ) : isFile ? (
            <a href={msg.file_url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isMine ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
               <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isMine ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-600'}`}>
                  <FileText size={20} />
               </div>
               <div className="min-w-0">
                  <p className={`text-xs font-bold truncate ${isMine ? 'text-white' : 'text-gray-800'}`}>{msg.message.replace('Sent a file: ', '')}</p>
                  <p className={`text-[10px] opacity-60 ${isMine ? 'text-white' : 'text-gray-500'}`}>Click to download</p>
               </div>
            </a>
          ) : (
            <p className="text-sm leading-relaxed">{msg.message}</p>
          )}
          <p className={`text-[10px] font-bold mt-2 ${isMine ? 'text-teal-100 text-right' : 'text-gray-400'}`}>
            {formatTime(msg.created_at)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WebsiteNavbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden" style={{ height: "720px" }}>
          <div className="flex h-full">
            <div className={`${activeChat ? "hidden md:flex" : "flex"} w-full md:w-80 bg-gray-50 border-r border-gray-200 flex-col`}>
              <div className="p-6 border-b border-gray-200 bg-white">
                <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  Roomhy Support
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider font-bold">24/7 Assistance</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {chatError ? (
                  <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl p-4 mb-4">{chatError}</div>
                ) : null}
                {loadingChats ? (
                  <div className="text-center py-10 text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
                    <p className="text-xs font-bold">Connecting to support...</p>
                  </div>
                ) : (
                  chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setActiveChat(chat)}
                      className={`w-full text-left p-4 rounded-2xl mb-3 transition-all ${
                        activeChat?.id === chat.id 
                          ? 'bg-white shadow-lg shadow-teal-500/10 border-l-4 border-l-teal-500' 
                          : 'hover:bg-white/50 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold shadow-inner">
                          {(chat.participant_name || "A").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-800 truncate text-[14px]">
                            {chat.participant_name || "Roomhy Admin"}
                          </div>
                          <div className="text-xs text-gray-400 truncate font-medium mt-0.5">
                            {chat.last_message}
                          </div>
                        </div>
                        {chat.unread > 0 ? (
                          <span className="bg-teal-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{chat.unread}</span>
                        ) : null}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className={`${activeChat ? "flex" : "hidden md:flex"} flex-1 flex-col relative bg-slate-50/50`}>
              {activeChat ? (
                <>
                  <div className="p-5 border-b border-gray-100 bg-white flex items-center justify-between shadow-sm z-10">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setActiveChat(null)} className="md:hidden text-gray-400 hover:text-gray-600 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                      </button>
                      <div className="relative">
                         <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold shadow-lg shadow-teal-500/20">
                            {(activeChat.participant_name || "A").charAt(0).toUpperCase()}
                         </div>
                         <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-[15px]">
                          {activeChat.participant_name || "Roomhy Admin"}
                        </h4>
                        <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                          Online Support
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-2">
                    {loadingMessages ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500 mb-4"></div>
                        <p className="text-xs font-bold uppercase tracking-widest">Syncing messages...</p>
                      </div>
                    ) : (
                      <>
                        {messages.map(renderMessage)}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  <div className="p-6 bg-white border-t border-gray-100 relative">
                    {showEmojiPicker && (
                       <div className="absolute bottom-full left-6 z-50 mb-4 shadow-2xl rounded-2xl overflow-hidden border border-slate-100">
                          <EmojiPicker onEmojiClick={onEmojiClick} width={320} height={400} />
                       </div>
                    )}
                    
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" />

                    <div className={`flex items-center gap-3 bg-gray-50 rounded-2xl p-2 pr-4 border border-gray-100 transition-all ${isUploading ? 'opacity-50 pointer-events-none' : 'focus-within:border-teal-200 focus-within:bg-white focus-within:shadow-md'}`}>
                      <div className="flex items-center gap-1">
                        <button onClick={() => fileInputRef.current?.click()} className="p-2.5 text-gray-400 hover:bg-white hover:text-teal-600 rounded-xl transition-all">
                           <Paperclip size={20} />
                        </button>
                        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`p-2.5 rounded-xl transition-all ${showEmojiPicker ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-400 hover:bg-white hover:text-teal-600'}`}>
                           <Smile size={20} />
                        </button>
                      </div>
                      
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder={isUploading ? "Uploading file..." : "Type your message here..."}
                        className="flex-1 bg-transparent border-none py-3 text-[13px] font-medium placeholder:text-gray-400 focus:outline-none"
                      />
                      
                      <button
                        onClick={sendMessage}
                        className="bg-teal-500 text-white p-3 rounded-xl hover:bg-teal-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-teal-500/20"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                  <div className="text-center max-w-sm px-6">
                    <div className="w-24 h-24 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-teal-500">
                       <MessageCircle size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                       Hello, How can we help?
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                       Select the support conversation to start chatting with our executive. We usually reply within a few minutes.
                    </p>
                    <button onClick={() => setChats(prev => prev.length > 0 ? prev : chats)} className="px-8 py-3 bg-teal-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-teal-500/20 hover:bg-teal-600 transition-all">
                       Start Conversation
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  );
}
