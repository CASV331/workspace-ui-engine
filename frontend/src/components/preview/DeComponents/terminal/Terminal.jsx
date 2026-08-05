import { useConfig } from "../../../../contexts/ConfigContext"

export function Terminal() {
    const { config } = useConfig()
    const {
        background,
        backgroundOpacity,
        borderColor,
        borderOpacity,
        borderWidth,
        textColor,
        fontSize
    } = config.window
    return (
        <div className="flex-1 flex gap-4 terminal ">
            <div
                className="flex-1 flex p-3"
                style={{
                    backgroundColor: background,
                    // border: `${borderWidth}px solid ${borderColorRgba}`,
                    color: textColor,
                    fontSize: `${fontSize}px`,
                }}
            >
                <div className=" text-gray-300">
                    <div className="font-mono text-green-400/90 space-y-1 flex items-center">
                        <div className="w-1/3 lg:w-1/4">
                            <img src="arch-linux-svgrepo-com.svg" alt="" />
                        </div>
                        <div>
                        <p><span className="text-[#89b4fa]">user@hyprland</span><span className="text-gray-400">:</span><span className="text-[#cba6f7]">~</span><span className="text-gray-400">$</span> neofetch</p>
                        <p className="text-gray-300">OS: Arch Linux</p>
                        <p className="text-gray-300">WM: Hyprland</p>
                        <p className="text-gray-300">Terminal: Kitty</p>
                        <p className="mt-2"><span className="text-[#89b4fa]">user@hyprland</span><span className="text-gray-400">:</span><span className="text-[#cba6f7]">~</span><span className="text-gray-400">$</span> <span className="animate-pulse">▋</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}