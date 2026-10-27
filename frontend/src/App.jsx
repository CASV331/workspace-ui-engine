import Desktop from "./wm/Desktop.jsx";
import {
  ConfigProvider,
  useConfig,
} from "./contexts/ConfigContext.jsx";
import { PlayerProvider } from "./contexts/PlayerContext.jsx";
import { NetworkProvider } from "./contexts/NetworkContext.jsx";
import { DesktopProvider } from "./contexts/DesktopContext.jsx";
import "./index.css";

function AppShell() {
  const { config } = useConfig();
  const { bg0, fg0 } = config.colors;

  return (
    <div
      className="h-screen"
      style={{ backgroundColor: bg0, color: fg0 }}
    >
      <Desktop />
    </div>
  );
}

function App() {
  return (
    <ConfigProvider>
      <DesktopProvider>
        <PlayerProvider>
          <NetworkProvider>
            <AppShell />
          </NetworkProvider>
        </PlayerProvider>
      </DesktopProvider>
    </ConfigProvider>
  );
}

export default App;
