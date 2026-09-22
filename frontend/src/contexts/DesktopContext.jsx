import { useReducer } from "react";
import { createContext, useContext, useState } from "react";
import { desktopReducer } from "./reducers/desktopReducer";
import {
  playCloseAnimation,
  playOpenAnimation,
} from "../core/animation/animationEngine";

const DesktopContext = createContext(null);
const defaultDesktopState = {
  activeDesktop: 1,
  unlocked: false,
  desktops: {
    1: {
      windows: [
        {
          animation: {
            state: "opened",
          },
          history: [],
          id: `win_${Date.now()}`,
          isFocused: true,
          isMinimized: false,
          position: {
            x: 134.76686628622176,
            y: 98.04125311295269,
          },
          size: {
            width: 400,
            height: 300,
          },
          type: "welcome",
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

  const lockScreen = () => {
    dispatch({
      type: "LOCKSCREEN",
      payload: {unlocked: false}
    })
  }
  const unlockScreen = () => {
    dispatch({
      type: "LOCKSCREEN",
      payload: {unlocked: true}
    })
  }

  const openWindow = (type) => {
    // const app = APP_REGISTRY[type];
    const id = `win_${Date.now()}`;
    dispatch({
      type: "WINDOW_OPEN",
      payload: {
        id,
        type,
      },
    });
    playOpenAnimation(id, dispatch);
  };

  const closeFocusedWindow = (id) => {
    playCloseAnimation(id, dispatch);
  };

  const focusWindow = (windowId) =>
    dispatch({
      type: "WINDOW_FOCUS",
      payload: { windowId },
    });

  const moveWindow = (windowId, position) =>
    dispatch({
      type: "MOVE_WINDOW",
      payload: { windowId, position },
    });

  const switchWindowDesktop = (desktopNumber) =>
    dispatch({
      type: "WINDOW_SWITCH_DESKTOP",
      payload: { desktopNumber },
    });

  const switchDesktop = (desktopNumber) => {
    dispatch({
      type: "DESKTOP_SWITCH",
      payload: { desktopNumber },
    });
  };

  return (
    <DesktopContext.Provider
        value={{
            lockScreen,
            unlockScreen,
            desktopState,
            openWindow,
            closeFocusedWindow,
            focusWindow,
            switchDesktop,
            moveWindow,
            switchWindowDesktop,
        }}
        >
            {children}
        </DesktopContext.Provider>
  )
}

export function useDesktop() {
    return useContext(DesktopContext)
}
