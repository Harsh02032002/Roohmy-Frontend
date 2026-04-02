import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";

export default function WebsiteCancellation() {

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[200px] bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Cancellation & Fair Use Policy</h1>
            <p className="text-lg text-gray-600">Effective Date: 1st Aug 2025</p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
            <h1>Cancellation & Fair Use Policy</h1>
            <p><strong>Effective Date: 1st Aug 2025</strong></p>
            <p>At Roomhy, we aim to make the rental process transparent and hassle-free for both students and property owners. This policy outlines our guidelines for cancellations and fair usage of the platform.</p>

            <h2>Definitions</h2>
            <ul>
              <li><strong>"Roomhy", "We", "Us", or "Our"</strong> refers to Roomhy Technologies and its associated services.</li>
              <li><strong>"User", "You", or "Your"</strong> refers to any individual or entity using the platform, including students, tenants, and property owners.</li>
              <li><strong>"Platform"</strong> refers to Roomhy's website, mobile application, and related services.</li>
            </ul>

            <h2>Cancellation Policy</h2>
            <p><strong>a) By Students</strong></p>
            <ul>
              <li>You may cancel a booking request at any time before the property owner confirms your bid – no penalty applies.</li>
              <li>If you cancel after confirmation, please notify the owner promptly via the platform. Any advance rent or deposit refund will be handled directly between you and the owner, as per their terms.</li>
            </ul>
            <p><strong>b) By Property Owners</strong></p>
            <ul>
              <li>You may cancel a listing or decline bids at any time before accepting an offer.</li>
              <li>Once an offer is accepted, cancelling without a valid reason may affect your account's standing and visibility on the platform.</li>
            </ul>
            <p><strong>c) Exceptional Circumstances</strong></p>
            <p>Roomhy may cancel or reverse a booking if:</p>
            <ul>
              <li>Fraudulent or misleading activity is detected.</li>
              <li>The property or listing violates our Terms & Conditions.</li>
            </ul>

            <h2>Fair Use Policy</h2>
            <p>To keep Roomhy safe, fair, and reliable for all users, the following is not allowed:</p>
            <ul>
              <li>Posting false, misleading, or duplicate property listings.</li>
              <li>Submitting fake bids or bids with no intent to rent.</li>
              <li>Sharing inaccurate availability or property details.</li>
              <li>Harassing, abusing, or spamming other users.</li>
              <li>Circumventing the platform to avoid using its features or processes.</li>
            </ul>
            <p>Violations may result in:</p>
            <ul>
              <li>Temporary suspension of your account.</li>
              <li>Permanent removal from the platform.</li>
              <li>Reporting to authorities in cases of fraud or unlawful activity.</li>
            </ul>

            <h2>Contact Us</h2>
            <p>If you need assistance with a cancellation or have concerns about fair use, contact:</p>
            <p>
              📧 <a href="mailto:hello@roomhy.com">hello@roomhy.com</a><br />
              📱 +91-9983005030
            </p>
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}
