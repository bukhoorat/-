import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

// Get all content sections (public)
router.get('/', async (req, res) => {
  const result = await query('SELECT * FROM site_content ORDER BY id ASC')
  res.json(result.rows)
})

// Get single section by key (public)
router.get('/:key', async (req, res) => {
  const { key } = req.params
  const result = await query('SELECT * FROM site_content WHERE section_key = $1', [key])
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Section not found' })
  }
  res.json(result.rows[0])
})

// Update section (admin)
router.put('/:key', requireAuth, async (req, res) => {
  const { key } = req.params
  const c = req.body
  const result = await query(`
    UPDATE site_content SET
      title_en = $1, title_fa = $2, body_en = $3, body_fa = $4,
      image = $5, button_label_en = $6, button_label_fa = $7, is_visible = $8
    WHERE section_key = $9
    RETURNING *
  `, [
    c.title_en || '', c.title_fa || '', c.body_en || '', c.body_fa || '',
    c.image || '', c.button_label_en || '', c.button_label_fa || '',
    c.is_visible !== false, key
  ])
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Section not found' })
  }
  res.json(result.rows[0])
})

export default router
