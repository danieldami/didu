import React, { useEffect } from 'react';
import type { Property } from '../types';
import { formatNaira } from '../utils/format';
import { siteConfig } from '../config/site';
import { Bath, BedDouble, CarFront, Heart, MapPin, MessageCircle, Ruler, X } from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onBookVisit: (property: Property) => void;
  onToggleSave: (slug: string) => void;
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
  const contactMessage = `Hello, I would like to inspect ${property.title}: ${window.location.origin}/properties/${property.slug}`;
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(contactMessage)}`;
  return <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-5" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <article role="dialog" aria-modal="true" aria-label={property.title} className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl">
      <button type="button" onClick={onClose} aria-label="Close property details" className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow"><X className="h-5 w-5" /></button>
      <div className="grid md:grid-cols-[1.1fr_.9fr]"><div className="bg-[#eeece5]"><img src={property.coverImage} alt={property.title} className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full md:min-h-[560px]" />{property.images.length > 1 && <div className="grid grid-cols-4 gap-2 p-2">{property.images.slice(1).map(image => <img key={image} src={image} alt="" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />)}</div>}</div><div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-primary">{property.propertyType} · {property.listingType === 'sale' ? 'For sale' : 'For rent'}</p><h1 className="mt-2 font-serif-luxury text-3xl text-brand-primary">{property.title}</h1></div><button type="button" onClick={() => onToggleSave(property.slug)} aria-label={isSaved ? 'Remove from saved properties' : 'Save property'} className="rounded-full border border-gray-200 p-2.5 text-brand-primary"><Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} /></button></div>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4" />{property.location}, {property.state}</p><div className="mt-4 flex flex-wrap gap-2">{property.status !== 'available' && <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-bold uppercase text-white">{property.status === 'under-offer' ? 'Under offer' : property.status}</span>}{property.documentsVerified && <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">Documents checked</span>}</div>
        <p className="mt-6 text-2xl font-bold text-brand-primary">{formatNaira(property.price)}{property.pricePeriod ? <span className="ml-2 text-sm font-medium">{property.pricePeriod}</span> : null}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-600">{property.bedrooms !== undefined && <span className="flex items-center gap-2"><BedDouble className="h-4 w-4" />{property.bedrooms} bedrooms</span>}{property.bathrooms !== undefined && <span className="flex items-center gap-2"><Bath className="h-4 w-4" />{property.bathrooms} bathrooms</span>}{property.parking !== undefined && <span className="flex items-center gap-2"><CarFront className="h-4 w-4" />{property.parking} parking</span>}{property.sizeSqm !== undefined && <span className="flex items-center gap-2"><Ruler className="h-4 w-4" />{property.sizeSqm.toLocaleString()} m²</span>}{property.plotSize && <span>{property.plotSize}</span>}</div>
        <p className="mt-6 text-sm leading-7 text-gray-600">{property.description}</p>
        {property.highlights.length > 0 && <><h2 className="mt-6 font-semibold text-brand-primary">Property highlights</h2><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">{property.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></>}
        {property.titleDocuments.length > 0 && <><h2 className="mt-6 font-semibold text-brand-primary">Title documents</h2><ul className="mt-2 flex flex-wrap gap-2">{property.titleDocuments.map(document => <li key={document} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">{document}</li>)}</ul></>}
        <button type="button" onClick={() => onBookVisit(property)} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3.5 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" />Book an inspection</button>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-2 flex w-full items-center justify-center rounded-full border border-brand-primary/30 px-5 py-3 text-sm font-semibold text-brand-primary">Chat on WhatsApp</a>
      </div></div>
    </article>
  </div>;
};
