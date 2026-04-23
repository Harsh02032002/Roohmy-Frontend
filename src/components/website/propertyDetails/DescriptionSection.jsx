import { useState } from "react";
import { Bed, Users, Wifi, Wind, Droplet, ChevronDown, ChevronUp } from "lucide-react";

const AMENITY_ICONS = {
  "wifi": "📶", "ac": "❄️", "parking": "🅿️", "laundry": "🧺",
  "gym": "💪", "food": "🍽️", "mess": "🍽️", "restaurant": "🏠",
  "water": "💧", "geyser": "🚿", "tv": "📺", "power": "⚡",
  "security": "🔒", "cctv": "📹", "furniture": "🪑", "bed": "🛏️",
  "mattress": "🛏️", "wardrobe": "👔", "table": "📝", "chair": "💺",
  "fan": "🌀", "cooler": "🧊", "cleaning": "🧹", "pet": "🐾",
  "garden": "🌿", "pool": "🏊", "terrace": "☀️", "balcony": "🏗️",
  "lift": "🛗", "kitchen": "👩‍🍳",
};

function getAmenityIcon(amenity) {
  const name = typeof amenity === 'string' ? amenity : (amenity?.name || amenity?.icon || "");
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(AMENITY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "✨";
}

function normalizeCategory(category) {
  if (!category) return "basic";
  const normalized = String(category).trim().toLowerCase();
  if (["popular", "mostpopular", "most_popular", "most-popular"].includes(normalized)) return "popular";
  if (["basic", "amenity", "amenities"].includes(normalized)) return "basic";
  return normalized;
}

export default function DescriptionSection({ description, amenities = [], beds, gender, price }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 200;
  const isLong = description && description.length > MAX_LENGTH;

  // Quick info items — OYO style: simple key-value pairs in a row
  const quickInfo = [
    { label: "BEDROOMS", value: beds || "—", icon: "🛏️" },
    { label: "FOR", value: gender || "Any", icon: "👥" },
    { label: "MONTHLY RENT", value: `₹${price || 0}`, icon: "💰" },
    { label: "STATUS", value: "Available", icon: "✅" },
  ];

  const popularAmenities = amenities.filter((amenity) => {
    if (typeof amenity === "string") return false;
    return normalizeCategory(amenity?.category) === "popular";
  });

  return (
    <div className="px-4 md:px-0 py-5 md:py-6" style={{ borderBottom: '1px solid #e8e8e8' }}>
      {/* Quick Info — OYO-style horizontal stat bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mb-6 rounded-lg overflow-hidden" style={{ border: '1px solid #e8e8e8' }}>
        {quickInfo.map((item, idx) => (
          <div 
            key={item.label} 
            className="text-center py-4 px-3"
            style={{ 
              borderRight: idx < quickInfo.length - 1 ? '1px solid #e8e8e8' : 'none',
              borderBottom: idx < 2 ? '1px solid #e8e8e8' : 'none',
            }}
          >
            <span className="text-lg block mb-1">{item.icon}</span>
            <p className="text-[10px] text-[#6d787d] uppercase tracking-wider font-medium">{item.label}</p>
            <p className="text-[#222] font-bold text-base mt-0.5">{item.value}</p>
          </div>
        ))}
      </div>

      {/* About this property — OYO style */}
      <h2 className="text-[22px] font-bold text-[#222] mb-2">About this property</h2>
      <p className="text-[15px] text-[#6d787d] leading-relaxed">
        {isLong && !expanded
          ? `${description.slice(0, MAX_LENGTH)}...`
          : description || "No description provided"}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-2 text-[#EE4266] text-sm font-semibold hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}

      {/* Most Popular For */}
      {popularAmenities.length > 0 && (
        <div className="mt-6">
          <h3 className="text-base font-bold text-[#222] mb-3">Most Popular For</h3>
          <div className="flex flex-wrap gap-2.5">
            {popularAmenities.map((amenity, idx) => {
              const amenityName = amenity?.name || "";
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-[#222]"
                  style={{ border: '1px solid #e8e8e8', background: '#fafafa' }}
                >
                  <span>{getAmenityIcon(amenity)}</span>
                  <span className="font-medium">{amenityName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
