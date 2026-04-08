import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProperties, getPropertyReviews, getPropertyReviewStats, checkUserReview, submitReview } from "../../utils/api";
import {
  ChevronLeft, MapPin, Users, Bed, Wifi, Wind, Droplet,
  Phone, Mail, Star, Share2, GraduationCap, Navigation, ExternalLink
} from "lucide-react";

export default function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [rawPropertyId, setRawPropertyId] = useState(null); // MongoDB ObjectId
  const [nearbyInstitutes, setNearbyInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loadingInstitutes, setLoadingInstitutes] = useState(false);
  
  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({ avgRating: 0, totalReviews: 0, ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } });
  const [hasReviewed, setHasReviewed] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Fetch nearby colleges/universities/schools using OpenStreetMap Overpass API and save to database
  const fetchNearbyEducation = async (lat, lng, propertyId) => {
    setLoadingInstitutes(true);
    try {
      const radius = 2500; // 2.5 km in meters
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="university"](around:${radius},${lat},${lng});
          node["amenity"="college"](around:${radius},${lat},${lng});
          node["amenity"="school"](around:${radius},${lat},${lng});
          way["amenity"="university"](around:${radius},${lat},${lng});
          way["amenity"="college"](around:${radius},${lat},${lng});
          way["amenity"="school"](around:${radius},${lat},${lng});
          relation["amenity"="university"](around:${radius},${lat},${lng});
          relation["amenity"="college"](around:${radius},${lat},${lng});
          relation["amenity"="school"](around:${radius},${lat},${lng});
        );
        out center tags;
      `;

      // Fetch nearby institutes with fallback servers
    const overpassServers = [
      "https://overpass-api.de/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter", 
      "https://overpass.nchc.org.tw/api/interpreter"
    ];
    
    let apiSuccess = false;
    let institutes = [];
    
    for (const server of overpassServers) {
      try {
        const response = await fetch(server, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "data=" + encodeURIComponent(query),
        });

        if (response.status === 429) {
          console.warn(`Rate limit on ${server}, trying next...`);
          continue;
        } else if (response.status === 504) {
          console.warn(`Timeout on ${server}, trying next...`);
          continue;
        } else if (!response.ok) {
          console.warn(`Error on ${server}, trying next...`);
          continue;
        }

        const data = await response.json();

        institutes = data.elements
          .filter((el) => el.tags?.name)
          .map((el, idx) => {
            const elLat = el.lat ?? el.center?.lat;
            const elLng = el.lon ?? el.center?.lon;
            const amenity = el.tags.amenity;
            const type =
              amenity === "university"
                ? "university"
                : amenity === "college"
                ? "college"
                : "school";
            const distance = elLat && elLng ? getDistance(lat, lng, elLat, elLng) : 0;
            return {
              id: el.id || idx,
              name: el.tags.name,
              type,
              lat: elLat,
              lng: elLng,
              distance,
            };
          })
          .sort((a, b) => a.distance - b.distance);

        console.log(`✅ Fetched ${institutes.length} institutes from ${server}`);
        apiSuccess = true;
        break;
      } catch (error) {
        console.error(`Error with ${server}:`, error);
        continue;
      }
    }
    
    if (!apiSuccess) {
      console.warn("All Overpass servers failed, using database colleges");
      institutes = [];
      
      // Try to use database colleges as fallback
      if (property?.nearbyColleges && property.nearbyColleges.length > 0) {
        institutes = property.nearbyColleges.map((name, idx) => ({
          id: `db_${idx}`,
          name: name,
          type: "college",
          lat: lat,
          lng: lng,
          distance: 0,
          source: "database"
        }));
        console.log(`📋 Using ${institutes.length} colleges from database as fallback`);
      }
    }

    // Save fetched colleges to database
    if (institutes.length > 0 && propertyId) {
      try {
        const collegeNames = institutes
          .filter(inst => inst.type === 'university' || inst.type === 'college')
          .map(inst => inst.name)
          .slice(0, 10); // Save top 10 colleges

        if (collegeNames.length > 0) {
          console.log(`💾 Saving ${collegeNames.length} colleges to database for property ${propertyId}`);
          
          // Update property in database
          await fetch(`/api/property-colleges/properties/${propertyId}/colleges`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nearbyColleges: collegeNames
            })
          });
        }
      } catch (saveError) {
        console.error('Error saving colleges to database:', saveError);
      }
    }

    setNearbyInstitutes(institutes);
    } catch (error) {
      console.error("Error fetching nearby institutes:", error);
      setNearbyInstitutes([]);
    } finally {
      setLoadingInstitutes(false);
    }
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
          // Debug: Log the full property object to see what _id looks like
          console.log('Full foundProperty:', foundProperty);
          console.log('foundProperty._id:', foundProperty._id);
          console.log('foundProperty._id type:', typeof foundProperty._id);
          console.log('foundProperty._id length:', foundProperty._id?.length);
          
          // Store actual MongoDB ObjectId separately for API calls
          const actualId = foundProperty._id || foundProperty.id;
          setRawPropertyId(actualId);
          console.log('Setting rawPropertyId to:', actualId);
          
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
            latitude: foundProperty.latitude || foundProperty.propertyInfo?.latitude || foundProperty.propertyInfo?.location?.coordinates?.[1] || null,
            longitude: foundProperty.longitude || foundProperty.propertyInfo?.longitude || foundProperty.propertyInfo?.location?.coordinates?.[0] || null,
            address: foundProperty.address || foundProperty.propertyAddress || "",
            nearbyColleges: foundProperty.nearbyColleges || []
          };

          setProperty(formatted);

          // Fetch nearby institutes from OpenStreetMap if coordinates available
          if (formatted.latitude && formatted.longitude) {
            fetchNearbyEducation(formatted.latitude, formatted.longitude, propertyId);
          } else if (formatted.nearbyColleges && formatted.nearbyColleges.length > 0) {
            // Fallback: use seeded data from DB if no coordinates
            const institutes = formatted.nearbyColleges.map((name, idx) => ({
              id: idx,
              name: name,
              type: 'college',
              lat: formatted.latitude,
              lng: formatted.longitude,
              distance: 0,
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

  // Load reviews when property loads
  useEffect(() => {
    if (rawPropertyId) {
      loadReviews();
    }
  }, [rawPropertyId]);

  const loadReviews = async () => {
    if (!rawPropertyId) return;
    try {
      console.log('Loading reviews for property:', rawPropertyId);
      const [reviewsData, statsData, userReviewData] = await Promise.all([
        getPropertyReviews(rawPropertyId),
        getPropertyReviewStats(rawPropertyId),
        checkUserReview(rawPropertyId)
      ]);
      setReviews(reviewsData);
      setReviewStats(statsData);
      setHasReviewed(userReviewData.hasReviewed);
      setUserReview(userReviewData.review);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  // Helper to check if ID is valid MongoDB ObjectId (24 char hex)
  const isValidObjectId = (id) => {
    return id && typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    
    // Use property.id which should be the MongoDB ObjectId
    const actualPropertyId = property?.id || rawPropertyId;
    console.log('property.id:', property?.id);
    console.log('rawPropertyId:', rawPropertyId);
    console.log('Using ID:', actualPropertyId);
    console.log('Is valid ObjectId:', isValidObjectId(actualPropertyId));
    
    if (!actualPropertyId || !isValidObjectId(actualPropertyId)) {
      alert('Error: Valid Property ID not found. ID must be 24 character hex string.');
      return;
    }
    
    setSubmittingReview(true);
    try {
      await submitReview({
        propertyId: actualPropertyId,
        propertyName: property?.name,
        rating: newRating,
        review: newReviewText
      });
      setShowReviewForm(false);
      setNewRating(5);
      setNewReviewText('');
      await loadReviews(); // Reload reviews
    } catch (error) {
      alert('Failed to submit review: ' + error.message);
    } finally {
      setSubmittingReview(false);
    }
  };

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

            {/* Reviews & Ratings Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Star size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Reviews & Ratings</h2>
                    <p className="text-gray-400 text-sm">{reviewStats.totalReviews} reviews • {reviewStats.avgRating > 0 ? `${reviewStats.avgRating}★` : 'No ratings yet'}</p>
                  </div>
                </div>
                {!hasReviewed && !showReviewForm && (
                  <button 
                    onClick={() => setShowReviewForm(true)}
                    className="px-4 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {/* Rating Breakdown */}
              {reviewStats.totalReviews > 0 && (
                <div className="mb-6 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviewStats.ratingBreakdown[star] || 0;
                    const percentage = reviewStats.totalReviews > 0 ? (count / reviewStats.totalReviews) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600 w-8">{star}★</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400 w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Review Form */}
              {showReviewForm && !hasReviewed && (
                <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-2xl">
                  <h3 className="font-bold text-gray-900 mb-4">Write Your Review</h3>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                            star <= newRating ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Star size={18} fill={star <= newRating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Your Review</label>
                    <textarea
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Share your experience with this property..."
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[100px]"
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-400 mt-1">{newReviewText.length}/500 characters</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submittingReview || !newReviewText.trim()}
                      className="px-4 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* User's Existing Review */}
              {hasReviewed && userReview && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-green-700">Your Review</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Submitted</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < userReview.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-gray-700">{userReview.review}</p>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review this property!</p>
                ) : (
                  reviews.slice(0, 5).map((review, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                            {review.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{review.name || 'Anonymous'}</p>
                            <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-amber-500 fill-amber-500" />
                          <span className="font-medium text-gray-900">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{review.review}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

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
