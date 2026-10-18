'use client';

import { useLang } from './LanguageProvider';
import { Icon } from './Icons';
import { SiteContent } from '@/lib/types';

export function BrandValues({ content }: { content: SiteContent['brandValues'] }) {
  const { lang } = useLang();
  const isFa = lang === 'fa';
  const heading = isFa ? content.heading_fa : content.heading_en;

  return (
    <section className="py-20 md:py-28 bg-zaren-black relative">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className={`text-center text-3xl md:text-4xl font-serif text-zaren-gold-champagne mb-16 ${isFa ? 'font-persian' : ''}`}>
          {heading}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
          {content.values.map((value, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div className="relative mb-6 transition-transform duration-500 group-hover:scale-110">
                <div className="w-16 h-16 rounded-full border border-zaren-gold-champagne/30 flex items-center justify-center text-zaren-gold-champagne transition-colors duration-500 group-hover:border-zaren-gold-champagne/60 group-hover:text-zaren-gold-highlight">
                  <Icon name={value.icon} size={28} />
                </div>
              </div>

              {/* Title */}
              <h3 className={`text-xs tracking-[0.15em] uppercase text-zaren-ivory mb-3 ${isFa ? 'font-persian tracking-normal' : ''}`}>
                {isFa ? value.title_fa : value.title_en}
              </h3>

              {/* Text */}
              <p className={`text-xs text-zaren-muted leading-relaxed max-w-[200px] ${isFa ? 'font-persian' : ''}`}>
                {isFa ? value.text_fa : value.text_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
