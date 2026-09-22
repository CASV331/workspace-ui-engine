import { useReducer } from "react";
import { createContext, useContext, useState } from "react";
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

  const updateConfig = (section, key, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const setTheme = (themeName) => {
    const theme = themes[themeName];
    if (!theme) return;

    saveTheme(themeName);
    setConfig(buildConfigFromTokens(theme.tokens, theme.wallpaper));
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        setTheme,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
