import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "What is Roomhy and how does it work?",
    answer: "Roomhy is a student accommodation platform that connects students directly with verified property owners. You search, shortlist, and book properties like PG, hostels, and apartments without paying any brokerage fees. Our bidding feature also allows you to secure the best possible rental price."
  },
  {
    question: "Is Roomhy completely broker-free?",
    answer: "Yes, absolutely. Our core promise is zero brokerage. We eliminate the middleman, ensuring you only pay the rent and a small, refundable security deposit directly to the property owner. This saves students thousands in commission fees."
  },
  {
    question: "How do I place a bid on a property?",
    answer: "When viewing a property, you can see the owner's expected price. You can then submit a 'bid' or offer that you are willing to pay. The owner can accept, reject, or counter your offer. This live bidding process helps you secure a better deal than fixed-price listings."
  },
  {
    question: "What types of properties are listed on Roomhy?",
    answer: "We offer a wide range of properties tailored for students, including: fully furnished Hostels (shared rooms, budget-friendly), PGs (Paying Guest accommodation with meals and services), and Apartments (private flats for independent living or sharing with friends)."
  },
  {
    question: "Can I view room availability in real-time?",
    answer: "Yes, property owners are encouraged to keep their listings updated in real-time. You can filter properties based on immediate availability and expected move-in dates to ensure you only view options that suit your schedule."
  },
  {
    question: "Do I have to pay to use Roomhy as a student?",
    answer: "Searching, browsing, and contacting property owners through Roomhy is entirely free for students. Our revenue comes from value-added services offered to property owners, keeping the platform free and zero-brokerage for tenants."
  },
  {
    question: "How is Roomhy different from regular rental websites?",
    answer: "We are focused purely on student needs, ensuring all properties are near major educational hubs. We offer a unique bidding system, guarantee zero brokerage, and verify every listing to save you time and money compared to traditional, generalized rental sites."
  },
  {
    question: "Is it safe to book a property on Roomhy?",
    answer: "We prioritize your safety. Every property owner and listing is thoroughly verified by our team. The booking process is secure, and you only finalize the full payment after confirming the property details with the owner."
  },
  {
    question: "What is the booking process?",
    answer: "1. Search and find your ideal property\n2. Place your bid or contact owner\n3. Owner accepts your offer\n4. Chat and finalize details\n5. Pay ₹500 token to book\n6. Visit and verify property\n7. Move in!"
  },
  {
    question: "Can I get a refund if I don't like the property?",
    answer: "Yes! The ₹500 token amount is fully refundable if the property doesn't meet your expectations after visiting. We want you to be completely satisfied with your choice."
  },
  {
    question: "How do I contact property owners?",
    answer: "Once you find a property you like, you can use our in-app chat system to communicate directly with the owner. Ask about rent, amenities, rules, move-in date, and any other questions before making your decision."
  },
  {
    question: "Are the properties verified?",
    answer: "Yes, every property on Roomhy goes through a verification process. Our team checks the property details, photos, and owner credentials to ensure you get exactly what you see on the platform."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200 flex-shrink-0">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">Everything you need to know about finding your perfect home with Roomhy</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <span className="font-semibold text-lg text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown className="w-6 h-6 text-teal-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-3">
                  Still have questions?
                </h3>
                <p className="text-lg mb-6">
                  Our support team is here to help you 24/7
                </p>
                <a 
                  href="/website/contact" 
                  className="inline-block bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}
