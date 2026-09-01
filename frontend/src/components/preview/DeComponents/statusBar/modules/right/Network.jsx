import { useConfig } from "../../../../../../contexts/ConfigContext";
import { BarIcon } from "../shared/BarIcon";

export function Network() {
  const { config } = useConfig();
  const { bg0, bg1, bg2, bg3, fg0, fg1, fg2, accent } = config.colors;

  return (
    <div
      className="flex items-center gap-1 rounded-lg"
      style={{
        backgroundColor: bg3,
        padding: "4px 14px",
      }}
    >
      <BarIcon>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </BarIcon>
      100%
    </div>
  );
}
