# ZAREN — Luxury Perfume Website

A production-oriented, bilingual (Persian/English) luxury perfume website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features a cinematic black-and-gold hero, four signature fragrances, WhatsApp/Instagram ordering, a secure admin dashboard, and persistent content management.

## Brand

- **Name:** ZAREN (inspired by the Persian word "Zar," meaning gold)
- **Tagline:** BE REMEMBERED.
- **Markets:** Iran (primary), international
- **Languages:** Persian (default, RTL) and English (LTR)
- **Ordering:** WhatsApp and Instagram Direct Messages

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion + CSS |
| Persistence | JSON file store (easily swappable for Supabase) |
| Auth | JWT cookies (admin only) |
| Fonts | Cormorant Garamond, Inter, Vazirmatn (Google Fonts) |

## Features

### Public Website
- **Cinematic hero** with SVG perfume bottle, gold particles, parallax, and atmospheric lighting
- **Bilingual FA/EN** with full RTL/LTR layout switching and preference memory
- **Four signature fragrances** — OCEAN NOIR, AURA NOIR, ROUGE SÂN, ROSE VEIL — each with a unique color-themed bottle
- **Product detail pages** with shareable URLs, SEO metadata, and related products
- **WhatsApp ordering** with product-specific prefilled messages
- **Instagram contact** links to the real profile
- **Music entry experience** with optional ambient audio and persistent controls
- **Responsive design** for desktop, tablet, and mobile
- **SEO** — sitemap, robots.txt, Open Graph, semantic HTML, custom 404
- **Accessibility** — keyboard navigation, focus indicators, reduced-motion support

### Admin Dashboard (`/admin`)
- **Product management** — add, edit, delete, publish/unpublish, reorder, set price/volume/availability, customize bottle colors, upload images
- **Homepage content** — edit hero, brand values, lifestyle, brand story, and contact sections in both languages
- **Settings** — WhatsApp number, Instagram username, tagline, currency, price visibility, music URL, SEO metadata, copyright
- **Image uploads** with file type and size validation
- **Secure auth** — JWT cookie, server-side authorization on all write APIs

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd zaren-perfume

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your values
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ADMIN_PASSWORD` | No | `zaren_admin_2024` | Admin dashboard password |
| `JWT_SECRET` | No | `dev_secret_change_me` | JWT signing secret |
| `DATA_DIR` | No | `./data` | JSON data file directory |
| `UPLOAD_DIR` | No | `./public/uploads` | Image upload directory |
| `NEXT_PUBLIC_BASE_URL` | No | `https://zarenperfume.com` | Canonical URL for SEO |

**Change `ADMIN_PASSWORD` and `JWT_SECRET` before production.**

## Development

```bash
npm run dev
```

The site runs at `http://localhost:3000`. The admin dashboard is at `http://localhost:3000/admin`.

## Build

```bash
npm run build
npm start
```

## Admin Setup

1. Start the dev server
2. Navigate to `/admin/login`
3. Enter the `ADMIN_PASSWORD` value from your `.env`
4. Manage products, homepage content, and settings

## Data Persistence

Data is stored as JSON files in the `DATA_DIR` (default: `./data`):
- `products.json` — product records (seeded with four fragrances on first run)
- `settings.json` — site settings (WhatsApp, Instagram, SEO, music, etc.)
- `content.json` — homepage section content (hero, brand values, lifestyle, etc.)

Uploaded images are stored in `UPLOAD_DIR` (default: `./public/uploads`).

## Supabase Migration (Optional)

The data layer is abstracted in `src/lib/store.ts`. To migrate to Supabase:
1. Add Supabase credentials to `.env`
2. Replace the JSON file operations in `store.ts` with Supabase client calls
3. Create tables matching the types in `src/lib/types.ts`
4. Add Row Level Security policies (public read, admin write)

## Deployment

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in the Vercel dashboard:
- `ADMIN_PASSWORD` — strong password
- `JWT_SECRET` — long random string
- `NEXT_PUBLIC_BASE_URL` — your production domain

**Note:** The JSON file store works on Vercel for development but is ephemeral. For production persistence, use Supabase or another database. The `data/` directory is not preserved across serverless function invocations.

### Custom Domain

1. Purchase a domain (e.g., `zarenperfume.com`)
2. Add it in your hosting platform's domain settings
3. Set `NEXT_PUBLIC_BASE_URL` to your domain
4. Update DNS records as directed by your platform

**Do not claim a domain is available or owned without verifying it.**

### Other Platforms

The app is a standard Next.js project and deploys to any platform that supports Next.js:
- Netlify
- Railway
- Docker (use the included `docker-compose.base44.yml` as a reference)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, providers)
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # Custom 404
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # Robots config
│   ├── products/[slug]/    # Product detail pages
│   ├── admin/              # Admin dashboard + login
│   └── api/                # API routes (auth, products, settings, content, upload)
├── components/
│   ├── LanguageProvider.tsx # i18n context
│   ├── Header.tsx           # Navigation + language switcher
│   ├── Hero.tsx             # Cinematic hero
│   ├── PerfumeBottle.tsx    # SVG bottle component
│   ├── BrandValues.tsx     # Why ZAREN section
│   ├── Collection.tsx       # Product grid
│   ├── ProductCard.tsx     # Product card
│   ├── Lifestyle.tsx        # Editorial split section
│   ├── BrandStory.tsx      # Brand story section
│   ├── Contact.tsx          # Contact + ordering
│   ├── Footer.tsx           # Footer
│   ├── MusicManager.tsx    # Music entry + controls
│   ├── HomePage.tsx        # Homepage wrapper
│   ├── ProductDetailPage.tsx
│   ├── AdminPanel.tsx      # Admin container
│   ├── AdminProducts.tsx   # Product management
│   ├── AdminContent.tsx    # Content editing
│   ├── AdminSettings.tsx   # Settings editing
│   └── Icons.tsx            # SVG icon system
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── store.ts             # JSON file store
│   ├── auth.ts              # JWT auth
│   ├── seed.ts              # Initial data
│   ├── translations.ts     # UI strings (FA/EN)
│   └── utils.ts             # WhatsApp/Instagram link helpers
└── ...
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Fonts not loading | Check internet connection; fonts load from Google Fonts CDN |
| Admin login fails | Verify `ADMIN_PASSWORD` in `.env` matches what you entered |
| Changes not persisting | Ensure `DATA_DIR` is writable; check file permissions |
| Music not playing | Set `music_file_url` in admin settings; use a licensed track |
| Images not uploading | Ensure `UPLOAD_DIR` is writable; check file size (< 5MB) |
| Hot reload not working | Set `CHOKIDAR_USEPOLLING=true` in Docker environments |

## Contact

- **WhatsApp:** [wa.me/989305459758](https://wa.me/989305459758)
- **Instagram:** [@zaren__perfume](https://www.instagram.com/zaren__perfume/)

## License

© 2024 ZAREN. All rights reserved.
