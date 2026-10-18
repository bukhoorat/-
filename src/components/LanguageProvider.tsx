'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language } from '@/lib/types';
import { t as translate } from '@/lib/translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'fa',
  setLang: () => {},
  t: (path: string) => path,
  dir: 'rtl',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('fa');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('zaren_lang');
    if (stored === 'fa' || stored === 'en') {
      setLangState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('zaren_lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    }
  }, [lang, mounted]);

  const setLang = useCallback((l: Language) => setLangState(l), []);
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  const tFn = useCallback((path: string) => translate(lang, path), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: tFn, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
