/* ============================================
   MAIN.JS - Full Feature Set (Wednesday)
   Discovery Land Website
   
   Features:
   - Navigation (scroll-aware)
   - Smooth scrolling
   - Animated mobile menu
   - Filter tabs with animation
   - Scroll animations (IntersectionObserver)
   - Image lazy loading (IntersectionObserver)
   - Contact form validation
   - Newsletter signup
   - Search prompt
   - Back-to-top button
   - Performance: passive listeners, debounced resize
   ============================================ */

'use strict';

/* ---- DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSmoothScroll();
  initMobileMenu();
  initFilterTabs();
  initScrollAnimations();
  initLazyLoading();       // Wednesday: Lazy loading
  initFormValidation();
  initSearch();
  initBackToTop();         // Wednesday: Back to top
});

/* ============================================
   NAVIGATION - Scroll-aware sticky header
   ============================================ */
function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ============================================
   ANIMATED MOBILE MENU (Wednesday Enhanced)
   - Hamburger icon transforms to X
   - Staggered link animation
   - Escape key & overlay close
   - Body scroll lock
   ============================================ */
function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (!hamburger || !mobileMenu) return;

  const links = mobileMenu.querySelectorAll('.nav__link');

  const toggleMenu = () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Accessibility
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);

    // Wednesday: Staggered link entrance animation
    if (isOpen) {
      links.forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        setTimeout(() => {
          link.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          link.style.opacity = '1';
          link.style.transform = 'translateY(0)';
        }, 100 + i * 80);
      });
    } else {
      links.forEach(link => {
        link.style.opacity = '';
        link.style.transform = '';
        link.style.transition = '';
      });
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
}

/* ============================================
   FILTER TABS - Communities & Properties
   Wednesday: Enhanced with smooth fade animation
   ============================================ */
function initFilterTabs() {
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const tabs = group.querySelectorAll('.filter-tab');
    const gridId = group.dataset.filterGroup;
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const items = grid.querySelectorAll('[data-category]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab + ARIA
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const filter = tab.dataset.filter;

        // Filter items with stagger animation
        let visibleIndex = 0;
        items.forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;

          if (match) {
            item.style.display = '';
            const delay = visibleIndex * 60;
            visibleIndex++;
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px) scale(0.97)';
            setTimeout(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) scale(1)';
            }, delay);
          } else {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  });
}

/* ============================================
   SCROLL ANIMATIONS - IntersectionObserver
   Wednesday: Enhanced with multiple animation types
   ============================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================
   IMAGE LAZY LOADING (Wednesday Feature)
   IntersectionObserver-based with fade-in
   Uses data-src → src swap with graceful fallback
   ============================================ */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy');
  if (!lazyImages.length) return;

  // Add initial styles for fade-in effect
  lazyImages.forEach(img => {
    img.style.transition = 'opacity 0.5s ease';
  });

  // Check for IntersectionObserver support
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;

          if (src) {
            // Fade out placeholder
            img.style.opacity = '0.3';

            // Create a hidden Image to preload
            const preloader = new Image();
            preloader.onload = () => {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              img.classList.add('lazy--loaded');
              // Fade in real image
              requestAnimationFrame(() => {
                img.style.opacity = '1';
              });
            };
            preloader.onerror = () => {
              // Keep placeholder on error, restore opacity
              img.style.opacity = '1';
              console.warn('Lazy load failed:', src);
            };
            preloader.src = src;
          }

          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',  // Start loading 200px before viewport
      threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback: load all images immediately
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.remove('lazy');
        img.classList.add('lazy--loaded');
      }
    });
  }
}

/* ============================================
   FORM VALIDATION (Wednesday Enhanced)
   Real-time field validation + submit handling
   ============================================ */
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Wednesday: Real-time validation on blur
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('form-input--error')) {
          validateField(field);
        }
      });
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
}

function validateField(field) {
  // Clear existing error
  field.classList.remove('form-input--error');
  const existingError = field.parentElement.querySelector('.form-error');
  if (existingError) existingError.remove();

  const name = field.getAttribute('name');
  const value = field.value.trim();

  if (!value && field.hasAttribute('required')) {
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    showFieldError(field, `Please enter your ${label.toLowerCase()}`);
    return false;
  }

  if (name === 'email' && value && !isValidEmail(value)) {
    showFieldError(field, 'Please enter a valid email address');
    return false;
  }

  return true;
}

function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const fields = {
    name:    form.querySelector('[name="name"]'),
    email:   form.querySelector('[name="email"]'),
    message: form.querySelector('[name="message"]'),
  };

  // Reset errors
  form.querySelectorAll('.form-input--error').forEach(el => el.classList.remove('form-input--error'));
  form.querySelectorAll('.form-error').forEach(el => el.remove());

  let valid = true;

  if (!fields.name?.value.trim()) {
    showFieldError(fields.name, 'Please enter your name');
    valid = false;
  }

  if (!fields.email?.value.trim()) {
    showFieldError(fields.email, 'Please enter your email');
    valid = false;
  } else if (!isValidEmail(fields.email.value)) {
    showFieldError(fields.email, 'Please enter a valid email address');
    valid = false;
  }

  if (!fields.message?.value.trim()) {
    showFieldError(fields.message, 'Please enter a message');
    valid = false;
  }

  if (!valid) return;

  // Wednesday: Button loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    const alertSuccess = form.querySelector('.alert--success');
    if (alertSuccess) {
      alertSuccess.classList.add('show');
      form.reset();
      setTimeout(() => alertSuccess.classList.remove('show'), 5000);
    }
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1200);
}

function handleNewsletterSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const emailInput = form.querySelector('[name="newsletter-email"]');
  const alertSuccess = form.querySelector('.alert--success') || form.closest('footer')?.querySelector('.alert--success');

  // Clear previous errors
  emailInput?.classList.remove('form-input--error');
  const existingError = emailInput?.parentElement?.querySelector('.form-error');
  if (existingError) existingError.remove();

  if (!emailInput?.value.trim() || !isValidEmail(emailInput.value)) {
    showFieldError(emailInput, 'Please enter a valid email');
    return;
  }

  // Wednesday: Button loading state
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = '...';
  btn.disabled = true;

  setTimeout(() => {
    if (alertSuccess) {
      alertSuccess.classList.add('show');
      emailInput.value = '';
      setTimeout(() => alertSuccess.classList.remove('show'), 4000);
    }
    btn.textContent = originalText;
    btn.disabled = false;
  }, 800);
}

function showFieldError(field, message) {
  if (!field) return;
  field.classList.add('form-input--error');

  const error = document.createElement('div');
  error.className = 'form-error';
  error.textContent = message;
  error.style.animation = 'fadeInUp 0.3s ease forwards';
  field.parentElement.appendChild(error);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================
   SEARCH (Basic)
   ============================================ */
function initSearch() {
  const searchBtn = document.querySelector('.nav__search');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', () => {
    const query = prompt('Search Discovery Land:');
    if (query && query.trim()) {
      alert(`Search results for "${query.trim()}" would appear here in a full implementation.`);
    }
  });
}

/* ============================================
   BACK TO TOP BUTTON (Wednesday Feature)
   ============================================ */
function initBackToTop() {
  // Create button dynamically
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btn);

  // Show/hide on scroll
  const toggleVisibility = () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   DEBOUNCED RESIZE HANDLER
   ============================================ */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 991) {
      const hamburger = document.querySelector('.nav__hamburger');
      const mobileMenu = document.querySelector('.nav__mobile');
      if (hamburger?.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }, 250);
}, { passive: true });
