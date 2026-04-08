import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import WebsiteNavbar from '../../components/website/WebsiteNavbar';
import WebsiteFooter from '../../components/website/WebsiteFooter';
import { MessageCircle, Send, ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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

export default function WebsiteChat() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showLikePopup, setShowLikePopup] = useState(false);
  const [showDislikePopup, setShowDislikePopup] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/website/login');
      return;
    }
  }, [isAuthenticated, navigate]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chats
  useEffect(() => {
    const loadChats = async () => {
      if (!user) return;
      
      setLoadingChats(true);
      try {
        // Mock data for now - replace with actual API call
        const mockChats = [
          {
            id: '1',
            owner_id: 'ROOMHY0001',
            owner_name: 'Rajesh Kumar',
            property_name: 'Aashirwad PG - Kota',
            user_email: user?.email || '',
            last_message: 'Hi, I\'m interested in your property',
            timestamp: new Date().toISOString()
          },
          {
            id: '2',
            owner_id: 'ROOMHY0002', 
            owner_name: 'Priya Sharma',
            property_name: 'Shanti Hostel - Indore',
            user_email: user?.email || '',
            last_message: 'When can I visit?',
            timestamp: new Date().toISOString()
          }
        ];
        
        setChats(mockChats);
        if (mockChats.length > 0) {
          setActiveChat(mockChats[0]);
        }
      } catch (error) {
        console.error('Error loading chats:', error);
        setChats([]);
      } finally {
        setLoadingChats(false);
      }
    };

    if (user) {
      loadChats();
    }
  }, [user]);

  // Load messages when chat is selected
  useEffect(() => {
    const loadMessages = async () => {
      if (!activeChat) return;
      
      setLoadingMessages(true);
      try {
        // Mock messages - replace with actual API call
        const mockMessages = [
          {
            _id: '1',
            sender_login_id: activeChat.owner_id,
            sender_name: activeChat.owner_name,
            message: 'Hello! Welcome to our property. How can I help you?',
            created_at: new Date(Date.now() - 3600000).toISOString()
          },
          {
            _id: '2',
            sender_login_id: resolveWebsiteUserId(user),
            sender_name: user?.name || 'You',
            message: 'Hi, I\'m interested in your property',
            created_at: new Date(Date.now() - 3000000).toISOString()
          },
          {
            _id: '3',
            sender_login_id: activeChat.owner_id,
            sender_name: activeChat.owner_name,
            message: 'Great! Our property has all modern amenities. Would you like to schedule a visit?',
            created_at: new Date(Date.now() - 2400000).toISOString()
          }
        ];
        
        setMessages(mockMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };

    if (activeChat) {
      loadMessages();
    }
  }, [activeChat, user]);

  const sendMessage = () => {
    if (!messageText.trim() || !activeChat || !user) return;
    
    const newMessage = {
      _id: `${Date.now()}`,
      sender_login_id: resolveWebsiteUserId(user),
      sender_name: user?.name || 'You',
      message: messageText.trim(),
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageText("");
    
    // Here you would also send the message via socket/API
    console.log('Sending message:', newMessage);
  };

  const sendReaction = (type) => {
    if (!activeChat || !user) return;
    
    const reactionMessage = type === "like" ? "👍 LIKE" : "👎 DISLIKE";
    const newMessage = {
      _id: `${Date.now()}`,
      sender_login_id: resolveWebsiteUserId(user),
      sender_name: user?.name || 'You',
      message: reactionMessage,
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setShowLikePopup(false);
    setShowDislikePopup(false);
    
    // Here you would also send the reaction via socket/API
    console.log('Sending reaction:', reactionMessage);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderMessage = (msg) => {
    const userId = resolveWebsiteUserId(user);
    const isMine = String(msg.sender_login_id || "").trim().toLowerCase() === String(userId).toLowerCase();
    
    return (
      <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isMine 
            ? 'bg-teal-500 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}>
          <p className="text-sm">{msg.message}</p>
          <p className={`text-xs mt-1 ${isMine ? 'text-teal-100' : 'text-gray-500'}`}>
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
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Chat List Sidebar */}
            <div className={`${activeChat ? "hidden md:flex" : "flex"} w-full md:w-80 bg-gray-50 border-r border-gray-200 flex-col`}>
              <div className="p-4 border-b border-gray-200 bg-white">
                <h3 className="font-bold text-gray-800 text-lg">My Chats</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3">
                {loadingChats ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-2"></div>
                    Loading chats...
                  </div>
                ) : chats.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    No chats yet
                  </div>
                ) : (
                  chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setActiveChat(chat)}
                      className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                        activeChat?.id === chat.id 
                          ? 'bg-teal-50 border-teal-200 border' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                          {(chat.owner_name || "O").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-800 truncate">
                            {chat.owner_name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {chat.property_name}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {chat.last_message}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Window */}
            <div className={`${activeChat ? "flex" : "hidden md:flex"} flex-1 flex-col`}>
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveChat(null)}
                        className="md:hidden text-gray-500 hover:text-gray-700"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                        {(activeChat.owner_name || "O").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {activeChat.owner_name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {activeChat.property_name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {loadingMessages ? (
                      <div className="text-center py-8 text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-2"></div>
                        Loading messages...
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      <>
                        {messages.map(renderMessage)}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2 mb-2">
                      <button
                        onClick={() => setShowLikePopup(true)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-medium hover:bg-green-100 transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Like
                      </button>
                      <button
                        onClick={() => setShowDislikePopup(true)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        Dislike
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        onClick={sendMessage}
                        className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Your Conversations
                    </h3>
                    <p className="text-gray-500">
                      Select a chat from the sidebar to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Like Popup */}
      {showLikePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Book Property?</h3>
              <p className="text-gray-600 mb-4">
                Click LIKE to confirm your interest in this property
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLikePopup(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => sendReaction('like')}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Like
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dislike Popup */}
      {showDislikePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsDown className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">End Chat?</h3>
              <p className="text-gray-600 mb-4">
                Click DISLIKE to reject this property and close the chat
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDislikePopup(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => sendReaction('dislike')}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Dislike
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <WebsiteFooter />
    </div>
  );
}
