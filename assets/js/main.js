document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Loader (Honey Drip)
     ========================================================================== */
  const loader = document.querySelector('.loader-overlay');
  if (loader) {
    // Hide loader after drip animation (0.8s)
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }

  /* ==========================================================================
     2. Theme Toggle (Dark / Light Mode)
     ========================================================================== */
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Exclude auth pages if necessary, though logic runs if buttons exist
  if (themeToggles.length > 0) {
    const savedTheme = localStorage.getItem('hiveflow-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcons(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeIcons('dark');
    }

    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('hiveflow-theme', newTheme);
        updateThemeIcons(newTheme);
      });
    });
  }

  function updateThemeIcons(theme) {
    themeToggles.forEach(toggle => {
      // Toggle Phosphor icons class or content based on theme
      // Assuming i.ph-sun and i.ph-moon
      const icon = toggle.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'ph-duotone ph-sun';
        } else {
          icon.className = 'ph-duotone ph-moon';
        }
      }
    });
  }

  /* ==========================================================================
     3. RTL Toggle
     ========================================================================== */
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  if (rtlToggles.length > 0) {
    rtlToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        let currentDir = document.documentElement.getAttribute('dir');
        if (currentDir === 'rtl') {
          document.documentElement.removeAttribute('dir');
        } else {
          document.documentElement.setAttribute('dir', 'rtl');
        }
      });
    });
  }

  /* ==========================================================================
     4. Navigation & Drawers
     ========================================================================== */
  const hamburgerBtn = document.querySelector('.hamburger');
  const navDrawer = document.querySelector('.nav-drawer');
  const navDrawerClose = document.querySelector('.nav-drawer-close');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  
  const cartBtns = document.querySelectorAll('.cart-btn');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartDrawerClose = document.querySelector('.cart-drawer-close');

  function openDrawer(drawer) {
    if (drawer) {
      drawer.classList.add('open');
      if(drawerOverlay) drawerOverlay.classList.add('active');
    }
  }

  function closeDrawers() {
    if(navDrawer) navDrawer.classList.remove('open');
    if(cartDrawer) cartDrawer.classList.remove('open');
    if(drawerOverlay) drawerOverlay.classList.remove('active');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => openDrawer(navDrawer));
  if (navDrawerClose) navDrawerClose.addEventListener('click', closeDrawers);
  
  cartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer(cartDrawer);
    });
  });
  if (cartDrawerClose) cartDrawerClose.addEventListener('click', closeDrawers);
  
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawers);

  // Active Page Highlighting
  const path = window.location.pathname;
  let page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  
  if (page === 'blog-single.html') page = 'blog.html';
  if (page === 'product-single.html') page = 'shop.html';
  if (page === 'guide-single.html') page = 'guides.html';

  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const drawerLinks = document.querySelectorAll('.drawer-links .drawer-link');
  drawerLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.style.color = 'var(--color-primary)';
    } else {
      link.style.color = '';
    }
  });

  // Sticky Header Morph
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ==========================================================================
     5. Intersection Observer (Scroll Reveal)
     ========================================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If reduced motion is preferred, reveal all immediately
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      el.classList.add('revealed');
    });
  }

  /* ==========================================================================
     6. Parallax Background & Animations
     ========================================================================== */
  const heroBg = document.querySelector('.parallax-bg');
  if (heroBg && !prefersReducedMotion.matches) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    });
  }

  // Typewriter effect
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) {
    const taglines = ['Pure Honey.', 'Ethically Sourced.', 'Delivered Fresh.'];
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentLine = taglines[lineIndex];
      
      if (isDeleting) {
        typewriterEl.textContent = currentLine.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterEl.textContent = currentLine.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentLine.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % taglines.length;
        typingSpeed = 500; // Pause before next
      }

      setTimeout(type, typingSpeed);
    }
    
    // Start effect
    setTimeout(type, 1000);
  }

  /* ==========================================================================
     7. Form Validation
     ========================================================================== */
  const forms = document.querySelectorAll('.needs-validation');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate required fields
      const requiredInputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          showError(input, 'This field is required');
          isValid = false;
        } else {
          clearError(input);
        }
      });

      // Validate email
      const emailInputs = form.querySelectorAll('input[type="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailInputs.forEach(input => {
        if (input.value && !emailRegex.test(input.value)) {
          showError(input, 'Please enter a valid email address');
          isValid = false;
        }
      });

      // Validate password length
      const passwordInputs = form.querySelectorAll('input[type="password"]');
      passwordInputs.forEach(input => {
        if (input.value && input.value.length < 8) {
          showError(input, 'Password must be at least 8 characters');
          isValid = false;
        }
      });

      // Validate password confirm
      const confirmInput = form.querySelector('input[name="confirmPassword"]');
      const passInput = form.querySelector('input[name="password"]');
      if (confirmInput && passInput) {
        if (confirmInput.value !== passInput.value) {
          showError(confirmInput, 'Passwords do not match');
          isValid = false;
        }
      }

      // Checkbox validation
      const termsCheckbox = form.querySelector('input[name="terms"]');
      if (termsCheckbox && !termsCheckbox.checked) {
        // Find label to highlight
        termsCheckbox.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        // Success state simulation
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="ph-duotone ph-check-circle"></i> Success';
        btn.classList.add('btn-success');
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('btn-success');
          form.reset();
        }, 3000);
      }
    });

    // Real-time clearing
    form.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          clearError(input);
        }
      });
    });
  });

  function showError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    let errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('error-msg')) {
      errorEl.textContent = message;
    }
  }

  function clearError(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  /* ==========================================================================
     8. Testimonial Carousel Auto-Scroll
     ========================================================================== */
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    let scrollInterval;
    const startScroll = () => {
      scrollInterval = setInterval(() => {
        const itemWidth = carousel.querySelector('.testimonial-card').offsetWidth;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        if (carousel.scrollLeft >= maxScroll - 10) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      }, 3000);
    };

    startScroll();

    carousel.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    carousel.addEventListener('mouseleave', startScroll);
    carousel.addEventListener('focusin', () => clearInterval(scrollInterval));
    carousel.addEventListener('focusout', startScroll);
  }

  /* ==========================================================================
     9. Coming Soon Countdown
     ========================================================================== */
  const countdownEl = document.querySelector('.countdown-timer');
  if (countdownEl) {
    const targetDate = new Date('2026-09-01T00:00:00').getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const diff = targetDate - now;
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('cd-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('cd-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('cd-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('cd-seconds').textContent = seconds.toString().padStart(2, '0');
      }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ==========================================================================
     10. Back to Top Button
     ========================================================================== */
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to Top');
  backToTopBtn.innerHTML = '<i class="ph-bold ph-arrow-up"></i>';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
