const API_BASE = '/api'

function getAuthHeaders() {
  const token = localStorage.getItem('zaren-admin-token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

async function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  const token = localStorage.getItem('zaren-admin-token')
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }))
    throw new Error(err.error || 'Upload failed')
  }
  return res.json()
}

export const api = {
  // Products
  getProducts: () => request('/products'),
  getProduct: (slug) => request(`/products/${slug}`),
  getAllProducts: () => request('/products/admin/all'),
  createProduct: (data) => request('/products', { method: 'POST', body: data }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: 'PUT', body: data }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),

  // Content
  getContent: () => request('/content'),
  getContentSection: (key) => request(`/content/${key}`),
  updateContent: (key, data) => request(`/content/${key}`, { method: 'PUT', body: data }),

  // Settings
  getSettings: () => request('/settings'),
  updateSettings: (data) => request('/settings', { method: 'PUT', body: data }),

  // Auth
  login: (username, password) => request('/auth/login', { method: 'POST', body: { username, password } }),
  verifyToken: () => request('/auth/me'),
  changePassword: (currentPassword, newPassword) =>
    request('/auth/password', { method: 'PUT', body: { currentPassword, newPassword } }),

  // Upload
  uploadFile
}
