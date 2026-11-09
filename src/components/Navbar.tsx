import React, { useState } from 'react';
import { ActiveScreen } from '../types';
import { Menu, MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../config/site';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenWhatsApp: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeScreen, onNavigate, onOpenWhatsApp, onOpenSaved, savedCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links: { label: string; screen: ActiveScreen }[] = [
    { label: 'Properties', screen: 'properties' }, { label: 'Projects', screen: 'projects' },
    { label: 'About', screen: 'about' }, { label: 'Contact', screen: 'contact' },
  ];
  const go = (screen: ActiveScreen) => { onNavigate(screen); setMenuOpen(false); };
  return <header className="sticky top-0 z-50 border-b border-[#e8e6df] bg-brand-cream/95 text-[#1c2a23] shadow-sm backdrop-blur-xl">
    <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
      <a href="/" onClick={event => { event.preventDefault(); go('home'); }} aria-label={`${siteConfig.shortName} home`}><img src="/logo.svg" alt={siteConfig.shortName} width="230" height="48" className="h-11 w-auto" /></a>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">{links.map(link => <button key={link.screen} type="button" onClick={() => go(link.screen)} className={`rounded-full px-4 py-2.5 text-[13px] transition-colors ${activeScreen === link.screen ? 'bg-[#eaece6] font-semibold text-brand-primary' : 'text-[#626a63] hover:bg-white'}`}>{link.label}</button>)}</nav>
      <div className="hidden items-center gap-2 md:flex">
        <button type="button" onClick={onOpenSaved} className="rounded-full px-3 py-2.5 text-[13px] font-medium text-[#536056] hover:bg-white">Saved{savedCount > 0 ? ` (${savedCount})` : ''}</button>
        <button type="button" onClick={onOpenWhatsApp} className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 px-4 py-2.5 text-[13px] font-semibold text-brand-primary hover:bg-white"><MessageCircle className="h-4 w-4" /> WhatsApp us</button>
        <button type="button" onClick={onOpenWhatsApp} className="rounded-full bg-brand-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-primary-light">Book an inspection</button>
      </div>
      <button type="button" onClick={() => setMenuOpen(value => !value)} className="rounded-full p-2 text-brand-primary hover:bg-white md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
    </div>
    {menuOpen && <div className="border-t border-[#e8e6df] bg-brand-cream px-5 pb-6 pt-3 md:hidden"><nav className="flex flex-col" aria-label="Mobile navigation">{links.map(link => <button key={link.screen} type="button" onClick={() => go(link.screen)} className="border-b border-[#eeece6] px-1 py-4 text-left text-[15px] text-[#545d55]">{link.label}</button>)}</nav><button type="button" onClick={() => { onOpenSaved(); setMenuOpen(false); }} className="mt-4 w-full rounded-full border border-brand-primary/25 py-3 text-sm font-semibold text-brand-primary">Saved homes{savedCount > 0 ? ` (${savedCount})` : ''}</button><button type="button" onClick={() => { onOpenWhatsApp(); setMenuOpen(false); }} className="mt-2 w-full rounded-full bg-brand-primary py-3 text-sm font-semibold text-white">Book an inspection</button></div>}
  </header>;
};
