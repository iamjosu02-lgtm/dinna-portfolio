(function () {
  'use strict';

  const bgVideo = document.getElementById('bg-video');
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  const sections = document.querySelectorAll('[data-video]');

  let currentVideoIndex = 0;

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ----- Video backgrounds ----- */
  function loadVideo(index) {
    if (!CONFIG.VIDEOS.length) return;
    const src = CONFIG.VIDEOS[index % CONFIG.VIDEOS.length];
    if (bgVideo.getAttribute('data-src') === src) return;

    bgVideo.style.opacity = '0';
    setTimeout(() => {
      bgVideo.src = src;
      bgVideo.setAttribute('data-src', src);
      bgVideo.load();
      bgVideo.play().catch(() => {});
      bgVideo.oncanplay = () => {
        bgVideo.style.opacity = '1';
      };
    }, 400);
  }

  function initVideo() {
    loadVideo(0);
    bgVideo.addEventListener('ended', () => {
      currentVideoIndex = (currentVideoIndex + 1) % CONFIG.VIDEOS.length;
      loadVideo(currentVideoIndex);
    });
  }

  /* Change video per section on scroll */
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-video'), 10);
          if (!isNaN(idx) && idx !== currentVideoIndex) {
            currentVideoIndex = idx;
            loadVideo(idx);
          }
        }
      });
    },
    { threshold: 0.35, rootMargin: '-20% 0px' }
  );

  sections.forEach((s) => videoObserver.observe(s));

  /* Fallback if videos missing */
  bgVideo.addEventListener('error', () => {
    document.querySelector('.video-bg').style.background =
      'radial-gradient(ellipse at 50% 0%, rgba(145,94,255,0.25), transparent 50%), #0a0a12';
  });

  initVideo();

  /* ----- Scroll reveal ----- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ----- Header scroll ----- */
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ----- Mobile nav ----- */
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  /* ----- Smooth active section (optional highlight) ----- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ----- Contact form → backend API ----- */
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.classList.add('error');
      return;
    }

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    submitBtn.disabled = true;
    btnText.hidden = true;
    btnLoader.hidden = false;

    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        formStatus.textContent = data.message || 'Message sent successfully! I will get back to you soon.';
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        throw new Error(data.error || 'Failed to send message.');
      }
    } catch (err) {
      formStatus.textContent =
        err.message ||
        'Could not reach the server. Make sure the backend is running on Render and API_BASE_URL is set in config.js.';
      formStatus.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      btnText.hidden = false;
      btnLoader.hidden = true;
    }
  });

  /* Parallax subtle on hero */
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-visual');
    if (!hero) return;
    const y = window.scrollY * 0.15;
    hero.style.transform = `translateY(${y}px)`;
  });
})();
