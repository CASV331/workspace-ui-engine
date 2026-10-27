import { useConfig } from "../../../../contexts/ConfigContext";
import {
  useDesktopActions,
  useDesktopState,
} from "../../../../contexts/DesktopContext";

export function Workspaces() {
  const { config } = useConfig();
  const { switchDesktop } = useDesktopActions();
  const { activeDesktop, desktops } = useDesktopState();

  const { bg0, bg3, fg0, fg2 } = config.colors;

  return (
    <div className="flex">
      {[1, 2, 3]
        .filter(
          (desktop) =>
            desktops[desktop].windows.length > 0 || desktop === activeDesktop,
        )
        .map((desktop) => {
          const isActive = desktop === activeDesktop;

          return (
            <button
              key={desktop}
              onClick={() => switchDesktop(desktop)}
              className="mx-0.5 cursor-pointer rounded-lg border px-3 transition-opacity hover:opacity-80"
              style={{
                backgroundColor: isActive ? bg3 : bg0,
                borderColor: isActive ? fg0 : fg2,
                color: isActive ? fg0 : fg2,
              }}
            >
              {desktop}
            </button>
          );
        })}
    </div>
  );
}
