import React, { FC, useMemo } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import template from "@/materials/base/template";
import { ComponentList } from "./components/ComponentList";
import { WorkArea } from "./components/WorkArea";
import { Context } from "./context";
import styles from "./index.less";

interface IEditor {
  children?: React.ReactNode;
}

export const EditorLayout: FC<IEditor> = () => {
  const allTemplateType = useMemo(() => {
    const arr: string[] = [];
    template.forEach((v) => {
      arr.push(v.type);
    });
    return arr;
  }, [template]);

  return (
    <div className={styles.editor}>
      <DndProvider backend={HTML5Backend}>
        <Context.Provider
          value={{
            allType: allTemplateType,
            canvasId: "abc",
          }}
        >
          <div className={styles.editor__container}>
            <ComponentList></ComponentList>
            <WorkArea></WorkArea>
          </div>
        </Context.Provider>
      </DndProvider>
    </div>
  );
};
