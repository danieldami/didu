import React, { useState } from 'react';
import { PropertyType, FilterState } from '../types';
import { LAGOS_LOCALITIES, PROPERTY_TYPES } from '../data/mockData';
import { Search, MapPin, Home, ChevronDown, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (filters: Partial<FilterState>) => void;
  onSelectLocality?: (localityName: string) => void;
  onExploreProjects?: () => void;
}

const budgets = [
  { value: 'all', label: 'Any budget', min: 0, max: 5000000000 },
  { value: 'under-1bn', label: 'Under ₦ 1bn', min: 0, max: 1000000000 },
  { value: '1-1.5bn', label: '₦ 1bn   ₦ 1.5bn', min: 1000000000, max: 1500000000 },
  { value: '1.5-2bn', label: '₦ 1.5bn   ₦ 2bn', min: 1500000000, max: 2000000000 },
  { value: '2bn-plus', label: '₦ 2bn and above', min: 2000000000, max: 5000000000 },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [locality, setLocality] = useState('All Localities');
  const [propertyType, setPropertyType] = useState<PropertyType>('All');
  const [budgetRange, setBudgetRange] = useState('all');
  const handleExecuteSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const budget = budgets.find(item => item.value === budgetRange) || budgets[0];
    onSearch({ listingType: 'Buy', locality: locality === 'All Localities' ? '' : locality, propertyType, priceRange: [budget.min, budget.max] });
  };

  return (
    <section className="relative min-h-[620px] lg:min-h-[700px] bg-[#10271F] overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90" alt="Contemporary Lagos luxury residence" className="w-full h-full object-cover object-center brightness-[0.7]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10271F]/95 via-[#10271F]/65 to-[#10271F]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10271F]/75 via-transparent to-[#10271F]/15" />
      </div>
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl text-white">
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-[#E0C98E] font-semibold mb-5">Lagos property, considered</p>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl leading-[1.08] font-medium">Find a home that feels like <span className="italic text-[#E0C98E]">yours.</span></h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">A considered collection of exceptional homes in Ikoyi, Banana Island, Victoria Island and across Lagos.</p>
        </div>
        <form onSubmit={handleExecuteSearch} className="mt-10 max-w-5xl bg-white rounded-2xl shadow-2xl p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_auto] gap-2">
          <label className="px-3 py-2.5 border-b sm:border-b-0 sm:border-r border-gray-200">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500"><MapPin className="w-3.5 h-3.5" /> Location</span>
            <span className="relative block mt-1"><select value={locality} onChange={event => setLocality(event.target.value)} className="w-full appearance-none bg-transparent text-sm font-semibold text-gray-900 outline-none pr-5"><option value="All Localities">All Lagos</option>{LAGOS_LOCALITIES.filter(item => item !== 'All Localities').map(item => <option key={item}>{item}</option>)}</select><ChevronDown className="absolute right-0 top-1 w-4 h-4 text-gray-400 pointer-events-none" /></span>
          </label>
          <label className="px-3 py-2.5 border-b sm:border-b-0 sm:border-r border-gray-200">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500"><Home className="w-3.5 h-3.5" /> Property type</span>
            <span className="relative block mt-1"><select value={propertyType} onChange={event => setPropertyType(event.target.value)} className="w-full appearance-none bg-transparent text-sm font-semibold text-gray-900 outline-none pr-5">{PROPERTY_TYPES.map(item => <option key={item} value={item}>{item === 'All' ? 'Any property type' : item}</option>)}</select><ChevronDown className="absolute right-0 top-1 w-4 h-4 text-gray-400 pointer-events-none" /></span>
          </label>
          <label className="px-3 py-2.5">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">Budget</span>
            <span className="relative block mt-1"><select value={budgetRange} onChange={event => setBudgetRange(event.target.value)} className="w-full appearance-none bg-transparent text-sm font-semibold text-gray-900 outline-none pr-5">{budgets.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select><ChevronDown className="absolute right-0 top-1 w-4 h-4 text-gray-400 pointer-events-none" /></span>
          </label>
          <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-[#142A23] hover:bg-[#203D32] px-7 py-4 text-sm font-bold text-white transition-colors"><Search className="w-4 h-4" /> Explore homes</button>
        </form>
        <button type="button" onClick={() => onSearch({ listingType: 'Buy', locality: '', propertyType: 'All', priceRange: [0, 5000000000] })} className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">Browse the collection <ArrowRight className="w-4 h-4" /></button>
      </div>
    </section>
  );
};
