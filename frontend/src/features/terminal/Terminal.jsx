import { useConfig } from "../../contexts/ConfigContext";

export function Terminal() {
  const { config } = useConfig();
  const {
    background,
    backgroundOpacity,
    borderColor,
    borderOpacity,
    borderWidth,
    textColor,
    fontSize,
  } = config.window;
  return (
    <div className="flex-1 flex gap-4 terminal text-xs">
      <div
        className="flex-1 flex p-3"
        style={{
          backgroundColor: "transparent",
          // border: `${borderWidth}px solid ${borderColorRgba}`,
          color: textColor,
        }}
      >
        <div className=" text-gray-300">
          <div className="font-mono space-y-1 flex items-start">
            <pre style={{color: textColor}}>
              {`                  ##
                 ####
                ######
               ########
              ##########
             ############
            ##############
           ################
          ##################
         ####################
        ######################
       #########      #########
      ##########      ##########
     ###########      ###########
    ##########          ##########
   #######                  #######
  ####                          ####
 ###                              ###`}
            </pre>
            <div className="" style={{ fontFamily: "Jetbrains Mono, monospace"}}>
              <p>
                <span style={{color: textColor }}>cavs@WMSim</span>
                <span>----------</span>
              </p>
              <p className="text-gray-300">OS: I use <span className="nf">{"\udb82\udcc7"}</span> BTW</p>
              <p className="text-gray-300">WM: Made in <span className="nf">{"\ue7ba"}</span> with <span className="nf">{"\ueb05"}</span></p>
              <p className="text-gray-300">Terminal: Foot</p>
              <p className="text-gray-300">Packages: More than 1</p>
              <p className="text-gray-300">WM: Window Manager</p>
              <p className="text-gray-300">Terminal: Foot</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
