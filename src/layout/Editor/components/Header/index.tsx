import React from "react";

import styles from "./index.less";
import { Tooltip } from "antd";

interface IHeader {
  onPageSetting?: () => void;
}
export const Header: React.FC<IHeader> = (prop) => {
  const { onPageSetting } = prop;
  return (
    <div className={styles.header}>
      <div className={styles.left}></div>
      <div className={styles.middle}></div>
      <div className={styles.right}>
        <span
          className={styles.page__setting}
          onClick={() => {
            onPageSetting && onPageSetting();
          }}
        >
          <Tooltip title="页面设置">
            <i className="iconfont icon-a-042_dianzan-02"></i>
          </Tooltip>
        </span>
      </div>
    </div>
  );
};
