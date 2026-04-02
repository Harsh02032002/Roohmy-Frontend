import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { Filter, MapPin, Wallet, Home, Users, TrendingUp, Send, RefreshCw, ChevronLeft, ChevronRight, Building2, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProperties, searchPropertiesByLocation, getNearbyAreas, getInstitutions, getPriceRangeByType, fetchNearbyColleges } from "../../utils/api";

export default function OurPropertyPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0, average: 0, count: 0 });
  const [propertyNearbyColleges, setPropertyNearbyColleges] = useState({});
  
  // Get parameters from URL
  const typeFromUrl = searchParams.get('type');
  const cityFromUrl = searchParams.get('city');
  const latitudeFromUrl = searchParams.get('latitude');
  const longitudeFromUrl = searchParams.get('longitude');
  
  // Fetch properties and related data dynamically
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        let allProperties = [];
        let city = cityFromUrl;

        // If location coordinates provided, search by location
        if (latitudeFromUrl && longitudeFromUrl) {
          allProperties = await searchPropertiesByLocation(
            parseFloat(latitudeFromUrl),
            parseFloat(longitudeFromUrl),
            typeFromUrl,
            50
          );
          // Get city from first result if not specified
          if (allProperties.length > 0 && !city) {
            city = allProperties[0].city || allProperties[0].propertyInfo?.city;
          }
        } else {
          // Regular fetch if no coordinates
          allProperties = await fetchProperties();
        }
        
        const formattedProperties = allProperties.map(p => ({
          id: p._id || p.visitId || p.propertyName,
          name: p.propertyName || p.property_name || p.name || 'Unnamed Property',
          location: p.city || p.propertyInfo?.city || p.location || 'Unknown Location',
          area: p.area || p.propertyInfo?.area || p.propertyInfo?.locality || '',
          price: p.monthlyRent || p.rent || p.price ? `₹${p.monthlyRent || p.rent || p.price}` : '₹5,000',
          rating: p.rating || 4.5,
          type: p.propertyType || p.property_type || p.propertyInfo?.propertyType || p.type || 'PG',
          gender: p.gender || p.genderSuitability || p.propertyInfo?.genderSuitability || 'Co-ed',
          image: p.image || p.images?.[0] || p.professionalPhotos?.[0] || p.propertyInfo?.image || 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
          verified: p.isVerified || p.verified || p.status === 'approved' || true,
          owner: p.owner_name || p.ownerName || p.generatedCredentials?.ownerName || 'Verified Owner',
          beds: p.propertyInfo?.totalSeats || p.beds || 1,
          phone: p.owner_phone || p.contactPhone || p.ownerPhone || 'N/A',
          nearbyColleges: p.nearbyColleges || []
        }));
        
        // Get colleges from property data (seeded data)
        const collegesByProperty = {};
        const uniqueColleges = new Set();
        
        formattedProperties.forEach(prop => {
          collegesByProperty[prop.id] = prop.nearbyColleges || [];
          prop.nearbyColleges?.forEach(college => uniqueColleges.add(college));
        });
        
        setPropertyNearbyColleges(collegesByProperty);
        setAllColleges(Array.from(uniqueColleges).sort());
        
        // Apply filters
        let filtered = formattedProperties;
        
        if (typeFromUrl) {
          filtered = filtered.filter(p => p.type?.toLowerCase() === typeFromUrl.toLowerCase());
        }
        
        if (cityFromUrl) {
          filtered = filtered.filter(p => p.location?.toLowerCase() === cityFromUrl.toLowerCase());
        }
        
        const areaFromUrl = searchParams.get('area');
        if (areaFromUrl) {
          filtered = filtered.filter(p => p.area?.toLowerCase() === areaFromUrl.toLowerCase());
        }
        
        // Filter by selected college if any
        if (selectedCollege) {
          filtered = filtered.filter(p => propertyNearbyColleges[p.id]?.includes(selectedCollege));
        }
        
        setProperties(filtered);

        // Fetch additional data for filters
        if (city) {
          // Get nearby areas
          const areas = await getNearbyAreas(
            parseFloat(latitudeFromUrl) || 0,
            parseFloat(longitudeFromUrl) || 0,
            city
          );
          setNearbyAreas(areas);

          // Get institutions
          const insts = await getInstitutions(city);
          setInstitutions(insts);
        }

        // Get price range for property type
        if (typeFromUrl) {
          const range = await getPriceRangeByType(typeFromUrl);
          setPriceRange(range);
        }

      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [typeFromUrl, cityFromUrl, latitudeFromUrl, longitudeFromUrl, searchParams, selectedCollege]);

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        <div className="relative h-[200px] bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Properties</h1>
            <p className="text-lg text-gray-600">Find your perfect stay from our verified listings</p>
          </div>
        </div>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar - Filters */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Filter className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                      <p className="text-xs text-gray-500">Refine your search</p>
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Location
                    </label>
                    <select className="w-full rounded-lg border-gray-300 border py-3 px-4 bg-gray-50 mb-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                      <option value="">Select City</option>
                      <option value="kota">Kota, Rajasthan</option>
                      <option value="indore">Indore, MP</option>
                      <option value="jaipur">Jaipur, Rajasthan</option>
                      <option value="delhi">Delhi NCR</option>
                      <option value="mumbai">Mumbai, Maharashtra</option>
                      <option value="bhopal">Bhopal, MP</option>
                    </select>
                    <select className="w-full rounded-lg border-gray-300 border py-3 px-4 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                      <option value="">Select Area</option>
                      <option value="near_station">Near Railway Station</option>
                      <option value="near_college">Near College</option>
                      <option value="city_center">City Center</option>
                    </select>
                  </div>

                  {/* Budget Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-emerald-600" />
                      Budget Range
                    </label>
                    <div className="flex gap-2">
                      <select className="w-1/2 rounded-lg border-gray-300 border py-3 px-3 bg-gray-50 text-sm">
                        <option value="">Min</option>
                        <option value="1500">₹1,500</option>
                        <option value="4000">₹4,000</option>
                        <option value="8000">₹8,000</option>
                      </select>
                      <select className="w-1/2 rounded-lg border-gray-300 border py-3 px-3 bg-gray-50 text-sm">
                        <option value="">Max</option>
                        <option value="15000">₹15,000</option>
                        <option value="25000">₹25,000</option>
                        <option value="50000">₹50,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Home className="w-4 h-4 text-purple-600" />
                      Property Type
                    </label>
                    <select className="w-full rounded-lg border-gray-300 border py-3 px-4 bg-gray-50 mb-3">
                      <option value="">All Types</option>
                      <option value="pg">PG / Co-Living</option>
                      <option value="hostel">Hostel</option>
                      <option value="flat">Flat / Studio</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-pink-600" />
                      Gender
                    </label>
                    <select className="w-full rounded-lg border-gray-300 border py-3 px-4 bg-gray-50">
                      <option value="">Any</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Co-ed</option>
                    </select>
                  </div>

                  {/* Bidding Section */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      Bid on Properties
                    </h4>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          placeholder="Min Bid"
                          className="w-1/2 rounded-lg border border-gray-300 py-3 px-3 text-sm"
                        />
                        <input 
                          type="number" 
                          placeholder="Max Bid"
                          className="w-1/2 rounded-lg border border-gray-300 py-3 px-3 text-sm"
                        />
                      </div>
                      <button className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Bid on All ({properties.length})
                      </button>
                    </div>
                  </div>

                  {/* Institutions & Colleges */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      Nearby Colleges & Institutions
                    </h4>
                    {allColleges.length > 0 ? (
                      <>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {allColleges.map((college, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedCollege(selectedCollege === college ? null : college)}
                              className={`w-full text-left text-sm p-2 rounded transition-all flex items-center gap-2 ${
                                selectedCollege === college
                                  ? 'bg-purple-200 border border-purple-500 text-purple-900'
                                  : 'bg-purple-50 border border-purple-200 text-gray-700 hover:bg-purple-100'
                              }`}
                            >
                              <span className="truncate">{college}</span>
                            </button>
                          ))}
                        </div>
                        {selectedCollege && (
                          <button
                            onClick={() => setSelectedCollege(null)}
                            className="w-full mt-3 text-sm text-purple-600 hover:text-purple-700 font-semibold border border-purple-300 rounded py-2"
                          >
                            Clear Filter
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded text-center">
                        <span className="text-lg mb-1 block">📍</span>
                        No nearby colleges found
                      </div>
                    )}
                  </div>

                  {/* Price Range Info */}
                  {priceRange.count > 0 && (
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-emerald-600" />
                        Pricing Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between pb-2 border-b border-gray-200">
                          <span className="text-gray-600">Min Price:</span>
                          <span className="font-semibold text-gray-900">₹{priceRange.min.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-gray-200">
                          <span className="text-gray-600">Avg Price:</span>
                          <span className="font-semibold text-blue-600">₹{priceRange.average.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span className="text-gray-600">Max Price:</span>
                          <span className="font-semibold text-gray-900">₹{priceRange.max.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Based on {priceRange.count} properties</p>
                      </div>
                    </div>
                  )}

                  {/* Clear Filters */}
                  <button className="w-full mt-4 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 bg-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Clear Filters
                  </button>
                </div>
              </aside>

              {/* Right Content - Properties */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{properties.length} Properties Found</h2>
                  <select className="rounded-lg border-gray-300 border py-2 px-4 bg-white text-sm">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {loading ? (
                    // Skeleton Loaders while loading
                    <>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                          <div className="h-48 bg-gray-300"></div>
                          <div className="p-5">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2 mb-3"></div>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="h-3 bg-gray-300 rounded"></div>
                              <div className="h-3 bg-gray-300 rounded"></div>
                            </div>
                            <div className="h-10 bg-gray-300 rounded mt-4"></div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : properties.length > 0 ? properties.map((property) => (
                    <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                        {property.verified && (
                          <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                            <span className="text-xs font-semibold text-green-600">✓ Verified</span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {property.type}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{property.name}</h3>
                        <p className="text-gray-600 text-sm mb-1">{property.location}{property.area && `, ${property.area}`}</p>
                        <p className="text-gray-500 text-xs mb-3">Owner: {property.owner}</p>
                        
                        {/* Property Details */}
                        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <span>👥</span> {property.gender}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span>🛏️</span> {property.beds} Beds
                          </div>
                        </div>

                        {/* Nearby Colleges & Institutions */}
                        {propertyNearbyColleges[property.id]?.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-700 mb-2">Nearby Institutions:</p>
                            <div className="flex flex-wrap gap-1">
                              {propertyNearbyColleges[property.id].slice(0, 3).map((college, idx) => (
                                <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                  {college}
                                </span>
                              ))}
                              {propertyNearbyColleges[property.id].length > 3 && (
                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                  +{propertyNearbyColleges[property.id].length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-teal-500">{property.price}<span className="text-sm text-gray-600">/mo</span></span>
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="font-semibold text-gray-700">{property.rating}</span>
                          </div>
                        </div>
                        <a href={`/website/property-details/${property.id}`} className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition-all block text-center">
                          View Details
                        </a>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                      <Home className="w-16 h-16 text-gray-300 mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
                      <p className="text-gray-600 mb-6">Try adjusting your search filters or explore all properties</p>
                      <a href="/website/ourproperty" className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold">
                        View All Properties
                      </a>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center mt-8 gap-2">
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">1</button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700">2</button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700">3</button>
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}
