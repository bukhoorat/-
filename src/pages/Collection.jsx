import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import { api } from '../api/client.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Collection() {
  const { lang } = useLang()
  const { content } = useSiteData()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProducts().then(p => { setProducts(p); setLoading(false) }).catch(console.error)
  }, [])

  const collectionContent = content?.collection || {}
  const title = lang === 'fa' ? collectionContent.title_fa : collectionContent.title_en
  const subtitle = lang === 'fa' ? collectionContent.body_fa : collectionContent.body_en

  return (
    <>
      <div className="page-heading">
        <div className="divider"></div>
        <h1 style={{ marginTop: '16px' }}>{title || (lang === 'fa' ? 'مجموعه عطرهای زارِن' : 'OUR SIGNATURE SCENTS')}</h1>
        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '12px' }}>{subtitle}</p>
      </div>
      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="container">
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</p>
          ) : products.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{lang === 'fa' ? 'محصولی موجود نیست' : 'No products available'}</p>
          ) : (
            <div className="product-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
