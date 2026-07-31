
export function desktopReducer(state, action) {
    switch (action.type) {
        case "WINDOW_OPEN": {
            const newWindow = {
                id: `win_${Date.now()}`,
                type: action.payload.type,
                position: { x: 50 + Math.random() * 100, y: 50 + Math.random() * 50 },
                size: action.payload.size ?? { width: 400, height: 300 },
                isMinimized: false,
                isFocused: true,
                history: []
            }
            return {
                ...state,
                desktops: {
                    ...state.desktops,
                    [state.activeDesktop]: {
                        windows: [...state.desktops[state.activeDesktop].windows.map(w => ({ ...w, isFocused: false })), newWindow]
                    }
                }
            }
        }

        case "WINDOW_CLOSE": {
            const windows = state.desktops[state.activeDesktop].windows
            const focusedIndex = windows.findIndex(w => w.isFocused)

            if (focusedIndex === -1) return state

            const remaining = windows.filter((_, i) => i !== focusedIndex)

            const nextFocusIndex = focusedIndex > 0 ? focusedIndex - 1 : 0

            return {
                ...state,
                desktops: {
                    ...state.desktops,
                    [state.activeDesktop]: {
                        windows: remaining.map((w, i) => ({
                            ...w,
                            isFocused: i === nextFocusIndex
                        }))
                    }
                }
            }
        }

        case "WINDOW_FOCUS": {
            return {
                ...state,
                desktops: {
                    ...state.desktops,
                    [state.activeDesktop]: {
                        windows: state.desktops[state.activeDesktop].windows.map(w => ({
                            ...w,
                            isFocused: w.id === action.payload.windowId
                        }))
                    }
                }
            }
        }

        case "WINDOW_MOVE": {
            return {
                ...state,
                desktops: {
                    ...state.desktops,
                    [state.activeDesktop]: {
                        windows: state.desktops[state.activeDesktop].windows.map(w => w.id === windowId ? { ...w, position: action.payload.position } : w)
                    }
                }
            }
        }

        case "WINDOW_SWITCH_DESKTOP": {
            const windows = state.desktops[state.activeDesktop].windows
            const focusedIndex = windows.findIndex(w => w.isFocused)

            if (focusedIndex === -1) return state

            const focused = windows[focusedIndex]

            const remaining = windows.filter((_, i) => i !== focusedIndex)

            const nextFocusIndex = focusedIndex > 0 ? focusedIndex - 1 : 0

            const updatedWindows = remaining.map((w, i) => ({
                ...w,
                isFocused: i === nextFocusIndex
            }))

            return {
                ...state,
                desktops: {
                    ...state.desktops,
                    [action.payload.desktopNumber]: {
                        windows: [...state.desktops[action.payload.desktopNumber].windows, { ...focused, isFocused: false }]
                    },
                    [state.activeDesktop]: {
                        windows: updatedWindows
                    }
                }
            }

        }

        case "DESKTOP_SWITCH": {
            return { ...state, activeDesktop: action.payload.desktopNumber }
        }

        default:
            return state
    }
}