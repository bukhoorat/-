import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import ProductBottle3D from './ProductBottle3D.jsx'

export default function LuxuryFeature() {
  const { lang } = useLang()
  const { content } = useSiteData()

  const section = content?.luxury_feature || {}
  if (!section.is_visible) return null

  const title = lang === 'fa' ? section.title_fa : section.title_en
  const body = lang === 'fa' ? section.body_fa : section.body_en

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="luxury-feature">
        <div className="luxury-feature-image">
          {section.image
            ? <img src={section.image} alt={title} loading="lazy" />
            : <ProductBottle3D theme="ocean" alt={title} />
          }
        </div>
        <div className="luxury-feature-text">
          <div className="divider" style={{ marginRight: 'auto' }}></div>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      </div>
    </section>
  )
}
