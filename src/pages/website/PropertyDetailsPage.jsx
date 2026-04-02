import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProperties, fetchNearbyColleges } from "../../utils/api";
import { ChevronLeft, MapPin, Users, Bed, Wifi, Wind, Droplet, Phone, Mail, Star, Share2 } from "lucide-react";

export default function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [nearbyColleges, setNearbyColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadPropertyDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch all properties
        const allProperties = await fetchProperties();
        
        // Find the specific property
        const foundProperty = allProperties.find(p => p._id === propertyId || p.visitId === propertyId || p.propertyName === propertyId);
        
        if (foundProperty) {
          const formatted = {
            id: foundProperty._id || foundProperty.visitId || foundProperty.propertyName,
            name: foundProperty.propertyName || foundProperty.property_name || 'Property',
            location: foundProperty.propertyCity || foundProperty.city || 'Location',
            area: foundProperty.area || '',
            type: foundProperty.propertyType || foundProperty.type || '',
            price: foundProperty.monthlyRent || foundProperty.price || '0',
            beds: foundProperty.bedrooms || foundProperty.beds || 0,
            gender: foundProperty.genderRestriction || foundProperty.gender || 'Any',
            owner: foundProperty.ownerName || foundProperty.owner || 'Owner',
            ownerPhone: foundProperty.ownerPhoneNumber || foundProperty.ownerPhone || '',
            ownerEmail: foundProperty.ownerEmail || '',
            image: foundProperty.propertyImage || foundProperty.image || 'https://via.placeholder.com/800x600?text=Property',
            images: foundProperty.propertyImages || [foundProperty.propertyImage || foundProperty.image || 'https://via.placeholder.com/800x600?text=Property'],
            description: foundProperty.description || 'No description provided',
            verified: foundProperty.verified || false,
            rating: foundProperty.rating || 4.5,
            amenities: foundProperty.amenities || [],
          };

          setProperty(formatted);

          // Get colleges from property data
          const colleges = foundProperty.nearbyColleges || [];
          setNearbyColleges(colleges);
        } else {
          setProperty(null);
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    loadPropertyDetails();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <WebsiteNavbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block">
              <div className="flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500"></div>
              </div>
              <p className="text-lg font-semibold text-gray-800">Loading property details...</p>
              <p className="text-sm text-gray-600 mt-2">Please wait while we fetch the information</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <WebsiteNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
            <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/website/ourproperty')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Back to Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WebsiteNavbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/website/ourproperty')}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Properties
          </button>
          <div className="flex items-center gap-4">
            {property.verified && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ✓ Verified
              </span>
            )}
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-lg">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="md:col-span-2">
            {/* Main Image */}
            <div className="relative h-[500px] rounded-lg overflow-hidden mb-4 bg-gray-200">
              <img
                src={property.images[selectedImage]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                {property.type}
              </div>
            </div>

            {/* Thumbnail Images */}
            {property.images.length > 1 && (
              <div className="flex gap-2 mb-8 overflow-x-auto">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-teal-500' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Property Title and Rating */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{property.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5 text-teal-500" />
                  <span>{property.location}{property.area && `, ${property.area}`}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{property.rating}</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <Bed className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-600">Bedrooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.beds}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-600">For</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.gender}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-600 font-semibold">₹</span>
                  <span className="text-gray-600">Monthly Rent</span>
                </div>
                <p className="text-2xl font-bold text-teal-500">₹{property.price}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-600">Status</span>
                </div>
                <p className="text-2xl font-bold text-green-600">Available</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-teal-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Colleges & Institutions */}
            {nearbyColleges.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Nearby Colleges & Institutions
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {nearbyColleges.map((college, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-gray-700 font-medium">{college}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Owner Info and Booking */}
          <div>
            {/* Owner Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 sticky top-28">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Owner Information</h3>
              
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-1">Owner Name</p>
                <p className="text-lg font-semibold text-gray-900">{property.owner}</p>
              </div>

              {property.ownerPhone && (
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">Phone Number</p>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-teal-500" />
                    <a href={`tel:${property.ownerPhone}`} className="text-teal-600 hover:text-teal-700 font-semibold">
                      {property.ownerPhone}
                    </a>
                  </div>
                </div>
              )}

              {property.ownerEmail && (
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">Email</p>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-teal-500" />
                    <a href={`mailto:${property.ownerEmail}`} className="text-teal-600 hover:text-teal-700 font-semibold text-sm break-all">
                      {property.ownerEmail}
                    </a>
                  </div>
                </div>
              )}

              {/* Booking/Contact Buttons */}
              <div className="space-y-3 mt-6">
                {property.ownerPhone && (
                  <a
                    href={`tel:${property.ownerPhone}`}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Owner
                  </a>
                )}
                {property.ownerEmail && (
                  <a
                    href={`mailto:${property.ownerEmail}`}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email
                  </a>
                )}
              </div>

              {/* Rent Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-2">Monthly Rent</p>
                <p className="text-3xl font-bold text-teal-600">₹{property.price}</p>
                <p className="text-gray-600 text-sm mt-2">per month</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  );
}
