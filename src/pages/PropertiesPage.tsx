import React, { useState } from 'react';
import type { FilterState, Property } from '../types';
import { getListings } from '../data/listings';
import { PropertiesScreen } from '../components/PropertiesScreen';
import { siteConfig } from '../config/site';
import { useRouteMeta } from '../utils/seo';
import { useSearchParams } from 'react-router-dom';

interface PropertiesPageProps {
  onSelectProperty: (property: Property) => void;
  onToggleSave: (slug: string) => void;
  savedIds: string[];
  onBookVisit: (property: Property) => void;
  onToggleCompare: (property: Property) => void;
  compareList: Property[];
  onOpenCompare: () => void;
}

const initialFilters: FilterState = { searchQuery: '', location: '', propertyType: '', listingType: 'all', priceRange: [0, Number.MAX_SAFE_INTEGER], status: 'all', sortBy: 'available' };

const PropertiesPage: React.FC<PropertiesPageProps> = props => {
  useRouteMeta(`Properties | ${siteConfig.shortName}`, `Browse sale and rental property listings from ${siteConfig.companyName}. Filter by location, type, price and status.`, '/properties');
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...initialFilters,
    location: searchParams.get('location') ?? '',
    propertyType: searchParams.get('type') ?? '',
    priceRange: [Number(searchParams.get('min')) || 0, Number(searchParams.get('max')) || Number.MAX_SAFE_INTEGER],
  }));
  return <PropertiesScreen properties={getListings()} filterState={filters} onUpdateFilters={patch => setFilters(previous => ({ ...previous, ...patch }))} onResetFilters={() => setFilters(initialFilters)} onSelectProperty={props.onSelectProperty} onToggleSave={props.onToggleSave} savedIds={props.savedIds} onBookVisit={props.onBookVisit} onToggleCompare={props.onToggleCompare} compareList={props.compareList} onOpenCompareModal={props.onOpenCompare} />;
};

export default PropertiesPage;
