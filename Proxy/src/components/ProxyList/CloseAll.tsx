import { FloatButton, Tooltip } from 'antd';
import { getLocalProxy, updateLocalProxy } from './utils';
import { StopOutlined, AlertOutlined } from '@ant-design/icons';

const StopAllIcon = () => (
  <Tooltip title="全部关闭" placement="left">
    <StopOutlined />
  </Tooltip>
);
const OpenAllIcon = () => (
  <Tooltip title="全部打开" placement="left">
    <AlertOutlined />
  </Tooltip>
);

const CloseAll = ({ onOkCb }: { onOkCb: () => void }) => {
  const handleChangeAll = (open: boolean) => {
    const local = getLocalProxy();
    const newLocal = local.map((it) => ({ ...it, open }));
    updateLocalProxy(newLocal);
    onOkCb?.();
  };

  const handleCloseAll = () => handleChangeAll(false);
  const handleOpenAll = () => handleChangeAll(true);

  return (
    <>
      <FloatButton onClick={handleCloseAll} icon={<StopAllIcon />} />
      <FloatButton onClick={handleOpenAll} icon={<OpenAllIcon />} />
    </>
  );
};

export default CloseAll;
