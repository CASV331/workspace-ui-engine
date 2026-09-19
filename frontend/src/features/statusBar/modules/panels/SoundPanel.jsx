import { useState, useMemo } from "react";
import { useConfig } from "../../../../contexts/ConfigContext";
import { usePlayer } from "../../../../contexts/PlayerContext";

export function SoundPanel() {
  const { config } = useConfig();
  const { bg0, bg1, bg3, fg0, fg1, fg2, accent } = config.colors;

  const { playerState, currentSong, togglePlay, next, prev, setVolume, hasPlayed } =
    usePlayer();
    const { isPlaying, currentTime, duration, volume, currentIndex } =
    playerState;

    return (
    <div
      style={{
        backgroundColor: bg1,
        color: fg0,
        borderRadius: "8px",
        padding: "12px",
        width: "280px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex justify-center w-full items-center">
          {hasPlayed && (
          <div className="mb-5">
            <p>
              <span className="font-bold">Now playing: </span>{" "}
              {`${currentSong.name}`}
            </p>
            <div className="flex justify-center items-center gap-6">
              <button onClick={prev} style={{ color: fg1 }}>
                <span className="nf">{"\uf049"}</span>
              </button>
              <button
                onClick={togglePlay}
                className="text-lg"
                style={{ color: accent }}
              >
                {isPlaying ? <span className="nf">{"\uf04c"}</span> : <span className="nf">{"\uf04b"}</span>}
              </button>
              <button onClick={next} style={{ color: fg1 }}>
                <span className="nf">{"\uf050"}</span>
              </button>
            </div>
          </div>
        )}
        </div>
        <div className="flex items-center gap-2 w-full">
        <span style={{ color: fg1 }}>vol</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 cursor-pointer"
          style={{ accentColor: accent }}
        />
        <span style={{ color: fg1 }}>{Math.round(volume * 100)}%</span>
      </div>
      
      </div>
            {/* <button
        type="button"
        className="w-full mt-4 rounded-md px-3 py-1 text-sm font-medium cursor-pointer"
        style={{
          backgroundColor: accent,
          color: bg1
        }}
        onClick={() => openWindow("networkManager")}>
          More
        </button> */}
    </div>
  );
}
