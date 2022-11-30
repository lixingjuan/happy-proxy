import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactDOM17 from 'react-dom';
import './style/index.less';
import './assets/font/iconfont';

import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);

const reactVersion = 18;

if (reactVersion === 18) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM17.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
  );
}
