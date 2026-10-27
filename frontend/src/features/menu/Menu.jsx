import { useEffect, useRef, useState } from "react";
import { useConfig } from "../../contexts/ConfigContext";
import { themes } from "../../core/theme/themeTokens";

export function ThemeDmenu({ isOpen, onClose }) {
  const { config, setTheme } = useConfig();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const { bg0, bg1, fg0, fg2, accent } = config.colors;
  const { borderWidth } = config.window;

  const filtered = Object.entries(themes).filter(([, theme]) =>
    theme.name.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-12">
      <div
        className="absolute inset-0"
        onClick={onClose}
        style={{ backgroundColor: bg0 }}
      />

      <div
        className="relative w-1/2 max-w-md overflow-hidden rounded-lg"
        style={{
          backgroundColor: bg1,
          color: fg0,
          border: `${borderWidth}px solid ${accent}`,
        }}
      >
        <div
          className="flex items-center gap-2 border-b p-2"
          style={{ borderColor: fg2 }}
        >
          <span className="text-xs" style={{ color: fg2 }}>
            wallpaper:
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="buscar..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-current placeholder:opacity-60"
            style={{ color: fg0 }}
          />
        </div>

        <div className="max-h-64 overflow-y-auto">
          {filtered.length === 0 && (
            <div
              className="p-3 text-center text-xs"
              style={{ color: fg2 }}
            >
              Sin resultados
            </div>
          )}

          {filtered.map(([key, theme]) => (
            <button
              key={key}
              onClick={() => {
                setTheme(key);
                onClose();
              }}
              className="flex w-full items-center gap-3 p-2 text-left transition-opacity hover:opacity-80"
            >
              <img
                src={theme.wallpaper}
                alt=""
                className="h-9 w-14 shrink-0 rounded object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm">{theme.name}</span>
                <div className="mt-1 flex gap-1">
                  {[
                    theme.tokens.bg0,
                    theme.tokens.bg1,
                    theme.tokens.bg2,
                    theme.tokens.bg3,
                    theme.tokens.accent,
                  ].map((color) => (
                    <div
                      key={color}
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
