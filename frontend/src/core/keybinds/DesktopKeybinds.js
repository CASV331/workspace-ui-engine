import { useEffect, useRef } from "react";

function isEditableTarget(target) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || Boolean(target.closest("input, textarea, select")))
  );
}

const REPEAT_GUARDED_KEYS = new Set([
  "Enter",
  "q",
  "d",
  "m",
  "a",
  "h",
  "f",
  "i",
  "l",
  "v",
]);

export function useKeybinds({
  openWindow,
  closeFocusedWindow,
  moveFocus,
  switchDesktop,
  switchWindowDesktop,
  setDmenuOpen,
  focused,
  lockScreen,
  setFloating,
  enabled = true,
  layout,
}) {
  const isModPressed = useRef(false);
  const isShiftPressed = useRef(false);
  const moveFocusRef = useRef(moveFocus);

  useEffect(() => {
    moveFocusRef.current = moveFocus;
  }, [moveFocus]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      if (isEditableTarget(e.target)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.repeat && REPEAT_GUARDED_KEYS.has(e.key)) return;

      if (e.key === "p") {
        isShiftPressed.current = true;
      }
      if (e.key === "z") {
        isModPressed.current = true;
      }
      if (!isModPressed.current) return;

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
        e.preventDefault();
        openWindow("fileManager");
      }
      if (e.key === "i") {
        e.preventDefault();
        openWindow("networkManager");
      }
      if (e.key === "l") {
        e.preventDefault();
        lockScreen();
      }
      if (e.key === "v") {
        e.preventDefault();
        if (!focused) return;

        const box = layout[focused.id];
        if (!focused.isFloating && !box) return;

        setFloating(
          focused.id,
          !focused.isFloating,
          box ? { x: box.x, y: box.y } : focused.position,
          box ? { width: box.width, height: box.height } : focused.size,
        );
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        moveFocusRef.current("right");
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveFocusRef.current("left");
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        moveFocusRef.current("up");
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveFocusRef.current("down");
      }

      const desktopNumber = parseInt(e.key, 10);
      if (desktopNumber >= 1 && desktopNumber <= 3) {
        e.preventDefault();
        if (isShiftPressed.current) {
          switchWindowDesktop(desktopNumber);
        } else {
          switchDesktop(desktopNumber);
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "z") isModPressed.current = false;
      if (e.key === "p") isShiftPressed.current = false;
    };

    const handleBlur = () => {
      isModPressed.current = false;
      isShiftPressed.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [
    enabled,
    openWindow,
    switchDesktop,
    switchWindowDesktop,
    setDmenuOpen,
    closeFocusedWindow,
    focused,
    lockScreen,
    setFloating,
    layout,
  ]);
}
