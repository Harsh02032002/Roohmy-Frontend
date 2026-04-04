import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProperties } from "../../utils/api";
import {
  ChevronLeft, MapPin, Users, Bed, Wifi, Wind, Droplet,
  Phone, Mail, Star, Share2, GraduationCap, Navigation, ExternalLink
} from "lucide-react";

export default function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [nearbyInstitutes, setNearbyInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loadingInstitutes, setLoadingInstitutes] = useState(false);

  // Fetch nearby colleges from database seeded data (no external API)
  const fetchNearbyEducation = async (lat, lng) => {
    // No external API call - using seeded data from database
    // This function is now handled in the loadPropertyDetails useEffect
    setLoadingInstitutes(false);
  };

  // Haversine distance (km)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  useEffect(() => {
    const loadPropertyDetails = async () => {
      try {
        setLoading(true);
        const allProperties = await fetchProperties();
        const foundProperty = allProperties.find(
          (p) => p._id === propertyId || p.visitId === propertyId || p.propertyName === propertyId
        );

        if (foundProperty) {
          const formatted = {
            id: foundProperty._id || foundProperty.visitId || foundProperty.propertyName,
            name: foundProperty.propertyName || foundProperty.property_name || "Property",
            location: foundProperty.propertyInfo?.city || foundProperty.city || "Location",
            area: foundProperty.propertyInfo?.area || foundProperty.area || "",
            type: foundProperty.propertyInfo?.propertyType || foundProperty.propertyType || "",
            price: foundProperty.propertyInfo?.rent || foundProperty.monthlyRent || foundProperty.price || "0",
            beds: foundProperty.propertyInfo?.totalSeats || foundProperty.bedrooms || foundProperty.beds || 0,
            gender: foundProperty.propertyInfo?.genderSuitability || foundProperty.gender || "Any",
            owner: foundProperty.generatedCredentials?.ownerName || foundProperty.ownerName || foundProperty.owner || "Owner",
            ownerPhone: foundProperty.ownerPhoneNumber || foundProperty.ownerPhone || "",
            ownerEmail: foundProperty.ownerEmail || "",
            image: foundProperty.propertyInfo?.photos?.[0] || foundProperty.propertyImage || foundProperty.image || "https://via.placeholder.com/800x600?text=Property",
            images: foundProperty.propertyInfo?.photos || foundProperty.propertyImages || [foundProperty.propertyImage || foundProperty.image || "https://via.placeholder.com/800x600?text=Property"],
            description: foundProperty.description || "No description provided",
            verified: foundProperty.isVerified || foundProperty.verified || false,
            rating: foundProperty.rating || 4.5,
            amenities: foundProperty.propertyInfo?.amenities || foundProperty.amenities || [],
            latitude: foundProperty.propertyInfo?.location?.coordinates?.[1] || null,
            longitude: foundProperty.propertyInfo?.location?.coordinates?.[0] || null,
            address: foundProperty.address || foundProperty.propertyAddress || "",
            nearbyColleges: foundProperty.nearbyColleges || []
          };

          setProperty(formatted);

          // Use seeded nearby colleges from database, no external API call
          if (formatted.nearbyColleges && formatted.nearbyColleges.length > 0) {
            const institutes = formatted.nearbyColleges.map((name, idx) => ({
              id: idx,
              name: name,
              type: 'college',
              lat: formatted.latitude,
              lng: formatted.longitude,
              distance: 0.5 + (idx * 0.3) // Mock distance
            }));
            setNearbyInstitutes(institutes);
          }
        } else {
          setProperty(null);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    loadPropertyDetails();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <WebsiteNavbar />
        <div className="flex flex-col items-center justify-center h-96">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <WebsiteNavbar />
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold text-gray-800">Property Not Found</h2>
          <p className="text-gray-500 mt-2">The property you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/website/ourproperty")} className="mt-6 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors">
            Back to Properties
          </button>
        </div>
        <WebsiteFooter />
      </div>
    );
  }

  const hasCoordinates = property.latitude && property.longitude;

  return (
    <div className="min-h-screen bg-gray-50">
      <WebsiteNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/website/ourproperty")}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold mb-6 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ==================== LEFT COLUMN (3/5) ==================== */}
          <div className="lg:col-span-3 space-y-6">
            {/* Image Gallery */}
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <div className="relative aspect-[16/10]">
                <img src={property.images[selectedImage]} alt={property.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.type && (
                    <span className="px-3 py-1.5 bg-amber-500 text-white text-sm font-bold rounded-xl">{property.type}</span>
                  )}
                  {property.verified && (
                    <span className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-xl">✓ Verified</span>
                  )}
                </div>
              </div>
              {property.images.length > 1 && (
                <div className="flex gap-2 p-3 bg-white overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? "border-amber-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Title & Rating */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{property.name}</h1>
                  <p className="text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={16} className="text-amber-500" />
                    {property.location}{property.area && `, ${property.area}`}
                  </p>
                  {property.address && (
                    <p className="text-gray-400 text-sm mt-1">{property.address}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 rounded-xl">
                  <Star size={16} className="fill-amber-500 text-amber-500" />
                  <span className="font-bold text-gray-800">{property.rating}</span>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {[
                  { label: "Bedrooms", value: property.beds, icon: Bed },
                  { label: "For", value: property.gender, icon: Users },
                  { label: "Monthly Rent", value: `₹${property.price}`, icon: null },
                  { label: "Status", value: "Available", icon: null },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 bg-gray-50 rounded-2xl">
                    <p className="text-gray-400 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-gray-900 font-bold text-lg mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-gray-700 text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Educational Institutions */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <GraduationCap size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Nearby Colleges, Universities & Schools</h2>
                  <p className="text-gray-400 text-sm">Within 2.5 km radius</p>
                </div>
              </div>

              {!hasCoordinates ? (
                <p className="text-gray-400 text-sm py-4">Location coordinates not available for this property.</p>
              ) : loadingInstitutes ? (
                <div className="flex items-center gap-3 py-6">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-500">Searching nearby educational institutions...</span>
                </div>
              ) : nearbyInstitutes.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">No educational institutions found within 2.5 km.</p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {nearbyInstitutes.map((inst) => (
                    <Link
                      key={inst.id}
                      to={`/website/ourproperty?lat=${inst.lat}&lng=${inst.lng}&radius=2.5&near=${encodeURIComponent(inst.name)}`}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          inst.type === 'university' ? 'bg-purple-100 text-purple-600' :
                          inst.type === 'college' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {inst.type === 'university' ? 'U' : inst.type === 'college' ? 'C' : 'S'}
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium text-sm group-hover:text-blue-600 transition-colors">{inst.name}</p>
                          <p className="text-gray-400 text-xs capitalize">{inst.type} • {inst.distance.toFixed(1)} km away</p>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ==================== RIGHT COLUMN (2/5) ==================== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            {hasCoordinates && (
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Navigation size={16} className="text-amber-500" />
                    Property Location
                  </h3>
                </div>
                <div className="h-[400px]">
                  <iframe
                    src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=14&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location"
                  />
                </div>
                <div className="p-3 bg-gray-50 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Property
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Educational Institute
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full border-2 border-amber-500 border-dashed inline-block"></span> 2.5 km radius
                  </span>
                </div>
              </div>
            )}

            {/* Owner Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Owner Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Owner Name</p>
                  <p className="text-gray-900 font-semibold">{property.owner}</p>
                </div>
                {property.ownerPhone && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Phone Number</p>
                    <a href={`tel:${property.ownerPhone}`} className="text-amber-600 font-semibold hover:underline flex items-center gap-2">
                      <Phone size={14} /> {property.ownerPhone}
                    </a>
                  </div>
                )}
                {property.ownerEmail && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Email</p>
                    <a href={`mailto:${property.ownerEmail}`} className="text-amber-600 font-semibold hover:underline flex items-center gap-2">
                      <Mail size={14} /> {property.ownerEmail}
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {property.ownerPhone && (
                  <a href={`tel:${property.ownerPhone}`} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-semibold transition-all">
                    <Phone size={16} /> Call Owner
                  </a>
                )}
                {property.ownerEmail && (
                  <a href={`mailto:${property.ownerEmail}`} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 rounded-xl font-semibold transition-all">
                    <Mail size={16} /> Send Email
                  </a>
                )}
              </div>
            </div>

            {/* Rent Card */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-lg">
              <p className="text-amber-100 text-sm font-medium">Monthly Rent</p>
              <p className="text-4xl font-extrabold mt-1">₹{property.price}</p>
              <p className="text-amber-200 text-sm mt-1">per month</p>
            </div>
          </div>
        </div>
      </div>

      <WebsiteFooter />
    </div>
  );
}
