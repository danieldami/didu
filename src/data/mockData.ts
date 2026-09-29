import { Property, Project, Neighborhood } from '../types';

export const LAGOS_LOCALITIES = ['All Localities', 'Ikoyi', 'Old Ikoyi', 'Banana Island', 'Victoria Island', 'Eko Atlantic', 'Lekki Phase 1', 'Oniru', 'Parkview Estate', 'Victoria Garden City', 'Chevron Drive'];
export const PROPERTY_TYPES = ['All', 'Luxury Apartment', 'Penthouse', 'Detached House', 'Terrace House', 'Land', 'Commercial'];

const agent = { name: 'Amara Okafor', role: 'Property Consultant', phone: '+234 803 555 0148', email: 'hello@diduhomes.com', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', experience: 'Luxury Property Advisory' };
const home = (id: string, title: string, locality: string, type: string, price: number, beds: number, image: string, tagline: string): Property => ({
  id, title, tagline, propertyType: type, listingType: 'Sale', price, priceDisplay: `NGN ${(price / 1_000_000_000).toLocaleString('en-NG', { maximumFractionDigits: 2 })}bn`, pricePerSqFt: Math.round(price / (3200 + beds * 250)),
  location: `${locality}, Lagos`, locality, address: `${locality}, Lagos`, bedrooms: beds, bathrooms: beds, balconies: 2,
  superAreaSqFt: 3200 + beds * 250, carpetAreaSqFt: 2800 + beds * 200, furnishing: 'Fully Furnished', facing: 'East', reraId: 'Demo listing', possession: 'Ready to Move',
  featured: true, isExclusive: true, verified: false, verificationStatus: 'Not Verified', images: [image], coverImage: image,
  description: `${tagline} Set in ${locality}, Lagos, this illustrative demo residence features generous entertaining spaces, refined finishes and convenient access to the city.`,
  highlights: ['Premium finish throughout', 'Estate security', 'Dedicated parking', 'Viewing by appointment'], amenities: ['24-hour security', 'Swimming pool', 'Gym', 'Parking'],
  landmarks: [{ name: 'Lagos business district', distance: 'Nearby', travelTime: 'A short drive' }], agent, yearBuilt: 2024, parkingSpots: 2, gatedSecurity: true, powerBackup: true,
  coordinates: { lat: 6.45, lng: 3.43 }, status: 'published', isApproved: true
});

export const PROPERTIES_DATA: Property[] = [
  home('lag-ikoyi-01', 'The Meridian Residence', 'Old Ikoyi', 'Penthouse', 1850000000, 4, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85', 'A calm, light-filled penthouse with generous entertaining spaces.'),
  home('lag-vgc-02', 'Garden Court Villa', 'Victoria Garden City', 'Detached House', 1250000000, 5, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85', 'A private family home in a secure, established estate.'),
  home('lag-banana-03', 'Banana Island Waterfront', 'Banana Island', 'Luxury Apartment', 2450000000, 4, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85', 'Contemporary waterfront living with wide lagoon views.'),
  home('lag-lekki-04', 'Palm House', 'Lekki Phase 1', 'Detached House', 780000000, 5, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85', 'A polished residence close to the best of Lekki.'),
  home('lag-eko-05', 'Atlantic View Collection', 'Eko Atlantic', 'Penthouse', 1650000000, 3, 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=85', 'Elevated city living with a dramatic Atlantic outlook.'),
  home('lag-parkview-06', 'Parkview Signature Home', 'Parkview Estate', 'Terrace House', 960000000, 4, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85', 'Understated architecture in one of Ikoyi’s sought-after enclaves.')
];

export const NEIGHBORHOODS_DATA: Neighborhood[] = [
  { id: 'n-1', name: 'Ikoyi & Old Ikoyi', tagline: 'Quiet streets, established homes and enduring appeal', avgPriceSqFt: 'Premium homes and apartments', totalListings: 18, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80', description: 'A sought-after island neighbourhood known for tree-lined streets, embassies, private clubs and a mix of classic and contemporary homes.', keyFeatures: ['Private residences', 'Dining and clubs', 'Central island access'], highlights: 'A considered choice for established Lagos living' },
  { id: 'n-2', name: 'Banana Island', tagline: 'Private waterfront living in a gated community', avgPriceSqFt: 'Ultra-prime residences', totalListings: 12, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80', description: 'A private residential enclave with contemporary homes, security and views across the Lagos Lagoon.', keyFeatures: ['Waterfront setting', 'Gated community', 'Spacious homes'], highlights: 'A distinctive address for private city living' },
  { id: 'n-3', name: 'Victoria Island', tagline: 'Business, dining and coastal city life', avgPriceSqFt: 'Prime apartments and offices', totalListings: 24, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80', description: 'A lively commercial and residential district with offices, restaurants, hotels and convenient links across Lagos Island.', keyFeatures: ['Business district', 'Restaurants and hotels', 'Island connectivity'], highlights: 'Live close to work and Lagos venues' },
  { id: 'n-4', name: 'Lekki Phase 1', tagline: 'Contemporary homes with everyday convenience', avgPriceSqFt: 'Prime family homes', totalListings: 31, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80', description: 'A popular residential neighbourhood with cafes, schools, shopping and a broad choice of modern homes.', keyFeatures: ['Modern homes', 'Shopping and dining', 'Lekki corridor access'], highlights: 'A balanced choice for work, family and leisure' }
];

export const PROJECTS_DATA: Project[] = [
  { id: 'proj-1', name: 'The Meridian, Ikoyi', developer: 'DIDU Homes Showcase', locality: 'Old Ikoyi, Lagos', priceStarting: 'NGN 1.85bn', units: 'Limited collection of 4-bedroom residences', status: 'Under Construction', possessionDate: 'Showcase concept', reraNumber: 'Illustrative demo', coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85'], description: 'An illustrative premium residential concept for the Ikoyi market.', highlights: ['Private residents lounge', 'Landscaped courtyard', 'Concierge reception'], totalArea: 'Illustrative concept', unitConfigurations: ['4-bedroom residence', 'Penthouse'] },
  { id: 'proj-2', name: 'Lagoon House, Banana Island', developer: 'DIDU Homes Showcase', locality: 'Banana Island, Lagos', priceStarting: 'NGN 2.45bn', units: 'Waterfront residences', status: 'Newly Launched', possessionDate: 'Showcase concept', reraNumber: 'Illustrative demo', coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85', images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85'], description: 'A sample waterfront development concept created for this website demonstration.', highlights: ['Lagoon outlook', 'Private outdoor spaces', 'Residents  fitness suite'], totalArea: 'Illustrative concept', unitConfigurations: ['3-bedroom apartment', '4-bedroom penthouse'] },
  { id: 'proj-3', name: 'Garden Court, VGC', developer: 'DIDU Homes Showcase', locality: 'Victoria Garden City, Lagos', priceStarting: 'NGN 1.25bn', units: 'Private family homes', status: 'Ready to Move', possessionDate: 'Showcase concept', reraNumber: 'Illustrative demo', coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85', images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85'], description: 'A sample gated-estate home concept for a family-focused Lagos property search.', highlights: ['Gated estate setting', 'Family-friendly layout', 'Covered parking'], totalArea: 'Illustrative concept', unitConfigurations: ['4-bedroom home', '5-bedroom home'] }
];

export const TESTIMONIALS_DATA = [];
export const STATS_DATA = [
  { value: 'Lagos', label: 'Local property expertise' },
  { value: 'Curated', label: 'A considered property selection' },
  { value: 'Personal', label: 'One-to-one client service' },
  { value: 'DIDU', label: 'Your property partner' }
];
export const LAGOS_BUYING_GUIDE = [];
