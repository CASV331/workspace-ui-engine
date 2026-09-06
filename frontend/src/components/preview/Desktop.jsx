import { useConfig } from "../../contexts/ConfigContext";
import { Window } from "../Window";
import { Terminal } from "./DeComponents/terminal/Terminal";
import { StatusBar } from "./DeComponents/statusBar/StatusBar";
import { useEffect, useRef, useState, useMemo } from "react";
import { calculateLayout, buildTree } from "../Tiling";
import { ThemeDmenu } from "../../features/menu/Menu";
import { APP_REGISTRY } from "../../core/apps/registry";
import { MusicPlayer } from "../../features/music_player/Music_player";
import { AudioVisualizer } from "../../features/audio_visualizer/AudioVisualizer";
import { playCloseAnimation } from "../../core/animation/animationEngine";
import BootScreen from "../../core/boot/BootScreen";
import { HelpWindow } from "../../features/help/HelpWindow";
import { Welcome } from "../../features/welcome/Welcome";
import { useKeybinds } from "../../core/keybinds/keybinds";
import { FileManager} from "../../features/File_manager/FileManager";
import { NetworkManager } from "../../features/networkManager/NetworkManager";

const APPS = {
  terminal: Terminal,
  rmpc: MusicPlayer,
  cava: AudioVisualizer,
  help: HelpWindow,
  welcome: Welcome,
  fileManager: FileManager,
  networkManager: NetworkManager
};
function Preview() {
  const {
    config,
    desktopState,
    openWindow,
    closeFocusedWindow,
    focusWindow,
    switchDesktop,
    switchWindowDesktop,
  } = useConfig();

  // State
  const [dmenuOpen, setDmenuOpen] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [slideDirection, setSlideDirection] = useState("right");
  const [booted, setBooted] = useState(false);
  // Ref
  const prevDesktopRef = useRef(desktopState.activeDesktop);
  const containerRef = useRef(null);
  const { activeDesktop, desktops } = desktopState;
  const currentWindows = desktops[activeDesktop].windows;
  // Get focused window
  const focused = currentWindows.find((win) => win.isFocused === true);

  // Calculate layout
  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setContainerSize({ width, height });
  }, []);
  
  useEffect(() => {
  const el = containerRef.current;
  if (!el) return;

  const updateSize = () => {
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setContainerSize({ width: rect.width, height: rect.height });
    }
  };

  // Medición inicial inmediata
  updateSize();

  // Observar cambios de tamaño
  const observer = new ResizeObserver(updateSize);
  observer.observe(el);

  return () => observer.disconnect();
}, []);

  const layout = useMemo(() => {
    if (currentWindows.length === 0) return {};
    if (containerSize.width === 0) return {};

    // const { width, height } = containerRef.current.getBoundingClientRect();

    const tree = buildTree(currentWindows);

    return calculateLayout(tree, 0, 0, containerSize.width, containerSize.height);
  }, [currentWindows, containerSize]);

    useEffect(() => {
    const prev = prevDesktopRef.current;
    const current = desktopState.activeDesktop;
    if (prev !== current) {
      setSlideDirection(current > prev ? "right" : "left");
      prevDesktopRef.current = current;
    }
  }, [desktopState.activeDesktop]);


  const moveFocus = (direction) => {
    if (!focused) return;

    const focusedLayout = layout[focused.id];
    if (!focusedLayout) return;

    const focusedCenter = {
      x: focusedLayout.x + focusedLayout.width / 2,
      y: focusedLayout.y + focusedLayout.height / 2,
    };

    const candidates = currentWindows.filter((win) => {
      if (win.id === focused.id) return false; //Exclude the focused
      const winLayout = layout[win.id];
      if (!winLayout) return false;
      const winCenter = {
        x: winLayout.x + winLayout.width / 2,
        y: winLayout.y + winLayout.height / 2,
      };

      if (direction === "right") return winCenter.x > focusedCenter.x;
      if (direction === "left") return winCenter.x < focusedCenter.x;
      if (direction === "up") return winCenter.y < focusedCenter.y;
      if (direction === "down") return winCenter.y > focusedCenter.y;
    });

    if (candidates.length === 0) return;

    const closest = candidates.reduce((nearest, win) => {
      const winCenter = {
        x: layout[win.id].x + layout[win.id].width / 2,
        y: layout[win.id].y + layout[win.id].height / 2,
      };

      const nearestCenter = {
        x: layout[nearest.id].x + layout[nearest.id].width / 2,
        y: layout[nearest.id].y + layout[nearest.id].height / 2,
      };

      const distanceToCurrent = Math.hypot(
        winCenter.x - focusedCenter.x,
        winCenter.y - focusedCenter.y,
      );
      const distanceToNearest = Math.hypot(
        nearestCenter.x - focusedCenter.x,
        nearestCenter.y - focusedCenter.y,
      );

      return distanceToCurrent < distanceToNearest ? win : nearest;
    });
    focusWindow(closest.id);
  };

  useKeybinds({
    openWindow,
    closeFocusedWindow,
    moveFocus,
    switchDesktop,
    switchWindowDesktop,
    setDmenuOpen,
    focused,
  });


  return (
    <div className="w-full h-full z-10 border-4 rounded-lg border-gray-700 desktop-preview-container sticky top-0 bg-gray-900">
      <BootScreen onFinish={() => setBooted(true)} />
      <div
        className="flex flex-col relative w-full h-full overflow-hidden group rounded-sm"
        style={{
          backgroundImage: `url(${config.wallpaper.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <StatusBar />
        <div
          key={desktopState.activeDesktop} // fuerza remount al cambiar de escritorio
          className={`workspace-slide-${slideDirection} relative flex flex-1 w-full p-2`}
        >
          <div
            ref={containerRef}
            className="relative flex-1 w-full justify-between"
          >
            {currentWindows.map((win) => {
              const App = APPS[win.type];
              return (
                <Window
                  key={win.id}
                  windowData={{
                    ...win,
                    position: {
                      x: layout[win.id]?.x ?? 0,
                      y: layout[win.id]?.y ?? 0,
                    },
                    size: {
                      width: layout[win.id]?.width ?? 300,
                      height: layout[win.id]?.height ?? 200,
                    },
                  }}
                >
                  {App && <App />}
                </Window>
              );
            })}
          </div>
        </div>
        <ThemeDmenu isOpen={dmenuOpen} onClose={() => setDmenuOpen(false)} />
      </div>
    </div>
  );
}

export default Preview;
