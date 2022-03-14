import { useState } from "react";
import { Tabs } from "antd";

import Buttons from "./components/Buttons";
import Editor from "./components/Editor";
import DataList from "./components/DataList";
import I18nTransform from "./components/I18nTransform";

import styled from "styled-components";

const { TabPane } = Tabs;

const defaultActiveKey = localStorage.getItem("activeTab") || "1";

const StyledTab = styled(Tabs)`
  height: 100vh;
  width: 100vw;
  .ant-tabs-nav {
    margin-bottom: 12px;
    .ant-tabs-tab {
      margin-left: 12px;
    }
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState(defaultActiveKey);

  const onChange = (val: string) => {
    setActiveTab(val);
    localStorage.setItem("activeTab", val);
  };

  return (
    <StyledTab
      onChange={onChange}
      activeKey={activeTab}
      defaultActiveKey={defaultActiveKey}
      tabBarExtraContent={<Buttons />}
    >
      <TabPane tab="编辑器" key="1">
        <Editor />
      </TabPane>
      <TabPane tab="本地数据" key="2">
        <DataList />
      </TabPane>
      <TabPane tab="国际化" key="3">
        <I18nTransform />
      </TabPane>
    </StyledTab>
  );
}

export default App;
