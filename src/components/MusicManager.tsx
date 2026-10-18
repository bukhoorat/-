'use client';

import { useState, useEffect, useRef } from 'react';
import { useLang } from './LanguageProvider';
import { Icon } from './Icons';
import { SiteSettings } from '@/lib/types';

interface MusicManagerProps {
  settings: SiteSettings;
}

export function MusicManager({ settings }: MusicManagerProps) {
  const { t } = useLang();
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const visited = localStorage.getItem('zaren_visited');
    if (!visited && settings.music_enabled) {
      setShowOverlay(true);
    }
  }, [settings.music_enabled]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const enterWithMusic = () => {
    localStorage.setItem('zaren_visited', 'true');
    localStorage.setItem('zaren_music', 'true');
    setShowOverlay(false);
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const enterSilently = () => {
    localStorage.setItem('zaren_visited', 'true');
    localStorage.setItem('zaren_music', 'false');
    setShowOverlay(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!settings.music_enabled) return null;

  return (
    <>
      {/* Audio element managed via ref */}
      {settings.music_file_url && (
        <audio ref={audioRef} src={settings.music_file_url} loop preload="auto" />
      )}

      {/* Welcome overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-[100] bg-zaren-black flex items-center justify-center animate-fade-in">
          <div className="text-center px-6">
            {/* Wordmark */}
            <h1 className="text-5xl md:text-7xl font-serif tracking-[0.3em] text-zaren-gold-champagne mb-8 animate-fade-in-up">
              ZAREN
            </h1>

            {/* Gold line */}
            <div className="w-16 h-px bg-zaren-gold-champagne mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }} />

            {/* Welcome text */}
            <p className="text-sm tracking-[0.2em] uppercase text-zaren-muted mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
              {t('music.welcome')}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
              <button
                onClick={enterWithMusic}
                disabled={!settings.music_file_url}
                className="btn-gold-solid disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t('buttons.enterWithMusic')}
              </button>
              <button onClick={enterSilently} className="btn-gold">
                {t('buttons.enterSilently')}
              </button>
            </div>

            {!settings.music_file_url && (
              <p className="text-xs text-zaren-muted/50 mt-4">
                {t('buttons.enterSilently')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Floating music control */}
      {settings.music_file_url && !showOverlay && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 glass-effect rounded-full px-3 py-2">
          <button
            onClick={togglePlay}
            className="text-zaren-gold-champagne hover:text-zaren-gold-highlight transition-colors p-1"
            aria-label={isPlaying ? t('music.pause') : t('music.play')}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} size={18} />
          </button>
          <button
            onClick={toggleMute}
            className="text-zaren-gold-champagne hover:text-zaren-gold-highlight transition-colors p-1"
            aria-label={isMuted ? t('music.unmute') : t('music.mute')}
          >
            <Icon name={isMuted ? 'mute' : 'volume'} size={18} />
          </button>
        </div>
      )}
    </>
  );
}
