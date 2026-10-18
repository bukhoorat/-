import { store } from '@/lib/store';
import { ProductDetailPage } from '@/components/ProductDetailPage';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await store.getProductBySlug(params.slug);
  if (!product) return {};

  const settings = await store.getSettings();
  const title = `${product.name_en} — ZAREN`;
  const description = product.description_en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: product.main_image ? [{ url: product.main_image, alt: product.name_en }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await store.getProductBySlug(params.slug);
  if (!product || !product.is_published) notFound();

  const [relatedProducts, settings] = await Promise.all([
    store.getRelatedProducts(params.slug),
    store.getSettings(),
  ]);

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={relatedProducts}
      settings={settings}
    />
  );
}
