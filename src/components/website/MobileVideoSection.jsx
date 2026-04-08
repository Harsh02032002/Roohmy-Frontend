import { Play, X } from 'lucide-react';
import { useState } from 'react';

export default function MobileVideoSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="md:hidden bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            See How Roomhy Works
          </h2>
          <p className="text-gray-400 text-sm">
            Your perfect stay is just a few taps away
          </p>
        </div>

        {/* Video Thumbnail / Player */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {!showVideo ? (
            <>
              {/* Thumbnail Image */}
              <div className="aspect-video bg-gradient-to-br from-[#1ab64f]/20 to-blue-900/20 relative">
                <img
                  src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Roomhy Video Thumbnail"
                  className="w-full h-full object-cover opacity-60"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setShowVideo(true)}
                    className="w-16 h-16 bg-[#1ab64f] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                  >
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </button>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  0:45
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <p className="text-gray-400 text-sm">Video Player</p>
                {/* Close Button */}
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex justify-around mt-6">
          <div className="text-center">
            <p className="text-xl font-bold text-[#1ab64f]">50K+</p>
            <p className="text-xs text-gray-400">Happy Students</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#1ab64f]">10K+</p>
            <p className="text-xs text-gray-400">Properties</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#1ab64f]">25+</p>
            <p className="text-xs text-gray-400">Cities</p>
          </div>
        </div>
      </div>
    </section>
  );
}
