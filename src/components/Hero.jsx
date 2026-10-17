import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import ProductBottle3D from './ProductBottle3D.jsx'

export default function Hero() {
  const { t, lang } = useLang()
  const { content, settings } = useSiteData()
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const hero = content?.hero || {}
  const title = lang === 'fa' ? hero.title_fa : hero.title_en
  const subtitle = lang === 'fa' ? hero.body_fa : hero.body_en
  const primaryCta = lang === 'fa' ? hero.button_label_fa : hero.button_label_en
  const secondaryCta = lang === 'fa' ? content?.hero_secondary?.title_fa : content?.hero_secondary?.title_en

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const el = heroRef.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setParallax({ x: x * 20, y: y * 15 })
    }
    const handleLeave = () => setParallax({ x: 0, y: 0 })

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  const handleExplore = () => {
    const collectionEl = document.getElementById('collection')
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#collection')
    }
  }

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg"></div>
      <div className="hero-wordmark">ZAREN</div>
      <div className="hero-bottle-wrap" style={{ transform: `translate(calc(-50% + ${parallax.x}px), calc(-50% + ${parallax.y}px))` }}>
        <div className="hero-bottle">
          <ProductBottle3D theme="aura" image={hero.image} alt="ZAREN fragrance" />
        </div>
      </div>
      <div className="hero-content fade-in-up">
        <div className="hero-eyebrow">ZAREN</div>
        <h1>{title || (lang === 'fa' ? 'هنرِ به‌یادماندن' : 'THE ART OF BEING REMEMBERED.')}</h1>
        <p className="hero-subtitle">{subtitle || (lang === 'fa' ? 'رایحه‌هایی را کشف کنید که بخشی از امضای شخصی شما می‌شوند.' : 'Discover fragrances that become part of your signature.')}</p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={handleExplore}>
            {primaryCta || (lang === 'fa' ? 'کشف مجموعه عطرها' : 'EXPLORE THE COLLECTION')}
          </button>
          <button className="btn" onClick={() => navigate('/our-story')}>
            {secondaryCta || (lang === 'fa' ? 'داستان زارِن' : 'OUR STORY')}
          </button>
        </div>
        <div className="hero-tagline">{settings?.tagline || 'BE REMEMBERED.'}</div>
      </div>
    </section>
  )
}
