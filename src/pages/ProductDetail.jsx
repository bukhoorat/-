import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import { api } from '../api/client.js'
import { buildProductWhatsAppLink, buildInstagramLink } from '../utils/links.js'
import ProductBottle3D from '../components/ProductBottle3D.jsx'
import ProductCard from '../components/ProductCard.jsx'

const slugThemes = {
  'ocean-noir': 'ocean',
  'aura-noir': 'aura',
  'rouge-san': 'rouge',
  'rose-veil': 'rose'
}

export default function ProductDetail() {
  const { slug } = useParams()
  const { t, lang } = useLang()
  const { settings } = useSiteData()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.getProduct(slug).then(p => {
      setProduct(p)
      setLoading(false)
      // Fetch related products
      api.getProducts().then(all => {
        setRelated(all.filter(x => x.id !== p.id).slice(0, 4))
      }).catch(() => {})
    }).catch(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="page-heading"><p style={{ color: 'var(--text-muted)' }}>{t('loading')}</p></div>
  if (!product) return (
    <div className="page-heading">
      <h1>{t('productNotFound')}</h1>
      <Link to="/collection" className="btn" style={{ marginTop: '24px' }}>{t('backToCollection')}</Link>
    </div>
  )

  const name = product.name_en
  const desc = lang === 'fa' ? product.description_fa : product.description_en
  const showPrice = settings?.show_prices && product.price
  const priceText = showPrice
    ? `${Number(product.price).toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US')} ${settings?.currency_label || 'toman'}`
    : null
  const statusClass = product.availability === 'sold_out' ? 'status-sold_out' : 'status-available'
  const statusText = product.availability === 'sold_out' ? t('soldOut') : t('available')

  const waLink = buildProductWhatsAppLink(settings?.whatsapp_number, name, lang)
  const igLink = buildInstagramLink(settings?.instagram_username)

  return (
    <>
      <div className="product-detail">
        <div className="product-detail-inner">
          <div>
            <Link to="/collection" className="back-link">{lang === 'fa' ? '→' : '←'} {t('backToCollection')}</Link>
            <div className="product-detail-image">
              <ProductBottle3D theme={slugThemes[slug] || 'ocean'} image={product.image} alt={name} interactive />
            </div>
          </div>
          <div className="product-detail-info">
            <h1>{name}</h1>
            <p className="product-detail-desc">{desc}</p>
            <div className="product-detail-meta">
              {priceText && (
                <div className="product-detail-meta-row">
                  <span className="product-detail-meta-label">{t('price')}</span>
                  <span className="product-detail-meta-value">{priceText}</span>
                </div>
              )}
              {product.size && (
                <div className="product-detail-meta-row">
                  <span className="product-detail-meta-label">{t('size')}</span>
                  <span className="product-detail-meta-value">{product.size}</span>
                </div>
              )}
              <div className="product-detail-meta-row">
                <span className="product-detail-meta-label">{t('productStatus')}</span>
                <span className={`product-detail-meta-value ${statusClass}`}>{statusText}</span>
              </div>
            </div>
            <div className="product-detail-actions">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{t('orderOnWhatsapp')}</a>
              <a href={igLink} target="_blank" rel="noopener noreferrer" className="btn">{t('messageInstagram')}</a>
            </div>
            <p className="instagram-note" style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {t('instagramNote')}
            </p>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="related-products">
          <div className="container">
            <h2>{t('relatedProducts')}</h2>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
