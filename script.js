document.addEventListener('DOMContentLoaded', () => {
  // --- Cursor Spotlight Follower ---
  const cursorSpotlight = document.getElementById('cursor-spotlight');
  if (cursorSpotlight && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorSpotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
      cursorSpotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
      cursorSpotlight.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursorSpotlight.style.opacity = '0';
    });
  }

  // --- Hero Mouse Parallax & 3D Tilt Interaction ---
  const heroContainer = document.getElementById('hero-container');
  const heroHeadline = document.getElementById('hero-headline');
  const hero3dCard = document.getElementById('hero-3d-card');
  const parallaxCards = document.querySelectorAll('.hero-parallax-card');

  if (heroContainer && window.matchMedia('(pointer: fine)').matches) {
    heroContainer.addEventListener('mousemove', (e) => {
      const rect = heroContainer.getBoundingClientRect();
      const relativeX = e.clientX - rect.left - rect.width / 2;
      const relativeY = e.clientY - rect.top - rect.height / 2;

      // 1. Text movement: Headline shifts 2-5px based on mouse
      if (heroHeadline) {
        const shiftX = (relativeX / rect.width) * 8; // ~4px
        const shiftY = (relativeY / rect.height) * 8;
        heroHeadline.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
      }

      // 2. Interactive hero image card 3D tilt
      if (hero3dCard) {
        const cardRotateX = (relativeY / rect.height) * -12; // Max 6 deg
        const cardRotateY = (relativeX / rect.width) * 12;
        hero3dCard.style.transform = `perspective(1000px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg) scale(1.02)`;
      }

      // 3. Floating idea cards parallax tracking at differing speeds
      parallaxCards.forEach((card) => {
        const speed = parseFloat(card.getAttribute('data-speed') || '0.03');
        const moveX = relativeX * speed;
        const moveY = relativeY * speed;
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });

    heroContainer.addEventListener('mouseleave', () => {
      if (heroHeadline) {
        heroHeadline.style.transform = 'translate(0px, 0px)';
      }
      if (hero3dCard) {
        hero3dCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
      parallaxCards.forEach((card) => {
        card.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // --- Magnetic Buttons Motion ---
  const magneticBtns = document.querySelectorAll('.btn-magnetic');
  if (window.matchMedia('(pointer: fine)').matches) {
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  function closeMobileMenu() {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.textContent = 'menu';
    }
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    const isHidden = mobileMenu.classList.toggle('hidden');
    if (menuIcon) {
      menuIcon.textContent = isHidden ? 'menu' : 'close';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  }, { passive: true });

  // --- Smooth Scroll & Navigation Highlighting ---
  const links = document.querySelectorAll('a[href^="#"]');
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

  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  function setActiveNavLink(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const indicator = link.querySelector('.nav-indicator');
      if (href === `#${id}`) {
        link.classList.add('text-dark', 'font-semibold');
        link.classList.remove('text-muted');
        if (indicator) indicator.classList.remove('scale-x-0');
      } else {
        link.classList.remove('text-dark', 'font-semibold');
        link.classList.add('text-muted');
        if (indicator) indicator.classList.add('scale-x-0');
      }
    });

    mobileNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('text-dark', 'font-bold');
        link.classList.remove('text-muted');
      } else {
        link.classList.remove('text-dark', 'font-bold');
        link.classList.add('text-muted');
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

  // --- Scroll Text / Card Reveal Animation ---
  const scrollElements = document.querySelectorAll('section, .glass-card, .venture-card');
  scrollElements.forEach((el) => {
    if (!el.classList.contains('hero-text-reveal')) {
      el.classList.add('scroll-reveal');
    }
  });

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -40% 0px',
    threshold: 0.05
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  scrollElements.forEach((el) => revealObserver.observe(el));

  // --- Floating Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
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

  // --- Copy Email Clipboard ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  if (copyEmailBtn && copyFeedback) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('contact@sydinrahman.com').then(() => {
        copyFeedback.classList.remove('opacity-0');
        setTimeout(() => {
          copyFeedback.classList.add('opacity-0');
        }, 2500);
      }).catch((err) => {
        console.error('Failed to copy email:', err);
      });
    });
  }

  // --- Modal View Logic ---
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
