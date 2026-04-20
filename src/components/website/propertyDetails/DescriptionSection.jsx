import { useState } from "react";
import { Bed, Users, Wifi, Wind, Droplet, ChevronDown, ChevronUp } from "lucide-react";

const AMENITY_ICONS = {
  "wifi": "📶",
  "ac": "❄️",
  "parking": "🅿️",
  "laundry": "🧺",
  "gym": "💪",
  "food": "🍽️",
  "mess": "🍽️",
  "restaurant": "🏠",
  "water": "💧",
  "geyser": "🚿",
  "tv": "📺",
  "power": "⚡",
  "security": "🔒",
  "cctv": "📹",
  "furniture": "🪑",
  "bed": "🛏️",
  "mattress": "🛏️",
  "wardrobe": "👔",
  "table": "📝",
  "chair": "💺",
  "fan": "🌀",
  "cooler": "🧊",
  "cleaning": "🧹",
  "pet": "🐾",
  "garden": "🌿",
  "pool": "🏊",
  "terrace": "☀️",
  "balcony": "🏗️",
  "lift": "🛗",
  "kitchen": "👩‍🍳",
};

function getAmenityIcon(amenity) {
  const lower = amenity.toLowerCase();
  for (const [key, icon] of Object.entries(AMENITY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "✨";
}

export default function DescriptionSection({ description, amenities = [], beds, gender, price }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 200;
  const isLong = description && description.length > MAX_LENGTH;

  // Quick info items
  const quickInfo = [
    { label: "Bedrooms", value: beds || "—", icon: "🛏️" },
    { label: "For", value: gender || "Any", icon: "👥" },
    { label: "Monthly Rent", value: `₹${price || 0}`, icon: "💰" },
    { label: "Status", value: "Available", icon: "✅" },
  ];

  return (
    <div className="px-4 md:px-0 py-5 border-b border-gray-100">
      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {quickInfo.map((item) => (
          <div key={item.label} className="text-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-lg">{item.icon}</span>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">{item.label}</p>
            <p className="text-gray-900 font-bold text-base mt-0.5">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <h2 className="text-lg font-bold text-gray-900 mb-2">Description</h2>
      <p className="text-gray-600 text-sm leading-relaxed">
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

      {/* Most Popular For / Amenities */}
      {amenities.length > 0 && (
        <div className="mt-6">
          <h3 className="text-base font-bold text-gray-900 mb-3">Most Popular For</h3>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 hover:bg-amber-50 hover:border-amber-100 transition-colors"
              >
                <span>{getAmenityIcon(amenity)}</span>
                <span className="font-medium">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
