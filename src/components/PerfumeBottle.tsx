import { ProductColorTheme } from '@/lib/types';

interface PerfumeBottleProps {
  theme: ProductColorTheme;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export function PerfumeBottle({ theme, className = '', showLabel = true, label = 'Z' }: PerfumeBottleProps) {
  const gradId = `grad-${theme.glass.replace(/[^a-z0-9]/gi, '')}`;
  const liquidGradId = `liquid-${theme.liquid.replace(/[^a-z0-9]/gi, '')}`;
  const glowGradId = `glow-${theme.accent.replace(/[^a-z0-9]/gi, '')}`;

  return (
    <svg
      viewBox="0 0 200 420"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 10px 40px ${theme.glow})` }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.glass} stopOpacity="0.9" />
          <stop offset="50%" stopColor={theme.glass} stopOpacity="0.6" />
          <stop offset="100%" stopColor={theme.glass} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={liquidGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.liquid} stopOpacity="0.95" />
          <stop offset="100%" stopColor={theme.liquid} stopOpacity="1" />
        </linearGradient>
        <radialGradient id={glowGradId} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow behind bottle */}
      <ellipse cx="100" cy="250" rx="80" ry="120" fill={`url(#${glowGradId})`} />

      {/* Cap */}
      <rect x="82" y="20" width="36" height="48" rx="3" fill={theme.cap} />
      <rect x="82" y="20" width="36" height="6" rx="3" fill={theme.accent} opacity="0.3" />
      <rect x="84" y="22" width="4" height="44" rx="2" fill="rgba(255,255,255,0.1)" />

      {/* Neck */}
      <rect x="86" y="68" width="28" height="22" fill={`url(#${gradId})`} />

      {/* Bottle body */}
      <path
        d="M86 90 Q60 100 58 135 L58 360 Q58 388 100 388 Q142 388 142 360 L142 135 Q140 100 114 90 Z"
        fill={`url(#${gradId})`}
        stroke={theme.accent}
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />

      {/* Liquid inside */}
      <path
        d="M62 210 L62 360 Q62 384 100 384 Q138 384 138 360 L138 210 Z"
        fill={`url(#${liquidGradId})`}
      />

      {/* Liquid surface highlight */}
      <ellipse cx="100" cy="210" rx="38" ry="4" fill={theme.accent} opacity="0.2" />

      {/* Glass highlight - left */}
      <path
        d="M68 130 L68 350"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Glass highlight - right */}
      <path
        d="M132 140 L132 330"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Label */}
      {showLabel && (
        <>
          <rect
            x="72" y="240"
            width="56" height="90"
            fill="rgba(255,255,255,0.04)"
            stroke={theme.accent}
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
          <text
            x="100" y="285"
            textAnchor="middle"
            fill={theme.accent}
            fontSize="28"
            fontFamily="serif"
            fontWeight="500"
            letterSpacing="1"
          >
            {label}
          </text>
          <line x1="82" y1="295" x2="118" y2="295" stroke={theme.accent} strokeWidth="0.5" opacity="0.5" />
          <text
            x="100" y="312"
            textAnchor="middle"
            fill={theme.accent}
            fontSize="6"
            fontFamily="serif"
            letterSpacing="2"
            opacity="0.7"
          >
            ZAREN
          </text>
        </>
      )}

      {/* Bottom reflection */}
      <ellipse cx="100" cy="395" rx="45" ry="5" fill="rgba(0,0,0,0.4)" />
    </svg>
  );
}
