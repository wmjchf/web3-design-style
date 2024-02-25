import React, { useMemo, useState } from "react";
import { Tabs } from "antd";
import classNames from "classnames";
import template from "@/materials/base/template";
import { SourceBox } from "../SourceBox";
import styles from "./index.less";

const { TabPane } = Tabs;

interface IComponentList {
  canvasId: string;
}
export const ComponentList: React.FC<IComponentList> = (prop) => {
  const { canvasId } = prop;
  const [collapsed, setCollapsed] = useState(false);
  const allTemplateType = useMemo(() => {
    const arr: string[] = [];
    template.forEach((v) => {
      arr.push(v.type);
    });
    return arr;
  }, [template]);

  const changeCollapse = useMemo(() => {
    return (collapsed: boolean) => {
      setCollapsed(collapsed);
    };
  }, []);
  const generateHeader = useMemo(() => {
    const iconMap = {
      base: {
        icon: "icon-a-042_faxian",
        name: "基础",
      },
      media: {
        icon: "icon-a-042_biaoqing",
        name: "媒体",
      },
      func: {
        icon: "icon-a-042_dianying",
        name: "功能",
      },
    };
    return (name: string) => {
      return (
        <div className={styles.tab__item}>
          <i className={classNames("iconfont", iconMap[name].icon)}></i>
          <span>{iconMap[name].name}</span>
        </div>
      );
    };
  }, []);
  return (
    <div className={styles.component__list}>
      <Tabs
        className="editorTabclass"
        defaultActiveKey="1"
        tabPosition={"left"}
        onTabClick={() => changeCollapse(false)}
      >
        {collapsed ? (
          <>
            <TabPane tab={generateHeader("base")} key="1"></TabPane>
          </>
        ) : (
          <>
            <TabPane tab={generateHeader("base")} key="1">
              <div className={styles.title}>基础组件</div>
              <div className={styles.content}>
                {template.map((value, i) => {
                  return (
                    <SourceBox item={value} key={i} canvasId={canvasId}>
                      {/* <DynamicEngine
                      {...value}
                      config={
                        schemaH5[value.type as keyof typeof schemaH5].config
                      }
                      componentsType="base"
                      isTpl={true}
                    /> */}
                    </SourceBox>
                  );
                })}
              </div>
            </TabPane>
            <TabPane tab={generateHeader("media")} key="2">
              <div className={styles.title}>媒体组件</div>
              <div className={styles.content}>
                {template.map((value, i) => {
                  return (
                    <SourceBox item={value} key={i} canvasId={canvasId}>
                      {/* <DynamicEngine
                      {...value}
                      config={
                        schemaH5[value.type as keyof typeof schemaH5].config
                      }
                      componentsType="base"
                      isTpl={true}
                    /> */}
                    </SourceBox>
                  );
                })}
              </div>
            </TabPane>
            <TabPane tab={generateHeader("func")} key="3">
              <div className={styles.title}>媒体组件</div>
              <div className={styles.content}>
                {template.map((value, i) => {
                  return (
                    <SourceBox item={value} key={i} canvasId={canvasId}>
                      {/* <DynamicEngine
                      {...value}
                      config={
                        schemaH5[value.type as keyof typeof schemaH5].config
                      }
                      componentsType="base"
                      isTpl={true}
                    /> */}
                    </SourceBox>
                  );
                })}
              </div>
            </TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
};
