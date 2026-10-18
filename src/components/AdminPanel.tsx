'use client';

import { useState, useEffect } from 'react';
import { Product, SiteSettings, SiteContent } from '@/lib/types';
import { AdminProducts } from './AdminProducts';
import { AdminContent } from './AdminContent';
import { AdminSettings } from './AdminSettings';

export function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'products' | 'homepage' | 'settings'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch('/api/auth/check')
      .then((r) => r.json())
      .then((data) => {
        if (!data.authed) {
          window.location.href = '/admin/login';
        } else {
          loadData();
        }
      });
  }, []);

  async function loadData() {
    const [p, s, c] = await Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch('/api/settings').then((r) => r.json()),
      fetch('/api/content').then((r) => r.json()),
    ]);
    setProducts(p);
    setSettings(s);
    setContent(c);
    setLoading(false);
  }

  async function saveContent(c: SiteContent): Promise<boolean> {
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(c),
    });
    if (res.ok) { setContent(c); return true; }
    return false;
  }

  async function saveSettings(s: SiteSettings): Promise<boolean> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s),
    });
    if (res.ok) { setSettings(s); return true; }
    return false;
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zaren-black flex items-center justify-center">
        <p className="text-zaren-muted text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zaren-black text-zaren-ivory">
      {/* Header */}
      <div className="border-b border-zaren-gold-champagne/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-zaren-black/95 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl font-serif tracking-[0.2em] text-zaren-gold-champagne">ZAREN</span>
          <span className="text-xs text-zaren-muted">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-xs text-zaren-muted hover:text-zaren-gold-champagne">View Site</a>
          <button onClick={logout} className="text-xs text-zaren-muted hover:text-red-400">Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-6 pt-4 border-b border-zaren-gold-champagne/5">
        {(['products', 'homepage', 'settings'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-xs uppercase tracking-widest transition-colors ${
              tab === t
                ? 'text-zaren-gold-champagne border-b-2 border-zaren-gold-champagne'
                : 'text-zaren-muted hover:text-zaren-ivory border-b-2 border-transparent'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto">
        {tab === 'products' && <AdminProducts products={products} onRefresh={loadData} />}
        {tab === 'homepage' && content && <AdminContent content={content} onSave={saveContent} />}
        {tab === 'settings' && settings && <AdminSettings settings={settings} onSave={saveSettings} />}
      </div>
    </div>
  );
}
