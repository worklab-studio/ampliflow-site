/* ─────────────────────────────────────────────────────────────────
   Ampliflow · scroll-reveal + page-load system
   Auto-applies fade-up reveals to common element classes across pages.
   Above-the-fold elements stagger in on load; below-fold use IntersectionObserver.
   ───────────────────────────────────────────────────────────────── */
(function () {
  // Respect users who don't want motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('no-anim');
    return;
  }

  // Selectors of elements to reveal on every page.
  // Skipped automatically: anything inside nav/footer/preview-card/hero-feed-track/dash-flow,
  // or already carrying the homepage's existing `.anim` class.
  var SELECTORS = [
    // Section headings
    '.section-h', '.section-h2', '.section-sub', '.section-label',
    '.ab-section-head', '.ab-team-head',
    '.faq-head', '.ct-faq-head',
    // About page
    '.ab-hero-eyebrow', '.ab-hero h1', '.ab-hero-lede', '.ab-hero-meta',
    '.ab-origin-side', '.ab-origin-body',
    '.ab-belief', '.ab-stats-frame', '.ab-member',
    '.ab-op', '.value-cell',
    '.ab-cta-inner',
    // Pricing page
    '.pricing-hero', '.tier', '.cmp-diff-cell', '.cmp-matrix',
    // Contact page
    '.contact-hero', '.ct-info-block', '.ct-form-card', '.ct-info',
    // Careers page
    '.careers-hero', '.careers-note', '.work-cell', '.roles-empty',
    // FAQ shared
    '.faq-item', '.faq-help',
    // Homepage sections that don't already animate
    '.feat-cell', '.steps-cell', '.step-cell', '.tm-item',
    '.founding-section', '.stats-bar', '.compare-wrap',
    '.feat-section-inner > .feat-eyebrow',
    '.feat-section-inner > .feat-h',
    '.feat-section-inner > .feat-sub',
    '.cta-section'
  ];

  // Containers whose direct children should stagger (1st child fastest, last slowest)
  var STAGGER_PARENTS = [
    '.tier-grid', '.ab-beliefs-grid', '.ab-team-grid',
    '.ab-ops-grid', '.values-grid', '.work-grid',
    '.channels-grid', '.feat-grid', '.steps-bento',
    '.cmp-diff', '.tm-track',
    '.ab-stats-frame', '.faq-list', '.ct-info'
  ];

  function isInsideSkipped(el) {
    return !!el.closest('nav, footer, .preview-card, .hero-feed-track, .dash-flow, .hero-pill, .dash-canvas');
  }

  function init() {
    var elements = Array.prototype.slice.call(
      document.querySelectorAll(SELECTORS.join(','))
    ).filter(function (el) {
      if (el.classList.contains('anim')) return false;        // homepage hero already animates
      if (isInsideSkipped(el)) return false;
      return true;
    });

    // Mark them as scroll-reveal targets
    elements.forEach(function (el) {
      el.classList.add('scroll-reveal');
    });

    // Apply stagger index to direct children of stagger parents
    STAGGER_PARENTS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (parent) {
        var idx = 0;
        Array.prototype.slice.call(parent.children).forEach(function (child) {
          if (child.classList.contains('scroll-reveal')) {
            idx += 1;
            child.setAttribute('data-stagger', String(Math.min(idx, 6)));
          }
        });
      });
    });

    // IntersectionObserver for below-fold elements
    var observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
      });
    }

    // Above-fold: trigger immediately with a small staggered cascade
    // Below-fold: hand off to observer
    var vh = window.innerHeight;
    var aboveFoldIndex = 0;

    elements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var aboveFold = rect.top < vh * 0.95;

      if (aboveFold) {
        // Page-load reveal — small staggered cascade
        var delay = 60 + Math.min(aboveFoldIndex * 70, 700);
        aboveFoldIndex += 1;
        setTimeout(function () {
          el.classList.add('in-view');
        }, delay);
      } else if (observer) {
        observer.observe(el);
      } else {
        // No IntersectionObserver — just show
        el.classList.add('in-view');
      }
    });

    // Mark body as loaded for any page-load fade
    requestAnimationFrame(function () {
      document.body.classList.add('page-loaded');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
