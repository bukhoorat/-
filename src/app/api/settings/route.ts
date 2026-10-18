import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const settings = await store.getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const current = await store.getSettings();
  const updated = { ...current, ...body };
  await store.saveSettings(updated);
  return NextResponse.json(updated);
}
