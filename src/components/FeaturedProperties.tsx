import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface FeaturedPropertiesProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onToggleSave: (slug: string) => void;
  savedIds: string[];
  onBookVisit: (property: Property) => void;
  onExploreAll: () => void;
  onToggleCompare: (property: Property) => void;
  compareList: Property[];
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties, onSelectProperty, onToggleSave, savedIds, onBookVisit, onExploreAll, onToggleCompare, compareList }) => <section className="bg-brand-cream py-16 sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-primary">Our properties</p><h2 className="mt-3 font-serif-luxury text-3xl text-brand-primary sm:text-4xl">Selected for you</h2><p className="mt-2 text-sm text-gray-600">Browse current homes, land and commercial opportunities.</p></div><button type="button" onClick={onExploreAll} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">View all properties <ArrowRight className="h-4 w-4" /></button></div>
    {properties.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-600">No featured properties are available at the moment.</div> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{properties.map(property => <PropertyCard key={property.slug} property={property} onSelect={onSelectProperty} onToggleSave={onToggleSave} isSaved={savedIds.includes(property.slug)} onBookVisit={onBookVisit} onToggleCompare={onToggleCompare} isComparing={compareList.some(item => item.slug === property.slug)} />)}</div>}
  </div>
</section>;
