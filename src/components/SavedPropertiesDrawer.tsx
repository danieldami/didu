import React from 'react';
import { Heart, X } from 'lucide-react';
import type { Property } from '../types';
import { formatNaira } from '../utils/format';

interface SavedPropertiesDrawerProps { isOpen: boolean; onClose: () => void; savedProperties: Property[]; onRemove: (slug: string) => void; onSelectProperty: (property: Property) => void; }

export const SavedPropertiesDrawer: React.FC<SavedPropertiesDrawerProps> = ({ isOpen, onClose, savedProperties, onRemove, onSelectProperty }) => isOpen ? <div className="fixed inset-0 z-[80] bg-black/40" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
  <aside role="dialog" aria-modal="true" aria-label="Saved properties" className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl"><header className="flex items-center justify-between border-b border-gray-100 p-5"><div className="flex items-center gap-2"><Heart className="h-5 w-5 text-brand-primary" /><h2 className="font-serif-luxury text-xl text-brand-primary">Saved properties</h2></div><button type="button" onClick={onClose} aria-label="Close saved properties"><X className="h-5 w-5" /></button></header>
    <div className="flex-1 space-y-3 overflow-y-auto p-4">{savedProperties.length === 0 ? <p className="py-12 text-center text-sm text-gray-500">You have not saved any properties yet.</p> : savedProperties.map(property => <article key={property.slug} className="flex gap-3 rounded-xl border border-gray-100 p-3"><button type="button" onClick={() => onSelectProperty(property)} className="flex min-w-0 flex-1 gap-3 text-left"><img src={property.coverImage} alt="" loading="lazy" className="h-20 w-24 shrink-0 rounded-lg object-cover" /><span className="min-w-0"><span className="block truncate font-semibold text-brand-primary">{property.title}</span><span className="mt-1 block text-xs text-gray-500">{property.location}, {property.state}</span><span className="mt-2 block text-sm font-bold">{formatNaira(property.price)}</span></span></button><button type="button" onClick={() => onRemove(property.slug)} className="self-start p-2 text-gray-400 hover:text-rose-600" aria-label={`Remove ${property.title}`}><X className="h-4 w-4" /></button></article>)}</div>
  </aside>
</div> : null;
