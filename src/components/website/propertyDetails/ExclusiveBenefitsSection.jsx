import React from 'react';
import { Gift, Star, Shield, Clock, Heart, Zap, Crown, Diamond } from 'lucide-react';

const ExclusiveBenefitsSection = ({ exclusiveBenefits = [] }) => {
  // Icon mapping for benefits
  const getIcon = (iconName) => {
    const iconMap = {
      gift: Gift,
      star: Star,
      shield: Shield,
      clock: Clock,
      heart: Heart,
      zap: Zap,
      crown: Crown,
      diamond: Diamond
    };
    return iconMap[iconName] || Gift;
  };

  if (!exclusiveBenefits || exclusiveBenefits.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Exclusive Direct Benefits</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exclusiveBenefits.map((benefit, index) => {
          const Icon = getIcon(benefit.icon);
          return (
            <div 
              key={index} 
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-teal-100"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  {benefit.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Badge */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-teal-200">
          <Shield className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-medium text-teal-700">
            Book Direct & Get Exclusive Benefits
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveBenefitsSection;
