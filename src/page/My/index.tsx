import React from "react";
import { useProfilesManaged } from "@lens-protocol/react-web";
import { useStore } from "@/store";
import styles from "./index.less";

const My = () => {
  const { address } = useStore((state) => state.Global);
  const {
    data: profiles = [],
    error,
    loading,
  } = useProfilesManaged({ for: address, includeOwned: true });
  return <div className={styles.my}></div>;
};

export default My;
