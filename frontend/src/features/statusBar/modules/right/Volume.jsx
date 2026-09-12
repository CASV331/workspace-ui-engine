import { useState } from "react";
import { usePlayer } from "../../../../contexts/PlayerContext";
import { useConfig } from "../../../../contexts/ConfigContext";
import { BarIcon } from "../../shared/BarIcon";
import { SoundPanel } from "../panels/SoundPanel";

export function Volume() {
  const { config } = useConfig();
  const { bg0, bg1, bg2, bg3, fg0, fg1, fg2, accent } = config.colors;
  const { playerState, setVolume } = usePlayer()
  const { volume } = playerState
  const [showPanel, setShowPanel] = useState(false);
  
  return (
    <>
    <div
      className="flex items-center gap-1 rounded-lg cursor-pointer"
      style={{
        backgroundColor: bg3,
        padding: "4px 14px",
      }}
      onClick={() => setShowPanel((prev) => !prev)}
    >
      <BarIcon>
        <svg
          fill={`${fg0}`}
          viewBox="0 -2 36 36"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>volume1</title>{" "}
            <path d="M23.67 10.583l-0.99 2.019c0.947 0.812 1.547 2.017 1.547 3.361 0 1.482-0.336 2.822-1.453 3.626l0.957 1.707c1.461-1.311 2.381-3.213 2.381-5.331-0.001-2.145-0.946-4.071-2.442-5.382zM31.018 3.513l-1.393 1.69c2.598 2.836 4.242 6.615 4.242 10.764 0 4.142-1.641 7.916-4.23 10.751l1.391 1.725c2.963-3.336 4.758-7.648 4.758-12.476-0.001-4.815-1.819-9.12-4.768-12.454zM27.322 6.966l-1.24 1.783c1.842 1.85 3.010 4.4 3.010 7.217 0 2.874-1.215 5.469-3.123 7.329l1.289 1.711c2.305-2.354 3.693-5.484 3.693-9.039 0-3.489-1.398-6.658-3.629-9.001zM0 12.007v8.090c0 1.031 0.896 2.354 2 2.354h6.027v-12.939h-6.027c-1.104 0-2 1.465-2 2.495zM17.341 3.619l-8.381 5.777v13.25l8.381 5.84c1.104 0 2.688-0.836 2.688-1.867v-21.133c0-1.031-1.584-1.867-2.688-1.867z"></path>{" "}
          </g>
        </svg>
      </BarIcon>
      {`${Math.round(volume * 100)}%`}
    </div>
    {showPanel && (
            <div
              className="absolute top-full mt-2 p-4 rounded-lg z-30"
              style={{
                backgroundColor: bg1,
                color: fg0,
                border: `1px solid ${fg2}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseLeave={() => setShowPanel((prev) => !prev)}
            >
              <SoundPanel />
            </div>
          )}
    </>
  );
}
