import { useEffect, useState } from "react";
import { useConfig } from "../../contexts/ConfigContext";
import { hexToRgba } from "../../core/theme/buildConfig";

const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function LockScreen({ onUnlock }) {
  const { config } = useConfig();
  const { bg0, bg1, fg0, fg2 } = config.colors;

  const [time, setTime] = useState(() => new Date());
  const [visible, setVisible] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = TIME_FORMATTER.format(time);
  const detailedDate = DATE_FORMATTER.format(time);

  const handleUnlock = () => {
    if (isUnlocking) return;
    setIsUnlocking(true);
    setVisible(false);
  };

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return;
    if (isUnlocking) onUnlock();
  };

  return (
    <div
      className={`absolute inset-0 z-90 scale-110 overflow-hidden transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
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

      <div className="relative flex h-full w-full flex-col items-center justify-between">
        <div className="py-30">
          <p className="w-full">
            <span className="text-center text-6xl opacity-90 lg:text-8xl">
              {formattedTime}
            </span>
          </p>
          <p className="mt-6 text-center text-xl opacity-90 lg:text-2xl">
            {detailedDate}
          </p>
        </div>

        <div className="flex h-full w-full flex-col items-center">
          <input
            className="w-2/8 rounded-full p-2 outline-none lg:w-2/8"
            style={{ backgroundColor: bg0, color: fg0 }}
            readOnly
            value="Password"
            type="password"
          />
          <button
            className="mt-8 w-2/9 cursor-pointer rounded-xl p-1 hover:opacity-80 lg:w-2/9"
            style={{ backgroundColor: fg0, color: bg1 }}
            onClick={handleUnlock}
          >
            <span className="font-bold opacity-90">Click to unlock</span>
          </button>
        </div>
      </div>
    </div>
  );
}
