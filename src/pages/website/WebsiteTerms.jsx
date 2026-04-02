import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";

export default function WebsiteTerms() {

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[200px] bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
            <p className="text-lg text-gray-600">Effective Date: 1st Aug 2025</p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
            <h1>Terms & Conditions</h1>
            <p><strong>Effective Date: 1st Aug 2025</strong></p>
            <p>Welcome to Roomhy. By using our platform (website or mobile app), you agree to comply with and be bound by these Terms & Conditions. Please read them carefully.</p>

            <h2>Definitions</h2>
            <ul>
              <li><strong>"Roomhy", "We", "Us", or "Our"</strong> refers to Roomhy Technologies and its associated services.</li>
              <li><strong>"User", "You", or "Your"</strong> refers to any individual or entity using the platform, including students, tenants, and property owners.</li>
              <li><strong>"Platform"</strong> refers to Roomhy's website, mobile application, and related services.</li>
            </ul>

            <h2>Scope of Services</h2>
            <p>Roomhy provides an online platform that connects students seeking accommodation with property owners through a transparent, broker-free, and real-time bidding process. We do not own, manage, or operate the properties listed on our platform.</p>

            <h2>User Eligibility</h2>
            <ul>
              <li>You must be at least 18 years old or have parental/guardian consent to use our platform.</li>
              <li>You agree to provide accurate, complete, and current information during registration and property listing.</li>
            </ul>

            <h2>Property Listings</h2>
            <ul>
              <li>Property owners must ensure all listings are truthful, with accurate descriptions, real photographs, and correct pricing.</li>
              <li>Roomhy reserves the right to verify, edit, reject, or remove any listing that violates our guidelines or is reported as fraudulent.</li>
            </ul>

            <h2>Contact Us</h2>
            <p>📧 <a href="mailto:hello@roomhy.com">hello@roomhy.com</a><br />📱 +91-9983005030</p>
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}
