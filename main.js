// Shared CASB site interactions. Page content and links live in the HTML files.
document.body.classList.add('js-loaded');

const CASB_TRANSLATIONS = {
  zh: {
    common: [
      ['.nav-links a[href$="#about"], .nav-links a[href="../index.html#about"], .nav-links a[href="../../index.html#about"]', '关于我们'],
      ['.nav-links a[href$="team/"], .nav-links a[href="../team/"], .nav-links a[href="../../team/"]', '团队介绍'],
      ['.nav-links a[href$="#achievements"], .nav-links a[href="../index.html#achievements"], .nav-links a[href="../../index.html#achievements"]', '荣誉成就'],
      ['.nav-links a[href$="#events"], .nav-links a[href="../index.html#events"], .nav-links a[href="../../index.html#events"]', '活动'],
      ['.nav-links a[href$="insights/"], .nav-links a[href="index.html"], .nav-links a[href="../insights/"], .nav-links a[href="../index.html"], .nav-links a[href="../../insights/"], .nav-links a[href="../../insights/index.html"]', '资讯'],
      ['.nav-links a[href$="#branches"], .nav-links a[href="../index.html#branches"]', '分行'],
      ['.nav-links a[href$="#contact"], .nav-links a[href="../index.html#contact"], .nav-links a[href="../../index.html#contact"]', '联络我们'],
      ['.nav-links .nav-cta', '代理登录'],
      ['.footer-column h4', { map: { 'Quick Links': '快速链接', 'Contact': '联络方式', 'Opening Hours': '营业时间' } }],
      ['.footer-column a', {
        map: {
          'About Us': '关于我们',
          'Our Team': '团队介绍',
          'Achievements': '荣誉成就',
          'Events': '活动',
          'Insights': '资讯',
          'Branches': '分行',
          'Contact': '联络我们',
          'Privacy Notice': '隐私声明',
          'Terms of Use': '使用条款'
        }
      }]
    ],
    home: [
      ['.hero h1', '自 2006 年起，您值得信赖的<em>财富</em>规划伙伴', 'html'],
      ['.hero p', 'Care And Share Is Our Business。CASB Agency 是马来西亚领先的金融服务团队，全国服务超过 10,000 位客户。'],
      ['.hero .btn-primary', '了解更多'],
      ['.hero .btn-outline', '联系我们'],
      ['.hero-stats > div:nth-child(1) .stat-label', '百万美元代理'],
      ['.hero-stats > div:nth-child(2) .stat-label', '服务客户'],
      ['.hero-stats > div:nth-child(3) .stat-label', '分行据点'],
      ['.hero-stats > div:nth-child(4) .stat-label', '专业历程'],
      ['#about .section-tag', '我们的公司'],
      ['#about .section-title', 'CASB Agency Sdn Bhd'],
      ['#about .about-badge span', '百万美元代理'],
      ['#events .section-tag', '最新动态'],
      ['#events .section-title', '新闻与活动'],
      ['#branches .section-tag', '我们的据点'],
      ['#branches .section-title', '分行网络'],
      ['#contact .section-tag', '联系我们'],
      ['#contact .section-title', '让我们开始交流']
    ],
    campaign: [
      ['.campaign-actions .btn-primary, .campaign-form-actions .btn-primary', '我要预约'],
      ['.campaign-whatsapp', 'WhatsApp 我们'],
      ['.campaign-actions .btn-outline:not(.campaign-whatsapp), .campaign-form-actions .btn-outline', { map: { '查看地点': '查看地点', 'View Location': '查看地点' } }],
      ['.campaign-info-card h2', { map: { 'Why Attend?': '为什么参加？', "You'll Learn": '您将了解', 'Event Details': '活动详情' } }],
      ['#campaign-faq-title', '常见问题'],
      ['#campaign-form-title', '准备了解更多？']
    ],
    insights: [
      ['.ins-hero .kicker', 'CASB 资讯'],
      ['.ins-hero h1', '建立信心的<br><em>金融资讯</em>', 'html'],
      ['.ins-hero p', '阅读实用的保险、医疗卡、理赔、财富规划与事业发展文章，帮助您做出更清晰的财务决定。'],
      ['.ins-stat:nth-child(1) span', '实用文章'],
      ['.ins-stat:nth-child(2) span', '规划主题'],
      ['.ins-stat:nth-child(3) span', '马来西亚内容'],
      ['.tab-btn[data-filter="all"]', '全部'],
      ['.tab-btn[data-filter="protection"]', '保障规划'],
      ['.tab-btn[data-filter="medical"]', '医疗健康'],
      ['.tab-btn[data-filter="wealth"]', '财富退休'],
      ['.tab-btn[data-filter="planning"]', '规划基础'],
      ['.tab-btn[data-filter="casestudy"]', '案例分享'],
      ['#searchInput', { attr: 'placeholder', text: '搜索文章...' }],
      ['.featured-label', '精选文章'],
      ['.section-heading', '最新文章'],
      ['.sidebar-title', {
        map: {
          'Popular Topics': '热门主题',
          'Talk to an Advisor': '联系顾问'
        }
      }],
      ['.topic-item span:nth-child(2)', {
        map: {
          'Protection Planning': '保障规划',
          'Medical & Health': '医疗健康',
          'Wealth & Retirement': '财富退休',
          'Planning Basics': '规划基础',
          'Case Studies': '案例分享'
        }
      }]
    ],
    articles: [
      ['.art-cta h3', { map: { 'Need Help Understanding a Claim?': '需要协助了解理赔流程？' } }],
      ['.art-cta .cta-wa', 'WhatsApp 联系我们'],
      ['.art-cta .cta-mentor', '选择顾问 →'],
      ['.aside-title', { map: { 'In This Article': '本文目录', 'Share This Article': '分享文章' } }],
      ['#copyLink', '复制链接'],
      ['#shareWa', '分享']
    ]
  }
};

function createLanguageSwitcher() {
  const navList = document.querySelector('.nav-links');
  if (!navList || navList.querySelector('.language-switcher')) return;

  const path = window.location.pathname;
  const englishPath = path.replace(/^\/zh(?=\/|$)/, '') || '/';
  const isBilingual = englishPath === '/' || englishPath === '/index.html' ||
    englishPath === '/insights/' || englishPath === '/insights/index.html' ||
    /^\/insights\/articles\/[^/]+\.html$/.test(englishPath);
  if (!isBilingual) return;

  const chinesePath = englishPath === '/' ? '/zh/index.html' : `/zh${englishPath}`;

  const item = document.createElement('li');
  item.className = 'language-switcher';
  item.setAttribute('aria-label', 'Language selector');
  item.innerHTML = `
    <a data-lang-option="en" href="${englishPath}" aria-label="Switch to English">EN</a>
    <span aria-hidden="true">/</span>
    <a data-lang-option="zh" href="${chinesePath}" aria-label="切换中文">中文</a>
  `;

  const ctaItem = navList.querySelector('.nav-cta')?.closest('li');
  navList.insertBefore(item, ctaItem || null);

  const currentLang = path.startsWith('/zh/') ? 'zh' : 'en';
  item.querySelectorAll('[data-lang-option]').forEach((link) => {
    const active = link.dataset.langOption === currentLang;
    link.classList.toggle('active', active);
    link.setAttribute('aria-current', active ? 'page' : 'false');
    link.addEventListener('click', () => {
      try { localStorage.setItem('casbLanguage', link.dataset.langOption); } catch {}
    });
  });
}

function rememberOriginalContent(element) {
  if (!element.dataset.langOriginalText) {
    element.dataset.langOriginalText = element.textContent;
  }
  if (!element.dataset.langOriginalHtml) {
    element.dataset.langOriginalHtml = element.innerHTML;
  }
}

function applyTranslationEntry(entry, lang) {
  const [selector, value, mode] = entry;
  document.querySelectorAll(selector).forEach((element) => {
    rememberOriginalContent(element);

    if (lang === 'en') {
      if (value?.attr) {
        const originalAttrKey = `langOriginal${value.attr}`;
        element.setAttribute(value.attr, element.dataset[originalAttrKey] || '');
        return;
      }
      if (mode === 'html') {
        element.innerHTML = element.dataset.langOriginalHtml;
      } else {
        element.textContent = element.dataset.langOriginalText;
      }
      return;
    }

    if (typeof value === 'string') {
      if (mode === 'html') element.innerHTML = value;
      else element.textContent = value;
      return;
    }

    if (value?.attr) {
      const originalAttrKey = `langOriginal${value.attr}`;
      if (!element.dataset[originalAttrKey]) {
        element.dataset[originalAttrKey] = element.getAttribute(value.attr) || '';
      }
      element.setAttribute(value.attr, value.text);
      return;
    }

    if (value?.map) {
      const original = element.dataset.langOriginalText.trim();
      const translated = value.map[original];
      if (translated) element.textContent = translated;
    }
  });
}

function setSiteLanguage(lang) {
  const nextLang = lang === 'zh' ? 'zh' : 'en';
  try {
    localStorage.setItem('casbLanguage', nextLang);
  } catch {
    // Continue without persistence if the browser blocks local storage.
  }
  document.documentElement.lang = nextLang === 'zh' ? 'zh-Hans' : 'en';
  document.body.classList.toggle('lang-zh', nextLang === 'zh');

  document.querySelectorAll('.language-switcher button').forEach((button) => {
    const active = button.dataset.langOption === nextLang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  const pageGroups = [CASB_TRANSLATIONS.zh.common];
  if (document.querySelector('.hero')) pageGroups.push(CASB_TRANSLATIONS.zh.home);
  if (document.querySelector('.campaign-page')) pageGroups.push(CASB_TRANSLATIONS.zh.campaign);
  if (document.querySelector('.ins-hero')) pageGroups.push(CASB_TRANSLATIONS.zh.insights);
  if (document.querySelector('.art-content')) pageGroups.push(CASB_TRANSLATIONS.zh.articles);

  pageGroups.flat().forEach((entry) => applyTranslationEntry(entry, nextLang));
}

function initLanguageSwitcher() {
  createLanguageSwitcher();
}

initLanguageSwitcher();

function initTeamDropdown() {
  const teamLinks = Array.from(document.querySelectorAll('.nav-links > li > a')).filter((link) => {
    const href = link.getAttribute('href') || '';
    return /(^|\/)team\/?$/.test(href) || href === './';
  });

  teamLinks.forEach((teamLink) => {
    const item = teamLink.closest('li');
    if (!item || item.classList.contains('nav-dropdown')) return;

    const membersHref = teamLink.getAttribute('href') || '/team/';
    const leaderboardHref = membersHref === './'
      ? 'leaderboard.html'
      : `${membersHref.replace(/\/?$/, '/')}leaderboard.html`;
    const chinese = document.documentElement.lang.toLowerCase().startsWith('zh') ||
      teamLink.textContent.includes('团队');
    const onLeaderboard = /\/team\/leaderboard\.html$/.test(window.location.pathname);
    const onMembers = !onLeaderboard && /\/team\/(?:index\.html)?$/.test(window.location.pathname);

    item.classList.add('nav-dropdown');
    item.innerHTML = `
      <button class="nav-dropdown-toggle" type="button" aria-expanded="false">
        <span>${chinese ? '我们的团队' : 'Our Team'}</span>
        <span class="nav-dropdown-chevron" aria-hidden="true"></span>
      </button>
      <ul class="nav-dropdown-menu">
        <li><a href="${membersHref}"${onMembers ? ' aria-current="page"' : ''}>${chinese ? '团队成员' : 'Members'}</a></li>
        <li><a href="${leaderboardHref}"${onLeaderboard ? ' aria-current="page"' : ''}>${chinese ? '排行榜' : 'Leaderboard'}</a></li>
      </ul>
    `;

    const toggle = item.querySelector('.nav-dropdown-toggle');
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = item.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown.open').forEach((item) => {
      item.classList.remove('open');
      item.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.nav-dropdown.open').forEach((item) => {
      item.classList.remove('open');
      const toggle = item.querySelector('.nav-dropdown-toggle');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.focus();
    });
  });
}

initTeamDropdown();

function initArticleHeroCover() {
  const hero = document.querySelector('.art-hero');
  const cover = document.querySelector('meta[property="og:image"]')?.content;
  if (!hero || !cover) return;

  const coverUrl = new URL(cover, window.location.href);
  const isLocalPreview = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
  const resolvedCover = isLocalPreview ? `${window.location.origin}${coverUrl.pathname}` : coverUrl.href;
  hero.classList.add('art-hero-cover');
  hero.style.backgroundImage = `linear-gradient(90deg, rgba(7, 19, 38, .94) 0%, rgba(10, 27, 52, .84) 52%, rgba(10, 27, 52, .58) 100%), url("${resolvedCover}")`;
}

initArticleHeroCover();

function markArticleCoverShape(image) {
  if (!image.matches('.featured-img img, .art-thumb img') || !image.naturalWidth) return;
  image.classList.toggle('square-cover', image.naturalWidth / image.naturalHeight < 1.4);
}

document.addEventListener('load', (event) => {
  if (event.target instanceof HTMLImageElement) markArticleCoverShape(event.target);
}, true);

document.querySelectorAll('.featured-img img, .art-thumb img').forEach((image) => {
  if (image.complete) markArticleCoverShape(image);
});

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
  label: 'June 2026 Recognition',
  basePath: '/monthly-achievers/2026/JUN2026/',
  files: [
    '1_TOP PRODUCERS (AFYP)_JUN26_LAI SIEW CHING_CHAMPION.png',
    '2_TOP PRODUCERS (AFYP)_JUN26_ESTHER TAN_FIRST RUNNER UP.png',
    '3_TOP PRODUCERS (AFYP)_JUN26_GLADYS HENG_SECOND RUNNER UP.png',
    '4_TOP PRODUCERS (CASES)_JUN26_LAI SIEW CHING_CHAMPION.png',
    '5_TOP PRODUCERS (CASES)_JUN26_ESTHER TAN_FIRST RUNNER UP.png',
    '6_TOP PRODUCERS (CASES)_JUN26_GLADYS HENG_SECOND RUNNER UP.png',
    '7_TOP MANAGER(GROUP AFYP)_JUN26_ALLAN WONG_CHAMPION.png',
    '8_TOP MANAGER(GROUP AFYP)_JUN26_PERI TAN_FIRST RUNNER UP.png',
    '9_TOP MANAGER(GROUP AFYP)_JUN26_LAI SIEW CHING_SECOND RUNNER UP.png',
    '10_TOP ROOKIE (AFYP)_JUN26_LORRAINE KONG_CHAMPION.png',
    '11_TOP ROOKIE (AFYP)_JUN26_ANNA CHOW_FIRST RUNNER UP.png',
    '12_TOP ROOKIE (AFYP)_JUN26_TANG HUI SHIAN_SECOND RUNNER UP.png',
    '13_TOP ROOKIE (CASES)_JUN26_ANNA CHOW_CHAMPION.png',
    '14_TOP ROOKIE (CASES)_JUN26_TANG HUI SHIAN_FIRST RUNNER UP.png',
    '15_TOP ROOKIE (CASES)_JUN26_KONG SIAW LING_SECOND RUNNER UP.png',
    '16_A8CC ACHIEVER_JUN26.png',
    '17_A4CC ACHIEVER_JUN26.png',
    '18_A4CC ACHIEVER_JUN26.png'
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
  const existingUrls = new Set(
    Array.from(monthlyAchieversCarousel.querySelectorAll('img')).map((image) =>
      new URL(image.getAttribute('src'), window.location.href).href
    )
  );

  MONTHLY_ACHIEVERS_FEATURED.files.forEach((file, index) => {
    const imagePath = `${MONTHLY_ACHIEVERS_FEATURED.basePath}${file}`;
    const imageUrl = new URL(imagePath, window.location.href).href;
    if (existingUrls.has(imageUrl)) return;

    const image = document.createElement('img');
    image.src = imagePath;
    image.alt = `CASB ${MONTHLY_ACHIEVERS_FEATURED.label} poster ${index + 1}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    monthlyAchieversCarousel.insertBefore(image, nextBtn);
  });
}
document.querySelectorAll('.ach-carousel').forEach((carousel) => {
  const slides = carousel.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = 0;
  let transitionPending = false;

  function activateSlide(nextIndex) {
    index = nextIndex;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });
  }

  function preloadSlide(slideIndex) {
    const slide = slides[slideIndex];
    if (!slide || slide.complete) return;
    slide.loading = 'eager';
  }

  async function showSlide(nextIndex) {
    if (transitionPending) return;

    const targetIndex = (nextIndex + slides.length) % slides.length;
    const target = slides[targetIndex];
    transitionPending = true;
    target.loading = 'eager';

    try {
      if (!target.complete || !target.naturalWidth) await target.decode();
      if (target.naturalWidth) activateSlide(targetIndex);
    } catch {
      // Keep the current poster visible if the next image cannot be loaded.
    } finally {
      transitionPending = false;
      preloadSlide((index + 1) % slides.length);
    }
  }

  nextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    void showSlide(index + 1);
  });

  prevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    void showSlide(index - 1);
  });

  preloadSlide((index + 1) % slides.length);
  window.setInterval(() => void showSlide(index + 1), 4500);
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
