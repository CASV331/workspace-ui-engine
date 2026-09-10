import { createContext, useState, useContext } from "react";

const NetworkContext = createContext(null)

const initialNetworkState = {
    wifiEnabled: true,
    connected: true,
    ssid: "Tenere5G",
    localIp: "192.168.1.42",
    signal: 100,
    security: "WPA2-Personal"
}

export function NetworkProvider({children}) {
    const [networkState, setNetworkState] = useState(initialNetworkState)

    const toggleWifi = () => {
        setNetworkState((prev) => ({
            ...prev,
            wifiEnabled: !prev.wifiEnabled,
            connected: !prev.connected
        }))
    }

    return (
        <NetworkContext.Provider
        value={{
            networkState,
            toggleWifi
        }}>
            {children}
        </NetworkContext.Provider>
    )
}

export function useNetwork() {
    const context = useContext(NetworkContext)

    if(!context) {
        throw new Error(
            "useNework must be used inside NetworkProvider"
        )
    }

    return context
}