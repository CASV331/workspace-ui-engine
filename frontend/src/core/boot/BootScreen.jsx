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
      className={`absolute inset-0 z-10 flex items-center justify-center cursor-none`}
      style={{
        backgroundColor: "#000000"
      }}
    >
        
        <img src="assets/bootanimation.gif" className="w-full h-full object-cover" />
    </div>
  );
}