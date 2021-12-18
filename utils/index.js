const { fsyncSync } = require("fs");
const { cwd } = require("process");

export const queryLocalJson = async () => {
  // 1. 根据请求路由去寻找对应的文件路径
  // 查询本地是否有该文件
  const res = fs.readFile(`${cw}${filePath}`);
  console.log({ res });
};

// console.log(`Current directory: ${cwd()}`);
