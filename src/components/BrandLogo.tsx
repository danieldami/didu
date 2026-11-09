import React from 'react';
import { siteConfig } from '../config/site';

interface BrandLogoProps {
  onDark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ onDark = false }) => (
  <span className="inline-flex items-center gap-2.5" aria-label={siteConfig.companyName}>
    <span className={onDark ? 'rounded-md bg-white p-1' : ''}>
      <img src="/chubank-skyline.png" alt="" aria-hidden="true" className="h-11 w-11 object-contain" />
    </span>
    <span className={`flex flex-col text-right leading-none ${onDark ? 'text-white' : 'text-brand-primary'}`}>
      <span className="font-serif-luxury text-[17px] font-semibold tracking-[-.035em] sm:text-[19px]">Chubank Property</span>
      <span className={`mt-1 text-[8px] font-semibold uppercase tracking-[.2em] ${onDark ? 'text-white/75' : 'text-brand-primary/70'}`}>Ventures Limited</span>
    </span>
  </span>
);
