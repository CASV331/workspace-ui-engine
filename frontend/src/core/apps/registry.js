
export const APP_REGISTRY = {
    "rmpc": {
        title: "rmpc",
    },
    "terminal": {
        tittle: "terminal",
    }
}

export function getApp(command) {
    return APP_REGISTRY[command.trim().toLowerCase()] ?? null
}