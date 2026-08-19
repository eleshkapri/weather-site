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
  const insightBadge = document.getElementById("insight-badge");
  const insightRangeVal = document.getElementById("insight-range-val");
  const insightRainVal = document.getElementById("insight-rain-val");
  const insightOutlookVal = document.getElementById("insight-outlook-val");

  const humidityDisplay = document.getElementById("humidity");
  const humidityBar = document.getElementById("humidity-bar");
  const humidityStatus = document.getElementById("humidity-status");

  const windSpeedDisplay = document.getElementById("wind-speed");
  const windDirection = document.getElementById("wind-direction");
  const windCaption = document.getElementById("wind-caption");

  const pressureDisplay = document.getElementById("pressure");
  const visibilityDisplay = document.getElementById("visibility");
  const visibilityStatus = document.getElementById("visibility-status");

  // Storage Constants
  const HISTORY_STORAGE_KEY = "atmosphere_recent_searches";
  const MAX_HISTORY_ITEMS = 6;

  // WMO Weather Codes & Condition Mappings
  const WMO_WEATHER_MAP = {
    0: { main: "Clear", desc: "Clear Sky", iconDay: "01d", iconNight: "01n" },
    1: { main: "Clear", desc: "Mainly Clear", iconDay: "01d", iconNight: "01n" },
    2: { main: "Clouds", desc: "Partly Cloudy", iconDay: "02d", iconNight: "02n" },
    3: { main: "Clouds", desc: "Overcast", iconDay: "04d", iconNight: "04n" },
    45: { main: "Mist", desc: "Foggy", iconDay: "50d", iconNight: "50n" },
    48: { main: "Mist", desc: "Depositing Rime Fog", iconDay: "50d", iconNight: "50n" },
    51: { main: "Rain", desc: "Light Drizzle", iconDay: "09d", iconNight: "09n" },
    53: { main: "Rain", desc: "Moderate Drizzle", iconDay: "09d", iconNight: "09n" },
    55: { main: "Rain", desc: "Dense Drizzle", iconDay: "09d", iconNight: "09n" },
    56: { main: "Rain", desc: "Freezing Drizzle", iconDay: "09d", iconNight: "09n" },
    57: { main: "Rain", desc: "Dense Freezing Drizzle", iconDay: "09d", iconNight: "09n" },
    61: { main: "Rain", desc: "Slight Rain", iconDay: "10d", iconNight: "10n" },
    63: { main: "Rain", desc: "Moderate Rain", iconDay: "10d", iconNight: "10n" },
    65: { main: "Rain", desc: "Heavy Rain", iconDay: "10d", iconNight: "10n" },
    66: { main: "Rain", desc: "Freezing Rain", iconDay: "13d", iconNight: "13n" },
    67: { main: "Rain", desc: "Heavy Freezing Rain", iconDay: "13d", iconNight: "13n" },
    71: { main: "Snow", desc: "Slight Snow Fall", iconDay: "13d", iconNight: "13n" },
    73: { main: "Snow", desc: "Moderate Snow Fall", iconDay: "13d", iconNight: "13n" },
    75: { main: "Snow", desc: "Heavy Snow Fall", iconDay: "13d", iconNight: "13n" },
    77: { main: "Snow", desc: "Snow Grains", iconDay: "13d", iconNight: "13n" },
    80: { main: "Rain", desc: "Slight Rain Showers", iconDay: "09d", iconNight: "09n" },
    81: { main: "Rain", desc: "Moderate Rain Showers", iconDay: "09d", iconNight: "09n" },
    82: { main: "Rain", desc: "Violent Rain Showers", iconDay: "09d", iconNight: "09n" },
    85: { main: "Snow", desc: "Slight Snow Showers", iconDay: "13d", iconNight: "13n" },
    86: { main: "Snow", desc: "Heavy Snow Showers", iconDay: "13d", iconNight: "13n" },
    95: { main: "Thunderstorm", desc: "Thunderstorm", iconDay: "11d", iconNight: "11n" },
    96: { main: "Thunderstorm", desc: "Thunderstorm with Hail", iconDay: "11d", iconNight: "11n" },
    99: { main: "Thunderstorm", desc: "Heavy Thunderstorm with Hail", iconDay: "11d", iconNight: "11n" },
  };

  // State
  let debounceTimeout = null;
  let currentAbortController = null;
  let activeDropdownIndex = -1;
  let currentSuggestions = [];

  // --- Initial Launch State ---
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

    // Debounce live suggestions by 250ms
    debounceTimeout = setTimeout(() => {
      fetchCitySuggestions(query);
    }, 250);
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

  // --- High-Precision Global City Geocoding API ---
  async function fetchCitySuggestions(query) {
    if (currentAbortController) {
      currentAbortController.abort();
    }
    currentAbortController = new AbortController();

    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
      const response = await fetch(url, { signal: currentAbortController.signal });

      if (!response.ok) return;

      const data = await response.json();
      currentSuggestions = data.results || [];
      renderSuggestionsDropdown(currentSuggestions, query);
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
          Matching Locations
        </span>
      </div>
    `;

    suggestions.forEach((item, index) => {
      const region = item.admin1 ? `${item.admin1}, ` : "";
      const locationSub = `${region}${item.country || ""}`;
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
          executeSearchWithCoords(selected.latitude, selected.longitude, selected);
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
        admin1: locationObj.admin1 || "",
        country: locationObj.country || "",
        latitude: locationObj.latitude,
        longitude: locationObj.longitude,
        timezone: locationObj.timezone || "auto",
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
      const region = item.admin1 ? `${item.admin1}, ` : "";
      const locationSub = `${region}${item.country || ""}`;

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
          if (item.latitude && item.longitude) {
            executeSearchWithCoords(item.latitude, item.longitude, item);
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
      await executeSearchWithCoords(locationData.latitude, locationData.longitude, locationData);
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
      const weatherData = await fetchGlobalWeatherData(lat, lon, locationData.timezone);
      activateDashboardView();
      renderAtmosphereDashboard(weatherData, locationData);
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
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Failed to fetch location data.");

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error(`No city found for "${city}". Please check the spelling.`);
    }

    const searchLower = city.toLowerCase();
    const exactMatch = data.results.find((item) => item.name.toLowerCase() === searchLower);
    if (exactMatch) return exactMatch;

    return data.results[0];
  }

  async function fetchGlobalWeatherData(lat, lon, timezone) {
    const tzParam = timezone && timezone !== "auto" ? encodeURIComponent(timezone) : "auto";
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=${tzParam}&forecast_days=2`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch forecast details from global models.");
    return await response.json();
  }

  // --- Render Master Dashboard ---
  function renderAtmosphereDashboard(data, location) {
    const { current, hourly, daily, utc_offset_seconds, timezone } = data;
    const { name, country } = location;

    const wmoInfo = WMO_WEATHER_MAP[current.weather_code] || {
      main: "Clear",
      desc: "Clear Sky",
      iconDay: "01d",
      iconNight: "01n",
    };

    // 1. Header & Location Meta
    cityNameDisplay.textContent = name;
    localTimeDisplay.textContent = formatCurrentLocalTime(utc_offset_seconds, timezone);

    // 2. Hero Weather Readings
    temperatureDisplay.textContent = Math.round(current.temperature_2m);
    descriptionDisplay.textContent = wmoInfo.desc;
    tempMaxDisplay.textContent = `${Math.round(daily.temperature_2m_max[0])}°`;
    tempMinDisplay.textContent = `${Math.round(daily.temperature_2m_min[0])}°`;
    feelsLikeDisplay.textContent = `${Math.round(current.apparent_temperature)}°`;

    // 3. Dynamic Animated 3D Sky & Scenery Theme
    updateSceneryAndTheme(current.is_day, wmoInfo.main);

    // 4. Summary Banner
    generateSummaryNarrative(current, daily, wmoInfo);

    // 5. High-Resolution Hourly Forecast Spline Curve Chart
    renderHourlySplineChart(hourly, current.time, utc_offset_seconds, timezone);

    // 6. Sun Cycle Arc Widget
    renderSunCycleArc(daily, current.time, current.is_day, utc_offset_seconds);

    // 7. Insight Card
    renderInsightWidget(daily);

    // 8. Metrics Grid
    renderMetricCards(current, hourly);

    errorMessage.classList.add("hidden");
  }

  // --- Animated 3D Scenery & Theme Engine ---
  function updateSceneryAndTheme(isDay, conditionMain) {
    const isNight = isDay === 0;
    const isRain = conditionMain === "Rain" || conditionMain === "Drizzle";
    const isStorm = conditionMain === "Thunderstorm";
    const isCloudy = conditionMain === "Clouds" || conditionMain === "Mist";

    // Switch body theme class based on Day/Night x Weather Condition
    document.body.className = "";

    if (isStorm) {
      document.body.classList.add("theme-thunderstorm");
    } else if (isRain) {
      document.body.classList.add(isNight ? "theme-night-rain" : "theme-day-rain");
    } else if (isCloudy) {
      document.body.classList.add(isNight ? "theme-night-cloudy" : "theme-day-cloudy");
    } else {
      // Clear
      document.body.classList.add(isNight ? "theme-night-clear" : "theme-day-clear");
    }

    // Clear ambient sky canvas so moon/stars don't bleed into daytime background!
    if (ambientSkyCanvas) ambientSkyCanvas.innerHTML = "";

    // Build sky elements inside hero scenery card
    skyElements.innerHTML = "";

    if (isNight) {
      // 3D Celestial Moon with craters & glowing halo
      const moon3d = document.createElement("div");
      moon3d.className = "moon-3d";
      moon3d.innerHTML = `
        <div class="moon-sphere">
          <div class="moon-crater c1"></div>
          <div class="moon-crater c2"></div>
          <div class="moon-crater c3"></div>
        </div>
        <div class="moon-halo"></div>
      `;
      skyElements.appendChild(moon3d);

      // Starfield particles (adjusted count based on cloud cover)
      const starCount = isCloudy ? 15 : isRain || isStorm ? 6 : 38;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star-particle";
        star.style.top = `${Math.random() * 60}%`;
        star.style.left = `${Math.random() * 95}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 4}s`;
        skyElements.appendChild(star);
      }
    } else {
      // 3D Radiant Sun with rotating corona and ambient halo
      const sun3d = document.createElement("div");
      sun3d.className = "sun-3d";
      sun3d.innerHTML = `
        <div class="sun-ambient-halo"></div>
        <div class="sun-corona"></div>
        <div class="sun-core"></div>
      `;
      if (isCloudy || isRain) {
        sun3d.style.opacity = isRain ? "0.35" : "0.75";
      }
      skyElements.appendChild(sun3d);

      // Soft ambient background clouds in daytime
      if (ambientSkyCanvas && !isRain && !isStorm) {
        const bgCloudCount = isCloudy ? 5 : 3;
        for (let i = 0; i < bgCloudCount; i++) {
          const bgCloud = document.createElement("div");
          bgCloud.className = "cloud-layer";
          bgCloud.style.top = `${5 + i * 16}%`;
          bgCloud.style.left = `${-180 + i * 280}px`;
          bgCloud.style.width = `${380 + i * 120}px`;
          bgCloud.style.height = `${120 + i * 30}px`;
          bgCloud.style.opacity = isCloudy ? "0.55" : "0.35";
          bgCloud.style.animationDuration = `${50 + i * 16}s`;
          ambientSkyCanvas.appendChild(bgCloud);
        }
      }
    }

    // 3D Volumetric Fluffy Clouds
    let cloudConfigs = [];
    if (isCloudy) {
      cloudConfigs = [
        { top: "10%", left: "-40px", scale: 1.2, dur: "38s", delay: "0s" },
        { top: "24%", left: "140px", scale: 0.95, dur: "48s", delay: "-10s" },
        { top: "6%", left: "360px", scale: 1.1, dur: "44s", delay: "-20s" },
        { top: "18%", left: "580px", scale: 0.85, dur: "54s", delay: "-5s" },
        { top: "28%", left: "780px", scale: 1.05, dur: "42s", delay: "-15s" },
      ];
    } else if (isRain || isStorm) {
      cloudConfigs = [
        { top: "8%", left: "-30px", scale: 1.25, dur: "32s", delay: "0s" },
        { top: "20%", left: "200px", scale: 1.1, dur: "40s", delay: "-8s" },
        { top: "12%", left: "480px", scale: 1.2, dur: "36s", delay: "-16s" },
        { top: "22%", left: "720px", scale: 1.0, dur: "45s", delay: "-4s" },
      ];
    } else {
      // Clear
      cloudConfigs = [
        { top: "14%", left: "-60px", scale: 1.0, dur: "48s", delay: "0s" },
        { top: "24%", left: "420px", scale: 0.8, dur: "56s", delay: "-18s" },
      ];
    }

    cloudConfigs.forEach((cfg) => {
      const cloud = create3DFluffyCloud(cfg.top, cfg.left, cfg.scale, cfg.dur, cfg.delay);
      skyElements.appendChild(cloud);
    });

    // Rain Streaks in rainy or stormy conditions
    if (isRain || isStorm) {
      const rainCount = isStorm ? 60 : 45;
      for (let i = 0; i < rainCount; i++) {
        const rain = document.createElement("div");
        rain.className = "rain-streak";
        rain.style.left = `${Math.random() * 100}%`;
        rain.style.top = `${Math.random() * 55}%`;
        rain.style.animationDelay = `${Math.random() * 1.5}s`;
        rain.style.animationDuration = `${0.5 + Math.random() * 0.4}s`;
        skyElements.appendChild(rain);
      }
    }

    // Thunderstorm Lightning Flash Overlay
    if (isStorm) {
      const flash = document.createElement("div");
      flash.className = "lightning-flash-overlay";
      skyElements.appendChild(flash);
    }
  }

  function create3DFluffyCloud(top, left, scale, duration, delay) {
    const cloud = document.createElement("div");
    cloud.className = "fluffy-cloud-3d";
    cloud.style.top = top;
    cloud.style.left = left;
    cloud.style.transform = `scale(${scale})`;
    cloud.style.animationDuration = duration;
    cloud.style.animationDelay = delay;

    cloud.innerHTML = `
      <svg class="cloud-svg" viewBox="0 0 200 110">
        <defs>
          <radialGradient id="cloudVolumetricGrad" cx="38%" cy="28%" r="72%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="55%" stop-color="#f2f8ff"/>
            <stop offset="85%" stop-color="#d8ebfd"/>
            <stop offset="100%" stop-color="#bddbf7"/>
          </radialGradient>
          <filter id="cloudDepthShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="rgba(15, 35, 75, 0.15)"/>
          </filter>
        </defs>
        <g filter="url(#cloudDepthShadow)">
          <circle cx="52" cy="66" r="32" fill="url(#cloudVolumetricGrad)"/>
          <circle cx="98" cy="48" r="44" fill="url(#cloudVolumetricGrad)"/>
          <circle cx="146" cy="62" r="36" fill="url(#cloudVolumetricGrad)"/>
          <rect x="52" y="62" width="94" height="36" rx="18" fill="url(#cloudVolumetricGrad)"/>
        </g>
      </svg>
    `;
    return cloud;
  }

  // --- Summary Narrative Generator ---
  function generateSummaryNarrative(current, daily, wmoInfo) {
    const desc = wmoInfo.desc.toLowerCase();
    const highs = Math.round(daily.temperature_2m_max[0]);
    const lows = Math.round(daily.temperature_2m_min[0]);
    const rainMax = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;

    let narrative = `Generally ${desc}. Expected highs of ${highs}°C and lows near ${lows}°C.`;

    if (rainMax > 40) {
      narrative = `Chance of rain up to ${rainMax}%. Keep an umbrella handy with highs around ${highs}°C.`;
    } else if (wmoInfo.main === "Clear") {
      narrative = `Clear skies with great visibility. Expected high of ${highs}°C and low of ${lows}°C.`;
    }

    summaryText.textContent = narrative;
  }

  // --- Hourly Forecast Spline Curve Chart (True 1-Hour Resolution) ---
  function renderHourlySplineChart(hourly, currentTimeIso, utcOffsetSec, timezone) {
    if (!hourly || !hourly.time || hourly.time.length === 0) return;

    // Find starting hour index in hourly.time
    let startIndex = 0;
    const currentPrefix = currentTimeIso ? currentTimeIso.slice(0, 13) : "";
    const foundIdx = hourly.time.findIndex((t) => t.startsWith(currentPrefix));
    if (foundIdx >= 0) {
      startIndex = foundIdx;
    }

    // Extract next 10 consecutive hours (1-hour resolution)
    const hoursCount = 10;
    const sliceIndices = [];
    for (let i = 0; i < hoursCount && startIndex + i < hourly.time.length; i++) {
      sliceIndices.push(startIndex + i);
    }

    const temps = sliceIndices.map((i) => Math.round(hourly.temperature_2m[i]));
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempRange = Math.max(maxTemp - minTemp, 4);

    const colWidth = 82;
    const totalWidth = sliceIndices.length * colWidth;
    const graphHeight = 90;
    const graphTopPadding = 26;

    // Calculate curve points
    const points = sliceIndices.map((itemIdx, seqIdx) => {
      const x = seqIdx * colWidth + colWidth / 2;
      const normalized = (hourly.temperature_2m[itemIdx] - minTemp) / tempRange;
      const y = graphTopPadding + (1 - normalized) * (graphHeight - 40);
      return { x, y, temp: Math.round(hourly.temperature_2m[itemIdx]) };
    });

    const svgPath = createSmoothSplinePath(points);

    let html = `<div class="hourly-columns-grid" style="min-width: ${totalWidth}px;">`;

    sliceIndices.forEach((itemIdx, seqIdx) => {
      const timeIso = hourly.time[itemIdx];
      const hourStr = seqIdx === 0 ? "Now" : formatIsoHour(timeIso);
      const code = hourly.weather_code[itemIdx];
      const wmo = WMO_WEATHER_MAP[code] || { iconDay: "01d", iconNight: "01n", desc: "Clear" };
      const hourVal = parseInt(timeIso.split("T")[1].split(":")[0], 10);
      const isDayHour = hourVal >= 6 && hourVal < 20;
      const iconCode = isDayHour ? wmo.iconDay : wmo.iconNight;
      const popPercent = Math.round(hourly.precipitation_probability[itemIdx] || 0);
      const popDisplay = popPercent > 0 ? `☂ ${popPercent}%` : "";

      html += `
        <div class="hourly-col" style="width: ${colWidth}px;">
          <span class="hourly-time">${hourStr}</span>
          <div class="hourly-icon-box">
            <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${wmo.desc}"/>
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
  function renderSunCycleArc(daily, currentTimeIso, isDay, utcOffsetSec) {
    if (!daily || !daily.sunrise || !daily.sunset) return;

    const sunriseIso = daily.sunrise[0];
    const sunsetIso = daily.sunset[0];

    const sunriseStr = formatIsoTime(sunriseIso);
    const sunsetStr = formatIsoTime(sunsetIso);

    arcSunriseText.textContent = sunriseStr;
    arcSunsetText.textContent = sunsetStr;

    const sunriseMs = new Date(sunriseIso).getTime();
    const sunsetMs = new Date(sunsetIso).getTime();
    const nowMs = new Date(currentTimeIso).getTime();

    let progress = (nowMs - sunriseMs) / (sunsetMs - sunriseMs);
    progress = Math.max(0, Math.min(1, progress));

    const cx = 120 - 95 * Math.cos(progress * Math.PI);
    const cy = 105 - 95 * Math.sin(progress * Math.PI);

    sunGlowCircle.setAttribute("cx", cx);
    sunGlowCircle.setAttribute("cy", cy);

    if (isDay === 0) {
      if (nowMs < sunriseMs) {
        sunStatusTitle.textContent = "Night Sky";
        sunFooterText.textContent = `Sunrise will be at ${sunriseStr}`;
      } else {
        sunStatusTitle.textContent = "Evening Starlight";
        sunFooterText.textContent = `Sunset was at ${sunsetStr}`;
      }
      sunGlowCircle.setAttribute("fill", "#e0e7ff");
    } else {
      sunStatusTitle.textContent = "Rise and Shine";
      sunFooterText.textContent = `Sunset will be at ${sunsetStr}`;
      sunGlowCircle.setAttribute("fill", "#ffd700");
    }
  }

  // --- Insight Widget ---
  function renderInsightWidget(daily) {
    const todayMax = Math.round(daily.temperature_2m_max[0]);
    const tomorrowMax = Math.round(daily.temperature_2m_max[1]);
    const tomorrowMin = Math.round(daily.temperature_2m_min[1]);
    const tomorrowRain = daily.precipitation_probability_max ? Math.round(daily.precipitation_probability_max[1] || 0) : 0;
    const tomorrowCode = daily.weather_code[1] || 0;
    const tomorrowWmo = WMO_WEATHER_MAP[tomorrowCode] || { desc: "Clear Sky" };

    const diff = tomorrowMax - todayMax;

    insightTitle.textContent = "Tomorrow's Temperature";

    if (diff > 0) {
      insightDesc.textContent = `Temperatures will be around ${Math.abs(diff)}° higher than today with highs reaching ${tomorrowMax}°C.`;
      if (insightBadge) insightBadge.textContent = `+${Math.abs(diff)}° Warmer`;
    } else if (diff < 0) {
      insightDesc.textContent = `Temperatures will be a little lower than today (${Math.abs(diff)}° cooler, high of ${tomorrowMax}°C).`;
      if (insightBadge) insightBadge.textContent = `-${Math.abs(diff)}° Cooler`;
    } else {
      insightDesc.textContent = `Expect similar temperatures to today with a high near ${tomorrowMax}°C.`;
      if (insightBadge) insightBadge.textContent = `Steady Temp`;
    }

    if (insightRangeVal) insightRangeVal.textContent = `${tomorrowMax}° / ${tomorrowMin}°`;
    if (insightRainVal) insightRainVal.textContent = `☂ ${tomorrowRain}%`;
    if (insightOutlookVal) insightOutlookVal.textContent = tomorrowWmo.desc;
  }

  // --- Detailed Metrics Grid ---
  function renderMetricCards(current, hourly) {
    // Humidity
    humidityDisplay.textContent = `${current.relative_humidity_2m}%`;
    humidityBar.style.width = `${current.relative_humidity_2m}%`;
    if (current.relative_humidity_2m < 40) humidityStatus.textContent = "Dry air";
    else if (current.relative_humidity_2m <= 70) humidityStatus.textContent = "Comfortable level";
    else humidityStatus.textContent = "High humidity";

    // Wind
    windSpeedDisplay.textContent = `${(current.wind_speed_10m / 3.6).toFixed(1)} m/s`;
    windDirection.textContent = getWindDirectionText(current.wind_direction_10m);
    const speedMs = current.wind_speed_10m / 3.6;
    if (speedMs < 3) windCaption.textContent = "Light air";
    else if (speedMs < 8) windCaption.textContent = "Gentle breeze";
    else windCaption.textContent = "Strong breeze";

    // Pressure
    pressureDisplay.textContent = `${Math.round(current.surface_pressure)} hPa`;

    // Visibility
    const visMeters = hourly && hourly.visibility ? hourly.visibility[0] : 10000;
    const visKm = (visMeters / 1000).toFixed(1);
    visibilityDisplay.textContent = `${visKm} km`;
    if (visMeters >= 9000) visibilityStatus.textContent = "Clear visibility";
    else if (visMeters >= 4000) visibilityStatus.textContent = "Moderate haze";
    else visibilityStatus.textContent = "Low visibility";
  }

  function getWindDirectionText(deg) {
    if (deg === undefined || deg === null) return "Calm";
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return `${dirs[Math.round(deg / 45) % 8]} direction`;
  }

  // --- Utilities & Date Formats ---
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

  function formatCurrentLocalTime(utcOffsetSec, timezone) {
    try {
      if (timezone && timezone !== "auto") {
        return new Date().toLocaleDateString("en-US", {
          timeZone: timezone,
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    } catch {}

    const nowUtc = Date.now() + new Date().getTimezoneOffset() * 60000;
    const cityTime = new Date(nowUtc + (utcOffsetSec || 0) * 1000);
    return cityTime.toLocaleDateString([], {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatIsoHour(isoString) {
    if (!isoString) return "--";
    const parts = isoString.split("T");
    if (parts.length < 2) return isoString;
    const hour = parseInt(parts[1].split(":")[0], 10);
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12} ${ampm}`;
  }

  function formatIsoTime(isoString) {
    if (!isoString) return "--";
    const parts = isoString.split("T");
    if (parts.length < 2) return isoString;
    const timeParts = parts[1].split(":");
    const hour = parseInt(timeParts[0], 10);
    const min = timeParts[1];
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    const paddedHour = hour12 < 10 ? `0${hour12}` : hour12;
    return `${paddedHour}:${min} ${ampm}`;
  }
});
