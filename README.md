# Ampliflow

Marketing site for **Ampliflow** — LinkedIn outreach on autopilot. Everything Dripify does at half the price.

Static, vanilla HTML/CSS/JS. No build step, no framework, no bundler. Ship-ready as-is.

## Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `index.html` | Homepage / waitlist signup |
| `/about` | `about.html` | Founder story, mission, team |
| `/pricing` | `pricing.html` | 3 tiers, Dripify/Expandi/Phantombuster comparison |
| `/careers` | `careers.html` | Hiring stance + how-we-work |
| `/contact` | `contact.html` | Email, press, contact form, FAQ |

## Files

```
ampliflow-site/
├── index.html            # Homepage
├── about.html
├── pricing.html
├── careers.html
├── contact.html
├── styles.css            # Shared design system (~4000 lines)
├── scroll-reveal.js      # IntersectionObserver-based scroll animations
├── team-deepak.png       # Team photos used on /about
├── team-nivedita.jpeg
├── team-harsh.png
└── README.md
```

## Design system

- **Type**: Inter (display) + Geist Mono (technical labels)
- **Primary**: `#2F37D9` (deep blue)
- **Surface palette**: neutral whites + greyscale + primary blue accents
- **Treatment**: corner brackets, bracketed `[ TAG ]` monospace labels, hard edges, diagonal stripe + dotted patterns
- **Motion**: CSS keyframes for hero stagger + `scroll-reveal.js` IntersectionObserver for below-the-fold reveal-on-scroll
- **Accessibility**: full `prefers-reduced-motion` support, semantic HTML, ARIA labels on interactive elements

## Local development

This is a static site — any HTTP server works:

```bash
python3 -m http.server 8765
# then open http://localhost:8765
```

Or with Node:

```bash
npx serve .
```

## Deployment

Auto-deployed to Vercel on push to `main`.

- **Production**: pushes to `main` → production deployment
- **Preview**: PRs → preview deployment per branch

No build command needed — Vercel serves files directly.

## SEO

Each page ships with:
- Unique `<title>` + meta description + canonical URL
- Open Graph + Twitter Cards (full set, 9 OG tags)
- JSON-LD structured data (Organization, WebSite, SoftwareApplication, Product with Offers, FAQPage, AboutPage, ContactPage, BreadcrumbList)
- Semantic HTML5 landmarks (`<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`)
- `<html lang="en">`, lazy-loaded images, preconnected Google Fonts

## License

All rights reserved · Ampliflow 2026
