
import styles from "./InputRange.module.css";
import { useRange } from "./useRange";

export function InputRange({
  min, max, selectedFrom, selectedTo, step, onChange,
}: {
  min: number; max: number; selectedFrom: number; selectedTo: number; step: number; onChange: (from: number, to: number) => void;
}) {
  const { from, to, percentFrom, percentTo, 
    trackRef, decimalPlaces, handleDown 
  } = useRange({ min, max, selectedFrom, selectedTo, step, onChange });

  return (
    <div className={styles.wrapper}>
      <div className={styles.labels}>
        <span>{from.toFixed(decimalPlaces)}</span>
        <span>{to.toFixed(decimalPlaces)}</span>
      </div>

      <div className={styles.track} ref={trackRef}>
        <div className={styles.range} style={{ left: `${percentFrom}%`, right: `${100 - percentTo}%` }} />
        <div
          className={styles.thumb}
          style={{ left: `${percentFrom}%` }}
          onMouseDown={() => handleDown("left")}
          onTouchStart={() => handleDown("left")}
        />
        <div
          className={styles.thumb}
          style={{ left: `${percentTo}%` }}
          onMouseDown={() => handleDown("right")}
          onTouchStart={() => handleDown("right")}
        />
      </div>
    </div>
  );
}