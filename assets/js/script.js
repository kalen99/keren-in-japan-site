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



  /* ============================
     HERO SLIDER (AUTO)
  ============================ */
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

      iframe.src = url; // load YouTube
      modal.querySelector('.video-player-wrap').innerHTML = '';
      modal.querySelector('.video-player-wrap').appendChild(iframe);

      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.setAttribute('hidden', '');
      iframe.src = ''; // stop playback
      document.body.style.overflow = '';
    });
  }

  // Close modal if clicking background
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.setAttribute('hidden', '');
        iframe.src = '';
        document.body.style.overflow = '';
      }
    });
  }

});
