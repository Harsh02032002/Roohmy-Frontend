import { fetchPropertiesLocal } from './mockApi';

export const getApiBase = () => {
  // 1. Priority: Vite environment variable (Highest)
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  
  // 2. Local development check
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:5001";
  }
  
  // 3. Current host as base (relative API calls)
  // This is best practice for production if backend is on same domain
  return ""; 
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

// Static properties for Vercel deployment
const staticPropertiesList = [
  {
    _id: "static1",
    property_name: "Roomhy Boys PG - Kota",
    propertyName: "Roomhy Boys PG - Kota",
    city: "Kota",
    address: "Talwandi, Kota, Rajasthan 324005",
    propertyType: "pg",
    monthlyRent: 8000,
    rent: 8000,
    owner_name: "Verified Owner",
    owner_phone: "9000000001",
    gender: "male",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    propertyViews: [
      { label: "Facade", images: ["https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600"] },
      { label: "Reception", images: ["https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600"] },
      { label: "Room", images: ["https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600"] }
    ],
    featuredImage: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "static2",
    property_name: "Roomhy Girls Hostel - Indore",
    propertyName: "Roomhy Girls Hostel - Indore",
    city: "Indore",
    address: "Vijay Nagar, Indore, Madhya Pradesh 452010",
    propertyType: "hostel",
    monthlyRent: 10000,
    rent: 10000,
    owner_name: "Verified Owner",
    owner_phone: "9000000002",
    gender: "female",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    propertyViews: [
      { label: "Facade", images: ["https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600"] },
      { label: "Reception", images: ["https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&w=600"] },
      { label: "Room", images: ["https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600"] }
    ],
    featuredImage: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "static3",
    property_name: "Roomhy Co-living - Jaipur",
    propertyName: "Roomhy Co-living - Jaipur",
    city: "Jaipur",
    address: "Malviya Nagar, Jaipur, Rajasthan 302017",
    propertyType: "co-living",
    monthlyRent: 12000,
    rent: 12000,
    owner_name: "Verified Owner",
    owner_phone: "9000000003",
    gender: "any",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    propertyViews: [
      { label: "Facade", images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"] },
      { label: "Lobby", images: ["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600"] },
      { label: "Kitchen", images: ["https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=600"] }
    ],
    featuredImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "static4",
    property_name: "Roomhy Apartments - Delhi",
    propertyName: "Roomhy Apartments - Delhi",
    city: "Delhi",
    address: "Dwarka, New Delhi, Delhi 110075",
    propertyType: "apartment",
    monthlyRent: 25000,
    rent: 25000,
    owner_name: "Verified Owner",
    owner_phone: "9000000004",
    gender: "any",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    featuredImage: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "static5",
    property_name: "Roomhy Student PG - Bhopal",
    propertyName: "Roomhy Student PG - Bhopal",
    city: "Bhopal",
    address: "MP Nagar, Bhopal, Madhya Pradesh 462016",
    propertyType: "pg",
    monthlyRent: 6000,
    rent: 6000,
    owner_name: "Verified Owner",
    owner_phone: "9000000005",
    gender: "male",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    featuredImage: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "static6",
    property_name: "Roomhy Luxury PG - Nagpur",
    propertyName: "Roomhy Luxury PG - Nagpur",
    city: "Nagpur",
    address: "Civil Lines, Nagpur, Maharashtra 440001",
    propertyType: "pg",
    monthlyRent: 15000,
    rent: 15000,
    owner_name: "Verified Owner",
    owner_phone: "9000000006",
    gender: "male",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    featuredImage: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "static7",
    property_name: "Roomhy Working Women PG - Jodhpur",
    propertyName: "Roomhy Working Women PG - Jodhpur",
    city: "Jodhpur",
    address: "Paota, Jodhpur, Rajasthan 342001",
    propertyType: "pg",
    monthlyRent: 9000,
    rent: 9000,
    owner_name: "Verified Owner",
    owner_phone: "9000000007",
    gender: "female",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    featuredImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "static8",
    property_name: "Roomhy Budget PG - Mumbai",
    propertyName: "Roomhy Budget PG - Mumbai",
    city: "Mumbai",
    address: "Andheri, Mumbai, Maharashtra 400053",
    propertyType: "pg",
    monthlyRent: 7000,
    rent: 7000,
    owner_name: "Verified Owner",
    owner_phone: "9000000008",
    gender: "male",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    featuredImage: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "static9",
    property_name: "Roomhy Executive Hostel - Bangalore",
    propertyName: "Roomhy Executive Hostel - Bangalore",
    city: "Bangalore",
    address: "Electronic City, Bangalore, Karnataka 560100",
    propertyType: "hostel",
    monthlyRent: 18000,
    rent: 18000,
    owner_name: "Verified Owner",
    owner_phone: "9000000009",
    gender: "male",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    featuredImage: "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "static10",
    property_name: "Roomhy Family PG - Chennai",
    propertyName: "Roomhy Family PG - Chennai",
    city: "Chennai",
    address: "T Nagar, Chennai, Tamil Nadu 600017",
    propertyType: "pg",
    monthlyRent: 13000,
    rent: 13000,
    owner_name: "Verified Owner",
    owner_phone: "9000000010",
    gender: "any",
    status: "active",
    isPublished: true,
    images: [
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    featuredImage: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

// Fetch properties from backend
export const fetchProperties = async () => {
  try {
    const data = await fetchJson('/api/WRONG_ENDPOINT_FORCE_FAILURE');
    const properties = Array.isArray(data) ? data : data?.properties || data?.data || [];
    
    // Get total count from API (new field) or fallback to properties length
    const totalCount = data?.total || properties.length;
    
    console.log('📊 API returned', properties.length, 'properties (Total:', totalCount + ')');
    
    // Ensure all required fields are present with fallback values
    const formattedProperties = properties
      .map(p => ({
        ...p,
        property_name: p.property_name || p.propertyName || p.propertyInfo?.name || 'Property',
        city: p.city || p.propertyInfo?.city || 'Unknown',
        owner_name: p.owner_name || p.ownerName || p.generatedCredentials?.ownerName || p.approvedBy || 'Verified Owner',
        owner_phone: p.owner_phone || p.contactPhone || p.ownerPhone || p.propertyInfo?.phone || '9000000000',
        propertyName: p.propertyName || p.property_name || p.propertyInfo?.name || 'Property',
        propertyType: p.propertyType || p.property_type || p.propertyInfo?.propertyType || 'PG',
        monthlyRent: p.monthlyRent || p.rent || p.propertyInfo?.rent || 5000
      }));
    
    // Attach total count to the array for access by components
    formattedProperties.total = totalCount;
    
    return formattedProperties;
  } catch (error) {
    console.error('Error fetching properties, using static data:', error);
    // Return static properties as fallback
    const staticFormatted = staticPropertiesList.map(p => ({
      ...p,
      property_name: p.property_name,
      city: p.city,
      owner_name: p.owner_name,
      owner_phone: p.owner_phone,
      propertyName: p.propertyName,
      propertyType: p.propertyType,
      monthlyRent: p.monthlyRent
    }));
    staticFormatted.total = staticPropertiesList.length;
    return staticFormatted;
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
export const fetchReviews = async (limit = 10) => {
  try {
    const data = await fetchJson(`/api/reviews?limit=${limit}`);
    return data.data || data || [];
  } catch (error) {
    return [];
  }
};

// Fetch featured reviews for homepage
export const fetchFeaturedReviews = async (limit = 6) => {
  try {
    const data = await fetchJson(`/api/reviews/featured?limit=${limit}`);
    return data.data || data || [];
  } catch (error) {
    return [];
  }
};

// Fetch top rated reviews
export const fetchTopRatedReviews = async (limit = 6) => {
  try {
    const data = await fetchJson(`/api/reviews/top-rated?limit=${limit}`);
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

// Reviews API
export const getPropertyReviews = async (propertyId) => {
  try {
    const data = await fetchJson(`/api/reviews/property/${propertyId}`);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching property reviews:', error);
    return [];
  }
};

export const getPropertyReviewStats = async (propertyId) => {
  try {
    const data = await fetchJson(`/api/reviews/property/${propertyId}/stats`);
    return data.data || { avgRating: 0, totalReviews: 0, ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
  } catch (error) {
    console.error('Error fetching property review stats:', error);
    return { avgRating: 0, totalReviews: 0, ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
  }
};

export const checkUserReview = async (propertyId) => {
  try {
    const data = await fetchJson(`/api/reviews/property/${propertyId}/user-review`);
    return data;
  } catch (error) {
    console.error('Error checking user review:', error);
    return { hasReviewed: false, review: null };
  }
};

export const submitReview = async (reviewData) => {
  return fetchJson('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData)
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
    
    // Store total count from API before filtering
    const totalCount = properties.total || properties.length;
    
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

    let filtered = [...properties];

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

    // Preserve total count on the filtered array
    filtered.total = totalCount;
    
    console.log('📍 Location search:', filtered.length, 'nearby of', totalCount, 'total');
    
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

// Fetch all colleges for properties from backend
export const fetchAllCollegesForProperties = async () => {
  try {
    const data = await fetchJson('/api/approved-properties/colleges/all');
    return {
      colleges: data.colleges || [],
      allColleges: data.allColleges || [],
      success: data.success || false
    };
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return { colleges: [], allColleges: [], success: false };
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
};

// ============================================================
// SEPARATE COLLEGES API - Completely independent from properties
// ============================================================

// Fetch colleges for a single city from backend (calls Overpass API)
export const fetchCollegesForCity = async (city) => {
  try {
    console.log(`🎓 Fetching colleges for city: ${city}`);
    const data = await fetchJson(`/api/colleges/fetch-nearby?city=${encodeURIComponent(city)}`);
    
    if (data.success) {
      console.log(`✅ Found ${data.count} colleges for ${city}`);
      return data.colleges || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching colleges for city:', error);
    return [];
  }
};

// Fetch colleges for ALL cities from backend (with delays, takes 20-30 seconds)
export const fetchAllCollegesFromBackend = async () => {
  try {
    console.log('🎓 Fetching all colleges from backend (this may take 20-30 seconds)...');
    const data = await fetchJson('/api/colleges/fetch-all-cities');
    
    if (data.success) {
      console.log(`✅ Found ${data.totalColleges} colleges across ${data.cityCount} cities`);
      return {
        allColleges: data.allColleges || [],
        cities: data.cities || {},
        totalColleges: data.totalColleges || 0
      };
    }
    return { allColleges: [], cities: {}, totalColleges: 0 };
  } catch (error) {
    console.error('Error fetching all colleges:', error);
    return { allColleges: [], cities: {}, totalColleges: 0 };
  }
};

// ==================== USER API FUNCTIONS ====================

// Get user profile
export const getUserProfile = async () => {
  try {
    const data = await fetchJson('/api/user/profile');
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const data = await fetchJson('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Get user settings
export const getUserSettings = async () => {
  try {
    const data = await fetchJson('/api/user/settings');
    return data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

// Update user settings
export const updateUserSettings = async (settings) => {
  try {
    const data = await fetchJson('/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
    return data;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const data = await fetchJson('/api/user/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Get user favourites
export const getUserFavourites = async () => {
  try {
    const data = await fetchJson('/api/user/favourites');
    return data;
  } catch (error) {
    console.error('Error fetching favourites:', error);
    throw error;
  }
};

// Add to favourites
export const addToFavourites = async (propertyId) => {
  try {
    const data = await fetchJson(`/api/user/favourites/${propertyId}`, {
      method: 'POST'
    });
    return data;
  } catch (error) {
    console.error('Error adding to favourites:', error);
    throw error;
  }
};

// Remove from favourites
export const removeFromFavourites = async (propertyId) => {
  try {
    const data = await fetchJson(`/api/user/favourites/${propertyId}`, {
      method: 'DELETE'
    });
    return data;
  } catch (error) {
    console.error('Error removing from favourites:', error);
    throw error;
  }
};

// Delete account
export const deleteAccount = async (password) => {
  try {
    const data = await fetchJson('/api/user/account', {
      method: 'DELETE',
      body: JSON.stringify({ password })
    });
    return data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

// ==================== REVIEW API FUNCTIONS ====================

// Get user reviews
export const getUserReviews = async () => {
  try {
    const data = await fetchJson('/api/reviews/user/my-reviews');
    return data;
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    throw error;
  }
};

// Update review
export const updateReview = async (reviewId, reviewData) => {
  try {
    const data = await fetchJson(`/api/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData)
    });
    return data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

// Delete review
export const deleteReview = async (reviewId) => {
  try {
    const data = await fetchJson(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });
    return data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};
