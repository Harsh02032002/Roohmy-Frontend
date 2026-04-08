import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Bed, Wifi, Home } from 'lucide-react';
import { fetchProperties } from '../../utils/api';

export default function MobilePropertiesSection() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const allProperties = await fetchProperties();
        // Take first 6 properties for mobile view
        setProperties(allProperties.slice(0, 6));
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  if (loading) {
    return (
      <section className="md:hidden bg-gray-50 py-8 px-4">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-48"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="md:hidden bg-gray-50 py-6 px-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Trending Properties</h2>
          <p className="text-sm text-gray-500 mt-0.5">Handpicked for you</p>
        </div>
        <Link 
          to="/website/ourproperty" 
          className="text-[#1ab64f] text-sm font-medium flex items-center gap-1"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Properties Grid - Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {properties.map((property) => (
          <Link
            key={property._id || property.visitId}
            to={`/website/property-details/${property._id || property.visitId || property.propertyName}`}
            className="flex-shrink-0 w-[280px] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            {/* Property Image */}
            <div className="relative h-40 bg-gray-200">
              <img
                src={property.propertyInfo?.photos?.[0] || property.propertyImage || 'https://via.placeholder.com/400x300?text=Property'}
                alt={property.propertyName}
                className="w-full h-full object-cover"
              />
              {/* Rating Badge */}
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold">4.5</span>
              </div>
              {/* Property Type Badge */}
              <div className="absolute bottom-2 left-2 bg-[#1ab64f] text-white text-xs px-2 py-1 rounded">
                {property.propertyInfo?.propertyType || 'PG'}
              </div>
            </div>

            {/* Property Info */}
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {property.propertyName}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{property.propertyInfo?.area || property.city}</span>
              </div>

              {/* Amenities Icons */}
              <div className="flex items-center gap-3 mt-2 text-gray-400">
                <Bed className="w-4 h-4" />
                <Wifi className="w-4 h-4" />
                <Home className="w-4 h-4" />
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div>
                  <span className="text-lg font-bold text-gray-900">₹{property.propertyInfo?.rent || property.monthlyRent}</span>
                  <span className="text-xs text-gray-500">/mo</span>
                </div>
                <button className="bg-[#1ab64f] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  View
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {['PG', 'Hostel', 'Flat', 'Coliving'].map((type) => (
          <Link
            key={type}
            to={`/website/ourproperty?type=${type}`}
            className="flex-shrink-0 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full"
          >
            {type}
          </Link>
        ))}
      </div>
    </section>
  );
}
