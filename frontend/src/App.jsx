import { useState } from "react";
import Desktop from "./wm/Desktop.jsx";
import { ConfigProvider } from "./contexts/ConfigContext.jsx";
import { PlayerProvider } from "./contexts/PlayerContext.jsx";
import { NetworkProvider } from "./contexts/NetworkContext.jsx";
import BootScreen from "./core/boot/BootScreen";
import "./index.css";
import { DesktopProvider } from "./contexts/DesktopContext.jsx";

function App() {
  return (
    <ConfigProvider>
      <DesktopProvider>
      <PlayerProvider>
        <NetworkProvider>
        {/* flex items-center justify-center gap-4 lg:gap-6 */}
        <div className="bg-gray-900 h-screen text-white">
          <Desktop />
        </div>
        </NetworkProvider>
      </PlayerProvider>
      </DesktopProvider>
    </ConfigProvider>
  );
}

export default App;
