import { useConfig } from "../../../../contexts/ConfigContext";
import { Volume } from "./modules/right/Volume";
import { Network } from "./modules/right/Network";
import { Battery } from "./modules/right/ Battery";
import { Power } from "./modules/right/power";
import { Clock } from "./modules/center/Clock";
import { Workspaces } from "./modules/left/Workspaces";

export function StatusBar() {
  const { config } = useConfig()
  const { bg0, bg1, bg2, bg3, fg0, fg1, fg2, accent } = config.colors;

  return (
    <div className="items-center max-h-9 p-1">
      <div
        className="flex items-center rounded-lg"
        style={{
          backgroundColor: bg0,
          color: fg0,
          fontSize: `11px`,
        }}
      >
        <div className="flex flex-1 justify-start items-center px-2">
          <Workspaces/>
        </div>

        <div className="relative flex flex-1 justify-center items-center">
          <Clock/>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <div className=" relative flex flex-1 items-center justify-end gap-4">
            <Network/>
            <Volume/>
            <Battery/>
            <Power/>
          </div>
        </div>
      </div>
    </div>
  );
}
