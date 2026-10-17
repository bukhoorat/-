import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { requireAuth } from '../auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.join(__dirname, 'uploads')

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const name = `zaren-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, name)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|webp|gif|svg|mp3|wav|ogg|m4a)$/i
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true)
    } else {
      cb(new Error('File type not supported'))
    }
  }
})

const router = Router()

// Upload single file (admin)
router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  const url = `/uploads/${req.file.filename}`
  res.json({ url, filename: req.file.filename })
})

// Delete file (admin)
router.delete('/', requireAuth, (req, res) => {
  const { filename } = req.body
  if (!filename) return res.status(400).json({ error: 'Filename required' })
  const safe = path.basename(filename)
  const filePath = path.join(uploadsDir, safe)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  res.json({ success: true })
})

export default router
