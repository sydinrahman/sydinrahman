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

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });

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

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  animateElements.forEach((el) => revealObserver.observe(el));

  // --- Floating Back-To-Top Button ---
  const backToTopBtn = document.getElementById('back-to-top-btn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    });

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

  // --- Interactive Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formSubmitBtn && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.className = 'text-error font-medium text-body-sm transition-all duration-200';
        formStatus.classList.remove('hidden');
        return;
      }

      // Simulate sending feedback
      const originalBtnText = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `
        <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span>Sending...</span>
      `;

      setTimeout(() => {
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.className = 'text-[#16A34A] font-medium text-body-sm transition-all duration-200';
        formStatus.classList.remove('hidden');

        contactForm.reset();
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;

        setTimeout(() => {
          formStatus.classList.add('hidden');
        }, 5000);
      }, 1000);
    });
  }
});
