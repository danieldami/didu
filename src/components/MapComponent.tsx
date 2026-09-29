import React from 'react';

interface MapComponentProps { lat: number; lng: number }

export const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => (
  <div className="relative h-64 w-full overflow-hidden rounded-xl border border-gray-200 bg-[#e9e7df]">
    <iframe title="Approximate Lagos property location" width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`} />
    <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-[#142A23] shadow">Approximate area shown for this demo</div>
  </div>
);
