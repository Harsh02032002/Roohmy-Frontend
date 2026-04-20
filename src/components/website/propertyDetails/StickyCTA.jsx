import { Phone, Mail, Navigation } from "lucide-react";

export default function StickyCTA({ property, onBookNow }) {
  if (!property) return null;

  const price = property.price || 0;
  // Simulate original price (for discount display). If backend provides originalPrice, use it.
  const originalPrice = property.originalPrice || Math.round(price * 1.25);
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <>
      {/* ==================== MOBILE STICKY BOTTOM CTA ==================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between">
          {/* Price Section */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-gray-900">₹{price}</span>
              {discount > 0 && (
                <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {discount > 0 && (
                <span className="text-xs font-semibold text-green-600">{discount}% off</span>
              )}
              <span className="text-[10px] text-gray-400">per month</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onBookNow || (() => {
              if (property.ownerPhone) {
                window.location.href = `tel:${property.ownerPhone}`;
              }
            })}
            className="px-8 py-3 bg-[#EE4266] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#EE4266]/25 hover:bg-[#d63a5b] active:scale-[0.97] transition-all"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ==================== DESKTOP STICKY SIDEBAR CARD ==================== */}
      <div className="hidden md:block sticky top-24">
        {/* Price Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#EE4266] to-[#d63a5b] px-5 py-4 text-white">
            <p className="text-white/80 text-xs font-medium">Monthly Rent</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold">₹{price}</span>
              {discount > 0 && (
                <span className="text-base text-white/60 line-through">₹{originalPrice}</span>
              )}
            </div>
            {discount > 0 && (
              <span className="inline-block mt-1.5 px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                {discount}% off
              </span>
            )}
            <p className="text-white/60 text-xs mt-1">per month</p>
          </div>

          {/* Pricing Breakdown */}
          <div className="px-5 py-4 space-y-2.5 border-b border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Base Rent</span>
              <span className="text-gray-800 font-medium">₹{originalPrice}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Direct Discount</span>
                <span className="text-green-600 font-medium">-₹{originalPrice - price}</span>
              </div>
            )}
            <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between text-sm">
              <span className="text-gray-900 font-bold">Total Amount</span>
              <span className="text-gray-900 font-extrabold text-lg">₹{price}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="px-5 py-4 space-y-3">
            <button
              onClick={onBookNow || (() => {
                if (property.ownerPhone) {
                  window.location.href = `tel:${property.ownerPhone}`;
                }
              })}
              className="w-full py-3.5 bg-[#EE4266] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#EE4266]/25 hover:bg-[#d63a5b] active:scale-[0.98] transition-all"
            >
              Book Now
            </button>

            {property.ownerPhone && (
              <a
                href={`tel:${property.ownerPhone}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-[#EE4266] hover:text-[#EE4266] transition-all text-sm"
              >
                <Phone size={16} /> Call Owner
              </a>
            )}
            {property.ownerEmail && (
              <a
                href={`mailto:${property.ownerEmail}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-[#EE4266] hover:text-[#EE4266] transition-all text-sm"
              >
                <Mail size={16} /> Send Email
              </a>
            )}
          </div>
        </div>

        {/* Owner Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Owner Information</h3>
          <div className="space-y-2">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Name</p>
              <p className="text-sm text-gray-900 font-semibold">{property.owner}</p>
            </div>
            {property.ownerPhone && (
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Phone</p>
                <a href={`tel:${property.ownerPhone}`} className="text-sm text-[#EE4266] font-semibold hover:underline flex items-center gap-1">
                  <Phone size={12} /> {property.ownerPhone}
                </a>
              </div>
            )}
            {property.ownerEmail && (
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Email</p>
                <a href={`mailto:${property.ownerEmail}`} className="text-sm text-[#EE4266] font-semibold hover:underline flex items-center gap-1">
                  <Mail size={12} /> {property.ownerEmail}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Map Card */}
        {property.latitude && property.longitude && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Navigation size={14} className="text-[#EE4266]" />
                Property Location
              </h3>
            </div>
            <div className="h-[250px]">
              <iframe
                src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=14&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Location"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
