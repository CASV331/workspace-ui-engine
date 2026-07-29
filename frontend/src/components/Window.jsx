import { useRef, useState, useEffect } from "react"
import { useConfig } from "../contexts/ConfigContext"

export function Window({ windowData, children }) {
    const { config, focusWindow, closeFocusedWindow, moveWindow, openWindow } = useConfig()
    const { borderColor, borderColorUnfocused, borderWidth, borderRadius } = config.window

    const { id, position, size, isFocused } = windowData
    const [pos, setPos] = useState(position)
    const isDragging = useRef(false)
    const dragOffset = useRef({ x: 0, y: 0 })

    // Listen to mod button
    const isModPressed = useRef(false)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "z") {
                isModPressed.current = true
            }
        }
        const handleKeyUp = (e) => {
            if (e.key === "z") isModPressed.current = false
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    const handleMouseDown = (e) => {
        // Focus window on click
        focusWindow(id);

        // Drag if mod is pressed
        if (!isModPressed.current) return;

        e.preventDefault();
        isDragging.current = true

        dragOffset.current = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        }


        const handleMouseMove = (e) => {
            if (!isDragging.current) return
            const newPos = {
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y
            }
            setPos(newPos)
        }

        const handleMouseUp = () => {
            isDragging.current = false;
            // Sync final position with context
            moveWindow(id, pos)
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

    }

    return (
        <div
            className={`flex absolute p-2 rounded-lg  overflow-auto 
        ${isModPressed.current && "cursor-grab"}
        `}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                zIndex: isFocused ? 10 : 1,
                border: `${borderWidth}px solid ${isFocused ? borderColor : borderColorUnfocused}`,
                // borderRadius: `${borderRadius}px`
            }}
            onMouseEnter={handleMouseDown}
        >
            {children}
        </div>
    )
}