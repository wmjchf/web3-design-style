import React, { FC } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ComponentList } from "./components/ComponentList";
import { CanvasRender } from "./components/CanvasRender";
import styles from "./index.less";

interface IEditor {
  children?: React.ReactNode;
}
export const EditorLayout: FC<IEditor> = () => {
  return (
    <div className={styles.editor}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.editor__container}>
          <ComponentList canvasId="abc"></ComponentList>
          <CanvasRender></CanvasRender>
        </div>
      </DndProvider>
    </div>
  );
};
