# Nexus Studio — Landing Page

A modern, fully responsive company landing page built with pure HTML, CSS, and vanilla JavaScript. No frameworks. No dependencies. Deploy-ready out of the box.

---

## Preview

> **Design:** Dark-first editorial aesthetic — deep navy-charcoal backgrounds, warm amber accents, Playfair Display serif headings, DM Sans body text, DM Mono for code/labels.

---

## Project Structure

```
nexus-studio/
├── index.html      # Semantic HTML5 markup — all 10 sections
├── style.css       # ~700 lines — CSS variables, layout, animations, responsive
└── script.js       # ~280 lines — modular vanilla JS, all interactivity
```

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Navbar** | Fixed, blurred backdrop on scroll, active link highlighting, dark/light toggle |
| 2 | **Hero** | Headline, subtext, CTAs, social proof strip, floating code card |
| 3 | **About** | Company story, animated stats, decorative SVG visual with floating chips |
| 4 | **Services** | 6 service cards with icons, tags, and hover glow effects |
| 5 | **Projects** | Asymmetric grid with 4 case studies, hover reveal overlays |
| 6 | **Testimonials** | Auto-playing carousel with dot navigation and prev/next controls |
| 7 | **Pricing** | 3 plans (Starter / Growth / Enterprise) with featured highlight |
| 8 | **FAQ** | Accordion — one item open at a time, smooth max-height animation |
| 9 | **Contact** | Form with live validation, success state, and error messages |
| 10 | **Footer** | Social links, quick links, legal links |

---

## Features

### JavaScript Modules (`script.js`)
- **Loader** — Minimum display time so the animation feels intentional, then fades out
- **Theme Toggle** — Dark/light mode, persisted to `localStorage`
- **Sticky Navbar** — Adds backdrop blur + shadow after 20px scroll; highlights active section link
- **Mobile Menu** — Hamburger ↔ X animation, closes on link click or `Escape` key
- **Smooth Scrolling** — Offset-corrected for fixed navbar height
- **Scroll Reveal** — `IntersectionObserver`-based fade/slide-in animations, animate-once
- **Testimonial Slider** — 5s auto-play, pauses on hover/focus, dot nav + arrow keys
- **FAQ Accordion** — Animated `max-height` expand/collapse
- **Form Validation** — Live blur validation, inline error messages, simulated async submit
- **Back to Top** — Appears after 400px scroll, smooth return to top

### CSS Highlights (`style.css`)
- CSS custom properties for full theming (21 dark + light variables)
- `prefers-reduced-motion` media query respected throughout
- CSS Grid + Flexbox layouts throughout — no floats
- Ambient glow orbs, dotted hero grid, floating chip animations
- Hover micro-interactions on every interactive element
- Responsive at 1024px (tablet) and 768px / 480px (mobile)

---

## Getting Started

No build step required. Just open the file:

```bash
# Clone or download the project
git clone https://github.com/yourname/nexus-studio.git
cd nexus-studio

# Open directly in browser
open index.html

# Or serve locally (recommended to avoid CORS quirks with fonts)
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

---

## Customisation

### Colors
All colors are CSS variables in `:root` inside `style.css`. Change the accent color in one place:

```css
:root {
  --accent: #d4a847;       /* Change this to your brand color */
  --accent-dim: #b88e38;   /* Slightly darker variant for hover states */
}
```

### Fonts
Swap Google Fonts in the `<head>` of `index.html` and update the font-family references in `style.css`:

```css
h1, h2, h3, h4 { font-family: 'Your Display Font', serif; }
body            { font-family: 'Your Body Font', sans-serif; }
```

### Content
All content is plain HTML — edit text directly in `index.html`. Key areas:

- **Hero headline:** `<h1 class="hero-headline">` in `#hero`
- **Service cards:** `<article class="service-card">` elements in `#services`
- **Project cards:** `<article class="project-card">` elements in `#projects`
- **Testimonials:** `<div class="testimonial-slide">` elements in `#testimonials`
- **Pricing plans:** `<article class="pricing-card">` elements in `#pricing`
- **FAQ items:** `<div class="faq-item">` elements in `#faq`

### Form Backend
The contact form currently simulates submission with a `setTimeout`. To connect a real backend, replace the `setTimeout` block in `script.js` (inside `initContactForm`) with a `fetch` call:

```js
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
});
```

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 88+ |
| Firefox | 85+ |
| Safari | 14+ |
| Edge | 88+ |

Uses `IntersectionObserver`, CSS custom properties, `backdrop-filter`, and `grid` — all widely supported in modern browsers.

---

## Performance Notes

- Zero JavaScript frameworks or libraries
- Fonts loaded via `font-display: swap` (set by Google Fonts)
- Animations use `transform` and `opacity` only — GPU-accelerated, no layout thrash
- `IntersectionObserver` used instead of scroll event listeners for reveal animations
- All scroll event listeners use `{ passive: true }`

---

## Deployment

Works on any static host:

- **Vercel:** `vercel deploy`
- **Netlify:** Drag the folder into the Netlify dashboard
- **GitHub Pages:** Push to a `gh-pages` branch
- **Any web server:** Upload all three files to the same directory

---

## License

MIT — free to use for personal and commercial projects.