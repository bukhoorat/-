import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { initDB } from './db.js'
import { seedAll } from './seed.js'
import productsRouter from './routes/products.js'
import contentRouter from './routes/content.js'
import settingsRouter from './routes/settings.js'
import authRouter from './routes/auth.js'
import uploadRouter from './routes/upload.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API routes
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/content', contentRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/upload', uploadRouter)

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }))

async function start() {
  await initDB()
  await seedAll()
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[api] running on http://0.0.0.0:${PORT}`)
  })
}

start().catch(err => {
  console.error('[api] failed to start:', err)
  process.exit(1)
})
