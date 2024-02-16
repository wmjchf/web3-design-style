import React from "react";
import { Basic } from "./layout/Basic";
import { Providers } from "./Provider";

export const App = () => {
  return (
    <Providers>
      <Basic></Basic>
    </Providers>
  );
};
