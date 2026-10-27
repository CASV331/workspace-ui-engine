const THEME_KEY = "wm_theme";

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Almacenamiento deshabilitado o sin cuota: el tema sigue activo en memoria.
  }
}

export function loadSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}
