import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Header() {
  const { t } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { to: '/', label: t('home'), end: true },
    { to: '/collection', label: t('collection') },
    { to: '/our-story', label: t('ourStory') },
    { to: '/contact', label: t('contact') }
  ]

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">ZAREN</Link>
        <nav className="header-nav">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => isActive ? 'active' : ''}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-right">
          <LanguageSwitcher />
          <div className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} role="button" tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') setMobileOpen(!mobileOpen) }}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMobileOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
