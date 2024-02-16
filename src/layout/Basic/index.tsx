import React from "react";
import { Outlet } from "react-router-dom";
import { LeftMenu } from "@/layout/Basic/LeftMenu";
import styles from "./index.less";

export const Basic = () => {
  return (
    <div className={styles.basic__layout}>
      <LeftMenu></LeftMenu>
      <div className={styles.right_content}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
