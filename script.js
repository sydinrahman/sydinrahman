document.addEventListener('DOMContentLoaded', () => {
  // Mobile drawer toggle elements
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const panel = document.getElementById('mobile-drawer-panel');
  const closeBtn = document.getElementById('mobile-drawer-close');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.remove('pointer-events-none');
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    panel.classList.remove('translate-x-full');
    panel.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer) return;
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    panel.classList.remove('translate-x-0');
    panel.classList.add('translate-x-full');
    document.body.style.overflow = '';
    setTimeout(() => {
      drawer.classList.add('pointer-events-none');
    }, 300);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', openDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Smooth scrolling for anchor links & close drawer when link clicked
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeDrawer();

      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Active section scrollspy highlighting
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('header nav a[href^="#"]');

  function highlightActiveNav() {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach((link) => {
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('text-primary', 'font-semibold', 'active-nav-link');
            link.classList.remove('text-on-surface-variant');
          } else {
            link.classList.remove('text-primary', 'font-semibold', 'active-nav-link');
            link.classList.add('text-on-surface-variant');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);
  highlightActiveNav();
});
