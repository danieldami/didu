import React, { useState } from 'react';
import { ActiveScreen, FilterState, Property } from './types';
import { PROPERTIES_DATA, PROJECTS_DATA } from './data/mockData';
import { siteConfig } from './config/site';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedProperties } from './components/FeaturedProperties';
import { WhyChubank } from './components/WhyChubank';
import { PropertiesScreen } from './components/PropertiesScreen';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ProjectsScreen } from './components/ProjectsScreen';
import { AboutScreen } from './components/AboutScreen';
import { ContactScreen } from './components/ContactScreen';
import { CompareModal } from './components/CompareModal';
import { SavedPropertiesDrawer } from './components/SavedPropertiesDrawer';
import { Footer } from './components/Footer';

const initialFilters: FilterState = {
  searchQuery: '', listingType: 'Buy', locality: '', propertyType: 'All',
  priceRange: [0, 5000000000], bhk: '', possession: 'all', furnishing: 'all', facing: 'all', sortBy: 'featured'
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('chubank_saved_homes_v1');
      return stored ? JSON.parse(stored) as string[] : [];
    } catch { return []; }
  });
  const properties = PROPERTIES_DATA;

  const navigateTo = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    setSelectedProperty(null);
    const url = new URL(window.location.href);
    url.searchParams.set('screen', screen);
    url.searchParams.delete('property');
    window.history.pushState({ screen }, '', url.pathname + url.search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showProperty = (property: Property) => {
    setSelectedProperty(property);
    const url = new URL(window.location.href);
    url.searchParams.set('screen', activeScreen);
    url.searchParams.set('property', property.id);
    window.history.pushState({ screen: activeScreen, propertyId: property.id }, '', url.pathname + url.search);
  };

  const closeProperty = () => {
    setSelectedProperty(null);
    if (window.location.search.includes('property=')) window.history.back();
  };

  const toggleSaved = (id: string) => {
    setSavedIds(previous => {
      const next = previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id];
      localStorage.setItem('chubank_saved_homes_v1', JSON.stringify(next));
      return next;
    });
  };

  const toggleCompare = (property: Property) => {
    setCompareList(previous => {
      if (previous.some(item => item.id === property.id)) return previous.filter(item => item.id !== property.id);
      if (previous.length >= 3) return previous;
      return [...previous, property];
    });
  };

  const openWhatsApp = (property?: Property) => {
    const message = property
      ? `Hello, I would like to book an inspection for ${property.title}: ${window.location.origin}?screen=properties&property=${property.id}`
      : 'Hello, I would like to enquire about your properties.';
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const savedProperties = properties.filter(property => savedIds.includes(property.id));

  return (
    <div className="min-h-screen flex flex-col bg-brand-page text-brand-ink">
      <Navbar activeScreen={activeScreen} onNavigate={navigateTo} onOpenWhatsApp={() => openWhatsApp()} onOpenSaved={() => setSavedDrawerOpen(true)} savedCount={savedIds.length} />
      <main className="flex-1">
        {activeScreen === 'home' && <>
          <HeroSection onSearch={newFilters => { setFilters(previous => ({ ...previous, ...newFilters })); navigateTo('properties'); }} onSelectLocality={locality => { setFilters(previous => ({ ...previous, locality })); navigateTo('properties'); }} />
          <FeaturedProperties properties={properties.filter(property => property.featured)} onSelectProperty={showProperty} onToggleSave={toggleSaved} savedIds={savedIds} onBookVisit={openWhatsApp} onExploreAll={() => navigateTo('properties')} onToggleCompare={toggleCompare} compareList={compareList} />
          <WhyChubank onContactAdvisory={() => navigateTo('contact')} />
          <section className="bg-brand-cream px-5 py-16 text-center"><p className="text-xs font-semibold uppercase tracking-[.22em] text-brand-primary">{siteConfig.companyName}</p><h2 className="mt-3 font-serif-luxury text-3xl text-brand-primary sm:text-4xl">Ready to take the next step?</h2><button type="button" onClick={() => openWhatsApp()} className="mt-6 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white">Talk to our team</button></section>
        </>}
        {activeScreen === 'properties' && <PropertiesScreen properties={properties} filterState={filters} onUpdateFilters={patch => setFilters(previous => ({ ...previous, ...patch }))} onResetFilters={() => setFilters(initialFilters)} onSelectProperty={showProperty} onToggleSave={toggleSaved} savedIds={savedIds} onBookVisit={openWhatsApp} onToggleCompare={toggleCompare} compareList={compareList} onOpenCompareModal={() => setCompareOpen(true)} />}
        {activeScreen === 'projects' && <ProjectsScreen projects={PROJECTS_DATA} onContactProject={() => openWhatsApp()} />}
        {activeScreen === 'about' && <AboutScreen />}
        {activeScreen === 'contact' && <ContactScreen />}
      </main>
      <Footer onNavigate={navigateTo} onOpenWhatsApp={() => openWhatsApp()} />
      <PropertyDetailModal property={selectedProperty} onClose={closeProperty} onBookVisit={openWhatsApp} onToggleSave={toggleSaved} isSaved={selectedProperty ? savedIds.includes(selectedProperty.id) : false} />
      <CompareModal isOpen={compareOpen} onClose={() => setCompareOpen(false)} compareList={compareList} onRemoveFromCompare={id => setCompareList(previous => previous.filter(property => property.id !== id))} onSelectProperty={property => { setCompareOpen(false); showProperty(property); }} />
      <SavedPropertiesDrawer isOpen={savedDrawerOpen} onClose={() => setSavedDrawerOpen(false)} savedProperties={savedProperties} onRemove={toggleSaved} onSelectProperty={property => { setSavedDrawerOpen(false); showProperty(property); }} />
      {compareList.length > 0 && <button type="button" onClick={() => setCompareOpen(true)} className="fixed bottom-5 right-5 z-40 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-xl">Compare {compareList.length} properties</button>}
    </div>
  );
}
