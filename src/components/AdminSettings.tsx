'use client';

import { useState } from 'react';
import { SiteSettings } from '@/lib/types';

interface AdminSettingsProps {
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => Promise<boolean>;
}

export function AdminSettings({ settings, onSave }: AdminSettingsProps) {
  const [data, setData] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const update = (field: keyof SiteSettings, value: unknown) => {
    setData({ ...data, [field]: value } as SiteSettings);
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
      {/* General */}
      <Section title="General Settings">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-zaren-muted mb-1">Default Language</label>
            <select value={data.default_language} onChange={(e) => update('default_language', e.target.value)}
              className="w-full bg-zaren-charcoal border border-zaren-gold-champagne/20 px-3 py-2 text-sm text-zaren-ivory rounded outline-none">
              <option value="fa">Persian (FA)</option>
              <option value="en">English (EN)</option>
            </select>
          </div>
          <InField label="Tagline" value={data.tagline} onChange={(v) => update('tagline', v)} />
          <InField label="Currency Label" value={data.currency_label} onChange={(v) => update('currency_label', v)} />
          <div>
            <label className="flex items-center gap-2 mt-6 cursor-pointer">
              <input type="checkbox" checked={data.show_prices} onChange={(e) => update('show_prices', e.target.checked)}
                className="accent-zaren-gold-champagne" />
              <span className="text-xs text-zaren-muted">Show Prices Publicly</span>
            </label>
          </div>
        </div>
        <div className="mt-4">
          <InField label="Copyright Notice" value={data.copyright_notice} onChange={(v) => update('copyright_notice', v)} />
        </div>
      </Section>

      {/* Contact */}
      <Section title="Contact Settings">
        <div className="grid grid-cols-2 gap-4">
          <InField label="WhatsApp Number (intl format, e.g. 989305459758)" value={data.whatsapp_number} onChange={(v) => update('whatsapp_number', v)} />
          <InField label="Instagram Username (without @)" value={data.instagram_username} onChange={(v) => update('instagram_username', v)} />
        </div>
        <div className="mt-3 text-xs text-zaren-muted/60">
          <p>WhatsApp link preview: https://wa.me/{data.whatsapp_number}</p>
          <p>Instagram link preview: https://www.instagram.com/{data.instagram_username}/</p>
        </div>
      </Section>

      {/* Music */}
      <Section title="Music Settings">
        <div className="space-y-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.music_enabled} onChange={(e) => update('music_enabled', e.target.checked)}
              className="accent-zaren-gold-champagne" />
            <span className="text-xs text-zaren-muted">Enable Music Welcome Screen</span>
          </label>
          <InField label="Music File URL (leave empty to disable music button)" value={data.music_file_url} onChange={(v) => update('music_file_url', v)} />
          <p className="text-[10px] text-zaren-muted/50">
            Use a properly licensed instrumental track. The music starts only after the visitor explicitly chooses it.
          </p>
        </div>
      </Section>

      {/* SEO */}
      <Section title="SEO Settings">
        <div className="grid grid-cols-2 gap-4">
          <InField label="SEO Title (EN)" value={data.seo_title_en} onChange={(v) => update('seo_title_en', v)} />
          <InField label="SEO Title (FA)" value={data.seo_title_fa} onChange={(v) => update('seo_title_fa', v)} />
          <InArea label="SEO Description (EN)" value={data.seo_description_en} onChange={(v) => update('seo_description_en', v)} />
          <InArea label="SEO Description (FA)" value={data.seo_description_fa} onChange={(v) => update('seo_description_fa', v)} />
        </div>
      </Section>

      <div className="flex items-center gap-4">
        <button onClick={save} disabled={saving} className="btn-gold-solid text-xs">
          {saving ? 'Saving...' : 'Save Settings'}
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
