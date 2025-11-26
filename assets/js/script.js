document.addEventListener('DOMContentLoaded', () => {

  /* ============================
     MOBILE NAV
  ============================ */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Close nav when clicking outside or pressing Escape
  document.addEventListener('click', (e) => {
    if (!nav || !navToggle) return;
    if (!nav.classList.contains('is-open')) return;
    const withinNav = nav.contains(e.target) || navToggle.contains(e.target);
    if (!withinNav) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });



  /* ============================
     HERO SLIDER (AUTO)
  ============================ */
  // HERO SLIDER: accessible autoplay + controls + pause on hover/focus
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = Array.from(heroSlider.querySelectorAll('.hero-slide'));
    const prevBtn = heroSlider.querySelector('.hero-prev');
    const nextBtn = heroSlider.querySelector('.hero-next');
    const playBtn = heroSlider.querySelector('.hero-play');
    const status = document.getElementById('heroStatus');

    let current = 0;
    let autoplay = true;
    const AUTOPLAY_MS = 4000;
    let timer = null;

    function showSlide(i, updateAnnounce = true) {
      slides.forEach((s, idx) => {
        const active = idx === ((i % slides.length) + slides.length) % slides.length;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      current = ((i % slides.length) + slides.length) % slides.length;
      if (status && updateAnnounce) {
        status.textContent = `תמונה ${current + 1} מתוך ${slides.length}`;
      }
    }

    function nextSlide() { showSlide(current + 1); }
    function prevSlide() { showSlide(current - 1); }

    function startAutoplay() {
      if (timer) clearInterval(timer);
      if (autoplay) timer = setInterval(nextSlide, AUTOPLAY_MS);
    }
    function stopAutoplay() { if (timer) clearInterval(timer); timer = null; }

    // Initial state
    if (slides.length > 0) showSlide(0, false);
    startAutoplay();

    // Controls
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
    if (playBtn) playBtn.addEventListener('click', () => {
      autoplay = !autoplay;
      playBtn.setAttribute('aria-pressed', autoplay ? 'false' : 'true');
      playBtn.textContent = autoplay ? '⏯' : '⏸';
      if (autoplay) startAutoplay(); else stopAutoplay();
    });

    // Pause on hover or focus inside slider
    heroSlider.addEventListener('mouseenter', () => { stopAutoplay(); });
    heroSlider.addEventListener('mouseleave', () => { if (autoplay) startAutoplay(); });
    heroSlider.addEventListener('focusin', () => { stopAutoplay(); });
    heroSlider.addEventListener('focusout', () => { if (autoplay) startAutoplay(); });

    // Keyboard support when focused on slider
    heroSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prevSlide(); startAutoplay(); }
      if (e.key === 'ArrowRight') { nextSlide(); startAutoplay(); }
    });
  }



  /* ============================
     NEWS PAGE – YOUTUBE MODAL
  ============================ */
  const videoCards = document.querySelectorAll('.video-card');
  const modal = document.getElementById('videoModal');
  const modalClose = modal?.querySelector('.video-modal-close');
  const modalTitle = modal?.querySelector('#videoTitle');
  const modalDesc = modal?.querySelector('#videoDesc');
  const iframe = document.createElement('iframe');

  // Configure iframe only once
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', 'true');
  iframe.setAttribute(
    'allow',
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
  );
  iframe.style.width = '100%';
  iframe.style.height = '100%';

  // Click on video card → open modal
  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.video;   // YouTube embed URL
      const title = card.dataset.title;
      const desc = card.dataset.desc;

      // Normalize YouTube URL to a safe embed format
      function normalizeYouTubeEmbed(input) {
        if (!input) return '';
        // If someone left placeholder
        if (/YOUR_ID/i.test(input)) return '';

        // Remove duplicate embeds first (e.g., https://www.youtube.com/embed/https://www.youtube.com/embed/ID)
        let clean = input.replace(/https:\/\/www\.youtube\.com\/embed\/https:\/\/www\.youtube\.com\/embed\//g, 'https://www.youtube.com/embed/');
        clean = clean.replace(/www\.youtube\.com\/embed\/www\.youtube\.com\/embed\//g, 'www.youtube.com/embed/');

        // Try to extract the video id from many possible formats
        // Examples: https://www.youtube.com/embed/ID, https://youtu.be/ID, watch?v=ID, ID?si=...
        const re = /(?:embed\/|youtu\.be\/|watch\?v=|v\/)([A-Za-z0-9_-]{5,})/;
        const m = clean.match(re);
        let id = m ? m[1] : null;
        
        // If not found, maybe input is already an id (with query params)
        if (!id) {
          const maybeId = clean.match(/^([A-Za-z0-9_-]{5,})/);
          if (maybeId) id = maybeId[1];
        }
        
        if (!id) return '';
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      }

      const embedUrl = normalizeYouTubeEmbed(url);
      if (!embedUrl) return; // ignore placeholders

      // Use existing iframe in modal if present to avoid recreating nodes
      const existing = modal.querySelector('#videoFrame');
      if (existing) {
        existing.src = embedUrl;
      } else {
        iframe.src = embedUrl; // load YouTube
        modal.querySelector('.video-player-wrap').innerHTML = '';
        modal.querySelector('.video-player-wrap').appendChild(iframe);
      }

      if (modalTitle) modalTitle.textContent = title || '';
      if (modalDesc) modalDesc.textContent = desc || '';

      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.setAttribute('hidden', '');
      // clear both created iframe and existing one if present
      const existing = modal.querySelector('#videoFrame');
      if (existing) existing.src = '';
      iframe.src = ''; // stop playback if we had appended one
      document.body.style.overflow = '';
    });
  }

  // Close modal if clicking background
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.setAttribute('hidden', '');
        // clear both created iframe and existing one if present
        const existing = modal.querySelector('#videoFrame');
        if (existing) existing.src = '';
        iframe.src = '';
        document.body.style.overflow = '';
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
        modal.setAttribute('hidden', '');
        const existing = modal.querySelector('#videoFrame');
        if (existing) existing.src = '';
        iframe.src = '';
        document.body.style.overflow = '';
      }
    });
  }
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
