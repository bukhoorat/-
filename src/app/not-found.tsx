'use client';

import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function NotFound() {
  const { lang, t } = useLang();
  const isFa = lang === 'fa';

  return (
    <div className="min-h-screen bg-zaren-black flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-6xl md:text-8xl font-serif text-zaren-gold-champagne/30">Z</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-zaren-gold-champagne mb-4">404</h1>
        <div className="w-12 h-px bg-zaren-gold-champagne/40 mx-auto mb-6" />
        <p className={`text-sm text-zaren-muted mb-10 ${isFa ? 'font-persian' : ''}`}>
          {t('notFound.message')}
        </p>
        <Link href="/" className="btn-gold">
          {t('notFound.home')}
        </Link>
      </div>
    </div>
  );
}
