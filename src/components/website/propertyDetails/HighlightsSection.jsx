import { Home, Clock, Users, ShieldCheck, Utensils, Wifi, Car, Dumbbell, Bed, Users2, DollarSign, CheckCircle } from "lucide-react";

const ICON_MAP = {
  restaurant: Utensils,
  longstay: Clock,
  family: Users,
  verified: ShieldCheck,
  wifi: Wifi,
  parking: Car,
  gym: Dumbbell,
  bedrooms: Bed,
  male: Users2,
  rent: DollarSign,
  available: CheckCircle,
  default: Home,
};

export default function HighlightsSection({ property = {} }) {
  const { 
    highlights = [], 
    amenities = [], 
    facilities = {},
    totalRooms,
    gender,
    monthlyRent,
    status,
    isPublished 
  } = property;

  // Build dynamic highlights from property data
  let displayHighlights = [];

  // Add custom highlights if available
  if (highlights && highlights.length > 0) {
    displayHighlights = highlights;
  } else {
    // Generate highlights from property data
    
    // Property status
    if (isPublished && status === 'active') {
      displayHighlights.push({ 
        icon: "verified", 
        text: "Verified Property", 
        subtext: "Inspected & approved by Roomhy" 
      });
    }

    // Gender specific
    if (gender === 'male') {
      displayHighlights.push({ 
        icon: "male", 
        text: "For Male", 
        subtext: "Boys accommodation" 
      });
    } else if (gender === 'female') {
      displayHighlights.push({ 
        icon: "family", 
        text: "For Female", 
        subtext: "Girls accommodation" 
      });
    } else {
      displayHighlights.push({ 
        icon: "family", 
        text: "Family Friendly", 
        subtext: "Suitable for everyone" 
      });
    }

    // Room count
    if (totalRooms && totalRooms > 0) {
      displayHighlights.push({ 
        icon: "bedrooms", 
        text: `${totalRooms} Bedrooms`, 
        subtext: "Spacious accommodation" 
      });
    }

    // Rent
    if (monthlyRent && monthlyRent > 0) {
      displayHighlights.push({ 
        icon: "rent", 
        text: `₹${monthlyRent}/month`, 
        subtext: "Affordable pricing" 
      });
    }

    // Availability
    if (status === 'active') {
      displayHighlights.push({ 
        icon: "available", 
        text: "Available", 
        subtext: "Ready to book" 
      });
    }

    // Facilities based highlights
    if (facilities.wifi) {
      displayHighlights.push({ 
        icon: "wifi", 
        text: "Free WiFi", 
        subtext: "High-speed internet" 
      });
    }

    if (facilities.parking) {
      displayHighlights.push({ 
        icon: "parking", 
        text: "Parking Available", 
        subtext: "On-site parking" 
      });
    }

    if (facilities.gym) {
      displayHighlights.push({ 
        icon: "gym", 
        text: "Gym Access", 
        subtext: "Fitness center" 
      });
    }

    if (facilities.food) {
      displayHighlights.push({ 
        icon: "restaurant", 
        text: "Food Included", 
        subtext: "Mess facility" 
      });
    }
  }

  return (
    <div className="px-4 md:px-0 py-5 border-b border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Why book this property? 🏡
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayHighlights.map((item, idx) => {
          const IconComponent = ICON_MAP[item.icon] || ICON_MAP.default;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-amber-50/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <IconComponent size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.text}</p>
                {item.subtext && (
                  <p className="text-xs text-gray-500 mt-0.5">{item.subtext}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
