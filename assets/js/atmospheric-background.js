/**
 * AtmosphericBackground - Premium Full-Page Animated Atmospheric Background System
 * Cinematic Futuristic Atmospheric Intelligence Interface
 * 
 * Features:
 *  - 5-layer spatial depth (radial gradient, nebula haze, stars canvas, dust motes, orbital SVG arcs)
 *  - Live weather-responsive atmospheric states (Clear, Partly Cloudy, Cloudy, Rain, Thunderstorm, Fog, Snow, Wind)
 *  - Time-of-day solar elevation engine (Dawn, Day, Sunset, Night) with physical celestial arc positioning
 *  - High-performance 60fps 2D Canvas for micro-twinkling stars, airborne humidity motes, and weather particles
 *  - Rare, realistic ambient thunderstorm lightning discharge (8-20s interval) with zero UI obstruction
 *  - Damped mouse & scroll parallax physics (auto-disabled on mobile / prefers-reduced-motion)
 */

class AtmosphericBackground {
  constructor() {
    this.root = document.getElementById('atmospheric-background');
    if (!this.root) return;

    this.canvas = document.getElementById('atmos-particles-canvas');
    this.sunGlow = document.getElementById('atmos-sun-glow');
    this.hazeLayer = document.getElementById('atmos-layer-haze');
    this.orbitalLayer = document.getElementById('atmos-layer-orbital');
    this.stormFlash = document.getElementById('atmos-storm-flash');

    this.ctx = this.canvas ? this.canvas.getContext('2d', { alpha: true }) : null;

    this.isMobile = window.innerWidth <= 768;
    this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Particle pools
    this.stars = [];
    this.dustMotes = [];
    this.weatherParticles = [];

    // System States
    this.weatherMode = 'clear';
    this.todMode = 'day';
    this.sunProgress = 0.5;
    this.windSpeed = 10;
    this.isDay = true;

    // Physics & Interaction tracking
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Lightning flash state
    this.lightningTimer = null;
    this.lightningOpacity = 0;

    // Initialize subsystems
    this.initCanvas();
    this.initParticles();
    this.bindEvents();
    this.setInitialState();
    this.startAnimationLoop();
    this.startLightningScheduler();
  }

  initCanvas() {
    if (!this.canvas || !this.ctx) return;
    this.resizeCanvas();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    if (this.ctx) {
      this.ctx.scale(this.dpr, this.dpr);
    }
  }

  initParticles() {
    const starCount = this.isMobile ? 55 : 110;
    const dustCount = this.isMobile ? 20 : 42;

    this.stars = [];
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * (this.width || window.innerWidth),
        y: Math.random() * (this.height || window.innerHeight),
        radius: Math.random() * 1.2 + 0.6,
        baseAlpha: Math.random() * 0.55 + 0.25,
        twinkleSpeed: Math.random() * 0.025 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.03
      });
    }

    this.dustMotes = [];
    for (let i = 0; i < dustCount; i++) {
      this.dustMotes.push({
        x: Math.random() * (this.width || window.innerWidth),
        y: Math.random() * (this.height || window.innerHeight),
        radius: Math.random() * 2.2 + 1.2,
        alpha: Math.random() * 0.08 + 0.03,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.15 - 0.05,
        phase: Math.random() * Math.PI * 2
      });
    }

    this.syncWeatherParticles();
  }

  syncWeatherParticles() {
    this.weatherParticles = [];

    if (this.weatherMode === 'rain' || this.weatherMode === 'thunderstorm') {
      const streakCount = this.isMobile ? 25 : 55;
      for (let i = 0; i < streakCount; i++) {
        this.weatherParticles.push({
          type: 'rain',
          x: Math.random() * (this.width || window.innerWidth),
          y: Math.random() * (this.height || window.innerHeight),
          len: Math.random() * 18 + 14,
          speed: Math.random() * 8 + 11,
          alpha: Math.random() * 0.22 + 0.08
        });
      }
    } else if (this.weatherMode === 'snow') {
      const flakeCount = this.isMobile ? 22 : 45;
      for (let i = 0; i < flakeCount; i++) {
        this.weatherParticles.push({
          type: 'snow',
          x: Math.random() * (this.width || window.innerWidth),
          y: Math.random() * (this.height || window.innerHeight),
          radius: Math.random() * 1.8 + 1.0,
          speed: Math.random() * 0.8 + 0.6,
          swing: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.35 + 0.15
        });
      }
    } else if (this.weatherMode === 'fog') {
      const fogCount = this.isMobile ? 6 : 12;
      for (let i = 0; i < fogCount; i++) {
        this.weatherParticles.push({
          type: 'fog',
          x: Math.random() * (this.width || window.innerWidth),
          y: Math.random() * (this.height || window.innerHeight),
          radius: Math.random() * 120 + 80,
          speed: Math.random() * 0.15 + 0.05,
          alpha: Math.random() * 0.07 + 0.02
        });
      }
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
      this.resizeCanvas();
      this.initParticles();
    }, { passive: true });

    // Subtle Mouse Parallax (Disabled on touch / mobile)
    if (!this.isMobile && window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', (e) => {
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        this.mouse.targetX = (e.clientX - halfW) / halfW; // -1 to +1
        this.mouse.targetY = (e.clientY - halfH) / halfH; // -1 to +1
      }, { passive: true });

      window.addEventListener('pointerleave', () => {
        this.mouse.targetX = 0;
        this.mouse.targetY = 0;
      });
    }

    // Subtle Scroll Parallax
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY || window.pageYOffset || 0;
    }, { passive: true });

    // Media query listener for reduced motion
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReduced = e.matches;
    });
  }

  setInitialState() {
    this.todMode = 'day';
    this.weatherMode = 'clear';
    this.sunProgress = 0.55;
    this.isDay = true;
    this.applyAtmosphericState();
  }

  /**
   * Main interface hook called by AtmosphereApp / AtmosphereUIController
   * @param {Object} weatherData - Open-Meteo weather payload
   * @param {string} locationName - Name of current city
   * @param {string} timezone - Station timezone
   */
  update(weatherData, locationName = '', timezone = '') {
    if (!weatherData || !weatherData.current) return;
    const current = weatherData.current;
    const daily = weatherData.daily;

    this.isDay = current.is_day === 1;
    this.windSpeed = current.wind_speed_10m || 10;

    // 1. Determine Time-of-Day & Sun Arc Position
    this.calculateSolarTelemetry(current, daily);

    // 2. Map WMO Weather Code
    this.weatherMode = this.mapWmoToWeatherState(current.weather_code);

    // 3. Apply CSS custom variables and theme classes
    this.applyAtmosphericState();

    // 4. Update canvas particle systems
    this.syncWeatherParticles();
  }

  mapWmoToWeatherState(wmoCode) {
    if ([95, 96, 99].includes(wmoCode)) return 'thunderstorm';
    if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(wmoCode)) return 'rain';
    if ([66, 67, 71, 73, 75, 77, 85, 86].includes(wmoCode)) return 'snow';
    if ([45, 48].includes(wmoCode)) return 'fog';
    if (wmoCode === 3) return 'cloudy';
    if (wmoCode === 2) return 'partly-cloudy';
    return 'clear';
  }

  calculateSolarTelemetry(current, daily) {
    if (!daily || !daily.sunrise || !daily.sunset) {
      this.todMode = this.isDay ? 'day' : 'night';
      this.sunProgress = this.isDay ? 0.5 : 0.85;
      return;
    }

    try {
      const sunriseTime = new Date(daily.sunrise[0]).getTime();
      const sunsetTime = new Date(daily.sunset[0]).getTime();
      const curTime = current.time ? new Date(current.time).getTime() : Date.now();

      const dayDuration = Math.max(sunsetTime - sunriseTime, 1000);
      const fortyFiveMins = 45 * 60 * 1000;

      // Detect 4 atmospheric TOD phases
      if (Math.abs(curTime - sunriseTime) <= fortyFiveMins) {
        this.todMode = 'dawn';
      } else if (Math.abs(curTime - sunsetTime) <= fortyFiveMins) {
        this.todMode = 'sunset';
      } else if (curTime > sunriseTime && curTime < sunsetTime) {
        this.todMode = 'day';
      } else {
        this.todMode = 'night';
      }

      // Compute solar progress arc (0.0 at sunrise, 0.5 at zenith noon, 1.0 at sunset)
      if (curTime >= sunriseTime && curTime <= sunsetTime) {
        this.sunProgress = Math.max(0.05, Math.min(0.95, (curTime - sunriseTime) / dayDuration));
      } else {
        // Night phase
        this.sunProgress = 0.5; // Rest position
      }
    } catch (err) {
      this.todMode = this.isDay ? 'day' : 'night';
      this.sunProgress = 0.5;
    }
  }

  applyAtmosphericState() {
    if (!this.root) return;

    // Apply clean classes: tod-* and weather-*
    this.root.className = `atmospheric-background-system tod-${this.todMode} weather-${this.weatherMode}`;

    // Calculate natural parabolic celestial position for solar/lunar ambient bloom
    // X goes from 15% (East horizon) to 85% (West horizon)
    const sunX = Math.round(15 + this.sunProgress * 70);
    // Y forms a parabolic arc: highest elevation (noon) around 18%, near horizon around 55%
    const sunElevation = Math.sin(this.sunProgress * Math.PI);
    const sunY = Math.round(55 - sunElevation * 38);

    const sunOpacity = this.todMode === 'night'
      ? (this.weatherMode === 'clear' ? '0.12' : '0.05')
      : (this.weatherMode === 'cloudy' ? '0.08' : (this.weatherMode === 'rain' ? '0.05' : '0.22'));

    this.root.style.setProperty('--atmos-sun-x', `${sunX}%`);
    this.root.style.setProperty('--atmos-sun-y', `${sunY}%`);
    this.root.style.setProperty('--atmos-sun-opacity', sunOpacity);
  }

  startLightningScheduler() {
    const triggerLightning = () => {
      if (this.weatherMode === 'thunderstorm') {
        this.executeLightningFlash();
      }

      // Random interval between 8 and 20 seconds
      const nextDelay = Math.random() * 12000 + 8000;
      this.lightningTimer = setTimeout(triggerLightning, nextDelay);
    };

    const initialDelay = Math.random() * 6000 + 4000;
    this.lightningTimer = setTimeout(triggerLightning, initialDelay);
  }

  executeLightningFlash() {
    if (this.prefersReduced || !this.root) return;

    // Dual-burst illumination sequence
    // 1. Initial micro-discharge
    this.root.style.setProperty('--atmos-storm-flash-opacity', '0.18');
    this.lightningOpacity = 0.25;

    setTimeout(() => {
      this.root.style.setProperty('--atmos-storm-flash-opacity', '0.04');
      this.lightningOpacity = 0.05;

      // 2. Primary atmospheric discharge
      setTimeout(() => {
        this.root.style.setProperty('--atmos-storm-flash-opacity', '0.28');
        this.lightningOpacity = 0.38;

        // 3. Smooth exponential decay
        setTimeout(() => {
          this.root.style.setProperty('--atmos-storm-flash-opacity', '0');
          this.lightningOpacity = 0;
        }, 140);
      }, 50);
    }, 60);
  }

  startAnimationLoop() {
    const loop = () => {
      if (!this.prefersReduced) {
        this.renderFrame();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  renderFrame() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Smooth damped mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Apply subtle parallax to background layers via CSS transforms
    if (!this.isMobile && !this.prefersReduced) {
      if (this.hazeLayer) {
        const hazeX = (this.mouse.x * 3).toFixed(1);
        const hazeY = (this.mouse.y * 2.5 - this.scrollY * 0.08).toFixed(1);
        this.hazeLayer.style.transform = `translate3d(${hazeX}px, ${hazeY}px, 0)`;
      }
      if (this.orbitalLayer) {
        const orbX = (this.mouse.x * 6).toFixed(1);
        const orbY = (this.mouse.y * 5 - this.scrollY * 0.14).toFixed(1);
        this.orbitalLayer.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
      }
    }

    ctx.clearRect(0, 0, w, h);

    // Subtle lightning ambient wash on canvas
    if (this.lightningOpacity > 0.01) {
      ctx.fillStyle = `rgba(186, 230, 253, ${this.lightningOpacity * 0.4})`;
      ctx.fillRect(0, 0, w, h);
    }

    // 1. Draw Stars Layer
    const starParallaxX = this.mouse.x * 2.2;
    const starParallaxY = this.mouse.y * 2.2 - (this.scrollY * 0.05) % h;
    const starVisibilityMultiplier = (this.todMode === 'night' || this.todMode === 'dawn') ? 1.0 : 0.45;

    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      s.twinklePhase += s.twinkleSpeed;
      s.x += s.vx;
      s.y += s.vy;

      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;

      const drawX = (s.x + starParallaxX + w) % w;
      const drawY = (s.y + starParallaxY + h) % h;

      const twinkle = (Math.sin(s.twinklePhase) + 1) * 0.5; // 0 to 1
      const alpha = (s.baseAlpha * 0.6 + twinkle * 0.4) * starVisibilityMultiplier;

      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.beginPath();
      ctx.arc(drawX, drawY, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Draw Airborne Microscopic Humidity / Dust Motes
    const dustSpeedFactor = Math.min(Math.max(this.windSpeed / 10, 0.7), 2.5);
    const dustColor = this.todMode === 'day' ? 'rgba(254, 240, 138, ' : 'rgba(186, 230, 253, ';

    for (let i = 0; i < this.dustMotes.length; i++) {
      const d = this.dustMotes[i];
      d.phase += 0.02;
      d.x += d.vx * dustSpeedFactor;
      d.y += d.vy * dustSpeedFactor + Math.sin(d.phase) * 0.15;

      if (d.x < 0) d.x = w;
      if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h;
      if (d.y > h) d.y = 0;

      const drawX = (d.x + this.mouse.x * 1.5 + w) % w;
      const drawY = (d.y + this.mouse.y * 1.5 - (this.scrollY * 0.07) % h + h) % h;

      ctx.globalAlpha = d.alpha;
      ctx.fillStyle = `${dustColor}${d.alpha})`;
      ctx.beginPath();
      ctx.arc(drawX, drawY, d.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Draw Active Weather Particles (Rain / Snow / Fog)
    if (this.weatherParticles.length > 0) {
      for (let i = 0; i < this.weatherParticles.length; i++) {
        const p = this.weatherParticles[i];

        if (p.type === 'rain') {
          p.y += p.speed;
          p.x += p.speed * 0.35; // Diagonal rain flow

          if (p.y > h) {
            p.y = -p.len;
            p.x = Math.random() * w;
          }
          if (p.x > w) p.x = 0;

          ctx.globalAlpha = p.alpha;
          ctx.strokeStyle = 'rgba(186, 230, 253, 0.65)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.len * 0.35, p.y + p.len);
          ctx.stroke();
        } else if (p.type === 'snow') {
          p.phase += p.swing;
          p.y += p.speed;
          p.x += Math.sin(p.phase) * 0.6;

          if (p.y > h) {
            p.y = -5;
            p.x = Math.random() * w;
          }

          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'fog') {
          p.x += p.speed;
          if (p.x - p.radius > w) p.x = -p.radius;

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `rgba(203, 213, 225, ${p.alpha})`);
          grad.addColorStop(1, 'rgba(203, 213, 225, 0)');

          ctx.globalAlpha = 1;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.globalAlpha = 1;
  }

  destroy() {
    if (this.lightningTimer) {
      clearTimeout(this.lightningTimer);
    }
  }
}

// Attach globally
window.AtmosphericBackground = AtmosphericBackground;
