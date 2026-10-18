import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/LanguageProvider';
import { MusicManager } from '@/components/MusicManager';
import { store } from '@/lib/store';

export const metadata: Metadata = {
  title: 'ZAREN — Luxury Perfume | Be Remembered',
  description:
    'ZAREN luxury perfume — discover fragrances designed to leave a lasting impression. Order via WhatsApp and Instagram.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'ZAREN — Luxury Perfume',
    description: 'Discover fragrances designed to leave a lasting impression.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await store.getSettings();

  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Vazirmatn:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('zaren_lang')||'fa';document.documentElement.lang=l;document.documentElement.dir=l==='fa'?'rtl':'ltr';}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
          <MusicManager settings={settings} />
        </LanguageProvider>
      </body>
    </html>
  );
}
