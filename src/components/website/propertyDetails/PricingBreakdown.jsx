import { useState } from "react";
import { ChevronDown, ChevronUp, Tag, Percent } from "lucide-react";

export default function PricingBreakdown({ property }) {
  const [expanded, setExpanded] = useState(false);

  const price = parseInt(property?.price) || 0;
  const originalPrice = property?.originalPrice || Math.round(price * 1.25);
  const discount = originalPrice > price ? originalPrice - price : 0;
  const discountPercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0;

  // Mock pricing details — will use backend data when available
  const pricingItems = [
    { label: "Base Rent", amount: originalPrice, type: "normal" },
    ...(discount > 0 ? [{ label: `Direct Booking Discount (${discountPercent}%)`, amount: -discount, type: "discount" }] : []),
    ...(property?.pricingDetails?.offers || []).map(offer => ({
      label: offer.label || offer.name || "Special Offer",
      amount: -(offer.amount || 0),
      type: "discount"
    })),
  ];

  const totalAmount = pricingItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="px-4 md:px-0 py-3 md:py-5 border-b border-gray-100 md:hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Tag size={16} className="text-amber-600" />
          </div>
          <div className="text-left">
            <h2 className="text-base font-bold text-gray-900">Pricing Details</h2>
            <p className="text-xs text-gray-500">View breakdown</p>
          </div>
        </div>
        {expanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>

      {expanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded-2xl space-y-3 animate-in slide-in-from-top duration-200">
          {pricingItems.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className={item.type === "discount" ? "text-green-600 flex items-center gap-1" : "text-gray-600"}>
                {item.type === "discount" && <Percent size={12} />}
                {item.label}
              </span>
              <span className={`font-medium ${item.type === "discount" ? "text-green-600" : "text-gray-800"}`}>
                {item.amount < 0 ? "-" : ""}₹{Math.abs(item.amount)}
              </span>
            </div>
          ))}

          <div className="pt-3 border-t border-dashed border-gray-300 flex justify-between">
            <span className="font-bold text-gray-900">Total Amount</span>
            <span className="font-extrabold text-gray-900 text-lg">₹{Math.max(totalAmount, price)}</span>
          </div>

          {discount > 0 && (
            <div className="mt-2 p-2.5 bg-green-50 rounded-xl border border-green-100">
              <p className="text-xs text-green-700 font-semibold text-center">
                🎉 You save ₹{discount} ({discountPercent}% off) by booking directly!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
