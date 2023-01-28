import { Button, Tooltip } from 'antd';
import { getLocalProxy, setLocalProxy } from 'src/utils';
import { StopOutlined, AlertOutlined } from '@ant-design/icons';

const StopAllIcon = () => (
  <Tooltip title="全部关闭">
    <StopOutlined />
  </Tooltip>
);
const OpenAllIcon = () => (
  <Tooltip title="全部打开">
    <AlertOutlined />
  </Tooltip>
);

const CloseAll = ({ onOkCb }: { onOkCb: () => void }) => {
  const handleChangeAll = (open: boolean) => {
    const local = getLocalProxy();
    const newLocal = local.map((it) => ({ ...it, open }));
    setLocalProxy(newLocal);
    onOkCb?.();
  };

  const handleCloseAll = () => handleChangeAll(false);
  const handleOpenAll = () => handleChangeAll(true);

  return (
    <>
      <Button size="small" onClick={handleCloseAll} icon={<StopAllIcon />} />
      <Button size="small" onClick={handleOpenAll} icon={<OpenAllIcon />} />
    </>
  );
};

export default CloseAll;
