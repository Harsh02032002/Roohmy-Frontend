import { X, Filter } from 'lucide-react';
import { useState } from 'react';

export default function MobileFiltersOverlay({ 
  isOpen, 
  onClose, 
  onFilter,
  cities = [],
  areas = [],
  propertyTypes = ['PG', 'Hostel', 'Apartment', 'Co-living']
}) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApplyFilters = () => {
    onFilter({
      city: selectedCity,
      area: selectedArea,
      type: selectedType,
      minPrice,
      maxPrice
    });
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedCity('');
    setSelectedArea('');
    setSelectedType('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Filters sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 md:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-6 h-6 text-teal-500" />
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Filters */}
          <div className="space-y-6">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">City</label>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Area Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Area</label>
              <select 
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                disabled={!selectedCity}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
              >
                <option value="">All Areas</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Property Type</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Price Range</label>
              <div className="flex gap-2">
                <input 
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input 
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button 
              onClick={handleClearFilters}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button 
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
