'use client';

import { useLang } from './LanguageProvider';
import { Icon } from './Icons';
import { SiteSettings, SiteContent } from '@/lib/types';
import { whatsappLink, instagramLink } from '@/lib/utils';

interface ContactProps {
  settings: SiteSettings;
  content: SiteContent['contact'];
}

export function Contact({ settings, content }: ContactProps) {
  const { lang, t } = useLang();
  const isFa = lang === 'fa';
  const heading = isFa ? content.heading_fa : content.heading_en;
  const body = isFa ? content.body_fa : content.body_en;

  const waMessage = isFa
    ? 'سلام، اطلاعات بیشتری درباره عطرهای زارِن می‌خواهم.'
    : 'Hello, I would like to know more about ZAREN perfumes.';

  return (
    <section id="contact" className="py-20 md:py-28 bg-zaren-black relative">
      <div className="section-divider mb-16" />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <h2 className={`text-3xl md:text-4xl font-serif text-zaren-gold-champagne mb-6 ${isFa ? 'font-persian' : ''}`}>
          {heading}
        </h2>

        <div className="w-12 h-px bg-zaren-gold-champagne/60 mx-auto mb-6" />

        <p className={`text-sm md:text-base text-zaren-muted mb-12 leading-relaxed ${isFa ? 'font-persian' : ''}`}>
          {body}
        </p>

        {/* Contact buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href={whatsappLink(settings.whatsapp_number, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-solid"
          >
            <Icon name="whatsapp" size={18} />
            {t('buttons.orderWhatsApp')}
          </a>
          <a
            href={instagramLink(settings.instagram_username)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <Icon name="instagram" size={18} />
            {t('buttons.contactInstagram')}
          </a>
        </div>

        {/* Instagram username */}
        <p className={`text-xs text-zaren-muted/60 ${isFa ? 'font-persian' : ''}`}>
          {isFa
            ? `اینستاگرام: @${settings.instagram_username} — ${t('labels.igHint')}`
            : `Instagram: @${settings.instagram_username} — ${t('labels.igHint')}`}
        </p>
      </div>
    </section>
  );
}
