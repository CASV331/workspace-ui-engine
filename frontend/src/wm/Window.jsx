import { useRef, useState, useEffect } from "react";
import { useConfig } from "../contexts/ConfigContext";
import { useDesktop } from "../contexts/DesktopContext"

export function Window({ windowData, children }) {
  const { config } = useConfig();
  const { focusWindow, moveWindow } = useDesktop()
  const { accent, bg0, fg2 } = config.colors;

  const { id, position, size, isFocused } = windowData;
  const [pos, setPos] = useState(position);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Listen to mod button
  const isModPressed = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "z") {
        isModPressed.current = true;
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === "z") isModPressed.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    // Focus window on click
    focusWindow(id);

    // Drag if mod is pressed
    if (!isModPressed.current) return;

    e.preventDefault();
    isDragging.current = true;

    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const newPos = {
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      };
      setPos(newPos);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      // Sync final position with context
      moveWindow(id, pos);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      className={`flex absolute rounded-lg overflow-auto window backdrop-blur-xs
        ${isModPressed.current && "cursor-grab"}
        `}
      data-animation={windowData.animation.state}
      style={{
        backgroundColor: bg0,
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isFocused ? 10 : 1,
        border: `2px solid ${isFocused ? accent : fg2}`,
        // borderRadius: `${borderRadius}px`
      }}
      onMouseMove={handleMouseDown}
    >
      {children}
    </div>
  );
}
