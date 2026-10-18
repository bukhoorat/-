'use client';

import { useState } from 'react';
import { SiteContent } from '@/lib/types';

interface AdminContentProps {
  content: SiteContent;
  onSave: (content: SiteContent) => Promise<boolean>;
}

export function AdminContent({ content, onSave }: AdminContentProps) {
  const [data, setData] = useState<SiteContent>(content);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const update = (section: keyof SiteContent, field: string, value: unknown) => {
    setData({ ...data, [section]: { ...data[section], [field]: value } } as SiteContent);
  };

  const updateValue = (index: number, field: string, value: string) => {
    const values = [...data.brandValues.values];
    values[index] = { ...values[index], [field]: value };
    setData({ ...data, brandValues: { ...data.brandValues, values } });
  };

  const updateIcon = (index: number, field: string, value: string) => {
    const icons = [...data.lifestyle.icons];
    icons[index] = { ...icons[index], [field]: value };
    setData({ ...data, lifestyle: { ...data.lifestyle, icons } });
  };

  async function save() {
    setSaving(true);
    const ok = await onSave(data);
    setStatus(ok ? 'Saved successfully' : 'Error saving');
    setSaving(false);
    setTimeout(() => setStatus(''), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Section title="Hero Section">
        <div className="grid grid-cols-2 gap-4">
          <InField label="Eyebrow (EN)" value={data.hero.eyebrow_en} onChange={(v) => update('hero', 'eyebrow_en', v)} />
          <InField label="Eyebrow (FA)" value={data.hero.eyebrow_fa} onChange={(v) => update('hero', 'eyebrow_fa', v)} />
          <InField label="Headline (EN)" value={data.hero.headline_en} onChange={(v) => update('hero', 'headline_en', v)} />
          <InField label="Headline (FA)" value={data.hero.headline_fa} onChange={(v) => update('hero', 'headline_fa', v)} />
          <InArea label="Body (EN)" value={data.hero.body_en} onChange={(v) => update('hero', 'body_en', v)} />
          <InArea label="Body (FA)" value={data.hero.body_fa} onChange={(v) => update('hero', 'body_fa', v)} />
          <InField label="CTA 1 (EN)" value={data.hero.cta1_en} onChange={(v) => update('hero', 'cta1_en', v)} />
          <InField label="CTA 1 (FA)" value={data.hero.cta1_fa} onChange={(v) => update('hero', 'cta1_fa', v)} />
          <InField label="CTA 2 (EN)" value={data.hero.cta2_en} onChange={(v) => update('hero', 'cta2_en', v)} />
          <InField label="CTA 2 (FA)" value={data.hero.cta2_fa} onChange={(v) => update('hero', 'cta2_fa', v)} />
        </div>
      </Section>

      {/* Brand Values */}
      <Section title="Brand Values">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InField label="Heading (EN)" value={data.brandValues.heading_en} onChange={(v) => update('brandValues', 'heading_en', v)} />
          <InField label="Heading (FA)" value={data.brandValues.heading_fa} onChange={(v) => update('brandValues', 'heading_fa', v)} />
        </div>
        {data.brandValues.values.map((val, i) => (
          <div key={i} className="border border-zaren-gold-champagne/10 rounded p-4 mb-3">
            <p className="text-xs text-zaren-gold-champagne mb-2">Value {i + 1}</p>
            <div className="grid grid-cols-3 gap-3">
              <InField label="Icon" value={val.icon} onChange={(v) => updateValue(i, 'icon', v)} />
              <InField label="Title (EN)" value={val.title_en} onChange={(v) => updateValue(i, 'title_en', v)} />
              <InField label="Title (FA)" value={val.title_fa} onChange={(v) => updateValue(i, 'title_fa', v)} />
              <InArea label="Text (EN)" value={val.text_en} onChange={(v) => updateValue(i, 'text_en', v)} />
              <InArea label="Text (FA)" value={val.text_fa} onChange={(v) => updateValue(i, 'text_fa', v)} />
            </div>
          </div>
        ))}
      </Section>

      {/* Lifestyle */}
      <Section title="Lifestyle Section">
        <div className="grid grid-cols-2 gap-4">
          <InField label="Heading (EN)" value={data.lifestyle.heading_en} onChange={(v) => update('lifestyle', 'heading_en', v)} />
          <InField label="Heading (FA)" value={data.lifestyle.heading_fa} onChange={(v) => update('lifestyle', 'heading_fa', v)} />
          <InArea label="Body (EN)" value={data.lifestyle.body_en} onChange={(v) => update('lifestyle', 'body_en', v)} />
          <InArea label="Body (FA)" value={data.lifestyle.body_fa} onChange={(v) => update('lifestyle', 'body_fa', v)} />
        </div>
        {data.lifestyle.icons.map((icon, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 mt-3">
            <InField label={`Icon ${i + 1}`} value={icon.icon} onChange={(v) => updateIcon(i, 'icon', v)} />
            <InField label={`Label (EN) ${i + 1}`} value={icon.label_en} onChange={(v) => updateIcon(i, 'label_en', v)} />
            <InField label={`Label (FA) ${i + 1}`} value={icon.label_fa} onChange={(v) => updateIcon(i, 'label_fa', v)} />
          </div>
        ))}
      </Section>

      {/* Brand Story */}
      <Section title="Brand Story">
        <div className="grid grid-cols-2 gap-4">
          <InField label="Heading (EN)" value={data.brandStory.heading_en} onChange={(v) => update('brandStory', 'heading_en', v)} />
          <InField label="Heading (FA)" value={data.brandStory.heading_fa} onChange={(v) => update('brandStory', 'heading_fa', v)} />
          <InArea label="Body (EN)" value={data.brandStory.body_en} onChange={(v) => update('brandStory', 'body_en', v)} />
          <InArea label="Body (FA)" value={data.brandStory.body_fa} onChange={(v) => update('brandStory', 'body_fa', v)} />
        </div>
      </Section>

      {/* Contact */}
      <Section title="Contact Section">
        <div className="grid grid-cols-2 gap-4">
          <InField label="Heading (EN)" value={data.contact.heading_en} onChange={(v) => update('contact', 'heading_en', v)} />
          <InField label="Heading (FA)" value={data.contact.heading_fa} onChange={(v) => update('contact', 'heading_fa', v)} />
          <InArea label="Body (EN)" value={data.contact.body_en} onChange={(v) => update('contact', 'body_en', v)} />
          <InArea label="Body (FA)" value={data.contact.body_fa} onChange={(v) => update('contact', 'body_fa', v)} />
        </div>
      </Section>

      <div className="flex items-center gap-4">
        <button onClick={save} disabled={saving} className="btn-gold-solid text-xs">
          {saving ? 'Saving...' : 'Save All Content'}
        </button>
        {status && <span className="text-xs text-zaren-muted">{status}</span>}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-zaren-gold-champagne/10 rounded-lg p-5">
      <h3 className="text-sm font-serif text-zaren-gold-champagne mb-4">{title}</h3>
      {children}
    </div>
  );
}

function InField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] text-zaren-muted mb-1">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zaren-charcoal border border-zaren-gold-champagne/20 px-3 py-2 text-sm text-zaren-ivory rounded focus:border-zaren-gold-champagne/50 outline-none" />
    </div>
  );
}

function InArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] text-zaren-muted mb-1">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2}
        className="w-full bg-zaren-charcoal border border-zaren-gold-champagne/20 px-3 py-2 text-sm text-zaren-ivory rounded focus:border-zaren-gold-champagne/50 outline-none resize-none" />
    </div>
  );
}
