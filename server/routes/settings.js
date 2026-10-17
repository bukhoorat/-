import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

// Get settings (public)
router.get('/', async (req, res) => {
  const result = await query('SELECT * FROM site_settings WHERE id = 1')
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Settings not found' })
  }
  res.json(result.rows[0])
})

// Update settings (admin)
router.put('/', requireAuth, async (req, res) => {
  const s = req.body
  const result = await query(`
    UPDATE site_settings SET
      default_language = $1,
      whatsapp_number = $2,
      instagram_username = $3,
      tagline = $4,
      music_enabled = $5,
      music_file_url = $6,
      show_prices = $7,
      currency_label = $8,
      seo_title_en = $9,
      seo_title_fa = $10,
      seo_description_en = $11,
      seo_description_fa = $12,
      copyright_text = $13,
      announcement_en = $14,
      announcement_fa = $15
    WHERE id = 1
    RETURNING *
  `, [
    s.default_language || 'fa',
    s.whatsapp_number || '',
    s.instagram_username || '',
    s.tagline || '',
    s.music_enabled || false,
    s.music_file_url || '',
    s.show_prices || false,
    s.currency_label || 'toman',
    s.seo_title_en || '',
    s.seo_title_fa || '',
    s.seo_description_en || '',
    s.seo_description_fa || '',
    s.copyright_text || '',
    s.announcement_en || '',
    s.announcement_fa || ''
  ])
  res.json(result.rows[0])
})

export default router
