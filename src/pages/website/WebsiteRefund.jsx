import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";

export default function WebsiteRefund() {

  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[200px] bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
            <p className="text-lg text-gray-600">Effective Date: 1st Aug 2025. Understanding your refund rights.</p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
            <h1>Refund Policy</h1>
            <p><strong>Effective Date: 1st Aug 2025</strong></p>
            <p>This policy outlines the refund terms for the various services and transactions made through the Roomhy platform.</p>

            <h2>Setup Fee Refund</h2>
            <ul>
              <li><strong>Non-Refundable:</strong> The setup fee charged for listing a property or using premium features is non-refundable once deducted from your account.</li>
              <li><strong>Exception:</strong> If the service was not provided or technical issues prevented access, contact our support team for a full refund within 7 days of transaction.</li>
            </ul>

            <h2>Booking Cancellation Refunds</h2>
            <ul>
              <li><strong>Cancellation by Tenant (before check-in):</strong> Refund 80% of the booking amount. 20% is retained as a cancellation fee.</li>
              <li><strong>Cancellation by Owner:</strong> If a property is cancelled by the owner after a confirmed booking, the tenant receives a full refund plus compensation.</li>
              <li><strong>No-show:</strong> If a tenant fails to check-in without notice, the property owner keeps the full booking amount.</li>
            </ul>

            <h2>Special Cases for Student Users</h2>
            <ul>
              <li>Students registered on the platform may be eligible for extended refund periods (up to 30 days) under specific conditions.</li>
              <li>Valid student ID verification is required for this benefit.</li>
            </ul>

            <h2>Exceptional Circumstances</h2>
            <ul>
              <li>Medical emergencies, natural disasters, or force majeure events may make the user eligible for a full refund regardless of policy timelines.</li>
              <li>Proof of such circumstances is required.</li>
            </ul>

            <h2>Processing Refunds</h2>
            <p>All refunds are processed within 5-7 business days. Bank transfers typically appear within 7-10 business days. Refunds to credit cards may take up to 15 business days depending on your financial institution.</p>

            <h2>Contact Us for Refund Requests</h2>
            <p>📧 <a href="mailto:hello@roomhy.com">hello@roomhy.com</a><br />📱 +91-9983005030</p>
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}
