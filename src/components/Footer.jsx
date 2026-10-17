import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import { buildWhatsAppLink, buildInstagramLink } from '../utils/links.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Footer() {
  const { t, lang } = useLang()
  const { settings } = useSiteData()

  const waLink = buildWhatsAppLink(settings?.whatsapp_number, '')
  const igLink = buildInstagramLink(settings?.instagram_username)
  const igDisplay = settings?.instagram_username ? `@${settings.instagram_username}` : ''
  const copyright = settings?.copyright_text || `© 2024 ZAREN. ${t('allRightsReserved')}`

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>ZAREN</h3>
            <div className="tagline">{settings?.tagline || 'BE REMEMBERED.'}</div>
          </div>
          <div className="footer-col">
            <h4>{t('navigation')}</h4>
            <Link to="/">{t('home')}</Link>
            <Link to="/collection">{t('collection')}</Link>
            <Link to="/our-story">{t('ourStory')}</Link>
            <Link to="/contact">{t('contact')}</Link>
          </div>
          <div className="footer-col">
            <h4>{t('quickLinks')}</h4>
            <Link to="/collection">{t('collection')}</Link>
            <Link to="/our-story">{t('ourStory')}</Link>
            <Link to="/contact">{t('contact')}</Link>
          </div>
          <div className="footer-col">
            <h4>{t('connectWithUs')}</h4>
            <a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={igLink} target="_blank" rel="noopener noreferrer">Instagram{igDisplay ? ` (${igDisplay})` : ''}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{copyright}</span>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}
