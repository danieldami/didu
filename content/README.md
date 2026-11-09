# Updating property content

Listings and projects are JSON files in this folder. Add or edit them in GitHub and deploy the change to publish it.

## Add a listing

1. Copy `listings/_template.json` and save it as `listings/your-listing-name.json`. Use lowercase words separated by hyphens for the filename; this becomes the listing URL slug.
2. Fill in the approved property information. The JSON does not contain a `slug` field; the filename provides it.
3. Create `public/listings/your-listing-name/` and copy the approved photos there. Set `coverImage` and `images` to photo filenames only. The sample `placeholder.svg` can be replaced by a real image.
4. Set `status` to `available`, `under-offer`, `sold`, or `let`, and set `listingType` to `sale` or `rent`.
5. Run `npm run validate`, then commit and push the JSON and photos.

## Mark a property sold

Open its JSON file and change `status` to `sold`. It remains visible on the site with a Sold label and appears after available listings by default.

## Remove a property

Delete its JSON file and its matching `public/listings/your-listing-name/` photo folder in the same Git change. Saved links to that listing will no longer appear.

## Projects

Copy `projects/_template.json` to `projects/your-project-name.json`. Put its photos in `public/projects/your-project-name/` and refer to them by filename only. The project schema is defined in `src/types.ts`.

Sample listing entries and their placeholder images are illustrative only. Replace or remove them before launch.
