import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";

export default function WebsitePrivacy() {

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[200px] bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Effective Date: 1st Aug 2025. We take your privacy seriously.</p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date: 1st Aug 2025</strong></p>
            <p>Roomhy is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our platform.</p>

            <h2>Information We Collect</h2>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, date of birth, profile picture, and identity verification details.</li>
              <li><strong>Property Information:</strong> Contact details, property location, rental prices, photos, and ownership documents (for property owners).</li>
              <li><strong>Usage Information:</strong> IP address, device type, browser type, pages visited, and browsing patterns.</li>
              <li><strong>Payment Information:</strong> Payment method, transaction history, and billing addresses (processed through secure payment gateways).</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To facilitate property listings and bookings</li>
              <li>To process payments and refunds</li>
              <li>To verify identity and prevent fraud</li>
              <li>To send notifications, updates, and promotional content</li>
              <li>To improve our platform and services</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2>Data Security</h2>
            <p>We implement industry-standard security measures including encryption, firewalls, and secure servers to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>

            <h2>Your Rights</h2>
            <ul>
              <li>Right to access your personal information</li>
              <li>Right to request data deletion (subject to legal obligations)</li>
              <li>Right to opt-out of marketing communications</li>
              <li>Right to data portability</li>
            </ul>

            <h2>Third-Party Sharing</h2>
            <p>We do not sell your personal information. We may share data with service providers (payment processors, hosting providers) who are contractually obligated to maintain confidentiality.</p>

            <h2>Cookies & Tracking</h2>
            <p>Our platform uses cookies to enhance user experience. You can disable cookies through your browser settings, though some features may not work properly.</p>

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
