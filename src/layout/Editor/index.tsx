import React, { FC, useMemo, useCallback, useReducer, useRef } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import template from "@/materials/base/template";
import { ComponentList } from "./components/ComponentList";
import { WorkArea } from "./components/WorkArea";
import { Header } from "./components/Header";
import { RightSetting, IRightSettingRef } from "./components/RightSetting";
import { Context, IState, initStata } from "./context";
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

  const reducer = useCallback(
    (
      state: IState,
      action: {
        type: string;
        payload?: Partial<IState>;
      }
    ) => {
      const { type, payload } = action;

      switch (type) {
        default:
          return state;
        case "addPointData": {
          const pointData = [...state.pointData, payload];
          return {
            ...state,
            pointData: pointData,
          };
        }
      }
    },
    []
  );
  const [state, dispatch] = useReducer(reducer, {
    ...initStata,
    allType: allTemplateType,
  });
  const rightSettingRef = useRef<IRightSettingRef>();
  // console.log(state, "erw");
  return (
    <div className={styles.editor}>
      <DndProvider backend={HTML5Backend}>
        <Context.Provider
          value={{
            state,
            dispatch,
          }}
        >
          <Header
            onPageSetting={() => {
              rightSettingRef.current?.handleOpen();
            }}
          ></Header>
          <div className={styles.editor__container}>
            <ComponentList></ComponentList>
            <WorkArea></WorkArea>
            <RightSetting ref={rightSettingRef}></RightSetting>
          </div>
        </Context.Provider>
      </DndProvider>
    </div>
  );
};
