import { useState, useEffect, useRef, useMemo } from "react";
import { useConfig } from "../../contexts/ConfigContext";
import { themes } from "../../core/theme/themeTokens";

const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export function ThemeDmenu({ isOpen, onClose }) {
  const { config, setTheme } = useConfig()
  const [query, setQuery] = useState("")
  const inputRef = useRef(null)

  const {
    background,
    backgroundOpacity,
    borderColor,
    borderOpacity,
    borderWidth,
    textColor,
    fontSize
  } = config.terminal

  const filtered = Object.entries(themes).filter(([_, theme]) =>
    theme.name.toLowerCase().includes(query.toLowerCase()))

  const bgColor = useMemo(
    () => hexToRgba(background, backgroundOpacity),
    [background, backgroundOpacity]
  );

  const borderColorRgba = useMemo(
    () => hexToRgba(borderColor, borderOpacity),
    [borderColor, borderOpacity]
  );

  // useEffect(() => {
  //   if (isOpen) {
  //     inputRef.current?.focus()
  //     setUserWallpapers(loadUserWallpapers())
  //   }
  // }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-12">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel flotante */}
      <div
        className="relative w-1/2 max-w-md rounded-lg overflow-hidden border"
        style={{
          backgroundColor: bgColor,
          borderColor,
        }}
      >
        {/* Barra de búsqueda estilo dmenu */}
        <div className="flex items-center gap-2 p-2 border-b" style={{ borderColor }}>
          <span className="text-xs" style={{ color: textColor }}>
            wallpaper:
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="buscar..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: config.colors.onSurface }}
          />
        </div>

        {/* Lista de resultados */}
        <div className="max-h-64 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="p-3 text-xs text-center" style={{ color: config.colors.onSurface }}>
              Sin resultados
            </div>
          )}

          {filtered.map(([key, theme]) => (
            <button
              key={key}
              onClick={() => {
                setTheme(key)
                onClose()
              }}
              className="w-full flex items-center gap-3 p-2 hover:opacity-80 text-left transition-opacity"
            >
              <img
                src={theme.wallpaper}
                className="w-14 h-9 rounded object-cover shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-sm">{theme.name}</span>
                <div className="flex gap-1 mt-1">
                  {Object.values(theme.tokens).slice(0, 4).map((color, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full"
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
  )
}
