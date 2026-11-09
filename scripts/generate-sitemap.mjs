import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const listingDirectory = path.join(root, 'content', 'listings');
const baseUrl = 'https://chubankproperty.com';
const listingFiles = (await readdir(listingDirectory, { withFileTypes: true }))
  .filter(entry => entry.isFile() && entry.name.endsWith('.json') && !entry.name.startsWith('_'));
const paths = ['/', '/properties', '/projects', '/about', '/contact'];

for (const file of listingFiles) {
  const slug = path.basename(file.name, '.json');
  paths.push(`/properties/${slug}`);
  try {
    const listing = JSON.parse(await readFile(path.join(listingDirectory, file.name), 'utf8'));
    if (listing.status === 'sold' || listing.status === 'let') paths.push(`/properties/${slug}`);
  } catch {
    // The content validator reports malformed files before this script is run.
  }
}

const uniquePaths = [...new Set(paths)];
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const urls = uniquePaths.map(route => `  <url><loc>${escapeXml(`${baseUrl}${route}`)}</loc></url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated public/sitemap.xml with ${uniquePaths.length} URLs.`);
