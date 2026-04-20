import { useState } from "react";
import { Star, ThumbsUp, Shield, ChevronDown } from "lucide-react";

export default function ReviewsSection({
  reviews = [],
  reviewStats = { avgRating: 0, totalReviews: 0, ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } },
  hasReviewed = false,
  userReview = null,
  showReviewForm,
  setShowReviewForm,
  newRating,
  setNewRating,
  newReviewText,
  setNewReviewText,
  submittingReview,
  handleSubmitReview,
}) {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return "EXCELLENT";
    if (rating >= 4.0) return "VERY GOOD";
    if (rating >= 3.5) return "GOOD";
    if (rating >= 3.0) return "AVERAGE";
    return "FAIR";
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-[#1ab64f]";
    if (rating >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="px-4 md:px-0 py-5 border-b border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Ratings and Reviews</h2>

      {/* Rating Summary */}
      {reviewStats.totalReviews > 0 && (
        <div className="flex items-start gap-6 mb-6">
          {/* Big Rating Number */}
          <div className="text-center flex-shrink-0">
            <div className="text-5xl font-extrabold text-gray-900">
              {reviewStats.avgRating > 0 ? reviewStats.avgRating.toFixed(1) : "—"}
            </div>
            <div className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold text-white ${getRatingColor(reviewStats.avgRating)}`}>
              {getRatingLabel(reviewStats.avgRating)}
            </div>
            <p className="text-gray-400 text-xs mt-1">{reviewStats.totalReviews} ratings</p>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviewStats.ratingBreakdown[star] || 0;
              const percentage = reviewStats.totalReviews > 0 ? (count / reviewStats.totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-600 w-5 text-right">{star}</span>
                  <Star size={10} className="text-gray-400 fill-gray-400" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        star >= 4 ? "bg-[#EE4266]" : star >= 3 ? "bg-yellow-400" : "bg-red-400"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{Math.round(percentage)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Write Review Button */}
      {!hasReviewed && !showReviewForm && (
        <button
          onClick={() => setShowReviewForm(true)}
          className="w-full mb-5 py-3 bg-white border-2 border-[#EE4266] text-[#EE4266] rounded-xl font-semibold hover:bg-[#EE4266] hover:text-white transition-all duration-200 text-sm"
        >
          Write a Review
        </button>
      )}

      {/* Review Form */}
      {showReviewForm && !hasReviewed && (
        <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Write Your Review</h3>
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 mb-2 block">Your Rating</label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    star <= newRating
                      ? "bg-amber-500 text-white scale-105"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  <Star size={18} fill={star <= newRating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 mb-2 block">Your Experience</label>
            <textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="Share your experience with this property..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EE4266]/30 focus:border-[#EE4266] min-h-[100px] text-sm resize-none transition-all"
              maxLength={500}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{newReviewText.length}/500</p>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submittingReview || !newReviewText.trim()}
              className="flex-1 py-2.5 bg-[#EE4266] text-white rounded-xl font-semibold hover:bg-[#d63a5b] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* User's Existing Review */}
      {hasReviewed && userReview && (
        <div className="mb-5 p-4 bg-green-50 border border-green-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={14} className="text-green-600" />
            <span className="text-xs font-semibold text-green-700">Your Review</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-medium">Submitted</span>
          </div>
          <div className="flex items-center gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < userReview.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} />
            ))}
          </div>
          <p className="text-gray-700 text-sm">{userReview.review}</p>
        </div>
      )}

      {/* Top Reviews */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-center py-8 text-sm">No reviews yet. Be the first to review!</p>
        ) : (
          <>
            {displayedReviews.map((review, idx) => (
              <div key={idx} className="pb-4 border-b border-gray-50 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                      {review.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{review.name || "Anonymous"}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-200"} />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-full font-medium flex items-center gap-1">
                    <Shield size={10} /> Verified Stay
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed ml-[46px]">{review.review}</p>
              </div>
            ))}

            {/* See all reviews */}
            {reviews.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full flex items-center justify-center gap-1 py-3 text-[#EE4266] font-semibold text-sm hover:bg-red-50 rounded-xl transition-colors"
              >
                {showAll ? "Show less" : `See all ${reviews.length} reviews`}
                <ChevronDown size={16} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
