import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { Filter, MapPin, Wallet, Home, Users, TrendingUp, Send, RefreshCw, ChevronLeft, ChevronRight, Building2, BookOpen, Star, Check, Phone, Wifi, Utensils, Car, Dumbbell, Tv, Wind, Droplets, Zap, ChevronRight as ChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProperties, searchPropertiesByLocation, getNearbyAreas, getInstitutions, getPriceRangeByType, fetchNearbyColleges } from "../../utils/api";

export default function OurPropertyPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState([]);
  const [nearbyAreas, setNearbyAreas] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0, average: 0, count: 0 });
  const [propertyNearbyColleges, setPropertyNearbyColleges] = useState({});
  
  // Get parameters from URL first (before using them in state)
  const typeFromUrl = searchParams.get('type');
  const cityFromUrl = searchParams.get('city');
  const latitudeFromUrl = searchParams.get('latitude');
  const longitudeFromUrl = searchParams.get('longitude');
  
  // Filter states (after URL params are declared)
  const [selectedCity, setSelectedCity] = useState(cityFromUrl || '');
  const [selectedType, setSelectedType] = useState(typeFromUrl || '');
  const [selectedGender, setSelectedGender] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  
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
          price: p.monthlyRent || p.rent || p.price || 5000,
          rating: p.rating || 4.5,
          type: p.propertyType || p.property_type || p.propertyInfo?.propertyType || p.type || 'PG',
          gender: p.gender || p.genderSuitability || p.propertyInfo?.genderSuitability || 'Co-ed',
          image: p.image || p.images?.[0] || p.professionalPhotos?.[0] || p.propertyInfo?.image || 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
          images: p.professionalPhotos || p.images || p.fieldPhotos || [p.image] || ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600'],
          verified: p.isVerified || p.verified || p.status === 'approved' || true,
          owner: p.owner_name || p.ownerName || p.generatedCredentials?.ownerName || 'Verified Owner',
          beds: p.propertyInfo?.totalSeats || p.beds || 1,
          phone: p.owner_phone || p.contactPhone || p.ownerPhone || 'N/A',
          nearbyColleges: p.nearbyColleges || [],
          coordinates: p.propertyInfo?.location?.coordinates || null
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
        
        // Apply all filters
        let filtered = formattedProperties;
        
        if (selectedCity) {
          filtered = filtered.filter(p => p.location?.toLowerCase() === selectedCity.toLowerCase());
        }
        
        if (selectedType) {
          filtered = filtered.filter(p => p.type?.toLowerCase() === selectedType.toLowerCase());
        }
        
        if (selectedGender) {
          filtered = filtered.filter(p => p.gender?.toLowerCase() === selectedGender.toLowerCase());
        }
        
        if (minPrice) {
          filtered = filtered.filter(p => p.price >= parseInt(minPrice));
        }
        
        if (maxPrice) {
          filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
        }
        
        if (selectedRatings.length > 0) {
          filtered = filtered.filter(p => {
            const rating = Math.floor(p.rating);
            return selectedRatings.some(r => {
              if (r === 5) return rating === 5;
              if (r === 4) return rating >= 4;
              if (r === 3) return rating >= 3;
              return true;
            });
          });
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
  }, [typeFromUrl, cityFromUrl, latitudeFromUrl, longitudeFromUrl, searchParams, selectedCollege, selectedCity, selectedType, selectedGender, minPrice, maxPrice, selectedRatings]);

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* --- COMPACT & STYLISH PROPERTIES HEADER --- */}
<div className="relative w-full py-10 px-6 overflow-hidden border-b border-stone-200/50" 
     style={{
       background: 'linear-gradient(135deg, #FFFAF5 0%, #FDFCFB 50%, #F5F7FA 100%)'
     }}>
  
  {/* Background Pattern - Subtle Overlay */}
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
       style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/pinstripe.png")` }}>
  </div>

  <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
    
    {/* MAIN HEADING - "Our Properties" */}
    <div className="flex items-center gap-4 mb-2">
      <div className="h-[1px] w-8 bg-[#C5A059]/40 hidden md:block"></div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">
        Our <span className="text-[#C5A059] font-serif italic font-medium">Properties</span>
      </h1>
      <div className="h-[1px] w-8 bg-[#C5A059]/40 hidden md:block"></div>
    </div>

    {/* SUB-HEADING - Content Unchanged */}
    <p className="text-base md:text-lg text-stone-500 font-normal opacity-90 max-w-xl mx-auto">
      Find your perfect stay from our verified listings
    </p>

    {/* Bottom Accent Dot */}
    <div className="mt-4 w-1.5 h-1.5 rounded-full bg-[#C5A059]/30"></div>
  </div>
</div>

        <section className="py-16 bg-gray-50">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Sidebar - Filters */}
              <aside className="lg:w-72 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-md p-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
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
                    <select 
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full rounded-lg border-gray-300 border py-3 px-4 bg-gray-50 mb-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">All Cities</option>
                      <option value="Kota">Kota, Rajasthan</option>
                      <option value="Indore">Indore, MP</option>
                      <option value="Jaipur">Jaipur, Rajasthan</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Mumbai">Mumbai, Maharashtra</option>
                      <option value="Bhopal">Bhopal, MP</option>
                    </select>
                  </div>

                  {/* Budget Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-emerald-600" />
                      Budget Range
                    </label>
                    <div className="flex gap-2">
                      <select 
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-1/2 rounded-lg border-gray-300 border py-3 px-3 bg-gray-50 text-sm"
                      >
                        <option value="">Min</option>
                        <option value="3000">₹3,000</option>
                        <option value="5000">₹5,000</option>
                        <option value="8000">₹8,000</option>
                        <option value="10000">₹10,000</option>
                      </select>
                      <select 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-1/2 rounded-lg border-gray-300 border py-3 px-3 bg-gray-50 text-sm"
                      >
                        <option value="">Max</option>
                        <option value="5000">₹5,000</option>
                        <option value="8000">₹8,000</option>
                        <option value="10000">₹10,000</option>
                        <option value="15000">₹15,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Home className="w-4 h-4 text-purple-600" />
                      Property Type
                    </label>
                    <select 
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full rounded-lg border-gray-300 border py-3 px-4 bg-gray-50 mb-3"
                    >
                      <option value="">All Types</option>
                      <option value="PG">PG / Co-Living</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Flat">Flat / Studio</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-pink-600" />
                      Gender
                    </label>
                    <select 
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="w-full rounded-lg border-gray-300 border py-3 px-4 bg-gray-50"
                    >
                      <option value="">Any</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Co-ed">Co-ed</option>
                    </select>
                  </div>

                  {/* Star Rating Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      Star Rating
                    </label>
                    <div className="space-y-2">
                      {[5, 4, 3].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-all">
                          <input
                            type="checkbox"
                            checked={selectedRatings.includes(rating)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedRatings([...selectedRatings, rating]);
                              } else {
                                setSelectedRatings(selectedRatings.filter(r => r !== rating));
                              }
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">{rating}+ Stars</span>
                          </div>
                        </label>
                      ))}
                    </div>
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
                  <button 
                    onClick={() => {
                      setSelectedCity('');
                      setSelectedType('');
                      setSelectedGender('');
                      setMinPrice('');
                      setMaxPrice('');
                      setSelectedRatings([]);
                      setSelectedCollege(null);
                    }}
                    className="w-full mt-4 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 bg-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear All Filters
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

                <div className="flex flex-col gap-4">
                  {loading ? (
                    // Skeleton Loaders while loading
                    <>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse flex flex-col md:flex-row">
                          <div className="md:w-80 h-48 md:h-auto bg-gray-300"></div>
                          <div className="flex-1 p-5">
                            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
                            <div className="h-10 bg-gray-300 rounded mt-4 w-32"></div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : properties.length > 0 ? properties.map((property) => (
                    <PropertyCard key={property.id} property={property} nearbyColleges={propertyNearbyColleges[property.id]} />
                  )) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
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

// Property Card Component - OYO Style
function PropertyCard({ property, nearbyColleges }) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Get all images from property (up to 4)
  const allImages = property.images || [property.image];
  const displayImages = allImages.slice(0, 4);
  if (displayImages.length === 0) {
    displayImages.push('https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600');
  }

  // Sample amenities for display
  const amenities = [
    { icon: <Wifi className="w-4 h-4" />, label: 'Free WiFi' },
    { icon: <Utensils className="w-4 h-4" />, label: 'Food' },
    { icon: <Car className="w-4 h-4" />, label: 'Parking' },
    { icon: <Dumbbell className="w-4 h-4" />, label: 'Gym' },
    { icon: <Tv className="w-4 h-4" />, label: 'TV' },
    { icon: <Wind className="w-4 h-4" />, label: 'AC' },
  ];

  // Calculate fake discount
  const originalPrice = Math.round(property.price * 1.3);
  const discountPercent = Math.round(((originalPrice - property.price) / originalPrice) * 100);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Image Gallery OYO Style */}
        <div className="lg:w-[520px] xl:w-[580px] flex-shrink-0">
          <div className="flex gap-2 p-2">
            {/* Main Image with Arrows */}
            <div className="relative flex-1 h-56 lg:h-72 overflow-hidden rounded-lg bg-gray-100 group">
              <img
                src={displayImages[selectedImage]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              
              {/* Left Arrow - OYO green with hover */}
              <button
                onClick={() => setSelectedImage(prev => prev === 0 ? displayImages.length - 1 : prev - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-transparent hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white drop-shadow-lg" />
              </button>
              
              {/* Right Arrow - OYO green with hover */}
              <button
                onClick={() => setSelectedImage(prev => prev === displayImages.length - 1 ? 0 : prev + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-transparent hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
              </button>

              {/* Badges */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                <Building2 className="w-3 h-3 text-[#1ab64f]" />
                {property.type}
              </div>
              
              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                {selectedImage + 1} / {displayImages.length}
              </div>
            </div>

            {/* Right Side Thumbnails - 4 images vertical with conditional arrows */}
            {displayImages.length > 1 && (
              <div className="flex flex-col gap-1 w-24 lg:w-28">
                {displayImages.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`h-14 lg:h-16 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === idx ? 'border-[#1ab64f] ring-2 ring-[#1ab64f]/30' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-1">{property.name}</h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{property.location}{property.area && `, ${property.area}`}</span>
              </div>
            </div>
            {/* Rating Badge */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 bg-[#1ab64f] px-2 py-1 rounded">
                <Star className="w-4 h-4 text-white fill-white" />
                <span className="font-bold text-white">{property.rating}</span>
              </div>
              <span className="text-xs text-gray-500 mt-1">({Math.floor(Math.random() * 2000) + 100} Ratings)</span>
            </div>
          </div>

          {/* Owner Info */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <span className="font-medium">By {property.owner}</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-3 mb-4">
            {amenities.slice(0, 6).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-1 text-gray-600 text-sm">
                <span className="text-gray-400">{amenity.icon}</span>
                <span>{amenity.label}</span>
              </div>
            ))}
            <span className="text-sm text-[#1ab64f] font-medium cursor-pointer hover:underline">+ 22 more</span>
          </div>

          {/* Gender & Beds */}
          <div className="flex items-center gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{property.gender}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <span className="text-gray-400">🛏️</span>
              <span>{property.beds} Beds Available</span>
            </div>
          </div>

          {/* Nearby Colleges */}
          {nearbyColleges?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">Nearby Institutions:</p>
              <div className="flex flex-wrap gap-1">
                {nearbyColleges.slice(0, 3).map((college, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-100">
                    {college}
                  </span>
                ))}
                {nearbyColleges.length > 3 && (
                  <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">
                    +{nearbyColleges.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Price & Action */}
          <div className="flex items-end justify-between mt-auto">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-gray-900">₹{property.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
                <span className="text-sm font-semibold text-[#1ab64f]">{discountPercent}% off</span>
              </div>
              <p className="text-xs text-gray-500">+ ₹{Math.round(property.price * 0.12)} taxes & fees per room per month</p>
            </div>
            <div className="flex gap-2">
              <a 
                href={`/website/property-details/${property.id}`}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1"
              >
                View Details
              </a>
              <button className="px-6 py-2 bg-[#1ab64f] hover:bg-[#159c42] text-white font-semibold rounded-lg transition-all flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </div>

          {/* Booking Count */}
          <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
            <span className="font-semibold">🔥 {Math.floor(Math.random() * 20) + 5} people</span> booked this property today
          </p>
        </div>
      </div>
    </div>
  );
}
