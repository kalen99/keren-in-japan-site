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
  // HERO SLIDER: accessible autoplay with swipe-right transition
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = Array.from(heroSlider.querySelectorAll('.hero-slide'));
    const status = document.getElementById('heroStatus');

    let current = 0;
    let autoplay = true;
    const AUTOPLAY_MS = 4000; // 4 seconds
    let timer = null;

    function showSlide(i, updateAnnounce = true) {
      const nextIndex = ((i % slides.length) + slides.length) % slides.length;
      
      // Add exiting class to current slide
      if (slides[current]) {
        slides[current].classList.add('is-exiting');
        slides[current].classList.remove('is-active');
      }
      
      // Remove exiting class after animation
      setTimeout(() => {
        slides.forEach(s => s.classList.remove('is-exiting'));
      }, 800);
      
      // Activate next slide with swipe-right effect
      slides.forEach((s, idx) => {
        const active = idx === nextIndex;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      
      current = nextIndex;
      
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
    if (slides.length > 0) {
      slides[0].classList.add('is-active');
      slides[0].setAttribute('aria-hidden', 'false');
      slides.forEach((s, idx) => {
        if (idx !== 0) s.setAttribute('aria-hidden', 'true');
      });
      if (status) status.textContent = `תמונה 1 מתוך ${slides.length}`;
    }
    startAutoplay();

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



  /* ============================
     FEATURE VIDEO POPUP (GLOBAL)
  ============================ */
  const featureModal = document.getElementById('featureVideoModal');
  const featureTriggers = document.querySelectorAll('.open-feature-video');
  const featureClose = featureModal?.querySelector('.video-popup-close');
  const featureFrame = featureModal?.querySelector('#featureVideoFrame');
  const featureSrc = featureFrame?.dataset.src || '';

  const openFeatureModal = () => {
    if (!featureModal) return;
    featureModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (featureFrame && featureSrc) {
      const sep = featureSrc.includes('?') ? '&' : '?';
      featureFrame.src = `${featureSrc}${sep}autoplay=1`;
    }
  };

  const closeFeatureModal = () => {
    if (!featureModal) return;
    featureModal.setAttribute('hidden', '');
    if (featureFrame) featureFrame.src = '';
    document.body.style.overflow = '';
  };

  featureTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openFeatureModal();
    });
  });

  if (featureClose) {
    featureClose.addEventListener('click', closeFeatureModal);
  }

  if (featureModal) {
    featureModal.addEventListener('click', (e) => {
      if (e.target === featureModal) closeFeatureModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && featureModal && !featureModal.hasAttribute('hidden')) {
      closeFeatureModal();
    }
  });
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================
     SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  ============================ */
  // Add fade-in-up animation to elements as they enter viewport
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in-up class
  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });

  // Also add animation classes to service cards and sections dynamically
  document.querySelectorAll('.service-card, .media-hub-card, .about-section, .services-home-section').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });

  /* ============================
     COLLAPSIBLE MEDIA SECTIONS
  ============================ */
  const mediaToggles = document.querySelectorAll('.media-section-toggle');
  mediaToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const sectionId = toggle.dataset.section;
      const content = document.getElementById(sectionId);
      const icon = toggle.querySelector('.toggle-icon');
      
      if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.style.transform = 'rotate(90deg)';
      } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
      }
    });
  });

});
