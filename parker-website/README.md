# Parker Website

A multi-property holiday rental website for two UK properties. Built with React and Vite, it handles property showcasing, availability calendars, local guides, and guest inquiries.

## Properties

- **Bwthyn Preswylfa** (Anglesey, Wales) - 2 bed, sleeps 6, coastal retreat
- **Piddle Inn** (Piddletrenthide, Dorset) - 4 bed, sleeps 10, 300-year-old character inn

## Tech Stack

- React 18 + React Router v7
- Vite 6
- SCSS + Bootstrap 5
- Node.js backend via CloudLinux Passenger
- Hosted on HostPresto (LiteSpeed/cPanel)

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file with the required keys:

```
VITE_GOOGLE_API_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_USER_ID=
VITE_API_URL=
VITE_FORMSPREE_URL=
VITE_TEMP_PASS=
```

Run the dev server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## Building for Production

```bash
npm run build
```

This runs a Vite build followed by Puppeteer pre-rendering for 9 routes. The output goes to `build/`.

To build without pre-rendering:

```bash
npm run build:only
```

To run pre-rendering on its own:

```bash
npm run prerender
```

## Project Structure

```
src/
  components/     React page and UI components
  config/         Property data and asset resolver
  assets/         Images for both properties, with thumbs/ subfolders
  css/            SCSS stylesheets
  utils/          API helpers
  index.jsx       App entry point and routing
scripts/
  prerender.js    Puppeteer static HTML generation
```

## Routes

| Path | Page |
|------|------|
| `/` | Property selection |
| `/:propertySlug` | Property home |
| `/:propertySlug/about` | Gallery and room details |
| `/:propertySlug/what-to-do` | Local guide |
| `/:propertySlug/contact` | Contact form |
| `/admin/dashboard` | Admin panel (password protected) |

Property slugs are `preswylfa` and `piddle-inn`.

## Configuration

All property data lives in [src/config/properties.js](src/config/properties.js). This includes names, descriptions, amenities, images, pricing rules, and local guide sections. To add or update a property, this is the main file to edit.

Images are resolved at build time via [src/config/asset.js](src/config/asset.js), which uses Vite's `import.meta.glob` to map asset paths. Gallery images are objects with `original` and `thumbnail` keys, not plain strings. Thumbnails are 400px copies stored in `thumbs/` subdirectories under each property's asset folder.

## Deployment

Upload the contents of `build/` to the hosting server after running `npm run build`. The `.htaccess` file on the server handles Passenger configuration and environment variables and is not tracked in this repo.

LiteSpeed caches aggressively, so `index.html` should be served with `no-cache` headers to avoid stale deploys.

## Notes

- `react-image-lightbox` requires `global: 'globalThis'` in `vite.config.js`, which is already set
- Pre-rendering generates static HTML for the 9 main routes for SEO purposes
- The admin panel is protected by a password stored in the `VITE_TEMP_PASS` env variable
