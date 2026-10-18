'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { Header } from './Header';
import { Footer } from './Footer';
import { PerfumeBottle } from './PerfumeBottle';
import { Icon } from './Icons';
import { ProductCard } from './ProductCard';
import { Product, SiteSettings } from '@/lib/types';
import { whatsappLink, whatsappProductMessage, instagramLink, formatPrice } from '@/lib/utils';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  settings: SiteSettings;
}

export function ProductDetailPage({ product, relatedProducts, settings }: ProductDetailPageProps) {
  const { lang, t } = useLang();
  const isFa = lang === 'fa';
  const name = isFa ? product.name_fa : product.name_en;
  const description = isFa ? product.description_fa : product.description_en;

  const availabilityLabel =
    product.availability === 'in_stock' ? t('labels.inStock')
    : product.availability === 'out_of_stock' ? t('labels.outOfStock')
    : t('labels.preorder');

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-zaren-black">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <Link
            href="/#collection"
            className={`flex items-center gap-2 text-xs tracking-widest uppercase text-zaren-muted hover:text-zaren-gold-champagne transition-colors ${isFa ? 'font-persian tracking-normal' : ''}`}
          >
            <Icon name={isFa ? 'arrow-left' : 'arrow-left'} size={16} />
            {t('buttons.backToCollection')}
          </Link>
        </div>

        {/* Product detail */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <div className="relative aspect-[3/4] bg-gradient-to-b from-zaren-charcoal via-zaren-surface to-zaren-black flex items-center justify-center overflow-hidden">
              {/* Ambient glow */}
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(circle at 50% 40%, ${product.color_theme.glow}, transparent 60%)` }}
              />
              {product.main_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.main_image}
                  alt={name}
                  className="relative z-10 w-full h-full object-cover"
                />
              ) : (
                <div className="relative z-10 w-1/2 animate-float">
                  <PerfumeBottle
                    theme={product.color_theme}
                    className="w-full h-auto"
                    label={name.charAt(0)}
                  />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <h1 className={`text-3xl md:text-4xl font-serif text-zaren-ivory mb-3 ${isFa ? 'font-persian' : ''}`}>
                {name}
              </h1>

              {/* Availability */}
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-2 h-2 rounded-full ${product.availability === 'in_stock' ? 'bg-zaren-gold-champagne' : 'bg-zaren-muted/40'}`} />
                <span className={`text-xs tracking-widest uppercase text-zaren-muted ${isFa ? 'font-persian tracking-normal' : ''}`}>
                  {availabilityLabel}
                </span>
              </div>

              {/* Description */}
              <p className={`text-sm md:text-base text-zaren-muted leading-relaxed mb-8 ${isFa ? 'font-persian' : ''}`}>
                {description}
              </p>

              {/* Price & Volume */}
              <div className="space-y-2 mb-8">
                {settings.show_prices && product.price != null && (
                  <p className="text-xl font-serif text-zaren-gold-champagne">
                    {formatPrice(product.price, settings.currency_label)}
                  </p>
                )}
                {product.volume && (
                  <p className={`text-sm text-zaren-muted/70 ${isFa ? 'font-persian' : ''}`}>
                    {t('labels.volume')}: {product.volume}
                  </p>
                )}
              </div>

              <div className="w-12 h-px bg-zaren-gold-champagne/40 mb-8" />

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink(settings.whatsapp_number, whatsappProductMessage(product.name_en, lang))}
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

              {/* Instagram hint */}
              <p className={`text-xs text-zaren-muted/50 mt-4 ${isFa ? 'font-persian' : ''}`}>
                {t('labels.igHint')}
              </p>
            </div>
          </div>
        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="py-20 bg-zaren-charcoal/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <h2 className={`text-center text-2xl md:text-3xl font-serif text-zaren-gold-champagne mb-12 ${isFa ? 'font-persian' : ''}`}>
                {t('labels.relatedProducts')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} settings={settings} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer settings={settings} />
    </>
  );
}
