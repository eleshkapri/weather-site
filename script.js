document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const welcomeScreen = document.getElementById("welcome-screen");
  const topNav = document.getElementById("top-nav");
  const brandHomeBtn = document.getElementById("brand-home-btn");
  const navSearchMount = document.getElementById("nav-search-mount");
  const welcomeSearchWrapper = document.querySelector(".welcome-search-wrapper");
  const searchBoxWrapper = document.querySelector(".search-box-wrapper");

  const cityInput = document.getElementById("city-input");
  const clearInputBtn = document.getElementById("clear-input-btn");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const searchDropdown = document.getElementById("search-dropdown");
  const errorMessage = document.getElementById("error-message");
  const errorText = document.getElementById("error-text");
  const loadingSpinner = document.getElementById("loading-spinner");
  const weatherDashboard = document.getElementById("weather-dashboard");

  // Hero Scenery Elements
  const ambientSkyCanvas = document.getElementById("ambient-sky-canvas");
  const skyElements = document.getElementById("sky-elements");
  const cityNameDisplay = document.getElementById("city-name");
  const localTimeDisplay = document.getElementById("local-time");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const tempMaxDisplay = document.getElementById("temp-max");
  const tempMinDisplay = document.getElementById("temp-min");
  const feelsLikeDisplay = document.getElementById("feels-like");

  // Summary & Forecast
  const summaryText = document.getElementById("summary-text");
  const hourlyTimeline = document.getElementById("hourly-timeline");

  // Widgets
  const sunGlowCircle = document.getElementById("sun-glow-circle");
  const arcSunriseText = document.getElementById("arc-sunrise-text");
  const arcSunsetText = document.getElementById("arc-sunset-text");
  const sunStatusTitle = document.getElementById("sun-status-title");
  const sunFooterText = document.getElementById("sun-footer-text");

  const insightTitle = document.getElementById("insight-title");
  const insightDesc = document.getElementById("insight-desc");

  const humidityDisplay = document.getElementById("humidity");
  const humidityBar = document.getElementById("humidity-bar");
  const humidityStatus = document.getElementById("humidity-status");

  const windSpeedDisplay = document.getElementById("wind-speed");
  const windDirection = document.getElementById("wind-direction");
  const windCaption = document.getElementById("wind-caption");

  const pressureDisplay = document.getElementById("pressure");
  const visibilityDisplay = document.getElementById("visibility");
  const visibilityStatus = document.getElementById("visibility-status");

  // API Key & Storage Constants
  const API_KEY = "5deead9ad15ea47dc8fff790537c8568";
  const HISTORY_STORAGE_KEY = "atmosphere_recent_searches";
  const MAX_HISTORY_ITEMS = 6;

  // State
  let debounceTimeout = null;
  let currentAbortController = null;
  let activeDropdownIndex = -1;
  let currentSuggestions = [];

  // --- Initial Launch State ---
  // Create beautiful ambient sky background for the welcome screen
  initAmbientSky();

  // --- Event Listeners ---
  getWeatherBtn.addEventListener("click", () => {
    closeDropdown();
    handleSearch(cityInput.value.trim());
  });

  cityInput.addEventListener("input", onInputChange);
  cityInput.addEventListener("focus", onInputFocus);
  cityInput.addEventListener("keydown", onInputKeydown);

  clearInputBtn.addEventListener("click", () => {
    cityInput.value = "";
    clearInputBtn.classList.add("hidden");
    cityInput.focus();
    renderHistoryDropdown();
  });

  // Quick search city pill buttons
  document.querySelectorAll(".city-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const city = pill.getAttribute("data-city");
      cityInput.value = city;
      clearInputBtn.classList.remove("hidden");
      closeDropdown();
      handleSearch(city);
    });
  });

  // Click Atmosphere Brand / Logo to return to Home Welcome Screen
  if (brandHomeBtn) {
    brandHomeBtn.addEventListener("click", returnToHomeScreen);
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box-wrapper")) {
      closeDropdown();
    }
  });

  // --- View Switcher (Welcome Screen <-> Weather Dashboard) ---
  function activateDashboardView() {
    if (!welcomeScreen.classList.contains("hidden")) {
      welcomeScreen.classList.add("hidden");
      topNav.classList.remove("hidden");
      navSearchMount.appendChild(searchBoxWrapper);
    }
    weatherDashboard.classList.remove("hidden");
  }

  function returnToHomeScreen() {
    weatherDashboard.classList.add("hidden");
    topNav.classList.add("hidden");
    errorMessage.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");
    welcomeSearchWrapper.insertBefore(searchBoxWrapper, welcomeSearchWrapper.firstChild);
    cityInput.value = "";
    clearInputBtn.classList.add("hidden");
    document.body.className = "theme-night";
    initAmbientSky();
  }

  // --- Ambient Background Generator ---
  function initAmbientSky() {
    if (!ambientSkyCanvas) return;
    ambientSkyCanvas.innerHTML = "";

    // Glowing Ambient Moon
    const moon = document.createElement("div");
    moon.className = "celestial-body moon-glow";
    moon.style.top = "60px";
    moon.style.right = "10%";
    ambientSkyCanvas.appendChild(moon);

    // Stars
    for (let i = 0; i < 40; i++) {
      const star = document.createElement("div");
      star.className = "star-particle";
      star.style.top = `${Math.random() * 85}%`;
      star.style.left = `${Math.random() * 95}%`;
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.animationDelay = `${Math.random() * 4}s`;
      ambientSkyCanvas.appendChild(star);
    }
  }

  // --- Input & Autocomplete Handlers ---
  function onInputChange() {
    const query = cityInput.value.trim();

    if (query.length > 0) {
      clearInputBtn.classList.remove("hidden");
    } else {
      clearInputBtn.classList.add("hidden");
    }

    if (debounceTimeout) clearTimeout(debounceTimeout);

    if (query.length === 0) {
      renderHistoryDropdown();
      return;
    }

    if (query.length < 2) {
      closeDropdown();
      return;
    }

    // Debounce live suggestions by 300ms
    debounceTimeout = setTimeout(() => {
      fetchCitySuggestions(query);
    }, 300);
  }

  function onInputFocus() {
    const query = cityInput.value.trim();
    if (query.length === 0) {
      renderHistoryDropdown();
    } else if (query.length >= 2) {
      fetchCitySuggestions(query);
    }
  }

  function onInputKeydown(e) {
    const items = searchDropdown.querySelectorAll(".dropdown-item");

    if (e.key === "ArrowDown") {
      if (searchDropdown.classList.contains("hidden") || items.length === 0) return;
      e.preventDefault();
      activeDropdownIndex = (activeDropdownIndex + 1) % items.length;
      updateActiveDropdownItem(items);
    } else if (e.key === "ArrowUp") {
      if (searchDropdown.classList.contains("hidden") || items.length === 0) return;
      e.preventDefault();
      activeDropdownIndex = (activeDropdownIndex - 1 + items.length) % items.length;
      updateActiveDropdownItem(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!searchDropdown.classList.contains("hidden") && activeDropdownIndex >= 0 && activeDropdownIndex < items.length) {
        items[activeDropdownIndex].click();
      } else {
        closeDropdown();
        handleSearch(cityInput.value.trim());
      }
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  }

  function updateActiveDropdownItem(items) {
    items.forEach((item, index) => {
      if (index === activeDropdownIndex) {
        item.classList.add("active-item");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("active-item");
      }
    });
  }

  function closeDropdown() {
    searchDropdown.classList.add("hidden");
    searchDropdown.innerHTML = "";
    activeDropdownIndex = -1;
  }

  // --- Live Suggestions API ---
  async function fetchCitySuggestions(query) {
    if (currentAbortController) {
      currentAbortController.abort();
    }
    currentAbortController = new AbortController();

    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
      const response = await fetch(url, { signal: currentAbortController.signal });

      if (!response.ok) return;

      const data = await response.json();
      currentSuggestions = data;
      renderSuggestionsDropdown(data, query);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Suggestion error:", err);
      }
    }
  }

  function renderSuggestionsDropdown(suggestions, query) {
    if (!suggestions || suggestions.length === 0) {
      searchDropdown.innerHTML = `
        <div class="dropdown-empty-state">
          No matching cities found for "<strong>${escapeHtml(query)}</strong>"
        </div>
      `;
      searchDropdown.classList.remove("hidden");
      activeDropdownIndex = -1;
      return;
    }

    activeDropdownIndex = -1;

    let html = `
      <div class="dropdown-header">
        <span class="dropdown-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Suggestions
        </span>
      </div>
    `;

    suggestions.forEach((item, index) => {
      const locationSub = item.state ? `${item.state}, ${item.country}` : item.country;
      const highlightedName = highlightMatch(item.name, query);

      html += `
        <div class="dropdown-item" data-index="${index}">
          <div class="dropdown-item-left">
            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div class="dropdown-text-group">
              <span class="dropdown-primary-text">${highlightedName}</span>
              <span class="dropdown-secondary-text">${escapeHtml(locationSub)}</span>
            </div>
          </div>
        </div>
      `;
    });

    searchDropdown.innerHTML = html;
    searchDropdown.classList.remove("hidden");

    searchDropdown.querySelectorAll(".dropdown-item").forEach((el) => {
      el.addEventListener("click", () => {
        const index = parseInt(el.getAttribute("data-index"), 10);
        const selected = currentSuggestions[index];
        if (selected) {
          cityInput.value = selected.name;
          clearInputBtn.classList.remove("hidden");
          closeDropdown();
          executeSearchWithCoords(selected.lat, selected.lon, selected);
        }
      });
    });
  }

  // --- Recent Searches (History) ---
  function getSearchHistory() {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function saveSearchToHistory(locationObj) {
    try {
      let history = getSearchHistory();
      history = history.filter(
        (h) => h.name.toLowerCase() !== locationObj.name.toLowerCase() || h.country !== locationObj.country
      );
      history.unshift({
        name: locationObj.name,
        state: locationObj.state || "",
        country: locationObj.country || "",
        lat: locationObj.lat,
        lon: locationObj.lon,
      });
      if (history.length > MAX_HISTORY_ITEMS) {
        history = history.slice(0, MAX_HISTORY_ITEMS);
      }
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("Error saving search history:", e);
    }
  }

  function removeHistoryItem(index) {
    let history = getSearchHistory();
    history.splice(index, 1);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    renderHistoryDropdown();
  }

  function clearAllHistory() {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    closeDropdown();
  }

  function renderHistoryDropdown() {
    const history = getSearchHistory();
    if (history.length === 0) {
      closeDropdown();
      return;
    }

    activeDropdownIndex = -1;

    let html = `
      <div class="dropdown-header">
        <span class="dropdown-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Recent Searches
        </span>
        <button class="clear-history-btn" id="clear-all-history-btn">Clear all</button>
      </div>
    `;

    history.forEach((item, index) => {
      const locationSub = item.state ? `${item.state}, ${item.country}` : item.country;
      html += `
        <div class="dropdown-item" data-history-index="${index}">
          <div class="dropdown-item-left">
            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <div class="dropdown-text-group">
              <span class="dropdown-primary-text">${escapeHtml(item.name)}</span>
              <span class="dropdown-secondary-text">${escapeHtml(locationSub)}</span>
            </div>
          </div>
          <button class="delete-item-btn" title="Remove from history" data-delete-index="${index}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      `;
    });

    searchDropdown.innerHTML = html;
    searchDropdown.classList.remove("hidden");

    const clearAllBtn = document.getElementById("clear-all-history-btn");
    if (clearAllBtn) {
      clearAllBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        clearAllHistory();
      });
    }

    searchDropdown.querySelectorAll(".dropdown-item").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target.closest(".delete-item-btn")) return;
        const index = parseInt(el.getAttribute("data-history-index"), 10);
        const item = history[index];
        if (item) {
          cityInput.value = item.name;
          clearInputBtn.classList.remove("hidden");
          closeDropdown();
          if (item.lat && item.lon) {
            executeSearchWithCoords(item.lat, item.lon, item);
          } else {
            handleSearch(item.name);
          }
        }
      });
    });

    searchDropdown.querySelectorAll(".delete-item-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const deleteIndex = parseInt(btn.getAttribute("data-delete-index"), 10);
        removeHistoryItem(deleteIndex);
      });
    });
  }

  // --- Main Search Execution ---
  async function handleSearch(cityName) {
    if (!cityName) return;

    if (cityName.length < 2) {
      showError("Please enter at least 2 characters for city search.");
      return;
    }

    showLoading();

    try {
      const locationData = await fetchCoordinates(cityName);
      await executeSearchWithCoords(locationData.lat, locationData.lon, locationData);
    } catch (error) {
      console.error(error);
      showError(error.message);
    } finally {
      hideLoading();
    }
  }

  async function executeSearchWithCoords(lat, lon, locationData) {
    showLoading();

    try {
      const [currentWeather, forecastData] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
      ]);

      activateDashboardView();
      renderAtmosphereDashboard(currentWeather, forecastData, locationData);
      saveSearchToHistory(locationData);
    } catch (error) {
      console.error(error);
      showError(error.message);
    } finally {
      hideLoading();
    }
  }

  // --- API Fetch Functions ---
  async function fetchCoordinates(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Failed to fetch location data.");

    const data = await response.json();
    if (!data || data.length === 0) {
      throw new Error(`No city found for "${city}". Please check the spelling.`);
    }

    const searchLower = city.toLowerCase();
    const exactMatch = data.find((item) => item.name.toLowerCase() === searchLower);
    if (exactMatch) return exactMatch;

    const startsWithMatch = data.find((item) => item.name.toLowerCase().startsWith(searchLower));
    if (startsWithMatch) return startsWithMatch;

    return data[0];
  }

  async function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch current weather details.");
    return await response.json();
  }

  async function fetchForecastByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch hourly forecast data.");
    return await response.json();
  }

  // --- Render Master Dashboard ---
  function renderAtmosphereDashboard(current, forecast, location) {
    const { main, weather, wind, sys, visibility, timezone } = current;
    const { name } = location;

    // 1. Header & Location Meta
    cityNameDisplay.textContent = name;
    localTimeDisplay.textContent = formatLocalTime(timezone);

    // 2. Hero Weather Readings
    temperatureDisplay.textContent = Math.round(main.temp);
    descriptionDisplay.textContent = weather[0].description;
    tempMaxDisplay.textContent = `${Math.round(main.temp_max)}°`;
    tempMinDisplay.textContent = `${Math.round(main.temp_min)}°`;
    feelsLikeDisplay.textContent = `${Math.round(main.feels_like)}°`;

    // 3. Dynamic Animated Sky & Scenery Theme
    updateSceneryAndTheme(current);

    // 4. Summary Banner
    generateSummaryNarrative(current, forecast);

    // 5. Hourly Forecast Spline Curve Chart
    renderHourlySplineChart(forecast, timezone, sys);

    // 6. Sun Cycle Arc Widget
    renderSunCycleArc(sys, timezone);

    // 7. Insight Card
    renderInsightWidget(current, forecast);

    // 8. Metrics Grid
    renderMetricCards(current);

    errorMessage.classList.add("hidden");
  }

  // --- Animated Scenery & Theme Engine ---
  function updateSceneryAndTheme(weatherData) {
    const { weather, sys, dt } = weatherData;
    const condition = weather[0].main;
    const isNight = isNightTime(dt, sys.sunrise, sys.sunset);

    // Switch body theme class
    document.body.className = "";
    if (condition === "Rain" || condition === "Drizzle" || condition === "Thunderstorm") {
      document.body.classList.add("theme-rain");
    } else if (isNight) {
      document.body.classList.add("theme-night");
    } else {
      document.body.classList.add("theme-day");
    }

    // Build sky elements inside hero scenery card
    skyElements.innerHTML = "";

    if (isNight) {
      const moon = document.createElement("div");
      moon.className = "celestial-body moon-glow";
      skyElements.appendChild(moon);

      for (let i = 0; i < 35; i++) {
        const star = document.createElement("div");
        star.className = "star-particle";
        star.style.top = `${Math.random() * 65}%`;
        star.style.left = `${Math.random() * 95}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 4}s`;
        skyElements.appendChild(star);
      }
    } else {
      const sun = document.createElement("div");
      sun.className = "celestial-body sun-glow";
      skyElements.appendChild(sun);
    }

    if (condition === "Clouds" || condition === "Rain" || condition === "Mist") {
      for (let i = 0; i < 4; i++) {
        const cloud = document.createElement("div");
        cloud.className = "cloud-layer";
        cloud.style.top = `${15 + i * 20}%`;
        cloud.style.left = `${-100 + i * 240}px`;
        cloud.style.width = `${240 + i * 80}px`;
        cloud.style.height = `${100 + i * 30}px`;
        cloud.style.animationDuration = `${35 + i * 15}s`;
        cloud.style.animationDelay = `${i * 3}s`;
        skyElements.appendChild(cloud);
      }
    }

    if (condition === "Rain" || condition === "Drizzle" || condition === "Thunderstorm") {
      for (let i = 0; i < 40; i++) {
        const rain = document.createElement("div");
        rain.className = "rain-streak";
        rain.style.left = `${Math.random() * 100}%`;
        rain.style.top = `${Math.random() * 50}%`;
        rain.style.animationDelay = `${Math.random() * 1.5}s`;
        rain.style.animationDuration = `${0.6 + Math.random() * 0.4}s`;
        skyElements.appendChild(rain);
      }
    }
  }

  function isNightTime(currentTimestamp, sunriseTimestamp, sunsetTimestamp) {
    if (!sunriseTimestamp || !sunsetTimestamp) return false;
    return currentTimestamp < sunriseTimestamp || currentTimestamp > sunsetTimestamp;
  }

  // --- Summary Narrative Generator ---
  function generateSummaryNarrative(current, forecast) {
    const condition = current.weather[0].description;
    const highs = Math.round(current.main.temp_max);
    const lows = Math.round(current.main.temp_min);

    let narrative = `Generally ${condition}. Highs of ${highs}°C and lows near ${lows}°C.`;

    if (current.weather[0].main === "Rain") {
      narrative = `Rainy conditions throughout the area. Keep an umbrella handy with highs around ${highs}°C.`;
    } else if (current.weather[0].main === "Clear") {
      narrative = `Clear skies with great visibility. Expected high of ${highs}°C and low of ${lows}°C.`;
    }

    summaryText.textContent = narrative;
  }

  // --- Hourly Forecast Spline Curve Chart ---
  function renderHourlySplineChart(forecastData, timezoneOffset, sys) {
    const list = forecastData.list.slice(0, 9); // next 24-27 hours
    if (!list || list.length === 0) return;

    const temps = list.map((item) => Math.round(item.main.temp));
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempRange = Math.max(maxTemp - minTemp, 4);

    const colWidth = 76;
    const totalWidth = list.length * colWidth;
    const graphHeight = 85;
    const graphTopPadding = 25;

    const points = list.map((item, index) => {
      const x = index * colWidth + colWidth / 2;
      const normalized = (item.main.temp - minTemp) / tempRange;
      const y = graphTopPadding + (1 - normalized) * (graphHeight - 35);
      return { x, y, temp: Math.round(item.main.temp) };
    });

    const svgPath = createSmoothSplinePath(points);

    let html = `
      <div class="hourly-columns-grid" style="min-width: ${totalWidth}px;">
    `;

    list.forEach((item, index) => {
      const hourStr = index === 0 ? "Now" : formatHourOnly(item.dt, timezoneOffset);
      const iconCode = item.weather[0].icon;
      const popPercent = Math.round((item.pop || 0) * 100);
      const popDisplay = popPercent > 0 ? `☂ ${popPercent}%` : "";

      html += `
        <div class="hourly-col" style="width: ${colWidth}px;">
          <span class="hourly-time">${hourStr}</span>
          <div class="hourly-icon-box">
            <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${item.weather[0].description}"/>
          </div>
          <span class="hourly-pop">${popDisplay}</span>
        </div>
      `;
    });

    html += `</div>`;

    let svgOverlay = `
      <svg class="hourly-graph-svg-layer" viewBox="0 0 ${totalWidth} ${graphHeight}" style="min-width: ${totalWidth}px; width: ${totalWidth}px;">
        <path d="${svgPath}" class="hourly-graph-path"/>
    `;

    points.forEach((pt) => {
      svgOverlay += `
        <text x="${pt.x}" y="${pt.y - 10}" class="hourly-temp-label">${pt.temp}°</text>
        <circle cx="${pt.x}" cy="${pt.y}" r="4.5" class="hourly-temp-dot"/>
      `;
    });

    svgOverlay += `</svg>`;

    hourlyTimeline.innerHTML = html + svgOverlay;
  }

  function createSmoothSplinePath(points) {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  // --- Sun Cycle Arc Renderer ---
  function renderSunCycleArc(sys, timezoneOffset) {
    if (!sys || !sys.sunrise || !sys.sunset) return;

    const sunriseStr = formatTimestampWithOffset(sys.sunrise, timezoneOffset);
    const sunsetStr = formatTimestampWithOffset(sys.sunset, timezoneOffset);

    arcSunriseText.textContent = sunriseStr;
    arcSunsetText.textContent = sunsetStr;

    const nowSec = Math.floor(Date.now() / 1000);
    const totalDay = sys.sunset - sys.sunrise;
    const elapsed = nowSec - sys.sunrise;

    let progress = elapsed / totalDay;
    progress = Math.max(0, Math.min(1, progress));

    const cx = 120 - 95 * Math.cos(progress * Math.PI);
    const cy = 105 - 95 * Math.sin(progress * Math.PI);

    sunGlowCircle.setAttribute("cx", cx);
    sunGlowCircle.setAttribute("cy", cy);

    if (nowSec < sys.sunrise) {
      sunStatusTitle.textContent = "Night Sky";
      sunFooterText.textContent = `Sunrise will be at ${sunriseStr}`;
      sunGlowCircle.setAttribute("fill", "#e0e7ff");
    } else if (nowSec > sys.sunset) {
      sunStatusTitle.textContent = "Evening Starlight";
      sunFooterText.textContent = `Sunset was at ${sunsetStr}`;
      sunGlowCircle.setAttribute("fill", "#e0e7ff");
    } else {
      sunStatusTitle.textContent = "Rise and Shine";
      sunFooterText.textContent = `Sunset will be at ${sunsetStr}`;
      sunGlowCircle.setAttribute("fill", "#ffd700");
    }
  }

  // --- Insight Widget ---
  function renderInsightWidget(current, forecast) {
    const currentTemp = Math.round(current.main.temp);
    const tomorrowTemp = forecast.list[8] ? Math.round(forecast.list[8].main.temp) : currentTemp;
    const diff = tomorrowTemp - currentTemp;

    insightTitle.textContent = "Tomorrow's Temperature";

    if (diff > 0) {
      insightDesc.textContent = `Temperatures will be around ${Math.abs(diff)}° higher than today.`;
    } else if (diff < 0) {
      insightDesc.textContent = `Temperatures a little lower than today (${Math.abs(diff)}°↓).`;
    } else {
      insightDesc.textContent = `Expect similar pleasant temperatures to today.`;
    }
  }

  // --- Detailed Metrics Grid ---
  function renderMetricCards(current) {
    const { main, wind, visibility } = current;

    humidityDisplay.textContent = `${main.humidity}%`;
    humidityBar.style.width = `${main.humidity}%`;
    if (main.humidity < 40) humidityStatus.textContent = "Dry air";
    else if (main.humidity <= 70) humidityStatus.textContent = "Comfortable level";
    else humidityStatus.textContent = "High humidity";

    windSpeedDisplay.textContent = `${wind.speed} m/s`;
    windDirection.textContent = getWindDirectionText(wind.deg);
    if (wind.speed < 3) windCaption.textContent = "Light air";
    else if (wind.speed < 8) windCaption.textContent = "Gentle breeze";
    else windCaption.textContent = "Strong breeze";

    pressureDisplay.textContent = `${main.pressure} hPa`;

    const visKm = visibility ? (visibility / 1000).toFixed(1) : "--";
    visibilityDisplay.textContent = `${visKm} km`;
    if (visibility >= 9000) visibilityStatus.textContent = "Clear visibility";
    else if (visibility >= 4000) visibilityStatus.textContent = "Moderate haze";
    else visibilityStatus.textContent = "Low visibility";
  }

  function getWindDirectionText(deg) {
    if (deg === undefined) return "Calm";
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return `${dirs[Math.round(deg / 45) % 8]} direction`;
  }

  // --- Utilities & UI ---
  function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove("hidden");
  }

  function showLoading() {
    loadingSpinner.classList.remove("hidden");
  }

  function hideLoading() {
    loadingSpinner.classList.add("hidden");
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
    return escapeHtml(text).replace(regex, "<strong>$1</strong>");
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function formatLocalTime(timezoneOffsetSeconds) {
    const nowUtc = Date.now() + new Date().getTimezoneOffset() * 60000;
    const cityTime = new Date(nowUtc + timezoneOffsetSeconds * 1000);
    return cityTime.toLocaleDateString([], {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatHourOnly(timestamp, timezoneOffsetSeconds) {
    const dateUtc = timestamp * 1000;
    const offsetMs = (new Date().getTimezoneOffset() * 60 + timezoneOffsetSeconds) * 1000;
    const cityDate = new Date(dateUtc + offsetMs);
    return cityDate.toLocaleTimeString([], { hour: "numeric" }).toLowerCase();
  }

  function formatTimestampWithOffset(timestamp, timezoneOffsetSeconds) {
    const dateUtc = timestamp * 1000;
    const offsetMs = (new Date().getTimezoneOffset() * 60 + timezoneOffsetSeconds) * 1000;
    const cityDate = new Date(dateUtc + offsetMs);
    return cityDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
});
