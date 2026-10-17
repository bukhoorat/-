import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import { buildProductWhatsAppLink } from '../utils/links.js'
import ProductBottle3D from './ProductBottle3D.jsx'

const slugThemes = {
  'ocean-noir': 'ocean',
  'aura-noir': 'aura',
  'rouge-san': 'rouge',
  'rose-veil': 'rose'
}

function getTheme(slug) {
  return slugThemes[slug] || 'ocean'
}

export default function ProductCard({ product }) {
  const { t, lang } = useLang()
  const { settings } = useSiteData()

  const name = product.name_en // Keep product names unchanged in both languages
  const desc = lang === 'fa' ? product.description_fa : product.description_en
  const showPrice = settings?.show_prices && product.price
  const priceText = showPrice
    ? `${Number(product.price).toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US')} ${settings?.currency_label || 'toman'}`
    : null

  const statusClass = product.availability === 'sold_out' ? 'status-sold_out' : 'status-available'
  const statusText = product.availability === 'sold_out' ? t('soldOut') : t('available')

  const waLink = buildProductWhatsAppLink(settings?.whatsapp_number, name, lang)

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card-image">
        <ProductBottle3D theme={getTheme(product.slug)} image={product.image} alt={name} interactive />
      </Link>
      <div className="product-card-body">
        <div className="product-card-name">{name}</div>
        <div className="product-card-desc">{desc}</div>
        {priceText && <div className="product-card-price">{priceText}</div>}
        <div className={`product-card-status ${statusClass}`}>{statusText}</div>
        <div className="product-card-actions">
          <Link to={`/product/${product.slug}`} className="btn btn-sm">{t('discoverFragrance')}</Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm">{t('orderWhatsapp')}</a>
        </div>
      </div>
    </div>
  )
}
