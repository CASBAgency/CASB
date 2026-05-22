// ── SCROLL FADE-IN ──
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


// ── BRANCH ITEM ACTIVE STATE ──
document.querySelectorAll('.branch-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.branch-item').forEach(i => {
      i.classList.remove('active');
    });

    item.classList.add('active');
  });
});


// ── NAV HIDE / SHOW ON SCROLL ──
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
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


// ── DESKTOP: SHOW NAV WHEN MOUSE NEAR TOP ──
window.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 900 && e.clientY <= 90) {
    nav.classList.remove('nav-hidden');
  }
});


// ── NAV ACTIVE HIGHLIGHT ON SCROLL ──
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

// ── ACHIEVEMENT CAROUSEL ARROWS ──
document.querySelectorAll(".ach-carousel").forEach(carousel => {
  const images = carousel.querySelectorAll("img");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  if (!images.length || !prevBtn || !nextBtn) return;

  let index = 0;

  function showSlide(i) {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
  }

  nextBtn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();

    index = (index + 1) % images.length;
    showSlide(index);
  });

  prevBtn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();

    index = (index - 1 + images.length) % images.length;
    showSlide(index);
  });
});

// ── ACHIEVEMENT CARD CAROUSEL ──

document.querySelectorAll('.ach-carousel').forEach(carousel => {
  const slides = carousel.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  let index = 0;

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[i].classList.add('active');
  }

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();

    index = (index + 1) % slides.length;
    showSlide(index);
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();

    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4500);
});

/// ── HAMBURGER MENU ──
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
