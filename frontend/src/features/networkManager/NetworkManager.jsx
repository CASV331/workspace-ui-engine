import { useState } from "react";
import { useConfig } from "../../contexts/ConfigContext";

export function NetworkManager() {
  const { config } = useConfig();
  const { bg0, bg1, bg3, fg0, fg1, fg2, accent } = config.colors;
  const [ selectedIndex, setSelectedIndex ] = useState(0)

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
        bg-black p-3
        font-mono text-sm
      "
      style={{ color: fg0 }}
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
      />
      
    </div>
  );
}
