import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { isAuthenticated } from '@/lib/auth';
import { Product } from '@/lib/types';

export async function GET() {
  const products = await store.getProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const products = await store.getProducts();

  const newProduct: Product = {
    id: body.slug || `product-${Date.now()}`,
    slug: body.slug || `product-${Date.now()}`,
    name_en: body.name_en || '',
    name_fa: body.name_fa || '',
    description_en: body.description_en || '',
    description_fa: body.description_fa || '',
    main_image: body.main_image || '',
    gallery_images: body.gallery_images || [],
    price: body.price ?? null,
    currency: body.currency || 'IRR',
    volume: body.volume || '',
    availability: body.availability || 'in_stock',
    is_featured: body.is_featured || false,
    is_published: body.is_published ?? true,
    display_order: body.display_order ?? products.length + 1,
    color_theme: body.color_theme || {
      glass: '#1a1816',
      liquid: '#2a2418',
      cap: '#0a0806',
      accent: '#C6A46A',
      glow: 'rgba(198,164,106,0.3)',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  products.push(newProduct);
  await store.saveProducts(products);
  return NextResponse.json(newProduct);
}
