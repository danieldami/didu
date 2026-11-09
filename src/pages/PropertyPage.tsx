import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bath, BedDouble, CarFront, CheckCircle2, MapPin, MessageCircle, Ruler } from 'lucide-react';
import { getListing } from '../data/listings';
import { formatNaira } from '../utils/format';
import { whatsappUrl } from '../utils/contact';
import { useRouteMeta } from '../utils/seo';
import { siteConfig } from '../config/site';

const PropertyPage: React.FC = () => {
  const { slug = '' } = useParams();
  const property = getListing(slug);
  useRouteMeta(property ? `${property.title} | ${siteConfig.shortName}` : `Property not found | ${siteConfig.shortName}`, property?.description ?? 'This property listing could not be found.', `/properties/${slug}`);
  if (!property) return <main className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="font-serif-luxury text-4xl text-brand-primary">Property not found</h1><p className="mt-4 text-gray-600">This listing may have been removed or its address has changed.</p><Link to="/properties" className="mt-6 inline-block rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Browse properties</Link></main>;

  const message = `Hello, I would like to book an inspection for ${property.title}: ${window.location.origin}/properties/${property.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.title,
    description: property.description,
    image: property.images,
    category: property.propertyType,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'NGN',
      availability: property.status === 'sold' || property.status === 'let' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      url: `https://${siteConfig.domain}/properties/${property.slug}`,
    },
  };

  return <main className="bg-brand-page"><script type="application/ld+json">{JSON.stringify(structuredData)}</script><div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
    <Link to="/properties" className="text-sm font-medium text-brand-primary">← Back to properties</Link>
    <div className="mt-5 grid gap-3 md:grid-cols-[1.5fr_1fr]">{property.images.slice(0, 3).map((image, index) => <img key={image} src={image} alt={`${property.title} photo ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} className={`w-full rounded-xl object-cover ${index === 0 ? 'aspect-[4/3] md:row-span-2 md:h-full' : 'hidden aspect-[4/3] md:block'}`} />)}</div>
    <div className="grid gap-10 py-9 lg:grid-cols-[1fr_340px]"><article><div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-brand-primary"><span>{property.propertyType}</span><span>·</span><span>{property.listingType === 'sale' ? 'For sale' : 'For rent'}</span>{property.status !== 'available' && <span className="rounded-full bg-gray-800 px-3 py-1 text-white">{property.status.replace('-', ' ')}</span>}</div><h1 className="mt-3 font-serif-luxury text-4xl text-brand-primary">{property.title}</h1><p className="mt-3 flex items-center gap-2 text-gray-600"><MapPin className="h-4 w-4" />{property.location}, {property.state}</p><p className="mt-5 text-3xl font-bold text-brand-primary">{formatNaira(property.price)}{property.pricePeriod ? <span className="ml-2 text-sm font-medium">{property.pricePeriod}</span> : null}</p>
      <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-600">{property.bedrooms !== undefined && <span className="flex items-center gap-2"><BedDouble className="h-4 w-4" />{property.bedrooms} bedrooms</span>}{property.bathrooms !== undefined && <span className="flex items-center gap-2"><Bath className="h-4 w-4" />{property.bathrooms} bathrooms</span>}{property.parking !== undefined && <span className="flex items-center gap-2"><CarFront className="h-4 w-4" />{property.parking} parking spaces</span>}{property.sizeSqm !== undefined && <span className="flex items-center gap-2"><Ruler className="h-4 w-4" />{property.sizeSqm.toLocaleString()} m²</span>}{property.plotSize && <span>{property.plotSize}</span>}</div>
      <h2 className="mt-9 font-serif-luxury text-2xl text-brand-primary">About this property</h2><p className="mt-3 whitespace-pre-line leading-7 text-gray-600">{property.description}</p>
      {property.highlights.length > 0 && <><h2 className="mt-9 font-serif-luxury text-2xl text-brand-primary">Highlights</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{property.highlights.map(highlight => <li key={highlight} className="flex gap-2 text-sm text-gray-600"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />{highlight}</li>)}</ul></>}
      {property.titleDocuments.length > 0 && <><h2 className="mt-9 font-serif-luxury text-2xl text-brand-primary">Title documents</h2><p className="mt-3 text-sm text-gray-600">{property.titleDocuments.join(' · ')}</p>{property.documentsVerified && <p className="mt-2 text-sm font-medium text-green-800">Documents checked</p>}</>}
    </article><aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-28"><p className="text-sm text-gray-500">Interested in this property?</p><h2 className="mt-2 font-serif-luxury text-xl text-brand-primary">Arrange a private inspection</h2><a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" />Book an inspection</a><a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center rounded-full border border-brand-primary/30 px-5 py-3 text-sm font-semibold text-brand-primary">Chat on WhatsApp</a><a href={`tel:${siteConfig.phone}`} className="mt-4 block text-center text-sm text-gray-600">Call {siteConfig.phone}</a></aside></div>
  </div></main>;
};

export default PropertyPage;
