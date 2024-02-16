import React from "react";
import { LensProvider } from "@lens-protocol/react-web";
import { WagmiConfig } from "wagmi";
import config from "./wagmi";
import lensConfig from "./lens";

interface IProvers {
  children?: React.ReactNode;
}
export const Providers: React.FC<IProvers> = (props) => {
  const { children } = props;
  return (
    <WagmiConfig config={config}>
      <LensProvider config={lensConfig} children={children}>
        {children}
      </LensProvider>
    </WagmiConfig>
  );
};
