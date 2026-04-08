import { Home, Building2, HelpCircle, Info, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl md:hidden z-40">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/website/index" 
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-teal-500 transition-colors"
          title="Home"
        >
          <Home className="w-6 h-6" />
        </Link>
        <Link 
          to="/website/ourproperty" 
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-teal-500 transition-colors"
          title="Properties"
        >
          <Building2 className="w-6 h-6" />
        </Link>
        <Link 
          to="/website/faq" 
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-teal-500 transition-colors"
          title="FAQ"
        >
          <HelpCircle className="w-6 h-6" />
        </Link>
        <Link 
          to="/website/about" 
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-teal-500 transition-colors"
          title="About"
        >
          <Info className="w-6 h-6" />
        </Link>
        <Link 
          to="/website/contact" 
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-teal-500 transition-colors"
          title="Contact"
        >
          <Phone className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
}
