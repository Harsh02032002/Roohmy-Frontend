import { Phone, Mail, Navigation, Shield, Zap, BadgePercent } from "lucide-react";

export default function StickyCTA({ property, onBookNow }) {
  if (!property) return null;

  const price = property.price || 0;
  const originalPrice = property.originalPrice || Math.round(price * 1.25);
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <>
      {/* ==================== MOBILE STICKY BOTTOM CTA ==================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between">
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
          <button
            onClick={onBookNow || (() => { if (property.ownerPhone) window.location.href = `tel:${property.ownerPhone}`; })}
            className="px-8 py-3 bg-[#EE4266] text-white font-bold rounded-lg text-sm hover:bg-[#d63a5b] active:scale-[0.97] transition-all"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ==================== DESKTOP STICKY SIDEBAR — OYO Style ==================== */}
      <div className="hidden md:block sticky top-24">
        {/* Main Price Card */}
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #e8e8e8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          
          {/* Top Offer Banner — OYO style red/orange */}
          {discount > 0 && (
            <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: '#d63a5b' }}>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-yellow-300" />
                <span className="text-white text-xs font-bold uppercase tracking-wide">
                  Save up to {discount}% — Direct Booking
                </span>
              </div>
            </div>
          )}

          {/* Price Section */}
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #e8e8e8' }}>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-extrabold text-[#222]">₹{price}</span>
              {discount > 0 && (
                <span className="text-base text-[#6d787d] line-through">₹{originalPrice}</span>
              )}
              {discount > 0 && (
                <span className="text-sm font-bold text-[#1ab64f]">{discount}% off</span>
              )}
            </div>
            <p className="text-xs text-[#6d787d] mt-0.5">per month</p>
          </div>

          {/* Pricing Breakdown */}
          <div className="px-5 py-4 space-y-2.5" style={{ borderBottom: '1px solid #e8e8e8' }}>
            <div className="flex justify-between text-sm">
              <span className="text-[#6d787d]">Base Rent</span>
              <span className="text-[#222] font-medium">₹{originalPrice}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#1ab64f] flex items-center gap-1">
                  <BadgePercent size={13} />
                  Direct Discount
                </span>
                <span className="text-[#1ab64f] font-medium">-₹{originalPrice - price}</span>
              </div>
            )}
            <div className="pt-2.5 mt-1 flex justify-between" style={{ borderTop: '1px dashed #e0e0e0' }}>
              <span className="text-[#222] font-bold text-sm">Total Amount</span>
              <span className="text-[#222] font-extrabold text-lg">₹{price}</span>
            </div>
          </div>

          {/* CTA Button — OYO green style but using brand color */}
          <div className="px-5 py-4 space-y-3">
            <button
              onClick={onBookNow || (() => { if (property.ownerPhone) window.location.href = `tel:${property.ownerPhone}`; })}
              className="w-full py-3.5 text-white font-bold rounded-lg text-sm transition-colors"
              style={{ background: '#EE4266' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#d63a5b'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#EE4266'; }}
            >
              Book Now
            </button>

            {/* Urgency text — OYO style */}
            <div className="flex items-center justify-center gap-1.5 py-1">
              <Zap size={13} className="text-[#EE4266]" />
              <span className="text-xs text-[#EE4266] font-semibold">
                {Math.floor(Math.random() * 10) + 5} people viewed this in last 24 hours
              </span>
            </div>
          </div>
        </div>

        {/* Owner Info Card — Clean OYO style */}
        <div className="rounded-lg mt-4 p-5" style={{ border: '1px solid #e8e8e8' }}>
          <h3 className="text-sm font-bold text-[#222] mb-3">Owner Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-[#6d787d] uppercase tracking-wider">Name</p>
              <p className="text-sm text-[#222] font-semibold">{property.owner}</p>
            </div>
            {property.ownerPhone && (
              <a
                href={`tel:${property.ownerPhone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm transition-colors"
                style={{ border: '1px solid #e0e0e0', color: '#222' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#EE4266'; e.currentTarget.style.color = '#EE4266'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#222'; }}
              >
                <Phone size={14} /> Call Owner
              </a>
            )}
            {property.ownerEmail && (
              <a
                href={`mailto:${property.ownerEmail}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm transition-colors"
                style={{ border: '1px solid #e0e0e0', color: '#222' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#EE4266'; e.currentTarget.style.color = '#EE4266'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#222'; }}
              >
                <Mail size={14} /> Send Email
              </a>
            )}
          </div>
        </div>

        {/* Map Card */}
        {property.latitude && property.longitude && (
          <div className="rounded-lg mt-4 overflow-hidden" style={{ border: '1px solid #e8e8e8' }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #e8e8e8' }}>
              <h3 className="text-sm font-bold text-[#222] flex items-center gap-2">
                <Navigation size={14} className="text-[#EE4266]" />
                Property Location
              </h3>
            </div>
            <div className="h-[200px]">
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
