import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'
import { useSiteData } from './SiteDataContext.jsx'

const MusicContext = createContext()

export function MusicProvider({ children }) {
  const { settings } = useSiteData()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolumeState] = useState(0.3)
  const [showPlayer, setShowPlayer] = useState(false)
  const [entryDismissed, setEntryDismissed] = useState(() => sessionStorage.getItem('zaren-music-entry') === 'done')

  useEffect(() => {
    if (!settings?.music_file_url) return
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = volume
    }
    audioRef.current.src = settings.music_file_url
  }, [settings?.music_file_url]) // eslint-disable-line

  const play = useCallback(() => {
    if (!audioRef.current || !settings?.music_file_url) return
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [settings?.music_file_url])

  const pause = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) { pause() } else { play() }
  }, [isPlaying, play, pause])

  const setVolume = useCallback((v) => {
    setVolumeState(v)
    if (audioRef.current) audioRef.current.volume = v
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev
      if (audioRef.current) audioRef.current.muted = next
      return next
    })
  }, [])

  const enterWithMusic = useCallback(() => {
    sessionStorage.setItem('zaren-music-entry', 'done')
    setEntryDismissed(true)
    setShowPlayer(true)
    localStorage.setItem('zaren-music-pref', 'on')
    play()
  }, [play])

  const enterSilently = useCallback(() => {
    sessionStorage.setItem('zaren-music-entry', 'done')
    setEntryDismissed(true)
    setShowPlayer(true)
    localStorage.setItem('zaren-music-pref', 'off')
  }, [])

  return (
    <MusicContext.Provider value={{
      isPlaying, isMuted, volume, showPlayer, entryDismissed,
      play, pause, toggle, setVolume, toggleMute,
      enterWithMusic, enterSilently,
      musicEnabled: !!settings?.music_enabled,
      hasMusicUrl: !!settings?.music_file_url
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}
