import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import ProductBottle3D from '../components/ProductBottle3D.jsx'

export default function OurStory() {
  const { lang } = useLang()
  const { content } = useSiteData()

  const section = content?.brand_story || {}
  const title = lang === 'fa' ? section.title_fa : section.title_en
  const body = lang === 'fa' ? section.body_fa : section.body_en

  return (
    <>
      <div className="page-heading">
        <div className="divider"></div>
        <h1 style={{ marginTop: '16px' }}>{title || (lang === 'fa' ? 'جوهره زارِن' : 'THE ESSENCE OF ZAREN')}</h1>
      </div>
      <div className="story-page">
        <div className="divider"></div>
        <p className="lead">{body}</p>
        <p>
          {lang === 'fa'
            ? 'زارِن با الهام از غنای فرهنگی ایران و نماد ماندگار زر، به عطر به‌عنوان امضایی شخصی نگاه می‌کند. هر رایحه، روایتی از ظرافت و متمایزی است که فراتر از زمان ماندگار می‌شود.'
            : 'Inspired by the cultural richness of Persia and the enduring symbolism of gold, ZAREN approaches fragrance as a personal signature. Each scent is a narrative of refinement and distinction that lingers beyond time.'}
        </p>
        <p>
          {lang === 'fa'
            ? 'ما باور داریم که عطر تنها یک رایحه نیست؛ بلکه تجربه‌ای است که در خاطره می‌ماند. زارِن، هنرِ به‌یادماندن.'
            : 'We believe fragrance is more than a scent — it is an experience that stays in memory. ZAREN, the art of being remembered.'}
        </p>
      </div>
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            <ProductBottle3D theme="rouge" alt="ZAREN" />
          </div>
        </div>
      </section>
    </>
  )
}
