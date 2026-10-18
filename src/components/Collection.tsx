'use client';

import { useLang } from './LanguageProvider';
import { ProductCard } from './ProductCard';
import { Product, SiteSettings, SiteContent } from '@/lib/types';

interface CollectionProps {
  products: Product[];
  settings: SiteSettings;
  content: SiteContent;
}

export function Collection({ products, settings, content }: CollectionProps) {
  const { lang, t } = useLang();
  const isFa = lang === 'fa';

  const heading = isFa ? 'مجموعه عطرهای زارِن' : 'OUR SIGNATURE SCENTS';
  const support = t('sections.collectionSupport');

  return (
    <section id="collection" className="py-20 md:py-28 bg-zaren-charcoal/30 relative">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-serif text-zaren-gold-champagne mb-4 ${isFa ? 'font-persian' : ''}`}>
            {heading}
          </h2>
          <p className={`text-sm text-zaren-muted ${isFa ? 'font-persian' : ''}`}>
            {isFa ? 'رایحه‌ای متناسب با شخصیت خود پیدا کنید.' : 'Discover the collection.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} settings={settings} />
          ))}
        </div>
      </div>
    </section>
  );
}
