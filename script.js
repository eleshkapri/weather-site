document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Elements ---
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");
    const loadingSpinner = document.getElementById("loading-spinner");
    const bgContainer = document.getElementById("bg-container");
  
    // Data Elements
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const weatherIcon = document.getElementById("weather-icon");
    const feelsLikeDisplay = document.getElementById("feels-like");
    const humidityDisplay = document.getElementById("humidity");
    const windSpeedDisplay = document.getElementById("wind-speed");
  
    // API Key
    const API_KEY = "5deead9ad15ea47dc8fff790537c8568";
  
    // Initialize
    updateBackground("Default");

    // --- Event Listeners ---
    getWeatherBtn.addEventListener("click", handleSearch);
    
    cityInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleSearch();
    });
  
    // --- Main Logic ---
    async function handleSearch() {
        const city = cityInput.value.trim();
        if (!city) return;

        // 1. FORCE RESET: Clear previous data immediately
        resetUI();

        // Validate minimum length (prevent single character accidental searches)
        if (city.length < 2) {
            showError("Please enter at least 2 characters.");
            return;
        }
        
        // 2. Show Loading
        showLoading();

        try {
            // Step 1: Get Location (City, State, Country)
            const locationData = await fetchCoordinates(city);
            
            // Step 2: Get Weather
            const weatherData = await fetchWeatherByCoords(locationData.lat, locationData.lon);
            
            // Step 3: Display Data
            displayWeatherData(weatherData, locationData);
            
        } catch (error) {
            console.error(error);
            showError(error.message);
        } finally {
            hideLoading();
        }
    }

    // --- Helpers ---
    
    function resetUI() {
        // Hide the card
        weatherInfo.classList.add("hidden");
        errorMessage.classList.add("hidden");
        
        // Wipe all text (Crucial for fixing the "stale data" bug)
        cityNameDisplay.textContent = "";
        temperatureDisplay.textContent = "";
        descriptionDisplay.textContent = "";
        weatherIcon.src = "";
    }

    async function fetchCoordinates(city) {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Failed to fetch location.");
        
        const data = await response.json();
        if (data.length === 0) throw new Error("City not found. Please try again.");

        const searchLower = city.toLowerCase();
        // Priority 1: Exact match (e.g. "Delhi" === "Delhi")
        const exactMatch = data.find(item => item.name.toLowerCase() === searchLower);
        if (exactMatch) return exactMatch;

        // Priority 2: City name starts with search term
        const startsWithMatch = data.find(item => item.name.toLowerCase().startsWith(searchLower));
        if (startsWithMatch) return startsWithMatch;

        return data[0];
    }
  
    async function fetchWeatherByCoords(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather.");
        return await response.json();
    }
  
    function displayWeatherData(weatherData, locationData) {
        const { main, weather, wind } = weatherData;
        const { name, state, country } = locationData;
        
        // Format location string
        const locationString = state 
            ? `${name}, ${state}, ${country}` 
            : `${name}, ${country}`;

        cityNameDisplay.textContent = locationString;
        temperatureDisplay.textContent = `${Math.round(main.temp)}°C`;
        descriptionDisplay.textContent = weather[0].description;
        feelsLikeDisplay.textContent = `${Math.round(main.feels_like)}°C`;
        humidityDisplay.textContent = `${main.humidity}%`;
        windSpeedDisplay.textContent = `${wind.speed} m/s`;
  
        // Set Icon
        const iconCode = weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
        updateBackground(weather[0].main);
        
        // Only show the card NOW, after data is ready
        weatherInfo.classList.remove("hidden");
    }

    function updateBackground(condition) {
        let imageUrl = 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2000&auto=format&fit=crop';
        
        switch (condition) {
            case 'Clear': imageUrl = 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2000&auto=format&fit=crop'; break;
            case 'Clouds': imageUrl = 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000&auto=format&fit=crop'; break;
            case 'Rain': 
            case 'Drizzle': imageUrl = 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2000&auto=format&fit=crop'; break;
            case 'Thunderstorm': imageUrl = 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2000&auto=format&fit=crop'; break;
            case 'Snow': imageUrl = 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?q=80&w=2000&auto=format&fit=crop'; break;
            case 'Mist':
            case 'Fog': imageUrl = 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2000&auto=format&fit=crop'; break;
        }

        const newLayer = document.createElement('div');
        newLayer.classList.add('bg-layer');
        newLayer.style.backgroundImage = `url('${imageUrl}')`;

        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            bgContainer.appendChild(newLayer);
            void newLayer.offsetWidth; 
            newLayer.classList.add('active');
            setTimeout(() => {
                const oldLayers = document.querySelectorAll('.bg-layer:not(:last-child)');
                oldLayers.forEach(layer => layer.remove());
            }, 1000);
        };
    }
  
    function showError(message) {
        // Ensure the weather card is hidden
        weatherInfo.classList.add("hidden");
        
        errorMessage.textContent = message;
        errorMessage.classList.remove("hidden");
    }
  
    function showLoading() {
        loadingSpinner.classList.remove("hidden");
    }
  
    function hideLoading() {
        loadingSpinner.classList.add("hidden");
    }
});