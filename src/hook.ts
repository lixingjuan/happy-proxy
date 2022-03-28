// TODO 如果我使用热编译修改了代码，再次修改筛选条件，list不会重新渲染

import { useCallback, useEffect, useMemo, useState } from "react";
import { message } from "antd";
import sortBy from "lodash-es/sortBy";

import { getAllApi } from "./service";
import { RecordItemType } from "./types";
import { FilterType } from "./types";
import moment from "moment";

const backendName = "happy-service";

const useFetchListData = () => {
  const [isLoading, setIsLoading] = useState(true);
  /** 筛选条件 */
  const [filter, setFilter] = useState<FilterType>({
    timeTrend: undefined,
    methods: [],
  });

  /** 服务正在运行 */
  const [locaIsRunning, setLocaIsRunning] = useState(false);

  /** 全量数据 */
  const [fullData, setFullData] = useState<RecordItemType[]>([]);

  /** list数据源 */
  const dataSource: RecordItemType[] = useMemo(() => {
    const { timeTrend, methods = [] } = filter;
    const filteredData =
      methods.length > 0
        ? fullData.filter((it) => it.method && methods.includes(it.method))
        : fullData;

    if (!timeTrend) {
      return filteredData;
    }

    return filteredData.sort((a, b) =>
      timeTrend === "ascend"
        ? +moment(a.createTime) - +moment(b.createTime)
        : +moment(b.createTime) - +moment(a.createTime)
    );
  }, [fullData, filter]);

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

        setFullData(res);
        setLocaIsRunning(true);
        message.success("update successful");
      })
      .catch((err) => {
        setLocaIsRunning(false);
        message.error("error", err.message || "本地服务未启动");
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

  const updateFilter = (val: FilterType) => {
    setFilter(val);
  };

  return {
    isLoading,
    dataSource,
    locaIsRunning,
    updateList,
    updateFilter,
  };
};

export default useFetchListData;
