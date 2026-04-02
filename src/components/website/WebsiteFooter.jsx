import React, { useState, useEffect } from "react";
import { fetchCities } from "../../utils/api.js";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Roomhy", href: "/website/about" },
      { label: "Contact", href: "/website/contact" }
    ]
  },
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/website/index" },
      { label: "Our Properties", href: "/website/ourproperty" },
      { label: "Fast Bidding", href: "/website/fast-bidding" },
      { label: "Post Property", href: "/website/list" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "My Stays", href: "/website/mystays" },
      { label: "Refund Request", href: "/website/refund-request" },
      { label: "Cancellation", href: "/website/cancellation" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/website/terms" },
      { label: "Privacy Policy", href: "/website/privacy" },
      { label: "Refund Policy", href: "/website/refund" }
    ]
  }
];

const staticCityLinks = [
  { name: "Kota", count: "2,500+", href: "/website/ourproperty?city=kota" },
  { name: "Indore", count: "1,800+", href: "/website/ourproperty?city=indore" },
  { name: "Jaipur", count: "3,200+", href: "/website/ourproperty?city=jaipur" },
  { name: "Delhi", count: "5,000+", href: "/website/ourproperty?city=delhi" },
  { name: "Bhopal", count: "1,200+", href: "/website/ourproperty?city=bhopal" },
  { name: "Nagpur", count: "980+", href: "/website/ourproperty?city=nagpur" },
  { name: "Sikar", count: "850+", href: "/website/ourproperty?city=sikar" },
];

export default function WebsiteFooter() {
  const year = new Date().getFullYear();
  const [cityLinks, setCityLinks] = useState(staticCityLinks);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const cities = await fetchCities();
        if (cities && cities.length > 0) {
          const transformedCities = cities.slice(0, 7).map(city => ({
            name: city.name || city.city || city,
            count: city.propertyCount ? `${city.propertyCount}+` : "1000+",
            href: `/website/ourproperty?city=${encodeURIComponent((city.name || city.city || city).toLowerCase())}`
          }));
          setCityLinks(transformedCities);
        }
      } catch (error) {
        console.error("Error fetching cities for footer:", error);
      }
    };

    loadCities();
  }, []);

  return (
    <footer className="mt-auto bg-gray-50 border-t border-gray-200 text-gray-700">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <a href="/website/index" className="inline-flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/dpwgvcibj/image/upload/v1768990260/roomhy/website/logoroomhy.png"
                alt="Roomhy"
                className="h-10 w-auto"
              />
            </a>
            <p className="mt-4 text-sm text-gray-600 max-w-sm">
              Find student housing smarter, simpler, and broker-free.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <a className="text-gray-700 hover:text-teal-600 font-medium" href="/website/contact">
                Help & Support
              </a>
              <span className="text-gray-400">•</span>
              <a className="text-gray-700 hover:text-teal-600 font-medium" href="mailto:hello@roomhy.com">
                hello@roomhy.com
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" title="Facebook" className="text-gray-500 hover:text-teal-600" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" title="X" className="text-gray-500 hover:text-teal-600" aria-label="X">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="#" title="Instagram" className="text-gray-500 hover:text-teal-600" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" title="LinkedIn" className="text-gray-500 hover:text-teal-600" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" title="YouTube" className="text-gray-500 hover:text-teal-600" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <div className="text-sm font-bold text-gray-900">{col.title}</div>
                  <ul className="mt-3 space-y-2">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <a className="text-sm text-gray-600 hover:text-teal-600 font-medium" href={l.href}>
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-200">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Top Cities</h4>
          <div className="flex flex-wrap gap-2">
            {cityLinks.map((city) => (
              <a
                key={city.name}
                href={city.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-teal-500 hover:text-teal-600 text-sm text-gray-600 rounded-full transition-colors font-medium"
              >
                <span>{city.name}</span>
                <span className="text-xs text-gray-400">({city.count})</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="text-xs text-gray-500 font-medium">© {year} Roomhy. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a className="text-gray-600 hover:text-teal-600 font-medium" href="/website/terms">
              Terms
            </a>
            <a className="text-gray-600 hover:text-teal-600 font-medium" href="/website/privacy">
              Privacy
            </a>
            <a className="text-gray-600 hover:text-teal-600 font-medium" href="/website/refund">
              Refund
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
  
