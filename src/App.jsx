import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import OurPropertyPage from './pages/website/OurPropertyPage';
import PropertyDetailsPage from './pages/website/PropertyDetailsPage';
import FastBiddingPage from './pages/website/FastBiddingPage';
import ListYourPropertyPage from './pages/website/ListYourPropertyPage';
import AboutPage from './pages/website/AboutPage';
import ContactPage from './pages/website/ContactPage';
import FAQPage from './pages/website/FAQPage';
import WebsiteCancellation from './pages/website/WebsiteCancellation';
import WebsiteTerms from './pages/website/WebsiteTerms';
import WebsitePrivacy from './pages/website/WebsitePrivacy';
import WebsiteRefund from './pages/website/WebsiteRefund';
import WebsiteRefundRequest from './pages/website/WebsiteRefundRequest';
import WebsiteLogin from './pages/website/WebsiteLogin';
import WebsiteSignup from './pages/website/WebsiteSignup';
import WebsiteChat from './pages/website/WebsiteChat';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/website/index" element={<HomePage />} />
        <Route path="/website/ourproperty" element={<OurPropertyPage />} />
        <Route path="/website/property-details/:propertyId" element={<PropertyDetailsPage />} />
        <Route path="/website/fast-bidding" element={<FastBiddingPage />} />
        <Route path="/website/list" element={<ListYourPropertyPage />} />
        <Route path="/website/about" element={<AboutPage />} />
        <Route path="/website/contact" element={<ContactPage />} />
        <Route path="/website/faq" element={<FAQPage />} />
        <Route path="/website/cancellation" element={<WebsiteCancellation />} />
        <Route path="/website/terms" element={<WebsiteTerms />} />
        <Route path="/website/privacy" element={<WebsitePrivacy />} />
        <Route path="/website/refund" element={<WebsiteRefund />} />
        <Route path="/website/refund-request" element={<WebsiteRefundRequest />} />
        <Route path="/website/login" element={<WebsiteLogin />} />
        <Route path="/website/signup" element={<WebsiteSignup />} />
        <Route path="/website/chat" element={<WebsiteChat />} />
        {/* Alias routes */}
        <Route path="/login" element={<WebsiteLogin />} />
        <Route path="/signup" element={<WebsiteSignup />} />
        <Route path="/chat" element={<WebsiteChat />} />
      </Routes>
    </Router>
  );
}
