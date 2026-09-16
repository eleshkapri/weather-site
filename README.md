# ☀️ Atmosphere — Next-Gen 3D Live Weather Experience

![Atmosphere Live Weather Banner](https://img.shields.io/badge/Atmosphere-Live%20Weather-38bdf8?style=for-the-badge&logo=google-chrome&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3 Glassmorphism](https://img.shields.io/badge/CSS3-Glassmorphism_%26_3D_Scenery-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Open-Meteo API](https://img.shields.io/badge/API-Open--Meteo_Global_Models-10b981?style=for-the-badge)

**Atmosphere** is a live weather web application crafted with vanilla JavaScript, modern CSS3 glassmorphism, 3D atmospheric artwork, and high-resolution global forecasting models.

🔗 **GitHub Repository**: [https://github.com/eleshkapri/weather-site](https://github.com/eleshkapri/weather-site)

---

## 🌟 Key Features

### 1. 🌄 3D Atmospheric Scenery Hero Card
* **Volumetric 3D Fluffy Clouds**: Multi-layered SVG cloud puffs with radial lighting and depth shadows.
* **Radiant 3D Celestial Bodies**:
  * **Day**: Spherical 3D radiant sun with a spinning corona flare and ambient warm halo.
  * **Night**: 3D lunar sphere featuring textured craters and luminous starlight glow.
* **Multi-Tier Landscape Ridges**: Depth-layered mountain and meadow gradients with sunlit crest highlights.
* **Lookout Silhouette**: Character figure overlooking the horizon with breathing animation.
* **Pure Crisp White Typography**: High-contrast text with drop shadows for legibility over dynamic skies.

### 2. 🌦️ Dynamic Weather & Day/Night Theme Engine
The entire site backdrop, card materials, and scenery dynamically transform based on real-time weather conditions and solar cycles:
* **☀️ Clear Sky (Day / Night)**: Radiant azure daylight or deep starry midnight indigo.
* **☁️ Overcast & Cloudy**: Silver slate-blue day or moody slate night with drifting volumetric clouds.
* **🌧️ Rain & Drizzle**: Steel-slate wet atmosphere with animated falling rain streaks and ground mist.
* **⚡ Thunderstorm**: Dark tempest sky with animated **lightning flashes** and intense precipitation.

### 3. 📈 Continuous 1-Hour Resolution Spline Forecast
* Smooth Catmull-Rom SVG spline curve plotting continuous 1-hour temperature fluctuations for the next 10 consecutive hours.
* Displays localized hour labels, weather condition icons, precipitation probabilities (☂ %), and degree values.

### 4. ☀️ Astronomical Sun Cycle Arc
* Interactive semi-circle trajectory tracking real-time sun position from local sunrise to sunset.
* Progress calculations derived directly from astronomical models.

### 5. 🎯 Global City Geocoding & Fast Search
* **Population-Ranked Geocoding**: Searching world cities (London, New York, Tokyo, Paris, Delhi, etc.) immediately prioritizes primary major cities with accurate State/Province, Country, and localized IANA timezones.
* **Live Suggestions & Search History**: Keyboard-navigable autocomplete dropdown with localStorage search history and one-click quick search chips.

#### 6. 🛰️ Planetary Orbital Satellite Telemetry Inspector
* **Live Geostationary Constellations**: Interactive orbital radar visualizing NOAA GOES-18, EUMETSAT Meteosat-11, JMA Himawari-9, ECMWF IFS, and Open-Meteo API Mesh.
* **Telemetry HUD**: Detailed instrument payload specifications, spatial resolution (0.5 km visible / 2.0 km IR), and orbital altitudes (35,786 km GEO).
* **Clickable Regional Streamers**: Instant 1-click weather streaming from major stations across the Americas, EMEA, and Asia-Pacific.
* **Effortless Radar Controls**: Hover-to-pause orbital rotation with active target reticles and quick GPS detection via the central beacon.

### 7. ⌨️ Global Command Palette Search (⌘K / Ctrl+K)
* Instant modal command palette accessible via keyboard shortcut (`⌘K` / `Ctrl+K`) or the top navigation bar.
* Live prefix-prioritized city search, quick-trending global destinations, and full keyboard navigation.

### 8. 🕒 Recent Observations Management
* Instant recall of recent search history with localized caching.
* Built-in **Clear All** and single-city **Remove (`✕`)** controls directly within the search dropdown.

### 9. 📱 Universal Responsive Design
* Handcrafted responsive breakpoints for **Mobile (320px–580px)**, **Tablets (768px–1024px)**, and **Desktops/Laptops (1025px+)**.
* 44×44px minimum touch targets and mobile-optimized smooth scrolling.

---

## 📂 Project Architecture

```
weather-site/
├── assets/
│   ├── css/
│   │   └── styles.css          # Design system, glassmorphism, 3D scenery, theme palettes, media queries
│   ├── js/
│   │   ├── config.example.js   # Public configuration template (committed to Git)
│   │   ├── config.js           # Private credentials (strictly gitignored, never uploaded to GitHub)
│   │   ├── motion-engine.js    # GSAP kinetic text, physics, Lenis smooth scrolling, card stacking
│   │   ├── three-atmosphere.js # Three.js WebGL 3D celestial atmospheric canvas
│   │   └── script.js           # OOP telemetry orchestrator, geocoding cascade, spline curves, satellite HUD
│   └── icons/
│       └── favicon.svg         # Official Atmosphere Sun & Cloud vector icon
├── .gitignore                  # System, editor, and private secrets ignore rules
├── index.html                  # Cinematic dark SaaS landing page & interactive weather showcase
├── LICENSE                     # MIT Open-source License
└── README.md                   # Comprehensive documentation
```

---

## 🚀 Quick Start

No package manager or build tools required. Open directly in your browser:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/eleshkapri/weather-site.git
   cd weather-site
   ```

2. **Launch with any local HTTP server**:
   * Using VS Code **Live Server** extension: right-click `index.html` → Open with Live Server.
   * Or using Python:
     ```bash
     python -m http.server 5500
     ```
   * Or open `index.html` directly in your browser.

---

## 🔒 API Key Security & GitHub Protection

Atmosphere implements a **Zero-Leak Credential Architecture** ensuring private API keys are never exposed, committed, or flagged by GitHub Secret Scanning:

1. **Strict `.gitignore` Protection**:
   * Your private API key resides in `assets/js/config.js`.
   * `assets/js/config.js` is explicitly listed in `.gitignore`, preventing Git from ever tracking or uploading it to GitHub.
2. **Tracked Template (`config.example.js`)**:
   * A safe template file `assets/js/config.example.js` is included in the repository with an empty placeholder.
   * Anyone cloning the repo can copy `config.example.js` to `config.js` and add their own key.
3. **Browser LocalStorage Support**:
   * When deployed on GitHub Pages or static hosts, you can also store an API key directly in your personal browser without touching code:
     ```javascript
     Atmosphere.setKey("YOUR_API_KEY");
     ```
4. **Resilient Multi-Provider Fallback**:
   * If a custom key is pending activation on OpenWeatherMap (which can take 1–2 hours for new keys) or if no key is configured, Atmosphere automatically cascades through **Open-Meteo**, **Photon (OSM)**, and an **offline catalog of global hubs**, guaranteeing zero downtime and 100% search uptime.

---

## 🛠️ Built With

* **HTML5**: Semantic tags, inline SVG gradients, SVG spline layers.
* **CSS3**: CSS Custom Properties, Glassmorphism (ackdrop-filter), CSS Grid, Flexbox, Keyframe Animations.
* **JavaScript (ES6+)**: Fetch API, AbortController debouncing, SVG Path Math, LocalStorage API.
* **Data Sources**:
  * [Open-Meteo Global Weather API](https://open-meteo.com/) (ECMWF, GFS, DWD high-resolution models)
  * [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) (Population-ranked worldwide search)
  * [OpenWeather Icon Assets](https://openweathermap.org/) (Official WMO condition icons)

---

## 👤 Author

* **Elesh Kapri** — [GitHub Profile](https://github.com/eleshkapri)
* Repository: [eleshkapri/weather-site](https://github.com/eleshkapri/weather-site)

---

⭐ If you like this project, feel free to give it a star on [GitHub](https://github.com/eleshkapri/weather-site)!
