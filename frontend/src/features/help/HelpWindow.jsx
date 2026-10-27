import { useConfig } from "../../contexts/ConfigContext";
import { KEYBINDS } from "../../core/keybinds/keybindDocs";

export default function HelpWindow() {
  const { config } = useConfig();
  const { bg1, bg2, bg3, fg0, fg1, accent } = config.colors;

  return (
    <div
      className="flex h-full w-full flex-col gap-2 overflow-y-auto p-3 font-mono text-xs"
      style={{ backgroundColor: bg1, color: fg0 }}
    >
      <p className="font-bold" style={{ color: accent }}>
        Atajos de teclado
      </p>

      {KEYBINDS.map((bind) => (
        <div
          key={bind.key}
          className="grid grid-cols-[130px_1fr] items-center gap-3 rounded-md px-2 py-1.5"
          style={{ backgroundColor: bg2 }}
        >
          <kbd
            className="rounded px-2 py-1 text-center text-[11px] font-bold"
            style={{
              color: accent,
              border: `1px solid ${accent}`,
              backgroundColor: bg3,
            }}
          >
            {bind.key}
          </kbd>
          <span style={{ color: fg1 }}>{bind.description}</span>
        </div>
      ))}
    </div>
  );
}
