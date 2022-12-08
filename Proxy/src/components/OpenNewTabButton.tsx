import { RightSquareOutlined } from '@ant-design/icons';
import { FloatButton, Tooltip } from 'antd';

const OpenNewTabButton = () => {
  const openTab = () => {
    if (chrome?.tabs?.create) {
      chrome.tabs.create({ url: chrome.extension.getURL('index.html') }, function (tab) {
        // Tab opened.
      });
    }
  };

  return (
    <FloatButton
      onClick={openTab}
      icon={
        <Tooltip title="新页面打开" placement="left">
          <RightSquareOutlined onClick={openTab} />
        </Tooltip>
      }
    />
  );
};

export default OpenNewTabButton;
