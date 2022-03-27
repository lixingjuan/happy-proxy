import { useState } from "react";
import { Tabs } from "antd";
import styled from "styled-components";

// import Morning from "./components/Morning";
import Buttons from "src/components/Buttons";
import ProxyEditor from "src/components/ProxyEditor";
import RecordList from "src/components/RecordList";
import I18nTransform from "src/components/I18nTransform";

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
        <Buttons
          activeTab={activeTab}
          updateList={updateList}
          isLoading={isLoading}
          locaIsRunning={locaIsRunning}
        />
      }
    >
      <TabPane tab="编辑器" key="编辑器">
        <ProxyEditor />
      </TabPane>
      <TabPane tab="本地数据" key="本地数据">
        <RecordList {...{ dataSource, updateList, isLoading }} />
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
