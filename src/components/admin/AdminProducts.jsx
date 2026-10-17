import { useState, useEffect } from 'react'
import { api } from '../../api/client.js'
import { useLang } from '../../context/LanguageContext.jsx'
import ImageUpload from './ImageUpload.jsx'

export default function AdminProducts() {
  const { t } = useLang()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    setLoading(true)
    try {
      const list = await api.getAllProducts()
      setProducts(list)
    } catch (err) { setStatus(err.message) }
    finally { setLoading(false) }
  }

  function startNew() {
    setEditing({
      slug: '', name_en: '', name_fa: '', description_en: '', description_fa: '',
      image: '', price: '', size: '100ml', availability: 'available',
      is_featured: false, is_published: true, display_order: 0
    })
  }

  async function handleSave(e) {
    e.preventDefault()
    setStatus('')
    try {
      if (editing.id) {
        await api.updateProduct(editing.id, editing)
      } else {
        await api.createProduct(editing)
      }
      setStatus(t('saved'))
      setEditing(null)
      fetchProducts()
    } catch (err) { setStatus(err.message) }
  }

  async function handleDelete(id) {
    if (!confirm(t('confirmDelete'))) return
    try {
      await api.deleteProduct(id)
      fetchProducts()
    } catch (err) { setStatus(err.message) }
  }

  if (editing) {
    return (
      <div>
        <h1>{editing.id ? t('edit') : t('create')} — {t('products')}</h1>
        {status && <div className={`admin-status ${status === t('saved') ? 'success' : 'error'}`}>{status}</div>}
        <form onSubmit={handleSave}>
          <div className="form-row">
            <div className="form-group">
              <label>{t('productNameEn')}</label>
              <input value={editing.name_en} onChange={e => setEditing({ ...editing, name_en: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>{t('productNameFa')}</label>
              <input value={editing.name_fa} onChange={e => setEditing({ ...editing, name_fa: e.target.value })} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t('descriptionEn')}</label>
              <textarea value={editing.description_en} onChange={e => setEditing({ ...editing, description_en: e.target.value })} />
            </div>
            <div className="form-group">
              <label>{t('descriptionFa')}</label>
              <textarea value={editing.description_fa} onChange={e => setEditing({ ...editing, description_fa: e.target.value })} />
            </div>
          </div>
          <ImageUpload label={t('productImage')} value={editing.image} onChange={url => setEditing({ ...editing, image: url })} />
          <div className="form-row">
            <div className="form-group">
              <label>{t('productPrice')}</label>
              <input type="number" step="0.01" value={editing.price || ''} onChange={e => setEditing({ ...editing, price: e.target.value })} />
            </div>
            <div className="form-group">
              <label>{t('productSize')}</label>
              <input value={editing.size || ''} onChange={e => setEditing({ ...editing, size: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t('productStatus')}</label>
              <select value={editing.availability} onChange={e => setEditing({ ...editing, availability: e.target.value })}>
                <option value="available">{t('available')}</option>
                <option value="sold_out">{t('soldOut')}</option>
                <option value="hidden">{t('hidden')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('productSlug')}</label>
              <input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t('displayOrder')}</label>
              <input type="number" value={editing.display_order || 0} onChange={e => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="form-group">
              <div className="form-check" style={{ marginTop: '24px' }}>
                <input type="checkbox" id="featured" checked={editing.is_featured} onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} />
                <label htmlFor="featured">{t('featured')}</label>
              </div>
            </div>
          </div>
          <div className="form-check" style={{ marginBottom: '20px' }}>
            <input type="checkbox" id="published" checked={editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} />
            <label htmlFor="published">{t('published')}</label>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary">{t('save')}</button>
            <button type="button" className="btn" onClick={() => { setEditing(null); setStatus('') }}>{t('cancel')}</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0 }}>{t('products')}</h1>
        <button className="btn btn-primary" onClick={startNew}>+ {t('create')}</button>
      </div>
      {status && <div className={`admin-status ${status === t('saved') ? 'success' : 'error'}`}>{status}</div>}
      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>{t('loading')}</p>
      ) : (
        <div className="admin-product-list">
          {products.map(p => (
            <div key={p.id} className="admin-product-row">
              {p.image
                ? <img src={p.image} alt={p.name_en} />
                : <div className="img-placeholder" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>No img</div>
              }
              <div className="info">
                <div className="name">{p.name_en}</div>
                <div className="meta">{p.slug} · {p.availability} · {p.is_published ? 'Published' : 'Hidden'}</div>
              </div>
              <div className="actions">
                <button className="btn btn-sm" onClick={() => setEditing(p)}>{t('edit')}</button>
                <button className="btn btn-sm" onClick={() => handleDelete(p.id)}>{t('delete')}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
