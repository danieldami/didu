import React from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '../config/site';

export const ContactScreen: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello, I would like to enquire about your properties.')}`;
  return <section className="bg-brand-cream px-5 py-16 sm:px-8 lg:px-12">
    <div className="mx-auto max-w-5xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-primary">Contact</p><h1 className="mt-3 font-serif-luxury text-4xl text-brand-primary sm:text-5xl">Let’s talk property.</h1><p className="mt-4 max-w-2xl leading-7 text-gray-600">Contact our team to ask about a listing, discuss your requirements or arrange an inspection.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-gray-200 bg-white p-6"><MessageCircle className="h-6 w-6 text-brand-primary" /><h2 className="mt-4 font-semibold">WhatsApp</h2><p className="mt-1 text-sm text-gray-600">{siteConfig.whatsappNumber}</p></a>
        <a href={`tel:${siteConfig.phone}`} className="rounded-2xl border border-gray-200 bg-white p-6"><Phone className="h-6 w-6 text-brand-primary" /><h2 className="mt-4 font-semibold">Phone</h2><p className="mt-1 text-sm text-gray-600">{siteConfig.phone}</p></a>
        <a href={`mailto:${siteConfig.email}`} className="rounded-2xl border border-gray-200 bg-white p-6"><Mail className="h-6 w-6 text-brand-primary" /><h2 className="mt-4 font-semibold">Email</h2><p className="mt-1 text-sm text-gray-600">{siteConfig.email}</p></a>
        <div className="rounded-2xl border border-gray-200 bg-white p-6"><MapPin className="h-6 w-6 text-brand-primary" /><h2 className="mt-4 font-semibold">Office</h2><p className="mt-1 text-sm text-gray-600">{siteConfig.officeAddress}</p><p className="mt-2 text-sm text-gray-500">{siteConfig.officeHours}</p></div>
      </div>
      {siteConfig.mapEmbedUrl.startsWith('https://') && <iframe title="Office location map" src={siteConfig.mapEmbedUrl} loading="lazy" className="mt-8 h-80 w-full rounded-2xl border-0" referrerPolicy="no-referrer-when-downgrade" />}
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white">Send an enquiry on WhatsApp</a>
    </div>
  </section>;
};
