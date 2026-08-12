# Meera Tours & Travels — Website

## What's in this folder

```
index.html          The page itself — all content and section structure
css/styles.css       All design: colors, fonts, spacing, layout
js/script.js         Booking form logic, validation, WhatsApp send, menu/scroll behavior
js/cities.js         The list of Maharashtra cities that powers the pickup/drop autocomplete
images/              Photos used on the site
robots.txt           Tells search engines they're allowed to crawl the site
sitemap.xml          Tells search engines what pages exist (currently just the homepage)
```

## Before you go live — replace these placeholders

| What | Where | Find |
|---|---|---|
| Phone number | `index.html` (appears ~6 times) | `+91XXXXXXXXXX` |
| WhatsApp number | `js/script.js`, line ~4 | `whatsappNumber = "919310540386"` |
| Business address | `index.html`, in the `<script type="application/ld+json">` block near the top | `"addressLocality": "Pune"` |
| Social preview image | Add a 1200×630px image at `images/og-cover.jpg` | referenced in the `<meta property="og:image">` tag |

## Common edits and where to make them

**Change any text on the page (headings, service descriptions, review quotes)**
→ `index.html`. Everything is plain text inside its tag — search for the words you see on screen.

**Change colors**
→ `css/styles.css`, top of the file, inside `:root{ ... }`. Every color used anywhere on the site is a variable here (`--amber-500`, `--navy-950`, etc.) — change it once, it updates everywhere.

**Change fonts**
→ `css/styles.css`, same `:root` block (`--font-display`, `--font-head`, `--font-body`), and the Google Fonts `<link>` near the top of `index.html` if you want different typefaces loaded.

**Add or remove a vehicle from the Fleet section**
→ `index.html`, search for `id="fleet"`. Copy one `.fleet-card` block and edit the name/seats/description. Also update the `<select id="vehicle">` list further down in the booking form so it stays in sync.

**Add or remove a service**
→ `index.html`, search for `id="services"`. Same pattern — copy one `.svc-card` block.

**Change what happens when someone submits the booking form**
→ `js/script.js`. The `whatsappNumber` variable controls where it's sent; the `validate()` function controls which fields are required.

**Add a new section**
→ Add the HTML inside the `<div class="route-inner">...</div>` wrapper in `index.html` so it inherits the route-line design; give it a heading with the `.eyebrow` + `<h2>` pattern used by the other sections for visual consistency.

## Structure notes

- The **route line** (the dashed vertical line with pin markers) is purely decorative CSS (`.route-track`, `.route-pin`) — it doesn't require any JS and disappears automatically on mobile.
- The site has **no build step** — it's plain HTML/CSS/JS, so you can edit and refresh the browser to see changes immediately. No `npm install`, no compiling.
- `js/cities.js` almost never needs editing — it's just data.
