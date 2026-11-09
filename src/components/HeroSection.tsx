import React, { useMemo, useState } from 'react';
import { ArrowDown, ChevronDown, MapPin, Search } from 'lucide-react';
import type { FilterState } from '../types';
import { getListings } from '../data/listings';
import { siteConfig } from '../config/site';

interface HeroSectionProps { onSearch: (filters: Partial<FilterState>) => void; }

const budgets = [
  { label: 'Any budget', min: 0, max: Number.MAX_SAFE_INTEGER },
  { label: 'Under ₦100m', min: 0, max: 100_000_000 },
  { label: '₦100m – ₦500m', min: 100_000_000, max: 500_000_000 },
  { label: '₦500m – ₦1bn', min: 500_000_000, max: 1_000_000_000 },
  { label: 'Over ₦1bn', min: 1_000_000_000, max: Number.MAX_SAFE_INTEGER },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const listings = useMemo(() => getListings(), []);
  const locations = [...new Set(listings.map(listing => listing.location).filter(Boolean))].sort();
  const propertyTypes = [...new Set(listings.map(listing => listing.propertyType).filter(Boolean))].sort();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budgetIndex, setBudgetIndex] = useState(0);
  const search = (event: React.FormEvent) => {
    event.preventDefault();
    const budget = budgets[budgetIndex] ?? budgets[0];
    onSearch({ location, propertyType, priceRange: [budget.min, budget.max], status: 'all' });
  };

  return <section className="relative isolate min-h-[690px] overflow-hidden bg-brand-primary-dark text-white lg:min-h-[740px]">
    <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_75%_30%,color-mix(in_srgb,var(--color-brand-accent)_28%,transparent),transparent_45%),linear-gradient(120deg,var(--color-brand-primary-dark),var(--color-brand-primary-light))]" />
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-primary-dark/90 via-brand-primary-dark/60 to-brand-primary/20" />
    <div className="mx-auto flex min-h-[690px] max-w-[1320px] flex-col justify-center px-5 pb-14 pt-20 sm:px-8 lg:min-h-[740px] lg:px-12">
      <div className="max-w-[760px]"><div className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.28em] text-brand-accent-soft sm:text-xs"><span className="h-px w-9 bg-brand-accent-soft" />{siteConfig.shortName} · {siteConfig.tagline.startsWith('TODO_') ? 'Property, thoughtfully considered' : siteConfig.tagline}</div><h1 className="max-w-[750px] font-serif-luxury text-[clamp(3.25rem,7.4vw,6.4rem)] font-normal leading-[.99] tracking-[-.045em]">Find a place to <span className="italic text-brand-accent-soft">belong.</span></h1><p className="mt-7 max-w-[510px] text-base leading-7 text-white/80 sm:text-lg sm:leading-8">Explore available properties, get clear information and arrange a private inspection with our team.</p></div>
      <div className="mt-10 max-w-[960px] rounded-[1.35rem] border border-white/50 bg-brand-cream p-2.5 text-brand-ink shadow-[0_28px_80px_rgba(0,0,0,.24)] sm:p-3"><form onSubmit={search} className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="px-4 py-3 sm:border-r sm:border-[#e6e3dc]"><span className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#7b817a]"><MapPin className="h-3.5 w-3.5" /> Location</span><span className="relative block"><select value={location} onChange={event => setLocation(event.target.value)} className="w-full appearance-none bg-transparent pr-7 text-sm font-semibold outline-none"><option value="">Any location</option>{locations.map(item => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-0 top-0.5 h-4 w-4 text-[#858a83]" /></span></label>
        <label className="px-4 py-3 sm:border-r sm:border-[#e6e3dc]"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-[#7b817a]">Property type</span><span className="relative block"><select value={propertyType} onChange={event => setPropertyType(event.target.value)} className="w-full appearance-none bg-transparent pr-7 text-sm font-semibold outline-none"><option value="">Any property type</option>{propertyTypes.map(type => <option key={type}>{type}</option>)}</select><ChevronDown className="pointer-events-none absolute right-0 top-0.5 h-4 w-4 text-[#858a83]" /></span></label>
        <label className="px-4 py-3"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-[#7b817a]">Your budget</span><span className="relative block"><select value={budgetIndex} onChange={event => setBudgetIndex(Number(event.target.value))} className="w-full appearance-none bg-transparent pr-7 text-sm font-semibold outline-none">{budgets.map((budget, index) => <option key={budget.label} value={index}>{budget.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-0 top-0.5 h-4 w-4 text-[#858a83]" /></span></label>
        <button type="submit" className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-brand-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-light"><Search className="h-4 w-4" /> Find a property</button>
      </form></div>
      <div className="pointer-events-none absolute bottom-8 right-10 hidden items-center gap-3 text-[10px] uppercase tracking-[.22em] text-white/60 lg:flex"><span>Discover properties</span><ArrowDown className="h-4 w-4" /></div>
    </div>
  </section>;
};
