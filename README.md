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

### 6. ⚡ Rich Weather Insight Split Dashboard
* Header trend badge (e.g., +1° Warmer, -2° Cooler, Steady Temp).
* Tomorrow's projected **High / Low Range**, **Rain Chance (☂ %)**, and **Condition Outlook**.

### 7. 📱 Universal Responsive Design
* Handcrafted responsive breakpoints for **Mobile (320px–580px)**, **Tablets (768px–1024px)**, and **Desktops/Laptops (1025px+)**.

---

## 📂 Project Architecture

`
weather-site/
├── favicon.svg          # Official Atmosphere Sun & Cloud browser tab icon
├── index.html           # Semantic HTML5 layout, SVG scenery defs, modular widget grid
├── styles.css           # Design system, glassmorphism, 3D scenery, theme palettes, media queries
├── script.js            # View switching, Open-Meteo APIs, SVG spline math, sun cycle tracker
└── README.md            # Comprehensive documentation
`

---

## 🚀 Quick Start

No package manager or build tools required. Open directly in your browser:

1. **Clone the repository**:
   `ash
   git clone https://github.com/eleshkapri/weather-site.git
   cd weather-site
   `

2. **Launch with any local HTTP server**:
   * Using VS Code **Live Server** extension: right-click index.html → Open with Live Server.
   * Or using Python:
     `ash
     python -m http.server 5500
     `
   * Or open index.html directly in your browser.

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
