import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const PropertyViewsGallery = ({ propertyViews = [], images = [] }) => {
  const [selectedView, setSelectedView] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Debug logs
  console.log('PropertyViewsGallery - propertyViews:', propertyViews);
  console.log('PropertyViewsGallery - images:', images);

  // Use propertyViews if available, otherwise fallback to images array
  const currentView = propertyViews[selectedView];
  const currentImages = currentView?.images || images;
  const viewLabels = propertyViews.map(view => view.label) || ['Gallery'];

  console.log('PropertyViewsGallery - currentView:', currentView);
  console.log('PropertyViewsGallery - currentImages:', currentImages);

  const handleViewChange = (viewIndex) => {
    setSelectedView(viewIndex);
    setSelectedImageIndex(0);
  };

  const handleImageChange = (direction) => {
    if (direction === 'next') {
      setSelectedImageIndex((prev) => (prev + 1) % currentImages.length);
    } else {
      setSelectedImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    }
  };

  const openFullscreen = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setShowFullscreen(true);
  };

  if (!currentImages || currentImages.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* View Tabs - Like OYO */}
      {propertyViews.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {propertyViews.map((view, index) => (
            <button
              key={index}
              onClick={() => handleViewChange(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedView === index
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Image Display */}
      <div className="relative rounded-lg overflow-hidden bg-gray-100">
        <div className="aspect-video relative">
          <img
            src={currentImages[selectedImageIndex]}
            alt={`${viewLabels[selectedView]} - Image ${selectedImageIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openFullscreen(selectedImageIndex)}
          />
          
          {/* Navigation Arrows */}
          {currentImages.length > 1 && (
            <>
              <button
                onClick={() => handleImageChange('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleImageChange('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {currentImages.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {currentImages.length}
            </div>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={() => openFullscreen(selectedImageIndex)}
            className="absolute top-4 left-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* View Description */}
        {currentView?.description && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white text-sm">{currentView.description}</p>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {currentImages.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {currentImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? 'border-teal-600 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-6xl max-h-full">
            <img
              src={currentImages[selectedImageIndex]}
              alt={`Fullscreen Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Fullscreen Navigation */}
            {currentImages.length > 1 && (
              <>
                <button
                  onClick={() => handleImageChange('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleImageChange('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Fullscreen Counter */}
            {currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {currentImages.length} - {viewLabels[selectedView]}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyViewsGallery;
