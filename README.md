# isler-demo-scrollhero

Monday demo for the Isler India scroll-hero concept. Standalone project — completely independent from `Isler-India-Revamp`.

## What this is

A focused demo page featuring a scroll-driven, frame-sequence hero (Apple AirPods Pro-style). As the user scrolls, 100 frames animate on a canvas with synced text callouts and supplementary inset product images, all driven by GSAP ScrollTrigger. Below the hero: a real product range grid, USP section, and CTA block — content sourced from the main site.

## How to preview

Open `index.html` directly in a browser. No server, no build step required.

> Chrome or Edge recommended — `file://` canvas rendering is fully supported.

## Where to drop real frames

Once rendered, place frames here:

```
assets/images/hero-sequence/
  frame-001.webp
  frame-002.webp
  ...
  frame-100.webp
```

Naming must be zero-padded to 3 digits. Until real frames are present, the JS generates 100 programmatic placeholder frames so layout and animation can be tested immediately.

## Asset sources

The following assets were copied from `Isler-India-Revamp` (read-only — the source project was not modified):

| File | Used for |
|------|----------|
| `newlogo-removebg-preview.png` | Navbar logo + footer |
| `keyproduct-new.webp` | Range — Kitchen Chimney card |
| `keyproduct-builtin-hobs.jpg` | Range — Built-in Hobs card |
| `keyproduct-hobtops.jpg` | Range — Hobtops card |
| `oven-gold-grande.jpg` | Range — Built-in Ovens card |
| `microwave-silver-core.jpg` | Range — Built-in Microwave card |
| `small-appliances-1.png` | Range — Small Appliances card |
| `islerindia_chimney_curve_60_black-greymatte_a_05-400x310.png` | Hero inset at ~30% scroll |
| `hobtop-bravura-3b.jpg` | Hero inset at ~55% scroll |

The "Key Products Range" HTML structure, product names, and taglines, plus the "What Sets Us Apart" USP section copy, were sourced from `Isler-India-Revamp/index.html`.

## Project structure

```
isler-demo-scrollhero/
├── index.html                       Main page
├── assets/
│   ├── css/
│   │   ├── tokens.css               Palette, spacing, type tokens
│   │   ├── base.css                 Resets + body
│   │   └── hero.css                 Scroll-hero + inset image styles
│   ├── js/
│   │   └── hero-sequence.js         Frame loading + GSAP scroll + inset animations
│   └── images/
│       ├── hero-sequence/           Drop 100 .webp frames here
│       ├── newlogo-removebg-preview.png
│       ├── keyproduct-*.webp/jpg    Range section images
│       ├── oven-gold-grande.jpg
│       ├── microwave-silver-core.jpg
│       ├── small-appliances-1.png
│       ├── islerindia_chimney_curve_60_...png   Hero inset 1
│       └── hobtop-bravura-3b.jpg               Hero inset 2
└── README.md
```

## Independence

This project shares no live files with `Isler-India-Revamp`. Copied assets are standalone copies. Safe to delete, move, or modify without affecting the main site. All JS/CSS dependencies load from CDN (GSAP 3.12.5).
