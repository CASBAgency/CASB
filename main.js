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

// Replace old placeholder links with completed pages.
document.querySelectorAll('a[href="coming-soon.html"]').forEach(link => {
  const label = link.textContent.toLowerCase();

  if (label.includes('our team')) {
    link.href = 'team/';
  } else if (label.includes('mdrt') || label.includes('million dollar round table')) {
    link.href = 'mdrt/mdrt.html';
  } else if (label.includes('monthly')) {
    link.href = 'monthly-achievers/monthly.html';
  } else if (label.includes('event') || label.includes('gala') || label.includes('seminar') || label.includes('convention')) {
    link.href = 'events/';
  } else if (label.includes('million dollar agency')) {
    link.href = 'mda-award/mda-award.html';
  }
});

// Nav hide / show on scroll
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

if (nav) {
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

  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 900 && e.clientY <= 90) {
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
