import { Router } from 'express'
import { query } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

// List published products (public)
router.get('/', async (req, res) => {
  const result = await query(`
    SELECT * FROM products WHERE is_published = true AND availability != 'hidden'
    ORDER BY display_order ASC, id ASC
  `)
  res.json(result.rows)
})

// Get single product by slug (public)
router.get('/:slug', async (req, res) => {
  const { slug } = req.params
  const result = await query('SELECT * FROM products WHERE slug = $1', [slug])
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Product not found' })
  }
  res.json(result.rows[0])
})

// List ALL products including unpublished (admin)
router.get('/admin/all', requireAuth, async (req, res) => {
  const result = await query('SELECT * FROM products ORDER BY display_order ASC, id ASC')
  res.json(result.rows)
})

// Create product (admin)
router.post('/', requireAuth, async (req, res) => {
  const p = req.body
  const slug = p.slug || slugify(p.name_en)
  const result = await query(`
    INSERT INTO products (slug, name_en, name_fa, description_en, description_fa, image, gallery_images, price, currency, size, availability, is_featured, is_published, display_order)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *
  `, [
    slug, p.name_en, p.name_fa, p.description_en, p.description_fa,
    p.image || '', p.gallery_images || '', p.price || null, p.currency || 'toman',
    p.size || '', p.availability || 'available', p.is_featured || false,
    p.is_published !== false, p.display_order || 0
  ])
  res.status(201).json(result.rows[0])
})

// Update product (admin)
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const p = req.body
  const result = await query(`
    UPDATE products SET
      slug = $1, name_en = $2, name_fa = $3, description_en = $4, description_fa = $5,
      image = $6, gallery_images = $7, price = $8, currency = $9, size = $10,
      availability = $11, is_featured = $12, is_published = $13, display_order = $14,
      updated_at = now()
    WHERE id = $15
    RETURNING *
  `, [
    p.slug, p.name_en, p.name_fa, p.description_en, p.description_fa,
    p.image || '', p.gallery_images || '', p.price || null, p.currency || 'toman',
    p.size || '', p.availability || 'available', p.is_featured || false,
    p.is_published !== false, p.display_order || 0, id
  ])
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Product not found' })
  }
  res.json(result.rows[0])
})

// Delete product (admin)
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [id])
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Product not found' })
  }
  res.json({ success: true })
})

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default router
