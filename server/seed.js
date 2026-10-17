import bcrypt from 'bcryptjs'
import { query } from './db.js'

export async function seedAll() {
  await seedAdmin()
  await seedProducts()
  await seedContent()
  console.log('[seed] complete')
}

async function seedAdmin() {
  const existing = await query('SELECT id FROM admin_users WHERE username = $1', ['admin'])
  if (existing.rows.length > 0) return

  const hash = await bcrypt.hash('zaren2024', 10)
  await query('INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)', ['admin', hash])
  console.log('[seed] admin user created (admin / zaren2024)')
}

async function seedProducts() {
  const products = [
    {
      slug: 'ocean-noir',
      name_en: 'OCEAN NOIR',
      name_fa: 'OCEAN NOIR',
      description_en: 'Fresh, deep and composed. A modern signature inspired by the mystery of the ocean.',
      description_fa: 'رایحه‌ای عمیق و باوقار با حسی از تازگی، الهام‌گرفته از رمز و راز اقیانوس.',
      image: '',
      price: null,
      size: '100ml',
      availability: 'available',
      is_featured: true,
      display_order: 1
    },
    {
      slug: 'aura-noir',
      name_en: 'AURA NOIR',
      name_fa: 'AURA NOIR',
      description_en: 'Subtle yet unforgettable. A quiet, intimate aura that becomes uniquely yours.',
      description_fa: 'رایحه‌ای مینیمال و نزدیک به پوست؛ حضوری آرام که به امضای شخصی شما تبدیل می‌شود.',
      image: '',
      price: null,
      size: '100ml',
      availability: 'available',
      is_featured: true,
      display_order: 2
    },
    {
      slug: 'rouge-san',
      name_en: 'ROUGE SÂN',
      name_fa: 'ROUGE SÂN',
      description_en: 'Warm, luminous and distinctive. A bold expression of modern elegance.',
      description_fa: 'گرم، درخشان و متمایز؛ بیانی جسورانه از ظرافت معاصر.',
      image: '',
      price: null,
      size: '100ml',
      availability: 'available',
      is_featured: true,
      display_order: 3
    },
    {
      slug: 'rose-veil',
      name_en: 'ROSE VEIL',
      name_fa: 'ROSE VEIL',
      description_en: 'Soft, radiant and graceful. A delicate expression of modern elegance.',
      description_fa: 'لطیف، درخشان و دلنشین؛ برداشتی ظریف از زیبایی معاصر.',
      image: '',
      price: null,
      size: '100ml',
      availability: 'available',
      is_featured: true,
      display_order: 4
    }
  ]

  for (const p of products) {
    const existing = await query('SELECT id FROM products WHERE slug = $1', [p.slug])
    if (existing.rows.length > 0) continue
    await query(`
      INSERT INTO products (slug, name_en, name_fa, description_en, description_fa, image, price, size, availability, is_featured, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `, [p.slug, p.name_en, p.name_fa, p.description_en, p.description_fa, p.image, p.price, p.size, p.availability, p.is_featured, p.display_order])
  }
  console.log('[seed] products seeded')
}

async function seedContent() {
  const sections = [
    {
      section_key: 'announcement',
      title_en: '', title_fa: '',
      body_en: 'DISCOVER YOUR SIGNATURE SCENT',
      body_fa: 'رایحه‌ای برای امضای شخصی شما',
      image: '', button_label_en: '', button_label_fa: '',
      is_visible: true
    },
    {
      section_key: 'hero',
      title_en: 'THE ART OF BEING REMEMBERED.',
      title_fa: 'هنرِ به‌یادماندن',
      body_en: 'Discover fragrances that become part of your signature.',
      body_fa: 'رایحه‌هایی را کشف کنید که بخشی از امضای شخصی شما می‌شوند.',
      image: '',
      button_label_en: 'EXPLORE THE COLLECTION',
      button_label_fa: 'کشف مجموعه عطرها',
      is_visible: true
    },
    {
      section_key: 'hero_secondary',
      title_en: 'OUR STORY',
      title_fa: 'داستان زارِن',
      body_en: '',
      body_fa: '',
      image: '',
      button_label_en: 'OUR STORY',
      button_label_fa: 'داستان زارِن',
      is_visible: true
    },
    {
      section_key: 'collection',
      title_en: 'OUR SIGNATURE SCENTS',
      title_fa: 'مجموعه عطرهای زارِن',
      body_en: 'Every fragrance tells a story.',
      body_fa: 'هر رایحه، داستانی برای گفتن دارد.',
      image: '', button_label_en: '', button_label_fa: '',
      is_visible: true
    },
    {
      section_key: 'brand_story',
      title_en: 'THE ESSENCE OF ZAREN',
      title_fa: 'جوهره زارِن',
      body_en: 'Inspired by the cultural richness of Persia and the enduring symbolism of gold, ZAREN approaches fragrance as a personal signature. Thoughtful, expressive and designed to leave a lasting impression.',
      body_fa: 'زارِن با الهام از غنای فرهنگی ایران و نماد ماندگار زر، به عطر به‌عنوان امضایی شخصی نگاه می‌کند؛ تجربه‌ای ظریف، متمایز و ماندگار.',
      image: '',
      button_label_en: 'DISCOVER OUR STORY',
      button_label_fa: 'داستان ما را بشناسید',
      is_visible: true
    },
    {
      section_key: 'luxury_feature',
      title_en: 'LUXURY IN EVERY DETAIL',
      title_fa: 'ظرافت در هر جزئیات',
      body_en: 'Each ZAREN fragrance is composed with intention — a balance of depth, presence and restraint that lingers beyond the moment.',
      body_fa: 'هر عطر زارِن با نیّتی روشن ساخته می‌شود — توازنی از عمق، حضور و ظرافت که فراتر از لحظه ماندگار است.',
      image: '',
      button_label_en: '', button_label_fa: '',
      is_visible: true
    },
    {
      section_key: 'contact',
      title_en: "LET'S CONNECT",
      title_fa: 'با زارِن در ارتباط باشید',
      body_en: 'For fragrance enquiries and orders, contact ZAREN directly.',
      body_fa: 'برای دریافت اطلاعات و ثبت سفارش، مستقیماً با زارِن در ارتباط باشید.',
      image: '',
      button_label_en: 'ORDER ON WHATSAPP',
      button_label_fa: 'سفارش از واتساپ',
      is_visible: true
    }
  ]

  for (const s of sections) {
    const existing = await query('SELECT id FROM site_content WHERE section_key = $1', [s.section_key])
    if (existing.rows.length > 0) continue
    await query(`
      INSERT INTO site_content (section_key, title_en, title_fa, body_en, body_fa, image, button_label_en, button_label_fa, is_visible)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [s.section_key, s.title_en, s.title_fa, s.body_en, s.body_fa, s.image, s.button_label_en, s.button_label_fa, s.is_visible])
  }
  console.log('[seed] content seeded')
}
