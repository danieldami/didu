import React, { useEffect } from 'react';
import { Property } from '../types';
import { formatNaira } from '../utils/format';
import { X, MapPin, BedDouble, Bath, CarFront, Ruler, MessageCircle, Heart } from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onBookVisit: (property: Property) => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose, onBookVisit, onToggleSave, isSaved }) => {
  useEffect(() => {
    if (!property) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [property, onClose]);
  if (!property) return null;
  return <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-5" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <article role="dialog" aria-modal="true" aria-label={property.title} className="relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl">
      <button type="button" onClick={onClose} aria-label="Close property details" className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow"><X className="h-5 w-5" /></button>
      <div className="grid md:grid-cols-[1.1fr_.9fr]"><img src={property.coverImage} alt={property.title} className="aspect-[4/3] w-full object-cover md:h-full md:min-h-[520px]" /><div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-primary">{property.propertyType} · {property.listingType}</p><h2 className="mt-2 font-serif-luxury text-3xl text-brand-primary">{property.title}</h2></div><button type="button" onClick={() => onToggleSave(property.id)} aria-label={isSaved ? 'Remove from saved homes' : 'Save home'} className="rounded-full border border-gray-200 p-2.5 text-brand-primary"><Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} /></button></div>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4" />{property.location}</p><p className="mt-6 text-2xl font-bold text-brand-primary">{formatNaira(property.price)}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-600">{property.bedrooms > 0 && <span className="flex items-center gap-2"><BedDouble className="h-4 w-4" />{property.bedrooms} bedrooms</span>}{property.bathrooms > 0 && <span className="flex items-center gap-2"><Bath className="h-4 w-4" />{property.bathrooms} bathrooms</span>}{property.parkingSpots > 0 && <span className="flex items-center gap-2"><CarFront className="h-4 w-4" />{property.parkingSpots} parking</span>}{property.superAreaSqFt > 0 && <span className="flex items-center gap-2"><Ruler className="h-4 w-4" />{property.superAreaSqFt.toLocaleString()} sq ft</span>}</div>
        <p className="mt-6 text-sm leading-7 text-gray-600">{property.description}</p>
        {property.highlights.length > 0 && <><h3 className="mt-6 font-semibold text-brand-primary">Property highlights</h3><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">{property.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></>}
        <button type="button" onClick={() => onBookVisit(property)} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3.5 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" />Book an inspection</button>
      </div></div>
    </article>
  </div>;
};
