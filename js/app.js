/* ===== ZAREN — Main App ===== */
(function() {
  'use strict';

  /* ===== STATE ===== */
  let currentLang = localStorage.getItem('zaren-lang') || 'fa';
  let musicPlaying = false;
  let audioContext = null;

  /* ===== DOM ===== */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  /* ===== I18N ===== */
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('zaren-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
    const t = translations[lang];
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });
    $('#langLabel').textContent = lang === 'fa' ? 'EN' : 'FA';
    renderProducts();
  }

  function toggleLang() {
    applyLang(currentLang === 'fa' ? 'en' : 'fa');
  }

  /* ===== PRODUCTS ===== */
  function renderProducts() {
    const grid = $('#productsGrid');
    if (!grid) return;
    const t = translations[currentLang];
    grid.innerHTML = products.map(p => {
      const name = currentLang === 'fa' ? p.nameFa : p.name;
      const tagline = currentLang === 'fa' ? p.taglineFa : p.tagline;
      const desc = currentLang === 'fa' ? p.descFa : p.desc;
      const price = currentLang === 'fa' ? p.price + ' ' + t.currency : p.priceEn;
      const waMsg = encodeURIComponent(
        (currentLang === 'fa' ? 'سلام، می‌خواهم سفارش بدهم: ' : 'Hello, I would like to order: ') + p.name
      );
      return `
        <div class="product-card" data-product="${p.id}" style="--product-color:${p.color};--product-glow:${p.glow}">
          <div class="product-visual">
            <div class="product-bottle">
              <div class="pb-cap"></div>
              <div class="pb-neck"></div>
              <div class="pb-body">
                <div class="pb-shine"></div>
                <div class="pb-label">
                  <span class="pb-label-name">${p.name}</span>
                  <span class="pb-label-sub">ZAREN</span>
                </div>
              </div>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">${name}</h3>
            <p class="product-tagline">${tagline}</p>
            <p class="product-desc">${desc}</p>
            <p class="product-price">${price}</p>
            <div class="product-actions">
              <button class="product-btn" data-modal="${p.id}">${t.product_details}</button>
              <a href="https://wa.me/989305459758?text=${waMsg}" target="_blank" rel="noopener" class="product-btn whatsapp">${t.product_order}</a>
            </div>
          </div>
        </div>`;
    }).join('');

    // Bind modal triggers
    $$('[data-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProductModal(btn.getAttribute('data-modal'));
      });
    });
    // Card click also opens modal
    $$('.product-card').forEach(card => {
      card.addEventListener('click', () => openProductModal(card.getAttribute('data-product')));
    });
  }

  /* ===== PRODUCT MODAL ===== */
  function openProductModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const t = translations[currentLang];
    const name = currentLang === 'fa' ? p.nameFa : p.name;
    const tagline = currentLang === 'fa' ? p.taglineFa : p.tagline;
    const desc = currentLang === 'fa' ? p.descFa : p.desc;
    const price = currentLang === 'fa' ? p.price + ' ' + t.currency : p.priceEn;
    const topNotes = currentLang === 'fa' ? p.notes.topFa : p.notes.top;
    const heartNotes = currentLang === 'fa' ? p.notes.heartFa : p.notes.heart;
    const baseNotes = currentLang === 'fa' ? p.notes.baseFa : p.notes.base;
    const waMsg = encodeURIComponent(
      (currentLang === 'fa' ? 'سلام، می‌خواهم سفارش بدهم: ' : 'Hello, I would like to order: ') + p.name
    );

    $('#modalBody').innerHTML = `
      <div class="modal-product-visual" style="--product-color:${p.color};--product-glow:${p.glow}">
        <div class="product-bottle" style="transform:scale(1.1)">
          <div class="pb-cap"></div>
          <div class="pb-neck"></div>
          <div class="pb-body">
            <div class="pb-shine"></div>
            <div class="pb-label">
              <span class="pb-label-name">${p.name}</span>
              <span class="pb-label-sub">ZAREN</span>
            </div>
          </div>
        </div>
      </div>
      <h2 class="modal-product-name">${name}</h2>
      <p class="modal-product-tagline">${tagline}</p>
      <p class="modal-product-desc">${desc}</p>
      <div class="modal-product-notes">
        <p class="modal-notes-title">${t.modal_top_notes}</p>
        <div class="modal-notes-list">${topNotes.map(n => `<span class="modal-note">${n}</span>`).join('')}</div>
      </div>
      <div class="modal-product-notes">
        <p class="modal-notes-title">${t.modal_heart_notes}</p>
        <div class="modal-notes-list">${heartNotes.map(n => `<span class="modal-note">${n}</span>`).join('')}</div>
      </div>
      <div class="modal-product-notes">
        <p class="modal-notes-title">${t.modal_base_notes}</p>
        <div class="modal-notes-list">${baseNotes.map(n => `<span class="modal-note">${n}</span>`).join('')}</div>
      </div>
      <p class="modal-product-price">${price} · ${t.modal_volume}: ${p.volume}</p>
      <div class="modal-actions">
        <a href="https://wa.me/989305459758?text=${waMsg}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">${t.modal_order_whatsapp}</a>
        <a href="https://instagram.com/zaren__perfume" target="_blank" rel="noopener" class="btn btn-instagram btn-sm">${t.contact_instagram}</a>
      </div>`;
    const modal = $('#productModal');
    modal.hidden = false;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    const modal = $('#productModal');
    modal.hidden = true;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  /* ===== MUSIC ===== */
  function generateAmbientMusic() {
    // Generate ambient music using Web Audio API (no external files needed)
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioContext;
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.15;
      masterGain.connect(ctx.destination);

      // Ambient pad — slow evolving drone
      const notes = [110, 164.81, 220, 277.18]; // A2, E3, A3, C#4
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = 'sine';
        osc.frequency.value = freq;
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        gain.gain.value = 0;
        gain.gain.setTargetAtTime(0.15, ctx.currentTime, 2);
        // LFO for subtle volume modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.08 + i * 0.03;
        lfoGain.gain.value = 0.05;
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        osc.start();
        lfo.start();
      });

      // Soft arpeggio
      const arpNotes = [440, 554.37, 659.25, 554.37];
      let arpIndex = 0;
      const arpInterval = setInterval(() => {
        if (!musicPlaying || !audioContext) { clearInterval(arpInterval); return; }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = 'triangle';
        osc.frequency.value = arpNotes[arpIndex % arpNotes.length];
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 2);
        arpIndex++;
      }, 3000);

      return { masterGain, arpInterval };
    } catch(e) {
      console.warn('Web Audio API not available', e);
      return null;
    }
  }

  let musicState = null;

  function startMusic() {
    if (!audioContext) {
      musicState = generateAmbientMusic();
    } else {
      audioContext.resume();
    }
    musicPlaying = true;
    $('#musicIconPlay').style.display = 'none';
    $('#musicIconPause').style.display = 'block';
  }

  function stopMusic() {
    musicPlaying = false;
    if (audioContext) audioContext.suspend();
    $('#musicIconPlay').style.display = 'block';
    $('#musicIconPause').style.display = 'none';
  }

  function toggleMusic() {
    if (musicPlaying) stopMusic();
    else startMusic();
  }

  /* ===== PARTICLES ===== */
  function createParticles() {
    const container = $('#particles');
    if (!container) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = Math.random() * 10 + 's';
      p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
      container.appendChild(p);
    }
  }

  /* ===== 3D BOTTLE TILT ===== */
  function initBottleTilt() {
    const scene = $('#bottleScene');
    const bottle = $('#heroBottle');
    if (!scene || !bottle) return;
    scene.addEventListener('mousemove', (e) => {
      const rect = scene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      bottle.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 20}deg) translateY(${y * 10}px)`;
    });
    scene.addEventListener('mouseleave', () => {
      bottle.style.transform = '';
    });
  }

  /* ===== PARALLAX ===== */
  function initParallax() {
    const bg = $('#heroBg');
    const content = $('#heroContent');
    if (!bg || !content) return;
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        bg.style.transform = `translateY(${scrolled * 0.4}px)`;
        content.style.transform = `translateY(${scrolled * 0.15}px)`;
        content.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
      }
    }, { passive: true });
  }

  /* ===== SCROLL REVEAL ===== */
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    $$('.section-reveal').forEach(el => observer.observe(el));
  }

  /* ===== HEADER SCROLL ===== */
  function initHeaderScroll() {
    const header = $('#header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.pageYOffset > 50);
    }, { passive: true });
  }

  /* ===== MOBILE MENU ===== */
  function initMobileMenu() {
    const toggle = $('#menuToggle');
    const nav = $('#mobileNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ===== INIT ===== */
  function init() {
    // Loader
    window.addEventListener('load', () => {
      setTimeout(() => $('#loader')?.classList.add('hide'), 800);
    });

    applyLang(currentLang);
    createParticles();
    initBottleTilt();
    initParallax();
    initScrollReveal();
    initHeaderScroll();
    initMobileMenu();

    // Language toggle
    $('#langToggle').addEventListener('click', toggleLang);

    // Music prompt
    const musicPrompt = $('#musicPrompt');
    const musicControl = $('#musicControl');
    setTimeout(() => {
      if (musicPrompt) {
        musicPrompt.hidden = false;
        musicPrompt.style.display = 'flex';
      }
    }, 1500);

    $('#musicPlayBtn')?.addEventListener('click', () => {
      musicPrompt.hidden = true;
      musicPrompt.style.display = 'none';
      musicControl.hidden = false;
      startMusic();
    });
    $('#musicDeclineBtn')?.addEventListener('click', () => {
      musicPrompt.hidden = true;
      musicPrompt.style.display = 'none';
      musicControl.hidden = false;
    });
    musicControl?.addEventListener('click', toggleMusic);

    // Modal close
    $$('[data-close="modal"]').forEach(el => {
      el.addEventListener('click', closeProductModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeProductModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
