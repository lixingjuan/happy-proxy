import { Button, Tooltip } from 'antd';
import { StopOutlined, AlertOutlined } from '@ant-design/icons';
import * as dbUtils from '../utils/dbUtils';

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

const CloseAll = ({ updateDataSourceAndBg }: { updateDataSourceAndBg: () => void }) => {
  const commonFunc = async (open: boolean) => {
    const allItems = await dbUtils.getAll();
    await Promise.all(allItems.map((it) => dbUtils.set(it.id, { ...it, open })));

    updateDataSourceAndBg();
  };

  return (
    <>
      <Button
        size="small"
        icon={<StopAllIcon />}
        onClick={() => {
          commonFunc(false);
        }}
      />
      <Button
        size="small"
        icon={<OpenAllIcon />}
        onClick={() => {
          commonFunc(true);
        }}
      />
    </>
  );
};

export default CloseAll;
