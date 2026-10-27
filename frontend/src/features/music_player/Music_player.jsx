import { usePlayer, usePlayerProgress } from "../../contexts/PlayerContext";
import { useConfig } from "../../contexts/ConfigContext";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remaining = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remaining}`;
}

export function MusicPlayer() {
  const { config } = useConfig();
  const { accent, bg2, fg0, fg2 } = config.colors;

  const {
    playerState,
    currentSong,
    songs,
    togglePlay,
    next,
    prev,
    seek,
    selectSong,
  } = usePlayer();
  const { currentTime, duration } = usePlayerProgress();
  const { isPlaying, currentIndex } = playerState;

  return (
    <div
      className="flex h-full w-full flex-col gap-3 p-4 font-mono text-xs"
      style={{ backgroundColor: "transparent", color: fg0 }}
    >
      <div className="flex justify-between" style={{ color: fg2 }}>
        <span>rmpc</span>
        <span>
          {currentIndex + 1} / {songs.length}
        </span>
      </div>

      <div
        className="rounded border p-2"
        style={{ backgroundColor: bg2, borderColor: fg2 }}
      >
        <div className="truncate" style={{ color: accent }}>
          {currentSong?.name ?? "Unknown"}
        </div>
        <div style={{ color: fg2 }}>Local Library</div>
      </div>

      <div className="flex items-center gap-2">
        <span style={{ color: fg2 }}>{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={(event) => seek(parseFloat(event.target.value))}
          className="flex-1 cursor-pointer"
          style={{ accentColor: accent }}
        />
        <span style={{ color: fg2 }}>{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button onClick={prev} style={{ color: fg0 }} className="cursor-pointer">
          ⏮
        </button>
        <button
          onClick={togglePlay}
          className="cursor-pointer text-lg"
          style={{ color: accent }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={next} style={{ color: fg0 }} className="cursor-pointer">
          ⏭
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto rounded border"
        style={{ borderColor: fg2 }}
      >
        {songs.map((song, index) => (
          <button
            key={song.id}
            onClick={() => selectSong(index)}
            className="w-full cursor-pointer truncate px-2 py-1 text-left hover:opacity-70"
            style={{
              backgroundColor:
                index === currentIndex ? bg2 : "transparent",
              color: index === currentIndex ? accent : fg0,
            }}
          >
            {index === currentIndex && isPlaying ? "▶ " : "  "}
            {song.name}
          </button>
        ))}
      </div>
    </div>
  );
}
