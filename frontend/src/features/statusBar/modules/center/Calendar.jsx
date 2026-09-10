import { useState, useMemo } from "react";
import { useConfig } from "../../../../contexts/ConfigContext";

export function Calendar() {
  const { config } = useConfig();
  const { bg0, bg1, bg3, fg0, fg1, fg2, accent } = config.colors;

  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const cells = useMemo(() => {
    const totalCells = 42;
    const days = [];

    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = startOffset; i > 0; i--) {
      days.push({ day: daysInPrevMonth - i + 1, monthOffset: - 1 });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, monthOffset: 0 });
    }

    let nextDay = 1;
    while (days.length < totalCells) {
      days.push({ day: nextDay++, monthOffset: 1 });
    }

    return days;
  }, [firstDay, daysInMonth, daysInPrevMonth]);

  const goPrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };
  const goNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const monthName = viewDate.toLocaleDateString("us-EN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        backgroundColor: bg1,
        color: fg0,
        borderRadius: "8px",
        padding: "12px",
        width: "280px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={goPrevMonth}
          style={{
            color: fg0,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ←
        </button>
        <span style={{ fontWeight: 600, fontSize: "14px" }}>{monthName}</span>
        <button
          onClick={goNextMonth}
          style={{
            color: fg0,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          →
        </button>
      </div>

      <div
        className="grid grid-cols-7 gap-1 text-center text-xs mb-1"
        style={{ color: fg0 }}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
          <div key={idx} style={{ padding: "4px 0" }}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          const isCurrentMonth = cell.monthOffset === 0;
          const isTodayCell = isCurrentMonth && isToday(cell.day);
          return (
            <div
              key={idx}
              style={{
                textAlign: "center",
                padding: "4px 0",
                fontSize: "13px",
                borderRadius: "4px",
                backgroundColor: isTodayCell ? accent : "transparent",
                color: isTodayCell ? bg0 : isCurrentMonth ? fg0 : fg2,
                cursor: "default",
              }}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
