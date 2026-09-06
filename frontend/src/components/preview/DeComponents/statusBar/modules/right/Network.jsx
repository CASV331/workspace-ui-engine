import { useState } from "react";
import { useConfig } from "../../../../../../contexts/ConfigContext";
import { BarIcon } from "../shared/BarIcon";
import { NetworkPanel } from "./panels/NetworkPanel";

export function Network() {
  const { config } = useConfig();
  const { bg0, bg1, bg2, bg3, fg0, fg1, fg2, accent } = config.colors;

  const [showPanel, setShowPanel] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [net, setNet] = useState(true);
  const [dmenuOpen, setDmenuOpen] = useState(false);


  return (
    <>
      <div
        className="flex justify-center items-center gap-1 rounded-lg cursor-pointer"
        style={{
          backgroundColor: bg3,
          padding: "4px 14px",
        }}
        onClick={() => setShowPanel((prev) => !prev)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <BarIcon>
          {net ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
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
                <path
                  d="M22 7.43643C21.6134 7.14433 17.7646 4 12 4C6.2268 4 2.3866 7.14433 2 7.43643L12 19.8935L22 7.43643Z"
                  fill={`${fg0}`}
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke={`${fg0}`}
              stroke-width="0.00024000000000000003"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="0.048"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.96973 5.03039L18.9697 20.0304L20.0304 18.9697L5.03039 3.96973L3.96973 5.03039ZM2.92454 9.67478C3.71079 8.88852 4.57369 8.2256 5.48917 7.68602L6.58987 8.78672C5.86769 9.17925 5.17917 9.65606 4.53875 10.2172L11.9999 17.5283L13.6826 15.8795L14.7433 16.9402L11.9999 19.6284L2.38879 10.2105L2.92454 9.67478ZM19.4611 10.2172L15.8255 13.7797L16.8862 14.8404L21.611 10.2105L21.0753 9.67478C17.6588 6.25827 12.7953 5.17059 8.45752 6.41173L9.69662 7.65083C13.0757 6.95288 16.7117 7.80832 19.4611 10.2172Z"
                  fill={`${fg0}`}
                ></path>{" "}
              </g>
            </svg>
          )}
        </BarIcon>
        <p>{net ? "100%" : "Off"}</p>
        {showTooltip && (
          <div
            className=" items-center absolute top-full mt-2 px-3 py-2 rounded-md text-sm z-20"
            style={{
              backgroundColor: bg0,
              color: fg0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            <p>SSID Name</p>
          </div>
        )}
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
          <NetworkPanel state={net} change={setNet} isOpen={dmenuOpen} onClose={() => setDmenuOpen(false)} />
        </div>
      )}
    </>
  );
}
