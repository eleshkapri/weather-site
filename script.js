document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const cityInput = document.getElementById("city-input");
  const clearInputBtn = document.getElementById("clear-input-btn");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const searchDropdown = document.getElementById("search-dropdown");
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");
  const errorText = document.getElementById("error-text");
  const loadingSpinner = document.getElementById("loading-spinner");
  const bgContainer = document.getElementById("bg-container");

  // Weather Data Displays
  const cityNameDisplay = document.getElementById("city-name");
  const localTimeDisplay = document.getElementById("local-time");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const tempMaxDisplay = document.getElementById("temp-max");
  const tempMinDisplay = document.getElementById("temp-min");
  const weatherIcon = document.getElementById("weather-icon");
  const feelsLikeDisplay = document.getElementById("feels-like");
  const humidityDisplay = document.getElementById("humidity");
  const windSpeedDisplay = document.getElementById("wind-speed");
  const pressureDisplay = document.getElementById("pressure");
  const visibilityDisplay = document.getElementById("visibility");
  const sunriseTimeDisplay = document.getElementById("sunrise-time");
  const sunsetTimeDisplay = document.getElementById("sunset-time");

  // API Key & Storage Constants
  const API_KEY = "5deead9ad15ea47dc8fff790537c8568";
  const HISTORY_STORAGE_KEY = "atmosphere_recent_searches";
  const MAX_HISTORY_ITEMS = 6;

  // State
  let debounceTimeout = null;
  let currentAbortController = null;
  let activeDropdownIndex = -1;
  let currentSuggestions = [];
  let dropdownMode = "none"; // 'history' | 'suggestions' | 'none'

  // Initialize
  updateBackground("Default");

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

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box-wrapper")) {
      closeDropdown();
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
    dropdownMode = "none";
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
      dropdownMode = "suggestions";
      activeDropdownIndex = -1;
      return;
    }

    dropdownMode = "suggestions";
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

    // Attach click events
    searchDropdown.querySelectorAll(".dropdown-item").forEach((el) => {
      el.addEventListener("click", () => {
        const index = parseInt(el.getAttribute("data-index"), 10);
        const selected = currentSuggestions[index];
        if (selected) {
          const displayStr = selected.state
            ? `${selected.name}, ${selected.state}, ${selected.country}`
            : `${selected.name}, ${selected.country}`;
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
      // Remove duplicate if already in history
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

    dropdownMode = "history";
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

    // Clear all click
    const clearAllBtn = document.getElementById("clear-all-history-btn");
    if (clearAllBtn) {
      clearAllBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        clearAllHistory();
      });
    }

    // Individual item click
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

    // Delete single item click
    searchDropdown.querySelectorAll(".delete-item-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const deleteIndex = parseInt(btn.getAttribute("data-delete-index"), 10);
        removeHistoryItem(deleteIndex);
      });
    });
  }

  // --- Main Search Logic ---
  async function handleSearch(cityName) {
    if (!cityName) return;

    resetUI();

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
    resetUI();
    showLoading();

    try {
      const weatherData = await fetchWeatherByCoords(lat, lon);
      displayWeatherData(weatherData, locationData);
      saveSearchToHistory(locationData);
    } catch (error) {
      console.error(error);
      showError(error.message);
    } finally {
      hideLoading();
    }
  }

  // --- API Fetch Helpers ---
  async function fetchCoordinates(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Failed to fetch location data.");

    const data = await response.json();
    if (!data || data.length === 0) {
      throw new Error(`No weather data found for "${city}". Please check the spelling.`);
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

  // --- UI Update & Display ---
  function resetUI() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.add("hidden");
    errorText.textContent = "";

    cityNameDisplay.textContent = "--";
    localTimeDisplay.textContent = "--";
    temperatureDisplay.textContent = "--";
    descriptionDisplay.textContent = "--";
    tempMaxDisplay.textContent = "--°";
    tempMinDisplay.textContent = "--°";
    feelsLikeDisplay.textContent = "--°C";
    humidityDisplay.textContent = "--%";
    windSpeedDisplay.textContent = "-- m/s";
    pressureDisplay.textContent = "-- hPa";
    visibilityDisplay.textContent = "-- km";
    sunriseTimeDisplay.textContent = "🌅 --";
    sunsetTimeDisplay.textContent = "🌇 --";
    weatherIcon.src = "";
  }

  function displayWeatherData(weatherData, locationData) {
    const { main, weather, wind, sys, visibility, timezone } = weatherData;
    const { name, state, country } = locationData;

    // Location formatted string
    const locationString = state ? `${name}, ${state}, ${country}` : `${name}, ${country}`;
    cityNameDisplay.textContent = locationString;

    // Format local time & sun cycle using city's timezone offset
    const localTimeString = formatLocalTime(timezone);
    localTimeDisplay.textContent = localTimeString;

    if (sys && sys.sunrise && sys.sunset) {
      sunriseTimeDisplay.textContent = `🌅 ${formatTimestampWithOffset(sys.sunrise, timezone)}`;
      sunsetTimeDisplay.textContent = `🌇 ${formatTimestampWithOffset(sys.sunset, timezone)}`;
    }

    // Temperature & Conditions
    temperatureDisplay.textContent = Math.round(main.temp);
    descriptionDisplay.textContent = weather[0].description;
    tempMaxDisplay.textContent = `${Math.round(main.temp_max)}°`;
    tempMinDisplay.textContent = `${Math.round(main.temp_min)}°`;

    // Metrics
    feelsLikeDisplay.textContent = `${Math.round(main.feels_like)}°C`;
    humidityDisplay.textContent = `${main.humidity}%`;
    windSpeedDisplay.textContent = `${wind.speed} m/s`;
    pressureDisplay.textContent = `${main.pressure} hPa`;

    const visKm = visibility ? (visibility / 1000).toFixed(1) : "--";
    visibilityDisplay.textContent = `${visKm} km`;

    // High quality weather icon
    const iconCode = weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = weather[0].description;

    // Dynamic background transition
    updateBackground(weather[0].main);

    // Reveal weather card
    weatherInfo.classList.remove("hidden");
  }

  function updateBackground(condition) {
    let imageUrl = "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2000&auto=format&fit=crop";

    switch (condition) {
      case "Clear":
        imageUrl = "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2000&auto=format&fit=crop";
        break;
      case "Clouds":
        imageUrl = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000&auto=format&fit=crop";
        break;
      case "Rain":
      case "Drizzle":
        imageUrl = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2000&auto=format&fit=crop";
        break;
      case "Thunderstorm":
        imageUrl = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2000&auto=format&fit=crop";
        break;
      case "Snow":
        imageUrl = "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?q=80&w=2000&auto=format&fit=crop";
        break;
      case "Mist":
      case "Fog":
      case "Haze":
      case "Smoke":
        imageUrl = "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2000&auto=format&fit=crop";
        break;
    }

    const newLayer = document.createElement("div");
    newLayer.classList.add("bg-layer");
    newLayer.style.backgroundImage = `url('${imageUrl}')`;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      bgContainer.appendChild(newLayer);
      void newLayer.offsetWidth;
      newLayer.classList.add("active");
      setTimeout(() => {
        const oldLayers = document.querySelectorAll(".bg-layer:not(:last-child)");
        oldLayers.forEach((layer) => layer.remove());
      }, 1200);
    };
  }

  function showError(message) {
    weatherInfo.classList.add("hidden");
    errorText.textContent = message;
    errorMessage.classList.remove("hidden");
  }

  function showLoading() {
    loadingSpinner.classList.remove("hidden");
  }

  function hideLoading() {
    loadingSpinner.classList.add("hidden");
  }

  // --- Utilities ---
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
    return cityTime.toLocaleTimeString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatTimestampWithOffset(timestamp, timezoneOffsetSeconds) {
    const dateUtc = timestamp * 1000;
    const offsetMs = (new Date().getTimezoneOffset() * 60 + timezoneOffsetSeconds) * 1000;
    const cityDate = new Date(dateUtc + offsetMs);
    return cityDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
});