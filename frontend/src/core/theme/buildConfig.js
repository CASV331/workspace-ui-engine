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
  const background = hexToRgba(tokens.background, 0.8)

  return {
    colors: {
      primary: tokens.primary,
      secondary: tokens.secondary,
      tertiary: tokens.tertiary,
      surface: tokens.surface,
      surfaceVarian: tokens.surfaceVarian,
      background,
      onSurface: tokens.onSurface,
      onBackground: tokens.onBackground,
      outline: tokens.outline,
    },
    wallpaper: {
      url: wallpaperUrl,
    },
    statusBar: {
      background,
      backgroundOpacity: 0.8,
      borderColor: tokens.primary,
      borderOpacity: 0.8,
      borderWidth: 2,
      textColor: tokens.onSurface,
      fontSize: 12,
    },
    window: {
      background,
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