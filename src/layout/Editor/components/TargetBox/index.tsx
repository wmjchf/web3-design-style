import React from "react";
import { useDrop } from "react-dnd";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import styles from "./index.less";

interface ITargetBox {
  scaleNum: number;
  setDragState: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  dragState: { x: number; y: number };
  canvasId: string;
  allType: string[];
}
export const TargetBox: React.FC<ITargetBox> = (prop) => {
  const { scaleNum, dragState, canvasId, allType } = prop;
  const [{ isOver }, drop] = useDrop({
    accept: allType,
    drop: () => {},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });
  const opacity = isOver ? 0.7 : 1;
  return (
    <>
      <Draggable position={dragState}>
        <div className={styles.canvasBox}>
          <div
            style={{
              transform: `scale(${scaleNum})`,
            }}
            className={styles.canvasWrap}
          >
            <div
              id={canvasId}
              className={styles.canvas}
              style={{
                opacity,
              }}
              ref={drop}
            >
              {/* {pointData.length > 0 ? (
                <ViewRender
                  pointData={pointData}
                  width={canvasRect[0] || 0}
                  dragStop={dragStop}
                  onDragStart={onDragStart}
                  onResizeStop={onResizeStop}
                />
              ) : null} */}
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
};
