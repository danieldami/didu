import React from 'react';
import { ActiveScreen } from '../types';
import { Landmark, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenPostProperty?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navLinks: { label: string; screen: ActiveScreen }[] = [
    { label: 'Buy', screen: 'properties' },
    { label: 'Sell/Rent', screen: 'sell-rent' },
    { label: 'Projects', screen: 'projects' },
    { label: 'About', screen: 'about' },
    { label: 'Contact', screen: 'contact' }
  ];

  return (
    <footer className="bg-[#0B2B22] text-white border-t border-[#164E3D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-8 border-b border-[#164E3D]/70 text-center md:text-left">
          
          {/* Brand Identity & Location */}
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E4D5B7] flex items-center justify-center text-[#0F382C] shadow-sm">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="text-xl font-brand-title font-bold text-white tracking-wide">
                DIDU Homes
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              A considered collection of exceptional homes across Lagos, with personal guidance from search to viewing.
            </p>
          </div>

          {/* Essential Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.screen}
                href={`?screen=${link.screen}`}
                id={`footer-link-${link.screen}`}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onNavigate(link.screen);
                  }
                }}
                className="hover:text-white transition-colors hover:underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Core Contact Info with clean dual lines */}
          <div className="text-xs text-gray-300 space-y-1.5 flex flex-col items-center md:items-end">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
              <a href="tel:+2348035550148" className="hover:text-white transition-colors">
                Amara Okafor: +234 803 555 0148
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
              <a href="tel:+2348095550182" className="hover:text-white transition-colors">
                Tunde Adebayo: +234 809 555 0182
              </a>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Mail className="w-3.5 h-3.5 text-[#C5A869]" />
              <a href="mailto:hello@diduhomes.com" className="hover:text-white transition-colors">hello@diduhomes.com</a>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>4 Uwajeh Lane, Ikoyi, Lagos</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3 text-center sm:text-left">
          <span>
            Â {new Date().getFullYear()} DIDU Homes. Managed by Amara Okafor & Tunde Adebayo. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
};
