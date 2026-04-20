import { useState, useEffect } from "react";
import { Star, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProperties } from "../../../utils/api";

export default function CompareSection({ currentProperty }) {
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSimilar = async () => {
      try {
        setLoading(true);
        const allProperties = await fetchProperties();
        
        // Filter similar properties: same city or same type, excluding current
        const similar = allProperties
          .filter((p) => {
            const pId = p._id || p.visitId || p.propertyName;
            const currentId = currentProperty?.id;
            if (pId === currentId) return false;
            
            const pCity = p.propertyInfo?.city || p.city || "";
            const pType = p.propertyInfo?.propertyType || p.propertyType || "";
            
            return (
              pCity.toLowerCase() === (currentProperty?.location || "").toLowerCase() ||
              pType.toLowerCase() === (currentProperty?.type || "").toLowerCase()
            );
          })
          .slice(0, 6)
          .map((p) => ({
            id: p._id || p.visitId || p.propertyName,
            name: p.propertyName || p.property_name || "Property",
            location: p.propertyInfo?.city || p.city || "Location",
            price: p.propertyInfo?.rent || p.monthlyRent || p.price || 0,
            image: p.propertyInfo?.photos?.[0] || p.propertyImage || `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 100)}`,
            rating: p.rating || 4.0,
            type: p.propertyInfo?.propertyType || p.propertyType || "PG",
          }));

        setSimilarProperties(similar);
      } catch (error) {
        console.error("Error loading similar properties:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentProperty) loadSimilar();
  }, [currentProperty]);

  if (loading || similarProperties.length === 0) return null;

  return (
    <div className="py-6 border-b border-gray-100 bg-white">
      <div className="px-4 md:px-0 mb-4">
        <h2 className="text-lg font-bold text-gray-900">Compare with similar properties</h2>
        <p className="text-gray-500 text-[11px] mt-0.5">Find the perfect stay for you</p>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 md:px-0 pb-4 no-scrollbar">
        {/* Current Property - Sticky Left */}
        <div className="sticky left-0 z-20 flex-shrink-0 w-[165px] md:w-[220px] bg-white shadow-[8px_0_15px_-5px_rgba(0,0,0,0.1)] pr-3">
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[#EE4266] text-white text-[9px] font-bold rounded-full uppercase tracking-wider">
              Current
            </div>
            <div className="h-[110px] md:h-[150px] bg-gray-100">
              <img
                src={currentProperty?.image || `https://picsum.photos/600/400?random=1`}
                alt={currentProperty?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Rating Overlay */}
            <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-gray-900 px-1 py-0.5 rounded shadow-sm flex items-center gap-0.5 z-10 border border-gray-100">
              <Star size={10} className="fill-black text-black" />
              <span className="text-[10px] font-bold">{currentProperty?.rating || "4.5"}</span>
            </div>
          </div>
          <div className="py-2.5">
            <p className="text-[13px] font-bold text-gray-900 line-clamp-1 leading-tight">{currentProperty?.name}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{currentProperty?.location}</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-sm font-extrabold text-gray-900">₹{currentProperty?.price}</span>
              <span className="text-[9px] text-gray-400 font-medium">/mo</span>
            </div>
            <div className="mt-2 py-1.5 text-center bg-[#EE4266]/10 text-[#EE4266] text-[10px] font-bold rounded-lg border border-[#EE4266]/20">
              Selected
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.map((prop) => (
          <Link
            key={prop.id}
            to={`/website/property-details/${prop.id}`}
            className="flex-shrink-0 w-[155px] md:w-[220px] transition-all"
          >
            <div className="relative rounded-xl overflow-hidden mb-2">
              <div className="h-[110px] md:h-[150px] bg-gray-100">
                <img
                  src={prop.image}
                  alt={prop.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 100)}`;
                  }}
                />
              </div>
              {/* Rating Overlay */}
              <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-gray-900 px-1 py-0.5 rounded shadow-sm flex items-center gap-0.5 z-10 border border-gray-100">
                <Star size={10} className="fill-black text-black" />
                <span className="text-[10px] font-bold">{prop.rating}</span>
              </div>
            </div>
            <div className="py-1">
              <p className="text-[13px] font-bold text-gray-900 line-clamp-1 leading-tight">{prop.name}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{prop.location}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-sm font-extrabold text-gray-900">₹{prop.price}</span>
                <span className="text-[9px] text-gray-400 font-medium">/mo</span>
              </div>
              <div className="mt-2 py-1.5 text-center bg-gray-50 text-gray-600 text-[10px] font-semibold rounded-lg hover:bg-[#EE4266] hover:text-white transition-colors border border-gray-200">
                View Stay
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
