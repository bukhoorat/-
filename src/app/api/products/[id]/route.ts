import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { isAuthenticated } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await store.getProductById(params.id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const products = await store.getProducts();
  const index = products.findIndex((p) => p.id === params.id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  products[index] = {
    ...products[index],
    ...body,
    id: products[index].id,
    created_at: products[index].created_at,
    updated_at: new Date().toISOString(),
  };
  await store.saveProducts(products);
  return NextResponse.json(products[index]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const products = await store.getProducts();
  const filtered = products.filter((p) => p.id !== params.id);
  await store.saveProducts(filtered);
  return NextResponse.json({ success: true });
}
