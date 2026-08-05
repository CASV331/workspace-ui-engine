export function playOpenAnimation(windowId, dispatch) {
    console.log(windowId)
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

    dispatch({
        type: "SET_WINDOW_ANIMATION",
        id: windowId,
        state: "closing"
    });

    setTimeout(() => {

        dispatch({
            type: "REMOVE_WINDOW",
            id: windowId
        });

    },180);

}