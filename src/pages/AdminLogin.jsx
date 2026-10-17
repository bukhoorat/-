import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { api } from '../api/client.js'

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/admin')
  }, [isAuthenticated, navigate])

  if (isAuthenticated) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.login(username, password)
      login(res.token, res.username)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-box" onSubmit={handleSubmit}>
        <h1>ZAREN</h1>
        <div className="divider"></div>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>{t('adminLogin')}</p>
        {error && <div className="admin-status error">{error}</div>}
        <div className="form-group">
          <label>{t('username')}</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username" />
        </div>
        <div className="form-group">
          <label>{t('password')}</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
        </div>
        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
          {loading ? t('loading') : t('login')}
        </button>
        <Link to="/" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '8px' }}>← {t('home')}</Link>
      </form>
    </div>
  )
}
