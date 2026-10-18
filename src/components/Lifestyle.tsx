'use client';

import { useLang } from './LanguageProvider';
import { Icon } from './Icons';
import { PerfumeBottle } from './PerfumeBottle';
import { SiteContent } from '@/lib/types';

export function Lifestyle({ content }: { content: SiteContent['lifestyle'] }) {
  const { lang } = useLang();
  const isFa = lang === 'fa';
  const heading = isFa ? content.heading_fa : content.heading_en;
  const body = isFa ? content.body_fa : content.body_en;

  return (
    <section className="py-20 md:py-28 bg-zaren-black relative overflow-hidden">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <div className={`relative ${isFa ? 'md:order-2' : 'md:order-1'}`}>
            <div className="relative aspect-[4/5] bg-gradient-to-br from-zaren-surface via-zaren-charcoal to-zaren-black overflow-hidden flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(198,164,106,0.15), transparent)' }} />
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(198,164,106,0.1), transparent)' }} />
              </div>
              {/* Silk-like waves */}
              <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 400 500">
                <path d="M0,350 Q100,300 200,350 T400,350 L400,500 L0,500 Z" fill="#C6A46A" opacity="0.15" />
                <path d="M0,380 Q100,330 200,380 T400,380 L400,500 L0,500 Z" fill="#C6A46A" opacity="0.1" />
              </svg>
              <div className="relative z-10 w-1/2">
                <PerfumeBottle
                  theme={{
                    glass: '#2a2420',
                    liquid: '#3a3028',
                    cap: '#0a0806',
                    accent: '#C6A46A',
                    glow: 'rgba(198,164,106,0.3)',
                  }}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`${isFa ? 'md:order-1' : 'md:order-2'}`}>
            <h2 className={`text-3xl md:text-4xl font-serif text-zaren-gold-champagne mb-6 ${isFa ? 'font-persian' : ''}`}>
              {heading}
            </h2>
            <div className="w-12 h-px bg-zaren-gold-champagne/60 mb-6" />
            <p className={`text-sm md:text-base text-zaren-muted leading-relaxed mb-10 ${isFa ? 'font-persian' : ''}`}>
              {body}
            </p>

            {/* Sub-icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {content.icons.map((icon, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full border border-zaren-gold-champagne/30 flex items-center justify-center text-zaren-gold-champagne mb-3 transition-colors hover:border-zaren-gold-champagne/60 hover:text-zaren-gold-highlight">
                    <Icon name={icon.icon} size={24} />
                  </div>
                  <span className={`text-[10px] tracking-[0.1em] uppercase text-zaren-muted ${isFa ? 'font-persian tracking-normal' : ''}`}>
                    {isFa ? icon.label_fa : icon.label_en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
