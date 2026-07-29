import { useEffect, useState, useRef } from "react";
import { BUILTIN_SONGS } from "./songs";
import { useConfig } from "../../contexts/ConfigContext";

export function MusicPlayer() {
  const { config } = useConfig();
  const { primary, surface, surfaceVariant, onSurface, outline } =
    config.colors;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const currentSong = BUILTIN_SONGS[currentIndex];

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) audioRef.current.play();
  }, [currentIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const prevTrack = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + BUILTIN_SONGS.length) % BUILTIN_SONGS.length);
      audioRef.current.play()
  };
  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % BUILTIN_SONGS.length);
    audioRef.curren.play()
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  if (BUILTIN_SONGS.length === 0) {
    return (
      <div className="p-4 font-mono text-xs" style={{ color: outline }}>
        No songs found in /assets/music/
      </div>
    );
  }
  
  return (
        <div
      className="flex w-full flex-col gap-3 p-4 rounded-lg font-mono text-xs"
      style={{ backgroundColor: surface, color: onSurface }}
    >
      {/* Audio element oculto */}
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={nextTrack}
      />

      {/* Header estilo rmpc */}
      <div className="flex justify-between items-center" style={{ color: outline }}>
        <span>rmpc</span>
        <span>{currentIndex + 1} / {BUILTIN_SONGS.length}</span>
      </div>

      {/* Info de la canción */}
      <div
        className="p-2 rounded border"
        style={{ backgroundColor: surfaceVariant, borderColor: outline }}
      >
        <div style={{ color: primary }} className="truncate">
          {currentSong?.name ?? "Unknown"}
        </div>
        <div style={{ color: outline }} className="text-xs mt-1">
          Local Library
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="flex items-center gap-2">
        <span style={{ color: outline }}>{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1 accent-[(--primary)] cursor-pointer"
          style={{ accentColor: primary }}
        />
        <span style={{ color: outline }}>{formatTime(duration)}</span>
      </div>

      {/* Controles */}
      <div className="flex justify-center items-center gap-6">
        <button
          onClick={prevTrack}
          className="hover:opacity-70 transition-opacity"
          style={{ color: onSurface }}
        >
          ⏮
        </button>
        <button
          onClick={togglePlay}
          className="text-lg hover:opacity-70 transition-opacity"
          style={{ color: primary }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={nextTrack}
          className="hover:opacity-70 transition-opacity"
          style={{ color: onSurface }}
        >
          ⏭
        </button>
      </div>

      {/* Volumen */}
      <div className="flex items-center gap-2">
        <span style={{ color: outline }}>vol</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 cursor-pointer"
          style={{ accentColor: primary }}
        />
        <span style={{ color: outline }}>{Math.round(volume * 100)}%</span>
      </div>

      {/* Lista de canciones estilo rmpc */}
      <div
        className="flex flex-col max-h-32 overflow-y-auto border rounded"
        style={{ borderColor: outline }}
      >
        {BUILTIN_SONGS.map((song, i) => (
          <button
            key={song.id}
            onClick={() => {
              setCurrentIndex(i)
              setIsPlaying(true)
            }}
            className="text-left px-2 py-1 text-xs truncate hover:opacity-70"
            style={{
              backgroundColor: i === currentIndex ? surfaceVariant : "transparent",
              color: i === currentIndex ? primary : onSurface,
            }}
          >
            {i === currentIndex && isPlaying ? "▶ " : "  "}
            {song.name}
          </button>
        ))}
      </div>
    </div>
  )
}
