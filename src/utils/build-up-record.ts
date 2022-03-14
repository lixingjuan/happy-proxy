import dayjs from "dayjs";
import hash from "object-hash";
import { responseBasePath } from "./constant";

/** 生成文件地址 */
const generateLocalFilePath = () => {
  const fileName = `${dayjs().format("YYYYMMDD-HH-mm-ss-SSS")}.json`;

  // 文件存储路径
  const filePath = `${responseBasePath}/${fileName}`;

  return filePath;
};

/** 输出hash key */
export const generateHashKey = ({
  method,
  url,
  body,
}: {
  method: string;
  url: string;
  body: any;
}) => {
  const realMethod = method.toLocaleLowerCase();
  return hash({ method: realMethod, url, body });
};

type RecordInfo = {
  url: string;
  filePath: string;
  method: string;
  tags: string[] | undefined;
  createTime: string;
};

/** 输出一条记录 */
export const outputRecord = (props: {
  method: string;
  url: string;
  body: any;
}): Record<string, RecordInfo> => {
  const { method, url, body } = props;
  let theMethod = method.toLocaleLowerCase();

  const hashKey = generateHashKey({
    method: theMethod,
    url,
    body,
  });

  const localFilePath = generateLocalFilePath();

  return {
    [hashKey]: {
      url,
      filePath: localFilePath,
      tags: [],
      method,
      createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
  };
};
