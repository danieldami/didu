import React from 'react';
import { X } from 'lucide-react';
import type { Property } from '../types';
import { formatNaira } from '../utils/format';

interface CompareModalProps { isOpen: boolean; onClose: () => void; compareList: Property[]; onRemoveFromCompare: (slug: string) => void; onSelectProperty: (property: Property) => void; }

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, compareList, onRemoveFromCompare, onSelectProperty }) => {
  if (!isOpen) return null;
  const rows: { label: string; value: (property: Property) => string }[] = [
    { label: 'Price', value: property => `${formatNaira(property.price)}${property.pricePeriod ? ` ${property.pricePeriod}` : ''}` },
    { label: 'Status', value: property => property.status.replace('-', ' ') },
    { label: 'Type', value: property => `${property.propertyType} · ${property.listingType}` },
    { label: 'Location', value: property => `${property.location}, ${property.state}` },
    { label: 'Bedrooms', value: property => property.bedrooms === undefined ? '—' : String(property.bedrooms) },
    { label: 'Bathrooms', value: property => property.bathrooms === undefined ? '—' : String(property.bathrooms) },
    { label: 'Size', value: property => property.sizeSqm === undefined ? property.plotSize || '—' : `${property.sizeSqm.toLocaleString()} m²` },
    { label: 'Documents checked', value: property => property.documentsVerified ? 'Yes' : 'No' },
  ];
  return <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/60 p-4" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-label="Compare properties" className="max-h-[90vh] w-full max-w-6xl overflow-auto rounded-2xl bg-white p-5 sm:p-7"><header className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-primary">Property comparison</p><h2 className="mt-1 font-serif-luxury text-2xl text-brand-primary">Compare selected properties</h2></div><button type="button" onClick={onClose} aria-label="Close comparison"><X className="h-5 w-5" /></button></header>
    {compareList.length === 0 ? <p className="py-12 text-center text-gray-500">Choose properties to compare.</p> : <div className="mt-6 overflow-x-auto"><div className="min-w-[700px]"><div className="grid gap-3" style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(180px, 1fr))` }}><div />{compareList.map(property => <article key={property.slug} className="overflow-hidden rounded-xl border border-gray-100"><button type="button" onClick={() => onSelectProperty(property)} className="block w-full text-left"><img src={property.coverImage} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" /><span className="block p-3 font-semibold text-brand-primary">{property.title}</span></button><button type="button" onClick={() => onRemoveFromCompare(property.slug)} className="px-3 pb-3 text-xs text-gray-500 hover:text-rose-600">Remove</button></article>)}</div>
      <div className="mt-4 divide-y divide-gray-100">{rows.map(row => <div key={row.label} className="grid gap-3 py-3" style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(180px, 1fr))` }}><span className="text-xs font-semibold text-gray-500">{row.label}</span>{compareList.map(property => <span key={property.slug} className="text-sm capitalize text-gray-700">{row.value(property)}</span>)}</div>)}</div></div></div>}
  </section></div>;
};
