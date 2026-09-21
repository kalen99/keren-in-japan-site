document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
     DIALOG HELPERS (focus management)
     Moves focus into an opened dialog, keeps Tab inside it,
     and returns focus to the element that opened it.
  ============================ */
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
  let activeDialog = null;
  let returnFocusTo = null;

  function focusableIn(container) {
    return Array.from(container.querySelectorAll(FOCUSABLE)).filter(el => el.offsetParent !== null);
  }

  function dialogOpened(dialogEl, initialFocusEl) {
    returnFocusTo = document.activeElement;
    activeDialog = dialogEl;
    const target = initialFocusEl || focusableIn(dialogEl)[0];
    if (target) target.focus();
  }

  function dialogClosed() {
    activeDialog = null;
    if (returnFocusTo && document.contains(returnFocusTo) && typeof returnFocusTo.focus === 'function') {
      returnFocusTo.focus();
    }
    returnFocusTo = null;
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !activeDialog) return;
    const items = focusableIn(activeDialog);
    if (!items.length) { e.preventDefault(); return; }
    const first = items[0];
    const last = items[items.length - 1];
    const inside = activeDialog.contains(document.activeElement);
    if (e.shiftKey && (document.activeElement === first || !inside)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
      e.preventDefault();
      first.focus();
    }
  });



  /* ============================
     HERO SLIDER (AUTO)
     - Visible pause/play button (WCAG 2.2.2)
     - Previous / next buttons
     - Starts paused when the user prefers reduced motion
     - Slide changes are only announced to screen readers when
       the user navigates manually, not on every autoplay tick
  ============================ */
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = Array.from(heroSlider.querySelectorAll('.hero-slide'));
    const status = document.getElementById('heroStatus');
    const btnPrev = heroSlider.querySelector('.hero-prev');
    const btnNext = heroSlider.querySelector('.hero-next');
    const btnToggle = heroSlider.querySelector('.hero-toggle');

    let current = 0;
    let userPaused = prefersReducedMotion;   // pause/play button
    let hoverPaused = false;                 // temporary pause while pointer/focus is inside
    const AUTOPLAY_MS = 4000; // 4 seconds
    let timer = null;

    function showSlide(i, announce = true) {
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

      if (status && announce) {
        status.textContent = `תמונה ${current + 1} מתוך ${slides.length}`;
      }
    }

    function nextSlide(announce = true) { showSlide(current + 1, announce); }
    function prevSlide(announce = true) { showSlide(current - 1, announce); }

    function syncAutoplay() {
      const shouldRun = !userPaused && !hoverPaused && slides.length > 1;
      if (shouldRun && !timer) {
        timer = setInterval(() => nextSlide(false), AUTOPLAY_MS);
      } else if (!shouldRun && timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function syncToggleLabel() {
      if (btnToggle) btnToggle.textContent = userPaused ? 'הפעלה' : 'השהיה';
      if (btnToggle) btnToggle.setAttribute('aria-label', userPaused ? 'הפעלת מצגת התמונות' : 'השהיית מצגת התמונות');
    }

    // Initial state
    if (slides.length > 0) {
      slides[0].classList.add('is-active');
      slides[0].setAttribute('aria-hidden', 'false');
      slides.forEach((s, idx) => {
        if (idx !== 0) s.setAttribute('aria-hidden', 'true');
      });
      if (status) status.textContent = `תמונה 1 מתוך ${slides.length}`;
    }
    syncToggleLabel();
    syncAutoplay();

    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        userPaused = !userPaused;
        syncToggleLabel();
        syncAutoplay();
      });
    }
    if (btnPrev) btnPrev.addEventListener('click', () => prevSlide());
    if (btnNext) btnNext.addEventListener('click', () => nextSlide());

    // Pause on hover or focus inside slider
    heroSlider.addEventListener('mouseenter', () => { hoverPaused = true; syncAutoplay(); });
    heroSlider.addEventListener('mouseleave', () => { hoverPaused = false; syncAutoplay(); });
    heroSlider.addEventListener('focusin', () => { hoverPaused = true; syncAutoplay(); });
    heroSlider.addEventListener('focusout', () => { hoverPaused = false; syncAutoplay(); });

    // Keyboard support while focus is inside the slider (RTL: right arrow = previous)
    heroSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { nextSlide(); }
      if (e.key === 'ArrowRight') { prevSlide(); }
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
    // cc_load_policy=1 turns captions on by default when the video has them (SI 5568 1.2.2)
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&cc_load_policy=1&hl=he`;
  }

  function resetVideoFrames() {
    // clear both created iframe and existing one if present
    const existing = modal.querySelector('#videoFrame');
    if (existing) existing.src = '';
    iframe.src = ''; // stop playback if we had appended one
  }

  function openVideo(card) {
    const embedUrl = normalizeYouTubeEmbed(card.dataset.video);
    if (!embedUrl) return; // ignore placeholders

    const title = card.dataset.title || '';
    const desc = card.dataset.desc || '';
    const frameTitle = title ? `נגן וידאו: ${title}` : 'נגן וידאו';

    // Use existing iframe in modal if present to avoid recreating nodes
    const existing = modal.querySelector('#videoFrame');
    if (existing) {
      existing.title = frameTitle;
      existing.src = embedUrl;
    } else {
      iframe.title = frameTitle;
      iframe.src = embedUrl; // load YouTube
      modal.querySelector('.video-player-wrap').innerHTML = '';
      modal.querySelector('.video-player-wrap').appendChild(iframe);
    }

    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    dialogOpened(modal.querySelector('[role="dialog"]') || modal, modalClose);
  }

  function closeVideo() {
    modal.setAttribute('hidden', '');
    resetVideoFrames();
    document.body.style.overflow = '';
    dialogClosed();
  }

  // Cards are keyboard-operable buttons (Enter / Space) as well as clickable
  videoCards.forEach(card => {
    const title = card.dataset.title || '';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-haspopup', 'dialog');
    if (title) card.setAttribute('aria-label', `צפייה בסרטון: ${title}`);

    card.addEventListener('click', () => openVideo(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideo(card);
      }
    });
  });

  if (modal) {
    // Close button
    if (modalClose) modalClose.addEventListener('click', closeVideo);

    // Close modal if clicking background
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeVideo();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeVideo();
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
      featureFrame.src = featureSrc; // no autoplay, user clicks to play
    }
    dialogOpened(featureModal, featureClose);
  };

  const closeFeatureModal = () => {
    if (!featureModal) return;
    featureModal.setAttribute('hidden', '');
    if (featureFrame) featureFrame.src = '';
    document.body.style.overflow = '';
    dialogClosed();
    showUpdateNotice();
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

  /* ============================
     UPDATE NOTICE POPUP
     Opens after the feature video popup is closed (once per page load).
  ============================ */
  const noticeModal = document.getElementById('updateNoticeModal');
  let noticeShown = false;

  function openNoticeModal() {
    if (!noticeModal || noticeShown) return;
    noticeShown = true;
    noticeModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    dialogOpened(noticeModal, noticeModal.querySelector('.notice-popup-close'));
  }

  function closeNoticeModal() {
    if (!noticeModal) return;
    noticeModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    dialogClosed();
  }

  function showUpdateNotice() {
    if (noticeModal && !noticeShown) setTimeout(openNoticeModal, 300);
  }

  if (noticeModal) {
    noticeModal.querySelectorAll('[data-notice-close]').forEach(btn => btn.addEventListener('click', closeNoticeModal));
    noticeModal.addEventListener('click', (e) => {
      if (e.target === noticeModal) closeNoticeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !noticeModal.hasAttribute('hidden')) closeNoticeModal();
    });
  }
  // Auto-open on page load (no autoplay; user still clicks play)
  if (featureModal) {
    setTimeout(() => {
      if (featureModal.hasAttribute('hidden')) {
        openFeatureModal();
      }
    }, 900);
  }
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
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

});
