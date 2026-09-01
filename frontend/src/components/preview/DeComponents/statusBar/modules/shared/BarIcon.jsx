export function BarIcon({ children, size = 16 }) {
    return (
        <div
            className="flex items-center justify-center shrink-0"
            style={{
                width: size,
                height: size
            }}
        >
            {children}
        </div>
    )
}