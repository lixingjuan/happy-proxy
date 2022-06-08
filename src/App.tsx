import { Empty, Tabs } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAllApi } from "./service";
import Icon from "src/components/Icon";
import ProxyList from "src/components/ProxyList";
import RecordList from "src/components/RecordList";
import I18nTransform from "src/components/I18nTransform";
import { TopMenuType, tabsArr } from "./types";

const ServiceError = () => (
  <Empty
    className="absolute-center"
    description={<div className="ft-24 color-purple">👋 Hi!, 请开启本地代理服务</div>}
  />
);

const StyledTab = styled(Tabs)`
  height: 100vh;
  overflow: hidden;
  .ant-tabs-content-holder {
    padding: 20px;
    overflow: auto;
  }
`;

const App = () => {
  const [localServiceIsRunning, setLocalServiceIsRunning] = useState(false);

  useEffect(() => {
    getAllApi()
      .then(() => setLocalServiceIsRunning(true))
      .catch(() => setLocalServiceIsRunning(false));
  }, []);

  const [activeTab, setActiveTab] = useState<TopMenuType>(() => {
    const localVal = localStorage.getItem("activeTab") as TopMenuType;
    if (localVal && tabsArr.includes(localVal)) {
      return localVal;
    }
    return tabsArr[0];
  });

  const onChange = (val: string) => {
    setActiveTab(val as TopMenuType);
    localStorage.setItem("activeTab", val);
  };

  return (
    <StyledTab
      onChange={onChange}
      activeKey={activeTab}
      defaultActiveKey={activeTab}
      tabPosition={"left"}
    >
      <Tabs.TabPane key="代理配置" tab={<Icon className="ft-16" href="icon-proxy" />}>
        {localServiceIsRunning ? <ProxyList /> : <ServiceError />}
      </Tabs.TabPane>
      <Tabs.TabPane key="本地数据" tab={<Icon className="ft-16" href="icon-bendishuju" />}>
        {localServiceIsRunning ? <RecordList /> : <ServiceError />}
      </Tabs.TabPane>
      <Tabs.TabPane key="国际化" tab={<Icon className="ft-16" href="icon-guojihua" />}>
        <I18nTransform />
      </Tabs.TabPane>
    </StyledTab>
  );
};

export default App;
