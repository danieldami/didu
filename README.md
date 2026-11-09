# Chubank Property

Website for Chubank Property Ventures Limited.

## Run locally

1. Install dependencies with `npm install`.
2. Start the site with `npm run dev`.
3. Create a production build with `npm run build`.

## Property content

Listings and projects live in `content/` as JSON files. Follow [content/README.md](content/README.md) to add or update them. Run `npm run validate` to check the content before deployment; the production build runs this validation automatically.

Company contact details and public information are configured in `src/config/site.ts`. Replace the clearly marked `TODO_` placeholders with approved information before launch.
