# Changelog

## 2026-06-23 — Best + Tablet tiers: re-extracted row-5 images, all variants, Customer Billing Prices

Re-ran the row-5 rich-value rule on the BEST + TABLET HOBS sheets of `final_Hobs_excel.xlsx` (anchor chain `vm=N → richValue N-1 → rId N → imageN`). Pictures confirmed on row 5.

### Best tier — FlareLux (IS H2 Series), product-flarelux.html
- Expanded from 1 variant to **5 image-backed variants** with a variant selector: 1001 (3B·60cm, **₹11,618**), 1002 (3B·78cm, **₹12,153**), 1003 (3B·90cm, Price on request), 1005 (4B·80cm, Price on request), 1006 (4B·90cm, **₹14,927**).
- 🚩 **1004 & 1007 skipped** — no row-5 rich-value image exists (1007's cell holds literal "Picture" text).
- Images: row-5 image16 → IS-H2-Series-1001/1002/1003.png (shared); image17 → 1005/1006.png. All verified **clean — genuine Isler badge**, no competitor/₹ text. The previous IS-H2-Series-1003.png (broken-extraction, 767×461) was overwritten with the correct row-5 photo (544×320).
- built-in-hobs.html Best tier: 1 card → **5 per-variant cards**.

### Tablet tier — Flamora (IS H Series), product-flamora-tablet.html
- Expanded to **3 variants** with a selector: 4001 (3B·78cm, **₹11,307**), 4002 (4B·60cm, **₹11,307**), 4003 (4B·78cm, **₹9,247**).
- Images: row-5 image30 → IS-H-Series-4001.png; image31 → IS-H-Series-4003.png; 4002 kept its existing image (no row-5 source exists for 4002).
- ⚠️ **BRAND-LEAK OVERRIDE (owner-approved):** all three Flamora row-5 photos carry a **non-Isler script wordmark** on the glass — they FAIL the brand check. Flagged in the report; the owner chose "publish Flamora anyway." Published as instructed. Note: the automated text leak-scan cannot detect a logo baked into a photo, so this image-borne mark is NOT caught by grep — it remains on the live photos by decision.
- built-in-hobs.html Tablet tier: 1 card → **3 per-variant cards**.

### Prices
Customer Billing Price column (same as Good/Better), rounded to whole ₹. Blanks hidden as "Price on request" (FlareLux 1003 & 1005).

### Other BEST-sheet families (Elisa/IS I, Flamora/IS H1, Exotica/IS C1, IS CB, IS HM1) and Tablet's Ignis Pro (IS D) were reported but **not published** — out of the current site's Best=FlareLux / Tablet=Flamora scope.

### Leak scan
Whole-site text grep: zero competitor brand names, zero competitor prices, zero cost/markup/MOQ/ex-factory/2.5-factor terms. (Exception, by owner decision: the non-Isler wordmark embedded in the 3 Flamora tablet photos — image-borne, not text.)

### Files changed
`product-flarelux.html`, `product-flamora-tablet.html`, `built-in-hobs.html`, `assets/catalog/manifest.csv`; new images in `assets/catalog/hobs/best/` (IS-H2-Series-1001/1002/1005/1006.png, 1003 replaced) and `assets/catalog/hobs/tablet-hobs/` (IS-H-Series-4001/4003.png).

---

## 2026-06-23 — Induction + Hybrid cooktop pages; site-wide price → Customer Billing Price

### Part 1 — Prices switched to "Customer Billing Price" (rounded to whole ₹)
Source: `final_Hobs_excel.xlsx` (GOOD/BETTER/BEST sheets, transposed layout; row-labelled `Customer Billing Price`). Display rule unchanged: show where a value exists, hide ("Price on request") where blank.
- **product-alpha.html** (Better / IS H3): 1001 ₹19,000→₹10,047 · 1002 ₹20,490→₹10,847 · 1003 ₹20,500→₹11,633 · 1004 ₹20,250→₹11,720 · 1005 ₹20,000→₹12,748 · 1006 ₹20,000→₹12,947 · 1007 ₹21,000→₹15,842.
- **product-neo-cook.html** (Good / IS C2): 1001 ₹13,000→₹7,438 · 1002 ₹13,500→₹7,579 · 1003 ₹16,749→**Price on request** (billing cell = 0).
- **product-flarelux.html** (Best / IS H2 1003): ₹31,500→**Price on request** (billing blank).
- **built-in-hobs.html** tier cards: Good ₹13,000→₹7,438 · Better ₹19,000→₹10,047 · Best ₹31,500→Price on request · Tablet ₹1,600→Price on request.
- Gas & Infrared already showed "Price on request"; the `Isler Gas Cooktops.xlsx` and non-gas workbook have **no** Customer Billing Price column, so those stay on request.
- ⚠️ Note flagged to owner: in the hobs workbook `2.5 factor price = Customer Billing Price × 2.5`, i.e. the column is the ex-factory cost base. Publishing was explicitly confirmed by the owner.

### Part 2 — Induction + Hybrid cooktops (new)
Built from `non gas cooktops excel.xlsx` (Induction = sheet2, Hybrid = sheet3). Only public spec fields used; cost/markup/ex-factory/2.5-factor/competitor/MOQ/roadmap excluded.
- **Images** extracted via the rich-value (`vm`) rule, NOT drawing-anchored objects (image6/7/8 are the Pricing sheet's competitor drawing — excluded). All 5 rich-value photos verified pixel-by-pixel: real product shots, no competitor brands, no ₹ figures. Saved to `assets/catalog/non-gas-cooktops/induction/` (IS-AM2-Series-1001..1004; 1002 & 1003 share the same source photo) and `…/hybrid/` (IS-H2-Series-1001/1002).
- **induction-cooktops.html** (listing, 4 power variants) + **product-induction-cooktop.html** (detail, variant axis = Power 1350/1600/1800/2000 W). All 4 image-backed.
- **hybrid-cooktops.html** (listing, 2 size variants) + **product-hybrid-cooktop.html** (detail, variant axis = Size 90/60 cm). Both image-backed.
- Reuse the exact revamp2 `.cat-nav` navbar + 4-column footer + `catalog.js` variant selector. CTA = "Enquire" → contact.html; no cart/checkout. Prices "Price on request" (no Customer Billing Price in the non-gas workbook).
- ⚠️ Note flagged to owner: Hybrid model codes `IS H2 Series 1001/1002` collide with the Best-tier hobs codes (`IS H2 Series 1001-1007`) in the source data; kept faithful to the Hybrid sheet.

### Electric Cooktops dropdown + footer (all pages)
- `.cat-nav` Electric Cooktops dropdown: Induction & Hybrid now live links (removed "Soon"), Infrared unchanged — updated on all 9 catalog pages (+ the 4 new pages ship correct).
- Footer Products column on the 9 catalog pages: "Induction Cooktops — Coming soon" → live link, added "Hybrid Cooktops". The mega-menu pages (index/about/career/contact) already linked both live — left as-is.

### Post-build leak scan
Whole-site grep: zero competitor brands, zero competitor prices, zero cost/markup/MOQ/ex-factory/2.5-factor terms. The only ₹ figures on the site are the 11 intended hob billing prices. All new/edited `window.PRODUCT` JSON validated.

---

## 2026-06-11 — Built about.html, career.html, contact.html (ported from isler-india-revamp)

Created three self-contained pages in revamp2, porting verbatim content from the source `isler-india-revamp` site and adapting to revamp2's design system. No partials/build step — plain inlined HTML, each opens by double-click.

### Shared chrome (identical on every page + index.html)
- Inlined the exact revamp2 navbar (glass pill, logo, search, **Categories** mega-menu with the 5 Cooking + 3 Other Categories cells) and the 4-column footer, copied from `index.html`. Same `initMegamenu()` + footer-accordion JS.
- Links the same external CSS (`tokens.css`, `base.css`, `footer.css`); navbar/mega-menu component CSS inlined per page.
- **Font:** uses the site's actual **Supreme** typeface (via `base.css`), i.e. matches `index.html` exactly. (The build brief said "Montserrat", but index.html does not use Montserrat — matching the homepage was the explicit dominant requirement, so Supreme was kept. Flagging for override if Montserrat is truly wanted.)
- Page-hero pattern (breadcrumb + eyebrow + H1 + description over a dark hero image) and yellow ambient-glow circles on light sections, consistent across all three.

### Content (verbatim from confirmed Phase 1 report)
- **about.html** — hero "Empowering Brand Innovation"; Who We Are (3 paras + 4 bullets + Vision/Mission); Next-Gen (2 paras + 50+/99% stats); Motto "Innovate. Elevate. Succeed." with Pravesh Kumar (Founder & CEO); yellow CTA strip. Images: `about-hero.jpg`, `about-who-we-are.jpg`, `pravesh.png`.
- **career.html** — hero "Empowering Innovation, Excellence, and Growth"; Why Join Us (navy, 5 values + team image `our_team_banner_r-2-1.jpg`); 5 expandable job cards (Plant Manager, Sourcing Manager, Industrial Design Lead, Design Engineer, Quality Assurance Engineer) with full Roles & Responsibilities; application form (Full Name/Email/Phone/Applying for/Resume upload) + contacts; CTA strip. Image: `careers-hero.jpg`.
- **contact.html** — hero "Contact Us"; "Drop A Message to Us" form (Name/Email/Phone/Subject/Message); navy Contact Information sidebar (address, +91 971 7737 964, info@islerindia.com, hours) + WhatsApp button; "Our Global Presence" as **3 office cards only** (Delhi/NCR HQ, Newark, Vienna) — interactive world map skipped per decision. Image: `contact-hero.jpg`.

### Decisions applied
1. Footer Company column → About Isler/Career/Contact wired to the new pages; **Blog** = `#` with subtle "Coming soon"; **Our Team** dropped. Applied to all pages incl. index.html.
2. Career form = placeholder no-op submit → shows "Thank you — please email your resume to career@islerindia.com". Contact form likewise shows a friendly confirmation (no live submission).
3. Global Presence = office cards only; `world-map.svg` and map JS not ported.

### Navigation wiring
- Navbar About/Careers/Contact → about.html/career.html/contact.html on **all** pages including index.html (updated index.html's nav + footer Company column).
- On sub-pages: logo + footer bottom logo → `index.html`; Categories trigger + footer "View All" → `index.html#range`; footer Products → the (not-yet-built) product page filenames.

### Assets
- Copied into `assets/images/`: `about-hero.jpg`, `about-who-we-are.jpg`, `pravesh.png`, `careers-hero.jpg`, `our_team_banner_r-2-1.jpg`, `contact-hero.jpg`. (`world-map.svg` intentionally skipped.)

### Verified
- Headless-Chrome screenshots (desktop 1440 + mobile 390) of all three pages: navbar pill, hero, sections, and footer render correctly and match the homepage chrome; mobile stacks to single column and the nav pill scales down.
- index.html otherwise untouched (only nav + footer Company links changed).

---

## 2026-06-11 — Categories mega-menu: restructured around real product taxonomy

Rebuilt only the dropdown's item list/structure (`index.html`, `.demo-megamenu`). Panel styling, glassmorphism, positioning, and the `initMegamenu()` bridge-hover/tap logic are untouched — same `#products-trigger` / `#products-megamenu` wiring.

### New structure — two groups
- **Cooking Appliances** (5 items, `.demo-mm__row--5`), each linking to its product page:
  - Built-in Hobs → `built-in-hobs.html` — "Gas hobs — Good, Better & Best tiers"
  - Gas Cooktops → `gas-cooktops.html` — "Freestanding 3 & 4 burner"
  - Induction Cooktops → `induction-cooktops.html` — "Touch control, multi-menu"
  - Infrared Cooktops → `infrared-cooktops.html` — "Crystal glass, ISI certified"
  - Hybrid Cooktops → `hybrid-cooktops.html` — "Gas + induction + infrared"
  - ⚠️ These 5 target pages **do not exist yet** (intentional — hrefs pre-wired for a later build step).
- **Other Categories** (3 items, `.demo-mm__row--3`), `href="#"` placeholders with a subtle "Coming soon" tag:
  - Kitchen Chimney — "BLDC, filterless, auto-clean"
  - Built-in Ovens — "Silver, Gold & Diamond tiers"
  - Built-in Microwave — "Smart displays, precision controls"

### Thumbnails (from `assets/catalog/`, real Isler product images)
- Hobs `hobs/_hero-photos/hob-13.png`; Gas `gas-cooktops/gas-cooktop-Domestic-3B.jpg`; Induction `non-gas-cooktops/_hero-photos/cooktop-01.png`; Infrared `non-gas-cooktops/infrared/IS-AM1-Series-1001.png`; Hybrid `non-gas-cooktops/_hero-photos/cooktop-04.png`.
- Other Categories reuse existing correct thumbnails in `assets/images/` (chimney, oven, microwave).

### CSS
- Added `.demo-mm__row--5` (repeat(5,1fr)) and `.demo-mm__row--3` (repeat(3,1fr)); both fold to 2-col ≤1023px and 1-col ≤559px alongside `--4`.
- Added subtle `.demo-mm__soon` style (9px, uppercase, muted, 0.65 opacity).
- Removed obsolete menu items (Hobtops, Small Appliances) and the old "Built-in Appliances" / "Cooking & Small Appliances" group labels. Previous cells linked to `#range`; now real page hrefs.

---

## 2026-06-11 — Navbar: renamed "Products" item to "Categories" (label only)

### Change
- Changed the mega-menu trigger's visible text from **"Products" → "Categories"** (`index.html`, the `#products-trigger` link).
- Updated the panel's screen-reader label `aria-label="Our Products navigation"` → `"Our Categories navigation"` for consistency.

### Untouched (intentional)
- No CSS classes, IDs, JS variables, or file references changed — `id="products-trigger"`, `id="products-megamenu"`, `aria-controls`, and the `initMegamenu()` JS all remain as-is, so the dropdown still opens/closes exactly as before.
- Mega-menu contents (the 6 category cells) left alone — handled in a later change.
- Other "Products" text elsewhere on the page (hero CTA "Explore Products", "Key Products Range" heading, footer "Products" column) is page content, not this nav item, so left unchanged.

---

## 2026-06-10 — Mega-menu: pill-width positioning, frosted glass, overflow fix

### Problems fixed
1. The panel used a fixed `width: min(880px, …)` centered with `translateX(-50%)`, so it was narrower than the pill and the last item ("Built-in Microwave") could crowd/bleed toward the right edge.
2. Inside the panel, the last grid cell overflowed its column by ~35px — the classic CSS-grid `min-width: auto` behavior (a grid item refuses to shrink below its content), pushing the cell past the inner padding to the panel border.

### Positioning (`.demo-megamenu`)
- Replaced fixed-width centering with `left: 0; right: 0; margin: 0 auto` so the panel spans the **full pill width** and inherits the pill's centering (the pill `.demo-nav` is the containing block via its `transform`). It can no longer exceed the pill or the viewport.
- `top: calc(100% + 12px)`; removed the `translateX(-50%)` from both base and `.is-open` transforms (now just `translateY`).
- Removed the now-redundant `width: calc(100vw - 24px)` override in the ≤1023px media query — `left:0/right:0` handles every width.

### Frosted glassmorphism (was solid white)
- `background: rgba(255,255,255,0.85)` + `backdrop-filter: blur(24px) saturate(180%)` (+ `-webkit-` prefix), `border: 1px solid rgba(255,255,255,0.4)`, `box-shadow: 0 24px 64px rgba(0,0,0,0.25)`, `border-radius: 20px`. Light frosted version kept — verified readable (crisp navy text) against the dark hero; the hero shows through faintly without harming legibility.

### Grid / overflow
- Added `min-width: 0` to `.demo-mm__cell` so each grid item shrinks to its track (text already truncates via `min-width:0` + ellipsis). Last cell now ends inside the grid with a proper 35px right gap; `panel.scrollWidth - clientWidth === 0`.
- Bumped row `gap` 6→10px and inner padding to `28px 34px` to use the extra width comfortably. Top row still 4 across, bottom row 2.

### Verification (headless Chromium)
- **1440px:** pill 140–1300, panel 141–1299 (spans pill, within viewport); all cells contained; top row 4 cols
- **1280px:** pill 60–1220, panel 61–1219 (spans pill, within viewport); all cells contained
- Internal: row-right 1264, last-cell-right 1264, right padding gap 35px, no horizontal overflow
- Frosted glass renders translucent but text stays crisp
- Mobile (390px): panel open, within viewport, aligned to pill, single column, zero overflow — accordion/tap behavior unchanged

---

## 2026-06-10 — "Our Products" mega-menu added to navbar (from Isler-India-Revamp)

### Source
- HTML: `Isler-India-Revamp/index.html` — trigger lines 117–137, full-width panel lines 167–258 (`.navbar__megamenu` / `.megamenu__*`)
- CSS: `Isler-India-Revamp/assets/css/components.css` lines 524–792
- JS: `Isler-India-Revamp/assets/js/nav.js` — `initMegamenu()` (lines 212–278): hover-bridge open/close, 180ms close delay, mobile click toggle, outside-click + Escape close
- Images: `islerindia_chimney_t-shape_60_blackmatte_b_01-400x310.png` + `hob-brillare.jpg` copied into demo `assets/images/` (oven, microwave, hobtop, small-appliances thumbnails already present)

### Files changed (`index.html` only — all self-contained)
- Navbar: the plain "Products" link became `#products-nav-item` with a chevron trigger (`#products-trigger`) + the `#products-megamenu` panel, added as an absolutely-positioned child of the `.demo-nav` pill
- Inline `<style>`: new "OUR PRODUCTS MEGA-MENU" CSS block (after the navbar rules)
- Before `</body>`: new inline `initMegamenu()` script (adapted from source `nav.js`)

### Adapted to the demo's glass-pill navbar
- Panel is a white rounded card (`min(880px, 100vw−32px)`) that drops 14px below the pill, centered, with a soft navy shadow — chosen over a dark panel because (per brief) the white panel reads cleaner and looks good against the dark hero (verified)
- **Hover bridge:** a transparent `.demo-megamenu::before` (16px tall, full panel width) spans the gap so the cursor doesn't fall through; combined with the JS 180ms close delay + panel `mouseenter` clearing the timer
- Accents mapped to demo tokens: category labels use `--gray-mid` uppercase; product name → `--yellow` on hover; arrow indicator + active underline in `--yellow`; trigger chevron flips 180° when open
- Cells: 56px thumbnail + name + tagline + hover arrow; hover bg `rgba(244,180,0,0.08)`
- Built-in row = 4 columns; Cooking row = 2 items in the same cell style

### Interaction
- Desktop (≥1024px): hover "Products" opens; moving into the panel keeps it open (bridge); moving away closes after 180ms; active-state underline + caret flip on the trigger
- Mobile (<1024px): tap toggles the panel (no navigation); grid collapses to 2 columns (≤1023) then 1 column (≤559); outside-tap and Escape close
- Demo has no hamburger/slide-in menu, so the source's in-menu accordion was adapted to a tap-toggle dropdown reusing the same panel

### Links
- All six product cells point to `#range` (the demo's product section) — the individual product pages (kitchen-chimney.html, etc.) don't exist in the demo, so this is a safe, functional placeholder that doesn't 404.

### Verification (headless Chromium)
- Desktop: hover opens (opacity 1, aria-expanded/aria-hidden flip); 6 cells with correct names, all 6 verbatim taglines, both category labels, all 6 thumbnails decode
- Bridge: cursor moving trigger → gap → panel keeps it open
- Hover: cell name computes to `rgb(244,180,0)` (brand yellow); arrow reveals
- Move-away closes cleanly; outside-click + Escape close
- Mobile (390px): tap opens (single-column), tap again closes
- Regression: other nav links (About/Products/Careers/Contact) intact, fresh load at `scrollY=0` — logo, search, glassmorphism, hero, and page sections unaffected

---

## 2026-06-10 — Insights / Blog section added (from Isler-India-Revamp)

### Source
- HTML: `Isler-India-Revamp/index.html` lines 564–630 (homepage `<!-- BLOG SECTION -->` — "Insights" eyebrow, "From the Isler Blog", 3 preview cards + "View All Articles")
- CSS: `Isler-India-Revamp/assets/css/sections.css` lines 1830–1944 (`.blog-grid`, `.blog-card*`)
- Images: `blog-post-1-thumb.png`, `blog-post-2.png`, `blog-post-3.png` (copied into demo `assets/images/`)

### Placement
New section inserted **after** USP / What Sets Us Apart and **before** the CTA box. Page order is now: Hero → The Range → USP → **Insights / Blog** → CTA → Footer. The old "SECTION 4 — CTA Box" comment was renumbered to "SECTION 5".

### Files changed
- `index.html` — added `<section id="insights" class="blog-section">` with 3 `.blog-card` articles (verbatim titles, dates, categories, excerpts from the source) and inline section CSS in the `<style>` block between the USP and CTA-box rules
- `assets/images/` — 3 blog thumbnails copied in (source folder untouched)

### Adapted to demo tokens (source used a teal/`--surface` theme)
- Accent (category label, title hover, CTA hover): teal → `var(--yellow)`
- Title / CTA base color: `var(--navy)`; section background: `var(--off-white)`; card surface: `var(--white)`
- Uses the demo's existing `.section-header` / `.section-eyebrow` / `.section-heading` pattern (matches Range & USP); added a small `.section-sub` for the subhead
- Card hover matches the demo's Range cards: image `scale(1.06)`, card lift `translateY(-3px)` + soft navy shadow
- Two ambient-circle glows added to match the other light sections
- "View All Articles" restyled as a navy outline pill (`.blog-view-all`)

### Links
- All post links and "Read More" / "View All Articles" point to `#` placeholders — the individual blog post pages don't exist in the demo, so nothing 404s.

### Verification (headless Chromium)
- Section renders after USP; 3 cards with correct titles, dates ("October 9, 2024", "September 14, 2024", "May 29, 2024"), and thumbnails (all decode at 1920×1280)
- Desktop: 3-up grid; hover lifts card + scales image; styling consistent with rest of demo
- Mobile (390px): grid collapses to single column, cards stack cleanly (image → meta → title → excerpt → CTA)
- Regression check: fresh load still at `scrollY=0` with hero scene 1 at opacity 1 — hero, Range, USP, CTA, footer all intact

---

## 2026-06-10 — USP section lightened for navbar logo legibility

### Problem
The fixed navbar is a translucent glass pill (`rgba(7,17,44,0.25)` + blur). The logo's "Isler" wordmark is dark indigo, so when the pill scrolled over the dark-navy USP section (`#0B1A3D`), the dark wordmark blended into the dark pill and became unreadable. (The orange diamond icon stayed visible; only the wordmark disappeared.)

### Change (`index.html`)
- `.usp-section` background: `var(--navy)` (#0B1A3D) → `#475A82` — a lighter slate-blue. Chosen by rendering the navbar over five candidate shades; this is the lightest-feeling minimum at which the dark wordmark reads clearly while the section still looks like a deep, premium dark band (not washed out) and white headings stay crisp.
- `.usp-card__text` color: `rgba(255,255,255,0.52)` → `rgba(255,255,255,0.72)` — the muted body copy needed a slightly stronger alpha to keep its contrast on the lighter background.

### Verification (headless Chromium, 1440×900)
Screenshotted the navbar parked over the navy section: the "Isler" wordmark is now legible, white headings/eyebrow/number accents remain strong, and body text reads cleanly. The lighter slate also eases the transition into the off-white CTA section below.

---

## 2026-06-10 — Stacked text fix: immediateRender moved to to-vars

### Root cause (why the previous immediateRender fix didn't work)
The earlier "Hero stacked text scenes fix" placed `immediateRender: false` inside the **from-vars** object of each `fromTo()` tween. GSAP parses `immediateRender` as a special property of the **to-vars**; in the from-vars it is ignored. Every `fromTo()` therefore kept its default `immediateRender: true` and stamped its from-state at timeline build time — the exit tweens' `{ opacity: 1, y: 0 }` from-states set all 5 text scenes (and all 5 image layers) to `opacity: 1` on load, overriding the `gsap.set()` initial states. Images masked each other (opaque, full-bleed) so only the text stacking was visible.

### Fix
In `assets/js/hero-sequence.js`, for all six `fromTo()` calls (image scale, image fade-in, image fade-out, text entry, scene-1 text exit, scenes 2–5 text exit): removed `immediateRender: false` from the from-vars and added it to the to-vars. No other changes — `gsap.set()` initial states remain the single source of truth at load.

### Second bug found during verification: reload didn't return to top (Fix 1b)
Automated browser testing of the "scroll to footer → hard reload" case showed the page reloading at the bottom, not the top. Root cause: ScrollTrigger auto-registers when its CDN script evaluates — *before* `hero-sequence.js` runs (deferred scripts execute in order) — and snapshots `history.scrollRestoration` (`'auto'`) at that moment. Every `ScrollTrigger.refresh()` (including the one in the page's own `load` handler) re-applies that snapshot, silently reverting Fix 1's `'manual'` back to `'auto'`, so Chrome restored the old scroll position on reload. Fixed by adding `ScrollTrigger.clearScrollMemory('manual')` right after `gsap.registerPlugin(ScrollTrigger)` — the documented GSAP API that updates the snapshot so `'manual'` survives refreshes.

### Verification (headless Chromium via Puppeteer, 1440×900)
All 14 automated checks pass:
- Fresh load: only scene 1 text + scene 1 image visible (`txt=[1,0,0,0,0] img=[1,0,0,0,0]`) — no stacking
- Scroll down through scene midpoints: scenes 1→2→3→4→5 each show exactly one text + one image layer
- Scroll back up: 4→3→2→1 reverses cleanly, one scene at a time
- Scroll to footer → cache-disabled reload: page loads at `scrollY=0`, only scene 1 visible
- After reload: scrolling down to scene 3 and back up to scene 1 both work

---

## 2026-06-10 — Footer replaced with Havells-style 4-column footer

### Source
- HTML: `Isler-India-Revamp/index.html` lines 661–790
- CSS: `Isler-India-Revamp/assets/css/components.css` lines 971–1311

### Files changed
- `index.html` — old `<footer class="footer">` replaced; old inline footer CSS block removed; `<link>` to `footer.css` added; accordion JS added before `</body>`
- `assets/css/footer.css` — **new file** created with all footer styles (self-contained, no token dependencies except brand colors hardcoded)

### What's in the new footer
- Yellow accent bar (`border-top: 4px solid #F4B400`) at top of footer
- White main section with 4-column grid: Products · Company · Resources · Get in Touch
- Contact column: address, phone, email, hours — all with yellow icon accents
- Newsletter signup: email input + yellow arrow submit button
- Bottom strip (`#FAF8F2`): logo left · copyright + ISO certs center · social icons + "🇮🇳 Made in India" right
- Mobile (<768px): single-column stacking, contact column floats to top, Products/Company/Resources collapse into tap-to-expand accordions

### Link targets
- Products column links all point to `#range` (demo anchor)
- Company and Resources links are `#` placeholders (pages don't exist in demo)
- Social links point to live Isler social profiles
- Copyright year: 2026 (updated from 2025)

---

## 2026-06-10 — Footer full-width spread + link reorder

### Layout
- Removed `max-width: 1140px; margin: 0 auto` from `.footer-inner` — logo and links now span full viewport width (edge-to-edge within footer padding)
- Footer horizontal padding updated to `clamp(32px, 5vw, 96px)` for fluid edge spacing (~64px at 1280px viewport)
- Logo sits at the far left, links group at the far right, `justify-content: space-between`
- Mobile (<768px): stacks vertically, logo above links, both centered

### Link order
- Old: Products, About, Contact, Careers
- New: About, Products, Careers, Contact

---

## 2026-06-10 — CSS-first defensive layer for stacked text bug

Adds belt-and-suspenders CSS so the stacked-text state is impossible even if JavaScript fails to load or runs late.

### Changes to `assets/css/hero.css`
- `.hero-scene`: added `pointer-events: none` so hidden scenes can't intercept clicks
- New selector `.hero-scene.is-active, .hero-scene:first-of-type` replaces the old `:first-child`-only rule — gives the JS a class hook (`is-active`) it can toggle if needed, while keeping the structural fallback that the first scene is visible at load
- Existing `translateY(-20px)` direction kept (matches JS `y: -20`); spec's `translateY(20px)` would have desynced the static state from the animation
- `.scene-cta { pointer-events: auto }` retained so the CTA button on scene 5 remains clickable

### Effect
With JS disabled: only scene 1 is visible; scenes 2–5 are hidden and non-interactive. With JS enabled: GSAP overrides opacity/transform inline and the scroll-driven crossfade runs as before.

---

## 2026-06-10 — Hero stacked text scenes fix (immediateRender)

### Root cause
Cause B — `immediateRender: true` default on `fromTo` tweens. When the GSAP timeline is built, `fromTo` tweens apply their "from" state immediately to the target element. The exit tweens for text scenes 2–5 have `{ opacity: 1, y: 0 }` as their from-state. Because `immediateRender` defaulted to `true`, GSAP set those elements to `opacity: 1` the moment the timeline was constructed — overriding the `gsap.set({ opacity: 0 })` calls that preceded them. Result: all 5 scenes rendered fully visible on load.

Cause A (CSS defaults) was ruled out — `.hero-scene` already had `opacity: 0` and `:first-child` had `opacity: 1`.
Cause C (missing exit tweens) was ruled out — all paired fade-in/fade-out tweens were present.

### Fix
Added `immediateRender: false` to the `fromVars` of every `fromTo` tween in both the image and text timelines. This tells GSAP to never auto-apply from-states at build time; `gsap.set()` is the sole authority on initial visual state.

---

## 2026-06-10 — Hero scroll-restoration init bug fix

### Root cause
Classic "scroll position restored before ScrollTrigger initialised" bug. Browser restores scroll position on hard refresh before JS runs, so ScrollTrigger reads a mid-page offset and initialises its timeline from that point — all tweens before the current position are never played, leaving image layers at opacity 0 and text scenes stacked with their CSS-set states.

### Fixes applied (all four)

**Fix 1 — Disable browser scroll restoration** (`history.scrollRestoration = 'manual'`): prevents the browser from restoring scroll position on reload. Runs at the very top of the IIFE, before any GSAP setup.

**Fix 2 — Force scroll to top on script parse** (`window.scrollTo(0, 0)`): belt-and-suspenders backup that runs immediately, before `DOMContentLoaded`, ensuring position is 0 before ScrollTrigger initialises.

**Fix 3 — `ScrollTrigger.refresh()` on `load`**: recalculates all trigger positions after images and fonts have loaded (layout may shift between DOMContentLoaded and load). Also calls `window.scrollTo(0, 0)` again to catch any browser late-restoration.

**Fix 4 — Explicit `gsap.set()` initial states**: sets all image layers to `opacity: 0, scale: 1.05` and all text scenes to `opacity: 0, y: -20` before the timeline is built, then sets layer 0 and scene 0 to their visible states. Guarantees correct visual starting frame regardless of what ScrollTrigger applies.

Fix 5 (`immediateRender: false`) was not needed — no flicker observed after fixes 1–4.

---

## 2026-06-10 — Hero scroll reverse bug fix

### Root cause
Timeline asymmetry (cause #1 from spec). All fade-out tweens used `imgTl.to(el, { opacity: 0 })` — one-directional tweens that capture their `from` value at first play time. In a scrubbed GSAP timeline this is unreliable: if the user reverses before a tween has played, GSAP has no recorded start value and the opacity doesn't restore. Same issue affected text scene exit tweens.

### Fix
Converted every `to()` opacity/transform tween to `fromTo()` with explicit start and end states:
- Image fade-out: `to({ opacity: 0 })` → `fromTo({ opacity: 1 }, { opacity: 0 })`
- Text scene 0 exit: `to({ opacity: 0, y: -20 })` → `fromTo({ opacity: 1, y: 0 }, { opacity: 0, y: -20 })`
- Text scenes 1-4 exit: same conversion

All other tweens were already `fromTo` — no changes needed there.

### Result
Timeline is fully bidirectional. Scrolling up reverses all crossfades in correct order regardless of speed or stop/start behaviour.

---

## 2026-06-10 — Navbar glassmorphism fix

### Problem
Navbar pill background was `rgba(7, 17, 44, 0.74)` — 74% opacity reads as a solid navy bar, defeating the glassmorphism intent.

### Changes
- Background alpha: `0.74` → `0.25` — visibly translucent against all backgrounds
- `backdrop-filter`: `blur(18px)` → `blur(20px) saturate(180%)` — the `saturate(180%)` boost is what creates the true frosted-glass effect (colors bleed through vividly, Apple macOS/iOS style)
- `-webkit-backdrop-filter` updated to match
- Added `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15)` — grounds the pill without adding weight
- Nav link `text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2)` — maintains legibility against light backgrounds now that the pill is transparent

### Result
Pill appears frosted and translucent: dark hero content bleeds through as deep smoky tones, cream sections bleed through as warm frost. Text stays legible across all scroll positions.

---

## 2026-06-09 — Ambient circle glows on light sections (AW InfraSec pattern)

### Ambient glows — Range section
- `::before`: ~700px circle bleeding off left edge at 28% from top (`rgba(244,180,0,0.12)`); ~480px circle bleeding off right edge at 74% (`rgba(230,149,0,0.09)`)
- `::after`: ~340px circle bleeding off right edge, vertically centered (`rgba(244,180,0,0.07)`)

### Ambient glows — CTA section
- `::before`: ~640px circle bleeding off left edge at 30% (`rgba(244,180,0,0.11)`)
- `::after`: ~440px circle bleeding off right edge at 75% (`rgba(230,149,0,0.09)`)

### Implementation notes
- All circles use fixed-pixel `radial-gradient(circle Xpx at ...)` with a 3-stop ramp (peak → midpoint → transparent) for a blurred-edge feel without `filter: blur()` clipping
- Centers pushed off left/right viewport edges only — no vertical bleed into adjacent sections
- USP section skipped (dark navy background)
- Content wrappers at `z-index: 1` throughout; glows at `z-index: 0`

---

## 2026-06-09 — Navbar tab-bar thinning + logo resolution fix

### Navbar
- Desktop pill: vertical padding 13px → 9px (pill height 78px → 56px, "tab bar" proportions matching horizontal pill nav reference)
- Logo 52px → 38px — below 2× native resolution ceiling (76dp < 96px source), eliminates upscaling pixelation
- Link horizontal padding 28px → 32px (compensates visual weight lost from shorter pill)
- Link gap 8px → 4px; left padding 52px → 32px; right padding 24px → 20px
- min-width 860px → 920px

---

## 2026-06-09 — Navbar proportions + ambient section glows

### Navbar
- Desktop pill: vertical padding 18px → 13px (shorter, sleeker); logo 64px → 52px; left padding 44px → 52px; right padding 18px → 24px; min-width 760px → 860px
- Link horizontal padding 22px → 28px; gap between links 2px → 8px; font-size 14px → 13px
- Added `image-rendering: -webkit-optimize-contrast` to navbar logo
- Net result: wider, shallower pill with logo-left / links-right magazine bar feel
- Tablet/mobile breakpoints unchanged

### Ambient background glows
- Implemented via `::before` pseudo-elements with stacked `radial-gradient` (not filter/blur — filter clips at `overflow:hidden` boundaries and dilutes opacity below visibility)
- Range section: 3 elliptical glows (top-left 13%, bottom-right 10%, mid-right 8% opacity)
- CTA section: 2 elliptical glows (top-left 11%, bottom-right 9% opacity)
- Both sections `position: relative`; content wrappers lifted to `z-index: 1`

---

## 2026-06-09 — Polish: CTA padding, footer logo, navbar resize

### CTA section
- Section vertical padding reduced from `--space-3xl` (160px) → `--space-xl` (80px) — removes the void above/below the card

### Footer logo
- Source file is `newlogo-removebg-preview.png` at 296×96px native
- Display height reduced from 88px → 48px (96÷2 = safe native size on 2× Retina displays; 88px was upscaling ~1.8× causing blur)
- Added `image-rendering: -webkit-optimize-contrast` for sharper rendering

### Navbar
- Desktop (>1023px): padding 10/20px → 18/44px; logo 30px → 64px; link font 13px → 14px, padding 8/18px → 10/22px; min-width 660px → 760px
- New tablet breakpoint (768–1023px): reverts to previous compact pill sizing
- Mobile (<640px): unchanged

---

## 2026-06-09 — Hero rebuilt: 5 cinematic scene crossfades

Hero rebuilt with 5 cinematic scene crossfades replacing the frame-sequence approach. Assets are static images with scroll-driven opacity transitions.

- Canvas frame-sequence removed entirely (hero-canvas, hero-loader, 100-frame loading system gone)
- 5 cinematic scene images (`assets/images/scenes/`) replace frame sequence and corner insets
- Scroll-driven opacity crossfade: each scene blends over a 5% window at each 20% boundary
- Subtle scale 1.05 → 1.0 per scene creates a "camera pull-back" feeling
- Dark gradient overlay: `rgba(0,0,0,0.7)` left → `rgba(0,0,0,0.1)` right for text legibility
- 5 text scenes with updated copy matching scene imagery; scene 5 has the CTA button
- Mobile breakpoint changed from 1024px → 768px; text repositioned to bottom third on mobile
- Hero scroll range updated from 400vh → 500vh (5 scenes × 100vh each)
- All 5 images preloaded on page load via `new Image()` before GSAP fires

---

## 2026-06-09 — Scroll hero redesign + CTA tightening

### CTA card
- Vertical padding reduced from 96px → 64px (removes empty void in middle)
- Gap between text and buttons reduced from 64px → 32px
- Mobile padding tightened to 48px/28px

### Hero scroll — inset redesign (Approach A — product reveals)
- Removed ISO 9001:2015 certification badge (inset-3) entirely
- Replaced all three corner insets with 4 integrated scene product images
- Each text scene now has its own product image (`.hero-product-img`) covering the right 46vw of the viewport
- Images enter from off-screen right (x:140) and exit right (x:72) — synced to scene scroll range
- Warm yellow radial glow (`rgba(244,180,0,0.09)`) behind each product via `::before` pseudo-element
- Deep drop-shadow grounds each product against the navy (`drop-shadow(0 40px 80px rgba(0,0,0,0.52))`)
- Scene text shifted left-aligned (`padding-left: max(64px,8vw); padding-right: 52vw`) — magazine spread layout
- Separate GSAP timeline (`imgTl`, scrub 1.4) drives product images independently from text scenes
- Mobile (<1024px): product images hidden, scenes revert to centered layout

### Image assignments per scene
| Scene | Scroll | Product image |
|-------|--------|---------------|
| 1 — Brand intro | 0–20% | `keyproduct-new.webp` |
| 2 — IoT Smart Suction | 25–45% | `islerindia_chimney_curve_60_...png` |
| 3 — Whisper-Quiet | 50–70% | `hobtop-bravura-3b.jpg` |
| 4 — CTA | 75–95% | `keyproduct-builtin-hobs.jpg` |

---

## 2026-06-09 — Polish pass (Monday demo)

### CTA card
- Narrowed max-width from 1100px → 860px
- Increased vertical padding from 72px → 96px top/bottom
- Restructured layout from two-column (heading + buttons side-by-side) to single-column centered
- 64px gap between text content and buttons
- Buttons centered at fixed 320px width; full-width below 639px

### Footer
- Logo height increased from 28px → 88px with proper aspect ratio preserved
- Copyright year updated: 2025 → 2026

### USP section ("What Sets Us Apart?")
- Section padding changed to fluid `clamp(24px, 5vw, 96px)` horizontal
- Grid max-width expanded from 1140px → 1680px for confident full-width spread
- Card padding increased from 32/36/40 → 40/40/52px
- Number badge font size: 11px → 13px
- Card title font size: 18px → 22px
- Card body text font size: 14px → 16px

### Range section ("Key Products Range")
- Section padding changed to fluid `clamp(24px, 5vw, 96px)` horizontal
- Grid wrapper max-width expanded from 1140px → 1680px
- Product card name font size: clamp(15px,1.4vw,20px) → clamp(17px,1.6vw,23px)

---

## 2026-06-09 — Asset integration (from Isler-India-Revamp)

- Copied 9 images from main site (logo, 6 product key images, 2 hero insets)
- Added pill navbar with real logo
- Replaced placeholder product cards with real Isler product grid (cat-card asymmetric layout)
- Added USP section with verbatim copy from main site
- Added hero inset images at ~30%, ~55%, ~80% scroll with GSAP fade animations
- Added CTA box section with grid-pattern card
- Updated README with asset source table

---

## 2026-06-09 — Initial build

- Created project structure: index.html, tokens.css, base.css, hero.css, hero-sequence.js
- 400vh scroll-driven canvas hero with GSAP ScrollTrigger
- 100-frame sequence with programmatic placeholder fallback
- 4 text scenes synced to scroll progress
- Mobile fallback (static gradient + scene 1, no canvas)
- Priority frame loading (frame 1 → middle → quarter-points → fill)
