import { useLang } from '../context/LanguageContext.jsx'

export default function LanguageSwitcher({ compact }) {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switch" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLang(lang === 'fa' ? 'en' : 'fa') } }}>
      <span className={lang === 'fa' ? 'active' : 'inactive'}>FA</span>
      <span className="sep">/</span>
      <span className={lang === 'en' ? 'active' : 'inactive'}>EN</span>
    </div>
  )
}
