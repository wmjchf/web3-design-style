import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

import { createGlobal } from "./global";

import { Store } from "./type";

export const useStore = create<Store>()(
  immer((...args) => {
    return {
      Global: createGlobal.apply(null, args),
    };
  })
);
