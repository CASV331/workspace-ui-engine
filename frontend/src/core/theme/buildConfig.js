import { defaultTheme } from "./themeTokens";

export function buildConfigFromTokens(
  tokens = defaultTokens,
  wallpaperUrl = "/assets/wallpapers/anime_girl_white_hair.png",
) {
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  const bg0 = hexToRgba(tokens.bg0, 0.9);

  return {
    colors: {
      primary: tokens.primary,
      secondary: tokens.secondary,
      tertiary: tokens.tertiary,
      surface: tokens.surface,
      surfaceVarian: tokens.surfaceVarian,
      background: tokens.background,
      onSurface: tokens.onSurface,
      onBackground: tokens.onBackground,
      outline: tokens.outline,
      bg0,
      bg1: tokens.bg1,
      bg2: tokens.bg2,
      bg3: tokens.bg3,
      fg0: tokens.fg0,
      fg1: tokens.fg1,
      fg2: tokens.fg2,

      accent: tokens.accent,
    },
    wallpaper: {
      url: wallpaperUrl,
    },
    statusBar: {
      backgroundOpacity: 0.8,
      borderColor: tokens.primary,
      borderOpacity: 0.8,
      borderWidth: 2,
      textColor: tokens.onSurface,
      fontSize: 12,
    },
    window: {
      background: bg0,
      backgroundOpacity: 0.8,
      borderColor: tokens.primary,
      borderColorUnfocused: tokens.outline,
      borderWidth: 1,
      borderRadius: 8,
      gap: 4,
      borderOpacity: 0.8,
      borderWidth: 2,
      textColor: tokens.onSurface,
      fontSize: 12,
    },
  };
}
