import { store } from '@/lib/store';
import { HomePage } from '@/components/HomePage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await store.getSettings();
  return {
    title: settings.seo_title_en,
    description: settings.seo_description_en,
    openGraph: {
      title: settings.seo_title_en,
      description: settings.seo_description_en,
      type: 'website',
    },
  };
}

export default async function Home() {
  const [products, settings, content] = await Promise.all([
    store.getPublishedProducts(),
    store.getSettings(),
    store.getContent(),
  ]);

  return <HomePage products={products} settings={settings} content={content} />;
}
