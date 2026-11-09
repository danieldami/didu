import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { whatsappUrl } from '../utils/contact';

interface FloatingWhatsAppProps { compareVisible?: boolean; }

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ compareVisible = false }) => {
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(entries => setFooterVisible(entries.some(entry => entry.isIntersecting)));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  if (footerVisible) return null;
  return <a href={whatsappUrl('Hello, I would like to enquire about your properties.')} target="_blank" rel="noreferrer" aria-label={`Chat with ${siteConfig.shortName} on WhatsApp`} className={`fixed ${compareVisible ? 'bottom-24' : 'bottom-6'} right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#1f9d58] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] md:right-7`}><MessageCircle className="h-5 w-5" /><span className="hidden sm:inline">WhatsApp us</span></a>;
};
