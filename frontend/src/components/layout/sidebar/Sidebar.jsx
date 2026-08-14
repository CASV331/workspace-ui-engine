import { useState } from "react";
import SectionButton from "../../ui/button/SectionButton";
// import StatusBarConfig from "../../preview/DeComponents/statusBar/StatusBar_config";
// import TerminalConfig from "../../preview/DeComponents/terminal/Terminal_config";

function Sidebar() {

  const [active, setActive] = useState(true);

  return (
    <aside className="sidebar flex-1">
      <nav className="sidebar__nav">
        <ul className="flex flex-col gap-2">
                <SectionButton isActive={active} onClick={() => setActive(!active)}>
                  {/* <Component /> */}
                </SectionButton>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;