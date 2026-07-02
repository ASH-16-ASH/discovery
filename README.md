# Discovery Land Company — Website

A professional, responsive website inspired by [discoverylandco.com](https://discoverylandco.com/), built with pure HTML, CSS, and vanilla JavaScript.

## Quick Start

1. Extract the zip file
2. Open `index.html` in your browser (requires internet for images)
3. That's it — no build step, no dependencies

## File Structure

```
discovery-land-website/
├── index.html                    Main website (all 8 sections + SEO + lazy loading)
├── .gitignore                    Git configuration
├── README.md                     This file
├── DAILY-PROGRESS.md             Progress tracking (Day 1 + Day 2)
├── TUESDAY-NOTES.md              Day 1 build notes
├── WEDNESDAY-NOTES.md            Day 2 build notes
├── assets/
│   ├── css/
│   │   ├── reset.css             Browser normalization
│   │   ├── variables.css         Design tokens (colors, fonts, spacing)
│   │   ├── style.css             Main styles + Wednesday animations
│   │   ├── components.css        Reusable components (buttons, forms, badges)
│   │   └── responsive.css        Mobile, tablet, desktop breakpoints
│   └── js/
│       └── main.js               All interactive functionality + lazy loading
```

**Note:** Images are loaded from Unsplash CDN (no local image files). Internet connection required.

## Features (Tuesday — Day 1)

- **Flexbox Layout System**: All layouts use CSS Flexbox exclusively — no CSS Grid
- **8 Complete Sections**: Navigation, Hero, Our Worlds, Real Estate, Experiences, Discovery Family, CTA with Contact Form, Footer
- **Responsive Design**: Mobile (320px+), Tablet (576px+), Desktop (992px+), Large (1200px+)
- **Interactive Filtering**: Filter communities by region, properties by type
- **Smooth Scrolling**: Anchor links with offset for fixed nav
- **Mobile Menu**: Hamburger toggle with animated icon
- **Scroll Animations**: Fade-in elements on scroll via IntersectionObserver
- **Contact Form**: Full validation with success/error messages
- **Newsletter Signup**: Email subscription in footer
- **Search Prompt**: Basic search functionality
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML, reduced motion support
- **Print Styles**: Clean print layout

## Flexbox Properties Used

This project demonstrates comprehensive CSS Flexbox usage:

| Property | Where Used |
|---|---|
| `display: flex` | Nav, hero, filter tabs, all card grids, footer, forms |
| `flex-direction: row` | Nav bar, filter tabs, property specs, footer bottom |
| `flex-direction: column` | Mobile layouts, hamburger icon, footer links, spec items |
| `flex-wrap: wrap` | Card grids, filter tabs, hero buttons, footer columns |
| `justify-content: center` | Hero CTA, filter tabs, family grid, CTA grid |
| `justify-content: space-between` | Nav bar, footer bottom row |
| `align-items: center` | Nav bar, hero, mobile menu, experiences overlay |
| `align-items: stretch` | CTA grid on mobile |
| `align-self: center` | CTA card on mobile |
| `flex: <grow> <shrink> <basis>` | All card grids (3-col: 33.333%, 2-col: 50%, 1-col: 100%) |
| `flex-grow` | Footer brand column (flex-grow: 2 vs 1) |
| `flex-shrink` | Cards and footer columns |
| `flex-basis` | calc()-based column sizing throughout |
| `gap` | Every flex container uses gap for spacing |
| `order` | Hero buttons reordered on mobile |
| `min-width` | Flex items use min-width to trigger wrapping |

## Design Specs

| Token     | Value                           |
|-----------|---------------------------------|
| Primary   | `#1a1a1a` (Black)               |
| Secondary | `#ffffff` (White)               |
| Accent    | `#d4af37` (Gold)                |
| Light BG  | `#f5f5f5`                       |
| Dark BG   | `#0f0f0f`                       |
| Fonts     | System sans-serif + Georgia     |

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+
- Mobile Safari & Chrome

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit: Discovery Land website"
git remote add origin https://github.com/YOUR-USERNAME/discovery-land-website.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in your repo settings (Settings → Pages → Source: main branch).

## Wednesday (Day 2) Additions

- **Online Images**: 11 real photos from Unsplash replacing SVG placeholders
- **Lazy Loading**: IntersectionObserver-based with fade-in, preloading, error fallback
- **SEO**: Full OpenGraph, Twitter Cards, JSON-LD structured data
- **Enhanced Animations**: Slide-in, scale-in, stagger effects
- **Enhanced Hover States**: "View Community →" text, gold underline on property cards
- **Back-to-Top Button**: Scroll-aware with smooth scroll
- **Real-time Validation**: Blur + input field validation, loading states
- **Performance**: Preconnect, passive listeners, debounced resize

## Upcoming

- **Thursday (Day 3)**: Cross-browser polish, accessibility audit, Lighthouse optimization, production-ready code
