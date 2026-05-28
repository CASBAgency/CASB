(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-cover-slideshow]').forEach((slideshow) => {
    const slides = Array.from(slideshow.querySelectorAll('.event-cover-slide'));
    const counter = slideshow.querySelector('[data-cover-count]');
    if (slides.length <= 1) {
      if (counter) counter.textContent = slides.length ? `1 / ${slides.length}` : '';
      return;
    }

    let index = 0;
    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === index));
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
    };

    show(0);
    if (!reduceMotion) {
      window.setInterval(() => show(index + 1), 4200);
    }
  });

  document.querySelectorAll('[data-gallery-loop]').forEach((loop) => {
    const track = loop.querySelector('.event-gallery-track');
    const mobile = window.matchMedia('(max-width: 767px)');
    if (!track || mobile.matches) return;

    const originals = Array.from(track.children);
    originals.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add('event-gallery-clone');
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    const resetLoop = () => {
      const half = track.scrollWidth / 2;
      if (loop.scrollLeft >= half) loop.scrollLeft -= half;
      if (loop.scrollLeft <= 0) loop.scrollLeft += half;
    };

    loop.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      loop.scrollLeft += event.deltaY;
      resetLoop();
    }, { passive: false });

    loop.addEventListener('scroll', () => window.requestAnimationFrame(resetLoop));
    window.requestAnimationFrame(() => {
      loop.scrollLeft = Math.max(1, track.scrollWidth / 4);
    });
  });

  const lightbox = document.querySelector('[data-event-lightbox]');
  if (lightbox) {
    const image = lightbox.querySelector('[data-lightbox-image]');
    const caption = lightbox.querySelector('[data-lightbox-caption]');
    const download = lightbox.querySelector('[data-lightbox-download]');
    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    document.addEventListener('click', (event) => {
      const item = event.target.closest('[data-full]');
      if (!item) return;
      const src = item.getAttribute('data-full');
      const label = item.getAttribute('data-caption') || item.innerText.trim() || 'Event photo';
      image.src = src;
      image.alt = label;
      caption.textContent = label;
      download.href = src;
      download.download = src.split('/').pop() || 'event-photo.jpg';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target.closest('[data-lightbox-close]')) close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
  }

  document.querySelectorAll('[data-gallery-top]').forEach((button) => {
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });
})();
