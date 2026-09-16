document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const welcomeScreen = document.getElementById("welcome-screen") || document.getElementById("hero-section");
  const topNav = document.getElementById("top-nav") || document.getElementById("cinematic-nav");
  const brandHomeBtn = document.getElementById("brand-home-btn");
  const navSearchMount = document.getElementById("nav-search-mount");
  const welcomeSearchWrapper = document.querySelector(".welcome-search-wrapper");
  const searchBoxWrapper = document.querySelector(".search-box-wrapper");

  const cityInput = document.getElementById("city-input");
  const clearInputBtn = document.getElementById("clear-input-btn");
  const searchShortcutKbd = document.getElementById("search-shortcut-kbd") || document.querySelector(".search-shortcut-kbd");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const navGeoBtn = document.getElementById("nav-geo-btn");
  const heroGeoBtn = document.getElementById("hero-geo-btn");
  const searchDropdown = document.getElementById("search-dropdown");
  const errorMessage = document.getElementById("error-message");
  const errorText = document.getElementById("error-text");
  const loadingSpinner = document.getElementById("loading-spinner");
  const weatherDashboard = document.getElementById("weather-dashboard");

  // Dashboard & Modal Search Elements
  const dashboardCityInput = document.getElementById("dashboard-city-input");
  const dashboardSearchBtn = document.getElementById("dashboard-search-btn");
  const dashboardSearchDropdown = document.getElementById("dashboard-search-dropdown");
  const frameCityLabel = document.getElementById("frame-city-label");
  const navSearchTriggerBtn = document.getElementById("nav-search-trigger-btn");
  const searchModal = document.getElementById("search-modal");
  const modalSearchInput = document.getElementById("modal-search-input");
  const closeSearchModalBtn = document.getElementById("close-search-modal-btn");
  const modalSearchDropdown = document.getElementById("modal-search-dropdown");
  const modalCityPills = document.querySelectorAll(".modal-city-pill");

  // Hero Scenery Elements
  const ambientSkyCanvas = document.getElementById("ambient-sky-canvas");
  const skyElements = document.getElementById("sky-elements");
  const characterFigure = document.getElementById("character-figure");
  const charReactionBubble = document.getElementById("char-reaction-bubble");
  const sceneryFxParticles = document.getElementById("scenery-fx-particles");
  const cityNameDisplay = document.getElementById("city-name");
  const countryTag = document.getElementById("country-tag");
  const localTimeDisplay = document.getElementById("local-time") || document.getElementById("local-time-clock");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description") || document.getElementById("weather-description");
  const tempMaxDisplay = document.getElementById("temp-max");
  const tempMinDisplay = document.getElementById("temp-min");
  const dayHighLowDisplay = document.getElementById("day-high-low");
  const feelsLikeDisplay = document.getElementById("feels-like") || document.getElementById("apparent-temp");
  const heroHumidityDisplay = document.getElementById("hero-humidity");

  // Summary & Forecast
  const summaryText = document.getElementById("summary-text") || document.getElementById("ai-summary-text");
  const hourlyTimeline = document.getElementById("hourly-timeline") || document.getElementById("spline-chart-container");

  // Widgets
  const sunGlowCircle = document.getElementById("sun-glow-circle") || document.getElementById("sun-arc-orb");
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
  const pressureStatus = document.getElementById("pressure-status");
  const visibilityDisplay = document.getElementById("visibility");
  const visibilityStatus = document.getElementById("visibility-status");

  const uvIndexDisplay = document.getElementById("uv-index");
  const uvBar = document.getElementById("uv-bar");
  const uvStatus = document.getElementById("uv-status");

  const precipChanceDisplay = document.getElementById("precip-chance");
  const precipBar = document.getElementById("precip-bar");
  const precipStatus = document.getElementById("precip-status");

  function updateSearchActionButtons(hasText) {
    if (clearInputBtn) {
      if (hasText) clearInputBtn.classList.remove("hidden");
      else clearInputBtn.classList.add("hidden");
    }
    if (searchShortcutKbd) {
      if (hasText) searchShortcutKbd.classList.add("hidden");
      else searchShortcutKbd.classList.remove("hidden");
    }
  }

  // Storage & API Configuration Constants
  const HISTORY_STORAGE_KEY = "atmosphere_recent_searches";
  const COORDS_CACHE_KEY = "atmosphere_coords_cache";
  const MAX_HISTORY_ITEMS = 6;

  function getApiKey() {
    try {
      if (window.CONFIG && typeof window.CONFIG.OPENWEATHER_API_KEY === "string" && window.CONFIG.OPENWEATHER_API_KEY.trim()) {
        return window.CONFIG.OPENWEATHER_API_KEY.trim();
      }
      const localKey = localStorage.getItem("atmosphere_api_key");
      if (localKey && localKey.trim()) {
        return localKey.trim();
      }
    } catch {}
    return "";
  }

  // Safe developer / browser utility to set or inspect API key in localStorage
  window.AtmosphereConfig = {
    getKey: getApiKey,
    setKey: (key) => {
      if (key) localStorage.setItem("atmosphere_api_key", key.trim());
      else localStorage.removeItem("atmosphere_api_key");
      console.log("[Atmosphere] Custom API key saved in browser localStorage.");
    },
    hasKey: () => Boolean(getApiKey())
  };

  // Ultra-Fast 0ms Offline Global Cities Geocoding Catalog (300+ Hubs & Regional Towns)
  const GLOBAL_CITY_CATALOG = [
  {
    "name": "Delhi",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.6139,
    "longitude": 77.209,
    "timezone": "Asia/Kolkata",
    "admin1": "Delhi"
  },
  {
    "name": "New Delhi",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.6139,
    "longitude": 77.209,
    "timezone": "Asia/Kolkata",
    "admin1": "Delhi"
  },
  {
    "name": "Mumbai",
    "country": "India",
    "country_code": "IN",
    "latitude": 19.076,
    "longitude": 72.8777,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Bengaluru",
    "country": "India",
    "country_code": "IN",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timezone": "Asia/Kolkata",
    "admin1": "Karnataka"
  },
  {
    "name": "Bangalore",
    "country": "India",
    "country_code": "IN",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timezone": "Asia/Kolkata",
    "admin1": "Karnataka"
  },
  {
    "name": "Hyderabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 17.385,
    "longitude": 78.4867,
    "timezone": "Asia/Kolkata",
    "admin1": "Telangana"
  },
  {
    "name": "Chennai",
    "country": "India",
    "country_code": "IN",
    "latitude": 13.0827,
    "longitude": 80.2707,
    "timezone": "Asia/Kolkata",
    "admin1": "Tamil Nadu"
  },
  {
    "name": "Kolkata",
    "country": "India",
    "country_code": "IN",
    "latitude": 22.5726,
    "longitude": 88.3639,
    "timezone": "Asia/Kolkata",
    "admin1": "West Bengal"
  },
  {
    "name": "Pune",
    "country": "India",
    "country_code": "IN",
    "latitude": 18.5204,
    "longitude": 73.8567,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Ahmedabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 23.0225,
    "longitude": 72.5714,
    "timezone": "Asia/Kolkata",
    "admin1": "Gujarat"
  },
  {
    "name": "Jaipur",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.9124,
    "longitude": 75.7873,
    "timezone": "Asia/Kolkata",
    "admin1": "Rajasthan"
  },
  {
    "name": "Surat",
    "country": "India",
    "country_code": "IN",
    "latitude": 21.1702,
    "longitude": 72.8311,
    "timezone": "Asia/Kolkata",
    "admin1": "Gujarat"
  },
  {
    "name": "Lucknow",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.8467,
    "longitude": 80.9462,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Kanpur",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.4499,
    "longitude": 80.3319,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Nagpur",
    "country": "India",
    "country_code": "IN",
    "latitude": 21.1458,
    "longitude": 79.0882,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Indore",
    "country": "India",
    "country_code": "IN",
    "latitude": 22.7196,
    "longitude": 75.8577,
    "timezone": "Asia/Kolkata",
    "admin1": "Madhya Pradesh"
  },
  {
    "name": "Thane",
    "country": "India",
    "country_code": "IN",
    "latitude": 19.2183,
    "longitude": 72.9781,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Bhopal",
    "country": "India",
    "country_code": "IN",
    "latitude": 23.2599,
    "longitude": 77.4126,
    "timezone": "Asia/Kolkata",
    "admin1": "Madhya Pradesh"
  },
  {
    "name": "Visakhapatnam",
    "country": "India",
    "country_code": "IN",
    "latitude": 17.6868,
    "longitude": 83.2185,
    "timezone": "Asia/Kolkata",
    "admin1": "Andhra Pradesh"
  },
  {
    "name": "Patna",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.5941,
    "longitude": 85.1376,
    "timezone": "Asia/Kolkata",
    "admin1": "Bihar"
  },
  {
    "name": "Vadodara",
    "country": "India",
    "country_code": "IN",
    "latitude": 22.3072,
    "longitude": 73.1812,
    "timezone": "Asia/Kolkata",
    "admin1": "Gujarat"
  },
  {
    "name": "Ghaziabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.6692,
    "longitude": 77.4538,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Ludhiana",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.901,
    "longitude": 75.8573,
    "timezone": "Asia/Kolkata",
    "admin1": "Punjab"
  },
  {
    "name": "Agra",
    "country": "India",
    "country_code": "IN",
    "latitude": 27.1767,
    "longitude": 78.0081,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Nashik",
    "country": "India",
    "country_code": "IN",
    "latitude": 19.9975,
    "longitude": 73.7898,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Faridabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.4089,
    "longitude": 77.3178,
    "timezone": "Asia/Kolkata",
    "admin1": "Haryana"
  },
  {
    "name": "Meerut",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.9845,
    "longitude": 77.7064,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Rajkot",
    "country": "India",
    "country_code": "IN",
    "latitude": 22.3039,
    "longitude": 70.8022,
    "timezone": "Asia/Kolkata",
    "admin1": "Gujarat"
  },
  {
    "name": "Varanasi",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.3176,
    "longitude": 82.9739,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Srinagar",
    "country": "India",
    "country_code": "IN",
    "latitude": 34.0837,
    "longitude": 74.7973,
    "timezone": "Asia/Kolkata",
    "admin1": "Jammu and Kashmir"
  },
  {
    "name": "Amritsar",
    "country": "India",
    "country_code": "IN",
    "latitude": 31.634,
    "longitude": 74.8723,
    "timezone": "Asia/Kolkata",
    "admin1": "Punjab"
  },
  {
    "name": "Prayagraj",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.4358,
    "longitude": 81.8463,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Allahabad",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.4358,
    "longitude": 81.8463,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Ranchi",
    "country": "India",
    "country_code": "IN",
    "latitude": 23.3441,
    "longitude": 85.3096,
    "timezone": "Asia/Kolkata",
    "admin1": "Jharkhand"
  },
  {
    "name": "Coimbatore",
    "country": "India",
    "country_code": "IN",
    "latitude": 11.0168,
    "longitude": 76.9558,
    "timezone": "Asia/Kolkata",
    "admin1": "Tamil Nadu"
  },
  {
    "name": "Jabalpur",
    "country": "India",
    "country_code": "IN",
    "latitude": 23.1815,
    "longitude": 79.9864,
    "timezone": "Asia/Kolkata",
    "admin1": "Madhya Pradesh"
  },
  {
    "name": "Gwalior",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.2183,
    "longitude": 78.1828,
    "timezone": "Asia/Kolkata",
    "admin1": "Madhya Pradesh"
  },
  {
    "name": "Vijayawada",
    "country": "India",
    "country_code": "IN",
    "latitude": 16.5062,
    "longitude": 80.648,
    "timezone": "Asia/Kolkata",
    "admin1": "Andhra Pradesh"
  },
  {
    "name": "Jodhpur",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.2389,
    "longitude": 73.0243,
    "timezone": "Asia/Kolkata",
    "admin1": "Rajasthan"
  },
  {
    "name": "Madurai",
    "country": "India",
    "country_code": "IN",
    "latitude": 9.9252,
    "longitude": 78.1198,
    "timezone": "Asia/Kolkata",
    "admin1": "Tamil Nadu"
  },
  {
    "name": "Raipur",
    "country": "India",
    "country_code": "IN",
    "latitude": 21.2514,
    "longitude": 81.6296,
    "timezone": "Asia/Kolkata",
    "admin1": "Chhattisgarh"
  },
  {
    "name": "Kota",
    "country": "India",
    "country_code": "IN",
    "latitude": 25.2138,
    "longitude": 75.8648,
    "timezone": "Asia/Kolkata",
    "admin1": "Rajasthan"
  },
  {
    "name": "Chandigarh",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.7333,
    "longitude": 76.7794,
    "timezone": "Asia/Kolkata",
    "admin1": "Punjab"
  },
  {
    "name": "Guwahati",
    "country": "India",
    "country_code": "IN",
    "latitude": 26.1445,
    "longitude": 91.7362,
    "timezone": "Asia/Kolkata",
    "admin1": "Assam"
  },
  {
    "name": "Solapur",
    "country": "India",
    "country_code": "IN",
    "latitude": 17.6599,
    "longitude": 75.9064,
    "timezone": "Asia/Kolkata",
    "admin1": "Maharashtra"
  },
  {
    "name": "Mysore",
    "country": "India",
    "country_code": "IN",
    "latitude": 12.2958,
    "longitude": 76.6394,
    "timezone": "Asia/Kolkata",
    "admin1": "Karnataka"
  },
  {
    "name": "Gurgaon",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.4595,
    "longitude": 77.0266,
    "timezone": "Asia/Kolkata",
    "admin1": "Haryana"
  },
  {
    "name": "Gurugram",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.4595,
    "longitude": 77.0266,
    "timezone": "Asia/Kolkata",
    "admin1": "Haryana"
  },
  {
    "name": "Noida",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.5355,
    "longitude": 77.391,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttar Pradesh"
  },
  {
    "name": "Bhubaneswar",
    "country": "India",
    "country_code": "IN",
    "latitude": 20.2961,
    "longitude": 85.8245,
    "timezone": "Asia/Kolkata",
    "admin1": "Odisha"
  },
  {
    "name": "Thiruvananthapuram",
    "country": "India",
    "country_code": "IN",
    "latitude": 8.5241,
    "longitude": 76.9366,
    "timezone": "Asia/Kolkata",
    "admin1": "Kerala"
  },
  {
    "name": "Kochi",
    "country": "India",
    "country_code": "IN",
    "latitude": 9.9312,
    "longitude": 76.2673,
    "timezone": "Asia/Kolkata",
    "admin1": "Kerala"
  },
  {
    "name": "Dehradun",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.3165,
    "longitude": 78.0322,
    "timezone": "Asia/Kolkata",
    "admin1": "Uttarakhand"
  },
  {
    "name": "Shimla",
    "country": "India",
    "country_code": "IN",
    "latitude": 31.1048,
    "longitude": 77.1734,
    "timezone": "Asia/Kolkata",
    "admin1": "Himachal Pradesh"
  },
  {
    "name": "Goa",
    "country": "India",
    "country_code": "IN",
    "latitude": 15.2993,
    "longitude": 74.124,
    "timezone": "Asia/Kolkata",
    "admin1": "Goa"
  },
  {
    "name": "Panaji",
    "country": "India",
    "country_code": "IN",
    "latitude": 15.4909,
    "longitude": 73.8278,
    "timezone": "Asia/Kolkata",
    "admin1": "Goa"
  },
  {
    "name": "Udaipur",
    "country": "India",
    "country_code": "IN",
    "latitude": 24.5854,
    "longitude": 73.7125,
    "timezone": "Asia/Kolkata",
    "admin1": "Rajasthan"
  },
  {
    "name": "Mangalore",
    "country": "India",
    "country_code": "IN",
    "latitude": 12.9141,
    "longitude": 74.856,
    "timezone": "Asia/Kolkata",
    "admin1": "Karnataka"
  },
  {
    "name": "Jammu",
    "country": "India",
    "country_code": "IN",
    "latitude": 32.7266,
    "longitude": 74.857,
    "timezone": "Asia/Kolkata",
    "admin1": "Jammu and Kashmir"
  },
  {
    "name": "London",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 51.5074,
    "longitude": -0.1278,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Manchester",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 53.4808,
    "longitude": -2.2426,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Birmingham",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 52.4862,
    "longitude": -1.8904,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Edinburgh",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 55.9533,
    "longitude": -3.1883,
    "timezone": "Europe/London",
    "admin1": "Scotland"
  },
  {
    "name": "Glasgow",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 55.8642,
    "longitude": -4.2518,
    "timezone": "Europe/London",
    "admin1": "Scotland"
  },
  {
    "name": "Liverpool",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 53.4084,
    "longitude": -2.9916,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Leeds",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 53.8008,
    "longitude": -1.5491,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Bristol",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 51.4545,
    "longitude": -2.5879,
    "timezone": "Europe/London",
    "admin1": "England"
  },
  {
    "name": "Cardiff",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 51.4816,
    "longitude": -3.1791,
    "timezone": "Europe/London",
    "admin1": "Wales"
  },
  {
    "name": "Belfast",
    "country": "United Kingdom",
    "country_code": "GB",
    "latitude": 54.5973,
    "longitude": -5.9301,
    "timezone": "Europe/London",
    "admin1": "Northern Ireland"
  },
  {
    "name": "Dublin",
    "country": "Ireland",
    "country_code": "IE",
    "latitude": 53.3498,
    "longitude": -6.2603,
    "timezone": "Europe/Dublin",
    "admin1": "Leinster"
  },
  {
    "name": "Cork",
    "country": "Ireland",
    "country_code": "IE",
    "latitude": 51.8985,
    "longitude": -8.4756,
    "timezone": "Europe/Dublin",
    "admin1": "Munster"
  },
  {
    "name": "Paris",
    "country": "France",
    "country_code": "FR",
    "latitude": 48.8566,
    "longitude": 2.3522,
    "timezone": "Europe/Paris",
    "admin1": "Île-de-France"
  },
  {
    "name": "Marseille",
    "country": "France",
    "country_code": "FR",
    "latitude": 43.2965,
    "longitude": 5.3698,
    "timezone": "Europe/Paris",
    "admin1": "Provence-Alpes-Côte d'Azur"
  },
  {
    "name": "Lyon",
    "country": "France",
    "country_code": "FR",
    "latitude": 45.764,
    "longitude": 4.8357,
    "timezone": "Europe/Paris",
    "admin1": "Auvergne-Rhône-Alpes"
  },
  {
    "name": "Nice",
    "country": "France",
    "country_code": "FR",
    "latitude": 43.7102,
    "longitude": 7.262,
    "timezone": "Europe/Paris",
    "admin1": "Provence-Alpes-Côte d'Azur"
  },
  {
    "name": "Berlin",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 52.52,
    "longitude": 13.405,
    "timezone": "Europe/Berlin",
    "admin1": "Land Berlin"
  },
  {
    "name": "Munich",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 48.1351,
    "longitude": 11.582,
    "timezone": "Europe/Berlin",
    "admin1": "Bavaria"
  },
  {
    "name": "Frankfurt",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 50.1109,
    "longitude": 8.6821,
    "timezone": "Europe/Berlin",
    "admin1": "Hesse"
  },
  {
    "name": "Hamburg",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 53.5511,
    "longitude": 9.9937,
    "timezone": "Europe/Berlin",
    "admin1": "Hamburg"
  },
  {
    "name": "Cologne",
    "country": "Germany",
    "country_code": "DE",
    "latitude": 50.9375,
    "longitude": 6.9603,
    "timezone": "Europe/Berlin",
    "admin1": "North Rhine-Westphalia"
  },
  {
    "name": "Amsterdam",
    "country": "Netherlands",
    "country_code": "NL",
    "latitude": 52.3676,
    "longitude": 4.9041,
    "timezone": "Europe/Amsterdam",
    "admin1": "North Holland"
  },
  {
    "name": "Rotterdam",
    "country": "Netherlands",
    "country_code": "NL",
    "latitude": 51.9244,
    "longitude": 4.4777,
    "timezone": "Europe/Amsterdam",
    "admin1": "South Holland"
  },
  {
    "name": "Brussels",
    "country": "Belgium",
    "country_code": "BE",
    "latitude": 50.8503,
    "longitude": 4.3517,
    "timezone": "Europe/Brussels",
    "admin1": "Brussels"
  },
  {
    "name": "Antwerp",
    "country": "Belgium",
    "country_code": "BE",
    "latitude": 51.2194,
    "longitude": 4.4025,
    "timezone": "Europe/Brussels",
    "admin1": "Flanders"
  },
  {
    "name": "Vienna",
    "country": "Austria",
    "country_code": "AT",
    "latitude": 48.2082,
    "longitude": 16.3738,
    "timezone": "Europe/Vienna",
    "admin1": "Vienna"
  },
  {
    "name": "Salzburg",
    "country": "Austria",
    "country_code": "AT",
    "latitude": 47.8095,
    "longitude": 13.055,
    "timezone": "Europe/Vienna",
    "admin1": "Salzburg"
  },
  {
    "name": "Zurich",
    "country": "Switzerland",
    "country_code": "CH",
    "latitude": 47.3769,
    "longitude": 8.5417,
    "timezone": "Europe/Zurich",
    "admin1": "Zurich"
  },
  {
    "name": "Geneva",
    "country": "Switzerland",
    "country_code": "CH",
    "latitude": 46.2044,
    "longitude": 6.1432,
    "timezone": "Europe/Zurich",
    "admin1": "Geneva"
  },
  {
    "name": "Bern",
    "country": "Switzerland",
    "country_code": "CH",
    "latitude": 46.948,
    "longitude": 7.4474,
    "timezone": "Europe/Zurich",
    "admin1": "Bern"
  },
  {
    "name": "Prague",
    "country": "Czech Republic",
    "country_code": "CZ",
    "latitude": 50.0755,
    "longitude": 14.4378,
    "timezone": "Europe/Prague",
    "admin1": "Prague"
  },
  {
    "name": "Warsaw",
    "country": "Poland",
    "country_code": "PL",
    "latitude": 52.2297,
    "longitude": 21.0122,
    "timezone": "Europe/Warsaw",
    "admin1": "Mazovia"
  },
  {
    "name": "Krakow",
    "country": "Poland",
    "country_code": "PL",
    "latitude": 50.0647,
    "longitude": 19.945,
    "timezone": "Europe/Warsaw",
    "admin1": "Lesser Poland"
  },
  {
    "name": "Budapest",
    "country": "Hungary",
    "country_code": "HU",
    "latitude": 47.4979,
    "longitude": 19.0402,
    "timezone": "Europe/Budapest",
    "admin1": "Budapest"
  },
  {
    "name": "Rome",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 41.9028,
    "longitude": 12.4964,
    "timezone": "Europe/Rome",
    "admin1": "Lazio"
  },
  {
    "name": "Milan",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 45.4642,
    "longitude": 9.19,
    "timezone": "Europe/Rome",
    "admin1": "Lombardy"
  },
  {
    "name": "Florence",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 43.7696,
    "longitude": 11.2558,
    "timezone": "Europe/Rome",
    "admin1": "Tuscany"
  },
  {
    "name": "Venice",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 45.4408,
    "longitude": 12.3155,
    "timezone": "Europe/Rome",
    "admin1": "Veneto"
  },
  {
    "name": "Naples",
    "country": "Italy",
    "country_code": "IT",
    "latitude": 40.8518,
    "longitude": 14.2681,
    "timezone": "Europe/Rome",
    "admin1": "Campania"
  },
  {
    "name": "Madrid",
    "country": "Spain",
    "country_code": "ES",
    "latitude": 40.4168,
    "longitude": -3.7038,
    "timezone": "Europe/Madrid",
    "admin1": "Madrid"
  },
  {
    "name": "Barcelona",
    "country": "Spain",
    "country_code": "ES",
    "latitude": 41.3879,
    "longitude": 2.1699,
    "timezone": "Europe/Madrid",
    "admin1": "Catalonia"
  },
  {
    "name": "Seville",
    "country": "Spain",
    "country_code": "ES",
    "latitude": 37.3891,
    "longitude": -5.9845,
    "timezone": "Europe/Madrid",
    "admin1": "Andalusia"
  },
  {
    "name": "Valencia",
    "country": "Spain",
    "country_code": "ES",
    "latitude": 39.4699,
    "longitude": -0.3763,
    "timezone": "Europe/Madrid",
    "admin1": "Valencia"
  },
  {
    "name": "Lisbon",
    "country": "Portugal",
    "country_code": "PT",
    "latitude": 38.7223,
    "longitude": -9.1393,
    "timezone": "Europe/Lisbon",
    "admin1": "Lisbon"
  },
  {
    "name": "Porto",
    "country": "Portugal",
    "country_code": "PT",
    "latitude": 41.1579,
    "longitude": -8.6291,
    "timezone": "Europe/Lisbon",
    "admin1": "Porto"
  },
  {
    "name": "Athens",
    "country": "Greece",
    "country_code": "GR",
    "latitude": 37.9838,
    "longitude": 23.7275,
    "timezone": "Europe/Athens",
    "admin1": "Attica"
  },
  {
    "name": "Stockholm",
    "country": "Sweden",
    "country_code": "SE",
    "latitude": 59.3293,
    "longitude": 18.0686,
    "timezone": "Europe/Stockholm",
    "admin1": "Stockholm"
  },
  {
    "name": "Gothenburg",
    "country": "Sweden",
    "country_code": "SE",
    "latitude": 57.7089,
    "longitude": 11.9746,
    "timezone": "Europe/Stockholm",
    "admin1": "Västra Götaland"
  },
  {
    "name": "Oslo",
    "country": "Norway",
    "country_code": "NO",
    "latitude": 59.9139,
    "longitude": 10.7522,
    "timezone": "Europe/Oslo",
    "admin1": "Oslo"
  },
  {
    "name": "Bergen",
    "country": "Norway",
    "country_code": "NO",
    "latitude": 60.3913,
    "longitude": 5.3221,
    "timezone": "Europe/Oslo",
    "admin1": "Vestland"
  },
  {
    "name": "Copenhagen",
    "country": "Denmark",
    "country_code": "DK",
    "latitude": 55.6761,
    "longitude": 12.5683,
    "timezone": "Europe/Copenhagen",
    "admin1": "Capital Region"
  },
  {
    "name": "Helsinki",
    "country": "Finland",
    "country_code": "FI",
    "latitude": 60.1699,
    "longitude": 24.9384,
    "timezone": "Europe/Helsinki",
    "admin1": "Uusimaa"
  },
  {
    "name": "Reykjavik",
    "country": "Iceland",
    "country_code": "IS",
    "latitude": 64.1466,
    "longitude": -21.9426,
    "timezone": "Atlantic/Reykjavik",
    "admin1": "Capital Region"
  },
  {
    "name": "Istanbul",
    "country": "Turkey",
    "country_code": "TR",
    "latitude": 41.0082,
    "longitude": 28.9784,
    "timezone": "Europe/Istanbul",
    "admin1": "Istanbul"
  },
  {
    "name": "Ankara",
    "country": "Turkey",
    "country_code": "TR",
    "latitude": 39.9334,
    "longitude": 32.8597,
    "timezone": "Europe/Istanbul",
    "admin1": "Ankara"
  },
  {
    "name": "Kyiv",
    "country": "Ukraine",
    "country_code": "UA",
    "latitude": 50.4501,
    "longitude": 30.5234,
    "timezone": "Europe/Kyiv",
    "admin1": "Kyiv"
  },
  {
    "name": "Bucharest",
    "country": "Romania",
    "country_code": "RO",
    "latitude": 44.4268,
    "longitude": 26.1025,
    "timezone": "Europe/Bucharest",
    "admin1": "Bucharest"
  },
  {
    "name": "New York",
    "country": "United States",
    "country_code": "US",
    "latitude": 40.7128,
    "longitude": -74.006,
    "timezone": "America/New_York",
    "admin1": "New York"
  },
  {
    "name": "Los Angeles",
    "country": "United States",
    "country_code": "US",
    "latitude": 34.0522,
    "longitude": -118.2437,
    "timezone": "America/Los_Angeles",
    "admin1": "California"
  },
  {
    "name": "Chicago",
    "country": "United States",
    "country_code": "US",
    "latitude": 41.8781,
    "longitude": -87.6298,
    "timezone": "America/Chicago",
    "admin1": "Illinois"
  },
  {
    "name": "Houston",
    "country": "United States",
    "country_code": "US",
    "latitude": 29.7604,
    "longitude": -95.3698,
    "timezone": "America/Chicago",
    "admin1": "Texas"
  },
  {
    "name": "Phoenix",
    "country": "United States",
    "country_code": "US",
    "latitude": 33.4484,
    "longitude": -112.074,
    "timezone": "America/Phoenix",
    "admin1": "Arizona"
  },
  {
    "name": "Philadelphia",
    "country": "United States",
    "country_code": "US",
    "latitude": 39.9526,
    "longitude": -75.1652,
    "timezone": "America/New_York",
    "admin1": "Pennsylvania"
  },
  {
    "name": "San Antonio",
    "country": "United States",
    "country_code": "US",
    "latitude": 29.4241,
    "longitude": -98.4936,
    "timezone": "America/Chicago",
    "admin1": "Texas"
  },
  {
    "name": "San Diego",
    "country": "United States",
    "country_code": "US",
    "latitude": 32.7157,
    "longitude": -117.1611,
    "timezone": "America/Los_Angeles",
    "admin1": "California"
  },
  {
    "name": "Dallas",
    "country": "United States",
    "country_code": "US",
    "latitude": 32.7767,
    "longitude": -96.797,
    "timezone": "America/Chicago",
    "admin1": "Texas"
  },
  {
    "name": "San Jose",
    "country": "United States",
    "country_code": "US",
    "latitude": 37.3382,
    "longitude": -121.8863,
    "timezone": "America/Los_Angeles",
    "admin1": "California"
  },
  {
    "name": "Austin",
    "country": "United States",
    "country_code": "US",
    "latitude": 30.2672,
    "longitude": -97.7431,
    "timezone": "America/Chicago",
    "admin1": "Texas"
  },
  {
    "name": "San Francisco",
    "country": "United States",
    "country_code": "US",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "timezone": "America/Los_Angeles",
    "admin1": "California"
  },
  {
    "name": "Seattle",
    "country": "United States",
    "country_code": "US",
    "latitude": 47.6062,
    "longitude": -122.3321,
    "timezone": "America/Los_Angeles",
    "admin1": "Washington"
  },
  {
    "name": "Denver",
    "country": "United States",
    "country_code": "US",
    "latitude": 39.7392,
    "longitude": -104.9903,
    "timezone": "America/Denver",
    "admin1": "Colorado"
  },
  {
    "name": "Boston",
    "country": "United States",
    "country_code": "US",
    "latitude": 42.3601,
    "longitude": -71.0589,
    "timezone": "America/New_York",
    "admin1": "Massachusetts"
  },
  {
    "name": "Miami",
    "country": "United States",
    "country_code": "US",
    "latitude": 25.7617,
    "longitude": -80.1918,
    "timezone": "America/New_York",
    "admin1": "Florida"
  },
  {
    "name": "Orlando",
    "country": "United States",
    "country_code": "US",
    "latitude": 28.5383,
    "longitude": -81.3792,
    "timezone": "America/New_York",
    "admin1": "Florida"
  },
  {
    "name": "Atlanta",
    "country": "United States",
    "country_code": "US",
    "latitude": 33.749,
    "longitude": -84.388,
    "timezone": "America/New_York",
    "admin1": "Georgia"
  },
  {
    "name": "Washington",
    "country": "United States",
    "country_code": "US",
    "latitude": 38.9072,
    "longitude": -77.0369,
    "timezone": "America/New_York",
    "admin1": "District of Columbia"
  },
  {
    "name": "Las Vegas",
    "country": "United States",
    "country_code": "US",
    "latitude": 36.1699,
    "longitude": -115.1398,
    "timezone": "America/Los_Angeles",
    "admin1": "Nevada"
  },
  {
    "name": "Portland",
    "country": "United States",
    "country_code": "US",
    "latitude": 45.5152,
    "longitude": -122.6784,
    "timezone": "America/Los_Angeles",
    "admin1": "Oregon"
  },
  {
    "name": "Detroit",
    "country": "United States",
    "country_code": "US",
    "latitude": 42.3314,
    "longitude": -83.0458,
    "timezone": "America/Detroit",
    "admin1": "Michigan"
  },
  {
    "name": "Minneapolis",
    "country": "United States",
    "country_code": "US",
    "latitude": 44.9778,
    "longitude": -93.265,
    "timezone": "America/Chicago",
    "admin1": "Minnesota"
  },
  {
    "name": "Honolulu",
    "country": "United States",
    "country_code": "US",
    "latitude": 21.3069,
    "longitude": -157.8583,
    "timezone": "Pacific/Honolulu",
    "admin1": "Hawaii"
  },
  {
    "name": "Anchorage",
    "country": "United States",
    "country_code": "US",
    "latitude": 61.2181,
    "longitude": -149.9003,
    "timezone": "America/Anchorage",
    "admin1": "Alaska"
  },
  {
    "name": "Salt Lake City",
    "country": "United States",
    "country_code": "US",
    "latitude": 40.7608,
    "longitude": -111.891,
    "timezone": "America/Denver",
    "admin1": "Utah"
  },
  {
    "name": "Toronto",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 43.6532,
    "longitude": -79.3832,
    "timezone": "America/Toronto",
    "admin1": "Ontario"
  },
  {
    "name": "Montreal",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 45.5017,
    "longitude": -73.5673,
    "timezone": "America/Toronto",
    "admin1": "Quebec"
  },
  {
    "name": "Vancouver",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 49.2827,
    "longitude": -123.1207,
    "timezone": "America/Vancouver",
    "admin1": "British Columbia"
  },
  {
    "name": "Calgary",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 51.0447,
    "longitude": -114.0719,
    "timezone": "America/Edmonton",
    "admin1": "Alberta"
  },
  {
    "name": "Ottawa",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 45.4215,
    "longitude": -75.6972,
    "timezone": "America/Toronto",
    "admin1": "Ontario"
  },
  {
    "name": "Edmonton",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 53.5461,
    "longitude": -113.4938,
    "timezone": "America/Edmonton",
    "admin1": "Alberta"
  },
  {
    "name": "Quebec City",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 46.8139,
    "longitude": -71.208,
    "timezone": "America/Toronto",
    "admin1": "Quebec"
  },
  {
    "name": "Winnipeg",
    "country": "Canada",
    "country_code": "CA",
    "latitude": 49.8951,
    "longitude": -97.1384,
    "timezone": "America/Winnipeg",
    "admin1": "Manitoba"
  },
  {
    "name": "Mexico City",
    "country": "Mexico",
    "country_code": "MX",
    "latitude": 19.4326,
    "longitude": -99.1332,
    "timezone": "America/Mexico_City",
    "admin1": "CDMX"
  },
  {
    "name": "Guadalajara",
    "country": "Mexico",
    "country_code": "MX",
    "latitude": 20.6597,
    "longitude": -103.3496,
    "timezone": "America/Mexico_City",
    "admin1": "Jalisco"
  },
  {
    "name": "Monterrey",
    "country": "Mexico",
    "country_code": "MX",
    "latitude": 25.6866,
    "longitude": -100.3161,
    "timezone": "America/Monterrey",
    "admin1": "Nuevo León"
  },
  {
    "name": "Cancún",
    "country": "Mexico",
    "country_code": "MX",
    "latitude": 21.1619,
    "longitude": -86.8515,
    "timezone": "America/Cancun",
    "admin1": "Quintana Roo"
  },
  {
    "name": "São Paulo",
    "country": "Brazil",
    "country_code": "BR",
    "latitude": -23.5505,
    "longitude": -46.6333,
    "timezone": "America/Sao_Paulo",
    "admin1": "São Paulo"
  },
  {
    "name": "Rio de Janeiro",
    "country": "Brazil",
    "country_code": "BR",
    "latitude": -22.9068,
    "longitude": -43.1729,
    "timezone": "America/Sao_Paulo",
    "admin1": "Rio de Janeiro"
  },
  {
    "name": "Brasília",
    "country": "Brazil",
    "country_code": "BR",
    "latitude": -15.8267,
    "longitude": -47.9218,
    "timezone": "America/Sao_Paulo",
    "admin1": "Federal District"
  },
  {
    "name": "Salvador",
    "country": "Brazil",
    "country_code": "BR",
    "latitude": -12.9777,
    "longitude": -38.5016,
    "timezone": "America/Bahia",
    "admin1": "Bahia"
  },
  {
    "name": "Buenos Aires",
    "country": "Argentina",
    "country_code": "AR",
    "latitude": -34.6037,
    "longitude": -58.3816,
    "timezone": "America/Argentina/Buenos_Aires",
    "admin1": "Buenos Aires"
  },
  {
    "name": "Córdoba",
    "country": "Argentina",
    "country_code": "AR",
    "latitude": -31.4201,
    "longitude": -64.1888,
    "timezone": "America/Argentina/Cordoba",
    "admin1": "Córdoba"
  },
  {
    "name": "Santiago",
    "country": "Chile",
    "country_code": "CL",
    "latitude": -33.4489,
    "longitude": -70.6693,
    "timezone": "America/Santiago",
    "admin1": "Santiago"
  },
  {
    "name": "Bogotá",
    "country": "Colombia",
    "country_code": "CO",
    "latitude": 4.711,
    "longitude": -74.0721,
    "timezone": "America/Bogota",
    "admin1": "Bogotá D.C."
  },
  {
    "name": "Medellín",
    "country": "Colombia",
    "country_code": "CO",
    "latitude": 6.2442,
    "longitude": -75.5812,
    "timezone": "America/Bogota",
    "admin1": "Antioquia"
  },
  {
    "name": "Lima",
    "country": "Peru",
    "country_code": "PE",
    "latitude": -12.0464,
    "longitude": -77.0428,
    "timezone": "America/Lima",
    "admin1": "Lima"
  },
  {
    "name": "Cusco",
    "country": "Peru",
    "country_code": "PE",
    "latitude": -13.5319,
    "longitude": -71.9675,
    "timezone": "America/Lima",
    "admin1": "Cusco"
  },
  {
    "name": "Quito",
    "country": "Ecuador",
    "country_code": "EC",
    "latitude": -0.1807,
    "longitude": -78.4678,
    "timezone": "America/Guayaquil",
    "admin1": "Pichincha"
  },
  {
    "name": "Caracas",
    "country": "Venezuela",
    "country_code": "VE",
    "latitude": 10.4806,
    "longitude": -66.9036,
    "timezone": "America/Caracas",
    "admin1": "Capital"
  },
  {
    "name": "Tokyo",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 35.6762,
    "longitude": 139.6503,
    "timezone": "Asia/Tokyo",
    "admin1": "Tokyo"
  },
  {
    "name": "Osaka",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 34.6937,
    "longitude": 135.5023,
    "timezone": "Asia/Tokyo",
    "admin1": "Osaka"
  },
  {
    "name": "Kyoto",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 35.0116,
    "longitude": 135.7681,
    "timezone": "Asia/Tokyo",
    "admin1": "Kyoto"
  },
  {
    "name": "Yokohama",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 35.4437,
    "longitude": 139.638,
    "timezone": "Asia/Tokyo",
    "admin1": "Kanagawa"
  },
  {
    "name": "Nagoya",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 35.1815,
    "longitude": 136.9066,
    "timezone": "Asia/Tokyo",
    "admin1": "Aichi"
  },
  {
    "name": "Sapporo",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 43.0618,
    "longitude": 141.3545,
    "timezone": "Asia/Tokyo",
    "admin1": "Hokkaido"
  },
  {
    "name": "Fukuoka",
    "country": "Japan",
    "country_code": "JP",
    "latitude": 33.5904,
    "longitude": 130.4017,
    "timezone": "Asia/Tokyo",
    "admin1": "Fukuoka"
  },
  {
    "name": "Seoul",
    "country": "South Korea",
    "country_code": "KR",
    "latitude": 37.5665,
    "longitude": 126.978,
    "timezone": "Asia/Seoul",
    "admin1": "Seoul"
  },
  {
    "name": "Busan",
    "country": "South Korea",
    "country_code": "KR",
    "latitude": 35.1796,
    "longitude": 129.0756,
    "timezone": "Asia/Seoul",
    "admin1": "Busan"
  },
  {
    "name": "Beijing",
    "country": "China",
    "country_code": "CN",
    "latitude": 39.9042,
    "longitude": 116.4074,
    "timezone": "Asia/Shanghai",
    "admin1": "Beijing"
  },
  {
    "name": "Shanghai",
    "country": "China",
    "country_code": "CN",
    "latitude": 31.2304,
    "longitude": 121.4737,
    "timezone": "Asia/Shanghai",
    "admin1": "Shanghai"
  },
  {
    "name": "Guangzhou",
    "country": "China",
    "country_code": "CN",
    "latitude": 23.1291,
    "longitude": 113.2644,
    "timezone": "Asia/Shanghai",
    "admin1": "Guangdong"
  },
  {
    "name": "Shenzhen",
    "country": "China",
    "country_code": "CN",
    "latitude": 22.5431,
    "longitude": 114.0579,
    "timezone": "Asia/Shanghai",
    "admin1": "Guangdong"
  },
  {
    "name": "Chengdu",
    "country": "China",
    "country_code": "CN",
    "latitude": 30.5728,
    "longitude": 104.0668,
    "timezone": "Asia/Shanghai",
    "admin1": "Sichuan"
  },
  {
    "name": "Hong Kong",
    "country": "China",
    "country_code": "HK",
    "latitude": 22.3193,
    "longitude": 114.1694,
    "timezone": "Asia/Hong_Kong",
    "admin1": "Hong Kong"
  },
  {
    "name": "Macau",
    "country": "China",
    "country_code": "MO",
    "latitude": 22.1987,
    "longitude": 113.5439,
    "timezone": "Asia/Macau",
    "admin1": "Macau"
  },
  {
    "name": "Taipei",
    "country": "Taiwan",
    "country_code": "TW",
    "latitude": 25.033,
    "longitude": 121.5654,
    "timezone": "Asia/Taipei",
    "admin1": "Taipei"
  },
  {
    "name": "Singapore",
    "country": "Singapore",
    "country_code": "SG",
    "latitude": 1.3521,
    "longitude": 103.8198,
    "timezone": "Asia/Singapore",
    "admin1": "Central Singapore"
  },
  {
    "name": "Bangkok",
    "country": "Thailand",
    "country_code": "TH",
    "latitude": 13.7563,
    "longitude": 100.5018,
    "timezone": "Asia/Bangkok",
    "admin1": "Bangkok"
  },
  {
    "name": "Phuket",
    "country": "Thailand",
    "country_code": "TH",
    "latitude": 7.8804,
    "longitude": 98.3923,
    "timezone": "Asia/Bangkok",
    "admin1": "Phuket"
  },
  {
    "name": "Kuala Lumpur",
    "country": "Malaysia",
    "country_code": "MY",
    "latitude": 3.139,
    "longitude": 101.6869,
    "timezone": "Asia/Kuala_Lumpur",
    "admin1": "Federal Territory"
  },
  {
    "name": "Penang",
    "country": "Malaysia",
    "country_code": "MY",
    "latitude": 5.4141,
    "longitude": 100.3288,
    "timezone": "Asia/Kuala_Lumpur",
    "admin1": "Penang"
  },
  {
    "name": "Jakarta",
    "country": "Indonesia",
    "country_code": "ID",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "timezone": "Asia/Jakarta",
    "admin1": "Jakarta"
  },
  {
    "name": "Bali",
    "country": "Indonesia",
    "country_code": "ID",
    "latitude": -8.3405,
    "longitude": 115.092,
    "timezone": "Asia/Makassar",
    "admin1": "Bali"
  },
  {
    "name": "Denpasar",
    "country": "Indonesia",
    "country_code": "ID",
    "latitude": -8.6705,
    "longitude": 115.2126,
    "timezone": "Asia/Makassar",
    "admin1": "Bali"
  },
  {
    "name": "Manila",
    "country": "Philippines",
    "country_code": "PH",
    "latitude": 14.5995,
    "longitude": 120.9842,
    "timezone": "Asia/Manila",
    "admin1": "Metro Manila"
  },
  {
    "name": "Cebu",
    "country": "Philippines",
    "country_code": "PH",
    "latitude": 10.3157,
    "longitude": 123.8854,
    "timezone": "Asia/Manila",
    "admin1": "Central Visayas"
  },
  {
    "name": "Hanoi",
    "country": "Vietnam",
    "country_code": "VN",
    "latitude": 21.0285,
    "longitude": 105.8542,
    "timezone": "Asia/Ho_Chi_Minh",
    "admin1": "Hanoi"
  },
  {
    "name": "Ho Chi Minh City",
    "country": "Vietnam",
    "country_code": "VN",
    "latitude": 10.8231,
    "longitude": 106.6297,
    "timezone": "Asia/Ho_Chi_Minh",
    "admin1": "Ho Chi Minh"
  },
  {
    "name": "Dubai",
    "country": "United Arab Emirates",
    "country_code": "AE",
    "latitude": 25.2048,
    "longitude": 55.2708,
    "timezone": "Asia/Dubai",
    "admin1": "Dubai"
  },
  {
    "name": "Abu Dhabi",
    "country": "United Arab Emirates",
    "country_code": "AE",
    "latitude": 24.4539,
    "longitude": 54.3773,
    "timezone": "Asia/Dubai",
    "admin1": "Abu Dhabi"
  },
  {
    "name": "Sharjah",
    "country": "United Arab Emirates",
    "country_code": "AE",
    "latitude": 25.3463,
    "longitude": 55.4209,
    "timezone": "Asia/Dubai",
    "admin1": "Sharjah"
  },
  {
    "name": "Doha",
    "country": "Qatar",
    "country_code": "QA",
    "latitude": 25.2854,
    "longitude": 51.531,
    "timezone": "Asia/Qatar",
    "admin1": "Doha"
  },
  {
    "name": "Riyadh",
    "country": "Saudi Arabia",
    "country_code": "SA",
    "latitude": 24.7136,
    "longitude": 46.6753,
    "timezone": "Asia/Riyadh",
    "admin1": "Riyadh"
  },
  {
    "name": "Jeddah",
    "country": "Saudi Arabia",
    "country_code": "SA",
    "latitude": 21.5433,
    "longitude": 39.1728,
    "timezone": "Asia/Riyadh",
    "admin1": "Makkah"
  },
  {
    "name": "Mecca",
    "country": "Saudi Arabia",
    "country_code": "SA",
    "latitude": 21.3891,
    "longitude": 39.8579,
    "timezone": "Asia/Riyadh",
    "admin1": "Makkah"
  },
  {
    "name": "Medina",
    "country": "Saudi Arabia",
    "country_code": "SA",
    "latitude": 24.5247,
    "longitude": 39.5692,
    "timezone": "Asia/Riyadh",
    "admin1": "Al Madinah"
  },
  {
    "name": "Kuwait City",
    "country": "Kuwait",
    "country_code": "KW",
    "latitude": 29.3759,
    "longitude": 47.9774,
    "timezone": "Asia/Kuwait",
    "admin1": "Al Asimah"
  },
  {
    "name": "Manama",
    "country": "Bahrain",
    "country_code": "BH",
    "latitude": 26.2285,
    "longitude": 50.586,
    "timezone": "Asia/Bahrain",
    "admin1": "Capital"
  },
  {
    "name": "Muscat",
    "country": "Oman",
    "country_code": "OM",
    "latitude": 23.5859,
    "longitude": 58.4059,
    "timezone": "Asia/Muscat",
    "admin1": "Muscat"
  },
  {
    "name": "Amman",
    "country": "Jordan",
    "country_code": "JO",
    "latitude": 31.9454,
    "longitude": 35.9284,
    "timezone": "Asia/Amman",
    "admin1": "Amman"
  },
  {
    "name": "Tel Aviv",
    "country": "Israel",
    "country_code": "IL",
    "latitude": 32.0853,
    "longitude": 34.7818,
    "timezone": "Asia/Jerusalem",
    "admin1": "Tel Aviv"
  },
  {
    "name": "Jerusalem",
    "country": "Israel",
    "country_code": "IL",
    "latitude": 31.7683,
    "longitude": 35.2137,
    "timezone": "Asia/Jerusalem",
    "admin1": "Jerusalem"
  },
  {
    "name": "Beirut",
    "country": "Lebanon",
    "country_code": "LB",
    "latitude": 33.8938,
    "longitude": 35.5018,
    "timezone": "Asia/Beirut",
    "admin1": "Beirut"
  },
  {
    "name": "Tashkent",
    "country": "Uzbekistan",
    "country_code": "UZ",
    "latitude": 41.2995,
    "longitude": 69.2401,
    "timezone": "Asia/Tashkent",
    "admin1": "Tashkent"
  },
  {
    "name": "Almaty",
    "country": "Kazakhstan",
    "country_code": "KZ",
    "latitude": 43.222,
    "longitude": 76.8512,
    "timezone": "Asia/Almaty",
    "admin1": "Almaty"
  },
  {
    "name": "Baku",
    "country": "Azerbaijan",
    "country_code": "AZ",
    "latitude": 40.4093,
    "longitude": 49.8671,
    "timezone": "Asia/Baku",
    "admin1": "Baku"
  },
  {
    "name": "Tbilisi",
    "country": "Georgia",
    "country_code": "GE",
    "latitude": 41.7151,
    "longitude": 44.8271,
    "timezone": "Asia/Tbilisi",
    "admin1": "Tbilisi"
  },
  {
    "name": "Yerevan",
    "country": "Armenia",
    "country_code": "AM",
    "latitude": 40.1792,
    "longitude": 44.4991,
    "timezone": "Asia/Yerevan",
    "admin1": "Yerevan"
  },
  {
    "name": "Karachi",
    "country": "Pakistan",
    "country_code": "PK",
    "latitude": 24.8607,
    "longitude": 67.0011,
    "timezone": "Asia/Karachi",
    "admin1": "Sindh"
  },
  {
    "name": "Lahore",
    "country": "Pakistan",
    "country_code": "PK",
    "latitude": 31.5204,
    "longitude": 74.3587,
    "timezone": "Asia/Karachi",
    "admin1": "Punjab"
  },
  {
    "name": "Islamabad",
    "country": "Pakistan",
    "country_code": "PK",
    "latitude": 33.6844,
    "longitude": 73.0479,
    "timezone": "Asia/Karachi",
    "admin1": "Islamabad"
  },
  {
    "name": "Dhaka",
    "country": "Bangladesh",
    "country_code": "BD",
    "latitude": 23.8103,
    "longitude": 90.4125,
    "timezone": "Asia/Dhaka",
    "admin1": "Dhaka"
  },
  {
    "name": "Chittagong",
    "country": "Bangladesh",
    "country_code": "BD",
    "latitude": 22.3569,
    "longitude": 91.7832,
    "timezone": "Asia/Dhaka",
    "admin1": "Chittagong"
  },
  {
    "name": "Colombo",
    "country": "Sri Lanka",
    "country_code": "LK",
    "latitude": 6.9271,
    "longitude": 79.8612,
    "timezone": "Asia/Colombo",
    "admin1": "Western"
  },
  {
    "name": "Kathmandu",
    "country": "Nepal",
    "country_code": "NP",
    "latitude": 27.7172,
    "longitude": 85.324,
    "timezone": "Asia/Kathmandu",
    "admin1": "Bagmati"
  },
  {
    "name": "Pokhara",
    "country": "Nepal",
    "country_code": "NP",
    "latitude": 28.2096,
    "longitude": 83.9856,
    "timezone": "Asia/Kathmandu",
    "admin1": "Gandaki"
  },
  {
    "name": "Male",
    "country": "Maldives",
    "country_code": "MV",
    "latitude": 4.1755,
    "longitude": 73.5093,
    "timezone": "Indian/Maldives",
    "admin1": "Kaafu"
  },
  {
    "name": "Sydney",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -33.8688,
    "longitude": 151.2093,
    "timezone": "Australia/Sydney",
    "admin1": "New South Wales"
  },
  {
    "name": "Melbourne",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -37.8136,
    "longitude": 144.9631,
    "timezone": "Australia/Melbourne",
    "admin1": "Victoria"
  },
  {
    "name": "Brisbane",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -27.4698,
    "longitude": 153.0251,
    "timezone": "Australia/Brisbane",
    "admin1": "Queensland"
  },
  {
    "name": "Perth",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -31.9505,
    "longitude": 115.8605,
    "timezone": "Australia/Perth",
    "admin1": "Western Australia"
  },
  {
    "name": "Adelaide",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -34.9285,
    "longitude": 138.6007,
    "timezone": "Australia/Adelaide",
    "admin1": "South Australia"
  },
  {
    "name": "Gold Coast",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -28.0167,
    "longitude": 153.4,
    "timezone": "Australia/Brisbane",
    "admin1": "Queensland"
  },
  {
    "name": "Canberra",
    "country": "Australia",
    "country_code": "AU",
    "latitude": -35.2809,
    "longitude": 149.13,
    "timezone": "Australia/Sydney",
    "admin1": "Australian Capital Territory"
  },
  {
    "name": "Auckland",
    "country": "New Zealand",
    "country_code": "NZ",
    "latitude": -36.8485,
    "longitude": 174.7633,
    "timezone": "Pacific/Auckland",
    "admin1": "Auckland"
  },
  {
    "name": "Wellington",
    "country": "New Zealand",
    "country_code": "NZ",
    "latitude": -41.2865,
    "longitude": 174.7762,
    "timezone": "Pacific/Auckland",
    "admin1": "Wellington"
  },
  {
    "name": "Christchurch",
    "country": "New Zealand",
    "country_code": "NZ",
    "latitude": -43.5321,
    "longitude": 172.6362,
    "timezone": "Pacific/Auckland",
    "admin1": "Canterbury"
  },
  {
    "name": "Suva",
    "country": "Fiji",
    "country_code": "FJ",
    "latitude": -18.1416,
    "longitude": 178.4419,
    "timezone": "Pacific/Fiji",
    "admin1": "Central"
  },
  {
    "name": "Cairo",
    "country": "Egypt",
    "country_code": "EG",
    "latitude": 30.0444,
    "longitude": 31.2357,
    "timezone": "Africa/Cairo",
    "admin1": "Cairo"
  },
  {
    "name": "Alexandria",
    "country": "Egypt",
    "country_code": "EG",
    "latitude": 31.2001,
    "longitude": 29.9187,
    "timezone": "Africa/Cairo",
    "admin1": "Alexandria"
  },
  {
    "name": "Johannesburg",
    "country": "South Africa",
    "country_code": "ZA",
    "latitude": -26.2041,
    "longitude": 28.0473,
    "timezone": "Africa/Johannesburg",
    "admin1": "Gauteng"
  },
  {
    "name": "Cape Town",
    "country": "South Africa",
    "country_code": "ZA",
    "latitude": -33.9249,
    "longitude": 18.4241,
    "timezone": "Africa/Johannesburg",
    "admin1": "Western Cape"
  },
  {
    "name": "Durban",
    "country": "South Africa",
    "country_code": "ZA",
    "latitude": -29.8587,
    "longitude": 31.0218,
    "timezone": "Africa/Johannesburg",
    "admin1": "KwaZulu-Natal"
  },
  {
    "name": "Nairobi",
    "country": "Kenya",
    "country_code": "KE",
    "latitude": -1.2921,
    "longitude": 36.8219,
    "timezone": "Africa/Nairobi",
    "admin1": "Nairobi"
  },
  {
    "name": "Mombasa",
    "country": "Kenya",
    "country_code": "KE",
    "latitude": -4.0435,
    "longitude": 39.6682,
    "timezone": "Africa/Nairobi",
    "admin1": "Mombasa"
  },
  {
    "name": "Lagos",
    "country": "Nigeria",
    "country_code": "NG",
    "latitude": 6.5244,
    "longitude": 3.3792,
    "timezone": "Africa/Lagos",
    "admin1": "Lagos"
  },
  {
    "name": "Abuja",
    "country": "Nigeria",
    "country_code": "NG",
    "latitude": 9.0765,
    "longitude": 7.3986,
    "timezone": "Africa/Lagos",
    "admin1": "Federal Capital Territory"
  },
  {
    "name": "Casablanca",
    "country": "Morocco",
    "country_code": "MA",
    "latitude": 33.5731,
    "longitude": -7.5898,
    "timezone": "Africa/Casablanca",
    "admin1": "Casablanca-Settat"
  },
  {
    "name": "Marrakech",
    "country": "Morocco",
    "country_code": "MA",
    "latitude": 31.6295,
    "longitude": -7.9811,
    "timezone": "Africa/Casablanca",
    "admin1": "Marrakech-Safi"
  },
  {
    "name": "Tunis",
    "country": "Tunisia",
    "country_code": "TN",
    "latitude": 36.8065,
    "longitude": 10.1815,
    "timezone": "Africa/Tunis",
    "admin1": "Tunis"
  },
  {
    "name": "Algiers",
    "country": "Algeria",
    "country_code": "DZ",
    "latitude": 36.7538,
    "longitude": 3.0588,
    "timezone": "Africa/Algiers",
    "admin1": "Algiers"
  },
  {
    "name": "Addis Ababa",
    "country": "Ethiopia",
    "country_code": "ET",
    "latitude": 9.032,
    "longitude": 38.7469,
    "timezone": "Africa/Addis_Ababa",
    "admin1": "Addis Ababa"
  },
  {
    "name": "Accra",
    "country": "Ghana",
    "country_code": "GH",
    "latitude": 5.6037,
    "longitude": -0.187,
    "timezone": "Africa/Accra",
    "admin1": "Greater Accra"
  },
  {
    "name": "Kashipur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.214,
    "longitude": 78.957,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Pithoragarh",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.583,
    "longitude": 80.209,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Haldwani",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.223,
    "longitude": 79.529,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Khatima",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.921,
    "longitude": 79.971,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Banbasa",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.994,
    "longitude": 80.072,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Almora",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.597,
    "longitude": 79.659,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Rishikesh",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.108,
    "longitude": 78.293,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Champawat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.335,
    "longitude": 80.078,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Bageshwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.837,
    "longitude": 79.772,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Rudrapur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.98,
    "longitude": 79.4,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Tanakpur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.074,
    "longitude": 80.111,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Sitarganj",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.929,
    "longitude": 79.704,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Bazpur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.153,
    "longitude": 79.108,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Ramnagar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.393,
    "longitude": 79.128,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Lalkuan",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.068,
    "longitude": 79.517,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Gadarpur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.042,
    "longitude": 79.249,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Didihat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.949,
    "longitude": 80.135,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Lohaghat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.404,
    "longitude": 80.09,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Berinag",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.801,
    "longitude": 80.071,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Munsiari",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.094,
    "longitude": 80.24,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Dharchula",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.847,
    "longitude": 80.52,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Gangolihat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.657,
    "longitude": 80.04,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Someshwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.78,
    "longitude": 79.6,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Dwarahat",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.778,
    "longitude": 79.427,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Chaukhutia",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.885,
    "longitude": 79.351,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Bhimtal",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.35,
    "longitude": 79.567,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Bhowali",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.39,
    "longitude": 79.505,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Mukteshwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.472,
    "longitude": 79.648,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Nainital",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.392,
    "longitude": 79.454,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Mussoorie",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.459,
    "longitude": 78.066,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Jaspur",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.279,
    "longitude": 78.828,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Pantnagar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.05,
    "longitude": 79.517,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Shaktifarm",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.001,
    "longitude": 79.627,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Nanakmatta",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.941,
    "longitude": 79.806,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Kotdwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.746,
    "longitude": 78.522,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Roorkee",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.866,
    "longitude": 77.891,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Haridwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.948,
    "longitude": 78.16,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Tehri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.391,
    "longitude": 78.48,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "New Tehri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.374,
    "longitude": 78.433,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Pauri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.153,
    "longitude": 78.777,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Gopeshwar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.413,
    "longitude": 79.32,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Joshimath",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.555,
    "longitude": 79.564,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Ranikhet",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.641,
    "longitude": 79.432,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Uttarkashi",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.727,
    "longitude": 78.443,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Chamoli",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.499,
    "longitude": 79.619,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Rudraprayag",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.285,
    "longitude": 78.981,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Karnaprayag",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.26,
    "longitude": 79.217,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Vikasnagar",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.496,
    "longitude": 77.771,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Kichha",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 28.917,
    "longitude": 79.5,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Barkot",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.81,
    "longitude": 78.21,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Chamba",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.35,
    "longitude": 78.4,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Lansdowne",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.838,
    "longitude": 78.685,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Kausani",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 29.847,
    "longitude": 79.596,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Auli",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.529,
    "longitude": 79.567,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Badrinath",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.743,
    "longitude": 79.493,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Kedarnath",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.735,
    "longitude": 79.067,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Gangotri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 30.999,
    "longitude": 78.94,
    "timezone": "Asia/Kolkata"
  },
  {
    "name": "Yamunotri",
    "admin1": "Uttarakhand",
    "country": "India",
    "country_code": "IN",
    "latitude": 31.014,
    "longitude": 78.46,
    "timezone": "Asia/Kolkata"
  }
];

  function getCachedCityCoordinates(lowerCity) {
    try {
      const stored = localStorage.getItem(COORDS_CACHE_KEY);
      if (!stored) return null;
      const map = JSON.parse(stored);
      return map[lowerCity] || null;
    } catch (e) {
      return null;
    }
  }

  function saveCityToCoordinatesCache(lowerCity, data) {
    try {
      const stored = localStorage.getItem(COORDS_CACHE_KEY);
      const map = stored ? JSON.parse(stored) : {};
      map[lowerCity] = data;
      localStorage.setItem(COORDS_CACHE_KEY, JSON.stringify(map));
    } catch (e) {}
  }


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
  };

  // Inline Vector Weather Icon Generator (Zero Network Latency, Dark SaaS Theme Optimized)
  function getWeatherConditionSvg(code, isDayHour = true) {
    const svgOpen = '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">';
    const svgClose = '</svg>';

    // 1. Clear Sky (Sun or Moon)
    if (code === 0 || code === 1) {
      if (isDayHour) {
        return `${svgOpen}<circle cx="16" cy="16" r="6.5" fill="#f59e0b" filter="drop-shadow(0 0 6px rgba(245, 158, 11, 0.7))"/><circle cx="16" cy="16" r="4.5" fill="#fbbf24"/><path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.1 2.1M23.1 23.1l2.1 2.1M6.8 25.2l2.1-2.1M23.1 8.9l2.1-2.1" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/>${svgClose}`;
      } else {
        return `${svgOpen}<path d="M22.5 16.5A9.5 9.5 0 1 1 12 6a7.5 7.5 0 0 0 10.5 10.5z" fill="#fde047" filter="drop-shadow(0 0 6px rgba(253, 224, 71, 0.6))"/><circle cx="21" cy="7" r="1" fill="#ffffff"/><circle cx="25" cy="11" r="0.75" fill="#ffffff"/>${svgClose}`;
      }
    }

    // 2. Partly Cloudy
    if (code === 2) {
      if (isDayHour) {
        return `${svgOpen}<circle cx="12" cy="12" r="5" fill="#fbbf24" filter="drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))"/><path d="M10 24h13a5 5 0 0 0 1-9.9 6.5 6.5 0 0 0-12.7-1.1A4.5 4.5 0 0 0 10 24z" fill="#e2e8f0" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"/>${svgClose}`;
      } else {
        return `${svgOpen}<path d="M18 10a6 6 0 0 1-5-5 5 5 0 1 0 6.8 6.8c-.6-.6-1.2-1.2-1.8-1.8z" fill="#fde047"/><path d="M9 24h13a5 5 0 0 0 1-9.9 6.5 6.5 0 0 0-12.7-1.1A4.5 4.5 0 0 0 9 24z" fill="#cbd5e1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"/>${svgClose}`;
      }
    }

    // 3. Overcast
    if (code === 3) {
      return `${svgOpen}<path d="M14 18h11a4 4 0 0 0 1-7.9 5.5 5.5 0 0 0-10.7-1A3.5 3.5 0 0 0 14 18z" fill="#94a3b8" opacity="0.6"/><path d="M8 25h14a5 5 0 0 0 1-9.9 6.5 6.5 0 0 0-12.7-1.1A4.5 4.5 0 0 0 8 25z" fill="#e2e8f0" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.45))"/>${svgClose}`;
    }

    // 4. Fog / Mist
    if (code === 45 || code === 48) {
      return `${svgOpen}<line x1="6" y1="12" x2="26" y2="12" stroke="#94a3b8" stroke-width="2.2" stroke-linecap="round"/><line x1="4" y1="16" x2="28" y2="16" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round"/><line x1="7" y1="20" x2="25" y2="20" stroke="#94a3b8" stroke-width="2.2" stroke-linecap="round"/>${svgClose}`;
    }

    // 5. Rain / Drizzle / Showers
    if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) {
      return `${svgOpen}<path d="M8 19h13a4.5 4.5 0 0 0 1-8.9A6 6 0 0 0 10.3 9a4 4 0 0 0-2.3 10z" fill="#94a3b8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/><line x1="10" y1="22" x2="8.5" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/><line x1="15" y1="22" x2="13.5" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/><line x1="20" y1="22" x2="18.5" y2="26" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>${svgClose}`;
    }

    // 6. Snow / Freezing Rain
    if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) {
      return `${svgOpen}<path d="M8 18h13a4.5 4.5 0 0 0 1-8.9A6 6 0 0 0 10.3 8a4 4 0 0 0-2.3 10z" fill="#cbd5e1"/><circle cx="10" cy="23" r="1.4" fill="#93c5fd"/><circle cx="15" cy="24" r="1.4" fill="#93c5fd"/><circle cx="20" cy="23" r="1.4" fill="#93c5fd"/>${svgClose}`;
    }

    // 7. Thunderstorm
    if (code === 95 || code === 96 || code === 99) {
      return `${svgOpen}<path d="M7 17h13a4.5 4.5 0 0 0 1-8.9A6 6 0 0 0 9.3 7a4 4 0 0 0-2.3 10z" fill="#64748b"/><polygon points="15,16 11,22 14,22 13,27 18,20 15,20" fill="#facc15" filter="drop-shadow(0 0 4px rgba(250, 204, 21, 0.8))"/>${svgClose}`;
    }

    // Fallback (Sun / Moon)
    return isDayHour
      ? `${svgOpen}<circle cx="16" cy="16" r="6" fill="#fbbf24"/>${svgClose}`
      : `${svgOpen}<path d="M22 16A8 8 0 1 1 12 6a6 6 0 0 0 10 10z" fill="#fde047"/>${svgClose}`;
  }

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
    updateSearchActionButtons(false);
    cityInput.focus();
    renderHistoryDropdown();
  });

  // Quick search city pill buttons
  document.querySelectorAll(".city-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const city = pill.getAttribute("data-city");
      cityInput.value = city;
      updateSearchActionButtons(true);
      closeDropdown();
      handleSearch(city);
    });
  });

  // Click Atmosphere Brand / Logo to return to Home Welcome Screen
  if (brandHomeBtn) {
    brandHomeBtn.addEventListener("click", returnToHomeScreen);
  }

  // Interactive Weather Companion Character Interaction
  if (characterFigure) {
    const characterGreetings = [
      "👋 Hello there!",
      "✨ Live satellite telemetry!",
      "🌤️ Hope you're having a great day!",
      "🛰️ Real-time Open-Meteo sync!",
      "🌱 Enjoy the atmospheric view!"
    ];
    let greetingIndex = 0;

    const triggerCharacterReaction = () => {
      characterFigure.classList.remove("reacting");
      void characterFigure.offsetWidth; // Force reflow
      characterFigure.classList.add("reacting");

      if (charReactionBubble) {
        const textSpan = charReactionBubble.querySelector(".bubble-text");
        if (textSpan) {
          textSpan.textContent = characterGreetings[greetingIndex % characterGreetings.length];
          greetingIndex++;
        }
      }

      setTimeout(() => {
        characterFigure.classList.remove("reacting");
      }, 850);
    };

    characterFigure.addEventListener("click", triggerCharacterReaction);
    characterFigure.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerCharacterReaction();
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box-wrapper")) {
      closeDropdown();
    }
  });

  // --- View Switcher (Welcome Screen <-> Weather Dashboard) ---
  function activateDashboardView() {
    if (welcomeScreen && welcomeScreen.id === "welcome-screen" && !welcomeScreen.classList.contains("hidden")) {
      welcomeScreen.classList.add("hidden");
    }
    if (topNav && topNav.id === "top-nav") {
      topNav.classList.remove("hidden");
    }
    if (navSearchMount && searchBoxWrapper) {
      navSearchMount.appendChild(searchBoxWrapper);
    }
    if (weatherDashboard) {
      weatherDashboard.classList.remove("hidden");
    }

    // Globe retreats off-right so it doesn't compete with data content
    if (window.threeAtmosphere) {
      window.threeAtmosphere.repositionForDashboard();
    }

    // GSAP Cinematic Entrance Animation
    if (window.motionEngine) {
      window.motionEngine.animateDashboardEntrance();
      // Snap the blue capsule pill to the active tab once the bar is visible in the DOM
      window.motionEngine.resetTabIndicator();
    }
  }

  function returnToHomeScreen() {
    if (weatherDashboard && welcomeScreen && welcomeScreen.id === "welcome-screen") {
      weatherDashboard.classList.add("hidden");
      if (topNav && topNav.id === "top-nav") topNav.classList.add("hidden");
      welcomeScreen.classList.remove("hidden");
      if (welcomeSearchWrapper && searchBoxWrapper) {
        welcomeSearchWrapper.insertBefore(searchBoxWrapper, welcomeSearchWrapper.firstChild);
      }
    }
    if (errorMessage) errorMessage.classList.add("hidden");
    if (cityInput) cityInput.value = "";
    updateSearchActionButtons(false);
    document.body.className = "theme-night cinematic-dark-mode";
    initAmbientSky();

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.threeAtmosphere) {
      window.threeAtmosphere.setWeatherTheme(0, "Clear");
      window.threeAtmosphere.repositionForWelcome();
    }
  }

  // --- Ambient Background Generator ---
  function initAmbientSky() {
    if (!ambientSkyCanvas) return;
    // Remove only non-canvas elements to preserve Three.js WebGL canvas!
    const nonCanvas = ambientSkyCanvas.querySelectorAll(":not(#webgl-atmosphere-canvas)");
    nonCanvas.forEach((el) => el.remove());

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

  // --- Location Name Formatter & Cross-UI Sync Helper ---
  function formatLocationDisplayName(loc) {
    if (!loc) return "";
    const parts = [loc.name];
    if (loc.admin1 && loc.admin1 !== loc.name) parts.push(loc.admin1);
    if (loc.country) parts.push(loc.country);
    else if (loc.country_code) parts.push(loc.country_code);
    return parts.join(", ");
  }

  // --- Apply Selected Location Across All Search Inputs & Execute Weather Sync ---
  function applySelectedLocation(selected) {
    if (!selected) return;
    const fullLabel = formatLocationDisplayName(selected);

    if (cityInput) {
      cityInput.value = fullLabel;
      updateSearchActionButtons(true);
    }
    if (dashboardCityInput) {
      dashboardCityInput.value = fullLabel;
    }
    if (modalSearchInput) {
      modalSearchInput.value = fullLabel;
    }

    closeDropdown();
    closeDashboardDropdown();
    closeSearchModal();

    if (selected.latitude !== undefined && selected.longitude !== undefined) {
      executeSearchWithCoords(selected.latitude, selected.longitude, selected);
    } else {
      handleSearch(fullLabel);
    }
  }

  // --- Universal High-Precision Geocoding Suggestions Engine (OWM + Open-Meteo Primary + Photon + Catalog) ---
  async function fetchLiveCitySuggestions(query, abortSignal) {
    if (!query || query.trim().length < 2) return [];
    const cleanRaw = query.trim();
    const clean = cleanRaw.toLowerCase();

    // 1. Instant 0ms local catalog search
    const localMatches = GLOBAL_CITY_CATALOG.filter((c) =>
      c.name.toLowerCase().includes(clean) ||
      (c.admin1 && c.admin1.toLowerCase().includes(clean)) ||
      (c.country && c.country.toLowerCase().includes(clean))
    ).slice(0, 6).map((c) => ({ ...c, source: "catalog" }));

    const liveApiItems = [];
    const apiKey = getApiKey();

    // 2. High-Accuracy OpenWeatherMap Direct Geocoding (if custom key is supplied)
    if (apiKey) {
      try {
        const owmUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cleanRaw)}&limit=6&appid=${apiKey}`;
        const owmRes = await fetch(owmUrl, { signal: abortSignal });
        if (owmRes.ok) {
          const owmData = await owmRes.json();
          if (Array.isArray(owmData) && owmData.length > 0) {
            owmData.forEach((r) => {
              liveApiItems.push({
                name: r.name,
                admin1: r.state || "",
                country: r.country || "",
                country_code: r.country ? r.country.toUpperCase() : "",
                latitude: r.lat,
                longitude: r.lon,
                timezone: "auto",
                source: "openweathermap"
              });
            });
          }
        } else if (owmRes.status === 401 || owmRes.status === 403) {
          // OpenWeatherMap key is pending activation or invalid; log once and continue cleanly
          console.warn(`[Atmosphere] OpenWeatherMap returned ${owmRes.status} (key pending activation). Using Open-Meteo & Photon.`);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn("[Atmosphere] OpenWeatherMap suggestion check:", err.message);
        }
      }
    }

    // 3. Query Live Open-Meteo Geocoding API
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanRaw)}&count=10&language=en&format=json`;
      const response = await fetch(url, { signal: abortSignal });

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          data.results.forEach((r) => {
            liveApiItems.push({
              name: r.name,
              admin1: r.admin1 || r.admin2 || "",
              country: r.country || "",
              country_code: r.country_code ? r.country_code.toUpperCase() : "",
              latitude: r.latitude,
              longitude: r.longitude,
              timezone: r.timezone || "auto",
              elevation: r.elevation,
              source: "open-meteo"
            });
          });
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.warn("[Atmosphere] Open-Meteo suggestion error:", err);
      }
    }

    if (liveApiItems.length > 0) {
      // Deduplicate using composite key: name|admin1|country_code
      const seen = new Set();
      const uniqueList = [];

      // Prioritize LIVE API results FIRST (OWM then Open-Meteo)
      for (const item of liveApiItems) {
        const key = `${item.name.toLowerCase()}|${(item.admin1 || "").toLowerCase()}|${(item.country_code || "").toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueList.push(item);
        }
      }

      // Supplement with remaining distinct local catalog matches
      for (const item of localMatches) {
        const key = `${item.name.toLowerCase()}|${(item.admin1 || "").toLowerCase()}|${(item.country_code || "").toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueList.push(item);
        }
      }

      return uniqueList.slice(0, 8);
    }

    // 4. Fallback to Photon for live suggestions of small Indian villages & towns
    try {
      const photonRes = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(cleanRaw)}&limit=6`, { signal: abortSignal });
      if (photonRes.ok) {
        const photonData = await photonRes.json();
        if (photonData.features && photonData.features.length > 0) {
          const photonMatches = photonData.features.map((f) => {
            const p = f.properties || {};
            const [lon, lat] = f.geometry.coordinates;
            const isInd = p.country === "India" || p.countrycode === "IN";
            return {
              name: p.name || cleanRaw,
              country: p.country || (isInd ? "India" : ""),
              country_code: p.countrycode ? p.countrycode.toUpperCase() : (isInd ? "IN" : ""),
              latitude: lat,
              longitude: lon,
              timezone: isInd ? "Asia/Kolkata" : "auto",
              admin1: p.state || p.county || "",
              source: "photon"
            };
          });

          const seen = new Set();
          const merged = [];
          for (const item of [...photonMatches, ...localMatches]) {
            const key = `${item.name.toLowerCase()}|${(item.admin1 || "").toLowerCase()}|${(item.country_code || "").toLowerCase()}`;
            if (!seen.has(key)) {
              seen.add(key);
              merged.push(item);
            }
          }
          return merged.slice(0, 8);
        }
      }
    } catch (e) {}

    return localMatches;
  }

  // --- Render Autocomplete Suggestions List ---
  function renderSuggestionsList(container, suggestions, query, onSelect) {
    if (!container) return;
    if (!suggestions || suggestions.length === 0) {
      container.innerHTML = `
        <div class="dropdown-empty-state">
          No matching cities found for "<strong>${escapeHtml(query)}</strong>"
        </div>
      `;
      container.classList.remove("hidden");
      return;
    }

    const apiKey = getApiKey();
    const hasKey = Boolean(apiKey);
    const hasOwm = suggestions.some((s) => s.source === "openweathermap");

    let headerTitle = "Global Satellite Telemetry";
    let indicatorText = "LIVE API";
    if (hasOwm) {
      headerTitle = "OpenWeather Geocoding · Direct Match";
      indicatorText = "OWM VERIFIED";
    } else if (hasKey) {
      headerTitle = "OpenWeather API Engine · Active";
      indicatorText = "OWM ACTIVE";
    }

    let html = `
      <div class="dropdown-header">
        <span class="dropdown-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${escapeHtml(headerTitle)}
        </span>
        <span class="dropdown-api-indicator">● ${escapeHtml(indicatorText)}</span>
      </div>
    `;

    suggestions.forEach((item, index) => {
      const region = item.admin1 ? `${item.admin1}, ` : "";
      const locationSub = `${region}${item.country || ""}`;
      const highlightedName = highlightMatch(item.name, query);
      const cCode = item.country_code ? escapeHtml(item.country_code) : "";
      
      let badgeHtml = "";
      if (item.source === "openweathermap") {
        badgeHtml = '<span class="dropdown-source-badge dropdown-badge-owm">OWM PRO</span>';
      } else if (hasKey) {
        badgeHtml = '<span class="dropdown-source-badge dropdown-badge-owm">OWM ACTIVE</span>';
      } else if (item.source === "open-meteo" || item.source === "api") {
        badgeHtml = '<span class="dropdown-source-badge">LIVE API</span>';
      } else if (item.source === "photon") {
        badgeHtml = '<span class="dropdown-source-badge dropdown-badge-osm">OSM GEO</span>';
      }

      html += `
        <div class="dropdown-item" data-index="${index}">
          <div class="dropdown-item-left">
            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div class="dropdown-text-group">
              <span class="dropdown-primary-text">
                ${highlightedName}
                ${badgeHtml}
              </span>
              <span class="dropdown-secondary-text">${escapeHtml(locationSub)}</span>
            </div>
          </div>
          <div class="dropdown-item-right">
            ${cCode ? `<span class="dropdown-country-badge">${cCode}</span>` : ""}
            <span class="dropdown-select-hint">⏎</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    container.classList.remove("hidden");

    container.querySelectorAll(".dropdown-item").forEach((el) => {
      el.addEventListener("click", () => {
        const index = parseInt(el.getAttribute("data-index"), 10);
        const sel = suggestions[index];
        if (sel && onSelect) {
          onSelect(sel);
        }
      });
    });
  }

  // --- Main Search Bar Input Handlers ---
  function onInputChange() {
    const query = cityInput.value.trim();
    updateSearchActionButtons(query.length > 0);

    if (debounceTimeout) clearTimeout(debounceTimeout);
    if (currentAbortController) currentAbortController.abort();

    if (query.length === 0) {
      currentSuggestions = [];
      renderHistoryDropdown();
      return;
    }

    if (query.length < 2) {
      currentSuggestions = [];
      closeDropdown();
      return;
    }

    const cleanLower = query.toLowerCase();
    const apiKey = getApiKey();

    // 1. Instant 0ms local catalog preview
    const instantMatches = GLOBAL_CITY_CATALOG.filter((c) =>
      c.name.toLowerCase().includes(cleanLower) ||
      (c.admin1 && c.admin1.toLowerCase().includes(cleanLower)) ||
      (c.country && c.country.toLowerCase().includes(cleanLower))
    ).slice(0, 6).map((c) => ({ ...c, source: "catalog" }));

    if (instantMatches.length > 0) {
      currentSuggestions = instantMatches;
      renderSuggestionsList(searchDropdown, currentSuggestions, query, applySelectedLocation);
    } else {
      searchDropdown.innerHTML = `
        <div class="dropdown-header">
          <span class="dropdown-title">
            <span class="pulse-beacon-sm"></span> Searching "${escapeHtml(query)}" via ${apiKey ? 'OpenWeather API' : 'Satellite Mesh'}...
          </span>
          <span class="dropdown-api-indicator">● ${apiKey ? 'OWM SEARCH' : 'QUERYING'}</span>
        </div>
      `;
      searchDropdown.classList.remove("hidden");
    }

    // 2. Debounced background live API fetch
    debounceTimeout = setTimeout(async () => {
      currentAbortController = new AbortController();
      const liveResults = await fetchLiveCitySuggestions(query, currentAbortController.signal);
      if (cityInput.value.trim().toLowerCase() === cleanLower) {
        currentSuggestions = liveResults;
        renderSuggestionsList(searchDropdown, currentSuggestions, query, applySelectedLocation);
      }
    }, 180);
  }

  function onInputFocus() {
    const query = cityInput.value.trim();
    if (query.length === 0) {
      renderHistoryDropdown();
    } else if (query.length >= 2) {
      onInputChange();
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
      } else if (!searchDropdown.classList.contains("hidden") && currentSuggestions.length > 0) {
        applySelectedLocation(currentSuggestions[0]);
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
          applySelectedLocation(item);
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


  // --- Global Command Palette Search Modal Logic ---
  function openSearchModal() {
    if (!searchModal) return;
    searchModal.classList.remove("hidden");
    searchModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalSearchInput) {
      modalSearchInput.value = "";
      setTimeout(() => {
        modalSearchInput.focus();
      }, 50);
    }
    currentModalSuggestions = GLOBAL_CITY_CATALOG.slice(0, 8).map(c => ({ ...c, source: "catalog" }));
    renderSuggestionsList(modalSearchDropdown, currentModalSuggestions, "", applySelectedLocation);
  }

  function closeSearchModal() {
    if (!searchModal) return;
    searchModal.classList.add("hidden");
    searchModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (modalSearchInput) modalSearchInput.blur();
  }

  let modalDebounceTimer = null;
  let currentModalSuggestions = [];

  async function onModalSearchInput(e) {
    const query = e.target.value.trim();
    if (!modalSearchDropdown) return;
    if (modalDebounceTimer) clearTimeout(modalDebounceTimer);

    if (!query) {
      currentModalSuggestions = GLOBAL_CITY_CATALOG.slice(0, 8).map(c => ({ ...c, source: "catalog" }));
      renderSuggestionsList(modalSearchDropdown, currentModalSuggestions, "", applySelectedLocation);
      return;
    }

    const cleanLower = query.toLowerCase();
    const localMatches = GLOBAL_CITY_CATALOG.filter((c) =>
      c.name.toLowerCase().includes(cleanLower) ||
      (c.admin1 && c.admin1.toLowerCase().includes(cleanLower)) ||
      (c.country && c.country.toLowerCase().includes(cleanLower))
    ).slice(0, 8).map(c => ({ ...c, source: "catalog" }));

    currentModalSuggestions = localMatches;
    renderSuggestionsList(modalSearchDropdown, currentModalSuggestions, query, applySelectedLocation);

    if (query.length >= 2) {
      modalDebounceTimer = setTimeout(async () => {
        const liveResults = await fetchLiveCitySuggestions(query);
        if (modalSearchInput.value.trim().toLowerCase() === cleanLower) {
          currentModalSuggestions = liveResults;
          renderSuggestionsList(modalSearchDropdown, currentModalSuggestions, query, applySelectedLocation);
        }
      }, 180);
    }
  }

  // Hook up Dashboard search bar with instant autocomplete
  function closeDashboardDropdown() {
    if (dashboardSearchDropdown) {
      dashboardSearchDropdown.classList.add("hidden");
      dashboardSearchDropdown.innerHTML = "";
    }
  }

  let dashDebounceTimer = null;
  let currentDashSuggestions = [];

  if (dashboardSearchBtn && dashboardCityInput) {
    console.log("[Atmosphere] Dashboard search bar hooked up successfully");

    dashboardCityInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      if (!dashboardSearchDropdown) return;
      if (dashDebounceTimer) clearTimeout(dashDebounceTimer);

      if (!query || query.length < 2) {
        closeDashboardDropdown();
        return;
      }

      const cleanLower = query.toLowerCase();

      // 1. Instant local catalog matches
      const localMatches = GLOBAL_CITY_CATALOG.filter((c) =>
        c.name.toLowerCase().includes(cleanLower) ||
        (c.admin1 && c.admin1.toLowerCase().includes(cleanLower)) ||
        (c.country && c.country.toLowerCase().includes(cleanLower))
      ).slice(0, 6).map(c => ({ ...c, source: "catalog" }));

      if (localMatches.length > 0) {
        currentDashSuggestions = localMatches;
        renderSuggestionsList(dashboardSearchDropdown, currentDashSuggestions, query, applySelectedLocation);
      } else {
        const apiKey = getApiKey();
        dashboardSearchDropdown.innerHTML = `
          <div class="dropdown-header">
            <span class="dropdown-title">
              <span class="pulse-beacon-sm"></span> Searching "${escapeHtml(query)}" via ${apiKey ? 'OpenWeather API' : 'Satellite Mesh'}...
            </span>
            <span class="dropdown-api-indicator">● ${apiKey ? 'OWM SEARCH' : 'QUERYING'}</span>
          </div>
        `;
        dashboardSearchDropdown.classList.remove("hidden");
      }

      // 2. Debounced online suggestions from Open-Meteo
      dashDebounceTimer = setTimeout(async () => {
        const liveResults = await fetchLiveCitySuggestions(query);
        if (dashboardCityInput.value.trim().toLowerCase() === cleanLower) {
          currentDashSuggestions = liveResults;
          renderSuggestionsList(dashboardSearchDropdown, currentDashSuggestions, query, applySelectedLocation);
        }
      }, 180);
    });

    dashboardSearchBtn.addEventListener("click", () => {
      const q = dashboardCityInput.value.trim();
      closeDashboardDropdown();
      if (q) handleSearch(q);
    });

    dashboardCityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (dashboardSearchDropdown && !dashboardSearchDropdown.classList.contains("hidden") && currentDashSuggestions.length > 0) {
          applySelectedLocation(currentDashSuggestions[0]);
        } else {
          const q = dashboardCityInput.value.trim();
          closeDashboardDropdown();
          if (q) handleSearch(q);
        }
      } else if (e.key === "Escape") {
        closeDashboardDropdown();
      }
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!dashboardCityInput.contains(e.target) && (!dashboardSearchDropdown || !dashboardSearchDropdown.contains(e.target))) {
        closeDashboardDropdown();
      }
    });
  } else {
    console.warn("[Atmosphere] Dashboard search bar NOT found:", { dashboardSearchBtn, dashboardCityInput });
  }

  // Hook up Top Nav search button
  if (navSearchTriggerBtn) {
    navSearchTriggerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSearchModal();
    });
  }

  // Hook up Command Palette Modal
  if (searchModal) {
    if (closeSearchModalBtn) {
      closeSearchModalBtn.addEventListener("click", closeSearchModal);
    }

    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) {
        closeSearchModal();
      }
    });

    if (modalSearchInput) {
      modalSearchInput.addEventListener("input", onModalSearchInput);
      modalSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (modalSearchDropdown && !modalSearchDropdown.classList.contains("hidden") && currentModalSuggestions.length > 0) {
            applySelectedLocation(currentModalSuggestions[0]);
          } else if (modalSearchInput.value.trim()) {
            const q = modalSearchInput.value.trim();
            closeSearchModal();
            handleSearch(q);
          }
        } else if (e.key === "Escape") {
          closeSearchModal();
        }
      });
    }

    if (modalCityPills && modalCityPills.length > 0) {
      modalCityPills.forEach((pill) => {
        pill.addEventListener("click", () => {
          const city = pill.getAttribute("data-city") || pill.textContent.trim();
          closeSearchModal();
          handleSearch(city);
        });
      });
    }
  }

  // --- Main Search Execution ---
  async function handleSearch(cityName) {
    console.log("[Atmosphere] handleSearch called with:", cityName);
    if (!cityName) return;
    if (errorMessage) errorMessage.classList.add("hidden");

    let clean = cityName.trim();

    if (clean.length < 2) {
      showError("Please enter at least 2 characters for city search.");
      return;
    }

    closeSearchModal();
    if (cityInput) {
      cityInput.value = clean;
      updateSearchActionButtons(true);
    }
    if (dashboardCityInput) {
      dashboardCityInput.value = clean;
    }
    if (modalSearchInput) {
      modalSearchInput.value = clean;
    }

    showLoading();

    try {
      console.log("[Atmosphere] Calling fetchCoordinates for:", clean);
      const locationData = await fetchCoordinates(clean);
      console.log("[Atmosphere] Geocoded result:", locationData);
      await executeSearchWithCoords(locationData.latitude, locationData.longitude, locationData);
      console.log("[Atmosphere] Search complete for:", locationData.name);
    } catch (error) {
      console.error("[Atmosphere] Search error:", error);
      showError(error.message);
    } finally {
      hideLoading();
    }
  }

  async function executeSearchWithCoords(lat, lon, locationData) {
    showLoading();
    if (errorMessage) errorMessage.classList.add("hidden");

    try {
      const weatherData = await fetchGlobalWeatherData(lat, lon, locationData.timezone);
      activateDashboardView();
      renderAtmosphereDashboard(weatherData, locationData);
      saveSearchToHistory(locationData);

      // Visibly display the full resolved city from the API across all search inputs
      const fullLabel = formatLocationDisplayName(locationData);
      if (cityInput) {
        cityInput.value = fullLabel;
        updateSearchActionButtons(true);
      }
      if (dashboardCityInput) {
        dashboardCityInput.value = fullLabel;
      }
      if (modalSearchInput) {
        modalSearchInput.value = fullLabel;
      }

      // Smooth scroll to showcase frame so user sees the newly populated results
      const dashboardSection = document.getElementById("dashboard-section");
      if (dashboardSection) {
        dashboardSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (error) {
      console.error(error);
      showError(error.message);
    } finally {
      hideLoading();
    }
  }


  // --- Photon (OpenStreetMap / Komoot) Universal Keyless Geocoder ---
  async function fetchPhotonCoordinates(query, qualifier = "") {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    try {
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=10`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data.features || data.features.length === 0) return null;

      const qLower = query.toLowerCase();
      const qualLower = qualifier.toLowerCase();

      // Priority 1: Match qualifier if provided (e.g. "uttarakhand" or "india")
      let match = null;
      if (qualLower) {
        match = data.features.find((f) => {
          const p = f.properties || {};
          return (
            (p.country && p.country.toLowerCase().includes(qualLower)) ||
            (p.state && p.state.toLowerCase().includes(qualLower)) ||
            (p.county && p.county.toLowerCase().includes(qualLower)) ||
            (p.countrycode && p.countrycode.toLowerCase() === qualLower)
          );
        });
      }

      // Priority 2: Match India if query seems Indian or exact match
      if (!match) {
        match = data.features.find((f) => {
          const p = f.properties || {};
          return (p.name && p.name.toLowerCase() === qLower && (p.country === "India" || p.countrycode === "IN"));
        });
      }

      // Priority 3: Exact name match anywhere
      if (!match) {
        match = data.features.find((f) => {
          const p = f.properties || {};
          return p.name && p.name.toLowerCase() === qLower;
        });
      }

      // Priority 4: First India match
      if (!match) {
        match = data.features.find((f) => {
          const p = f.properties || {};
          return p.country === "India" || p.countrycode === "IN";
        });
      }

      // Priority 5: First result
      if (!match) {
        match = data.features[0];
      }

      const p = match.properties || {};
      const [lon, lat] = match.geometry.coordinates;
      const isIndia = p.country === "India" || p.countrycode === "IN";

      return {
        name: p.name || p.city || query,
        country: p.country || (isIndia ? "India" : ""),
        country_code: p.countrycode ? p.countrycode.toUpperCase() : (isIndia ? "IN" : ""),
        latitude: lat,
        longitude: lon,
        timezone: isIndia ? "Asia/Kolkata" : "auto",
        admin1: p.state || p.county || ""
      };
    } catch (err) {
      clearTimeout(timeoutId);
      return null;
    }
  }

  // --- Universal Multi-Provider Geocoding Engine (Catalog -> Open-Meteo -> Nominatim -> Coordinates) ---
  async function fetchCoordinates(city) {
    let raw = (city || "").trim();
    if (!raw) {
      throw new Error("Please enter a city name or coordinates.");
    }

    // 1. Numerical Coordinates direct detection (e.g. "28.61, 77.20" or "40.7128, -74.0060")
    const coordMatch = raw.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lon = parseFloat(coordMatch[2]);
      if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        return {
          name: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
          country: "Coordinates",
          country_code: "GEO",
          latitude: lat,
          longitude: lon,
          timezone: "auto"
        };
      }
    }

    let clean = raw;
    let qualifier = "";
    if (clean.includes(",")) {
      const parts = clean.split(",");
      clean = parts[0].trim();
      qualifier = parts.slice(1).join(",").trim().toLowerCase();
    }
    const lower = clean.toLowerCase();
    const cleanLowerFull = raw.toLowerCase();

    // Helper for diacritic normalization (e.g. "Pithorāgarh" -> "pithoragarh", "München" -> "munchen")
    const normalize = (str) =>
      str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

    const normLower = normalize(clean);

    // 2. Instant 0ms localStorage cache lookup
    const cached = getCachedCityCoordinates(cleanLowerFull) || getCachedCityCoordinates(lower);
    if (cached) {
      console.log("[Atmosphere] Resolved via CACHE:", cached.name);
      return cached;
    }

    // 3. Online OpenWeatherMap Geocoding (if custom API key is supplied)
    const apiKey = getApiKey();
    if (apiKey) {
      const owmController = new AbortController();
      const owmTimeoutId = setTimeout(() => owmController.abort(), 3500);
      try {
        const owmQuery = qualifier ? `${clean},${qualifier}` : clean;
        const owmUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(owmQuery)}&limit=5&appid=${apiKey}`;
        const owmRes = await fetch(owmUrl, { signal: owmController.signal });
        clearTimeout(owmTimeoutId);

        if (owmRes.ok) {
          const owmData = await owmRes.json();
          if (Array.isArray(owmData) && owmData.length > 0) {
            const best = owmData[0];
            const resolved = {
              name: best.name,
              country: best.country || "",
              country_code: best.country || "",
              latitude: best.lat,
              longitude: best.lon,
              timezone: "auto",
              admin1: best.state || "",
              source: "openweathermap"
            };
            saveCityToCoordinatesCache(cleanLowerFull, resolved);
            saveCityToCoordinatesCache(lower, resolved);
            console.log("[Atmosphere] Resolved via OPENWEATHERMAP API:", resolved.name, resolved.country);
            return resolved;
          }
        } else if (owmRes.status === 401 || owmRes.status === 403) {
          console.warn(`[Atmosphere] OpenWeatherMap returned ${owmRes.status} (key pending activation). Cascading to Open-Meteo.`);
        }

        // Secondary OpenWeather check: 2.5/weather endpoint
        try {
          const owmWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(owmQuery)}&appid=${apiKey}&units=metric`;
          const owmWRes = await fetch(owmWeatherUrl);
          if (owmWRes.ok) {
            const wData = await owmWRes.json();
            if (wData && wData.coord) {
              const res = {
                name: wData.name || clean,
                country: wData.sys ? (wData.sys.country || "") : "",
                country_code: wData.sys ? (wData.sys.country || "") : "",
                latitude: wData.coord.lat,
                longitude: wData.coord.lon,
                timezone: "auto",
                source: "openweathermap"
              };
              saveCityToCoordinatesCache(cleanLowerFull, res);
              saveCityToCoordinatesCache(lower, res);
              console.log("[Atmosphere] Resolved via OPENWEATHERMAP 2.5 API:", res.name, res.country);
              return res;
            }
          }
        } catch (e) {}
      } catch (owmErr) {
        clearTimeout(owmTimeoutId);
        if (owmErr.name !== "AbortError") {
          console.warn("[Atmosphere] OpenWeatherMap request error:", owmErr.message);
        }
      }
    }

    // 4. Online Open-Meteo Geocoding with candidate ranking (PRIMARY LIVE RESOLVER)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      const searchName = qualifier ? `${clean} ${qualifier}` : clean;
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchName)}&count=10&language=en&format=json`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          let best = null;
          // Priority A: Candidate matching qualifier (state/country)
          if (qualifier) {
            best = data.results.find((r) =>
              (r.country && r.country.toLowerCase().includes(qualifier)) ||
              (r.admin1 && r.admin1.toLowerCase().includes(qualifier)) ||
              (r.country_code && r.country_code.toLowerCase() === qualifier)
            );
          }
          // Priority B: Candidate with exact name match
          if (!best) {
            best = data.results.find((r) => r.name.toLowerCase() === lower || normalize(r.name) === normLower);
          }
          // Priority C: First result
          if (!best) {
            best = data.results[0];
          }

          const resolved = {
            name: best.name,
            country: best.country || "",
            country_code: best.country_code || "",
            latitude: best.latitude,
            longitude: best.longitude,
            timezone: best.timezone || "auto",
            admin1: best.admin1 || "",
            source: "open-meteo"
          };
          saveCityToCoordinatesCache(cleanLowerFull, resolved);
          saveCityToCoordinatesCache(lower, resolved);
          console.log("[Atmosphere] Resolved via LIVE OPEN-METEO API:", resolved.name, resolved.country);
          return resolved;
        }
      }
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn("Open-Meteo geocoding network request failed or timed out:", err);
    }

    // 4. Instant 0ms catalog lookup fallback (offline or network failure)
    const catalogMatch = GLOBAL_CITY_CATALOG.find((c) => {
      const cNorm = normalize(c.name);
      if (cNorm === normLower || c.name.toLowerCase() === lower) {
        if (!qualifier) return true;
        const qNorm = normalize(qualifier);
        return (
          (c.country && normalize(c.country).includes(qNorm)) ||
          (c.country_code && c.country_code.toLowerCase() === qualifier) ||
          (c.admin1 && normalize(c.admin1).includes(qNorm))
        );
      }
      return false;
    }) || GLOBAL_CITY_CATALOG.find((c) => normalize(c.name) === normLower || c.name.toLowerCase() === lower);

    if (catalogMatch) {
      console.log("[Atmosphere] Resolved via OFFLINE CATALOG:", catalogMatch.name);
      return catalogMatch;
    }

    // 5. Photon (OpenStreetMap by Komoot) Fallback - Keyless open API, full CORS, resolves all Indian towns & villages!
    try {
      console.log("[Atmosphere] Querying Photon geocoder for:", clean);
      const photonResult = await fetchPhotonCoordinates(clean, qualifier);
      if (photonResult) {
        saveCityToCoordinatesCache(cleanLowerFull, photonResult);
        saveCityToCoordinatesCache(lower, photonResult);
        console.log("[Atmosphere] Resolved via PHOTON:", photonResult.name, photonResult.admin1, photonResult.country);
        return photonResult;
      }
    } catch (err) {
      console.warn("Photon geocoding failed:", err);
    }

    // 6. OpenStreetMap Nominatim Geocoding Fallback (Keyless open API, covers every town/village/locality worldwide)
    const nomController = new AbortController();
    const nomTimeoutId = setTimeout(() => nomController.abort(), 3500);

    try {
      const nomUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(raw)}&format=json&limit=5&addressdetails=1`;
      const nomResponse = await fetch(nomUrl, {
        signal: nomController.signal,
        
      });
      clearTimeout(nomTimeoutId);

      if (nomResponse.ok) {
        const nomData = await nomResponse.json();
        if (nomData && nomData.length > 0) {
          const item = nomData[0];
          const resolved = {
            name: item.name || item.display_name.split(",")[0].trim(),
            country: item.address ? (item.address.country || "") : "",
            country_code: item.address && item.address.country_code ? item.address.country_code.toUpperCase() : "",
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
            timezone: "auto",
            admin1: item.address ? (item.address.state || item.address.county || item.address.region || "") : ""
          };
          saveCityToCoordinatesCache(cleanLowerFull, resolved);
          saveCityToCoordinatesCache(lower, resolved);
          return resolved;
        }
      }
    } catch (err) {
      clearTimeout(nomTimeoutId);
      console.warn("Nominatim geocoding network request failed or timed out:", err);
    }

    // 6. Fuzzy fallback in local catalog
    const fuzzy = GLOBAL_CITY_CATALOG.find((c) =>
      c.name.toLowerCase().startsWith(lower) ||
      lower.startsWith(c.name.toLowerCase()) ||
      normalize(c.name).includes(normLower)
    );
    if (fuzzy) return fuzzy;

    throw new Error(`Could not find weather station for "${city}". Please check spelling or enter coordinates (e.g. 28.61, 77.20).`);
  }

  async function fetchGlobalWeatherData(lat, lon, timezone) {
    const tzParam = timezone && timezone !== "auto" ? encodeURIComponent(timezone) : "auto";
    const cacheKey = `weather_cache_${Number(lat).toFixed(2)}_${Number(lon).toFixed(2)}`;

    // 1. Check 5-minute session cache (0ms instant return!)
    try {
      const cachedStr = sessionStorage.getItem(cacheKey);
      if (cachedStr) {
        const entry = JSON.parse(cachedStr);
        if (Date.now() - entry.time < 5 * 60 * 1000) {
          return entry.data;
        }
      }
    } catch (e) {}

    // 2. Online fetch with 5000ms timeout guard
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=${tzParam}&forecast_days=2`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Weather forecast service temporarily unavailable.");
      const data = await response.json();

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), data }));
      } catch (e) {}

      return data;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") {
        throw new Error("Forecast server timed out. Please check your connection and try again.");
      }
      throw err;
    }
  }

  // --- Render Master Dashboard ---
  function renderAtmosphereDashboard(data, location) {
    const { current, hourly, daily, utc_offset_seconds, timezone } = data;
    const { name, country } = location;

    if (frameCityLabel) {
      const cCode = location.country_code || location.countryCode || location.country || "";
      frameCityLabel.textContent = `${name.toUpperCase()}${cCode ? ' · ' + cCode.toUpperCase() : ''} · LIVE TELEMETRY`;
    }

    const wmoInfo = WMO_WEATHER_MAP[current.weather_code] || {
      main: "Clear",
      desc: "Clear Sky",
      iconDay: "01d",
      iconNight: "01n",
    };

    // 1. Header & Location Meta with GSAP Kinetic Text Split
    if (cityNameDisplay) {
      if (window.motionEngine && window.motionEngine.animateTextSplit) {
        window.motionEngine.animateTextSplit(cityNameDisplay, name);
      } else {
        cityNameDisplay.textContent = name;
      }
    }

    if (countryTag) {
      countryTag.textContent = location.country_code || location.countryCode || location.country || "--";
    }

    if (descriptionDisplay) {
      if (window.motionEngine && window.motionEngine.animateTextSplit) {
        window.motionEngine.animateTextSplit(descriptionDisplay, wmoInfo.desc);
      } else {
        descriptionDisplay.textContent = wmoInfo.desc;
      }
    }

    if (localTimeDisplay) {
      localTimeDisplay.textContent = formatCurrentLocalTime(utc_offset_seconds, timezone);
    }

    // Populate Telemetry HUD Coordinates & Elevation
    const hudCoords = document.getElementById("hud-coords");
    const hudElev = document.getElementById("hud-elev");
    if (hudCoords && data.latitude !== undefined) {
      const latStr = `${Math.abs(data.latitude).toFixed(2)}° ${data.latitude >= 0 ? "N" : "S"}`;
      const lonStr = `${Math.abs(data.longitude).toFixed(2)}° ${data.longitude >= 0 ? "E" : "W"}`;
      hudCoords.textContent = `${latStr}, ${lonStr}`;
    }
    if (hudElev) {
      hudElev.textContent = `${Math.round(data.elevation || 15)}m`;
    }

    // 2. Hero Weather Readings with GSAP animated counter
    if (temperatureDisplay) {
      if (window.motionEngine) {
        window.motionEngine.animateCounter(temperatureDisplay, Math.round(current.temperature_2m), 0.9, 0);
      } else {
        temperatureDisplay.textContent = Math.round(current.temperature_2m);
      }
    }
    if (tempMaxDisplay) tempMaxDisplay.textContent = `${Math.round(daily.temperature_2m_max[0])}°`;
    if (tempMinDisplay) tempMinDisplay.textContent = `${Math.round(daily.temperature_2m_min[0])}°`;
    if (dayHighLowDisplay) {
      dayHighLowDisplay.textContent = `${Math.round(daily.temperature_2m_max[0])}° / ${Math.round(daily.temperature_2m_min[0])}°`;
    }
    if (feelsLikeDisplay) {
      feelsLikeDisplay.textContent = `${Math.round(current.apparent_temperature)}°`;
    }
    if (heroHumidityDisplay) {
      heroHumidityDisplay.textContent = `${current.relative_humidity_2m}%`;
    }

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
    renderMetricCards(current, hourly, daily);

    // Initialize 3D card tilt & spotlight physics on all cards
    if (window.motionEngine) {
      window.motionEngine.initCardPhysics();
    }

    errorMessage.classList.add("hidden");
  }

  // --- Animated 3D Scenery & Theme Engine ---
  function updateSceneryAndTheme(isDay, conditionMain) {
    const isNight = isDay === 0;
    const isRain = conditionMain === "Rain" || conditionMain === "Drizzle";
    const isStorm = conditionMain === "Thunderstorm";
    const isCloudy = conditionMain === "Clouds" || conditionMain === "Mist";

    let themeClass = "theme-night-clear";
    if (isStorm) {
      themeClass = "theme-thunderstorm";
    } else if (isRain) {
      themeClass = isNight ? "theme-night-rain" : "theme-day-rain";
    } else if (isCloudy) {
      themeClass = isNight ? "theme-night-cloudy" : "theme-day-cloudy";
    } else {
      themeClass = isNight ? "theme-night-clear" : "theme-day-clear";
    }

    // Switch body theme class based on Day/Night x Weather Condition (always retain cinematic-dark-mode)
    document.body.className = `cinematic-dark-mode ${themeClass}`;

    // Also explicitly sync weather theme class directly onto the hero scenery card
    const heroCard = document.querySelector(".hero-scenery-card");
    if (heroCard) {
      heroCard.classList.remove(
        "theme-day", "theme-day-clear", "theme-day-cloudy", "theme-day-rain",
        "theme-night", "theme-night-clear", "theme-night-cloudy", "theme-night-rain", "theme-thunderstorm"
      );
      heroCard.classList.add(themeClass);
    }

    // Clear ambient sky canvas non-canvas elements to preserve Three.js WebGL canvas!
    if (ambientSkyCanvas) {
      const nonCanvas = ambientSkyCanvas.querySelectorAll(":not(#webgl-atmosphere-canvas)");
      nonCanvas.forEach((el) => el.remove());
    }

    // Sync Three.js WebGL 3D atmosphere
    if (window.threeAtmosphere) {
      window.threeAtmosphere.setWeatherTheme(isDay, conditionMain);
    }

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

    // --- Dynamic Samsung One UI Weather Companion Character State ---
    if (characterFigure) {
      characterFigure.classList.remove("state-sunny", "state-rainy", "state-stormy", "state-cloudy", "state-night");

      let bubbleMsg = "☀️ Beautiful day out!";
      if (isStorm) {
        characterFigure.classList.add("state-stormy");
        bubbleMsg = "⚡ Staying safe under cover!";
      } else if (isRain) {
        characterFigure.classList.add("state-rainy");
        bubbleMsg = "🌧️ Keeping dry with my umbrella!";
      } else if (isNight) {
        characterFigure.classList.add("state-night");
        bubbleMsg = "✨ Stargazing in the calm night!";
      } else if (isCloudy) {
        characterFigure.classList.add("state-cloudy");
        bubbleMsg = "☁️ Watching soft clouds roll by!";
      } else {
        characterFigure.classList.add("state-sunny");
        bubbleMsg = "☀️ Enjoying the sunny weather!";
      }

      if (charReactionBubble) {
        const textSpan = charReactionBubble.querySelector(".bubble-text");
        if (textSpan) textSpan.textContent = bubbleMsg;
      }
    }

    // --- Dynamic Weather Ambient FX Particles Layer (Pollen, Ripples, Starlight) ---
    if (sceneryFxParticles) {
      sceneryFxParticles.innerHTML = "";

      if (!isNight && !isRain && !isStorm) {
        // Golden Sun Pollen / Warm Light Motes in clear daylight
        const pollenCount = isCloudy ? 4 : 10;
        for (let i = 0; i < pollenCount; i++) {
          const mote = document.createElement("div");
          mote.className = "pollen-mote";
          const size = Math.random() * 3.5 + 2;
          mote.style.width = `${size}px`;
          mote.style.height = `${size}px`;
          mote.style.top = `${25 + Math.random() * 55}%`;
          mote.style.left = `${Math.random() * 85}%`;
          mote.style.animationDuration = `${5 + Math.random() * 6}s`;
          mote.style.animationDelay = `${Math.random() * 4}s`;
          sceneryFxParticles.appendChild(mote);
        }
      } else if (isRain || isStorm) {
        // Raindrop Splash Ripples on the Hill Crest
        const rippleCount = isStorm ? 9 : 6;
        for (let i = 0; i < rippleCount; i++) {
          const ripple = document.createElement("div");
          ripple.className = "hill-splash-ripple";
          ripple.style.bottom = `${24 + Math.random() * 48}px`;
          ripple.style.left = `${12 + Math.random() * 76}%`;
          ripple.style.animationDuration = `${0.8 + Math.random() * 0.6}s`;
          ripple.style.animationDelay = `${Math.random() * 1.6}s`;
          sceneryFxParticles.appendChild(ripple);
        }
      } else if (isNight) {
        // Shooting Star Streak across the starlight sky
        const starStreak = document.createElement("div");
        starStreak.className = "scenery-shooting-star";
        starStreak.style.top = `${18 + Math.random() * 20}%`;
        starStreak.style.right = `${14 + Math.random() * 25}%`;
        sceneryFxParticles.appendChild(starStreak);
      }
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
    if (!summaryText) return;
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
    if (!hourlyTimeline) return;
    if (!hourly || !hourly.time || hourly.time.length === 0) return;

    // Find starting hour index in hourly.time
    let startIndex = 0;
    const currentPrefix = currentTimeIso ? currentTimeIso.slice(0, 13) : "";
    const foundIdx = hourly.time.findIndex((t) => t.startsWith(currentPrefix));
    if (foundIdx >= 0) {
      startIndex = foundIdx;
    }

    // Extract consecutive hours (dynamic resolution adapting to viewport width)
    const hoursCount = window.innerWidth >= 1280 ? 16 : window.innerWidth >= 900 ? 12 : 10;
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
    const graphHeight = 120;
    const graphTopPadding = 32;
    const graphUsableHeight = 55;

    // Calculate curve points
    const points = sliceIndices.map((itemIdx, seqIdx) => {
      const x = seqIdx * colWidth + colWidth / 2;
      const normalized = (hourly.temperature_2m[itemIdx] - minTemp) / tempRange;
      const y = graphTopPadding + (1 - normalized) * graphUsableHeight;
      return { x, y, temp: Math.round(hourly.temperature_2m[itemIdx]) };
    });

    const svgPath = createSmoothSplinePath(points);
    const areaPath = createSplineAreaPath(points, graphHeight);

    let html = `<div class="hourly-columns-grid" style="min-width: ${totalWidth}px;">`;

    sliceIndices.forEach((itemIdx, seqIdx) => {
      const timeIso = hourly.time[itemIdx];
      const hourStr = seqIdx === 0 ? "Now" : formatIsoHour(timeIso);
      const code = hourly.weather_code[itemIdx];
      const hourVal = parseInt(timeIso.split("T")[1].split(":")[0], 10);
      const isDayHour = hourVal >= 6 && hourVal < 20;
      const iconSvg = getWeatherConditionSvg(code, isDayHour);
      const popPercent = Math.round(hourly.precipitation_probability[itemIdx] || 0);
      const popHtml = popPercent > 0
        ? `<svg class="pop-drop-icon" viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M6 1.5 C6 1.5 2.5 5.5 2.5 7.8 A3.5 3.5 0 0 0 9.5 7.8 C9.5 5.5 6 1.5 6 1.5 Z" fill="#38bdf8"/></svg>${popPercent}%`
        : `<span class="pop-dry">—</span>`;

      html += `
        <div class="hourly-col" style="width: ${colWidth}px;">
          <span class="hourly-time">${hourStr}</span>
          <div class="hourly-icon-box">
            ${iconSvg}
          </div>
          <span class="hourly-pop">${popHtml}</span>
        </div>
      `;
    });

    html += `</div>`;

    let svgOverlay = `
      <svg class="hourly-graph-svg-layer" viewBox="0 0 ${totalWidth} ${graphHeight}" style="min-width: ${totalWidth}px; width: ${totalWidth}px; height: ${graphHeight}px;">
        <defs>
          <linearGradient id="hourlySplineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.30" />
            <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.08" />
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0" />
          </linearGradient>
          <filter id="splineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#38bdf8" flood-opacity="0.5" />
          </filter>
        </defs>
        <path d="${areaPath}" fill="url(#hourlySplineGrad)" class="hourly-graph-area"/>
        <path d="${svgPath}" class="hourly-graph-path" filter="url(#splineGlow)"/>
    `;

    points.forEach((pt) => {
      svgOverlay += `
        <text x="${pt.x}" y="${pt.y - 12}" class="hourly-temp-label">${pt.temp}°</text>
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

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }

  function createSplineAreaPath(points, bottomY) {
    if (points.length === 0) return "";
    const first = points[0];
    const last = points[points.length - 1];
    const curveD = createSmoothSplinePath(points);
    return `${curveD} L ${last.x.toFixed(1)} ${bottomY} L ${first.x.toFixed(1)} ${bottomY} Z`;
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

    if (sunGlowCircle) {
      sunGlowCircle.setAttribute("cx", cx);
      sunGlowCircle.setAttribute("cy", cy);
      sunGlowCircle.setAttribute("fill", isDay === 0 ? "#e0e7ff" : "#ffd700");
    }

    if (sunStatusTitle) {
      if (isDay === 0) {
        if (nowMs < sunriseMs) {
          sunStatusTitle.textContent = "Night Sky";
          if (sunFooterText) sunFooterText.textContent = `Sunrise will be at ${sunriseStr}`;
        } else {
          sunStatusTitle.textContent = "Evening Starlight";
          if (sunFooterText) sunFooterText.textContent = `Sunset was at ${sunsetStr}`;
        }
      } else {
        sunStatusTitle.textContent = "Rise and Shine";
        if (sunFooterText) sunFooterText.textContent = `Sunset will be at ${sunsetStr}`;
      }
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
  function renderMetricCards(current, hourly, daily) {
    // Humidity
    if (window.motionEngine) {
      window.motionEngine.animateCounter(humidityDisplay, current.relative_humidity_2m, 0.8, 0, "%");
    } else {
      humidityDisplay.textContent = `${current.relative_humidity_2m}%`;
    }
    humidityBar.style.width = `${current.relative_humidity_2m}%`;
    if (current.relative_humidity_2m < 40) humidityStatus.textContent = "Dry air";
    else if (current.relative_humidity_2m <= 70) humidityStatus.textContent = "Comfortable level";
    else humidityStatus.textContent = "High humidity";

    // Wind
    const speedMs = current.wind_speed_10m / 3.6;
    if (window.motionEngine) {
      window.motionEngine.animateCounter(windSpeedDisplay, speedMs, 0.8, 1, " m/s");
    } else {
      windSpeedDisplay.textContent = `${speedMs.toFixed(1)} m/s`;
    }
    windDirection.textContent = getWindDirectionText(current.wind_direction_10m);
    if (speedMs < 3) windCaption.textContent = "Light air";
    else if (speedMs < 8) windCaption.textContent = "Gentle breeze";
    else windCaption.textContent = "Strong breeze";

    // Pressure
    if (window.motionEngine) {
      window.motionEngine.animateCounter(pressureDisplay, Math.round(current.surface_pressure), 0.8, 0, " hPa");
    } else {
      pressureDisplay.textContent = `${Math.round(current.surface_pressure)} hPa`;
    }

    // Visibility
    const visMeters = hourly && hourly.visibility ? hourly.visibility[0] : 10000;
    const visKm = visMeters / 1000;
    if (window.motionEngine) {
      window.motionEngine.animateCounter(visibilityDisplay, visKm, 0.8, 1, " km");
    } else {
      visibilityDisplay.textContent = `${visKm.toFixed(1)} km`;
    }
    if (visMeters >= 9000) visibilityStatus.textContent = "Clear visibility";
    else if (visMeters >= 4000) visibilityStatus.textContent = "Moderate haze";
    else visibilityStatus.textContent = "Low visibility";

    // UV Radiation Index
    const uvVal = typeof current.uv_index === "number" ? current.uv_index : 0;
    if (uvIndexDisplay) {
      if (window.motionEngine) {
        window.motionEngine.animateCounter(uvIndexDisplay, uvVal, 0.8, 1, "");
      } else {
        uvIndexDisplay.textContent = uvVal.toFixed(1);
      }
    }
    if (uvBar) {
      const uvPercent = Math.min(100, Math.max(0, Math.round((uvVal / 11) * 100)));
      uvBar.style.width = `${uvPercent}%`;
    }
    if (uvStatus) {
      if (uvVal <= 2.5) uvStatus.textContent = "Low exposure risk";
      else if (uvVal <= 5.5) uvStatus.textContent = "Moderate exposure";
      else if (uvVal <= 7.5) uvStatus.textContent = "High exposure — wear hat";
      else if (uvVal <= 10.5) uvStatus.textContent = "Very high risk — seek shade";
      else uvStatus.textContent = "Extreme danger — avoid sun";
    }

    // Precipitation Risk / Probability
    const precipProb =
      daily && daily.precipitation_probability_max && daily.precipitation_probability_max[0] !== undefined
        ? daily.precipitation_probability_max[0]
        : hourly && hourly.precipitation_probability && hourly.precipitation_probability[0] !== undefined
        ? hourly.precipitation_probability[0]
        : 0;

    if (precipChanceDisplay) {
      if (window.motionEngine) {
        window.motionEngine.animateCounter(precipChanceDisplay, precipProb, 0.8, 0, "%");
      } else {
        precipChanceDisplay.textContent = `${precipProb}%`;
      }
    }
    if (precipBar) {
      precipBar.style.width = `${Math.min(100, Math.max(0, precipProb))}%`;
    }
    if (precipStatus) {
      if (precipProb <= 15) precipStatus.textContent = "Dry conditions";
      else if (precipProb <= 40) precipStatus.textContent = "Slight chance of rain";
      else if (precipProb <= 70) precipStatus.textContent = "Rain likely today";
      else precipStatus.textContent = "High risk of downpour";
    }
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

    // Visual shake feedback on the inputs
    const inputsToShake = [dashboardCityInput, cityInput, modalSearchInput].filter(Boolean);
    inputsToShake.forEach((inp) => {
      const parent = inp.closest(".search-input-group") || inp.closest(".frame-search-input-group") || inp;
      parent.classList.add("input-shake");
      setTimeout(() => parent.classList.remove("input-shake"), 500);
    });

    if (searchModal && !searchModal.classList.contains("hidden") && modalSearchDropdown) {
      modalSearchDropdown.innerHTML = `<div class="modal-dropdown-placeholder" style="color: #ef4444;">${escapeHtml(message)}</div>`;
    }
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

  // --- Geolocation (GPS) Handlers ---
  function handleCurrentLocation() {
    if (!navigator.geolocation) {
      showError("Geolocation is not supported by your browser.");
      return;
    }

    showLoading();
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const reverseUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
          let cityName = "Current Location";
          let countryCode = "";
          try {
            const revRes = await fetch(reverseUrl);
            if (revRes.ok) {
              const revData = await revRes.json();
              cityName = revData.city || revData.locality || revData.principalSubdivision || "Current Location";
              countryCode = revData.countryCode || "";
            }
          } catch (e) {
            console.warn("Reverse geocode fallback:", e);
          }

          const locationData = {
            name: cityName,
            country: countryCode,
            country_code: countryCode,
            countryCode: countryCode,
            latitude,
            longitude,
            timezone: "auto"
          };

          await executeSearchWithCoords(latitude, longitude, locationData);
        } catch (err) {
          showError("Could not retrieve weather for your current position.");
        } finally {
          hideLoading();
        }
      },
      (err) => {
        hideLoading();
        showError(err.message || "Location permission was denied or unavailable.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  if (navGeoBtn) navGeoBtn.addEventListener("click", handleCurrentLocation);
  if (heroGeoBtn) heroGeoBtn.addEventListener("click", handleCurrentLocation);

  const ctaSearchBtn = document.getElementById("cta-search-btn");
  const ctaGeoBtn = document.getElementById("cta-geo-btn");
  if (ctaSearchBtn) {
    ctaSearchBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (cityInput) {
        setTimeout(() => {
          cityInput.focus();
          cityInput.select();
        }, 300);
      }
    });
  }
  if (ctaGeoBtn) {
    ctaGeoBtn.addEventListener("click", handleCurrentLocation);
  }

  // --- Keyboard Shortcuts (⌘K, Ctrl+K, /) ---
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearchModal();
    }
  });

  // --- Initial Clean Landing Page Standby State (Does NOT auto-fetch weather without user searching) ---
  function initStandbyLandingState() {
    // 1. Ensure landing page starts at the top
    window.scrollTo({ top: 0, behavior: "instant" });

    // 2. Set scenic artwork to calm night mode
    updateSceneryAndTheme(0, "Clear");

    // 3. Keep 3D globe centered in the Hero Section
    if (window.threeAtmosphere) {
      window.threeAtmosphere.repositionForWelcome();
    }

    // 4. Live local system clock ticking
    function updateLiveSystemClock() {
      if (!localTimeDisplay) return;
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      localTimeDisplay.textContent = `${formattedHours}:${minutes} ${ampm} (Local)`;
    }
    updateLiveSystemClock();
    setInterval(updateLiveSystemClock, 30000);

    // 5. Standby labels in hero scenery card
    if (cityNameDisplay) cityNameDisplay.textContent = "Atmosphere Station";
    if (countryTag) countryTag.textContent = "STANDBY";
    if (temperatureDisplay) temperatureDisplay.textContent = "--";
    if (descriptionDisplay) descriptionDisplay.textContent = "Standby Mode · Search any city or click a chip above";
    if (feelsLikeDisplay) feelsLikeDisplay.textContent = "--°";
    if (dayHighLowDisplay) dayHighLowDisplay.textContent = "--° / --°";
    if (heroHumidityDisplay) heroHumidityDisplay.textContent = "--%";

    // 6. Standby AI narrative ribbon
    if (summaryText) {
      summaryText.textContent = "Telemetry engine ready. Type any global city or click a quick telemetry chip above to stream 24-hour predictive spline curves.";
    }

    // 7. Standby smooth spline curve preview
    renderStandbySplineChart();

    // 8. Initialize card physics for tilt/spotlight
    if (window.motionEngine) {
      window.motionEngine.initCardPhysics();
    }

    // 9. Sync API Status Indicators if Key is Present (NEVER expose key fragments)
    const apiKey = getApiKey();
    if (apiKey) {
      const heroEyebrowText = document.getElementById("hero-eyebrow-text");
      if (heroEyebrowText) {
        heroEyebrowText.textContent = "OPENWEATHER API ACTIVE · HIGH-PRECISION CITY SEARCH";
      }
      const heroSubtitle = document.getElementById("hero-subtitle");
      if (heroSubtitle) {
        heroSubtitle.textContent = "Hyper-accurate 1-hour Catmull-Rom spline curves and orbital telemetry powered by OpenWeather API geocoding and live satellite models.";
      }
      const apiStatusLabel = document.getElementById("api-status-label");
      const apiStatusBadge = document.getElementById("api-status-badge");
      if (apiStatusLabel) {
        apiStatusLabel.textContent = "OpenWeather API Active · Direct City Search";
      }
      if (apiStatusBadge) {
        apiStatusBadge.textContent = "CONNECTED";
      }
    }
  }

  function renderStandbySplineChart() {
    if (!hourlyTimeline) return;
    const colWidth = 82;
    const hoursCount = 12;
    const totalWidth = hoursCount * colWidth;
    const graphHeight = 120;
    const graphTopPadding = 32;

    const points = [];
    let html = `<div class="hourly-columns-grid" style="min-width: ${totalWidth}px;">`;

    for (let i = 0; i < hoursCount; i++) {
      const hourStr = i === 0 ? "Now" : `+${i}h`;
      const x = i * colWidth + colWidth / 2;
      const y = graphTopPadding + 28 + Math.sin(i * 0.55) * 16;
      points.push({ x, y, temp: "--" });

      const iconSvg = getWeatherConditionSvg(i % 3, i < 6);

      html += `
        <div class="hourly-col" style="width: ${colWidth}px;">
          <span class="hourly-time">${hourStr}</span>
          <div class="hourly-icon-box">
            ${iconSvg}
          </div>
          <span class="hourly-pop"><span class="pop-dry">—</span></span>
        </div>
      `;
    }
    html += `</div>`;

    const svgPath = createSmoothSplinePath(points);
    const areaPath = createSplineAreaPath(points, graphHeight);

    let svgOverlay = `
      <svg class="hourly-graph-svg-layer" viewBox="0 0 ${totalWidth} ${graphHeight}" style="min-width: ${totalWidth}px; width: ${totalWidth}px; height: ${graphHeight}px;">
        <defs>
          <linearGradient id="standbySplineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <path d="${areaPath}" fill="url(#standbySplineGrad)" class="hourly-graph-area"/>
        <path d="${svgPath}" class="hourly-graph-path" style="stroke-dasharray: 4 4; opacity: 0.55; stroke: #38bdf8;"/>
    `;

    points.forEach((pt) => {
      svgOverlay += `
        <text x="${pt.x}" y="${pt.y - 12}" class="hourly-temp-label" style="opacity: 0.5;">${pt.temp}</text>
        <circle cx="${pt.x}" cy="${pt.y}" r="3.5" class="hourly-temp-dot" style="opacity: 0.5; fill: #0b1329; stroke: #38bdf8;"/>
      `;
    });

    svgOverlay += `</svg>`;
    hourlyTimeline.innerHTML = html + svgOverlay;
  }

  // Run clean standby setup on initial load
  initStandbyLandingState();
});
