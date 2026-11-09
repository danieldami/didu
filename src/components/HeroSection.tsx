import React, { useState } from 'react';
import { PropertyType, FilterState } from '../types';
import { LISTING_LOCATIONS, PROPERTY_TYPES } from '../data/mockData';
import { ArrowDown, ArrowRight, ChevronDown, MapPin, Search } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (filters: Partial<FilterState>) => void;
  onSelectLocality?: (localityName: string) => void;
  onExploreProjects?: () => void;
}

const budgets = [
  { value: 'all', label: 'Any budget', min: 0, max: 5000000000 },
  { value: 'under-1bn', label: 'Under ₦1bn', min: 0, max: 1000000000 },
  { value: '1-1.5bn', label: '₦1bn – ₦1.5bn', min: 1000000000, max: 1500000000 },
  { value: '1.5-2bn', label: '₦1.5bn – ₦2bn', min: 1500000000, max: 2000000000 },
  { value: '2bn-plus', label: '₦2bn and above', min: 2000000000, max: 5000000000 },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [locality, setLocality] = useState('All Locations');
  const [propertyType, setPropertyType] = useState<PropertyType>('All');
  const [budgetRange, setBudgetRange] = useState('all');
  const handleExecuteSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const budget = budgets.find(item => item.value === budgetRange) || budgets[0];
    onSearch({ listingType: 'Buy', locality: locality === 'All Locations' ? '' : locality, propertyType, priceRange: [budget.min, budget.max] });
  };

  return (
    <section className="relative isolate min-h-[690px] overflow-hidden bg-[#14251f] text-white lg:min-h-[740px]">
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
        alt="Contemporary residence framed by lush tropical gardens"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,29,24,.92)_0%,rgba(13,29,24,.72)_46%,rgba(13,29,24,.18)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(13,29,24,.72)_0%,transparent_42%)]" />

      <div className="mx-auto flex min-h-[690px] max-w-[1320px] flex-col justify-center px-5 pb-14 pt-20 sm:px-8 lg:min-h-[740px] lg:px-12">
        <div className="max-w-[760px]">
          <div className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.28em] text-[#d8c69e] sm:text-xs">
            <span className="h-px w-9 bg-[#d8c69e]" />
            Property, thoughtfully considered
          </div>
          <h1 className="max-w-[750px] font-serif-luxury text-[clamp(3.25rem,7.4vw,6.4rem)] font-normal leading-[.99] tracking-[-.045em]">
            Find a place to <span className="italic text-[#dfcfae]">belong.</span>
          </h1>
          <p className="mt-7 max-w-[510px] text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Thoughtfully selected properties, local insight and personal guidance for your next chapter.
          </p>
        </div>

        <div className="mt-10 max-w-[960px] rounded-[1.35rem] border border-white/50 bg-[#fbfaf7] p-2.5 text-[#1d2a24] shadow-[0_28px_80px_rgba(0,0,0,.24)] sm:p-3">
          <form onSubmit={handleExecuteSearch} className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <label className="group px-4 py-3 sm:border-r sm:border-[#e6e3dc]">
              <span className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#7b817a]"><MapPin className="h-3.5 w-3.5" /> Neighbourhood</span>
              <span className="relative block">
                <select value={locality} onChange={event => setLocality(event.target.value)} className="w-full appearance-none bg-transparent pr-7 text-sm font-semibold outline-none">
                  <option value="All Locations">Anywhere</option>
                  {LISTING_LOCATIONS.filter(item => item !== 'All Locations').map(item => <option key={item}>{item}</option>)}
                </select><ChevronDown className="pointer-events-none absolute right-0 top-0.5 h-4 w-4 text-[#858a83]" />
              </span>
            </label>
            <label className="px-4 py-3 sm:border-r sm:border-[#e6e3dc]">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-[#7b817a]">Property type</span>
              <span className="relative block">
                <select value={propertyType} onChange={event => setPropertyType(event.target.value)} className="w-full appearance-none bg-transparent pr-7 text-sm font-semibold outline-none">
                  {PROPERTY_TYPES.map(item => <option key={item} value={item}>{item === 'All' ? 'Any property' : item}</option>)}
                </select><ChevronDown className="pointer-events-none absolute right-0 top-0.5 h-4 w-4 text-[#858a83]" />
              </span>
            </label>
            <label className="px-4 py-3">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-[#7b817a]">Your budget</span>
              <span className="relative block">
                <select value={budgetRange} onChange={event => setBudgetRange(event.target.value)} className="w-full appearance-none bg-transparent pr-7 text-sm font-semibold outline-none">
                  {budgets.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select><ChevronDown className="pointer-events-none absolute right-0 top-0.5 h-4 w-4 text-[#858a83]" />
              </span>
            </label>
            <button type="submit" className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#17372c] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#24513e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17372c]">
              <Search className="h-4 w-4" /> Find a home
            </button>
          </form>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/75 sm:text-sm">
          <span className="text-white/50">A good place to start</span>
          {LISTING_LOCATIONS.slice(1, 4).map(place => (
            <button key={place} type="button" onClick={() => onSearch({ listingType: 'Buy', locality: place, propertyType: 'All', priceRange: [0, 5000000000] })} className="inline-flex items-center gap-1 transition-colors hover:text-[#dfcfae]">
              {place}<ArrowRight className="h-3 w-3" />
            </button>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-8 right-10 hidden items-center gap-3 text-[10px] uppercase tracking-[.22em] text-white/60 lg:flex">
          <span>Discover properties</span><ArrowDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
};
