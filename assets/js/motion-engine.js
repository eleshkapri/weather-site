/**
 * MotionEngine - Advanced GSAP & Lenis Motion Controller
 * Orchestrates:
 *  - Buttery smooth inertia scroll (Lenis)
 *  - Staggered dashboard reveals with physical cubic-bezier easing
 *  - Kinetic text split & stagger choreography (SalesHookAI & Apple style)
 *  - Dynamic interactive view tabs with sliding pill physics
 *  - Animated numerical counters with easing & custom formatting
 *  - 3D magnetic card tilt with dynamic pointer spotlight
 */

class MotionEngine {
  constructor() {
    this.lenis = null;
    this.initSmoothScroll();
    this.initNavbarScrollMotion();
    this.initCardPhysics();
    this.initDashboardTabs();
    this.initHeroScrollStackingAnimation();
  }

  // --- Lenis Inertial Smooth Scroll ---
  initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
      });

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          this.lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => {
          this.lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    }
  }

  // --- Smart Capsule Navbar Scroll Motion & ScrollSpy ---
  initNavbarScrollMotion() {
    const nav = document.querySelector('.cinematic-top-nav') || document.querySelector('#cinematic-nav');
    if (!nav) return;

    let lastScrollY = window.scrollY || window.pageYOffset || 0;
    let isTicking = false;
    const scrollThreshold = 25;
    const hideThreshold = 120;

    const updateNavbarState = () => {
      const currentScrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
      const deltaY = currentScrollY - lastScrollY;

      // 1. Scrolled state: Apply high-contrast frosted glass when past top
      if (currentScrollY > scrollThreshold) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
        nav.classList.remove('is-hidden');
      }

      // 2. Directional Hide / Reveal:
      // Scrolling down past threshold hides navbar; scrolling up reveals it instantly
      if (currentScrollY > hideThreshold) {
        if (deltaY > 6) {
          // Scrolling down
          nav.classList.add('is-hidden');
        } else if (deltaY < -4) {
          // Scrolling up
          nav.classList.remove('is-hidden');
        }
      } else {
        nav.classList.remove('is-hidden');
      }

      // 3. ScrollSpy: Update active nav link based on section in view
      const sections = [
        { id: 'dashboard-section', selector: 'a[href="#dashboard-section"]' },
        { id: 'orbital-radar-section', selector: 'a[href="#orbital-radar-section"]' },
        { id: 'cta-section', selector: 'a[href="#cta-section"]' }
      ];

      const navLinks = nav.querySelectorAll('.nav-link');
      let currentActive = null;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            currentActive = sections[i].selector;
            break;
          }
        }
      }

      if (currentActive) {
        navLinks.forEach(link => {
          if (link.matches(currentActive)) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      } else if (currentScrollY < 350) {
        navLinks.forEach((link, idx) => {
          if (idx === 0) link.classList.add('active');
          else link.classList.remove('active');
        });
      }

      lastScrollY = currentScrollY;
      isTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(updateNavbarState);
        isTicking = true;
      }
    }, { passive: true });

    if (this.lenis) {
      this.lenis.on('scroll', () => {
        if (!isTicking) {
          window.requestAnimationFrame(updateNavbarState);
          isTicking = true;
        }
      });
    }

    // Smooth scroll for nav anchor links with instant reveal
    const anchorLinks = nav.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          nav.classList.remove('is-hidden');
          return;
        }
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          nav.classList.remove('is-hidden');
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          anchorLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });

    // Run initial update
    updateNavbarState();
  }

  // --- Cinematic Welcome Screen Reveal ---
  animateWelcomeEntrance() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Pearl telemetry pill badge
    tl.fromTo('.welcome-brand .pearl-badge',
      { y: -14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' }
    );

    // Hero title
    tl.fromTo('.welcome-title',
      { y: 18, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, clearProps: 'all' },
      '-=0.3'
    );

    // Subtitle
    tl.fromTo('.welcome-subtitle',
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' },
      '-=0.35'
    );

    // Tactile command bar
    tl.fromTo('.welcome-search-wrapper .search-box-wrapper',
      { y: 16, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, clearProps: 'all' },
      '-=0.35'
    );

    // Quick telemetry city pills
    tl.fromTo('.city-pill',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, clearProps: 'all' },
      '-=0.25'
    );
  }

  // --- Staggered Cinematic Dashboard Reveal (T3 Blur-to-Focus) ---
  animateDashboardEntrance() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Top Navigation
    tl.fromTo('#top-nav',
      { y: -20, opacity: 0, filter: 'blur(6px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, clearProps: 'transform,filter' }
    );

    // 2. View Mode Tabs Pill Bar
    tl.fromTo('.dashboard-tabs-bar',
      { y: -12, opacity: 0, filter: 'blur(6px)', scale: 0.96 },
      { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.55, clearProps: 'transform,filter' },
      '-=0.35'
    );

    // 3. Hero Scenery Double-Bezel Card
    tl.fromTo('.hero-scenery-card',
      { y: 32, opacity: 0, filter: 'blur(10px)', scale: 0.98 },
      { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.8, clearProps: 'transform,filter' },
      '-=0.35'
    );

    // 3b. Character Companion Gentle Spring Entrance
    if (document.querySelector('#character-figure')) {
      tl.fromTo('#character-figure',
        { scale: 0.7, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.8)', clearProps: 'opacity,filter' },
        '-=0.45'
      );
    }

    // 4. Condition Summary Ribbon
    tl.fromTo('.summary-card',
      { y: 22, opacity: 0, filter: 'blur(6px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, clearProps: 'transform,filter' },
      '-=0.45'
    );

    // 5. Hourly Forecast Spline Card
    tl.fromTo('.forecast-card',
      { y: 28, opacity: 0, filter: 'blur(8px)', scale: 0.98 },
      { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.7, clearProps: 'transform,filter' },
      '-=0.45'
    );

    // 6. Insight Widget & Detailed Metric Bento Boxes
    tl.fromTo('.insight-widget, .metric-box',
      { y: 24, opacity: 0, filter: 'blur(6px)', scale: 0.97 },
      { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.6, stagger: 0.05, clearProps: 'transform,filter' },
      '-=0.45'
    );
  }

  // --- Kinetic Text Split & Stagger Animation (SalesHookAI / Apple VisionOS) ---
  animateTextSplit(element, text, duration = 0.6) {
    if (!element) return;
    if (typeof gsap === 'undefined') {
      element.textContent = text;
      return;
    }

    // Split text into characters or words
    element.innerHTML = '';
    const wrapper = document.createElement('span');
    wrapper.className = 'split-text-wrapper';

    const words = text.split(' ');
    words.forEach((word, wIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';

      for (let i = 0; i < word.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.textContent = word[i];
        charSpan.style.display = 'inline-block';
        charSpan.style.opacity = '0';
        charSpan.style.transform = 'translateY(16px) rotateX(-20deg)';
        wordSpan.appendChild(charSpan);
      }

      wrapper.appendChild(wordSpan);
      if (wIdx < words.length - 1) {
        wrapper.appendChild(document.createTextNode(' '));
      }
    });

    element.appendChild(wrapper);

    const chars = element.querySelectorAll('.split-char');
    gsap.to(chars, {
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: duration,
      stagger: 0.02,
      ease: 'power3.out'
    });
  }

  // --- Smooth Numeric Counter Interpolation ---
  animateCounter(element, targetValue, duration = 0.9, decimals = 0, suffix = '') {
    if (!element) return;
    if (typeof gsap === 'undefined') {
      element.textContent = targetValue + suffix;
      return;
    }

    const startVal = parseFloat(element.getAttribute('data-current-val')) || 0;
    const endVal = parseFloat(targetValue) || 0;
    const obj = { value: startVal };

    gsap.to(obj, {
      value: endVal,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = obj.value.toFixed(decimals) + suffix;
      },
      onComplete: () => {
        element.setAttribute('data-current-val', endVal);
        element.textContent = endVal.toFixed(decimals) + suffix;
      }
    });
  }

  // --- Interactive Dashboard View Tabs (SalesHookAI Inspired) ---
  initDashboardTabs() {
    const tabsContainer = document.querySelector('.dashboard-tabs-bar');
    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll('.view-tab-btn');
    const indicator = tabsContainer.querySelector('.tab-slider-pill');

    const updateIndicator = (activeTab, instant = false) => {
      if (!indicator || !activeTab) return;

      if (instant) {
        // Snap immediately without animation (used on first-show when GSAP would tween from 0)
        gsap.set(indicator, {
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth
        });
      } else {
        gsap.to(indicator, {
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
          duration: 0.35,
          ease: 'power2.out'
        });
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        updateIndicator(tab);

        const targetView = tab.getAttribute('data-view');
        this.filterDashboardView(targetView);
      });
    });

    // Store reference so resetTabIndicator() can call it after dashboard is visible
    this._updateTabIndicator = updateIndicator;
    this._tabsContainer = tabsContainer;

    // Attempt initial position (may be a no-op if bar is still hidden)
    const currentActive = tabsContainer.querySelector('.view-tab-btn.active') || tabs[0];
    if (currentActive) {
      setTimeout(() => updateIndicator(currentActive), 50);
    }
  }

  /** Call this after the dashboard becomes visible so the pill snaps to the active tab. */
  resetTabIndicator() {
    const tabsContainer = this._tabsContainer || document.querySelector('.dashboard-tabs-bar');
    if (!tabsContainer) return;
    const active = tabsContainer.querySelector('.view-tab-btn.active') || tabsContainer.querySelector('.view-tab-btn');
    if (active && this._updateTabIndicator) {
      // requestAnimationFrame ensures the browser has painted the layout before we measure
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this._updateTabIndicator(active, true);
        });
      });
    }
  }


  filterDashboardView(viewKey) {
    const heroCard = document.querySelector('.hero-scenery-card');
    const forecastCard = document.querySelector('.forecast-card');
    const sunWidget = document.querySelector('.sun-cycle-widget');
    const insightWidget = document.querySelector('.insight-widget');
    const metricsGrid = document.querySelector('.widgets-dashboard-grid');

    if (viewKey === 'all') {
      gsap.to([heroCard, forecastCard, metricsGrid], {
        opacity: 1,
        y: 0,
        display: '',
        duration: 0.4,
        stagger: 0.05
      });
    } else if (viewKey === 'spline' && forecastCard) {
      forecastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      gsap.fromTo(forecastCard, { scale: 0.98 }, { scale: 1, duration: 0.5, ease: 'back.out(1.5)' });
    } else if (viewKey === 'solar' && sunWidget) {
      sunWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
      gsap.fromTo(sunWidget, { scale: 0.98 }, { scale: 1, duration: 0.5, ease: 'back.out(1.5)' });
    } else if (viewKey === 'telemetry' && metricsGrid) {
      metricsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // --- 3D Magnetic Card Tilt & Cursor Spotlight ---
  initCardPhysics() {
    const cards = document.querySelectorAll('.widget-card, .forecast-card, .summary-card, .hero-scenery-card');

    cards.forEach((card) => {
      if (card.getAttribute('data-tilt-bound') === 'true') return;
      card.setAttribute('data-tilt-bound', 'true');

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.35,
            ease: 'power1.out'
          });
        }
      });

      card.addEventListener('pointerleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  // --- 3D Hero-to-Dashboard Card Stacking & Scroll Engine ---
  initHeroScrollStackingAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const hero = document.querySelector('#hero-section') || document.querySelector('.cinematic-hero-section');
    const dashboard = document.querySelector('#dashboard-section') || document.querySelector('.cinematic-frame-outer');

    if (!hero || !dashboard) return;

    const isMobile = window.innerWidth < 768;
    const heroRotate = isMobile ? -2 : -4;
    const dashRotate = isMobile ? 2 : 4;

    // 1. Hero Section (Section 1): scales down [1 -> 0.85] and rotates [0 -> -4deg] as scrolled
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        const scale = 1 - p * 0.15;
        const rotate = p * heroRotate;
        const opacity = 1 - p * 0.35;

        gsap.set(hero, {
          scale: scale,
          rotationZ: rotate,
          opacity: opacity,
          transformOrigin: 'center top',
          force3D: true
        });
      }
    });

    // 2. Weather Dashboard (Section 2): scales up [0.88 -> 1] and straightens [4deg -> 0] as it enters
    ScrollTrigger.create({
      trigger: dashboard,
      start: 'top bottom',
      end: 'top 15%',
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        const scale = 0.88 + p * 0.12;
        const rotate = (1 - p) * dashRotate;

        gsap.set(dashboard, {
          scale: scale,
          rotationZ: rotate,
          transformOrigin: 'center top',
          force3D: true
        });
      }
    });
  }

  // --- Programmatic Transition when User Searches a City ---
  animateSearchTransitionToDashboard(onComplete) {
    const hero = document.querySelector('#hero-section') || document.querySelector('.cinematic-hero-section');
    const dashboard = document.querySelector('#dashboard-section') || document.querySelector('.cinematic-frame-outer');

    if (!dashboard) {
      if (onComplete) onComplete();
      return;
    }

    if (typeof gsap === 'undefined') {
      dashboard.scrollIntoView({ behavior: 'smooth' });
      if (onComplete) onComplete();
      return;
    }

    const isMobile = window.innerWidth < 768;
    const heroRotate = isMobile ? -2 : -4;
    const dashRotate = isMobile ? 2 : 4;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Animate Hero (Section 1) receding into 3D background space
    if (hero) {
      tl.to(hero, {
        scale: 0.85,
        rotationZ: heroRotate,
        opacity: 0.7,
        duration: 0.85,
        transformOrigin: 'center top',
        force3D: true
      }, 0);
    }

    // Animate Dashboard Card (Section 2) scaling up and emerging into crisp foreground focus
    tl.fromTo(dashboard, {
      scale: 0.88,
      rotationZ: dashRotate,
      opacity: 0.6,
      y: 40
    }, {
      scale: 1,
      rotationZ: 0,
      opacity: 1,
      y: 0,
      duration: 0.95,
      transformOrigin: 'center top',
      force3D: true,
      clearProps: 'y'
    }, 0.08);

    // Smooth camera glide to dashboard card
    if (this.lenis) {
      this.lenis.scrollTo(dashboard, {
        offset: -76,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // --- Programmatic Return to Hero on Brand Click ---
  animateReturnToHero() {
    const hero = document.querySelector('#hero-section') || document.querySelector('.cinematic-hero-section');
    const dashboard = document.querySelector('#dashboard-section') || document.querySelector('.cinematic-frame-outer');

    if (typeof gsap === 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (hero) {
      gsap.to(hero, {
        scale: 1,
        rotationZ: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }

    if (dashboard) {
      gsap.to(dashboard, {
        scale: 0.92,
        rotationZ: 2,
        duration: 0.7,
        ease: 'power3.out'
      });
    }

    if (this.lenis) {
      this.lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// Global instance
window.motionEngine = null;
document.addEventListener('DOMContentLoaded', () => {
  window.motionEngine = new MotionEngine();
});
