import React from "react";
import { Providers } from "./Provider";
import { Route } from "./route";
import "./style/global.less";

export const App = () => {
  return (
    <Providers>
      <Route></Route>
    </Providers>
  );
};
