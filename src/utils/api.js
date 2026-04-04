import { fetchPropertiesLocal } from './mockApi';

export const getApiBase = () => {
  // Use Vite env variable if available
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  
  // Production Vercel deployment
  if (host.includes('vercel.app') || host.includes('roomhy.com')) {
    return "https://roomhy-backend.vercel.app";
  }
  
  // Local development
  return host === "localhost" || host === "127.0.0.1"
    ? "http://localhost:5001"
    : "https://roomhy-backend.vercel.app";
};

export const getAuthHeader = () => {
  if (typeof window === "undefined") return {};
  let token = "";
  try {
    token = sessionStorage.getItem("token") || localStorage.getItem("token") || "";
  } catch (_) {
    token = "";
  }
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchJson = async (path, options = {}) => {
  const base = getApiBase();
  const url = path.startsWith("http") ? path : `${base}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...getAuthHeader()
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`Request failed: ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json();
};

// Fetch cities from backend
export const fetchCities = async () => {
  try {
    const data = await fetchJson('/api/locations/cities');
    return data.data || data || [];
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

// Fetch areas from backend
export const fetchAreas = async () => {
  try {
    const data = await fetchJson('/api/locations/areas');
    return data.data || data || [];
  } catch (error) {
    console.error('Error fetching areas:', error);
    return [];
  }
};

// Fetch properties from backend
export const fetchProperties = async () => {
  try {
    const data = await fetchJson('/api/approved-properties/public/approved');
    const properties = Array.isArray(data) ? data : data?.properties || data?.data || [];
    
    // Ensure all required fields are present with fallback values
    return properties
      .filter(p => p.isLiveOnWebsite === true || p.status === 'live' || p.status === 'approved')
      .map(p => ({
        ...p,
        // Ensure all required fields exist
        property_name: p.property_name || p.propertyName || p.propertyInfo?.name || 'Property',
        city: p.city || p.propertyInfo?.city || 'Unknown',
        owner_name: p.owner_name || p.ownerName || p.generatedCredentials?.ownerName || p.approvedBy || 'Verified Owner',
        owner_phone: p.owner_phone || p.contactPhone || p.ownerPhone || p.propertyInfo?.phone || '9000000000',
        propertyName: p.propertyName || p.property_name || p.propertyInfo?.name || 'Property',
        propertyType: p.propertyType || p.property_type || p.propertyInfo?.propertyType || 'PG',
        monthlyRent: p.monthlyRent || p.rent || p.propertyInfo?.rent || 5000
      }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Fetch stats for homepage
export const fetchStats = async () => {
  try {
    const [properties, cities] = await Promise.all([fetchProperties(), fetchCities()]);
    const liveProperties = properties.filter(p => p.isLiveOnWebsite === true || p.status === 'live' || p.status === 'approved');
    const uniqueCities = new Set(liveProperties.map(p => p.city || p.propertyInfo?.city)).size;
    const totalBeds = liveProperties.reduce((acc, p) => acc + (parseInt(p.totalSeats || p.beds || p.propertyInfo?.totalSeats || 1) || 1), 0);
    return {
      cities: uniqueCities || cities.length || 15,
      residences: liveProperties.length || 450,
      beds: totalBeds || 70000
    };
  } catch (error) {
    return { cities: 15, residences: 450, beds: 70000 };
  }
};

// Fetch reviews from backend
export const fetchReviews = async () => {
  try {
    const data = await fetchJson('/api/reviews/public');
    return data.data || data || [];
  } catch (error) {
    return [];
  }
};

// Submit website enquiry
export const submitEnquiry = async (formData) => {
  return fetchJson('/api/website-enquiry/submit', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};

// Submit bid
export const submitBid = async (bidData) => {
  return fetchJson('/api/booking/create', {
    method: 'POST',
    body: JSON.stringify(bidData)
  });
};

// Fetch property types/categories for offerings
export const fetchPropertyTypes = async () => {
  try {
    // First try to get from dedicated endpoint
    const data = await fetchJson('/api/property-types');
    if (data && data.length > 0) {
      return data;
    }
  } catch (error) {
    // Fallback: derive from properties
    console.log('Property types endpoint not available, using fallback');
  }
  
  // Fallback: get unique property types from approved properties
  try {
    const properties = await fetchProperties();
    const types = new Set();
    properties.forEach(p => {
      const type = p.propertyType || p.propertyInfo?.propertyType || p.type;
      if (type) types.add(type);
    });
    
    // Map to standard format with images array
    const typeMap = {
      'pg': { 
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
      'hostel': { 
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
      'coliving': { 
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
      'apartment': { 
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
      }
    };
    
    const result = [];
    types.forEach(type => {
      const key = type.toLowerCase();
      if (typeMap[key]) {
        result.push(typeMap[key]);
      }
    });
    
    // Always return all default types, merging with any found types
    const defaultTypes = Object.values(typeMap);
    if (result.length === 0) {
      return defaultTypes;
    }
    
    // Ensure all default types are present (merge found with defaults)
    const foundCategories = new Set(result.map(r => r.category.toLowerCase()));
    defaultTypes.forEach(defaultType => {
      if (!foundCategories.has(defaultType.category.toLowerCase())) {
        result.push(defaultType);
      }
    });
    
    return result;
  } catch (error) {
    console.error('Error fetching property types:', error);
    return [];
  }
};

// Search properties by location and property type
export const searchPropertiesByLocation = async (latitude, longitude, propertyType = null, radiusKm = 10) => {
  try {
    const properties = await fetchProperties();
    
    // Calculate distance between two coordinates (Haversine formula)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    // Get nearby coordinates (mock data - in real app, fetch from db)
    const coordinatesByCity = {
      'Kota': { lat: 25.2048, lon: 75.8615 },
      'Indore': { lat: 22.7196, lon: 75.8577 },
      'Jaipur': { lat: 26.9124, lon: 75.7873 },
      'Delhi': { lat: 28.6139, lon: 77.2090 },
      'Bhopal': { lat: 23.1815, lon: 79.9864 },
      'Nagpur': { lat: 21.1458, lon: 79.0882 },
      'Mumbai': { lat: 19.0760, lon: 72.8777 },
      'Bangalore': { lat: 12.9716, lon: 77.5946 }
    };

    let filtered = properties;

    // Filter by distance if coordinates provided
    if (latitude && longitude) {
      filtered = properties.filter(p => {
        const coords = coordinatesByCity[p.city || p.propertyInfo?.city];
        if (!coords) return false;
        const distance = calculateDistance(latitude, longitude, coords.lat, coords.lon);
        return distance <= radiusKm;
      });
    }

    // Filter by property type
    if (propertyType) {
      filtered = filtered.filter(p => {
        const type = p.propertyType || p.propertyInfo?.propertyType || p.type;
        return type && type.toLowerCase().includes(propertyType.toLowerCase());
      });
    }

    // Sort by distance (nearest first)
    filtered.sort((a, b) => {
      const coordsA = coordinatesByCity[a.city || a.propertyInfo?.city];
      const coordsB = coordinatesByCity[b.city || b.propertyInfo?.city];
      if (!coordsA || !coordsB) return 0;
      const distA = calculateDistance(latitude, longitude, coordsA.lat, coordsA.lon);
      const distB = calculateDistance(latitude, longitude, coordsB.lat, coordsB.lon);
      return distA - distB;
    });

    return filtered;
  } catch (error) {
    console.error('Error searching properties by location:', error);
    return [];
  }
};

// Get nearby areas for a location
export const getNearbyAreas = async (latitude, longitude, city) => {
  try {
    const areas = await fetchAreas();
    
    // Filter areas by city
    const cityAreas = areas.filter(a => 
      (typeof a === 'object' ? a.city : a.split('-')[0]) === city
    );

    return cityAreas.map(a => typeof a === 'string' ? a : a.name);
  } catch (error) {
    console.error('Error fetching nearby areas:', error);
    return [];
  }
};

// Get institutions/colleges for a city
export const getInstitutions = async (city) => {
  try {
    const cities = await fetchCities();
    const cityData = cities.find(c => (typeof c === 'object' ? c.name : c) === city);
    
    if (typeof cityData === 'object' && cityData.colleges) {
      return cityData.colleges;
    }

    // Fallback: fetch from properties with institution data
    const properties = await fetchProperties();
    const institutions = new Set();
    
    properties
      .filter(p => (p.city || p.propertyInfo?.city) === city)
      .forEach(p => {
        if (p.propertyInfo?.landmarks) {
          p.propertyInfo.landmarks.forEach(l => institutions.add(l));
        }
      });

    return Array.from(institutions);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    return [];
  }
};

// Get price range for property type
export const getPriceRangeByType = async (propertyType) => {
  try {
    const properties = await fetchProperties();
    
    const filtered = properties.filter(p => {
      const type = p.propertyType || p.propertyInfo?.propertyType || p.type;
      return type && type.toLowerCase().includes(propertyType.toLowerCase());
    });

    if (filtered.length === 0) {
      return { min: 0, max: 0, average: 0 };
    }

    const rents = filtered.map(p => p.monthlyRent || p.rent || p.propertyInfo?.rent || 0).filter(r => r > 0);
    const min = Math.min(...rents);
    const max = Math.max(...rents);
    const average = Math.round(rents.reduce((a, b) => a + b, 0) / rents.length);

    return { min, max, average, count: filtered.length };
  } catch (error) {
    console.error('Error fetching price range:', error);
    return { min: 0, max: 0, average: 0, count: 0 };
  }
};

// Fetch nearby colleges/institutes from OpenStreetMap API
export const fetchNearbyColleges = async (latitude, longitude, city = '', radiusKm = 2) => {
  try {
    // Simple place search for colleges/universities in the city
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
      `format=json&` +
      `q=college university school institute ${city}&` +
      `lat=${latitude}&` +
      `lon=${longitude}&` +
      `limit=10`,
      { 
        headers: { 'Accept-Language': 'en' },
        timeout: 5000
      }
    );
    
    if (!response.ok) throw new Error('OSM API failed');
    const results = await response.json();
    
    const colleges = new Set();
    results.slice(0, 8).forEach(result => {
      const name = result.name || result.display_name?.split(',')[0];
      if (name && name.length > 3 && !name.toLowerCase().includes('unknown')) {
        colleges.add(name.trim());
      }
    });
    
    return Array.from(colleges);
  } catch (error) {
    console.warn('Error fetching nearby colleges from OSM:', error);
    return [];
  }
};

// Enrich properties with nearby colleges from map API
export const enrichPropertiesWithColleges = async (properties) => {
  try {
    // Default colleges for each city - instant display (no waiting)
    const defaultCollegesByCity = {
      'Kota': ['Allen', 'FIITJEE', 'Bansal Classes', 'Resonance'],
      'Indore': ['IIT Indore', 'MITS', 'Devi Ahilya University', 'MAWL Institute'],
      'Jaipur': ['MNIT Jaipur', 'RTU Jaipur', 'Manipal University', 'BITS Pilani'],
      'Delhi': ['Delhi University', 'IIT Delhi', 'NSIT Delhi', 'DTU Delhi'],
      'Bhopal': ['IISER Bhopal', 'Barkatullah University', 'MATS University', 'ITM Universe'],
      'Nagpur': ['VNIT Nagpur', 'RCOEM', 'Rashtrasant Tukdoji Maharaj', 'Nagpur University'],
      'Mumbai': ['IIT Bombay', 'NMIMS', 'AISSMS', 'Mumbai University'],
      'Bangalore': ['IIT Bangalore', 'VTU', 'RV University', 'Christ University'],
      'Chandigarh': ['Punjab University', 'PEC University', 'Chitkara University', 'DAV College'],
      'Pune': ['Pune University', 'COEP', 'Symbiosis', 'MIT Pune']
    };

    // Map properties with fallback colleges immediately
    const enrichedProperties = properties.map((property) => {
      try {
        const city = property.city || property.propertyInfo?.city || 'Kota';
        
        // If already has nearby colleges from mock data, keep them
        if (property.nearbyColleges && property.nearbyColleges.length > 0) {
          return property;
        }
        
        // Use default colleges for the city
        const colleges = defaultCollegesByCity[city] || defaultCollegesByCity['Kota'];
        
        return {
          ...property,
          nearbyColleges: colleges
        };
      } catch (err) {
        console.warn('Error processing property:', err);
        return property;
      }
    });

    // Try to fetch real data from OSM in background (don't block UI)
    setTimeout(async () => {
      const cityCoordinates = {
        'Kota': { lat: 25.2048, lon: 75.8615 },
        'Indore': { lat: 22.7196, lon: 75.8577 },
        'Jaipur': { lat: 26.9124, lon: 75.7873 },
        'Delhi': { lat: 28.6139, lon: 77.2090 },
        'Bhopal': { lat: 23.1815, lon: 79.9864 },
        'Nagpur': { lat: 21.1458, lon: 79.0882 },
        'Mumbai': { lat: 19.0760, lon: 72.8777 },
        'Bangalore': { lat: 12.9716, lon: 77.5946 },
        'Chandigarh': { lat: 30.7595, lon: 76.7620 },
        'Pune': { lat: 18.5204, lon: 73.8567 }
      };

      for (const property of enrichedProperties) {
        try {
          const city = property.city || property.propertyInfo?.city || 'Kota';
          const coords = cityCoordinates[city];
          if (coords) {
            const colleges = await fetchNearbyColleges(coords.lat, coords.lon, city);
            if (colleges && colleges.length > 0) {
              property.nearbyColleges = colleges;
            }
          }
        } catch (err) {
          console.warn('Background OSM enrichment failed:', err);
        }
      }
    }, 500);

    return enrichedProperties;
  } catch (error) {
    console.error('Error enriching properties:', error);
    return properties;
  }
}
