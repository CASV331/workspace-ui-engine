import { useEffect, useState } from "react";
import { useConfig } from "../../../../contexts/ConfigContext";
import { Calendar } from "./Calendar";

const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function Clock() {
  const { config } = useConfig();
  const { bg0, bg1, bg3, fg0, fg2 } = config.colors;

  const [time, setTime] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = TIME_FORMATTER.format(time);
  const detailedDate = DATE_FORMATTER.format(time);

  return (
    <>
      <div
        className="cursor-pointer rounded-lg text-center font-bold"
        style={{ backgroundColor: bg3, padding: "4px 14px" }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowCalendar((previous) => !previous)}
      >
        {formattedTime}
      </div>

      {showTooltip && (
        <div
          className="absolute top-full z-20 mt-2 rounded-md px-3 py-2 text-sm"
          style={{
            backgroundColor: bg0,
            color: fg0,
            boxShadow: `0 2px 8px ${bg0}`,
            whiteSpace: "nowrap",
          }}
        >
          {detailedDate}
        </div>
      )}

      {showCalendar && (
        <div
          className="absolute top-full z-30 mt-2 rounded-lg p-4"
          style={{
            backgroundColor: bg1,
            color: fg0,
            border: `1px solid ${fg2}`,
            boxShadow: `0 4px 12px ${bg0}`,
          }}
          onClick={(event) => event.stopPropagation()}
          onMouseLeave={() => setShowCalendar(false)}
        >
          <Calendar />
        </div>
      )}
    </>
  );
}
