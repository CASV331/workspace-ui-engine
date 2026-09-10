import { useState } from "react";
import { useConfig } from "../../contexts/ConfigContext";
import { useNetwork } from "../../contexts/NetworkContext";
import { NetworkSection } from "./NetworkSection";
import { DeviceInfo } from "./DeviceInfo";

export function NetworkManager() {
  const { config } = useConfig();
  const { bg0, bg1, bg3, fg0, fg1, fg2, accent } = config.colors;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newSelectedIndex, setNewSelectedIndex] = useState(0);
  const { networkState, toggleWifi } = useNetwork();
  const { wifiEnabled, connected } = networkState;

  const knownNetworks = [
    {
      name: "Tenere5G",
      security: "psk",
      hidden: "false",
      autoConnect: "true",
      signal: 100,
      connected: true,
    },
  ];

  const newNetworks = [
    { name: "Tenere2G", security: "psk", signal: 100 },
    { name: "Zyxel_8DB1", security: "psk", signal: 78 },
    { name: "tp-link", security: "psk", signal: 62 },
    { name: "RUT200_23D9", security: "psk", signal: 92 },
    { name: "Telia-0F6AA7", security: "psk", signal: 52 },
  ];
  return (
    <div
      className="
        flex h-full w-full flex-col
        font-mono text-sm
      "
      style={{ backgroundColor: bg0, color: fg0 }}
    >
      <NetworkSection
        title="Known Networks"
        type="known"
        networks={knownNetworks}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      <NetworkSection
        title="New Networks"
        type="new"
        networks={newNetworks}
        selectedIndex={newSelectedIndex}
        onSelect={setNewSelectedIndex}
      />

      <DeviceInfo
        powered={wifiEnabled}
        state={connected}
      />

      <div
        className="flex flex-wrap gap-x-3 px-2 text-xs"
        style={{ color: fg0 }}
      >
        <span>k,↑ Up</span>
        <span>j,↓ Down</span>
        <span>↵ Connect</span>
        <span>d Remove</span>
        <span>a Autoconnect</span>
        <span>s Scan</span>
        <span>esc Discard</span>
        <span>ctrl+r Switch Mode</span>
      </div>
    </div>
  );
}
