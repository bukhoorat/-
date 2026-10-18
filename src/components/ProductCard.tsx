'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { PerfumeBottle } from './PerfumeBottle';
import { Icon } from './Icons';
import { Product, SiteSettings } from '@/lib/types';
import { whatsappLink, whatsappProductMessage, instagramLink, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  settings: SiteSettings;
}

export function ProductCard({ product, settings }: ProductCardProps) {
  const { lang, t } = useLang();
  const isFa = lang === 'fa';
  const name = isFa ? product.name_fa : product.name_en;
  const description = isFa ? product.description_fa : product.description_en;

  const availabilityLabel = product.availability === 'in_stock'
    ? t('labels.inStock')
    : product.availability === 'out_of_stock'
    ? t('labels.outOfStock')
    : t('labels.preorder');

  return (
    <div className="card-lift group flex flex-col">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] bg-gradient-to-b from-zaren-charcoal to-zaren-black overflow-hidden flex items-center justify-center">
        <PerfumeBottle
          theme={product.color_theme}
          className="w-3/5 h-auto transition-transform duration-700 group-hover:scale-110"
          label={name.charAt(0)}
        />
        {/* Availability badge */}
        <span className={`absolute top-3 ${isFa ? 'left-3' : 'right-3'} text-[10px] tracking-widest uppercase px-2 py-1 ${
          product.availability === 'in_stock'
            ? 'text-zaren-gold-champagne/80'
            : 'text-zaren-muted/60'
        }`}>
          {availabilityLabel}
        </span>
      </Link>

      {/* Info */}
      <div className="pt-6 text-center flex flex-col flex-1">
        <h3 className={`text-lg font-serif text-zaren-ivory mb-2 ${isFa ? 'font-persian' : ''}`}>
          {name}
        </h3>
        <p className={`text-xs text-zaren-muted mb-3 line-clamp-2 leading-relaxed flex-1 ${isFa ? 'font-persian' : ''}`}>
          {description}
        </p>

        {/* Price & Volume */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {settings.show_prices && product.price != null && (
            <span className="text-sm text-zaren-gold-champagne">
              {formatPrice(product.price, settings.currency_label)}
            </span>
          )}
          {product.volume && (
            <span className="text-xs text-zaren-muted/60">{product.volume}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="btn-gold text-[10px] py-2.5"
          >
            {t('buttons.viewDetails')}
          </Link>
          <div className="flex gap-2">
            <a
              href={whatsappLink(settings.whatsapp_number, whatsappProductMessage(product.name_en, lang))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-zaren-gold-champagne/30 text-zaren-gold-champagne text-[10px] tracking-widest uppercase hover:bg-zaren-gold-champagne/10 transition-colors"
            >
              <Icon name="whatsapp" size={14} />
              <span className="hidden sm:inline">{t('buttons.orderWhatsApp')}</span>
            </a>
            <a
              href={instagramLink(settings.instagram_username)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-zaren-gold-champagne/30 text-zaren-gold-champagne hover:bg-zaren-gold-champagne/10 transition-colors"
              aria-label={t('buttons.contactInstagram')}
            >
              <Icon name="instagram" size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
