import { Building2, Users, Search, MapPin, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCities, fetchAreas } from '../../utils/api';
import LocationMapPicker from './LocationMapPicker';

export default function WebsiteNavbar() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const propertyTypes = ['PG', 'Hostel', 'Flat', 'Villa', 'Shared Room', 'Private Room'];

  // Fetch cities on load
  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await fetchCities();
        if (Array.isArray(citiesData)) {
          setCities(citiesData.map(c => typeof c === 'string' ? c : c.name));
        }
      } catch (error) {
        console.error('Error loading cities:', error);
        setCities(['Kota', 'Indore', 'Jaipur', 'Delhi', 'Bhopal', 'Nagpur', 'Mumbai', 'Bangalore']);
      }
    };
    loadCities();
  }, []);

  // Fetch areas when city changes
  useEffect(() => {
    const loadAreas = async () => {
      if (selectedCity) {
        try {
          const areasData = await fetchAreas();
          const filteredAreas = areasData.filter(a => 
            (typeof a === 'object' ? a.city : a.split('-')[0]) === selectedCity
          );
          setAreas(filteredAreas.map(a => typeof a === 'string' ? a : a.name));
        } catch (error) {
          console.error('Error loading areas:', error);
          setAreas([]);
        }
      }
    };
    loadAreas();
  }, [selectedCity]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.append('city', selectedCity);
    if (selectedArea) params.append('area', selectedArea);
    if (propertyType) params.append('type', propertyType);
    if (selectedLocation) {
      params.append('latitude', selectedLocation.latitude);
      params.append('longitude', selectedLocation.longitude);
    }
    navigate(`/website/ourproperty?${params.toString()}`);
    setShowSearch(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowMapPicker(false);
    // Auto-populate city from location if possible
    console.log('Selected location:', location);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-teal-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ROOMHY<span className="text-teal-500">.com</span></h1>
                <p className="text-xs text-gray-500">Discover Your Next Home</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="/website/index" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">Home</a>
              <a href="/website/ourproperty" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">Properties</a>
              
              <a href="/website/faq" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">FAQ</a>
              <a href="/website/about" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">About</a>
              <a href="/website/contact" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">Contact</a>
              <a href="/website/list" className="text-gray-700 hover:text-teal-500 transition-colors font-medium">List Property</a>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search className="w-6 h-6 text-gray-700" />
              </button>
              <a href="/website/fast-bidding" className="bg-orange-500 hover:bg-orange-600 text-white px-3 md:px-4 py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm md:text-base whitespace-nowrap">
                BidNow
              </a>
              <a href="/login" className="text-gray-700 hover:text-teal-500 transition-colors">
                <Users className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      {showSearch && (
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-500" />
              Find Your Perfect Property
            </h3>
            
            {/* Selected Location Display */}
            {selectedLocation && (
              <div className="mb-4 p-3 bg-white border-2 border-teal-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{selectedLocation.location}</p>
                  <p className="text-xs text-gray-500">
                    {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-sm text-red-500 hover:text-red-700 font-semibold"
                >
                  Clear
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* City Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedArea('');
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 bg-white"
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Area Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Area</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  disabled={!selectedCity}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 bg-white disabled:bg-gray-100"
                >
                  <option value="">All Areas</option>
                  {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 bg-white"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Map Button */}
              <div className="flex items-end">
                <button
                  onClick={() => setShowMapPicker(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Map
                </button>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Picker Modal */}
      {showMapPicker && (
        <LocationMapPicker
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowMapPicker(false)}
        />
      )}
    </>
  );
}
