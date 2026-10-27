import { memo, useRef } from "react";
import { useConfig } from "../contexts/ConfigContext";
import { useDesktopActions } from "../contexts/DesktopContext";
import { isModPressed, useModPressed } from "../core/keybinds/modifierKey";

export const Window = memo(function Window({
  id,
  x,
  y,
  width,
  height,
  isFocused,
  isFloating,
  animationState,
  children,
}) {
  const { config } = useConfig();
  const { focusWindow, moveWindow, setFloating } = useDesktopActions();
  const { accent, bg0, fg2 } = config.colors;
  const modPressed = useModPressed();

  const elementRef = useRef(null);
  const dragRef = useRef(null);
  const rafRef = useRef(0);
  const lastPositionRef = useRef({ x, y });

  const finishDrag = (event, commit) => {
    const drag = dragRef.current;
    if (!drag) return;

    dragRef.current = null;
    cancelAnimationFrame(rafRef.current);
    elementRef.current?.classList.remove("window--dragging");

    try {
      event.currentTarget.releasePointerCapture(drag.pointerId);
    } catch {
      // El puntero ya se liberó.
    }

    if (commit) moveWindow(id, lastPositionRef.current);
  };

  const handlePointerDown = (event) => {
    focusWindow(id);

    if (event.button !== 0 || !isModPressed()) return;

    if (!isFloating) {
      setFloating(id, true, { x, y }, { width, height });
    }

    event.preventDefault();
    lastPositionRef.current = { x, y };
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - x,
      offsetY: event.clientY - y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    elementRef.current?.classList.add("window--dragging");
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const position = {
      x: event.clientX - drag.offsetX,
      y: event.clientY - drag.offsetY,
    };
    lastPositionRef.current = position;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (elementRef.current) {
        elementRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      }
    });
  };

  return (
    <div
      ref={elementRef}
      className={`window absolute flex overflow-auto rounded-lg backdrop-blur-xs ${
        modPressed ? "cursor-grab" : ""
      }`}
      data-animation={animationState}
      style={{
        backgroundColor: bg0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        width,
        height,
        zIndex: isFloating ? (isFocused ? 50 : 40) : isFocused ? 10 : 1,
        border: `2px solid ${isFocused ? accent : fg2}`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event, true)}
      onPointerCancel={(event) => finishDrag(event, true)}
      onLostPointerCapture={(event) => finishDrag(event, true)}
    >
      {children}
    </div>
  );
});
