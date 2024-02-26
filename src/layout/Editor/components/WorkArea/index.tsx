import React, { useRef, useMemo, useState, useContext } from "react";
import { useThrottledCallback } from "use-debounce";
import { Calibration } from "@/components/Calibration";
import { TargetBox } from "../TargetBox";
import { Context } from "../../context";
import styles from "./index.less";

export const WorkArea = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasId, allType } = useContext(Context);
  const [scaleNum, setScale] = useState(1);
  const [dragstate, setDragState] = useState({ x: 0, y: 0 });
  const [diffmove, setDiffMove] = useState({
    start: { x: 0, y: 0 },
    move: false,
  });

  const mousedownfn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === containerRef.current) {
        setDiffMove({
          start: {
            x: e.clientX,
            y: e.clientY,
          },
          move: true,
        });
      }
    };
  }, []);

  const mousemovefn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (diffmove.move) {
        let diffx: number = 0;
        let diffy: number = 0;
        const newX = e.clientX;
        const newY = e.clientY;
        diffx = newX - diffmove.start.x;
        diffy = newY - diffmove.start.y;
        setDiffMove({
          start: {
            x: newX,
            y: newY,
          },
          move: true,
        });

        setDragState((prev) => {
          return {
            x: prev.x + diffx,
            y: prev.y + diffy,
          };
        });
      }
    };
  }, [diffmove.move, diffmove.start.x, diffmove.start.y]);

  const mouseupfn = useMemo(() => {
    return () => {
      setDiffMove({
        start: { x: 0, y: 0 },
        move: false,
      });
    };
  }, []);

  const onwheelFn = useMemo(() => {
    return (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY < 0) {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y + 40,
        }));
      } else {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y - 40,
        }));
      }
    };
  }, []);

  const throttleMove = useThrottledCallback(mousemovefn, 0);

  return (
    <div
      className={styles.tickMark}
      id="calibration"
      ref={containerRef}
      onMouseDown={mousedownfn}
      onMouseMove={throttleMove}
      onMouseUp={mouseupfn}
      onMouseLeave={mouseupfn}
      onWheel={onwheelFn}
    >
      <div className={styles.tickMarkTop}>
        <Calibration direction="up" id="calibrationUp" multiple={scaleNum} />
      </div>
      <div className={styles.tickMarkLeft}>
        <Calibration
          direction="right"
          id="calibrationRight"
          multiple={scaleNum}
        />
      </div>
      <TargetBox
        dragState={dragstate}
        setDragState={setDragState}
        scaleNum={scaleNum}
        canvasId={canvasId}
        allType={allType}
      />
    </div>
  );
};
