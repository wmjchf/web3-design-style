import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Drawer } from "antd";
import styles from "./index.less";

export interface IRightSettingRef {
  handleOpen: () => void;
  handleClose: () => void;
}
interface IRightSetting {}
export const RightSetting = forwardRef<IRightSettingRef, IRightSetting>(
  (prop, ref) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    useImperativeHandle(ref, () => {
      return {
        handleOpen,
        handleClose,
      };
    });
    return (
      <Drawer
        title="属性设置"
        open={open}
        onClose={handleClose}
        getContainer={false}
        mask={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );
  }
);
