import "./App.css";
import { Tabs, message } from "antd";
import { useState, useCallback } from "react";

import Buttons from "./components/Buttons";
import Editor from "./components/Editor";
import DataList from "./components/Table";
import I18nTransform from "./components/I18nTransform";

import { getAllApi } from "./service";

const { TabPane } = Tabs;

const defaultActiveKey = localStorage.getItem("activeTab") || "1";

const style = {
  height: "100vh",
  margin: "0px auto",
  width: "calc(100vw - 40px)",
};

type DataSourceItem = { url: string; filePath: string };
function App() {
  const [activeTab, setActiveTab] = useState(defaultActiveKey);

  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);

  /** update data */
  const handleUpdate = useCallback(() => {
    getAllApi()
      .then(({ data, code }) => {
        message.success("query successful");
        const dataArr = Object.entries(data)
          .reverse()
          .map(([url, filePath = ""]) => ({
            url,
            filePath: filePath.split("my")?.[1],
          }));
        setDataSource(dataArr);
      })
      .catch((err) => message.error("error", err.message));
  }, []);

  const onChange = (val: string) => {
    setActiveTab(val);
    localStorage.setItem("activeTab", val);
  };

  return (
    <div className="App">
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
          <DataList onUpdate={handleUpdate} dataSource={dataSource} />
        </TabPane>
        <TabPane tab="国际化" key="3">
          <I18nTransform />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
