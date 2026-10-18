'use client';

import { Header } from './Header';
import { Hero } from './Hero';
import { BrandValues } from './BrandValues';
import { Collection } from './Collection';
import { Lifestyle } from './Lifestyle';
import { BrandStory } from './BrandStory';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { Product, SiteSettings, SiteContent } from '@/lib/types';

interface HomePageProps {
  products: Product[];
  settings: SiteSettings;
  content: SiteContent;
}

export function HomePage({ products, settings, content }: HomePageProps) {
  return (
    <>
      <Header />
      <main>
        <Hero content={content.hero} settings={settings} />
        <BrandValues content={content.brandValues} />
        <Collection products={products} settings={settings} content={content} />
        <Lifestyle content={content.lifestyle} />
        <BrandStory content={content.brandStory} />
        <Contact settings={settings} content={content.contact} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
