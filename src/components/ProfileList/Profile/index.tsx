import React from "react";
import { Button } from "antd";
import {
  useExploreProfiles,
  ExploreProfilesOrderByType,
  LimitType,
} from "@lens-protocol/react-web";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
export const Profile = () => {
  const { data } = useExploreProfiles({
    orderBy: ExploreProfilesOrderByType.MostFollowers,
    limit: LimitType.TwentyFive,
  });
  const account = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (account.isConnected) return <>{account.address}</>;

  return <Button onClick={() => connect()}>Connect Wallet</Button>;
};
