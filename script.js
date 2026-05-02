/**
 * NEXUS STUDIO — script.js
 * Modular vanilla JavaScript for all interactive functionality.
 *
 * Modules:
 *  1. Loader
 *  2. Theme toggle (dark/light)
 *  3. Sticky navbar + active link highlighting
 *  4. Mobile menu toggle
 *  5. Smooth scrolling
 *  6. Scroll reveal animations (IntersectionObserver)
 *  7. Testimonial slider (auto + manual + dots)
 *  8. FAQ accordion
 *  9. Contact form validation
 * 10. Back-to-top button
 */

/* ─────────────────────────────────────────────
   UTILITY HELPERS
   ───────────────────────────────────────────── */
/** Shorthand for querySelector */
const $ = (selector, context = document) => context.querySelector(selector);
/** Shorthand for querySelectorAll */
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/* ─────────────────────────────────────────────
   1. LOADER
   Hides loading screen after page is ready.
   ───────────────────────────────────────────── */
(function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  // Wait for a minimum display time so the animation feels intentional
  const minDisplayTime = 1800; // ms
  const startTime = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const delay   = Math.max(0, minDisplayTime - elapsed);

    setTimeout(() => {
      loader.classList.add('hidden');
      // Remove from DOM after transition to free memory
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    }, delay);
  });
})();


/* ─────────────────────────────────────────────
   2. THEME TOGGLE (Dark / Light)
   Persists preference to localStorage.
   ───────────────────────────────────────────── */
(function initTheme() {
  const html       = document.documentElement;
  const toggleBtn  = $('#theme-toggle');
  if (!toggleBtn) return;

  // Read persisted preference (fallback: 'dark')
  const savedTheme = localStorage.getItem('nx-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('nx-theme', next);
  });
})();


/* ─────────────────────────────────────────────
   3. STICKY NAVBAR + ACTIVE LINK HIGHLIGHTING
   Adds 'scrolled' class to navbar when user
   scrolls past a threshold.
   ───────────────────────────────────────────── */
(function initNavbar() {
  const navbar   = $('#navbar');
  const navLinks = $$('.nav-link');
  if (!navbar) return;

  // All sections for active state detection
  const sections = $$('section[id]');

  function onScroll() {
    // Sticky style
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Determine which section is in view
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 90;
      if (window.scrollY >= top) {
        currentId = section.id;
      }
    });

    // Highlight matching nav link
    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on init
})();


/* ─────────────────────────────────────────────
   4. MOBILE MENU TOGGLE
   Opens/closes mobile nav overlay.
   Also closes when a link is clicked.
   ───────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobile-nav');
  const mobileLinks = $$('.mobile-link');
  if (!hamburger || !mobileNav) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    isOpen = false;
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  hamburger.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when any mobile nav link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
})();


/* ─────────────────────────────────────────────
   5. SMOOTH SCROLLING
   Handles clicks on anchor links (#section).
   Native CSS scroll-behavior covers most cases;
   this JS version handles edge cases & offsets.
   ───────────────────────────────────────────── */
(function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navbarHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')
    ) || 68;

    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
})();


/* ─────────────────────────────────────────────
   6. SCROLL REVEAL ANIMATIONS
   Uses IntersectionObserver to add 'revealed'
   class to elements as they enter the viewport.
   ───────────────────────────────────────────── */
(function initScrollReveal() {
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('.reveal-fade, .reveal-slide').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root:       null,        // viewport
    rootMargin: '0px 0px -60px 0px', // trigger 60px before bottom edge
    threshold:  0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, observerOptions);

  $$('.reveal-fade, .reveal-slide').forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────────
   7. TESTIMONIAL SLIDER
   Supports: auto-play, prev/next buttons,
   dot navigation, keyboard navigation.
   ───────────────────────────────────────────── */
(function initSlider() {
  const track   = $('#slider-track');
  const prevBtn = $('#slider-prev');
  const nextBtn = $('#slider-next');
  const dotsContainer = $('#slider-dots');
  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides     = $$('.testimonial-slide', track);
  const totalSlides = slides.length;
  let current      = 0;
  let autoPlayTimer = null;
  const AUTO_INTERVAL = 5000; // 5 seconds

  // ── Build dot indicators ──────────────────
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = $$('.slider-dot', dotsContainer);

  // ── Update slider position & UI ──────────
  function goTo(index) {
    // Wrap around
    current = (index + totalSlides) % totalSlides;

    track.style.transform = `translateX(-${current * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });

    // Update slide aria roles
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== current ? 'true' : 'false');
    });
  }

  // ── Navigation ────────────────────────────
  function goNext() { goTo(current + 1); }
  function goPrev() { goTo(current - 1); }

  nextBtn.addEventListener('click', () => { goNext(); resetAutoPlay(); });
  prevBtn.addEventListener('click', () => { goPrev(); resetAutoPlay(); });

  // ── Auto-play ─────────────────────────────
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(goNext, AUTO_INTERVAL);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Pause auto-play when user hovers over slider
  const sliderEl = $('.testimonial-slider');
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAutoPlay);
    sliderEl.addEventListener('mouseleave', startAutoPlay);
    sliderEl.addEventListener('focusin', stopAutoPlay);
    sliderEl.addEventListener('focusout', startAutoPlay);
  }

  // Keyboard navigation
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goPrev(); resetAutoPlay(); }
    if (e.key === 'ArrowRight') { goNext(); resetAutoPlay(); }
  });

  // Initialise
  goTo(0);
  startAutoPlay();
})();


/* ─────────────────────────────────────────────
   8. FAQ ACCORDION
   Only one item open at a time.
   Animates max-height for smooth expansion.
   ───────────────────────────────────────────── */
(function initFAQ() {
  const faqItems = $$('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = $('.faq-question', item);
    const answer   = $('.faq-answer',   item);
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items first
      faqItems.forEach(i => {
        i.classList.remove('open');
        const ans = $('.faq-answer', i);
        if (ans) ans.style.maxHeight = '0';
        const btn = $('.faq-question', i);
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // If it wasn't open, open it now
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();


/* ─────────────────────────────────────────────
   9. CONTACT FORM VALIDATION
   Validates name, email, subject, and message.
   Shows inline errors and a success message.
   ───────────────────────────────────────────── */
(function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  // ── Validation rules ──────────────────────
  const rules = {
    name: {
      validate: v => v.trim().length >= 2,
      message:  'Please enter your full name (at least 2 characters).'
    },
    email: {
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message:  'Please enter a valid email address.'
    },
    subject: {
      validate: v => v.trim().length >= 3,
      message:  'Please enter a subject.'
    },
    message: {
      validate: v => v.trim().length >= 20,
      message:  'Please enter a message (at least 20 characters).'
    }
  };

  // ── Helper: show/clear error for a field ──
  function setError(fieldId, message) {
    const field   = $(`#${fieldId}`);
    const errorEl = $(`#${fieldId}-error`);
    const group   = field?.closest('.form-group');
    if (!field || !errorEl || !group) return;

    if (message) {
      group.classList.add('error');
      errorEl.textContent = message;
    } else {
      group.classList.remove('error');
      errorEl.textContent = '';
    }
  }

  // ── Live validation on blur ───────────────
  Object.entries(rules).forEach(([fieldId, rule]) => {
    const field = $(`#${fieldId}`);
    if (!field) return;

    field.addEventListener('blur', () => {
      const isValid = rule.validate(field.value);
      setError(fieldId, isValid ? '' : rule.message);
    });

    field.addEventListener('input', () => {
      // Clear error as soon as user starts typing again
      if (field.closest('.form-group')?.classList.contains('error')) {
        const isValid = rule.validate(field.value);
        if (isValid) setError(fieldId, '');
      }
    });
  });

  // ── Form submission ───────────────────────
  form.addEventListener('submit', e => {
    e.preventDefault();

    let isFormValid = true;

    // Validate all fields
    Object.entries(rules).forEach(([fieldId, rule]) => {
      const field   = $(`#${fieldId}`);
      if (!field) return;

      const isValid = rule.validate(field.value);
      setError(fieldId, isValid ? '' : rule.message);
      if (!isValid) isFormValid = false;
    });

    if (!isFormValid) {
      // Focus first invalid field
      const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
      firstError?.focus();
      return;
    }

    // ── Simulate async submission ─────────
    const submitBtn  = form.querySelector('.form-submit');
    const btnText    = submitBtn?.querySelector('.btn-text');
    const successMsg = $('#form-success');

    // Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending…';
    }

    // Simulate network delay
    setTimeout(() => {
      // Success state
      form.querySelector('.contact-form > *:not(#form-success)')?.style;
      $$('.form-group, .form-row, .form-submit', form).forEach(el => {
        el.style.display = 'none';
      });

      if (successMsg) successMsg.classList.add('visible');

      // Reset form
      form.reset();

      // Re-enable button after a delay (in case user wants to submit again)
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (btnText) btnText.textContent = 'Send Message';
        }
      }, 3000);
    }, 1400);
  });
})();


/* ─────────────────────────────────────────────
   10. BACK TO TOP BUTTON
   Shows when user scrolls past 400px.
   Smoothly scrolls back to top on click.
   ───────────────────────────────────────────── */
(function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  const THRESHOLD = 400; // px from top before showing

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > THRESHOLD);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ─────────────────────────────────────────────
   INIT LOG (development aid)
   ───────────────────────────────────────────── */
console.log(
  '%c NX Nexus Studio %c v1.0.0 ',
  'background:#d4a847;color:#0e0f11;font-weight:bold;padding:2px 6px;border-radius:3px 0 0 3px;',
  'background:#1e2129;color:#d4a847;padding:2px 6px;border-radius:0 3px 3px 0;'
);