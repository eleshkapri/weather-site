# ☀️ Atmosphere — Next-Gen 3D Live Weather & Telemetry Experience

![Atmosphere Live Weather Banner](https://img.shields.io/badge/Atmosphere-Live%20Weather-38bdf8?style=for-the-badge&logo=google-chrome&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES6+_OOP-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3 Glassmorphism](https://img.shields.io/badge/CSS3-Glassmorphism_%26_3D_Scenery-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Open-Meteo API](https://img.shields.io/badge/API-Open--Meteo_Global_Models-10b981?style=for-the-badge)
![Zero-Key Architecture](https://img.shields.io/badge/Architecture-Keyless_Resilience-8b5cf6?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

**Atmosphere** is a live meteorological telemetry web application built with vanilla JavaScript, modern CSS3 glassmorphism, 3D atmospheric artwork, and high-resolution global forecasting models. It features a keyless-first architecture, an instant 0ms progressive geocoding engine, continuous Catmull-Rom spline forecast curves, and an interactive Planetary Orbital Satellite Telemetry Inspector.

🔗 **Live Repository**: [https://github.com/eleshkapri/weather-site](https://github.com/eleshkapri/weather-site)

---

## 🌟 Key Features

### 1. 🌄 3D Atmospheric Scenery Hero Card
* **Volumetric 3D Fluffy Clouds**: Multi-layered SVG cloud puffs rendered with radial lighting and depth shadows.
* **Radiant 3D Celestial Bodies**:
  * **Daytime**: Spherical 3D radiant sun with spinning corona flares and ambient warm halos.
  * **Nighttime**: 3D lunar sphere featuring textured craters and luminous starlight glow.
* **Multi-Tier Landscape Ridges**: Depth-layered mountain and meadow gradients with sunlit crest highlights.
* **Lookout Silhouette**: Animated character figure overlooking the horizon with subtle breathing physics.
* **Pure Crisp Typography**: Subpixel-antialiased high-contrast text backed by frosted glass to ensure WCAG AA readability.

### 2. 🌦️ Dynamic Weather & Solar Cycle Engine
The entire site backdrop, card materials, and scenery dynamically transform based on live weather conditions and astronomical time:
* **☀️ Clear Sky (Day / Night)**: Radiant azure daylight or deep starry midnight indigo.
* **☁️ Overcast & Cloudy**: Slate-blue daylight or moody slate night with drifting volumetric clouds.
* **🌧️ Rain & Drizzle**: Steel-slate wet atmosphere with animated falling rain streaks and ground mist.
* **⚡ Thunderstorm**: Dark tempest sky with animated **lightning flashes** and intense precipitation.

### 3. ⚡ Instant 0ms Progressive Geocoding Engine
* **Tier-0 Instant Local Match (<2ms)**: Built-in 309+ world city catalog and in-memory LRU cache resolve matching cities on the first keystroke without waiting for network round-trips.
* **Live Background Enrichment**: High-speed Open-Meteo geocoding runs asynchronously with strict 1200ms `AbortController` timeout guards, ensuring network latency never freezes the UI.
* **Smart Relevance Scoring**: Weighted matching prioritizes exact names (100 pts) and prefix matches (80–95 pts) over middle-substring occurrences.
* **0ms Direct Coordinate Bypass**: Selecting any autocomplete suggestion passes pre-calculated coordinates directly to the telemetry pipeline, skipping redundant geocoding queries entirely.

### 4. 📈 Continuous 1-Hour Resolution Spline Forecast
* Smooth Catmull-Rom SVG spline curve plotting continuous 1-hour temperature fluctuations for the next 10 consecutive hours.
* Displays localized hour labels, official WMO condition icons, precipitation probabilities (☂ %), and degree values.

### 5. ☀️ Astronomical Solar Trajectory Arc
* Real-time celestial sun arc visualizing the sun's actual position between local sunrise and sunset.
* Accurate day/night progression calculated directly from astronomical models.

### 6. 🛰️ Planetary Orbital Satellite Telemetry Inspector
* **Live Geostationary Constellations**: Interactive orbital radar visualizing NOAA GOES-18, EUMETSAT Meteosat-11, JMA Himawari-9, ECMWF IFS, and the Open-Meteo mesh.
* **Telemetry HUD**: Detailed instrument payload specifications, spatial resolutions (0.5 km visible / 2.0 km IR), and orbital altitudes (35,786 km GEO).
* **Clickable Regional Streamers**: 1-click instant weather telemetry streaming from major global stations across the Americas, EMEA, and Asia-Pacific.
* **Radar Controls**: Hover-to-pause orbital rotation with active targeting reticles and quick GPS detection via the central beacon.

### 7. ⌨️ Global Command Palette Search (`⌘K` / `Ctrl+K`)
* Keyboard-first modal search accessible from any view via `⌘K` (Mac) or `Ctrl+K` (Windows/Linux).
* Features trending global hubs, full keyboard navigation (arrows + Enter), and backdrop dismissal.

### 8. 🕒 Recent Observations Management
* LocalStorage-backed observation history with instant recall.
* Built-in **Clear All** and single-city **Remove (`✕`)** controls directly within the search dropdown.

### 9. 📱 Anti-AI-Slop Responsive Design & High-DPI Polish
* Strictly engineered without generic AI templates or nested card soup.
* Responsive breakpoints for **Mobile (320px–580px)**, **Tablet (768px–1024px)**, and **Desktop (1025px+)**.
* All interactive touch targets meet the minimum **44×44px** accessibility standard.

---

## 🏗️ Object-Oriented Architecture (OOP)

Atmosphere is structured around clean object-oriented design patterns with strict encapsulation and separation of concerns:

| Class | Responsibility |
| :--- | :--- |
| `AtmosphereSecurity` | Encapsulates private API keys in ES6 private fields (`#apiKey`), validates key health, and freezes the public facade via `Object.freeze()`. |
| `AtmosphereGeocodingService` | Cascading multi-tier geocoder (Instant Catalog $\rightarrow$ Open-Meteo Live API $\rightarrow$ Photon OSM Fallback). |
| `AtmosphereWeatherService` | High-resolution Open-Meteo telemetry parser, WMO code interpreter, and dynamic meteorological narrative generator. |
| `AtmosphereSplineRenderer` | Catmull-Rom spline mathematics, smooth SVG path generation, and hourly timeline curve rendering. |
| `AtmosphereUIController` | Event management, keyboard shortcuts, DOM view transitions, and autocomplete dropdown handling. |
| `AtmosphereApp` | Application lifecycle orchestrator coordinating security, geocoding, forecasting, and UI rendering. |

---

## 📂 Project Structure

```
weather-site/
├── assets/
│   ├── css/
│   │   └── styles.css          # Design system, glassmorphism, 3D scenery, theme palettes, media queries
│   ├── js/
│   │   ├── config.example.js   # Public configuration template (committed to Git)
│   │   ├── config.js           # Private credentials (strictly gitignored, never uploaded to GitHub)
│   │   ├── motion-engine.js    # Kinetic text, physics animations, card scroll transitions
│   │   ├── three-atmosphere.js # Three.js WebGL 3D celestial atmospheric canvas
│   │   └── script.js           # Enterprise OOP telemetry orchestrator, geocoding, spline curves, satellite HUD
│   └── icons/
│       └── favicon.svg         # Atmosphere Sun & Cloud vector icon
├── .gitignore                  # System, editor, and private secrets ignore rules
├── index.html                  # Cinematic dark landing page & interactive weather showcase
├── LICENSE                     # MIT Open-Source License
└── README.md                   # Comprehensive documentation
```

---

## 🚀 Quick Start

Atmosphere runs 100% in modern browsers with **zero build tools, zero bundlers, and zero npm packages required**:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/eleshkapri/weather-site.git
   cd weather-site
   ```

2. **Launch with any local HTTP server**:
   * **VS Code**: Right-click `index.html` → *Open with Live Server*.
   * **Python 3**:
     ```bash
     python -m http.server 5500
     ```
   * **Node.js**:
     ```bash
     npx serve .
     ```
   * Or simply double-click `index.html` to open it in your browser.

---

## 🔒 Zero-Key Architecture & Credential Protection

Atmosphere is designed from the ground up to **work 100% out-of-the-box without requiring any API keys**:

1. **Keyless-First Default (Open-Meteo)**:
   * Atmospheric telemetry and worldwide geocoding run on Open-Meteo's open endpoints.
   * No sign-up, no credit card, and no API keys are required.
2. **Strict Secret Hygiene (`.gitignore`)**:
   * If you choose to configure an optional OpenWeatherMap key, it is stored in `assets/js/config.js`.
   * `assets/js/config.js` is explicitly excluded in `.gitignore` and is never tracked or uploaded to GitHub.
   * `assets/js/config.example.js` provides a safe placeholder template.
3. **Browser Console Facade**:
   * On static hosts (GitHub Pages, Vercel), you can securely register an API key in your own browser session:
     ```javascript
     Atmosphere.setKey("YOUR_API_KEY");
     ```
4. **Resilient Fallback Mesh**:
   * If an optional third-party API key is invalid, rate-limited, or pending email activation, Atmosphere automatically routes all requests through the keyless satellite mesh with zero downtime.

---

## 🛠️ Built With

* **HTML5**: Semantic elements, inline SVG gradients, Catmull-Rom vector paths.
* **CSS3**: CSS Custom Properties, Glassmorphism (`backdrop-filter`), CSS Grid, Flexbox, Keyframe Animations.
* **JavaScript (ES6+)**: ES6 Classes, Private Fields (`#field`), Fetch API, AbortController, LocalStorage API.
* **Data Sources**:
  * [Open-Meteo Global Weather API](https://open-meteo.com/) (ECMWF, GFS, DWD high-resolution models)
  * [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) (Worldwide population-ranked location search)
  * [OpenWeather Condition Icons](https://openweathermap.org/) (Official WMO condition assets)
  * [OpenStreetMap Photon API](https://photon.komoot.io/) (Secondary emergency geocoding fallback)

---

## 👤 Author

* **Elesh Kapri** — [GitHub Profile](https://github.com/eleshkapri)
* Repository: [eleshkapri/weather-site](https://github.com/eleshkapri/weather-site)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

⭐ If you enjoy this project, consider giving it a star on [GitHub](https://github.com/eleshkapri/weather-site)!
