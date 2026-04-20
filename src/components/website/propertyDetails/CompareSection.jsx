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
            image: p.propertyInfo?.photos?.[0] || p.propertyImage || "https://via.placeholder.com/300x200?text=Property",
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
    <div className="py-5 border-b border-gray-100">
      <div className="px-4 md:px-0 mb-4">
        <h2 className="text-lg font-bold text-gray-900">Compare with similar properties</h2>
        <p className="text-gray-500 text-xs mt-0.5">Find the perfect stay for you</p>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 md:px-0 pb-4 scrollbar-hide">
        {/* Current Property — Fixed/Sticky first card */}
        <div className="sticky left-0 z-10 flex-shrink-0 w-[220px] rounded-2xl border-2 border-[#EE4266] bg-white overflow-hidden shadow-md relative translate-x-[-2px] md:translate-x-0">
          <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[#EE4266] text-white text-[10px] font-bold rounded-full">
            Current
          </div>
          <div className="h-[130px] bg-gray-100">
            <img
              src={currentProperty?.image || "https://via.placeholder.com/300x200"}
              alt={currentProperty?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 bg-white">
            <p className="text-sm font-bold text-gray-900 line-clamp-1">{currentProperty?.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={11} className="fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium text-gray-700">{currentProperty?.rating || "—"}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="text-gray-400" />
              <span className="text-xs text-gray-500">{currentProperty?.location}</span>
            </div>
            <p className="text-base font-extrabold text-gray-900 mt-2">
              ₹{currentProperty?.price}
              <span className="text-[10px] text-gray-400 font-normal">/mo</span>
            </p>
            <div className="mt-2 py-2 text-center bg-[#EE4266]/10 text-[#EE4266] text-xs font-bold rounded-lg border border-[#EE4266]/20">
              Selected
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.map((prop) => (
          <Link
            key={prop.id}
            to={`/website/property-details/${prop.id}`}
            className="flex-shrink-0 w-[200px] rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className="h-[120px] bg-gray-100">
              <img
                src={prop.image}
                alt={prop.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-bold text-gray-900 line-clamp-1">{prop.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={11} className="fill-amber-500 text-amber-500" />
                <span className="text-xs font-medium text-gray-700">{prop.rating}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={11} className="text-gray-400" />
                <span className="text-xs text-gray-500">{prop.location}</span>
              </div>
              <p className="text-base font-extrabold text-gray-900 mt-2">
                ₹{prop.price}
                <span className="text-[10px] text-gray-400 font-normal">/mo</span>
              </p>
              <div className="mt-2 py-1.5 text-center bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg hover:bg-[#EE4266] hover:text-white transition-colors">
                Select
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
