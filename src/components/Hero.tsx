'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { PerfumeBottle } from './PerfumeBottle';
import { SiteContent, SiteSettings } from '@/lib/types';

interface HeroProps {
  content: SiteContent['hero'];
  settings: SiteSettings;
}

export function Hero({ content, settings }: HeroProps) {
  const { lang, t } = useLang();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    []
  );

  const isFa = lang === 'fa';
  const eyebrow = isFa ? content.eyebrow_fa : content.eyebrow_en;
  const headline = isFa ? content.headline_fa : content.headline_en;
  const body = isFa ? content.body_fa : content.body_en;
  const cta1 = isFa ? content.cta1_fa : content.cta1_en;
  const cta2 = isFa ? content.cta2_fa : content.cta2_en;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zaren-black"
    >
      {/* Ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(198,164,106,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(198,164,106,0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* Particles */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.left}%`,
                bottom: '-10px',
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* Content grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div
            className={`text-center md:text-start ${isFa ? 'md:order-2' : 'md:order-1'}`}
            style={{
              transform: reducedMotion ? 'none' : `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-zaren-gold-champagne mb-6 animate-fade-in">
              {eyebrow}
            </p>
            <h1
              className={`font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-fade-in-up ${
                isFa ? 'font-persian' : ''
              }`}
              style={{ animationDelay: '0.1s', opacity: 0 }}
            >
              <span className="block text-zaren-ivory">{headline.split(' ').slice(0, -1).join(' ')}</span>
              <span className="block gold-shimmer mt-2">
                {headline.split(' ').slice(-1).join(' ')}
              </span>
            </h1>
            <p
              className={`text-sm md:text-base text-zaren-muted max-w-md mx-auto md:mx-0 mb-10 leading-relaxed animate-fade-in-up ${
                isFa ? 'font-persian' : ''
              }`}
              style={{ animationDelay: '0.3s', opacity: 0 }}
            >
              {body}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              <Link href="/#collection" className="btn-gold-solid">
                {cta1}
              </Link>
              <Link href="/#story" className="btn-gold">
                {cta2}
              </Link>
            </div>
          </div>

          {/* Bottle */}
          <div
            className={`flex justify-center items-center ${isFa ? 'md:order-1' : 'md:order-2'}`}
            style={{
              transform: reducedMotion ? 'none' : `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div className="relative w-[200px] md:w-[260px] lg:w-[300px] animate-float">
              <PerfumeBottle
                theme={{
                  glass: '#1a1816',
                  liquid: '#2a2418',
                  cap: '#0a0806',
                  accent: '#C6A46A',
                  glow: 'rgba(198,164,106,0.35)',
                }}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s', opacity: 0 }}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-zaren-muted/60">
          {isFa ? 'اسکرول کنید' : 'Scroll'}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-zaren-gold-champagne/60 to-transparent" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zaren-black to-transparent pointer-events-none" />
    </section>
  );
}
