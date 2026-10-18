export type Language = 'fa' | 'en';
export type Availability = 'in_stock' | 'out_of_stock' | 'preorder';

export interface ProductColorTheme {
  glass: string;
  liquid: string;
  cap: string;
  accent: string;
  glow: string;
}

export interface Product {
  id: string;
  slug: string;
  name_en: string;
  name_fa: string;
  description_en: string;
  description_fa: string;
  main_image: string;
  gallery_images: string[];
  price: number | null;
  currency: string;
  volume: string;
  availability: Availability;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  color_theme: ProductColorTheme;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  default_language: Language;
  whatsapp_number: string;
  instagram_username: string;
  tagline: string;
  show_prices: boolean;
  currency_label: string;
  music_enabled: boolean;
  music_file_url: string;
  seo_title_en: string;
  seo_title_fa: string;
  seo_description_en: string;
  seo_description_fa: string;
  copyright_notice: string;
}

export interface BrandValue {
  icon: string;
  title_en: string;
  title_fa: string;
  text_en: string;
  text_fa: string;
}

export interface LifestyleIcon {
  icon: string;
  label_en: string;
  label_fa: string;
}

export interface SiteContent {
  hero: {
    eyebrow_en: string;
    eyebrow_fa: string;
    headline_en: string;
    headline_fa: string;
    body_en: string;
    body_fa: string;
    cta1_en: string;
    cta1_fa: string;
    cta2_en: string;
    cta2_fa: string;
    image_url: string;
  };
  brandValues: {
    heading_en: string;
    heading_fa: string;
    values: BrandValue[];
  };
  lifestyle: {
    heading_en: string;
    heading_fa: string;
    body_en: string;
    body_fa: string;
    image_url: string;
    icons: LifestyleIcon[];
  };
  brandStory: {
    heading_en: string;
    heading_fa: string;
    body_en: string;
    body_fa: string;
    image_url: string;
  };
  contact: {
    heading_en: string;
    heading_fa: string;
    body_en: string;
    body_fa: string;
  };
}
