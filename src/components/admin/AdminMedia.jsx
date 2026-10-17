import { useState } from 'react'
import { api } from '../../api/client.js'
import { useLang } from '../../context/LanguageContext.jsx'

export default function AdminMedia() {
  const { t } = useLang()
  const [uploaded, setUploaded] = useState([])
  const [status, setStatus] = useState('')

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setStatus('Uploading...')
    try {
      const res = await api.uploadFile(file)
      setUploaded(prev => [{ url: res.url, name: res.filename, type: file.type }, ...prev])
      setStatus(t('fileUploaded'))
    } catch (err) {
      setStatus(err.message)
    }
  }

  return (
    <div>
      <h1>{t('media')}</h1>
      {status && <div className={`admin-status ${status === t('fileUploaded') ? 'success' : 'error'}`}>{status}</div>}
      <div className="upload-area" onClick={() => document.getElementById('media-upload').click()} style={{ marginBottom: '24px' }}>
        {t('dragOrClick')}
      </div>
      <input type="file" id="media-upload" style={{ display: 'none' }} onChange={handleUpload} accept="image/*,audio/*" />

      {uploaded.length > 0 && (
        <div>
          <h3 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1rem' }}>{t('fileUploaded')}</h3>
          {uploaded.map((f, i) => (
            <div key={i} style={{ marginBottom: '16px', padding: '16px', background: 'var(--bg-secondary)', border: '1px solid rgba(198,164,106,0.08)' }}>
              {f.type?.startsWith('audio') ? (
                <audio src={f.url} controls style={{ width: '100%', marginBottom: '8px' }} />
              ) : (
                <img src={f.url} alt={f.name} style={{ maxWidth: '150px', marginBottom: '8px', border: '1px solid rgba(198,164,106,0.15)' }} />
              )}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input value={f.url} readOnly style={{ flex: 1, padding: '8px', background: 'var(--bg-tertiary)', border: '1px solid rgba(198,164,106,0.15)', color: 'var(--text-secondary)', fontSize: '0.8rem' }} />
                <button className="btn btn-sm" onClick={() => navigator.clipboard?.writeText(f.url)}>Copy</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
