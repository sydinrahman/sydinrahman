document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle Logic ---
  const links = document.querySelectorAll('a[href^="#"]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  function closeMobileMenu() {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.textContent = 'menu';
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    const isHidden = mobileMenu.classList.toggle('hidden');
    const isOpen = !isHidden;
    if (menuIcon) {
      menuIcon.textContent = isOpen ? 'close' : 'menu';
    }
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close menu on resize to desktop (Optimized with { passive: true } to prevent blocking scroll/layout thread)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  }, { passive: true });

  // --- Smooth Scrolling ---
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeMobileMenu();
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // --- Scrollspy Navigation Highlighting ---
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  function setActiveNavLink(id) {
    navLinks.forEach((link) => {
      const linkPath = link.getAttribute('data-path');
      const indicator = link.querySelector('.nav-indicator');
      if (linkPath === id) {
        link.classList.add('text-primary', 'font-medium');
        link.classList.remove('text-on-surface-variant');
        if (indicator) indicator.classList.remove('scale-x-0');
      } else {
        link.classList.remove('text-primary', 'font-medium');
        link.classList.add('text-on-surface-variant');
        if (indicator) indicator.classList.add('scale-x-0');
      }
    });

    mobileNavLinks.forEach((link) => {
      const linkPath = link.getAttribute('data-path');
      if (linkPath === id) {
        link.classList.add('bg-surface-container-high', 'text-primary', 'font-medium');
        link.classList.remove('text-on-surface-variant');
      } else {
        link.classList.remove('bg-surface-container-high', 'text-primary', 'font-medium');
        link.classList.add('text-on-surface-variant');
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveNavLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // --- Scroll Reveal Animations ---
  const animateElements = document.querySelectorAll(
    'section, .glass-card, .glass-card-accent, .card-hover-effect'
  );

  animateElements.forEach((el) => {
    el.classList.add('fade-in-up');
  });

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  // Performance Optimization: Unobserve elements once revealed and remove 'will-change' after animation
  // to free up GPU hardware layers and improve scrolling FPS performance.
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('visible');
        observer.unobserve(el);

        // Remove will-change hint after transition completes (600ms) to conserve GPU memory
        setTimeout(() => {
          el.style.willChange = 'auto';
        }, 650);
      }
    });
  }, revealObserverOptions);

  animateElements.forEach((el) => revealObserver.observe(el));

  // --- Floating Back-To-Top Button ---
  const backToTopBtn = document.getElementById('back-to-top-btn');

  if (backToTopBtn) {
    // Performance Optimization: Add { passive: true } to scroll listener so the browser doesn't block scrolling waiting for JS execution
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Email Copy Feedback ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  if (copyEmailBtn && copyFeedback) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('contact@sydinrahman.com').then(() => {
        copyFeedback.classList.remove('opacity-0');
        setTimeout(() => {
          copyFeedback.classList.add('opacity-0');
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy address:', err);
      });
    });
  }

  // --- Modal Open/Close Logic for Venture Visual Showcase ---
  const modalOpenBtns = document.querySelectorAll('.modal-open-btn');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
  const modalOverlays = document.querySelectorAll('.modal-overlay');

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  modalOpenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modalId = btn.getAttribute('data-modal');
      if (modalId) openModal(modalId);
    });
  });

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlays.forEach((modal) => {
        if (!modal.classList.contains('hidden')) {
          closeModal(modal);
        }
      });
    }
  });
});
