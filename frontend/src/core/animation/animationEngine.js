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

// export function playWorkspaceSwitchAnimation(desktop, dispatch) {
    
//     dispatch({
//         type: "SET_DESKTOP_ANIMATION",
//         desktop,
//         state: "moving"
//     })
    
//     const ANIMATION_DURATION = 300;

//   setTimeout(() => {
//     dispatch({
//       type: "SET_DESKTOP_ANIMATION",
//       desktop,
//       state: "opened",
//     });
//   }, ANIMATION_DURATION);
// }