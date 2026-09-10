import { useConfig } from "../../contexts/ConfigContext";
import { useNetwork } from "../../contexts/NetworkContext";
export function NetworkRow({ network, type, selected, onClick }) {
    const { config } = useConfig();
    const { bg0, fg0 } = config.colors;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left ${
        type === "known"
          ? "grid grid-cols-[1.5fr_1fr_.7fr_1fr_.5fr]"
          : "grid grid-cols-[2fr_1fr_.5fr]"
      }
            px-1`}
      style={{
        backgroundColor: selected ? fg0 : "transparent",
        color: selected ? bg0 : fg0,
      }}
    >
      <span className="nf">
        {network.connected ? `\udb80\udd2c ` : ""}
        {network.name}
      </span>

      <span>{network.security}</span>

      {type === "known" && (
        <>
          <span>{network.hidden}</span>
          <span>{network.autoConnect}</span>
        </>
      )}

      <span className="text-right">
        {network.signal}% {getSignalIcon(network.signal)}
      </span>
    </button>
  );
}

function getSignalIcon(signal) {
  if (signal >= 80) return "◆";
  if (signal >= 60) return "◈";
  if (signal >= 40) return "◇";
  return "◌";
}
