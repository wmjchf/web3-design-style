import { http, createConfig } from "wagmi";
import { localhost } from "./definedChain";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [localhost],
  connectors: [injected()],
  transports: {
    // [localhost.id]: http(),
    [localhost.id]: http(),
  },
});
