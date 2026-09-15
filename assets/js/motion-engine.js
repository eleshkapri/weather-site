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
    this.initCardPhysics();
    this.initDashboardTabs();
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

  // --- Staggered Cinematic Dashboard Reveal ---
  animateDashboardEntrance() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Top Navigation
    tl.fromTo('#top-nav',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );

    // 2. View Mode Tabs Pill Bar
    tl.fromTo('.dashboard-tabs-bar',
      { y: -12, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5 },
      '-=0.3'
    );

    // 3. Hero Scenery Double-Bezel Card
    tl.fromTo('.hero-scenery-card',
      { y: 36, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, clearProps: 'transform' },
      '-=0.3'
    );

    // 4. Condition Summary Ribbon
    tl.fromTo('.summary-card',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' },
      '-=0.4'
    );

    // 5. Hourly Forecast Spline Card
    tl.fromTo('.forecast-card',
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, clearProps: 'transform' },
      '-=0.4'
    );

    // 6. Insight Widget & Detailed Metric Bento Boxes
    tl.fromTo('.insight-widget, .metric-box',
      { y: 28, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, clearProps: 'transform' },
      '-=0.4'
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

    const updateIndicator = (activeTab) => {
      if (!indicator || !activeTab) return;
      const rect = activeTab.getBoundingClientRect();
      const parentRect = tabsContainer.getBoundingClientRect();

      gsap.to(indicator, {
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        duration: 0.35,
        ease: 'power2.out'
      });
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

    // Set initial position on active tab
    const currentActive = tabsContainer.querySelector('.view-tab-btn.active') || tabs[0];
    if (currentActive) {
      setTimeout(() => updateIndicator(currentActive), 50);
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
}

// Global instance
window.motionEngine = null;
document.addEventListener('DOMContentLoaded', () => {
  window.motionEngine = new MotionEngine();
});
