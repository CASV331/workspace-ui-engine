import { useRef, useState, useEffect } from "react";
import { useConfig } from "../contexts/ConfigContext";
import { useDesktop } from "../contexts/DesktopContext"

export function Window({ windowData, children }) {
  const { config } = useConfig();
  const { focusWindow, moveWindow } = useDesktop()
  const { accent, bg0, fg2 } = config.colors;

  const { id, position, size, isFocused, isFloating } = windowData;
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
    const pos = e.currentTarget.getBoundingClientRect()
    // Focus window on click
    focusWindow(id);

    // Drag if mod is pressed
    if (!isModPressed.current) return;

    e.preventDefault();
    if(windowData.isFloating) isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    console.log(dragOffset.current)

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const newPos = {
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      };
      moveWindow(id, newPos);
    };

    const handleMouseUp = () => {
      // Sync final position with context
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      className={`flex absolute rounded-lg overflow-auto window backdrop-blur-xs z-10
        ${isModPressed.current && "cursor-grab"}
        `}
      data-animation={windowData.animation.state}
      style={{
        backgroundColor: bg0,
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isFloating ? isFocused ? 50 : 40 : isFocused ? 10 : 1,
        border: `2px solid ${isFocused ? accent : fg2}`,
        // borderRadius: `${borderRadius}px`
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}
