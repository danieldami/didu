import React, { useMemo } from 'react';
import { RotateCcw, Search } from 'lucide-react';
import type { FilterState, Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface PropertiesScreenProps {
  properties: Property[];
  filterState: FilterState;
  onUpdateFilters: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onSelectProperty: (property: Property) => void;
  onToggleSave: (slug: string) => void;
  savedIds: string[];
  onBookVisit: (property: Property) => void;
  onToggleCompare: (property: Property) => void;
  compareList: Property[];
  onOpenCompareModal: () => void;
}

const fieldClass = 'rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-brand-primary';

export const PropertiesScreen: React.FC<PropertiesScreenProps> = ({ properties, filterState, onUpdateFilters, onResetFilters, onSelectProperty, onToggleSave, savedIds, onBookVisit, onToggleCompare, compareList, onOpenCompareModal }) => {
  const locations = [...new Set(properties.map(property => property.location).filter(Boolean))].sort();
  const types = [...new Set(properties.map(property => property.propertyType).filter(Boolean))].sort();
  const filteredProperties = useMemo(() => {
    const query = filterState.searchQuery.trim().toLowerCase();
    const results = properties.filter(property => {
      if (query && !`${property.title} ${property.location} ${property.state} ${property.description}`.toLowerCase().includes(query)) return false;
      if (filterState.location && property.location !== filterState.location) return false;
      if (filterState.propertyType && property.propertyType !== filterState.propertyType) return false;
      if (filterState.listingType !== 'all' && property.listingType !== filterState.listingType) return false;
      if (property.price < filterState.priceRange[0] || property.price > filterState.priceRange[1]) return false;
      if (filterState.status !== 'all' && property.status !== filterState.status) return false;
      return true;
    });
    return results.sort((first, second) => {
      if (filterState.sortBy === 'price-asc') return first.price - second.price;
      if (filterState.sortBy === 'price-desc') return second.price - first.price;
      if (filterState.sortBy === 'newest') return second.datePosted.localeCompare(first.datePosted);
      const rank = { available: 0, 'under-offer': 1, sold: 2, let: 3 } as const;
      return rank[first.status] - rank[second.status] || Number(second.featured) - Number(first.featured);
    });
  }, [properties, filterState]);

  return <section className="bg-brand-page px-5 py-12 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl">
    <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-primary">Property collection</p><h1 className="mt-2 font-serif-luxury text-4xl text-brand-primary">Find your next property</h1><p className="mt-3 text-sm text-gray-600">{filteredProperties.length} {filteredProperties.length === 1 ? 'listing' : 'listings'} available to explore.</p></div>
    <div className="mt-8 grid gap-3 rounded-2xl border border-gray-200 bg-[#f2f1eb] p-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="relative sm:col-span-2 lg:col-span-1"><span className="sr-only">Search properties</span><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><input className={`${fieldClass} w-full pl-9`} placeholder="Search listings" value={filterState.searchQuery} onChange={event => onUpdateFilters({ searchQuery: event.target.value })} /></label>
      <label><span className="sr-only">Location</span><select className={`${fieldClass} w-full`} value={filterState.location} onChange={event => onUpdateFilters({ location: event.target.value })}><option value="">All locations</option>{locations.map(location => <option key={location}>{location}</option>)}</select></label>
      <label><span className="sr-only">Property type</span><select className={`${fieldClass} w-full`} value={filterState.propertyType} onChange={event => onUpdateFilters({ propertyType: event.target.value })}><option value="">All property types</option>{types.map(type => <option key={type}>{type}</option>)}</select></label>
      <label><span className="sr-only">Listing type</span><select className={`${fieldClass} w-full`} value={filterState.listingType} onChange={event => onUpdateFilters({ listingType: event.target.value as FilterState['listingType'] })}><option value="all">Sale and rent</option><option value="sale">For sale</option><option value="rent">For rent</option></select></label>
      <div className="flex gap-2"><label className="min-w-0 flex-1"><span className="sr-only">Minimum price in naira</span><input type="number" min="0" className={`${fieldClass} w-full`} placeholder="Min ₦" value={filterState.priceRange[0] || ''} onChange={event => onUpdateFilters({ priceRange: [Number(event.target.value) || 0, filterState.priceRange[1]] })} /></label><label className="min-w-0 flex-1"><span className="sr-only">Maximum price in naira</span><input type="number" min="0" className={`${fieldClass} w-full`} placeholder="Max ₦" value={filterState.priceRange[1] === Number.MAX_SAFE_INTEGER ? '' : filterState.priceRange[1]} onChange={event => onUpdateFilters({ priceRange: [filterState.priceRange[0], Number(event.target.value) || Number.MAX_SAFE_INTEGER] })} /></label></div>
      <label><span className="sr-only">Listing status</span><select className={`${fieldClass} w-full`} value={filterState.status} onChange={event => onUpdateFilters({ status: event.target.value as FilterState['status'] })}><option value="all">All statuses</option><option value="available">Available</option><option value="under-offer">Under offer</option><option value="sold">Sold</option><option value="let">Let</option></select></label>
      <label><span className="sr-only">Sort listings</span><select className={`${fieldClass} w-full`} value={filterState.sortBy} onChange={event => onUpdateFilters({ sortBy: event.target.value as FilterState['sortBy'] })}><option value="available">Available first</option><option value="newest">Newest first</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label>
      <button type="button" onClick={onResetFilters} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600"><RotateCcw className="h-4 w-4" />Reset filters</button>
    </div>
    {compareList.length > 0 && <button type="button" onClick={onOpenCompareModal} className="mt-5 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Compare {compareList.length} selected</button>}
    {filteredProperties.length === 0 ? <p className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">No properties match those filters.</p> : <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filteredProperties.map(property => <PropertyCard key={property.slug} property={property} onSelect={onSelectProperty} onToggleSave={onToggleSave} isSaved={savedIds.includes(property.slug)} onBookVisit={onBookVisit} onToggleCompare={onToggleCompare} isComparing={compareList.some(item => item.slug === property.slug)} />)}</div>}
  </div></section>;
};
