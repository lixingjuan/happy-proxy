# Proxy Mock

插件 + 本地service的形式
- chrome插件：负责转发请求
- 本地service：负责**请求的转发**和**数据的存储**


## 项目目录


```
.
├── .github               github action
├── .vscode
├── Chrome                chrome插件包，可直接安装到浏览器
├── Proxy                 chrome插件源码
├── Service               本地node.js服务, 进入该目录，执行 `npm run start` 或  `npm run pm2`
├── .gitignore
└── README.md

```


## Info

1. 代理请求到 `http://127.0.0.1:4000/xxxxxx`
2. Service会判断本地是否有接口对应数据，
   1. 若有，直接获取本地返回给前端
   2. 若无，根据请求信息，发起真实网络请求，
      1. 响应该结果给前端
      2. 将结果缓存本地，便于下次获取


## 使用步骤

1. 开启本地服务：
   1. `cd ./Service`
   2. `npm install`
   3. `npm start`
2. 安装chrome插件，位置：`./Chrome`
3. 点击插件icon，打开插件
4. 点右下角 + ，增加需要proxy的url


## TODO

1. [ ] 升级chrome extension到v3(解决同步获取cookie的问题)
2. [x] 增加proxy-url支持打tag
3. [ ] 更新接口对应的本地response时，现在是会报错“本地没有该文件”， 修改为若没有没有缓存过改接口对应response, 则创建，并响应“本地无该接口对应response ，已创建”
4. [x] 加一个Popover, 展示按钮
   1. [x] 当前proxy list(switch、删除、tag)
   2. [x] 打开tab页


