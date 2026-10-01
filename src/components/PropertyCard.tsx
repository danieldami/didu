import React from 'react';
import { Property } from '../types';
import { formatNaira } from '../utils/format';
import { Bed, Bath, Maximize, MapPin, ShieldCheck, Heart, Eye, ArrowRight, MessageSquare } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
  onBookVisit: (property: Property) => void;
  onToggleCompare?: (property: Property) => void;
  isComparing?: boolean;
  onInquireContact?: (property: Property) => void;
  isAdminUser?: boolean;
  onDeleteProperty?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onToggleSave,
  isSaved,
  onBookVisit,
  onToggleCompare,
  isComparing,
  onInquireContact,
  isAdminUser,
  onDeleteProperty
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      
      {/* Media & Badges Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 block">
        <img
          src={property.coverImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle Gradient Overlays for top and bottom readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />

        {/* Top-Left: Price Tag Badge + Optional Exclusive tags + Status */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 pointer-events-none z-10">
          {/* Main Price Tag Badge */}
          <div className="bg-white text-[#0F382C] px-3.5 py-1.5 rounded-lg shadow-lg border border-gray-100 flex items-center gap-1">
            <span className="text-sm sm:text-base font-sans font-black tracking-normal text-[#0F382C]">
              {property.priceDisplay}
            </span>
          </div>

          {property.status && property.status !== 'Active' && property.status.toLowerCase() !== 'published' && (
            <div className={`px-2.5 py-0.5 rounded-md shadow-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
              property.status === 'Pending Approval' ? 'bg-amber-700 text-white' : 'bg-amber-600 text-white'
            }`}>
              <span>{property.status}</span>
            </div>
          )}

          {/* Secondary Badge if exclusive */}
          {(property.badge || property.isExclusive) && (
            <span className="px-2 py-0.5 rounded bg-[#C5A869] text-[#0F382C] text-[10px] font-bold tracking-wider uppercase shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#0F382C]" />
              {property.badge || 'Exclusive'}
            </span>
          )}
        </div>

        {/* Bottom Image Info: Property Type & Rate / Sq.Ft cleanly docked */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white z-10 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[#E4D5B7] border border-white/10">
              {property.propertyType}
            </span>
            {property.verified ? (
              <span 
                className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-emerald-950/85 backdrop-blur-xs text-emerald-300 border border-emerald-500/30 flex items-center gap-1" 
                title="Seller-provided details; not independently verified"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Seller reported
              </span>
            ) : property.verificationStatus === 'In Process' ? (
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-amber-950/85 backdrop-blur-xs text-amber-300 border border-amber-500/30 flex items-center gap-1">
                In Process
              </span>
            ) : null}
          </div>

          <span className="text-[11px] bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-gray-200 border border-white/10 font-mono">
            {formatNaira(property.pricePerSqFt ?? Math.round((property.price || 0) / (property.superAreaSqFt || 1)))}/sq.ft
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1 text-xs text-gray-500 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
            <span className="truncate" title={isAdminUser && property.address ? property.address : undefined}>
              {isAdminUser && property.address
                ? property.address
                : (property.locality ? (property.locality.toLowerCase().includes('lagos') ? property.locality : `${property.locality}, Lagos`) : (property.location || 'Lagos'))}
            </span>
            {isAdminUser && property.address && (
              <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
                Admin Address View
              </span>
            )}
          </div>

          {/* Property Title */}
          <h3
            id={`prop-title-${property.id}`}
            className="text-base sm:text-lg font-serif-luxury font-bold text-[#0F382C] hover:text-[#164E3D] cursor-pointer line-clamp-1 transition-colors"
          >
            <span>
              {property.title || 'Luxury Estate'}
            </span>
          </h3>

          {/* Subtitle / Tagline */}
          <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {property.tagline || property.description || ''}
          </p>

          {/* Key Specs Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-gray-100 text-gray-700">
            {(property.bedrooms || 0) > 0 ? (
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Bed className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{property.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Commercial</span>
              </div>
            )}

            {(property.bathrooms || 0) > 0 && (
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Bath className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs font-medium">
              <Maximize className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{(property.superAreaSqFt || 0).toLocaleString('en-NG')} sq.ft</span>
            </div>
          </div>

          {/* Highlights Mini Pills */}
          <div className="flex items-center gap-1.5 flex-wrap mb-2">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FAF8F5] text-[#0F382C] border border-[#0F382C]/10">
              {property.possession}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-gray-50 text-gray-600 border border-gray-200">
              {property.furnishing}
            </span>
            {property.gatedSecurity && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                24/7 Gated
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-100">
          <a href={`?property=${property.id}`} onClick={(e) => { if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) { e.preventDefault(); onSelect(property); } }} className="text-xs font-semibold bg-[#0F382C] hover:bg-[#164E3D] text-white px-3.5 py-2 rounded shadow-xs flex items-center gap-1"><span>View</span><ArrowRight className="w-3.5 h-3.5" /></a>
          <a href={`https://wa.me/2349125882627?text=${encodeURIComponent(`Hi, I'm interested in ${property.title} (${property.priceDisplay})`)}`} target="_blank" rel="noopener" className="flex-1 py-2 bg-[#25D366] hover:bg-[#1ebd54] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"><MessageSquare className="w-3.5 h-3.5" /><span>Chat on WhatsApp</span></a>
        </div>
      </div>
    </div>
  );
};
