document.querySelectorAll('[data-year-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const year = link.dataset.yearLink;
    document.querySelectorAll('[data-year-link]').forEach((item) => item.classList.toggle('active', item.dataset.yearLink === year));
    document.querySelectorAll('[data-year-section]').forEach((section) => section.classList.toggle('active', section.dataset.yearSection === year));
    document.querySelector(`[data-year-section="${year}"] .portrait-scroll`)?.scrollTo({ left: 0, behavior: 'smooth' });
    history.replaceState(null, '', `#year-${year}`);
  });
});
const requestedYear = location.hash.replace('#year-', '');
if (requestedYear) {
  const requestedLink = document.querySelector(`[data-year-link="${requestedYear}"]`);
  if (requestedLink) requestedLink.click();
}
document.querySelectorAll('.portrait-scroll').forEach((scroll) => {
  const cards = Array.from(scroll.querySelectorAll('.achievement-card'));
  cards
    .sort((a, b) => getStarLevel(b) - getStarLevel(a) || getCardTitle(a).localeCompare(getCardTitle(b)))
    .forEach((card) => scroll.appendChild(card));

  if (cards.length < 2 || scroll.closest('.portrait-carousel')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'portrait-carousel';
  scroll.parentNode.insertBefore(wrapper, scroll);

  const previous = document.createElement('button');
  previous.className = 'portrait-arrow portrait-arrow-prev';
  previous.type = 'button';
  previous.setAttribute('aria-label', 'Previous achievement');
  previous.textContent = '‹';

  const next = document.createElement('button');
  next.className = 'portrait-arrow portrait-arrow-next';
  next.type = 'button';
  next.setAttribute('aria-label', 'Next achievement');
  next.textContent = '›';

  wrapper.append(previous, scroll, next);

  let autoRoll = null;
  const move = (direction) => {
    const firstCard = scroll.querySelector('.achievement-card');
    const gap = parseFloat(getComputedStyle(scroll).columnGap) || 0;
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : scroll.clientWidth * 0.8;
    const maxLeft = scroll.scrollWidth - scroll.clientWidth - 4;
    const nextLeft = scroll.scrollLeft + (direction * step);

    if (direction > 0 && nextLeft >= maxLeft) {
      scroll.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direction < 0 && nextLeft <= 0) {
      scroll.scrollTo({ left: scroll.scrollWidth, behavior: 'smooth' });
      return;
    }

    scroll.scrollBy({ left: direction * step, behavior: 'smooth' });
  };
  const restartAutoRoll = () => {
    if (autoRoll) window.clearInterval(autoRoll);
    autoRoll = window.setInterval(() => {
      if (document.querySelector('[data-achievement-lightbox]')?.classList.contains('open')) return;
      if (scroll.closest('[data-year-section]')?.classList.contains('active')) move(1);
    }, 3600);
  };

  previous.addEventListener('click', () => { move(-1); restartAutoRoll(); });
  next.addEventListener('click', () => { move(1); restartAutoRoll(); });
  wrapper.addEventListener('mouseenter', () => { if (autoRoll) window.clearInterval(autoRoll); });
  wrapper.addEventListener('mouseleave', restartAutoRoll);
  wrapper.addEventListener('focusin', () => { if (autoRoll) window.clearInterval(autoRoll); });
  wrapper.addEventListener('focusout', restartAutoRoll);
  restartAutoRoll();
});
function getStarLevel(card) {
  const text = card.textContent || '';
  const match = text.match(/(\d+)\s*[- ]?\s*Star/i);
  return match ? Number(match[1]) : 0;
}
function getCardTitle(card) {
  return card.querySelector('h2')?.textContent?.trim() || '';
}
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('img'));
  if (!slides.length) return;

  let index = 0;
  slides[0].classList.add('active');

  if (slides.length === 1) return;

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 2800);
});
const lightbox = document.querySelector('[data-achievement-lightbox]');
if (lightbox) {
  const image = lightbox.querySelector('img');
  const close = lightbox.querySelector('button');
  document.querySelectorAll('[data-lightbox-src]').forEach((card) => {
    const open = () => {
      image.src = card.dataset.lightboxSrc;
      image.alt = card.querySelector('img')?.alt || 'Achievement photo';
      lightbox.classList.add('open');
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
    });
  });
  close.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') lightbox.classList.remove('open'); });
}

