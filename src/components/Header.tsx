'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { Icon } from './Icons';

export function Header() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/#collection', label: t('nav.collection') },
    { href: '/#story', label: t('nav.story') },
    { href: '/#contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? 'bg-zaren-black/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-serif tracking-[0.3em] text-zaren-gold-champagne hover:text-zaren-gold-highlight transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          ZAREN
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.2em] uppercase text-zaren-ivory/70 hover:text-zaren-gold-champagne transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
            className="flex items-center gap-1.5 text-xs tracking-widest text-zaren-ivory/70 hover:text-zaren-gold-champagne transition-colors"
            aria-label="Switch language"
          >
            <Icon name="globe" size={16} />
            <span>{lang === 'fa' ? 'EN' : 'FA'}</span>
          </button>

          <button
            className="md:hidden text-zaren-ivory/80 hover:text-zaren-gold-champagne transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Gold divider */}
      <div className={`h-px bg-gradient-to-r from-transparent via-zaren-gold-champagne/40 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-30'}`} />

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-zaren-black/98 backdrop-blur-lg border-t border-zaren-gold-champagne/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 text-sm tracking-[0.15em] uppercase text-zaren-ivory/80 hover:text-zaren-gold-champagne hover:bg-zaren-charcoal/50 transition-all border-b border-zaren-gold-champagne/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
