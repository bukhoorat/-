import { useLang } from '../context/LanguageContext.jsx'
import { useMusic } from '../context/MusicContext.jsx'

export default function MusicEntry() {
  const { t, lang } = useLang()
  const { musicEnabled, hasMusicUrl, entryDismissed, enterWithMusic, enterSilently } = useMusic()

  // Don't show if music is disabled, no URL, already dismissed, or not first visit
  if (!musicEnabled || !hasMusicUrl || entryDismissed) return null

  return (
    <div className="music-entry">
      <div className="wordmark">ZAREN</div>
      <div className="divider"></div>
      <div className="welcome">{t('welcomeToZaren')}</div>
      <div className="welcome-msg">{t('welcomeMessage')}</div>
      <div className="music-entry-buttons">
        <button className="btn btn-primary" onClick={enterWithMusic}>
          {lang === 'fa' ? 'ورود با موسیقی' : 'ENTER WITH MUSIC'}
        </button>
        <button className="btn" onClick={enterSilently}>
          {lang === 'fa' ? 'ورود بدون موسیقی' : 'ENTER SILENTLY'}
        </button>
      </div>
    </div>
  )
}
