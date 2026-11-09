import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '../config/site';
import { submitEnquiry } from '../services/enquiry';

const isConfigured = (value: string): boolean => value.trim().length > 0 && !value.startsWith('TODO_');
const placeholderCopy = 'Contact information to be confirmed.';

export const ContactScreen: React.FC = () => {
  const [mailFallback, setMailFallback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const whatsappMessage = `Hello, I would like to enquire about properties from ${siteConfig.shortName}.`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fallback = submitEnquiry({
      name: String(form.get('name') ?? ''),
      phone: String(form.get('phone') ?? ''),
      email: String(form.get('email') ?? ''),
      message: String(form.get('message') ?? ''),
    });
    setMailFallback(fallback);
    setSubmitted(true);
  };

  return <section className="bg-brand-cream px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl">
    <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-primary">Contact</p><h1 className="mt-3 font-serif-luxury text-4xl text-brand-primary sm:text-5xl">Let’s talk property.</h1><p className="mt-4 max-w-2xl leading-7 text-gray-600">Ask us about a listing, discuss your requirements or arrange an inspection.</p>
    <div className="mt-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
      <div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-2xl border border-gray-200 bg-white p-5"><MessageCircle className="h-5 w-5 text-brand-primary" /><h2 className="mt-3 font-semibold">WhatsApp</h2><p className="mt-1 text-sm text-gray-600">{isConfigured(siteConfig.whatsappNumber) ? siteConfig.whatsappNumber : placeholderCopy}</p></a>
        <div className="rounded-2xl border border-gray-200 bg-white p-5"><Phone className="h-5 w-5 text-brand-primary" /><h2 className="mt-3 font-semibold">Phone</h2>{isConfigured(siteConfig.phone) ? <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-sm text-gray-600">{siteConfig.phone}</a> : <p className="mt-1 text-sm text-gray-600">{placeholderCopy}</p>}</div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5"><Mail className="h-5 w-5 text-brand-primary" /><h2 className="mt-3 font-semibold">Email</h2>{isConfigured(siteConfig.email) ? <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-sm text-gray-600">{siteConfig.email}</a> : <p className="mt-1 text-sm text-gray-600">{placeholderCopy}</p>}</div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5"><MapPin className="h-5 w-5 text-brand-primary" /><h2 className="mt-3 font-semibold">Office</h2><p className="mt-1 text-sm text-gray-600">{isConfigured(siteConfig.officeAddress) ? siteConfig.officeAddress : placeholderCopy}</p><p className="mt-2 text-sm text-gray-500">{isConfigured(siteConfig.officeHours) ? siteConfig.officeHours : ''}</p></div>
      </div></div>
      <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="font-serif-luxury text-2xl text-brand-primary">Send an enquiry</h2><p className="mt-2 text-sm text-gray-600">Submitting opens WhatsApp with your message ready to send.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium text-gray-700">Your name<input required name="name" autoComplete="name" className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-brand-primary" /></label><label className="text-sm font-medium text-gray-700">Phone number<input required name="phone" type="tel" autoComplete="tel" className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-brand-primary" /></label><label className="text-sm font-medium text-gray-700 sm:col-span-2">Email (optional)<input name="email" type="email" autoComplete="email" className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-brand-primary" /></label><label className="text-sm font-medium text-gray-700 sm:col-span-2">How can we help?<textarea required name="message" rows={4} className="mt-1.5 w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-brand-primary" /></label></div>
        <button type="submit" className="mt-5 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white">Continue to WhatsApp</button>
        {submitted && <div role="status" className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-900"><p>Your enquiry details are ready in WhatsApp. Please press send to contact us.</p><a href={mailFallback} className="mt-2 inline-block font-semibold underline">If WhatsApp does not open, email your enquiry instead.</a></div>}
      </form>
    </div>
    {isConfigured(siteConfig.mapEmbedUrl) && <iframe title="Office location map" src={siteConfig.mapEmbedUrl} loading="lazy" className="mt-8 h-80 w-full rounded-2xl border-0" referrerPolicy="no-referrer-when-downgrade" />}
  </div></section>;
};
