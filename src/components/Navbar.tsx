import React, { useState, useRef, useEffect } from 'react';
import { ActiveScreen, UserProfile } from '../types';
import { Menu, X, Building2, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

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
  activeScreen,
  onNavigate,
  onOpenLogin,
  onOpenPostProperty,
  user,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks: { label: string; screen: ActiveScreen }[] = [
    { label: 'Buy', screen: 'properties' },
    { label: 'Sell/Rent', screen: 'sell-rent' },
    { label: 'Projects', screen: 'projects' },
    { label: 'About', screen: 'about' },
    { label: 'Contact', screen: 'contact' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0F382C] text-white shadow-md border-b border-[#164E3D]/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* DIDU Homes brand */}
          <a
            href="?screen=home"
            id="brand-logo-btn"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                onNavigate('home');
              }
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <img src="/didu-homes-logo.svg" alt="DIDU Homes" className="h-12 w-auto" />
          </a>

          {/* MIDDLE: Standard navigation links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => {
              const isActive = activeScreen === link.screen;
              return (
                <a
                  key={link.screen}
                  href={`?screen=${link.screen}`}
                  id={`nav-link-${link.screen}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      onNavigate(link.screen);
                    }
                  }}
                  className="relative px-3.5 py-2.5 text-sm xl:text-base font-medium tracking-normal transition-colors group focus:outline-none"
                >
                  <span className={isActive ? 'text-white font-bold' : 'text-white/80 group-hover:text-white'}>
                    {link.label}
                  </span>
                  
                  {/* Underline ONLY the active nav tab */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-white rounded-full shadow-xs" />
                  )}
                </a>
              );
            })}

            {/* If logged in, also show direct 'My Dashboard' link in main nav if active */}
            {user && (
              <a
                href="?screen=dashboard"
                id="nav-link-dashboard"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onNavigate('dashboard');
                  }
                }}
                className="relative px-3.5 py-2.5 text-sm xl:text-base font-medium tracking-normal transition-colors group focus:outline-none text-[#E4D5B7] hover:text-white"
              >
                <span className={activeScreen === 'dashboard' ? 'text-white font-bold' : 'text-[#E4D5B7] font-semibold'}>
                  Dashboard
                </span>
                {activeScreen === 'dashboard' && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-white rounded-full shadow-xs" />
                )}
              </a>
            )}
          </nav>

          {/* RIGHT: Header Auth & Actions */}
          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#C5A869] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B2B22] border-t border-[#164E3D] px-4 pt-3 pb-6 space-y-2">
          
          {/* User badge in mobile menu if logged in */}
          {user && (
            <div className="p-3 bg-[#0F382C] rounded-xl flex items-center justify-between border border-[#164E3D] mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#C5A869]"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{user.name}</h4>
                  <p className="text-[10px] text-[#E4D5B7] uppercase font-semibold">
                    {user.role === 'owner' ? 'Property Owner' : 'Buyer'}
                  </p>
                </div>
              </div>
              <a
                href="?screen=dashboard"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onNavigate('dashboard');
                    setMobileMenuOpen(false);
                  }
                }}
                className="bg-[#164E3D] text-[#E4D5B7] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                Dashboard
              </a>
            </div>
          )}

          {navLinks.map((link) => {
            const isActive = activeScreen === link.screen;
            return (
              <a
                key={link.screen}
                href={`?screen=${link.screen}`}
                id={`mobile-nav-${link.screen}`}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onNavigate(link.screen);
                    setMobileMenuOpen(false);
                  }
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                  isActive ? 'bg-[#0F382C] text-white font-bold border-l-4 border-white shadow-xs' : 'text-white/80 hover:bg-[#0F382C]/50 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
              </a>
            );
          })}

          {user && (
            <a
              href="?screen=dashboard"
              id="mobile-nav-dashboard"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                activeScreen === 'dashboard' ? 'bg-[#0F382C] text-white font-bold border-l-4 border-white shadow-xs' : 'text-[#E4D5B7] hover:bg-[#0F382C]/50'
              }`}
            >
              <span>My Dashboard</span>
              <LayoutDashboard className="w-4 h-4 text-[#E4D5B7]" />
            </a>
          )}

        </div>
      )}
    </header>
  );
};
