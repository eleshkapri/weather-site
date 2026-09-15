# Project Guidelines & Anti-AI-Slop Design Directives

This project uses the **Anti-AI-Slop Design & Animation Standards** powered by:
- **Taste Skill** (.agents/skills/design-taste-frontend/, .agents/skills/high-end-visual-design/)
- **Impeccable Design Suite** (.agents/skills/impeccable/)
- **Emil Kowalski Design Engineering** (.agents/skills/emil-design-eng/, .agents/skills/animate/, .agents/skills/apple-design/)

---

## 🎨 Frontend Design & Quality Standards

Whenever creating or modifying any HTML, CSS, SVG, or UI components:

1. **No Generic AI Slop**:
   - Avoid generic AI tells: excessive card-inside-card nesting, gratuitous glowing borders, generic pastel pill badges on every metric, and template-like layouts.
   - Avoid sluggish or excessive animation loops. Animations must have clear physical intent with smooth cubic-bezier easing (cubic-bezier(0.16, 1, 0.3, 1)).

2. **High-Contrast Typography & Accessibility**:
   - In daytime modes, keep text sharp, legible, and dark (#0f172a, #334155).
   - In nighttime modes, keep text crisp white with controlled opacity layers (gba(255, 255, 255, 0.95)).
   - Text over dynamic backgrounds must use drop-shadows or solid frosted glass backing to maintain WCAG contrast.

3. **Responsive & Mobile-First Integrity**:
   - Test layout continuity across Mobile (320px–580px), Tablet (768px–1024px), and Desktop (1025px+).
   - Touch targets must be at least 44x44px.

4. **Zero-Key API Architecture**:
   - Keep weather data powered by keyless open APIs (Open-Meteo). Never hardcode private API keys in client-side files.

5. **Directory Organization**:
   - Stylesheets belong in ssets/css/
   - Scripts belong in ssets/js/
   - Icons & SVGs belong in ssets/icons/
