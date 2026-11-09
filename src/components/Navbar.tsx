import React, { useState } from 'react';
import { ActiveScreen, UserProfile } from '../types';
import { ArrowUpRight, Heart, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenLogin: () => void;
  onOpenPostProperty: () => void;
  user: UserProfile | null;
  onLogout: () => void;
  savedCount?: number;
  onOpenSaved?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen, onNavigate, onOpenLogin, onOpenPostProperty,
  user, onLogout, savedCount = 0, onOpenSaved
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks: { label: string; screen: ActiveScreen }[] = [
    { label: 'Buy', screen: 'properties' },
    { label: 'Projects', screen: 'projects' },
    { label: 'Our approach', screen: 'about' },
    { label: 'Contact', screen: 'contact' },
  ];
  const go = (screen: ActiveScreen) => { onNavigate(screen); setMobileMenuOpen(false); };

  return (
    <header className="sticky top-0 z-50 border-b border-[#eae8e1] bg-[#fbfaf7]/95 text-[#1c2a23] shadow-[0_4px_20px_rgba(22,39,30,.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="?screen=home" onClick={event => { event.preventDefault(); go('home'); }} aria-label="Chubank Property home" className="flex shrink-0 items-center">
          <img src="/logo.svg" alt="Chubank Property" className="h-11 w-auto" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map(link => {
            const isActive = activeScreen === link.screen;
            return <a key={link.screen} href={`?screen=${link.screen}`} onClick={event => { event.preventDefault(); go(link.screen); }} className={`rounded-full px-4 py-2.5 text-[13px] transition-colors ${isActive ? 'bg-[#eaece6] font-semibold text-[#17372c]' : 'text-[#626a63] hover:bg-[#f0efe9] hover:text-[#17372c]'}`}>{link.label}</a>;
          })}
          {user && <button type="button" onClick={() => go('dashboard')} className={`rounded-full px-4 py-2.5 text-[13px] transition-colors ${activeScreen === 'dashboard' ? 'bg-[#eaece6] font-semibold text-[#17372c]' : 'text-[#626a63] hover:bg-[#f0efe9]'}`}>Dashboard</button>}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button type="button" onClick={onOpenSaved} aria-label={`Saved homes, ${savedCount}`} className="relative rounded-full p-2.5 text-[#465249] transition-colors hover:bg-[#f0efe9] hover:text-[#17372c]">
            <Heart className="h-[18px] w-[18px]" />
            {savedCount > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#17372c] px-1 text-[9px] font-bold text-white">{savedCount}</span>}
          </button>
          <button type="button" onClick={onOpenPostProperty} className="rounded-full border border-[#d7d9d1] px-4 py-2.5 text-[13px] font-semibold text-[#36433a] transition-colors hover:border-[#17372c] hover:bg-white">List your property</button>
          {user ? <div className="ml-1 flex items-center gap-2">
            <button type="button" onClick={() => go('dashboard')} className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#e6e9e2] text-sm font-semibold text-[#17372c]" aria-label="Open dashboard">{user.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : user.name.slice(0, 1).toUpperCase()}</button>
            <button type="button" onClick={onLogout} className="text-xs text-[#747a73] hover:text-[#17372c]">Sign out</button>
          </div> : <button type="button" onClick={onOpenLogin} className="rounded-full bg-[#17372c] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#24513e]">Sign in</button>}
        </div>

        <button type="button" onClick={() => setMobileMenuOpen(value => !value)} className="rounded-full p-2 text-[#17372c] hover:bg-[#f0efe9] md:hidden" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && <div className="border-t border-[#eae8e1] bg-[#fbfaf7] px-5 pb-6 pt-3 md:hidden">
        <nav className="flex flex-col" aria-label="Mobile navigation">
          {navLinks.map(link => <button key={link.screen} type="button" onClick={() => go(link.screen)} className={`flex items-center justify-between border-b border-[#eeece6] px-1 py-4 text-left text-[15px] ${activeScreen === link.screen ? 'font-semibold text-[#17372c]' : 'text-[#545d55]'}`}>{link.label}<ArrowUpRight className="h-4 w-4 text-[#9b9e96]" /></button>)}
          {user && <button type="button" onClick={() => go('dashboard')} className="border-b border-[#eeece6] px-1 py-4 text-left text-[15px] text-[#545d55]">My dashboard</button>}
        </nav>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => { onOpenSaved?.(); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 rounded-full border border-[#d7d9d1] py-3 text-sm font-medium text-[#36433a]"><Heart className="h-4 w-4" /> Saved {savedCount > 0 && `(${savedCount})`}</button>
          <button type="button" onClick={() => { onOpenPostProperty(); setMobileMenuOpen(false); }} className="rounded-full bg-[#17372c] py-3 text-sm font-semibold text-white">List a property</button>
        </div>
        {user ? <button type="button" onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="mt-4 w-full py-2 text-center text-sm text-[#70776f]">Sign out</button> : <button type="button" onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }} className="mt-4 w-full py-2 text-center text-sm font-semibold text-[#17372c]">Sign in or create an account</button>}
      </div>}
    </header>
  );
};
