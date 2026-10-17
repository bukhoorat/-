import { useLang } from '../context/LanguageContext.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'

export default function AnnouncementBar() {
  const { lang } = useLang()
  const { content, settings } = useSiteData()

  // Prefer settings announcement (editable in Settings tab), fall back to content section
  const settingsText = lang === 'fa' ? settings?.announcement_fa : settings?.announcement_en
  const contentVisible = content?.announcement?.is_visible !== false
  const contentText = contentVisible
    ? (lang === 'fa' ? content?.announcement?.body_fa : content?.announcement?.body_en)
    : null
  const text = settingsText || contentText
  if (!text) return null
  return <div className="announcement">{text}</div>
}
