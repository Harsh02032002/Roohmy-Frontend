import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, ArrowLeft, Share2, Heart, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PropertyViewsGallery = ({ propertyViews = [], images = [] }) => {
  const [selectedView, setSelectedView] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showDetailedGallery, setShowDetailedGallery] = useState(false);

  // Helper to open detailed gallery at a specific category
  const openDetailedGallery = (viewIndex) => {
    setSelectedView(viewIndex);
    setSelectedImageIndex(0);
    setShowDetailedGallery(true);
  };

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

  const navigate = useNavigate();

  if (!currentImages || currentImages.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative overflow-hidden bg-gray-900 group">
        <div className="aspect-[4/3] md:aspect-video relative">
          <img
            src={currentImages[selectedImageIndex]}
            alt={`${viewLabels[selectedView]} - Image ${selectedImageIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openDetailedGallery(selectedView)}
          />

          {/* Top Navigation Bar (Floating) */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/50 to-transparent">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Navigation Arrows (Visible on Hover / md+) */}
          {currentImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handleImageChange('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleImageChange('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter & View Selector Floating at Bottom */}
          <div className="absolute bottom-4 left-0 right-0 px-4 z-20">
            <div className="flex items-end justify-between">
              {/* Category Thumbnails (Facade, Reception, etc.) */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {propertyViews.map((view, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); openDetailedGallery(index); }}
                    className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedView === index
                        ? 'border-white shadow-xl scale-105'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <img src={view.images?.[0] || images[0]} className="w-full h-full object-cover" alt={view.label} />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-1 left-0 right-0 text-[10px] md:text-xs text-white font-bold text-center drop-shadow-md">
                      {view.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Total Images Count */}
              <button 
                onClick={() => openDetailedGallery(selectedView)}
                className="mb-2 flex-shrink-0 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20 active:scale-95 transition-transform"
              >
                <ImageIcon className="w-3 h-3" />
                {selectedImageIndex + 1}/{currentImages.length}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip (Optional, hidden on mobile) */}
      {currentImages.length > 1 && (
        <div className="hidden md:flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
          {currentImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? 'border-[#EE4266] shadow-lg'
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

      {/* DETAILED GALLERY VIEW (Full Screen Vertical List) */}
      {showDetailedGallery && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          {/* Header with Close Button */}
          <div className="bg-white px-4 py-3 flex items-center gap-4 border-b border-gray-100 shadow-sm">
            <button onClick={() => setShowDetailedGallery(false)} className="text-gray-900 p-1">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-base font-bold text-gray-900">Property Photos</h2>
            <button onClick={() => setShowDetailedGallery(false)} className="ml-auto text-gray-400 p-1">
              <X size={20} />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="bg-white px-4 flex gap-6 overflow-x-auto no-scrollbar border-b border-gray-100">
            {propertyViews.map((view, index) => (
              <button
                key={index}
                onClick={() => handleViewChange(index)}
                className={`py-3 text-sm font-semibold whitespace-nowrap transition-all relative ${
                  selectedView === index ? 'text-[#EE4266]' : 'text-gray-500'
                }`}
              >
                {view.label}
                {selectedView === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE4266]" />
                )}
              </button>
            ))}
          </div>

          {/* Vertical Images Feed */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 pb-20 no-scrollbar">
            <div className="flex items-baseline gap-2 mb-4">
              <h3 className="text-xl font-bold text-gray-900">{viewLabels[selectedView]}</h3>
              <span className="text-sm text-gray-400 font-medium">({currentImages.length})</span>
            </div>
            
            <div className="space-y-4">
              {currentImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl overflow-hidden shadow-sm bg-white cursor-pointer active:scale-[0.98] transition-all"
                  onClick={() => openFullscreen(idx)}
                >
                  <img 
                    src={img} 
                    alt={`${viewLabels[selectedView]} ${idx + 1}`} 
                    className="w-full h-auto object-cover max-h-[500px]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal (Single Image Preview) */}
      {showFullscreen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-[210] bg-black/20 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-6xl w-full max-h-full flex items-center justify-center">
            <img
              src={currentImages[selectedImageIndex]}
              alt={`Fullscreen Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Fullscreen Navigation */}
            {currentImages.length > 1 && (
              <>
                <button
                  onClick={() => handleImageChange('prev')}
                  className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all backdrop-blur-sm z-[210]"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => handleImageChange('next')}
                  className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all backdrop-blur-sm z-[210]"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Fullscreen Counter & Label */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white text-center w-full">
              <p className="text-xl font-bold tracking-wide">{viewLabels[selectedView]}</p>
              <p className="text-sm text-white/50 mt-1">{selectedImageIndex + 1} / {currentImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyViewsGallery;
