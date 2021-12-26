import { readFileSync } from "fs";
import { rootPath } from "../../configs";

const pathMap: Record<string, any> = {
  "/demo": "/src/mock/demo.json",
};

/**
 * @desc
 * 1. 根据请求路由去寻找对应的文件路径
 */
export const queryLocalJson = async (routePath: string) => {
  console.log({ routePath });
  const filePath = pathMap[routePath];
  if (!filePath) {
    throw new Error("本地没有该接口信息");
  }

  const completePath = `${rootPath}${filePath}`;

  const res = readFileSync(completePath);

  return res.toString();
};
