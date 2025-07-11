import { useRef, useState } from "react";

export function useRange ({
  min, max, selectedFrom, selectedTo, step, onChange,
}: {
  min: number; max: number; selectedFrom: number; selectedTo: number; step: number; onChange: (from: number, to: number) => void;
}) {
  const [from, setFrom] = useState(selectedFrom);
  const [to, setTo] = useState(selectedTo);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"left" | "right" | null>(null);

  function getDecimalPlaces(num: number): number {
    const parts = num.toString().split(".");
    return parts[1]?.length || 0;
  }

  const decimalPlaces = getDecimalPlaces(step);

  const getValueFromPosition = (x: number) => {
    const track = trackRef.current;
    if (!track) return min;

    const rect = track.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    const value = min + percent * (max - min);
    return Math.round(value / step) * step;
  };

  const handleDown = (type: "left" | "right") => {
    dragging.current = type;

    let currentFrom = from;
    let currentTo = to;

    const handleMove = (event: MouseEvent | TouchEvent) => {
      const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
      const value = getValueFromPosition(clientX);

      if (type === "left") {
        currentFrom = Math.min(value, to - step);
        setFrom(currentFrom);
      } else {
        currentTo = Math.max(value, from + step);
        setTo(currentTo);
      }
    };

    const handleUp = () => {
      dragging.current = null;
      onChange(currentFrom, currentTo);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleUp);
  };

  const percentFrom = ((from - min) / (max - min)) * 100;
  const percentTo = ((to - min) / (max - min)) * 100;

  return {
    from,
    to,
    percentFrom,
    percentTo,
    trackRef,
    decimalPlaces,
    handleDown,
  }
}