import moment from "moment";
import toast from "react-hot-toast";
import { useCallback, useEffect, useMemo, useState } from "react";

import { highlightString } from "src/utils";
import { getAllApi, backendName } from "src/service";
import { RecordItemType, TrendTypeEnum, FilterType,MethodArr } from "./types";


const useFetchListData = () => {
  const [isLoading, setIsLoading] = useState(true);
  /** 筛选条件 */
  const [filter, setFilter] = useState<FilterType>({
    timeTrend: TrendTypeEnum.descend,
    methods: MethodArr,
    searchKey: "",
  });

  /** 全量数据 */
  const [fullData, setFullData] = useState<RecordItemType[]>([]);

  /** list数据源 */
  const dataSource: RecordItemType[] = useMemo(() => {
    const { timeTrend, methods = [], searchKey } = filter;

    let filteredData =
      methods.length > 0 || !!searchKey
        ? fullData.filter(
            (it) => (it.method && methods.includes(it.method)) || it.url.includes(searchKey||"")
          )
        : fullData;

    if (searchKey) {
      filteredData = filteredData.map((it) => ({
        ...it,
        highlightUrl: highlightString(it.url, searchKey, true),
      }));
    }

    return filteredData.sort((a, b) =>
      timeTrend === TrendTypeEnum.ascend
        ? +moment(a.createTime) - +moment(b.createTime)
        : +moment(b.createTime) - +moment(a.createTime)
    );
  }, [fullData, filter]);

  /** update data */
  const updateList = useCallback(() => {
    setIsLoading(true);
    getAllApi()
      .then(({ data }) => {
        const tempRes = data.map((it) => ({
          ...it,
          url: decodeURIComponent(it.url),
          key: decodeURIComponent(it.url),
          filePath: (it?.filePath || "").split(backendName)?.[1],
        }));

        setFullData(tempRes);
        toast.success("update successful");
      })
      .catch((err) => {
        toast.error("error", err.message || "本地服务未启动");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => updateList(), [updateList]);

  const updateFilter = (val: FilterType) => setFilter(pre=> ({...pre, val}));

  return {
    filter,
    isLoading,
    dataSource,
    updateList,
    updateFilter,
  };
};

export default useFetchListData;
