// components/apps/AudioVisualizer.jsx
import { useEffect, useRef, useMemo } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import { useConfig } from "../../contexts/ConfigContext";

const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export function AudioVisualizer() {
  const { analyserRef, playerState, currentSong } = usePlayer();
  const { config } = useConfig();
  const { primary, surface, outline, background } = config.colors;
  const { backgroundOpacity } = config.terminal;

  const bgColor = useMemo(
    () => hexToRgba(background, backgroundOpacity),
    [background, backgroundOpacity],
  );
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if(!canvas || !container) return;

      const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;

      // Limpia el canvas
      // ctx.fillStyle = bgColor
      // ctx.fillRect(0, 0, width, height)
      ctx.clearRect(0, 0, width, height);

      if (!analyser) {
        // Sin analyser dibuja línea plana
        ctx.strokeStyle = outline;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount; // 128
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = width / bufferLength;
      let x = 0;

      dataArray.forEach((value) => {
        const barHeight = (value / 355) * height;

        // Gradiente de color según la altura
        const intensity = value / 255;
        ctx.fillStyle = interpolateColor(outline, primary, intensity);

        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      });
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyserRef.current, primary, surface, outline, bgColor]);

  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: bgColor }}
      ref={containerRef}
    >
      {/* Header estilo terminal
      <div
        className="flex justify-between items-center px-3 py-1 font-mono text-xs border-b"
        style={{ color: outline, borderColor: outline }}
      >
        <span>cava</span>
        <span style={{ color: primary }}>{currentSong?.name ?? "no track"}</span>
        <span>{playerState.isPlaying ? "▶ playing" : "⏸ paused"}</span>
      </div> */}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full h-full"
        width={600}
        height={300}
      />
    </div>
  );
}

// Interpola entre dos colores hex según intensidad 0-1
function interpolateColor(color1, color2, factor) {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}
