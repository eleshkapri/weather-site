/**
 * ThreeAtmosphere - WebGL 3D Atmospheric Background Engine
 * Powered by Three.js
 * Renders interactive 3D celestial particle atmosphere, mouse parallax,
 * and dynamic weather simulations (Sun flare, Rain streaks, Starlight galaxy, Storm lightning).
 */
class ThreeAtmosphere {
  constructor(canvasId = 'webgl-atmosphere-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas || typeof THREE === 'undefined') {
      console.warn('[ThreeAtmosphere] WebGL canvas or Three.js not available.');
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 80;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Mouse tracking with smooth interpolation
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.clock = new THREE.Clock();

    // Weather state
    this.currentWeather = { isDay: 0, condition: 'Clear' };

    this.initLighting();
    this.initAmbientParticles();
    this.initRainSystem();
    this.initSolarAura();
    this.bindEvents();
    this.animate();
  }

  initLighting() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);

    // Dynamic lightning point light
    this.lightningLight = new THREE.PointLight(0x90d4ff, 0, 300);
    this.lightningLight.position.set(0, 40, 30);
    this.scene.add(this.lightningLight);
  }

  initAmbientParticles() {
    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 220;
      positions[i3 + 1] = (Math.random() - 0.5) * 140;
      positions[i3 + 2] = (Math.random() - 0.5) * 120;

      scales[i] = Math.random() * 2.5 + 1.0;

      // Initial cool starlight tint
      colors[i3] = 0.75 + Math.random() * 0.25;
      colors[i3 + 1] = 0.85 + Math.random() * 0.15;
      colors[i3 + 2] = 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft glowing particle shader/material
    const particleTexture = this.createParticleTexture();
    this.ambientMaterial = new THREE.PointsMaterial({
      size: 3.2,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.ambientParticles = new THREE.Points(geometry, this.ambientMaterial);
    this.scene.add(this.ambientParticles);
  }

  initSolarAura() {
    const count = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 12 + Math.random() * 24;
      positions[i3] = Math.cos(angle) * radius + 45; // upper right position
      positions[i3 + 1] = Math.sin(angle) * radius + 25;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;

      colors[i3] = 1.0;
      colors[i3 + 1] = 0.78 + Math.random() * 0.2;
      colors[i3 + 2] = 0.2 + Math.random() * 0.3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.solarMaterial = new THREE.PointsMaterial({
      size: 4.5,
      map: this.createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.solarParticles = new THREE.Points(geometry, this.solarMaterial);
    this.scene.add(this.solarParticles);
  }

  initRainSystem() {
    const count = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = Math.random() * 140 - 70;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      velocities[i] = 1.6 + Math.random() * 1.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.rainMaterial = new THREE.PointsMaterial({
      size: 2.2,
      color: 0xbae6fd,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.rainParticles = new THREE.Points(geometry, this.rainMaterial);
    this.rainVelocities = velocities;
    this.scene.add(this.rainParticles);
  }

  createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.75)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }

  bindEvents() {
    window.addEventListener('pointermove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  setWeatherTheme(isDay, conditionMain) {
    this.currentWeather = { isDay, condition: conditionMain };
    const isNight = isDay === 0;
    const isRain = conditionMain === 'Rain' || conditionMain === 'Drizzle';
    const isStorm = conditionMain === 'Thunderstorm';
    const isCloudy = conditionMain === 'Clouds' || conditionMain === 'Mist';

    if (typeof gsap !== 'undefined') {
      gsap.to(this.solarMaterial, {
        opacity: (!isNight && !isRain && !isStorm) ? (isCloudy ? 0.35 : 0.85) : 0,
        duration: 1.2
      });

      gsap.to(this.rainMaterial, {
        opacity: (isRain || isStorm) ? 0.8 : 0,
        duration: 0.8
      });

      const targetAmbientColor = isNight ? (isStorm ? 0x0a1020 : 0x1a2644) : 0x4a6a99;
      gsap.to(this.ambientLight.color, {
        r: ((targetAmbientColor >> 16) & 255) / 255,
        g: ((targetAmbientColor >> 8) & 255) / 255,
        b: (targetAmbientColor & 255) / 255,
        duration: 1.5
      });
    }
  }

  triggerLightningFlash() {
    if (this.lightningLight && typeof gsap !== 'undefined') {
      const tl = gsap.timeline();
      tl.to(this.lightningLight, { intensity: 3.5, duration: 0.06 })
        .to(this.lightningLight, { intensity: 0.4, duration: 0.05 })
        .to(this.lightningLight, { intensity: 4.2, duration: 0.08 })
        .to(this.lightningLight, { intensity: 0, duration: 0.35, ease: 'power2.out' });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.04;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.04;

    this.camera.position.x = this.mouse.x * 7;
    this.camera.position.y = this.mouse.y * 5;
    this.camera.lookAt(0, 0, 0);

    if (this.ambientParticles) {
      this.ambientParticles.rotation.y = elapsedTime * 0.012;
      this.ambientParticles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;
    }

    if (this.solarParticles && this.solarMaterial.opacity > 0.01) {
      this.solarParticles.rotation.z = elapsedTime * 0.035;
      const scale = 1.0 + Math.sin(elapsedTime * 1.5) * 0.08;
      this.solarParticles.scale.set(scale, scale, 1);
    }

    if (this.rainParticles && this.rainMaterial.opacity > 0.01) {
      const positions = this.rainParticles.geometry.attributes.position.array;
      for (let i = 0; i < this.rainVelocities.length; i++) {
        const i3 = i * 3;
        positions[i3 + 1] -= this.rainVelocities[i];
        positions[i3] += 0.15;

        if (positions[i3 + 1] < -70) {
          positions[i3 + 1] = 70;
          positions[i3] = (Math.random() - 0.5) * 200;
        }
      }
      this.rainParticles.geometry.attributes.position.needsUpdate = true;

      if (this.currentWeather.condition === 'Thunderstorm' && Math.random() < 0.006) {
        this.triggerLightningFlash();
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.threeAtmosphere = null;
document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE !== 'undefined') {
    window.threeAtmosphere = new ThreeAtmosphere('webgl-atmosphere-canvas');
  }
});
