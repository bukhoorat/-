import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import AdminProducts from '../components/admin/AdminProducts.jsx'
import AdminContent from '../components/admin/AdminContent.jsx'
import AdminSettings from '../components/admin/AdminSettings.jsx'
import AdminMedia from '../components/admin/AdminMedia.jsx'
import AdminPassword from '../components/admin/AdminPassword.jsx'

export default function AdminDashboard() {
  const { isAuthenticated, logout, username } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()
  const [tab, setTab] = useState('products')

  useEffect(() => {
    if (!isAuthenticated) navigate('/admin/login')
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return null

  const tabs = [
    { key: 'products', label: t('products') },
    { key: 'content', label: t('content') },
    { key: 'settings', label: t('settings') },
    { key: 'media', label: t('media') },
    { key: 'password', label: t('changePassword') }
  ]

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">ZAREN</div>
        <nav>
          {tabs.map(item => (
            <button key={item.key} className={tab === item.key ? 'active' : ''} onClick={() => setTab(item.key)}>
              {item.label}
            </button>
          ))}
          <button onClick={() => { logout(); navigate('/') }}>{t('logout')}</button>
          <button onClick={() => navigate('/')}>← {t('home')}</button>
        </nav>
        <div style={{ padding: '16px 24px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          {username}
        </div>
      </aside>
      <div className="admin-content">
        {tab === 'products' && <AdminProducts />}
        {tab === 'content' && <AdminContent />}
        {tab === 'settings' && <AdminSettings />}
        {tab === 'media' && <AdminMedia />}
        {tab === 'password' && <AdminPassword />}
      </div>
    </div>
  )
}
