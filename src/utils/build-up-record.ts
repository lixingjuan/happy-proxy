import dayjs from "dayjs";
import hash from "object-hash";
import { responseBasePath } from "./constant";

/** 输出hash key */
const generateLocalFilePath = () => {
  const fileName = `${dayjs().format("YYYY-MM-DD-hh-mm-ss")}.json`;

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

/** 输出一条记录 */
export const outputRecord = (props: {
  method: string;
  url: string;
  body: any;
}): Record<
  string,
  {
    url: string;
    filePath: string;
    tags: string[] | undefined;
  }
> => {
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
    },
  };
};
