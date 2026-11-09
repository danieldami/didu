import React from 'react';
import { ArrowUpRight, BedDouble, Heart, MapPin, Ruler } from 'lucide-react';
import type { Property } from '../types';
import { formatNaira } from '../utils/format';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onToggleSave: (slug: string) => void;
  isSaved: boolean;
  onBookVisit: (property: Property) => void;
  onToggleCompare?: (property: Property) => void;
  isComparing?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect, onToggleSave, isSaved, onBookVisit, onToggleCompare, isComparing = false }) => <article className="group overflow-hidden rounded-2xl border border-[#e7e5de] bg-white shadow-sm transition-shadow hover:shadow-xl">
  <div className="relative"><button type="button" onClick={() => onSelect(property)} className="block w-full text-left"><img src={property.coverImage} alt={property.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></button>
    <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-brand-primary shadow">{formatNaira(property.price)}{property.pricePeriod ? <span className="ml-1 text-[10px] font-medium">{property.pricePeriod}</span> : null}</div>
    {property.status !== 'available' && <span className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${property.status === 'sold' ? 'bg-gray-800' : 'bg-amber-700'}`}>{property.status === 'under-offer' ? 'Under offer' : property.status}</span>}
    <button type="button" onClick={() => onToggleSave(property.slug)} aria-label={isSaved ? 'Remove from saved homes' : 'Save property'} className="absolute right-3 top-3 rounded-full bg-white/95 p-2.5 text-brand-primary shadow"><Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} /></button>
  </div>
  <div className="p-5"><div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[.14em] text-brand-primary"><span>{property.propertyType} · {property.listingType}</span>{property.documentsVerified && <span>Documents checked</span>}</div>
    <button type="button" onClick={() => onSelect(property)} className="mt-2 text-left"><h2 className="font-serif-luxury text-xl text-[#24382d]">{property.title}</h2></button>
    <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-3.5 w-3.5" />{property.location}, {property.state}</p>
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600">{property.bedrooms !== undefined && <span className="inline-flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{property.bedrooms} beds</span>}{property.sizeSqm !== undefined && <span className="inline-flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{property.sizeSqm.toLocaleString()} m²</span>}{property.plotSize && <span>{property.plotSize}</span>}</div>
    <div className="mt-5 flex gap-2"><button type="button" onClick={() => onBookVisit(property)} className="flex-1 rounded-full bg-brand-primary px-3 py-2.5 text-xs font-semibold text-white hover:bg-brand-primary-light">Book inspection</button><button type="button" onClick={() => onSelect(property)} aria-label="View property details" className="rounded-full border border-gray-200 px-3 text-brand-primary hover:bg-gray-50"><ArrowUpRight className="h-4 w-4" /></button></div>
    {onToggleCompare && <button type="button" onClick={() => onToggleCompare(property)} className={`mt-3 text-xs ${isComparing ? 'font-semibold text-brand-primary' : 'text-gray-500 hover:text-brand-primary'}`}>{isComparing ? 'Remove from compare' : 'Compare property'}</button>}
  </div>
</article>;
