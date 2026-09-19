import { useEffect, useState } from "react";
import { useConfig } from "../../contexts/ConfigContext";

export function LockScreen({ onUnlock }) {
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const { config } = useConfig();
  const { bg0, bg1, fg0, fg1, fg2 } = config.colors;

  const [time, setTime] = useState(new Date());
  const [visible, setVisible] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const detailedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const handleUnlock = () => {
    if (isUnlocking) return;
    setIsUnlocking(true);
    setVisible(false);
  };

  const handleTransitionEnd = () => {
    console.log("trAnsition end");
    if (isUnlocking) onUnlock();
  };

  return (
    <div
      className={`absolute inset-0 scale-110 z-50 overflow-hidden transition-opacity duration-300 ease-out ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className="absolute inset-0 scale-110 blur-[10px]"
        style={{
          backgroundImage: `url(${config.wallpaper.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="absolute inset-0"
        style={{ backgroundColor: hexToRgba(fg2, 0.1) }}
      />

      <div className="relative flex flex-col items-center justify-between h-full w-full">
        <div className="py-30">
          <p className="w-full">
            <span className="text-6xl lg:text-8xl text-center opacity-90">
              {formattedTime}
            </span>
          </p>
          <p className="mt-6 text-center text-xl lg:text-2xl opacity-90">
            {detailedDate}
          </p>
        </div>
        <div className="w-full h-full flex flex-col items-center">
          <input
            className="w-1/7 p-2 rounded-full outline-none"
            style={{
              backgroundColor: bg0,
              color: fg0,
            }}
            readOnly
            value="Password"
            type="password"
          />
          <button
            className="w-1/8 rounded-xl mt-8 p-1 hover:opacity-80"
            style={{
              backgroundColor: fg0,
              color: bg1,
            }}
            onClick={handleUnlock}
          >
            <span
              className="
          opacity-90 font-bold"
            >
              Click to unlock
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
