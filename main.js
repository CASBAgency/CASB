// Homepage interactions only. Page content and links live in index.html.
document.body.classList.add('js-loaded');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach((element) => {
  fadeObserver.observe(element);
});

document.querySelectorAll('.branch-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.branch-item').forEach((branch) => {
      branch.classList.remove('active');
    });
    item.classList.add('active');
  });
});

const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

let lastScrollY = window.scrollY;

if (nav) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 767 || navLinks?.classList.contains('active')) {
      nav.classList.remove('nav-hidden');
      lastScrollY = window.scrollY;
      return;
    }

    const currentScrollY = window.scrollY;

    if (currentScrollY <= 20 || currentScrollY < lastScrollY) {
      nav.classList.remove('nav-hidden');
    } else {
      nav.classList.add('nav-hidden');
    }

    lastScrollY = currentScrollY;
  });

  window.addEventListener('mousemove', (event) => {
    if (window.innerWidth > 767 && event.clientY <= 90) {
      nav.classList.remove('nav-hidden');
    }
  });
}

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (!navLink) return;

    navLink.classList.toggle('is-active', scrollY >= sectionTop && scrollY < sectionBottom);
  });
});

const MONTHLY_ACHIEVERS_FEATURED = {
  label: 'May 2026 Recognition',
  basePath: 'monthly-achievers/2026/MAY2026/',
  files: [
    'MAY1.png', 'MAY2.png', 'MAY3.png', 'MAY4.png', 'MAY5.png', 'MAY6.png',
    'MAY7.png', 'MAY8.png', 'MAY9.png', 'MAY10.png', 'MAY11.png', 'MAY12.png',
    'MAY13.png', 'MAY14.png', 'MAY15.png', 'MAY16.png', 'MAY17.png', 'MAY18.png'
  ]
};

const homeEventsCarousel = document.querySelector('[data-home-events-carousel]');
if (homeEventsCarousel) {
  const source = homeEventsCarousel.dataset.eventsSource || 'events/index.html';
  const sourceDir = source.includes('/') ? source.slice(0, source.lastIndexOf('/') + 1) : '';
  const track = homeEventsCarousel.querySelector('.home-events-track');
  const prevBtn = homeEventsCarousel.querySelector('.home-carousel-btn.prev');
  const nextBtn = homeEventsCarousel.querySelector('.home-carousel-btn.next');
  let eventSlides = [];
  let eventIndex = 0;
  let eventTimer;

  function resolveEventUrl(value) {
    if (!value || value.startsWith('http')) return value || 'events/';
    if (value.startsWith('../')) return value.replace(/^(\.\.\/)+/, '');
    return `${sourceDir}${value}`;
  }

  function normalizeRootPath(value) {
    if (!value || value.startsWith('http')) return value || 'assets/hero-bg.png';
    if (value.startsWith('../')) return value.replace(/^(\.\.\/)+/, '');
    return `${sourceDir}${value}`;
  }

  function createHomeEventCard(event) {
    const link = document.createElement('a');
    link.href = event.href;
    link.className = 'event-card-link home-event-slide';

    const card = document.createElement('div');
    card.className = 'event-card';

    const imageWrap = document.createElement('div');
    imageWrap.className = 'event-img';

    const image = document.createElement('img');
    image.loading = 'lazy';
    image.src = event.image;
    image.alt = event.alt || event.title;

    const date = document.createElement('div');
    date.className = 'event-date-badge';
    date.textContent = event.date;

    const body = document.createElement('div');
    body.className = 'event-body';

    const title = document.createElement('h3');
    title.textContent = event.title;

    const description = document.createElement('p');
    description.textContent = event.description;

    const readMore = document.createElement('span');
    readMore.className = 'read-more';
    readMore.textContent = 'View Event';

    imageWrap.append(image, date);
    body.append(title, description, readMore);
    card.append(imageWrap, body);
    link.append(card);

    return link;
  }

  function showHomeEvent(nextIndex) {
    if (!eventSlides.length) return;
    eventIndex = (nextIndex + eventSlides.length) % eventSlides.length;
    eventSlides.forEach((slide, slideIndex) => {
      const active = slideIndex === eventIndex;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
  }

  function startHomeEventAutoplay() {
    window.clearInterval(eventTimer);
    if (eventSlides.length > 1) {
      eventTimer = window.setInterval(() => showHomeEvent(eventIndex + 1), 5200);
    }
  }

  function moveHomeEvent(step) {
    showHomeEvent(eventIndex + step);
    startHomeEventAutoplay();
  }

  prevBtn?.addEventListener('click', () => moveHomeEvent(-1));
  nextBtn?.addEventListener('click', () => moveHomeEvent(1));
  homeEventsCarousel.addEventListener('mouseenter', () => window.clearInterval(eventTimer));
  homeEventsCarousel.addEventListener('mouseleave', startHomeEventAutoplay);

  fetch(source)
    .then((response) => {
      if (!response.ok) throw new Error('Events source unavailable');
      return response.text();
    })
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const events = Array.from(doc.querySelectorAll('.events-list .event-row'))
        .slice(0, 8)
        .map((row) => {
          const image = row.querySelector('.event-thumb img');
          return {
            href: resolveEventUrl(row.getAttribute('href') || 'events/'),
            image: normalizeRootPath(image?.getAttribute('src') || 'assets/hero-bg.png'),
            alt: image?.getAttribute('alt') || '',
            date: row.dataset.eventDate || '',
            title: row.dataset.eventTitle || row.querySelector('.event-content h2')?.textContent?.trim() || '',
            description: row.querySelector('.event-content p')?.textContent?.trim() || ''
          };
        })
        .filter((event) => event.href && event.title && event.image);

      if (!events.length) return;

      track.replaceChildren(...events.map(createHomeEventCard));
      eventSlides = Array.from(track.querySelectorAll('.home-event-slide'));
      showHomeEvent(0);
      startHomeEventAutoplay();
    })
    .catch(() => {
      eventSlides = Array.from(track.querySelectorAll('.home-event-slide'));
      showHomeEvent(0);
      startHomeEventAutoplay();
      homeEventsCarousel.dataset.eventsFallback = 'true';
    });
}

const monthlyAchieversCarousel = document.querySelector('[data-monthly-achievers-carousel]');
if (monthlyAchieversCarousel) {
  const label = document.querySelector('[data-monthly-achievers-label]');
  if (label) label.textContent = MONTHLY_ACHIEVERS_FEATURED.label;

  const nextBtn = monthlyAchieversCarousel.querySelector('.next');
  MONTHLY_ACHIEVERS_FEATURED.files.forEach((file, index) => {
    const image = document.createElement('img');
    image.src = `${MONTHLY_ACHIEVERS_FEATURED.basePath}${file}`;
    image.alt = `CASB ${MONTHLY_ACHIEVERS_FEATURED.label} poster ${index + 1}`;
    image.loading = index === 0 ? 'eager' : 'lazy';
    if (index === 0) image.classList.add('active');
    monthlyAchieversCarousel.insertBefore(image, nextBtn);
  });
}
document.querySelectorAll('.ach-carousel').forEach((carousel) => {
  const slides = carousel.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = 0;

  function showSlide(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });
  }

  nextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    showSlide(index + 1);
  });

  prevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    showSlide(index - 1);
  });

  window.setInterval(() => showSlide(index + 1), 4500);
});

document.querySelectorAll('.cover-slideshow').forEach((slideshow) => {
  const slides = Array.from(slideshow.querySelectorAll('.cover-slide'));
  const dots = Array.from(slideshow.querySelectorAll('.cover-dot'));
  const prevBtn = slideshow.querySelector('.cover-prev');
  const nextBtn = slideshow.querySelector('.cover-next');

  if (slides.length <= 1) return;

  let index = slides.findIndex((slide) => slide.classList.contains('active'));
  if (index < 0) index = 0;

  function showSlide(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  let timer = window.setInterval(() => showSlide(index + 1), 4800);

  function resetAutoplay() {
    window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(index + 1), 4800);
  }

  prevBtn?.addEventListener('click', () => {
    showSlide(index - 1);
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    showSlide(index + 1);
    resetAutoplay();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      showSlide(dotIndex);
      resetAutoplay();
    });
  });

  slideshow.addEventListener('mouseenter', () => window.clearInterval(timer));
  slideshow.addEventListener('mouseleave', resetAutoplay);

  showSlide(index);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const submitBtn = contactForm.querySelector('[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        contactForm.innerHTML = '<div class="form-success"><p class="form-success-icon">&#10003;</p><h3>Message Sent</h3><p>Thank you. Our team will be in touch shortly.</p></div>';
        return;
      }

      submitBtn.textContent = 'Try Again';
      submitBtn.disabled = false;
      window.alert('Something went wrong. Please email us at admin@casb2u.com');
    } catch {
      submitBtn.textContent = 'Try Again';
      submitBtn.disabled = false;
      window.alert('Network error. Please try again or email admin@casb2u.com');
    }
  });
}
