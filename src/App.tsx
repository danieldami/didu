import React, { Suspense, lazy, useMemo, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import type { ActiveScreen, FilterState, Property } from './types';
import { siteConfig } from './config/site';
import { getListings } from './data/listings';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CompareModal } from './components/CompareModal';
import { SavedPropertiesDrawer } from './components/SavedPropertiesDrawer';
import { whatsappUrl } from './utils/contact';

const HomePage = lazy(() => import('./pages/HomePage'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyPage = lazy(() => import('./pages/PropertyPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const screenByPath = (path: string): ActiveScreen => {
  if (path === '/properties') return 'properties';
  if (path.startsWith('/properties/')) return 'properties';
  if (path === '/projects') return 'projects';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  return 'home';
};

const pathByScreen: Record<ActiveScreen, string> = {
  home: '/', properties: '/properties', projects: '/projects', about: '/about', contact: '/contact',
};

const OrganizationSchema: React.FC = () => {
  const data = useMemo(() => {
    const organization: Record<string, unknown> = {
      '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: siteConfig.companyName,
      url: `https://${siteConfig.domain}`, logo: `https://${siteConfig.domain}/chubank-skyline.png`,
    };
    if (!siteConfig.phone.startsWith('TODO_')) organization.telephone = siteConfig.phone;
    if (!siteConfig.email.startsWith('TODO_')) organization.email = siteConfig.email;
    if (!siteConfig.officeAddress.startsWith('TODO_')) organization.address = siteConfig.officeAddress;
    const sameAs = Object.values(siteConfig.socialLinks).filter(link => !link.startsWith('TODO_'));
    if (sameAs.length) organization.sameAs = sameAs;
    return organization;
  }, []);
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
};

const RouteShell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeScreen = screenByPath(location.pathname);
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('chubank_saved_properties_v1');
      return stored ? JSON.parse(stored) as string[] : [];
    } catch { return []; }
  });

  const openWhatsApp = (property?: Property) => {
    const message = property
      ? `Hello, I would like to book an inspection for ${property.title}: https://${siteConfig.domain}/properties/${property.slug}`
      : 'Hello, I would like to enquire about your properties.';
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };
  const toggleSaved = (slug: string) => setSavedIds(previous => {
    const next = previous.includes(slug) ? previous.filter(item => item !== slug) : [...previous, slug];
    try { localStorage.setItem('chubank_saved_properties_v1', JSON.stringify(next)); } catch { /* ignore blocked storage */ }
    return next;
  });
  const toggleCompare = (property: Property) => setCompareList(previous => {
    if (previous.some(item => item.slug === property.slug)) return previous.filter(item => item.slug !== property.slug);
    return previous.length < 3 ? [...previous, property] : previous;
  });
  const navigateScreen = (screen: ActiveScreen) => navigate(pathByScreen[screen]);
  const listings = getListings();
  const savedProperties = listings.filter(listing => savedIds.includes(listing.slug));
  const onSelectProperty = (property: Property) => navigate(`/properties/${property.slug}`);
  const makePropertySearch = (filters: Partial<FilterState>) => {
    const params = new URLSearchParams();
    if (filters.location) params.set('location', filters.location);
    if (filters.propertyType) params.set('type', filters.propertyType);
    if (filters.priceRange) { params.set('min', String(filters.priceRange[0])); params.set('max', String(filters.priceRange[1])); }
    navigate(`/properties${params.size ? `?${params.toString()}` : ''}`);
  };

  return <div className="flex min-h-screen flex-col bg-brand-page text-brand-ink">
    <OrganizationSchema />
    <Navbar activeScreen={activeScreen} onNavigate={navigateScreen} onOpenWhatsApp={() => openWhatsApp()} onOpenSaved={() => setSavedDrawerOpen(true)} savedCount={savedIds.length} />
    <div className="flex-1">
      <Suspense fallback={<div className="mx-auto min-h-[60vh] max-w-7xl px-5 py-20 text-sm text-gray-500">Loading page…</div>}>
        <Routes>
          <Route path="/" element={<HomePage onSearch={makePropertySearch} onSelectProperty={onSelectProperty} onToggleSave={toggleSaved} savedIds={savedIds} onBookVisit={openWhatsApp} onToggleCompare={toggleCompare} compareList={compareList} onExploreAll={() => navigate('/properties')} onContact={() => openWhatsApp()} />} />
          <Route path="/properties" element={<PropertiesPage onSelectProperty={onSelectProperty} onToggleSave={toggleSaved} savedIds={savedIds} onBookVisit={openWhatsApp} onToggleCompare={toggleCompare} compareList={compareList} onOpenCompare={() => setCompareOpen(true)} />} />
          <Route path="/properties/:slug" element={<PropertyPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
    <Footer onNavigate={navigateScreen} onOpenWhatsApp={() => openWhatsApp()} />
    <FloatingWhatsApp compareVisible={compareList.length > 0} />
    <CompareModal isOpen={compareOpen} onClose={() => setCompareOpen(false)} compareList={compareList} onRemoveFromCompare={slug => setCompareList(previous => previous.filter(property => property.slug !== slug))} onSelectProperty={property => { setCompareOpen(false); onSelectProperty(property); }} />
    <SavedPropertiesDrawer isOpen={savedDrawerOpen} onClose={() => setSavedDrawerOpen(false)} savedProperties={savedProperties} onRemove={toggleSaved} onSelectProperty={property => { setSavedDrawerOpen(false); onSelectProperty(property); }} />
    {compareList.length > 0 && <button type="button" onClick={() => setCompareOpen(true)} className="fixed bottom-5 right-5 z-40 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-xl">Compare {compareList.length} properties</button>}
  </div>;
};

export default function App() { return <RouteShell />; }
