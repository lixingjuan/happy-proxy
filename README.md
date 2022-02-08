# sun-service

一个启动在本地的服务，接收到响应优先返回本地缓存数据

## 使用说明

1. 请安装目录`./chrome` 指定的谷歌插件
2. 项目安装依赖 `npm run install`

## 项目启动

有两种启动方式

1. node启动：`npm run start`
2. pm2启动： `npm run pm2`



## TODO

1. [ ] 需要一个项目初始化/清理的脚本, 帮忙删除
   1. [x] 所有的接口数据
   2. [x] logs
   3. [ ] path_map
2. [ ] 存储时根据域名将接口response 进行文件夹分类
3. [x] 需要一个脚本清除历史数据
4. [x] 校验接口为真的时候才存储本地
5. [x] 日志存储到本地文件中
6. [ ] 配置路径alias
7. [ ] 存储本地的文件名称
   1. [ ] decode便于查找
   2. [x] 用下划线替代不能识别的符号
8. [ ] 项目启动的时候，脚本判断 logs、configs 文件夹是否存在, 如果不存在创建
9.  [ ] 向logs文件打印日志的时候判断文件是否存在，如果不存在则按照当天日期创建
10. [ ] 参考 console.log 和 egg.js, 写一个日志方法
11. [x] 更新fs为fs/promises
12. [x] 增加launch.json文件支持调试
13. [x] 项目 `npm run start`检查本地是否有settting、responseData、path_map 等文件[夹]
14. [x] <del>或许？可以把 targetBaseUrl 和 cookie做为环境变量存储？配置与逻辑分离</del>
    1.  已配置在插件中
    2.  实现环境变量使用的包: dotenv
15. [ ] ？？307-warterfall-Stalled 时间较久


# 目前的问题

1. [ ] !! 需两方搭配: 目前的实现方式必须依赖一个中间转发者，(如chrome-extension xswitch), 将浏览器接口请求转发到本地, 有什么方法可以集成到一个?
2. [ ] !! 若同时很多请求过来, 是不是fs异步读取文件会让相应更快？
3. [ ] !! 本地获取不到cookie和真实的目标域名: 目标域名/cookie 需要自己维护在my-configs 文件中
4. [ ] ?? 目前的写法真实的返回确实可以10-40ms完成，但是307特别慢，300ms-800ms？
5. [ ] ?? 只忽略my-configs文件内容不忽略文件
6. [ ] ?? 本地的json 是否需要一个时间戳
7. [ ] 根据接口找response文件地址: 利用 [路由]: [文件存储地址]，这样的方式感觉不灵活，
   1. [ ] 有些接口(如AI推荐精选和自选)路由一样但是根据body的字段区分, 目前的映射方式就不好了
   2. [ ] 删除某条需要完全手动





path_map/index.json
请求路径到存储地址的映射, 路径为相对地址

eg:

```jsx
{
  'https://juejin.com/recommend_list': '/src/response/juejin.json'
}
```