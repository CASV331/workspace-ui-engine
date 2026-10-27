// contexts/PlayerContext.jsx
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/immutability -- HTMLAudioElement es un recurso mutable de la Web API. */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BUILTIN_SONGS } from "../features/music_player/songs";

const PlayerContext = createContext(null);
const PlayerProgressContext = createContext(null);

export function PlayerProvider({ children }) {
  const [audio] = useState(() => new Audio());
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const shouldPlayRef = useRef(false);

  const [playerState, setPlayerState] = useState({
    currentIndex: 0,
    isPlaying: false,
    volume: 0.5,
  });
  const [progress, setProgress] = useState({ currentTime: 0, duration: 0 });
  const [hasPlayed, setHasPlayed] = useState(false);

  const currentSong = BUILTIN_SONGS[playerState.currentIndex];

  const ensureAnalyser = useCallback(() => {
    if (audioContextRef.current) {
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().catch(() => {});
      }
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;

      if (context.state === "suspended") {
        context.resume().catch(() => {});
      }
    } catch {
      // El visualizador es opcional; la reproducción sigue funcionando sin él.
    }
  }, [audio]);

  const safePlay = useCallback(() => {
    if (!audio.src) return;

    shouldPlayRef.current = true;
    const playPromise = audio.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {
        shouldPlayRef.current = false;
        setPlayerState((prev) => ({ ...prev, isPlaying: false }));
      });
    }
  }, [audio]);

  // Registra los eventos del audio una sola vez.
  useEffect(() => {
    const onTimeUpdate = () => {
      setProgress((prev) => {
        if (prev.currentTime === audio.currentTime) return prev;
        return { ...prev, currentTime: audio.currentTime };
      });
    };
    const onLoadedMeta = () => {
      setProgress({
        currentTime: audio.currentTime,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      });
    };
    const onEnded = () => {
      if (BUILTIN_SONGS.length === 0) return;
      shouldPlayRef.current = true;
      setPlayerState((prev) => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % BUILTIN_SONGS.length,
      }));
    };
    // canplay se dispara cuando el audio está listo para reproducir.
    const onCanPlay = () => {
      if (shouldPlayRef.current) safePlay();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [audio, safePlay]);

  // Cuando cambia la canción, carga y respeta shouldPlayRef.
  useEffect(() => {
    if (currentSong?.url) {
      audio.src = currentSong.url;
    } else {
      audio.removeAttribute("src");
    }
    audio.load();
    setProgress({ currentTime: 0, duration: 0 });
  }, [audio, currentSong, playerState.currentIndex]);

  // Sincroniza volumen.
  useEffect(() => {
    audio.volume = playerState.volume;
  }, [audio, playerState.volume]);

  useEffect(
    () => () => {
      audio.pause();
      audioContextRef.current?.close().catch(() => {});
    },
    [audio],
  );

  const play = useCallback(() => {
    if (!currentSong) return;
    ensureAnalyser();
    safePlay();
    setPlayerState((prev) => ({ ...prev, isPlaying: true }));
  }, [currentSong, ensureAnalyser, safePlay]);

  const pause = useCallback(() => {
    shouldPlayRef.current = false;
    audio.pause();
    setPlayerState((prev) => ({ ...prev, isPlaying: false }));
  }, [audio]);

  const togglePlay = useCallback(() => {
    setHasPlayed(true);
    if (playerState.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [pause, play, playerState.isPlaying]);

  const next = useCallback(() => {
    if (BUILTIN_SONGS.length === 0) return;
    shouldPlayRef.current = playerState.isPlaying;
    setPlayerState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % BUILTIN_SONGS.length,
    }));
  }, [playerState.isPlaying]);

  const prev = useCallback(() => {
    if (BUILTIN_SONGS.length === 0) return;
    shouldPlayRef.current = playerState.isPlaying;
    setPlayerState((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + BUILTIN_SONGS.length) % BUILTIN_SONGS.length,
    }));
  }, [playerState.isPlaying]);

  const seek = useCallback(
    (time) => {
      if (!Number.isFinite(time)) return;
      audio.currentTime = time;
      setProgress((prev) => ({ ...prev, currentTime: time }));
    },
    [audio],
  );

  const setVolume = useCallback((volume) => {
    setPlayerState((prev) => ({
      ...prev,
      volume: Math.min(1, Math.max(0, volume)),
    }));
  }, []);

  const selectSong = useCallback(
    (index) => {
      if (!BUILTIN_SONGS[index]) return;

      ensureAnalyser();
      setHasPlayed(true);
      shouldPlayRef.current = true;

      if (index === playerState.currentIndex) {
        audio.currentTime = 0;
        safePlay();
        setPlayerState((prev) => ({ ...prev, isPlaying: true }));
        return;
      }

      setPlayerState((prev) => ({
        ...prev,
        currentIndex: index,
        isPlaying: true,
      }));
    },
    [audio, ensureAnalyser, playerState.currentIndex, safePlay],
  );

  const value = useMemo(
    () => ({
      playerState,
      currentSong,
      analyserRef,
      songs: BUILTIN_SONGS,
      togglePlay,
      next,
      prev,
      seek,
      setVolume,
      selectSong,
      hasPlayed,
    }),
    [
      playerState,
      currentSong,
      togglePlay,
      next,
      prev,
      seek,
      setVolume,
      selectSong,
      hasPlayed,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>
      <PlayerProgressContext.Provider value={progress}>
        {children}
      </PlayerProgressContext.Provider>
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer debe usarse dentro de PlayerProvider");
  }
  return context;
}

export function usePlayerProgress() {
  const context = useContext(PlayerProgressContext);
  if (!context) {
    throw new Error("usePlayerProgress debe usarse dentro de PlayerProvider");
  }
  return context;
}
