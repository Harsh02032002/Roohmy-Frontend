import { useState } from "react";
import { MapPin, GraduationCap, ExternalLink, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const TYPE_CONFIG = {
  university: { emoji: "🏛️", bg: "bg-purple-50", text: "text-purple-600", label: "University" },
  college: { emoji: "🎓", bg: "bg-blue-50", text: "text-blue-600", label: "College" },
  school: { emoji: "🏫", bg: "bg-green-50", text: "text-green-600", label: "School" },
};

export default function NearbySection({ nearbyInstitutes = [], loading = false, hasCoordinates = false }) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? nearbyInstitutes : nearbyInstitutes.slice(0, 5);

  if (!hasCoordinates && nearbyInstitutes.length === 0) return null;

  return (
    <div className="px-4 md:px-0 py-5 border-b border-gray-100">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">📍</span>
        <h2 className="text-lg font-bold text-gray-900">Loved for its Prime Location</h2>
      </div>
      <p className="text-gray-500 text-xs mb-4 ml-7">Stay just next to top attractions & institutions</p>

      {!hasCoordinates ? (
        <p className="text-gray-400 text-sm py-4 text-center">Location coordinates not available.</p>
      ) : loading ? (
        <div className="flex items-center gap-3 py-6 justify-center">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-500 text-sm">Finding nearby places…</span>
        </div>
      ) : nearbyInstitutes.length === 0 ? (
        <p className="text-gray-400 text-sm py-4 text-center">No institutions found within 2.5 km.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-3">
            {displayed.map((inst) => {
              const config = TYPE_CONFIG[inst.type] || TYPE_CONFIG.college;
              return (
                <Link
                  key={inst.id}
                  to={`/website/ourproperty?lat=${inst.lat}&lng=${inst.lng}&radius=2.5&near=${encodeURIComponent(inst.name)}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all group"
                >
                  <span className="text-base">{config.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                      {inst.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {inst.distance > 0 ? `${inst.distance.toFixed(1)} km` : ""} • {config.label}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {nearbyInstitutes.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1 mt-3 text-[#EE4266] text-sm font-semibold hover:underline"
            >
              {showAll ? "Show less" : `+${nearbyInstitutes.length - 5} more places`}
              <ChevronDown size={14} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
