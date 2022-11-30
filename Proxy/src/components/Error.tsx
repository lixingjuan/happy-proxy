import { Alert, Button } from 'antd';
import { useRequest } from 'ahooks';

import { getServiceStatus } from '../service';

const App = () => {
  const { error, run } = useRequest(getServiceStatus);

  if (error) {
    return (
      <Alert
        showIcon
        type="error"
        message="本地代理服务未开启"
        className="mb-10"
        action={
          <Button onClick={run} className="ml-30" size="small" type="primary">
            重试
          </Button>
        }
      />
    );
  }

  return null;
};

export default App;
