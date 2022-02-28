import "./App.css";
import { Tabs, message } from "antd";
import { useState, useCallback } from "react";

import Buttons from "./components/Buttons";
import Editor from "./components/Editor";
import DataList from "./components/DataList";
import I18nTransform from "./components/I18nTransform";

import { getAllApi } from "./service";

const backendName = "happy-service";

const { TabPane } = Tabs;

const defaultActiveKey = localStorage.getItem("activeTab") || "1";

const style = {
  height: "100vh",
  margin: "0px auto",
  width: "calc(100vw - 10px)",
};

type DataSourceItem = { url: string; filePath: string };
function App() {
  const [activeTab, setActiveTab] = useState(defaultActiveKey);
  const [isLoading, setIsLoading] = useState(true);

  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);

  /** update data */
  const handleUpdate = useCallback(() => {
    setIsLoading(true);

    getAllApi()
      .then(({ data, code }) => {
        message.success("update successful");

        const dataArr = Object.entries(data)
          .reverse()
          .map(([url, filePath = ""]) => ({
            url,
            key: url,
            filePath: filePath.split(backendName)?.[1],
          }));
        setDataSource(dataArr);
      })
      .catch((err) => message.error("error", err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChange = (val: string) => {
    setActiveTab(val);
    localStorage.setItem("activeTab", val);
  };

  return (
    <Tabs
      style={style}
      onChange={onChange}
      activeKey={activeTab}
      defaultActiveKey={defaultActiveKey}
      tabBarExtraContent={<Buttons onUpdate={handleUpdate} />}
    >
      <TabPane tab="编辑器" key="1">
        <Editor />
      </TabPane>
      <TabPane tab="本地数据" key="2">
        <DataList
          onUpdate={handleUpdate}
          dataSource={dataSource}
          isLoading={isLoading}
        />
      </TabPane>
      <TabPane tab="国际化" key="3">
        <I18nTransform />
      </TabPane>
    </Tabs>
  );
}

export default App;
