# 环境

| node    |
|---------|
| >= 18.0 |

# 简介

happy-service, 一个启动在本地的服务，接收到响应优先返回本地缓存数据

## 前置条件

1. 项目根目录执行 `git submodule update --init --recursive`
2. 安装目录`./chrome` 指定的谷歌插件


## 项目启动

三种启动方式

1. 使用 ⭐️ pm2启动(进程守护)

执行 `npm run pm2`


2. 调试启动

使用vscode debug, 选择launch文件 `./.vscode/launch.json`

3. node启动

执行 `npm run start`




## UI 查看本地接口-json文件存储

两种方式

1. 执行脚本 `npm run page`
2. 使用 vscode 插件 `Live Server`


## 一些指令

```bash
# 更新子模块
git submodule update --recursive

# 初始化submodule & 递归更新
git submodule update --init --recursive
```


## TODO

1. [ ] MD5加密
2. [ ] node端接吗gzip等一系列压缩过的内容

