import React, { useState } from "react";
import { Badge, Tabs } from "antd";
import type { TabsProps } from "antd";
import GeneralNotify from "./GeneralNotify";

const NotifyTabs: React.FC = () => {
const [activeKey, setActiveKey]= useState('2')
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          General <Badge style={{backgroundColor:activeKey==='1'?'#FE5C36':'#b3b1b1', borderRadius: "2px"}} count={10} />
        </span>
      ),
      children: <GeneralNotify name="general" />,
    },
    {
      key: "2",
      label: (
        <span>
          Request <Badge style={{backgroundColor:activeKey==='2'?'#FE5C36':'#b3b1b1', borderRadius: "2px" }} count={11} />
        </span>
      ),
      children: <GeneralNotify name="request" />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
    setActiveKey(key)
  };

  return (<Tabs defaultActiveKey="2" items={items} onChange={onChange} className="wrapper-tabs"/>)
};

export default NotifyTabs;
