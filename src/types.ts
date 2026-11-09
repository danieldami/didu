export type ListingStatus = 'available' | 'under-offer' | 'sold' | 'let';
export type ListingType = 'sale' | 'rent';

export interface PropertyLandmark {
  name: string;
  distance: string;
}

export interface PropertyCoordinates {
  lat: number;
  lng: number;
}

/** `slug` is derived from the content filename and is never stored in JSON. */
export interface Property {
  slug: string;
  title: string;
  status: ListingStatus;
  listingType: ListingType;
  propertyType: string;
  price: number;
  pricePeriod?: string;
  location: string;
  state: string;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  sizeSqm?: number;
  plotSize?: string;
  titleDocuments: string[];
  documentsVerified: boolean;
  featured: boolean;
  coverImage: string;
  images: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  landmarks?: PropertyLandmark[];
  coordinates?: PropertyCoordinates;
  datePosted: string;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  state: string;
  status: string;
  coverImage: string;
  images: string[];
  description: string;
  highlights: string[];
  featured: boolean;
}

export interface FilterState {
  searchQuery: string;
  location: string;
  propertyType: string;
  listingType: 'all' | ListingType;
  priceRange: [number, number];
  status: 'all' | ListingStatus;
  sortBy: 'available' | 'price-asc' | 'price-desc' | 'newest';
}

export type ActiveScreen = 'home' | 'properties' | 'projects' | 'about' | 'contact';
