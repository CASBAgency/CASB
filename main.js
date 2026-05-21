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