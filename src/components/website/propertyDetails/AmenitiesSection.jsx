import React from 'react';
import { Wifi, Wind, Droplet, Car, Dumbbell, Tv, Zap, Coffee, Check, Gift, Star, Shield } from 'lucide-react';

const AmenitiesSection = ({ amenities = [], facilities = {} }) => {
  // Icon mapping for common amenities
  const getIcon = (iconName) => {
    const iconMap = {
      wifi: Wifi,
      ac: Wind,
      water: Droplet,
      parking: Car,
      gym: Dumbbell,
      tv: Tv,
      power: Zap,
      food: Coffee,
      check: Check,
      gift: Gift,
      star: Star,
      shield: Shield
    };
    return iconMap[iconName] || Check;
  };

  // Facility display mapping
  const facilityItems = [
    { key: 'wifi', label: 'WiFi', icon: Wifi },
    { key: 'ac', label: 'Air Conditioning', icon: Wind },
    { key: 'food', label: 'Food Included', icon: Coffee },
    { key: 'laundry', label: 'Laundry Service', icon: Droplet },
    { key: 'parking', label: 'Parking', icon: Car },
    { key: 'gym', label: 'Gym', icon: Dumbbell },
    { key: 'tv', label: 'TV', icon: Tv },
    { key: 'powerBackup', label: 'Power Backup', icon: Zap }
  ];

  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    const category = amenity.category || 'basic';
    if (!acc[category]) acc[category] = [];
    acc[category].push(amenity);
    return acc;
  }, {});

  const hasAmenities = amenities.length > 0;
  const hasFacilities = Object.values(facilities).some(Boolean);

  if (!hasAmenities && !hasFacilities) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Facilities</h2>
      
      {/* Quick Facilities */}
      {hasFacilities && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Facilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {facilityItems.map(({ key, label, icon: Icon }) => {
              if (!facilities[key]) return null;
              return (
                <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Icon className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detailed Amenities */}
      {hasAmenities && (
        <div>
          {Object.entries(groupedAmenities).map(([category, categoryAmenities]) => (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                {category === 'basic' ? 'Basic Amenities' : 
                 category === 'comfort' ? 'Comfort Features' : 
                 'Luxury Features'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryAmenities.map((amenity, index) => {
                  const Icon = getIcon(amenity.icon);
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AmenitiesSection;
