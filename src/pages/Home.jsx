import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import { api } from '../api/client.js'
import Hero from '../components/Hero.jsx'
import ProductCard from '../components/ProductCard.jsx'
import BrandStory from '../components/BrandStory.jsx'
import LuxuryFeature from '../components/LuxuryFeature.jsx'
import ContactSection from '../components/ContactSection.jsx'

export default function Home() {
  const { t, lang } = useLang()
  const { content } = useSiteData()
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.getProducts().then(setProducts).catch(console.error)
  }, [])

  const collectionContent = content?.collection || {}

  return (
    <>
      <Hero />
      {collectionContent.is_visible !== false && (
        <section className="section" id="collection">
          <div className="container">
            <div className="section-heading">
              <div className="divider"></div>
              <h2 style={{ marginTop: '16px' }}>{lang === 'fa' ? collectionContent.title_fa : collectionContent.title_en}</h2>
              <p>{lang === 'fa' ? collectionContent.body_fa : collectionContent.body_en}</p>
            </div>
            <div className="product-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
      <BrandStory />
      <LuxuryFeature />
      <ContactSection />
    </>
  )
}
