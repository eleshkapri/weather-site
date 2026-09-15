# Project Directives & Anti-AI-Slop Design Standards

This project strictly adheres to **Anti-AI-Slop Design & Animation Standards** powered by the installed skill suites located in `.agents/skills/`:
- **Taste Skill Suite** (`.agents/skills/design-taste-frontend/`, `.agents/skills/high-end-visual-design/`, `.agents/skills/minimalist-ui/`)
- **Impeccable Design Framework** (`.agents/skills/impeccable/`)
- **Emil Kowalski Design Engineering** (`.agents/skills/emil-design-eng/`, `.agents/skills/animate/`, `.agents/skills/apple-design/`)

---

## 🎨 1. Anti-AI-Slop Visual Directives (Taste Skill & Impeccable)

Whenever creating, modifying, or reviewing HTML, CSS, SVG, or UI components:

1. **Eliminate Generic AI Tells**:
   - **No nested card soup**: Avoid gratuitous card-inside-a-card-inside-a-card layouts. Group logically with subtle borders, spacing, or tonal contrast.
   - **No cliché AI styling**: Avoid tacky purple/cyan glowing neon borders, generic pastel pill badges on every metric, and template-like hero sections.
   - **No generic copy**: Every label and metric must be contextually informative, concise, and purposeful.
   - **No cluttered grids**: Maintain clean negative space, purposeful optical margins, and breathing room.

2. **Typography & Contrast Hierarchy**:
   - **Daytime Themes**: Keep typography sharp and high-contrast (#0f172a main, #334155 secondary, #64748b caption). Never use low-contrast washed-out light grays on light backgrounds.
   - **Nighttime Themes**: Keep text crisp, bright, and legible (#ffffff main, rgba(255, 255, 255, 0.75) secondary).
   - **Dynamic Skies**: Always back text rendered over changing scenery with subtle text-shadows or solid frosted glass (`backdrop-filter: blur(...)`) to maintain WCAG AA accessibility.

---

## ⚡ 2. Animation & Motion Engineering (Emil Kowalski & Apple Design)

All motion must have clear physical intent and feel fluid, responsive, and natural:

1. **Curves & Timings**:
   - Never use sluggish, floaty, or linear animation loops.
   - Use snappy, physical cubic-bezier curves (e.g. `cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.34, 1.56, 0.64, 1)` for micro-bounces).
   - Keep interactive feedback fast (150ms–250ms for hover/press, 350ms–500ms for state transitions).

2. **Performance**:
   - Animate only composite properties: `transform` and `opacity`.
   - Avoid animating layout-triggering properties (`top`, `left`, `width`, `height`, `margin`, `padding`).
   - Use `will-change: transform` sparingly on performance-critical moving layers.

3. **Accessibility**:
   - Respect `prefers-reduced-motion: reduce` by disabling or reducing continuous decorative motion.

---

## 📱 3. Responsive & Device Integrity

1. **Breakpoints**:
   - Mobile: 320px – 580px
   - Tablet: 768px – 1024px
   - Desktop / Laptop: 1025px+
2. **Touch Targets**: All interactive elements (buttons, pills, search suggestions, toggles) must meet the minimum 44×44px touch target guideline.

---

## 🔒 4. Zero-Key Architecture & Data Integrity

1. **Keyless Open APIs Only**: All weather forecasting and geocoding must use open endpoints (Open-Meteo).
2. **Never expose secrets**: Never hardcode or commit private API keys in client-side scripts.

---

## 📂 5. Directory & Asset Standards

- Stylesheets: `assets/css/`
- Scripts: `assets/js/`
- Icons, Favicons & Vector Art: `assets/icons/`
- Skills & Guidelines: `.agents/skills/`
