export function playOpenAnimation(windowId, dispatch) {
  dispatch({
    type: "SET_WINDOW_ANIMATION",
    payload: { id: windowId, state: "opening" },
  });

  requestAnimationFrame(() => {
    dispatch({
      type: "SET_WINDOW_ANIMATION",
      payload: { id: windowId, state: "opened" },
    });
  });
}

export function playCloseAnimation(windowId, dispatch) {
  dispatch({
    type: "SET_WINDOW_ANIMATION",
    payload: { id: windowId, state: "closing" },
  });

  setTimeout(() => {
    dispatch({
      type: "WINDOW_CLOSE",
      payload: { windowId },
    });
  }, 180);
}
