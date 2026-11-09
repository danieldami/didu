import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/site';
import { whatsappUrl } from '../utils/contact';

const processSteps = [
  { title: 'Enquiry', description: 'We listen to your requirements and answer your initial questions.' },
  { title: 'Inspection', description: 'We arrange a visit so you can see the property for yourself.' },
  { title: 'Document verification', description: 'We review the available title documents and explain their review status.' },
  { title: 'Negotiation', description: 'We help both parties discuss the proposed terms clearly.' },
  { title: 'Completion', description: 'We coordinate the agreed steps toward completing the transaction.' },
  { title: 'Handover', description: 'We support the handover once the transaction has been completed.' },
];

const AboutScreen: React.FC = () => {
  const introductionIsPlaceholder = siteConfig.introduction.startsWith('TODO_');
  const rcNumberIsAvailable = !siteConfig.rcNumber.startsWith('TODO_') && siteConfig.rcNumber.trim().length > 0;
  const waHref = whatsappUrl(`Hello, I would like to speak with ${siteConfig.shortName}.`);
  return <main className="bg-brand-cream">
    <section className="bg-brand-primary px-5 py-16 text-white sm:px-8 sm:py-24"><div className="mx-auto max-w-5xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-accent-soft">About us</p><h1 className="mt-4 max-w-3xl font-serif-luxury text-4xl leading-tight sm:text-6xl">We help people make informed property decisions.</h1><p className="mt-6 text-sm text-white/70">{siteConfig.companyName}</p></div></section>
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <section><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-primary">Who we are</p><h2 className="mt-2 font-serif-luxury text-3xl text-brand-primary">We are {siteConfig.shortName}.</h2><p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">{introductionIsPlaceholder ? 'We will add our approved company introduction here.' : siteConfig.introduction}</p></section>

      {siteConfig.services.length > 0 && <section className="mt-14"><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-primary">What we do</p><h2 className="mt-2 font-serif-luxury text-3xl text-brand-primary">We support clients across property needs.</h2><ul className="mt-6 grid gap-3 sm:grid-cols-2">{siteConfig.services.map(service => <li key={service} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-700"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />{service}</li>)}</ul></section>}

      <section className="mt-14"><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-primary">How we work</p><h2 className="mt-2 font-serif-luxury text-3xl text-brand-primary">From first enquiry to handover.</h2><ol className="mt-7 grid gap-4 sm:grid-cols-2">{processSteps.map((step, index) => <li key={step.title} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-white">{index + 1}</span><span><strong className="block text-sm text-brand-primary">{step.title}</strong><span className="mt-1 block text-sm leading-6 text-gray-600">{step.description}</span></span></li>)}</ol></section>

      <section className="mt-14 rounded-2xl bg-[#eef0e9] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-primary">Our commitment</p><h2 className="mt-2 font-serif-luxury text-3xl text-brand-primary">We treat document checks with care.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">We review the property documents available to us and state clearly when a listing’s documents have been checked. We explain the status we have recorded and encourage clients to complete their own legal due diligence before purchase.</p></section>

      {rcNumberIsAvailable && <section className="mt-14"><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-primary">Registration details</p><h2 className="mt-2 font-serif-luxury text-3xl text-brand-primary">Our company registration</h2><p className="mt-4 text-sm text-gray-600">RC number: {siteConfig.rcNumber}</p></section>}

      {siteConfig.team.length > 0 && <section className="mt-14"><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-primary">Leadership</p><h2 className="mt-2 font-serif-luxury text-3xl text-brand-primary">Our leadership team</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{siteConfig.team.map(member => <article key={`${member.name}-${member.title}`} className="rounded-xl border border-gray-200 bg-white p-5"><h3 className="font-semibold text-brand-primary">{member.name}</h3><p className="mt-1 text-sm text-gray-500">{member.title}</p>{member.bio && <p className="mt-3 text-sm leading-6 text-gray-600">{member.bio}</p>}</article>)}</div></section>}

      <section className="mt-16 flex flex-col items-start justify-between gap-5 rounded-2xl bg-brand-primary p-7 text-white sm:flex-row sm:items-center sm:p-9"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-accent-soft">Speak with us</p><h2 className="mt-2 font-serif-luxury text-2xl">We are ready to discuss your property plans.</h2></div><div className="flex flex-wrap gap-3"><a href={waHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-accent-soft px-5 py-3 text-sm font-semibold text-brand-primary">WhatsApp us <ArrowRight className="h-4 w-4" /></a><Link to="/contact" className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white">Contact details</Link></div></section>
    </div>
  </main>;
};

export { AboutScreen };
