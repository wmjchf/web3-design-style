import { http, createConfig } from "wagmi";
import { localhost } from "./definedChain";

export const config = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
  },
});
