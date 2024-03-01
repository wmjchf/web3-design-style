import React from "react";

export interface IState {
  canvasId: string;
  allType: string;
  pointData: PointData[];
}

interface IEditorContext {
  state: IState;
  dispatch: React.Dispatch;
}

export const initStata = {
  canvasId: "abc",
  allType: [],
  pointData: [],
};

export const Context = React.createContext<IEditorContext>();
