const Koa = require("koa");
const cors = require("koa2-cors");
const getKeys = require("./getKeys");
const bodyParser = require("koa-bodyparser");
const { cwd } = require("process");

const { queryLocalJson } = require("./utils/index.js");

const app = new Koa();

app.use(bodyParser());

const getValue = async (code) => {
  const res = await getKeys(code);
  console.log("ceee res", res);
  return res;
};

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
  })
);

app.use(async (ctx) => {
  const { path, method } = ctx;
  console.log(path);
  let res = {};
  switch (path) {
    case "/wxResourcePic/list":
      res = {
        code: 304,
      };
      break;
    case "/auth":
      res = {
        isInnerUser: true,
      };
      break;
    case "/getAppkeys":
      // res = {
      //   session_key: "qhilFbz/hpGw56LtSBfewg==", //session_key  会话密钥
      //   openid: "oizuA4hQsGgHHc03ZOxxIp9qXPqU", //openid 用户唯一标识
      //   unionid: "oattK6AyWpw1fXvMi-8Mlp0r9CAg", //unionid 开放平台唯一标识
      // };
      res = await getValue(ctx.request.body.code);
      break;
    case "/getUserInfo":
      res = {
        avatarUrl:
          "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJm2hgmecBiauHgV5LMeyyjI9LNWse3GFiawuvh62vZCdXuYJ7oTiaVb57DTXOk72h89k5H4jX8Gulxw/132",
        city: "",
        country: "China",
        gender: 2,
        language: "zh_CN",
        nickName: "李幸娟",
        province: "Shanghai",
        // 手机号接口请求
        phoneNumber: "18236129679",
        // 后端返回
        type: 1,
      };
      break;
    case "/updateUserInfo":
      res = {
        msg: "成功",
        code: "SUCCES",
      };
      break;
    case "/uploadImage":
      res = {
        msg: "成功",
        code: "SUCCES",
      };
      break;
    case "/queryDetail":
      res = {
        filePath: "http://tmp/L5EfR8wZQKAGac9d1c43f54176dd4c1bb4bf92b3d437.jpg",
        company: "公司名称",
        position: "UI设计师",
        tel: "18762537373",
      };
      break;
    // 客户浏览记录
    case "/queryCustomerViewList":
      res = [
        {
          date: "06-17",
          listData: [
            {
              time: "11:46",
              fileName: "7月6号资源单",
            },
            {
              time: "10:58",
              fileName: "7月7号资源单",
            },
          ],
        },
        {
          date: "06-15",
          listData: [
            {
              time: "11:46",
              fileName: "7月6号资源单",
            },
            {
              time: "10:58",
              fileName: "7月7号资源单",
            },
          ],
        },
      ];
      break;
    case "/queryFiles":
      res = [
        {
          fileName: "文件名称",
          filePath:
            "http://tmp/L5EfR8wZQKAGac9d1c43f54176dd4c1bb4bf92b3d437.jpg",
          uploadTime: "2021-09-08",
        },
        {
          fileName: "文件名称",
          filePath:
            "http://tmp/L5EfR8wZQKAGac9d1c43f54176dd4c1bb4bf92b3d437.jpg",
          uploadTime: "2021-09-08",
        },
        {
          fileName: "文件名称",
          filePath:
            "http://tmp/L5EfR8wZQKAGac9d1c43f54176dd4c1bb4bf92b3d437.jpg",
          uploadTime: "2021-09-08",
        },
        {
          fileName: "文件名称",
          filePath:
            "http://tmp/L5EfR8wZQKAGac9d1c43f54176dd4c1bb4bf92b3d437.jpg",
          uploadTime: "2021-09-08",
        },
        {
          fileName: "文件名称",
          filePath:
            "http://tmp/L5EfR8wZQKAGac9d1c43f54176dd4c1bb4bf92b3d437.jpg",
          uploadTime: "2021-09-08",
        },
      ];
      break;

    default:
      res = {
        error: "error",
      };
      break;
  }
  console.log("path", path);
  console.log(`Current directory: ${cwd()}`);

  ctx.body = {
    data: res,
    code: 304,
    message: "查询成功",
    status: "Succeed",
  };
});

app.listen(4001);

console.log("SUCCESS, 监听在4001端口");
