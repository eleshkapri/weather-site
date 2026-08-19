document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const cityInput = document.getElementById("city-input");
  const clearInputBtn = document.getElementById("clear-input-btn");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const searchDropdown = document.getElementById("search-dropdown");
  const weatherContent = document.getElementById("weather-content");
  const errorMessage = document.getElementById("error-message");
  const errorText = document.getElementById("error-text");
  const loadingSpinner = document.getElementById("loading-spinner");

  // Hero Displays
  const cityNameDisplay = document.getElementById("city-name");
  const heroTempDisplay = document.getElementById("hero-temp");
  const heroConditionDisplay = document.getElementById("hero-condition");
  const heroTempMaxDisplay = document.getElementById("hero-temp-max");
  const heroTempMinDisplay = document.getElementById("hero-temp-min");
  const heroFeelsLikeDisplay = document.getElementById("hero-feels-like");
  const heroTimeDisplay = document.getElementById("hero-time");
  const weatherSummaryText = document.getElementById("weather-summary-text");

  // Forecast & Widgets
  const hourlyTrack = document.getElementById("hourly-track");
  const tempCurveSvg = document.getElementById("temp-curve-svg");
  const dailyForecastList = document.getElementById("daily-forecast-list");
  const particlesLayer = document.getElementById("particles-layer");

  // Sun Arc Widget
  const sunStatusText = document.getElementById("sun-status-text");
  const arcSunriseTime = document.getElementById("arc-sunrise-time");
  const arcSunsetTime = document.getElementById("arc-sunset-time");
  const sunProgressPath = document.getElementById("sun-progress-path");
  const sunIndicator = document.getElementById("sun-indicator");
  const sunIndicatorGlow = document.getElementById("sun-indicator-glow");

  // Metric Details
  const metricWind = document.getElementById("metric-wind");
  const metricWindDir = document.getElementById("metric-wind-dir");
  const metricHumidity = document.getElementById("metric-humidity");
  const metricDewPoint = document.getElementById("metric-dew-point");
  const metricPressure = document.getElementById("metric-pressure");
  const metricVisibility = document.getElementById("metric-visibility");
  const metricVisQuality = document.getElementById("metric-vis-quality");

  // API Key & Storage Constants
  const API_KEY = "5deead9ad15ea47dc8fff790537c8568";
  const HISTORY_STORAGE_KEY = "oneui_recent_searches";
  const MAX_HISTORY_ITEMS = 6;

  // State
  let debounceTimeout = null;
  let currentAbortController = null;
  let activeDropdownIndex = -1;
  let currentSuggestions = [];
  let cachedWeatherData = null;

  // Default initial city
  handleSearch("London");

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

  // Close dropdown on click outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      closeDropdown();
    }
  });

  // Window resize handler for curve recalculation
  window.addEventListener("resize", () => {
    if (cachedWeatherData) {
      const { forecast, timezone, currentTemp, currentIcon } = cachedWeatherData;
      renderHourlyForecast(forecast, timezone, currentTemp, currentIcon);
    }
  });

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

  // --- Suggestions API ---
  async function fetchCitySuggestions(query) {
    if (currentAbortController) currentAbortController.abort();
    currentAbortController = new AbortController();

    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
      const response = await fetch(url, { signal: currentAbortController.signal });
      if (!response.ok) return;

      const data = await response.json();
      currentSuggestions = data;
      renderSuggestionsDropdown(data, query);
    } catch (err) {
      if (err.name !== "AbortError") console.error("Autocomplete error:", err);
    }
  }

  function renderSuggestionsDropdown(suggestions, query) {
    if (!suggestions || suggestions.length === 0) {
      searchDropdown.innerHTML = `
        <div class="dropdown-empty-state">No matching cities found for "<strong>${escapeHtml(query)}</strong>"</div>
      `;
      searchDropdown.classList.remove("hidden");
      return;
    }

    activeDropdownIndex = -1;
    let html = `
      <div class="dropdown-header">
        <span class="dropdown-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
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
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
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

  // --- Search History ---
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
      if (history.length > MAX_HISTORY_ITEMS) history = history.slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("Storage error:", e);
    }
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
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
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
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <div class="dropdown-text-group">
              <span class="dropdown-primary-text">${escapeHtml(item.name)}</span>
              <span class="dropdown-secondary-text">${escapeHtml(locationSub)}</span>
            </div>
          </div>
          <button class="delete-item-btn" title="Remove" data-delete-index="${index}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
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
        localStorage.removeItem(HISTORY_STORAGE_KEY);
        closeDropdown();
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
        let h = getSearchHistory();
        h.splice(deleteIndex, 1);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(h));
        renderHistoryDropdown();
      });
    });
  }

  // --- Main Search Logic ---
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
    hideError();

    try {
      // Fetch current weather and 5-day forecast concurrently
      const [currentWeather, forecastData] = await Promise.all([
        fetchCurrentWeather(lat, lon),
        fetchForecastData(lat, lon)
      ]);

      renderOneUIWeather(currentWeather, forecastData, locationData);
      saveSearchToHistory(locationData);
    } catch (error) {
      console.error(error);
      showError(error.message);
    } finally {
      hideLoading();
    }
  }

  // --- API Fetches ---
  async function fetchCoordinates(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Location lookup failed.");

    const data = await response.json();
    if (!data || data.length === 0) {
      throw new Error(`No weather location found for "${city}".`);
    }

    const searchLower = city.toLowerCase();
    const exactMatch = data.find((item) => item.name.toLowerCase() === searchLower);
    if (exactMatch) return exactMatch;

    const startsWithMatch = data.find((item) => item.name.toLowerCase().startsWith(searchLower));
    if (startsWithMatch) return startsWithMatch;

    return data[0];
  }

  async function fetchCurrentWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch current weather.");
    return await response.json();
  }

  async function fetchForecastData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch forecast details.");
    return await response.json();
  }

  // --- Render Samsung One UI 9 Weather ---
  function renderOneUIWeather(current, forecast, location) {
    const { main, weather, wind, sys, visibility, timezone, dt } = current;
    const condition = weather[0].main;
    const conditionDesc = weather[0].description;
    const isNight = isNightTime(dt, sys.sunrise, sys.sunset);

    // Cache state for resize events
    cachedWeatherData = {
      forecast,
      timezone,
      currentTemp: main.temp,
      currentIcon: weather[0].icon,
    };

    // 1. Theme & Scene Atmosphere
    updateThemeAtmosphere(condition, isNight);

    // 2. Hero Weather Header
    cityNameDisplay.textContent = location.name;
    heroTempDisplay.textContent = Math.round(main.temp);
    heroConditionDisplay.textContent = formatConditionTitle(conditionDesc);

    const maxTemp = Math.round(main.temp_max);
    const minTemp = Math.round(main.temp_min);
    heroTempMaxDisplay.textContent = `${maxTemp}°`;
    heroTempMinDisplay.textContent = `${minTemp}°`;
    heroFeelsLikeDisplay.textContent = `${Math.round(main.feels_like)}°`;
    heroTimeDisplay.textContent = formatHeroDate(timezone);

    // Summary Text Pill
    weatherSummaryText.textContent = `Generally ${conditionDesc.toLowerCase()}. Highs ${maxTemp - 1} to ${maxTemp + 1}°C and lows ${minTemp - 1} to ${minTemp + 1}°C.`;

    // 3. Hourly Forecast with Dynamic SVG Temperature Curve
    renderHourlyForecast(forecast, timezone, main.temp, weather[0].icon);

    // 4. Rise & Shine (Sun Arc Widget)
    renderSunArcWidget(dt, sys.sunrise, sys.sunset, timezone);

    // 5. 5-Day Daily Forecast List
    renderDailyForecast(forecast, timezone);

    // 6. Metric Cards
    metricWind.textContent = `${wind.speed} m/s`;
    metricWindDir.textContent = getWindDescription(wind.speed);

    metricHumidity.textContent = `${main.humidity}%`;
    const dewPoint = Math.round(main.temp - (100 - main.humidity) / 5);
    metricDewPoint.textContent = `Dew point: ${dewPoint}°`;

    metricPressure.textContent = `${main.pressure} hPa`;
    metricVisibility.textContent = visibility ? `${(visibility / 1000).toFixed(1)} km` : "--";
    metricVisQuality.textContent = visibility >= 10000 ? "Clear View" : "Hazy View";
  }

  // --- Atmospheric Theme & Scene Controller ---
  function updateThemeAtmosphere(condition, isNight) {
    document.body.className = "";
    particlesLayer.innerHTML = "";

    if (condition === "Rain" || condition === "Drizzle" || condition === "Thunderstorm") {
      document.body.classList.add("theme-rain");
      createRainParticles();
    } else if (condition === "Snow") {
      document.body.classList.add("theme-night");
      createSnowParticles();
    } else if (isNight) {
      document.body.classList.add("theme-night");
    } else {
      document.body.classList.add("theme-day");
    }
  }

  function createRainParticles() {
    const count = 24;
    for (let i = 0; i < count; i++) {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.5 + Math.random() * 0.4}s`;
      drop.style.animationDelay = `${Math.random() * 0.8}s`;
      particlesLayer.appendChild(drop);
    }
  }

  function createSnowParticles() {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const flake = document.createElement("div");
      flake.className = "snow-flake";
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.animationDuration = `${2 + Math.random() * 2}s`;
      flake.style.animationDelay = `${Math.random() * 2}s`;
      particlesLayer.appendChild(flake);
    }
  }

  // --- Hourly Forecast & SVG Continuous Curve Graph ---
  function renderHourlyForecast(forecast, timezoneOffset, currentTemp, currentIcon) {
    hourlyTrack.innerHTML = "";
    tempCurveSvg.innerHTML = "";

    const list = forecast.list.slice(0, 8);
    const hourlyData = [
      {
        time: "Now",
        temp: Math.round(currentTemp),
        icon: currentIcon,
        pop: 0,
      },
      ...list.map((item) => ({
        time: formatHourlyTime(item.dt, timezoneOffset),
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        pop: item.pop || 0,
      })),
    ];

    // Determine layout width based on viewport
    const isWidescreen = window.innerWidth >= 992;
    const itemWidth = isWidescreen ? 68 : 70;
    const totalWidth = isWidescreen ? hourlyTrack.clientWidth || 560 : hourlyData.length * itemWidth;

    hourlyTrack.style.minWidth = isWidescreen ? "100%" : `${hourlyData.length * itemWidth}px`;
    tempCurveSvg.setAttribute("width", "100%");
    tempCurveSvg.setAttribute("viewBox", `0 0 ${totalWidth} 60`);

    // Min and Max temperatures for normalizing curve
    const temps = hourlyData.map((d) => d.temp);
    const minT = Math.min(...temps);
    const maxT = Math.max(...temps);
    const rangeT = maxT - minT || 1;

    const columnElements = [];

    // Render column elements
    hourlyData.forEach((item) => {
      const col = document.createElement("div");
      col.className = "hourly-item";

      const popText = item.pop > 0.05 ? `☔ ${Math.round(item.pop * 100)}%` : "";

      col.innerHTML = `
        <span class="hourly-time">${item.time}</span>
        <div class="hourly-icon-wrapper">
          <img src="https://openweathermap.org/img/wn/${item.icon}@2x.png" alt="icon" />
        </div>
        <span class="hourly-rain-pop">${popText}</span>
        <span class="hourly-temp-val">${item.temp}°</span>
      `;
      hourlyTrack.appendChild(col);
      columnElements.push({ col, temp: item.temp });
    });

    // Calculate curve points matching rendered columns
    requestAnimationFrame(() => {
      const trackRect = hourlyTrack.getBoundingClientRect();
      const points = [];

      columnElements.forEach((item, index) => {
        const colRect = item.col.getBoundingClientRect();
        const x = (colRect.left - trackRect.left) + colRect.width / 2;
        const normalizedY = 48 - ((item.temp - minT) / rangeT) * 36;
        points.push({ x: isNaN(x) || x === 0 ? index * itemWidth + itemWidth / 2 : x, y: normalizedY, temp: item.temp });
      });

      if (points.length < 2) return;

      // Draw Smooth Spline / Cubic Bézier Path
      let pathD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cp1x = p0.x + (p1.x - p0.x) / 2;
        const cp1y = p0.y;
        const cp2x = p0.x + (p1.x - p0.x) / 2;
        const cp2y = p1.y;
        pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
      }

      tempCurveSvg.innerHTML = "";

      // Path Line
      const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEl.setAttribute("d", pathD);
      pathEl.setAttribute("fill", "none");
      pathEl.setAttribute("stroke", "rgba(255, 255, 255, 0.75)");
      pathEl.setAttribute("stroke-width", "2");
      pathEl.setAttribute("stroke-linecap", "round");
      tempCurveSvg.appendChild(pathEl);

      // Glowing Markers at each data point
      points.forEach((p) => {
        const outerGlow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        outerGlow.setAttribute("cx", p.x);
        outerGlow.setAttribute("cy", p.y);
        outerGlow.setAttribute("r", "6");
        outerGlow.setAttribute("fill", "rgba(255, 255, 255, 0.25)");
        tempCurveSvg.appendChild(outerGlow);

        const circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleEl.setAttribute("cx", p.x);
        circleEl.setAttribute("cy", p.y);
        circleEl.setAttribute("r", "3.5");
        circleEl.setAttribute("fill", "#ffffff");
        circleEl.setAttribute("stroke", "#38bdf8");
        circleEl.setAttribute("stroke-width", "1.5");
        tempCurveSvg.appendChild(circleEl);
      });
    });
  }

  // --- Sun Cycle Arc Widget ("Rise and Shine") ---
  function renderSunArcWidget(currentDt, sunriseDt, sunsetDt, timezoneOffset) {
    const sunriseStr = formatTimestampOnly(sunriseDt, timezoneOffset);
    const sunsetStr = formatTimestampOnly(sunsetDt, timezoneOffset);

    arcSunriseTime.textContent = sunriseStr;
    arcSunsetTime.textContent = sunsetStr;

    const totalDaylight = sunsetDt - sunriseDt;
    let progress = 0;

    if (currentDt < sunriseDt) {
      progress = 0;
      sunStatusText.textContent = `Sunrise will be at ${sunriseStr}`;
    } else if (currentDt >= sunsetDt) {
      progress = 1;
      sunStatusText.textContent = `Sunset was at ${sunsetStr}`;
    } else {
      progress = (currentDt - sunriseDt) / totalDaylight;
      sunStatusText.textContent = `Sunset will be at ${sunsetStr}`;
    }

    progress = Math.max(0, Math.min(1, progress));

    const angle = Math.PI * (1 - progress);
    const cx = 150 - 120 * Math.cos(angle);
    const cy = 120 - 100 * Math.sin(angle);

    sunIndicator.setAttribute("cx", cx);
    sunIndicator.setAttribute("cy", cy);
    sunIndicatorGlow.setAttribute("cx", cx);
    sunIndicatorGlow.setAttribute("cy", cy);

    if (progress <= 0.01) {
      sunProgressPath.setAttribute("d", `M 30 120 A 120 100 0 0 1 31 119`);
    } else {
      sunProgressPath.setAttribute("d", `M 30 120 A 120 100 0 0 1 ${cx} ${cy}`);
    }
  }

  // --- 5-Day Daily Forecast List ---
  function renderDailyForecast(forecast, timezoneOffset) {
    dailyForecastList.innerHTML = "";

    const dailyMap = {};
    forecast.list.forEach((item) => {
      const dateKey = getDayDateKey(item.dt, timezoneOffset);
      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = {
          temps: [],
          icons: [],
          descriptions: [],
          dt: item.dt,
        };
      }
      dailyMap[dateKey].temps.push(item.main.temp);
      dailyMap[dateKey].icons.push(item.weather[0].icon);
      dailyMap[dateKey].descriptions.push(item.weather[0].main);
    });

    const days = Object.values(dailyMap).slice(0, 5);

    let allTemps = [];
    days.forEach((d) => (allTemps = allTemps.concat(d.temps)));
    const globalMin = Math.min(...allTemps);
    const globalMax = Math.max(...allTemps);
    const totalRange = globalMax - globalMin || 1;

    days.forEach((day, idx) => {
      const min = Math.round(Math.min(...day.temps));
      const max = Math.round(Math.max(...day.temps));
      const dominantIcon = day.icons[Math.floor(day.icons.length / 2)] || day.icons[0];
      const dayName = idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : formatDayOfWeek(day.dt, timezoneOffset);

      const leftPercent = Math.max(0, ((min - globalMin) / totalRange) * 100);
      const widthPercent = Math.max(15, ((max - min) / totalRange) * 100);

      const row = document.createElement("div");
      row.className = "daily-row";
      row.innerHTML = `
        <span class="daily-day-col">${dayName}</span>
        <div class="daily-icon-col">
          <img src="https://openweathermap.org/img/wn/${dominantIcon}.png" alt="daily-icon" />
        </div>
        <div class="daily-bar-container">
          <span class="daily-temp-min">${min}°</span>
          <div class="daily-bar-bg">
            <div class="daily-bar-fill" style="left: ${leftPercent}%; width: ${widthPercent}%;"></div>
          </div>
          <span class="daily-temp-max">${max}°</span>
        </div>
      `;
      dailyForecastList.appendChild(row);
    });
  }

  // --- Date & String Formatters ---
  function isNightTime(dt, sunrise, sunset) {
    return dt < sunrise || dt > sunset;
  }

  function formatConditionTitle(str) {
    if (!str) return "";
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function formatHeroDate(timezoneOffsetSeconds) {
    const nowUtc = Date.now() + new Date().getTimezoneOffset() * 60000;
    const cityDate = new Date(nowUtc + timezoneOffsetSeconds * 1000);
    return cityDate.toLocaleDateString("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  function formatHourlyTime(timestamp, timezoneOffsetSeconds) {
    const dateUtc = timestamp * 1000;
    const offsetMs = (new Date().getTimezoneOffset() * 60 + timezoneOffsetSeconds) * 1000;
    const cityDate = new Date(dateUtc + offsetMs);
    return cityDate.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
  }

  function formatTimestampOnly(timestamp, timezoneOffsetSeconds) {
    const dateUtc = timestamp * 1000;
    const offsetMs = (new Date().getTimezoneOffset() * 60 + timezoneOffsetSeconds) * 1000;
    const cityDate = new Date(dateUtc + offsetMs);
    return cityDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  function getDayDateKey(timestamp, timezoneOffsetSeconds) {
    const dateUtc = timestamp * 1000;
    const offsetMs = (new Date().getTimezoneOffset() * 60 + timezoneOffsetSeconds) * 1000;
    const cityDate = new Date(dateUtc + offsetMs);
    return `${cityDate.getFullYear()}-${cityDate.getMonth()}-${cityDate.getDate()}`;
  }

  function formatDayOfWeek(timestamp, timezoneOffsetSeconds) {
    const dateUtc = timestamp * 1000;
    const offsetMs = (new Date().getTimezoneOffset() * 60 + timezoneOffsetSeconds) * 1000;
    const cityDate = new Date(dateUtc + offsetMs);
    return cityDate.toLocaleDateString("en-US", { weekday: "short" });
  }

  function getWindDescription(speed) {
    if (speed < 1.5) return "Calm";
    if (speed < 3.3) return "Light Air";
    if (speed < 5.5) return "Light Breeze";
    if (speed < 8.0) return "Gentle Breeze";
    if (speed < 10.8) return "Moderate Breeze";
    return "Fresh Breeze";
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

  function showError(msg) {
    errorText.textContent = msg;
    errorMessage.classList.remove("hidden");
  }

  function hideError() {
    errorMessage.classList.add("hidden");
  }

  function showLoading() {
    loadingSpinner.classList.remove("hidden");
  }

  function hideLoading() {
    loadingSpinner.classList.add("hidden");
  }
});

