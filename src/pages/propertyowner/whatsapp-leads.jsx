import React, { useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { getOwnerRuntimeSession, clearOwnerRuntimeSession } from "../../utils/propertyowner";
import { 
  MessageSquare, Search, Phone, ExternalLink, 
  UserCheck, AlertCircle, Clock, Zap
} from "lucide-react";

export default function WhatsappLeadsPage() {
  const owner = getOwnerRuntimeSession();
  if (!owner?.loginId && typeof window !== "undefined") { 
    window.location.href = "/propertyowner/ownerlogin"; 
    return null; 
  }

  const [search, setSearch] = useState("");
  const [leads, setLeads] = useState([
    { id: 1, name: "Varun Dhawan", phone: "+91 95432 11002", lastMessage: "Is single occupancy AC room available in Silver heights?", status: "Bot Replied (Pricing Sent)", date: "Just now" },
    { id: 2, name: "Alia Bhatt", phone: "+91 99988 77766", lastMessage: "Can I schedule a visit for tomorrow at 2 PM?", status: "Needs Human Response", date: "15 minutes ago" },
    { id: 3, name: "Siddharth Malhotra", phone: "+91 98765 44321", lastMessage: "Yes, please confirm double sharing.", status: "Bot Replied (Welcome Template)", date: "1 hour ago" }
  ]);

  const handleAction = (id) => {
    // Action trigger
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: "Handled" } : l));
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PropertyOwnerLayout 
      owner={owner} 
      title="WhatsApp Integration Leads" 
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">WhatsApp Chat Leads</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">Monitor automated chatbot captures, replies, templates, and human handoff states.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chat leads by sender name or content..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid of WhatsApp Leads */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  item.status === "Needs Human Response" 
                    ? "bg-rose-50 text-rose-600 border border-rose-100 animate-pulse" 
                    : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                }`}>
                  {item.status}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-[21px] font-bold text-foreground">{item.name}</h3>
                <p className="text-[12px] font-mono text-muted-foreground mt-0.5">{item.phone} • {item.date}</p>
                <p className="text-[12.5px] text-muted-foreground mt-3 italic bg-emerald-50/20 p-3 rounded-xl border border-emerald-100/30">
                  " {item.lastMessage} "
                </p>
              </div>
            </div>

            <div className="border-t border-border/60 mt-6 pt-4 flex gap-2">
              <a 
                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5"
              >
                Open WhatsApp <ExternalLink size={13} />
              </a>
              {item.status === "Needs Human Response" && (
                <button 
                  onClick={() => handleAction(item.id)}
                  className="px-4 h-10 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground"
                >
                  Mark Handled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </PropertyOwnerLayout>
  );
}
