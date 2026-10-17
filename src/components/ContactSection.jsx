import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'
import { buildWhatsAppLink, buildInstagramLink } from '../utils/links.js'

export default function ContactSection() {
  const { t, lang } = useLang()
  const { content, settings } = useSiteData()

  const section = content?.contact || {}
  if (!section.is_visible) return null

  const title = lang === 'fa' ? section.title_fa : section.title_en
  const body = lang === 'fa' ? section.body_fa : section.body_en
  const waLabel = lang === 'fa' ? section.button_label_fa : section.button_label_en

  const waLink = buildWhatsAppLink(settings?.whatsapp_number,
    lang === 'fa' ? 'سلام، می‌خواهم با زارِن در ارتباط باشم.' : 'Hello, I would like to get in touch with ZAREN.')
  const igLink = buildInstagramLink(settings?.instagram_username)
  const igDisplay = settings?.instagram_username ? `@${settings.instagram_username}` : ''

  return (
    <section className="contact-section" id="contact">
      <div className="divider"></div>
      <h2 style={{ marginTop: '24px' }}>{title}</h2>
      <p>{body}</p>
      <div className="contact-buttons">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{waLabel || t('orderOnWhatsapp')}</a>
        <a href={igLink} target="_blank" rel="noopener noreferrer" className="btn">{t('messageInstagram')}</a>
      </div>
      {igDisplay && (
        <div className="contact-info">
          Instagram: <a href={igLink} target="_blank" rel="noopener noreferrer">{igDisplay}</a>
          <div className="instagram-note">{t('instagramNote')}</div>
        </div>
      )}
    </section>
  )
}
