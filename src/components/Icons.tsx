interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className = '', size = 24 }: IconProps) {
  const props = {
    width: size,
    height: size,
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    // Brand value icons
    case 'signature':
      return (
        <svg {...props}>
          <path d="M3 17 L8 17 L10 13 L12 17 L14 10 L16 17 L21 17" />
          <path d="M3 20 L21 20" opacity="0.4" />
        </svg>
      );
    case 'character':
      return (
        <svg {...props}>
          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
        </svg>
      );
    case 'presentation':
      return (
        <svg {...props}>
          <rect x="4" y="8" width="16" height="14" rx="1" />
          <path d="M2 8 L22 8" />
          <path d="M12 8 L12 3" />
          <path d="M9 3 L15 3" />
          <path d="M12 14 L12 18" opacity="0.5" />
        </svg>
      );
    case 'moment':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7 L12 12 L16 14" />
        </svg>
      );
    case 'impression':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3 A9 9 0 0 1 21 12" opacity="0.7" />
          <path d="M12 1 A11 11 0 0 1 23 12" opacity="0.4" />
        </svg>
      );

    // Lifestyle icons
    case 'moon':
      return (
        <svg {...props}>
          <path d="M21 12.8 A9 9 0 1 1 11.2 3 A7 7 0 0 0 21 12.8 Z" />
        </svg>
      );
    case 'champagne':
      return (
        <svg {...props}>
          <path d="M8 3 L8 8 L6 14 L10 14 L8 8" />
          <path d="M8 3 L8 8" opacity="0.5" />
          <path d="M8 14 L8 21" />
          <path d="M5 21 L11 21" />
          <path d="M16 3 L16 8 L14 14 L18 14 L16 8" />
          <path d="M16 14 L16 21" />
          <path d="M13 21 L19 21" />
        </svg>
      );
    case 'lotus':
      return (
        <svg {...props}>
          <path d="M12 3 C10 7 10 11 12 14 C14 11 14 7 12 3 Z" />
          <path d="M5 8 C6 12 9 14 12 14 C10 11 7 9 5 8 Z" />
          <path d="M19 8 C18 12 15 14 12 14 C14 11 17 9 19 8 Z" />
          <path d="M3 13 C5 16 8 17 12 17 C16 17 19 16 21 13" opacity="0.6" />
        </svg>
      );
    case 'gift':
      return (
        <svg {...props}>
          <rect x="3" y="8" width="18" height="4" rx="0.5" />
          <rect x="4" y="12" width="16" height="9" rx="0.5" />
          <path d="M12 8 L12 21" />
          <path d="M12 8 C12 8 10 3 7 4 C5 5 8 8 12 8 Z" />
          <path d="M12 8 C12 8 14 3 17 4 C19 5 16 8 12 8 Z" />
        </svg>
      );

    // Social icons
    case 'whatsapp':
      return (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );

    // Music icons
    case 'play':
      return (
        <svg {...props}>
          <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'pause':
      return (
        <svg {...props}>
          <rect x="7" y="5" width="3" height="14" rx="1" fill="currentColor" stroke="none" />
          <rect x="14" y="5" width="3" height="14" rx="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'volume':
      return (
        <svg {...props}>
          <path d="M11 5 L6 9 L2 9 L2 15 L6 15 L11 19 Z" fill="currentColor" />
          <path d="M15 9 C16.5 10 16.5 14 15 15" />
          <path d="M18 7 C20.5 9 20.5 15 18 17" />
        </svg>
      );
    case 'mute':
      return (
        <svg {...props}>
          <path d="M11 5 L6 9 L2 9 L2 15 L6 15 L11 19 Z" fill="currentColor" />
          <path d="M16 9 L22 15" />
          <path d="M22 9 L16 15" />
        </svg>
      );

    // UI icons
    case 'menu':
      return (
        <svg {...props}>
          <path d="M3 6 L21 6" />
          <path d="M3 12 L21 12" />
          <path d="M3 18 L21 18" />
        </svg>
      );
    case 'close':
      return (
        <svg {...props}>
          <path d="M5 5 L19 19" />
          <path d="M19 5 L5 19" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...props}>
          <path d="M5 12 L19 12" />
          <path d="M13 6 L19 12 L13 18" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...props}>
          <path d="M19 12 L5 12" />
          <path d="M11 6 L5 12 L11 18" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...props}>
          <path d="M12 21 C12 21 4 15 4 9 C4 6 6 4 9 4 C10.5 4 12 5 12 6 C12 5 13.5 4 15 4 C18 4 20 6 20 9 C20 15 12 21 12 21 Z" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props}>
          <path d="M5 12 L10 17 L19 7" />
        </svg>
      );
    case 'upload':
      return (
        <svg {...props}>
          <path d="M12 4 L12 16" />
          <path d="M7 9 L12 4 L17 9" />
          <path d="M4 16 L4 20 L20 20 L20 16" />
        </svg>
      );
    case 'trash':
      return (
        <svg {...props}>
          <path d="M4 7 L20 7" />
          <path d="M9 7 L9 4 L15 4 L15 7" />
          <path d="M6 7 L7 20 L17 20 L18 7" />
        </svg>
      );
    case 'edit':
      return (
        <svg {...props}>
          <path d="M4 20 L4 16 L16 4 L20 8 L8 20 Z" />
          <path d="M14 6 L18 10" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...props}>
          <path d="M12 5 L12 19" />
          <path d="M5 12 L19 12" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12 L21 12" />
          <path d="M12 3 C8 7 8 17 12 21" />
          <path d="M12 3 C16 7 16 17 12 21" />
        </svg>
      );

    default:
      return null;
  }
}
