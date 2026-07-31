// contexts/PlayerContext.jsx
import { createContext, useContext, useRef, useState, useEffect } from "react"
import { BUILTIN_SONGS } from "../features/music_player/songs"

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())
  const shouldPlayRef = useRef(false)  // ← resuelve la condición de carrera

  const [playerState, setPlayerState] = useState({
    currentIndex: 0,
    isPlaying: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
  })

  const currentSong = BUILTIN_SONGS[playerState.currentIndex]

  // Registra los eventos del audio una sola vez
  useEffect(() => {
    const audio = audioRef.current

    const onTimeUpdate  = () => setPlayerState(p => ({ ...p, currentTime: audio.currentTime }))
    const onLoadedMeta  = () => setPlayerState(p => ({ ...p, duration: audio.duration }))
    const onEnded       = () => next()

    // ✅ Aquí resolvemos la condición de carrera
    // canplay se dispara cuando el audio está listo para reproducir
    const onCanPlay = () => {
      if (shouldPlayRef.current) {
        audio.play()
        setPlayerState(p => ({ ...p, isPlaying: true }))
      }
    }

    audio.addEventListener("timeupdate",    onTimeUpdate)
    audio.addEventListener("loadedmetadata", onLoadedMeta)
    audio.addEventListener("ended",         onEnded)
    audio.addEventListener("canplay",       onCanPlay)

    return () => {
      audio.removeEventListener("timeupdate",    onTimeUpdate)
      audio.removeEventListener("loadedmetadata", onLoadedMeta)
      audio.removeEventListener("ended",         onEnded)
      audio.removeEventListener("canplay",       onCanPlay)
    }
  }, [])

  // Cuando cambia la canción, carga y respeta shouldPlayRef
  useEffect(() => {
    const audio = audioRef.current
    audio.src = currentSong?.url ?? ""
    audio.load()
    // onCanPlay se encargará de reproducir si shouldPlayRef es true
  }, [playerState.currentIndex])

  // Sincroniza volumen
  useEffect(() => {
    audioRef.current.volume = playerState.volume
  }, [playerState.volume])

  const play = () => {
    shouldPlayRef.current = true
    audioRef.current.play()
    setPlayerState(p => ({ ...p, isPlaying: true }))
  }

  const pause = () => {
    shouldPlayRef.current = false
    audioRef.current.pause()
    setPlayerState(p => ({ ...p, isPlaying: false }))
  }

  const togglePlay = () => playerState.isPlaying ? pause() : play()

  const next = () => {
    // shouldPlayRef mantiene si debe reproducir al cargar la siguiente
    shouldPlayRef.current = playerState.isPlaying
    setPlayerState(p => ({
      ...p,
      currentIndex: (p.currentIndex + 1) % BUILTIN_SONGS.length
    }))
  }

  const prev = () => {
    shouldPlayRef.current = playerState.isPlaying
    setPlayerState(p => ({
      ...p,
      currentIndex: (p.currentIndex - 1 + BUILTIN_SONGS.length) % BUILTIN_SONGS.length
    }))
  }

  const seek = (time) => {
    audioRef.current.currentTime = time
    setPlayerState(p => ({ ...p, currentTime: time }))
  }

  const setVolume = (volume) => {
    setPlayerState(p => ({ ...p, volume }))
  }

  const selectSong = (index) => {
    shouldPlayRef.current = true
    setPlayerState(p => ({ ...p, currentIndex: index }))
  }

  return (
    <PlayerContext.Provider value={{
      playerState,
      currentSong,
      songs: BUILTIN_SONGS,
      togglePlay,
      next,
      prev,
      seek,
      setVolume,
      selectSong,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  return useContext(PlayerContext)
}