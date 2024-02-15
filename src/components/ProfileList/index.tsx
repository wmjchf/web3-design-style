import React from "react";
import {
  useExploreProfiles,
  ExploreProfilesOrderByType,
  LimitType,
} from "@lens-protocol/react-web";

import styles from "./index.less";

export const ProfileList = () => {
  const { data = [] } = useExploreProfiles({
    orderBy: ExploreProfilesOrderByType.MostFollowers,
    limit: LimitType.TwentyFive,
  });
  return (
    <div className={styles.profile__list}>
      {data.map((item) => {
        return <></>;
      })}
    </div>
  );
};
