import { useState, useEffect } from 'react'
import { api } from '../../api/client.js'
import { useLang } from '../../context/LanguageContext.jsx'
import { useSiteData } from '../../context/SiteDataContext.jsx'
import ImageUpload from './ImageUpload.jsx'

export default function AdminSettings() {
  const { t } = useLang()
  const { refresh } = useSiteData()
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')

  useEffect(() => { fetchSettings() }, [])

  async function fetchSettings() {
    setLoading(true)
    try { setSettings(await api.getSettings()) }
    catch (err) { setStatus(err.message) }
    finally { setLoading(false) }
  }

  async function handleSave(e) {
    e.preventDefault()
    setStatus('')
    try {
      await api.updateSettings(settings)
      setStatus(t('saved'))
      refresh()
    } catch (err) { setStatus(err.message) }
  }

  function update(field, value) {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  if (loading || !settings) return <p style={{ color: 'var(--text-muted)' }}>{t('loading')}</p>

  return (
    <div>
      <h1>{t('settings')}</h1>
      {status && <div className={`admin-status ${status === t('saved') ? 'success' : 'error'}`}>{status}</div>}
      <form onSubmit={handleSave}>
        <h3 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1rem' }}>{t('contact')}</h3>
        <div className="form-row">
          <div className="form-group">
            <label>{t('whatsappNumber')}</label>
            <input value={settings.whatsapp_number || ''} onChange={e => update('whatsapp_number', e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('instagramUsername')}</label>
            <input value={settings.instagram_username || ''} onChange={e => update('instagram_username', e.target.value)} />
          </div>
        </div>

        <h3 style={{ color: 'var(--gold)', marginBottom: '16px', marginTop: '32px', fontSize: '1rem' }}>{t('media')} — {t('musicEnabled').split(' ').slice(0, 2).join(' ')}</h3>
        <div className="form-check" style={{ marginBottom: '16px' }}>
          <input type="checkbox" id="music_enabled" checked={settings.music_enabled} onChange={e => update('music_enabled', e.target.checked)} />
          <label htmlFor="music_enabled">{t('musicEnabled')}</label>
        </div>
        <ImageUpload label={t('musicFileUrl')} value={settings.music_file_url || ''} onChange={url => update('music_file_url', url)} accept="audio/*" />

        <h3 style={{ color: 'var(--gold)', marginBottom: '16px', marginTop: '32px', fontSize: '1rem' }}>Brand</h3>
        <div className="form-row">
          <div className="form-group">
            <label>{t('tagline')}</label>
            <input value={settings.tagline || ''} onChange={e => update('tagline', e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('defaultLanguage')}</label>
            <select value={settings.default_language} onChange={e => update('default_language', e.target.value)}>
              <option value="fa">فارسی (Persian)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>{t('currencyLabel')}</label>
            <input value={settings.currency_label || ''} onChange={e => update('currency_label', e.target.value)} />
          </div>
          <div className="form-group">
            <div className="form-check" style={{ marginTop: '24px' }}>
              <input type="checkbox" id="show_prices" checked={settings.show_prices} onChange={e => update('show_prices', e.target.checked)} />
              <label htmlFor="show_prices">{t('showPrices')}</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>{t('copyrightText')}</label>
          <input value={settings.copyright_text || ''} onChange={e => update('copyright_text', e.target.value)} />
        </div>

        <h3 style={{ color: 'var(--gold)', marginBottom: '16px', marginTop: '32px', fontSize: '1rem' }}>Announcement Bar</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Announcement (EN)</label>
            <input value={settings.announcement_en || ''} onChange={e => update('announcement_en', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Announcement (FA)</label>
            <input value={settings.announcement_fa || ''} onChange={e => update('announcement_fa', e.target.value)} dir="rtl" />
          </div>
        </div>

        <h3 style={{ color: 'var(--gold)', marginBottom: '16px', marginTop: '32px', fontSize: '1rem' }}>SEO</h3>
        <div className="form-row">
          <div className="form-group">
            <label>{t('seoTitleEn')}</label>
            <input value={settings.seo_title_en || ''} onChange={e => update('seo_title_en', e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('seoTitleFa')}</label>
            <input value={settings.seo_title_fa || ''} onChange={e => update('seo_title_fa', e.target.value)} dir="rtl" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>{t('seoDescriptionEn')}</label>
            <textarea value={settings.seo_description_en || ''} onChange={e => update('seo_description_en', e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('seoDescriptionFa')}</label>
            <textarea value={settings.seo_description_fa || ''} onChange={e => update('seo_description_fa', e.target.value)} dir="rtl" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }}>{t('save')}</button>
      </form>
    </div>
  )
}
