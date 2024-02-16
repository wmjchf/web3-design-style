import React, { useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import { Button } from "antd";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useStore } from "@/store";
import styles from "./index.less";

export const LeftMenu = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const store = useStore((state) => state);
  const leftList = useMemo(() => {
    return [
      {
        path: "/basic/find",
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
        path: "/basic/my",
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

  useEffect(() => {
    store.Global.setAddress(account.address);
  }, [account]);

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
        <div className={styles.login__btn} onClick={() => connect()}>
          登录
        </div>
      )}

      <div className={styles.border}></div>
      {leftList.map((item) => {
        return (
          <Button
            key={item.id}
            className={classNames(styles.item, styles.hover, {
              [styles.active]: location.pathname === item.path && item.path,
            })}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              } else {
                navigation(item.path, {
                  replace: true,
                });
              }
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
