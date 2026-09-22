import { useEffect, useRef, useState } from "react";
import { useConfig } from "../../../../contexts/ConfigContext";

const KEYBINDS = [
  {
    key: "Z + Return",
    description: "Open terminal",
  },
  {
    key: "Z + Backspace",
    description: "Close window",
  },
  {
    key: "Z + M",
    description: "Music Player",
  },
  {
    key: "Z + A",
    description: "Cava",
  },
  {
    key: "Z + D",
    description: "Wallpaper menu",
  },
  {
    key: "Z + ←",
    description: "Focus left window",
  },
  {
    key: "Z + →",
    description: "Focus right window",
  },
  {
    key: "Z + ↑",
    description: "Focus upper window",
  },
  {
    key: "Z + ↓",
    description: "Focus lower window",
  },
  {
    key: "Z + 1-9",
    description: "Switch desktop",
  },
  {
    key: "Z + P + 1-9",
    description: "Move window to desktop",
  },
];

export function HelpPanel({ onClose }) {
  const { config } = useConfig();

  const { bg1, fg0, fg1, accent } = config.colors;

  const panelRef = useRef(null);

  const [position, setPosition] = useState({
    x: window.innerWidth - 360,
    y: 60,
  });

  const dragRef = useRef({
    dragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;

    const rect = panelRef.current.getBoundingClientRect();

    dragRef.current = {
      dragging: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragRef.current.dragging) return;

      setPosition({
        x: e.clientX - dragRef.current.offsetX,
        y: e.clientY - dragRef.current.offsetY,
      });
      console.log(position);
    };

    const handleMouseUp = () => {
      dragRef.current.dragging = false;
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, []);

  return (
    <div
      ref={panelRef}
      onClick={(e) => e.stopPropagation()}
      className="fixed z-100 w-85 overflow-hidden rounded-lg"
      style={{
        left: position.x,
        top: position.y,

        backgroundColor: bg1,
        color: fg0,

        border: `1px solid ${accent}`,

        opacity: 0.92,

        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        className="flex cursor-grab items-center justify-between px-3 py-2 active:cursor-grabbing"
        style={{
          borderBottom: `1px solid ${accent}`,
        }}
      >
        <span className="font-bold" style={{ color: fg0 }}>
          Keybinds
        </span>

        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onClose}
          className="px-2 cursor-pointer"
          style={{
            color: fg1,
          }}
        >
          ×
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto p-3">
        <div className="flex flex-col gap-2">
          {KEYBINDS.map((bind) => (
            <div
              key={bind.key}
              className="grid grid-cols-[150px_1fr] items-center gap-3 rounded-md px-2 py-1.5"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.12)",
              }}
            >
              <kbd
                className="rounded px-2 py-1 text-xs font-bold"
                style={{
                  color: accent,
                  border: `1px solid ${accent}`,
                  backgroundColor: "rgba(0,0,0,0.15)",
                }}
              >
                {bind.key}
              </kbd>

              <span
                className="text-sm"
                style={{
                  color: fg1,
                }}
              >
                {bind.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
