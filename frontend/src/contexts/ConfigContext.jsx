/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
// Themes imports
import { buildConfigFromTokens } from "../core/theme/buildConfig.js";
import { defaultTheme, themes } from "../core/theme/themeTokens.js";
import { loadSavedTheme, saveTheme } from "../core/theme/themeStorage.js";

const ConfigContext = createContext(null);

function getInitialConfig() {
  const savedTheme = loadSavedTheme();
  const theme = themes[savedTheme] ?? defaultTheme;
  return buildConfigFromTokens(theme.tokens, theme.wallpaper);
}

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(getInitialConfig);

  const updateConfig = useCallback((section, key, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }, []);

  const setTheme = useCallback((themeName) => {
    const theme = themes[themeName];
    if (!theme) return;

    saveTheme(themeName);
    setConfig(buildConfigFromTokens(theme.tokens, theme.wallpaper));
  }, []);

  const value = useMemo(
    () => ({
      config,
      updateConfig,
      setTheme,
    }),
    [config, updateConfig, setTheme],
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig debe usarse dentro de ConfigProvider");
  }
  return context;
}
