import { useState, useMemo } from "react";
import { useConfig } from "../../../../../../contexts/ConfigContext";
import { usePlayer } from "../../../../../../contexts/PlayerContext";

export function SoundPanel() {
  const { config } = useConfig();
  const { bg0, bg1, bg3, fg0, fg1, fg2, accent } = config.colors;

  const {
    playerState,
    currentSong,
    togglePlay,
    next,
    prev,
    setVolume
  } = usePlayer()
  
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
      <div className="flex items-center justify-between mb-2">
        
      </div>

      <div
        className="grid grid-cols-7 gap-1 text-center text-xs mb-1"
        style={{ color: fg0 }}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
          <div key={idx} style={{ padding: "4px 0" }}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          const isCurrentMonth = cell.monthOffset === 0;
          const isTodayCell = isCurrentMonth && isToday(cell.day);
          return (
            <div
              key={idx}
              style={{
                textAlign: "center",
                padding: "4px 0",
                fontSize: "13px",
                borderRadius: "4px",
                backgroundColor: isTodayCell ? accent : "transparent",
                color: isTodayCell ? bg0 : isCurrentMonth ? fg0 : fg2,
                cursor: "default",
              }}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
