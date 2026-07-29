import { MusicPlayer } from "../../features/music_player/Music_player";
// Add neofetch ;)

export const APP_REGISTRY = {
    "rmpc": {
        title: "rmpc",
        component: MusicPlayer,
        defaultSize: { width: 300, height: 450 }
    }
}

export function getApp(command) {
    return APP_REGISTRY[command.trim().toLowerCase()] ?? null
}