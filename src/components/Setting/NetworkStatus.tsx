import { useMemo } from "react";
import { Button, Tooltip } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Icon from "../Icon";

const NetworkStatus = ({ locaIsRunning, updateList, isLoading }: any) => {
  const { title, iconHref, color } = useMemo(() => {
    if (locaIsRunning) {
      return {
        title: "Success: 本地服务正常运行",
        iconHref: "icon-wangluo",
        color: "#47e478",
      };
    }
    return {
      title: "Error: 本地服务未启动",
      iconHref: "icon-wangluocuowu",
      color: "#e64848",
    };
  }, [locaIsRunning]);

  return (
    <>
      <Tooltip title={title}>
        <span>
          <Icon
            href={iconHref}
            className="cursor-pointer font-24"
            style={{ color }}
          />
        </span>
      </Tooltip>

      <Tooltip title="更新网络状态" mouseEnterDelay={1}>
        <Button onClick={updateList} size="small">
          <SyncOutlined spin={isLoading} className="font-20" />
        </Button>
      </Tooltip>
    </>
  );
};

export default NetworkStatus;
