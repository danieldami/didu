import React from 'react';
import { Landmark, ShieldCheck, Users, Compass, CheckCircle2, FileCheck, Scale, Phone } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const trustPillars = [
    {
      icon: FileCheck,
      title: 'A considered search',
      description: 'We take time to understand your priorities, preferred neighbourhoods and the way you want to live.'
    },
    {
      icon: Users,
      title: 'Personal guidance',
      description: 'A dedicated property advisor helps you explore suitable homes and coordinate private viewings.'
    },
    {
      icon: Scale,
      title: 'Lagos perspective',
      description: 'Local neighbourhood context helps you compare locations, property styles and the details that matter to you.'
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Landmark className="w-3.5 h-3.5 text-brand-primary" />
            <span>LUXURY REAL ESTATE ADVISORY   LAGOS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-brand-primary tracking-tight">
            Modern Real Estate Built on Discretion & Absolute Trust
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed font-medium">
            Chubank Property is a Lagos property advisory concept focused on a more personal, considered way to find a home.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">Our Philosophy</span>
            <h2 className="text-2xl font-serif-luxury font-bold text-brand-primary">
              A Modern, Advisory-First Approach to Lagos Real Estate
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Finding the right home is a personal decision. Chubank Property brings a curated property experience together with thoughtful, one-to-one guidance.
            </p>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Explore residences in Ikoyi, Banana Island, Victoria Island, Lekki Phase 1 and other sought-after Lagos neighbourhoods.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
              alt="Lagos Heritage and Prime Corridors"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-semibold text-brand-accent-soft block">Lagos Prime Residential & Commercial Corridors</span>
              <p className="text-[11px] text-gray-300">Curated Lagos properties with thoughtful, personal guidance</p>
            </div>
          </div>
        </div>

        {/* Trust Pillars */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">Core Foundations</span>
            <h3 className="text-2xl font-serif-luxury font-bold text-brand-primary mt-1">
              The Chubank Property Experience
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-6 sm:p-7 rounded-xl border border-gray-200/90 shadow-xs hover:border-brand-accent/50 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="w-11 h-11 rounded-lg bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center mb-4 text-brand-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-serif-luxury font-bold text-brand-primary mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">Leadership</span>
            <h3 className="text-2xl font-serif-luxury font-bold text-brand-primary mt-1">
              Founding Partners
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Amara Okafor */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:border-brand-accent/60 transition-all">
              <div className="relative mb-5 group">
                <div className="w-28 h-28 rounded-full bg-brand-primary/5 border-2 border-brand-accent flex flex-col items-center justify-center text-brand-primary overflow-hidden shadow-inner">
                  <Users className="w-10 h-10 text-brand-primary/40 mb-1" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-accent">Photo</span>
                </div>
              </div>
              <h4 className="text-xl font-serif-luxury font-bold text-brand-primary">Amara Okafor</h4>
              <span className="text-xs font-bold text-brand-accent uppercase tracking-wider block mt-1 mb-3">Managing Partner & Co-Founder</span>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mb-4">
                Leading strategic client relations, luxury residential acquisitions, and high-value property portfolios across Lagos's prime corridors.
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100 w-full flex items-center justify-center gap-2 text-xs font-semibold text-brand-primary">
                <span>Direct:</span>
                <a href="tel:+2348035550148" className="text-brand-primary hover:text-brand-accent underline">
                  +234 803 555 0148
                </a>
              </div>
            </div>

            {/* Card 2: Tunde Adebayo */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:border-brand-accent/60 transition-all">
              <div className="relative mb-5 group">
                <div className="w-28 h-28 rounded-full bg-brand-primary/5 border-2 border-brand-accent flex flex-col items-center justify-center text-brand-primary overflow-hidden shadow-inner">
                  <Users className="w-10 h-10 text-brand-primary/40 mb-1" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-accent">Photo</span>
                </div>
              </div>
              <h4 className="text-xl font-serif-luxury font-bold text-brand-primary">Tunde Adebayo</h4>
              <span className="text-xs font-bold text-brand-accent uppercase tracking-wider block mt-1 mb-3">Managing Partner & Co-Founder</span>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mb-4">
                Overseeing commercial real estate developments, clear-title legal verifications, and strategic property investments in Lagos.
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100 w-full flex items-center justify-center gap-2 text-xs font-semibold text-brand-primary">
                <span>Direct:</span>
                <a href="tel:+2348095550182" className="text-brand-primary hover:text-brand-accent underline">
                  +234 809 555 0182
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
