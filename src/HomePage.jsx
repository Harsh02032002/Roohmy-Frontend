import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, BadgeCheck, TrendingUp, ChevronLeft, ChevronRight, X, Building2, Home, Users, MessageSquare, Gavel } from 'lucide-react';
import HowRoomhyWorks from './components/website/HowRoomhyWorks';
import WhyRoomhy from './components/website/WhyRoomhy';
import FindYourHome from './components/website/FindYourHome';
import WhyStudentsChooseUs from './components/website/WhyStudentsChooseUs';
import WebsiteNavbar from './components/website/WebsiteNavbar';
import WebsiteFooter from './components/website/WebsiteFooter';
import MobileBottomNav from './components/website/MobileBottomNav';
import MobileHamburgerMenu from './components/website/MobileHamburgerMenu';
import MobilePropertiesSection from './components/website/MobilePropertiesSection';
import MobileVideoSection from './components/website/MobileVideoSection';
import { fetchCities, fetchPropertyTypes, fetchProperties } from './utils/api';

export default function HomePage() {
  const navigate = useNavigate();
  // State for dynamic data
  const [cities, setCities] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  // Static fallback data
  const staticCities = [
    { name: 'Kota', properties: '2,500+', image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Indore', properties: '1,800+', image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Jaipur', properties: '3,200+', image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Delhi', properties: '5,000+', image: 'https://images.pexels.com/photos/789380/pexels-photo-789380.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Bhopal', properties: '1,200+', image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Nagpur', properties: '980+', image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Jodhpur', properties: '850+', image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Mumbai', properties: '4,500+', image: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  const staticOfferings = [
    {
      title: 'PG',
      category: 'PG',
      description: 'Comfortable paying guest accommodations with all amenities',
      images: [
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
    {
      title: 'Hostel',
      category: 'Hostel',
      description: 'Affordable hostel living for students and working professionals',
      images: [
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
    {
      title: 'Co-living',
      category: 'Co-living',
      description: 'Modern co-living spaces with community and facilities',
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
    {
      title: 'Apartment/Flats',
      category: 'Apartment',
      description: 'Private apartments for individuals and small groups',
      images: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]
    },
  ];

  // Helper function to get city images dynamically
  const getCityImage = (cityName) => {
    const cityImages = {
      'Kota': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Indore': 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Jaipur': 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Delhi': 'https://images.pexels.com/photos/1008646/pexels-photo-1008646.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Bhopal': 'https://images.pexels.com/photos/1603801/pexels-photo-1603801.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Nagpur': 'https://images.pexels.com/photos/1573236/pexels-photo-1573236.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Sikar': 'https://images.pexels.com/photos/574324/pexels-photo-574324.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Mumbai': 'https://images.pexels.com/photos/1139049/pexels-photo-1139049.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Bangalore': 'https://images.pexels.com/photos/1470143/pexels-photo-1470143.jpeg?auto=compress&cs=tinysrgb&w=400',
      'Pune': 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    return cityImages[cityName] || 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  // Fetch dynamic data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch cities
        const citiesData = await fetchCities();
        if (citiesData && citiesData.length > 0) {
          // Map API data to component format - use imageUrl from backend
          const formattedCities = citiesData.map((city, index) => ({
            name: city.name || city,
            properties: city.propertyCount ? `${city.propertyCount}+` : staticCities[index]?.properties || '1,000+',
            // Use imageUrl from backend, fallback to static images
            image: city.imageUrl || city.image || staticCities[index]?.image || getCityImage(city.name)
          }));
          setCities(formattedCities);
        } else {
          setCities(staticCities);
        }

        // Fetch property types/offerings
        const propertyTypesData = await fetchPropertyTypes();
        if (propertyTypesData && propertyTypesData.length > 0) {
          setOfferings(propertyTypesData);
        } else {
          setOfferings(staticOfferings);
        }
      } catch (error) {
        console.error('Error loading homepage data:', error);
        // Fallback to static data on error
        setCities(staticCities);
        setOfferings(staticOfferings);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Search handler - search by city, area, property name, type
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setIsSearching(true);
    const lowerQuery = query.toLowerCase();
    
    try {
      // Fetch all properties for search
      const allProperties = await fetchProperties();
      
      // Filter and categorize results
      const results = [];
      
      // 1. Search by City
      const cityMatches = cities.filter(city => 
        city.name?.toLowerCase().includes(lowerQuery)
      ).map(city => ({
        type: 'city',
        title: city.name,
        subtitle: `${city.properties || '1000+'} properties`,
        link: `/website/ourproperty?city=${encodeURIComponent(city.name.toLowerCase())}`,
        icon: 'MapPin'
      }));
      results.push(...cityMatches);
      
      // 2. Search by Property Name
      const propertyMatches = allProperties.filter(prop => {
        const propName = prop.propertyName || prop.property_name || prop.name || '';
        return propName.toLowerCase().includes(lowerQuery);
      }).slice(0, 5).map(prop => ({
        type: 'property',
        title: prop.propertyName || prop.property_name || prop.name,
        subtitle: `${prop.city || prop.location || ''} - ${prop.propertyType || prop.type || 'Property'}`,
        link: `/website/property-details/${prop._id || prop.visitId}`,
        icon: 'Building2'
      }));
      results.push(...propertyMatches);
      
      // 3. Search by Property Type
      const typeMatches = offerings.filter(offering => 
        offering.title?.toLowerCase().includes(lowerQuery) ||
        offering.category?.toLowerCase().includes(lowerQuery)
      ).map(offering => ({
        type: 'type',
        title: offering.title,
        subtitle: `Find ${offering.title} accommodations`,
        link: `/website/ourproperty?type=${encodeURIComponent(offering.category.toLowerCase())}`,
        icon: 'Home'
      }));
      results.push(...typeMatches);
      
      setSearchResults(results.slice(0, 8));
      setShowSearchDropdown(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    
    // Build query parameters
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }
    if (selectedType) {
      params.append('type', selectedType.toLowerCase());
    }
    
    const queryString = params.toString();
    const navigateUrl = queryString ? `/website/ourproperty?${queryString}` : '/website/ourproperty';
    
    navigate(navigateUrl);
    setShowSearchDropdown(false);
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearchDropdown && !event.target.closest('.search-container')) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchDropdown]);

  const featuredProperties = [
    {
      name: 'Sunrise PG',
      location: 'Kota, Rajasthan',
      price: '₹6,500',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Elite Hostel',
      location: 'Indore, MP',
      price: '₹5,200',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Urban Co-Space',
      location: 'Jaipur, Rajasthan',
      price: '₹8,900',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Campus View PG',
      location: 'Delhi NCR',
      price: '₹7,800',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Royal Residency',
      location: 'Mumbai, Maharashtra',
      price: '₹12,500',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Smart Stay PG',
      location: 'Bhopal, MP',
      price: '₹5,800',
      rating: 4.4,
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Grand Hostel',
      location: 'Nagpur, Maharashtra',
      price: '₹4,800',
      rating: 4.3,
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'City Center PG',
      location: 'Jodhpur, Rajasthan',
      price: '₹6,200',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Premium Co-Living',
      location: 'Pune, Maharashtra',
      price: '₹10,500',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Student Hub',
      location: 'Lucknow, UP',
      price: '₹5,500',
      rating: 4.2,
      image: 'https://images.pexels.com/photos/1743228/pexels-photo-1743228.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Comfort Inn PG',
      location: 'Chandigarh',
      price: '₹7,200',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Metro Hostel',
      location: 'Bangalore, Karnataka',
      price: '₹8,000',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
  ];

  const liveBiddingProperties = [
    {
      name: 'Sunrise PG',
      location: 'Kota',
      price: '₹6,500',
      currentBid: '₹6,200',
      timeLeft: '2h 15m',
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Elite Hostel',
      location: 'Indore',
      price: '₹5,200',
      currentBid: '₹5,100',
      timeLeft: '45m',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true
    },
    {
      name: 'Urban Co-Space',
      location: 'Jaipur',
      price: '₹8,900',
      currentBid: '₹8,500',
      timeLeft: '1h 30m',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      girlsOnly: true
    },
  ];

  // Hero image slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494203484021-3c454daf695d?q=80&w=2070&auto=format&fit=crop'
  ];

  // Cities carousel state
  const [cityStartIndex, setCityStartIndex] = useState(0);
  const citiesPerView = 4;
  const [mobileCityIndex, setMobileCityIndex] = useState(0); // Mobile: 1 row (4 cities) at a time

  // Trending properties carousel state
  const [trendingStartIndex, setTrendingStartIndex] = useState(0);
  const trendingPerView = 4;

  // What We Offer - selected image index for each offering
  const [offeringSelectedImage, setOfferingSelectedImage] = useState({});
  const [mobileOfferingIndex, setMobileOfferingIndex] = useState(0); // Mobile: 1 offering at a time
  const [mobileImageIndex, setMobileImageIndex] = useState(0); // Mobile: current image index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextCities = () => {
    setCityStartIndex((prev) => 
      prev + citiesPerView >= cities.length ? 0 : prev + citiesPerView
    );
  };

  const prevCities = () => {
    setCityStartIndex((prev) => 
      prev - citiesPerView < 0 ? Math.max(0, cities.length - citiesPerView) : prev - citiesPerView
    );
  };

  const nextTrending = () => {
    setTrendingStartIndex((prev) => 
      prev + trendingPerView >= featuredProperties.length ? 0 : prev + trendingPerView
    );
  };

  const prevTrending = () => {
    setTrendingStartIndex((prev) => 
      prev - trendingPerView < 0 ? Math.max(0, featuredProperties.length - trendingPerView) : prev - trendingPerView
    );
  };

  const visibleCities = cities.slice(cityStartIndex, cityStartIndex + citiesPerView);
  const visibleTrending = featuredProperties.slice(trendingStartIndex, trendingStartIndex + trendingPerView);
  const canShowNextCities = cityStartIndex + citiesPerView < cities.length;
  const canShowPrevCities = cityStartIndex > 0;
  const canShowNextTrending = trendingStartIndex + trendingPerView < featuredProperties.length;
  const canShowPrevTrending = trendingStartIndex > 0;

  // Mobile carousel helpers
  const canShowNextMobileCity = mobileCityIndex + 4 < cities.length;
  const canShowPrevMobileCity = mobileCityIndex > 0;
  const canShowNextMobileOffering = mobileOfferingIndex < offerings.length - 1;
  const canShowPrevMobileOffering = mobileOfferingIndex > 0;
  const visibleMobileCities = cities.slice(mobileCityIndex, mobileCityIndex + 4);
  const visibleMobileOffering = offerings[mobileOfferingIndex];

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative min-h-[240px] md:min-h-0 md:h-[380px] bg-gradient-to-br from-teal-600 via-blue-600 to-cyan-500 overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>
          ))}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-start pt-4 md:pt-16">
            <h1 className="text-xl sm:text-4xl md:text-6xl font-bold text-white mb-1 md:mb-4 leading-tight text-center">
              Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Student Stay</span>
            </h1>
            <p className="text-xs sm:text-lg md:text-xl text-white/95 mb-2 md:mb-6 max-w-4xl mx-auto leading-relaxed text-center px-2">
              Search verified PGs, hostels & co-living spaces across 50+ Indian cities
            </p>

            {/* Mobile CTA Buttons */}
            <div className="flex md:hidden gap-2 justify-center mb-2">
              <Link
                to="/website/ourproperty"
                className="bg-[#1ab64f] text-white px-4 py-2 rounded-full font-semibold text-xs shadow-lg"
              >
                Browse Properties
              </Link>
              <Link
                to="/website/fast-bidding"
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-xs shadow-lg"
              >
                Bid Now
              </Link>
            </div>

            <div className="max-w-5xl mx-auto w-full px-2 md:px-4 search-container relative">
              <form onSubmit={handleSearchSubmit} className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-2 md:p-3 flex flex-col md:flex-row gap-2 md:gap-3">
                <div className="relative">
                  <select
                    className="appearance-none bg-teal-50 text-gray-700 px-3 md:px-6 py-2.5 md:py-4 pr-8 md:pr-12 rounded-xl md:rounded-2xl font-medium focus:outline-none cursor-pointer min-w-[100px] md:min-w-[140px] text-xs md:text-lg w-full md:w-auto"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">Type</option>
                    <option value="pg">PG</option>
                    <option value="hostel">Hostel</option>
                    <option value="co-living">Co-living</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>
                <div className="flex-1 flex items-center px-3 md:px-6 py-2.5 md:py-4 bg-gray-50 rounded-xl md:rounded-2xl relative">
                  <Search className="w-4 h-4 md:w-6 md:h-6 text-gray-400 mr-2 md:mr-4 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city, area, PG name..."
                    className="flex-1 bg-transparent outline-none text-gray-700 text-xs md:text-lg min-w-0"
                  />
                  {isSearching && (
                    <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <button type="submit" className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 md:px-12 py-2.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-lg transition-all w-full md:w-auto">
                  Search
                </button>
              </form>
              
              {/* Search Suggestions Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.map((result, idx) => (
                      <Link
                        key={idx}
                        to={result.link}
                        onClick={() => setShowSearchDropdown(false)}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {result.icon === 'MapPin' && <MapPin className="w-5 h-5 text-teal-600" />}
                          {result.icon === 'Building2' && <Building2 className="w-5 h-5 text-teal-600" />}
                          {result.icon === 'Home' && <Home className="w-5 h-5 text-teal-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{result.title}</p>
                          <p className="text-sm text-gray-500">{result.subtitle}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Popular Cities - Carousel with 4 items */}
        <section className="py-3 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-2 md:mb-8">
              <div className="flex-1">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900">Popular Cities</h2>
                <p className="text-xs md:text-lg text-gray-600 mt-1">Explore top cities for student accommodation</p>
              </div>
            </div>

            {/* Desktop Grid - Hidden on mobile */}
            <div className="hidden md:block relative">
              {/* Left Arrow - positioned on the side */}
              {cities.length > citiesPerView && canShowPrevCities && (
                <button
                  onClick={prevCities}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}

              {/* Right Arrow - positioned on the side */}
              {cities.length > citiesPerView && canShowNextCities && (
                <button
                  onClick={nextCities}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleCities.map((city) => (
                  <Link
                    key={city.name}
                    to={`/website/ourproperty?city=${city.name}`}
                    className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 block h-48"
                  >
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">{city.name}</h3>
                      <p className="text-sm text-white/90">{city.properties} Properties</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Carousel - 1 row (4 cities) per view with arrows */}
            <div className="md:hidden relative">
              {/* Left Arrow */}
              {canShowPrevMobileCity && (
                <button
                  onClick={() => setMobileCityIndex(prev => prev - 4)}
                  className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
              )}

              {/* Right Arrow */}
              {canShowNextMobileCity && (
                <button
                  onClick={() => setMobileCityIndex(prev => prev + 4)}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              )}

              <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                {visibleMobileCities.map((city) => (
                  <Link
                    key={city.name}
                    to={`/website/ourproperty?city=${city.name}`}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5">
                      <img src={city.image} alt={city.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="mt-1.5 text-[11px] font-semibold text-gray-800 leading-tight">{city.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

       

        {/* What We Offer - Desktop & Mobile Responsive */}
        <section className="py-3 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-2 md:mb-10">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-3">What We Offer</h2>
              <p className="text-xs md:text-lg text-gray-600">Choose from a variety of accommodation types tailored for students</p>
            </div>

            {/* Desktop Grid - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {offerings.map((offering) => {
                const selectedIdx = offeringSelectedImage[offering.title] || 0;
                const allImages = offering.images;
                const totalImages = allImages.length;

                const nextImage = () => {
                  setOfferingSelectedImage(prev => ({
                    ...prev,
                    [offering.title]: (selectedIdx + 1) % totalImages
                  }));
                };

                const prevImage = () => {
                  setOfferingSelectedImage(prev => ({
                    ...prev,
                    [offering.title]: (selectedIdx - 1 + totalImages) % totalImages
                  }));
                };

                return (
                  <Link
                    key={offering.title}
                    to={`/website/ourproperty?type=${offering.category.toLowerCase()}`}
                    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all group block cursor-pointer"
                  >
                    {/* Main Image - with arrows */}
                    <div className="h-36 overflow-hidden relative">
                      <img
                        src={allImages[selectedIdx]}
                        alt={offering.title}
                        className="w-full h-full object-cover transition-all duration-300"
                      />

                      {/* Title always visible at TOP */}
                      <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/50 to-transparent">
                        <h3 className="text-base font-bold text-white drop-shadow-md">{offering.title}</h3>
                      </div>

                      {/* Description on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-xs text-white drop-shadow-md line-clamp-2">{offering.description}</p>
                      </div>

                      {/* Left Arrow */}
                      {totalImages > 1 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-transparent hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <ChevronLeft className="w-6 h-6 text-white drop-shadow-lg" />
                        </button>
                      )}

                      {/* Right Arrow */}
                      {totalImages > 1 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-transparent hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
                        </button>
                      )}

                      {/* Image Counter */}
                      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        {selectedIdx + 1} / {totalImages}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Carousel - 1 item per view with image navigation */}
            <div className="md:hidden relative px-1">
              {/* Offering Navigation - Top arrows for switching offerings */}
              <div className="flex items-center justify-between mb-2">
                {canShowPrevMobileOffering ? (
                  <button
                    onClick={() => {
                      setMobileOfferingIndex(prev => prev - 1);
                      setMobileImageIndex(0); // Reset image when changing offering
                    }}
                    className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                ) : <div className="w-8" />}

                <span className="text-sm font-medium text-gray-600">
                  {mobileOfferingIndex + 1} / {offerings.length}
                </span>

                {canShowNextMobileOffering ? (
                  <button
                    onClick={() => {
                      setMobileOfferingIndex(prev => prev + 1);
                      setMobileImageIndex(0); // Reset image when changing offering
                    }}
                    className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                ) : <div className="w-8" />}
              </div>

              {/* Single Offering Card */}
              <div className="flex justify-center">
                {visibleMobileOffering && (
                  <Link
                    to={`/website/ourproperty?type=${visibleMobileOffering.category.toLowerCase()}`}
                    className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-lg block"
                  >
                    <div className="h-44 overflow-hidden relative group">
                      {/* Current Image */}
                      <img
                        src={visibleMobileOffering.images[mobileImageIndex]}
                        alt={visibleMobileOffering.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Title always visible at TOP */}
                      <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/50 to-transparent">
                        <h3 className="text-xl font-bold text-white drop-shadow-md">{visibleMobileOffering.title}</h3>
                      </div>

                      {/* Description on hover/tap */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300">
                        <p className="text-sm text-white drop-shadow-md line-clamp-2">{visibleMobileOffering.description}</p>
                      </div>

                      {/* Image Navigation Arrows - Inside image */}
                      {visibleMobileOffering.images.length > 1 && (
                        <>
                          {/* Left Image Arrow */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileImageIndex(prev =>
                                prev === 0 ? visibleMobileOffering.images.length - 1 : prev - 1
                              );
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center"
                          >
                            <ChevronLeft className="w-5 h-5 text-white" />
                          </button>

                          {/* Right Image Arrow */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileImageIndex(prev =>
                                prev === visibleMobileOffering.images.length - 1 ? 0 : prev + 1
                              );
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center"
                          >
                            <ChevronRight className="w-5 h-5 text-white" />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        {mobileImageIndex + 1} / {visibleMobileOffering.images.length}
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* Image Dots - Below card */}
              {visibleMobileOffering && visibleMobileOffering.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-3">
                  {visibleMobileOffering.images.map((_, imgIdx) => (
                    <button
                      key={imgIdx}
                      onClick={() => setMobileImageIndex(imgIdx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        imgIdx === mobileImageIndex ? 'bg-teal-500 w-4' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Offering Dots Indicator */}
              <div className="flex justify-center gap-2 mt-3">
                {offerings.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMobileOfferingIndex(index);
                      setMobileImageIndex(0);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === mobileOfferingIndex ? 'bg-teal-500 w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Trending Stays - Same as Desktop, 1 item per row */}
        <MobilePropertiesSection />

        <MobileVideoSection />

        {/* How Roomhy Works - Video Section */}
        {/* How Roomhy Works - Improved Section */}
<section className="hidden md:block py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        How Roomhy Works
      </h2>
      <p className="text-lg text-gray-600">
        Find, compare, and book your perfect stay in just a few steps
      </p>
    </div>

    {/* Video Container */}
    <div className="relative rounded-3xl overflow-hidden shadow-xl group">

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10"></div>

      {/* Video */}
    <iframe
  width="100%"
  height="500"
  src="https://www.youtube.com/embed/4pFUP0HZwWM"
  title="YouTube video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

      {/* Play Badge */}
      <div className="absolute bottom-5 left-5 z-20 text-white">
        <h3 className="text-xl font-semibold">Watch Demo</h3>
        <p className="text-sm text-white/80">See how booking works</p>
      </div>

    </div>

  </div>
</section>
 

        {/* Trending Stays - Carousel with 12 properties - DESKTOP ONLY */}
        <section className="hidden md:block py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div className="text-center flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Trending Stays This Week</h2>
                <p className="text-lg text-gray-600">Most popular properties among students</p>
              </div>
            </div>
            
            <div className="relative">
              {/* Left Arrow */}
              {featuredProperties.length > trendingPerView && canShowPrevTrending && (
                <button 
                  onClick={prevTrending}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              
              {/* Right Arrow */}
              {featuredProperties.length > trendingPerView && canShowNextTrending && (
                <button 
                  onClick={nextTrending}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleTrending.map((property) => (
                <div key={property.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-32">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                    {property.verified && (
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-0.5 flex items-center">
                        <BadgeCheck className="w-3 h-3 text-teal-600 mr-1" />
                        <span className="text-[10px] font-bold">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-base">{property.name}</h3>
                    <div className="flex items-center text-gray-600 text-xs mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-teal-600">{property.price}</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold text-sm">{property.rating}</span>
                      </div>
                    </div>
                    <Link 
                      to="/website/fast-bidding"
                      className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-lg font-bold text-center block transition-colors text-sm"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>

        {/* Why Choose Roomhy - Combined Section */}
        <WhyRoomhy />
        
        {/* Reviews Slider Section - Auto Sliding */}
        <section className="py-3 md:py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 md:mb-10">
            <div className="text-center">
              <h2 className="text-lg md:text-4xl font-bold text-gray-900 mb-1 md:mb-3">What Students Say</h2>
              <p className="text-xs md:text-lg text-gray-600">Trusted by 10,000+ students across India</p>
            </div>
          </div>
          
          {/* Auto-sliding Reviews Carousel */}
          <div className="relative">
            <div className="flex animate-scroll-left hover:pause-animation">
              {/* First set of reviews */}
              {[...Array(2)].flatMap((_, setIdx) => [
                {
                  name: "Rahul Sharma",
                  role: "IIT Delhi Student",
                  rating: 5,
                  text: "Roomhy made finding my hostel so easy! Zero brokerage and the bidding feature helped me get a great deal.",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                },
                {
                  name: "Priya Patel",
                  role: "Medical Student",
                  rating: 5,
                  text: "The 24/7 support team helped me find a safe PG near my college. Best platform for students!",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                },
                {
                  name: "Amit Kumar",
                  role: "Engineering Student",
                  rating: 5,
                  text: "Found a fully furnished apartment in just 2 days. The direct chat with owners saved so much time.",
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
                },
                {
                  name: "Sneha Gupta",
                  role: "MBA Student",
                  rating: 5,
                  text: "Love the verified listings! No fake photos or hidden charges. Roomhy is a game changer.",
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                },
                {
                  name: "Vikram Singh",
                  role: "Law Student",
                  rating: 4,
                  text: "The ₹500 booking token is such a smart feature. It shows owners you're serious about renting.",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                },
                {
                  name: "Anjali Mehta",
                  role: "CA Student",
                  rating: 5,
                  text: "Moved to Kota for coaching and found the perfect hostel within a day. Thank you Roomhy!",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                }
              ].map((review, idx) => (
                <div key={`${setIdx}-${idx}`} className="flex-shrink-0 w-[280px] mx-2">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-teal-100"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                        <p className="text-xs text-gray-500">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed italic">"{review.text}"</p>
                  </div>
                </div>
              )))}
            </div>
          </div>
          
          {/* Custom CSS for animation */}
          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll-left {
              animation: scroll-left 30s linear infinite;
            }
            .animate-scroll-left:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>

      </main>
            
      <WebsiteFooter />

      {/* Floating Chat Now Button - Desktop only */}
      <Link
        to="/website/chat"
        className="hidden md:flex fixed bottom-48 right-6 z-50 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-bold hover:shadow-2xl transition-all items-center gap-2 shadow-xl group px-4 py-4 overflow-hidden"
      >
        <MessageSquare className="h-5 w-5 flex-shrink-0" />
        <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 whitespace-nowrap">Chat Now</span>
      </Link>

      {/* Floating BidNow Button - Desktop */}
      <Link
        to="/website/fast-bidding"
        className="hidden md:flex fixed bottom-32 right-6 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold hover:shadow-2xl transition-all items-center gap-2 shadow-xl group px-4 py-4 overflow-hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 whitespace-nowrap">BidNow</span>
      </Link>

{/* Mobile Bid Now Button */}
<Link
  to="/website/fast-bidding"
  className="md:hidden fixed bottom-20 right-6 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold shadow-xl flex items-center gap-2 group px-4 py-4 overflow-hidden active:scale-95 transition-all"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
  <span className="max-w-0 group-active:max-w-xs overflow-hidden transition-all duration-300 whitespace-nowrap">BidNow</span>
</Link>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
