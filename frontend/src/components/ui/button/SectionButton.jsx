export default function SectionButton({ value, isActive, onClick, children }) {
    return (
        <div className="w-full">
            <button className={`flex items-center jusitfy-between transition-all duration-300 ${isActive ? "w-full justify-end" : "w-fit"} p-2 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors duration-200`} onClick={onClick}>
                <span className="text-sm">{`${isActive ? "Keybinds" : ""}`}</span>
                <img src="arrow-down.svg" className={`size-6 transition-transform duration-200 ${isActive ? "rotate-90" : "rotate-270"}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isActive ? "max-w-full" : "max-w-0"}`}>
                <div className="p-3 bg-gray-800 border border-gray-600 border-t-0 rounded-b-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}