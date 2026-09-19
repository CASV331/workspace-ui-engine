import { useRef, useEffect } from "react";
export function useKeybinds({
  openWindow,
  closeFocusedWindow,
  moveFocus,
  switchDesktop,
  switchWindowDesktop,
  setDmenuOpen,
  focused,
  enabled = true
}) {
  const isModPressed = useRef(false);
  const isShiftPressed = useRef(false);
  const moveFocusRef = useRef(moveFocus);

  useEffect(() => {
    moveFocusRef.current = moveFocus;
  }, [moveFocus]);

  useEffect(() => {
    if (!enabled) return
    const handleKeyDown = (e) => {
      if (e.key === "p") {
        isShiftPressed.current = true;
      }
      if (e.key === "z") {
        isModPressed.current = true;
      }
      if (isModPressed.current) {
        if (e.key === "Enter") {
          e.preventDefault();
          openWindow("terminal");
        }
        if (e.key === "q" && focused) {
          e.preventDefault();
          closeFocusedWindow(focused.id);
        }
        if (e.key === "d") {
          e.preventDefault();
          setDmenuOpen((prev) => !prev);
        }
        if (e.key === "m") {
          e.preventDefault();
          openWindow("rmpc");
        }
        if (e.key === "a") {
          e.preventDefault();
          openWindow("cava");
        }
        if (e.key === "h") {
          e.preventDefault();
          openWindow("help");
        }
        if (e.key === "f") {
          e.preventDefault()
          openWindow("fileManager")
        }
        if (e.key === "i") {
          e.preventDefault()
          openWindow("networkManager")
        }

        if (e.key === "ArrowRight") moveFocusRef.current("right");
        if (e.key === "ArrowLeft") moveFocusRef.current("left");
        if (e.key === "ArrowUp") moveFocusRef.current("up");
        if (e.key === "ArrowDown") moveFocusRef.current("down");

        const num = parseInt(e.key);
        if (num >= 1 && num <= 3) {
          e.preventDefault();
          if (isShiftPressed.current) {
            switchWindowDesktop(num);
          } else {
            switchDesktop(num);
          }
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "z") isModPressed.current = false;
      if (e.key === "p") isShiftPressed.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [enabled, openWindow, switchDesktop, switchWindowDesktop, setDmenuOpen, closeFocusedWindow, focused]);
}
