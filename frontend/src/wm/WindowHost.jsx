import { memo, Suspense } from "react";
import { APP_REGISTRY } from "../core/apps/registry";
import { useDesktopActions } from "../contexts/DesktopContext";
import { Window } from "./Window";
import { WindowErrorBoundary } from "./WindowErrorBoundary";

export const WindowHost = memo(function WindowHost({
  id,
  type,
  x,
  y,
  width,
  height,
  isFocused,
  isFloating,
  animationState,
}) {
  const { closeFocusedWindow } = useDesktopActions();
  const App = APP_REGISTRY[type];

  return (
    <Window
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      isFocused={isFocused}
      isFloating={isFloating}
      animationState={animationState}
    >
      <WindowErrorBoundary onClose={() => closeFocusedWindow(id)}>
        <Suspense
          fallback={
            <div className="p-3 font-mono text-xs opacity-60">Cargando…</div>
          }
        >
          {App ? (
            <App />
          ) : (
            <div className="p-3 font-mono text-xs opacity-60">
              Aplicación desconocida: {type}
            </div>
          )}
        </Suspense>
      </WindowErrorBoundary>
    </Window>
  );
});
