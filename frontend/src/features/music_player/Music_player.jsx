// components/apps/MusicPlayer.jsx
import { usePlayer } from "../../contexts/PlayerContext";
import { useConfig } from "../../contexts/ConfigContext";
import { useMemo } from "react";

export function MusicPlayer() {
  const { config } = useConfig();
  const {
    primary,
    surface,
    surfaceVariant,
    onSurface,
    outline
  } = config.colors;
  const {
    background,
    backgroundOpacity,
    borderColor,
    borderOpacity,
    borderWidth,
    textColor,
    fontSize,
  } = config.window;


  const {
    playerState,
    currentSong,
    songs,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    selectSong,
  } = usePlayer();
  const { isPlaying, currentTime, duration, volume, currentIndex } =
    playerState;

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${sec}`;
  };


  return (
    <div
      className="flex flex-col w-full h-full gap-3 p-4 font-mono text-xs"
      style={{ backgroundColor: background, color: onSurface }}
    >
      {/* Header */}
      <div className="flex justify-between" style={{ color: outline }}>
        <span>rmpc</span>
        <span>
          {currentIndex + 1} / {songs.length}
        </span>
      </div>

      {/* Info canción */}
      <div
        className="p-2 rounded border"
        style={{ backgroundColor: surfaceVariant, borderColor: outline }}
      >
        <div className="truncate" style={{ color: primary }}>
          {currentSong?.name ?? "Unknown"}
        </div>
        <div style={{ color: outline }}>Local Library</div>
      </div>

      {/* Progreso */}
      <div className="flex items-center gap-2">
        <span style={{ color: outline }}>{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={(e) => seek(parseFloat(e.target.value))}
          className="flex-1 cursor-pointer"
          style={{ accentColor: primary }}
        />
        <span style={{ color: outline }}>{formatTime(duration)}</span>
      </div>

      {/* Controles */}
      <div className="flex justify-center items-center gap-6">
        <button onClick={prev} style={{ color: onSurface }}>
          ⏮
        </button>
        <button
          onClick={togglePlay}
          className="text-lg"
          style={{ color: primary }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={next} style={{ color: onSurface }}>
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

      {/* Lista */}
      <div
        className="flex-1 overflow-y-auto border rounded"
        style={{ borderColor: outline }}
      >
        {songs.map((song, i) => (
          <button
            key={song.id}
            onClick={() => selectSong(i)}
            className="w-full text-left px-2 py-1 truncate hover:opacity-70"
            style={{
              backgroundColor:
                i === currentIndex ? surfaceVariant : "transparent",
              color: i === currentIndex ? primary : onSurface,
            }}
          >
            {i === currentIndex && isPlaying ? "▶ " : "  "}
            {song.name}
          </button>
        ))}
      </div>
    </div>
  );
}
