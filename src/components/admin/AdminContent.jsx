import { useState, useEffect } from 'react'
import { api } from '../../api/client.js'
import { useLang } from '../../context/LanguageContext.jsx'
import ImageUpload from './ImageUpload.jsx'

export default function AdminContent() {
  const { t, lang } = useLang()
  const [sections, setSections] = useState({})
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')

  useEffect(() => { fetchContent() }, [])

  async function fetchContent() {
    setLoading(true)
    try {
      const list = await api.getContent()
      const map = {}
      list.forEach(s => { map[s.section_key] = s })
      setSections(map)
    } catch (err) { setStatus(err.message) }
    finally { setLoading(false) }
  }

  async function saveSection(key) {
    setStatus('')
    try {
      const s = sections[key]
      await api.updateContent(key, s)
      setStatus(t('saved'))
    } catch (err) { setStatus(err.message) }
  }

  function updateField(key, field, value) {
    setSections(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }))
  }

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>{t('loading')}</p>

  const editableSections = [
    { key: 'announcement', label: lang === 'fa' ? 'نوار اعلان' : 'Announcement Bar', fields: ['body_en', 'body_fa'] },
    { key: 'hero', label: lang === 'fa' ? 'بخش اصلی' : 'Hero Section', fields: ['title_en', 'title_fa', 'body_en', 'body_fa', 'button_label_en', 'button_label_fa', 'image', 'is_visible'] },
    { key: 'hero_secondary', label: lang === 'fa' ? 'دکمه ثانویه' : 'Hero Secondary Button', fields: ['title_en', 'title_fa', 'button_label_en', 'button_label_fa'] },
    { key: 'collection', label: lang === 'fa' ? 'مجموعه' : 'Collection Section', fields: ['title_en', 'title_fa', 'body_en', 'body_fa', 'is_visible'] },
    { key: 'brand_story', label: lang === 'fa' ? 'داستان برند' : 'Brand Story', fields: ['title_en', 'title_fa', 'body_en', 'body_fa', 'image', 'button_label_en', 'button_label_fa', 'is_visible'] },
    { key: 'luxury_feature', label: lang === 'fa' ? 'بخش ویژه' : 'Luxury Feature', fields: ['title_en', 'title_fa', 'body_en', 'body_fa', 'image', 'is_visible'] },
    { key: 'contact', label: lang === 'fa' ? 'تماس' : 'Contact Section', fields: ['title_en', 'title_fa', 'body_en', 'body_fa', 'button_label_en', 'button_label_fa', 'is_visible'] }
  ]

  return (
    <div>
      <h1>{t('content')}</h1>
      {status && <div className={`admin-status ${status === t('saved') ? 'success' : 'error'}`}>{status}</div>}
      {editableSections.map(sec => {
        const s = sections[sec.key]
        if (!s) return null
        return (
          <div key={sec.key} style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid rgba(198,164,106,0.1)' }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.1rem' }}>{sec.label}</h3>
            {sec.fields.includes('title_en') && (
              <div className="form-row">
                <div className="form-group">
                  <label>Title (EN)</label>
                  <input value={s.title_en || ''} onChange={e => updateField(sec.key, 'title_en', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Title (FA)</label>
                  <input value={s.title_fa || ''} onChange={e => updateField(sec.key, 'title_fa', e.target.value)} dir="rtl" />
                </div>
              </div>
            )}
            {sec.fields.includes('body_en') && (
              <div className="form-row">
                <div className="form-group">
                  <label>Body (EN)</label>
                  <textarea value={s.body_en || ''} onChange={e => updateField(sec.key, 'body_en', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Body (FA)</label>
                  <textarea value={s.body_fa || ''} onChange={e => updateField(sec.key, 'body_fa', e.target.value)} dir="rtl" />
                </div>
              </div>
            )}
            {sec.fields.includes('button_label_en') && (
              <div className="form-row">
                <div className="form-group">
                  <label>{t('buttonLabel')} (EN)</label>
                  <input value={s.button_label_en || ''} onChange={e => updateField(sec.key, 'button_label_en', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('buttonLabel')} (FA)</label>
                  <input value={s.button_label_fa || ''} onChange={e => updateField(sec.key, 'button_label_fa', e.target.value)} dir="rtl" />
                </div>
              </div>
            )}
            {sec.fields.includes('image') && (
              <ImageUpload label="Image" value={s.image || ''} onChange={url => updateField(sec.key, 'image', url)} />
            )}
            {sec.fields.includes('is_visible') && (
              <div className="form-check" style={{ marginBottom: '16px' }}>
                <input type="checkbox" id={`vis-${sec.key}`} checked={s.is_visible} onChange={e => updateField(sec.key, 'is_visible', e.target.checked)} />
                <label htmlFor={`vis-${sec.key}`}>{t('sectionVisible')}</label>
              </div>
            )}
            <button className="btn btn-primary" onClick={() => saveSection(sec.key)}>{t('save')}</button>
          </div>
        )
      })}
    </div>
  )
}
