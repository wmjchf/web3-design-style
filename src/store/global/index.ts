import { StateCreator } from "zustand";
import { produce } from "immer";
import { Store } from "../type";

export interface Global {
  address: string;
  setAddress: (address: string) => void;
}

export const createGlobal: StateCreator<Store, [], [], Global> = (set) => ({
  address: "",
  setAddress: (address: string) => {
    set(
      produce((state) => {
        state.Global.address = address;
      })
    );
  },
});
