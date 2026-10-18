'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { Icon } from './Icons';
import { SiteSettings } from '@/lib/types';
import { whatsappLink, instagramLink } from '@/lib/utils';

export function Footer({ settings }: { settings: SiteSettings }) {
  const { lang, setLang, t } = useLang();
  const isFa = lang === 'fa';

  const links = [
    { href: '/#collection', label: t('footer.collection') },
    { href: '/#story', label: t('footer.story') },
    { href: '/#contact', label: t('footer.contact') },
  ];

  return (
    <footer className="bg-zaren-black border-t border-zaren-gold-champagne/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <div className="text-center md:text-start">
            <Link href="/" className="text-2xl font-serif tracking-[0.3em] text-zaren-gold-champagne hover:text-zaren-gold-highlight transition-colors">
              ZAREN
            </Link>
            <p className={`mt-3 text-xs tracking-[0.2em] uppercase text-zaren-muted ${isFa ? 'font-persian tracking-normal' : ''}`}>
              {settings.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.15em] uppercase text-zaren-ivory/60 hover:text-zaren-gold-champagne transition-colors ${isFa ? 'font-persian tracking-normal' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social & Language */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-4">
              <a
                href={whatsappLink(settings.whatsapp_number, isFa ? 'سلام' : 'Hello')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zaren-ivory/60 hover:text-zaren-gold-champagne transition-colors"
                aria-label="WhatsApp"
              >
                <Icon name="whatsapp" size={20} />
              </a>
              <a
                href={instagramLink(settings.instagram_username)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zaren-ivory/60 hover:text-zaren-gold-champagne transition-colors"
                aria-label="Instagram"
              >
                <Icon name="instagram" size={20} />
              </a>
              <button
                onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
                className="text-xs tracking-widest text-zaren-ivory/60 hover:text-zaren-gold-champagne transition-colors"
              >
                {lang === 'fa' ? 'EN' : 'FA'}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-zaren-gold-champagne/5 text-center">
          <p className={`text-xs text-zaren-muted/50 ${isFa ? 'font-persian' : ''}`}>
            {settings.copyright_notice}
          </p>
        </div>
      </div>
    </footer>
  );
}
