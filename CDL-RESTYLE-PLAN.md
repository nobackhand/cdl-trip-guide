# Plan: CDL Official Site Restyle

Restyle the trip guide app to match the official CDL Major I tournament website aesthetic — bold condensed typography, black/white/green palette, editorial layout, sharp corners. Keep all existing functionality and 500px mobile-first layout.

**New files:** 2 (`HeroSection.tsx`, `DateVenueSection.tsx`)
**Modified files:** ~22

---

## Phase 0 — Font Swap (`layout.tsx` + `globals.css`)

Everything else depends on this. Replace Rajdhani (rounded, lightweight) with **Bebas Neue** (condensed, block, uppercase-only — closest Google Font to the CDL site's headline font).

### `src/app/layout.tsx`
- Change import: `Rajdhani` → `Bebas_Neue`
- Replace config block:
```tsx
const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],  // Bebas Neue only has 400, which is already extra-bold
});
```
- Update body: `rajdhani.variable` → `bebasNeue.variable`

### `src/app/globals.css`
- Change `--font-heading: "Rajdhani", sans-serif;` → `--font-heading: "Bebas Neue", sans-serif;`

---

## Phase 1 — Color Palette & Utility Overhaul (`globals.css`)

The CDL site is black + white + olive green. No orange, no cyan.

### 1a. Remap color tokens in `@theme inline`

Rather than find-replacing `cod-orange` across 12+ files, remap the token:

```css
--color-cod-black: #0a0a0a;      /* deeper black */
--color-cod-dark: #111111;        /* darker */
--color-cod-dark2: #1a1a1a;      /* tighter dark range */
--color-cod-green: #5a8a32;       /* slightly brighter olive */
--color-cod-green-dark: #3d6623;  /* keep */
--color-cod-lime: #8bc34a;        /* keep — matches CDL neon green */
--color-cod-orange: #8bc34a;      /* REMAP to lime — all orange refs auto-become green */
--color-cod-gray: #666666;        /* darker for editorial contrast */
--color-cod-light-gray: #b0b0b0;  /* slightly darker */
--color-cod-red: #ff4444;         /* keep for live */
--color-cod-red-dark: #cc0000;    /* keep */
--color-cod-yellow: #ffd700;      /* keep for prize money */
--color-cod-cyan: #8bc34a;        /* REMAP to green */
--color-cod-purple: #a78bfa;      /* keep */
--color-cod-white: #f5f5f5;       /* slight warmth */
```

### 1b. Replace utility classes

**`.glass-card`** — opaque editorial card (removes backdrop-blur, improves perf):
```css
.glass-card {
  background: #141414;
  border: 1px solid rgba(139,195,74,0.15);
}
```

**`.section-divider`** — solid green line instead of orange gradient:
```css
.section-divider {
  height: 2px;
  background: var(--color-cod-lime);
  margin-bottom: 0.75rem;
  opacity: 0.7;
}
```

**`.animated-gradient-orange`** — rename and recolor to green:
```css
.animated-gradient-orange {
  background: linear-gradient(270deg, #3d6623, #5a8a32, #4a7c2b, #3d6623);
  background-size: 300% 300%;
  animation: gradient-shift 6s ease infinite;
}
```

**`.text-glow-orange`** — recolor to green (same as `.text-glow`):
```css
.text-glow-orange {
  text-shadow: 0 0 10px rgba(139,195,74,0.5), 0 0 20px rgba(139,195,74,0.2);
}
```

### 1c. Add new CDL editorial utility classes

```css
.cdl-section-header {
  font-family: var(--font-heading);
  font-size: 22px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-cod-white);
  margin-bottom: 4px;
}

.cdl-neon-line {
  height: 2px;
  background: linear-gradient(90deg, transparent, #8bc34a, transparent);
  box-shadow: 0 0 8px rgba(139,195,74,0.4), 0 0 16px rgba(139,195,74,0.2);
}

.cdl-btn-outline {
  border: 2px solid var(--color-cod-lime);
  color: var(--color-cod-lime);
  background: transparent;
  padding: 8px 20px;
  font-family: var(--font-heading);
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.cdl-btn-outline:hover {
  background: var(--color-cod-lime);
  color: #0a0a0a;
}

.hero-gradient-overlay {
  background: linear-gradient(180deg,
    rgba(10,10,10,0.3) 0%,
    rgba(10,10,10,0.6) 40%,
    rgba(10,10,10,0.95) 80%,
    #0a0a0a 100%
  );
}

.countdown-digit {
  font-family: var(--font-heading);
  font-size: 64px;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-cod-white);
}

.countdown-unit {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--color-cod-lime);
  text-transform: uppercase;
}
```

---

## Phase 2 — Header Redesign (`Header.tsx`)

Replace centered branding header with CDL-style minimal top bar.

**New layout:**
- Left: "MAJOR I" in condensed heading font (20px)
- Right: Green outline "PURCHASE TICKETS →" CTA button
- Below: Mode toggle restyled with `rounded-sm` (sharp) instead of `rounded-full`
- Border: `border-b border-cod-lime/30` (thin, subtle)
- Remove: "Call of Duty League" subtitle and "Dallas, TX" date line (those move to HeroSection)

---

## Phase 3 — New HeroSection Component (NEW FILE)

**`src/components/HeroSection.tsx`** — the centerpiece.

Structure:
```
<section> (full-bleed via -mx-4, dark gradient bg)
  ├── Green neon line overlays (rotated cdl-neon-line elements)
  ├── "CALL OF DUTY LEAGUE" (12px, tracked, gray)
  ├── "OPTIC TEXAS" (14px, tracked, lime green)
  ├── "20  MAJOR I  26" (flanked year, 48px title)
  ├── "TOURNAMENT" (16px, tracked, white/60)
  ├── "PRESENTED BY MONSTER ENERGY" (10px, gray)
  ├── Green neon divider line
  ├── <Countdown /> (embedded, transparent bg)
  └── Sponsor strip (text placeholders: USAA, MONSTER, RAZER)
</section>
```

Background: CSS gradient placeholder (add real B&W player photo later via `public/images/hero-bg.jpg` with `grayscale(1) brightness(0.3)` filter).

### Integration in `page.tsx`
Add `<HeroSection />` inside `<main>` before `<PageContent />`.

### Remove `<Countdown />` from `PageContent.tsx`
Delete the standalone `<Countdown />` call (line 24) and its import — it now lives inside HeroSection.

---

## Phase 4 — Countdown Visual Overhaul (`Countdown.tsx`)

Redesign from green rounded box to massive transparent digits.

**Normal countdown state:**
- Remove: `countdown-glow` class, green gradient bg, rounded-xl container
- Container: just `py-2 text-center` (transparent, lives inside hero)
- "EVENT STARTS IN" label: `font-heading text-[11px] tracking-[0.3em] text-cod-gray`
- Digits: use `.countdown-digit` class (64px, Bebas Neue, white)
- Unit labels: use `.countdown-unit` class (11px, lime green, tracked)
- Unit text: "DAYS", "HOURS", "MINUTES", "SECONDS" (full words, matching CDL site)
- Gap between groups: `gap-4`

**Live state:** Keep red gradient but change `rounded-xl` → `rounded-sm`

**Over state:** Same sharp corner adjustment

---

## Phase 5 — Section Headers (9 files, same pattern)

Replace the current `<h2>` classes across all section headers.

**Before:**
```tsx
<h2 className="mb-1 font-heading text-[16px] font-bold uppercase tracking-[6px] text-cod-orange">
```

**After:**
```tsx
<h2 className="cdl-section-header">
```

Uses the new utility class (22px, Bebas Neue, white, tracked). Color change is automatic via the `cod-orange` token remap.

**Files:**
1. `src/components/HotelCard.tsx`
2. `src/components/UberLinks.tsx`
3. `src/components/CostSplitter.tsx`
4. `src/components/Checklist.tsx`
5. `src/components/Predictions.tsx`
6. `src/components/QuickInfo.tsx`
7. `src/components/Schedule/ScheduleTabs.tsx`
8. `src/components/FoodGuide/FoodTabs.tsx`
9. `src/components/PageContent.tsx`

---

## Phase 6 — Card & Container Restyling (17+ files)

### 6a. Rounded corners: `rounded-xl` → `rounded-sm` globally

All component files that use `rounded-xl` or `rounded-lg`. This gives the sharp editorial feel from the CDL site. Affects: Countdown, LiveBanner, HotelCard, CostSplitter, Checklist, UberLinks, WeatherCard, QuickActions, Predictions, ScheduleTabs, DaySchedule, BracketView, FoodTabs, LocationTab, NearbyBanner, TripPlanningAccordion, PageContent.

### 6b. Tab button restyling (ScheduleTabs, FoodTabs)

Change from `font-body text-[11px]` to `font-heading text-[12px] tracking-[0.05em]`.
Active state: `bg-cod-lime text-cod-black` (stronger contrast).

### 6c. TL;DR banner (`PageContent.tsx`)

Replace `animated-gradient-orange` with a solid editorial card:
```tsx
<div className="my-4 rounded-sm border-l-4 border-cod-lime bg-cod-dark2 p-3">
```

### 6d. QuickActions buttons

Replace glass-card with solid editorial: `rounded-sm border-t-2 border-cod-lime bg-cod-dark2`
Label styling: add `font-heading tracking-[0.05em]`

### 6e. Stream/YouTube banner (ScheduleTabs)

Replace red gradient with editorial card: `rounded-sm border border-cod-lime/30 bg-cod-dark2`
Title: `font-heading text-[16px] tracking-[0.05em]`

---

## Phase 7 — BottomNav Restyle (`BottomNav.tsx`)

- Border: `border-t-2 border-cod-green` → `border-t border-cod-lime/30`
- Background: `bg-cod-dark/90` → `bg-cod-black/95`
- Label font: `font-body text-[9px]` → `font-heading text-[10px] tracking-[0.05em]`
- Active state: keep `text-cod-lime`, drop or simplify `nav-glow-active`

---

## Phase 8 — Hard-coded Color Cleanup

### `LiveBanner.tsx` — colorMap
Change `orange: "from-cod-orange to-[#cc5500]"` → `orange: "from-cod-green to-cod-green-dark"`
Change `cyan: "from-[#0891b2] to-[#0e7490]"` → `cyan: "from-cod-green to-cod-green-dark"`

### `FoodGuide/LocationTab.tsx` — pro tip banner
Change `from-cod-orange to-[#cc5500]` → `from-cod-green to-cod-green-dark`

### `Toast.tsx`
Change `rounded-lg` → `rounded-sm`

---

## Phase 9 — New DateVenueSection (NEW FILE, optional)

**`src/components/DateVenueSection.tsx`** — matches Screenshot 2.

```
<section> (full-bleed via -mx-4, bg-cod-dark2)
  ├── "JANUARY 29-01" (52px, Bebas Neue, white)
  ├── Green neon divider line
  └── "MOODY COLISEUM, DALLAS TEXAS" (16px, tracked, white/80)
</section>
```

Integrate in `page.tsx` after HeroSection, before PageContent.

---

## Execution Order

| Order | Phase | Description | Files |
|-------|-------|-------------|-------|
| 1 | 0 | Font swap | `layout.tsx`, `globals.css` |
| 2 | 1 | Color palette + utilities | `globals.css` |
| 3 | 2 | Header redesign | `Header.tsx` |
| 4 | 3 | HeroSection (new) | NEW `HeroSection.tsx`, `page.tsx`, `PageContent.tsx` |
| 5 | 4 | Countdown overhaul | `Countdown.tsx` |
| 6 | 5 | Section headers | 9 component files |
| 7 | 6 | Cards/containers/corners | 17+ component files |
| 8 | 7 | BottomNav restyle | `BottomNav.tsx` |
| 9 | 8 | Hard-coded color cleanup | `LiveBanner.tsx`, `LocationTab.tsx`, `Toast.tsx` |
| 10 | 9 | DateVenueSection (new) | NEW `DateVenueSection.tsx`, `page.tsx` |

---

## Risks & Mitigations

1. **Bebas Neue single weight (400):** `font-bold` has no effect. Fine — Bebas 400 is already visually bold. Body text stays Roboto which has weight variety.

2. **`cod-orange` token remap:** Surge pricing indicator (`UberLinks.tsx` line 72) becomes green instead of warning-orange. **Fix:** Change that specific element to use `text-cod-red` instead.

3. **`glass-card` now opaque:** Removes translucent blur everywhere. Intentional for editorial style and better mobile perf.

---

## Verification

1. `npx next build` — zero errors
2. Bebas Neue renders for all headings (condensed, block, uppercase)
3. No orange visible anywhere — all green/white/black palette
4. Hero section displays tournament branding stack + large countdown digits
5. All cards have sharp corners (`rounded-sm`)
6. Section headers are 22px, white, condensed font
7. Header shows "MAJOR I" left + green CTA right + mode toggle
8. BottomNav has thin green border, condensed label font
9. Countdown digits are 64px with green unit labels
10. Green neon line dividers visible in hero and date sections
