import { useState } from 'react'
import { api } from '../../api/client.js'
import { useLang } from '../../context/LanguageContext.jsx'

export default function AdminPassword() {
  const { t } = useLang()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [status, setStatus] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('')
    try {
      await api.changePassword(currentPassword, newPassword)
      setStatus(t('saved'))
      setCurrentPassword('')
      setNewPassword('')
    } catch (err) {
      setStatus(err.message)
    }
  }

  return (
    <div>
      <h1>{t('changePassword')}</h1>
      {status && <div className={`admin-status ${status === t('saved') ? 'success' : 'error'}`}>{status}</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>{t('currentPassword')}</label>
          <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required autoComplete="current-password" />
        </div>
        <div className="form-group">
          <label>{t('newPassword')}</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required autoComplete="new-password" minLength="6" />
        </div>
        <button type="submit" className="btn btn-primary">{t('save')}</button>
      </form>
    </div>
  )
}
