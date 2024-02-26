import React from "react";

interface IEditorContext {
  canvasId: string;
  allType: string;
}

export const Context = React.createContext<IEditorContext>({
  canvasId: "",
  allType: [],
});
