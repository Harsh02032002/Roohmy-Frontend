import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { Send, Search, Phone, MapPin, Users, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { fetchJson } from "../../utils/api";

export default function WebsiteChat() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  // Mock data - Replace with actual API calls
  const mockConversations = [
    {
      id: 1,
      property: "Cozy PG North",
      location: "Kota, Rajasthan",
      owner: "Rajesh Singh",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600",
      rent: "₹8,000",
      lastMessage: "When can you visit?",
      timestamp: "2 mins ago",
      unread: 1
    },
    {
      id: 2,
      property: "Student Hostel Central",
      location: "Indore, MP",
      owner: "Priya Sharma",
      image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
      rent: "₹6,500",
      lastMessage: "Room is available from next month",
      timestamp: "10 mins ago",
      unread: 0
    },
    {
      id: 3,
      property: "Premium Shared Room",
      location: "Jaipur, Rajasthan",
      owner: "Rohan Verma",
      image: "https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=600",
      rent: "₹9,500",
      lastMessage: "You: Thanks for the info",
      timestamp: "1 hour ago",
      unread: 0
    }
  ];

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      // Mock messages - Replace with actual API call
      const mockMessages = [
        {
          id: 1,
          sender: selectedConversation.owner,
          text: "Hello! Are you interested in our property?",
          timestamp: "10:30 AM",
          isOwner: true
        },
        {
          id: 2,
          sender: "You",
          text: "Yes, I'm very interested! Can you tell me more about the amenities?",
          timestamp: "10:32 AM",
          isOwner: false
        },
        {
          id: 3,
          sender: selectedConversation.owner,
          text: "Of course! We have WiFi, Hot water, Laundry facility, and a common kitchen.",
          timestamp: "10:33 AM",
          isOwner: true
        },
        {
          id: 4,
          sender: selectedConversation.owner,
          text: "When can you visit?",
          timestamp: "10:34 AM",
          isOwner: true
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedConversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // Add message to UI immediately
    const userMessage = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwner: false
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate owner response
    setTimeout(() => {
      const ownerMessage = {
        id: messages.length + 2,
        sender: selectedConversation.owner,
        text: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwner: true
      };
      setMessages(prev => [...prev, ownerMessage]);
    }, 1000);
  };

  const filteredConversations = conversations.length > 0 
    ? conversations.filter(c => 
        c.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockConversations.filter(c =>
        c.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[150px] bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-lg text-gray-600">Connect with property owners and discuss details</p>
          </div>
        </div>

        {/* Chat Section */}
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Conversations List */}
              <div className="lg:col-span-1 border border-gray-200 rounded-xl overflow-hidden flex flex-col bg-white">
                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map(conversation => (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                          selectedConversation?.id === conversation.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <img
                            src={conversation.image}
                            alt={conversation.property}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">
                              {conversation.property}
                            </h4>
                            <p className="text-xs text-gray-500 mb-1">{conversation.location}</p>
                            <p className="text-xs text-gray-600 truncate">{conversation.lastMessage}</p>
                            <p className="text-xs text-gray-400 mt-1">{conversation.timestamp}</p>
                          </div>
                          {conversation.unread > 0 && (
                            <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                              {conversation.unread}
                            </div>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No conversations found</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2 border border-gray-200 rounded-xl overflow-hidden flex flex-col bg-white">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={selectedConversation.image}
                            alt={selectedConversation.property}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-bold text-gray-900">{selectedConversation.property}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {selectedConversation.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {selectedConversation.owner}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-white rounded-lg border border-gray-200 transition-colors">
                            <Phone className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg border border-gray-200 transition-colors">
                            <ExternalLink className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                      {messages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwner ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md${message.isOwner ? " bg-white border border-gray-200 rounded-2xl rounded-tl-none" : " bg-blue-600 text-white rounded-2xl rounded-br-none"} px-4 py-2`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${message.isOwner ? "text-gray-500" : "text-blue-100"}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                        <button
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Send
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg font-semibold">No conversation selected</p>
                    <p className="text-sm">Click a conversation from the left to start chatting</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: MessageCircle,
                  title: "Direct Messaging",
                  desc: "Chat directly with property owners about availability and details"
                },
                {
                  icon: Clock,
                  title: "Quick Response",
                  desc: "Get instant notifications when owners message you back"
                },
                {
                  icon: ExternalLink,
                  title: "Visit Booking",
                  desc: "Schedule property visits directly through messages"
                }
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <Icon className="w-10 h-10 text-blue-600 mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}
