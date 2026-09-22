import { useConfig } from "../../../../contexts/ConfigContext";
import { useDesktop } from "../../../../contexts/DesktopContext";

export function Workspaces() {
    
  const { config } = useConfig();
  const { desktopState, switchDesktop} = useDesktop()
  
  const { activeDesktop, desktops } = desktopState;
  const { bg0, bg1, bg2, bg3, fg0, fg1, fg2, accent } = config.colors;

  return (
    <div className="flex">
      {[1, 2, 3]
        .filter(
          (desktop) =>
            desktops[desktop].windows.length > 0 || desktop === activeDesktop,
        )
        .map((desktop) => (
          <button
            key={desktop}
            onClick={() => switchDesktop(desktop)}
            className={"px-3 border rounded-lg mx-0.5"}
            style={{
              backgroundColor: desktop === activeDesktop ? bg3 : bg0,
              border: `1px solid ${desktop === activeDesktop ? fg0 : fg2}`,
              color: `${desktop === activeDesktop ? fg0 : fg2}`,
              hover: {
                border: fg2,
                background: bg1,
              },
            }}
          >
            {desktop}
          </button>
        ))}
    </div>
  );
}
