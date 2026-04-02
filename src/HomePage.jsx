import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, BadgeCheck, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import HowRoomhyWorks from './components/website/HowRoomhyWorks';
import WhyRoomhy from './components/website/WhyRoomhy';
import FindYourHome from './components/website/FindYourHome';
import WhyStudentsChooseUs from './components/website/WhyStudentsChooseUs';
import WebsiteNavbar from './components/website/WebsiteNavbar';
import WebsiteFooter from './components/website/WebsiteFooter';
import { fetchCities, fetchPropertyTypes } from './utils/api';

export default function HomePage() {
  // State for dynamic data
  const [cities, setCities] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch dynamic data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch cities
        const citiesData = await fetchCities();
        if (citiesData && citiesData.length > 0) {
          // Map API data to component format
          const formattedCities = citiesData.map((city, index) => ({
            name: city.name || city,
            properties: city.propertyCount ? `${city.propertyCount}+` : staticCities[index]?.properties || '1,000+',
            image: city.image || staticCities[index]?.image || 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400'
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

  // Trending properties carousel state
  const [trendingStartIndex, setTrendingStartIndex] = useState(0);
  const trendingPerView = 4;

  // What We Offer - selected image index for each offering
  const [offeringSelectedImage, setOfferingSelectedImage] = useState({});

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

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[380px] bg-gradient-to-br from-teal-600 via-blue-600 to-cyan-500 overflow-hidden">
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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-start pt-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight text-center">
              Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Student Stay</span>
            </h1>
            <p className="text-lg md:text-xl text-white/95 mb-6 max-w-4xl mx-auto leading-relaxed text-center">
              Search verified PGs, hostels & co-living spaces across 50+ Indian cities
            </p>

            <div className="max-w-5xl mx-auto w-full px-4">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <select className="appearance-none bg-teal-50 text-gray-700 px-6 py-4 pr-12 rounded-2xl font-medium focus:outline-none cursor-pointer min-w-[140px] text-lg">
                    <option value="PG">PG</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Co-living">Co-living</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>
                <div className="flex-1 flex items-center px-6 py-4 bg-gray-50 rounded-2xl">
                  <Search className="w-6 h-6 text-gray-400 mr-4" />
                  <input
                    type="text"
                    placeholder="Search for PG, Hostel, or City..."
                    className="flex-1 bg-transparent outline-none text-gray-700 text-lg"
                  />
                </div>
                <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Cities - Carousel with 4 items */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Popular Cities</h2>
                <p className="text-lg text-gray-600 mt-1">Explore top cities for student accommodation</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevCities}
                  disabled={!canShowPrevCities}
                  className={`p-3 rounded-full shadow-md hover:shadow-lg transition-all ${canShowPrevCities ? 'bg-white hover:bg-gray-50' : 'bg-gray-200 cursor-not-allowed'}`}
                >
                  <ChevronLeft className={`w-6 h-6 ${canShowPrevCities ? 'text-gray-700' : 'text-gray-400'}`} />
                </button>
                <button 
                  onClick={nextCities}
                  disabled={!canShowNextCities}
                  className={`p-3 rounded-full shadow-md hover:shadow-lg transition-all ${canShowNextCities ? 'bg-white hover:bg-gray-50' : 'bg-gray-200 cursor-not-allowed'}`}
                >
                  <ChevronRight className={`w-6 h-6 ${canShowNextCities ? 'text-gray-700' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>

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
        </section>

        {/* What We Offer - Multiple images showing rooms */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Offer</h2>
              <p className="text-lg text-gray-600">Choose from a variety of accommodation types tailored for students</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div
                    key={offering.title}
                    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all group"
                  >
                    {/* Main Large Image - with arrows and hover content */}
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={allImages[selectedIdx]}
                        alt={offering.title}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                      
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Hover Content - Title & Description */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">{offering.title}</h3>
                        <p className="text-sm text-white/90 line-clamp-2">{offering.description}</p>
                      </div>

                      {/* Left Arrow */}
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>

                      {/* Right Arrow */}
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        {selectedIdx + 1} / {totalImages}
                      </div>
                    </div>

                    {/* Thumbnail Row - all 10 images scrollable with navigation */}
                    <div className="flex gap-1.5 p-2 bg-gray-50 overflow-x-auto scrollbar-hide">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOfferingSelectedImage(prev => ({ ...prev, [offering.title]: idx }));
                          }}
                          className={`flex-shrink-0 w-14 h-12 overflow-hidden rounded transition-all ${
                            idx === selectedIdx 
                              ? 'ring-2 ring-blue-500 ring-offset-1 opacity-100' 
                              : 'opacity-50 hover:opacity-80'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`${offering.title} ${idx + 1}`}
                            className="w-full h-full object-cover"
                            draggable="false"
                          />
                        </button>
                      ))}
                    </div>

                    {/* View More Link */}
                    <Link 
                      to={`/website/ourproperty?type=${offering.category}`}
                      className="block text-center py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      View All {offering.title}s →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trending Stays - Carousel with 12 properties */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div className="text-center flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Trending Stays This Week</h2>
                <p className="text-lg text-gray-600">Most popular properties among students</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevTrending}
                  disabled={!canShowPrevTrending}
                  className={`p-3 rounded-full shadow-md hover:shadow-lg transition-all ${canShowPrevTrending ? 'bg-white hover:bg-gray-50' : 'bg-gray-200 cursor-not-allowed'}`}
                >
                  <ChevronLeft className={`w-6 h-6 ${canShowPrevTrending ? 'text-gray-700' : 'text-gray-400'}`} />
                </button>
                <button 
                  onClick={nextTrending}
                  disabled={!canShowNextTrending}
                  className={`p-3 rounded-full shadow-md hover:shadow-lg transition-all ${canShowNextTrending ? 'bg-white hover:bg-gray-50' : 'bg-gray-200 cursor-not-allowed'}`}
                >
                  <ChevronRight className={`w-6 h-6 ${canShowNextTrending ? 'text-gray-700' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleTrending.map((property) => (
                <div key={property.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-44">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                    {property.verified && (
                      <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center">
                        <BadgeCheck className="w-4 h-4 text-teal-600 mr-1" />
                        <span className="text-xs font-bold">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{property.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-teal-600">{property.price}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{property.rating}</span>
                      </div>
                    </div>
                    <Link 
                      to="/website/fast-bidding"
                      className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-bold text-center block transition-colors"
                    >
                      Bid Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Roomhy - Combined Section */}
        <WhyRoomhy />
        <FindYourHome />
      </main>

      <WebsiteFooter />

      {/* Floating BidNow Button */}
      <Link
        to="/website/fast-bidding"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full text-base font-bold hover:shadow-2xl transition-all flex items-center gap-2 shadow-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>BidNow</span>
      </Link>
    </div>
  );
}
