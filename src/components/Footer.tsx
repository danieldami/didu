import React from 'react';
import { ActiveScreen } from '../types';
import { siteConfig } from '../config/site';

interface FooterProps { onNavigate: (screen: ActiveScreen) => void; onOpenWhatsApp: () => void; }

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenWhatsApp }) => <footer id="site-footer" className="bg-brand-primary text-white">
  <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-12">
    <div><img src="/logo.svg" alt={siteConfig.shortName} width="230" height="48" className="h-11 w-auto brightness-0 invert" /><p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{siteConfig.tagline === 'TODO_TAGLINE' ? 'Property, thoughtfully considered.' : siteConfig.tagline}</p></div>
    <div><h2 className="text-xs font-semibold uppercase tracking-[.18em] text-brand-accent-soft">Explore</h2><div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/75">{(['properties', 'projects', 'about', 'contact'] as ActiveScreen[]).map(screen => <button key={screen} type="button" onClick={() => onNavigate(screen)} className="capitalize hover:text-white">{screen}</button>)}</div></div>
    <div><h2 className="text-xs font-semibold uppercase tracking-[.18em] text-brand-accent-soft">Contact</h2><div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/75"><button type="button" onClick={onOpenWhatsApp} className="hover:text-white">WhatsApp us</button><a href={`tel:${siteConfig.phone}`} className="hover:text-white">{siteConfig.phone}</a><a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a><span>{siteConfig.officeAddress}</span></div></div>
  </div>
  <div className="border-t border-white/15 px-5 py-5 text-center text-xs text-white/55">© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</div>
</footer>;
