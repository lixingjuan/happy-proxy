import { useEffect, useState } from "react";
import { Alert, Button, Space } from "antd";
import { getAllApi } from "../service";
import styled from "styled-components";
import { SyncOutlined } from "@ant-design/icons";

const StyledAlert = styled(Alert)`
  height: 28px;
  font-size: 12px;
`;

const AlertError = () => {
  const [locaIsRunning, setLocaIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onUpdate = () => {
    setIsLoading(true);
    getAllApi()
      .then((res) => {
        setLocaIsRunning(true);
      })
      .catch((err) => {
        setLocaIsRunning(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onUpdate();
  }, []);

  if (locaIsRunning) {
    return (
      <Space>
        <StyledAlert message="本地服务正常运行" type="success" showIcon />
        <Button onClick={onUpdate} size="small">
          <SyncOutlined spin={isLoading} />
        </Button>
      </Space>
    );
  }

  return (
    <Space>
      <StyledAlert message="Error:本地服务未启动" type="error" showIcon />
      <Button onClick={onUpdate} size="small">
        <SyncOutlined spin={isLoading} />
      </Button>
    </Space>
  );
};

export default AlertError;
