import { useRef, useEffect, useState } from 'react'

const themes = {
  ocean: { dark: '#0a1929', mid: '#1a3a5c', light: '#2c5282', accent: '#4a7ba8' },
  aura: { dark: '#0d0d0d', mid: '#1a1a1a', light: '#2d2d2d', accent: '#3d3d3d' },
  rouge: { dark: '#3a0f1a', mid: '#5a1e2e', light: '#8a3a4a', accent: '#c8862a' },
  rose: { dark: '#c4a8a4', mid: '#d4b8b0', light: '#e8d5d0', accent: '#f0e0d8' }
}

export default function ProductBottle3D({ theme = 'ocean', image, alt = '', className = '', interactive = false }) {
  const wrapRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const id = useRef(`btl-${Math.random().toString(36).slice(2, 9)}`).current
  const colors = themes[theme] || themes.ocean

  useEffect(() => {
    if (!interactive) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const el = wrapRef.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      setTilt({ x: dy * -8, y: dx * 12 })
    }
    const handleLeave = () => setTilt({ x: 0, y: 0 })

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [interactive])

  // If a real image is provided, use it instead of the SVG
  if (image) {
    return (
      <div ref={wrapRef} className={`bottle-3d-wrap ${className}`}>
        <div className="bottle-3d" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
          <img src={image} alt={alt} loading="lazy" />
        </div>
      </div>
    )
  }

  return (
    <div ref={wrapRef} className={`bottle-3d-wrap ${className}`}>
      <div className="bottle-3d" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.light} stopOpacity="0.9" />
              <stop offset="50%" stopColor={colors.mid} stopOpacity="0.95" />
              <stop offset="100%" stopColor={colors.dark} stopOpacity="1" />
            </linearGradient>
            <linearGradient id={`${id}-cap`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E4C995" />
              <stop offset="50%" stopColor="#C6A46A" />
              <stop offset="100%" stopColor="#8B7348" />
            </linearGradient>
            <linearGradient id={`${id}-shine`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`${id}-glow`} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="0.3" />
              <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glow */}
          <ellipse cx="100" cy="160" rx="90" ry="120" fill={`url(#${id}-glow)`} />

          {/* Cap */}
          <rect x="82" y="10" width="36" height="30" rx="2" fill={`url(#${id}-cap)`} />
          <rect x="85" y="12" width="30" height="3" fill="#E4C995" opacity="0.6" />

          {/* Neck */}
          <rect x="88" y="40" width="24" height="20" fill={colors.dark} />
          <rect x="86" y="38" width="28" height="4" rx="1" fill={`url(#${id}-cap)`} />

          {/* Body */}
          <path d="M 60 60 Q 60 55 65 55 L 135 55 Q 140 55 140 60 L 140 280 Q 140 295 125 295 L 75 295 Q 60 295 60 280 Z"
            fill={`url(#${id}-body)`} stroke={colors.dark} strokeWidth="0.5" />

          {/* Shine overlay */}
          <path d="M 60 60 Q 60 55 65 55 L 135 55 Q 140 55 140 60 L 140 280 Q 140 295 125 295 L 75 295 Q 60 295 60 280 Z"
            fill={`url(#${id}-shine)`} />

          {/* Label area */}
          <rect x="75" y="140" width="50" height="60" fill="none" stroke="#C6A46A" strokeWidth="0.5" opacity="0.4" />
          <text x="100" y="175" textAnchor="middle" fill="#C6A46A" fontSize="9" letterSpacing="2" fontFamily="serif" opacity="0.5">ZAREN</text>

          {/* Bottom highlight */}
          <ellipse cx="100" cy="290" rx="35" ry="4" fill={colors.dark} opacity="0.5" />
        </svg>
      </div>
    </div>
  )
}
