import React, { FC } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ComponentList } from "./components/ComponentList";
import styles from "./index.less";

interface IEditor {
  children?: React.ReactNode;
}
export const EditorLayout: FC<IEditor> = () => {
  return (
    <div className={styles.editor}>
      <DndProvider backend={HTML5Backend}>
        <ComponentList canvasId="abc"></ComponentList>
      </DndProvider>
    </div>
  );
};
