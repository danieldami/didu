import React from 'react';
import { Link } from 'react-router-dom';
import { useRouteMeta } from '../utils/seo';
import { siteConfig } from '../config/site';

const NotFoundPage: React.FC = () => {
  useRouteMeta(`Page not found | ${siteConfig.shortName}`, 'The page you requested could not be found.', '/404');
  return <main className="mx-auto max-w-3xl px-5 py-24 text-center"><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-primary">404</p><h1 className="mt-3 font-serif-luxury text-4xl text-brand-primary">This page could not be found.</h1><Link to="/" className="mt-7 inline-flex rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Return home</Link></main>;
};

export default NotFoundPage;
