import React from "react";
import { WagmiConfig } from "wagmi";
import { LensProvider } from "@lens-protocol/react-web";
import { ProfileList } from "./components/ProfileList";
import config from "./wagmi/config";
import lensConfig from "./lens/config";

export const App = () => {
  return (
    <WagmiConfig config={config}>
      <LensProvider config={lensConfig} children={<></>}>
        <ProfileList></ProfileList>
      </LensProvider>
    </WagmiConfig>
  );
};
