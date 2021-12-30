/** 一些常量 */
import { cwd } from "process";

const currentDate = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1
}-${new Date().getDate()}`;

/** 项目根目录 */
export const rootPath = cwd();

/** 请求地址到响应json的映射文件地址 */
export const pathToFileMapPath = `${rootPath}/path_map/index.json`;

/** 日志文件地址 */
export const logsFilePath = `${rootPath}/logs/${currentDate}.log`;

/** respnse json base file path */
export const responseBasePath = `${rootPath}/response`;
