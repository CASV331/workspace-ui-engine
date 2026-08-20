import { useState } from "react";
import Sidebar from "./components/layout/sidebar/Sidebar.jsx";
import Preview from "./components/preview/Desktop.jsx";
import { ConfigProvider } from "./contexts/ConfigContext.jsx";
import { PlayerProvider } from "./contexts/PlayerContext.jsx";
import { FilesystemProvider } from "./contexts/FileSystemContext.jsx";
import BootScreen from "./core/boot/BootScreen";
import "./index.css";

function App() {
  return (
    <ConfigProvider>
      <FileSystemProvider>
      <PlayerProvider>
        {/* flex items-center justify-center gap-4 lg:gap-6 */}
        <div className="bg-gray-900 h-screen text-white">
          <Preview />
        </div>
      </PlayerProvider>
      </FileSystemProvider>
    </ConfigProvider>
  );
}

export default App;
