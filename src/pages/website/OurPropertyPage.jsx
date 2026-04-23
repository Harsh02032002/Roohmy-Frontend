import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import MobileBottomNav from "../../components/website/MobileBottomNav";
import { Filter, MapPin, Wallet, Home, Users, TrendingUp, Send, RefreshCw, ChevronLeft, ChevronRight, Building2, BookOpen, Star, Check, Phone, Wifi, Utensils, Car, Dumbbell, Tv, Wind, Droplets, Zap, ChevronRight as ChevronRightIcon, X, Menu, Heart, ChevronDown } from "lucide-react";
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
  const [sortBy, setSortBy] = useState('Featured');
  const [showSort, setShowSort] = useState(false);
  
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
        const formattedProperties = allProperties.map(p => {
          // Debug: Log what we're getting from API
          console.log('🔄 OurPropertyPage Transformation:', p.property_name || p.name);
          console.log('  Location Debug - p.city:', p.city);
          console.log('  Location Debug - p.propertyInfo?.city:', p.propertyInfo?.city);
          console.log('  Location Debug - p.location:', p.location);
          console.log('  p.images:', p.images);
          console.log('  p.professionalPhotos:', p.professionalPhotos);
          console.log('  p.image:', p.image);
          
          const images = p.images || p.professionalPhotos || p.fieldPhotos || [p.image] || ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600'];
          
          console.log('  Final images for PropertyCard:', images);
          
          return {
            id: p._id || p.visitId || p.propertyName,
            name: p.propertyName || p.property_name || p.name || 'Unnamed Property',
            location: p.city || p.propertyInfo?.city || p.location || 'Unknown Location',
            area: p.area || p.propertyInfo?.area || p.propertyInfo?.locality || '',
            price: p.monthlyRent || p.rent || p.price || 5000,
            rating: p.rating || 4.5,
            type: p.propertyType || p.property_type || p.propertyInfo?.propertyType || p.type || 'PG',
            gender: p.gender || p.genderSuitability || p.propertyInfo?.genderSuitability || 'Co-ed',
            image: p.image || p.images?.[0] || p.professionalPhotos?.[0] || p.propertyInfo?.image || 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
            images: images, // Use the correctly prioritized images array
            verified: p.isVerified || p.verified || p.status === 'approved' || true,
            owner: p.owner_name || p.ownerName || p.generatedCredentials?.ownerName || 'Verified Owner',
            beds: p.propertyInfo?.totalSeats || p.beds || 1,
            phone: p.owner_phone || p.contactPhone || p.ownerPhone || 'N/A',
            amenities: p.amenities || p.propertyInfo?.amenities || [],
            nearbyColleges: p.nearbyColleges || [], // Already populated by backend
            latitude: p.latitude || p.propertyInfo?.latitude || p.propertyInfo?.location?.coordinates?.[1] || null,
            longitude: p.longitude || p.propertyInfo?.longitude || p.propertyInfo?.location?.coordinates?.[0] || null,
          };
        });

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
<div className="relative w-full py-1 md:py-4 px-4 md:px-6 overflow-hidden border-b border-stone-200/50" 
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

        <section className="pt-1 pb-4 md:pt-4 md:pb-8 bg-white md:bg-[#F3F5F9] px-3 md:px-0">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile Filter & Sort Trigger */}
            <div className="lg:hidden flex items-center justify-between gap-2 mb-4">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border border-gray-200 text-gray-700 font-medium"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {(selectedCity || selectedType || minPrice || maxPrice) && (
                  <span className="ml-1 w-2 h-2 bg-[#1ab64f] rounded-full"></span>
                )}
              </button>
              
              {/* Custom Sort Dropdown */}
              <div className="flex-1 relative">
                <button 
                  onClick={() => setShowSort(!showSort)}
                  className="w-full flex items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border border-gray-200 text-gray-700 font-medium"
                >
                  <span className="truncate">Sort: {sortBy}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSort ? 'rotate-180' : ''}`} />
                </button>
                
                {showSort && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] py-1 animate-in">
                    {['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest First'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSort(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${sortBy === option ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-gray-700'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
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
                <div className="bg-white p-4 h-full lg:h-auto lg:sticky lg:top-24 lg:max-h-none lg:overflow-visible w-[300px] lg:w-auto overflow-y-auto lg:rounded-none lg:shadow-none lg:border-0 lg:border-r lg:border-gray-200">
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
                  <div className="hidden lg:flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                    <Filter className="w-4 h-4 text-gray-600" />
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Filters</h3>
                      <p className="text-[11px] text-gray-500">Refine your search</p>
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-5 pb-4 border-b border-gray-100">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Location
                    </label>
                    <select 
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full rounded-md border-gray-300 border py-2.5 px-3 bg-gray-50 mb-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                  <div className="mb-5 pb-4 border-b border-gray-100">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-emerald-600" />
                      Budget Range
                    </label>
                    <div className="flex gap-2">
                      <select 
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-1/2 rounded-md border-gray-300 border py-2.5 px-2.5 bg-gray-50 text-sm"
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
                        className="w-1/2 rounded-md border-gray-300 border py-2.5 px-2.5 bg-gray-50 text-sm"
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
                  <div className="mb-5 pb-4 border-b border-gray-100">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Home className="w-4 h-4 text-purple-600" />
                      Property Type
                    </label>
                    <select 
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full rounded-md border-gray-300 border py-2.5 px-3 bg-gray-50 mb-2"
                    >
                      <option value="">All Types</option>
                      <option value="PG">PG / Co-Living</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Flat">Flat / Studio</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div className="mb-5 pb-4 border-b border-gray-100">
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-pink-600" />
                      Gender
                    </label>
                    <select 
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="w-full rounded-md border-gray-300 border py-2.5 px-3 bg-gray-50"
                    >
                      <option value="">Any</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Co-ed">Co-ed</option>
                    </select>
                  </div>

                  {/* Star Rating Filter */}
                  <div className="mb-5">
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
                  <div className="pt-5 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      Bid on Properties
                    </h4>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="number" 
                          placeholder="Min Bid"
                          className="w-1/2 rounded-md border border-gray-300 py-2.5 px-3 text-sm"
                        />
                        <input
                          type="number" 
                          placeholder="Max Bid"
                          className="w-1/2 rounded-md border border-gray-300 py-2.5 px-3 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Institutions & Colleges */}
                  <div className="pt-5 border-t border-gray-200">
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
                  <div className="pt-5 border-t border-gray-200">
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
                <div className="flex items-center justify-between md:mb-4 mb-0">
                  <div className="hidden md:block text-sm text-gray-600">
                    Showing {((currentPage - 1) * propertiesPerPage) + 1} to {Math.min(currentPage * propertiesPerPage, totalCount)} of {totalCount} properties
                  </div>
                  {/* Desktop Custom Sort */}
                  <div className="hidden md:block relative min-w-[200px]">
                    <button 
                      onClick={() => setShowSort(!showSort)}
                      className="w-full flex items-center justify-between gap-3 bg-white px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors"
                    >
                      <span>Sort by: {sortBy}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showSort ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showSort && (
                      <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-[100] py-1 animate-in">
                        {['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest First'].map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSortBy(option);
                              setShowSort(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === option ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700'}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-0 md:gap-1.5 bg-gray-100 md:bg-transparent pb-16 md:pb-0">
                  {loading ? (
                    // Skeleton Loaders while loading
                    <>
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse flex flex-col md:flex-row">
                          <div className="w-full md:w-[400px] lg:w-[500px] h-48 bg-gray-300"></div>
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
                        <div className="col-span-full flex justify-center items-center gap-1.5 md:gap-2 mt-6 md:mt-8 flex-wrap">
                          <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-2.5 md:px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 text-sm"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span className="hidden md:inline">Previous</span>
                          </button>
                          
                          <div className="flex gap-1">
                            {/* Mobile: Show limited pages with ellipsis */}
                            <div className="md:hidden flex gap-1">
                              {(() => {
                                const pages = [];
                                const maxVisible = 5;
                                
                                if (totalPages <= maxVisible) {
                                  // Show all pages if less than maxVisible
                                  for (let i = 1; i <= totalPages; i++) {
                                    pages.push(i);
                                  }
                                } else {
                                  // Show first, last, and pages around current
                                  if (currentPage <= 3) {
                                    for (let i = 1; i <= 4; i++) {
                                      pages.push(i);
                                    }
                                    pages.push('...');
                                    pages.push(totalPages);
                                  } else if (currentPage >= totalPages - 2) {
                                    pages.push(1);
                                    pages.push('...');
                                    for (let i = totalPages - 3; i <= totalPages; i++) {
                                      pages.push(i);
                                    }
                                  } else {
                                    pages.push(1);
                                    pages.push('...');
                                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                                      pages.push(i);
                                    }
                                    pages.push('...');
                                    pages.push(totalPages);
                                  }
                                }
                                
                                return pages.map((page, index) => {
                                  if (page === '...') {
                                    return (
                                      <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-500">
                                        ...
                                      </span>
                                    );
                                  }
                                  
                                  return (
                                    <button
                                      key={page}
                                      onClick={() => paginate(page)}
                                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                        currentPage === page
                                          ? 'bg-teal-500 text-white'
                                          : 'border border-gray-300 hover:bg-gray-50'
                                      }`}
                                    >
                                      {page}
                                    </button>
                                  );
                                });
                              })()}
                            </div>
                            
                            {/* Desktop: Show all pages */}
                            <div className="hidden md:flex gap-1">
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
                          </div>
                          
                          <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-2.5 md:px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 text-sm"
                          >
                            <span className="hidden md:inline">Next</span>
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images from property - try multiple sources
  const allImages = property.images || property.photos || property.propertyInfo?.photos || [property.image];
  const displayImages = allImages.length > 0 ? allImages : ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600'];
  const imageCount = displayImages.length;
  const amenityNames = (property.amenities || [])
    .map((amenity) => {
      if (typeof amenity === 'string') {
        try {
          const parsed = JSON.parse(amenity);
          return parsed?.name || amenity;
        } catch {
          return amenity;
        }
      }
      return amenity?.name || '';
    })
    .filter(Boolean)
    .slice(0, 4);

  const goPrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  };

  const goNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  };

  // Calculate fake discount
  const originalPrice = Math.round(property.price * 1.3);
  const discountPercent = Math.round(((originalPrice - property.price) / originalPrice) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all border border-gray-200 hover:border-[#CFE0FF] overflow-hidden mb-2 md:mb-0">
      <div className="flex flex-col lg:flex-row">
        {/* Mobile image strip */}
        <div className="relative w-full lg:hidden group">
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-[145px] gap-2 p-2">
            {displayImages.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 w-[48%] h-full snap-start rounded-md overflow-hidden">
                <img src={img} alt={`${property.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-3 bg-white/95 text-gray-900 px-2 py-1 rounded-md shadow-sm flex items-center gap-1 z-10 border border-gray-100">
            <Star className="w-3.5 h-3.5 text-black fill-black" />
            <span className="text-xs font-bold">{property.rating}</span>
          </div>
          <button
            type="button"
            className="absolute top-3 left-[calc(48%-30px)] p-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-white/40 z-20 pointer-events-auto"
            aria-label="Add to favourites"
          >
            <Heart className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Desktop single-image carousel with arrows */}
        <div className="hidden lg:block relative w-[230px] h-[145px] flex-shrink-0 bg-gray-100">
          <img
            src={displayImages[currentImageIndex]}
            alt={`${property.name} ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {imageCount > 1 && (
            <>
              <button
                type="button"
                onClick={goPrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-transparent hover:bg-black/20 flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                type="button"
                onClick={goNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-transparent hover:bg-black/20 flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </>
          )}
          <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[11px] px-2 py-1 rounded">
            {currentImageIndex + 1}/{imageCount}
          </span>
          <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 backdrop-blur-sm z-10">
            <Heart className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        <Link to={`/website/property-details/${property.id}`} className="flex-1 min-w-0">
          {/* Mobile details - keep as old style */}
          <div className="lg:hidden px-3 pb-3">
            <h3 className="font-bold text-[16px] text-gray-900 leading-tight mb-0.5 truncate">{property.name}</h3>
            <p className="text-gray-500 text-[12px] mb-1 font-medium">
              {property.area && `${property.area}, `}{property.location}
            </p>
            <div className="flex items-center gap-1 text-[#d48900] text-[11px] font-bold mb-1">
              <Zap className="w-2.5 h-2.5 fill-[#d48900]" />
              <span className="uppercase">Highly Rated Property</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[18px] leading-none font-extrabold text-gray-950">₹{property.price.toLocaleString()}</span>
              <span className="text-[13px] text-gray-400 font-medium line-through">₹{originalPrice.toLocaleString()}</span>
              <span className="text-[14px] font-bold text-[#1ab64f]">{discountPercent}% off</span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">+ taxes & fees</p>
          </div>

          <div className="flex flex-col lg:flex-row h-full">
            <div className="hidden lg:block flex-1 px-3 pb-2.5 pt-2 md:px-4 md:pb-3 lg:py-2.5 bg-gradient-to-r from-[#FFFFFF] via-[#FCFDFF] to-[#F7FAFF]">
              <h3 className="font-bold text-[16px] md:text-[18px] lg:text-[19px] text-[#2E1F10] leading-tight mb-0.5 truncate">{property.name}</h3>
              <p className="text-[#6B7280] text-[11px] md:text-[12px] mb-1 font-medium">
                {property.area && `${property.area}, `}{property.location}
              </p>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FFF7E8] border border-[#F9DFA8] text-[#B7791F] text-[10px] md:text-[11px] font-bold mb-1.5">
                <Zap className="w-2.5 h-2.5 fill-[#B7791F]" />
                <span className="uppercase tracking-wide">Highly Rated Property</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-[10px] md:text-[11px]">
                <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-[#FFF7E6] to-[#FFF3D4] text-[#7A5520] font-semibold rounded-full border border-[#F1D9A6] uppercase tracking-wide">
                  {property.gender}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-[#FDF2D8] to-[#FBE7BE] text-[#8B5E1A] font-semibold rounded-full border border-[#EACB8B] uppercase tracking-wide">
                  {property.type}
                </span>
              </div>

              {amenityNames.length > 0 && (
                <div className="hidden lg:flex flex-wrap gap-1.5 mt-1.5 max-h-[24px] overflow-hidden">
                  {amenityNames.map((amenity, idx) => (
                    <span
                      key={`${property.id}-amenity-${idx}`}
                      className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium text-[#745021] bg-gradient-to-r from-[#FFFAEF] to-[#FFF4DD] border border-[#F0DEB8] rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden lg:flex lg:w-[170px] border-t lg:border-t-0 lg:border-l border-[#E4EAF5] px-3 py-2 md:px-4 lg:px-3 lg:py-2.5 lg:flex-col justify-between lg:justify-start lg:items-end bg-gradient-to-b from-[#FFFFFF] to-[#F9FBFF]">
              <div className="text-right">
                <div className="text-base md:text-lg lg:text-[21px] leading-tight font-extrabold text-[#111827]">₹{property.price.toLocaleString()}</div>
                <div className="text-[11px] text-[#9CA3AF] font-medium line-through">₹{originalPrice.toLocaleString()}</div>
                <div className="inline-block mt-0.5 text-[11px] font-bold text-[#15803D] bg-[#ECFDF3] border border-[#BBF7D0] rounded px-1.5 py-0.5">{discountPercent}% off</div>
                <p className="text-[10px] text-[#94A3B8] font-medium mt-0.5">+ taxes & fees</p>
              </div>
              <div className="hidden lg:block mt-1.5 text-xs font-semibold text-[#2E5BFF] hover:text-[#1D4ED8]">View details</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
