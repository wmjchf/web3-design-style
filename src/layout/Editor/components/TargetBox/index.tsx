import React, { useContext, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import Draggable from "react-draggable";
import { ViewRender } from "@/core/Render/ViewRender";
import { IDragItem } from "../../type";
import { Context } from "../../context";
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

  const { dispatch, state } = useContext(Context);
  const [canvasRect, setCanvasRect] = useState<number[]>([]);
  const [{ isOver }, drop] = useDrop({
    accept: allType,
    drop: (item: IDragItem, monitor) => {
      const parentDiv = document.getElementById(canvasId);
      const pointRect = parentDiv!.getBoundingClientRect();
      const top = pointRect.top;
      const left = pointRect.left;
      const pointEnd = monitor.getSourceClientOffset();
      const y = pointEnd!.y < top ? 0 : pointEnd!.y - top;
      const x = pointEnd!.x < left ? 0 : pointEnd!.x - left;
      // const cellHeight = 2;
      // const w = item.type === "Icon" ? 3 : col;
      // 转换成网格规则的坐标和大小
      // const gridY = Math.ceil(y / cellHeight);

      dispatch({
        type: "addPointData",
        payload: {
          id: uuidv4(),
          item,
          point: {
            i: `x-${state.pointData.length}`,
            x,
            y,
            w: item.w,
            h: item.h,
            isBounded: true,
            hAuto: item.hAuto,
          },
          status: "inToCanvas",
        },
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  useEffect(() => {
    const { width, height } = document
      .getElementById(canvasId)!
      .getBoundingClientRect();
    setCanvasRect([width, height]);
  }, [canvasId]);

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
              {state.pointData.length > 0 ? (
                <ViewRender
                  pointData={state.pointData}
                  width={canvasRect[0] || 0}
                  // dragStop={dragStop}
                  // onDragStart={onDragStart}
                  // onResizeStop={onResizeStop}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
};
