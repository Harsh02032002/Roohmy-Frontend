import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import MobileBottomNav from "../../components/website/MobileBottomNav";
import { Filter, MapPin, Wallet, Home, Users, TrendingUp, Send, RefreshCw, ChevronLeft, ChevronRight, Building2, BookOpen, Star, Check, Phone, Wifi, Utensils, Car, Dumbbell, Tv, Wind, Droplets, Zap, ChevronRight as ChevronRightIcon, X, Menu, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchProperties, searchPropertiesByLocation, getNearbyAreas, getInstitutions, getPriceRangeByType, fetchAllCollegesFromBackend } from "../../utils/api";

export default function OurPropertyPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState([]);
  const [nearbyAreas, setNearbyAreas] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0, average: 0, count: 0 });
  const [propertyNearbyColleges, setPropertyNearbyColleges] = useState({});
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(10);
  const [totalProperties, setTotalProperties] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // Total from API
  
  // Get parameters from URL first (before using them in state)
  const typeFromUrl = searchParams.get('type');
  const cityFromUrl = searchParams.get('city');
  const areaFromUrl = searchParams.get('area');
  const searchFromUrl = searchParams.get('search');
  const latitudeFromUrl = searchParams.get('latitude');
  const longitudeFromUrl = searchParams.get('longitude');
  
  // Filter states (after URL params are declared)
  const [selectedCity, setSelectedCity] = useState(cityFromUrl || '');
  const [selectedArea, setSelectedArea] = useState(areaFromUrl || '');
  const [selectedType, setSelectedType] = useState(typeFromUrl || '');
  const [searchQuery, setSearchQuery] = useState(searchFromUrl || '');
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

        // Fast initial fetch - backend now includes nearbyColleges
        if (latitudeFromUrl && longitudeFromUrl) {
          allProperties = await searchPropertiesByLocation(
            parseFloat(latitudeFromUrl),
            parseFloat(longitudeFromUrl),
            typeFromUrl,
            50
          );
          if (allProperties.length > 0 && !city) {
            city = allProperties[0].city || allProperties[0].propertyInfo?.city;
          }
        } else {
          allProperties = await fetchProperties();
        }
        
        // Format properties - nearbyColleges already included from backend
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
          nearbyColleges: p.nearbyColleges || [], // Already populated by backend
          latitude: p.latitude || p.propertyInfo?.latitude || p.propertyInfo?.location?.coordinates?.[1] || null,
          longitude: p.longitude || p.propertyInfo?.longitude || p.propertyInfo?.location?.coordinates?.[0] || null,
        }));

        // Apply filters quickly
        let filtered = formattedProperties;
        
        if (selectedCity) {
          filtered = filtered.filter(p => p.location?.toLowerCase() === selectedCity.toLowerCase());
        }
        
        if (selectedArea) {
          filtered = filtered.filter(p => 
            p.area?.toLowerCase() === selectedArea.toLowerCase() || 
            p.locality?.toLowerCase() === selectedArea.toLowerCase()
          );
        }
        
        // Search by property name, city, area, or type
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(p => 
            p.name?.toLowerCase().includes(query) ||
            p.location?.toLowerCase().includes(query) ||
            p.area?.toLowerCase().includes(query) ||
            p.type?.toLowerCase().includes(query) ||
            p.locality?.toLowerCase().includes(query)
          );
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
        
        // Multi-college filter - show properties near ANY selected college
        if (selectedColleges.length > 0) {
          filtered = filtered.filter(p => {
            const propColleges = propertyNearbyColleges[p.id] || [];
            return selectedColleges.some(selectedCollege => 
              propColleges.some(college => 
                college.toLowerCase().includes(selectedCollege.toLowerCase()) ||
                selectedCollege.toLowerCase().includes(college.toLowerCase())
              )
            );
          });
        }
        
        // Store all filtered properties for pagination
        setTotalProperties(filtered);
        
        // Use the total from API (if available) or fallback to filtered length
        const apiTotal = allProperties.total || allProperties.length;
        setTotalCount(apiTotal);
        
        // Extract colleges from ALL filtered properties (not just current page)
        const collegesByProperty = {};
        const allCollegesSet = new Set();
        
        filtered.forEach(prop => {
          if (prop.nearbyColleges && prop.nearbyColleges.length > 0) {
            collegesByProperty[prop.id] = prop.nearbyColleges.map(c => c.name || c);
            prop.nearbyColleges.forEach(c => allCollegesSet.add(c.name || c));
          }
        });
        
        setPropertyNearbyColleges(collegesByProperty);
        setAllColleges(Array.from(allCollegesSet).sort());
        
        // Get current page properties
        const indexOfLastProperty = currentPage * propertiesPerPage;
        const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
        const currentProperties = filtered.slice(indexOfFirstProperty, indexOfLastProperty);
        
        // Show properties immediately with colleges from backend
        setProperties(currentProperties);
        
        // Get price range quickly
        if (filtered.length > 0) {
          const prices = filtered.map(p => p.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          const average = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
          setPriceRange({ min, max, average, count: filtered.length });
        }

        // Fetch additional data in background
        if (city) {
          setTimeout(async () => {
            try {
              const areas = await getNearbyAreas(
                parseFloat(latitudeFromUrl) || 0,
                parseFloat(longitudeFromUrl) || 0,
                city
              );
              setNearbyAreas(areas);

              const insts = await getInstitutions(city);
              setInstitutions(insts);
            } catch (err) {
              console.log('Background data fetch failed:', err);
            }
          }, 200);
        }

        // Get price range for property type in background
        if (typeFromUrl) {
          setTimeout(async () => {
            try {
              const range = await getPriceRangeByType(typeFromUrl);
              setPriceRange(range);
            } catch (err) {
              console.log('Price range fetch failed:', err);
            }
          }, 300);
        }

      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [typeFromUrl, cityFromUrl, searchFromUrl, latitudeFromUrl, longitudeFromUrl, currentPage, searchParams, selectedCity, selectedType, selectedGender, minPrice, maxPrice, selectedRatings, selectedColleges]);

  // Separate effect to fetch colleges after properties are loaded
  useEffect(() => {
    const loadColleges = async () => {
      if (totalProperties.length === 0) return;
      
      setLoadingColleges(true);
      try {
        console.log('🎓 Fetching colleges separately...');
        const data = await fetchAllCollegesFromBackend();
        
        if (data.allColleges && data.allColleges.length > 0) {
          setAllColleges(data.allColleges);
          console.log(`✅ Loaded ${data.allColleges.length} colleges for filter`);
        }
      } catch (error) {
        console.error('Error loading colleges:', error);
      } finally {
        setLoadingColleges(false);
      }
    };
    
    // Wait 2 seconds after properties load before fetching colleges
    const timer = setTimeout(loadColleges, 2000);
    return () => clearTimeout(timer);
  }, [totalProperties.length]);

  // Pagination handlers
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Don't clear cache when changing pages - we want to keep it!
  };

  const totalPages = Math.ceil(totalProperties.length / propertiesPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity, selectedType, selectedGender, minPrice, maxPrice, selectedRatings]);

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
{/* --- COMPACT & STYLISH PROPERTIES HEADER --- */}
<div className="relative w-full py-2 md:py-10 px-4 md:px-6 overflow-hidden border-b border-stone-200/50" 
     style={{
       background: 'linear-gradient(135deg, #FFFAF5 0%, #FDFCFB 50%, #F5F7FA 100%)'
     }}>
  
  {/* Background Pattern - Subtle Overlay */}
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
       style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/pinstripe.png")` }}>
  </div>

  <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
    
    {/* MAIN HEADING - "Our Properties" */}
    <div className="flex items-center gap-4 mb-1">
      <div className="h-[1px] w-6 bg-[#C5A059]/40 hidden md:block"></div>
      <h1 className="text-xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">
        Our <span className="text-[#C5A059] font-serif italic font-medium">Properties</span>
      </h1>
      <div className="h-[1px] w-6 bg-[#C5A059]/40 hidden md:block"></div>
    </div>

    {/* Total Properties Count */}
    <div className="mt-1 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-[#C5A059]/20 inline-flex items-center gap-2">
      <span className="text-[11px] md:text-sm font-semibold text-[#1A1A1A]">
        {totalCount > 0 ? totalCount : (totalProperties.length > 0 ? totalProperties.length : 'Loading...')} Properties
      </span>
    </div>

    {/* Bottom Accent Dot */}
    <div className="mt-2 w-1 h-1 rounded-full bg-[#C5A059]/30 md:block hidden"></div>
  </div>
</div>

        <section className="py-2 md:py-16 bg-white md:bg-gray-50 px-3 md:px-0">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile Filter Trigger */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border border-gray-200 text-gray-700 font-medium"
              >
                <Menu className="w-5 h-5" />
                <span>Filters</span>
                {(selectedCity || selectedType || minPrice || maxPrice) && (
                  <span className="ml-1 w-2 h-2 bg-[#1ab64f] rounded-full"></span>
                )}
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Sidebar - Filters - Desktop: Always visible, Mobile: Overlay */}
              {/* Mobile Filter Overlay Backdrop */}
              {mobileFilterOpen && (
                <div
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setMobileFilterOpen(false)}
                />
              )}

              <aside className={`
                lg:w-72 flex-shrink-0
                lg:static lg:block
                fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out
                ${mobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              `}>
                <div className="bg-white lg:rounded-xl lg:shadow-md p-4 h-full lg:h-auto lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto w-[300px] lg:w-auto overflow-y-auto">
                  {/* Mobile Filter Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 lg:hidden">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <Filter className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                        <p className="text-xs text-gray-500">Refine your search</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Desktop Filter Header */}
                  <div className="hidden lg:flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
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
                    </div>
                  </div>

                  {/* Institutions & Colleges */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      Nearby Colleges & Institutions
                    </h4>
                    {loadingColleges ? (
                      <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded text-center">
                        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-purple-600" />
                        Loading nearby colleges...
                      </div>
                    ) : allColleges.length > 0 ? (
                      <>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {allColleges.map((college, idx) => (
                            <label
                              key={idx}
                              className={`w-full text-left text-sm p-2 rounded transition-all flex items-center gap-2 cursor-pointer ${
                                selectedColleges.includes(college)
                                  ? 'bg-purple-200 border border-purple-500 text-purple-900'
                                  : 'bg-purple-50 border border-purple-200 text-gray-700 hover:bg-purple-100'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedColleges.includes(college)}
                                onChange={() => {
                                  if (selectedColleges.includes(college)) {
                                    setSelectedColleges(selectedColleges.filter(c => c !== college));
                                  } else {
                                    setSelectedColleges([...selectedColleges, college]);
                                  }
                                }}
                                className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                              />
                              <span className="truncate">{college}</span>
                            </label>
                          ))}
                        </div>
                        {selectedColleges.length > 0 && (
                          <button
                            onClick={() => setSelectedColleges([])}
                            className="w-full mt-3 text-sm text-purple-600 hover:text-purple-700 font-semibold border border-purple-300 rounded py-2"
                          >
                            Clear {selectedColleges.length} Selected
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
                </div>
              </aside>

              {/* Right Content - Properties */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * propertiesPerPage) + 1} to {Math.min(currentPage * propertiesPerPage, totalCount)} of {totalCount} properties
                  </div>
                  <select className="rounded-lg border-gray-300 border py-2 px-4 bg-white text-sm">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>

                <div className="flex flex-col gap-0 md:gap-4 bg-gray-100 md:bg-transparent pb-16 md:pb-0">
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
                  ) : properties.length > 0 ? (
                    <>
                      {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} nearbyColleges={propertyNearbyColleges[property.id]} />
                      ))}
                      
                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <div className="col-span-full flex justify-center items-center gap-2 mt-8">
                          <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                          </button>
                          
                          <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                              <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                  currentPage === pageNumber
                                    ? 'bg-teal-500 text-white'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {pageNumber}
                              </button>
                            ))}
                          </div>
                          
                          <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                          >
                            Next
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
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

                
              </div>
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />

      <MobileBottomNav />
    </div>
  );
}

// Property Card Component - OYO Style
function PropertyCard({ property }) {
  // Get all images from property
  const allImages = property.images || [property.image];
  const displayImages = allImages.length > 0 ? allImages : ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600'];

  // Calculate fake discount
  const originalPrice = Math.round(property.price * 1.3);
  const discountPercent = Math.round(((originalPrice - property.price) / originalPrice) * 100);

  return (
    <div className="bg-white md:rounded-xl md:shadow-md overflow-hidden hover:shadow-xl transition-all md:border md:border-gray-200 mb-1.5 md:mb-0">
      <div className="flex flex-col md:flex-row">
        
        {/* Horizontal Slider with Peek Effect */}
        <div className="relative w-full md:w-[300px] lg:w-[380px] flex-shrink-0 group">
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-[145px] md:h-[220px] gap-1 px-1 py-1">
            {displayImages.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 w-[48%] md:w-full h-full snap-start rounded-md overflow-hidden">
                <img
                  src={img}
                  alt={`${property.name} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Rating Badge (Inside first image view) */}
          <div className="absolute bottom-4 left-3 bg-white/95 backdrop-blur-sm text-gray-900 px-1 py-0.5 rounded shadow-sm flex items-center gap-0.5 z-10 border border-gray-100">
            <Star className="w-2.5 h-2.5 text-black fill-black" />
            <span className="text-[10px] font-bold">{property.rating}</span>
          </div>

          {/* Heart Button */}
          <button className="absolute top-4 right-[55%] md:right-4 p-1.5 rounded-full bg-black/10 backdrop-blur-sm z-10">
             <Heart className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Compact Details Section */}
        <div className="px-3 pb-3 md:p-4 flex-1 flex flex-col justify-between">
          <Link to={`/website/property-details/${property.id}`} className="block">
            <div>
              <h3 className="font-bold text-[16px] md:text-xl text-gray-900 leading-tight mb-0.5 truncate">{property.name}</h3>
              <p className="text-gray-500 text-[12px] mb-1.5 font-medium">
                {property.area && `${property.area}, `}{property.location}
              </p>
              
              {/* Activity Indicator (Very small) */}
              <div className="flex items-center gap-1 text-[#d48900] text-[10px] font-bold mb-1.5">
                <Zap className="w-2.5 h-2.5 fill-[#d48900]" />
                <span className="uppercase">Highly Rated Property</span>
              </div>

              {/* Pricing section */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-gray-950">₹{property.price.toLocaleString()}</span>
                <span className="text-[12px] text-gray-400 font-medium line-through">₹{originalPrice.toLocaleString()}</span>
                <span className="text-[12px] font-bold text-[#1ab64f]">{discountPercent}% off</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">+ taxes & fees</p>
            </div>
          </Link>

          {/* Desktop Only Extra Badges */}
          <div className="hidden md:flex mt-3 pt-2 border-t border-gray-100 justify-between items-center text-[10px]">
             <div className="flex gap-2">
               <span className="px-2 py-0.5 bg-gray-50 text-gray-600 font-bold rounded border border-gray-200 uppercase">{property.gender}</span>
               <span className="px-2 py-0.5 bg-gray-50 text-gray-600 font-bold rounded border border-gray-200 uppercase">{property.type}</span>
             </div>
             <span className="font-bold text-blue-600">View Details</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
