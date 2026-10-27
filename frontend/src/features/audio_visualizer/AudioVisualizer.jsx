import { useEffect, useMemo, useRef } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import { useConfig } from "../../contexts/ConfigContext";

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

export function AudioVisualizer() {
  const { analyserRef, playerState } = usePlayer();
  const { config } = useConfig();
  const { fg0, fg1 } = config.colors;
  const { isPlaying } = playerState;

  const canvasRef = useRef(null);
  const dprRef = useRef(1);

  const colorLut = useMemo(
    () =>
      Array.from({ length: 32 }, (_, index) =>
        interpolateColor(fg1, fg0, index / 31),
      ),
    [fg0, fg1],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const dpr = window.devicePixelRatio || 1;
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        dprRef.current = dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;

    const getSize = () => {
      const dpr = dprRef.current || 1;
      return { width: canvas.width / dpr, height: canvas.height / dpr };
    };

    const drawFlatLine = () => {
      const { width, height } = getSize();
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = fg1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };

    if (!isPlaying || !analyser) {
      drawFlatLine();
      return;
    }

    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;

    const draw = () => {
      frame = requestAnimationFrame(draw);

      const { width, height } = getSize();
      ctx.clearRect(0, 0, width, height);

      analyser.getByteFrequencyData(data);

      const barWidth = width / data.length;
      for (let index = 0; index < data.length; index += 1) {
        const value = data[index];
        const barHeight = (value / 255) * height;
        const colorIndex = Math.min(
          colorLut.length - 1,
          Math.floor((value / 255) * colorLut.length),
        );

        ctx.fillStyle = colorLut[colorIndex];
        ctx.fillRect(
          index * barWidth,
          height - barHeight,
          Math.max(1, barWidth - 1),
          barHeight,
        );
      }
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, [analyserRef, colorLut, fg1, isPlaying]);

  return (
    <div
      className="flex h-full flex-1 flex-col"
      style={{ backgroundColor: "transparent" }}
    >
      <canvas ref={canvasRef} className="h-full w-full flex-1" />
    </div>
  );
}
