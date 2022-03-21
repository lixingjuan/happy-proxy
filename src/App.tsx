import { useState } from "react";
import { Tabs } from "antd";
import styled from "styled-components";

// import Morning from "./components/Morning";
import Setting from "./components/Setting";
import Editor from "./components/Editor";
import DataList from "./components/DataList";
import I18nTransform from "./components/I18nTransform";
import useFetchListData from "./hook";

import { TopMenuType } from "./types";

const { TabPane } = Tabs;

const defaultActiveKey = (localStorage.getItem("activeTab") ||
  "编辑器") as TopMenuType;

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

const App = () => {
  const [activeTab, setActiveTab] = useState<TopMenuType>(defaultActiveKey);

  const { isLoading, dataSource, updateList, locaIsRunning } =
    useFetchListData();

  const onChange = (val: TopMenuType) => {
    setActiveTab(val);
    localStorage.setItem("activeTab", val);
  };

  return (
    <StyledTab
      onChange={(val) => onChange(val as TopMenuType)}
      activeKey={activeTab}
      defaultActiveKey={defaultActiveKey}
      tabBarExtraContent={
        <Setting
          activeTab={activeTab}
          updateList={updateList}
          isLoading={isLoading}
          locaIsRunning={locaIsRunning}
        />
      }
    >
      <TabPane tab="编辑器" key="编辑器">
        <Editor />
      </TabPane>
      <TabPane tab="本地数据" key="本地数据">
        <DataList {...{ dataSource, updateList, isLoading }} />
      </TabPane>
      {/* <TabPane tab="Morning" key="Morning">
        <Morning />
      </TabPane> */}
      <TabPane tab="国际化" key="国际化">
        <I18nTransform />
      </TabPane>
    </StyledTab>
  );
};

export default App;
