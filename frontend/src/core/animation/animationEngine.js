export function playOpenAnimation(windowId, dispatch) {
    dispatch({
        type: "SET_WINDOW_ANIMATION",
        id: windowId,
        state: "opening"
    });

    requestAnimationFrame(() => {

        dispatch({
            type: "SET_WINDOW_ANIMATION",
            id: windowId,
            state: "opened"
        });

    });

}

export function playCloseAnimation(windowId, dispatch) {
    console.log(windowId)
    dispatch({
        type: "SET_WINDOW_ANIMATION",
        id: windowId,
        state: "closing"
    });

    setTimeout(() => {

        dispatch({
            type: "WINDOW_CLOSE",
            id: windowId
        });

    },180);

}

export function playWorkspaceSwitchAnimation(desktop, dispatch) {
    console.log(desktop, dispatch)
    dispatch({
        type: "SET_DESKTOP_ANIMATION",
        desktop,
        state: "moving"
    })
}