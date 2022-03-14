import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import Table from "./Table";

import { getAllApi } from "../../service";

const backendName = "happy-service";

type DataSourceItem = { url: string; filePath: string };

const DataList = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);

  /** update data */
  const handleUpdate = useCallback(() => {
    setIsLoading(true);
    getAllApi()
      .then(({ data, code }) => {
        const res = data.map((it) => ({
          ...it,
          url: decodeURIComponent(it.url),
          key: decodeURIComponent(it.url),
          filePath: (it?.filePath || "").split(backendName)?.[1],
        }));

        setDataSource(res);
        message.success("update successful");
      })
      .catch((err) => message.error("error", err.message))
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

  useEffect(() => handleUpdate(), [handleUpdate]);

  return (
    <Table
      isLoading={isLoading}
      dataSource={dataSource}
      onUpdate={handleUpdate}
    />
  );
};

export default DataList;
