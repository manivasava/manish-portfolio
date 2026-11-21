/**
 * Professional Accounting & Finance Portfolio — Vanilla JavaScript
 * Features:
 * 1. Progressive enhancement flag (ensures content remains visible without JS)
 * 2. Responsive mobile navigation toggle & outside-click / Escape dismissal
 * 3. Active navigation section highlighting via IntersectionObserver
 * 4. Subtle scroll-reveal animations (respecting prefers-reduced-motion)
 * 5. Sticky header shadow & Back-to-Top button visibility
 * 6. Static mailto helper for quick email composition
 * 7. Dynamic footer copyright year
 */

(function () {
  'use strict';

  // Enable JS-dependent reveal styles safely
  document.documentElement.classList.add('js-enabled');

  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');

  function closeMobileMenu() {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      primaryNav.classList.toggle('open', !isExpanded);
    });

    // Close menu when clicking a navigation link
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('open')) {
        closeMobileMenu();
        navToggle.focus();
      }
    });

    // Close menu when clicking outside header
    document.addEventListener('click', function (event) {
      const header = document.getElementById('site-header');
      if (header && !header.contains(event.target) && primaryNav.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // 3. Header Elevation & Back-to-Top Button
  const siteHeader = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScrollState() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 16);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollY > 420);
    }
  }

  window.addEventListener('scroll', handleScrollState, { passive: true });
  handleScrollState();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  }

  // 4. Active Section Highlighting (Scroll Spy)
  const sections = document.querySelectorAll('main section[id]');

  function setActiveNav(sectionId) {
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      const isMatch = href === '#' + sectionId;
      link.classList.toggle('active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0.05
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // 5. Subtle Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // 6. Static Contact Mailto Composer (Transparently opens user's email client)
  const mailtoForm = document.getElementById('mailto-helper-form');
  const feedbackEl = document.getElementById('form-feedback');

  if (mailtoForm) {
    mailtoForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const subjectInput = document.getElementById('sender-subject');
      const messageInput = document.getElementById('sender-message');

      const senderName = nameInput ? nameInput.value.trim() : '';
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      if (!senderName || !subjectVal || !messageVal) {
        if (feedbackEl) {
          feedbackEl.textContent = 'Please fill in your name, subject, and message before opening your email client.';
        }
        return;
      }

      // Extract target email from the primary mailto link in the Contact section
      const primaryEmailLink = document.querySelector('#contact a[href^="mailto:"]');
      const rawHref = primaryEmailLink ? primaryEmailLink.getAttribute('href') : 'mailto:candidate.email@example.com';
      const targetEmail = rawHref.replace(/^mailto:/i, '').split('?')[0];

      const composedBody =
        'Hello,

' +
        messageVal +
        '

Regards,
' +
        senderName;

      const mailtoUri =
        'mailto:' +
        encodeURIComponent(targetEmail) +
        '?subject=' +
        encodeURIComponent(subjectVal) +
        '&body=' +
        encodeURIComponent(composedBody);

      if (feedbackEl) {
        feedbackEl.textContent = 'Opening your default email application with your drafted message...';
      }

      window.location.href = mailtoUri;
    });
  }
})();
