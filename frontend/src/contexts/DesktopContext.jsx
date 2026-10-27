/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { desktopReducer } from "./reducers/desktopReducer";
import { playCloseAnimation, playOpenAnimation } from "../core/animation/animationEngine";
import { APP_TYPES } from "../core/apps/appTypes";

const DesktopStateContext = createContext(null);
const DesktopActionsContext = createContext(null);

function createWindowId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `win_${crypto.randomUUID()}`;
  }
  return `win_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

const defaultDesktopState = {
  activeDesktop: 1,
  slideDirection: "right",
  unlocked: false,
  desktops: {
    1: {
      windows: [
        {
          id: createWindowId(),
          isFocused: true,
          isFloating: false,
          position: {
            x: 134.76686628622176,
            y: 98.04125311295269,
          },
          size: {
            width: 400,
            height: 300,
          },
          type: "welcome",
          animation: {
            state: "opened",
          },
          history: [],
        },
      ],
    },
    2: { windows: [] },
    3: { windows: [] },
  },
};

export function DesktopProvider({ children }) {
  const [desktopState, dispatch] = useReducer(
    desktopReducer,
    defaultDesktopState,
  );

  const lockScreen = useCallback(() => {
    dispatch({
      type: "LOCKSCREEN",
      payload: { unlocked: false },
    });
  }, []);

  const unlockScreen = useCallback(() => {
    dispatch({
      type: "LOCKSCREEN",
      payload: { unlocked: true },
    });
  }, []);

  const openWindow = useCallback((type) => {
    if (!APP_TYPES.includes(type)) return;

    const id = createWindowId();
    dispatch({
      type: "WINDOW_OPEN",
      payload: {
        id,
        type,
        position: {
          x: 50 + Math.random() * 100,
          y: 50 + Math.random() * 50,
        },
      },
    });
    playOpenAnimation(id, dispatch);
  }, []);

  const closeFocusedWindow = useCallback((windowId) => {
    if (!windowId) return;
    playCloseAnimation(windowId, dispatch);
  }, []);

  const focusWindow = useCallback((windowId) => {
    dispatch({
      type: "WINDOW_FOCUS",
      payload: { windowId },
    });
  }, []);

  const moveWindow = useCallback((windowId, position) => {
    dispatch({
      type: "WINDOW_MOVE",
      payload: { windowId, position },
    });
  }, []);

  const switchWindowDesktop = useCallback((desktopNumber) => {
    dispatch({
      type: "WINDOW_SWITCH_DESKTOP",
      payload: { desktopNumber },
    });
  }, []);

  const switchDesktop = useCallback((desktopNumber) => {
    dispatch({
      type: "DESKTOP_SWITCH",
      payload: { desktopNumber },
    });
  }, []);

  const setFloating = useCallback((windowId, floating, position, size) => {
    dispatch({
      type: "SET_FLOATING",
      payload: { windowId, floating, position, size },
    });
  }, []);

  const actions = useMemo(
    () => ({
      lockScreen,
      unlockScreen,
      openWindow,
      closeFocusedWindow,
      focusWindow,
      moveWindow,
      switchWindowDesktop,
      switchDesktop,
      setFloating,
    }),
    [
      lockScreen,
      unlockScreen,
      openWindow,
      closeFocusedWindow,
      focusWindow,
      moveWindow,
      switchWindowDesktop,
      switchDesktop,
      setFloating,
    ],
  );

  return (
    <DesktopActionsContext.Provider value={actions}>
      <DesktopStateContext.Provider value={desktopState}>
        {children}
      </DesktopStateContext.Provider>
    </DesktopActionsContext.Provider>
  );
}

export function useDesktopState() {
  const context = useContext(DesktopStateContext);
  if (!context) {
    throw new Error("useDesktopState debe usarse dentro de DesktopProvider");
  }
  return context;
}

export function useDesktopActions() {
  const context = useContext(DesktopActionsContext);
  if (!context) {
    throw new Error("useDesktopActions debe usarse dentro de DesktopProvider");
  }
  return context;
}

export function useDesktop() {
  return {
    desktopState: useDesktopState(),
    ...useDesktopActions(),
  };
}
