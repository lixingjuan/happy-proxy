import './style/index.less';

import { Tabs } from 'antd';
import Error from 'src/components/Error';
import ProxyList from 'src/components/ProxyList';
import { I18Icon, ProxyIcon } from 'src/components/Icon';
import I18nTransform from 'src/components/I18nTransform';

export const IndexApp = ({ showOpenTabButton = false }: { showOpenTabButton?: boolean }) => (
  <>
    <Error />
    <ProxyList showOpenTabButton={showOpenTabButton} />
  </>
);

const items = [
  {
    label: <ProxyIcon />,
    key: '代理配置',
    style: { padding: 15 },
    children: <IndexApp />
  },
  {
    label: <I18Icon />,
    key: '国际化',
    children: <I18nTransform />
  }
];

const App = () => <Tabs tabPosition={'left'} style={{ height: '100vh' }} items={items} />;

export default App;
