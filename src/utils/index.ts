import fs from "fs";
import { logsFilePath } from "./constant";

/**
 * @desc info log
 * @param {string} text
 */
const log = (text: string): void => {
  let theText = `\n${text}`;

  fs.appendFile(logsFilePath, theText, "utf8", () => {});
};

/**
 * @desc error log
 * @param {string} text
 */
const errorLog = (text: string) => {
  let theText = `\n💔Error,${text}`;

  fs.appendFile(logsFilePath, theText, "utf8", () => {});
};

log.error = errorLog;

export default log;
