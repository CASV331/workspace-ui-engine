/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const NetworkContext = createContext(null);

const initialNetworkState = {
  wifiEnabled: true,
  connected: true,
  ssid: "Tenere5G",
  localIp: "192.168.1.42",
  signal: 100,
  security: "WPA2-Personal",
};

export function NetworkProvider({ children }) {
  const [networkState, setNetworkState] = useState(initialNetworkState);

  const toggleWifi = useCallback(() => {
    setNetworkState((prev) => {
      const wifiEnabled = !prev.wifiEnabled;
      return {
        ...prev,
        wifiEnabled,
        connected: wifiEnabled,
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      networkState,
      toggleWifi,
    }),
    [networkState, toggleWifi],
  );

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork debe usarse dentro de NetworkProvider");
  }
  return context;
}
