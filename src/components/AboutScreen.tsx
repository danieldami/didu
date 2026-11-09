import React from 'react';
import { siteConfig } from '../config/site';

export const AboutScreen: React.FC = () => <section className="bg-brand-cream px-5 py-16 sm:px-8 lg:px-12">
  <div className="mx-auto max-w-5xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-primary">About us</p><h1 className="mt-3 font-serif-luxury text-4xl text-brand-primary sm:text-5xl">{siteConfig.companyName}</h1>
    <div className="mt-8 max-w-3xl space-y-5 text-base leading-7 text-gray-600"><p>{siteConfig.introduction}</p><p>We help clients explore property opportunities and arrange viewings. Contact us directly to learn more about a listing.</p></div>
    {siteConfig.services.length > 0 && <div className="mt-12"><h2 className="font-serif-luxury text-2xl text-brand-primary">What we do</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{siteConfig.services.map(service => <li key={service} className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-700">{service}</li>)}</ul></div>}
    {siteConfig.rcNumber.startsWith('TODO_') === false && <p className="mt-10 text-sm text-gray-500">Registration number: {siteConfig.rcNumber}</p>}
  </div>
</section>;
