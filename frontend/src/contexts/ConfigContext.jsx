import { useReducer } from "react";
import { createContext, useContext, useState } from "react";
import { desktopReducer } from "./reducers/desktopReducer.js"
import { APP_REGISTRY } from "../core/apps/registry.js";
// Themes imports 
import { buildConfigFromTokens } from "../core/theme/buildConfig.js";
import { defaultTheme, themes } from "../core/theme/themeTokens.js"
import { loadSavedTheme, saveTheme } from "../core/theme/themeStorage.js"

const defaultDesktopState = {
    activeDesktop: 1,
    desktops: {
        1: { windows: [] },
        2: { windows: [] },
        3: { windows: [] },
        4: { windows: [] },
        5: { windows: [] },
        6: { windows: [] },
        7: { windows: [] },
        8: { windows: [] },
        9: { windows: [] }

    }
}

const ConfigContext = createContext(null);

function getInitialConfig() {
    const savedTheme = loadSavedTheme()
    const theme = themes[savedTheme] ?? defaultTheme
    return buildConfigFromTokens(theme.tokens, theme.wallpaper)
}

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(getInitialConfig);
    const [desktopState, dispatch] = useReducer(desktopReducer, defaultDesktopState)

    const updateConfig = (section, key, value) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            }
        }))
    }

    const openWindow = (type) => {
        const app = APP_REGISTRY[type]
        dispatch({
        type: "WINDOW_OPEN",
        payload: { type }
        
    })
    }
    const closeFocusedWindow = () => dispatch({
        type: "WINDOW_CLOSE"
    })

    const focusWindow = (windowId) => dispatch({
        type: "WINDOW_FOCUS",
        payload: { windowId }
    })

    const moveWindow = (windowId, position) => dispatch({
        type: "MOVE_WINDOW",
        payload: { windowId, position }
    })

    const switchWindowDesktop = (desktopNumber) => dispatch({
        type: "WINDOW_SWITCH_DESKTOP",
        payload: { desktopNumber }
    })

    const switchDesktop = (desktopNumber) => dispatch({
        type: "DESKTOP_SWITCH",
        payload: { desktopNumber }
    })

    const setTheme = (themeName) => {
        const theme = themes[themeName]
        if (!theme) return

        saveTheme(themeName)
        setConfig(buildConfigFromTokens(theme.tokens, theme.wallpaper))
    }


    return (
        <ConfigContext.Provider value={{
            // Appearance config
            config,
            updateConfig,
            // defaultConfig,
            // Desktop state
            desktopState,
            // Desktop actions
            openWindow,
            closeFocusedWindow,
            focusWindow,
            switchDesktop,
            moveWindow,
            switchWindowDesktop,
            setTheme
        }}>
            {children}
        </ConfigContext.Provider>
    )
}

export function useConfig() {
    return useContext(ConfigContext);
}