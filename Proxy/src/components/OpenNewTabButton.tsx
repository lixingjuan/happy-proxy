import { RightSquareOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

const OpenNewTabButton = () => {
  const openTab = () => {
    if (chrome?.tabs?.create) {
      chrome.tabs.create({ url: chrome.extension.getURL('index.html') }, function (tab) {
        // Tab opened.
      });
    }
  };

  return (
    <Button
      onClick={openTab}
      size="small"
      icon={
        <Tooltip title="新页面打开">
          <RightSquareOutlined />
        </Tooltip>
      }
    />
  );
};

export default OpenNewTabButton;
