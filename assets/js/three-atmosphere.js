/**
 * ThreeAtmosphere - Next-Gen WebGL 3D Atmosphere & Holographic Globe Engine
 * Inspired by Qronos & SalesHookAI high-tech aesthetics
 * Features:
 *  - 3D Holographic Weather Wireframe Globe with coordinate rings & rotating mesh
 *  - Orbiting Satellite Telemetry Beacon with radiant trail
 *  - Crisp Stardust & Solar Corona particles (sharp, calibrated sizing; zero blurry bokeh discs)
 *  - High-speed 3D Rain Streaks & Dynamic Lightning illumination discharges
 *  - Fluid mouse parallax with damped lerp physics
 */

class ThreeAtmosphere {
  constructor(canvasId = 'webgl-atmosphere-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas || typeof THREE === 'undefined') {
      console.warn('[ThreeAtmosphere] WebGL canvas or Three.js not available.');
      return;
    }

    // 1. Scene & Camera Setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 110);

    // 2. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Coordinate & Mouse Tracking
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.clock = new THREE.Clock();

    // 4. Weather State
    this.currentWeather = { isDay: 0, condition: 'Clear' };

    // 5. Initialize Subsystems
    this.initLighting();
    this.initHolographicGlobe();
    this.initSharpStardust();
    this.initRainVectorSystem();
    this.initSolarCorona();
    this.bindEvents();
    this.animate();
  }

  // --- Lighting Setup ---
  initLighting() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(this.ambientLight);

    // Directional light for subtle 3D globe depth
    this.dirLight = new THREE.DirectionalLight(0x6366f1, 1.2);
    this.dirLight.position.set(40, 50, 60);
    this.scene.add(this.dirLight);

    // Storm lightning burst light
    this.lightningLight = new THREE.PointLight(0xa5f3fc, 0, 400);
    this.lightningLight.position.set(0, 40, 50);
    this.scene.add(this.lightningLight);
  }

  // --- 3D Holographic Weather Globe (High-Tech Earth/Atmosphere Mesh) ---
  initHolographicGlobe() {
    this.globeGroup = new THREE.Group();
    // Positioned in the upper-right quadrant matching reference screenshot
    const isMobile = window.innerWidth < 768;
    const initialX = isMobile ? 0 : 90;
    const initialY = isMobile ? 38 : 42;
    const initialZ = isMobile ? -35 : -38;
    this.globeGroup.position.set(initialX, initialY, initialZ);
    this.globeGroup.scale.set(isMobile ? 0.32 : 0.42, isMobile ? 0.32 : 0.42, isMobile ? 0.32 : 0.42);

    const radius = 13;

    // 1. Dotted Matrix Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(radius, 4);
    const sphereMat = new THREE.PointsMaterial({
      size: 1.6,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.globeDots = new THREE.Points(sphereGeo, sphereMat);
    this.globeGroup.add(this.globeDots);

    // 2. Geometric Wireframe Lattice
    const wireGeo = new THREE.IcosahedronGeometry(radius, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.24
    });
    this.globeWire = new THREE.Mesh(wireGeo, wireMat);
    this.globeGroup.add(this.globeWire);

    // 3. Equatorial & Coordinate Rings
    const ringGeo = new THREE.RingGeometry(radius * 1.35, radius * 1.37, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.42
    });
    this.globeRing = new THREE.Mesh(ringGeo, ringMat);
    this.globeRing.rotation.x = Math.PI * 0.45;
    this.globeRing.rotation.y = Math.PI * 0.15;
    this.globeGroup.add(this.globeRing);

    // Second tilted ring
    const ring2Geo = new THREE.RingGeometry(radius * 1.15, radius * 1.16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.32
    });
    this.globeRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    this.globeRing2.rotation.x = -Math.PI * 0.3;
    this.globeRing2.rotation.y = Math.PI * 0.25;
    this.globeGroup.add(this.globeRing2);

    // 4. Orbiting Satellite Telemetry Beacon
    const satGeo = new THREE.SphereGeometry(0.85, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: false
    });
    this.satellite = new THREE.Mesh(satGeo, satMat);
    this.satelliteOrbitRadius = radius * 1.45;
    this.globeGroup.add(this.satellite);

    this.scene.add(this.globeGroup);
  }

  // --- Crisp Stardust Constellations (Replaces Blurry Bokeh!) ---
  initSharpStardust() {
    const count = 550;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread wide and placed safely behind camera focal plane
      positions[i3] = (Math.random() - 0.5) * 260;
      positions[i3 + 1] = (Math.random() - 0.5) * 160;
      positions[i3 + 2] = -30 - Math.random() * 120; // z between -30 and -150

      // Natural celestial color tints (cool whites, soft blues, delicate gold)
      const tint = Math.random();
      if (tint > 0.6) {
        colors[i3] = 0.85; colors[i3 + 1] = 0.92; colors[i3 + 2] = 1.0;
      } else if (tint > 0.3) {
        colors[i3] = 0.7; colors[i3 + 1] = 0.8; colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 1.0; colors[i3 + 1] = 0.95; colors[i3 + 2] = 0.85;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Sharp circular point shader texture
    const crispTex = this.createSharpPointTexture();

    this.stardustMaterial = new THREE.PointsMaterial({
      size: 1.8,
      map: crispTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.stardust = new THREE.Points(geometry, this.stardustMaterial);
    this.scene.add(this.stardust);
  }

  // --- 3D Rain Vector System (Sharp Speed Lines) ---
  initRainVectorSystem() {
    const count = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 6); // 2 vertices per line streak

    this.rainLengths = new Float32Array(count);
    this.rainSpeeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      const x = (Math.random() - 0.5) * 200;
      const y = Math.random() * 160 - 80;
      const z = (Math.random() - 0.5) * 80;
      const len = 4 + Math.random() * 6;

      positions[i6] = x;
      positions[i6 + 1] = y;
      positions[i6 + 2] = z;

      positions[i6 + 3] = x - 0.4;
      positions[i6 + 4] = y - len;
      positions[i6 + 5] = z;

      this.rainLengths[i] = len;
      this.rainSpeeds[i] = 2.4 + Math.random() * 2.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.rainMaterial = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      linewidth: 1
    });

    this.rainLines = new THREE.LineSegments(geometry, this.rainMaterial);
    this.scene.add(this.rainLines);
  }

  // --- Solar Corona Rays & Halo ---
  initSolarCorona() {
    const count = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = (i / count) * Math.PI * 2;
      const r = 24 + Math.random() * 16;
      positions[i3] = Math.cos(angle) * r;
      positions[i3 + 1] = Math.sin(angle) * r;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      colors[i3] = 1.0;
      colors[i3 + 1] = 0.82 + Math.random() * 0.18;
      colors[i3 + 2] = 0.35;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.coronaMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: this.createSharpPointTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.coronaPoints = new THREE.Points(geometry, this.coronaMaterial);
    this.globeGroup.add(this.coronaPoints);
  }

  // --- Precision Sharp Point Texture (No blurry giant blobs!) ---
  createSharpPointTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Crisp concentrated center with gentle hairline glow
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 15);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.25)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 15, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }

  // --- Dynamic Weather Theme Sync ---
  setWeatherTheme(isDay, conditionMain) {
    this.currentWeather = { isDay, condition: conditionMain };
    const isNight = isDay === 0;
    const isRain = conditionMain === 'Rain' || conditionMain === 'Drizzle';
    const isStorm = conditionMain === 'Thunderstorm';
    const isSunny = !isNight && !isRain && !isStorm && conditionMain === 'Clear';

    if (typeof gsap !== 'undefined') {
      // 1. Rain streaking opacity
      gsap.to(this.rainMaterial, {
        opacity: (isRain || isStorm) ? 0.85 : 0,
        duration: 0.8
      });

      // 2. Solar corona visibility
      gsap.to(this.coronaMaterial, {
        opacity: isSunny ? 0.9 : 0,
        duration: 1.0
      });

      // 3. Globe color palette shift
      let globeColor = 0x818cf8; // default indigo
      let wireColor = 0x4f46e5;
      let ringColor = 0x38bdf8;

      if (isSunny) {
        globeColor = 0xf59e0b;
        wireColor = 0xd97706;
        ringColor = 0xfbbf24;
      } else if (isRain || isStorm) {
        globeColor = 0x0284c7;
        wireColor = 0x0369a1;
        ringColor = 0x38bdf8;
      } else if (isNight) {
        globeColor = 0x818cf8;
        wireColor = 0x4338ca;
        ringColor = 0xa855f7;
      }

      gsap.to(this.globeDots.material.color, {
        r: ((globeColor >> 16) & 255) / 255,
        g: ((globeColor >> 8) & 255) / 255,
        b: (globeColor & 255) / 255,
        duration: 1.2
      });

      gsap.to(this.globeWire.material.color, {
        r: ((wireColor >> 16) & 255) / 255,
        g: ((wireColor >> 8) & 255) / 255,
        b: (wireColor & 255) / 255,
        duration: 1.2
      });

      gsap.to(this.globeRing.material.color, {
        r: ((ringColor >> 16) & 255) / 255,
        g: ((ringColor >> 8) & 255) / 255,
        b: (ringColor & 255) / 255,
        duration: 1.2
      });

      // 4. Stardust opacity (dimmer in bright day, sparkling at night)
      gsap.to(this.stardustMaterial, {
        opacity: isNight ? 0.85 : 0.35,
        duration: 1.2
      });
    }
  }

  // --- View-aware Globe Repositioning ---

  /** Call when showing the hero/welcome screen. Globe rests in upper right quadrant. */
  repositionForWelcome() {
    if (!this.globeGroup) return;
    const isMobile = window.innerWidth < 768;
    const targetX = isMobile ? 0 : 90;
    const targetY = isMobile ? 38 : 42;
    const targetZ = isMobile ? -35 : -38;
    const targetScale = isMobile ? 0.32 : 0.42;

    if (typeof gsap !== 'undefined') {
      gsap.to(this.globeGroup.position, {
        x: targetX, y: targetY, z: targetZ,
        duration: 0.9,
        ease: 'power3.out'
      });
      gsap.to(this.globeGroup.scale, {
        x: targetScale, y: targetScale, z: targetScale,
        duration: 0.9,
        ease: 'power3.out'
      });
      // Restore dot/wire visibility with clean opacities
      if (this.globeDots) gsap.to(this.globeDots.material, { opacity: 0.65, duration: 0.8 });
      if (this.globeWire) gsap.to(this.globeWire.material, { opacity: 0.24, duration: 0.8 });
      if (this.globeRing) gsap.to(this.globeRing.material, { opacity: 0.42, duration: 0.8 });
      if (this.globeRing2) gsap.to(this.globeRing2.material, { opacity: 0.32, duration: 0.8 });
    } else {
      this.globeGroup.position.set(targetX, targetY, targetZ);
      this.globeGroup.scale.set(targetScale, targetScale, targetScale);
    }
  }

  /** Call when showing the weather dashboard. Globe stays visible in the upper right. */
  repositionForDashboard() {
    if (!this.globeGroup) return;
    const isMobile = window.innerWidth < 768;
    const targetX = isMobile ? 0 : 90;
    const targetY = isMobile ? 38 : 42;
    const targetZ = isMobile ? -35 : -38;
    const targetScale = isMobile ? 0.30 : 0.38;

    if (typeof gsap !== 'undefined') {
      gsap.to(this.globeGroup.position, {
        x: targetX,
        y: targetY,
        z: targetZ,
        duration: 1.0,
        ease: 'power3.inOut'
      });
      gsap.to(this.globeGroup.scale, {
        x: targetScale, y: targetScale, z: targetScale,
        duration: 1.0,
        ease: 'power3.inOut'
      });
      if (this.globeDots) gsap.to(this.globeDots.material, { opacity: 0.55, duration: 0.8 });
      if (this.globeWire) gsap.to(this.globeWire.material, { opacity: 0.20, duration: 0.8 });
      if (this.globeRing) gsap.to(this.globeRing.material, { opacity: 0.35, duration: 0.8 });
      if (this.globeRing2) gsap.to(this.globeRing2.material, { opacity: 0.25, duration: 0.8 });
    } else {
      this.globeGroup.position.set(targetX, targetY, targetZ);
      this.globeGroup.scale.set(targetScale, targetScale, targetScale);
    }
  }

  // --- Interactive Pointer & Window Events ---
  bindEvents() {
    window.addEventListener('pointermove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      // Reposition globe dynamically based on current screen mode
      if (this.globeGroup) {
        const dashboard = document.getElementById('weather-dashboard');
        const isDashboard = dashboard && !dashboard.classList.contains('hidden');
        if (isDashboard) {
          this.repositionForDashboard();
        } else {
          this.repositionForWelcome();
        }
      }
    });
  }

  // --- Animation Loop (60 FPS Physical Lerp) ---
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smooth Mouse Parallax (Damped Lerp)
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.camera.position.x = this.mouse.x * 6;
    this.camera.position.y = this.mouse.y * 5;
    this.camera.lookAt(0, 0, 0);

    // 2. 3D Globe Rotation & Orbit
    if (this.globeGroup) {
      this.globeGroup.rotation.y = elapsedTime * 0.12 + this.mouse.x * 0.35;
      this.globeGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15 + this.mouse.y * 0.25;

      // Coordinate ring spin
      this.globeRing.rotation.z = elapsedTime * 0.18;
      this.globeRing2.rotation.z = -elapsedTime * 0.14;

      // Satellite Orbit Telemetry
      const satAngle = elapsedTime * 0.9;
      this.satellite.position.x = Math.cos(satAngle) * this.satelliteOrbitRadius;
      this.satellite.position.z = Math.sin(satAngle) * this.satelliteOrbitRadius;
      this.satellite.position.y = Math.sin(satAngle * 1.5) * 5;

      // Solar Corona rotation
      if (this.coronaPoints) {
        this.coronaPoints.rotation.z = -elapsedTime * 0.08;
      }
    }

    // 3. Stardust Subtle Drift
    if (this.stardust) {
      this.stardust.rotation.y = elapsedTime * 0.015;
    }

    // 4. Rain Velocity Physics
    if (this.rainMaterial.opacity > 0.05 && this.rainLines) {
      const positions = this.rainLines.geometry.attributes.position.array;
      const count = positions.length / 6;

      for (let i = 0; i < count; i++) {
        const i6 = i * 6;
        const speed = this.rainSpeeds[i];

        positions[i6 + 1] -= speed;
        positions[i6 + 4] -= speed;

        // Reset when fallen below screen
        if (positions[i6 + 1] < -80) {
          positions[i6 + 1] = 80;
          positions[i6 + 4] = 80 - this.rainLengths[i];
        }
      }
      this.rainLines.geometry.attributes.position.needsUpdate = true;
    }

    // 5. Dynamic Storm Lightning Burst
    if (this.currentWeather.condition === 'Thunderstorm' && Math.random() < 0.015) {
      this.triggerLightningBurst();
    }

    this.renderer.render(this.scene, this.camera);
  }

  triggerLightningBurst() {
    if (!this.lightningLight) return;
    this.lightningLight.intensity = 4.5 + Math.random() * 3.5;
    this.ambientLight.intensity = 2.2;

    setTimeout(() => {
      this.lightningLight.intensity = 0;
      this.ambientLight.intensity = 0.9;
    }, 80 + Math.random() * 120);
  }
}

// Instantiate on window
window.addEventListener('DOMContentLoaded', () => {
  window.threeAtmosphere = new ThreeAtmosphere();
});
