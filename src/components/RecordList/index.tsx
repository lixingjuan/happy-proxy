import { List, Modal } from "antd";
import toast from "react-hot-toast";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import Filters from "./Filters";
import AddRecord from "./AddRecord";
import { renderItem } from "./RenderItem";
import useFetchListData from "./hook";
import { deleteItemApi, deleteAllApi } from "../../service";

const RecordList = () => {
  const { isLoading, dataSource, updateList, updateFilter, filter } = useFetchListData();

  const deleteAll = () => {
    Modal.confirm({
      title: "删除后不可恢复，确定删除？",
      icon: <ExclamationCircleOutlined />,
      onCancel() {},
      onOk() {
        deleteAllApi()
          .then((res) => {
            toast.success("删除成功");
            updateList();
          })
          .catch((error) => toast.success("删除失败", error.message));
      },
    });
  };

  /** 删除一条记录 */
  const onDelete = (hash: string) => {
    if (!hash) {
      toast.error("hash不能为空");
      return;
    }

    deleteItemApi(hash)
      .then(() => {
        toast.success("删除成功");
        updateList();
      })
      .catch((err: any) => toast.error(err.message));
  };

  return (
    <>
      <div className="flex justify-end gap-12 pt-12">
        <Filters updateFilter={updateFilter} filter={filter} />
        <AddRecord onUpdate={updateList} />
        <DeleteOutlined onClick={deleteAll} style={{ fontSize: "20px" }} />
      </div>

      <List
        loading={isLoading}
        dataSource={dataSource}
        itemLayout="horizontal"
        style={{ height: "100%", overflow: "auto" }}
        renderItem={(item) => renderItem(item, onDelete)}
      />
    </>
  );
};

export default RecordList;
