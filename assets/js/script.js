document.addEventListener('DOMContentLoaded', () => {
  /* ========== MOBILE NAV ========== */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========== HERO SLIDER (AUTO) ========== */
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    let index = 0;
    slides[0].classList.add('is-active');

    setInterval(() => {
      slides[index].classList.remove('is-active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('is-active');
    }, 2000);
  }
});

