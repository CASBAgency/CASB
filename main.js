// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Branch item active state
document.querySelectorAll('.branch-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.branch-item').forEach(i => {
      i.classList.remove('active');
    });

    item.classList.add('active');
  });
});

// Add confidence-building content page to the existing navigation.
const navLinksList = document.querySelector('.nav-links');
if (navLinksList && !navLinksList.querySelector('a[href="insights/"]')) {
  const branchesLink = navLinksList.querySelector('a[href="#branches"]');
  const insightsItem = document.createElement('li');
  insightsItem.innerHTML = '<a href="insights/">Insights</a>';
  if (branchesLink && branchesLink.parentElement) {
    navLinksList.insertBefore(insightsItem, branchesLink.parentElement);
  } else {
    navLinksList.appendChild(insightsItem);
  }
}

const footerQuickLinks = document.querySelector('.footer-column');
if (footerQuickLinks && !footerQuickLinks.querySelector('a[href="insights/"]')) {
  const branchesFooterLink = footerQuickLinks.querySelector('a[href="#branches"]');
  const insightsFooterLink = document.createElement('a');
  insightsFooterLink.href = 'insights/';
  insightsFooterLink.textContent = 'Insights';
  if (branchesFooterLink) {
    footerQuickLinks.insertBefore(insightsFooterLink, branchesFooterLink);
  } else {
    footerQuickLinks.appendChild(insightsFooterLink);
  }
}

// Replace old placeholder links with completed pages.
document.querySelectorAll('a[href="coming-soon.html"]').forEach(link => {
  const label = link.textContent.toLowerCase();

  if (label.includes('our team')) {
    link.href = 'team/';
  } else if (label.includes('mdrt') || label.includes('million dollar round table')) {
    link.href = 'mdrt/mdrt.html';
  } else if (label.includes('monthly')) {
    link.href = 'monthly-achievers/monthly.html';
  } else if (label.includes('event') || label.includes('gala') || label.includes('seminar') || label.includes('convention') || label.includes('trip') || label.includes('ceremony')) {
    link.href = 'events/';
  } else if (label.includes('million dollar agency')) {
    link.href = 'mda-award/mda-award.html';
  } else {
    link.href = 'events/';
  }
});

const achievementCards = document.querySelectorAll('.achievements-grid .ach-card-link');
const achievementUpdates = [
  {
    href: 'achievements/star-master-awards.html',
    year: 'STAR MASTER AWARDS',
    title: 'Star Master Awards',
    body: 'A dedicated gallery for Star Master recognition photos, ceremony highlights, and award moments.'
  },
  {
    href: 'achievements/a4cc-members.html',
    year: 'A4CC MEMBERS',
    title: 'A4CC Members',
    body: 'Showcasing A4CC members, member portraits, group recognition, and qualification highlights.'
  },
  {
    href: 'achievements/outstanding-performers.html',
    year: 'OUTSTANDING PERFORMERS',
    title: 'Outstanding Performers',
    body: 'A gallery for top advisors, performance milestones, and standout CASB achievers.'
  }
];

achievementCards.forEach((card, index) => {
  const item = achievementUpdates[index];
  if (!item) return;
  card.href = item.href;
  const year = card.querySelector('.ach-year');
  const title = card.querySelector('.ach-title');
  const body = card.querySelector('.ach-body');
  if (year) year.textContent = item.year;
  if (title) title.textContent = item.title;
  if (body) body.textContent = item.body;
});

const eventCards = document.querySelectorAll('#events .event-card-link');
const eventUpdates = [
  {
    href: 'events/agency-award-ceremony.html',
    label: 'Agency Awards',
    date: '14 May 2026',
    title: 'Agency Award Ceremony',
    body: 'Celebrating CASB achievers, leaders, and advisors whose commitment continues to strengthen the organisation.'
  },
  {
    href: 'events/aglc-action-group-leader-conference.html',
    label: 'Leadership Conference',
    date: '18 Apr 2026',
    title: 'AGLC - Action Group Leader Conference',
    body: 'A leadership conference reserved for future event photos, highlights, and team memories.'
  },
  {
    href: 'events/sibu-business-conference-trip.html',
    label: 'Business Conference',
    date: '13 Mar 2026',
    title: 'Sibu Business Conference Trip',
    body: 'A business conference trip bringing advisors together for learning, connection, and renewed momentum across the team.'
  }
];

eventCards.forEach((card, index) => {
  const item = eventUpdates[index];
  if (!item) return;
  card.href = item.href;
  const label = card.querySelector('.img-label');
  const date = card.querySelector('.event-date-badge');
  const title = card.querySelector('.event-body h3');
  const body = card.querySelector('.event-body p');
  if (label) label.textContent = item.label;
  if (date) date.textContent = item.date;
  if (title) title.textContent = item.title;
  if (body) body.textContent = item.body;
});

const eventsMore = document.querySelector('.events-more');
if (eventsMore) {
  eventsMore.style.justifyContent = 'flex-end';
  const link = eventsMore.querySelector('a');
  if (link) {
    link.href = 'events/';
    link.textContent = 'See More';
    link.classList.remove('btn-outline');
    link.classList.add('btn-primary');
    link.style.color = '#fff';
  }
}

const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Nav hide / show on scroll
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

if (nav) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 767 || navLinks?.classList.contains('active')) {
      nav.classList.remove('nav-hidden');
      lastScrollY = window.scrollY;
      return;
    }

    const currentScrollY = window.scrollY;

    if (currentScrollY <= 20) {
      nav.classList.remove('nav-hidden');
    } else if (currentScrollY > lastScrollY) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  });

  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 767 && e.clientY <= 90) {
      nav.classList.remove('nav-hidden');
    }
  });
}

// Nav active highlight on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    const navLink = document.querySelector(
      `.nav-links a[href="#${sectionId}"]`
    );

    if (!navLink) return;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLink.style.color = '#E8C96A';
    } else {
      navLink.style.color = '';
    }
  });
});

// Achievement carousel arrows and autoplay
document.querySelectorAll('.ach-carousel').forEach(carousel => {
  const slides = carousel.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = 0;

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[i].classList.add('active');
  }

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4500);
});

// Event cover slideshows
document.querySelectorAll('.cover-slideshow').forEach(slideshow => {
  const slides = Array.from(slideshow.querySelectorAll('.cover-slide'));
  const dots = Array.from(slideshow.querySelectorAll('.cover-dot'));
  const prevBtn = slideshow.querySelector('.cover-prev');
  const nextBtn = slideshow.querySelector('.cover-next');

  if (slides.length <= 1) return;

  let index = slides.findIndex(slide => slide.classList.contains('active'));
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
  let timer = window.setInterval(() => showSlide(index + 1), 4800);
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Contact form AJAX (stays on page, no redirect to Formspree)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const submitBtn = contactForm.querySelector('[type="submit"]');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.innerHTML = '<div style="padding:40px 0;text-align:center;"><div style="font-size:40px;margin-bottom:16px;">✓</div><h3 style="font-family:'Playfair Display',serif;font-size:22px;margin-bottom:10px;color:#fff;">Message Sent</h3><p style="color:rgba(255,255,255,0.6);">Thank you for reaching out. Our team will get back to you shortly.</p></div>';
      } else {
        submitBtn.textContent = 'Try Again';
        submitBtn.disabled = false;
        alert('Something went wrong. Please email us at admin@casb2u.com');
      }
    } catch {
      submitBtn.textContent = 'Try Again';
      submitBtn.disabled = false;
      alert('Network error. Please try again or email admin@casb2u.com');
    }
  });
}
