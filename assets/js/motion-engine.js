/**
 * MotionEngine - Advanced GSAP & Lenis Motion Controller
 * Orchestrates buttery smooth scroll, staggered bento card reveals,
 * animated number tickers, and 3D magnetic card tilt & spotlight effects.
 */
class MotionEngine {
  constructor() {
    this.lenis = null;
    this.initSmoothScroll();
    this.initCardPhysics();
  }

  initSmoothScroll() {
    // Initialize Lenis Smooth Scroll if loaded
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-grade physical ease
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
      });

      // Synchronize with GSAP ScrollTrigger if present
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

  /**
   * Staggered cinematic entrance when a city weather loads
   */
  animateDashboardEntrance() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Header Search Bar & Brand
    tl.fromTo('.app-header', 
      { y: -25, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6 }
    );

    // Hero Scenery Card
    tl.fromTo('.hero-scenery-card',
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.85, clearProps: 'transform' },
      '-=0.35'
    );

    // Hourly Forecast Card
    tl.fromTo('.forecast-card',
      { y: 35, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.75, clearProps: 'transform' },
      '-=0.5'
    );

    // Insight Widget & Detail Bento Metric Cards (Staggered)
    tl.fromTo('.insight-widget, .metric-box',
      { y: 30, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.06, clearProps: 'transform' },
      '-=0.4'
    );
  }

  /**
   * Smooth numeric counter animation for live metrics
   */
  animateCounter(element, targetValue, duration = 1.0, decimals = 0, suffix = '') {
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

  /**
   * 3D Magnetic Card Tilt & Cursor Spotlight
   * Similar to modern Apple & Qronos interactive glass cards
   */
  initCardPhysics() {
    const cards = document.querySelectorAll('.widget-card, .forecast-card, .summary-card');

    cards.forEach((card) => {
      // Avoid duplicate listener bindings
      if (card.getAttribute('data-tilt-bound') === 'true') return;
      card.setAttribute('data-tilt-bound', 'true');

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set spotlight CSS variables
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');

        // Calculate subtle 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

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
