import React from "react";
import { LeftMenu } from "@/components/LeftMenu";
import styles from "./index.less";

export const Basic = () => {
  return (
    <div className={styles.basic__layout}>
      <LeftMenu></LeftMenu>
    </div>
  );
};
