'use client';

import { useLang } from './LanguageProvider';
import { SiteContent } from '@/lib/types';

export function BrandStory({ content }: { content: SiteContent['brandStory'] }) {
  const { lang } = useLang();
  const isFa = lang === 'fa';
  const heading = isFa ? content.heading_fa : content.heading_en;
  const body = isFa ? content.body_fa : content.body_en;

  return (
    <section id="story" className="py-20 md:py-28 bg-zaren-charcoal/30 relative overflow-hidden">
      <div className="section-divider mb-16" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        {/* Decorative Z monogram */}
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 rounded-full border border-zaren-gold-champagne/20 flex items-center justify-center">
            <span className="text-5xl font-serif text-zaren-gold-champagne/40">Z</span>
          </div>
        </div>

        <h2 className={`text-3xl md:text-4xl font-serif text-zaren-gold-champagne mb-8 ${isFa ? 'font-persian' : ''}`}>
          {heading}
        </h2>

        <div className="w-12 h-px bg-zaren-gold-champagne/60 mx-auto mb-8" />

        <p className={`text-base md:text-lg text-zaren-muted leading-relaxed max-w-2xl mx-auto ${isFa ? 'font-persian' : ''}`}>
          {body}
        </p>

        {/* Gold inspiration note */}
        <p className={`mt-10 text-xs tracking-[0.2em] uppercase text-zaren-gold-champagne/50 ${isFa ? 'font-persian tracking-normal' : ''}`}>
          {isFa ? 'زارِن، الهام‌گرفته از واژهٔ فارسی «زر» به معنای طلا' : 'ZAREN — inspired by the Persian word "Zar," meaning gold'}
        </p>
      </div>
    </section>
  );
}
