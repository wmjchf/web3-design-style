import React, { useMemo, useState } from "react";
import { Result, Tabs } from "antd";
import template from "@/materials/base/template";
import { SourceBox } from '../SourceBox';
import styles from "./index.less";

const { TabPane } = Tabs;

interface IComponentList {
  canvasId:string
}
export const ComponentList:React.FC<IComponentList> = (prop) => {
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
    return (text: string) => {
      return (
        <div>
          {text}
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
              <div className={styles.ctitle}>基础组件</div>
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
            </TabPane>
           
          </>
        )}
      </Tabs>
    </div>
  );
};
