
export const APP_REGISTRY = {
    "rmpc": {
        title: "rmpc",
    },
    "terminal": {
        title: "terminal",
    },
    "cava": {
        title: "cava"
    }
}

export function getApp(command) {
    return APP_REGISTRY[command.trim().toLowerCase()] ?? null
}