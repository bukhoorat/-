import { useMusic } from '../context/MusicContext.jsx'

export default function MusicPlayer() {
  const { showPlayer, isPlaying, isMuted, volume, toggle, toggleMute, setVolume, hasMusicUrl } = useMusic()

  if (!showPlayer || !hasMusicUrl) return null

  return (
    <div className="music-player">
      <button className="music-player-btn" onClick={toggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <button className="music-player-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
        {isMuted ? '🔇' : '🔊'}
      </button>
      <input
        type="range"
        className="music-player-volume"
        min="0" max="1" step="0.05"
        value={isMuted ? 0 : volume}
        onChange={e => setVolume(parseFloat(e.target.value))}
        aria-label="Volume"
      />
    </div>
  )
}
