import ContactSection from '../components/ContactSection.jsx'
import { useLang } from '../context/LanguageContext.jsx'

export default function Contact() {
  const { lang } = useLang()
  return (
    <>
      <div className="page-heading">
        <div className="divider"></div>
        <h1 style={{ marginTop: '16px' }}>{lang === 'fa' ? 'تماس با ما' : 'CONTACT'}</h1>
      </div>
      <ContactSection />
    </>
  )
}
