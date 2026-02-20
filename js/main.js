/* =============================================
   CHOI MYEONG PYO - Portfolio JavaScript
   Cloud Engineer · DevOps · SRE
============================================= */

'use strict';

// ===== Utility =====
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ===== Navbar Scroll Effect =====
function initNavbar() {
  const navbar = $('#navbar');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active nav link based on scroll position
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      const bottom = top + sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ===== Hamburger Menu =====
function initHamburger() {
  const hamburger = $('#hamburger');
  const navLinks = $('#navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on nav link click
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ===== Particle Background =====
function initParticles() {
  const container = $('#particles');
  if (!container) return;

  const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981'];
  const count = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    createParticle(container, colors);
  }
}

function createParticle(container, colors) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 4 + 2;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const duration = Math.random() * 20 + 15;
  const delay = Math.random() * 20;

  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    left: ${left}%;
    bottom: -10px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    box-shadow: 0 0 ${size * 2}px ${color};
  `;

  container.appendChild(particle);

  // Recreate after animation
  particle.addEventListener('animationend', () => {
    particle.remove();
    createParticle(container, colors);
  });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe timeline items
  $$('.timeline-item').forEach(el => observer.observe(el));

  // Observe skill categories (tag cloud style — no bars to animate)
  $$('.skill-category').forEach(el => observer.observe(el));

  // Observe project cards with stagger
  $$('.project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 80);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });

  // Observe cert cards
  $$('.cert-card').forEach((card, i) => {
    const certObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 100);
          certObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    certObserver.observe(card);
  });

  // Observe focus cards
  $$('.focus-card').forEach((card, i) => {
    const focusObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, i * 100);
          focusObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    focusObserver.observe(card);
  });
}

// ===== Skill Category Entrance =====
function animateSkillBars(container) {
  // Skill bars replaced with tag-cloud; animate stag items instead
  const tags = $$('.stag', container);
  tags.forEach((tag, i) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(8px)';
    tag.style.transition = `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`;
    setTimeout(() => {
      tag.style.opacity = '1';
      tag.style.transform = 'translateY(0)';
    }, i * 50 + 100);
  });
}

// ===== Project Filter =====
function initProjectFilter() {
  const filterBtns = $$('.filter-btn');
  const projectCards = $$('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards with animation
      projectCards.forEach(card => {
        const categories = card.dataset.category || '';

        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

// ===== Counter Animation =====
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ===== Smooth Scroll for all anchor links =====
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });
}

// ===== Typing Effect for terminal (enhancement) =====
function initTerminalTyping() {
  // Terminal lines already animate via CSS, this adds extra polish
  const terminal = $('.terminal-window');
  if (!terminal) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        terminal.style.boxShadow = `
          0 20px 60px rgba(0,0,0,0.5),
          0 0 40px rgba(59, 130, 246, 0.2)
        `;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(terminal);
}

// ===== Tech tags hover ripple =====
function initTechTagsEffect() {
  $$('.tech-tags span').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });
}

// ===== Section title gradient animation =====
function initGradientAnimation() {
  const titles = $$('.section-title');
  let angle = 135;

  setInterval(() => {
    angle = (angle + 0.5) % 360;
    titles.forEach(title => {
      title.style.backgroundImage = `linear-gradient(${angle}deg, #3b82f6, #8b5cf6, #06b6d4)`;
    });
  }, 50);
}

// ===== Copy email on click =====
function initCopyEmail() {
  const emailLinks = $$('a[href="mailto:zld3598@naver.com"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Still opens mail client but also shows tooltip
      showToast('📧 이메일 클라이언트를 열고 있습니다...');
    });
  });
}

// ===== Toast Notification =====
function showToast(message, duration = 3000) {
  const existing = $('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: #fff;
    padding: 14px 22px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    z-index: 9999;
    box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    max-width: 300px;
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===== Parallax Effect on Hero (subtle) =====
function initParallax() {
  const heroBg = $('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    if (scrollY <= maxScroll) {
      const progress = scrollY / maxScroll;
      heroBg.style.transform = `translateY(${progress * 30}px)`;
      heroBg.style.opacity = 1 - progress * 0.5;
    }
  }, { passive: true });
}

// ===== Glowing cursor trail =====
function initCursorGlow() {
  if (window.innerWidth < 768) return; // Skip on mobile

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transition: transform 0.1s ease;
    transform: translate(-50%, -50%);
    top: 0;
    left: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// ===== About text reveal =====
function initAboutReveal() {
  const aboutText = $('.about-text');
  if (!aboutText) return;

  const paragraphs = $$('p', aboutText);
  paragraphs.forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(16px)';
    p.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        paragraphs.forEach(p => {
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(aboutText);
}

// ===== Add hover effect to contact items =====
function initContactEffects() {
  $$('.contact-item').forEach(item => {
    item.style.transition = 'transform 0.3s ease';
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(8px)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
    });
  });
}

// ===== Initialize All =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initParticles();
  initScrollAnimations();
  initProjectFilter();
  initSmoothScroll();
  initTerminalTyping();
  initTechTagsEffect();
  initGradientAnimation();
  initCopyEmail();
  initParallax();
  initCursorGlow();
  initAboutReveal();
  initContactEffects();

  // Skill category entrance check on load
  $$('.skill-category').forEach(cat => {
    const rect = cat.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      cat.classList.add('visible');
      animateSkillBars(cat);
    }
  });

  console.log('%c 최명표 Portfolio ', 'background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;');
  console.log('%c Cloud Engineer · DevOps · SRE ', 'color: #06b6d4; font-size: 12px;');
});

// ===== Performance: Reduce animations on low-end devices =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--transition', 'none');
  document.documentElement.style.setProperty('--transition-slow', 'none');
}
