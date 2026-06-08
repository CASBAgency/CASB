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