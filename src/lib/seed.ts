import { Product, SiteSettings, SiteContent } from './types';

const now = new Date().toISOString();

export const seedProducts: Product[] = [
  {
    id: 'ocean-noir',
    slug: 'ocean-noir',
    name_en: 'OCEAN NOIR',
    name_fa: 'اوشن نوآر',
    description_en:
      'Fresh in spirit and deep in character, OCEAN NOIR evokes the quiet mystery of dark waters and the confidence of understated elegance.',
    description_fa:
      'اوشن نوآر؛ رایحه‌ای با حال‌وهوای عمیق و شخصیتی باوقار، الهام‌گرفته از رمز و راز آب‌های تیره و ظرافت بی‌ادعا.',
    main_image: '',
    gallery_images: [],
    price: null,
    currency: 'IRR',
    volume: '50ml',
    availability: 'in_stock',
    is_featured: true,
    is_published: true,
    display_order: 1,
    color_theme: {
      glass: '#1a2a3a',
      liquid: '#0a1520',
      cap: '#0a0a0a',
      accent: '#3a6a9a',
      glow: 'rgba(58,106,154,0.4)',
    },
    created_at: now,
    updated_at: now,
  },
  {
    id: 'aura-noir',
    slug: 'aura-noir',
    name_en: 'AURA NOIR',
    name_fa: 'آئورا نوآر',
    description_en:
      'Quiet, intimate and distinctive. AURA NOIR celebrates the beauty of subtle presence and the individuality of a personal signature.',
    description_fa:
      'آئورا نوآر؛ حضوری آرام، نزدیک و متمایز که زیبایی ظرافت و امضای شخصی را به تصویر می‌کشد.',
    main_image: '',
    gallery_images: [],
    price: null,
    currency: 'IRR',
    volume: '50ml',
    availability: 'in_stock',
    is_featured: true,
    is_published: true,
    display_order: 2,
    color_theme: {
      glass: '#2a2826',
      liquid: '#1a1816',
      cap: '#0a0a0a',
      accent: '#6a6a6a',
      glow: 'rgba(106,106,106,0.3)',
    },
    created_at: now,
    updated_at: now,
  },
  {
    id: 'rouge-san',
    slug: 'rouge-san',
    name_en: 'ROUGE SÂN',
    name_fa: 'روژ سان',
    description_en:
      'Warm in mood and luminous in character, ROUGE SÂN expresses confidence through a bold and refined fragrance identity.',
    description_fa:
      'روژ سان؛ برداشتی گرم و درخشان از اعتمادبه‌نفس، با هویتی متمایز و ظرافتی جسورانه.',
    main_image: '',
    gallery_images: [],
    price: null,
    currency: 'IRR',
    volume: '50ml',
    availability: 'in_stock',
    is_featured: true,
    is_published: true,
    display_order: 3,
    color_theme: {
      glass: '#3a1a18',
      liquid: '#2a0a08',
      cap: '#1a0808',
      accent: '#8a4a2a',
      glow: 'rgba(138,74,42,0.4)',
    },
    created_at: now,
    updated_at: now,
  },
  {
    id: 'rose-veil',
    slug: 'rose-veil',
    name_en: 'ROSE VEIL',
    name_fa: 'رز وِیل',
    description_en:
      'Soft, graceful and luminous, ROSE VEIL brings a delicate, romantic mood to the modern fragrance wardrobe.',
    description_fa:
      'رز وِیل؛ لطیف، دلنشین و درخشان، با حال‌وهوایی رمانتیک برای سلیقهٔ معاصر.',
    main_image: '',
    gallery_images: [],
    price: null,
    currency: 'IRR',
    volume: '50ml',
    availability: 'in_stock',
    is_featured: true,
    is_published: true,
    display_order: 4,
    color_theme: {
      glass: '#4a3a38',
      liquid: '#5a4a48',
      cap: '#2a1a18',
      accent: '#c6a46a',
      glow: 'rgba(198,164,106,0.4)',
    },
    created_at: now,
    updated_at: now,
  },
];

export const seedSettings: SiteSettings = {
  default_language: 'fa',
  whatsapp_number: '989305459758',
  instagram_username: 'zaren__perfume',
  tagline: 'BE REMEMBERED.',
  show_prices: false,
  currency_label: 'تومان',
  music_enabled: true,
  music_file_url: '',
  seo_title_en: 'ZAREN — Luxury Perfume | Be Remembered',
  seo_title_fa: 'زارِن — عطر لوکس | در خاطر بمانید',
  seo_description_en:
    'ZAREN luxury perfume — discover fragrances designed to leave a lasting impression. Order via WhatsApp and Instagram.',
  seo_description_fa:
    'عطر لوکس زارِن — رایحه‌هایی برای حضوری که در خاطر می‌ماند. سفارش از طریق واتساپ و اینستاگرام.',
  copyright_notice: '© 2024 ZAREN. All rights reserved.',
};

export const seedContent: SiteContent = {
  hero: {
    eyebrow_en: 'THE ART OF FRAGRANCE',
    eyebrow_fa: 'هنر عطر',
    headline_en: 'THE ESSENCE OF LUXURY',
    headline_fa: 'جوهرهٔ لوکس بودن',
    body_en:
      'More than a scent. A personal signature. Discover fragrances designed to leave a lasting impression.',
    body_fa:
      'فراتر از یک رایحه؛ امضایی شخصی برای حضوری که در خاطر می‌ماند.',
    cta1_en: 'DISCOVER YOUR SIGNATURE SCENT',
    cta1_fa: 'رایحهٔ امضای خود را کشف کنید',
    cta2_en: 'EXPLORE ZAREN',
    cta2_fa: 'دنیای زارِن',
    image_url: '',
  },
  brandValues: {
    heading_en: 'WHY ZAREN?',
    heading_fa: 'چرا زارِن؟',
    values: [
      {
        icon: 'signature',
        title_en: 'PERSONAL SIGNATURE',
        title_fa: 'امضای شخصی',
        text_en: 'A fragrance can become a memorable part of your identity.',
        text_fa: 'رایحه‌ای که می‌تواند بخشی ماندگار از هویت شما باشد.',
      },
      {
        icon: 'character',
        title_en: 'DISTINCTIVE CHARACTER',
        title_fa: 'شخصیتی متمایز',
        text_en: 'Explore scents with their own character and atmosphere.',
        text_fa: 'رایحه‌هایی با شخصیت و حال‌وهوای خاص خود را کشف کنید.',
      },
      {
        icon: 'presentation',
        title_en: 'THOUGHTFUL PRESENTATION',
        title_fa: 'ارائه‌ای سنجیده',
        text_en: 'Every detail is considered, from presentation to experience.',
        text_fa: 'از ظاهر تا تجربه، هر جزئیات با دقت در نظر گرفته می‌شود.',
      },
      {
        icon: 'moment',
        title_en: 'FOR EVERY MOMENT',
        title_fa: 'برای لحظه‌های گوناگون',
        text_en: 'Find a scent that feels right for your day, evening, or special occasion.',
        text_fa: 'برای روز، شب یا مناسبت‌های خاص، رایحهٔ متناسب با حال‌وهوای خود را پیدا کنید.',
      },
      {
        icon: 'impression',
        title_en: 'A LASTING IMPRESSION',
        title_fa: 'اثری ماندگار',
        text_en: 'A memorable fragrance is more than a first impression.',
        text_fa: 'یک رایحهٔ به‌یادماندنی، فراتر از اولین برخورد است.',
      },
    ],
  },
  lifestyle: {
    heading_en: 'PERFECT FOR EVERY MOMENT',
    heading_fa: 'برای لحظه‌های خاص و روزمره',
    body_en:
      'From quiet everyday rituals to memorable occasions, discover a fragrance that complements the moment.',
    body_fa:
      'از لحظه‌های آرام روزمره تا مناسبت‌های به‌یادماندنی، رایحه‌ای متناسب با حال‌وهوای هر لحظه کشف کنید.',
    image_url: '',
    icons: [
      { icon: 'moon', label_en: 'DAY TO NIGHT', label_fa: 'روز تا شب' },
      { icon: 'champagne', label_en: 'SPECIAL OCCASIONS', label_fa: 'مناسبت‌های خاص' },
      { icon: 'lotus', label_en: 'EVERYDAY WEAR', label_fa: 'استفاده روزمره' },
      { icon: 'gift', label_en: 'THOUGHTFUL GIFT', label_fa: 'هدیه‌ای سنجیده' },
    ],
  },
  brandStory: {
    heading_en: 'THE ESSENCE OF ZAREN',
    heading_fa: 'جوهرهٔ زارِن',
    body_en:
      'Inspired by the cultural richness of Persia and the enduring symbolism of gold, ZAREN approaches fragrance as a personal signature. Refined, expressive, and created to become part of your story.',
    body_fa:
      'زارِن با الهام از غنای فرهنگی ایران و نماد ماندگار زر، به عطر به‌عنوان امضایی شخصی نگاه می‌کند؛ تجربه‌ای ظریف و متمایز که می‌تواند بخشی از داستان شما شود.',
    image_url: '',
  },
  contact: {
    heading_en: "LET'S CONNECT",
    heading_fa: 'با زارِن در ارتباط باشید',
    body_en: 'For product enquiries and orders, contact ZAREN directly.',
    body_fa: 'برای دریافت اطلاعات بیشتر دربارهٔ عطرها و ثبت سفارش، مستقیماً با زارِن در ارتباط باشید.',
  },
};
