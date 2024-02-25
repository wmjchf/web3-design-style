import React, { useMemo, memo, ReactNode, CSSProperties } from "react";
import { useDrag } from "react-dnd";
import schema from "@/materials/schema";
import { ITemplate } from "@/materials/common";
import styles from "./index.less";


interface TargetBoxProps {
  item: ITemplate;
  children: ReactNode;
  canvasId: string;
}

export const SourceBox = memo((props: TargetBoxProps) => {
  const { item } = props;

  const [{ isDragging }, drag] = useDrag({
    type:"box",
    item: {
      type: item.type,
      config: schema[item.type as keyof typeof schema].config,
      h: item.h,
      editableEl: schema[item.type as keyof typeof schema].editData,
      category: item.category,
      x: item.x || 0,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const containerStyle: CSSProperties = useMemo(
    () => ({
      opacity: isDragging ? 0.4 : 1,
      cursor: "move",
      height: "140px",
    }),
    [isDragging]
  );
  return (
    <>
      <div className={styles.source__box}>
        <div className={styles.module} style={{ ...containerStyle }} ref={drag}>
          <div className={styles.temp}>{props.children}</div>
          <div className={styles.name}>{props.item.displayName}</div>
        </div>
      </div>
    </>
  );
});
