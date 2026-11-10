import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const listingsDir = path.join(projectRoot, 'content', 'listings');
const projectsDir = path.join(projectRoot, 'content', 'projects');
const publicListingsDir = path.join(projectRoot, 'public', 'listings');
const allowedStatuses = new Set(['available', 'under-offer', 'sold', 'let']);
const allowedListingTypes = new Set(['sale', 'rent']);
const requiredFields = [
  'title', 'status', 'listingType', 'propertyType', 'price', 'location', 'state',
  'titleDocuments', 'documentsVerified', 'featured',
  'description', 'highlights', 'amenities', 'datePosted',
];
const errors = [];
const warnedImages = new Set();
const slugs = new Map();

const isRecord = value => typeof value === 'object' && value !== null && !Array.isArray(value);
const reportError = (file, field, message) => errors.push(`${path.relative(projectRoot, file)} — ${field}: ${message}`);

async function getContentFiles(directory) {
  try {
    return (await readdir(directory, { withFileTypes: true }))
      .filter(entry => entry.isFile() && entry.name.endsWith('.json') && !entry.name.startsWith('_'))
      .map(entry => path.join(directory, entry.name));
  } catch (error) {
    reportError(directory, 'directory', error instanceof Error ? error.message : 'could not read directory');
    return [];
  }
}

async function checkImages(file, slug, listing) {
  const imageNames = new Set([listing.coverImage, ...(Array.isArray(listing.images) ? listing.images : [])]
    .filter(filename => typeof filename === 'string' && filename.trim()));
  for (const filename of imageNames) {
    if (typeof filename !== 'string' || !filename.trim()) continue;
    if (path.basename(filename) !== filename || filename.includes('\\')) {
      reportError(file, 'images', `"${filename}" must be a filename only; place it in public/listings/${slug}/.`);
      continue;
    }
    const imagePath = path.join(publicListingsDir, slug, filename);
    try {
      const imageStats = await stat(imagePath);
      if (!imageStats.isFile()) {
        reportError(file, 'images', `"${filename}" is not a file in public/listings/${slug}/.`);
      } else if (imageStats.size > 600 * 1024 && !warnedImages.has(imagePath)) {
        warnedImages.add(imagePath);
        console.warn(`Warning: ${path.relative(projectRoot, imagePath)} is larger than 600 KB.`);
      }
    } catch {
      reportError(file, 'images', `"${filename}" was not found in public/listings/${slug}/.`);
    }
  }
}

for (const file of await getContentFiles(listingsDir)) {
  const slug = path.basename(file, '.json');
  const normalizedSlug = slug.toLowerCase();
  const duplicate = slugs.get(normalizedSlug);
  if (duplicate) {
    reportError(file, 'filename', `duplicate listing slug "${slug}" also appears in ${path.relative(projectRoot, duplicate)}.`);
  } else {
    slugs.set(normalizedSlug, file);
  }

  let listing;
  try {
    listing = JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    reportError(file, 'JSON', error instanceof Error ? error.message : 'could not parse JSON');
    continue;
  }
  if (!isRecord(listing)) {
    reportError(file, 'root', 'must contain a JSON object.');
    continue;
  }

  for (const field of requiredFields) {
    if (!(field in listing)) reportError(file, field, 'is required.');
  }
  if ('slug' in listing) reportError(file, 'slug', 'must be derived from the filename and must not be stored in JSON.');
  if (typeof listing.title !== 'string' || !listing.title.trim()) reportError(file, 'title', 'must be a non-empty string.');
  if (typeof listing.status !== 'string' || !allowedStatuses.has(listing.status)) reportError(file, 'status', 'must be available, under-offer, sold, or let.');
  if (typeof listing.listingType !== 'string' || !allowedListingTypes.has(listing.listingType)) reportError(file, 'listingType', 'must be sale or rent.');
  if (typeof listing.price !== 'number' || !Number.isFinite(listing.price) || listing.price < 0) reportError(file, 'price', 'must be a non-negative number in naira.');
  if (listing.images !== undefined && !Array.isArray(listing.images)) reportError(file, 'images', 'must be an array of filenames when provided.');
  if (!Array.isArray(listing.titleDocuments)) reportError(file, 'titleDocuments', 'must be an array of document names.');
  if (typeof listing.documentsVerified !== 'boolean') reportError(file, 'documentsVerified', 'must be true or false.');
  if (typeof listing.featured !== 'boolean') reportError(file, 'featured', 'must be true or false.');
  if (listing.coverImage !== undefined && typeof listing.coverImage !== 'string') reportError(file, 'coverImage', 'must be a filename when provided.');
  if (typeof listing.description !== 'string' || !listing.description.trim()) reportError(file, 'description', 'must be a non-empty string.');
  if (!Array.isArray(listing.highlights)) reportError(file, 'highlights', 'must be an array.');
  if (!Array.isArray(listing.amenities)) reportError(file, 'amenities', 'must be an array.');
  if (typeof listing.datePosted !== 'string' || Number.isNaN(Date.parse(listing.datePosted))) reportError(file, 'datePosted', 'must be an ISO date.');
  await checkImages(file, slug, listing);
}

for (const file of await getContentFiles(projectsDir)) {
  try {
    JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    reportError(file, 'JSON', error instanceof Error ? error.message : 'could not parse JSON');
  }
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} error${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Content validation passed.');
}
