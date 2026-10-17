import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://zaren:zaren@localhost:5432/zaren'
})

export async function query(text, params) {
  const res = await pool.query(text, params)
  return res
}

export async function initDB() {
  await query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name_en TEXT NOT NULL,
      name_fa TEXT NOT NULL,
      description_en TEXT,
      description_fa TEXT,
      image TEXT,
      gallery_images TEXT,
      price NUMERIC(12, 2),
      currency TEXT DEFAULT 'toman',
      size TEXT,
      availability TEXT DEFAULT 'available',
      is_featured BOOLEAN DEFAULT false,
      is_published BOOLEAN DEFAULT true,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS site_content (
      id SERIAL PRIMARY KEY,
      section_key TEXT UNIQUE NOT NULL,
      title_en TEXT,
      title_fa TEXT,
      body_en TEXT,
      body_fa TEXT,
      image TEXT,
      button_label_en TEXT,
      button_label_fa TEXT,
      is_visible BOOLEAN DEFAULT true
    )
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      default_language TEXT DEFAULT 'fa',
      whatsapp_number TEXT DEFAULT '09305459758',
      instagram_username TEXT DEFAULT 'zaren__perfume',
      tagline TEXT DEFAULT 'BE REMEMBERED.',
      music_enabled BOOLEAN DEFAULT false,
      music_file_url TEXT DEFAULT '',
      show_prices BOOLEAN DEFAULT false,
      currency_label TEXT DEFAULT 'toman',
      seo_title_en TEXT DEFAULT 'ZAREN — Luxury Fragrances',
      seo_title_fa TEXT DEFAULT 'زارِن — عطر لوکس',
      seo_description_en TEXT DEFAULT 'Discover fragrances that become part of your signature. ZAREN luxury perfumes.',
      seo_description_fa TEXT DEFAULT 'رایحه‌هایی را کشف کنید که بخشی از امضای شخصی شما می‌شوند. عطر لوکس زارِن.',
      copyright_text TEXT DEFAULT '© 2024 ZAREN. All rights reserved.',
      announcement_en TEXT DEFAULT 'DISCOVER YOUR SIGNATURE SCENT',
      announcement_fa TEXT DEFAULT 'رایحه‌ای برای امضای شخصی شما'
    )
  `)

  // Ensure single settings row exists
  await query(`INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING`)

  console.log('[db] schema initialized')
}

export default pool
