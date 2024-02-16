import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { Button } from "antd";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import logo from "@/image/logo.png";
import styles from "./index.less";

export const LeftMenu = () => {
  const leftList = useMemo(() => {
    return [
      {
        path: "/site/find",
        name: "发现",
        icon: "icon-find",
        id: 1,
      },
      {
        name: "消息",
        icon: "icon-message",
        id: 2,
      },
      {
        path: "/site/find/account",
        name: "我的",
        icon: "icon-user1",
        id: 3,
      },
    ];
  }, []);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const account = useAccount();
  const [current, setCurrent] = useState(1);
  return (
    <div className={classNames(styles.left__menu)}>
      <div className={styles.logo}>
        <span>
          <strong>🌿 Lens Protocol</strong>
        </span>
      </div>
      {account.isConnected ? (
        <div className={classNames(styles.login__btn, styles.address)}>
          <span>{account.address}</span>
        </div>
      ) : (
        <div className={styles.login_btn} onClick={() => connect()}>
          登录
        </div>
      )}

      <div className={styles.border}></div>
      {leftList.map((item, index) => {
        return (
          <Button
            key={item.id}
            className={classNames(styles.item, styles.hover, {
              [styles.active]: current === index,
            })}
            onClick={() => {
              setCurrent(index);
            }}
          >
            <span>{item.name}</span>
          </Button>
        );
      })}
      {/* <div className={styles.more}>
        <Dropdown
          menu={{
            items: store.User.isLogin ? items.concat(loginItems) : items,
          }}
          placement="topRight"
          overlayClassName={styles.more_overlay}
        >
          <div className={styles.more_wrap}>
            <div className={styles.background}></div>
            <span>更多</span>
          </div>
        </Dropdown>
      </div> */}
    </div>
  );
};
