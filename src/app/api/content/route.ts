import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const content = await store.getContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  await store.saveContent(body);
  return NextResponse.json(body);
}
