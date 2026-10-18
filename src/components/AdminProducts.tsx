'use client';

import { useState, useEffect, useRef } from 'react';
import { Product, SiteSettings } from '@/lib/types';
import { Icon } from './Icons';

interface AdminProductsProps {
  products: Product[];
  onRefresh: () => void;
}

const emptyProduct: Product = {
  id: '',
  slug: '',
  name_en: '',
  name_fa: '',
  description_en: '',
  description_fa: '',
  main_image: '',
  gallery_images: [],
  price: null,
  currency: 'IRR',
  volume: '50ml',
  availability: 'in_stock',
  is_featured: false,
  is_published: true,
  display_order: 99,
  color_theme: { glass: '#1a1816', liquid: '#2a2418', cap: '#0a0806', accent: '#C6A46A', glow: 'rgba(198,164,106,0.3)' },
  created_at: '',
  updated_at: '',
};

export function AdminProducts({ products, onRefresh }: AdminProductsProps) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const startAdd = () => { setEditing({ ...emptyProduct }); setIsAdding(true); };
  const startEdit = (p: Product) => { setEditing({ ...p }); setIsAdding(false); };
  const cancel = () => { setEditing(null); setIsAdding(false); };

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      const method = isAdding ? 'POST' : 'PUT';
      const url = isAdding ? '/api/products' : `/api/products/${editing.id}`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        setStatus('Saved successfully');
        setEditing(null);
        setIsAdding(false);
        onRefresh();
        setTimeout(() => setStatus(''), 2000);
      } else {
        setStatus('Error saving');
      }
    } catch {
      setStatus('Error saving');
    }
    setSaving(false);
  }

  async function del(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    onRefresh();
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (res.ok) {
      const data = await res.json();
      if (editing) setEditing({ ...editing, main_image: data.url });
    }
  }

  const update = (field: string, value: unknown) => {
    if (editing) setEditing({ ...editing, [field]: value });
  };
  const updateTheme = (field: string, value: string) => {
    if (editing) setEditing({ ...editing, color_theme: { ...editing.color_theme, [field]: value } });
  };

  if (editing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif text-zaren-gold-champagne">
            {isAdding ? 'Add Product' : 'Edit Product'}
          </h3>
          <button onClick={cancel} className="text-zaren-muted hover:text-zaren-ivory text-sm">Cancel</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Name (English)" value={editing.name_en} onChange={(v) => update('name_en', v)} />
          <Field label="Name (Persian)" value={editing.name_fa} onChange={(v) => update('name_fa', v)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextArea label="Description (English)" value={editing.description_en} onChange={(v) => update('description_en', v)} />
          <TextArea label="Description (Persian)" value={editing.description_fa} onChange={(v) => update('description_fa', v)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Slug" value={editing.slug} onChange={(v) => update('slug', v)} />
          <Field label="Price (optional)" value={editing.price ?? ''} onChange={(v) => update('price', v ? Number(v) : null)} />
          <Field label="Volume" value={editing.volume} onChange={(v) => update('volume', v)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <SelectField label="Availability" value={editing.availability} options={[
            { value: 'in_stock', label: 'In Stock' },
            { value: 'out_of_stock', label: 'Out of Stock' },
            { value: 'preorder', label: 'Pre-Order' },
          ]} onChange={(v) => update('availability', v)} />
          <Field label="Display Order" value={editing.display_order} onChange={(v) => update('display_order', Number(v))} />
          <div className="flex items-end gap-4">
            <Checkbox label="Featured" checked={editing.is_featured} onChange={(v) => update('is_featured', v)} />
            <Checkbox label="Published" checked={editing.is_published} onChange={(v) => update('is_published', v)} />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-xs text-zaren-muted mb-1">Main Image URL (optional — leave empty for SVG bottle)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={editing.main_image}
              onChange={(e) => update('main_image', e.target.value)}
              className="flex-1 bg-zaren-charcoal border border-zaren-gold-champagne/20 px-3 py-2 text-sm text-zaren-ivory rounded"
              placeholder="/uploads/image.jpg or URL"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 border border-zaren-gold-champagne/30 text-zaren-gold-champagne text-sm rounded hover:bg-zaren-gold-champagne/10"
            >
              <Icon name="upload" size={16} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }}
            />
          </div>
        </div>

        {/* Color theme */}
        <div>
          <label className="block text-xs text-zaren-muted mb-2">Bottle Color Theme</label>
          <div className="grid grid-cols-5 gap-2">
            <ColorField label="Glass" value={editing.color_theme.glass} onChange={(v) => updateTheme('glass', v)} />
            <ColorField label="Liquid" value={editing.color_theme.liquid} onChange={(v) => updateTheme('liquid', v)} />
            <ColorField label="Cap" value={editing.color_theme.cap} onChange={(v) => updateTheme('cap', v)} />
            <ColorField label="Accent" value={editing.color_theme.accent} onChange={(v) => updateTheme('accent', v)} />
            <Field label="Glow (rgba)" value={editing.color_theme.glow} onChange={(v) => updateTheme('glow', v)} />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={save}
            disabled={saving}
            className="btn-gold-solid text-xs"
          >
            {saving ? 'Saving...' : 'Save Product'}
          </button>
          {status && <span className="text-xs text-zaren-muted">{status}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif text-zaren-gold-champagne">Products ({products.length})</h3>
        <button onClick={startAdd} className="btn-gold text-xs py-2">
          <Icon name="plus" size={14} /> Add Product
        </button>
      </div>

      {status && <div className="text-xs text-zaren-gold-champagne">{status}</div>}

      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-zaren-charcoal/50 border border-zaren-gold-champagne/10 px-4 py-3 rounded">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-zaren-gold-champagne/20 flex items-center justify-center text-zaren-gold-champagne font-serif">
                {p.name_en.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-zaren-ivory">{p.name_en}</p>
                <p className="text-xs text-zaren-muted">{p.name_fa} · {p.volume} · #{p.display_order}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {p.is_published ? (
                <span className="text-[10px] text-zaren-gold-champagne/60 px-2 py-0.5 border border-zaren-gold-champagne/20 rounded">Published</span>
              ) : (
                <span className="text-[10px] text-zaren-muted/50 px-2 py-0.5 border border-zaren-muted/20 rounded">Hidden</span>
              )}
              <button onClick={() => startEdit(p)} className="p-1.5 text-zaren-muted hover:text-zaren-gold-champagne">
                <Icon name="edit" size={16} />
              </button>
              <button onClick={() => del(p.id)} className="p-1.5 text-zaren-muted hover:text-red-400">
                <Icon name="trash" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper components
function Field({ label, value, onChange }: { label: string; value: string | number; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-zaren-muted mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zaren-charcoal border border-zaren-gold-champagne/20 px-3 py-2 text-sm text-zaren-ivory rounded focus:border-zaren-gold-champagne/50 outline-none"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-zaren-muted mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-zaren-charcoal border border-zaren-gold-champagne/20 px-3 py-2 text-sm text-zaren-ivory rounded focus:border-zaren-gold-champagne/50 outline-none resize-none"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-zaren-muted mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zaren-charcoal border border-zaren-gold-champagne/20 px-3 py-2 text-sm text-zaren-ivory rounded focus:border-zaren-gold-champagne/50 outline-none"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-zaren-gold-champagne"
      />
      <span className="text-xs text-zaren-muted">{label}</span>
    </label>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-zaren-muted mb-1">{label}</label>
      <div className="flex gap-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-zaren-gold-champagne/20 bg-transparent cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-zaren-charcoal border border-zaren-gold-champagne/20 px-2 py-1 text-xs text-zaren-ivory rounded"
        />
      </div>
    </div>
  );
}
