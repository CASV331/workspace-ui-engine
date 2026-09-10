import { NetworkRow } from "./NetworkRow";
import { useConfig } from "../../contexts/ConfigContext";
import { useNetwork } from "../../contexts/NetworkContext";
export function NetworkSection({
  title,
  type,
  networks,
  selectedIndex,
  onSelect,
}) {
  const { config } = useConfig();
  const { bg0, bg1, bg3, fg0, fg1, fg2, accent } = config.colors;
  const { networkState, toggleWifi } = useNetwork();
  const { wifiEnabled, connected, ssid, localIp } = networkState;

  return (
    <fieldset
      className="mb-4 min-h-0 flex-1 border px-3 pb-3"
      style={{ borderColor: fg0 }}
    >
      <legend className="px-2" style={{ color: fg0 }}>
        {" "}
        {title}{" "}
      </legend>
      {type === "known" ? (
        <div className="grid grid-cols-[1.5fr_1fr_.7fr_1fr_.5fr] font-bold">
          <span>Name</span>
          <span>Security</span>
          <span>Hidden</span>
          <span>Auto connect</span>
          <span className="text-right">Signal</span>
        </div>
      ) : (
        <div className="grid grid-cols-[2fr_1fr_.5fr] font-bold">
          <span>Name</span>
          <span>Security</span>
          <span className="text-right">Signal</span>
        </div>
      )}
      { wifiEnabled && 
        <div className="mt-2">
          {networks.map((network, index) => (
            <NetworkRow
              key={network.name}
              network={network}
              type={type}
              selected={index === selectedIndex}
              onClick={() => onSelect?.(index)}
            />
          ))}
        </div>
      }
    </fieldset>
  );
}
