const allPoints = [
  // Why Roomhy points (first 3)
  {
    title: "Zero Brokerage Always",
    description: "Tired of paying brokers just to see a room? With Roomhy, you connect directly with verified property owners. No middlemen, no extra charges.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Only Pay What You Bid",
    description: "No fixed pricing. No pressure. Set your own budget and place a live bid - the owner picks the best offer.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Verified Properties Only",
    description: "Every listing is verified by our team. No fake photos, no hidden charges. What you see is what you get.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  // Why Students Choose Us points (next 3)
  {
    title: "Fully Furnished",
    description: "Move in with just your suitcase. Our properties come with all the essential furniture and amenities.",
    image: "https://images.unsplash.com/photo-1502005229766-52835d3e76d0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "24/7 Support",
    description: "From booking to move-out, our dedicated support team is always here to help you with any queries.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Flexible Booking",
    description: "Book for any duration - short term or long term. Cancel anytime with refund.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
];

export default function WhyRoomhy() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Roomhy?
          </h2>
          <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
            Built by students, for students. Here's why thousands trust us.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {allPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 border border-gray-100"
            >
              <div className="relative mb-4">
                <img
                  src={point.image}
                  alt={point.title}
                  className="rounded-lg h-40 w-full object-cover"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">
                  {index + 1}
                </div>
              </div>

              <h3 className="font-bold text-lg text-gray-900 text-center">
                {point.title}
              </h3>

              <p className="text-gray-900 mt-2 text-sm leading-relaxed text-center">
                {point.description}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-12 text-center">
          <div className="bg-teal-500 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-white text-lg font-semibold">
              Join 50,000+ students who found their perfect home with Roomhy
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
