import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
// import moment from "moment";
import sortBy from "lodash-es/sortBy";

import { getAllApi } from "./service";
import { RecordItemType } from "./types";

const backendName = "happy-service";

const useFetchListData = () => {
  const [isLoading, setIsLoading] = useState(true);
  /** 筛选条件 */
  // const [filter, setFilter] = useState();
  /** 服务正在运行 */
  const [locaIsRunning, setLocaIsRunning] = useState(false);

  const [dataSource, setDataSource] = useState<RecordItemType[]>([]);

  /** update data */
  const updateList = useCallback(() => {
    setIsLoading(true);
    getAllApi()
      .then(({ data, code }) => {
        const tempRes = data.map((it) => ({
          ...it,
          url: decodeURIComponent(it.url),
          key: decodeURIComponent(it.url),
          filePath: (it?.filePath || "").split(backendName)?.[1],
        }));

        const res = sortBy(tempRes, "createTime");

        setDataSource(res);
        setLocaIsRunning(true);
        message.success("update successful");
      })
      .catch((err) => {
        setLocaIsRunning(false);
        message.error("error", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // TODO ??? Slower
    // getAllApi()
    //   .then(({ data, code }) =>
    //     data.map(({ url, hash, filePath = "", tags = [] }) => ({
    //       tags,
    //       hash,
    //       url: decodeURIComponent(url),
    //       key: decodeURIComponent(url),
    //       filePath: filePath.split(backendName)?.[1],
    //     }))
    //   )
    //   .then((res) => setDataSource(res))
    //   .then(() => message.success("update successful"))
    //   .catch((err) => message.error("error", err.message))
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, []);

  useEffect(() => updateList(), [updateList]);

  return {
    isLoading,
    dataSource,
    locaIsRunning,
    updateList,
  };
};

export default useFetchListData;
