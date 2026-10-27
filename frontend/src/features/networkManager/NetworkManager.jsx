import { useState } from "react";
import { useConfig } from "../../contexts/ConfigContext";
import { useNetwork } from "../../contexts/NetworkContext";
import { DeviceInfo } from "./DeviceInfo";
import { NetworkSection } from "./NetworkSection";

const KNOWN_NETWORKS = [
  {
    name: "Tenere5G",
    security: "psk",
    hidden: "false",
    autoConnect: "true",
    signal: 100,
    connected: true,
  },
];

const NEW_NETWORKS = [
  { name: "Tenere2G", security: "psk", signal: 100 },
  { name: "Zyxel_8DB1", security: "psk", signal: 78 },
  { name: "tp-link", security: "psk", signal: 62 },
  { name: "RUT200_23D9", security: "psk", signal: 92 },
  { name: "Telia-0F6AA7", security: "psk", signal: 52 },
];

export function NetworkManager() {
  const { config } = useConfig();
  const { bg0, fg0 } = config.colors;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newSelectedIndex, setNewSelectedIndex] = useState(0);
  const { networkState } = useNetwork();
  const { wifiEnabled, connected } = networkState;

  return (
    <div
      className="flex h-full w-full flex-col font-mono text-sm"
      style={{ backgroundColor: bg0, color: fg0 }}
    >
      <NetworkSection
        title="Known Networks"
        type="known"
        networks={KNOWN_NETWORKS}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      <NetworkSection
        title="New Networks"
        type="new"
        networks={NEW_NETWORKS}
        selectedIndex={newSelectedIndex}
        onSelect={setNewSelectedIndex}
      />

      <DeviceInfo powered={wifiEnabled} state={connected} />

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
