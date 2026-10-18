# Talenmark Group — demo site

A Next.js 16 landing site for Talenmark's two verticals: **Structure** (Real Estate, Construction & Township Development) and **Sanctuary** (Hospitality).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # all routes prerender as static pages
```

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Split loader → split hero (hover widens a world, click expands it into its page) · manifesto with inline image pills · facts · stacking vertical cards · Cultural Centre clip reveal · values marquee · awards · promise · footer |
| `/real-estate` | Full-bleed hero · scrubbed intro · **elevation drawing that draws itself, then resolves into the photo** · practices list with cursor-trailing previews · Cultural Centre feature · principles · awards · next vertical |
| `/hospitality` | Mist-layered hero · **altitude counter to 2,600 ft over drawn contour lines** · Chilgrove · horizontal-scroll offerings · marquee · next vertical |

## How the motion fits together

- **GSAP + ScrollTrigger** for every animation, **Lenis** for smooth scrolling (`src/components/providers/SmoothScroll.tsx`).
- **`src/lib/stage.ts`** is a tiny shared store: the loader marks the intro done, and every page entrance reads how it was reached (first load, curtain, hero expand, back button) to time itself.
- **Page transitions** (`TransitionProvider.tsx`): two ink panels close from opposite edges, the route changes, then they part. `TransitionLink` uses it for any internal link.
- **Hero → vertical hand-off**: each hero half is a window onto a full-viewport image. Clicking widens the window to 100%, then the vertical page renders the same image at the same size, so the change of page is invisible.
- **Declarative reveals** (`motion/PageMotion.tsx`): add `data-reveal="up|words|chars|clip|line"` or `data-parallax="10"` to any element inside a page.

## Content & assets

- Copy and facts live in `src/lib/content.ts` (sourced from the Talenmark brief and talenmark.com).
- Photos are in `src/assets/images/`. They're the current site's renders, and several are low resolution — swapping in larger originals (especially the Chilgrove villa) will sharpen the cards and Chilgrove section noticeably.
- `cultural-centre-red.jpg` has a graphic panel baked into its right side; `redCrop` in `content.ts` keeps portrait crops clear of it.

Type: Cormorant (display), Hanken Grotesk (text), IBM Plex Mono (annotations). Brand red `#D31F31` is sampled from the logo.
