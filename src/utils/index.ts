import fs from "fs";
import { pathToFileMapPath, responseBasePath, logsFilePath } from "../constant";

/* 向本地打入日志 */
export const log = (text: string) => {
  fs.appendFile(logsFilePath, `\n${text}`, "utf8", () => {});
};
