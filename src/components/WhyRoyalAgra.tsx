import React from 'react';
import { Compass, Award,  } from 'lucide-react';

interface WhyRoyalLagosProps {
  onContactAdvisory: () => void;
}

export const WhyRoyalLagos: React.FC<WhyRoyalLagosProps> = ({ onContactAdvisory }) => {
  const pillars = [
    {
      icon: Compass,
      title: 'Private viewings',
      description: 'Arrange a considered visit to the homes that match your search.'
    },
    {
      icon: Award,
      title: 'Local guidance',
      description: 'Explore Lagos neighbourhoods with a property advisor who understands the details of each search.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0F382C] text-white relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#164E3D] rounded-full filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A869]/10 rounded-full filter blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4D5B7]/15 border border-[#C5A869]/30 text-[#E4D5B7] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>The DIDU standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
            A considered way to find your place in Lagos
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Discover exceptional homes across Ikoyi, Victoria Island, Banana Island and beyond with personal, one-to-one guidance.
          </p>
        </div>

        {/* Pillars Grid - 2 Column Balanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B2B22] p-6 sm:p-8 rounded-xl border border-[#164E3D] hover:border-[#C5A869]/40 transition-all duration-300 shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#0F382C] border border-[#164E3D] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform text-[#E4D5B7]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif-luxury font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onContactAdvisory}
            className="inline-flex items-center gap-2 bg-[#C5A869] hover:bg-[#b09355] text-[#0F382C] px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <span>Schedule Private Advisory Consultation</span>
            <span> </span>
          </button>
        </div>

      </div>
    </section>
  );
};
