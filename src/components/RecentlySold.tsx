import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Property } from '../types';
import { formatShortNaira } from '../utils/format';

interface RecentlySoldProps { properties: Property[]; onSelect: (property: Property) => void; }

export const RecentlySold: React.FC<RecentlySoldProps> = ({ properties, onSelect }) => <section className="border-y border-[#e6e3dc] bg-white py-14">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-primary">Recently sold</p><h2 className="mt-2 font-serif-luxury text-2xl text-brand-primary sm:text-3xl">A record of completed listings</h2></div><span className="hidden text-xs text-gray-500 sm:block">Past availability</span></div>
    {properties.length === 0 ? <p className="text-sm text-gray-500">Recently sold properties will be shown here.</p> : <div className="flex snap-x gap-4 overflow-x-auto pb-2">{properties.map(property => <button key={property.slug} type="button" onClick={() => onSelect(property)} className="group relative w-[250px] shrink-0 snap-start overflow-hidden rounded-xl text-left sm:w-[300px]"><img src={property.coverImage} alt={property.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-gray-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Sold</span><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-14 text-white"><span className="block text-sm font-semibold">{property.title}</span><span className="mt-1 flex items-center justify-between text-xs text-white/80"><span>{property.location}</span><span>{formatShortNaira(property.price)} <ArrowRight className="ml-1 inline h-3 w-3" /></span></span></span></button>)}</div>}
  </div>
</section>;
