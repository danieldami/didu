import React from 'react';
import { Link } from 'react-router-dom';
import type { FilterState, Property } from '../types';
import { getListings, getProjects } from '../data/listings';
import { HeroSection } from '../components/HeroSection';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { RecentlySold } from '../components/RecentlySold';
import { WhyChubank } from '../components/WhyChubank';
import { siteConfig } from '../config/site';
import { useRouteMeta } from '../utils/seo';

interface HomePageProps {
  onSearch: (filters: Partial<FilterState>) => void;
  onSelectProperty: (property: Property) => void;
  onToggleSave: (slug: string) => void;
  savedIds: string[];
  onBookVisit: (property: Property) => void;
  onToggleCompare: (property: Property) => void;
  compareList: Property[];
  onExploreAll: () => void;
  onContact: () => void;
}

const HomePage: React.FC<HomePageProps> = props => {
  useRouteMeta(`${siteConfig.shortName} | Property listings and inspections`, `Explore property listings from ${siteConfig.companyName}. Browse available properties and book an inspection.`, '/');
  const listings = getListings();
  const projects = getProjects();
  const featured = listings.filter(listing => listing.featured && listing.status === 'available');
  const recentlySold = listings.filter(listing => listing.status === 'sold').sort((a, b) => b.datePosted.localeCompare(a.datePosted));
  return <>
    <HeroSection onSearch={props.onSearch} />
    <FeaturedProperties properties={featured} onSelectProperty={props.onSelectProperty} onToggleSave={props.onToggleSave} savedIds={props.savedIds} onBookVisit={props.onBookVisit} onExploreAll={props.onExploreAll} onToggleCompare={props.onToggleCompare} compareList={props.compareList} />
    <WhyChubank onContactAdvisory={props.onContact} />
    <RecentlySold properties={recentlySold} onSelect={props.onSelectProperty} />
    {projects.length > 0 && <section className="bg-brand-cream py-16"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-primary">Our projects</p><h2 className="mt-2 font-serif-luxury text-3xl text-brand-primary">Developments and estates</h2></div><Link to="/projects" className="text-sm font-semibold text-brand-primary">View all projects →</Link></div><div className="grid gap-5 md:grid-cols-3">{projects.filter(project => project.featured).slice(0, 3).map(project => <Link key={project.slug} to="/projects" className="group overflow-hidden rounded-2xl border border-gray-200 bg-white"><img src={project.coverImage} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform group-hover:scale-[1.02]" /><div className="p-5"><p className="text-xs text-gray-500">{project.location}, {project.state}</p><h3 className="mt-2 font-serif-luxury text-xl text-brand-primary">{project.title}</h3></div></Link>)}</div></div></section>}
    <section className="bg-brand-primary px-5 py-16 text-center text-white sm:px-8"><p className="text-xs font-semibold uppercase tracking-[.22em] text-brand-accent-soft">{siteConfig.companyName}</p><h2 className="mt-3 font-serif-luxury text-3xl sm:text-4xl">Ready to take the next step?</h2><button type="button" onClick={props.onContact} className="mt-6 rounded-full bg-brand-accent-soft px-6 py-3 text-sm font-semibold text-brand-primary">Contact our team</button></section>
  </>;
};

export default HomePage;
