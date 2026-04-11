import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProperties } from '../../utils/api';

// Same featured properties as desktop
const featuredProperties = [
  {
    name: "Sunshine PG",
    location: "Koramangala, Bangalore",
    price: "₹8,500",
    rating: 4.8,
    verified: true,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Student Hub",
    location: "Powai, Mumbai",
    price: "₹12,000",
    rating: 4.9,
    verified: true,
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Campus Stay",
    location: "Vijay Nagar, Delhi",
    price: "₹7,500",
    rating: 4.7,
    verified: true,
    image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Scholar's Den",
    location: "Aundh, Pune",
    price: "₹9,000",
    rating: 4.6,
    verified: true,
    image: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Study Nest",
    location: "Madivala, Bangalore",
    price: "₹8,000",
    rating: 4.5,
    verified: true,
    image: "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Academic Homes",
    location: "T-Nagar, Chennai",
    price: "₹10,500",
    rating: 4.8,
    verified: true,
    image: "https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function MobilePropertiesSection() {
  const [properties, setProperties] = useState(featuredProperties);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerView = 1; // Show 1 card at a time on mobile

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const allProperties = await fetchProperties();
        if (allProperties && allProperties.length > 0) {
          const mapped = allProperties.slice(0, 6).map(p => ({
            name: p.propertyName,
            location: `${p.propertyInfo?.area || p.city}, ${p.city}`,
            price: `₹${p.propertyInfo?.rent || p.monthlyRent || '8,500'}`,
            rating: 4.5 + Math.random() * 0.5,
            verified: true,
            image: p.propertyInfo?.photos?.[0] || p.propertyImage || featuredProperties[0].image
          }));
          setProperties(mapped);
        }
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const canShowPrev = startIndex > 0;
  const canShowNext = startIndex < properties.length - itemsPerView;

  const next = () => {
    if (canShowNext) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (canShowPrev) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleProperties = properties.slice(startIndex, startIndex + itemsPerView);

  if (loading) {
    return (
      <section className="md:hidden bg-gray-50 py-5 px-4">
        <div className="animate-pulse">
          <div className="bg-white rounded-xl h-64 mx-auto max-w-sm"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="md:hidden bg-gray-50 py-3">
      {/* Section Header - Same as Desktop */}
      <div className="px-4 mb-2">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Trending Stays This Week</h2>
        <p className="text-xs text-gray-600">Most popular properties among students</p>
      </div>

      {/* Carousel with Navigation Arrows - Like Popular Cities */}
      <div className="relative px-4">
        {/* Left Arrow */}
        {canShowPrev && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Right Arrow */}
        {canShowNext && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Cards Container - Show 1 card centered */}
        <div className="flex justify-center">
          {visibleProperties.map((property) => (
            <div key={property.name} className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Property Image */}
              <div className="relative h-40">
                <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                {property.verified && (
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center">
                    <BadgeCheck className="w-4 h-4 text-teal-600 mr-1" />
                    <span className="text-xs font-bold">Verified</span>
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="p-3.5">
                <h3 className="font-bold text-base">{property.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-teal-600">{property.price}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{property.rating.toFixed(1)}</span>
                  </div>
                </div>
                <Link
                  to="/website/fast-bidding"
                  className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-bold text-center block transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === startIndex ? 'bg-teal-500 w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
