/* ===== ZAREN Admin Panel ===== */
/* LIMITATION: This admin panel uses browser localStorage for data persistence.
   It is a real, working panel for editing content within a single browser,
   but data does NOT sync across devices or users. For production use with
   shared, server-side persistence and secure authentication, deploy with a
   real backend (e.g., Next.js API routes + a database, or a headless CMS). */
(function() {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  /* ===== I18N for admin ===== */
  const adminI18n = {
    fa: {
      admin_login_sub: "پنل مدیریت ZAREN",
      admin_login_btn: "ورود",
      admin_login_note: "این یک پنل مدیریت مبتنی بر مرورگر است. داده‌ها فقط در همین مرورگر ذخیره می‌شوند. برای استفاده تولیدی با ذخیره‌سازی سمت سرور و احراز هویت امن، نیاز به بک‌اند واقعی دارید.",
      admin_back: "بازگشت به سایت",
      admin_tab_products: "محصولات",
      admin_tab_content: "محتوا",
      admin_tab_settings: "تنظیمات",
      admin_view_site: "مشاهده سایت",
      admin_logout: "خروج",
      admin_products_title: "مدیریت محصولات",
      admin_add_product: "افزودن محصول",
      admin_content_title: "ویرایش محتوا",
      admin_content_hero_tagline: "تگ‌لاین صفحه اصلی",
      admin_content_story: "داستان برند",
      admin_settings_title: "تنظیمات سایت",
      admin_settings_whatsapp: "شماره واتساپ",
      admin_settings_instagram: "نام کاربری اینستاگرام",
      admin_settings_tagline: "شعار برند",
      admin_save: "ذخیره",
      admin_delete: "حذف محصول",
      admin_limit_title: "نکته مهم درباره این پنل",
      admin_limit_body: "این پنل داده‌ها را در localStorage مرورگر ذخیره می‌کند. برای یک سایت تولیدی واقعی با ذخیره‌سازی مشترک، احراز هویت امن و همگام‌سازی بین کاربران، باید سایت را با یک بک‌اند واقعی (مثل Next.js + دیتابیس یا یک CMS) دیپلوی کنید.",
      admin_limit_dismiss: "متوجه شدم",
      admin_saved: "ذخیره شد!",
      admin_edit: "ویرایش",
      admin_pass_error: "رمز عبور اشتباه است",
    },
    en: {
      admin_login_sub: "ZAREN Admin Dashboard",
      admin_login_btn: "Login",
      admin_login_note: "This is a browser-based admin panel. Data is stored in this browser only. For production use with server-side storage and secure auth, a real backend is required.",
      admin_back: "Back to site",
      admin_tab_products: "Products",
      admin_tab_content: "Content",
      admin_tab_settings: "Settings",
      admin_view_site: "View Site",
      admin_logout: "Logout",
      admin_products_title: "Manage Products",
      admin_add_product: "Add Product",
      admin_content_title: "Edit Content",
      admin_content_hero_tagline: "Hero Tagline",
      admin_content_story: "Brand Story",
      admin_settings_title: "Site Settings",
      admin_settings_whatsapp: "WhatsApp Number",
      admin_settings_instagram: "Instagram Username",
      admin_settings_tagline: "Brand Tagline",
      admin_save: "Save",
      admin_delete: "Delete Product",
      admin_limit_title: "Important Note",
      admin_limit_body: "This panel stores data in browser localStorage. For a production site with shared storage, secure authentication, and cross-user sync, deploy with a real backend (e.g., Next.js + database, or a headless CMS).",
      admin_limit_dismiss: "Got it",
      admin_saved: "Saved!",
      admin_edit: "Edit",
      admin_pass_error: "Wrong password",
    }
  };

  let lang = localStorage.getItem('zaren-lang') || 'fa';
  const t = () => adminI18n[lang];

  function applyAdminLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t()[key]) el.textContent = t()[key];
    });
  }

  /* ===== DATA STORE (localStorage) ===== */
  const STORE_KEY = 'zaren-admin-data';

  function getData() {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch(e) {}
    }
    return {
      products: JSON.parse(JSON.stringify(products)),
      content: {
        heroTaglineFa: translations.fa.hero_tagline,
        heroTaglineEn: translations.en.hero_tagline,
        storyFa: translations.fa.story_body1,
        storyEn: translations.en.story_body1,
      },
      settings: {
        whatsapp: '09305459758',
        instagram: 'zaren__perfume',
        tagline: 'BE REMEMBERED.',
      }
    };
  }

  function saveData(data) {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  }

  let adminData = getData();

  /* ===== AUTH ===== */
  const SESSION_KEY = 'zaren-admin-session';

  function checkSession() {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === 'logged-in') {
      showDashboard();
    }
  }

  function login(password) {
    // Use the admin password from the app's secrets (injected as env var)
    // In this static environment, we use a client-side check.
    // The real password is set via the platform's secret management.
    const realPass = window.ZAREN_ADMIN_PASS || 'zaren_admin_2024';
    if (password === realPass) {
      sessionStorage.setItem(SESSION_KEY, 'logged-in');
      showDashboard();
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    $('#dashboard').hidden = true;
    $('#loginScreen').style.display = 'flex';
  }

  function showDashboard() {
    $('#loginScreen').style.display = 'none';
    $('#dashboard').hidden = false;
    renderProductsAdmin();
    loadContentForm();
    loadSettingsForm();
    // Show limitation notice once
    if (!localStorage.getItem('zaren-limit-dismissed')) {
      $('#limitNotice').hidden = false;
    }
  }

  /* ===== TABS ===== */
  function switchTab(tabName) {
    $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
    $$('.tab-content').forEach(s => s.classList.toggle('active', s.id === 'tab-' + tabName));
  }

  /* ===== PRODUCTS ADMIN ===== */
  function renderProductsAdmin() {
    const list = $('#productsAdminList');
    list.innerHTML = adminData.products.map((p, i) => `
      <div class="admin-product-card">
        <div class="admin-product-bottle" style="background:${p.color}"></div>
        <div class="admin-product-info">
          <div class="admin-product-name">${p.name}</div>
          <div class="admin-product-meta">${lang === 'fa' ? p.nameFa : p.name} · ${p.volume} · ${lang === 'fa' ? p.price + ' تومان' : p.priceEn}</div>
        </div>
        <button class="btn btn-ghost btn-sm" data-edit="${i}">${t().admin_edit}</button>
      </div>
    `).join('');

    $$('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.edit)));
    });
  }

  function openEditModal(index) {
    const p = index >= 0 ? adminData.products[index] : {
      id: '', name: '', nameFa: '', tagline: '', taglineFa: '',
      desc: '', descFa: '', price: '', priceEn: '', volume: '50ml',
      color: 'linear-gradient(135deg, #1a1a2e, #16213e)', glow: 'rgba(201,162,39,0.2)',
      notes: { top: [], topFa: [], heart: [], heartFa: [], base: [], baseFa: [] }
    };
    $('#editProductId').value = index >= 0 ? index : 'new';
    $('#editName').value = p.name || '';
    $('#editNameFa').value = p.nameFa || '';
    $('#editTagline').value = p.tagline || '';
    $('#editTaglineFa').value = p.taglineFa || '';
    $('#editDesc').value = p.desc || '';
    $('#editDescFa').value = p.descFa || '';
    $('#editPrice').value = p.price || '';
    $('#editPriceEn').value = p.priceEn || '';
    $('#editVolume').value = p.volume || '50ml';
    $('#editColor').value = p.color || '';
    $('#deleteProductBtn').style.display = index >= 0 ? 'inline-flex' : 'none';
    $('#productEditModal').hidden = false;
    $('#productEditModal').style.display = 'flex';
  }

  function closeEditModal() {
    $('#productEditModal').hidden = true;
    $('#productEditModal').style.display = 'none';
  }

  function saveProduct(e) {
    e.preventDefault();
    const index = $('#editProductId').value;
    const product = {
      id: $('#editName').value.toLowerCase().replace(/\s+/g, '-') || 'product-' + Date.now(),
      name: $('#editName').value,
      nameFa: $('#editNameFa').value,
      tagline: $('#editTagline').value,
      taglineFa: $('#editTaglineFa').value,
      desc: $('#editDesc').value,
      descFa: $('#editDescFa').value,
      price: $('#editPrice').value,
      priceEn: $('#editPriceEn').value,
      volume: $('#editVolume').value,
      color: $('#editColor').value,
      glow: 'rgba(201,162,39,0.2)',
      notes: index !== 'new' ? adminData.products[parseInt(index)].notes : { top: [], topFa: [], heart: [], heartFa: [], base: [], baseFa: [] }
    };
    if (index === 'new') {
      adminData.products.push(product);
    } else {
      adminData.products[parseInt(index)] = product;
    }
    saveData(adminData);
    renderProductsAdmin();
    closeEditModal();
    flashSaved();
  }

  function deleteProduct() {
    const index = parseInt($('#editProductId').value);
    if (isNaN(index)) return;
    if (confirm(t().admin_delete + '?')) {
      adminData.products.splice(index, 1);
      saveData(adminData);
      renderProductsAdmin();
      closeEditModal();
    }
  }

  /* ===== CONTENT FORM ===== */
  function loadContentForm() {
    $('#contentHeroTaglineFa').value = adminData.content.heroTaglineFa || '';
    $('#contentHeroTaglineEn').value = adminData.content.heroTaglineEn || '';
    $('#contentStoryFa').value = adminData.content.storyFa || '';
    $('#contentStoryEn').value = adminData.content.storyEn || '';
  }

  function saveContent() {
    adminData.content.heroTaglineFa = $('#contentHeroTaglineFa').value;
    adminData.content.heroTaglineEn = $('#contentHeroTaglineEn').value;
    adminData.content.storyFa = $('#contentStoryFa').value;
    adminData.content.storyEn = $('#contentStoryEn').value;
    saveData(adminData);
    flashSaved();
  }

  /* ===== SETTINGS FORM ===== */
  function loadSettingsForm() {
    $('#settingsWhatsapp').value = adminData.settings.whatsapp || '';
    $('#settingsInstagram').value = adminData.settings.instagram || '';
    $('#settingsTagline').value = adminData.settings.tagline || '';
  }

  function saveSettings() {
    adminData.settings.whatsapp = $('#settingsWhatsapp').value;
    adminData.settings.instagram = $('#settingsInstagram').value;
    adminData.settings.tagline = $('#settingsTagline').value;
    saveData(adminData);
    flashSaved();
  }

  /* ===== UTILS ===== */
  function flashSaved() {
    const btn = event?.target;
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = t().admin_saved;
    setTimeout(() => { btn.textContent = orig; }, 1500);
  }

  /* ===== INIT ===== */
  function init() {
    applyAdminLang();

    // Login form
    $('#loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = $('#adminPass').value;
      if (login(pass)) {
        $('#loginError').hidden = true;
      } else {
        $('#loginError').textContent = t().admin_pass_error;
        $('#loginError').hidden = false;
      }
    });

    // Tabs
    $$('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Product modal
    $('#addProductBtn').addEventListener('click', () => openEditModal(-1));
    $('#closeEditModal').addEventListener('click', closeEditModal);
    $('#productForm').addEventListener('submit', saveProduct);
    $('#deleteProductBtn').addEventListener('click', deleteProduct);

    // Content & Settings
    $('#saveContentBtn').addEventListener('click', saveContent);
    $('#saveSettingsBtn').addEventListener('click', saveSettings);

    // Logout
    $('#logoutBtn').addEventListener('click', logout);

    // Limit notice
    $('#dismissLimit').addEventListener('click', () => {
      $('#limitNotice').hidden = true;
      localStorage.setItem('zaren-limit-dismissed', '1');
    });

    checkSession();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
