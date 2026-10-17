import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'zaren-dev-secret-change-me'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

// Express middleware: requires a valid admin JWT
export function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' })
  }
  const token = header.slice(7)
  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
  req.admin = decoded
  next()
}
