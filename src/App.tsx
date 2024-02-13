import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi/config";
import { ConnectWallet } from "./components/ConnectWallet";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet></ConnectWallet>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
