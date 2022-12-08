import React from 'react';
import ReactDOM from 'react-dom/client';
import { IndexApp } from './App';
import './style/index.less';
import './assets/font/iconfont';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <div className="p-20">
      <IndexApp showOpenTabButton />
    </div>
  </React.StrictMode>
);
