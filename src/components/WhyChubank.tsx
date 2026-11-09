import React from 'react';
import { Compass, Award } from 'lucide-react';
import { siteConfig } from '../config/site';

interface WhyChubankProps {
  onContactAdvisory: () => void;
}

export const WhyChubank: React.FC<WhyChubankProps> = ({ onContactAdvisory }) => {
  const pillars = [
    {
      icon: Compass,
      title: 'Private viewings',
      description: 'Arrange a considered visit to the homes that match your search.'
    },
    {
      icon: Award,
      title: 'Local guidance',
      description: 'Get clear, personal guidance as you explore property options.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-brand-primary text-white relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary-light rounded-full filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/10 rounded-full filter blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent-soft/15 border border-brand-accent/30 text-brand-accent-soft text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-brand-accent" />
            <span>The Chubank standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
            A considered way to find your next property
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Explore available properties with personal, one-to-one guidance from our team.
          </p>
        </div>

        {/* Pillars Grid - 2 Column Balanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-brand-primary-dark p-6 sm:p-8 rounded-xl border border-brand-primary-light hover:border-brand-accent/40 transition-all duration-300 shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-brand-primary border border-brand-primary-light flex items-center justify-center mb-5 group-hover:scale-105 transition-transform text-brand-accent-soft">
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
            onClick={() => window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello, I would like to arrange a property inspection.")}`, "_blank", "noopener,noreferrer")}
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-[#b09355] text-brand-primary px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <span>Schedule Private Advisory Consultation</span>
            <span> </span>
          </button>
        </div>

      </div>
    </section>
  );
};
