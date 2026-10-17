import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../db.js'
import { signToken, requireAuth } from '../auth.js'

const router = Router()

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }
  const result = await query('SELECT * FROM admin_users WHERE username = $1', [username])
  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const user = result.rows[0]
  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = signToken({ id: user.id, username: user.username })
  res.json({ token, username: user.username })
})

// Verify token
router.get('/me', requireAuth, (req, res) => {
  res.json({ username: req.admin.username, id: req.admin.id })
})

// Change password
router.put('/password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new passwords required' })
  }
  const result = await query('SELECT * FROM admin_users WHERE id = $1', [req.admin.id])
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' })
  }
  const valid = await bcrypt.compare(currentPassword, result.rows[0].password_hash)
  if (!valid) {
    return res.status(401).json({ error: 'Current password is incorrect' })
  }
  const hash = await bcrypt.hash(newPassword, 10)
  await query('UPDATE admin_users SET password_hash = $1 WHERE id = $2', [hash, req.admin.id])
  res.json({ success: true })
})

export default router
