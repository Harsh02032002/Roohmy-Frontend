import { MapPin, Star, Shield, ExternalLink } from "lucide-react";

export default function PropertyHeader({ property, reviewStats }) {
  const hasCoordinates = property?.latitude && property?.longitude;

  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return "EXCELLENT";
    if (rating >= 4.0) return "VERY GOOD";
    if (rating >= 3.5) return "GOOD";
    if (rating >= 3.0) return "AVERAGE";
    return "FAIR";
  };

  const avgRating = reviewStats?.avgRating || property?.rating || 0;
  const totalReviews = reviewStats?.totalReviews || 0;

  return (
    <div className="px-4 md:px-0">
      {/* Property Name */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
        {property?.name || "Property"}
      </h1>

      {/* Rating Row */}
      {avgRating > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-[#1ab64f] rounded-md">
            <Star size={12} className="fill-white text-white" />
            <span className="text-white text-sm font-bold">{avgRating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500 text-sm">
            ({totalReviews} {totalReviews === 1 ? "rating" : "ratings"})
          </span>
          <span className="text-xs font-semibold text-[#1ab64f] uppercase tracking-wide">
            {getRatingLabel(avgRating)}
          </span>
        </div>
      )}

      {/* Address */}
      <div className="mt-2.5 flex items-start gap-1.5">
        <MapPin size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />
        <p className="text-gray-600 text-sm leading-relaxed">
          {property?.address || `${property?.area ? `${property.area}, ` : ""}${property?.location || ""}`}
        </p>
      </div>

      {/* View on map */}
      {hasCoordinates && (
        <a
          href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-[#EE4266] text-sm font-semibold hover:underline"
        >
          View on map <ExternalLink size={13} />
        </a>
      )}

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {property?.type && (
          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100">
            {property.type}
          </span>
        )}
        {property?.verified && (
          <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100 flex items-center gap-1">
            <Shield size={12} /> Verified
          </span>
        )}
        {property?.gender && property.gender !== "Any" && (
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
            {property.gender}
          </span>
        )}
      </div>
    </div>
  );
}
