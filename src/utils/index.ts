import fs from "fs";
import { logsFilePath } from "./constant";

console.log(1, 2, 3);

/**
 * @desc info log
 * @param {string} text
 */
const log = (text: string): void => {
  // const textStr = JSON.stringify(text, undefined, 2);

  let theText = `\n🌳${text}`;

  fs.appendFile(logsFilePath, theText, "utf8", () => {});
};

/**
 * @desc error log
 * @param {string} text
 */
const errorLog = (text: string) => {
  // const textStr = JSON.stringify(text, undefined, 2);

  let theText = `\n💔Error,${text}`;

  fs.appendFile(logsFilePath, theText, "utf8", () => {});
};

log.error = errorLog;

export default log;
