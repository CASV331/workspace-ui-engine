import { useConfig } from "../../contexts/ConfigContext";

export function Terminal() {
  const { config } = useConfig();
  const { fg0, fg1, accent } = config.colors;
  return (
    <div className="flex-1 flex gap-4 terminal text-xs">
      <div
        className="flex-1 flex p-3"
        style={{
          backgroundColor: "transparent",
          color: fg0,
        }}
      >
        <div style={{ color: fg1 }}>
          <div className="font-mono space-y-1 flex items-start">
            <pre style={{ color: accent }}>
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
                <span style={{ color: fg0 }}>cavs@WMSim</span>
                <span>----------</span>
              </p>
              <p style={{ color: fg1 }}>OS: I use <span className="nf">{"\udb82\udcc7"}</span> BTW</p>
              <p style={{ color: fg1 }}>WM: Made in <span className="nf">{"\ue7ba"}</span> with <span className="nf">{"\ueb05"}</span></p>
              <p style={{ color: fg1 }}>Terminal: Foot</p>
              <p style={{ color: fg1 }}>Packages: More than 1</p>
              <p style={{ color: fg1 }}>WM: Window Manager</p>
              <p style={{ color: fg1 }}>Terminal: Foot</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
