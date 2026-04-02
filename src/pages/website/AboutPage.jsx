import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { Target, Lightbulb, Rocket, Heart, Zap, Shield, Eye, Handshake, Globe, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebsiteNavbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[200px] bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">About Us</h1>
            <p className="text-lg text-gray-600">Discover our story and mission</p>
          </div>
        </div>

        {/* Vision Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Our Vision</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Target, title: 'Disrupt Traditional Model', desc: 'Giving students the power to bid, book, and live without brokers, hidden charges, or negotiation stress.', color: 'bg-teal-100 text-teal-600' },
                { icon: Globe, title: 'Digital Transformation', desc: 'Pioneering a new way for India\'s youth to find accommodation — transparent, real-time, and entirely online.', color: 'bg-blue-100 text-blue-600' },
                { icon: TrendingUp, title: 'Student Empowerment', desc: 'Founded in 2024, Roomhy is building the future of student housing in India.', color: 'bg-green-100 text-green-600' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Our Mission</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Handshake, title: 'Direct Connection', desc: 'Enabling direct, real-time bidding between students and property owners.', color: 'bg-purple-100 text-purple-600' },
                { icon: Shield, title: 'Fair & Flexible', desc: 'Making room rentals fair, flexible, and broker-free for everyone.', color: 'bg-green-100 text-green-600' },
                { icon: Heart, title: 'Student-Centric', desc: 'India\'s first student-centric property bidding platform helping students take control.', color: 'bg-red-100 text-red-600' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Zap, title: 'Transparency', desc: 'No middlemen. No hidden fees.', color: 'bg-yellow-100 text-yellow-600' },
                { icon: Heart, title: 'Empowerment', desc: 'Students and owners are in full control.', color: 'bg-red-100 text-red-600' },
                { icon: Rocket, title: 'Speed & Simplicity', desc: 'From listing to booking in under 5 mins.', color: 'bg-purple-100 text-purple-600' },
                { icon: Shield, title: 'Trust', desc: 'Every listing is verified. Every user is real.', color: 'bg-green-100 text-green-600' },
              ].map((value, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mb-4`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-teal-500 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-4xl font-bold mb-2">5+</h3>
                <p className="text-white/90">Cities</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-4xl font-bold mb-2">5000+</h3>
                <p className="text-white/90">Operational Beds</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-4xl font-bold mb-2">75+</h3>
                <p className="text-white/90">Properties</p>
              </div>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Our Goals</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, title: 'Smart Bidding', desc: 'Helping students bid smart and live better with transparent pricing.', color: 'bg-teal-100 text-teal-600' },
                { icon: Handshake, title: 'Owner Benefits', desc: 'Helping owners earn more, without paying brokerage fees.', color: 'bg-blue-100 text-blue-600' },
                { icon: Globe, title: 'Tech Ecosystem', desc: 'Building a transparent, tech-first ecosystem for youth mobility in India.', color: 'bg-purple-100 text-purple-600' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}
