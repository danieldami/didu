import type { Project, Property } from '../types';

type RawProperty = Omit<Property, 'slug' | 'coverImage' | 'images'> & {
  coverImage?: string;
  images?: string[];
};

type RawProject = Omit<Project, 'slug' | 'coverImage' | 'images'> & {
  coverImage: string;
  images: string[];
};

const propertyFiles = import.meta.glob<RawProperty>('../../content/listings/*.json', {
  eager: true,
  import: 'default',
});

const projectFiles = import.meta.glob<RawProject>('../../content/projects/*.json', {
  eager: true,
  import: 'default',
});

const getSlug = (filePath: string): string => filePath.split('/').pop()?.replace(/\.json$/, '') ?? '';
const propertyImage = (slug: string, filename: string): string => `/listings/${slug}/${filename}`;
const propertyPlaceholder = '/listings/_placeholder/sample-placeholder.svg';
const projectImage = (slug: string, filename: string): string => `/projects/${slug}/${filename}`;

export const getListings = (): Property[] => Object.entries(propertyFiles)
  .filter(([filePath]) => !getSlug(filePath).startsWith('_'))
  .map(([filePath, listing]) => {
    const slug = getSlug(filePath);
    const imageFilenames = Array.isArray(listing.images)
      ? listing.images.filter(filename => typeof filename === 'string' && filename.trim())
      : [];
    const coverImage = typeof listing.coverImage === 'string' && listing.coverImage.trim()
      ? propertyImage(slug, listing.coverImage)
      : propertyPlaceholder;
    return {
      ...listing,
      slug,
      coverImage,
      images: imageFilenames.length > 0
        ? imageFilenames.map(filename => propertyImage(slug, filename))
        : [coverImage],
    };
  });

export const getListing = (slug: string): Property | undefined => getListings().find(listing => listing.slug === slug);

export const getProjects = (): Project[] => Object.entries(projectFiles)
  .filter(([filePath]) => !getSlug(filePath).startsWith('_'))
  .map(([filePath, project]) => {
    const slug = getSlug(filePath);
    return {
      ...project,
      slug,
      coverImage: projectImage(slug, project.coverImage),
      images: project.images.map(filename => projectImage(slug, filename)),
    };
  });
