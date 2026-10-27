import { useConfig } from "../../contexts/ConfigContext";

export function Welcome() {
  const { config } = useConfig();
  const { bg0, fg0, fg1, accent } = config.colors;
  const { fontSize } = config.window;
  return (
    <div className="flex-1 flex gap-4 terminal ">
      <div
        className="flex-1 flex p-3"
        style={{
          backgroundColor: bg0,
          color: fg0,
          fontSize: `${fontSize}px`,
        }}
      >
        <div style={{ color: fg1 }}>
          <div className="font-mono space-y-1" style={{ color: accent }}>
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
