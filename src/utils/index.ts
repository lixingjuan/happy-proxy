import fs from "fs";
import { logsFilePath } from "./constant";

/* 向本地打入日志 */
export const log = (text: string, type?: "error" | "info") => {
  let theText = `\n${text}`;

  if (type === "error") {
    theText = `💔Error,${text}`;
  }

  fs.appendFile(logsFilePath, theText, "utf8", () => {});
};
