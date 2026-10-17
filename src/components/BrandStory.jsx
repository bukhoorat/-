import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import ProductBottle3D from './ProductBottle3D.jsx'

export default function BrandStory() {
  const { t, lang } = useLang()
  const { content } = useSiteData()
  const navigate = useNavigate()

  const section = content?.brand_story || {}
  if (!section.is_visible) return null

  const title = lang === 'fa' ? section.title_fa : section.title_en
  const body = lang === 'fa' ? section.body_fa : section.body_en
  const btnLabel = lang === 'fa' ? section.button_label_fa : section.button_label_en

  return (
    <section className="section">
      <div className="brand-story">
        <div className="brand-story-text">
          <div className="divider" style={{ marginRight: 'auto' }}></div>
          <h2>{title}</h2>
          <p>{body}</p>
          {btnLabel && (
            <button className="btn" onClick={() => navigate('/our-story')}>{btnLabel}</button>
          )}
        </div>
        <div className="brand-story-image">
          {section.image
            ? <img src={section.image} alt={title} loading="lazy" />
            : <ProductBottle3D theme="rouge" alt={title} />
          }
        </div>
      </div>
    </section>
  )
}
