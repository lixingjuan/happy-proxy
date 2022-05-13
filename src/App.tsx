import { useState } from "react";
import { Alert, Tabs } from "antd";
import styled from "styled-components";

import Icon from "src/components/Icon";
import Buttons from "src/components/Buttons";
import ProxyList from "src/components/ProxyList";
import RecordList from "src/components/RecordList";
import I18nTransform from "src/components/I18nTransform";

import useFetchListData from "./hook";
import { TopMenuType } from "./types";

const { TabPane } = Tabs;

const defaultActiveKey = (localStorage.getItem("activeTab") || "编辑器") as TopMenuType;

const ServiceError = () => <Alert type="warning" showIcon message="本地服务未开启" closable />;

const StyledApp = styled.div``;

const StyledTab = styled(Tabs)`
  height: 100vh;
  width: 100vw;
  .ant-tabs-content-holder {
    padding-top: 12px;
  }
`;

const App = () => {
  const [activeTab, setActiveTab] = useState<TopMenuType>(defaultActiveKey);

  const { isLoading, dataSource, updateList, locaIsRunning, updateFilter } = useFetchListData();

  const onChange = (val: string) => {
    setActiveTab(val as TopMenuType);
    localStorage.setItem("activeTab", val);
  };

  return (
    <StyledApp>
      {/* <Buttons
        activeTab={activeTab}
        isLoading={isLoading}
        updateList={updateList}
        updateFilter={updateFilter}
        locaIsRunning={locaIsRunning}
      /> */}

      <StyledTab
        onChange={onChange}
        activeKey={activeTab}
        defaultActiveKey={defaultActiveKey}
        tabPosition={"left"}
      >
        <TabPane
          key="代理配置"
          /* title="代理配置" */ tab={<Icon className="font-16" href="icon-proxy" />}
        >
          <>
            {!locaIsRunning && <ServiceError />}
            <ProxyList />
          </>
        </TabPane>
        <TabPane
          key="本地数据"
          /* title="本地数据" */ tab={<Icon className="font-16" href="icon-bendishuju" />}
        >
          <>
            {!locaIsRunning && <ServiceError />}
            <RecordList isLoading={isLoading} dataSource={dataSource} updateList={updateList} />
          </>
        </TabPane>
        <TabPane
          key="国际化"
          /* title="国际化" */ tab={<Icon className="font-16" href="icon-guojihua" />}
        >
          <I18nTransform />
        </TabPane>
      </StyledTab>
    </StyledApp>
  );
};

export default App;
