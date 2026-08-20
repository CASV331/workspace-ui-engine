import { useConfig } from "../../contexts/ConfigContext";

export function Welcome() {
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
    <div className="flex-1 flex gap-4 terminal ">
      <div
        className="flex-1 flex p-3"
        style={{
          backgroundColor: background,
          // border: `${borderWidth}px solid ${borderColorRgba}`,
          color: textColor,
          fontSize: `${fontSize}px`,
        }}
      >
        <div className=" text-gray-300">
          <div className="font-mono text-green-400/90 space-y-1">
          <h1 className="font-bold text-2xl">Welcome to my Window Manager simulator</h1>
          <p>I made this proyect because I like the experience of using a window manger environment on linux</p>
          <p>and I think this proyect can help to increase the ammount of linux and WM users</p>
          <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}
