import React, { lazy } from "react";

const pageModules = import.meta.glob("./pages/**/*.jsx");
const rootModules = import.meta.glob("./*.jsx");
const frontendModules = import.meta.glob("../../Frontend/src/*.jsx");

// Merge all modules
const allModules = { ...pageModules, ...rootModules, ...frontendModules };

const routeEntries = [
  // Superadmin Routes
  ["/superadmin/areaadmin", "./pages/superadmin/areaadmin.jsx"],
  ["/superadmin/backup", "./pages/superadmin/backup.jsx"],
  ["/superadmin/booking", "./pages/superadmin/booking.jsx"],
  ["/superadmin/complaint-history", "./pages/superadmin/complaint-history.jsx"],
  ["/superadmin/enquiry-approved", "./pages/superadmin/enquiry-approved.jsx"],
  ["/superadmin/enquiry-db", "./pages/superadmin/enquiry-db.jsx"],
  ["/superadmin/enquiry-hold", "./pages/superadmin/enquiry-hold.jsx"],
  ["/superadmin/enquiry-rejected", "./pages/superadmin/enquiry-rejected.jsx"],
  ["/superadmin/enquiry", "./pages/superadmin/enquiry.jsx"],
  ["/superadmin/import_local", "./pages/superadmin/import_local.jsx"],
  ["/superadmin/index", "./pages/superadmin/index.jsx"],
  ["/superadmin/kyc_verification", "./pages/superadmin/kyc_verification.jsx"],
  ["/superadmin/location", "./pages/superadmin/location.jsx"],
  ["/superadmin/log", "./pages/superadmin/log.jsx"],
  ["/superadmin/manager", "./pages/superadmin/manager.jsx"],
  ["/superadmin/monthly", "./pages/superadmin/monthly.jsx"],
  ["/superadmin/new_signups", "./pages/superadmin/new_signups.jsx"],
  ["/superadmin/owner", "./pages/superadmin/owner.jsx"],
  ["/superadmin/payment_disputes", "./pages/superadmin/payment_disputes.jsx"],
  ["/superadmin/platform", "./pages/superadmin/platform.jsx"],
  ["/superadmin/platform_reports", "./pages/superadmin/platform_reports.jsx"],
  ["/superadmin/profile", "./pages/superadmin/profile.jsx"],
  ["/superadmin/properties", "./pages/superadmin/properties.jsx"],
  ["/superadmin/refund", "./pages/superadmin/refund.jsx"],
  ["/superadmin/rentcollection", "./pages/superadmin/rentcollection.jsx"],
  ["/superadmin/reviews", "./pages/superadmin/reviews.jsx"],
  ["/superadmin/security", "./pages/superadmin/security.jsx"],
  ["/superadmin/settings", "./pages/superadmin/settings.jsx"],
  ["/superadmin/superadmin", "./pages/superadmin/superadmin.jsx"],
  ["/superadmin/superchat", "./pages/superadmin/superchat.jsx"],
  ["/superadmin/tenant", "./pages/superadmin/tenant.jsx"],
  ["/superadmin/visit", "./pages/superadmin/visit.jsx"],
  ["/superadmin/website-db", "./pages/superadmin/website-db.jsx"],
  ["/superadmin/website", "./pages/superadmin/website.jsx"],
  ["/superadmin/websiteenq", "./pages/superadmin/websiteenq.jsx"],
  
  // Employee Routes
  ["/employee/areaadmin", "./pages/employee/areaadmin.jsx"],
  ["/employee/backup", "./pages/employee/backup.jsx"],
  ["/employee/booking", "./pages/employee/booking.jsx"],
  ["/employee/complaint-history", "./pages/employee/complaint-history.jsx"],
  ["/employee/enquiry-approved", "./pages/employee/enquiry-approved.jsx"],
  ["/employee/enquiry-db", "./pages/employee/enquiry-db.jsx"],
  ["/employee/enquiry-hold", "./pages/employee/enquiry-hold.jsx"],
  ["/employee/enquiry-rejected", "./pages/employee/enquiry-rejected.jsx"],
  ["/employee/enquiry", "./pages/employee/enquiry.jsx"],
  ["/employee/import_local", "./pages/employee/import_local.jsx"],
  ["/employee/kyc_verification", "./pages/employee/kyc_verification.jsx"],
  ["/employee/location", "./pages/employee/location.jsx"],
  ["/employee/log", "./pages/employee/log.jsx"],
  ["/employee/manager", "./pages/employee/manager.jsx"],
  ["/employee/monthly", "./pages/employee/monthly.jsx"],
  ["/employee/new_signups", "./pages/employee/new_signups.jsx"],
  ["/employee/owner", "./pages/employee/owner.jsx"],
  ["/employee/payment_disputes", "./pages/employee/payment_disputes.jsx"],
  ["/employee/platform", "./pages/employee/platform.jsx"],
  ["/employee/platform_reports", "./pages/employee/platform_reports.jsx"],
  ["/employee/profile", "./pages/employee/profile.jsx"],
  ["/employee/properties", "./pages/employee/properties.jsx"],
  ["/employee/refund", "./pages/employee/refund.jsx"],
  ["/employee/rentcollection", "./pages/employee/rentcollection.jsx"],
  ["/employee/reviews", "./pages/employee/reviews.jsx"],
  ["/employee/security", "./pages/employee/security.jsx"],
  ["/employee/settings", "./pages/employee/settings.jsx"],
  ["/employee/superadmin", "./pages/employee/areaadmin.jsx"],
  ["/employee/superchat", "./pages/employee/superchat.jsx"],
  ["/employee/tenant", "./pages/employee/tenant.jsx"],
  ["/employee/visit", "./pages/employee/visit.jsx"],
  ["/employee/website-db", "./pages/employee/website-db.jsx"],
  ["/employee/website", "./pages/employee/website.jsx"],
  ["/employee/websiteenq", "./pages/employee/websiteenq.jsx"],
  
  // Property Owner Routes
  ["/propertyowner/admin", "./pages/propertyowner/admin.jsx"],
  ["/propertyowner/booking-form", "./pages/propertyowner/booking-form.jsx"],
  ["/propertyowner/booking", "./pages/propertyowner/booking.jsx"],
  ["/propertyowner/booking_request", "./pages/propertyowner/booking_request.jsx"],
  ["/propertyowner/complaints", "./pages/propertyowner/complaints.jsx"],
  ["/propertyowner/documents", "./pages/propertyowner/documents.jsx"],
  ["/propertyowner/enquiry", "./pages/propertyowner/enquiry.jsx"],
  ["/propertyowner/index", "./pages/propertyowner/index.jsx"],
  ["/propertyowner/location", "./pages/propertyowner/location.jsx"],
  ["/propertyowner/ownerchat", "./pages/propertyowner/ownerchat.jsx"],
  ["/propertyowner/ownerlogin", "./pages/propertyowner/ownerlogin.jsx"],
  ["/propertyowner/ownerprofile", "./pages/propertyowner/ownerprofile.jsx"],
  ["/propertyowner/payment-received", "./pages/propertyowner/payment-received.jsx"],
  ["/propertyowner/payment", "./pages/propertyowner/payment.jsx"],
  ["/propertyowner/properties", "./pages/propertyowner/properties.jsx"],
  ["/propertyowner/review", "./pages/propertyowner/review.jsx"],
  ["/propertyowner/rooms", "./pages/propertyowner/rooms.jsx"],
  ["/propertyowner/schedulevisit", "./pages/propertyowner/schedulevisit.jsx"],
  ["/propertyowner/settings", "./pages/propertyowner/settings.jsx"],
  ["/propertyowner/tenantrec", "./pages/propertyowner/tenantrec.jsx"],
  ["/propertyowner/tenants", "./pages/propertyowner/tenants.jsx"],
  
  // Tenant Routes
  ["/tenant/tenantagreement", "./pages/tenant/tenantagreement.jsx"],
  ["/tenant/tenantchat", "./pages/tenant/tenantchat.jsx"],
  ["/tenant/tenantcomplints", "./pages/tenant/tenantcomplints.jsx"],
  ["/tenant/tenantdashboard", "./pages/tenant/tenantdashboard.jsx"],
  ["/tenant/tenantlogin", "./pages/tenant/tenantlogin.jsx"],
  
  // Digital Checkin Routes
  ["/digital-checkin/index", "./pages/digital-checkin/index.jsx"],
  ["/digital-checkin/ownerkyc", "./pages/digital-checkin/ownerkyc.jsx"],
  ["/digital-checkin/ownerprofile", "./pages/digital-checkin/ownerprofile.jsx"],
  ["/digital-checkin/owner-success", "./pages/digital-checkin/owner-success.jsx"],
  ["/digital-checkin/ownerterms", "./pages/digital-checkin/ownerterms.jsx"],
  ["/digital-checkin/tenant-confirmation", "./pages/digital-checkin/tenant-confirmation.jsx"],
  ["/digital-checkin/tenantagreement", "./pages/digital-checkin/tenantagreement.jsx"],
  ["/digital-checkin/tenantkyc", "./pages/digital-checkin/tenantkyc.jsx"],
  ["/digital-checkin/tenantprofile", "./pages/digital-checkin/tenantprofile.jsx"],
  
  // Website Routes (using existing component names)
  ["/website/about", "./pages/website/AboutPage.jsx"],
  ["/website/contact", "./pages/website/ContactPage.jsx"],
  ["/website/cancellation", "./pages/website/WebsiteCancellation.jsx"],
  ["/website/terms", "./pages/website/WebsiteTerms.jsx"],
  ["/website/privacy", "./pages/website/WebsitePrivacy.jsx"],
  ["/website/refund", "./pages/website/WebsiteRefund.jsx"],
  ["/website/refund-request", "./pages/website/WebsiteRefundRequest.jsx"],
  ["/website/login", "./pages/website/WebsiteLogin.jsx"],
  ["/website/signup", "./pages/website/WebsiteSignup.jsx"],
  ["/website/chat", "./pages/website/WebsiteChat.jsx"],
  ["/website/mystays", "./pages/website/WebsiteMystays.jsx"],
  ["/website/ourproperty", "./pages/website/OurPropertyPage.jsx"],
  ["/website/property-details/:propertyId", "./pages/website/PropertyDetailsPage.jsx"],
  ["/website/fast-bidding", "./pages/website/FastBiddingPage.jsx"],
  ["/website/list", "./pages/website/ListYourPropertyPage.jsx"],
  ["/website/profile", "./pages/website/ProfilePage.jsx"],
  ["/website/settings", "./pages/website/SettingsPage.jsx"],
  ["/website/fav", "./pages/website/FavouritesPage.jsx"],
  ["/website/reviews", "./pages/website/ReviewsPage.jsx"],
  ["/website/faq", "./pages/website/FAQPage.jsx"],
  ["/website/index", "./HomePage.jsx"],
  ["/", "./HomePage.jsx"]
];

const buildRouteElement = (modulePath) => {
  const loader = allModules[modulePath];

  if (!loader) {
    throw new Error(`Missing route module: ${modulePath}`);
  }

  const Component = lazy(loader);
  return <Component />;
};

const routes = routeEntries.map(([path, modulePath]) => ({
  path,
  element: buildRouteElement(modulePath)
}));

export default routes;
