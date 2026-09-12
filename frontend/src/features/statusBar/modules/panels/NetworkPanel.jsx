import { useState, useMemo, useEffect, useRef } from "react";
import { useConfig } from "../../../../contexts/ConfigContext";
import { useNetwork } from "../../../../contexts/NetworkContext";

export function NetworkPanel({ state, change, isOpen, onClose }) {
  const { config, openWindow } = useConfig();
  const { networkState, toggleWifi } = useNetwork();

  const { bg0, bg1, bg3, fg0, fg1, fg2, accent } = config.colors;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  const { wifiEnabled, connected, ssid, localIp } = networkState;

  return (
    <div
      className="flex flex-col gap-3"
      style={{
        backgroundColor: bg1,
        color: fg0,
        borderRadius: "8px",
        padding: "12px",
        width: "280px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold">Wi-Fi</span>

          <span className="text-xs" style={{ color: fg1 }}>
            {!wifiEnabled
              ? "Disabled"
              : connected
                ? "Connected"
                : "Disconnected"}
          </span>
        </div>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={wifiEnabled}
            onChange={toggleWifi}
          />

          <div
            className="h-6 w-11 rounded-full transition-colors peer-focus:outline-none"
            style={{
              backgroundColor: wifiEnabled ? accent : bg3,
            }}
          >
            <div
              className="absolute top-0.5 h-5 w-5 rounded-full transition-transform"
              style={{
                backgroundColor: fg0,
                transform: wifiEnabled ? "translateX(22px)" : "translateX(2px)",
              }}
            />
          </div>
        </label>
      </div>

      <div
        className="flex flex-col gap-2 rounded-md p-3"
        style={{ backgroundColor: bg3 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: fg1 }}>
            SSID
          </span>

          <span className="font-medium">
            {wifiEnabled && connected ? ssid : "Not connected"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: fg1 }}>
            Local IP
          </span>

          <span className="font-mono text-xs">{wifiEnabled && connected ? localIp : "-"}</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
        style={{
          backgroundColor: accent,
          color: bg1,
        }}
        onClick={() => openWindow("networkManager")}
      >
        More
      </button>
    </div>
  );
}
