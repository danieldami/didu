import React from 'react';
import { CalendarCheck2, FileCheck2, ReceiptText } from 'lucide-react';
import { siteConfig } from '../config/site';

interface WhyChubankProps { onContactAdvisory: () => void; }

const commitments = [
  { icon: FileCheck2, title: 'Document checks', description: 'We make document review status clear on each listing. Listings marked “Documents checked” have been reviewed.' },
  { icon: CalendarCheck2, title: 'Inspect before deciding', description: 'We arrange property inspections so you can see a place before moving forward.' },
  { icon: ReceiptText, title: 'Clear pricing', description: 'We show each listed price upfront and include a pricing period where one applies.' },
];

export const WhyChubank: React.FC<WhyChubankProps> = ({ onContactAdvisory }) => <section className="relative overflow-hidden bg-brand-primary py-16 text-white sm:py-24">
  <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-primary-light opacity-60 blur-3xl" />
  <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[.22em] text-brand-accent-soft">How we work</p><h2 className="mt-3 font-serif-luxury text-3xl sm:text-4xl">A clear way to move forward.</h2><p className="mt-4 text-sm leading-6 text-white/75">{siteConfig.shortName} helps you understand a property, arrange a visit and decide what works for you.</p></div>
    <div className="mt-12 grid gap-4 md:grid-cols-3">{commitments.map(({ icon: Icon, title, description }) => <article key={title} className="rounded-2xl border border-white/15 bg-white/[.06] p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-accent-soft"><Icon className="h-5 w-5" /></span><h3 className="mt-5 font-serif-luxury text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-white/70">{description}</p></article>)}</div>
    <div className="mt-10 text-center"><button type="button" onClick={onContactAdvisory} className="rounded-full bg-brand-accent-soft px-6 py-3 text-sm font-semibold text-brand-primary">Talk to our team</button></div>
  </div>
</section>;
