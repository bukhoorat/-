import { promises as fs } from 'fs';
import path from 'path';
import { Product, SiteSettings, SiteContent } from './types';
import { seedProducts, seedSettings, seedContent } from './seed';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(filename: string, seed: T): Promise<T> {
  await ensureDir();
  const filepath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filepath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    await fs.writeFile(filepath, JSON.stringify(seed, null, 2), 'utf-8');
    return seed;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDir();
  const filepath = path.join(DATA_DIR, filename);
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

export const store = {
  getProducts: () => readJson<Product[]>('products.json', seedProducts),
  saveProducts: (products: Product[]) => writeJson('products.json', products),

  getPublishedProducts: async () => {
    const products = await store.getProducts();
    return products
      .filter((p) => p.is_published)
      .sort((a, b) => a.display_order - b.display_order);
  },

  getProductBySlug: async (slug: string) => {
    const products = await store.getProducts();
    return products.find((p) => p.slug === slug) || null;
  },

  getProductById: async (id: string) => {
    const products = await store.getProducts();
    return products.find((p) => p.id === id) || null;
  },

  getRelatedProducts: async (slug: string, limit = 3) => {
    const products = await store.getPublishedProducts();
    return products.filter((p) => p.slug !== slug).slice(0, limit);
  },

  getSettings: () => readJson<SiteSettings>('settings.json', seedSettings),
  saveSettings: (settings: SiteSettings) => writeJson('settings.json', settings),

  getContent: () => readJson<SiteContent>('content.json', seedContent),
  saveContent: (content: SiteContent) => writeJson('content.json', content),
};
