function updateActiveWindows(state, updater) {
  const windows = state.desktops[state.activeDesktop].windows;
  const nextWindows = updater(windows);

  if (nextWindows === windows) return state;

  return {
    ...state,
    desktops: {
      ...state.desktops,
      [state.activeDesktop]: {
        windows: nextWindows,
      },
    },
  };
}

export function desktopReducer(state, action) {
  switch (action.type) {
    case "LOCKSCREEN": {
      return {
        ...state,
        unlocked: action.payload.unlocked,
      };
    }

    case "WINDOW_OPEN": {
      const { id, type, position, size } = action.payload;
      const windows = state.desktops[state.activeDesktop].windows;

      if (windows.some((window) => window.id === id)) return state;

      const newWindow = {
        id,
        type,
        position: position ?? { x: 50, y: 50 },
        size: size ?? { width: 400, height: 300 },
        isMinimized: false,
        isFocused: true,
        isFloating: false,
        animation: {
          state: "opening",
        },
        history: [],
      };

      return {
        ...state,
        desktops: {
          ...state.desktops,
          [state.activeDesktop]: {
            windows: [
              ...windows.map((window) => ({ ...window, isFocused: false })),
              newWindow,
            ],
          },
        },
      };
    }

    case "WINDOW_CLOSE": {
      const { windowId } = action.payload;

      return updateActiveWindows(state, (windows) => {
        const index = windows.findIndex((window) => window.id === windowId);
        if (index === -1) return windows;

        const remaining = windows.filter((window) => window.id !== windowId);
        const nextFocus = remaining[Math.min(index, remaining.length - 1)];

        return remaining.map((window) => ({
          ...window,
          isFocused: window.id === nextFocus?.id,
        }));
      });
    }

    case "WINDOW_FOCUS": {
      const { windowId } = action.payload;

      return updateActiveWindows(state, (windows) => {
        if (!windows.some((window) => window.id === windowId)) return windows;

        const alreadyFocused = windows.every(
          (window) => window.isFocused === (window.id === windowId),
        );
        if (alreadyFocused) return windows;

        return windows.map((window) => ({
          ...window,
          isFocused: window.id === windowId,
        }));
      });
    }

    case "WINDOW_MOVE": {
      const { windowId, position } = action.payload;
      if (!position) return state;

      return updateActiveWindows(state, (windows) => {
        const index = windows.findIndex((window) => window.id === windowId);
        if (index === -1) return windows;

        const target = windows[index];
        if (!target.isFloating) return windows;
        if (target.position.x === position.x && target.position.y === position.y) {
          return windows;
        }

        return windows.map((window) =>
          window.id === windowId ? { ...window, position } : window,
        );
      });
    }

    case "WINDOW_SWITCH_DESKTOP": {
      const { desktopNumber } = action.payload;
      const targetDesktop = state.desktops[desktopNumber];

      if (!targetDesktop || desktopNumber === state.activeDesktop) return state;

      const windows = state.desktops[state.activeDesktop].windows;
      const focusedIndex = windows.findIndex((window) => window.isFocused);
      if (focusedIndex === -1) return state;

      const focused = windows[focusedIndex];
      const remaining = windows.filter((_, index) => index !== focusedIndex);
      const nextFocusIndex = focusedIndex > 0 ? focusedIndex - 1 : 0;

      return {
        ...state,
        desktops: {
          ...state.desktops,
          [desktopNumber]: {
            windows: [
              ...targetDesktop.windows.map((window) => ({
                ...window,
                isFocused: false,
              })),
              { ...focused, isFocused: true },
            ],
          },
          [state.activeDesktop]: {
            windows: remaining.map((window, index) => ({
              ...window,
              isFocused: index === nextFocusIndex,
            })),
          },
        },
      };
    }

    case "DESKTOP_SWITCH": {
      const { desktopNumber } = action.payload;
      if (!state.desktops[desktopNumber]) return state;
      if (state.activeDesktop === desktopNumber) return state;

      return {
        ...state,
        activeDesktop: desktopNumber,
        slideDirection: desktopNumber > state.activeDesktop ? "right" : "left",
      };
    }

    case "SET_WINDOW_ANIMATION": {
      const { id, state: animationState } = action.payload;

      return updateActiveWindows(state, (windows) => {
        const target = windows.find((window) => window.id === id);
        if (!target || target.animation.state === animationState) return windows;

        return windows.map((window) =>
          window.id === id
            ? {
                ...window,
                animation: {
                  ...window.animation,
                  state: animationState,
                },
              }
            : window,
        );
      });
    }

    case "SET_FLOATING": {
      const { windowId, floating, position, size } = action.payload;

      return updateActiveWindows(state, (windows) =>
        windows.map((window) =>
          window.id === windowId
            ? {
                ...window,
                isFloating: floating ?? !window.isFloating,
                position: position ?? window.position,
                size: size ?? window.size,
              }
            : window,
        ),
      );
    }

    default:
      return state;
  }
}
