import { useEffect, useState } from "react";
import { useConfig } from "../../../../contexts/ConfigContext";
import { BarIcon } from "../../shared/BarIcon";
import { Calendar } from "./Calendar";

export function Clock() {
  const { config } = useConfig();
  const { bg0, bg1, bg2, bg3, fg0, fg1, fg2, accent } = config.colors;

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [showTooltip, setShowTooltip] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const detailedDate = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
  return (
    <>
      <div
        className="text-center rounded-lg font-bold cursor-pointer"
        style={{
          backgroundColor: bg3,
          padding: "4px 14px",
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowCalendar((prev) => !prev)}
      >
        {formattedTime}
      </div>
      {showTooltip && (
        <div
          className="absolute top-full mt-2 px-3 py-2 rounded-md text-sm z-20"
          style={{
            backgroundColor: bg0,
            color: fg0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          {detailedDate}
        </div>
      )}

      {showCalendar && (
        <div
          className="absolute top-full mt-2 p-4 rounded-lg z-30"
          style={{
            backgroundColor: bg1,
            color: fg0,
            border: `1px solid ${fg2}`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={() => setShowCalendar((prev) => !prev)}
        >
          <Calendar />
        </div>
      )}
    </>
  );
}
