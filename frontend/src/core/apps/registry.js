import { lazy } from "react";

// Cada app se carga la primera vez que se abre su ventana.
export const APP_REGISTRY = {
  terminal: lazy(() =>
    import("../../features/terminal/Terminal.jsx").then((m) => ({ default: m.Terminal })),
  ),
  rmpc: lazy(() =>
    import("../../features/music_player/Music_player.jsx").then((m) => ({
      default: m.MusicPlayer,
    })),
  ),
  cava: lazy(() =>
    import("../../features/audio_visualizer/AudioVisualizer.jsx").then((m) => ({
      default: m.AudioVisualizer,
    })),
  ),
  welcome: lazy(() =>
    import("../../features/welcome/Welcome.jsx").then((m) => ({ default: m.Welcome })),
  ),
  fileManager: lazy(() =>
    import("../../features/File_manager/FileManager.jsx").then((m) => ({
      default: m.FileManager,
    })),
  ),
  networkManager: lazy(() =>
    import("../../features/networkManager/NetworkManager.jsx").then((m) => ({
      default: m.NetworkManager,
    })),
  ),
  help: lazy(() => import("../../features/help/HelpWindow.jsx")),
};
