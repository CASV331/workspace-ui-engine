import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useConfig } from "../contexts/ConfigContext";
import {
  useDesktopActions,
  useDesktopState,
} from "../contexts/DesktopContext";
import { useKeybinds } from "../core/keybinds/DesktopKeybinds";
import BootScreen from "../core/boot/BootScreen";
import { ThemeDmenu } from "../features/menu/Menu";
import { LockScreen } from "../features/lockScreen/LockScreen";
import { StatusBar } from "../features/statusBar/StatusBar";
import { calculateLayout, buildTree } from "./Tiling";
import { WindowHost } from "./WindowHost";

function Desktop() {
  const { config } = useConfig();
  const {
    openWindow,
    closeFocusedWindow,
    focusWindow,
    switchDesktop,
    switchWindowDesktop,
    lockScreen,
    unlockScreen,
    setFloating,
  } = useDesktopActions();
  const desktopState = useDesktopState();
  const { activeDesktop, desktops, slideDirection, unlocked } = desktopState;

  const [dmenuOpen, setDmenuOpen] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [booted, setBooted] = useState(false);

  const containerRef = useRef(null);
  const currentWindows = desktops[activeDesktop].windows;
  const focused = currentWindows.find((window) => window.isFocused);

  const handleBootFinish = useCallback(() => setBooted(true), []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setContainerSize((previous) => {
          if (
            previous.width === rect.width &&
            previous.height === rect.height
          ) {
            return previous;
          }

          return { width: rect.width, height: rect.height };
        });
      }
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, [activeDesktop]);

  const tiledKey = currentWindows
    .filter((window) => !window.isFloating)
    .map((window) => window.id)
    .join("|");

  const layout = useMemo(() => {
    const tiledIds = tiledKey ? tiledKey.split("|") : [];
    if (
      tiledIds.length === 0 ||
      containerSize.width === 0 ||
      containerSize.height === 0
    ) {
      return {};
    }

    const windowsById = new Map(
      currentWindows.map((window) => [window.id, window]),
    );
    const tiledWindows = tiledIds
      .map((id) => windowsById.get(id))
      .filter(Boolean);
    const tree = buildTree(tiledWindows);

    if (!tree) return {};

    return calculateLayout(
      tree,
      0,
      0,
      containerSize.width,
      containerSize.height,
      0,
      config.window.gap ?? 0,
    );
    // El layout solo depende de los ids tiled y del contenedor; el foco no lo invalida.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiledKey, containerSize.width, containerSize.height, config.window.gap]);

  const moveFocus = useCallback(
    (direction) => {
      if (!focused) return;

      const focusedLayout = layout[focused.id];
      if (!focusedLayout) return;

      const focusedCenter = {
        x: focusedLayout.x + focusedLayout.width / 2,
        y: focusedLayout.y + focusedLayout.height / 2,
      };

      const candidates = currentWindows.filter((window) => {
        if (window.id === focused.id) return false;
        if (!layout[window.id]) return false;

        const windowCenter = {
          x: layout[window.id].x + layout[window.id].width / 2,
          y: layout[window.id].y + layout[window.id].height / 2,
        };

        if (direction === "right") return windowCenter.x > focusedCenter.x;
        if (direction === "left") return windowCenter.x < focusedCenter.x;
        if (direction === "up") return windowCenter.y < focusedCenter.y;
        if (direction === "down") return windowCenter.y > focusedCenter.y;
        return false;
      });

      if (candidates.length === 0) return;

      const closest = candidates.reduce((nearest, window) => {
        const windowCenter = {
          x: layout[window.id].x + layout[window.id].width / 2,
          y: layout[window.id].y + layout[window.id].height / 2,
        };
        const nearestCenter = {
          x: layout[nearest.id].x + layout[nearest.id].width / 2,
          y: layout[nearest.id].y + layout[nearest.id].height / 2,
        };

        const distanceToCurrent = Math.hypot(
          windowCenter.x - focusedCenter.x,
          windowCenter.y - focusedCenter.y,
        );
        const distanceToNearest = Math.hypot(
          nearestCenter.x - focusedCenter.x,
          nearestCenter.y - focusedCenter.y,
        );

        return distanceToCurrent < distanceToNearest ? window : nearest;
      });

      focusWindow(closest.id);
    },
    [focused, layout, currentWindows, focusWindow],
  );

  useKeybinds({
    openWindow,
    closeFocusedWindow,
    moveFocus,
    switchDesktop,
    switchWindowDesktop,
    setDmenuOpen,
    focused,
    lockScreen,
    setFloating,
    enabled: booted && unlocked,
    layout,
  });

  return (
    <div
      className="desktop-preview-container sticky top-0 z-10 h-full w-full"
      style={{ backgroundColor: config.colors.bg0 }}
    >
      {!booted && <BootScreen onFinish={handleBootFinish} />}
      {!unlocked && booted && <LockScreen onUnlock={unlockScreen} />}

      <div
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-sm"
        style={{
          backgroundImage: `url(${config.wallpaper.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <StatusBar />

        <div
          key={activeDesktop}
          className={`workspace-slide-${slideDirection} relative flex w-full flex-1 p-2`}
        >
          <div
            ref={containerRef}
            className="relative w-full flex-1 justify-between"
          >
            {currentWindows.map((window) => {
              const box = layout[window.id];

              return (
                <WindowHost
                  key={window.id}
                  id={window.id}
                  type={window.type}
                  x={box?.x ?? window.position?.x ?? 0}
                  y={box?.y ?? window.position?.y ?? 0}
                  width={box?.width ?? window.size?.width ?? 320}
                  height={box?.height ?? window.size?.height ?? 240}
                  isFocused={Boolean(window.isFocused)}
                  isFloating={Boolean(window.isFloating)}
                  animationState={window.animation?.state ?? "opened"}
                />
              );
            })}
          </div>
        </div>

        <ThemeDmenu isOpen={dmenuOpen} onClose={() => setDmenuOpen(false)} />
      </div>
    </div>
  );
}

export default Desktop;
