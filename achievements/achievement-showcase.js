document.querySelectorAll('[data-year-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const year = link.dataset.yearLink;
    document.querySelectorAll('[data-year-link]').forEach((item) => item.classList.toggle('active', item.dataset.yearLink === year));
    document.querySelectorAll('[data-year-section]').forEach((section) => section.classList.toggle('active', section.dataset.yearSection === year));
    history.replaceState(null, '', `#year-${year}`);
  });
});
const requestedYear = location.hash.replace('#year-', '');
if (requestedYear) {
  const requestedLink = document.querySelector(`[data-year-link="${requestedYear}"]`);
  if (requestedLink) requestedLink.click();
}
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('img'));
  if (slides.length <= 1) return;
  let index = 0;
  slides[0].classList.add('active');
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

