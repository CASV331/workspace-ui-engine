import { useEffect, useState } from "react";
import { useConfig } from "../../contexts/ConfigContext.jsx"; // opcional para colores

export default function BootScreen({ onFinish }) {
  const { config } = useConfig();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Tiempo total de la animación de boot (antes de iniciar fade-out)
    const bootTimer = setTimeout(() => setFadeOut(true), 5000);
    // Tiempo para desmontar completamente (después del fade-out)
    const unmountTimer = setTimeout(() => onFinish(), 5500);

    return () => {
      clearTimeout(bootTimer);
      clearTimeout(unmountTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`boot-screen ${fadeOut ? "boot-screen--fade-out" : ""} absolute inset-0 z-10 flex items-center justify-center cursor-none`}
      style={{
        backgroundColor: config.colors.background,
        color: config.colors.onBackground,
      }}
    >
      <div className="flex flex-col justify-center boot-content items-center text-center">
        
        <img src="arch-linux-svgrepo-com.svg" alt="Arch linux logo" className="w-56 animate-pulse" />
        <p className="font-bold">Iniciando entorno...</p>
        <div className="boot-progress">
          <div className="boot-progress-bar" style={{backgroundColor: config.colors.primary}}/>
        </div>
      </div>
    </div>
  );
}